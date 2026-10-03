import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/** Map free-tool slugs (src/lib/free-tools.ts) to their interactive component. */
export const freeToolComponents: Record<string, ComponentType> = {
  "word-counter": dynamic(() => import("./WordCounter")),
  "case-converter": dynamic(() => import("./CaseConverter")),
  "slug-generator": dynamic(() => import("./SlugGenerator")),
  "serp-snippet-preview": dynamic(() => import("./SerpPreview")),
  "password-generator": dynamic(() => import("./PasswordGenerator")),
  "utm-builder": dynamic(() => import("./UtmBuilder")),
};
