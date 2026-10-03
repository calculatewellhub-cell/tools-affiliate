/** Global site configuration. Edit here, not in components. */

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tools.calculatewellhub.in";

export const site = {
  name: "CalculateWellHub Tools",
  shortName: "CWH Tools",
  url: rawUrl.replace(/\/+$/, ""),
  parentName: "CalculateWellHub",
  parentUrl: "https://calculatewellhub.in/",
  tagline: "Find the right tool for the job",
  description:
    "Discover free tools, AI software, SaaS platforms, productivity apps and marketing tools — with clear pricing notes, honest limitations and side-by-side comparisons.",
  locale: "en",
  /**
   * TODO(before launch): replace with a mailbox you actually monitor.
   * Used on the Contact, Privacy and Affiliate Disclosure pages.
   */
  contactEmail: "contact@calculatewellhub.in",
  /** Legal entity / operator name shown in policies. Update to your registered name. */
  operator: "CalculateWellHub",
  /** Fallback Open Graph image under /public. */
  ogImage: "/og-default.png",
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  showAdPlaceholders: process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true",
  newsletterAction: process.env.NEXT_PUBLIC_NEWSLETTER_ACTION || "",
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  /**
   * Thin-content guard: listing pages with fewer items than this are rendered
   * (useful for visitors) but marked noindex and left out of the sitemap.
   */
  minItemsToIndex: { category: 1, subcategory: 3, alternatives: 3 },
  /**
   * Quality gate: pages built from records with dataStatus "draft" are noindex
   * until an editor verifies them and sets dataStatus to "verified".
   * Set to true only if you deliberately want unverified profiles indexed.
   */
  indexDrafts: false,
  /** Policy pages show this as their "last updated" date. */
  policiesUpdated: "2026-10-03",
} as const;

export const disclosureText =
  "We may earn a commission if you purchase or sign up through links on this page. This does not affect the price you pay.";

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${p}`;
}

export const mainNav = [
  { href: "/tools/", label: "All Tools" },
  { href: "/ai-tools/", label: "AI Tools" },
  { href: "/free-tools/", label: "Free Tools" },
  { href: "/comparisons/", label: "Comparisons" },
  { href: "/guides/", label: "Guides" },
];

export const legalNav = [
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
  { href: "/editorial-policy/", label: "Editorial Policy" },
  { href: "/how-we-evaluate/", label: "How We Evaluate" },
  { href: "/affiliate-disclosure/", label: "Affiliate Disclosure" },
  { href: "/privacy-policy/", label: "Privacy Policy" },
  { href: "/cookie-policy/", label: "Cookie Policy" },
  { href: "/terms/", label: "Terms" },
];
