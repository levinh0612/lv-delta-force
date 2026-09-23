import { useDeferredValue, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { DONTS, GLOSSARY, MODES, RULES } from "../data/basics";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");

export default function BasicsPage() {
  useDocumentTitle("Kiến thức cơ bản");
  const [q, setQ] = useState("");
  const query = norm(useDeferredValue(q).trim());
  const terms = query ? GLOSSARY.filter((g) => norm(`${g.term} ${g.vi ?? ""} ${g.def}`).includes(query)) : GLOSSARY;

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="callsign">Kiến thức nền · đọc một lần, dùng cả mùa</p>
        <h1 className="small">
          Kiến thức<span>cơ bản</span>
        </h1>
        <p className="lede">Hiểu những điều này trước khi lo meta súng hay build nâng cao.</p>
      </header>

      <section className="block" id="modes">
        <h2>Ba chế độ, khác nhau chỗ nào</h2>
        <p className="sub">Chọn đúng chế độ cho đúng mục đích: học, kiếm tiền, hay giải trí.</p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Chế độ</th>
                <th>Kiểu chơi</th>
                <th>Khi chết</th>
                <th>Rủi ro</th>
              </tr>
            </thead>
            <tbody>
              {MODES.map((m) => (
                <tr key={m.name}>
                  <th scope="row">{m.name}</th>
                  <td>{m.style}</td>
                  <td>{m.death}</td>
                  <td className={`risk ${m.risk}`}>{m.riskLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="block" id="rules">
        <h2>Quy tắc sống sót ở Operations</h2>
        <p className="sub">Chế độ khiến người mới bỏ game nhiều nhất. Nhớ mấy điều này.</p>
        <div className="rules">
          {RULES.map((r, i) => (
            <div className="rule" key={r.t}>
              <h3>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                {r.t}
              </h3>
              <p>{r.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="block" id="donts">
        <h2>Những lỗi người mới hay mắc</h2>
        <p className="sub">Và cách sửa cho từng lỗi.</p>
        <ul className="donts">
          {DONTS.map((d) => (
            <li key={d.t}>
              <b>{d.t}</b>
              {d.d}
              <span className="fix"><ArrowRight size={15} aria-hidden="true" /> {d.fix}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="block" id="glossary">
        <h2>Từ ngữ sẽ gặp</h2>
        <p className="sub">Nghe anh em nói "wipe", "third party", "pen" mà chưa hiểu? Tra ở đây.</p>
        <div className="filters">
          <label className="sr-only" htmlFor="gloss-q">Tìm thuật ngữ</label>
          <div className="searchbox">
          <Search size={18} aria-hidden="true" />
          <input
            id="gloss-q"
            className="input"
            type="search"
            placeholder="Tìm thuật ngữ… (vd: giap, extract)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q && (
            <button type="button" className="clear" onClick={() => setQ("")} aria-label="Xóa tìm kiếm">
              <X size={16} />
            </button>
          )}
          </div>
          <span className="muted" aria-live="polite">
            {terms.length} / {GLOSSARY.length} từ
          </span>
        </div>
        {terms.length ? (
          <dl className="gloss">
            {terms.map((g) => (
              <div key={g.term} style={{ display: "contents" }}>
                <dt>
                  {g.term}
                  {g.vi && <small>{g.vi}</small>}
                </dt>
                <dd>{g.def}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="muted">Không tìm thấy. Hỏi thẳng trong nhóm WP nhé!</p>
        )}
        <p className="note">
          Game cập nhật theo mùa: tên bản đồ, súng mạnh và sự kiện có thể thay đổi. Xem thông báo trong game và kênh chính thức để biết mùa hiện tại.
        </p>
      </section>
    </div>
  );
}
