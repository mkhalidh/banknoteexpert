import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/fancy-serial-numbers/",
    title: "What Is a Fancy Serial Number? Types & Patterns Explained",
    description:
      "A fancy serial number is a banknote serial whose eight digits form a collectible pattern. See every type — solid, radar, ladder, binary, repeater and more — with odds and value drivers.",
    h1: "What Is a Fancy Serial Number?",
    primaryKeyword: "what is a fancy serial number",
    lead:
      "A fancy serial number is a banknote serial whose eight digits form a recognisable pattern instead of a random string — a solid like 77777777, a radar like 12344321, or a very low number like 00000007. Collectors seek these because a memorable arrangement is scarce and easy to spot.",
  },
  takeaways: [
    "Only the eight digits form the pattern; the prefix and suffix letters do not.",
    "Patterns range from common (birthday dates) to trophy-rare (solids and true ladders).",
    "Rarer patterns set a higher ceiling, but condition and demand decide the final price.",
    "Four patterns are explained in full here; radar, ladder, low serial and birthday have their own guides.",
  ],
  sections: [
    {
      id: "definition",
      heading: "What counts as a fancy serial",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Every US note carries an eight-digit serial framed by one or two prefix letters and a suffix letter or star. Only those eight digits are judged for a pattern; the letters identify the series and district and play no part. When the digits fall into an ordered shape — all the same, mirrored, sequential, built from just two values, and so on — the note becomes collectible beyond its face value.",
        },
        {
          kind: "richtext",
          segments: [
            "The fastest way to see whether a note qualifies is to ",
            { href: "/", label: "run the serial through the checker" },
            ". If you are not sure which digits to read, our guide on ",
            {
              href: "/where-is-the-serial-number-on-a-dollar-bill/",
              label: "where the serial number sits on a bill",
            },
            " shows you exactly where to look.",
          ],
        },
      ],
    },
    {
      id: "types",
      heading: "Types of fancy serial numbers",
      blocks: [
        {
          kind: "paragraph",
          text:
            "There are several families of pattern. Some are about repetition (solids, seven-of-a-kind, doubles), some about symmetry (radars and super radars), some about sequence (ladders), some about a limited digit set (binary and trinary), and some about size (low and high serials). The full taxonomy below covers every type this site detects, from the trophies down to the everyday finds, with a worked example, rough odds and a note on what drives each one's value.",
        },
      ],
    },
  ],
  related: [
    {
      href: "/fancy-serial-number-value/",
      label: "Fancy serial number price guide",
      description: "Estimated value ranges by pattern and condition.",
    },
    {
      href: "/where-is-the-serial-number-on-a-dollar-bill/",
      label: "Finding the serial number",
      description: "Where the number sits on every denomination.",
    },
    {
      href: "/",
      label: "Open the serial number checker",
      description: "Score any serial for patterns in your browser.",
    },
  ],
};

/** Copy for each pattern section on the hub, keyed by registry pattern id. */
export interface PatternCopy {
  definition: string;
  valueNote: string;
  /** Custom anchor text for the "read more" link when a dedicated page exists. */
  linkLabel?: string;
}

