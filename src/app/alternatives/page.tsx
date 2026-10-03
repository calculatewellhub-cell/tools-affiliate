import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/Section";
import { ToolLogo } from "@/components/ToolLogo";
import { getAlternativesPages, getTool } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Software Alternatives",
  description: "Looking for an alternative to a popular tool? Compare options with pricing notes, free plans and use cases.",
  path: "/alternatives/",
});

export default function AlternativesIndex() {
  const pages = getAlternativesPages();
  return (
    <>
      <PageHero tone="tint">
        <Breadcrumbs items={[{ name: "Alternatives", path: "/alternatives/" }]} />
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">Alternatives</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">Options worth comparing when a popular tool isn&apos;t the right fit.</p>
      </PageHero>
      <div className="container-page py-10">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p) => {
            const t = getTool(p.tool);
            return (
              <li key={p.slug}>
                <Link href={`/${p.slug}/`} className="card card-hover group flex items-center gap-4 p-4">
                  {t && <ToolLogo tool={t} size="sm" />}
                  <span>
                    <span className="block font-semibold text-ink-900 group-hover:text-brand-700">{p.title}</span>
                    <span className="block text-xs text-ink-500">{p.picks.length} alternative{p.picks.length === 1 ? "" : "s"} profiled</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
