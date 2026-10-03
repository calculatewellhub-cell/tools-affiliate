"use client";

import { useEffect, useRef } from "react";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * AdSense slot. Renders nothing unless NEXT_PUBLIC_ADSENSE_CLIENT is set
 * (or a dashed placeholder when NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true).
 * Ads are always labelled and visually distinct from affiliate CTAs.
 *
 * Placement policy: guides, free tools and informational listings only.
 * Commercial tool / comparison pages stay ad-free by default.
 */
export function AdSlot({ slot, format = "auto", className = "" }: { slot: string; format?: "auto" | "rectangle" | "horizontal"; className?: string }) {
  const ref = useRef<HTMLModElement>(null);
  useEffect(() => {
    if (!client || !ref.current || ref.current.dataset.loaded) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      ref.current.dataset.loaded = "1";
    } catch {
      /* ad blockers or script not yet loaded — fail silently */
    }
  }, []);

  if (!client) {
    if (!showPlaceholders) return null;
    return (
      <div className={`flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-ink-300 bg-ink-50 text-xs text-ink-400 ${className}`}>
        Ad placeholder · slot “{slot}”
      </div>
    );
  }
  return (
    <aside aria-label="Advertisement" className={`my-2 ${className}`}>
      <p className="mb-1 text-center text-[0.65rem] tracking-wider text-ink-400 uppercase">Advertisement</p>
      <ins
        ref={ref}
        className="adsbygoogle block min-h-[100px]"
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
