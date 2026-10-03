/**
 * Build-time content loader. Reads /content and validates it. Runs only on the
 * server during `next build` / `next dev` — none of this ships to the browser.
 */
import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import type {
  AffiliateRecord,
  AlternativesPage,
  Category,
  Comparison,
  Guide,
  Tool,
} from "./types";

const CONTENT = path.join(process.cwd(), "content");

function readJsonDir<T>(dir: string): T[] {
  const full = path.join(CONTENT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .sort()
    .map((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(full, f), "utf8")) as T & { slug: string };
      const expected = f.replace(/\.json$/, "");
      if (data.slug !== expected) {
        throw new Error(`content/${dir}/${f}: slug "${data.slug}" must match file name "${expected}"`);
      }
      return data;
    });
}

let cache: {
  tools: Tool[];
  categories: Category[];
  comparisons: Comparison[];
  alternatives: AlternativesPage[];
  affiliates: Record<string, AffiliateRecord>;
  guides: Guide[];
} | null = null;

function load() {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const categories = JSON.parse(
    fs.readFileSync(path.join(CONTENT, "categories.json"), "utf8"),
  ) as Category[];
  const tools = readJsonDir<Tool>("tools");
  const comparisons = readJsonDir<Comparison>("comparisons");
  const alternatives = readJsonDir<AlternativesPage>("alternatives");
  const affRaw = JSON.parse(fs.readFileSync(path.join(CONTENT, "affiliates.json"), "utf8"));
  delete affRaw._readme;
  const affiliates = affRaw as Record<string, AffiliateRecord>;
  const guides = loadGuides();
  cache = { tools, categories, comparisons, alternatives, affiliates, guides };
  return cache;
}

/* ------------------------------------------------------------------ */
/* Guides (Markdown with a tiny front-matter block)                    */
/* ------------------------------------------------------------------ */

function parseFrontMatter(src: string): { data: Record<string, string>; body: string } {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(src);
  if (!m) return { data: {}, body: src };
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (/^".*"$/.test(val)) val = val.slice(1, -1);
    data[key] = val;
  }
  return { data, body: src.slice(m[0].length) };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function loadGuides(): Guide[] {
  const dir = path.join(CONTENT, "guides");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const { data, body } = parseFrontMatter(fs.readFileSync(path.join(dir, f), "utf8"));
      const headings: { id: string; text: string }[] = [];
      const marked = new Marked({
        renderer: {
          heading({ tokens, depth }) {
            const text = this.parser.parseInline(tokens);
            const id = slugify(text);
            if (depth === 2) headings.push({ id, text: text.replace(/<[^>]+>/g, "") });
            return `<h${depth} id="${id}">${text}</h${depth}>\n`;
          },
        },
      });
      const html = marked.parse(body, { async: false }) as string;
      const words = body.split(/\s+/).filter(Boolean).length;
      const list = (v?: string) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        category: data.category ?? "",
        author: data.author ?? "Editorial Team",
        published: data.published ?? "",
        updated: data.updated ?? data.published ?? "",
        relatedTools: list(data.relatedTools),
        relatedFreeTools: list(data.relatedFreeTools),
        html,
        headings,
        readingMinutes: Math.max(1, Math.round(words / 220)),
      } satisfies Guide;
    })
    .sort((a, b) => (a.updated < b.updated ? 1 : -1));
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export const getTools = () => load().tools;
export const getTool = (slug: string) => load().tools.find((t) => t.slug === slug);
export const getCategories = () => load().categories;
export const getCategory = (slug: string) => load().categories.find((c) => c.slug === slug);
export const getComparisons = () => load().comparisons;
export const getComparison = (slug: string) => load().comparisons.find((c) => c.slug === slug);
export const getAlternativesPages = () => load().alternatives;
export const getAlternativesPage = (slug: string) => load().alternatives.find((a) => a.slug === slug);
export const getGuides = () => load().guides;
export const getGuide = (slug: string) => load().guides.find((g) => g.slug === slug);
export const getAffiliates = () => load().affiliates;

export function toolsBySlugs(slugs: string[]): Tool[] {
  return slugs.map((s) => getTool(s)).filter((t): t is Tool => Boolean(t));
}

