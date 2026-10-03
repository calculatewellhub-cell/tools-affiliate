# CalculateWellHub Tools

Source for **https://tools.calculatewellhub.in/** — a software and tool discovery hub from [CalculateWellHub](https://calculatewellhub.in/): tool profiles, comparisons, alternatives, guides and free browser-based utilities.

The goal is **useful information → tool discovery → comparison → affiliate click**, with AdSense as a secondary, non-intrusive revenue source. The site is built so that it **cannot easily publish invented facts**: prices, ratings and "tested" claims only appear when the data behind them exists.

---

## Contents

1. [Stack and why](#stack-and-why)
2. [Run locally](#run-locally)
3. [Folder structure](#folder-structure)
4. [How pages are generated](#how-pages-are-generated)
5. [Add a new tool](#add-a-new-tool)
6. [Affiliate links](#affiliate-links)
7. [Edit pricing](#edit-pricing)
8. [Comparison and alternatives pages](#comparison-and-alternatives-pages)
9. [Guides](#guides)
10. [Free tools](#free-tools)
11. [Indexing rules (quality gate)](#indexing-rules-quality-gate)
12. [Deploy](#deploy)
13. [Connect tools.calculatewellhub.in](#connect-toolscalculatewellhubin)
14. [SEO checklist](#seo-checklist)
15. [AdSense setup checklist](#adsense-setup-checklist)
16. [Affiliate disclosure implementation](#affiliate-disclosure-implementation)
17. [Before launch: what still needs real data](#before-launch-what-still-needs-real-data)

---

## Stack and why

| Choice | Reason |
| --- | --- |
| **Next.js 16 (App Router) + TypeScript** | Server components render every page to HTML at build time; types catch content mistakes. |
| **Static export (`output: "export"`)** | `npm run build` produces plain HTML/CSS/JS in `out/`. Hosts anywhere — Cloudflare Pages, Netlify, Vercel, GitHub Pages, cPanel/Apache, Nginx, S3. No server to run or patch. |
| **Tailwind CSS 4** | Small CSS bundle, design tokens in one file (`src/app/globals.css`). |
| **JSON + Markdown content** | Adding a tool is editing data, not code. Easy to review in Git. |
| **`marked`** | The only runtime dependency besides Next/React; used at build time for guides. |

JavaScript is minimal: most pages ship no interactive code other than the header menu. Interactive JS is limited to the tool filters, search and the free tools.

Static export trade-offs (and how they are handled):
- No server-side forms → newsletter and contact forms post to a third-party form endpoint set via environment variables (see `.env.example`). Without one, the site shows honest fallbacks (mailto link, "newsletter launching soon").
- No server redirects → use your host's redirect rules if you ever rename a URL.

## Run locally

Requirements: Node.js 20.9+ (22 recommended).

```bash
npm install
cp .env.example .env.local     # optional; defaults work for local dev
npm run dev                    # http://localhost:3000
```

Other scripts:

```bash
npm run validate    # check content files (also runs automatically before build)
npm run typecheck   # TypeScript
npm run build       # static site in out/
npm start           # serve out/ locally to preview the production build
```

## Folder structure

```
content/                      ← all editable content
  categories.json             categories + subcategories
  affiliates.json             ★ the ONLY place affiliate URLs live
  tools/<slug>.json           one file per tool
  comparisons/<a>-vs-<b>.json comparison pages
  alternatives/<slug>-alternatives.json
  guides/<slug>.md            guides (Markdown + front matter)
public/                       static files (logos, og image, .htaccess)
scripts/validate-content.mjs  content checks (broken refs, honesty rules)
src/
  app/                        routes (Next.js App Router)
    page.tsx                  homepage
    [slug]/page.tsx           tools, categories, comparisons, alternatives (root URLs)
    [slug]/[sub]/page.tsx     subcategories, e.g. /ai-tools/ai-video/
    tools/ search/ free-tools/ guides/ comparisons/ alternatives/ reviews/
    about/ contact/ editorial-policy/ how-we-evaluate/ privacy-policy/ …
    sitemap.ts robots.ts search-index.json/route.ts
  components/                 reusable UI (ToolCard, OutboundButton, Faq, ProsCons, AdSlot…)
    free-tools/               interactive free tools
  views/                      page templates (ToolView, ComparisonView, …)
  lib/
    content.ts                loads + resolves content
    affiliate.ts              builds every outbound link
    indexing.ts               noindex/sitemap rules
    seo.ts                    metadata + JSON-LD builders
    site.ts                   site-wide settings (name, URL, contact email…)
    free-tools.ts             free tool copy, FAQ, related software
    types.ts                  the content model
```

## How pages are generated

| URL | Source |
| --- | --- |
| `/grammarly/` | `content/tools/grammarly.json` |
| `/writing-tools/` | `content/categories.json` |
| `/writing-tools/grammar/` | subcategory in `categories.json` |
| `/grammarly-vs-quillbot/` | `content/comparisons/grammarly-vs-quillbot.json` |
| `/grammarly-alternatives/` | `content/alternatives/grammarly-alternatives.json` |
| `/guides/<slug>/` | `content/guides/<slug>.md` |
| `/free-tools/<slug>/` | `src/lib/free-tools.ts` + component |

Tools, categories, comparisons and alternatives share the root URL space, so slugs must be unique across them. The validator and the build both fail on a collision.

Internal linking is automatic: tool pages link to their category, subcategories, alternatives, comparisons, related tools (by shared category/tags), related guides and free tools. Category pages list every tool whose primary category **or** any cross-listed subcategory matches (e.g. `"ai-tools/ai-writing"` puts Grammarly in AI Tools → AI Writing too).

## Add a new tool

1. Copy an existing file, e.g. `content/tools/grammarly.json` → `content/tools/notion.json`.
2. Set `"slug": "notion"` (must equal the file name; lowercase-kebab-case).
3. Fill in the fields. Key rules:
   - `category` must be a slug from `categories.json`; `subcategories` can be `"notes"` (same category) or `"business-tools/crm"` (cross-listing).
   - Use `"unknown"` for anything you haven't verified (`freePlan`, `freeTrial`, `paidPlans`, `pricing.model`).
   - `pros`, `cons`, `keyFeatures` must be factual and supportable.
   - `alternatives` lists slugs **already in the database**; `competitors` is free text for tools not yet profiled.
   - Leave `evaluation.status` as `"not-tested"` and `rating` as `null` until someone genuinely tests it.
   - `relatedGuides` = guide slugs; `relatedFreeTools` = free tool slugs.
   - `seo.title` ≈ 50–60 chars, `seo.description` ≈ 140–155 chars.
4. Add an entry for the slug in `content/affiliates.json` (see next section).
5. Optional logo: put an SVG/PNG you have permission to use in `public/logos/notion.svg` and set `"logo": "/logos/notion.svg"`. Otherwise a neutral monogram is shown.
6. Run `npm run validate`, then `npm run dev` and open `/notion/`.
7. When an editor has checked every field against the official website, set `"dataStatus": "verified"` and `dates.lastChecked` to that date. The "Preliminary profile" notice disappears and the page becomes indexable.

Nothing else is needed — the page, category listings, search index, filters and sitemap pick it up automatically.

## Affiliate links

All outbound tool links are built by `src/lib/affiliate.ts` from **`content/affiliates.json`**:

```json
"grammarly": {
  "official_url": "https://www.grammarly.com/",
  "affiliate_url": "https://your-network.example/track?id=YOUR_ID",
  "affiliate_status": "active",
  "network": "Impact",
  "notes": "Approved 2026-10-10",
  "updated": "2026-10-10"
}
```

- The affiliate URL is used **only** when `affiliate_status` is `"active"` and `affiliate_url` is set. Otherwise links go to `official_url` with no `sponsored` attribute.
- Statuses: `active`, `pending`, `applied`, `paused`, `none`. Set `paused` to switch an affiliate link off everywhere instantly.
- Affiliate links get `rel="sponsored nofollow noopener"`, open in a new tab, and carry `data-outbound` / `data-affiliate` attributes you can use for click tracking in analytics.
- Never paste affiliate URLs into tool, comparison or guide content. The validator rejects tool files containing common tracking parameters.
- Currently every entry is a placeholder (`affiliate_status: "none"`). No affiliate URLs or commission rates were invented.

## Edit pricing

Pricing lives in each tool file under `pricing`:

```json
"pricing": {
  "model": "freemium",
  "freePlan": "yes",
  "freeTrial": "unknown",
  "paidPlans": "yes",
  "startingPrice": "$12/month billed annually",
  "plans": [
    { "name": "Pro", "price": "$12/month", "billing": "Billed annually", "highlights": ["…"] }
  ],
  "pricingPageUrl": "https://…/pricing",
  "notes": "Prices shown in USD; regional pricing differs."
}
```

and **always update `dates.lastChecked`** to the day you checked the official page. The validator fails the build if prices are recorded without a `lastChecked` date. With no prices recorded, pages say *"Check current pricing on the official website"* and show *"Pricing last checked: Not yet checked"*.

## Comparison and alternatives pages

**Comparison** — create `content/comparisons/<toolA>-vs-<toolB>.json` (copy `make-vs-zapier.json`). Both tools must exist. The quick-comparison table, features, pricing and CTAs are generated from the two tool records; you write the intro, similarities, differences, "consider A if…/consider B if…" and FAQs. Don't declare a universal winner — the validator warns if the word "winner" appears.

**Alternatives** — create `content/alternatives/<tool>-alternatives.json` (copy `grammarly-alternatives.json`). `picks` is an ordered list of tool slugs with a one-line editorial note each.

Both appear automatically on the related tool pages, hubs and sitemap.

## Guides

Add `content/guides/<slug>.md`:

```markdown
---
title: How to Choose a Password Manager
description: One or two sentences for search results and cards.
category: security-tools
author: CalculateWellHub Editorial Team
published: 2026-10-20
updated: 2026-10-20
relatedTools: grammarly, semrush
relatedFreeTools: password-generator
---

Intro paragraph…

## First section
```

`##` headings build the table of contents. One in-article ad slot is placed after the second section, and one at the end.

## Free tools

Free tools are client components in `src/components/free-tools/`. To add one:

1. Create `src/components/free-tools/MyTool.tsx` (`"use client"`, default export).
2. Register it in `src/components/free-tools/index.ts`.
3. Add copy, how-to, FAQ and related software in `src/lib/free-tools.ts`.
4. Add the slug to `FREE_TOOLS` in `scripts/validate-content.mjs`.

Rules: the tool works immediately, with no sign-up or affiliate click; related software is shown **after** the tool.

## Indexing rules (quality gate)

Defined once in `src/lib/indexing.ts`, used by both robots meta tags and `sitemap.xml`:

| Page | Indexed when |
| --- | --- |
| Whole site | `NEXT_PUBLIC_ALLOW_INDEXING=true` (otherwise every page is `noindex` and robots.txt disallows all — safe for staging) |
| Tool | `dataStatus: "verified"` |
| Comparison | comparison and both tools verified |
| Alternatives | verified and ≥ 3 picks |
| Category | ≥ 1 tool |
| Subcategory | ≥ 3 tools |
| Guides, free tools, hubs, policies | always |

Thresholds are in `src/lib/site.ts` (`minItemsToIndex`, `indexDrafts`). This keeps thin or unverified pages out of Google while still letting visitors use them.

> **Important:** the 10 demo tools are `draft`, so their pages are `noindex` until you verify them. That is deliberate.

## Deploy

Build command: `npm run build` · Output directory: `out` · Node 22.

Set environment variables in your host's dashboard (see `.env.example`). For production set at least:

```
NEXT_PUBLIC_SITE_URL=https://tools.calculatewellhub.in
NEXT_PUBLIC_ALLOW_INDEXING=true
```

Use `NEXT_PUBLIC_ALLOW_INDEXING=false` (the default) on preview/staging deployments.

**Cloudflare Pages (recommended — free, fast global CDN)**
1. Pages → Create project → Connect to Git → choose this repository.
2. Framework preset: *None* (or Next.js static export). Build command `npm run build`, output `out`.
3. Add the environment variables above (Production environment only for `ALLOW_INDEXING=true`).

**Netlify** — New site from Git → build `npm run build`, publish `out`.
**Vercel** — Import project; it detects Next.js and serves the static export.
**cPanel / Apache** — run `npm run build` locally, upload the *contents* of `out/` (including `.htaccess`) to the subdomain's document root.
**Nginx** — serve `out/` as the root with `try_files $uri $uri/ $uri/index.html =404; error_page 404 /404.html;`.

## Connect tools.calculatewellhub.in

DNS is managed wherever `calculatewellhub.in` is registered (no credentials are stored in this repo).

1. In your host, add the custom domain `tools.calculatewellhub.in`. It will show the record to create.
2. At your DNS provider add a **CNAME** record:
   - Name/Host: `tools`
   - Target: the value from step 1 (e.g. `your-project.pages.dev`, `your-site.netlify.app`, `cname.vercel-dns.com`)
   - For cPanel hosting, create the subdomain in cPanel instead; it points `tools` at the server automatically (A record to the server IP).
3. Wait for DNS to propagate and the host to issue an SSL certificate (usually minutes, up to 24h).
4. Confirm `https://tools.calculatewellhub.in/` loads over HTTPS.
5. Make sure `NEXT_PUBLIC_SITE_URL` matches exactly and redeploy.
6. Add the property in Google Search Console (Domain property for `calculatewellhub.in` covers subdomains, or a URL-prefix property for the subdomain) and submit `https://tools.calculatewellhub.in/sitemap.xml`.

## SEO checklist

Built in:
- [x] Clean, trailing-slash URLs; one canonical URL per page (`alternates.canonical`)
- [x] Unique `<title>` and meta description per page from content (`seo` fields)
- [x] Open Graph + Twitter/X card tags; default 1200×630 image
- [x] `sitemap.xml` with only indexable pages and `lastmod`
- [x] `robots.txt` (disallow-all on staging; allows all + sitemap in production)
- [x] Visible breadcrumbs + `BreadcrumbList` schema
- [x] `Organization` + `WebSite` (with `SearchAction`) schema site-wide
- [x] `SoftwareApplication` on tool pages — `offers` only for verified free plans, `Review` only for genuinely tested tools, **no** AggregateRating
- [x] `FAQPage` only where the FAQ is visible on the page; `Article` on guides; `ItemList` on listings
- [x] noindex for search results, staging, unverified and thin pages
- [x] Internal linking cluster: tool ↔ category ↔ comparisons ↔ alternatives ↔ guides ↔ free tools
- [x] Semantic HTML, skip link, keyboard-accessible menus/accordions, `lang="en"`
- [x] Fast: static HTML, system fonts, no icon/UI libraries, lazy-loaded free tools

To do at launch:
- [ ] Verify tool data and set `dataStatus: "verified"` + `lastChecked`
- [ ] Set `NEXT_PUBLIC_ALLOW_INDEXING=true` in production only
- [ ] Add Search Console verification (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) and submit the sitemap
- [ ] Add real logos you're allowed to use (`public/logos/`)
- [ ] Test a few URLs with Google's Rich Results Test
- [ ] Check Core Web Vitals in PageSpeed Insights after deployment

## AdSense setup checklist

Ad slots are pre-placed with the `AdSlot` component — on guides (mid-article + end), free tool pages and the free-tools/guides hubs. **Tool, comparison and alternatives pages have no ads by default**, so ads never compete with affiliate CTAs. Ads are labelled "Advertisement" and styled differently from buttons.

1. [ ] Launch with real content (verified tools, guides) and the policy pages live — AdSense reviews site quality.
2. [ ] Apply at adsense.google.com with `tools.calculatewellhub.in` (or add the subdomain under the existing `calculatewellhub.in` account).
3. [ ] Set `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX` and redeploy — this loads the AdSense script site-wide.
4. [ ] Create `public/ads.txt` with the line Google gives you, e.g. `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` (not created now because the publisher ID is unknown).
5. [ ] Create ad units in AdSense and replace the placeholder `slot` names in `AdSlot` usages with the numeric slot IDs (search the code for `<AdSlot`). Or enable Auto ads and remove manual slots.
6. [ ] Enable a Google-certified consent management platform (AdSense → Privacy & messaging) for EEA/UK/Swiss visitors.
7. [ ] Preview placements locally with `NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true`.
8. [ ] Never place ads next to "Visit" buttons or make them look like download/CTA buttons.

## Affiliate disclosure implementation

- Standard text (one source, `src/lib/site.ts`): *"We may earn a commission if you purchase or sign up through links on this page. This does not affect the price you pay."*
- `<AffiliateDisclosure variant="inline" />` directly under every "Visit" CTA (tool hero, final CTA, comparison CTAs, related-software blocks).
- `<AffiliateDisclosure variant="box" />` near the top of comparison and alternatives pages and at the end of category listings.
- Site-wide footer note + full `/affiliate-disclosure/` page explaining how affiliate relationships work and what they don't affect.
- `rel="sponsored"` on active affiliate links, set automatically.
- Editorial policy explains that inclusion, placement and wording cannot be bought.

## Before launch: what still needs real data

These are intentionally placeholders — nothing was invented:

| Item | Where |
| --- | --- |
| Verified tool facts, prices, `lastChecked` dates | `content/tools/*.json` |
| Affiliate URLs and statuses | `content/affiliates.json` |
| Hands-on test results/ratings (only after real testing) | `evaluation` in tool files |
| Contact email you monitor | `src/lib/site.ts` → `contactEmail` |
| Legal operator name | `src/lib/site.ts` → `operator` |
| Newsletter form endpoint | `NEXT_PUBLIC_NEWSLETTER_ACTION` |
| Contact form endpoint (Formspree, Basin, etc.) | `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` |
| AdSense publisher ID, ad slots, `ads.txt` | see AdSense checklist |
| Tool logos (with permission) | `public/logos/` |
| Legal review of Privacy/Terms/Cookie pages | `src/app/*-policy/`, `src/app/terms/` |

The policy pages are sensible templates, not legal advice — have them reviewed for your jurisdiction.

## Secrets

No API keys or secrets are needed or stored. All `NEXT_PUBLIC_*` variables are public by design (inlined into static HTML). `.env*.local` files are git-ignored.
