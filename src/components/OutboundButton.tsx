import { outboundLink } from "@/lib/affiliate";
import { Icon } from "./Icon";

/**
 * The only component that renders outbound tool links. Resolves the URL from
 * content/affiliates.json and applies rel="sponsored" for affiliate links.
 */
export function OutboundButton({
  slug,
  label,
  variant = "primary",
  className = "",
}: {
  slug: string;
  label: string;
  variant?: "primary" | "secondary" | "text";
  className?: string;
}) {
  const link = outboundLink(slug);
  const cls =
    variant === "primary" ? "btn-primary" : variant === "secondary" ? "btn-secondary" : "link inline-flex items-center gap-1";
  return (
    <a
      href={link.href}
      rel={link.rel}
      target="_blank"
      className={`${cls} ${className}`}
      data-outbound={slug}
      data-affiliate={link.isAffiliate ? "true" : "false"}
    >
      {label}
      <Icon name="external" className="h-4 w-4" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
