import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarCheck, Map as MapIcon, Shield, Sparkles, Wrench, TrendingUp, BadgeHelp, type LucideIcon } from "lucide-react";
import { DAYS } from "../data/days";
import { MODES } from "../data/basics";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useProgress } from "../hooks/useProgress";

const TILES: { to: string; ico: LucideIcon; t: string; d: string }[] = [
  { to: "/plan", ico: CalendarCheck, t: "Lộ trình 7 ngày", d: "Mỗi ngày 2–3 tiếng, làm theo thứ tự, đánh dấu từng bước." },
  { to: "/basics", ico: BookOpen, t: "Kiến thức cơ bản", d: "Ba chế độ chơi, quy tắc sống sót, lỗi hay gặp, từ điển thuật ngữ." },
  { to: "/maps", ico: MapIcon, t: "Bản đồ", d: "Bản đồ nào hợp người mới, học gì trước, tránh chỗ nào." },
  { to: "/meta", ico: TrendingUp, t: "Meta theo mùa", d: "Bảng xếp hạng súng, thay đổi đáng chú ý và súng tân binh nên độ trước." },
  { to: "/operators", ico: Shield, t: "Operator & vai trò", d: "Bốn nhóm vai trò và trắc nghiệm chọn vai hợp với bạn." },
  { to: "/tips", ico: Sparkles, t: "Tips từ cơ bản đến nâng cao", d: "Bắn, di chuyển, âm thanh, kinh tế, đồng đội — lọc theo trình độ." },
  { to: "/tools", ico: Wrench, t: "Công cụ", d: "Nhật ký raid, máy tính loadout, checklist trước khi vào trận." },
  { to: "/quiz", ico: BadgeHelp, t: "Kiểm tra tân binh", d: "12 câu hỏi nhanh xem bạn đã sẵn sàng vào Operations chưa." },
];

export default function HomePage() {
  useDocumentTitle();
  const { stats } = useProgress();
  const started = stats.doneCount > 0;
  const next = DAYS[stats.nextDay];

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="callsign">Hướng dẫn tân binh team WP · PC &amp; Mobile</p>
        <h1>
          Delta Force<span>từ số 0</span>
        </h1>
        <p className="lede">
          Lộ trình 7 ngày, kiến thức nền, tips thực chiến và công cụ theo dõi tiến bộ — để tuần đầu của bạn bớt mất đồ và nhiều trận thoát hơn.
        </p>
        <div className="progress" aria-live="polite">
          <div className="bar" role="progressbar" aria-label="Tiến độ 7 ngày" aria-valuemin={0} aria-valuemax={100} aria-valuenow={stats.pct}>
            <i style={{ width: `${stats.pct}%` }} />
          </div>
          <strong>
            {stats.doneCount} / {stats.total} bước
          </strong>
        </div>
        <div className="row" style={{ marginTop: "1.25rem" }}>
          <Link className="btn signal" to="/plan">
            {stats.finished ? "Xem lại lộ trình" : started ? `Tiếp tục ngày ${stats.nextDay + 1}: ${next.title}` : "Bắt đầu ngày 1"} <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link className="btn ghost" to="/basics">
            Đọc kiến thức cơ bản
          </Link>
        </div>
      </header>

      <section className="block">
        <h2>Bắt đầu từ đâu</h2>
        <p className="sub">Mới tải game? Đọc 3 dòng dưới, rồi vào lộ trình ngày 1.</p>
        <div className="rules">
          <div className="rule">
            <h3><span className="n">01</span>Warfare để học</h3>
            <p>Chết không mất gì. Luyện súng, độ giật, bản đồ ở đây trước.</p>
          </div>
          <div className="rule">
            <h3><span className="n">02</span>Operations để kiếm</h3>
            <p>Chết là mất đồ. Chỉ mang thứ dám mất, ưu tiên sống và thoát.</p>
          </div>
          <div className="rule">
            <h3><span className="n">03</span>Đi cùng anh em</h3>
            <p>Operations thiết kế cho đội 3 người. Rủ thành viên <code>WP | ...</code> đi chung.</p>
          </div>
        </div>
      </section>

      <section className="block">
        <h2>Mọi thứ trong trang</h2>
        <div className="tiles">
          {TILES.map((t) => (
            <Link key={t.to} to={t.to} className="tile">
              <span className="ico" aria-hidden="true"><t.ico size={22} /></span>
              <h3>{t.t}</h3>
              <p>{t.d}</p>
              <span className="go" aria-hidden="true">Mở <ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="block">
        <h2>Ba chế độ trong một phút</h2>
        <div className="grid">
          {MODES.map((m) => (
            <div key={m.name} className="card">
              <p className="kicker">Rủi ro: <span className={m.risk}>{m.riskLabel}</span></p>
              <h3>{m.name}</h3>
              <p className="muted">{m.style}</p>
              <p><b>Hợp để:</b> {m.bestFor}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
