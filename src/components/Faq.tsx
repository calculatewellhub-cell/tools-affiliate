import type { Faq as FaqItem } from "@/lib/types";
import { Icon } from "./Icon";

/** Accessible FAQ accordion using <details> — works without JavaScript. */
export function Faq({ items, title = "Frequently asked questions", id = "faq" }: { items: FaqItem[]; title?: string; id?: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby={`${id}-h`} id={id}>
      <h2 id={`${id}-h`} className="h-section">{title}</h2>
      <div className="mt-5 divide-y divide-ink-200 rounded-[var(--radius-card)] border border-ink-200">
        {items.map((f) => (
          <details key={f.q} className="group px-5 py-4 open:bg-ink-50/60">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-ink-900">
              {f.q}
              <Icon name="chevronDown" className="mt-0.5 h-5 w-5 shrink-0 text-ink-400 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-600">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
