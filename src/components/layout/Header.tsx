import Link from "next/link";
import { getRoute } from "@/config/routes";

/**
 * Primary tool navigation. Links are pulled from the route registry so no URL
 * is hardcoded. Server Component — no interactivity.
 */
const NAV_PATHS = [
  "/fancy-serial-numbers/",
  "/fancy-serial-number-value/",
  "/star-note-lookup/",
  "/2-dollar-bill-value/",
  "/methodology/",
] as const;

export function Header() {
  const home = getRoute("/");
  const navItems = NAV_PATHS.map((path) => getRoute(path));

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight" title={home.title}>
          Banknote Expert
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-4 text-sm">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className="hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
