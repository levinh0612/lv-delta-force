import { useEffect } from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { RefreshCw, TriangleAlert } from "lucide-react";

const CHUNK_ERROR = /dynamically imported module|Importing a module script failed|error loading dynamically imported/i;
const RELOAD_FLAG = "df-chunk-reload";

/**
 * After a new deploy, tabs opened earlier still reference old chunk hashes that no longer exist.
 * Reload once to pick up the new build; show a friendly message for anything else.
 */
export function RouteError() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? error.statusText : error instanceof Error ? error.message : String(error);
  const isChunkError = CHUNK_ERROR.test(message);

  useEffect(() => {
    if (!isChunkError) return;
    try {
      if (sessionStorage.getItem(RELOAD_FLAG)) return; // already tried once, avoid a reload loop
      sessionStorage.setItem(RELOAD_FLAG, "1");
    } catch {
      return;
    }
    window.location.reload();
  }, [isChunkError]);

  useEffect(() => {
    // A page that renders fine clears the flag for the next deploy.
    const t = window.setTimeout(() => {
      try {
        sessionStorage.removeItem(RELOAD_FLAG);
      } catch {
        /* ignore */
      }
    }, 10_000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="wrap">
      <header className="hero">
        <TriangleAlert size={44} className="bigicon" aria-hidden="true" />
        <p className="callsign">{isChunkError ? "Trang vừa được cập nhật" : "Có lỗi xảy ra"}</p>
        <h1 className="small">
          Mất liên lạc<span>tạm thời</span>
        </h1>
        <p className="lede">
          {isChunkError
            ? "Trang vừa có phiên bản mới. Tải lại để dùng bản mới nhất — tiến độ của bạn vẫn được giữ nguyên."
            : "Một phần của trang không tải được. Tải lại thường sẽ khắc phục; tiến độ của bạn không bị mất."}
        </p>
        <div className="row" style={{ marginTop: "1.25rem" }}>
          <button type="button" className="btn signal" onClick={() => window.location.reload()}>
            <RefreshCw size={16} aria-hidden="true" /> Tải lại
          </button>
          <Link className="btn ghost" to="/">
            Về trang chủ
          </Link>
        </div>
      </header>
    </div>
  );
}
