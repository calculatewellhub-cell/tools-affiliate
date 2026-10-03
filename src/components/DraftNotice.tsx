import Link from "next/link";
import { Icon } from "./Icon";

/** Shown on records whose facts have not yet been verified by an editor. */
export function DraftNotice({ what = "profile" }: { what?: string }) {
  return (
    <div role="note" className="flex gap-2.5 rounded-lg border border-accent-100 bg-accent-50 px-4 py-3 text-sm text-accent-700">
      <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        <strong className="font-semibold">Preliminary {what}.</strong> This information has not yet been verified against the official website. Features, plans and pricing can change — always confirm on the vendor&apos;s site.{" "}
        <Link href="/editorial-policy/" className="underline">Editorial policy</Link>
      </p>
    </div>
  );
}
