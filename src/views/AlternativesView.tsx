import Link from "next/link";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DraftNotice } from "@/components/DraftNotice";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { OutboundButton } from "@/components/OutboundButton";
import { PricingBadge, pricingLabel } from "@/components/PricingBadge";
import { ToolLogo } from "@/components/ToolLogo";
import { comparisonsForTool, getTool } from "@/lib/content";
import { formatDate, triLabel } from "@/lib/format";
import { faqSchema, itemListSchema } from "@/lib/seo";
import type { AlternativesPage } from "@/lib/types";

export function AlternativesView({ page }: { page: AlternativesPage }) {
  const base = getTool(page.tool)!;
  const picks = page.picks.map((p) => ({ ...p, tool: getTool(p.slug)! })).filter((p) => p.tool);
  const comparisons = comparisonsForTool(base.slug);

  return (
    <>
      <JsonLd data={[itemListSchema(picks.map((p) => ({ name: p.tool.name, path: `/${p.tool.slug}/` }))), faqSchema(page.faqs)]} />
      <section className="border-b border-ink-200 bg-ink-50">
        <div className="container-page max-w-4xl py-8 sm:py-10">
          <Breadcrumbs items={[{ name: "Alternatives", path: "/alternatives/" }, { name: page.title, path: `/${page.slug}/` }]} />
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">{page.title}</h1>
          <p className="mt-3 text-xs text-ink-500">Updated {formatDate(page.dates.lastUpdated)} · {picks.length} alternative{picks.length === 1 ? "" : "s"} profiled</p>
        </div>
      </section>

      <div className="container-page max-w-4xl space-y-14 py-10">
        {page.dataStatus === "draft" && <DraftNotice what="list" />}
        <AffiliateDisclosure variant="box" />

        <section className="prose-body">
          {page.intro.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
          <p>Read our full <Link href={`/${base.slug}/`}>{base.name} profile</Link> for context.</p>
        </section>

        <section aria-labelledby="why-h">
          <h2 id="why-h" className="h-section">Why people look for {base.name} alternatives</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-700 marker:text-brand-600">
            {page.whyLookElsewhere.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </section>

        <section aria-labelledby="table-h">
          <h2 id="table-h" className="h-section">Alternatives at a glance</h2>
          <div className="mt-5 overflow-x-auto rounded-[var(--radius-card)] border border-ink-200">
            <table className="table-clean min-w-[600px]">
              <thead><tr><th scope="col">Tool</th><th scope="col">Pricing</th><th scope="col">Free plan</th><th scope="col">Best for</th></tr></thead>
              <tbody>
                {[{ tool: base }, ...picks].map(({ tool: t }) => (
                  <tr key={t.slug}>
                    <th scope="row" className="!bg-white"><Link href={`/${t.slug}/`} className="hover:text-brand-700 hover:underline">{t.name}</Link>{t.slug === base.slug && <span className="ml-1 text-xs font-normal text-ink-500">(original)</span>}</th>
                    <td>{pricingLabel(t.pricing.model)}</td>
                    <td>{triLabel(t.pricing.freePlan)}</td>
                    <td>{t.bestFor[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="picks-h" className="space-y-5">
          <h2 id="picks-h" className="h-section">The alternatives</h2>
          {picks.map(({ tool: t, note }, i) => (
            <article key={t.slug} className="card p-5 sm:p-6">
              <div className="flex flex-wrap items-start gap-4">
                <ToolLogo tool={t} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-ink-900">{i + 1}. {t.name}</h3>
                  <p className="text-sm text-ink-600">{t.tagline}</p>
                </div>
                <PricingBadge model={t.pricing.model} />
              </div>
              <p className="mt-4 text-ink-700">{note}</p>
              <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="font-medium text-ink-900">Key features</p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-ink-600">{t.keyFeatures.slice(0, 3).map((f) => <li key={f.title}>{f.title}</li>)}</ul>
                </div>
                <div>
                  <p className="font-medium text-ink-900">Use cases</p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-ink-600">{t.useCases.slice(0, 3).map((u) => <li key={u}>{u}</li>)}</ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-500">Pricing: {t.pricing.startingPrice ?? "check current pricing on the official website"} · last checked {formatDate(t.dates.lastChecked)}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <OutboundButton slug={t.slug} label={`Visit ${t.name}`} />
                <Link href={`/${t.slug}/`} className="btn-secondary">Full profile</Link>
              </div>
            </article>
          ))}
        </section>

        {comparisons.length > 0 && (
          <section aria-labelledby="cmp-h">
            <h2 id="cmp-h" className="h-section">Head-to-head comparisons</h2>
            <ul className="mt-4 space-y-2">
              {comparisons.map((c) => <li key={c.slug}><Link href={`/${c.slug}/`} className="link">{c.title}</Link></li>)}
            </ul>
          </section>
        )}

        <Faq items={page.faqs} />
      </div>
    </>
  );
}
