import Link from "next/link";
import { DocPage } from "@/components/DocPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects information, including cookies, advertising and affiliate links.`,
  path: "/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <DocPage title="Privacy Policy" path="/privacy-policy/" updated={site.policiesUpdated}>
      <p>
        This policy explains what information {site.operator} (&quot;we&quot;) collects when you use {site.url.replace(/^https?:\/\//, "")} and how we use it. If you have questions, contact <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li><strong>Information you send us</strong> — for example your name, email and message when you contact us or subscribe to our newsletter.</li>
        <li><strong>Technical information</strong> — our hosting provider may log standard request data such as IP address, browser type and pages requested, for security and reliability.</li>
        <li><strong>Cookies and similar technologies</strong> — used by advertising and analytics services if enabled. See our <Link href="/cookie-policy/">Cookie Policy</Link>.</li>
      </ul>
      <h2>Free tools</h2>
      <p>
        Our free tools (such as the word counter and password generator) run in your browser. The text and values you enter are not sent to our servers.
      </p>
      <h2>How we use information</h2>
      <ul>
        <li>To reply to messages and send newsletters you asked for.</li>
        <li>To keep the site secure and working.</li>
        <li>To understand which content is useful, if analytics is enabled.</li>
        <li>To show advertising, if enabled, as described below.</li>
      </ul>
      <h2>Advertising (Google AdSense)</h2>
      <p>
        If advertising is enabled, third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visits to this and/or other sites on the internet. You can opt out of personalised advertising by visiting <a href="https://adssettings.google.com/" rel="noopener">Google Ads Settings</a>, and learn more at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">How Google uses information from sites that use its services</a>. Where required by law (for example in the UK and European Economic Area), we ask for your consent before personalised ads are shown.
      </p>
      <h2>Affiliate links</h2>
      <p>
        When you click an affiliate link, the destination company or affiliate network may set cookies to record that you came from our site. Their use of data is governed by their own privacy policies.
      </p>
      <h2>Third-party services</h2>
      <p>
        We may use third-party providers for hosting, email newsletters, contact forms and analytics. They process data on our behalf under their own terms. Links to external websites are not covered by this policy.
      </p>
      <h2>Data retention</h2>
      <p>We keep personal information only as long as needed for the purposes above or as required by law.</p>
      <h2>Your rights</h2>
      <p>
        Depending on where you live (for example under the GDPR, UK GDPR, India&apos;s Digital Personal Data Protection Act, Australia&apos;s Privacy Act or Canadian and US state privacy laws), you may have rights to access, correct, delete or object to the use of your personal information. Contact us to make a request.
      </p>
      <h2>Children</h2>
      <p>This site is not directed at children under 13 (or the equivalent minimum age in your country), and we do not knowingly collect their personal information.</p>
      <h2>Changes</h2>
      <p>We may update this policy. The &quot;last updated&quot; date above shows when it last changed.</p>
    </DocPage>
  );
}
