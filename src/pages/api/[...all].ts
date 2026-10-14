import type { NextApiRequest, NextApiResponse } from "next";
import { replyEmailTemplate } from "@/lib/comments/email-template";

// Waline reads mail templates while it initializes its config. Keep an explicit
// deployment override available, but use the site's branded template by default.
process.env.MAIL_TEMPLATE ??= replyEmailTemplate;

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
// New guest comments await administrator approval before becoming public.
const walineHandler = Application({ audit: true });

// Waline's default display uses province/city/ISP from the bundled database.
// Those fields can be Chinese even for a VPN exit outside China. Show only
// the country in English, so the badge stays readable and does not imply a
// precise physical location for the commenter.
declare const think: { ip2region: (ip: string, opts?: { depth?: number }) => Promise<string> };
// eslint-disable-next-line @typescript-eslint/no-require-imports -- ip2region ships CommonJS only
const IP2Region = require("ip2region").default;
// eslint-disable-next-line @typescript-eslint/no-require-imports -- i18n-iso-countries ships CommonJS only
const isoCountries = require("i18n-iso-countries");
// eslint-disable-next-line @typescript-eslint/no-require-imports -- locale JSON data, not a module
isoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
// eslint-disable-next-line @typescript-eslint/no-require-imports -- locale JSON data, not a module
isoCountries.registerLocale(require("i18n-iso-countries/langs/zh.json"));

const ip2regionInstance = new IP2Region({ ipv4db: process.env.IP2REGION_DB_V4 });

think.ip2region = async (ip) => {
  if (!ip) return "";
  try {
    const countryZh = ip2regionInstance.search(ip)?.country;
    if (!countryZh) return "";

    const code = isoCountries.getAlpha2Code(countryZh, "zh");
    return (code && isoCountries.getName(code, "en")) || "";
  } catch {
    return "";
  }
};

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
 *
 * The dashboard/API split below exists because Waline's own middleware
 * chain (src/config/middleware.js) treats these two route families
 * differently, and both matter:
 *
 * - The "dashboard" middleware (serves /ui/register, /ui/login, etc.) runs
 *   BEFORE Waline's router and matches ctx.path against a bare /^\/ui/
 *   regex — it never sees the router's own "/api" prefix stripping, so an
 *   "/api"-prefixed path here 404s outright ("url `/api/ui/x` not found").
 * - The "prefix-warning" middleware also runs before the router and sets
 *   ctx.state.deprecated to true UNLESS ctx.path already starts with
 *   "/api" for API resource routes (/comment, /user, /article, /oauth,
 *   /token, /verification, /db). Since we're the ones stripping "/api" in
 *   the first place, every single response was "deprecated" (an old,
 *   unwrapped {page,...} shape instead of {errno,errmsg,data}) — which is
 *   why the modern @waline/admin dashboard bundle (unpkg, always latest,
 *   not pinned to this @waline/vercel version) threw an uncaught error and
 *   silently failed to render the comment moderation ("Waiting") list.
 *
 * So: strip "/api" only for /ui/* paths; leave it in place for everything
 * else, matching how Waline's own router (options.prefix: ["/api", ...])
 * expects to receive them.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.url) {
    let url = req.url;
    const [rawPath, query] = url.split("?");
    const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, "") || "/" : rawPath;

    const isDashboardPath = path === "/api/ui" || path.startsWith("/api/ui/");

    if (path === "/api/ui/register" && process.env.REGISTER_SECRET) {
      const submittedCode = new URLSearchParams(query).get("code");

      if (submittedCode !== process.env.REGISTER_SECRET) {
        res.status(404).send("Not found");
        return;
      }
    }

    const finalPath = isDashboardPath ? path.replace(/^\/api/, "") || "/" : path;

    url = query === undefined ? finalPath : `${finalPath}?${query}`;
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
