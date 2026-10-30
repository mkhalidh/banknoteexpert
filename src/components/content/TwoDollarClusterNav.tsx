import Link from "next/link";
import { getRoute } from "@/config/routes";

/**
 * Visible cluster navigation for the $2 bill value silo. Lists every built
 * cluster page and links to all of them except the current one, so each page
 * links up to the parent and across to its siblings (no orphans).
 *
 * As later batches add year children (/2-dollar-bill-value/1928/ etc.), add
 * their paths here; the nav renders only routes that exist in the registry.
 */
const CLUSTER_PATHS = [
  "/2-dollar-bill-value/",
  "/2-dollar-bill-value/star-notes/",
  "/2-dollar-bill-value/1976-postage-stamp/",
  "/1976-2-dollar-bill-value/",
  "/2-dollar-bill-serial-number-lookup/",
];

export function TwoDollarClusterNav({ currentPath }: { currentPath: string }) {
  const links = CLUSTER_PATHS.filter((path) => path !== currentPath).map((path) => getRoute(path));

  return (
    <nav aria-label="More $2 bill guides" className="card p-5">
      <h2 className="text-h3">More $2 bill guides</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {links.map((route) => (
          <li key={route.path}>
            <Link
              href={route.path}
              data-navigation-link="true"
              className="link-accent font-medium"
            >
              {route.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
