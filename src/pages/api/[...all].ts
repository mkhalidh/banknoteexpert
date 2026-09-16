import type { NextApiRequest, NextApiResponse } from "next";

// Commenter location (city/region) needs an offline GeoIP database file;
// Waline reads its path from this env var but never sets one itself. The
// "ip2region" package (a real @waline/vercel dependency, already installed)
// ships a usable default database, so point Waline at it directly rather
// than requiring a separately-hosted GeoIP file. Must run before requiring
// @waline/vercel, since its IP2Region client is instantiated lazily on the
// first lookup but reads this env var at that point, not at import time.
//
// Built as a plain string join rather than require.resolve(): Turbopack
// statically analyzes require.resolve() calls and tries to bundle whatever
// they point at as a module, which fails outright for a .db binary file
// ("Unknown module type"). process.cwd() is the function root both in local
// dev and on Vercel (outputFileTracingIncludes below preserves this same
// node_modules/... layout in the deployed bundle), so this stays correct in
// both places without needing Turbopack to ever see the literal file path.
if (!process.env.IP2REGION_DB_V4) {
  process.env.IP2REGION_DB_V4 = [process.cwd(), "node_modules", "ip2region", "data", "ip2region.db"].join(
    "/",
  );
}

// eslint-disable-next-line @typescript-eslint/no-require-imports -- @waline/vercel ships CommonJS only
const Application = require("@waline/vercel");

// Waline's server (ThinkJS/Koa) reads database and site config from
// process.env directly (POSTGRES_*, SITE_NAME, SITE_URL — see .env.local),
// not from arguments here.
const walineHandler = Application({});

/**
 * Mounts the Waline comment server at /api/*. Waline's own routes
 * (/comment, /article, /user, /ui/...) are root-relative, so the mount
 * prefix is stripped from req.url before handing off — same technique used
 * to mount any Koa/Express app under a sub-path.
 *
 * This has to be exactly /api, not a nested path like /api/comment: Waline's
 * own server-rendered admin dashboard (src/middleware/dashboard.js) and
 * OAuth login flow (src/controller/oauth.js) both hardcode
 * `${ctx.serverURL}/api/...` when building their own client-side/redirect
 * URLs, where ctx.serverURL defaults to the site origin. Mounting anywhere
 * other than the site root's /api/* makes those self-generated URLs point
 * at a path that doesn't exist.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.url) {
    let url = req.url.replace(/^\/api/, "") || "/";

    // trailingSlash: true (next.config.ts) redirects every request here to
    // end in "/" before it arrives, but Waline's own REST router (ID routes
    // like PUT/DELETE /comment/:id) fails to extract the :id segment when
    // one follows it, silently resolving it to an empty string and crashing
    // the underlying SQL query. Stripping it back off is safe: Waline's own
    // routes are otherwise slash-insensitive, and "/" itself is left alone.
    const [path, query] = url.split("?");
    const trimmedPath = path.length > 1 ? path.replace(/\/+$/, "") || "/" : path;
    url = query === undefined ? trimmedPath : `${trimmedPath}?${query}`;

    req.url = url;
  }
  return walineHandler(req, res);
}

export const config = {
  api: {
    // Waline's Koa app parses its own request body; Next must not consume the stream first.
    bodyParser: false,
  },
};
