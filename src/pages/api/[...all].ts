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

// The bundled ip2region database is China-focused: it resolves a country
// for most IPs worldwide but only has province/city/ISP-level detail within
// China. Waline's own think.ip2region() (src/extend/think.js) only ever
// joins province + city + isp, so for e.g. a Pakistani visitor's IP it gets
// back { country: "巴基斯坦", province: "", city: "", isp: "" } and returns
// an empty string, dropping location entirely rather than showing anything.
// Wrap it to fall back to the country name (translated to English — the
// database's country names are themselves in Chinese) when nothing more
// specific exists, instead of the country field going unused.
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
const originalIp2Region = think.ip2region.bind(think);

think.ip2region = async (ip, opts) => {
  const primary = await originalIp2Region(ip, opts);
  if (primary || !ip) return primary;

  try {
    const countryZh = ip2regionInstance.search(ip)?.country;
    if (!countryZh) return "";

    const code = isoCountries.getAlpha2Code(countryZh, "zh");
    return (code && isoCountries.getName(code, "en")) || countryZh;
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
