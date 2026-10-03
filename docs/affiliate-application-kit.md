# Affiliate Application Kit — CalculateWellHub Tools

Prepared: 3 October 2026 · For: aitools.calculatewellhub.in / tools.calculatewellhub.in

> **Important:** Program terms (commission, cookie, payout) change often. The figures below come from web research on 3 Oct 2026 — official pages could not be opened directly from the build environment. **Always confirm on the official page before applying.** Never write a commission rate on the website itself.

---

## 1. Before you apply (do this first)

Approval is much more likely when reviewers see a real, finished site.

- [ ] Website live on its final domain with HTTPS
- [ ] About, Contact, Privacy Policy, Affiliate Disclosure, Editorial Policy pages live (already built)
- [ ] Real contact email that you check (update `contactEmail` in `src/lib/site.ts`)
- [ ] At least the tool you're applying for has a **verified** profile (`dataStatus: "verified"`, pricing checked)
- [ ] 3–5 genuine guides/comparisons published
- [ ] Google Search Console set up (some networks ask for traffic proof)
- [ ] Payment ready: **PayPal** account and/or **Wise** account, bank details
- [ ] Tax info ready: **PAN**; for US companies a **W-8BEN** form (individual, non-US person) — networks like Impact/PartnerStack ask for it inside their dashboard

Use **one dedicated email** for all affiliate accounts (e.g. a new Gmail like `partners.calculatewellhub@…`). Turn on 2-step verification. Don't share its password with anyone.

---

## 2. Program list (priority order)

| # | Tool | Program? | Platform / network | Where to apply | Reported terms (verify!) | Notes |
|---|---|---|---|---|---|---|
| 1 | **Fliki** | Yes | Fliki's own program | fliki.ai/affiliate-program | 30% commission, 30-day cookie, bonuses for 25/50/100 paying users; paid monthly via Wise/PayPal, $50 min | No ads, no coupon/discount sites |
| 2 | **Pictory** | Yes | FirstPromoter | Pictory website → Affiliate (or via FirstPromoter) | Recurring up to 50%, 90-day cookie, free Pro account for affiliates | Approval "a few days" |
| 3 | **Writesonic** | Yes | FirstPromoter | writesonic.com/affiliate | 20% recurring for 12 months, 60-day cookie, approval usually ~24h | No bidding on "Writesonic" brand terms; no self-referral |
| 4 | **QuillBot** | Yes | PartnerStack | quillbot.com/affiliates | 10% monthly / 15% semi-annual / 20% annual plans, 30-day cookie | Contact: affiliate@quillbot.com |
| 5 | **Make** | Yes | PartnerStack | make.com/en/affiliate (help: make.com/en/help/general/affiliate-program) | 35% of payments for 12 months from signup; payout at $100 + 3 paying users; Wise only | Commission only on subscriptions, not extra operations |
| 6 | **Grammarly** | Yes | Impact.com | grammarly.com/affiliates | Per signup + per premium upgrade (one-time), 90-day cookie | Contact: affiliate_mktg@grammarly.com |
| 7 | **Semrush** | Yes | Impact.com | Sign up on Impact → search "Semrush" → Apply (semrush.com/kb/97-affiliate-program) | Fixed commission per sale + per trial, 120-day cookie, review ~2 working days | Strict review — apply after site has content & traffic |
| 8 | **Adobe Express** | Yes (Adobe Affiliate Program) | Partnerize | adobe.com/affiliates.html | Covers Creative Cloud, Express, Stock, Document Cloud; 30-day cookie | Welcome email comes from Partnerize |
| 9 | **Hostinger** | Yes | Hostinger's own program | hostinger.com/affiliates | From 40% per eligible sale (rises with volume); payout after 30-day refund window; $100 PayPal / $500 bank min | **Requirement: ~1,000 monthly visitors** and IT/online-business focus — apply later |
| 10 | **Zapier** | **No public affiliate program** | — | — | Only Solution Partner (consultants/agencies) programme | Keep linking to the official site; no affiliate link |

**Suggested order:** Fliki, Pictory, Writesonic, QuillBot, Make (easier, creator-friendly) → Grammarly, Adobe → Semrush, Hostinger once the site has traffic.

---

## 3. Copy-paste answers for application forms

Edit anything in [brackets]. Keep answers truthful — reviewers check the site.

**Website URL**
`https://aitools.calculatewellhub.in/` [or tools.calculatewellhub.in]

**Website / company name**
CalculateWellHub Tools (part of CalculateWellHub — calculatewellhub.in)

**Short description (1–2 lines)**
CalculateWellHub Tools is a software discovery site that helps bloggers, freelancers, students and small businesses choose the right tools through clear tool profiles, side-by-side comparisons, buying guides and free browser-based utilities.

