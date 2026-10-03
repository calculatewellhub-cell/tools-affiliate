import { getAffiliates, getTool } from "./content";

export interface OutboundLink {
  href: string;
  /** rel attribute. Affiliate links are marked sponsored; all external links get noopener. */
  rel: string;
  isAffiliate: boolean;
}

/**
 * The ONLY place outbound tool links are built. Content never contains
 * affiliate URLs directly — update content/affiliates.json instead.
 */
export function outboundLink(slug: string): OutboundLink {
  const rec = getAffiliates()[slug];
  const tool = getTool(slug);
  const official = rec?.official_url || tool?.websiteUrl || "#";
  if (rec && rec.affiliate_status === "active" && rec.affiliate_url) {
    return { href: rec.affiliate_url, rel: "sponsored nofollow noopener", isAffiliate: true };
  }
  return { href: official, rel: "noopener", isAffiliate: false };
}
