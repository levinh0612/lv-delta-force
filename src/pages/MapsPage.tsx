import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { DIFFICULTY_LABEL, MAP_SITE, MAPS, mapUrl } from "../data/maps";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function MapsPage() {
  useDocumentTitle("Bản đồ");

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="callsign">Operations · học đường là sống</p>
        <h1 className="small">
          Bản đồ<span>Operations</span>
        </h1>
        <p className="lede">
          Bấm vào bản đồ để xem vị trí điểm di tản, loot và chìa khóa trên {MAP_SITE.name}. Học lần lượt từ trên xuống.
        </p>
      </header>

      <section className="block">
        <ul className="maplist">
          {MAPS.map((m, i) => (
            <li key={m.id}>
              <a href={mapUrl(m.id)} target="_blank" rel="noopener noreferrer">
                <span className="maplist-n">{i + 1}</span>
                <span className="maplist-body">
                  <span className="maplist-name">
                    {m.name}
                    {m.start && <span className="tag low">Bắt đầu ở đây</span>}
                  </span>
                  <span className="maplist-note">{m.note}</span>
                </span>
                <span className="maplist-tags">
                  {m.difficulties.map((d) => (
                    <span key={d} className={`tag ${DIFFICULTY_LABEL[d].cls}`}>
                      {DIFFICULTY_LABEL[d].label}
                    </span>
                  ))}
                </span>
                <ExternalLink size={18} className="maplist-go" aria-label="(mở trang mới)" />
              </a>
            </li>
          ))}
        </ul>
        <p className="note">
          Mẹo học bản đồ mới: một trận chỉ đi dạo và nhớ điểm di tản, sau đó chọn một lộ trình loot cố định — như{" "}
          <Link to="/plan?day=3">ngày 3 của lộ trình</Link>.
        </p>
      </section>
    </div>
  );
}
