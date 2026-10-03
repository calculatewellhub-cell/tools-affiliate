import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideCard } from "@/components/Lists";
import { PageHero } from "@/components/Section";
import { getGuides } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guides — Choosing & Using Software",
  description: "Practical guides on choosing AI tools, SEO software, automation platforms and understanding software pricing.",
  path: "/guides/",
});

export default function GuidesPage() {
  const guides = getGuides();
  return (
    <>
      <PageHero tone="tint">
        <Breadcrumbs items={[{ name: "Guides", path: "/guides/" }]} />
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">Guides</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">Practical, vendor-neutral advice for choosing and using software.</p>
      </PageHero>
      <div className="container-page py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => <GuideCard key={g.slug} g={g} />)}
        </div>
        <AdSlot slot="guides-index" className="mt-12" />
      </div>
    </>
  );
}
