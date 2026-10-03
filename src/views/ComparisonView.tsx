import Link from "next/link";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DraftNotice } from "@/components/DraftNotice";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ComparisonCard, ToolGrid } from "@/components/Lists";
import { OutboundButton } from "@/components/OutboundButton";
import { PricingBadge, pricingLabel } from "@/components/PricingBadge";
import { ToolLogo } from "@/components/ToolLogo";
import { getCategory, getComparisons, getTool, toolsBySlugs } from "@/lib/content";
import { formatDate, triLabel } from "@/lib/format";
import { faqSchema } from "@/lib/seo";
import type { Comparison } from "@/lib/types";

export function ComparisonView({ c }: { c: Comparison }) {
  const a = getTool(c.toolA)!;
  const b = getTool(c.toolB)!;
  const pair = [a, b];
  const others = toolsBySlugs([...new Set([...a.alternatives, ...b.alternatives])].filter((s) => s !== a.slug && s !== b.slug)).slice(0, 3);
  const more = getComparisons().filter((x) => x.slug !== c.slug).slice(0, 4);

  const rows: [string, string, string][] = [
    ["Category", getCategory(a.category)?.name ?? "", getCategory(b.category)?.name ?? ""],
    ["Pricing model", pricingLabel(a.pricing.model), pricingLabel(b.pricing.model)],
    ["Free plan", triLabel(a.pricing.freePlan), triLabel(b.pricing.freePlan)],
    ["Free trial", triLabel(a.pricing.freeTrial), triLabel(b.pricing.freeTrial)],
    ["Starting price", a.pricing.startingPrice ?? "Check official site", b.pricing.startingPrice ?? "Check official site"],
    ["Platforms", a.platforms.join(", "), b.platforms.join(", ")],
    ["AI features", a.isAI ? "Yes" : "Not a core focus", b.isAI ? "Yes" : "Not a core focus"],
    ["Best for", a.bestFor.join("; "), b.bestFor.join("; ")],
    ["Pricing last checked", formatDate(a.dates.lastChecked), formatDate(b.dates.lastChecked)],
  ];

  return (
    <>
      <JsonLd data={[faqSchema(c.faqs)]} />
      <section className="border-b border-ink-200 bg-ink-50">
        <div className="container-page max-w-4xl py-8 sm:py-10">
          <Breadcrumbs items={[{ name: "Comparisons", path: "/comparisons/" }, { name: c.title, path: `/${c.slug}/` }]} />
          <div className="mt-6 flex items-center gap-3">
            <ToolLogo tool={a} size="lg" />
            <span className="text-sm font-semibold text-ink-400">vs</span>
            <ToolLogo tool={b} size="lg" />
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">{c.title}</h1>
          <p className="mt-3 text-xs text-ink-500">Updated {formatDate(c.dates.lastUpdated)}</p>
        </div>
      </section>

      <div className="container-page max-w-4xl space-y-14 py-10">
        {c.dataStatus === "draft" && <DraftNotice what="comparison" />}
        <AffiliateDisclosure variant="box" />

        <section className="prose-body">
          {c.intro.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
          <p>
            We don&apos;t declare a universal winner: the better choice depends on what you need to do. Use the sections below to match each tool to your situation.
          </p>
        </section>

        <section aria-labelledby="quick-h">
          <h2 id="quick-h" className="h-section">Quick comparison</h2>
          <div className="mt-5 overflow-x-auto rounded-[var(--radius-card)] border border-ink-200">
            <table className="table-clean min-w-[560px]">
              <thead>
                <tr>
                  <th scope="col" className="w-1/4"><span className="sr-only">Attribute</span></th>
                  {pair.map((t) => <th key={t.slug} scope="col"><Link href={`/${t.slug}/`} className="hover:text-brand-700 hover:underline">{t.name}</Link></th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map(([k, va, vb]) => (
                  <tr key={k}><th scope="row" className="!bg-white !font-medium">{k}</th><td>{va}</td><td>{vb}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="feat-h">
          <h2 id="feat-h" className="h-section">Features</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {pair.map((t) => (
              <div key={t.slug} className="card p-5">
                <h3 className="font-semibold text-ink-900">{t.name}</h3>
                <ul className="mt-3 space-y-3">
                  {t.keyFeatures.map((f) => (
                    <li key={f.title}>
                      <p className="text-sm font-medium text-ink-800">{f.title}</p>
                      <p className="text-sm text-ink-600">{f.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="price-h">
          <h2 id="price-h" className="h-section">Pricing and free plans</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {pair.map((t) => (
              <div key={t.slug} className="card p-5">
                <div className="flex items-center justify-between gap-2"><h3 className="font-semibold text-ink-900">{t.name}</h3><PricingBadge model={t.pricing.model} /></div>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3"><dt className="text-ink-500">Free plan</dt><dd className="font-medium text-ink-800">{triLabel(t.pricing.freePlan)}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-ink-500">Free trial</dt><dd className="font-medium text-ink-800">{triLabel(t.pricing.freeTrial)}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-ink-500">Starting price</dt><dd className="text-right font-medium text-ink-800">{t.pricing.startingPrice ?? "Check current pricing on the official website"}</dd></div>
                </dl>
                <p className="mt-3 text-xs text-ink-500">Pricing last checked: {formatDate(t.dates.lastChecked)}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="diff-h">
          <h2 id="diff-h" className="h-section">Key differences</h2>
          <div className="mt-5 overflow-x-auto rounded-[var(--radius-card)] border border-ink-200">
            <table className="table-clean min-w-[560px]">
              <thead><tr><th scope="col" className="w-1/4">Aspect</th><th scope="col">{a.name}</th><th scope="col">{b.name}</th></tr></thead>
              <tbody>
                {c.differences.map((d) => (
                  <tr key={d.aspect}><th scope="row" className="!bg-white !font-medium">{d.aspect}</th><td>{d.a}</td><td>{d.b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="sim-h">
          <h2 id="sim-h" className="h-section">Similarities</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {c.similarities.map((s) => <li key={s} className="flex gap-2.5 text-ink-700"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{s}</li>)}
          </ul>
        </section>

        <section aria-labelledby="who-h">
          <h2 id="who-h" className="h-section">Which type of user each tool suits</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {([[a, c.considerA], [b, c.considerB]] as const).map(([t, list]) => (
              <div key={t.slug} className="card flex flex-col p-5">
                <h3 className="font-semibold text-ink-900">Consider {t.name} if…</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-700">
                  {list.map((x) => <li key={x} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />{x}</li>)}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  <OutboundButton slug={t.slug} label={`Visit ${t.name}`} />
                  <Link href={`/${t.slug}/`} className="btn-secondary">Read profile</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3"><AffiliateDisclosure /></div>
        </section>

        {others.length > 0 && (
          <section aria-labelledby="alt-h">
            <h2 id="alt-h" className="h-section">Other alternatives</h2>
            <div className="mt-5"><ToolGrid tools={others} /></div>
          </section>
        )}

        <Faq items={c.faqs} />

        {more.length > 0 && (
          <section aria-labelledby="more-h">
            <h2 id="more-h" className="h-section">More comparisons</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">{more.map((x) => <ComparisonCard key={x.slug} c={x} />)}</div>
          </section>
        )}
      </div>
    </>
  );
}
