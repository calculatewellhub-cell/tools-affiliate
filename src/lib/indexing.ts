/**
 * Decides which pages are indexable. The sitemap and each page's robots meta
 * both use these functions, so they can never disagree.
 */
import {
  getAlternativesPages,
  getCategories,
  getComparisons,
  getGuides,
  getTool,
  getTools,
  toolsInCategory,
  toolsInSubcategory,
} from "./content";
import { freeTools } from "./free-tools";
import { site } from "./site";
import type { AlternativesPage, Comparison, DataStatus, Tool } from "./types";

const okStatus = (s: DataStatus) => s === "verified" || site.indexDrafts;

export const indexTool = (t: Tool) => okStatus(t.dataStatus);

export const indexCategory = (slug: string) => toolsInCategory(slug).length >= site.minItemsToIndex.category;

export const indexSubcategory = (cat: string, sub: string) =>
  toolsInSubcategory(cat, sub).length >= site.minItemsToIndex.subcategory;

export function indexComparison(c: Comparison) {
  const a = getTool(c.toolA);
  const b = getTool(c.toolB);
  return okStatus(c.dataStatus) && !!a && !!b && indexTool(a) && indexTool(b);
}

export const indexAlternatives = (p: AlternativesPage) =>
  okStatus(p.dataStatus) && p.picks.filter((x) => getTool(x.slug)).length >= site.minItemsToIndex.alternatives;

export interface SitemapEntry {
  path: string;
  lastModified?: string;
  priority: number;
}

export function indexableUrls(): SitemapEntry[] {
  const today = site.policiesUpdated;
  const staticPages: SitemapEntry[] = [
    { path: "/", priority: 1 },
    { path: "/tools/", priority: 0.9 },
    { path: "/free-tools/", priority: 0.8 },
    { path: "/comparisons/", priority: 0.7 },
    { path: "/alternatives/", priority: 0.6 },
    { path: "/reviews/", priority: 0.6 },
    { path: "/guides/", priority: 0.7 },
    { path: "/about/", priority: 0.4 },
    { path: "/contact/", priority: 0.3 },
    { path: "/editorial-policy/", priority: 0.4 },
    { path: "/how-we-evaluate/", priority: 0.4 },
    { path: "/affiliate-disclosure/", priority: 0.3 },
    { path: "/privacy-policy/", priority: 0.2 },
    { path: "/cookie-policy/", priority: 0.2 },
    { path: "/terms/", priority: 0.2 },
  ].map((p) => ({ ...p, lastModified: today }));

  const cats = getCategories().flatMap((c) => [
    ...(indexCategory(c.slug) ? [{ path: `/${c.slug}/`, priority: 0.8 }] : []),
    ...c.subcategories
      .filter((s) => indexSubcategory(c.slug, s.slug))
      .map((s) => ({ path: `/${c.slug}/${s.slug}/`, priority: 0.6 })),
  ]);

  return [
    ...staticPages,
    ...cats,
    ...getTools().filter(indexTool).map((t) => ({ path: `/${t.slug}/`, lastModified: t.dates.lastUpdated, priority: 0.8 })),
    ...getComparisons().filter(indexComparison).map((c) => ({ path: `/${c.slug}/`, lastModified: c.dates.lastUpdated, priority: 0.7 })),
    ...getAlternativesPages().filter(indexAlternatives).map((a) => ({ path: `/${a.slug}/`, lastModified: a.dates.lastUpdated, priority: 0.6 })),
    ...getGuides().map((g) => ({ path: `/guides/${g.slug}/`, lastModified: g.updated, priority: 0.6 })),
    ...freeTools.map((f) => ({ path: `/free-tools/${f.slug}/`, priority: 0.7 })),
  ];
}
