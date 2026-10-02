// Static pages need inline Next.js bootstrapping. No per-request nonces.
// Comments use same-origin /api; Waline assets/GIF search are lazy loaded.
// One-line enforcement switch also enables insecure-request upgrading.
export const enforceCsp = false;
export const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.google.com https://unpkg.com https://api.giphy.com",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://www.google.com https://unpkg.com https://*.giphy.com https://seccdn.libravatar.org https://q1.qlogo.cn",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(enforceCsp ? ["upgrade-insecure-requests"] : []),
].join('; ');

// Change this one constant after reviewing a week of production reports.
export const cspHeaderName = enforceCsp ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only';

export const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
  // Preserve existing policy: the complete subdomain inventory is unverified.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: cspHeaderName, value: contentSecurityPolicy },
];
