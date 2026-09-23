import { useState, type FormEvent } from "react";
import { Calculator, ClipboardCheck, NotebookPen, Plus, RotateCcw, Trash2, TrendingUp } from "lucide-react";
import { MAPS } from "../data/maps";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRaidLog } from "../hooks/useRaidLog";
import { money, netOf, readiness, rebuyTimes, signed } from "../lib/raids";

/* ---------- Pre-raid checklist ---------- */

const CHECKS = [
  "Loadout là đồ dám mất",
  "Đạn đủ (thêm 1 băng dự phòng)",
  "Có băng gạc + đồ hồi máu",
  "Két an toàn đang trống để cất đồ quý",
  "Đã xem điểm di tản chính + dự phòng",
  "Đã chọn lộ trình loot",
  "Tai nghe đã đeo, voice đội đã vào",
  "Thống nhất ai quyết định lúc di tản",
];

function Checklist() {
  const [done, setDone] = useLocalStorage<boolean[]>("df-checklist", []);
  const count = CHECKS.filter((_, i) => done[i]).length;
  return (
    <div className="tool" id="checklist">
      <h2>
        <ClipboardCheck size={26} aria-hidden="true" /> Checklist trước raid
      </h2>
      <p className="muted">Tích hết trước khi bấm vào trận Operations. Tỉ lệ thoát sẽ khác hẳn.</p>
      <ul className="checklist">
        {CHECKS.map((c, i) => (
          <li key={c}>
            <label>
              <input
                type="checkbox"
                checked={!!done[i]}
                onChange={(e) => {
                  const next = [...done];
                  next[i] = e.target.checked;
                  setDone(next);
                }}
              />
              <span>{c}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="row">
        <strong className={count === CHECKS.length ? "low" : undefined}>
          {count === CHECKS.length ? "Sẵn sàng — xuất kích!" : `${count} / ${CHECKS.length} mục`}
        </strong>
        <button type="button" className="linkbtn" onClick={() => setDone([])}>
          <RotateCcw size={13} aria-hidden="true" /> Bỏ tích cho raid tiếp theo
        </button>
      </div>
    </div>
  );
}

/* ---------- Loadout calculator ---------- */

const PARTS = [
  { key: "gun", label: "Súng + phụ kiện" },
  { key: "ammo", label: "Đạn" },
  { key: "armor", label: "Giáp" },
  { key: "helmet", label: "Mũ" },
  { key: "bag", label: "Balo / áo chiến thuật" },
  { key: "meds", label: "Hồi máu, lựu đạn" },
] as const;

function LoadoutCalc() {
  const [v, setV] = useLocalStorage<Record<string, number>>("df-loadout", {});
  const cost = PARTS.reduce((s, p) => s + (v[p.key] || 0), 0);
  const stash = v.stash || 0;
  const times = rebuyTimes(stash, cost);
  const target = cost * 3;
  const state = !cost ? null : times >= 3 ? "ok" : times >= 2 ? "warn" : "bad";

  const num = (key: string, label: string) => (
    <label className="field" key={key}>
      <span>{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        step={1000}
        placeholder="0"
        value={v[key] || ""}
        onChange={(e) => setV({ ...v, [key]: Math.max(0, Number(e.target.value) || 0) })}
      />
    </label>
  );

  return (
    <div className="tool" id="loadout">
      <h2>
        <Calculator size={26} aria-hidden="true" /> Máy tính loadout
      </h2>
      <p className="muted">Nhập giá từng món (Havoc Coins). Quy tắc: tiền trong kho đủ mua lại bộ này ít nhất 3 lần.</p>
      <div className="formgrid">{PARTS.map((p) => num(p.key, p.label))}</div>
      <div className="formgrid">{num("stash", "Tiền đang có trong kho")}</div>
      <div className="stats">
        <div className="stat">
          <b>{money(cost)}</b>
          <span>Vé vào cửa mỗi trận</span>
        </div>
        <div className="stat">
          <b>{cost ? `${times}×` : "–"}</b>
          <span>Số lần mua lại được</span>
        </div>
        <div className="stat">
          <b>{money(target)}</b>
          <span>Kho tối thiểu nên có</span>
        </div>
      </div>
      {state && (
        <p className={`verdict ${state}`}>
          {state === "ok" && "Ổn định. Loadout này an toàn với kho hiện tại."}
          {state === "warn" && `Hơi mạo hiểm. Cần thêm ${money(target - stash)} hoặc hạ loadout xuống.`}
          {state === "bad" && `Quá đắt so với kho. Hạ loadout xuống khoảng ${money(stash / 3)} mỗi trận.`}
        </p>
      )}
    </div>
  );
}

/* ---------- Raid log ---------- */

const READY = {
  "not-enough-data": { cls: "warn", text: "Ghi ít nhất 5 trận để có đánh giá." },
  ready: { cls: "ok", text: "Sẵn sàng lên cấp: thoát ≥ 50% và có lời trong 10 trận gần nhất." },
  almost: { cls: "warn", text: "Gần được rồi. Chơi thêm vài trận ở độ khó hiện tại." },
  "not-ready": { cls: "bad", text: "Chưa nên lên độ khó cao. Lặp lại ngày 3–5, ưu tiên sống và thoát." },
} as const;

function RaidLog() {
  const { raids, add, remove, clear, stats } = useRaidLog();
  const [map, setMap] = useState(MAPS[0].name);
  const [extracted, setExtracted] = useState(true);
  const [costIn, setCostIn] = useState("");
  const [valueOut, setValueOut] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const r = READY[readiness(stats)];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    add({ map, extracted, costIn: Number(costIn) || 0, valueOut: Number(valueOut) || 0 });
    setValueOut("");
  };

  return (
    <div className="tool" id="raidlog">
      <h2>
        <NotebookPen size={26} aria-hidden="true" /> Nhật ký raid
      </h2>
      <p className="muted">Ghi mỗi trận Operations. Trang tự tính tỉ lệ thoát, lời/lỗ và cho biết bạn đã sẵn sàng lên độ khó cao chưa.</p>

      <form onSubmit={submit}>
        <div className="formgrid">
          <label className="field">
            <span>Bản đồ</span>
            <select value={map} onChange={(e) => setMap(e.target.value)}>
              {MAPS.map((m) => (
                <option key={m.id}>{m.name}</option>
              ))}
            </select>
          </label>
          <div className="field">
            <span id="res-label">Kết quả</span>
            <div className="segmented" role="group" aria-labelledby="res-label">
              <button type="button" aria-pressed={extracted} onClick={() => setExtracted(true)}>
                Thoát
              </button>
              <button type="button" aria-pressed={!extracted} onClick={() => setExtracted(false)}>
                Chết
              </button>
            </div>
          </div>
          <label className="field">
            <span>Giá trị mang vào</span>
            <input type="number" inputMode="numeric" min={0} placeholder="0" value={costIn} onChange={(e) => setCostIn(e.target.value)} />
          </label>
          <label className="field">
            <span>{extracted ? "Giá trị mang ra" : "Giữ được (két an toàn)"}</span>
            <input type="number" inputMode="numeric" min={0} placeholder="0" value={valueOut} onChange={(e) => setValueOut(e.target.value)} />
          </label>
        </div>
        <button type="submit" className="btn">
          <Plus size={16} aria-hidden="true" /> Thêm trận
        </button>
      </form>

      <div className="stats" style={{ marginTop: "1.25rem" }}>
        <div className="stat">
          <b>{stats.count}</b>
          <span>Tổng số raid</span>
        </div>
        <div className="stat">
          <b>{stats.count ? `${Math.round(stats.extractRate * 100)}%` : "–"}</b>
          <span>Tỉ lệ thoát</span>
        </div>
        <div className="stat">
          <b className={stats.net >= 0 ? "pos" : "neg"}>{signed(stats.net)}</b>
          <span>Lời / lỗ tổng</span>
        </div>
        <div className="stat">
          <b>{stats.recentCount ? `${Math.round(stats.recentRate * 100)}%` : "–"}</b>
          <span>Thoát 10 trận gần nhất</span>
        </div>
        <div className="stat">
          <b>{stats.streak.length || "–"}</b>
          <span>{stats.streak.kind === "death" ? "Trận chết liên tiếp" : "Trận thoát liên tiếp"}</span>
        </div>
      </div>

      <p className={`verdict ${r.cls}`}>
        <TrendingUp size={18} aria-hidden="true" style={{ verticalAlign: "-3px", marginRight: 6 }} />
        {r.text}
      </p>

      {stats.byMap.length > 0 && (
        <div className="table-scroll" style={{ marginTop: "1rem" }}>
          <table style={{ minWidth: 420 }}>
            <thead>
              <tr>
                <th>Bản đồ</th>
                <th>Số raid</th>
                <th>Thoát</th>
                <th>Lời / lỗ</th>
              </tr>
            </thead>
            <tbody>
              {stats.byMap.map((m) => (
                <tr key={m.map}>
                  <th scope="row">{m.map}</th>
                  <td>{m.count}</td>
                  <td>{Math.round(m.rate * 100)}%</td>
                  <td className={m.net >= 0 ? "pos" : "neg"}>{signed(m.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {raids.length > 0 && (
        <>
          <ul className="loglist" aria-label="Các trận đã ghi">
            {raids.map((raid) => (
              <li key={raid.id}>
                <span className={`pill ${raid.extracted ? "ok" : "ko"}`}>{raid.extracted ? "Thoát" : "Chết"}</span>
                <span>
                  {raid.map}
                  <span className="muted"> · {new Date(raid.at).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}</span>
                </span>
                <span className={netOf(raid) >= 0 ? "pos" : "neg"}>{signed(netOf(raid))}</span>
                <button type="button" className="iconbtn-sm" onClick={() => remove(raid.id)} aria-label={`Xóa trận ${raid.map}`}>
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="linkbtn"
            style={{ marginTop: ".75rem" }}
            onClick={() => {
              if (confirmClear) {
                clear();
                setConfirmClear(false);
              } else {
                setConfirmClear(true);
                window.setTimeout(() => setConfirmClear(false), 4000);
              }
            }}
          >
            <Trash2 size={13} aria-hidden="true" /> {confirmClear ? "Bấm lần nữa để xóa hết" : "Xóa toàn bộ nhật ký"}
          </button>
        </>
      )}
    </div>
  );
}

export default function ToolsPage() {
  useDocumentTitle("Công cụ");
  return (
    <div className="fade-in">
      <header className="hero">
        <p className="callsign">Dữ liệu chỉ lưu trên trình duyệt của bạn</p>
        <h1 className="small">
          Công cụ<span>tân binh</span>
        </h1>
        <p className="lede">Ba công cụ nhỏ giúp bạn chơi Operations có kỷ luật: chuẩn bị, tính tiền, và đo tiến bộ.</p>
      </header>
      <section className="block">
        <Checklist />
        <LoadoutCalc />
        <RaidLog />
      </section>
    </div>
  );
}
