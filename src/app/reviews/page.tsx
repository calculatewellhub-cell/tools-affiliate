import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PricingBadge } from "@/components/PricingBadge";
import { PageHero } from "@/components/Section";
import { ToolLogo } from "@/components/ToolLogo";
import { getCategory, getTools } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tool Reviews & Profiles",
  description: "Our tool profiles and hands-on reviews. See which tools have been tested, when pricing was last checked and how we evaluate software.",
  path: "/reviews/",
});

const STATUS = { tested: "Hands-on tested", "in-progress": "Testing in progress", "not-tested": "Profile — not yet tested" } as const;

export default function ReviewsPage() {
  const tools = [...getTools()].sort((a, b) => a.name.localeCompare(b.name));
  const tested = tools.filter((t) => t.evaluation.status === "tested");
  return (
    <>
      <PageHero tone="tint">
        <Breadcrumbs items={[{ name: "Reviews", path: "/reviews/" }]} />
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">Reviews</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          We only call something a review once we&apos;ve used the product ourselves. Until then, tool pages are clearly labelled as profiles.
        </p>
        <p className="mt-3 text-sm text-ink-600">
          {tested.length} of {tools.length} tools hands-on tested · <Link href="/how-we-evaluate/" className="link">How we evaluate</Link>
        </p>
      </PageHero>
      <div className="container-page py-10">
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-ink-200">
          <table className="table-clean min-w-[640px]">
            <thead>
              <tr><th scope="col">Tool</th><th scope="col">Category</th><th scope="col">Pricing</th><th scope="col">Status</th><th scope="col">Last checked</th></tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.slug}>
                  <th scope="row" className="!bg-white">
                    <Link href={`/${t.slug}/`} className="flex items-center gap-3 font-medium hover:text-brand-700 hover:underline">
                      <ToolLogo tool={t} size="sm" />
                      {t.name}
                    </Link>
                  </th>
                  <td>{getCategory(t.category)?.name}</td>
                  <td><PricingBadge model={t.pricing.model} /></td>
                  <td>{STATUS[t.evaluation.status]}</td>
                  <td>{formatDate(t.dates.lastChecked)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
