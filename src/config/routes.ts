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
  | "article-index"
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
    title: "Banknote Serial Number Checker for US Dollar Bills",
    description:
      "Enter a US dollar bill serial number to find fancy patterns, rarity odds and recorded-sales value ranges. Check if it may be worth more than face value.",
    silo: "home",
    pageType: "home",
    priority: 1.0,
    changeFrequency: "weekly",
    indexable: true,
  },

  // SILO 1, Fancy serial numbers
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
    title: "Radar Serial Number: Meaning, Rarity and Value",
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
    title: "Ladder Serial Number: Meaning, Rarity and Value",
    description:
      "Check whether a banknote serial number is a ladder of consecutive ascending or descending digits.",
    silo: "fancy-serial-numbers",
    pageType: "tool",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/fancy-serial-numbers/broken-ladder/",
    title: "Broken Ladder Serial Number: Meaning, Odds and Value",
    description: "A broken ladder has six or more digits in sequence but not all eight. See examples, odds (about 1 in 35,000), value ranges and how to check yours.",
    silo: "fancy-serial-numbers",
    pageType: "guide",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/fancy-serial-numbers/super-radar/",
    title: "Super Radar Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
    description: "What is a super radar serial number on a dollar bill? Learn the definition, see examples, check the rarity odds, and find what super radar notes actually sold for.",
    silo: "fancy-serial-numbers",
    pageType: "guide",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/fancy-serial-numbers/radar-repeater/",
    title: "Radar Repeater Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
    description: "What is a radar repeater serial number on a dollar bill? Learn the definition, see examples, check the rarity odds, and find what radar repeater notes actually sold for.",
    silo: "fancy-serial-numbers",
    pageType: "guide",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/fancy-serial-numbers/binary/",
    title: "Binary Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
    description: "What is a binary serial number on a dollar bill? Learn the definition, see examples, check the 1 in 8,749 rarity odds, and find what binary notes actually sold for.",
    silo: "fancy-serial-numbers",
    pageType: "guide",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/fancy-serial-numbers/solid/",
    title: "Solid Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
    description: "What is a solid serial number on a dollar bill? See real examples, detector-based odds, value factors and verified sold ranges by condition.",
    silo: "fancy-serial-numbers", pageType: "guide", priority: 0.8, changeFrequency: "monthly", indexable: true,
  },
  {
    path: "/fancy-serial-numbers/trinary/",
    title: "Trinary Serial Number: Meaning, Rarity and Value",
    description: "A trinary note uses exactly three distinct digits in its eight-digit serial. See examples, rarity odds, value factors and check your serial for free.",
    silo: "fancy-serial-numbers", pageType: "guide", priority: 0.8, changeFrequency: "monthly", indexable: true,
  },
  {
    path: "/fancy-serial-numbers/seven-of-a-kind/",
    title: "Seven of a Kind Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
    description: "What is a seven of a kind serial number on a dollar bill? Compare seven in a row, see detector-based odds, examples and verified value data.",
    silo: "fancy-serial-numbers", pageType: "guide", priority: 0.8, changeFrequency: "monthly", indexable: true,
  },
  {
    path: "/fancy-serial-numbers/six-of-a-kind/",
    title: "Six of a Kind Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
    description: "What is a six of a kind serial number? Learn how the detector defines it, compare near solid terms, see exact odds and check value data.",
    silo: "fancy-serial-numbers", pageType: "guide", priority: 0.8, changeFrequency: "monthly", indexable: true,
  },
  {
    path: "/fancy-serial-numbers/five-of-a-kind/",
    title: "Five of a Kind Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
    description: "What is a five of a kind serial number? See examples, compare five, six and seven repeats, check exact odds and review value factors.",
    silo: "fancy-serial-numbers", pageType: "guide", priority: 0.8, changeFrequency: "monthly", indexable: true,
  },
  {
    path: "/fancy-serial-numbers/binary-radar/",
    title: "Binary Radar Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
    description: "What is a binary radar serial number? Learn the two-digit palindrome rule, examples, exact detector odds and honest value guidance.",
    silo: "fancy-serial-numbers", pageType: "guide", priority: 0.8, changeFrequency: "monthly", indexable: true,
  },
  {
    path: "/fancy-serial-numbers/bookends/",
    title: "Bookends Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
    description: "What is a bookends serial number? See the site's two-digit rule, compare three-digit bookends with radar and repeater patterns, and review value evidence.",
    silo: "fancy-serial-numbers", pageType: "guide", priority: 0.8, changeFrequency: "monthly", indexable: true,
  },
  {
    path: "/fancy-serial-numbers/four-pairs/",
    title: "Quad Doubles (Four Pairs) Serial Number: What It Is, Rarity & Value | Banknote Expert",
    description: "What is a quad doubles serial number? Learn the AABBCCDD rule, compare it with double quad, see examples and check verified value data.",
    silo: "fancy-serial-numbers", pageType: "guide", priority: 0.8, changeFrequency: "monthly", indexable: true,
  },
  {
    path: "/fancy-serial-numbers/low-serial-number/",
    title: "Low Serial Number Dollar Bill: Rarity and Value",
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
    title: "Birthday Note Dollar Bill: Meaning, Rarity and Value",
    description:
      "A birthday note uses its eight-digit serial as a real MMDDYYYY date. See examples, rarity, value factors and check whether your dollar bill matches a date.",
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
    title: "Where Is the Serial Number on a Dollar Bill? Diagrams",
    description:
      "Find the serial number on the front of $1, $2, $5, $10, $20, $50 and $100 bills with labeled diagrams. Learn what the letters, digits and star mean.",
    silo: "fancy-serial-numbers",
    pageType: "guide",
    priority: 0.7,
    changeFrequency: "monthly",
    indexable: true,
  },

  // ANCHOR pages, adjacent silos, expanded later
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
  {
    path: "/1976-2-dollar-bill-value/",
    title: "1976 $2 Bill Value",
    description:
      "What a 1976 $2 bill is worth, including star notes, low and fancy serials and errors.",
    silo: "two-dollar-bills",
    pageType: "value",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/2-dollar-bill-value/star-notes/",
    title: "$2 Star Note Value: 1976 and Other Series Prices",
    description:
      "Check $2 star note value by series, print run and condition. Compare 1976 star notes, learn what the star means and check your serial number.",
    silo: "two-dollar-bills",
    pageType: "value",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/2-dollar-bill-value/1976-postage-stamp/",
    title: "1976 $2 Bill With Postage Stamp: Value and Postmark",
    description:
      "See what a 1976 $2 bill with a postage stamp and postmark may be worth. Learn first-day issue facts, identification checks and value factors.",
    silo: "two-dollar-bills",
    pageType: "guide",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/2-dollar-bill-value/1928/",
    title: "1928 $2 Bill Value: 1928F, 1928G and Star Notes",
    description:
      "Check 1928 $2 bill value across series 1928 to 1928G. Compare red seal prices, star notes, condition and serial numbers before selling.",
    silo: "two-dollar-bills",
    pageType: "value",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/2-dollar-bill-value/1953/",
    title: "1953 $2 Bill Value: Red Seal and Silver Certificate Facts",
    description:
      "Check 1953 $2 bill value for 1953, 1953A, 1953B and 1953C red seals. Compare prices, star notes and the silver certificate question.",
    silo: "two-dollar-bills",
    pageType: "value",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/2-dollar-bill-value/1963-red-seal/",
    title: "1963 $2 Bill Value: Red Seal, Red Ink and 1963A",
    description:
      "Check 1963 $2 bill value for red seal and red ink notes. Compare 1963 with 1963A, star notes, condition and collectible serial numbers.",
    silo: "two-dollar-bills",
    pageType: "value",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/2-dollar-bill-value/1995/",
    title: "1995 $2 Bill Value and Serial Number Lookup",
    description:
      "Check 1995 $2 bill value and run a free serial number lookup. Compare regular notes, star notes, fancy serials and uncirculated examples.",
    silo: "two-dollar-bills",
    pageType: "value",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/2-dollar-bill-value/2003/",
    title: "2003 $2 Bill Value Chart: 2003 vs 2003A",
    description:
      "Use the 2003 $2 bill value chart to compare 2003 and 2003A notes, star note runs, condition and collectible serial numbers.",
    silo: "two-dollar-bills",
    pageType: "value",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/2-dollar-bill-value/2009/",
    title: "2009 $2 Bill Value and Serial Number Lookup",
    description:
      "Check 2009 $2 bill value and use the serial number lookup. Compare ordinary notes, star runs, fancy serials and uncirculated examples.",
    silo: "two-dollar-bills",
    pageType: "value",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/2-dollar-bill-value/2013/",
    title: "2013 $2 Bill Value, Star Notes and Serial Lookup",
    description:
      "Check what a 2013 $2 bill is worth, compare star note print runs and use the serial number lookup for low or fancy numbers.",
    silo: "two-dollar-bills",
    pageType: "value",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/2-dollar-bill-value/2017a/",
    title: "2017 and 2017A $2 Bill Value and Serial Lookup",
    description:
      "Check 2017 and 2017A $2 bill value, star note runs and serial numbers. Most notes are worth $2 unless condition or rarity adds a premium.",
    silo: "two-dollar-bills",
    pageType: "value",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },

  {
    path: "/blog/",
    title: "Banknote Collecting Guides & Articles",
    description: "Explore Banknote Expert guides to fancy serial numbers, star notes, $2 bills and banknote values.",
    silo: "trust",
    pageType: "article-index",
    priority: 0.7,
    changeFrequency: "weekly",
    indexable: true,
  },

  // TRUST
  {
    path: "/about-the-author/", title: "About the Author: Muhammad Khalid Hussain | Banknote Expert",
    description: "Meet Muhammad Khalid Hussain, the writer and developer behind Banknote Expert.",
    silo: "trust", pageType: "trust", priority: 0.5, changeFrequency: "yearly", indexable: true,
  },
  {
    path: "/tools/", title: "Banknote Serial Number Tools & Checkers",
    description: "Explore Banknote Expert serial number checkers and lookup tools.",
    silo: "home", pageType: "article-index", priority: 0.7, changeFrequency: "monthly", indexable: true,
  },
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
    indexable: false, // TODO(human): confirm the owner's preferred legal-page indexing policy.
  },
  {
    path: "/terms/",
    title: "Terms of Service",
    description: "The terms that govern use of Banknote Expert.",
    silo: "trust",
    pageType: "legal",
    priority: 0.1,
    changeFrequency: "yearly",
    indexable: false, // TODO(human): confirm the owner's preferred legal-page indexing policy.
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
