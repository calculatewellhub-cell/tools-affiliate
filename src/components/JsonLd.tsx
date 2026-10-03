import type { JsonLdObject } from "@/lib/seo";

/** Renders one JSON-LD @graph. Pass only schema that reflects visible content. */
export function JsonLd({ data }: { data: (JsonLdObject | null | undefined)[] }) {
  const graph = data.filter(Boolean);
  if (!graph.length) return null;
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
