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
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
