import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/fancy-serial-numbers/radar/",
    title: "Radar Serial Number: Meaning, Rarity and Value",
    description:
      "Radar serial number guide: learn what palindromes and super radars are, how rare they are, and what condition and pattern mean for their value.",
    h1: "Radar Serial Number: Meaning, Rarity and Value",
    primaryKeyword: "radar serial number",
    lead:
      "A radar serial number reads the same forwards and backwards, making it a palindrome such as 12344321. The first four digits mirror the last four, so the note looks identical whichever way you turn it. Collectors prize the neat symmetry, and a scarcer super radar takes the idea one step further.",
  },
  takeaways: [
    "A radar is a palindrome: the eight-digit serial reads the same left to right and right to left.",
    "The first four digits mirror the last four, so 12344321 flips onto itself perfectly.",
    "A super radar is a radar whose inner six digits are all identical, such as 71111117, and it is far rarer.",
    "A radar is not a broken ladder; its short mirrored runs never reach the six-digit sequence a ladder needs.",
    "Spot one by reversing the digits and checking that the reversed string matches the original.",
  ],
  sections: [
    {
      id: "what-is",
      heading: "What a radar serial number is",
      blocks: [
        {
          kind: "paragraph",
          text: "Every modern United States note carries an eight-digit serial number set between the two letters at each end. The note earns the radar label when those eight digits form a palindrome, meaning the string reads the same left to right as it does right to left. The classic worked example is the radar serial number 12344321: read it either direction and you get the exact same sequence.",
        },
        {
          kind: "paragraph",
          text: "The rule is easiest to see as a mirror down the middle. The first four digits, 1234, are reflected by the last four, 4321, which is simply 1234 written backwards. Because the two halves answer to each other, the whole serial is symmetrical. That radar serial number dollar bill palindrome quality is exactly what collectors are looking for when they scan a note.",
        },
        {
          kind: "list",
          items: [
            "Position one must equal position eight, so the outermost digits agree.",
            "Position two must equal position seven, and position three must equal position six.",
            "Position four must equal position five, which closes the mirror at the centre.",
          ],
        },
        {
          kind: "paragraph",
          text: "When all four of those pairs hold, the note is a radar. Nothing else about the digits matters: they can be high, low, or scattered, so long as the reflected halves line up. That flexibility is why the pattern turns up more often than the showier fancy serials, even if a clean one still catches the eye.",
        },
      ],
    },
    {
      id: "super-radar",
      heading: "Super radars",
      blocks: [
        {
          kind: "paragraph",
          text: "A super radar is a stricter, scarcer cousin of the ordinary radar. It is still a palindrome, but it adds a demanding extra condition: the six inner digits are all identical, so the only variety sits in the two outer positions. The serial 71111117 is a textbook super radar serial number, with a 7 at each end wrapping six matching ones.",
        },
        {
          kind: "paragraph",
          text: "Because the middle must be a single repeated digit, far fewer serials can satisfy the pattern than qualify as a plain radar. A regular radar allows any mirrored halves; a super radar collapses six of those eight positions into one value. That extra constraint is what makes the pattern genuinely rare and why collectors treat a confirmed super radar as a real find rather than a lucky glance.",
        },
        {
          kind: "list",
          items: [
            "The six inner digits (positions two through seven) must all be the same digit.",
            "The two outer digits (positions one and eight) must match each other but differ from the inner run, or the note becomes a solid serial instead.",
            "The result still reads identically in both directions, so every super radar is also a radar.",
          ],
        },
      ],
    },
    {
      id: "palindrome",
      heading: "The palindrome relationship",
      blocks: [
        {
          kind: "paragraph",
          text: "The mirror is really just simple arithmetic on positions. Label the digits one through eight. The note reads the same in reverse only when digit one equals digit eight, digit two equals digit seven, digit three equals digit six, and digit four equals digit five. Four matching pairs, folded around an invisible line between the fourth and fifth digits, produce the symmetry.",
        },
        {
          kind: "paragraph",
          text: "That is why you never have to memorise a list of qualifying serials. Once you understand the fold, the pattern explains itself: choose any first half, write it backwards for the second half, and you have built a valid one. 5280 becomes 52800825, and 9060 becomes 90600609.",
        },
        {
          kind: "paragraph",
          text: "Spotting one by eye is quick with a little practice. Glance at the two ends first, since a mismatch there rules the note out immediately, then work inward pair by pair. If every pair agrees as you close on the centre, the mirror holds and you are looking at the pattern.",
        },
      ],
    },
    {
      id: "not-broken-ladder",
      heading: "A radar is not a broken ladder",
      blocks: [
        {
          kind: "paragraph",
          text: "A common mix-up is worth clearing up directly: a radar is not a broken ladder. The confusion is understandable, because a mirrored serial like 12344321 clearly contains short runs of climbing and falling digits: 1234 up, then 4321 down. Those runs look ladder-like at a glance, but they are far too short to count.",
        },
        {
          kind: "paragraph",
          text: "The distinction is about length. A broken ladder is defined by a genuine sequential run of six or more consecutive digits, the kind that marches steadily up or down across most of the serial. The sequences buried inside a radar only ever reach four digits, because the mirror splits the eight positions into two halves of four. Four is not six, so the ladder test simply is not met.",
        },
        {
          kind: "richtext",
          segments: [
            "In other words, the runs inside a radar are a side effect of the reflection, not evidence of a ladder. To understand what a true sequential run looks like and why the six-digit threshold matters, read our ",
            { href: "/fancy-serial-numbers/ladder/", label: "companion guide to ladder serial numbers" },
            ", which covers ladders and broken ladders in full. Keeping the two categories separate is the difference between describing a note accurately and overselling it.",
          ],
        },
      ],
    },
    {
      id: "value",
      heading: "What a radar is worth",
      blocks: [
        {
          kind: "paragraph",
          text: "Be measured about radar serial number value. The pattern is popular and instantly recognisable, which gives radars steady, mid-range demand among collectors: more than an ordinary note, but rarely dramatic. Because a great many serials qualify, a plain radar in circulated condition usually commands a modest premium rather than a headline price.",
        },
        {
          kind: "paragraph",
          text: "Super radars sit in a different tier. Their tight inner-digit rule makes them far scarcer, so they attract noticeably keener interest and stronger competition when one surfaces. As always, condition, denomination, and any overlapping features shift the picture: a crisp, uncirculated note presents better than a soft, folded one.",
        },
        {
          kind: "richtext",
            segments: ["Recent auction results vary widely by note, grade and combination of traits. For grounded expectations, read the ", { href: "/fancy-serial-number-value/", label: "fancy serial number value guide" }, ", which explains how graders and buyers price these notes."],
        },
      ],
    },
    {
      id: "check-yours",
      heading: "How to check for a radar",
      blocks: [
        {
          kind: "paragraph",
          text: "Checking a note takes only a moment. Read the eight digits in order, reverse them in your head or on paper, and compare the reversed string to the original. If the two match exactly, the note is a radar; if any pair disagrees, it is not.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Locate the serial number, which appears twice on the face of the bill.",
            "Write the eight digits between the prefix and suffix letters.",
            "Reverse the order of those digits to build the mirror image.",
            "Compare the reversed digits to the original; an exact match confirms the pattern.",
          ],
        },
        {
          kind: "richtext",
          segments: [
            "If you would rather skip the arithmetic, run your serial through the ",
            { href: "/", label: "fancy serial number checker on our homepage" },
            ". The home page tool flags the mirror instantly and tells you whether the note is a plain radar or a scarcer super radar, along with any other collectible traits the same digits happen to carry.",
          ],
        },
      ],
    },
  ],
  related: [
    {
      href: "/fancy-serial-numbers/",
      label: "Browse the full fancy serial number guide",
      description:
        "The hub page explaining every collectible serial pattern and how the categories relate.",
    },
    {
      href: "/fancy-serial-numbers/ladder/",
      label: "Compare ladders and broken ladders",
      description:
        "Why a true ladder needs six or more sequential digits, and how it differs from a mirrored radar.",
    },
    {
      href: "/fancy-serial-number-value/",
      label: "See how collectors price fancy serials",
      description:
        "A grounded value guide covering condition, denomination, and realistic expectations.",
    },
  ],
};

export const comparison: {
  caption: string;
  columns: string[];
  rows: string[][];
} = {
  caption: "Radar versus super radar",
  columns: ["Feature", "Radar", "Super radar"],
  rows: [
    ["Example serial", "12344321", "71111117"],
    [
      "Definition",
      "Any palindrome: the serial reads the same in both directions.",
      "A palindrome whose six inner digits are all identical.",
    ],
    [
      "Inner digits",
      "Mirrored halves; the middle digits can differ freely.",
      "Positions two through seven are a single repeated digit.",
    ],
    [
      "Rarity",
      "Popular and fairly common among fancy serials.",
      "Far scarcer, so it draws keener collector interest.",
    ],
  ],
};
