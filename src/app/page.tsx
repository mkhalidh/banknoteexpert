import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getRoute } from "@/config/routes";
import { LAST_UPDATED } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { FancySerialChecker } from "@/components/tools/FancySerialChecker";
import { SerialDiagram } from "@/components/content/SerialDiagram";
import { PatternGrid } from "@/components/content/PatternGrid";
import { ValueRangeTable } from "@/components/content/ValueRangeTable";
import { AllToolsGrid } from "@/components/content/AllToolsGrid";
import { FaqItem } from "@/components/content/FaqItem";

export const metadata: Metadata = buildMetadata({
  title: "Fancy Serial Number Checker: Free US Dollar Bill Serial Lookup",
  description:
    "Free fancy serial number checker for US dollar bills. Instantly detect radar, repeater, ladder, solid, binary and low serial patterns, get a 0–100 rarity score and an estimated value range.",
  path: "/",
});

const structuredData: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#webapp`,
      name: "Fancy Serial Number Checker",
      url: `${SITE_URL}/`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      description:
        "Free tool that detects fancy patterns in US banknote serial numbers and returns a rarity score and estimated value range.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  ],
};

const twoDollarValue = getRoute("/2-dollar-bill-value/");
const twoDollarLookup = getRoute("/2-dollar-bill-serial-number-lookup/");
const whereIsSerial = getRoute("/where-is-the-serial-number-on-a-dollar-bill/");

