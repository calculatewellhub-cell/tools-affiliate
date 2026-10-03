import Link from "next/link";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DraftNotice } from "@/components/DraftNotice";
import { Faq } from "@/components/Faq";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ComparisonCard, FreeToolLinks, ToolGrid } from "@/components/Lists";
import { OutboundButton } from "@/components/OutboundButton";
import { PricingBadge, pricingLabel } from "@/components/PricingBadge";
import { ProsCons } from "@/components/ProsCons";
import { ToolLogo } from "@/components/ToolLogo";
import {
  alternativesPageForTool,
  comparisonsForTool,
  getCategory,
  guidesForTool,
  relatedTools,
  toolsBySlugs,
  toolSubcategories,
} from "@/lib/content";
import { formatDate, triLabel } from "@/lib/format";
import { faqSchema, softwareSchema } from "@/lib/seo";
import type { Tool } from "@/lib/types";

const PRICING_FALLBACK = "Check current pricing on the official website.";

export function ToolView({ tool }: { tool: Tool }) {
  const category = getCategory(tool.category)!;
  const subs = toolSubcategories(tool);
  const alternatives = toolsBySlugs(tool.alternatives).slice(0, 5);
  const related = relatedTools(tool, 3).filter((t) => !tool.alternatives.includes(t.slug));
  const comparisons = comparisonsForTool(tool.slug);
  const altPage = alternativesPageForTool(tool.slug);
  const guides = guidesForTool(tool);
  const ev = tool.evaluation;
  const tested = ev.status === "tested" && ev.testedOn && ev.testedBy;
  const hasFree = tool.pricing.freePlan === "yes" || tool.pricing.model === "free" || tool.pricing.model === "freemium";
  const primaryLabel = `Visit ${tool.name}`;

  const facts: [string, string][] = [
    ["Pricing model", pricingLabel(tool.pricing.model)],
    ["Free plan", triLabel(tool.pricing.freePlan)],
    ["Free trial", triLabel(tool.pricing.freeTrial)],
    ["Paid plans", triLabel(tool.pricing.paidPlans)],
    ["Starting price", tool.pricing.startingPrice ?? "Check official site"],
    ["Best for", tool.bestFor[0] ?? "—"],
    ["Platforms", tool.platforms.join(", ")],
    ["Category", category.name],
    ["Last checked", formatDate(tool.dates.lastChecked)],
  ];

  const toc = [
    ["what-is", `What is ${tool.name}?`],
    ["who-for", "Who it's for"],
    ["features", "Key features"],
    ["how-it-works", "How it works"],
    ["free-vs-paid", "Free vs paid"],
    ["pricing", "Pricing"],
    ["pros-cons", "Pros and cons"],
    ["evaluation", tested ? "Our testing" : "Evaluation checklist"],
    ["alternatives", "Alternatives"],
    ...(comparisons.length ? [["comparisons", "Comparisons"]] : []),
    ...(tool.faqs.length ? [["faq", "FAQ"]] : []),
  ] as [string, string][];

  return (
    <>
      <JsonLd data={[softwareSchema(tool), faqSchema(tool.faqs)]} />

      {/* Hero */}
      <section className="border-b border-ink-200 bg-ink-50">
        <div className="container-page py-8 sm:py-10">
          <Breadcrumbs items={[{ name: category.name, path: `/${category.slug}/` }, { name: tool.name, path: `/${tool.slug}/` }]} />
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4">
                <ToolLogo tool={tool} size="lg" />
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">{tool.name}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <PricingBadge model={tool.pricing.model} />
                    {tool.isAI && <span className="chip">AI-powered</span>}
                    {subs.slice(0, 2).map(({ category: c, sub }) => (
                      <Link key={`${c.slug}/${sub.slug}`} href={`/${c.slug}/${sub.slug}/`} className="chip hover:border-brand-200 hover:text-brand-700">{sub.name}</Link>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-lg text-pretty text-ink-700">{tool.tagline}</p>
              <p className="mt-3 text-xs text-ink-500">
                Updated {formatDate(tool.dates.lastUpdated)} · Pricing last checked: {formatDate(tool.dates.lastChecked)}
              </p>
            </div>
            <div className="w-full shrink-0 lg:w-80">
              <div className="card p-5">
                <OutboundButton slug={tool.slug} label={primaryLabel} className="w-full" />
                <a href="#pricing" className="btn-secondary mt-2 w-full">View pricing</a>
                <div className="mt-3"><AffiliateDisclosure /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
        <article className="min-w-0 space-y-14">
          {tool.dataStatus === "draft" && <DraftNotice />}

          {/* Quick facts */}
          <section aria-labelledby="facts-h">
            <h2 id="facts-h" className="h-section">Quick facts</h2>
            <dl className="mt-5 grid grid-cols-1 overflow-hidden rounded-[var(--radius-card)] border border-ink-200 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map(([k, v]) => (
                <div key={k} className="border-b border-ink-100 px-4 py-3 sm:border-r">
                  <dt className="text-xs text-ink-500">{k}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink-900">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="what-is">
            <h2 id="what-is" className="h-section">What is {tool.name}?</h2>
            <div className="prose-body mt-4">
              {tool.description.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
            </div>
          </section>

          <section aria-labelledby="who-for" className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 id="who-for" className="h-section">Who is {tool.name} for?</h2>
              <ul className="mt-4 space-y-2.5 text-ink-700">
                {[...tool.bestFor, ...tool.useCases].map((u) => (
                  <li key={u} className="flex gap-2.5"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{u}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="h-section">Who should consider an alternative?</h2>
              <ul className="mt-4 space-y-2.5 text-ink-700">
                {tool.notIdealFor.map((u) => (
                  <li key={u} className="flex gap-2.5"><Icon name="minus" className="mt-0.5 h-5 w-5 shrink-0 text-ink-400" />{u}</li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="features">
            <h2 id="features" className="h-section">Key features</h2>
            <div className="mt-5"><FeatureGrid items={tool.keyFeatures} /></div>
          </section>

          <section aria-labelledby="how-it-works">
            <h2 id="how-it-works" className="h-section">How it works</h2>
            <ol className="mt-5 space-y-3">
              {tool.howItWorks.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">{i + 1}</span>
                  <span className="pt-0.5 text-ink-700">{s}</span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="free-vs-paid">
            <h2 id="free-vs-paid" className="h-section">Free vs paid</h2>
            <div className="mt-5 overflow-x-auto rounded-[var(--radius-card)] border border-ink-200">
              {tool.freeVsPaid.length ? (
                <table className="table-clean">
                  <thead><tr><th scope="col">Feature</th><th scope="col">Free</th><th scope="col">Paid</th></tr></thead>
                  <tbody>
                    {tool.freeVsPaid.map((r) => (
                      <tr key={r.feature}><th scope="row" className="!bg-white !font-medium">{r.feature}</th><td>{r.free}</td><td>{r.paid}</td></tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="table-clean">
                  <thead><tr><th scope="col">Option</th><th scope="col">Available?</th><th scope="col">What to check</th></tr></thead>
                  <tbody>
                    <tr><th scope="row" className="!bg-white !font-medium">Free plan</th><td>{triLabel(tool.pricing.freePlan)}</td><td>Usage limits, watermarks, commercial-use rights</td></tr>
                    <tr><th scope="row" className="!bg-white !font-medium">Free trial</th><td>{triLabel(tool.pricing.freeTrial)}</td><td>Length, whether a card is required, auto-renewal</td></tr>
                    <tr><th scope="row" className="!bg-white !font-medium">Paid plans</th><td>{triLabel(tool.pricing.paidPlans)}</td><td>Annual vs monthly price, seats, usage limits</td></tr>
                  </tbody>
                </table>
              )}
            </div>
            <p className="mt-3 text-sm text-ink-500">The official plan comparison is the most reliable source for what each plan includes.</p>
          </section>

          <section aria-labelledby="pricing">
            <h2 id="pricing" className="h-section">{tool.name} pricing</h2>
            {tool.pricing.plans.some((p) => p.price) ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tool.pricing.plans.map((p) => (
                  <div key={p.name} className="card p-5">
                    <h3 className="font-semibold text-ink-900">{p.name}</h3>
                    <p className="mt-2 text-2xl font-semibold text-ink-950">{p.price ?? "—"}</p>
                    {p.billing && <p className="text-xs text-ink-500">{p.billing}</p>}
                    <ul className="mt-3 space-y-1.5 text-sm text-ink-600">
                      {p.highlights.map((h) => <li key={h} className="flex gap-2"><Icon name="check" className="h-4 w-4 shrink-0 text-brand-600" />{h}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 card p-5">
                <p className="font-medium text-ink-900">{tool.pricing.startingPrice ? `From ${tool.pricing.startingPrice}` : PRICING_FALLBACK}</p>
                {tool.pricing.notes && <p className="mt-2 text-sm text-ink-600">{tool.pricing.notes}</p>}
                {hasFree && <p className="mt-2 text-sm text-ink-600">A free option is listed — you can try {tool.name} before paying.</p>}
              </div>
            )}
            <p className="mt-3 text-sm text-ink-500">
              Pricing last checked: <strong className="font-medium text-ink-700">{formatDate(tool.dates.lastChecked)}</strong>. Prices may vary by region, currency, taxes and billing period.
              {tool.pricing.pricingPageUrl && (
                <> See the <a href={tool.pricing.pricingPageUrl} rel="noopener" target="_blank" className="link">official pricing page</a>.</>
              )}
            </p>
          </section>

          <section aria-labelledby="pros-cons">
            <h2 id="pros-cons" className="h-section">Pros and cons</h2>
            <div className="mt-5"><ProsCons pros={tool.pros} cons={tool.cons} /></div>
          </section>

          <section aria-labelledby="evaluation">
            <h2 id="evaluation" className="h-section">{tested ? "Our testing" : "What to check during evaluation"}</h2>
            {tested ? (
              <div className="mt-5 card p-5">
                <p className="text-sm text-ink-500">Tested by {ev.testedBy} on {formatDate(ev.testedOn)}</p>
                {ev.rating && (
                  <p className="mt-2 text-lg font-semibold text-ink-900">
                    Score: {ev.rating.score}/{ev.rating.max}{" "}
                    <Link href="/how-we-evaluate/" className="text-sm font-normal link">methodology</Link>
                  </p>
                )}
                {ev.summary && <p className="mt-3 text-ink-700">{ev.summary}</p>}
                {ev.findings.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-700">{ev.findings.map((f) => <li key={f}>{f}</li>)}</ul>
                )}
              </div>
            ) : (
              <div className="mt-5 card p-5">
                <p className="text-sm text-ink-600">
                  We have not yet completed hands-on testing of {tool.name}, so we don&apos;t give it a score. If you&apos;re evaluating it yourself, these are the checks we use:
                </p>
                <ul className="mt-4 space-y-2.5">
                  {ev.checklist.map((c) => (
                    <li key={c} className="flex gap-2.5 text-ink-700"><span aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 rounded border-2 border-ink-300" />{c}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm"><Link href="/how-we-evaluate/" className="link">How we evaluate tools</Link></p>
              </div>
            )}
          </section>

          <section aria-labelledby="alternatives">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="alternatives" className="h-section">{tool.name} alternatives</h2>
              {altPage && <Link href={`/${altPage.slug}/`} className="text-sm font-semibold text-brand-700 hover:underline">All {tool.name} alternatives →</Link>}
            </div>
            {alternatives.length ? (
              <div className="mt-5"><ToolGrid tools={alternatives} /></div>
            ) : (
              <p className="mt-4 text-ink-600">We haven&apos;t profiled alternatives to {tool.name} yet.</p>
            )}
            {tool.competitors.length > 0 && (
              <p className="mt-4 text-sm text-ink-600">
                Other tools often compared with {tool.name}: {tool.competitors.join(", ")}.
              </p>
            )}
          </section>

          {comparisons.length > 0 && (
            <section aria-labelledby="comparisons">
              <h2 id="comparisons" className="h-section">{tool.name} comparisons</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {comparisons.map((c) => <ComparisonCard key={c.slug} c={c} />)}
              </div>
            </section>
          )}

          <Faq items={tool.faqs} title={`${tool.name} FAQ`} />

          {/* Final CTA */}
          <section className="rounded-2xl border border-ink-200 bg-ink-50 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-ink-900">Ready to explore {tool.name}?</h2>
            <p className="mt-2 text-ink-600">
              {hasFree ? `${tool.name} lists a free option, so you can try it before committing.` : `Check the current plans and terms on the official website before buying.`}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <OutboundButton slug={tool.slug} label="Visit official website" />
              <Link href={`/${category.slug}/`} className="btn-secondary">More {category.name.toLowerCase()}</Link>
            </div>
            <div className="mt-4"><AffiliateDisclosure /></div>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="On this page" className="hidden lg:block">
            <p className="text-sm font-semibold text-ink-900">On this page</p>
            <ul className="mt-3 space-y-1.5 border-l border-ink-200 text-sm">
              {toc.map(([id, label]) => (
                <li key={id}><a href={`#${id}`} className="-ml-px block border-l border-transparent pl-3 text-ink-600 hover:border-brand-600 hover:text-brand-700">{label}</a></li>
              ))}
            </ul>
          </nav>
          {related.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-ink-900">Related tools</p>
              <ul className="mt-3 space-y-2.5">
                {related.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/${t.slug}/`} className="group flex items-center gap-3">
                      <ToolLogo tool={t} size="sm" />
                      <span className="text-sm font-medium text-ink-800 group-hover:text-brand-700 group-hover:underline">{t.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {guides.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-ink-900">Related guides</p>
              <ul className="mt-3 space-y-2 text-sm">
                {guides.map((g) => <li key={g.slug}><Link href={`/guides/${g.slug}/`} className="text-ink-700 hover:text-brand-700 hover:underline">{g.title}</Link></li>)}
              </ul>
            </div>
          )}
          <FreeToolLinks slugs={tool.relatedFreeTools} />
          <div>
            <p className="text-sm font-semibold text-ink-900">Browse category</p>
            <Link href={`/${category.slug}/`} className="mt-2 inline-block text-sm link">{category.name}</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
