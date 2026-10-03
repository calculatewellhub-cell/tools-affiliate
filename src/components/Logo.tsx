import Link from "next/link";
import { site } from "@/lib/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-semibold text-ink-900" aria-label={`${site.name} — home`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#0b665a" />
        <path d="M9 16.5l4.5 4.5L23 11.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="leading-tight">
        <span className="block text-[0.95rem]">CalculateWellHub</span>
        <span className="block text-xs font-medium tracking-wide text-brand-700">TOOLS</span>
      </span>
    </Link>
  );
}
