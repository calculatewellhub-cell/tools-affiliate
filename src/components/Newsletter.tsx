import { site } from "@/lib/site";

/**
 * Posts directly to your email provider's hosted form endpoint
 * (NEXT_PUBLIC_NEWSLETTER_ACTION). Without one configured we show an
 * honest "coming soon" state rather than a form that does nothing.
 */
export function Newsletter() {
  return (
    <section aria-labelledby="nl-h" className="rounded-2xl border border-ink-200 bg-ink-50 px-6 py-8 sm:px-10 sm:py-10">
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <div>
          <h2 id="nl-h" className="h-section">Get new tool guides by email</h2>
          <p className="mt-2 text-ink-600">
            Occasional emails when we publish new comparisons, guides and free tools. No spam, unsubscribe any time.
          </p>
        </div>
        {site.newsletterAction ? (
          <form action={site.newsletterAction} method="post" target="_blank" className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="input sm:flex-1" />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        ) : (
          <p className="rounded-lg border border-dashed border-ink-300 bg-white px-4 py-3 text-sm text-ink-600">
            Our newsletter is launching soon. In the meantime, browse the latest <a href="/guides/" className="link">guides</a>.
          </p>
        )}
      </div>
      {site.newsletterAction ? (
        <p className="mt-4 text-xs text-ink-500">
          By subscribing you agree to our <a href="/privacy-policy/" className="underline">Privacy Policy</a>.
        </p>
      ) : null}
    </section>
  );
}
