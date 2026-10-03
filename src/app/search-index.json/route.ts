import { buildSearchIndex } from "@/lib/search-index";

export const dynamic = "force-static";

/** Pre-built at `next build` into out/search-index.json for the client-side search page. */
export function GET() {
  return Response.json(buildSearchIndex());
}
