import { describe, expect, it } from "vitest";
import { buildSeasons, decorateTiers, parseFrontmatter, slugify } from "./meta";

describe("parseFrontmatter", () => {
  it("reads key/value pairs and strips the block", () => {
    const { data, body } = parseFrontmatter("---\nseason: S11\ntitle: \"Reorientation\"\n---\n## Hi");
    expect(data).toEqual({ season: "S11", title: "Reorientation" });
    expect(body).toBe("## Hi");
  });
  it("returns raw body when no frontmatter", () => {
    expect(parseFrontmatter("# x").body).toBe("# x");
  });
});

describe("slugify", () => {
  it("strips Vietnamese diacritics", () => {
    expect(slugify("Bảng xếp hạng súng")).toBe("bang-xep-hang-sung");
    expect(slugify("Đồng đội")).toBe("dong-doi");
  });
});

describe("decorateTiers", () => {
  it("wraps tier cells only", () => {
    expect(decorateTiers("<td>S+</td><td>M4A1</td>")).toBe('<td><span class="tier tier-splus">S+</span></td><td>M4A1</td>');
  });
});

describe("buildSeasons", () => {
  const files = {
    "/content/meta/old.md": "---\nseason: S10\nstart: 2026-07-01\n---\n## A",
    "/content/meta/new.md": "---\nseason: S11\nstart: 2026-09-08\n---\n## Tóm tắt\n[plan](/plan) [src](https://x.y)",
    "/content/meta/_TEMPLATE.md": "---\nseason: S99\nstart: 2099-01-01\n---\n",
  };
  const seasons = buildSeasons(files);

  it("skips underscore files and sorts newest first", () => {
    expect(seasons.map((s) => s.season)).toEqual(["S11", "S10"]);
  });
  it("builds toc and marks internal/external links", () => {
    expect(seasons[0].toc).toEqual([{ id: "tom-tat", text: "Tóm tắt" }]);
    expect(seasons[0].html).toContain('href="/plan" data-internal');
    expect(seasons[0].html).toContain('target="_blank"');
  });
});
