import Link from "next/link";
import { getCategory } from "@/lib/content";
import type { Tool } from "@/lib/types";
import { PricingBadge } from "./PricingBadge";
import { ToolLogo } from "./ToolLogo";

/** Editorial tool card: links to our tool page, never directly to the merchant. */
export function ToolCard({ tool, showCategory = true }: { tool: Tool; showCategory?: boolean }) {
  const cat = getCategory(tool.category);
  return (
    <article className="card card-hover relative flex h-full min-w-0 flex-col p-5">
      <div className="flex items-start gap-3.5">
        <ToolLogo tool={tool} />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-ink-900">
            <Link href={`/${tool.slug}/`} className="after:absolute after:inset-0 hover:text-brand-700">
              {tool.name}
            </Link>
          </h3>
          {showCategory && cat && <p className="mt-0.5 text-xs text-ink-500">{cat.name}</p>}
        </div>
      </div>
      <p className="mt-3.5 line-clamp-3 text-sm leading-relaxed text-ink-600">{tool.shortDescription}</p>
      <div className="mt-auto flex min-w-0 flex-wrap items-center gap-1.5 pt-4">
        <PricingBadge model={tool.pricing.model} />
        {tool.isAI && <span className="chip">AI</span>}
        {tool.bestFor.slice(0, 1).map((b) => (
          <span key={b} className="chip max-w-full truncate">Best for: {b}</span>
        ))}
      </div>
    </article>
  );
}
