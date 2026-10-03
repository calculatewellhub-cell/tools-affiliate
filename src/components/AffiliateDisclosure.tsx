import Link from "next/link";
import { disclosureText } from "@/lib/site";
import { Icon } from "./Icon";

/** Clear but unobtrusive disclosure. Use "inline" next to CTAs, "box" at the top of commercial pages. */
export function AffiliateDisclosure({ variant = "inline" }: { variant?: "inline" | "box" }) {
  if (variant === "box") {
    return (
      <aside aria-label="Affiliate disclosure" className="flex gap-2.5 rounded-lg border border-ink-200 bg-ink-50 px-4 py-3 text-sm text-ink-600">
        <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-ink-500" />
        <p>
          {disclosureText}{" "}
          <Link href="/affiliate-disclosure/" className="link">How we make money</Link>.
        </p>
      </aside>
    );
  }
  return (
    <p className="text-xs leading-relaxed text-ink-500">
      {disclosureText}{" "}
      <Link href="/affiliate-disclosure/" className="underline hover:text-ink-700">Learn more</Link>.
    </p>
  );
}