/** Resolve "sub" or "category/sub" against a tool's primary category. */
function subRefs(tool: Tool): { category: string; sub: string }[] {
  return tool.subcategories.map((ref) => {
    const [a, b] = ref.split("/");
    return b ? { category: a, sub: b } : { category: tool.category, sub: a };
  });
}

/** Tools whose primary category matches, or that are cross-listed via a subcategory. */
export function toolsInCategory(categorySlug: string): Tool[] {
  return getTools().filter(
    (t) => t.category === categorySlug || subRefs(t).some((r) => r.category === categorySlug),
  );
}

export function toolsInSubcategory(categorySlug: string, subSlug: string): Tool[] {
  return getTools().filter((t) =>
    subRefs(t).some((r) => r.category === categorySlug && r.sub === subSlug),
  );
}

export function toolSubcategories(tool: Tool) {
  return subRefs(tool)
    .map((r) => {
      const cat = getCategory(r.category);
      const sub = cat?.subcategories.find((s) => s.slug === r.sub);
      return cat && sub ? { category: cat, sub } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}

export function comparisonsForTool(slug: string): Comparison[] {
  return getComparisons().filter((c) => c.toolA === slug || c.toolB === slug);
}

export function alternativesPageForTool(slug: string): AlternativesPage | undefined {
  return getAlternativesPages().find((a) => a.tool === slug);
}

/** Related tools: same category first, then shared subcategories/tags. */
export function relatedTools(tool: Tool, limit = 4): Tool[] {
  const subs = new Set(subRefs(tool).map((r) => `${r.category}/${r.sub}`));
  const tags = new Set(tool.tags);
  return getTools()
    .filter((t) => t.slug !== tool.slug)
    .map((t) => {
      let score = t.category === tool.category ? 3 : 0;
      for (const r of subRefs(t)) if (subs.has(`${r.category}/${r.sub}`)) score += 2;
      for (const tag of t.tags) if (tags.has(tag)) score += 1;
      if (tool.alternatives.includes(t.slug)) score += 2;
      return { t, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.t);
}

export function guidesForTool(tool: Tool): Guide[] {
  const explicit = tool.relatedGuides.map(getGuide).filter((g): g is Guide => Boolean(g));
  const implicit = getGuides().filter(
    (g) => g.relatedTools.includes(tool.slug) && !explicit.includes(g),
  );
  return [...explicit, ...implicit].slice(0, 3);
}

/* ------------------------------------------------------------------ */
/* Root-level route resolution                                         */
/* ------------------------------------------------------------------ */

/**
 * Tools (/grammarly/), categories (/ai-tools/), comparisons
 * (/grammarly-vs-quillbot/) and alternatives (/grammarly-alternatives/)
 * all live at the site root, so slugs must be unique across all four.
 */
export type RootEntry =
  | { kind: "tool"; slug: string }
  | { kind: "category"; slug: string }
  | { kind: "comparison"; slug: string }
  | { kind: "alternatives"; slug: string };

/** Slugs reserved by static routes in src/app. */
const RESERVED = new Set([
  "tools", "reviews", "comparisons", "alternatives", "free-tools", "guides", "search",
  "about", "contact", "privacy-policy", "terms", "affiliate-disclosure", "cookie-policy",
  "editorial-policy", "how-we-evaluate", "categories",
]);

export function rootEntries(): RootEntry[] {
  const entries: RootEntry[] = [
    ...getCategories().map((c) => ({ kind: "category" as const, slug: c.slug })),
    ...getTools().map((t) => ({ kind: "tool" as const, slug: t.slug })),
    ...getComparisons().map((c) => ({ kind: "comparison" as const, slug: c.slug })),
    ...getAlternativesPages().map((a) => ({ kind: "alternatives" as const, slug: a.slug })),
  ];
  const seen = new Map<string, string>();
  for (const e of entries) {
    if (RESERVED.has(e.slug)) throw new Error(`Slug "${e.slug}" (${e.kind}) is reserved by a static page.`);
    const prev = seen.get(e.slug);
    if (prev) throw new Error(`Duplicate root slug "${e.slug}" used by both ${prev} and ${e.kind}.`);
    seen.set(e.slug, e.kind);
  }
  return entries;
}

export function resolveRoot(slug: string): RootEntry | undefined {
  return rootEntries().find((e) => e.slug === slug);
}
