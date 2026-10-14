import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/fancy-serial-numbers/ladder/",
    title: "Ladder Serial Number: What It Is and What It's Worth",
    description:
      "What a ladder serial number is, how true, broken and scrambled ladders differ, how rare each one is, and what a ladder banknote is actually worth.",
    h1: "Ladder Serial Number: Meaning, Rarity and Value",
    primaryKeyword: "ladder serial number",
    lead: "A ladder is a banknote whose eight digits run in an unbroken ascending or descending sequence. Under our no-wrap rule, six eight-digit serials qualify, including 12345678 and 87654321.",
  },
  takeaways: [
    "A true ladder has all eight digits in one unbroken ascending or descending run; six eight-digit serials qualify without wrap-around.",
    "A broken ladder contains a run of six or more sequential digits without being a full ladder, for example 12345687.",
    "A scrambled or mixed ladder uses every digit from 1 to 8 exactly once but out of order, without a six-digit run, such as 13245768.",
    "A radar is a palindrome that reads the same both ways; it is a different pattern and is not a broken ladder.",
    "True ladders are the most prized of the group, while broken and scrambled versions are more common and worth far less.",
  ],
  sections: [
    {
      id: "true-ladder",
      heading: "True ladders: six possible eight-digit sequences",
      blocks: [
        {
          kind: "paragraph",
          text: "A true ladder has all eight digits in a continuous ascending or descending sequence, with no wrap from 9 to 0. Six serials qualify: 01234567, 12345678, 23456789, 76543210, 87654321 and 98765432. Every adjacent digit changes by exactly one in the same direction.",
        },
        {
          kind: "paragraph",
          text: "Across all 100,000,000 possible eight-digit serials, those six full ladders give odds of about 1 in 16,666,667. Zero is the lowest digit, so 01234567 counts; 9 followed by 0 does not continue a run. Actual print quantities and surviving notes vary by series.",
        },
        {
          kind: "paragraph",
          text: "Because the definition is so unforgiving, a genuine example needs no interpretation. You either have all eight digits marching in order, or you do not. That black-and-white quality is a big part of the appeal: there is nothing to argue about, and nothing to dilute the achievement of finding one.",
        },
      ],
    },
    {
      id: "broken-ladder",
      heading: "Broken ladder serial numbers",
      blocks: [
        {
          kind: "richtext",
          segments: [
            "A broken ladder has a six- or seven-digit ascending or descending run but is not a full eight-digit ladder; 12345687 is one example. Four digits in sequence do not qualify, and 9 to 0 does not wrap under the checker rule. See the ",
            { href: "/fancy-serial-numbers/broken-ladder/", label: "broken ladder serial number guide" },
            " for worked examples, exact odds and condition-based sold samples.",
          ],
        },
      ],
    },
    {
      id: "scrambled-ladder",
      heading: "Scrambled and mixed ladders",
      blocks: [
        {
          kind: "paragraph",
          text: "A scrambled ladder serial number uses every digit from 1 through 8 exactly once, without a six-digit sequential run. For example, 13245768 has all eight digits but no qualifying run. By contrast, 81234567 contains the seven-digit run 1234567 and is a broken ladder under this site's rule.",
        },
        {
          kind: "paragraph",
          text: "A mixed ladder serial number is simply another name for the same idea. Whichever label you prefer, think of it as a softer cousin of the strict form. The ingredients of a full ladder are all present, but the tidy order that makes the perfect run so special is missing.",
        },
        {
          kind: "paragraph",
          text: "Because so many arrangements of eight distinct digits are possible, scrambled and mixed examples turn up far more often than either the perfect or the broken kind. That abundance keeps their value modest. They are a fun, accessible entry point for anyone who enjoys the theme without paying for genuine top-tier rarity.",
        },
      ],
    },
    {
      id: "not-a-radar",
      heading: "A ladder is not a radar",
      blocks: [
        {
          kind: "paragraph",
          text: "It is worth clearing up a mix-up that trips people up: a ladder and a radar are two separate patterns, and they do not overlap. A radar is a palindrome, a serial such as 12344321 that reads the same forwards and backwards. A palindrome mirrors around its centre; the pattern here instead runs in one direction, or scatters its digits, but never mirrors.",
        },
        {
          kind: "richtext",
          segments: [
            "So to be precise: a radar is not a broken ladder, and a broken ladder is not a radar. Judging one by the rules of the other only leads to wrong labels. If you want the full rundown on mirrored serials, read our ",
            { href: "/fancy-serial-numbers/radar/", label: "guide to radar serial numbers" },
            " and compare the two patterns side by side.",
          ],
        },
      ],
    },
    {
      id: "value",
      heading: "What a ladder is worth",
      blocks: [
        {
          kind: "paragraph",
          text: "Value tracks rarity closely. A true, unbroken run can be highly prized and is the kind of note serious collectors actively pursue, while broken and scrambled examples command far less because they are so much easier to come by. Condition matters too: a crisp uncirculated note in either category will always outperform a worn one.",
        },
        {
          kind: "paragraph",
          text: "We will not quote specific figures here, because recent auction results vary widely with grade, series, denomination and demand on the day, and inventing a number would do you no favours. For grounded, up-to-date ranges rather than guesswork, work through our price guide at /fancy-serial-number-value/ before you buy or sell.",
        },
      ],
    },
    {
      id: "check-yours",
      heading: "How to check for a ladder",
      blocks: [
        {
          kind: "paragraph",
          text: "Checking a note is refreshingly simple, because everything you need is printed right on it. Read the eight digits of the serial number in order and compare them against the three definitions above.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Write out all eight digits exactly as they appear on the note, left to right.",
            "If all eight digits rise or fall by one at each step without wrapping from 9 to 0, you have a true ladder.",
            "If six or more digits run in sequence but the note falls short of a full run, it is a broken example.",
            "If every digit from 1 to 8 appears once but the order is jumbled, it is a scrambled or mixed one.",
          ],
        },
        {
          kind: "richtext",
          segments: [
            "If you would rather not squint at the digits yourself, paste the serial into the ",
            { href: "/", label: "free checker on our homepage" },
            " and let it flag the pattern for you in a second. It is the quickest way to confirm what you have before you get your hopes up.",
          ],
        },
      ],
    },
  ],
  related: [
    {
      href: "/fancy-serial-numbers/broken-ladder/",
      label: "Broken ladder serial numbers",
      description: "A dedicated guide to long partial runs, rarity and values.",
    },
    {
      href: "/fancy-serial-numbers/",
      label: "All fancy serial number patterns",
      description:
        "Return to the hub and browse every collectible serial type, from repeaters to solids and beyond.",
    },
    {
      href: "/fancy-serial-numbers/radar/",
      label: "Radar (palindrome) serial numbers",
      description:
        "See how mirrored serials work and why a radar is a completely separate pattern from a sequential run.",
    },
    {
      href: "/fancy-serial-number-value/",
      label: "Fancy serial number price guide",
      description:
        "Understand how rarity, grade and demand shape what collectible serials actually sell for.",
    },
  ],
};

export const comparison = {
  caption: "True, broken and scrambled ladders compared",
  columns: ["Ladder type", "Example", "Definition", "Rarity"],
  rows: [
    [
      "True",
      "12345678 or 87654321",
      "All eight digits in one unbroken ascending or descending sequence.",
      "Extremely rare",
    ],
    [
      "Broken",
      "12345687",
      "A run of six or more sequential digits that is not a full sequence.",
      "More common",
    ],
    [
      "Scrambled / mixed",
      "13245768",
      "Every digit from 1 to 8 present exactly once, but out of order.",
      "Most common",
    ],
  ],
};
