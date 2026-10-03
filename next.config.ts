import type { NextConfig } from "next";

/**
 * Static export: `next build` writes a plain HTML/CSS/JS site to `out/`
 * that can be hosted on any static host (Cloudflare Pages, Netlify, Vercel,
 * GitHub Pages, cPanel/Apache, Nginx, S3...). No Node server is required.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
