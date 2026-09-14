import Link from "next/link";
import { getRoutesBySilo, siloLabels, type Silo } from "@/config/routes";

/** Silos rendered as footer columns, in display order. */
const FOOTER_SILOS: Silo[] = [
  "fancy-serial-numbers",
  "star-notes",
  "two-dollar-bills",
  "trust",
];

/**
 * Footer with one link column per silo, sourced from the route registry.
 * Server Component — no interactivity.
 */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-4">
        {FOOTER_SILOS.map((silo) => {
          const items = getRoutesBySilo(silo).filter(
            (route) => route.pageType !== "home",
          );
          if (items.length === 0) {
            return null;
          }
          return (
            <div key={silo}>
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {siloLabels[silo]}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {items.map((route) => (
                  <li key={route.path}>
                    <Link href={route.path} className="hover:underline">
                      {route.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-10 text-sm text-zinc-500">
        © {"2026"} Banknote Expert. Serial number checks run entirely in your browser.
      </div>
    </footer>
  );
}
