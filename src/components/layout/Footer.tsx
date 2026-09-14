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
    <footer className="mt-24 bg-[var(--accent)]">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-8 gap-y-10 px-4 py-14 sm:grid-cols-4">
        {FOOTER_SILOS.map((silo) => {
          const items = getRoutesBySilo(silo).filter(
            (route) => route.pageType !== "home",
          );
          if (items.length === 0) {
            return null;
          }
          return (
            <div key={silo}>
              <h2 className="text-[0.75rem] font-[650] tracking-[0.07em] text-[var(--on-accent-strong)] uppercase">
                {siloLabels[silo]}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[var(--on-accent)]">
                {items.map((route) => (
                  <li key={route.path}>
                    <Link
                      href={route.path}
                      className="transition-colors hover:text-[var(--on-accent-strong)]"
                    >
                      {route.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-10 text-sm text-[var(--on-accent)]">
        © {"2026"} Banknote Expert. Serial number checks run entirely in your browser.
      </div>
    </footer>
  );
}
