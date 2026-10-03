#!/usr/bin/env node
/**
 * Content validator — runs automatically before `npm run build` and via
 * `npm run validate`. Catches broken references and honesty-rule violations
 * before they reach the live site.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const C = (...p) => path.join(root, "content", ...p);
const readJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const listJson = (dir) =>
  fs.existsSync(C(dir)) ? fs.readdirSync(C(dir)).filter((f) => f.endsWith(".json") && !f.startsWith("_")) : [];

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const isDate = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);
const isUrl = (v) => typeof v === "string" && /^https:\/\/[^\s]+$/.test(v);
const TRI = ["yes", "no", "unknown"];
const MODELS = ["free", "freemium", "free-trial", "paid", "unknown"];

const categories = readJson(C("categories.json"));
const catMap = new Map(categories.map((c) => [c.slug, new Set(c.subcategories.map((s) => s.slug))]));
const affiliates = readJson(C("affiliates.json"));
const guides = fs.existsSync(C("guides")) ? fs.readdirSync(C("guides")).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")) : [];
const FREE_TOOLS = ["word-counter", "case-converter", "slug-generator", "serp-snippet-preview", "password-generator", "utm-builder"];

/* ---------- tools ---------- */
const tools = new Map();
for (const f of listJson("tools")) {
  const t = readJson(C("tools", f));
  const where = `tools/${f}`;
  if (t.slug !== f.replace(/\.json$/, "")) err(`${where}: slug must match file name`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.slug)) err(`${where}: slug must be lowercase-kebab-case`);
  tools.set(t.slug, t);

  for (const k of ["name", "tagline", "shortDescription", "websiteUrl", "category"]) if (!t[k]) err(`${where}: missing ${k}`);
  if (!isUrl(t.websiteUrl)) err(`${where}: websiteUrl must be an https URL`);
  if (!catMap.has(t.category)) err(`${where}: unknown category "${t.category}"`);
  for (const ref of t.subcategories ?? []) {
    const [a, b] = ref.split("/");
    const [cat, sub] = b ? [a, b] : [t.category, a];
    if (!catMap.get(cat)?.has(sub)) err(`${where}: unknown subcategory "${ref}"`);
  }
  const p = t.pricing ?? {};
  if (!MODELS.includes(p.model)) err(`${where}: pricing.model must be one of ${MODELS.join(", ")}`);
  for (const k of ["freePlan", "freeTrial", "paidPlans"]) if (!TRI.includes(p[k])) err(`${where}: pricing.${k} must be yes/no/unknown`);

  // Honesty rules
  if (t.dataStatus === "verified" && !isDate(t.dates?.lastChecked))
    err(`${where}: verified tools need dates.lastChecked (YYYY-MM-DD)`);
  const hasPrice = p.startingPrice || (p.plans ?? []).some((pl) => pl.price);
  if (hasPrice && !isDate(t.dates?.lastChecked))
    err(`${where}: prices are recorded but dates.lastChecked is empty — add the date you checked them`);
  const ev = t.evaluation ?? {};
  if (ev.rating && ev.status !== "tested") err(`${where}: a rating requires evaluation.status "tested"`);
  if (ev.status === "tested" && !(ev.testedBy && isDate(ev.testedOn) && ev.summary))
    err(`${where}: tested evaluations need testedBy, testedOn and summary`);
  if (ev.rating && (typeof ev.rating.score !== "number" || ev.rating.score > ev.rating.max))
    err(`${where}: invalid rating`);
  if (!(ev.checklist ?? []).length && ev.status !== "tested") warn(`${where}: add an evaluation checklist`);

  for (const k of ["keyFeatures", "pros", "cons", "bestFor", "howItWorks"]) if (!(t[k] ?? []).length) warn(`${where}: ${k} is empty`);
  if ((t.seo?.title ?? "").length > 70) warn(`${where}: seo.title is ${t.seo.title.length} chars (aim for ≤ 60–65)`);
  if ((t.seo?.description ?? "").length > 160) warn(`${where}: seo.description is ${t.seo.description.length} chars (aim for ≤ 155)`);
  for (const g of t.relatedGuides ?? []) if (!guides.includes(g)) err(`${where}: relatedGuides references missing guide "${g}"`);
  for (const ft of t.relatedFreeTools ?? []) if (!FREE_TOOLS.includes(ft)) err(`${where}: unknown free tool "${ft}"`);
  for (const d of ["published", "lastUpdated"]) if (!isDate(t.dates?.[d])) err(`${where}: dates.${d} must be YYYY-MM-DD`);

  // Affiliate data must live in affiliates.json only
  const raw = JSON.stringify(t);
  if (/[?&](ref|aff|affiliate|via|partner|irclickid|tag)=/i.test(raw))
    err(`${where}: looks like it contains an affiliate URL — put affiliate links in content/affiliates.json`);
}
for (const t of tools.values()) {
  for (const a of t.alternatives ?? []) if (!tools.has(a)) err(`tools/${t.slug}.json: alternative "${a}" is not in the database`);
  if (!affiliates[t.slug]) err(`affiliates.json: missing entry for "${t.slug}"`);
}

