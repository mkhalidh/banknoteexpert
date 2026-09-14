import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/fancy-serial-numbers/ladder/",
    title: "Ladder Serial Number: True, Broken and Scrambled Ladders",
    description:
      "A ladder serial number runs in sequence, like 12345678. Learn true ladders, broken ladders and scrambled ladders, and why a true ladder is one of the rarest banknote patterns.",
    h1: "Ladder Serial Number",
    primaryKeyword: "ladder serial number",
    lead: "A ladder is a banknote whose eight digits run in an unbroken sequence — 12345678 counting up or 87654321 counting down. It is one of the most sought-after banknote patterns because a perfect run is extraordinarily rare, and collectors chase it accordingly.",
  },
  takeaways: [
    "A true ladder is only 12345678 (ascending) or 87654321 (descending) — all eight digits in one unbroken run.",
    "A broken ladder contains a run of six or more sequential digits without being a full ladder, for example 12345687.",
    "A scrambled or mixed ladder uses every digit from 1 to 8 exactly once but out of order, such as 81234567 or 13245768.",
    "A radar is a palindrome that reads the same both ways; it is a different pattern and is not a broken ladder.",
    "True ladders are the most prized of the group, while broken and scrambled versions are more common and worth far less.",
  ],
  sections: [
    {
      id: "true-ladder",
      heading: "True ladders: 12345678 and 87654321",
      blocks: [
        {
          kind: "paragraph",
          text: "A true ladder is the strict, purest form of the pattern. On a standard eight-digit note there are only two of them: 12345678 climbing from one to eight, and 87654321 descending back down. Every single digit must sit in its correct sequential place, with no repeats, no gaps and no shuffled positions. The moment one digit steps out of line, the note stops being a true ladder and drops into a lesser category.",
        },
        {
          kind: "paragraph",
          text: "This is exactly why the ascending ladder serial number 12345678 dollar bill is talked about with such reverence among collectors. Out of the tens of millions of serials printed within a single series, only a couple of individual notes can ever wear a perfect ascending or descending run. Compared with more forgiving fancy patterns, the odds of a clean eight-digit climb are tiny, which is what places the perfect run among the rarest banknote patterns you can hope to pull from circulation.",
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
          kind: "paragraph",
          text: "A broken ladder serial number sits one step below the perfect run. The corrected, accurate definition is a note that contains a run of six or more sequential digits without forming a complete, unbroken ladder. A clear example is 12345687: the digits 123456 climb cleanly, and then the final two positions swap so the note falls just short of a full sequence.",
        },
        {
          kind: "paragraph",
          text: "The key point, and one that is often gotten wrong, is the length of the qualifying run. A stretch of only four sequential digits does not make a broken ladder — that is far too common to count. The pattern only earns the name when six or more digits line up in order while the note as a whole still fails to be a complete top-to-bottom sequence.",
        },
        {
          kind: "paragraph",
          text: "Broken versions are noticeably more common than the strict form, simply because there are many more ways to arrange a long partial run than there are to hit the single perfect one. They still stand out at a glance and remain collectible, but the near-miss quality means they trade well below a flawless note.",
        },
      ],
    },
    {
      id: "scrambled-ladder",
      heading: "Scrambled and mixed ladders",
      blocks: [
        {
          kind: "paragraph",
          text: "A scrambled ladder serial number takes a different approach entirely. Instead of demanding a sequence, it asks only that every digit from 1 through 8 appears exactly once — the full set of ladder digits, but shuffled out of order. So 81234567 and 13245768 both qualify: no digit repeats, none is missing, yet the run is clearly jumbled rather than climbing or descending.",
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
          text: "It is worth clearing up a mix-up that trips people up: a ladder and a radar are two separate patterns, and they do not overlap. A radar is a palindrome — a serial such as 12344321 that reads the same forwards and backwards. A palindrome mirrors around its centre; the pattern here instead runs in one direction, or scatters its digits, but never mirrors.",
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
            "If they read 12345678 or 87654321, you are holding the perfect, strict form.",
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
      "81234567",
      "Every digit from 1 to 8 present exactly once, but out of order.",
      "Most common",
    ],
  ],
};
