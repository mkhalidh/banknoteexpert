import Link from "next/link";
import { routes, type PageType } from "@/config/routes";

const TOOL_TYPES: PageType[] = ["silo-hub", "tool", "guide", "value", "lookup"];

/**
 * Card grid linking every tool/guide page on the site, read from the route
 * registry. No URL is hardcoded. Server Component.
 */
export function AllToolsGrid() {
  const items = routes.filter(
    (route) => route.path !== "/" && TOOL_TYPES.includes(route.pageType),
  );

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((route) => (
        <li
          key={route.path}
          className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <Link
            href={route.path}
            className="text-base font-semibold text-indigo-700 hover:underline dark:text-indigo-400"
          >
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
