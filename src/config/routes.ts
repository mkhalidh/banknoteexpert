/**
 * Single source of truth for every route on the site.
 * sitemap.ts, the header nav and the footer ALL read from this file.
 * A URL is never hardcoded in two places.
 */

export type Silo =
  | "home"
  | "fancy-serial-numbers"
  | "star-notes"
  | "two-dollar-bills"
  | "trust";

export type PageType =
  | "home"
  | "silo-hub"
  | "tool"
  | "guide"
  | "value"
  | "lookup"
  | "trust"
  | "legal";

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface RouteEntry {
  /** Absolute path, always with a trailing slash to match `trailingSlash: true`. */
  path: string;
  title: string;
  description: string;
  silo: Silo;
  pageType: PageType;
  priority: number;
  changeFrequency: ChangeFrequency;
  /** When false the route is excluded from the sitemap and marked noindex. */
  indexable: boolean;
}

export const routes: RouteEntry[] = [
  {
    path: "/",
    title: "Banknote Expert: US Banknote Serial Number Tools",
    description:
      "Free tools to check US banknote serial numbers for fancy patterns, star notes and collectible value.",
    silo: "home",
    pageType: "home",
    priority: 1.0,
    changeFrequency: "weekly",
    indexable: true,
  },
  {
    path: "/hub/",
    title: "Banknote Hub: Serial Number Categories & Guide Library",
    description:
      "Browse banknote categories, lookup tools and value guides in one place.",
    silo: "home",
    pageType: "home",
    priority: 0.9,
    changeFrequency: "weekly",
    indexable: true,
  },

  // SILO 1 — Fancy serial numbers
  {
    path: "/fancy-serial-numbers/",
    title: "Fancy Serial Numbers on US Banknotes",
    description:
      "What makes a dollar bill serial number fancy, the pattern types collectors chase and how to check yours.",
    silo: "fancy-serial-numbers",
    pageType: "silo-hub",
    priority: 0.9,
    changeFrequency: "weekly",
    indexable: true,
  },
  {
    path: "/fancy-serial-numbers/radar/",
    title: "Radar Serial Number Checker",
    description:
      "Check whether a banknote serial number is a radar, a number that reads the same forwards and backwards.",
    silo: "fancy-serial-numbers",
    pageType: "tool",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/fancy-serial-numbers/ladder/",
    title: "Ladder Serial Number Checker",
    description:
      "Check whether a banknote serial number is a ladder of consecutive ascending or descending digits.",
    silo: "fancy-serial-numbers",
    pageType: "tool",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/fancy-serial-numbers/low-serial-number/",
    title: "Low Serial Number Checker",
    description:
      "Check whether a banknote has a collectible low serial number.",
    silo: "fancy-serial-numbers",
    pageType: "tool",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/fancy-serial-numbers/birthday-note/",
    title: "Birthday Note Serial Number Checker",
    description:
      "Check whether a banknote serial number matches a birthday in MMDDYY or similar date formats.",
    silo: "fancy-serial-numbers",
    pageType: "tool",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/fancy-serial-number-value/",
    title: "Fancy Serial Number Value Guide",
    description:
      "How collectors price fancy serial numbers and what drives the value of a note.",
    silo: "fancy-serial-numbers",
    pageType: "value",
    priority: 0.7,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/2-dollar-bill-serial-number-lookup/",
    title: "$2 Bill Serial Number Lookup",
    description:
      "Look up the serial number on a $2 bill and check it for fancy patterns.",
    silo: "fancy-serial-numbers",
    pageType: "lookup",
    priority: 0.7,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/where-is-the-serial-number-on-a-dollar-bill/",
    title: "Where Is the Serial Number on a Dollar Bill?",
    description:
      "Find the serial number on a US dollar bill and learn what each character means.",
    silo: "fancy-serial-numbers",
    pageType: "guide",
    priority: 0.7,
    changeFrequency: "monthly",
    indexable: true,
  },

  // ANCHOR pages — adjacent silos, expanded later
  {
    path: "/star-note-lookup/",
    title: "Star Note Lookup",
    description:
      "Look up US star notes and learn what the star in a serial number means for collectors.",
    silo: "star-notes",
    pageType: "lookup",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/2-dollar-bill-value/",
    title: "$2 Bill Value Guide",
    description:
      "What a $2 bill is worth by series, seal color and condition.",
    silo: "two-dollar-bills",
    pageType: "value",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },

  // TRUST
  {
    path: "/methodology/",
    title: "Methodology",
    description:
      "How Banknote Expert classifies fancy serial numbers and estimates collectible value.",
    silo: "trust",
    pageType: "trust",
    priority: 0.5,
    changeFrequency: "yearly",
    indexable: true,
  },
  {
    path: "/about/",
    title: "About Banknote Expert",
    description: "Who we are and why we built these banknote serial number tools.",
    silo: "trust",
    pageType: "trust",
    priority: 0.5,
    changeFrequency: "yearly",
    indexable: true,
  },
  {
    path: "/privacy/",
    title: "Privacy Policy",
    description: "How Banknote Expert handles your data.",
    silo: "trust",
    pageType: "legal",
    priority: 0.1,
    changeFrequency: "yearly",
    indexable: false,
  },
  {
    path: "/terms/",
    title: "Terms of Service",
    description: "The terms that govern use of Banknote Expert.",
    silo: "trust",
    pageType: "legal",
    priority: 0.1,
    changeFrequency: "yearly",
    indexable: false,
  },
];

/** Human-readable labels for each silo, used by the footer columns. */
export const siloLabels: Record<Silo, string> = {
  home: "Home",
  "fancy-serial-numbers": "Fancy Serial Numbers",
  "star-notes": "Star Notes",
  "two-dollar-bills": "$2 Bills",
  trust: "Company",
};

/** Look up a single route by path. Throws if the path is not registered. */
export function getRoute(path: string): RouteEntry {
  const route = routes.find((entry) => entry.path === path);
  if (!route) {
    throw new Error(`No route registered for path: ${path}`);
  }
  return route;
}

/** All routes belonging to a silo, in registration order. */
export function getRoutesBySilo(silo: Silo): RouteEntry[] {
  return routes.filter((entry) => entry.silo === silo);
}
