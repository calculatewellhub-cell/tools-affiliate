/** Client-safe search + record types. No Node imports here. */

export interface SearchRecord {
  type: "tool" | "free-tool" | "guide" | "comparison" | "category";
  slug: string;
  url: string;
  title: string;
  description: string;
  /** Category slug & name for tools. */
  category?: string;
  categoryName?: string;
  /** Primary + cross-listed category slugs. */
  categories?: string[];
  pricing?: "free" | "freemium" | "free-trial" | "paid" | "unknown";
  isAI?: boolean;
  platforms?: string[];
  useCases?: string[];
  brandColor?: string;
  /** Lowercased bag of words used for matching. */
  keywords: string;
}

const STOP = new Set(["the", "a", "an", "for", "to", "of", "and", "tool", "tools", "app", "apps", "software", "best", "online"]);

export function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s+-]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w));
}

/** Expand simple synonyms so "free" also finds freemium, "ai" finds AI-flagged tools, etc. */
function matchesToken(r: SearchRecord, token: string): number {
  const title = r.title.toLowerCase();
  if (title === token) return 12;
  if (title.split(/\s+/).some((w) => w.startsWith(token))) return 8;
  if (token === "free" && (r.pricing === "free" || r.pricing === "freemium" || r.type === "free-tool")) return 4;
  if (token === "ai" && r.isAI) return 4;
  const re = new RegExp(`(^|[\\s/,-])${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
  if (re.test(r.keywords)) return 3;
  if (token.length >= 4 && r.keywords.includes(token)) return 1;
  return 0;
}

export function search(records: SearchRecord[], query: string): SearchRecord[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  const typeBoost: Record<SearchRecord["type"], number> = { tool: 2, category: 1.5, "free-tool": 1.5, comparison: 1, guide: 0.5 };
  const scored = records.map((r) => {
    const per = tokens.map((t) => matchesToken(r, t));
    const all = per.every((s) => s > 0);
    const sum = per.reduce((a, b) => a + b, 0);
    return { r, score: sum > 0 ? sum + (all ? 20 : 0) + typeBoost[r.type] : 0, all };
  });
  const hits = scored.filter((s) => s.score > 0);
  // Prefer results matching every word; fall back to partial matches.
  const strict = hits.filter((h) => h.all);
  return (strict.length ? strict : hits).sort((a, b) => b.score - a.score).map((s) => s.r);
}
