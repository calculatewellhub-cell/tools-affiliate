import { getCategories, getCategory, getComparisons, getGuides, getTool, getTools, toolSubcategories } from "./content";
import { freeTools } from "./free-tools";
import type { SearchRecord } from "./search";

const kw = (...parts: (string | string[] | undefined)[]) =>
  parts.flat().filter(Boolean).join(" , ").toLowerCase();

export function buildSearchIndex(): SearchRecord[] {
  const tools: SearchRecord[] = getTools().map((t) => {
    const subs = toolSubcategories(t);
    return {
      type: "tool",
      slug: t.slug,
      url: `/${t.slug}/`,
      title: t.name,
      description: t.shortDescription,
      category: t.category,
      categoryName: getCategory(t.category)?.name,
      categories: [...new Set([t.category, ...subs.map((s) => s.category.slug)])],
      pricing: t.pricing.model,
      isAI: t.isAI,
      platforms: t.platforms,
      useCases: subs.map((s) => s.sub.name),
      brandColor: t.brandColor,
      keywords: kw(
        t.name,
        getCategory(t.category)?.name,
        subs.map((s) => `${s.sub.name} ${s.category.name}`),
        t.tags,
        t.keyFeatures.map((f) => f.title),
        t.useCases,
        t.bestFor,
        t.platforms,
        t.isAI ? "ai artificial intelligence" : "",
        t.pricing.model,
        t.competitors.map((c) => `${c} alternative`),
      ),
    };
  });
  const categories: SearchRecord[] = getCategories().map((c) => ({
    type: "category",
    slug: c.slug,
    url: `/${c.slug}/`,
    title: c.name,
    description: c.description,
    keywords: kw(c.name, c.subcategories.map((s) => s.name), c.description),
  }));
  const free: SearchRecord[] = freeTools.map((f) => ({
    type: "free-tool",
    slug: f.slug,
    url: `/free-tools/${f.slug}/`,
    title: f.name,
    description: f.short,
    pricing: "free",
    keywords: kw(f.name, f.short, "free online tool", f.relatedCategory.replace("-", " ")),
  }));
  const comparisons: SearchRecord[] = getComparisons().map((c) => ({
    type: "comparison",
    slug: c.slug,
    url: `/${c.slug}/`,
    title: c.title,
    description: c.seo.description,
    keywords: kw(c.title, getTool(c.toolA)?.name, getTool(c.toolB)?.name, "vs versus compare comparison"),
  }));
  const guides: SearchRecord[] = getGuides().map((g) => ({
    type: "guide",
    slug: g.slug,
    url: `/guides/${g.slug}/`,
    title: g.title,
    description: g.description,
    keywords: kw(g.title, g.description, "guide how to"),
  }));
  return [...tools, ...categories, ...free, ...comparisons, ...guides];
}
