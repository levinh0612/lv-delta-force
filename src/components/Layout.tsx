import { Suspense, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Crosshair, Moon, SunMedium, SunMoon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const NAV = [
  { to: "/plan", label: "7 ngày" },
  { to: "/basics", label: "Kiến thức" },
  { to: "/maps", label: "Bản đồ" },
  { to: "/operators", label: "Operator" },
  { to: "/tips", label: "Tips" },
  { to: "/tools", label: "Công cụ" },
  { to: "/quiz", label: "Quiz" },
];

const THEME_ICON = { system: SunMoon, light: SunMedium, dark: Moon } as const;
const THEME_LABEL = { system: "Theo hệ thống", light: "Sáng", dark: "Tối" } as const;

/** Scroll to top on page change, or to the #hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Lazily loaded pages render their anchors later: poll briefly until the target exists.
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const t = window.setInterval(() => {
        const el = document.getElementById(id);
        if (el || ++tries > 40) {
          window.clearInterval(t);
          el?.scrollIntoView();
        }
      }, 50);
      return () => window.clearInterval(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  const { theme, cycle } = useTheme();
  const ThemeIcon = THEME_ICON[theme];

  return (
    <>
      <a className="skip" href="#main">Bỏ qua điều hướng</a>
      <ScrollManager />
      <header className="topbar">
        <div className="wrap topbar-inner">
          <Link to="/" className="brand" aria-label="Trang chủ">
            <span className="brand-mark" aria-hidden="true"><Crosshair size={17} strokeWidth={2.5} /></span>
            WP <small>· Delta Force</small>
          </Link>
          <nav className="mainnav" aria-label="Điều hướng chính">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className="iconbtn"
            onClick={cycle}
            aria-label={`Giao diện: ${THEME_LABEL[theme]}. Bấm để đổi`}
            title={`Giao diện: ${THEME_LABEL[theme]}`}
          >
            <ThemeIcon size={19} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="main" className="wrap" tabIndex={-1}>
        <Suspense fallback={<p className="muted" style={{ padding: "3rem 0" }}>Đang tải…</p>}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="site">
        <div className="wrap">
          <p>Hướng dẫn nội bộ cho thành viên team WP. Tiến độ và nhật ký chỉ lưu trên trình duyệt của bạn.</p>
          <p>
            Trang fan-made, không liên kết chính thức. Delta Force do TiMi Studio Group / Team Jade phát triển, Level Infinite phát hành. Game cập nhật theo mùa — nội dung có thể lệch với phiên bản hiện tại.
          </p>
        </div>
      </footer>
    </>
  );
}
