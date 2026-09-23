import type { MouseEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CalendarRange, FilePenLine, History, RefreshCw } from "lucide-react";
import { SEASONS } from "../lib/seasons";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const fmtDate = (iso?: string) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) : "–";

function daysLeft(end?: string): number | null {
  if (!end) return null;
  const ms = new Date(`${end}T23:59:59`).getTime() - Date.now();
  return Math.ceil(ms / 86_400_000);
}

const EDIT_URL = "https://github.com/levinh0612/lv-delta-force/tree/main/content/meta";

export default function MetaPage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const season = SEASONS.find((s) => s.slug === params.get("s")) ?? SEASONS[0];
  useDocumentTitle(season ? `Meta ${season.season} ${season.title}` : "Meta theo mùa");

  // Markdown links marked data-internal go through the router instead of a full reload.
  const onContentClick = (e: MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest("a[data-internal]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    navigate(a.getAttribute("href")!);
  };

  if (!season) {
    return (
      <header className="hero">
        <h1 className="small">Chưa có dữ liệu meta</h1>
        <p className="lede">Thêm file Markdown vào content/meta để bắt đầu.</p>
      </header>
    );
  }

  const left = daysLeft(season.end);
  const isLatest = season === SEASONS[0];

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="callsign">
          Meta theo mùa · {season.season}
          {isLatest && " · mùa hiện tại"}
        </p>
        <h1 className="small">
          {season.title}
          <span>meta {season.season}</span>
        </h1>
        {season.summary && <p className="lede">{season.summary}</p>}
        <div className="meta-row">
          <span className="goal">
            <CalendarRange size={15} aria-hidden="true" style={{ verticalAlign: "-2px" }} /> {fmtDate(season.start)} → {fmtDate(season.end)}
          </span>
          {left !== null && left > 0 && isLatest && <span className="goal">Còn {left} ngày</span>}
          {season.updated && (
            <span className="goal">
              <RefreshCw size={14} aria-hidden="true" style={{ verticalAlign: "-2px" }} /> Cập nhật {fmtDate(season.updated)}
            </span>
          )}
        </div>
        {SEASONS.length > 1 && (
          <div className="filters" style={{ marginTop: "1.25rem", marginBottom: 0 }}>
            <History size={18} aria-hidden="true" className="muted" />
            <label className="sr-only" htmlFor="season-pick">Chọn mùa</label>
            <select
              id="season-pick"
              className="input"
              style={{ width: "auto" }}
              value={season.slug}
              onChange={(e) => setParams({ s: e.target.value }, { replace: true })}
            >
              {SEASONS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.season} · {s.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </header>

      {season.toc.length > 1 && (
        <nav className="toc" aria-label="Mục lục">
          {season.toc.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="chip">
              {t.text}
            </a>
          ))}
        </nav>
      )}

      {/* Content comes from our own repo's Markdown files, rendered at build time. */}
      <div className="prose" onClick={onContentClick} dangerouslySetInnerHTML={{ __html: season.html }} />

      <p className="note">
        Meta thay đổi sau mỗi bản cân bằng. Chơi khẩu bạn bắn tốt nhất luôn hơn chạy theo khẩu đang hot.{" "}
        <a href={EDIT_URL} target="_blank" rel="noopener noreferrer">
          <FilePenLine size={14} aria-hidden="true" style={{ verticalAlign: "-2px" }} /> Sửa nội dung trên GitHub
        </a>
      </p>
    </div>
  );
}