**Longer description / "Tell us about your website"**
CalculateWellHub Tools is an independent software discovery and comparison website and part of the CalculateWellHub network of free online calculators and resources. We publish detailed tool profiles (features, who each tool suits, limitations, free vs paid notes), balanced comparisons, "alternatives" pages and practical guides, plus free utilities such as a word counter, SERP preview and UTM builder. Our editorial policy forbids fake reviews, invented pricing or ratings, and we clearly disclose affiliate relationships on every relevant page.

**Audience**
Bloggers, freelancers, students, job seekers, small-business owners, digital marketers, SEO professionals and content creators in the USA, UK, Canada, Australia and India (English-speaking, global).

**Primary traffic sources**
Organic search (SEO) is the main channel, supported by internal linking from the CalculateWellHub calculator site [and social media: add your channels if any]. We do not use paid search on brand terms, coupon sites, incentivised traffic or email spam.

**How will you promote [Tool]?**
- A dedicated, in-depth profile page for [Tool] (features, use cases, free vs paid, limitations, FAQ)
- Inclusion in relevant category pages and comparisons (e.g. [Tool] vs [Competitor])
- "Alternatives" pages and how-to guides where [Tool] genuinely fits
- Contextual links from our free tools where relevant
All links are disclosed and marked `rel="sponsored"`.

**Monthly visitors / traffic**
Answer honestly with your Search Console / analytics number. If new: "New site launched [month year]; currently growing through SEO — happy to share analytics."

**Do you bid on our brand keywords / use coupons?**
No.

**Category / niche**
Software reviews & comparisons · SaaS · AI tools · Marketing technology

**Promotional methods (checkboxes)**
Content/blog ✔ · Comparison/review site ✔ · SEO ✔ · Email newsletter (only if launched) · Social media (only if you actually use it) · Paid search ✘ · Coupon ✘ · Incentivised ✘

---

## 4. After approval — adding the link to the website

1. Copy your affiliate link from the dashboard (use the plain link to the tool's homepage).
2. Send it to Claude, or edit `content/affiliates.json` yourself:

```json
"fliki": {
  "official_url": "https://fliki.ai/",
  "affiliate_url": "PASTE-YOUR-LINK-HERE",
  "affiliate_status": "active",
  "network": "Fliki (direct)",
  "notes": "Approved 2026-10-xx",
  "updated": "2026-10-xx"
}
```

3. Run `npm run build` and redeploy. Every "Visit" button for that tool switches to the affiliate link, with `rel="sponsored"` and the disclosure applied automatically.
4. Click your own link once in a private window to confirm it lands on the tool (don't sign up through it — self-referrals are banned by most programs).

## 5. Tracking sheet

| Tool | Applied on | Status | Approved on | Link added | Payout method set |
|---|---|---|---|---|---|
| Fliki | | | | | |
| Pictory | | | | | |
| Writesonic | | | | | |
| QuillBot | | | | | |
| Make | | | | | |
| Grammarly | | | | | |
| Adobe | | | | | |
| Semrush | | | | | |
| Hostinger | | | | | |

## 6. Rules to stay approved

- Disclosure on every page with affiliate links (already built in).
- No fake reviews, ratings, discounts or "limited time" claims.
- Don't buy ads on tool brand names unless the program explicitly allows it.
- Don't use your own affiliate link for your own purchases.
- Don't publish commission rates or private coupon codes unless the program permits it.

---

Sources (web research, 3 Oct 2026): Grammarly on Impact ([affonso.io](https://affonso.io/affiliate-programs/grammarly), [referly](https://www.referly.so/affiliate-programs/grammarly)); [Semrush KB](https://www.semrush.com/kb/97-affiliate-program), [impact.com case study](https://impact.com/affiliate/semrush-affiliate-program-case-study/); [Writesonic affiliate](https://writesonic.com/affiliate?via=trial), [Writesonic terms](https://docs.writesonic.com/docs/writesonic-affiliate-program); [Fliki affiliate](https://fliki.ai/affiliate-program); Pictory ([uppromote](https://uppromote.com/affiliate-directory/pictory/), [getlasso](https://getlasso.co/affiliate/pictory/)); [Hostinger affiliates](https://www.hostinger.com/affiliates), [Hostinger payouts](https://support.hostinger.com/en/articles/1583263-how-are-affiliate-commissions-paid); [Make help](https://www.make.com/en/help/general/affiliate-program), [Make on PartnerStack](https://partnerstack.com/account/make); [Zapier community](https://community.zapier.com/show-tell-5/does-zapier-have-an-affiliate-program-13950); [QuillBot affiliates](https://quillbot.com/affiliates); [Adobe affiliates](https://www.adobe.com/affiliates.html).
