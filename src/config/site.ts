/**
 * Small site-wide constants that are not routes.
 * Single source of truth for values referenced across pages.
 */

/** Human-readable date the value guidance was last reviewed. */
export const LAST_UPDATED = "September 8, 2026";

/** ISO form of {@link LAST_UPDATED}, for <time> elements and schema dateModified. */
export const LAST_UPDATED_ISO = "2026-09-08";

/** ISO date the guide content was first published, for schema datePublished. */
export const PUBLISHED_ISO = "2026-09-08";

/** Site author, surfaced in article bylines and Article schema. */
export const AUTHOR_NAME = "The Banknote Expert Team";

/** Named sources used for value estimates, surfaced in copy and methodology. */
export const VALUE_SOURCES = [
  "Heritage Auctions",
  "Stack's Bowers",
  "eBay sold listings",
  "BEP production reports",
  "PMG and PCGS grading standards",
] as const;
