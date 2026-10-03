"use client";

import { useMemo, useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    return {
      words,
      chars: text.length,
      charsNoSpaces: text.replace(/\s/g, "").length,
      sentences: trimmed ? (trimmed.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? []).length : 0,
      paragraphs: trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0,
      reading: words / 220,
      speaking: words / 140,
    };
  }, [text]);
  const fmt = (min: number) => (min < 1 ? `${Math.max(0, Math.round(min * 60))} sec` : `${Math.round(min * 10) / 10} min`);
  const items = [
    ["Words", stats.words],
    ["Characters", stats.chars],
    ["Characters (no spaces)", stats.charsNoSpaces],
    ["Sentences", stats.sentences],
    ["Paragraphs", stats.paragraphs],
    ["Reading time", fmt(stats.reading)],
    ["Speaking time", fmt(stats.speaking)],
  ] as const;
  return (
    <div>
      <label htmlFor="wc-text" className="text-sm font-medium text-ink-800">Your text</label>
      <textarea
        id="wc-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        className="input mt-2 resize-y font-[inherit] leading-relaxed"
        placeholder="Start typing or paste your text here…"
      />
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-live="polite">
        {items.map(([k, v]) => (
          <div key={k} className="rounded-lg border border-ink-200 bg-ink-50 px-3 py-2.5">
            <dt className="text-xs text-ink-500">{k}</dt>
            <dd className="mt-0.5 text-lg font-semibold text-ink-900 tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex justify-end">
        <button type="button" className="btn-ghost py-2" onClick={() => setText("")} disabled={!text}>Clear</button>
      </div>
    </div>
  );
}
