import { homeFaqs } from "@/content/home-faq";
import { pageGraph } from "@/lib/page-schema";
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getRoute } from "@/config/routes";
import { LAST_UPDATED } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { FancySerialChecker } from "@/components/tools/FancySerialChecker";
import { FeaturedOn } from "@/components/content/FeaturedOn";
import { SerialDiagram } from "@/components/content/SerialDiagram";
import { PatternGrid } from "@/components/content/PatternGrid";
import { ValueRangeTable } from "@/components/content/ValueRangeTable";
import { AllToolsGrid } from "@/components/content/AllToolsGrid";
import { FaqItem } from "@/components/content/FaqItem";
import { Comments } from "@/components/comments/Comments";

export const metadata: Metadata = buildMetadata({
  title: "Fancy Serial Number Checker: Free US Dollar Bill Lookup",
  description:
    "Free fancy serial number checker for US dollar bills. Detect radar, repeater, ladder, solid and binary patterns, get a 0–100 rarity score and value range.",
  path: "/",
  ogImage: "/social/home/opengraph-image/",
});

const structuredData = pageGraph("/", []);

const twoDollarValue = getRoute("/2-dollar-bill-value/");
const twoDollarLookup = getRoute("/2-dollar-bill-serial-number-lookup/");
const whereIsSerial = getRoute("/where-is-the-serial-number-on-a-dollar-bill/");
const binaryGuide = getRoute("/fancy-serial-numbers/binary/");
const superRadarGuide = getRoute("/fancy-serial-numbers/super-radar/");
const radarRepeaterGuide = getRoute("/fancy-serial-numbers/radar-repeater/");

export default function Page() {
  return (
    <article className="home-page flex flex-col gap-14">
      {/* Section 1, H1, subhead, input form (nothing above this) */}
      <header>
        <h1 className="text-display">Fancy Serial Number Checker</h1>
        <p className="mt-3 max-w-2xl text-lead">
          Paste your bill&rsquo;s 8-digit serial number and see instantly whether
          it matches a collectible pattern, how rare it is, and roughly what it
          may be worth.
        </p>
        <div className="mt-6">
          {/* Section 2, result panel lives inside the checker component */}
          <FancySerialChecker />
        </div>
      </header>

      {/* Section 3, where to find the serial number */}
      <section aria-labelledby="find-serial">
        <h2 id="find-serial" className="text-h2">
          Where to find the serial number on your bill
        </h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="text-zinc-700 dark:text-zinc-300">
            <p>
              Every US Federal Reserve Note carries the same serial number
              printed twice on the front in green ink. On $1 and $2 bills,
              look at the upper right and lower left. On newer $5 through $100
              bills, look at the upper left and lower right.
            </p>
            <p className="mt-3">
              A $1 or $2 bill has one prefix letter identifying its Federal
              Reserve Bank. Newer $5 through $100 bills have two: a series
              letter and a Federal Reserve Bank letter. Then come exactly eight
              digits. Those eight digits are the part collectors care about,
              because the pattern they form is what makes a note ordinary or
              unusual. After the digits sits a single suffix
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

      <section aria-labelledby="denomination-serial-check">
        <h2 id="denomination-serial-check" className="text-h2">
          Check a $1, $10, $20 or $100 bill serial number
        </h2>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          For a one dollar bill serial number check, enter the eight digits
          between its letters into the checker above. The same fancy serial
          number check works for $2, $5, $10, $20, $50 and $100 bills: you can
          type the digits alone or the full serial with its prefix and suffix.
          The tool looks for rare bill serial numbers, including repeating,
          mirrored, sequential and unusually low digit patterns.
        </p>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          A $100 bill serial number lookup or $10 dollar bill serial number
          lookup here checks the digit pattern in the same way as a $1 bill.
          The result does not depend on which denomination you hold, so compare
          your note&rsquo;s series year, condition and denomination separately
          before deciding what it may be worth. Older notes can also have
          interesting serials, but this checker does not identify their issue
          history or price an individual note by year.
        </p>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          Checking a serial number here cannot establish whether money is
          counterfeit. A matching or unusual serial is a pattern result, not
          proof that a note was issued or is genuine.
        </p>
      </section>

      {/* Section 4, pattern card grid from the registry */}
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
          example, a plain definition and rough odds;
          several patterns have their own guide, including the{" "}
          <Link href={binaryGuide.path} className="link-accent">
            binary serial number guide
          </Link>{" "}and the{" "}
          <Link href={superRadarGuide.path} className="link-accent">
            super radar serial number guide
          </Link>{", and the "}
          <Link href={radarRepeaterGuide.path} className="link-accent">
            radar repeater serial number guide
          </Link>. The rest are explained on the hub.
        </p>
        <div className="mt-6">
          <PatternGrid />
        </div>
      </section>

      {/* Section 5, value table */}
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
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          If you want to check bill value by serial number, start with the
          pattern result and the recorded sales below, then compare notes of
          the same denomination, series and grade. A money serial number
          lookup for value cannot give an exact price from eight digits alone:
          many ordinary serials have no collectible premium, and a scarce
          pattern on a worn note may sell differently from one in crisp
          condition. See the{" "}
          <Link href="/fancy-serial-number-value/" className="link-accent">
            fancy serial number value guide
          </Link>{" "}
          for the evidence behind the ranges.
        </p>
        <div className="mt-6">
          <ValueRangeTable />
        </div>
      </section>

      {/* Section 6, star notes */}
      <section aria-labelledby="star" className="star-callout">
        <h2 id="star" className="text-h2">
          Does your bill have a star?
        </h2>
        <p className="mt-3">
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
        <p className="star-callout-actions">
          <Link
            href="/star-note-lookup/"
            className="star-callout-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Look up a star note <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>

      {/* Section 7, value by denomination */}
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

      {/* Section 8, how we estimate value */}
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
          inventing a precise figure. Pattern value bands come from a September
          2026 sample of Heritage Auctions and eBay sold listings, with sample
          sizes disclosed. Star note print runs come from 287 BEP monthly
          production reports, and $2 series values are compiled from a published
          secondary price guide. Nothing here is an offer to buy
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

      {/* Section 9, FAQ (semantic HTML only; no FAQPage schema by design) */}
      <section aria-labelledby="faq">
        <h2 id="faq" className="text-h2">
          Common questions
        </h2>
        <div className="mt-4 flex max-w-3xl flex-col gap-3">
          {homeFaqs.map(faq => <FaqItem key={faq.question} question={faq.question}>{faq.answer}</FaqItem>)}

        </div>
      </section>

      {/* Section 10, all tools */}
      <section aria-labelledby="all-tools">
        <h2 id="all-tools" className="text-h2">
          All tools
        </h2>
        <div className="mt-6">
          <AllToolsGrid />
        </div>
      </section>

      <Comments path="/" />

      <FeaturedOn />

      <JsonLd data={structuredData} />
    </article>
  );
}
