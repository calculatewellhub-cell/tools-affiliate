import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategory } from "@/lib/content";
import { indexSubcategory } from "@/lib/indexing";
import { buildMetadata } from "@/lib/seo";
import { CategoryView } from "@/views/CategoryView";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().flatMap((c) => c.subcategories.map((s) => ({ slug: c.slug, sub: s.slug })));
}

type Props = { params: Promise<{ slug: string; sub: string }> };

function find(slug: string, subSlug: string) {
  const category = getCategory(slug);
  const sub = category?.subcategories.find((s) => s.slug === subSlug);
  return category && sub ? { category, sub } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, sub } = await params;
  const f = find(slug, sub);
  if (!f) return {};
  return buildMetadata({
    title: `${f.sub.name} Tools — ${f.category.name}`,
    description: `${f.sub.description} Compare ${f.sub.name.toLowerCase()} tools, free plan notes and alternatives.`,
    path: `/${slug}/${sub}/`,
    noindex: !indexSubcategory(slug, sub),
  });
}

export default async function SubcategoryPage({ params }: Props) {
  const { slug, sub } = await params;
  const f = find(slug, sub);
  if (!f) notFound();
  return <CategoryView category={f.category} sub={f.sub} />;
}
