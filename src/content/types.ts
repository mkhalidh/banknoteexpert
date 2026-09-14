/**
 * Shared types for per-page content modules.
 *
 * Each page has one content module under src/content that exports a PageContent
 * object: { meta, sections }. Page components render these; they never hardcode
 * prose inline.
 */

/** An inline run of prose: a plain string or an in-text link. */
export type InlineSegment = string | { href: string; label: string };

/** A single block of rendered prose inside a section. */
export type ContentBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "richtext"; segments: InlineSegment[] }
  | { kind: "subheading"; text: string }
  | { kind: "list"; ordered?: boolean; items: string[] };

export interface ContentSection {
  /** Anchor id, used by AnchorNav and heading links. */
  id: string;
  /** H2 text shown in the section and in the table of contents. */
  heading: string;
  blocks: ContentBlock[];
}

export interface ContentMeta {
  /** Absolute path with trailing slash; must match the route registry. */
  path: string;
  /** <title> and Open Graph title. Unique across the site. */
  title: string;
  /** Meta description. Unique across the site. */
  description: string;
  /** H1 text, which must contain the exact primary keyword. */
  h1: string;
  /** The exact primary keyword this page targets. */
  primaryKeyword: string;
  /** Lead answer to the title question, kept within the first 60 words. */
  lead: string;
}

export interface PageContent {
  meta: ContentMeta;
  /** Bullet points for the KeyTakeaways box. */
  takeaways: string[];
  sections: ContentSection[];
  /** Related internal links with custom anchor text. */
  related: ContentLink[];
}

/** A link with custom anchor text, used by RelatedPages and inline linking. */
export interface ContentLink {
  href: string;
  label: string;
  description?: string;
}
