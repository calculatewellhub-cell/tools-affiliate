"use client";

import { useCallback, useEffect, useState } from "react";
import { CopyButton } from "./CopyButton";

const SETS = {
  lower: "abcdefghijkmnopqrstuvwxyz",
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  digits: "23456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?",
};
const AMBIGUOUS = { lower: "l", upper: "IO", digits: "01" };

/** Unbiased random index using rejection sampling over crypto.getRandomValues. */
function randomIndex(max: number) {
  const limit = Math.floor(0xffffffff / max) * max;
  const buf = new Uint32Array(1);
  do crypto.getRandomValues(buf);
  while (buf[0] >= limit);
  return buf[0] % max;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [opts, setOpts] = useState({ lower: true, upper: true, digits: true, symbols: true, ambiguous: false });
  const [pw, setPw] = useState("");

  const generate = useCallback(() => {
    const pools: string[] = [];
    (Object.keys(SETS) as (keyof typeof SETS)[]).forEach((k) => {
      if (!opts[k]) return;
      let chars = SETS[k];
      if (opts.ambiguous && k in AMBIGUOUS) chars += AMBIGUOUS[k as keyof typeof AMBIGUOUS];
      pools.push(chars);
    });
    if (!pools.length) return setPw("");
    const all = pools.join("");
    // Guarantee at least one character from each selected set, then shuffle.
    const chars = pools.map((p) => p[randomIndex(p.length)]);
    while (chars.length < length) chars.push(all[randomIndex(all.length)]);
    for (let i = chars.length - 1; i > 0; i--) {
      const j = randomIndex(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    setPw(chars.join(""));
  }, [length, opts]);

  useEffect(generate, [generate]);

  const poolSize = (Object.keys(SETS) as (keyof typeof SETS)[]).reduce((n, k) => n + (opts[k] ? SETS[k].length : 0), 0);
  const bits = poolSize ? Math.round(length * Math.log2(poolSize)) : 0;
  const strength = bits >= 100 ? "Very strong" : bits >= 75 ? "Strong" : bits >= 50 ? "Fair" : "Weak";

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row">
        <output className="input flex-1 bg-ink-50 font-mono text-base break-all" aria-live="polite" aria-label="Generated password">{pw || "Select at least one character set"}</output>
        <div className="flex gap-2">
          <button type="button" className="btn-primary" onClick={generate}>Generate</button>
          <CopyButton text={pw} />
        </div>
      </div>
      <p className="text-sm text-ink-600">Estimated entropy: <strong className="text-ink-900">{bits} bits</strong> · {strength}</p>
      <div>
        <label htmlFor="pg-len" className="text-sm font-medium text-ink-800">Length: {length}</label>
        <input id="pg-len" type="range" min={8} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="mt-2 w-full accent-brand-700" />
      </div>
      <fieldset className="grid gap-2 sm:grid-cols-2">
        <legend className="mb-2 text-sm font-medium text-ink-800">Include</legend>
        {([
          ["lower", "Lowercase (a–z)"],
          ["upper", "Uppercase (A–Z)"],
          ["digits", "Numbers (2–9)"],
          ["symbols", "Symbols (!@#…)"],
          ["ambiguous", "Ambiguous characters (l, I, O, 0, 1)"],
        ] as const).map(([k, label]) => (
          <label key={k} className="flex items-center gap-2 text-sm text-ink-700">
            <input type="checkbox" checked={opts[k]} onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })} className="h-4 w-4 accent-brand-700" />
            {label}
          </label>
        ))}
      </fieldset>
    </div>
  );
}
