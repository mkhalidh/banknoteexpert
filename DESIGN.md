---
name: Banknote Expert
description: Treasury Heritage for banknote tools and collector guides.
colors:
  background: "#fbf9f4"
  foreground: "#172b23"
  surface: "#ffffff"
  muted: "#58645c"
  accent: "#0f382a"
  accent-foreground: "#fdfaf2"
  secondary: "#8b681f"
  border-soft: "#e4dcd0"
  paper: "#f4efe6"
  treasury-tint: "#e8f0eb"
  gold: "#c59b27"
  footer-surface: "#0a2b20"
typography:
  display:
    fontFamily: "Playfair Display, serif"
    fontSize: "clamp(2rem, 1.5rem + 1.6vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.13
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Playfair Display, serif"
    fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Playfair Display, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    lineHeight: 1.7
  data:
    fontFamily: "JetBrains Mono, monospace"
rounded:
  control: "4px"
  card: "6px"
spacing:
  compact: "16px"
  panel: "24px"
  wide: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
---

# Design System: Banknote Expert

## Overview

**Creative North Star: "Treasury Heritage"**

The supplied Stitch references establish a collector's reference desk: parchment surfaces, forest ink, engraved serif headings, and restrained metallic accents. Tools and factual guides share a calm editorial hierarchy with illustrative editorial photographs, crisp banknote diagrams, and readable serial data.

This records the implemented styles in `src/app/globals.css`, font loading in `src/app/layout.tsx`, and shared components. `PRODUCT.md` governs content preservation; the references supply visual direction rather than replacement copy.

**Key Characteristics:**

- Warm paper and forest ink.
- Serif headings, sans-serif reading, monospaced serials.
- Fine borders, compact corners, restrained elevation.
- Editorial photographs alongside preserved inline banknote diagrams.

## Colors

Forest `accent` supplies actions and emphasis; `foreground` supplies dark reading ink. Gold and bronze are secondary details. White `surface`, parchment `background`, warmer `paper`, and pale green `treasury-tint` establish section hierarchy. `border-soft` divides panels without heavy outlines; `muted` supports secondary text.

The frontmatter records the default light palette. Existing `[data-theme="dark"]` CSS provides alternate values; use semantic custom properties rather than copying light literals into new components. The forest blog hero and table headings intentionally retain their own dark backgrounds.

## Typography

Playfair Display carries headings; Plus Jakarta Sans carries prose and controls; JetBrains Mono carries serials and data. These are the actual fonts loaded by `next/font`, despite legacy Geist variable names and older stylesheet comments.

Display and section headings use responsive clamps with slightly tightened tracking. At widths up to 767px, display headings become 2rem with 1.17 line height and section headings become 1.5rem. Prose uses generous 1.85 line height; lead text uses 1.7, increasing to 1.8 on mobile. Tables use tabular numbers.

**The Three Roles Rule.** Keep headings, reading text, and serial data in their established font roles.

## Layout

The main container is capped at 1220px with 32px horizontal padding; the header caps at 1320px. At 767px and below, the main padding becomes 18px and article section gaps fall from 48px to 34px. Prose sections cap at 850px.

Desktop star lookup places the form and dataset note beside the result; mobile stacks form, note, result. Blog uses a split feature, two-column article cards, and a 280px sidebar. At 767px the feature and sidebar layout stack; cards become one column at 479px. The navigation changes from full-width desktop disclosures to a mobile menu at 1100px and below. Mobile submenu columns become a single column at 479px. Editorial article pages cap at 1000px.

## Elevation & Depth

Tonal surfaces and thin borders do most of the work. Cards are flat at rest. Hoverable cards lift 2px with `0 8px 20px -12px rgb(15 56 42 / 20%)`; primary buttons use `--shadow-sm`. Results and the home tool enclosure receive soft, low-contrast shadows. Avoid spreading result-panel elevation to every content block.

## Shapes

Controls use 4px corners, shared cards 6px, and specialized panels approximately 3–5px. Thin outlines, forest top rules, and occasional double borders reference printed reference material. Banknote illustrations retain their own established geometry.

## Components

Buttons use 600 weight, 12px by 24px padding, and compact corners. Primary buttons fade to 0.9 opacity on hover; both button variants scale to 0.97 when pressed. Focus-visible outlines are 2px forest with a 4px offset.

Inputs use soft borders and forest focus borders. Serial inputs have a pale green surface and a 56px minimum height. Blog search has a 46px minimum height; category and New / Most popular buttons have a 44px minimum height and selected states exposed through `aria-pressed`. Search and category/order controls precede the featured article, followed by the article grid and sidebar. Category selection is reflected in the URL hash. Most popular is an editorial ordering, not a measured traffic claim; empty categories retain an honest empty state.

Navigation sits in a sticky white header with a 5px forest top rule. Desktop uses an HBL-inspired, full-width disclosure panel with grouped link columns, opened by pointer hover or a separate toggle button; primary labels remain direct destination links. Escape, explicit close, and focus leaving the navigation close disclosures. The Blog menu groups Fancy Serial Numbers guides, currently empty Star Notes and $2 Bills categories, and Company links. Mobile uses a 44px menu button and inline disclosures at widths up to 1100px, with 52px primary links. The footer uses deep forest with warm light text and a double gold-toned top border.

Cards use white surfaces and fine borders. Pattern examples place monospaced serials on pale green bands. Tables use forest headings, alternating paper rows, and pale green hover states. Native disclosure cards expose FAQs without custom dialog behavior.

Keep the original `SerialDiagram` SVG and its accessible title and description in existing content. Article features, cards, and covers now use self-hosted 1200px WebP photographs derived from the supplied Stitch assets; their alt text identifies them as illustrative. Photography is editorial context, not evidence of a particular note, auction, or valuation.

Article introductions place the category, existing heading and lead, author/date/reading-time byline, and cover image before the tool and existing body. Cards share the category, serif title, byline, and excerpt hierarchy. The sidebar tool callout uses forest with a yellow action (`#e6bd4a`, hover `#f4ce61`); its linked tool follows the active category. Preserve factual author information and existing publication dates rather than inventing credentials or traffic statistics.

Motion is brief: 100–220ms control transitions and a 420ms, 8px entrance animation. Honor the existing reduced-motion override, which removes entry motion and effectively eliminates transition duration.

## Do's and Don'ts

- Do use semantic color variables for theme-aware surfaces and text.
- Do preserve the original note diagrams and accessible descriptions.
- Do retain existing factual copy, headings, URLs, and metadata during visual work.
- Do keep visible keyboard focus and reduced-motion behavior.
- Don't substitute reference-design copy for the site's collector content.
- Don't add account, newsletter, auction, or registry interfaces from reference imagery.
- Don't treat legacy font comments as the active font specification.
