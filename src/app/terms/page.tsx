import Link from "next/link";
import { DocPage } from "@/components/DocPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${site.name}.`,
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <DocPage title="Terms of Use" path="/terms/" updated={site.policiesUpdated}>
      <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Information only</h2>
      <p>
        Content on this site is for general information. Software features, plans and prices change frequently and may differ by region. Always confirm details on the provider&apos;s official website before making a decision. Nothing here is professional, legal, financial or security advice.
      </p>
      <h2>Third-party products and websites</h2>
      <p>
        We link to third-party websites and products, some through affiliate links (see our <Link href="/affiliate-disclosure/">Affiliate Disclosure</Link>). We are not responsible for third-party products, services, content or policies. Your use of them is governed by their terms.
      </p>
      <h2>Free tools</h2>
      <p>
        Our free tools are provided &quot;as is&quot; without warranty. Check outputs before relying on them — for example, review generated slugs and campaign URLs before publishing.
      </p>
      <h2>Intellectual property</h2>
      <p>
        Site content and design are owned by {site.operator} unless stated otherwise. Product names, logos and trademarks belong to their respective owners and are used for identification only.
      </p>
      <h2>Acceptable use</h2>
      <p>Don&apos;t misuse the site — for example by attempting to disrupt it, scraping it at a harmful rate or using it for unlawful purposes.</p>
      <h2>Limitation of liability</h2>
      <p>To the extent permitted by law, we are not liable for losses arising from use of the site or reliance on its content.</p>
      <h2>Changes</h2>
      <p>We may update these terms. Continued use after changes means you accept the updated terms.</p>
      <h2>Contact</h2>
      <p><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></p>
    </DocPage>
  );
}
