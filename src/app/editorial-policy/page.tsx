import Link from "next/link";
import { DocPage } from "@/components/DocPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Editorial Policy",
  description: "Our editorial standards: how we research tools, verify pricing, label untested products and keep commercial relationships separate from content.",
  path: "/editorial-policy/",
});

export default function EditorialPolicyPage() {
  return (
    <DocPage title="Editorial Policy" path="/editorial-policy/" updated={site.policiesUpdated} intro="Our goal is useful, accurate information that helps you choose software confidently.">
      <h2>Our standards</h2>
      <ul>
        <li><strong>No invented facts.</strong> We don&apos;t publish made-up prices, commission rates, ratings, reviews, testimonials or user numbers.</li>
        <li><strong>Unknown means unknown.</strong> If we haven&apos;t verified something — a free plan, a trial, a price — we say so rather than guess.</li>
        <li><strong>Experience is never manufactured.</strong> We only use words like &quot;we tested&quot; when a named person has actually used the product, and we record when.</li>
        <li><strong>Balanced comparisons.</strong> We explain which type of user each tool suits instead of declaring universal winners.</li>
        <li><strong>Original writing.</strong> We write our own explanations and don&apos;t copy vendor or competitor content.</li>
      </ul>
      <h2>Content status labels</h2>
      <p>Every tool, comparison and alternatives page has a status:</p>
      <ul>
        <li><strong>Preliminary</strong> — the page structure and general description are in place, but the details have not yet been checked against the official website. These pages show a visible notice.</li>
        <li><strong>Verified</strong> — an editor has checked the facts and pricing against the official website on the date shown as &quot;last checked&quot;.</li>
        <li><strong>Tested</strong> — in addition, someone has used the product hands-on following <Link href="/how-we-evaluate/">our evaluation method</Link>.</li>
      </ul>
      <h2>Pricing</h2>
      <p>
        Software pricing changes frequently and varies by country, currency, taxes and billing period. Every tool page shows the date pricing was last checked. Always confirm the current price on the official website before buying.
      </p>
      <h2>Updates and corrections</h2>
      <p>
        We review pages periodically and when we learn of a change. If you spot an error, please <Link href="/contact/">contact us</Link>. Significant corrections are reflected in the page&apos;s &quot;updated&quot; date.
      </p>
      <h2>Commercial independence</h2>
      <p>
        We earn money through affiliate links and advertising (see our <Link href="/affiliate-disclosure/">affiliate disclosure</Link>). Vendors cannot pay for inclusion, placement, wording or ratings, and we list tools that have no affiliate programme when they are a good fit.
      </p>
      <h2>Use of AI</h2>
      <p>
        We may use AI tools to help with research, outlining or editing. A human editor is responsible for every published page, checks facts and is accountable for its accuracy.
      </p>
    </DocPage>
  );
}
