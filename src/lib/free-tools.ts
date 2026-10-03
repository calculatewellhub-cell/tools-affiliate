import type { Faq } from "./types";

/**
 * Our own free utilities. Each entry needs a matching interactive component
 * registered in src/components/free-tools/index.ts.
 */
export interface FreeTool {
  slug: string;
  name: string;
  short: string;
  icon: string;
  intro: string[];
  howTo: string[];
  faqs: Faq[];
  /** Related software in the database (tool slugs) — shown AFTER the tool, never as a gate. */
  relatedSoftware: string[];
  relatedCategory: string;
  seo: { title: string; description: string };
}

export const freeTools: FreeTool[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    short: "Count words, characters, sentences and paragraphs, with reading and speaking time.",
    icon: "pen",
    intro: [
      "Paste or type text to see an instant count of words, characters (with and without spaces), sentences and paragraphs, plus estimated reading and speaking time.",
      "Useful for essays with word limits, meta descriptions, social posts and scripts. Your text stays in your browser — nothing is uploaded.",
    ],
    howTo: [
      "Type or paste your text into the box.",
      "Read the live counts below the editor.",
      "Use the reading-time estimate to plan articles, and the speaking-time estimate for video or podcast scripts.",
    ],
    faqs: [
      { q: "How are words counted?", a: "Any run of characters separated by spaces or line breaks counts as one word. Hyphenated words count as one word." },
      { q: "How is reading time calculated?", a: "We assume an average silent reading speed of about 220 words per minute and a speaking speed of about 140 words per minute. Real speeds vary by reader and content." },
      { q: "Is my text stored?", a: "No. The counter runs entirely in your browser and your text is never sent to our servers." },
    ],
    relatedSoftware: ["grammarly", "quillbot"],
    relatedCategory: "writing-tools",
    seo: {
      title: "Free Word Counter — Words, Characters & Reading Time",
      description: "Free online word counter: count words, characters, sentences and paragraphs and estimate reading and speaking time. Private — runs in your browser.",
    },
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    short: "Convert text to UPPERCASE, lowercase, Title Case, Sentence case and more.",
    icon: "layers",
    intro: [
      "Convert text between common letter cases in one click — handy for headings, titles, file names and fixing text typed with Caps Lock on.",
      "Includes developer-friendly formats such as camelCase, snake_case and kebab-case.",
    ],
    howTo: ["Paste your text.", "Click the case you want.", "Copy the result."],
    faqs: [
      { q: "What is Title Case?", a: "Title Case capitalises the first letter of most words. Our converter keeps short words such as 'and', 'of' and 'the' lowercase unless they start the title. Style guides differ, so check yours for headlines." },
      { q: "What is Sentence case?", a: "Only the first letter of each sentence is capitalised. Proper nouns may need fixing manually afterwards." },
    ],
    relatedSoftware: ["grammarly", "adobe-express"],
    relatedCategory: "writing-tools",
    seo: {
      title: "Free Case Converter — Upper, Lower, Title & Sentence Case",
      description: "Convert text to uppercase, lowercase, Title Case, Sentence case, camelCase, snake_case or kebab-case instantly. Free and private.",
    },
  },
  {
    slug: "slug-generator",
    name: "URL Slug Generator",
    short: "Turn any title into a clean, SEO-friendly URL slug.",
    icon: "globe",
    intro: [
      "Convert a page title into a short, readable URL slug: lowercase, hyphen-separated and free of special characters.",
      "Optionally remove common stop words to keep slugs concise.",
    ],
    howTo: ["Enter a title or phrase.", "Choose whether to remove stop words.", "Copy the generated slug into your CMS."],
    faqs: [
      { q: "Should I remove stop words from URLs?", a: "Shorter slugs are easier to read and share, so removing words like 'a', 'the' and 'of' often helps. Keep them if removing them changes the meaning." },
      { q: "Should I change slugs on published pages?", a: "Avoid it where possible. If you must, set up a 301 redirect from the old URL to the new one." },
    ],
    relatedSoftware: ["semrush", "hostinger"],
    relatedCategory: "seo-tools",
    seo: {
      title: "Free URL Slug Generator — SEO-Friendly Slugs",
      description: "Generate clean, lowercase, hyphenated URL slugs from any title. Optional stop-word removal. Free SEO slug generator.",
    },
  },
  {
    slug: "serp-snippet-preview",
    name: "SERP Snippet Preview",
    short: "Preview how a title and meta description may look in search results, with length checks.",
    icon: "search",
    intro: [
      "Write a page title and meta description and see an approximate preview of a search result, with character counts and pixel-width estimates.",
      "Search engines may rewrite titles and descriptions, so treat this as a guide rather than a guarantee.",
    ],
    howTo: [
      "Enter your page title, URL and meta description.",
      "Watch the counters — aim to keep the title within roughly 600 pixels and the description within roughly 920 pixels on desktop.",
      "Adjust wording until the key message appears before any truncation.",
    ],
    faqs: [
      { q: "How long should a title tag be?", a: "There is no fixed character limit. Desktop results typically truncate titles at roughly 600 pixels, which is often around 50–60 characters. Put the most important words first." },
      { q: "Does Google always use my meta description?", a: "No. Google may generate its own snippet from page content when it better matches the query. A clear, accurate description still helps." },
    ],
    relatedSoftware: ["semrush", "writesonic"],
    relatedCategory: "seo-tools",
    seo: {
      title: "Free SERP Snippet Preview — Title & Meta Description Checker",
      description: "Preview your title tag and meta description as a search result, with character counts and pixel-width estimates. Free SEO tool.",
    },
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    short: "Create strong random passwords in your browser using secure randomness.",
    icon: "shield",
    intro: [
      "Generate strong, random passwords using your browser's cryptographically secure random number generator. Nothing is sent over the network or stored.",
      "For day-to-day security, a password manager can generate and remember unique passwords for every account.",
    ],
    howTo: ["Choose a length (16+ characters recommended).", "Select which character types to include.", "Generate and copy the password into your account or password manager."],
    faqs: [
      { q: "Is this password generator safe?", a: "Passwords are generated locally with the Web Crypto API (crypto.getRandomValues) and never leave your device. For extra caution, you can disconnect from the internet before generating." },
      { q: "How long should a password be?", a: "Longer is stronger. 16 or more random characters is a good default for most accounts. Use a unique password for every site." },
    ],
    relatedSoftware: [],
    relatedCategory: "security-tools",
    seo: {
      title: "Free Password Generator — Strong Random Passwords",
      description: "Generate strong random passwords locally in your browser with secure randomness. Choose length and character sets. Nothing is stored.",
    },
  },
  {
    slug: "utm-builder",
    name: "UTM Link Builder",
    short: "Build campaign URLs with UTM parameters for analytics tracking.",
    icon: "megaphone",
    intro: [
      "Add UTM parameters to a link so analytics tools can attribute visits to the right campaign, source and medium.",
      "Use consistent, lowercase values across your team to keep reports clean.",
    ],
    howTo: [
      "Paste the destination URL.",
      "Fill in source (e.g. newsletter), medium (e.g. email) and campaign name.",
      "Copy the generated URL and use it in your campaign.",
    ],
    faqs: [
      { q: "Which UTM parameters are required?", a: "Most analytics setups expect utm_source, utm_medium and utm_campaign. utm_term and utm_content are optional." },
      { q: "Should I use UTM links on internal links?", a: "No. UTM parameters on links within your own site can overwrite the original traffic source. Use them only on external campaign links." },
    ],
    relatedSoftware: ["zapier", "make", "semrush"],
    relatedCategory: "marketing-tools",
    seo: {
      title: "Free UTM Link Builder — Campaign URL Generator",
      description: "Build campaign URLs with utm_source, utm_medium and utm_campaign parameters for analytics. Free, fast and private.",
    },
  },
];

export const getFreeTool = (slug: string) => freeTools.find((t) => t.slug === slug);
