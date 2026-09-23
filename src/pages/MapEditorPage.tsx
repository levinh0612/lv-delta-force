import { useCallback, useEffect, useRef, useState, type ChangeEvent, type PointerEvent as RPointerEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Check,
  ExternalLink,
  DoorOpen,
  Eraser,
  FileDown,
  FileUp,
  Flag,
  ImageDown,
  ImagePlus,
  ImageOff,
  Package,
  Route,
  Skull,
  StickyNote,
  Trash2,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import { MAPS } from "../data/maps";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "../hooks/useToast";
import { downloadBlob, renderNotePng } from "../lib/exportPng";
import { deleteImage, getImage, putImage, shrinkImage } from "../lib/imageStore";
import {
  EMPTY_NOTE,
  MARKER_TYPES,
  ROUTE_COLOR,
  markerNumbers,
  parseExport,
  type MapNote,
  type MapNotes,
  type MarkerType,
  type NotesExport,
  type Point,
} from "../lib/mapNotes";

type Tool = MarkerType | "route" | "erase";

const ICONS: Record<MarkerType, LucideIcon> = {
  extract: DoorOpen,
  loot: Package,
  danger: Skull,
  spawn: Flag,
  note: StickyNote,
};
const TYPE = Object.fromEntries(MARKER_TYPES.map((t) => [t.key, t])) as Record<MarkerType, (typeof MARKER_TYPES)[number]>;
const uid = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const pts = (r: Point[]) => r.map((p) => `${p.x},${p.y}`).join(" ");

export default function MapEditorPage() {
  useDocumentTitle("Bản đồ tương tác");
  const [params, setParams] = useSearchParams();
  const mapId = MAPS.some((m) => m.id === params.get("map")) ? params.get("map")! : MAPS[0].id;
  const setMap = useCallback((id: string) => setParams({ map: id }, { replace: true }), [setParams]);
  // Keyed by map so all per-map editing state (draft, undo history, image) resets on switch.
  return <Editor key={mapId} mapId={mapId} setMap={setMap} />;
}

function Editor({ mapId, setMap }: { mapId: string; setMap: (id: string) => void }) {
  const toast = useToast();
  const mapInfo = MAPS.find((m) => m.id === mapId)!;
  const mapName = mapInfo.name;

  const [all, setAll] = useLocalStorage<MapNotes>("df-mapnotes", {});
  const note: MapNote = all[mapId] ?? EMPTY_NOTE;
  const [history, setHistory] = useState<MapNote[]>([]);
  const [tool, setTool] = useState<Tool>("loot");
  const [draft, setDraft] = useState<Point[]>([]);
  const [imageUrl, setImageUrl] = useState<string>();
  const [ratio, setRatio] = useState(16 / 10);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgInput = useRef<HTMLInputElement>(null);
  const jsonInput = useRef<HTMLInputElement>(null);
  const drag = useRef<{ id: string; moved: boolean } | null>(null);

  /** Every edit goes through here so it can be undone. */
  const commit = useCallback(
    (next: MapNote) => {
      setHistory((h) => [...h.slice(-49), note]);
      setAll((prev) => ({ ...prev, [mapId]: next }));
    },
    [note, mapId, setAll],
  );

  // Load this map's screenshot from IndexedDB.
  useEffect(() => {
    let url: string | undefined;
    let alive = true;
    getImage(mapId).then((blob) => {
      if (!alive || !blob) return;
      url = URL.createObjectURL(blob);
      setImageUrl(url);
    });
    return () => {
      alive = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [mapId]);

  const finishRoute = useCallback(() => {
    if (draft.length >= 2) commit({ ...note, routes: [...note.routes, draft] });
    setDraft([]);
  }, [draft, note, commit]);

  const undo = useCallback(() => {
    if (draft.length) return setDraft((d) => d.slice(0, -1));
    const prev = history.at(-1);
    if (!prev) return;
    setHistory((h) => h.slice(0, -1));
    setAll((all) => ({ ...all, [mapId]: prev }));
  }, [draft.length, history, mapId, setAll]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, select, textarea")) return;
      if (e.key === "Enter" || e.key === "Escape") finishRoute();
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finishRoute, undo]);

  const pickTool = (t: Tool) => {
    if (tool === "route" && t !== "route") finishRoute();
    setTool(t);
  };

  const toPoint = (clientX: number, clientY: number): Point => {
    const r = stageRef.current!.getBoundingClientRect();
    const clamp = (n: number) => Math.round(Math.min(100, Math.max(0, n)) * 100) / 100;
    return { x: clamp(((clientX - r.left) / r.width) * 100), y: clamp(((clientY - r.top) / r.height) * 100) };
  };

  const onStageClick = (e: React.MouseEvent) => {
    if ((e.target as Element).closest(".pin, .route")) return;
    const p = toPoint(e.clientX, e.clientY);
    if (tool === "route") return setDraft((d) => [...d, p]);
    if (tool === "erase") return;
    const id = uid();
    commit({ ...note, markers: [...note.markers, { id, type: tool, label: "", ...p }] });
    setSelected(id);
  };

  /* Marker drag / click */
  const onMarkerDown = (e: RPointerEvent, id: string) => {
    e.stopPropagation();
    if (tool === "erase") return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { id, moved: false };
  };
  const onMarkerMove = (e: RPointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const p = toPoint(e.clientX, e.clientY);
    if (!d.moved) setHistory((h) => [...h.slice(-49), note]);
    d.moved = true;
    setAll((prev) => {
      const n = prev[mapId] ?? EMPTY_NOTE;
      return { ...prev, [mapId]: { ...n, markers: n.markers.map((m) => (m.id === d.id ? { ...m, ...p } : m)) } };
    });
  };
  const onMarkerUp = (id: string) => {
    const d = drag.current;
    drag.current = null;
    if (d?.moved) return;
    if (tool === "erase") removeMarker(id);
    else setSelected(id);
  };

  const removeMarker = (id: string) => commit({ ...note, markers: note.markers.filter((m) => m.id !== id) });
  const removeRoute = (i: number) => commit({ ...note, routes: note.routes.filter((_, j) => j !== i) });
  const setLabel = (id: string, label: string) =>
    setAll((prev) => ({ ...prev, [mapId]: { ...note, markers: note.markers.map((m) => (m.id === id ? { ...m, label } : m)) } }));

  /* Image */
  const onImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast("Chỉ nhận file ảnh");
    try {
      const blob = await shrinkImage(file);
      await putImage(mapId, blob);
      setImageUrl((old) => {
        if (old) URL.revokeObjectURL(old);
        return URL.createObjectURL(blob);
      });
      toast("Đã lưu ảnh bản đồ trên máy bạn");
    } catch {
      toast("Không lưu được ảnh");
    }
  };
  const removeImage = async () => {
    await deleteImage(mapId).catch(() => {});
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(undefined);
    setRatio(16 / 10);
  };

  /* Export / import */
  const exportPng = async () => {
    try {
      const blob = await renderNotePng(note, mapName, imageUrl);
      downloadBlob(blob, `wp-${mapId}.png`);
    } catch {
      toast("Xuất ảnh thất bại");
    }
  };
  const exportJson = () => {
    const data: NotesExport = { app: "lv-delta-force", version: 1, map: mapId, note };
    downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }), `wp-${mapId}-lo-trinh.json`);
  };
  const importJson = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const { map, note: imported } = parseExport(await file.text());
      const target = map && MAPS.some((m) => m.id === map) ? map : mapId;
      setAll((prev) => ({ ...prev, [target]: imported }));
      if (target !== mapId) setMap(target);
      else setHistory((h) => [...h, note]);
      toast(`Đã nhập ${imported.markers.length} điểm, ${imported.routes.length} lộ trình`);
    } catch {
      toast("File không hợp lệ");
    }
  };
  const clearAll = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      window.setTimeout(() => setConfirmClear(false), 4000);
      return;
    }
    commit(EMPTY_NOTE);
    setDraft([]);
    setConfirmClear(false);
  };

  const nums = markerNumbers(note.markers);
  const hint =
    tool === "route"
      ? draft.length
        ? "Bấm tiếp để thêm điểm. Enter hoặc nút “Xong” để kết thúc."
        : "Bấm lên bản đồ để bắt đầu vẽ lộ trình."
      : tool === "erase"
        ? "Bấm vào điểm hoặc lộ trình để xóa."
        : `Bấm lên bản đồ để đặt điểm “${TYPE[tool].label}”. Kéo để di chuyển.`;

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="callsign">
          <Link to="/maps">Bản đồ</Link> · trình soạn lộ trình
        </p>
        <h1 className="small">
          Bản đồ<span>tương tác</span>
        </h1>
        <p className="lede">
          Tải ảnh chụp bản đồ trong game, đánh dấu điểm di tản, khu loot, chỗ nguy hiểm và vẽ lộ trình. Xuất ra PNG để gửi vào nhóm WP.
        </p>
      </header>

      <section className="block editor">
        <div className="filters">
          <label className="sr-only" htmlFor="map-pick">Bản đồ</label>
          <select id="map-pick" className="input" style={{ width: "auto" }} value={mapId} onChange={(e) => setMap(e.target.value)}>
            {MAPS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <button type="button" className="btn ghost" onClick={() => imgInput.current?.click()}>
            <ImagePlus size={16} aria-hidden="true" /> {imageUrl ? "Đổi ảnh" : "Tải ảnh bản đồ"}
          </button>
          {imageUrl && (
            <button type="button" className="btn ghost" onClick={removeImage} aria-label="Gỡ ảnh bản đồ">
              <ImageOff size={16} aria-hidden="true" />
            </button>
          )}
          <input ref={imgInput} type="file" accept="image/*" hidden onChange={onImage} />
        </div>

        <div className="toolbar" role="toolbar" aria-label="Công cụ vẽ">
          {MARKER_TYPES.map((t) => {
            const Icon = ICONS[t.key];
            return (
              <button key={t.key} type="button" aria-pressed={tool === t.key} onClick={() => pickTool(t.key)} style={{ "--c": t.color } as React.CSSProperties}>
                <Icon size={16} aria-hidden="true" /> {t.label}
              </button>
            );
          })}
          <button type="button" aria-pressed={tool === "route"} onClick={() => pickTool("route")} style={{ "--c": ROUTE_COLOR } as React.CSSProperties}>
            <Route size={16} aria-hidden="true" /> Lộ trình
          </button>
          <button type="button" aria-pressed={tool === "erase"} onClick={() => pickTool("erase")} style={{ "--c": "var(--danger)" } as React.CSSProperties}>
            <Eraser size={16} aria-hidden="true" /> Xóa
          </button>
        </div>

        <div className="row editor-hint">
          <span className="muted">{hint}</span>
          {tool === "route" && draft.length > 0 && (
            <button type="button" className="btn signal" onClick={finishRoute} disabled={draft.length < 2}>
              <Check size={16} aria-hidden="true" /> Xong lộ trình
            </button>
          )}
          <button type="button" className="btn ghost" onClick={undo} disabled={!draft.length && !history.length} aria-label="Hoàn tác (Ctrl/Cmd+Z)" title="Hoàn tác (Ctrl/Cmd+Z)">
            <Undo2 size={16} aria-hidden="true" />
          </button>
        </div>

        <div
          ref={stageRef}
          className={`stage tool-${tool}${imageUrl ? "" : " empty"}`}
          style={{ aspectRatio: String(ratio) }}
          onClick={onStageClick}
          onDoubleClick={() => tool === "route" && finishRoute()}
        >
          {imageUrl ? (
            <img src={imageUrl} alt={`Bản đồ ${mapName}`} draggable={false} onLoad={(e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)} />
          ) : (
            <div className="stage-empty">
              <ImagePlus size={36} aria-hidden="true" />
              <p>
                Chưa có ảnh cho <b>{mapName}</b>. Chụp màn hình bản đồ trong game rồi bấm <b>Tải ảnh bản đồ</b>.
                <br />
                <span className="muted">Hoặc cứ vẽ nháp trên lưới này.</span>
                <br />
                <a
                  href={mapInfo.detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ pointerEvents: "auto" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} aria-hidden="true" style={{ verticalAlign: "-2px" }} /> Xem vị trí điểm di tản, loot của {mapName}
                </a>
              </p>
            </div>
          )}

          <svg className="overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {note.routes.map((r, i) => (
              <g key={i} className="route" onClick={(e) => { if (tool === "erase") { e.stopPropagation(); removeRoute(i); } }}>
                <polyline points={pts(r)} className="casing" />
                <polyline points={pts(r)} className="line" />
              </g>
            ))}
            {draft.length > 0 && <polyline points={pts(draft)} className="draft" />}
          </svg>

          {draft.map((p, i) => (
            <span key={i} className="draft-dot" style={{ left: `${p.x}%`, top: `${p.y}%` }} />
          ))}

          {note.markers.map((m) => {
            const Icon = ICONS[m.type];
            return (
              <button
                key={m.id}
                type="button"
                className={`pin${selected === m.id ? " sel" : ""}`}
                style={{ left: `${m.x}%`, top: `${m.y}%`, "--c": TYPE[m.type].color } as React.CSSProperties}
                aria-label={`${TYPE[m.type].label} ${nums[m.id]}${m.label ? `: ${m.label}` : ""}`}
                onPointerDown={(e) => onMarkerDown(e, m.id)}
                onPointerMove={onMarkerMove}
                onPointerUp={() => onMarkerUp(m.id)}
                onClick={(e) => e.stopPropagation()}
              >
                <Icon size={15} strokeWidth={2.5} aria-hidden="true" />
                <i>{nums[m.id]}</i>
                {m.label && <span className="pin-label">{m.label}</span>}
              </button>
            );
          })}
        </div>

        <div className="row" style={{ marginTop: "1rem" }}>
          <button type="button" className="btn signal" onClick={exportPng}>
            <ImageDown size={16} aria-hidden="true" /> Xuất PNG
          </button>
          <button type="button" className="btn ghost" onClick={exportJson}>
            <FileDown size={16} aria-hidden="true" /> Xuất lộ trình (JSON)
          </button>
          <button type="button" className="btn ghost" onClick={() => jsonInput.current?.click()}>
            <FileUp size={16} aria-hidden="true" /> Nhập JSON
          </button>
          <input ref={jsonInput} type="file" accept="application/json,.json" hidden onChange={importJson} />
          <button type="button" className="linkbtn" onClick={clearAll}>
            <Trash2 size={13} aria-hidden="true" /> {confirmClear ? "Bấm lần nữa để xóa hết" : "Xóa hết trên bản đồ này"}
          </button>
        </div>

        {(note.markers.length > 0 || note.routes.length > 0) && (
          <div className="card" style={{ marginTop: "1.25rem" }}>
            <p className="kicker">Chú thích · {mapName}</p>
            <ul className="pinlist">
              {note.markers.map((m) => {
                const Icon = ICONS[m.type];
                return (
                  <li key={m.id} className={selected === m.id ? "sel" : undefined}>
                    <span className="pin static" style={{ "--c": TYPE[m.type].color } as React.CSSProperties} aria-hidden="true">
                      <Icon size={13} strokeWidth={2.5} />
                      <i>{nums[m.id]}</i>
                    </span>
                    <label className="sr-only" htmlFor={`label-${m.id}`}>
                      Ghi chú cho {TYPE[m.type].label} {nums[m.id]}
                    </label>
                    <input
                      id={`label-${m.id}`}
                      className="input"
                      placeholder={`${TYPE[m.type].label} ${nums[m.id]} — thêm ghi chú…`}
                      maxLength={60}
                      value={m.label}
                      onFocus={() => setSelected(m.id)}
                      onChange={(e) => setLabel(m.id, e.target.value)}
                    />
                    <button type="button" className="iconbtn-sm" onClick={() => removeMarker(m.id)} aria-label={`Xóa ${TYPE[m.type].label} ${nums[m.id]}`}>
                      <Trash2 size={16} />
                    </button>
                  </li>
                );
              })}
              {note.routes.map((r, i) => (
                <li key={`r${i}`}>
                  <span className="route-swatch" aria-hidden="true" />
                  <span>
                    Lộ trình {i + 1} <span className="muted">· {r.length} điểm</span>
                  </span>
                  <button type="button" className="iconbtn-sm" onClick={() => removeRoute(i)} aria-label={`Xóa lộ trình ${i + 1}`}>
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="note">
          Ảnh và lộ trình chỉ lưu trên trình duyệt này. Muốn gửi lộ trình cho anh em: <b>Xuất lộ trình (JSON)</b> → người nhận bấm <b>Nhập JSON</b> rồi tải ảnh bản đồ của họ lên, các điểm sẽ nằm đúng chỗ.
        </p>
      </section>
    </div>
  );
}
