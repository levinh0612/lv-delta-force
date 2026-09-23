# Delta Force · Team WP — Hướng dẫn tân binh

Trang hướng dẫn người mới chơi Delta Force: lộ trình 7 ngày, kiến thức cơ bản, bản đồ, operator, tips, công cụ (nhật ký raid, máy tính loadout, checklist) và quiz.

**Stack:** Vite · React 19 · TypeScript · React Router 7 · lucide-react · Vitest. Deploy trên Vercel.

```bash
npm install
npm run dev      # dev server
npm test         # unit tests (src/lib)
npm run build    # production build → dist/
```

## Cập nhật meta theo mùa

Mỗi mùa là một file Markdown trong `content/meta/` (xem `_TEMPLATE.md`). File có `start` mới nhất hiển thị mặc định; bảng xếp hạng có ô `S+`/`S`/`A`/`B`/`C` sẽ tự tô màu. Push lên `main` là Vercel tự deploy.

## Bản đồ tương tác

`/maps/editor` — người chơi tải ảnh chụp bản đồ (lưu IndexedDB trên máy), đặt điểm, vẽ lộ trình, xuất PNG/JSON. Vị trí chi tiết điểm di tản/loot link sang bản đồ cộng đồng của deltaforcemaps.com (TrueMapper).

## Cấu trúc

```
src/
  content/meta/  (ở root) meta theo mùa dạng Markdown
  data/        nội dung (7 ngày, kiến thức, bản đồ, operator, tips, quiz) — sửa nội dung ở đây
  pages/       mỗi route một trang (lazy-loaded)
  components/  Layout, PlatformTabs, NameTag
  hooks/       useLocalStorage, useProgress, useRaidLog, useTheme, useToast
  lib/         logic thuần + test (thống kê raid)
  styles/      global.css (design tokens sáng/tối)
```

Tiến độ/nhật ký lưu trong `localStorage` của từng người chơi (key `df-wp-7days` tương thích với bản HTML cũ).
