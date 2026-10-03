import type { MetadataRoute } from "next";
import { indexableUrls } from "@/lib/indexing";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Only indexable pages are listed (see src/lib/indexing.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableUrls().map((e) => ({
    url: absoluteUrl(e.path),
    lastModified: e.lastModified,
    priority: e.priority,
  }));
}
