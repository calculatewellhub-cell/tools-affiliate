import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComparisonCard } from "@/components/Lists";
import { PageHero } from "@/components/Section";
import { getComparisons } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tool Comparisons — Side-by-Side",
  description: "Side-by-side software comparisons covering features, free plans, pricing notes and which type of user each tool suits.",
  path: "/comparisons/",
});

export default function ComparisonsPage() {
  return (
    <>
      <PageHero tone="tint">
        <Breadcrumbs items={[{ name: "Comparisons", path: "/comparisons/" }]} />
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">Comparisons</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          Side-by-side looks at similar tools. We explain the differences and who each suits — we don&apos;t pick a universal winner.
        </p>
      </PageHero>
      <div className="container-page py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {getComparisons().map((c) => <ComparisonCard key={c.slug} c={c} />)}
        </div>
      </div>
    </>
  );
}
