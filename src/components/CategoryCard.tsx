import Link from "next/link";
import type { Category } from "@/lib/types";
import { Icon } from "./Icon";

export function CategoryCard({ category, count }: { category: Category; count: number }) {
  return (
    <Link href={`/${category.slug}/`} className="card card-hover group flex h-full flex-col p-5">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <Icon name={category.icon} />
      </span>
      <span className="mt-4 font-semibold text-ink-900 group-hover:text-brand-700">{category.name}</span>
      <span className="mt-1 line-clamp-2 text-sm text-ink-600">{category.description}</span>
      <span className="mt-auto pt-3 text-xs font-medium text-ink-500">
        {count > 0 ? `${count} tool${count === 1 ? "" : "s"} listed` : "Being researched"}
      </span>
    </Link>
  );
}
