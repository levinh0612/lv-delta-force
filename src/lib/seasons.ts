import { buildSeasons } from "./meta";

// Every content/meta/*.md is bundled at build time; files starting with "_" are skipped.
const files = import.meta.glob("/content/meta/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export const SEASONS = buildSeasons(files);