export const patternCopy: Record<string, PatternCopy> = {
  solid: {
    definition:
      "A solid serial is the purest pattern of all: the same digit eight times over, such as 44444444. There is nothing to interpret — every position matches, so the note reads as a single repeated figure. Only nine solids exist for any given serial run, one for each digit from one to nine, which is why they are among the first patterns any collector learns to recognise and one of the hardest to actually find in the wild.",
    valueNote:
      "Solids sit at the very top of the hobby. Their extreme scarcity sets a high ceiling, and a solid in crisp, uncirculated condition can command a strong premium over a worn one. Recent auction results vary widely by digit and grade, so treat a solid as a genuine trophy and confirm any figure against comparable sales.",
  },
  "seven-of-a-kind": {
    definition:
      "A seven-of-a-kind has seven identical digits and one odd one out, like 44444447. It is the near-miss cousin of the solid — one digit short of perfection — and is far more attainable while still looking striking on the note.",
    valueNote:
      "These carry a real premium over an ordinary note, though well below a true solid. Where the odd digit sits and the note's grade both nudge the value.",
  },
  "super-radar": {
    definition:
      "A super radar is a radar whose inner six digits are all identical, such as 71111117. It reads the same in both directions and has a clean block of repeats in the middle, making it far scarcer than a plain radar.",
    valueNote:
      "Super radars are prized well above standard radars because so few exist.",
    linkLabel: "See radars and super radars in full",
  },
  radar: {
    definition:
      "A radar reads the same forwards and backwards — a palindrome such as 12344321, where the first four digits mirror the last four. It is one of the most popular entry points into the hobby.",
    valueNote:
      "Radars are collectible and mid-range in value; condition and any secondary pattern move the price.",
    linkLabel: "Read the full radar serial number guide",
  },
  "super-repeater": {
    definition:
      "A super repeater repeats a two-digit block four times, giving an ABABABAB shape such as 12121212. The tight, regular rhythm makes it stand out at a glance.",
    valueNote:
      "Scarcer than an ordinary repeater, a super repeater carries a corresponding premium.",
  },
  repeater: {
    definition:
      "A repeater splits the serial into two identical halves, an ABCDABCD shape such as 51835183, where the first four digits play again as the last four. It is one of the more common structured patterns, which is part of why it is so widely recognised, but a clean repeater still reads clearly as something out of the ordinary. Because the two halves can be any four digits, repeaters come in enormous variety, from plain-looking pairs to visually satisfying combinations.",
    valueNote:
      "Repeaters are affordable and popular, a favourite for collectors starting out. Value climbs when the repeated block is itself memorable — a round number or a date, for instance — and when the note is in high grade. Recent auction results range widely, so a repeater is best valued against similar sold examples rather than a single headline figure.",
  },
  "double-quad": {
    definition:
      "A double quad is four of one digit followed by four of another, an AAAABBBB shape such as 11112222. The two solid blocks give it a bold, balanced look.",
    valueNote:
      "Double quads are scarcer than repeaters and carry a matching premium in good condition.",
  },
  ladder: {
    definition:
      "A ladder runs the digits in an unbroken sequence — 12345678 up or 87654321 down. A perfect eight-digit run is one of the rarest patterns there is.",
    valueNote:
      "True ladders are trophy notes; broken and scrambled versions are far more common and worth much less.",
    linkLabel: "Read the full ladder serial number guide",
  },
  "broken-ladder": {
    definition:
      "A broken ladder contains a run of six or more sequential digits without being a full ladder, such as 12345687. It hints at a ladder without completing one.",
    valueNote:
      "More attainable than a true ladder, a broken ladder sits well below it in value.",
    linkLabel: "Compare true and broken ladders",
  },
  binary: {
    definition:
      "A binary serial is built from only two different digits across all eight positions, such as 10011010 or 88998989. The name comes from the two-value alphabet, not from actual binary code — any pair of digits qualifies, so long as no third digit appears. The result is a note that looks patterned and deliberate even when the two digits are arranged irregularly, and the tighter and more rhythmic that arrangement, the more eye-catching the note becomes.",
    valueNote:
      "Binaries are a broad and accessible category, so most are modestly priced, but the appeal rises sharply with a clean arrangement. A binary that also forms a repeater or a near-solid can jump in desirability, and grade matters as always. Because they are relatively common, binaries reward patience: hold out for a crisp, visually strong example and value it against comparable sold notes rather than optimistic listings.",
  },
  trinary: {
    definition:
      "A trinary uses exactly three different digits across the eight positions, such as 12321233. It is a step looser than a binary and correspondingly more common.",
    valueNote:
      "Most trinaries are worth little beyond face value unless the arrangement is unusually clean.",
  },
  "low-serial-10": {
    definition:
      "A low serial is a very small number — the engine grades three tiers, under 1000, under 100 and under 10, with 00000001 the ultimate prize. The smaller the number, the scarcer the note.",
    valueNote:
      "The lowest tiers command real premiums; higher tiers are more modest and vary by denomination.",
    linkLabel: "Read the full low serial number guide",
  },
  "high-serial": {
    definition:
      "A high serial sits at the very end of a print run, at 99999900 or above, with 99999999 the ceiling. It is the mirror image of a low serial: instead of the first notes off the press, these are among the last. High serials are scarce for the same structural reason low ones are — only a tiny band of numbers at the top of each run qualifies — but they attract a smaller, more specialist following, so recognition lags behind the famous low numbers.",
    valueNote:
      "High serials carry a modest premium that leans heavily on condition and on how close the number sits to the absolute maximum. A note ending in a long tail of nines is more striking, and therefore more wanted, than one merely inside the qualifying band. As with every pattern, check comparable sold listings before settling on a figure rather than assuming the top of the run guarantees a top price.",
  },
  "birthday-note": {
    definition:
      "A birthday note reads as a calendar date in MMDDYYYY form, such as 07041976. The pattern is common because so many valid dates exist, but it can be personally meaningful.",
    valueNote:
      "Most birthday notes are worth little more than face value; the appeal is usually sentimental.",
    linkLabel: "Read the full birthday note guide",
  },
  flipper: {
    definition:
      "A flipper reads the same after a 180-degree rotation, using only the digits 0, 1, 6, 8 and 9 that survive being turned upside down, such as 60000009. It is a quirky, visual pattern.",
    valueNote:
      "Flippers are an uncommon novelty; value depends on the arrangement and condition.",
  },
};

/**
 * Order in which patterns are explained on the hub. Low-serial tiers are folded
 * into a single summary (low-serial-10), so the other two tiers are omitted here.
 */
export const patternOrder: string[] = [
  "solid",
  "seven-of-a-kind",
  "super-radar",
  "radar",
  "super-repeater",
  "repeater",
  "double-quad",
  "ladder",
  "broken-ladder",
  "binary",
  "trinary",
  "low-serial-10",
  "high-serial",
  "birthday-note",
  "flipper",
];

/** The four dedicated spoke pages, linked down from the hub. */
export const spokeLinks = [
  {
    href: "/fancy-serial-numbers/radar/",
    label: "Radar serial numbers",
    description: "Palindromes and super radars, explained in depth.",
  },
  {
    href: "/fancy-serial-numbers/ladder/",
    label: "Ladder serial numbers",
    description: "True, broken and scrambled ladders.",
  },
  {
    href: "/fancy-serial-numbers/low-serial-number/",
    label: "Low serial numbers",
    description: "The three tiers and why 00000001 is the trophy.",
  },
  {
    href: "/fancy-serial-numbers/birthday-note/",
    label: "Birthday notes",
    description: "Serials that read as a calendar date.",
  },
];