export default function Page() {
  return (
    <article className="flex flex-col gap-14">
      {/* Section 1 — H1, subhead, input form (nothing above this) */}
      <header>
        <h1 className="text-display">Fancy Serial Number Checker</h1>
        <p className="mt-3 max-w-2xl text-lead">
          Paste your bill&rsquo;s 8-digit serial number and see instantly whether
          it matches a collectible pattern, how rare it is, and roughly what it
          may be worth.
        </p>
        <div className="mt-6">
          {/* Section 2 — result panel lives inside the checker component */}
          <FancySerialChecker />
        </div>
      </header>

      {/* Section 3 — where to find the serial number */}
      <section aria-labelledby="find-serial">
        <h2 id="find-serial" className="text-h2">
          Where to find the serial number on your bill
        </h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="text-zinc-700 dark:text-zinc-300">
            <p>
              Every US Federal Reserve Note carries the same serial number
              printed twice on the face: once in the upper-right corner and once
              in the lower-left. It is set in green ink, the same shade as the
              Treasury seal beside it. Read the characters in order and the
              structure is always the same.
            </p>
            <p className="mt-3">
              One or two letters come first: the prefix, which identifies
              the series and the Federal Reserve district that issued the note.
              Then come exactly eight digits. Those eight digits are the part
              collectors care about, because the pattern they form is what makes
              a note ordinary or unusual. After the digits sits a single suffix
              letter, or a star. A star in place of that final letter marks a
              replacement note, printed to swap out a bill spoiled during
              production. Both printed copies always show the same characters,
              so it does not matter which of the two you read.
            </p>
            <p className="mt-3">
              When you type a serial into the tool above, only the eight digits
              are scored for a pattern; the prefix, suffix and star are read for
              context.{" "}
              <Link
                href={whereIsSerial.path}
                className="link-accent"
              >
                {whereIsSerial.title}
              </Link>
            </p>
          </div>
          <SerialDiagram />
        </div>
      </section>

      {/* Section 4 — pattern card grid from the registry */}
      <section aria-labelledby="patterns">
        <h2 id="patterns" className="text-h2">
          Fancy serial number patterns
        </h2>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          A pattern is simply an arrangement of those eight digits that stands
          out from a random sequence. Some are famous, like a radar that reads
          the same in both directions; others, like a low serial number, are
          prized because so few notes carry them. This fancy serial number
          lookup checks every pattern below at once. Each card shows a worked
          example, a plain definition, rough odds and a typical value range;
          four patterns have their own page, and the rest are explained on the
          hub.
        </p>
        <div className="mt-6">
          <PatternGrid />
        </div>
      </section>

      {/* Section 5 — value table */}
      <section aria-labelledby="worth">
        <h2 id="worth" className="text-h2">
          What is your bill actually worth
        </h2>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          Value depends on far more than the pattern alone. Condition is
          decisive: a crisp, uncirculated note can be worth many times the same
          note after years in a wallet. Denomination, series year, the issuing
          district and simple collector demand all move the price too. The table
          below gives recorded sale ranges by pattern and condition, each with
          the number of sales behind it, so you can see how firm the evidence is.
          Treat every band as a starting point for research, not a guarantee.
          Combinations with no recorded sales are left blank rather than guessed,
          and small samples are flagged as indicative.
        </p>
        <div className="mt-6">
          <ValueRangeTable />
        </div>
      </section>

      {/* Section 6 — star notes */}
      <section aria-labelledby="star">
        <h2 id="star" className="text-h2">
          Does your bill have a star?
        </h2>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          If the serial number ends in a star instead of a letter, you are
          holding a star note. The Bureau of Engraving and Printing prints these
          as replacements when a sheet is damaged or misprinted during
          production, and it never reissues the exact serial that was spoiled.
          Because far fewer star notes enter circulation than standard notes,
          they carry a premium in their own right, and a star note that
          also happens to hold a fancy pattern is doubly interesting to
          collectors. Print runs vary enormously: some star runs number in the
          millions, others only a few hundred thousand, and the smallest runs
          command the strongest prices. Our checker flags a star automatically
          as soon as it reads one in your serial.
        </p>
        <p className="mt-4">
          <Link
            href="/star-note-lookup/"
            className="btn-primary text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Look up a star note
          </Link>
        </p>
      </section>

      {/* Section 7 — value by denomination */}
      <section aria-labelledby="denomination">
        <h2 id="denomination" className="text-h2">
          Check value by denomination
        </h2>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          Some questions are really about the denomination rather than the
          pattern. The $2 bill is the classic example: most are worth face
          value, but specific series, seals and star notes are worth far more,
          and people often want to run its serial for a pattern at the same
          time. If that is you, start with one of these pages. The same idea
          applies to other denominations as we expand the site: face value sets
          a floor, and pattern, condition and star status decide how far above it
          a bill can climb.
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {[twoDollarValue, twoDollarLookup].map((route) => (
            <li key={route.path} className="card card-hover p-4">
              <Link href={route.path} className="link-accent text-base font-semibold">
                {route.title}
              </Link>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {route.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 8 — how we estimate value */}
      <section aria-labelledby="estimate">
        <h2 id="estimate" className="text-h2">
          How we estimate value
        </h2>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          Our ranges are built from realised prices, not asking prices. We track
          results from major auction houses including Heritage Auctions and
          Stack&rsquo;s Bowers, watch completed eBay sold listings for the middle
          of the market, and cross-check scarcity against BEP production reports
          so a pattern&rsquo;s odds reflect how many notes were actually printed.
          Condition is mapped to PMG and PCGS grading standards so a range means
          the same thing from one note to the next. Where the sample of recent
          sales is thin, we say so through the confidence label rather than
          inventing a precise figure. The figures on this page are currently
          placeholders while that sold-listing dataset is assembled; each will be
          attributed to its source as it lands. Nothing here is an offer to buy
          or a formal appraisal; it exists to help you research a note before you
          approach a dealer or an auction house.
        </p>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/methodology/"
            className="link-accent"
          >
            Read the full methodology
          </Link>{" "}
          &middot; Last updated: {LAST_UPDATED}
        </p>
      </section>

      {/* Section 9 — FAQ (semantic HTML only; no FAQPage schema by design) */}
      <section aria-labelledby="faq">
        <h2 id="faq" className="text-h2">
          Common questions
        </h2>
        <div className="mt-4 flex max-w-3xl flex-col gap-3">
          <FaqItem question="What is a fancy serial number?">
            A fancy serial number is one whose eight digits form a recognisable
            pattern rather than a random string. Radars, repeaters, ladders,
            solids, binaries and very low numbers are all examples. Collectors
            pay attention to them because a memorable pattern is scarce and
            easy to appreciate at a glance. An ordinary note has no such
            structure, so it is worth face value. The tool at the top of this
            page reads your digits and tells you which pattern, if any, they
            match.
          </FaqItem>
          <FaqItem question="Which patterns are worth the most?">
            As a rule, the scarcer the pattern, the higher the ceiling. Solid
            serials, true ladders, super radars and single-digit low numbers
            sit at the top, while radars and repeaters are more common and more
            affordable. That said, condition and demand can outweigh rarity: a
            clean, uncirculated common pattern can beat a heavily worn rare
            one. Use the value table above to compare patterns side by side
            across the three condition bands.
          </FaqItem>
          <FaqItem question="Is this fancy serial number checker free?">
            Yes. This fancy serial number checker is completely free, with no
            account, no sign-up and no limit on how many notes you check.
            Everything runs in your browser, so your serial numbers are never
            sent to a server or stored. You can bookmark or share a result,
            since the serial is saved in the page address, and run as
            many notes as you like.
          </FaqItem>
          <FaqItem question="What do the digits mean versus the letters?">
            The letters and the digits do different jobs. The one or two prefix
            letters identify the series and the Federal Reserve district; the
            suffix letter, or star, simply continues the count within a print
            run. The eight digits in the middle are the serial proper, and they
            are the only part scored for a pattern. So when people talk about a
            collectible pattern, they mean those eight digits, not the
            surrounding letters.
          </FaqItem>
          <FaqItem question="My note scored highly: what should I do next?">
            First, handle it carefully: keep it flat and clean, ideally in a
            currency sleeve, because condition strongly affects value. Then
            confirm the pattern and look at recent sold listings for the same
            pattern and grade to gauge the real market. If it looks genuinely
            scarce, consider third-party grading from PMG or PCGS, which makes
            a note easier to sell and often lifts the price. Only then decide
            whether to hold, sell privately or consign it to auction.
            Photograph both sides in good light first, so you have a clear
            record of its condition before it changes hands.
          </FaqItem>
          <FaqItem question="Do star notes count as fancy?">
            A star note is not a pattern in itself, but it is collectible for a
            related reason: it is a replacement note, and fewer of them exist.
            A star adds to a note&rsquo;s interest and can raise its value,
            especially from a small print run, and a star note that also
            carries a fancy pattern is more desirable than either feature
            alone. Our tool flags a star as soon as it reads one at the end of
            your serial.
          </FaqItem>
          <FaqItem question="How accurate are the value estimates?">
            Treat them as informed guidance, not an appraisal. Paper-money
            prices move with condition, demand and what happens to sell that
            month, so any honest figure is a range rather than a single number.
            We show a confidence label with every row and, where recent sales
            are scarce, we widen the range or mark it clearly instead of
            guessing. For a firm valuation, a professional grader or dealer is
            the right next step.
          </FaqItem>
          <FaqItem question="Where can I sell a note with a collectible serial?">
            The main routes are online marketplaces like eBay, specialist
            currency dealers, and auction houses such as Heritage Auctions or
            Stack&rsquo;s Bowers for higher-value notes. Marketplaces reach the
            most buyers but take fees; dealers are quicker but pay wholesale;
            auctions suit genuinely scarce material. A currency serial number
            lookup and a graded holder both help buyers trust what you are
            selling, which usually improves the price you achieve.
          </FaqItem>
        </div>
      </section>

      {/* Section 10 — all tools */}
      <section aria-labelledby="all-tools">
        <h2 id="all-tools" className="text-h2">
          All tools
        </h2>
        <div className="mt-6">
          <AllToolsGrid />
        </div>
      </section>

      <JsonLd data={structuredData} />
    </article>
  );
}
