import type { MetadataRoute } from "next";
import { routes } from "@/config/routes";
import { SITE_URL } from "@/lib/seo";
import { LAST_UPDATED_ISO } from "@/config/site";

/** Emits only indexable routes, read from the single route registry. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes
    .filter((route) => route.indexable)
    .map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: LAST_UPDATED_ISO,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));
}
