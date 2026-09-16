import type { NextApiRequest, NextApiResponse } from "next";
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
    req.url = req.url.replace(/^\/api/, "") || "/";
  }
  return walineHandler(req, res);
}

export const config = {
  api: {
    // Waline's Koa app parses its own request body; Next must not consume the stream first.
    bodyParser: false,
  },
};
