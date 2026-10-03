import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!site.allowIndexing) {
    // Staging / preview builds: keep crawlers out entirely.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/search/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
