import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";
import type { Faq, Guide, Tool } from "./types";

interface MetaInput {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/** Consistent title/description/canonical/OG/Twitter for every page. */
export function buildMetadata({
  title,
  description,
  path,
  noindex,
  type = "website",
  publishedTime,
  modifiedTime,
}: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const index = site.allowIndexing && !noindex;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: absoluteUrl(site.ogImage), width: 1200, height: 630, alt: site.name }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(site.ogImage)],
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders. Only emit schema that matches visible content.    */
/* ------------------------------------------------------------------ */

export type JsonLdObject = Record<string, unknown>;

export function organizationSchema(): JsonLdObject {
  return {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: `${site.url}/`,
    logo: absoluteUrl("/icon.svg"),
    parentOrganization: { "@type": "Organization", name: site.parentName, url: site.parentUrl },
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: `${site.url}/`,
    publisher: { "@id": `${site.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${site.url}/search/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLdObject {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** FAQPage only when the Q&A is visible on the page and written by us. */
export function faqSchema(faqs: Faq[]): JsonLdObject | null {
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

const APP_CATEGORY: Record<string, string> = {
  "video-tools": "MultimediaApplication",
  "security-tools": "SecurityApplication",
  "website-tools": "WebApplication",
  "writing-tools": "BusinessApplication",
  "productivity-tools": "BusinessApplication",
};

/**
 * SoftwareApplication describes the product. We add `offers` only when a
 * verified price is recorded, and a Review only when the tool has genuinely
 * been tested and rated per our methodology. No AggregateRating is ever
 * emitted because we do not collect user ratings.
 */
export function softwareSchema(tool: Tool): JsonLdObject {
  const schema: JsonLdObject = {
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.shortDescription,
    url: tool.websiteUrl,
    applicationCategory: APP_CATEGORY[tool.category] ?? "BusinessApplication",
    operatingSystem: tool.platforms.join(", "),
  };
  if (tool.dataStatus === "verified" && tool.pricing.freePlan === "yes") {
    schema.offers = { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free plan available" };
  }
  const ev = tool.evaluation;
  if (ev.status === "tested" && ev.rating && ev.testedBy && ev.testedOn && ev.summary) {
    schema.review = {
      "@type": "Review",
      author: { "@type": "Person", name: ev.testedBy },
      datePublished: ev.testedOn,
      reviewBody: ev.summary,
      reviewRating: { "@type": "Rating", ratingValue: ev.rating.score, bestRating: ev.rating.max, worstRating: 0 },
      publisher: { "@id": `${site.url}/#organization` },
    };
  }
  return schema;
}

export function articleSchema(guide: Guide, path: string): JsonLdObject {
  return {
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.published,
    dateModified: guide.updated,
    author: { "@type": "Organization", name: guide.author },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(path),
  };
}

export function itemListSchema(items: { name: string; path: string }[]): JsonLdObject {
  return {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(it.path),
      name: it.name,
    })),
  };
}