/* ---------- affiliates ---------- */
for (const [slug, a] of Object.entries(affiliates)) {
  if (slug.startsWith("_")) continue;
  if (!tools.has(slug)) warn(`affiliates.json: "${slug}" has no matching tool`);
  if (!isUrl(a.official_url)) err(`affiliates.json/${slug}: official_url must be https`);
  if (!["active", "pending", "applied", "none", "paused"].includes(a.affiliate_status)) err(`affiliates.json/${slug}: invalid affiliate_status`);
  if (a.affiliate_status === "active" && !isUrl(a.affiliate_url)) err(`affiliates.json/${slug}: active status needs an https affiliate_url`);
}

/* ---------- comparisons & alternatives ---------- */
for (const f of listJson("comparisons")) {
  const c = readJson(C("comparisons", f));
  const where = `comparisons/${f}`;
  if (c.slug !== f.replace(/\.json$/, "")) err(`${where}: slug must match file name`);
  for (const k of ["toolA", "toolB"]) if (!tools.has(c[k])) err(`${where}: ${k} "${c[k]}" not in database`);
  if (c.toolA === c.toolB) err(`${where}: toolA and toolB must differ`);
  if (/winner/i.test(JSON.stringify(c))) warn(`${where}: mentions "winner" — comparisons should help users choose, not declare winners`);
}
for (const f of listJson("alternatives")) {
  const a = readJson(C("alternatives", f));
  const where = `alternatives/${f}`;
  if (a.slug !== f.replace(/\.json$/, "")) err(`${where}: slug must match file name`);
  if (!tools.has(a.tool)) err(`${where}: tool "${a.tool}" not in database`);
  for (const p of a.picks ?? []) if (!tools.has(p.slug)) err(`${where}: pick "${p.slug}" not in database`);
}

/* ---------- slug collisions at the site root ---------- */
const seen = new Map();
const add = (slug, kind) => {
  if (seen.has(slug)) err(`Root URL collision: "/${slug}/" used by ${seen.get(slug)} and ${kind}`);
  seen.set(slug, kind);
};
categories.forEach((c) => add(c.slug, "category"));
tools.forEach((_, s) => add(s, "tool"));
listJson("comparisons").forEach((f) => add(f.replace(/\.json$/, ""), "comparison"));
listJson("alternatives").forEach((f) => add(f.replace(/\.json$/, ""), "alternatives"));

/* ---------- report ---------- */
for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(`  ERROR ${e}`);
console.log(`\nContent check: ${tools.size} tools, ${categories.length} categories, ${guides.length} guides — ${errors.length} error(s), ${warnings.length} warning(s).`);
if (errors.length) process.exit(1);
