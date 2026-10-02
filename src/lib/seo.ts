import type { Metadata } from "next";

/** Canonical origin. Every canonical URL on the site is absolute and rooted here. */
export const SITE_URL = "https://www.banknoteexpert.com";
export const SITE_NAME = "Banknote Expert";

export interface BuildMetadataParams {
  title: string;
  description: string;
  /** Absolute path with a trailing slash, e.g. "/fancy-serial-numbers/". */
  path: string;
  /** Optional path or absolute URL to a page-specific OG image. */
  ogImage?: string;
  /** When true the page is marked noindex/nofollow. */
  noindex?: boolean;
}

/**
 * Build a Next.js Metadata object with an absolute, self-referencing canonical
 * of `https://www.banknoteexpert.com{path}` on EVERY page.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noindex = false,
}: BuildMetadataParams): Metadata {
  const canonical = `${SITE_URL}${path}`;
  // Nested page metadata replaces openGraph/twitter wholesale. Always include
  // an explicit fallback; relying on the root file alone loses inherited images.
  const previews: Record<string, string> = {
    "/": "Fancy Serial Number Checker",
    "/star-note-lookup/": "Star Note Lookup",
    "/2-dollar-bill-serial-number-lookup/": "$2 Bill Value by Serial Number",
    "/fancy-serial-number-value/": "Fancy Serial Number Price Guide",
    "/fancy-serial-numbers/": "What Is a Fancy Serial Number?",
  };
  const imagePath = path === "/" ? "/social/home/" : previews[path] ? path : "/";
  const imageAlt = `${previews[path] ?? SITE_NAME} — Free US banknote serial number tools`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: ogImage ?? `${imagePath}opengraph-image/`, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: ogImage ?? `${imagePath}${path === "/" ? "opengraph-image" : "twitter-image"}/`, alt: imageAlt }],
    },
  };
}
