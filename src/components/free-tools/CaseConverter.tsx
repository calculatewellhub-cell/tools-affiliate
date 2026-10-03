"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";

const SMALL = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "in", "nor", "of", "on", "or", "so", "the", "to", "up", "yet", "vs", "via"]);
const words = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(/[^A-Za-z0-9]+/).filter(Boolean);

const converters: Record<string, (s: string) => string> = {
  UPPERCASE: (s) => s.toUpperCase(),
  lowercase: (s) => s.toLowerCase(),
  "Title Case": (s) =>
    s.toLowerCase().replace(/[^\s]+/g, (w, offset: number) =>
      offset > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1),
    ),
  "Sentence case": (s) => s.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (_, p, c: string) => p + c.toUpperCase()),
  camelCase: (s) => words(s).map((w, i) => (i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase())).join(""),
  snake_case: (s) => words(s).map((w) => w.toLowerCase()).join("_"),
  "kebab-case": (s) => words(s).map((w) => w.toLowerCase()).join("-"),
};

export default function CaseConverter() {
  const [text, setText] = useState("");
  return (
    <div>
      <label htmlFor="cc-text" className="text-sm font-medium text-ink-800">Text</label>
      <textarea id="cc-text" value={text} onChange={(e) => setText(e.target.value)} rows={8} className="input mt-2 resize-y" placeholder="Paste text to convert…" />
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Convert to">
        {Object.entries(converters).map(([label, fn]) => (
          <button key={label} type="button" className="btn-secondary py-2" disabled={!text} onClick={() => setText(fn(text))}>
            {label}
          </button>
        ))}
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button type="button" className="btn-ghost py-2" onClick={() => setText("")} disabled={!text}>Clear</button>
        <CopyButton text={text} />
      </div>
    </div>
  );
}
