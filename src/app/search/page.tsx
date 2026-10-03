import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/Section";
import { SearchClient } from "@/components/SearchClient";
import { buildMetadata } from "@/lib/seo";

// Search result pages should not be indexed.
export const metadata = buildMetadata({
  title: "Search Tools",
  description: "Search tools, free utilities, comparisons and guides by name, category, feature or use case.",
  path: "/search/",
  noindex: true,
});

export default function SearchPage() {
  return (
    <>
      <PageHero tone="tint">
        <Breadcrumbs items={[{ name: "Search", path: "/search/" }]} />
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950">Search</h1>
        <p className="mt-2 text-ink-600">Search by tool name, category, feature, use case or pricing (e.g. “free AI video”).</p>
      </PageHero>
      <div className="container-page max-w-3xl py-10">
        <SearchClient />
      </div>
    </>
  );
}
