import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, RotateCcw, Trophy, X } from "lucide-react";
import { QUIZ } from "../data/quiz";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useLocalStorage } from "../hooks/useLocalStorage";

function verdict(score: number) {
  const pct = score / QUIZ.length;
  if (pct >= 0.9) return { cls: "ok", text: "Xuất sắc — bạn đã sẵn sàng cho Operations. Rủ anh em đi đội thôi!" };
  if (pct >= 0.7) return { cls: "warn", text: "Khá ổn. Đọc lại các câu sai rồi vào trận nhé." };
  return { cls: "bad", text: "Nên đọc lại trang Kiến thức cơ bản trước khi mang đồ vào Operations." };
}

export default function QuizPage() {
  useDocumentTitle("Kiểm tra tân binh");
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useLocalStorage<number>("df-quiz-best", 0);
  const finished = i >= QUIZ.length;

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === QUIZ[i].answer) setScore((s) => s + 1);
  };
  const next = () => {
    const last = i + 1 >= QUIZ.length;
    if (last) setBest((b) => Math.max(b, score));
    setI(i + 1);
    setPicked(null);
  };
  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
  };

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="callsign">{QUIZ.length} câu · kỷ lục của bạn: {best}/{QUIZ.length}</p>
        <h1 className="small">
          Kiểm tra<span>tân binh</span>
        </h1>
        <p className="lede">Trả lời đúng từ 9 câu trở lên là bạn đã nắm được những điều quan trọng nhất.</p>
      </header>

      <section className="block">
        <div className="tool" aria-live="polite">
          {finished ? (
            <div className="fade-in">
              <Trophy size={40} className="bigicon" aria-hidden="true" />
              <p className="quiz-q">
                Bạn đúng {score} / {QUIZ.length} câu
              </p>
              <p className={`verdict ${verdict(score).cls}`}>{verdict(score).text}</p>
              <div className="row" style={{ marginTop: "1rem" }}>
                <button type="button" className="btn" onClick={restart}>
                  <RotateCcw size={16} aria-hidden="true" /> Làm lại
                </button>
                <Link className="btn ghost" to="/basics">
                  Ôn kiến thức cơ bản
                </Link>
              </div>
            </div>
          ) : (
            <div key={i} className="fade-in">
              <div className="bar" aria-hidden="true" style={{ marginBottom: "1rem" }}>
                <i style={{ width: `${(i / QUIZ.length) * 100}%` }} />
              </div>
              <p className="kicker">
                Câu {i + 1} / {QUIZ.length} · Đúng {score}
              </p>
              <p className="quiz-q">{QUIZ[i].q}</p>
              <div className="answers">
                {QUIZ[i].options.map((o, idx) => {
                  const isRight = idx === QUIZ[i].answer;
                  const cls = picked === null ? undefined : isRight ? "right" : idx === picked ? "wrong" : undefined;
                  return (
                    <button key={o} type="button" className={cls} disabled={picked !== null} onClick={() => choose(idx)}>
                      <span className="row" style={{ gap: ".5rem", flexWrap: "nowrap" }}>
                        {cls === "right" && <Check size={18} aria-label="Đúng" />}
                        {cls === "wrong" && <X size={18} aria-label="Sai" />}
                        {o}
                      </span>
                    </button>
                  );
                })}
              </div>
              {picked !== null && (
                <div className="fade-in">
                  <p className={`verdict ${picked === QUIZ[i].answer ? "ok" : "bad"}`}>
                    {picked === QUIZ[i].answer ? "Chính xác! " : "Chưa đúng. "}
                    <span style={{ fontWeight: 400 }}>{QUIZ[i].why}</span>
                  </p>
                  <button type="button" className="btn" style={{ marginTop: "1rem" }} onClick={next} autoFocus>
                    {i + 1 < QUIZ.length ? "Câu tiếp" : "Xem kết quả"} <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
