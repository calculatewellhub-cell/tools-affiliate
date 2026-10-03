"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** <details>-based menu that also closes after client-side navigation. */
export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);
  return (
    <details ref={ref} className="group relative lg:hidden">
      <summary className="btn-ghost list-none px-2.5" aria-label="Open menu">
        <svg viewBox="0 0 24 24" className="h-6 w-6 group-open:hidden" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        <svg viewBox="0 0 24 24" className="hidden h-6 w-6 group-open:block" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </summary>
      <div className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-ink-200 bg-white shadow-lg">
        <form action="/search/" method="get" role="search" className="container-page pt-4">
          <label htmlFor="m-search" className="sr-only">Search tools</label>
          <input id="m-search" name="q" type="search" placeholder="What tool are you looking for?" className="input" />
        </form>
        <nav aria-label="Mobile" className="container-page grid grid-cols-2 gap-1 py-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2.5 text-[0.95rem] font-medium text-ink-800 hover:bg-ink-50">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </details>
  );
}
