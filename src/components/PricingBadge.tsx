import type { PricingModel } from "@/lib/types";

const LABELS: Record<PricingModel, { label: string; cls: string }> = {
  free: { label: "Free", cls: "border-brand-200 bg-brand-50 text-brand-800" },
  freemium: { label: "Freemium", cls: "border-brand-200 bg-brand-50 text-brand-800" },
  "free-trial": { label: "Free trial", cls: "border-accent-100 bg-accent-50 text-accent-700" },
  paid: { label: "Paid", cls: "border-ink-200 bg-ink-50 text-ink-700" },
  unknown: { label: "Pricing unverified", cls: "border-ink-200 bg-white text-ink-500" },
};

export function pricingLabel(model: PricingModel) {
  return LABELS[model].label;
}

export function PricingBadge({ model }: { model: PricingModel }) {
  const { label, cls } = LABELS[model];
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{label}</span>;
}
