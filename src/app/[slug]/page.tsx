import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAlternativesPage, getCategory, getComparison, getTool, resolveRoot, rootEntries } from "@/lib/content";
import { indexAlternatives, indexCategory, indexComparison, indexTool } from "@/lib/indexing";
import { buildMetadata } from "@/lib/seo";
import { AlternativesView } from "@/views/AlternativesView";
import { CategoryView } from "@/views/CategoryView";
import { ComparisonView } from "@/views/ComparisonView";
import { ToolView } from "@/views/ToolView";

/**
 * One root-level dynamic route serves four page types so URLs stay short:
 *   /grammarly/              tool
 *   /writing-tools/          category
 *   /grammarly-vs-quillbot/  comparison
 *   /grammarly-alternatives/ alternatives
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return rootEntries().map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = resolveRoot(slug);
  const path = `/${slug}/`;
  switch (entry?.kind) {
    case "tool": {
      const t = getTool(slug)!;
      return buildMetadata({ title: t.seo.title, description: t.seo.description, path, noindex: !indexTool(t), type: "article", modifiedTime: t.dates.lastUpdated, publishedTime: t.dates.published });
    }
    case "category": {
      const c = getCategory(slug)!;
      return buildMetadata({ title: c.seo.title, description: c.seo.description, path, noindex: !indexCategory(slug) });
    }
    case "comparison": {
      const c = getComparison(slug)!;
      return buildMetadata({ title: c.seo.title, description: c.seo.description, path, noindex: !indexComparison(c), type: "article", modifiedTime: c.dates.lastUpdated });
    }
    case "alternatives": {
      const a = getAlternativesPage(slug)!;
      return buildMetadata({ title: a.seo.title, description: a.seo.description, path, noindex: !indexAlternatives(a), type: "article", modifiedTime: a.dates.lastUpdated });
    }
    default:
      return {};
  }
}

export default async function RootSlugPage({ params }: Props) {
  const { slug } = await params;
  const entry = resolveRoot(slug);
  switch (entry?.kind) {
    case "tool":
      return <ToolView tool={getTool(slug)!} />;
    case "category":
      return <CategoryView category={getCategory(slug)!} />;
    case "comparison":
      return <ComparisonView c={getComparison(slug)!} />;
    case "alternatives":
      return <AlternativesView page={getAlternativesPage(slug)!} />;
    default:
      notFound();
  }
}
