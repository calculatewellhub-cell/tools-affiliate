"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { search, type SearchRecord } from "@/lib/search";

const TYPE_LABEL: Record<SearchRecord["type"], string> = {
  tool: "Tool",
  category: "Category",
  "free-tool": "Free tool",
  comparison: "Comparison",
  guide: "Guide",
};

/** Loads the static /search-index.json once and searches entirely in the browser. */
export function SearchClient() {
  const [index, setIndex] = useState<SearchRecord[] | null>(null);
  const [q, setQ] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQ(new URLSearchParams(window.location.search).get("q") ?? "");
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setIndex)
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    const url = q ? `?q=${encodeURIComponent(q)}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [q]);

  const results = useMemo(() => (index && q.trim() ? search(index, q) : []), [index, q]);

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="s-q" className="sr-only">Search</label>
        <input id="s-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="What tool are you looking for?" className="input h-12 text-base" autoFocus />
      </form>
      <div className="mt-6" aria-live="polite">
        {error && <p className="text-ink-600">Search is temporarily unavailable. Browse <Link href="/tools/" className="link">all tools</Link> instead.</p>}
        {!error && !index && q && <p className="text-ink-500">Loading…</p>}
        {index && q.trim() && (
          <p className="text-sm text-ink-500">{results.length} result{results.length === 1 ? "" : "s"} for “{q}”</p>
        )}
        {index && q.trim() && results.length === 0 && (
          <div className="mt-4 rounded-[var(--radius-card)] border border-dashed border-ink-300 p-6">
            <p className="font-medium text-ink-900">No matches yet.</p>
            <p className="mt-1 text-sm text-ink-600">Try a broader term such as “writing”, “video” or “SEO”, or <Link href="/tools/" className="link">browse all tools</Link>.</p>
          </div>
        )}
        <ul className="mt-4 space-y-3">
          {results.map((r) => (
            <li key={`${r.type}-${r.slug}`}>
              <Link href={r.url} className="card card-hover block p-4">
                <span className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-wide text-brand-700 uppercase">{TYPE_LABEL[r.type]}</span>
                  {r.categoryName && <span className="text-xs text-ink-500">· {r.categoryName}</span>}
                </span>
                <span className="mt-1 block font-semibold text-ink-900">{r.title}</span>
                <span className="mt-1 block line-clamp-2 text-sm text-ink-600">{r.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
