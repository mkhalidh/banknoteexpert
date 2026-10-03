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
  "Researcher and developer behind Banknote Expert, turning Bureau of Engraving and Printing print data, PMG and PCGS grading standards and recorded auction results into accurate, checkable serial-number tools.";

/** Author's external profiles, surfaced as Person schema `sameAs`. */
export const AUTHOR_SAME_AS = [
  "https://github.com/mkhalidh",
  "https://www.linkedin.com/in/muhammad-khalid-hussain-384752202/",
  "https://web-sepia-zeta-76e1668kme.vercel.app/",
] as const;

/** Organization logo (brand mark), surfaced as Organization schema `logo`. */
export const ORG_LOGO_PATH = "/logo.png";

/**
 * Organization `sameAs`. Banknote Expert is a solo project with no separate
 * brand social accounts, so its external presence is the maintainer's own
 * professional profiles, real, not fabricated.
 */
export const ORG_SAME_AS = AUTHOR_SAME_AS;

/** Named sources used for value estimates, surfaced in copy and methodology. */
export const VALUE_SOURCES = [
  "Heritage Auctions",
  "Stack's Bowers",
  "eBay sold listings",
  "BEP production reports",
  "PMG and PCGS grading standards",
] as const;

/**
 * Cited sources with their canonical URLs, rendered as a linked reference list.
 * These are authoritative-domain landing pages; swap in specific report or lot
 * URLs as individual claims are sourced.
 */
export const SOURCE_LINKS = [
  { name: "Bureau of Engraving and Printing (production figures)", url: "https://www.bep.gov/" },
  { name: "PMG (population reports and grading standards)", url: "https://www.pmgnotes.com/" },
  { name: "PCGS Banknote (grading standards)", url: "https://www.pcgsbanknote.com/" },
  { name: "Heritage Auctions (realized currency prices)", url: "https://currency.ha.com/" },
  { name: "Stack's Bowers (realized currency prices)", url: "https://www.stacksbowers.com/" },
] as const;
