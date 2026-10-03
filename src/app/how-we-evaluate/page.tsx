import Link from "next/link";
import { DocPage } from "@/components/DocPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "How We Evaluate Tools",
  description: "The methodology behind our tool evaluations and scores: what we test, how we weight it and when we show a rating.",
  path: "/how-we-evaluate/",
});

export default function HowWeEvaluatePage() {
  return (
    <DocPage title="How We Evaluate Tools" path="/how-we-evaluate/" updated={site.policiesUpdated} intro="A published, repeatable method — so you can judge our conclusions for yourself.">
      <h2>When we show a score</h2>
      <p>
        We only show a score after hands-on testing by a named person, using the criteria below. Tools that haven&apos;t been tested show an evaluation checklist instead of a score. We never show star ratings based on anything else, and we don&apos;t display aggregated &quot;user ratings&quot;.
      </p>
      <h2>What we look at</h2>
      <ol>
        <li><strong>Core job performance (30%)</strong> — how well it does the main thing it promises, measured on a fixed, repeatable test task for its category.</li>
        <li><strong>Ease of use (20%)</strong> — time to first useful result for a new user; clarity of the interface.</li>
        <li><strong>Value and pricing transparency (20%)</strong> — what the free plan genuinely allows; clarity of paid plans, renewal pricing and limits.</li>
        <li><strong>Privacy, security and data control (15%)</strong> — published policies, data-use settings, export options.</li>
        <li><strong>Support and documentation (15%)</strong> — quality of help documentation and responsiveness to a test question.</li>
      </ol>
      <h2>Category-specific tests</h2>
      <p>Each category has its own fixed test so results are comparable. For example:</p>
      <ul>
        <li><strong>Grammar tools:</strong> a standard passage with a known set of errors, plus a clean passage to measure false positives.</li>
        <li><strong>SEO tools:</strong> keyword estimates compared with Google Search Console data for a test site; a site audit on a site with deliberately introduced issues.</li>
        <li><strong>Video tools:</strong> producing a 60-second video from the same 150-word script.</li>
        <li><strong>Automation tools:</strong> building the same three-step workflow and testing error handling.</li>
        <li><strong>Hosting:</strong> load-time checks from several regions, plus renewal-price verification.</li>
      </ul>
      <h2>Recording results</h2>
      <p>
        Each test records who tested it, the date, the plan used and the findings. Tool pages show this information alongside any score. Tests are repeated when a product changes significantly.
      </p>
      <p>See also our <Link href="/editorial-policy/">editorial policy</Link>.</p>
    </DocPage>
  );
}
