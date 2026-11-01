import Link from "next/link";
import { routes, type PageType } from "@/config/routes";

const TOOL_TYPES: PageType[] = ["silo-hub", "tool", "guide", "value", "lookup"];
const FEATURED_TOOL_PATHS = [
  "/fancy-serial-numbers/",
  "/star-note-lookup/",
  "/2-dollar-bill-serial-number-lookup/",
];
const items = routes.filter(
  (route) => route.path !== "/" && TOOL_TYPES.includes(route.pageType),
);
const featuredItems = FEATURED_TOOL_PATHS.map((path) =>
  items.find((route) => route.path === path),
).filter((route): route is (typeof items)[number] => Boolean(route));
const featuredPaths = new Set(featuredItems.map((route) => route.path));
const remainingItems = items.filter((route) => !featuredPaths.has(route.path));

function ToolCards({ routes: toolRoutes }: { routes: typeof items }) {
  return (
    <ul className="all-tools-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {toolRoutes.map((route) => (
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
  );
}

/**
 * Card grid linking every tool/guide page on the site, read from the route
 * registry. No URL is hardcoded. Server Component.
 */
export function AllToolsGrid() {
  return (
    <div className="content-directory">
      <ToolCards routes={featuredItems} />
      <details className="content-disclosure">
        <summary>Browse all banknote tools and guides</summary>
        <div className="content-disclosure-body">
          <ToolCards routes={remainingItems} />
        </div>
      </details>
    </div>
  );
}
