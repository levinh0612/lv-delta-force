import { describe, expect, it } from "vitest";
import { markerNumbers, parseExport, sanitizeNote, type Marker } from "./mapNotes";

describe("sanitizeNote", () => {
  it("drops invalid markers and clamps coordinates", () => {
    const n = sanitizeNote({
      markers: [
        { id: "a", type: "loot", x: 150, y: -5, label: "x".repeat(100) },
        { id: "b", type: "hack", x: 1, y: 1 },
        { id: "c", type: "extract", x: "1", y: 1 },
      ],
      routes: [],
    });
    expect(n.markers).toHaveLength(1);
    expect(n.markers[0]).toMatchObject({ x: 100, y: 0 });
    expect(n.markers[0].label).toHaveLength(60);
  });

  it("drops routes with fewer than 2 valid points", () => {
    const n = sanitizeNote({ markers: [], routes: [[{ x: 1, y: 1 }], [{ x: 1, y: 1 }, { x: 2, y: 2 }], "nope"] });
    expect(n.routes).toEqual([[{ x: 1, y: 1 }, { x: 2, y: 2 }]]);
  });

  it("throws on wrong shape", () => {
    expect(() => sanitizeNote(null)).toThrow();
    expect(() => sanitizeNote({ markers: {} })).toThrow();
  });
});

describe("parseExport", () => {
  it("accepts wrapped and bare formats", () => {
    const note = { markers: [], routes: [] };
    expect(parseExport(JSON.stringify({ app: "lv-delta-force", version: 1, map: "zero-dam", note })).map).toBe("zero-dam");
    expect(parseExport(JSON.stringify(note)).map).toBeUndefined();
  });
});

describe("markerNumbers", () => {
  it("numbers per type in order", () => {
    const ms = [
      { id: "1", type: "loot" },
      { id: "2", type: "extract" },
      { id: "3", type: "loot" },
    ] as Marker[];
    expect(markerNumbers(ms)).toEqual({ 1: 1, 2: 1, 3: 2 });
  });
});
