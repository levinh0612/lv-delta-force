import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Tab = { key: string; label: string; content: ReactNode };

export function PlatformTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div className="segmented" role="tablist" aria-label="Nền tảng" style={{ margin: ".75rem 0" }}>
        {tabs.map((t, i) => (
          <button
            key={t.key}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            type="button"
            id={`${uid}-b-${t.key}`}
            aria-controls={`${uid}-p-${t.key}`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.key} role="tabpanel" id={`${uid}-p-${t.key}`} aria-labelledby={`${uid}-b-${t.key}`} hidden={i !== active}>
          {t.content}
        </div>
      ))}
    </div>
  );
}
