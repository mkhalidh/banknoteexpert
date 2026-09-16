import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    maximumRedirects: 0,
  },
  // @waline/vercel (ThinkJS) requires every DB-driver adapter unconditionally
  // at module load (mysql, mysql2, postgresql, sqlite — regardless of which
  // one is actually configured via env vars), plus assorted non-JS assets
  // (math fonts, GeoIP data). Turbopack's file tracer doesn't follow that
  // require graph, so these are present in node_modules at build time but
  // missing from the deployed function (MODULE_NOT_FOUND at runtime).
  // Explicitly including @waline/vercel's full declared dependency list
  // (~107MB, well under the function size limit) fixes this without playing
  // whack-a-mole as each individually-missed package 500s in turn.
  outputFileTracingIncludes: {
    // Route-glob keys are matched with picomatch, so the dynamic segment's
    // brackets must be escaped — an unescaped "[...all]" is glob character-
    // class syntax, not a literal match, and silently matches nothing.
    "/api/comment/\\[\\.\\.\\.all\\]": [
      "./node_modules/@cloudbase/node-sdk/**/*",
      "./node_modules/@koa/cors/**/*",
      "./node_modules/@mathjax/mathjax-tex-font/**/*",
      "./node_modules/@mathjax/src/**/*",
      "./node_modules/@mdit/plugin-katex/**/*",
      "./node_modules/@mdit/plugin-mathjax/**/*",
      "./node_modules/@mdit/plugin-sub/**/*",
      "./node_modules/@mdit/plugin-sup/**/*",
      "./node_modules/akismet/**/*",
      "./node_modules/dompurify/**/*",
      "./node_modules/fast-csv/**/*",
      "./node_modules/form-data/**/*",
      "./node_modules/ip2region/**/*",
      "./node_modules/jsdom/**/*",
      "./node_modules/jsonwebtoken/**/*",
      "./node_modules/koa-compose/**/*",
      "./node_modules/leancloud-storage/**/*",
      "./node_modules/markdown-it/**/*",
      "./node_modules/markdown-it-emoji/**/*",
      "./node_modules/nodemailer/**/*",
      "./node_modules/nunjucks/**/*",
      "./node_modules/phpass/**/*",
      "./node_modules/prismjs/**/*",
      "./node_modules/rss/**/*",
      "./node_modules/speakeasy/**/*",
      "./node_modules/think-helper/**/*",
      "./node_modules/think-logger3/**/*",
      "./node_modules/think-model/**/*",
      "./node_modules/think-model-mysql/**/*",
      "./node_modules/think-model-mysql2/**/*",
      "./node_modules/think-model-postgresql/**/*",
      "./node_modules/think-model-sqlite/**/*",
      "./node_modules/think-mongo/**/*",
      "./node_modules/think-router-rest/**/*",
      "./node_modules/thinkjs/**/*",
      "./node_modules/ua-parser-js/**/*",
    ],
  },
};

export default nextConfig;
