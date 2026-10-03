import Link from "next/link";
import { getCategories } from "@/lib/content";
import { legalNav, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const cats = getCategories();
  const explore = [
    { href: "/tools/", label: "All tools" },
    { href: "/free-tools/", label: "Free tools" },
    { href: "/reviews/", label: "Reviews" },
    { href: "/comparisons/", label: "Comparisons" },
    { href: "/alternatives/", label: "Alternatives" },
    { href: "/guides/", label: "Guides" },
  ];
  return (
    <footer className="mt-20 border-t border-ink-200 bg-ink-50">
      <div className="container-page grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-600">
            Independent software discovery from{" "}
            <a href={site.parentUrl} className="link">{site.parentName}</a>. We explain what tools do, who they suit and what to check before you pay.
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-ink-500">
            Some links are affiliate links. If you sign up or buy through them we may earn a commission at no extra cost to you.{" "}
            <Link href="/affiliate-disclosure/" className="underline">Disclosure</Link>
          </p>
        </div>
        <FooterCol title="Categories" className="md:col-span-3" links={cats.map((c) => ({ href: `/${c.slug}/`, label: c.name }))} />
        <FooterCol title="Explore" className="md:col-span-2" links={explore} />
        <FooterCol title="Company" className="md:col-span-3" links={legalNav} />
      </div>
      <div className="border-t border-ink-200">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.operator}. All rights reserved.</p>
          <p>Product names and trademarks belong to their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = "" }: { title: string; links: { href: string; label: string }[]; className?: string }) {
  return (
    <div className={className}>
      <h2 className="text-sm font-semibold text-ink-900">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-ink-600 hover:text-brand-700 hover:underline">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
