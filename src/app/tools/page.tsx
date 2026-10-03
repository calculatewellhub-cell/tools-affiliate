import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryCard } from "@/components/CategoryCard";
import { PageHero } from "@/components/Section";
import { ToolExplorer } from "@/components/ToolExplorer";
import { getCategories, toolsInCategory } from "@/lib/content";
import { buildSearchIndex } from "@/lib/search-index";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "All Tools — Browse & Filter Software",
  description: "Browse every tool we cover. Filter by category, free, freemium or paid, AI features, platform and use case.",
  path: "/tools/",
});

export default function AllToolsPage() {
  const records = buildSearchIndex().filter((r) => r.type === "tool");
  const categories = getCategories();
  return (
    <>
      <PageHero tone="tint">
        <Breadcrumbs items={[{ name: "All tools", path: "/tools/" }]} />
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">All tools</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">Filter by category, pricing model, AI features, platform and use case.</p>
      </PageHero>
      <div className="container-page py-10">
        <ToolExplorer tools={records} categories={categories.map((c) => ({ slug: c.slug, name: c.name }))} />
        <section aria-labelledby="cats-h" className="mt-16" id="categories">
          <h2 id="cats-h" className="h-section">Browse by category</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} count={toolsInCategory(c.slug).length} />)}
          </div>
        </section>
      </div>
    </>
  );
}
