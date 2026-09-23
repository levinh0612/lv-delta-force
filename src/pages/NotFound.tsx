import { Link } from "react-router-dom";
import { MapPinOff } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Không tìm thấy");
  return (
    <header className="hero fade-in">
      <MapPinOff size={48} className="bigicon" aria-hidden="true" />
      <p className="callsign">404 · lạc khỏi bản đồ</p>
      <h1 className="small">
        Không có<span>điểm di tản</span>
      </h1>
      <p className="lede">Trang này không tồn tại. Quay về căn cứ nhé.</p>
      <div className="row" style={{ marginTop: "1.25rem" }}>
        <Link className="btn signal" to="/">
          Về trang chủ
        </Link>
      </div>
    </header>
  );
}
