import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Page Not Found — Banknote Expert",
  description: "The page you were looking for could not be found.",
  path: "/404/",
  noindex: true,
});

const TOOLS = [
  {
    href: "/",
    label: "Fancy serial number checker",
    description: "Score any US banknote serial for collectible patterns.",
  },
  {
    href: "/star-note-lookup/",
    label: "Star note lookup",
    description: "Find a star note's print run and rarity.",
  },
  {
    href: "/2-dollar-bill-serial-number-lookup/",
    label: "$2 bill serial number lookup",
    description: "Check a $2 note by series and serial.",
  },
];

export default function NotFound() {
  return (
    <div className="py-10">
      <h1 className="text-display">Page not found</h1>
      <p className="mt-3 max-w-2xl text-lead">
        We couldn&rsquo;t find that page. It may have moved, or the link may be
        wrong. Try one of our tools instead:
      </p>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {TOOLS.map((tool) => (
          <li key={tool.href} className="card card-hover p-4">
            <Link href={tool.href} className="link-accent text-base font-semibold">
              {tool.label}
            </Link>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {tool.description}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm">
        <Link href="/fancy-serial-numbers/" className="link-accent">
          Or browse all fancy serial number patterns
        </Link>
      </p>
    </div>
  );
}
