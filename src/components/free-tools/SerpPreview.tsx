"use client";

import { useEffect, useRef, useState } from "react";

/** Approximate pixel widths using canvas text measurement at SERP-like font sizes. */
function useMeasure() {
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    ctx.current = document.createElement("canvas").getContext("2d");
  }, []);
  return (text: string, font: string) => {
    if (!ctx.current) return text.length * 8;
    ctx.current.font = font;
    return Math.round(ctx.current.measureText(text).width);
  };
}

const TITLE_PX = 600;
const DESC_PX = 920;

export default function SerpPreview() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("https://example.com/your-page/");
  const measure = useMeasure();
  const titlePx = measure(title, "20px Arial");
  const descPx = measure(desc, "14px Arial");

  let host = "example.com";
  let crumbs = "";
  try {
    const u = new URL(url);
    host = u.hostname;
    crumbs = u.pathname.split("/").filter(Boolean).join(" › ");
  } catch {
    /* keep defaults for invalid URLs */
  }

  const meter = (px: number, max: number) => {
    const pct = Math.min(100, (px / max) * 100);
    const over = px > max;
    return (
      <div className="mt-1.5 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
          <div className={`h-full rounded-full ${over ? "bg-accent-500" : "bg-brand-600"}`} style={{ width: `${pct}%` }} />
        </div>
        <span className={`text-xs tabular-nums ${over ? "font-semibold text-accent-700" : "text-ink-500"}`}>
          ~{px}/{max}px {over && "· may be truncated"}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="sp-title" className="text-sm font-medium text-ink-800">Title tag <span className="font-normal text-ink-500">({title.length} chars)</span></label>
        <input id="sp-title" value={title} onChange={(e) => setTitle(e.target.value)} className="input mt-2" placeholder="Your page title" />
        {meter(titlePx, TITLE_PX)}
      </div>
      <div>
        <label htmlFor="sp-url" className="text-sm font-medium text-ink-800">URL</label>
        <input id="sp-url" value={url} onChange={(e) => setUrl(e.target.value)} className="input mt-2" type="url" />
      </div>
      <div>
        <label htmlFor="sp-desc" className="text-sm font-medium text-ink-800">Meta description <span className="font-normal text-ink-500">({desc.length} chars)</span></label>
        <textarea id="sp-desc" value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} className="input mt-2 resize-y" placeholder="A clear summary of the page…" />
        {meter(descPx, DESC_PX)}
      </div>
      <figure className="rounded-xl border border-ink-200 bg-white p-4 sm:p-5">
        <figcaption className="mb-3 text-xs font-medium tracking-wider text-ink-400 uppercase">Approximate desktop preview</figcaption>
        <div style={{ fontFamily: "Arial, sans-serif" }} className="max-w-[600px]">
          <div className="truncate text-sm text-[#202124]">{host}{crumbs && <span className="text-[#4d5156]"> › {crumbs}</span>}</div>
          <div className="mt-1 truncate text-xl leading-snug text-[#1a0dab]">{title || "Your page title appears here"}</div>
          <div className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#4d5156]">{desc || "Your meta description appears here. Search engines may show different text."}</div>
        </div>
      </figure>
    </div>
  );
}
