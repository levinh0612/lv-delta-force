import { useState } from "react";
import { useToast } from "../hooks/useToast";

const MAX = 16;

export function NameTag() {
  const [name, setName] = useState("");
  const toast = useToast();
  const clean = name.trim().replace(/\s+/g, "");
  const full = `WP | ${clean || "Tên của bạn"}`;

  const copy = async () => {
    if (!clean) return;
    try {
      await navigator.clipboard.writeText(`WP | ${clean}`);
      toast("Đã sao chép tên nhân vật");
    } catch {
      toast("Không sao chép được, hãy gõ tay nhé");
    }
  };

  return (
    <div className="nametag">
      <p className="nametag-label">Tên nhân vật bắt buộc theo format của team:</p>
      <p className="nametag-format">
        WP | <span>{clean || "Tên của bạn"}</span>
      </p>
      <p className="nametag-ex">
        Ví dụ: <code>WP | Khoa</code>, <code>WP | MinhAnh</code>. Viết đúng chữ <b>WP</b> in hoa, có dấu <b>|</b> và khoảng trắng hai bên.
      </p>
      <div className="row">
        <label className="sr-only" htmlFor="nt-input">Tên của bạn</label>
        <input
          id="nt-input"
          className="input"
          placeholder="Gõ tên để thử…"
          maxLength={MAX}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" className="btn" onClick={copy} disabled={!clean} aria-label={`Sao chép ${full}`}>
          Sao chép
        </button>
      </div>
    </div>
  );
}
