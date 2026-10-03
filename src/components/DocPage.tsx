import type { ReactNode } from "react";
import { formatDate } from "@/lib/format";
import { Breadcrumbs } from "./Breadcrumbs";

/** Layout for policy and company pages. */
export function DocPage({ title, path, intro, updated, children }: { title: string; path: string; intro?: string; updated?: string; children: ReactNode }) {
  return (
    <>
      <div className="border-b border-ink-200 bg-ink-50">
        <div className="container-page max-w-3xl py-8 sm:py-10">
          <Breadcrumbs items={[{ name: title, path }]} />
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">{title}</h1>
          {intro && <p className="mt-3 text-lg text-ink-600">{intro}</p>}
          {updated && <p className="mt-3 text-sm text-ink-500">Last updated: {formatDate(updated)}</p>}
        </div>
      </div>
      <div className="container-page max-w-3xl py-10">
        <div className="prose-body">{children}</div>
      </div>
    </>
  );
}
