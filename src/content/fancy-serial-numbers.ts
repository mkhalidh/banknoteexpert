import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/fancy-serial-numbers/",
    title: "What Is a Fancy Serial Number? Types & Patterns Explained",
    description:
      "What is a fancy serial number? Explore collectible banknote patterns, including radar, solid, ladder, binary and repeater, with odds and value drivers.",
    h1: "What Is a Fancy Serial Number?",
    primaryKeyword: "what is a fancy serial number",
    lead:
      "A fancy serial number is a banknote serial whose eight digits form a recognisable pattern instead of a random string, such as a solid like 77777777, a radar like 12344321, or a very low number like 00000007. Collectors seek these because a memorable arrangement is scarce and easy to spot.",
  },
  takeaways: [
    "Only the eight digits form the pattern; the prefix and suffix letters do not.",
    "Patterns range from common (birthday dates) to trophy-rare (solids and true ladders).",
    "Rarer patterns set a higher ceiling, but condition and demand decide the final price.",
    "Every pattern the checker detects is explained below; radar, ladder, low serial and birthday also have their own in-depth guides.",
  ],
  sections: [
    {
      id: "definition",
      heading: "What counts as a fancy serial",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Every US note carries an eight-digit serial framed by one or two prefix letters and a suffix letter or star. Only those eight digits are judged for a pattern; the letters identify the series and district and play no part. When the digits fall into an ordered shape, such as all the same, mirrored, sequential, built from just two values, and so on, the note becomes collectible beyond its face value.",
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
      "A solid serial is the purest pattern of all: the same digit eight times over, such as 44444444. There is nothing to interpret, since every position matches, so the note reads as a single repeated figure. Only nine solids exist for any given serial run, one for each digit from one to nine, which is why they are among the first patterns any collector learns to recognise and one of the hardest to actually find in the wild.",
    valueNote:
      "Solids sit at the very top of the hobby. Their extreme scarcity sets a high ceiling, and a solid in crisp, uncirculated condition can command a strong premium over a worn one. Recent auction results vary widely by digit and grade, so treat a solid as a genuine trophy and confirm any figure against comparable sales.",
  },
  "seven-of-a-kind": {
    definition:
      "A seven-of-a-kind has seven identical digits and one odd one out, like 44444447. It is the near-miss cousin of the solid, one digit short of perfection, and is far more attainable while still looking striking on the note.",
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
      "A radar reads the same forwards and backwards, making it a palindrome such as 12344321, where the first four digits mirror the last four. It is one of the most popular entry points into the hobby.",
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
      "Repeaters are affordable and popular, a favourite for collectors starting out. Value climbs when the repeated block is itself memorable, such as a round number or a date, and when the note is in high grade. Recent auction results range widely, so a repeater is best valued against similar sold examples rather than a single headline figure.",
  },
  "double-quad": {
    definition:
      "A double quad is four of one digit followed by four of another, an AAAABBBB shape such as 11112222. The two solid blocks give it a bold, balanced look.",
    valueNote:
      "Double quads are scarcer than repeaters and carry a matching premium in good condition.",
  },
  ladder: {
    definition:
      "A ladder runs the digits in an unbroken sequence, either 12345678 up or 87654321 down. A perfect eight-digit run is one of the rarest patterns there is.",
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
      "A binary serial is built from only two different digits across all eight positions, such as 10011010 or 88998989. The name comes from the two-value alphabet, not from actual binary code: any pair of digits qualifies, so long as no third digit appears. The result is a note that looks patterned and deliberate even when the two digits are arranged irregularly, and the tighter and more rhythmic that arrangement, the more eye-catching the note becomes.",
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
      "A low serial is a very small number. The engine grades three tiers, under 1000, under 100 and under 10, with 00000001 the ultimate prize. The smaller the number, the scarcer the note.",
    valueNote:
      "The lowest tiers command real premiums; higher tiers are more modest and vary by denomination.",
    linkLabel: "Read the full low serial number guide",
  },
  "high-serial": {
    definition:
      "A high serial sits at the very top of a print block, at a serial value of 96,000,000 or above. That is the ceiling of a modern $1 to $20 Federal Reserve block; $50 and $100 blocks run a little higher, to 99,200,000. Roughly 1 in 25 notes falls in this band, so a high serial is far more common than a low one. It is the mirror image of a low serial: instead of the first notes off the press, these are among the last. The following is a smaller, more specialist one, so recognition lags behind the famous low numbers.",
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
  "six-of-a-kind": {
    definition:
      "A six-of-a-kind shows the same digit six times with two different digits filling the other two positions, such as 66666678. It sits one step below a seven-of-a-kind: still dominated by a single repeated figure, but with a touch more variation.",
    valueNote:
      "Scarcer than most everyday patterns and clearly collectible, though well short of a seven-of-a-kind or a solid. Grade and where the two odd digits land both move the price.",
  },
  "five-of-a-kind": {
    definition:
      "A five-of-a-kind repeats one digit five times across the serial, such as 55555123. The long block of a single figure still reads as deliberate even with three other digits present.",
    valueNote:
      "A modest step up from an ordinary note. Appeal rises when the five-run is paired with a clean arrangement of the remaining digits or a high grade.",
  },
  "true-binary-radar": {
    definition:
      "A true binary radar is built only from 0s and 1s and also reads the same forwards and backwards, such as 11100111. It stacks two scarce traits at once, making it one of the rarest radar forms there is.",
    valueNote:
      "A trophy-tier radar: the binary digit set and the palindrome together make it far scarcer than a plain radar, with condition setting the ceiling.",
    linkLabel: "See radars and super radars in full",
  },
  "true-binary-repeater": {
    definition:
      "A true binary repeater uses only 0s and 1s and repeats its first four digits as its last four, an all-binary ABCDABCD such as 11101110.",
    valueNote:
      "Very scarce: combining the strict 0/1 alphabet with a repeater block puts it near the top of the hobby.",
  },
  "near-true-binary": {
    definition:
      "A near true binary is a single digit away from an all-0/1 serial, so seven of the eight digits are 0 or 1 and just one is not, such as 10001102. It narrowly misses the true binary club.",
    valueNote:
      "An interesting near-miss that reads almost binary. It carries a small premium over an ordinary note and rewards a clean look.",
  },
  "true-binary": {
    definition:
      "A true binary uses nothing but 0s and 1s across all eight positions, such as 11001010, so the serial looks like machine code. It is far scarcer than an ordinary binary, which allows any two digits.",
    valueNote:
      "Highly sought after: the strict 0/1 alphabet is rare and visually striking, placing a true binary well above a standard binary.",
  },
  "radar-repeater": {
    definition:
      "A radar repeater repeats a four-digit block that is itself a radar, giving an ABBA|ABBA shape such as 12211221. It is both a repeater and a palindrome at once.",
    valueNote:
      "A scarce double pattern that commands a clear premium over a plain repeater or a plain radar.",
    linkLabel: "See radars and super radars in full",
  },
  "double-binary-repeater": {
    definition:
      "A double binary repeater repeats an AABB block, such as 11221122, so two doubled digits play twice. The paired blocks give it a bold, regular rhythm.",
    valueNote:
      "Scarcer than an ordinary repeater; the clean paired structure adds to its appeal in good condition.",
  },
  "ladder-repeater": {
    definition:
      "A ladder repeater repeats a four-step sequential block, such as 12341234, where 1234 climbs and then plays again. It unites a ladder run with a repeater.",
    valueNote:
      "A very scarce combination pattern that sits well above a plain repeater.",
    linkLabel: "Read the full ladder serial number guide",
  },
  "trinary-repeater": {
    definition:
      "A trinary repeater cycles three distinct digits in an ABCABCAB rhythm, such as 12312312. Only three values appear, and they repeat in a strict order.",
    valueNote:
      "More distinctive than a plain trinary; the repeating cycle makes it noticeably more collectible.",
  },
  "bookends-repeater": {
    definition:
      "A bookends repeater alternates two digits the whole way, an ABABABAB shape such as 12121212, so the first two digits repeat four times. The tight, regular rhythm stands out at a glance.",
    valueNote:
      "Scarcer than an ordinary repeater, a bookends repeater carries a corresponding premium in good condition.",
  },
  "binary-repeater": {
    definition:
      "A binary repeater uses just two digits and repeats its first four as its last four, such as 12111211. It is a repeater whose halves are drawn from a two-value alphabet.",
    valueNote:
      "A tidy two-in-one pattern; value climbs with a clean arrangement and a strong grade.",
  },
  "binary-radar": {
    definition:
      "A binary radar is a palindrome built from only two digits, such as 11222211, so it mirrors itself and uses a two-value alphabet at the same time.",
    valueNote:
      "Scarcer than a plain radar thanks to the restricted digit set; a clear step up in desirability.",
    linkLabel: "See radars and super radars in full",
  },
  "bookends-radar": {
    definition:
      "A bookends radar is a palindrome that opens and closes on a repeated pair, such as 11233211, so it begins on a double and mirrors cleanly to end on the same double.",
    valueNote:
      "An uncommon radar variant whose neat framing lifts it above an everyday palindrome.",
    linkLabel: "See radars and super radars in full",
  },
  "binary-four-pairs": {
    definition:
      "A binary four pairs is an AABBCCDD shape built from only two digits, such as 11331111, so every adjacent pair doubles up and just two values appear.",
    valueNote:
      "A neat, structured binary; value rises with a clean look and a high grade.",
  },
  "ladder-four-pairs": {
    definition:
      "A ladder four pairs doubles each step of a climbing run, an AABBCCDD where the pairs rise by one, such as 11223344. It reads like a ladder built from pairs.",
    valueNote:
      "A scarce, very tidy pattern that collectors find especially satisfying.",
  },
  "bookends-four-pairs": {
    definition:
      "A bookends four pairs is an AABBCCDD whose first pair matches its last, such as 11334411, so the same doubled digit frames both ends of the serial.",
    valueNote:
      "An uncommon paired pattern; the matching ends give it a clean, deliberate look.",
  },
  "four-pairs": {
    definition:
      "A four pairs is any AABBCCDD serial, four doubled digits in a row, such as 11557744. Each adjacent pair repeats even when the four values differ.",
    valueNote:
      "A recognisable structured pattern; most are modestly priced, with cleaner arrangements worth more.",
  },
  "bookends-binary": {
    definition:
      "A bookends binary opens and closes on the same two digits and uses only two values overall, such as 79997779. The matching ends frame a two-digit serial.",
    valueNote:
      "A light novelty pattern; value leans on a clean look and condition.",
  },
  bookends: {
    definition:
      "A bookends serial repeats its first two digits as its last two, such as 12456712, so the ends match while the middle can be anything. It is one of the more common structured shapes.",
    valueNote:
      "Common and affordable; appeal rises when the matching ends frame something memorable.",
  },
  "near-radar-repeater": {
    definition:
      "A near radar repeater is a single digit away from a radar repeater, such as 15511557, so it almost forms an ABBA|ABBA pattern but misses in one spot.",
    valueNote:
      "A near-miss curiosity worth a small premium over an ordinary note, especially in high grade.",
  },
  "near-binary-radar": {
    definition:
      "A near binary radar is one digit away from a binary radar, such as 32122121, narrowly missing a two-digit palindrome.",
    valueNote:
      "An affordable near-miss pattern; the closer it reads to a true binary radar, the more interest it draws.",
  },
  "super-high-serial": {
    definition:
      "A super high serial sits at 99,000,000 or above, the very top of the print range. Only $50 and $100 blocks run this high, to 99,200,000; $1 to $20 blocks stop at 96,000,000, so a note this high is a $50 or $100.",
    valueNote:
      "Scarcer than a plain high serial and more striking the closer it sits to the absolute ceiling. Condition and that final margin drive the premium.",
  },
};

/**
 * Order in which patterns are explained on the hub — the same detection order
 * the checker uses, rarest/most specific first down to the everyday finds.
 *
 * Notes on which ids appear: the low-serial tiers are folded into a single
 * summary (low-serial-10); the ABABABAB pattern is shown once as its canonical
 * "bookends-repeater" (the legacy "super-repeater" twin is omitted); and the
 * generic palindrome is shown once as "radar" (its "palindrome-radar" twin is
 * omitted). Radar- and ladder-family entries link out to their dedicated guides.
 */
export const patternOrder: string[] = [
  "solid",
  "seven-of-a-kind",
  "six-of-a-kind",
  "five-of-a-kind",
  "true-binary-radar",
  "true-binary-repeater",
  "near-true-binary",
  "true-binary",
  "radar-repeater",
  "double-binary-repeater",
  "ladder-repeater",
  "trinary-repeater",
  "bookends-repeater",
  "binary-repeater",
  "repeater",
  "super-radar",
  "binary-radar",
  "bookends-radar",
  "radar",
  "double-quad",
  "binary-four-pairs",
  "ladder-four-pairs",
  "bookends-four-pairs",
  "four-pairs",
  "bookends-binary",
  "bookends",
  "near-radar-repeater",
  "near-binary-radar",
  "ladder",
  "broken-ladder",
  "binary",
  "trinary",
  "flipper",
  "birthday-note",
  "low-serial-10",
  "high-serial",
  "super-high-serial",
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
