import type { Tool } from "@/lib/types";

/**
 * Shows the tool's logo if one has been added under /public (with permission
 * to use it), otherwise a neutral monogram. We never hot-link vendor logos.
 */
export function ToolLogo({ tool, size = "md" }: { tool: Pick<Tool, "name" | "logo" | "brandColor">; size?: "sm" | "md" | "lg" }) {
  const dims = { sm: "h-9 w-9 text-sm", md: "h-12 w-12 text-base", lg: "h-16 w-16 text-xl" }[size];
  if (tool.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={tool.logo} alt={`${tool.name} logo`} className={`${dims} rounded-xl border border-ink-200 bg-white object-contain p-1.5`} loading="lazy" decoding="async" />;
  }
  const initials = tool.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden="true"
      className={`${dims} inline-flex shrink-0 items-center justify-center rounded-xl border border-ink-200 bg-ink-50 font-semibold`}
      style={{ color: tool.brandColor ?? "#0b665a" }}
    >
      {initials}
    </span>
  );
}
