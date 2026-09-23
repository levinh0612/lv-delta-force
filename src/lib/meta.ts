import { Marked } from "marked";

export type SeasonMeta = {
  slug: string;
  season: string;
  title: string;
  start: string;
  end?: string;
  updated?: string;
  summary?: string;
  html: string;
  toc: { id: string; text: string }[];
};

/** Minimal `key: value` frontmatter parser — enough for our content files. */
export function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: raw.slice(m[0].length) };
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const TIER_CLASS: Record<string, string> = { "S+": "splus", S: "s", A: "a", B: "b", C: "c" };

/** Wrap bare tier cells (S+, S, A, B, C) in a coloured badge. */
export function decorateTiers(html: string): string {
  return html.replace(/<td>(S\+|S|A|B|C)<\/td>/g, (_, t: string) => `<td><span class="tier tier-${TIER_CLASS[t]}">${t}</span></td>`);
}

export function renderMarkdown(body: string) {
  const toc: { id: string; text: string }[] = [];
  const md = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth, text }) {
        const inner = this.parser.parseInline(tokens);
        const id = slugify(text);
        if (depth === 2) toc.push({ id, text });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const inner = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const t = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${inner}</a>`
          : `<a href="${href}"${t} data-internal>${inner}</a>`;
      },
    },
  });
  const html = decorateTiers(md.parse(body, { async: false }) as string);
  return { html, toc };
}

export function buildSeasons(files: Record<string, string>): SeasonMeta[] {
  return Object.entries(files)
    .filter(([path]) => !path.split("/").pop()!.startsWith("_"))
    .map(([path, raw]) => {
      const { data, body } = parseFrontmatter(raw);
      const slug = path.split("/").pop()!.replace(/\.md$/, "");
      return {
        slug,
        season: data.season ?? slug,
        title: data.title ?? slug,
        start: data.start ?? "",
        end: data.end,
        updated: data.updated,
        summary: data.summary,
        ...renderMarkdown(body),
      };
    })
    .sort((a, b) => b.start.localeCompare(a.start));
}
