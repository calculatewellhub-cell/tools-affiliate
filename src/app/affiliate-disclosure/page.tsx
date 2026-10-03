import { DocPage } from "@/components/DocPage";
import { buildMetadata } from "@/lib/seo";
import { disclosureText, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description: `How ${site.name} earns money through affiliate links and advertising, and how we keep it separate from our editorial content.`,
  path: "/affiliate-disclosure/",
});

export default function AffiliateDisclosurePage() {
  return (
    <DocPage title="Affiliate Disclosure" path="/affiliate-disclosure/" updated={site.policiesUpdated}>
      <p><strong>{disclosureText}</strong></p>
      <h2>How affiliate links work</h2>
      <p>
        Some links on this site are affiliate links. If you click one and then sign up for or buy a product, the company may pay us a commission. You pay the same price whether or not you use our link.
      </p>
      <p>
        Affiliate links are marked in our code with <code>rel=&quot;sponsored&quot;</code>, as recommended by search engines, and pages containing them show a disclosure near the call-to-action buttons.
      </p>
      <h2>What affiliate relationships do not affect</h2>
      <ul>
        <li>Whether a tool is included on the site.</li>
        <li>The pros, cons and limitations we describe.</li>
        <li>How tools are presented in comparisons — we don&apos;t declare paid &quot;winners&quot;.</li>
        <li>Which tools we list as alternatives, including tools with no affiliate programme.</li>
      </ul>
      <p>Many tools on this site have no affiliate relationship with us at all.</p>
      <h2>Advertising</h2>
      <p>
        We may display advertising, for example through Google AdSense, on informational pages such as guides and free tools. Ads are labelled &quot;Advertisement&quot; and are styled differently from our own buttons and links. Advertisers do not influence our content.
      </p>
      <h2>Questions</h2>
      <p>Contact us at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.</p>
    </DocPage>
  );
}
