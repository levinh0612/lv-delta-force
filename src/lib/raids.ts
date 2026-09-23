export type Raid = {
  id: string;
  at: number; // epoch ms
  map: string;
  extracted: boolean;
  costIn: number; // loadout value brought in
  valueOut: number; // value brought out (0 or safe-box value when dead)
};

export type RaidStats = {
  count: number;
  extractRate: number; // 0..1
  net: number;
  avgNet: number;
  recentRate: number; // last 10 raids
  recentCount: number;
  streak: { kind: "extract" | "death" | null; length: number };
  byMap: { map: string; count: number; rate: number; net: number }[];
};

export const netOf = (r: Raid) => r.valueOut - r.costIn;

/** Raids are expected newest-first. */
export function computeStats(raids: Raid[]): RaidStats {
  const count = raids.length;
  const extracted = raids.filter((r) => r.extracted).length;
  const net = raids.reduce((s, r) => s + netOf(r), 0);
  const recent = raids.slice(0, 10);

  let streakLen = 0;
  const first = raids[0];
  if (first) {
    for (const r of raids) {
      if (r.extracted !== first.extracted) break;
      streakLen++;
    }
  }

  const maps = new Map<string, { count: number; ok: number; net: number }>();
  for (const r of raids) {
    const m = maps.get(r.map) ?? { count: 0, ok: 0, net: 0 };
    m.count++;
    if (r.extracted) m.ok++;
    m.net += netOf(r);
    maps.set(r.map, m);
  }

  return {
    count,
    extractRate: count ? extracted / count : 0,
    net,
    avgNet: count ? net / count : 0,
    recentRate: recent.length ? recent.filter((r) => r.extracted).length / recent.length : 0,
    recentCount: recent.length,
    streak: { kind: first ? (first.extracted ? "extract" : "death") : null, length: streakLen },
    byMap: [...maps.entries()]
      .map(([map, m]) => ({ map, count: m.count, rate: m.ok / m.count, net: m.net }))
      .sort((a, b) => b.count - a.count),
  };
}

export type Readiness = "not-enough-data" | "ready" | "almost" | "not-ready";

/** Day-6 check: at least half of the last 10 raids extracted. */
export function readiness(s: RaidStats): Readiness {
  if (s.recentCount < 5) return "not-enough-data";
  if (s.recentRate >= 0.5 && s.avgNet >= 0) return "ready";
  if (s.recentRate >= 0.4) return "almost";
  return "not-ready";
}

export function rebuyTimes(stash: number, loadoutCost: number): number {
  if (loadoutCost <= 0) return 0;
  return Math.floor(stash / loadoutCost);
}

const fmt = new Intl.NumberFormat("vi-VN");
export const money = (n: number) => fmt.format(Math.round(n));
export const signed = (n: number) => (n > 0 ? "+" : n < 0 ? "−" : "") + money(Math.abs(n));
