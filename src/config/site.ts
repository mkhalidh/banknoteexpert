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
export const AUTHOR_NAME = "Muhammad Khalid Hussain";

/** One-line author credential, surfaced in the about page and Person schema. */
export const AUTHOR_BIO =
  "Web developer with a strong focus on researching, analyzing, and building practical solutions around real-world problems.";

/** Author's external profiles, surfaced as Person schema `sameAs`. */
export const AUTHOR_SAME_AS = [
  "https://github.com/mkhalidh",
  "https://www.linkedin.com/in/muhammad-khalid-hussain-384752202/",
  "https://web-sepia-zeta-76e1668kme.vercel.app/",
] as const;

/** Named sources used for value estimates, surfaced in copy and methodology. */
export const VALUE_SOURCES = [
  "Heritage Auctions",
  "Stack's Bowers",
  "eBay sold listings",
  "BEP production reports",
  "PMG and PCGS grading standards",
] as const;
