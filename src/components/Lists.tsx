import Link from "next/link";
import { getTool } from "@/lib/content";
import { freeTools } from "@/lib/free-tools";
import type { Comparison, Guide, Tool } from "@/lib/types";
import { Icon } from "./Icon";
import { ToolCard } from "./ToolCard";
import { ToolLogo } from "./ToolLogo";
import { formatDate } from "@/lib/format";

export function ToolGrid({ tools, cols = 3 }: { tools: Tool[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={`grid grid-cols-1 gap-4 ${grid}`}>
      {tools.map((t) => <ToolCard key={t.slug} tool={t} />)}
    </div>
  );
}

export function ComparisonCard({ c }: { c: Comparison }) {
  const a = getTool(c.toolA);
  const b = getTool(c.toolB);
  if (!a || !b) return null;
  return (
    <Link href={`/${c.slug}/`} className="card card-hover group flex items-center gap-4 p-4">
      <span className="flex -space-x-2">
        <ToolLogo tool={a} size="sm" />
        <ToolLogo tool={b} size="sm" />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold text-ink-900 group-hover:text-brand-700">{a.name} vs {b.name}</span>
        <span className="block text-xs text-ink-500">Updated {formatDate(c.dates.lastUpdated)}</span>
      </span>
      <Icon name="arrowRight" className="ml-auto h-4 w-4 text-ink-400 group-hover:text-brand-700" />
    </Link>
  );
}

export function GuideCard({ g }: { g: Guide }) {
  return (
    <article className="card card-hover relative flex h-full flex-col p-5">
      <p className="text-xs text-ink-500">{g.readingMinutes} min read · Updated {formatDate(g.updated)}</p>
      <h3 className="mt-2 font-semibold text-ink-900">
        <Link href={`/guides/${g.slug}/`} className="after:absolute after:inset-0 hover:text-brand-700">{g.title}</Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-600">{g.description}</p>
    </article>
  );
}

export function FreeToolLinks({ slugs, title = "Free tools" }: { slugs?: string[]; title?: string }) {
  const list = slugs ? freeTools.filter((f) => slugs.includes(f.slug)) : freeTools;
  if (!list.length) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
      <ul className="mt-3 space-y-2">
        {list.map((f) => (
          <li key={f.slug}>
            <Link href={`/free-tools/${f.slug}/`} className="group flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700"><Icon name={f.icon} className="h-4 w-4" /></span>
              <span>
                <span className="font-medium text-ink-800 group-hover:text-brand-700 group-hover:underline">{f.name}</span>
                <span className="block text-xs text-ink-500">{f.short}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
