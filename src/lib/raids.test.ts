import { describe, expect, it } from "vitest";
import { computeStats, readiness, rebuyTimes, type Raid } from "./raids";

const raid = (extracted: boolean, costIn = 100, valueOut = 0, map = "Zero Dam"): Raid => ({
  id: Math.random().toString(36),
  at: 0,
  map,
  extracted,
  costIn,
  valueOut,
});

describe("computeStats", () => {
  it("handles empty log", () => {
    const s = computeStats([]);
    expect(s.count).toBe(0);
    expect(s.extractRate).toBe(0);
    expect(s.streak.kind).toBeNull();
  });

  it("computes rates, net and streak (newest first)", () => {
    const s = computeStats([raid(true, 100, 300), raid(true, 100, 250), raid(false, 100, 0), raid(true, 100, 150)]);
    expect(s.count).toBe(4);
    expect(s.extractRate).toBe(0.75);
    expect(s.net).toBe(200 + 150 - 100 + 50);
    expect(s.streak).toEqual({ kind: "extract", length: 2 });
  });

  it("only uses last 10 raids for recentRate", () => {
    const raids = [...Array(10).fill(0).map(() => raid(true, 0, 10)), ...Array(10).fill(0).map(() => raid(false))];
    expect(computeStats(raids).recentRate).toBe(1);
  });

  it("groups by map sorted by count", () => {
    const s = computeStats([raid(true, 0, 0, "A"), raid(false, 0, 0, "B"), raid(true, 0, 0, "B")]);
    expect(s.byMap.map((m) => m.map)).toEqual(["B", "A"]);
    expect(s.byMap[0].rate).toBe(0.5);
  });
});

describe("readiness", () => {
  it("needs at least 5 raids", () => {
    expect(readiness(computeStats([raid(true, 0, 100)]))).toBe("not-enough-data");
  });
  it("is ready at >=50% extract with non-negative profit", () => {
    const raids = [raid(true, 100, 400), raid(true, 100, 400), raid(true, 100, 400), raid(false), raid(false)];
    expect(readiness(computeStats(raids))).toBe("ready");
  });
  it("is not ready below 40%", () => {
    const raids = [raid(true, 100, 400), raid(false), raid(false), raid(false), raid(false)];
    expect(readiness(computeStats(raids))).toBe("not-ready");
  });
});

describe("rebuyTimes", () => {
  it("floors and guards zero cost", () => {
    expect(rebuyTimes(1000, 300)).toBe(3);
    expect(rebuyTimes(1000, 0)).toBe(0);
  });
});
