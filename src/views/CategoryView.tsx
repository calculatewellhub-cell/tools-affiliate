import Link from "next/link";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ComparisonCard, FreeToolLinks, GuideCard, ToolGrid } from "@/components/Lists";
import { PageHero } from "@/components/Section";
import { getComparisons, getGuides, toolsInCategory, toolsInSubcategory } from "@/lib/content";
import { freeTools } from "@/lib/free-tools";
import { itemListSchema } from "@/lib/seo";
import type { Category, Subcategory } from "@/lib/types";

export function CategoryView({ category, sub }: { category: Category; sub?: Subcategory }) {
  const tools = sub ? toolsInSubcategory(category.slug, sub.slug) : toolsInCategory(category.slug);
  const slugs = new Set(tools.map((t) => t.slug));
  const comparisons = getComparisons().filter((c) => slugs.has(c.toolA) || slugs.has(c.toolB));
  const guides = getGuides().filter((g) => g.category === category.slug || g.relatedTools.some((s) => slugs.has(s))).slice(0, 3);
  const free = freeTools.filter((f) => f.relatedCategory === category.slug).map((f) => f.slug);
  const crumbs = [{ name: category.name, path: `/${category.slug}/` }];
  if (sub) crumbs.push({ name: sub.name, path: `/${category.slug}/${sub.slug}/` });
  const title = sub ? `${sub.name} Tools` : category.name;

  return (
    <>
      <JsonLd data={[tools.length ? itemListSchema(tools.map((t) => ({ name: t.name, path: `/${t.slug}/` }))) : null]} />
      <PageHero tone="tint">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">{sub ? sub.description : category.description}</p>
        <nav aria-label={`${category.name} subcategories`} className="mt-6 flex flex-wrap gap-2">
          <Link href={`/${category.slug}/`} className={`chip ${!sub ? "border-brand-600 bg-brand-50 text-brand-800" : "hover:border-ink-300"}`} aria-current={!sub ? "page" : undefined}>All</Link>
          {category.subcategories.map((s) => {
            const n = toolsInSubcategory(category.slug, s.slug).length;
            const active = sub?.slug === s.slug;
            return (
              <Link key={s.slug} href={`/${category.slug}/${s.slug}/`} className={`chip ${active ? "border-brand-600 bg-brand-50 text-brand-800" : "hover:border-ink-300"}`} aria-current={active ? "page" : undefined}>
                {s.name}{n > 0 && <span className="text-ink-400">{n}</span>}
              </Link>
            );
          })}
        </nav>
      </PageHero>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-w-0 space-y-12">
          {!sub && (
            <div className="prose-body max-w-3xl">
              {category.intro.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
            </div>
          )}

          <section aria-labelledby="list-h">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="list-h" className="h-section">{tools.length ? `${tools.length} ${tools.length === 1 ? "tool" : "tools"}` : "Tools"}</h2>
              <Link href={`/tools/?category=${category.slug}`} className="text-sm font-semibold text-brand-700 hover:underline">Filter &amp; compare →</Link>
            </div>
            {tools.length ? (
              <div className="mt-5"><ToolGrid tools={tools} /></div>
            ) : (
              <div className="mt-5 rounded-[var(--radius-card)] border border-dashed border-ink-300 p-8 text-center">
                <p className="font-medium text-ink-900">We&apos;re researching tools for this {sub ? "subcategory" : "category"}.</p>
                <p className="mt-2 text-sm text-ink-600">We only add tools once we&apos;ve written a genuinely useful profile. Meanwhile, browse <Link href="/tools/" className="link">all tools</Link>.</p>
              </div>
            )}
          </section>

          {comparisons.length > 0 && (
            <section aria-labelledby="cmp-h">
              <h2 id="cmp-h" className="h-section">Comparisons</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">{comparisons.map((c) => <ComparisonCard key={c.slug} c={c} />)}</div>
            </section>
          )}

          {guides.length > 0 && (
            <section aria-labelledby="g-h">
              <h2 id="g-h" className="h-section">Guides</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{guides.map((g) => <GuideCard key={g.slug} g={g} />)}</div>
            </section>
          )}

          {tools.length > 0 && <AffiliateDisclosure variant="box" />}
        </div>

        <aside className="space-y-8">
          <FreeToolLinks slugs={free.length ? free : undefined} title={free.length ? "Related free tools" : "Free tools"} />
        </aside>
      </div>
    </>
  );
}
