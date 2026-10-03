import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/Section";
import { freeTools } from "@/lib/free-tools";
import { buildMetadata, itemListSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Online Tools — No Sign-Up Required",
  description: "Free browser-based tools: word counter, case converter, URL slug generator, SERP preview, password generator and UTM builder. No account needed.",
  path: "/free-tools/",
});

export default function FreeToolsPage() {
  return (
    <>
      <JsonLd data={[itemListSchema(freeTools.map((f) => ({ name: f.name, path: `/free-tools/${f.slug}/` })))]} />
      <PageHero tone="tint">
        <Breadcrumbs items={[{ name: "Free tools", path: "/free-tools/" }]} />
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">Free tools</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">Simple, private utilities that run in your browser. No sign-up, no paywall, no data uploaded.</p>
      </PageHero>
      <div className="container-page py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {freeTools.map((f) => (
            <Link key={f.slug} href={`/free-tools/${f.slug}/`} className="card card-hover group flex flex-col p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon name={f.icon} /></span>
              <span className="mt-4 text-lg font-semibold text-ink-900 group-hover:text-brand-700">{f.name}</span>
              <span className="mt-1.5 text-sm text-ink-600">{f.short}</span>
              <span className="mt-auto pt-4 text-sm font-semibold text-brand-700">Open tool →</span>
            </Link>
          ))}
        </div>
        <AdSlot slot="free-tools-index" className="mt-12" />
      </div>
    </>
  );
}
