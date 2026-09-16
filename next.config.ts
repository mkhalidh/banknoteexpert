import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    maximumRedirects: 0,
  },
  // @waline/vercel ships non-JS assets (math fonts, GeoIP data) that Next's
  // file tracer doesn't follow automatically; without this the comment API
  // route 500s in production on first request that needs them.
  outputFileTracingIncludes: {
    "/api/comment/[...all]": [
      "./node_modules/@mathjax/mathjax-newcm-font/**/*",
      "./node_modules/mhchemparser/**/*",
      "./node_modules/ip2region/data/**/*",
    ],
  },
};

export default nextConfig;
