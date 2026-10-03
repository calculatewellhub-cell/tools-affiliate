import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { freeToolComponents } from "@/components/free-tools";
import { JsonLd } from "@/components/JsonLd";
import { FreeToolLinks, ToolGrid } from "@/components/Lists";
import { getCategory, toolsBySlugs } from "@/lib/content";
import { freeTools, getFreeTool } from "@/lib/free-tools";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => freeTools.map((f) => ({ slug: f.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = getFreeTool((await params).slug);
  if (!f) return {};
  return buildMetadata({ title: f.seo.title, description: f.seo.description, path: `/free-tools/${f.slug}/` });
}

export default async function FreeToolPage({ params }: Props) {
  const f = getFreeTool((await params).slug);
  if (!f) notFound();
  const Widget = freeToolComponents[f.slug];
  const software = toolsBySlugs(f.relatedSoftware);
  const category = getCategory(f.relatedCategory);
  const others = freeTools.filter((x) => x.slug !== f.slug).map((x) => x.slug);

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "WebApplication",
            name: f.name,
            url: absoluteUrl(`/free-tools/${f.slug}/`),
            description: f.short,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any (web browser)",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          faqSchema(f.faqs),
        ]}
      />
      <div className="border-b border-ink-200 bg-ink-50">
        <div className="container-page py-8">
          <Breadcrumbs items={[{ name: "Free tools", path: "/free-tools/" }, { name: f.name, path: `/free-tools/${f.slug}/` }]} />
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">{f.name}</h1>
          <p className="mt-2 max-w-2xl text-lg text-ink-600">{f.short}</p>
        </div>
      </div>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-w-0 space-y-12">
          {/* The tool always comes first — never gated behind a click or sign-up. */}
          <section aria-label={f.name} className="card p-5 sm:p-6">
            <Widget />
          </section>

          <section className="prose-body max-w-3xl">
            <h2>About this tool</h2>
            {f.intro.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
            <h2>How to use the {f.name.toLowerCase()}</h2>
            <ol>{f.howTo.map((s) => <li key={s}>{s}</li>)}</ol>
          </section>

          <AdSlot slot={`free-tool-${f.slug}`} />

          <Faq items={f.faqs} />

          {software.length > 0 && (
            <section aria-labelledby="sw-h">
              <h2 id="sw-h" className="h-section">Need more than a free tool?</h2>
              <p className="mt-2 text-ink-600">
                These {category ? category.name.toLowerCase() : "tools"} offer more advanced features. Check each profile for free plan details and limitations.
              </p>
              <div className="mt-5"><ToolGrid tools={software} /></div>
              <div className="mt-4"><AffiliateDisclosure /></div>
            </section>
          )}
          {software.length === 0 && category && (
            <p className="text-ink-600">
              Looking for more? Browse <Link href={`/${category.slug}/`} className="link">{category.name.toLowerCase()}</Link>.
            </p>
          )}
        </div>
        <aside className="space-y-8">
          <FreeToolLinks slugs={others} title="Other free tools" />
        </aside>
      </div>
    </>
  );
}
