import { Link } from "react-router-dom";
import { MAPS } from "../data/maps";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function Meter({ value, label }: { value: number; label: string }) {
  return (
    <span className="meter" role="img" aria-label={`${label}: ${value}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <i key={n} className={n <= value ? "on" : undefined} />
      ))}
    </span>
  );
}

export default function MapsPage() {
  useDocumentTitle("Bản đồ");

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="callsign">Operations · học đường là sống</p>
        <h1 className="small">
          Bản đồ<span>Operations</span>
        </h1>
        <p className="lede">Sắp xếp từ dễ tới khó cho người mới. Học xong một bản đồ rồi mới sang bản đồ tiếp theo.</p>
      </header>

      <section className="block">
        <h2>Cách học một bản đồ mới</h2>
        <div className="rules">
          <div className="rule">
            <h3><span className="n">01</span>Đi dạo</h3>
            <p>Một trận với đồ rẻ nhất, không đánh nhau, chỉ đi vòng quanh và nhớ điểm di tản.</p>
          </div>
          <div className="rule">
            <h3><span className="n">02</span>Một lộ trình</h3>
            <p>Xuất phát → 2–3 điểm loot vừa phải → điểm di tản gần nhất. Lặp lại cho tới khi thuộc.</p>
          </div>
          <div className="rule">
            <h3><span className="n">03</span>Mở rộng dần</h3>
            <p>Thoát đều 2/3 trận mới thêm khu mới hoặc tăng độ khó. Chỉ đổi một thứ mỗi lần.</p>
          </div>
        </div>
      </section>

      <section className="block">
        <h2>Các bản đồ</h2>
        <p className="sub">Tên và bố cục có thể thay đổi theo mùa — luôn đối chiếu bản đồ trong game.</p>
        <div className="grid">
          {MAPS.map((m, i) => (
            <article key={m.id} id={m.id} className="card lift">
              <p className="kicker">#{i + 1} · {m.vibe}</p>
              <h3>{m.name}</h3>
              <div className="statline">
                <span className="muted">Hợp người mới</span>
                <Meter value={m.newbie} label="Mức độ phù hợp người mới" />
                <span className="muted">Tầm giao tranh</span>
                <span>{m.range}</span>
              </div>
              <p>{m.summary}</p>
              <p><b>Học trước:</b></p>
              <ul>
                {m.learnFirst.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p><b>Mẹo:</b></p>
              <ul>
                {m.tips.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="note">
          Ghi lại từng trận ở <Link to="/tools#raidlog">nhật ký raid</Link> để xem bạn thoát tốt nhất ở bản đồ nào.
        </p>
      </section>
    </div>
  );
}
