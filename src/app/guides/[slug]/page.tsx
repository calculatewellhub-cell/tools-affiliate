import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { FreeToolLinks, GuideCard, ToolGrid } from "@/components/Lists";
import { getCategory, getGuide, getGuides, toolsBySlugs } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { articleSchema, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => getGuides().map((g) => ({ slug: g.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return buildMetadata({ title: g.title, description: g.description, path: `/guides/${g.slug}/`, type: "article", publishedTime: g.published, modifiedTime: g.updated });
}

export default async function GuidePage({ params }: Props) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const tools = toolsBySlugs(g.relatedTools);
  const category = getCategory(g.category);
  const more = getGuides().filter((x) => x.slug !== g.slug).slice(0, 3);
  const path = `/guides/${g.slug}/`;

  // Split article HTML after the 2nd <h2> to place one in-content ad slot.
  const parts = g.html.split(/(?=<h2 )/);
  const first = parts.slice(0, 3).join("");
  const rest = parts.slice(3).join("");

  return (
    <>
      <JsonLd data={[articleSchema(g, path)]} />
      <div className="border-b border-ink-200 bg-ink-50">
        <div className="container-page max-w-4xl py-8 sm:py-10">
          <Breadcrumbs items={[{ name: "Guides", path: "/guides/" }, { name: g.title, path }]} />
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-balance text-ink-950 sm:text-4xl">{g.title}</h1>
          <p className="mt-3 text-lg text-ink-600">{g.description}</p>
          <p className="mt-4 text-sm text-ink-500">
            By {g.author} · Updated {formatDate(g.updated)} · {g.readingMinutes} min read
            {category && <> · <Link href={`/${category.slug}/`} className="hover:underline">{category.name}</Link></>}
          </p>
        </div>
      </div>
      <div className="container-page grid max-w-6xl gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="min-w-0 max-w-3xl">
          {g.headings.length > 2 && (
            <nav aria-label="Contents" className="mb-8 rounded-lg border border-ink-200 p-4 lg:hidden">
              <p className="text-sm font-semibold text-ink-900">Contents</p>
              <ul className="mt-2 space-y-1 text-sm">{g.headings.map((h) => <li key={h.id}><a href={`#${h.id}`} className="text-ink-600 hover:text-brand-700">{h.text}</a></li>)}</ul>
            </nav>
          )}
          <div className="prose-body" dangerouslySetInnerHTML={{ __html: first }} />
          {rest && (
            <>
              <AdSlot slot={`guide-${g.slug}-mid`} className="my-8" />
              <div className="prose-body mt-5" dangerouslySetInnerHTML={{ __html: rest }} />
            </>
          )}

          {tools.length > 0 && (
            <section aria-labelledby="tools-h" className="mt-14">
              <h2 id="tools-h" className="h-section">Tools mentioned in this guide</h2>
              <div className="mt-5"><ToolGrid tools={tools} cols={2} /></div>
              <div className="mt-4"><AffiliateDisclosure /></div>
            </section>
          )}
          <AdSlot slot={`guide-${g.slug}-end`} className="mt-12" />
        </article>
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          {g.headings.length > 2 && (
            <nav aria-label="On this page" className="hidden lg:block">
              <p className="text-sm font-semibold text-ink-900">On this page</p>
              <ul className="mt-3 space-y-1.5 border-l border-ink-200 text-sm">
                {g.headings.map((h) => <li key={h.id}><a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-3 text-ink-600 hover:border-brand-600 hover:text-brand-700">{h.text}</a></li>)}
              </ul>
            </nav>
          )}
          <FreeToolLinks slugs={g.relatedFreeTools} title="Related free tools" />
        </aside>
      </div>
      {more.length > 0 && (
        <section aria-labelledby="more-h" className="container-page max-w-6xl">
          <h2 id="more-h" className="h-section">More guides</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{more.map((x) => <GuideCard key={x.slug} g={x} />)}</div>
        </section>
      )}
    </>
  );
}
