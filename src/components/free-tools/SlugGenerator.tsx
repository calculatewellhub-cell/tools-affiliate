"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./CopyButton";

const STOP = new Set(["a", "an", "and", "the", "of", "in", "on", "at", "to", "for", "with", "by", "or", "is", "are", "your", "how"]);

export function toSlug(input: string, removeStop: boolean) {
  const base = input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter(Boolean);
  const kept = removeStop ? base.filter((w) => !STOP.has(w)) : base;
  return (kept.length ? kept : base).join("-").slice(0, 80).replace(/-+$/, "");
}

export default function SlugGenerator() {
  const [title, setTitle] = useState("");
  const [removeStop, setRemoveStop] = useState(true);
  const slug = useMemo(() => toSlug(title, removeStop), [title, removeStop]);
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="sg-title" className="text-sm font-medium text-ink-800">Title or phrase</label>
        <input id="sg-title" value={title} onChange={(e) => setTitle(e.target.value)} className="input mt-2" placeholder="e.g. 10 Best AI Video Tools for YouTube Creators" />
      </div>
      <label className="flex items-center gap-2 text-sm text-ink-700">
        <input type="checkbox" checked={removeStop} onChange={(e) => setRemoveStop(e.target.checked)} className="h-4 w-4 accent-brand-700" />
        Remove common stop words (a, the, and, of…)
      </label>
      <div>
        <p className="text-sm font-medium text-ink-800">Slug</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <output className="input min-h-[2.75rem] flex-1 bg-ink-50 font-mono text-sm break-all" aria-live="polite">{slug || "—"}</output>
          <CopyButton text={slug} />
        </div>
        <p className="mt-2 text-xs text-ink-500">{slug.length} characters</p>
      </div>
    </div>
  );
}
