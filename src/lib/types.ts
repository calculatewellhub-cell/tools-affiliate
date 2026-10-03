/**
 * Content model for CalculateWellHub Tools.
 *
 * All site content lives in /content as JSON or Markdown. Pages are generated
 * from this data — adding a tool means adding a JSON file, not writing a page.
 * See README.md → "Adding a new tool".
 */

/** "unknown" is a first-class value: we never guess facts we have not verified. */
export type TriState = "yes" | "no" | "unknown";

export type PricingModel = "free" | "freemium" | "free-trial" | "paid" | "unknown";

export type DataStatus =
  /** Placeholder/demo profile. Facts have NOT been verified against the vendor. */
  | "draft"
  /** An editor has checked every field against the official website on `dates.lastChecked`. */
  | "verified";

export interface PricingPlan {
  name: string;
  /** Exact price string as shown on the vendor site, e.g. "$12/month". null = not recorded. */
  price: string | null;
  billing?: string;
  highlights: string[];
}

export interface ToolPricing {
  model: PricingModel;
  freePlan: TriState;
  freeTrial: TriState;
  paidPlans: TriState;
  /** e.g. "$12/month billed annually". null = not recorded → "Check current pricing". */
  startingPrice: string | null;
  plans: PricingPlan[];
  /** Official (non-affiliate) pricing page, used for editorial reference. */
  pricingPageUrl: string | null;
  notes?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FreeVsPaidRow {
  feature: string;
  free: string;
  paid: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Editorial evaluation. A tool only shows a rating or "We tested" wording when
 * status === "tested" AND testedOn/testedBy/summary are filled in.
 */
export interface Evaluation {
  status: "not-tested" | "in-progress" | "tested";
  testedOn: string | null;
  testedBy: string | null;
  summary: string | null;
  /** What an evaluator should check. Shown while the tool is untested. */
  checklist: string[];
  /** Real first-hand findings. Only filled after actual testing. */
  findings: string[];
  /** Score per the published methodology (/how-we-evaluate/). null = no rating shown. */
  rating: { score: number; max: number } | null;
}

export interface ToolSeo {
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
}

export interface Tool {
  slug: string;
  name: string;
  /** Path under /public, e.g. "/logos/grammarly.svg". Optional — a monogram is used otherwise. */
  logo?: string;
  /** Accent colour for the monogram fallback. */
  brandColor?: string;
  /** Primary category slug (see content/categories.json). */
  category: string;
  /** Subcategory slugs, may span categories using "category/sub" or just "sub" within the primary category. */
  subcategories: string[];
  /** Free-text tags used by search (features, use cases, synonyms). */
  tags: string[];
  isAI: boolean;
  platforms: string[];
  tagline: string;
  shortDescription: string;
  /** "What is X?" — paragraphs of original explanation. */
  description: string[];
  websiteUrl: string;
  pricing: ToolPricing;
  freeVsPaid: FreeVsPaidRow[];
  keyFeatures: FeatureItem[];
  howItWorks: string[];
  useCases: string[];
  bestFor: string[];
  notIdealFor: string[];
  pros: string[];
  cons: string[];
  /** Slugs of tools in this database. */
  alternatives: string[];
  /** Competitor names (may or may not be in the database). */
  competitors: string[];
  screenshots: Screenshot[];
  evaluation: Evaluation;
  faqs: Faq[];
  relatedGuides: string[];
  relatedFreeTools: string[];
  seo: ToolSeo;
  dates: {
    published: string;
    lastUpdated: string;
    /** Date the facts/pricing were last checked on the official site. */
    lastChecked: string | null;
  };
  dataStatus: DataStatus;
  featured?: boolean;
}

export type AffiliateStatus = "active" | "pending" | "applied" | "none" | "paused";

export interface AffiliateRecord {
  official_url: string;
  affiliate_url: string | null;
  affiliate_status: AffiliateStatus;
  network?: string;
  notes?: string;
  updated?: string;
}

export interface Subcategory {
  slug: string;
  name: string;
  description: string;
}

export interface Category {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  intro: string[];
  subcategories: Subcategory[];
  seo: { title: string; description: string };
}

export interface Comparison {
  slug: string;
  toolA: string;
  toolB: string;
  title: string;
  intro: string[];
  similarities: string[];
  differences: { aspect: string; a: string; b: string }[];
  considerA: string[];
  considerB: string[];
  faqs: Faq[];
  seo: { title: string; description: string };
  dates: { published: string; lastUpdated: string };
  dataStatus: DataStatus;
}

export interface AlternativesPage {
  slug: string;
  tool: string;
  title: string;
  intro: string[];
  whyLookElsewhere: string[];
  /** Ordered list of tool slugs from the database, each with a short editorial note. */
  picks: { slug: string; note: string }[];
  faqs: Faq[];
  seo: { title: string; description: string };
  dates: { published: string; lastUpdated: string };
  dataStatus: DataStatus;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  published: string;
  updated: string;
  relatedTools: string[];
  relatedFreeTools: string[];
  html: string;
  headings: { id: string; text: string }[];
  readingMinutes: number;
}
