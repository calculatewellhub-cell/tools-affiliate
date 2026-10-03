"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./CopyButton";

const FIELDS = [
  { key: "utm_source", label: "Campaign source", hint: "e.g. newsletter, facebook, google", required: true },
  { key: "utm_medium", label: "Campaign medium", hint: "e.g. email, social, cpc", required: true },
  { key: "utm_campaign", label: "Campaign name", hint: "e.g. spring_sale", required: true },
  { key: "utm_term", label: "Campaign term", hint: "Optional — paid keywords", required: false },
  { key: "utm_content", label: "Campaign content", hint: "Optional — differentiate links or ads", required: false },
] as const;

export default function UtmBuilder() {
  const [url, setUrl] = useState("");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [lower, setLower] = useState(true);

  const result = useMemo(() => {
    if (!url) return { href: "", error: "" };
    try {
      const u = new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`);
      for (const f of FIELDS) {
        let v = (vals[f.key] || "").trim();
        if (lower) v = v.toLowerCase();
        v = v.replace(/\s+/g, "_");
        if (v) u.searchParams.set(f.key, v);
        else u.searchParams.delete(f.key);
      }
      return { href: u.toString(), error: "" };
    } catch {
      return { href: "", error: "Enter a valid URL, e.g. https://example.com/page" };
    }
  }, [url, vals, lower]);

  const missing = FIELDS.filter((f) => f.required && !vals[f.key]?.trim()).map((f) => f.key);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="utm-url" className="text-sm font-medium text-ink-800">Website URL <span className="text-accent-700">*</span></label>
        <input id="utm-url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="input mt-2" placeholder="https://example.com/landing-page" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label htmlFor={f.key} className="text-sm font-medium text-ink-800">
              {f.label} {f.required && <span className="text-accent-700">*</span>}
              <span className="ml-1 font-mono text-xs font-normal text-ink-400">{f.key}</span>
            </label>
            <input id={f.key} value={vals[f.key] || ""} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })} className="input mt-2" placeholder={f.hint} />
          </div>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm text-ink-700">
        <input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} className="h-4 w-4 accent-brand-700" />
        Convert values to lowercase and replace spaces with underscores
      </label>
      <div>
        <p className="text-sm font-medium text-ink-800">Campaign URL</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <output className="input min-h-[2.75rem] flex-1 bg-ink-50 font-mono text-sm break-all" aria-live="polite">{result.href || "—"}</output>
          <CopyButton text={result.href} />
        </div>
        {result.error && <p className="mt-2 text-sm text-accent-700">{result.error}</p>}
        {!result.error && url && missing.length > 0 && (
          <p className="mt-2 text-sm text-ink-500">Recommended: fill in {missing.join(", ")}.</p>
        )}
      </div>
    </div>
  );
}
