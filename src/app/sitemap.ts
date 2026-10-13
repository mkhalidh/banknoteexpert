import type { MetadataRoute } from "next";
import { routes } from "@/config/routes";
import { SITE_URL } from "@/lib/seo";
import { pageModified } from "@/config/page-dates";

/** Emits only indexable routes, read from the single route registry. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes
    .filter((route) => route.indexable)
    .map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: pageModified[route.path],
    }));
}
