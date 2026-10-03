import Link from "next/link";
import { DocPage } from "@/components/DocPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: `How ${site.name} uses cookies and similar technologies, and how to control them.`,
  path: "/cookie-policy/",
});

export default function CookiePolicyPage() {
  return (
    <DocPage title="Cookie Policy" path="/cookie-policy/" updated={site.policiesUpdated}>
      <p>Cookies are small text files stored by your browser. This page explains how they may be used on this site.</p>
      <h2>Cookies we set</h2>
      <p>
        The site itself does not require cookies to work. Some features may use your browser&apos;s local storage to remember preferences on your device only.
      </p>
      <h2>Third-party cookies</h2>
      <ul>
        <li><strong>Advertising</strong> — if Google AdSense is enabled, Google and its partners may set cookies to serve and measure ads, including personalised ads where you have consented.</li>
        <li><strong>Analytics</strong> — if an analytics service is enabled, it may set cookies to measure visits in aggregate.</li>
        <li><strong>Affiliate tracking</strong> — when you click an affiliate link, the destination website or affiliate network may set cookies on <em>their</em> site to attribute the referral.</li>
      </ul>
      <h2>Your choices</h2>
      <ul>
        <li>Where required by law, a consent banner lets you accept or reject non-essential cookies.</li>
        <li>You can block or delete cookies in your browser settings.</li>
        <li>You can opt out of personalised Google ads at <a href="https://adssettings.google.com/" rel="noopener">Google Ads Settings</a>.</li>
      </ul>
      <p>See our <Link href="/privacy-policy/">Privacy Policy</Link> for more detail.</p>
    </DocPage>
  );
}
