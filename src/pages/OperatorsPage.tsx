import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { ROLE_QUIZ, ROLES, type RoleKey } from "../data/operators";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const DIFF = { 1: "Dễ", 2: "Vừa", 3: "Khó" } as const;
const DIFF_CLS = { 1: "low", 2: "mid", 3: "high" } as const;

function RolePicker() {
  const [answers, setAnswers] = useState<RoleKey[]>([]);
  const done = answers.length === ROLE_QUIZ.length;

  const result = (() => {
    if (!done) return null;
    const score = answers.reduce<Record<string, number>>((acc, r) => ({ ...acc, [r]: (acc[r] ?? 0) + 1 }), {});
    // Ties resolve toward the easier role, which suits a newcomer better.
    return [...ROLES].sort((a, b) => (score[b.key] ?? 0) - (score[a.key] ?? 0) || a.difficulty - b.difficulty)[0];
  })();

  if (result) {
    return (
      <div className="fade-in" aria-live="polite">
        <p className="kicker">Vai hợp với bạn</p>
        <p className="quiz-q">
          <result.icon size={30} className="ico-inline" aria-hidden="true" /> {result.name} <span className="muted">({result.en})</span>
        </p>
        <p>{result.fantasy}</p>
        <p className="muted">Gợi ý operator: {result.examples.map((e) => e.name).join(", ")}.</p>
        <div className="row">
          <a className="btn" href={`#${result.key}`}>Xem chi tiết vai</a>
          <button className="btn ghost" type="button" onClick={() => setAnswers([])}>
            <RotateCcw size={16} aria-hidden="true" /> Làm lại
          </button>
        </div>
      </div>
    );
  }

  const q = ROLE_QUIZ[answers.length];
  return (
    <div key={answers.length} className="fade-in">
      <p className="kicker">
        Câu {answers.length + 1} / {ROLE_QUIZ.length}
      </p>
      <p className="quiz-q">{q.q}</p>
      <div className="answers">
        {q.a.map((a) => (
          <button key={a.t} type="button" onClick={() => setAnswers([...answers, a.role])}>
            {a.t}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function OperatorsPage() {
  useDocumentTitle("Operator & vai trò");

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="callsign">4 nhóm vai trò · chọn 1 để gắn bó</p>
        <h1 className="small">
          Operator<span>& vai trò</span>
        </h1>
        <p className="lede">Người mới tiến bộ nhanh nhất khi chỉ luyện một vai và một khẩu súng trong tuần đầu.</p>
      </header>

      <section className="block" id="pick">
        <h2>Trắc nghiệm chọn vai</h2>
        <p className="sub">4 câu, 30 giây. Chọn đáp án gần với bạn nhất.</p>
        <div className="tool">
          <RolePicker />
        </div>
      </section>

      <section className="block">
        <h2>Bốn nhóm vai trò</h2>
        <p className="sub">Tên operator và kỹ năng có thể thay đổi theo mùa — đọc mô tả kỹ năng trong game trước khi chọn.</p>
        <div className="grid">
          {ROLES.map((r) => (
            <article key={r.key} id={r.key} className="card lift">
              <p className="kicker">
                <r.icon size={16} aria-hidden="true" /> {r.en}
              </p>
              <h3>{r.name}</h3>
              <div className="tags">
                <span className={`tag ${DIFF_CLS[r.difficulty]}`}>Độ khó: {DIFF[r.difficulty]}</span>
              </div>
              <p>{r.fantasy}</p>
              <p><b>Việc chính:</b></p>
              <ul>
                {r.job.map((j) => (
                  <li key={j}>{j}</li>
                ))}
              </ul>
              <p><b>Súng hợp:</b> {r.weapons}</p>
              <p><b>Ví dụ operator:</b></p>
              <ul>
                {r.examples.map((e) => (
                  <li key={e.name}>
                    <b>{e.name}</b> — <span className="muted">{e.note}</span>
                  </li>
                ))}
              </ul>
              <p className="protip">
                <b>Tránh: </b>
                {r.mistakes}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="block">
        <h2>Đội hình 3 người gợi ý</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Đội hình</th>
                <th>Hợp khi</th>
                <th>Lưu ý</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Tấn công · Trinh sát · Hỗ trợ</th>
                <td>Mặc định, cân bằng cho mọi bản đồ</td>
                <td>Trinh sát báo, Tấn công mở, Hỗ trợ giữ đội sống</td>
              </tr>
              <tr>
                <th scope="row">Trinh sát · Hỗ trợ · Kỹ sư</th>
                <td>Đội mới, chơi chậm, ưu tiên thoát</td>
                <td>Ít sát thương mở màn — tránh giao tranh chủ động</td>
              </tr>
              <tr>
                <th scope="row">2 Tấn công · Hỗ trợ</th>
                <td>Đội tay vững, bản đồ cận chiến</td>
                <td>Dễ bị đánh úp vì thiếu thông tin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
