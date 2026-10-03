import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail + matching BreadcrumbList schema. Home is added automatically. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-ink-700">{c.name}</span>
                ) : (
                  <>
                    <Link href={c.path} className="hover:text-brand-700 hover:underline">{c.name}</Link>
                    <span aria-hidden="true" className="text-ink-300">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={[breadcrumbSchema(all)]} />
    </>
  );
}
