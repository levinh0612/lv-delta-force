export type Difficulty = "easy" | "normal" | "hard";

export const DIFFICULTY_LABEL: Record<Difficulty, { label: string; cls: "low" | "mid" | "high" }> = {
  easy: { label: "Easy", cls: "low" },
  normal: { label: "Normal", cls: "mid" },
  hard: { label: "Hard", cls: "high" },
};

export type MapInfo = {
  id: string;
  name: string;
  /** Difficulty modes available in Operations. */
  difficulties: Difficulty[];
  /** One short line: who the map is for. */
  note: string;
  /** Marks the recommended starting map. */
  start?: boolean;
};

export const MAP_SITE = { name: "deltaforcemaps.com", url: "https://www.deltaforcemaps.com" };
export const mapUrl = (id: string) => `${MAP_SITE.url}/maps/${id}`;

/** Ordered from easiest to hardest for newcomers. Difficulties per the deltaforcemaps.com map index. */
export const MAPS: MapInfo[] = [
  { id: "zero-dam", name: "Zero Dam", difficulties: ["easy", "normal"], note: "Dễ nhất. Học Operations ở đây trong tuần đầu.", start: true },
  { id: "layali-grove", name: "Layali Grove", difficulties: ["easy", "normal"], note: "Rộng, nhiều đất trống. Học sau Zero Dam." },
  { id: "space-city", name: "Space City", difficulties: ["normal", "hard"], note: "Nhiều khu trong nhà, đánh gần." },
  { id: "brakkesh", name: "Brakkesh", difficulties: ["normal", "hard"], note: "Thành phố ngõ hẹp, dễ bị bắn từ trên cao." },
  { id: "tide-prison", name: "Tide Prison", difficulties: ["hard"], note: "Chỉ có Hard. Để dành khi đã thoát đều." },
  { id: "az3", name: "AZ3", difficulties: ["easy", "normal"], note: "Bản đồ mới, cần Operations cấp 14 và phí vào cửa." },
];
