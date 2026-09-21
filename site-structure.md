# Banknote Expert — Site Structure

A map of every page a visitor can reach, what's on it, and how it's all linked together.

## Global layout (on every page)

- **Header** — sticky, solid Treasury-green bar. Logo mark (seal icon) + "Banknote Expert" wordmark on the left, linking home. Primary nav on the right with short labels: **Fancy Serial Numbers**, **Value Guide**, **Star Notes Lookup**, **$2 Bills**, **Methodology**.
- **Footer** — same green background. Four link columns pulled from the route registry (see silos below), plus a copyright line. Text is brown for contrast against the green.
- Every internal `#section` link scrolls smoothly to its target.

## Homepage — `/`

The flagship page: fancy serial number checker front and center.

1. **H1 + checker tool** — enter an 8-digit serial, click Check, get a rarity score, matched patterns, and an estimated value range.
2. **Where to find the serial number** — explainer + inline SVG diagram of a note.
3. **Fancy serial number patterns** — card grid of every pattern (radar, ladder, solid, binary, etc.), each linking to its own page or the hub.
4. **What is your bill actually worth** — full value range table (pattern × condition).
5. **Does your bill have a star?** — explainer + CTA button to the Star Note Lookup tool.
6. **Check value by denomination** — cards linking to the $2 bill pages.
7. **How we estimate value** — methodology summary + link to `/methodology/`.
8. **Common questions** — FAQ accordion (8 questions, click to expand).
9. **All tools** — card grid linking every tool/guide page on the site.

## Silo: Fancy Serial Numbers

- **`/fancy-serial-numbers/`** — hub page. Checker tool embedded up top, then an explainer of every pattern type (solid, seven-of-a-kind, radar, super radar, repeater, ladder, binary, low serial, high serial) with anchor-nav jump links, plus links to the four dedicated pattern pages below.
- **`/fancy-serial-numbers/radar/`** — dedicated guide to radar/super-radar serials, with checker tool, comparison table (radar vs. super radar), and related links.
- **`/fancy-serial-numbers/ladder/`** — dedicated guide to ladder/scrambled-ladder serials, same structure.
- **`/fancy-serial-numbers/low-serial-number/`** — dedicated guide to low serial tiers (under-10 / under-100 / under-1000), same structure.
- **`/fancy-serial-numbers/birthday-note/`** — dedicated guide to birthday-date serials, same structure.
- **`/fancy-serial-number-value/`** — price guide: full value chart by pattern and condition, checker tool embedded, sources block.

## Silo: Star Notes

- **`/star-note-lookup/`** — Star Note Lookup tool (denomination + series + serial → print run, rarity tier, source report link), plus guide content: how to read a star serial, what makes one valuable, rarity tiers table, scarcest-run callout, and links out to the fancy-serial pattern guides.

## Silo: $2 Bills

- **`/2-dollar-bill-value/`** — "How much is a $2 bill worth?" value guide: value chart by series/seal colour, are-they-rare mythbusting, short history, what makes one valuable, red-seal-vs-green-seal comparison, 1976 bicentennial deep dive, how-to-check-your-own-bill, FAQ.
- **`/2-dollar-bill-serial-number-lookup/`** — $2 Bill Serial Number Lookup tool (series + serial → pattern check, honest about $2 face value), plus supporting guide content and FAQ.

## Silo: Trust / reference pages

- **`/methodology/`** — full explanation of sources, confidence levels ("Estimate" vs. "Indicative"), the 0–100 rarity score logic, and stated limitations.
- **`/about/`** — who's behind the site (author name, bio, GitHub/LinkedIn/portfolio links), why it exists, how it differs from competitors.
- **`/privacy/`** — plain-language privacy policy (everything runs client-side, nothing is transmitted or stored).
- **`/terms/`** — terms of service.
- **`/where-is-the-serial-number-on-a-dollar-bill/`** — standalone explainer guide with a per-denomination diagram of where the serial sits on each note.

## Not found

- **`/404`** (`not-found.tsx`) — "Page not found" with a card grid pointing back to the three tools plus a link to browse all patterns.

## The three interactive tools (recap)

| Tool | Lives on | Input | Output |
|---|---|---|---|
| Fancy Serial Checker | Home + all 6 fancy-serial pages | 8-digit serial | Rarity score, matched patterns, value range |
| Star Note Lookup | `/star-note-lookup/` | Denomination, series, serial | Print run, rarity tier, source link |
| $2 Bill Serial Lookup | `/2-dollar-bill-serial-number-lookup/` | Series, serial | Pattern check + $2-specific framing |

All three are click-to-check (not live-as-you-type), client-side only, and shareable via URL query params.
