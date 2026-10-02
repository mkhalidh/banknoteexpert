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
    <footer className="site-footer mt-24">
      <div className="site-footer-inner mx-auto grid grid-cols-2 gap-x-8 gap-y-10 py-14 sm:grid-cols-4">
        {FOOTER_SILOS.map((silo) => {
          const items = getRoutesBySilo(silo).filter(
            (route) => route.pageType !== "home",
          );
          if (items.length === 0) {
            return null;
          }
          return (
            <div key={silo}>
              <p className="footer-column-label text-[0.75rem] font-[650] tracking-[0.07em] text-[var(--on-accent-strong)] uppercase">
                {siloLabels[silo]}
              </p>
              <ul aria-label={siloLabels[silo]} className="mt-4 space-y-2.5 text-sm text-[var(--on-accent)]">
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
      <div className="site-footer-bottom mx-auto pb-10 text-sm text-[var(--on-accent)]">
        © {"2026"} Banknote Expert. Serial number checks run entirely in your browser.
      </div>
    </footer>
  );
}
