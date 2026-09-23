# Delta Force · Team WP — Hướng dẫn tân binh

Trang hướng dẫn người mới chơi Delta Force: lộ trình 7 ngày, kiến thức cơ bản, bản đồ, operator, tips, công cụ (nhật ký raid, máy tính loadout, checklist) và quiz.

**Stack:** Vite · React 19 · TypeScript · React Router 7 · lucide-react · Vitest. Deploy trên Vercel.

```bash
npm install
npm run dev      # dev server
npm test         # unit tests (src/lib)
npm run build    # production build → dist/
```

## Cấu trúc

```
src/
  data/        nội dung (7 ngày, kiến thức, bản đồ, operator, tips, quiz) — sửa nội dung ở đây
  pages/       mỗi route một trang (lazy-loaded)
  components/  Layout, PlatformTabs, NameTag
  hooks/       useLocalStorage, useProgress, useRaidLog, useTheme, useToast
  lib/         logic thuần + test (thống kê raid)
  styles/      global.css (design tokens sáng/tối)
```

Tiến độ/nhật ký lưu trong `localStorage` của từng người chơi (key `df-wp-7days` tương thích với bản HTML cũ).
