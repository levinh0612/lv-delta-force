export type MarkerType = "extract" | "loot" | "danger" | "spawn" | "note";

export const MARKER_TYPES: { key: MarkerType; label: string; color: string }[] = [
  { key: "extract", label: "Di tản", color: "#2F9E5B" },
  { key: "loot", label: "Loot", color: "#E0A100" },
  { key: "danger", label: "Nguy hiểm", color: "#D1453B" },
  { key: "spawn", label: "Xuất phát", color: "#3A7BD5" },
  { key: "note", label: "Ghi chú", color: "#8A5CD1" },
];

export const ROUTE_COLOR = "#F2A900";

/** Positions are percentages (0–100) of the map image so they survive any display size. */
export type Point = { x: number; y: number };
export type Marker = Point & { id: string; type: MarkerType; label: string };
export type MapNote = { markers: Marker[]; routes: Point[][] };
export type MapNotes = Record<string, MapNote>;

export const EMPTY_NOTE: MapNote = { markers: [], routes: [] };

export type NotesExport = { app: "lv-delta-force"; version: 1; map: string; note: MapNote };

const clamp = (n: number) => Math.min(100, Math.max(0, Math.round(n * 100) / 100));
const isNum = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n);
const TYPES = new Set(MARKER_TYPES.map((t) => t.key));

/** Validate untrusted JSON (imported files) into a clean MapNote. Throws on wrong shape. */
export function sanitizeNote(input: unknown): MapNote {
  if (!input || typeof input !== "object") throw new Error("invalid");
  const { markers, routes } = input as { markers?: unknown; routes?: unknown };
  if (!Array.isArray(markers) || !Array.isArray(routes)) throw new Error("invalid");

  const cleanMarkers: Marker[] = markers
    .filter((m): m is Marker => !!m && isNum(m.x) && isNum(m.y) && TYPES.has(m.type))
    .slice(0, 300)
    .map((m, i) => ({
      id: typeof m.id === "string" && m.id ? m.id.slice(0, 40) : `m${i}-${Date.now()}`,
      type: m.type,
      x: clamp(m.x),
      y: clamp(m.y),
      label: typeof m.label === "string" ? m.label.slice(0, 60) : "",
    }));

  const cleanRoutes: Point[][] = routes
    .filter(Array.isArray)
    .slice(0, 50)
    .map((r: unknown[]) =>
      r.filter((p): p is Point => !!p && isNum((p as Point).x) && isNum((p as Point).y)).slice(0, 500).map((p) => ({ x: clamp(p.x), y: clamp(p.y) })),
    )
    .filter((r) => r.length >= 2);

  return { markers: cleanMarkers, routes: cleanRoutes };
}

export function parseExport(text: string): { map?: string; note: MapNote } {
  const data = JSON.parse(text) as Partial<NotesExport> & Partial<MapNote>;
  // Accept both the wrapped export format and a bare { markers, routes } object.
  if (data.note) return { map: typeof data.map === "string" ? data.map : undefined, note: sanitizeNote(data.note) };
  return { note: sanitizeNote(data) };
}

/** Numbering shown on markers and in the legend: per type, in placement order. */
export function markerNumbers(markers: Marker[]): Record<string, number> {
  const count: Partial<Record<MarkerType, number>> = {};
  const out: Record<string, number> = {};
  for (const m of markers) out[m.id] = count[m.type] = (count[m.type] ?? 0) + 1;
  return out;
}
