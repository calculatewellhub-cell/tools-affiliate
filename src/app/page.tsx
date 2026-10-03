import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { Icon } from "@/components/Icon";
import { ComparisonCard, GuideCard, ToolGrid } from "@/components/Lists";
import { Newsletter } from "@/components/Newsletter";
import { SectionHeader } from "@/components/Section";
import { getCategories, getComparisons, getGuides, getTools, toolsInCategory } from "@/lib/content";
import { freeTools } from "@/lib/free-tools";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: `${site.name} — Find the Right Tool for the Job`,
  description: site.description,
  path: "/",
});

const quickSearches = ["AI video", "Grammar checker", "SEO audit", "Automation", "Web hosting", "Free"];

export default function HomePage() {
  const tools = getTools();
  const featured = tools.filter((t) => t.featured).slice(0, 6);
  const aiTools = tools.filter((t) => t.isAI).slice(0, 3);
  const recentlyUpdated = [...tools].sort((a, b) => (a.dates.lastUpdated < b.dates.lastUpdated ? 1 : -1)).slice(0, 4);
  const categories = getCategories();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink-200 bg-ink-50">
        <div className="container-page py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Software &amp; tool discovery</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance text-ink-950 sm:text-5xl">
              Find the Right Tool for the Job
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-pretty text-ink-600">
              Discover free tools, AI software, SaaS platforms, productivity apps, marketing tools and more.
            </p>
            <form action="/search/" method="get" role="search" className="mx-auto mt-8 flex max-w-xl flex-col gap-2 sm:flex-row">
              <label htmlFor="hero-q" className="sr-only">What tool are you looking for?</label>
              <div className="relative flex-1">
                <Icon name="search" className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-ink-400" />
                <input id="hero-q" name="q" type="search" placeholder="What tool are you looking for?" className="input h-12 pl-11 text-base shadow-sm" />
              </div>
              <button type="submit" className="btn-primary h-12 px-6">Search</button>
            </form>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-ink-500">Try:</span>
              {quickSearches.map((q) => (
                <Link key={q} href={`/search/?q=${encodeURIComponent(q)}`} className="chip hover:border-brand-200 hover:text-brand-700">{q}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container-page space-y-16 py-14 sm:space-y-20">
        {/* Categories */}
        <section aria-labelledby="cat-h">
          <SectionHeader id="cat-h" eyebrow="Browse" title="Tool categories" href="/tools/" linkLabel="All tools" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} count={toolsInCategory(c.slug).length} />)}
          </div>
        </section>

        {/* Featured */}
        <section aria-labelledby="feat-h">
          <SectionHeader id="feat-h" eyebrow="Editor's selection" title="Featured tools" description="A cross-section of tools across categories. Featured status is an editorial choice and is not paid for." href="/tools/" />
          <div className="mt-6"><ToolGrid tools={featured} /></div>
        </section>

        {/* Free tools */}
        <section aria-labelledby="free-h">
          <SectionHeader id="free-h" eyebrow="No sign-up" title="Free tools you can use right now" description="Simple utilities that run in your browser. No account, no paywall." href="/free-tools/" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {freeTools.map((f) => (
              <Link key={f.slug} href={`/free-tools/${f.slug}/`} className="card card-hover group flex gap-4 p-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon name={f.icon} /></span>
                <span>
                  <span className="block font-semibold text-ink-900 group-hover:text-brand-700">{f.name}</span>
                  <span className="mt-1 block text-sm text-ink-600">{f.short}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* AI tools */}
        <section aria-labelledby="ai-h">
          <SectionHeader id="ai-h" eyebrow="AI" title="AI tools" description="Writing, video, voice and design tools with AI features." href="/ai-tools/" linkLabel="All AI tools" />
          <div className="mt-6"><ToolGrid tools={aiTools} /></div>
        </section>

        {/* Comparisons + recently updated */}
        <div className="grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="cmp-h">
            <SectionHeader id="cmp-h" eyebrow="Side by side" title="Popular comparisons" href="/comparisons/" />
            <div className="mt-6 space-y-3">
              {getComparisons().map((c) => <ComparisonCard key={c.slug} c={c} />)}
            </div>
          </section>
          <section aria-labelledby="rec-h">
            <SectionHeader id="rec-h" eyebrow="Fresh" title="Recently updated profiles" href="/reviews/" linkLabel="Reviews hub" />
            <ul className="mt-6 divide-y divide-ink-100 rounded-[var(--radius-card)] border border-ink-200">
              {recentlyUpdated.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}/`} className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-ink-50">
                    <span className="font-medium text-ink-900">{t.name}</span>
                    <span className="text-right text-xs text-ink-500">{t.evaluation.status === "tested" ? "Tested" : "Profile — evaluation pending"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Guides */}
        <section aria-labelledby="guides-h">
          <SectionHeader id="guides-h" eyebrow="Learn" title="Latest guides" href="/guides/" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getGuides().slice(0, 3).map((g) => <GuideCard key={g.slug} g={g} />)}
          </div>
        </section>

        {/* Trust strip */}
        <section aria-labelledby="trust-h" className="grid gap-6 rounded-2xl border border-ink-200 p-6 sm:p-8 md:grid-cols-3">
          <h2 id="trust-h" className="sr-only">How we work</h2>
          {[
            { icon: "clipboard", title: "No invented facts", text: "We don't publish made-up prices, ratings or testimonials. Unverified details are clearly marked.", href: "/editorial-policy/", link: "Editorial policy" },
            { icon: "scale", title: "Balanced comparisons", text: "We explain who each tool suits instead of declaring a universal winner.", href: "/how-we-evaluate/", link: "How we evaluate" },
            { icon: "info", title: "Transparent affiliates", text: "Some links earn us a commission. It never changes the price you pay or what we write.", href: "/affiliate-disclosure/", link: "Disclosure" },
          ].map((b) => (
            <div key={b.title}>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-ink-100 text-ink-700"><Icon name={b.icon} /></span>
              <h3 className="mt-3 font-semibold text-ink-900">{b.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{b.text}</p>
              <Link href={b.href} className="mt-2 inline-block text-sm link">{b.link}</Link>
            </div>
          ))}
        </section>

        <Newsletter />
      </div>
    </>
  );
}
