import { useDeferredValue, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, Search, X } from "lucide-react";
import { LEVELS, TIP_CATS, TIPS, type Level, type TipCat } from "../data/tips";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");

const CAT_BY_KEY = Object.fromEntries(TIP_CATS.map((c) => [c.key, c])) as Record<TipCat, (typeof TIP_CATS)[number]>;

export default function TipsPage() {
  useDocumentTitle("Tips");
  const [params, setParams] = useSearchParams();
  const cat = (params.get("cat") as TipCat | null) ?? null;
  const level = Number(params.get("level")) as Level | 0;
  const [q, setQ] = useState("");
  const query = norm(useDeferredValue(q).trim());

  const setFilter = (key: "cat" | "level", value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const list = TIPS.filter(
    (t) => (!cat || t.cat === cat) && (!level || t.level === level) && (!query || norm(`${t.t} ${t.d}`).includes(query)),
  );

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="callsign">{TIPS.length} mẹo · lọc theo chủ đề và trình độ</p>
        <h1 className="small">
          Tips<span>thực chiến</span>
        </h1>
        <p className="lede">Bắt đầu với mẹo "Cơ bản". Khi thấy quen tay, chuyển dần sang "Trung cấp" rồi "Nâng cao".</p>
      </header>

      <section className="block">
        <div className="filters" role="group" aria-label="Chủ đề">
          <button type="button" className="chip" aria-pressed={!cat} onClick={() => setFilter("cat", null)}>
            <LayoutGrid size={15} aria-hidden="true" /> Tất cả
          </button>
          {TIP_CATS.map((c) => (
            <button key={c.key} type="button" className="chip" aria-pressed={cat === c.key} onClick={() => setFilter("cat", c.key)}>
              <c.icon size={15} aria-hidden="true" /> {c.label}
            </button>
          ))}
        </div>
        <div className="filters">
          <div className="segmented" role="group" aria-label="Trình độ">
            <button type="button" aria-pressed={!level} onClick={() => setFilter("level", null)}>
              Mọi cấp
            </button>
            {([1, 2, 3] as Level[]).map((l) => (
              <button key={l} type="button" aria-pressed={level === l} onClick={() => setFilter("level", String(l))}>
                {LEVELS[l].label}
              </button>
            ))}
          </div>
          <div className="searchbox">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="tip-q">Tìm mẹo</label>
            <input id="tip-q" className="input" type="search" placeholder="Tìm mẹo…" value={q} onChange={(e) => setQ(e.target.value)} />
            {q && (
              <button type="button" className="clear" onClick={() => setQ("")} aria-label="Xóa tìm kiếm">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        <p className="muted" aria-live="polite">
          Đang hiện {list.length} / {TIPS.length} mẹo
        </p>

        {list.length ? (
          <div>
            {list.map((t) => {
              const c = CAT_BY_KEY[t.cat];
              return (
                <article key={t.t} className="tip">
                  <span className="ico" aria-hidden="true">
                    <c.icon size={20} />
                  </span>
                  <h3>{t.t}</h3>
                  <div>
                    <div className="tags">
                      <span className={`tag ${LEVELS[t.level].cls}`}>{LEVELS[t.level].label}</span>
                      <span className="tag">{c.label}</span>
                    </div>
                    <p>{t.d}</p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="note">Không có mẹo nào khớp bộ lọc. Thử bỏ bớt điều kiện.</p>
        )}
      </section>
    </div>
  );
}
