import { DocPage } from "@/components/DocPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Contact ${site.name} with corrections, questions or partnership enquiries.`,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <DocPage title="Contact us" path="/contact/" intro="Corrections, questions and partnership enquiries are all welcome.">
      <h2>Corrections</h2>
      <p>
        If a price, plan or feature on our site is out of date, please tell us which page and what has changed — a link to the official source helps us update it faster.
      </p>
      <h2>Vendors and partnerships</h2>
      <p>
        Vendors can contact us to report factual errors or discuss affiliate programmes. Partnerships never buy a placement, a rating or favourable wording — see our <a href="/editorial-policy/">editorial policy</a>.
      </p>
      <h2>Send a message</h2>
      {site.contactFormEndpoint ? (
        <form action={site.contactFormEndpoint} method="post" className="not-prose mt-4 space-y-4">
          <div>
            <label htmlFor="c-name" className="text-sm font-medium text-ink-800">Name</label>
            <input id="c-name" name="name" required autoComplete="name" className="input mt-1.5" />
          </div>
          <div>
            <label htmlFor="c-email" className="text-sm font-medium text-ink-800">Email</label>
            <input id="c-email" name="email" type="email" required autoComplete="email" className="input mt-1.5" />
          </div>
          <div>
            <label htmlFor="c-topic" className="text-sm font-medium text-ink-800">Topic</label>
            <select id="c-topic" name="topic" className="input mt-1.5">
              <option>Correction</option>
              <option>General question</option>
              <option>Vendor / partnership</option>
            </select>
          </div>
          <div>
            <label htmlFor="c-msg" className="text-sm font-medium text-ink-800">Message</label>
            <textarea id="c-msg" name="message" rows={6} required className="input mt-1.5" />
          </div>
          {/* Honeypot field for basic spam protection (most form backends support this name). */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <button type="submit" className="btn-primary">Send message</button>
          <p className="text-xs text-ink-500">We use your details only to reply. See our <a href="/privacy-policy/" className="underline">Privacy Policy</a>.</p>
        </form>
      ) : (
        <p>
          Email us at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      )}
    </DocPage>
  );
}
