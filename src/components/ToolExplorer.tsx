"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { search, type SearchRecord } from "@/lib/search";

type Pricing = NonNullable<SearchRecord["pricing"]>;
const PRICING: { value: Pricing; label: string }[] = [
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "free-trial", label: "Free trial" },
  { value: "paid", label: "Paid" },
];
const PRICING_LABEL: Record<Pricing, string> = { free: "Free", freemium: "Freemium", "free-trial": "Free trial", paid: "Paid", unknown: "Pricing unverified" };

interface Props {
  tools: SearchRecord[];
  categories: { slug: string; name: string }[];
}

/**
 * Client-side filtering over pre-rendered data. Initial HTML contains every
 * tool (good for crawlers); filters then work instantly without a server.
 * Filter state is mirrored to the URL so filtered views can be shared.
 */
export function ToolExplorer({ tools, categories }: Props) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [aiOnly, setAiOnly] = useState(false);
  const [platform, setPlatform] = useState("");
  const [useCase, setUseCase] = useState("");
  const [open, setOpen] = useState(false);

  const platforms = useMemo(() => [...new Set(tools.flatMap((t) => t.platforms ?? []))].sort(), [tools]);
  const useCases = useMemo(() => [...new Set(tools.flatMap((t) => t.useCases ?? []))].sort(), [tools]);

  // Read initial state from the URL (?category=…&pricing=free,paid&ai=1)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect */
    setQ(p.get("q") ?? "");
    setCat(p.get("category") ?? "");
    setPricing((p.get("pricing")?.split(",").filter(Boolean) as Pricing[]) ?? []);
    setAiOnly(p.get("ai") === "1");
    setPlatform(p.get("platform") ?? "");
    setUseCase(p.get("use") ?? "");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (cat) p.set("category", cat);
    if (pricing.length) p.set("pricing", pricing.join(","));
    if (aiOnly) p.set("ai", "1");
    if (platform) p.set("platform", platform);
    if (useCase) p.set("use", useCase);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [q, cat, pricing, aiOnly, platform, useCase]);

  const results = useMemo(() => {
    let list = q.trim() ? search(tools, q) : tools;
    if (cat) list = list.filter((t) => t.categories?.includes(cat));
    if (pricing.length) list = list.filter((t) => t.pricing && pricing.includes(t.pricing));
    if (aiOnly) list = list.filter((t) => t.isAI);
    if (platform) list = list.filter((t) => t.platforms?.includes(platform));
    if (useCase) list = list.filter((t) => t.useCases?.includes(useCase));
    return list;
  }, [tools, q, cat, pricing, aiOnly, platform, useCase]);

  const activeCount = [cat, aiOnly, platform, useCase].filter(Boolean).length + pricing.length;
  const reset = () => {
    setQ(""); setCat(""); setPricing([]); setAiOnly(false); setPlatform(""); setUseCase("");
  };

  const filters = (
    <div className="space-y-6">
      <div>
        <label htmlFor="f-cat" className="text-sm font-semibold text-ink-900">Category</label>
        <select id="f-cat" value={cat} onChange={(e) => setCat(e.target.value)} className="input mt-2">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold text-ink-900">Pricing</legend>
        <div className="mt-2 space-y-2">
          {PRICING.map((p) => (
            <label key={p.value} className="flex items-center gap-2 text-sm text-ink-700">
              <input
                type="checkbox"
                className="h-4 w-4 accent-brand-700"
                checked={pricing.includes(p.value)}
                onChange={(e) => setPricing(e.target.checked ? [...pricing, p.value] : pricing.filter((x) => x !== p.value))}
              />
              {p.label}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex items-center gap-2 text-sm font-semibold text-ink-900">
        <input type="checkbox" className="h-4 w-4 accent-brand-700" checked={aiOnly} onChange={(e) => setAiOnly(e.target.checked)} />
        AI-powered only
      </label>
      <div>
        <label htmlFor="f-plat" className="text-sm font-semibold text-ink-900">Platform</label>
        <select id="f-plat" value={platform} onChange={(e) => setPlatform(e.target.value)} className="input mt-2">
          <option value="">Any platform</option>
          {platforms.map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-use" className="text-sm font-semibold text-ink-900">Use case</label>
        <select id="f-use" value={useCase} onChange={(e) => setUseCase(e.target.value)} className="input mt-2">
          <option value="">Any use case</option>
          {useCases.map((u) => <option key={u}>{u}</option>)}
        </select>
      </div>
      {activeCount > 0 && <button type="button" onClick={reset} className="btn-ghost w-full">Clear all filters</button>}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
      {/* Desktop filters */}
      <aside className="hidden lg:block" aria-label="Filters">{filters}</aside>

      <div className="min-w-0">
        <div className="flex gap-2">
          <label htmlFor="f-q" className="sr-only">Search within tools</label>
          <input id="f-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by name, feature or use case…" className="input" />
          <button type="button" onClick={() => setOpen(true)} className="btn-secondary shrink-0 lg:hidden" aria-haspopup="dialog">
            Filters{activeCount > 0 && <span className="rounded-full bg-brand-700 px-1.5 text-xs text-white">{activeCount}</span>}
          </button>
        </div>
        <p className="mt-4 text-sm text-ink-500" aria-live="polite">{results.length} {results.length === 1 ? "tool" : "tools"}</p>

        {results.length ? (
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((t) => (
              <li key={t.slug} className="card card-hover relative flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink-200 bg-ink-50 text-sm font-semibold" style={{ color: t.brandColor ?? "#0b665a" }}>
                      {t.title.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
                    </span>
                    <div>
                      <Link href={t.url} className="font-semibold text-ink-900 after:absolute after:inset-0 hover:text-brand-700">{t.title}</Link>
                      <p className="text-xs text-ink-500">{t.categoryName}</p>
                    </div>
                  </div>
                  {t.pricing && <span className="shrink-0 rounded-full border border-ink-200 px-2 py-0.5 text-xs font-medium text-ink-700">{PRICING_LABEL[t.pricing]}</span>}
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-ink-600">{t.description}</p>
                {t.isAI && <span className="chip mt-3 self-start">AI</span>}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-3 rounded-[var(--radius-card)] border border-dashed border-ink-300 p-8 text-center">
            <p className="font-medium text-ink-900">No tools match these filters.</p>
            <button type="button" onClick={reset} className="mt-3 link">Clear filters</button>
          </div>
        )}
      </div>

      {/* Mobile filter sheet */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button type="button" className="absolute inset-0 bg-ink-950/40" onClick={() => setOpen(false)} aria-label="Close filters" />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-lg font-semibold text-ink-900">Filters</p>
              <button type="button" onClick={() => setOpen(false)} className="btn-ghost px-2" aria-label="Close">✕</button>
            </div>
            {filters}
            <button type="button" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full">Show {results.length} tools</button>
          </div>
        </div>
      )}
    </div>
  );
}
