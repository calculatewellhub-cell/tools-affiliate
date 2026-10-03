import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  as: As = "h2",
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  as?: "h1" | "h2";
  id?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <As id={id} className={As === "h1" ? "mt-1 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl" : "h-section mt-1"}>{title}</As>
        {description && <p className="mt-2 text-ink-600">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="text-sm font-semibold text-brand-700 hover:text-brand-800 hover:underline">
          {linkLabel ?? "View all"} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

export function PageHero({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "tint" }) {
  return (
    <div className={tone === "tint" ? "border-b border-ink-200 bg-ink-50" : "border-b border-ink-100"}>
      <div className="container-page py-8 sm:py-12">{children}</div>
    </div>
  );
}
