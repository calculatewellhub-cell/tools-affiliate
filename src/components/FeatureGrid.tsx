import type { FeatureItem } from "@/lib/types";

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((f, i) => (
        <div key={f.title} className="card p-5">
          <span className="text-xs font-semibold text-brand-700">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-1.5 font-semibold text-ink-900">{f.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{f.description}</p>
        </div>
      ))}
    </div>
  );
}
