import Link from "next/link";
import { getCategories } from "@/lib/content";
import { mainNav } from "@/lib/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const mobileLinks = [
    ...mainNav,
    { href: "/reviews/", label: "Reviews" },
    { href: "/alternatives/", label: "Alternatives" },
    ...getCategories()
      .filter((c) => c.slug !== "ai-tools")
      .map((c) => ({ href: `/${c.slug}/`, label: c.name })),
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow">
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-md px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 hover:text-ink-900">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <form action="/search/" method="get" role="search" className="ml-auto hidden md:block">
          <label htmlFor="h-search" className="sr-only">Search tools</label>
          <div className="relative">
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.35-4.35" /></svg>
            <input id="h-search" name="q" type="search" placeholder="Search tools…" className="input w-56 py-2 pl-9 text-sm lg:w-64" />
          </div>
        </form>
        <div className="ml-auto md:ml-0">
          <MobileMenu links={mobileLinks} />
        </div>
      </div>
    </header>
  );
}
