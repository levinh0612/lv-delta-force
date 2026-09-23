import { MARKER_TYPES, ROUTE_COLOR, markerNumbers, type MapNote } from "./mapNotes";

const TYPE = Object.fromEntries(MARKER_TYPES.map((t) => [t.key, t]));
const FONT = '"Be Vietnam Pro", system-ui, sans-serif';
const HEAD = '"Barlow Condensed", "Arial Narrow", sans-serif';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#15212A";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(230,236,239,0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += w / 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += h / 12.5) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

/** Render the map image with routes, markers and a legend into a PNG blob. */
export async function renderNotePng(note: MapNote, mapName: string, imageUrl?: string): Promise<Blob> {
  const img = imageUrl ? await loadImage(imageUrl) : null;
  const w = img?.naturalWidth ?? 1600;
  const h = img?.naturalHeight ?? 1000;
  const unit = Math.max(w, h) / 100; // 1% of the longest side

  const footer = unit * 5;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h + footer;
  const ctx = canvas.getContext("2d")!;
  if (img) ctx.drawImage(img, 0, 0, w, h);
  else drawGrid(ctx, w, h);

  const px = (p: { x: number; y: number }) => [(p.x / 100) * w, (p.y / 100) * h] as const;

  // Routes: dark casing under a bright line so they read on any background.
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  for (const route of note.routes) {
    for (const [color, width] of [["rgba(0,0,0,0.75)", unit * 0.9], [ROUTE_COLOR, unit * 0.45]] as const) {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      route.forEach((p, i) => (i ? ctx.lineTo(...px(p)) : ctx.moveTo(...px(p))));
      ctx.stroke();
    }
  }

  // Markers
  const nums = markerNumbers(note.markers);
  const r = unit * 1.4;
  for (const m of note.markers) {
    const [x, y] = px(m);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = TYPE[m.type].color;
    ctx.fill();
    ctx.lineWidth = unit * 0.3;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = `700 ${r * 1.15}px ${HEAD}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(nums[m.id]), x, y + r * 0.05);

    if (m.label) {
      ctx.font = `600 ${unit * 1.5}px ${FONT}`;
      ctx.textAlign = "left";
      const tw = ctx.measureText(m.label).width;
      const lx = x + r + unit * 0.5;
      ctx.fillStyle = "rgba(21,33,42,0.85)";
      ctx.fillRect(lx - unit * 0.3, y - unit * 1.1, tw + unit * 0.6, unit * 2.2);
      ctx.fillStyle = "#fff";
      ctx.fillText(m.label, lx, y);
    }
  }

  // Legend strip below the map so it never covers markers.
  const used = MARKER_TYPES.filter((t) => note.markers.some((m) => m.type === t.key));
  const fy = h + footer / 2;
  ctx.fillStyle = "#15212A";
  ctx.fillRect(0, h, w, footer);
  ctx.fillStyle = "#F2A900";
  ctx.fillRect(0, h, w, unit * 0.25);
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${unit * 2.2}px ${HEAD}`;
  ctx.fillStyle = "#F2A900";
  const title = `WP · ${mapName}`;
  ctx.fillText(title, unit * 1.5, fy);
  let fx = unit * 1.5 + ctx.measureText(title).width + unit * 2.5;
  ctx.font = `500 ${unit * 1.4}px ${FONT}`;
  for (const t of used) {
    ctx.beginPath();
    ctx.arc(fx + unit * 0.7, fy, unit * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = t.color;
    ctx.fill();
    ctx.fillStyle = "#E6ECEF";
    const text = `${t.label} (${note.markers.filter((m) => m.type === t.key).length})`;
    ctx.fillText(text, fx + unit * 1.8, fy);
    fx += unit * 1.8 + ctx.measureText(text).width + unit * 1.8;
  }
  if (note.routes.length) {
    ctx.strokeStyle = ROUTE_COLOR;
    ctx.lineWidth = unit * 0.45;
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(fx + unit * 1.4, fy);
    ctx.stroke();
    ctx.fillStyle = "#E6ECEF";
    ctx.fillText(`Lộ trình (${note.routes.length})`, fx + unit * 2, fy);
  }

  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode"))), "image/png"));
}

export function downloadBlob(blob: Blob, filename: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
