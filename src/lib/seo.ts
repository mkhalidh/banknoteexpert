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
  /** When true the page is excluded from search results while links remain crawlable. */
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
  if (!title || title.length > 60 || !description || description.length > 160) {
    throw new Error(`Invalid metadata length for ${path}: title ${title.length}, description ${description.length}`);
  }
  const canonical = `${SITE_URL}${path}`;
  const imagePath = path === "/" ? "/social/home/" : path;
  const imageAlt = `${title} | ${SITE_NAME}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
    },
    robots: noindex
      ? { index: false, follow: true }
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
