import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ClipboardCopy, Clock, Download, RotateCcw, Upload } from "lucide-react";
import { DAYS, ROADMAP, stepKey } from "../data/days";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PROGRESS_KEY, useProgress, type Progress } from "../hooks/useProgress";
import { useRaidLog } from "../hooks/useRaidLog";
import { useToast } from "../hooks/useToast";

export default function PlanPage() {
  useDocumentTitle("Lộ trình 7 ngày");
  const { state, setState, toggle, setDay, reset, stats } = useProgress();
  const { stats: raidStats } = useRaidLog();
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const [confirmReset, setConfirmReset] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const daysNavRef = useRef<HTMLElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Deep link: /plan?day=3
  useEffect(() => {
    const d = Number(params.get("day"));
    if (d >= 1 && d <= DAYS.length) {
      setDay(d - 1);
      params.delete("day");
      setParams(params, { replace: true });
    }
  }, [params, setParams, setDay]);

  const current = Math.min(Math.max(state.day | 0, 0), DAYS.length - 1);
  const day = DAYS[current];
  const dayStats = stats.perDay[current];

  const go = (i: number, focus = false) => {
    setDay(i);
    if (focus) tabsRef.current[i]?.focus();
  };
  const onTabKey = (e: KeyboardEvent, i: number) => {
    const n = DAYS.length;
    const map: Record<string, number> = { ArrowRight: (i + 1) % n, ArrowLeft: (i + n - 1) % n, Home: 0, End: n - 1 };
    if (e.key in map) {
      e.preventDefault();
      go(map[e.key], true);
    }
  };
  const nextDay = () => {
    go(current + 1);
    daysNavRef.current?.scrollIntoView({ block: "start" });
  };

  const doReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      window.setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    reset();
    setConfirmReset(false);
    toast("Đã xóa tiến độ");
  };

  const exportProgress = () => {
    const blob = new Blob([JSON.stringify({ key: PROGRESS_KEY, ...state }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "delta-force-tien-do.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importProgress = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const data = JSON.parse(await file.text()) as Partial<Progress>;
      if (!data.done || typeof data.done !== "object") throw new Error("invalid");
      setState({ done: data.done, day: Number(data.day) || 0 });
      toast("Đã nhập tiến độ");
    } catch {
      toast("File không hợp lệ");
    }
  };

  const copyReport = async () => {
    const lines = [
      `[Delta Force · Báo cáo tuần 1]`,
      `Tiến độ: ${stats.doneCount}/${stats.total} bước (${stats.pct}%)`,
      raidStats.count
        ? `Operations: ${raidStats.count} raid, thoát ${Math.round(raidStats.extractRate * 100)}%`
        : `Operations: chưa ghi nhật ký raid`,
      `Hay chết vì: …`,
      `Operator/súng hợp tay: …`,
      `Mục tiêu tuần 2: …`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      toast("Đã sao chép báo cáo — dán vào nhóm WP");
    } catch {
      toast("Không sao chép được");
    }
  };

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="callsign">Lộ trình tân binh · mỗi ngày 2–3 tiếng</p>
        <h1 className="small">
          7 ngày đầu<span>ở Delta Force</span>
        </h1>
        <p className="lede">Làm theo thứ tự. Đánh dấu từng bước khi xong, tiến độ được nhớ trên trình duyệt này.</p>
        <div className="progress" aria-live="polite">
          <div className="bar" role="progressbar" aria-label="Tiến độ 7 ngày" aria-valuemin={0} aria-valuemax={100} aria-valuenow={stats.pct}>
            <i style={{ width: `${stats.pct}%` }} />
          </div>
          <strong>
            {stats.doneCount} / {stats.total} bước
          </strong>
          <button className="linkbtn" type="button" onClick={doReset}>
            <RotateCcw size={13} aria-hidden="true" /> {confirmReset ? "Bấm lần nữa để xóa" : "Làm lại từ đầu"}
          </button>
        </div>
      </header>

      <nav className="days" aria-label="Chọn ngày" ref={daysNavRef}>
        <div className="daybar" role="tablist">
          {DAYS.map((d, i) => {
            const ps = stats.perDay[i];
            return (
              <button
                key={d.title}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`tab-d${i}`}
                aria-controls={`panel-d${i}`}
                aria-selected={i === current}
                aria-label={`Ngày ${i + 1}: ${d.title}${ps.complete ? " (đã xong)" : ""}`}
                tabIndex={i === current ? 0 : -1}
                onClick={() => go(i)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {ps.complete && <Check className="check" size={14} strokeWidth={3} aria-hidden="true" />}
                <b>{i + 1}</b>
                <small>{d.short}</small>
                <span className="pip" style={{ transform: `scaleX(${ps.done / ps.total})` }} />
              </button>
            );
          })}
        </div>
      </nav>

      <section id={`panel-d${current}`} role="tabpanel" aria-labelledby={`tab-d${current}`} key={current} className="fade-in">
        <div className="day-head">
          <p className="num">
            Ngày {current + 1} / {DAYS.length}
          </p>
          <h2>{day.title}</h2>
          <p>{day.intro}</p>
          <div className="meta-row">
            <span className="goal">
              <em>Mục tiêu hôm nay: </em>
              {day.goal}
            </span>
            <span className="goal">
              <em>Thời lượng: </em>
              {day.hours}
            </span>
          </div>
        </div>

        <ol className="steps">
          {day.steps.map((s, idx) => {
            const key = stepKey(current, s.id);
            const on = !!state.done[key];
            return (
              <li key={key} className={on ? "done" : undefined}>
                <span className="dot" aria-hidden="true">
                  {on ? <Check size={18} strokeWidth={3} /> : idx + 1}
                </span>
                <label className="step-head">
                  <input type="checkbox" checked={on} onChange={(e) => toggle(key, e.target.checked)} />
                  <div>
                    <h3>{s.title}</h3>
                    <span className="time"><Clock size={14} aria-hidden="true" /> {s.time}</span>
                  </div>
                </label>
                <div className="step-body">
                  {s.body}
                  {s.tip && (
                    <div className="protip">
                      <b>Mẹo: </b>
                      {s.tip}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {dayStats.complete && (
          <p className="day-done" role="status">
            Xong ngày {current + 1}. {current < DAYS.length - 1 ? "Nghỉ ngơi, mai tiếp." : "Chúc mừng, bạn đã hoàn thành tuần đầu!"}
          </p>
        )}
        <div className="day-nav">
          {current > 0 && (
            <button className="btn ghost" type="button" onClick={() => go(current - 1)}>
              <ArrowLeft size={16} aria-hidden="true" /> Ngày {current}
            </button>
          )}
          {current < DAYS.length - 1 ? (
            <button className="btn" type="button" onClick={nextDay}>
              Sang ngày {current + 2} <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <button className="btn signal" type="button" onClick={copyReport}>
              <ClipboardCopy size={16} aria-hidden="true" /> Sao chép báo cáo
            </button>
          )}
        </div>
      </section>

      <section className="block" id="roadmap">
        <h2>Sau tuần đầu thì sao?</h2>
        <p className="sub">Gợi ý lộ trình tuần 2–4. Mỗi tuần chỉ đặt một mục tiêu chính.</p>
        <div className="roadmap">
          {ROADMAP.map((r) => (
            <div key={r.title}>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </div>
          ))}
        </div>
        <p className="note">
          Muốn biết mình sẵn sàng lên độ khó cao chưa? Ghi các trận vào <Link to="/tools#raidlog">nhật ký raid</Link> — trang sẽ tự đánh giá.
        </p>
      </section>

      <section className="block">
        <h2>Sao lưu tiến độ</h2>
        <p className="sub">Tiến độ nằm trong trình duyệt. Xuất ra file để chuyển sang máy khác hoặc điện thoại.</p>
        <div className="row">
          <button className="btn ghost" type="button" onClick={exportProgress}>
            <Download size={16} aria-hidden="true" /> Xuất file
          </button>
          <button className="btn ghost" type="button" onClick={() => fileRef.current?.click()}>
            <Upload size={16} aria-hidden="true" /> Nhập file
          </button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={importProgress} />
        </div>
      </section>
    </div>
  );
}
