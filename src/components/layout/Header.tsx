import Link from "next/link";
import { getRoute } from "@/config/routes";
import { SparkleIcon, TagIcon, StarIcon, NoteIcon, DocumentIcon, SealIcon } from "@/components/ui/icons";
import { MobileNav } from "@/components/layout/MobileNav";
import type { ComponentType, SVGProps } from "react";

/**
 * Primary tool navigation. Routing comes from the route registry so no URL is
 * hardcoded, but the label is a short nav-specific one — the registry's
 * `title` is a full SEO page title (e.g. "Fancy Serial Numbers on US
 * Banknotes"), which is too long for a horizontal bar. Server Component — no
 * interactivity.
 */
const NAV_ITEMS: { path: string; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { path: "/hub/", label: "Hub", icon: DocumentIcon },
  { path: "/fancy-serial-numbers/", label: "Fancy Serial Numbers", icon: SparkleIcon },
  { path: "/fancy-serial-number-value/", label: "Value Guide", icon: TagIcon },
  { path: "/star-note-lookup/", label: "Star Notes Lookup", icon: StarIcon },
  { path: "/2-dollar-bill-value/", label: "$2 Bills", icon: NoteIcon },
  { path: "/methodology/", label: "Methodology", icon: DocumentIcon },
];

export function Header() {
  const home = getRoute("/");
  const navItems = NAV_ITEMS.map(({ path, label, icon }) => ({
    path,
    label,
    icon,
    title: getRoute(path).title,
  }));

  return (
    <header className="sticky top-0 z-40 bg-[var(--accent)]">
      <div className="relative mx-auto flex max-w-5xl items-center gap-6 px-4 py-3.5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-[1.05rem] font-semibold tracking-tight text-[var(--on-accent-strong)]"
          title={home.title}
        >
          <SealIcon className="h-6 w-6 shrink-0" />
          Banknote Expert
        </Link>
        <nav aria-label="Primary" className="hidden min-w-0 flex-1 md:block">
          <ul className="scroll-fade-x flex items-center gap-1 overflow-x-auto text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => (
              <li key={item.path} className="shrink-0">
                <Link
                  href={item.path}
                  title={item.title}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 font-medium text-[var(--on-accent)] transition-colors hover:text-[var(--on-accent-strong)]"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto md:hidden">
          <MobileNav
            navItems={navItems.map(({ path, label, title, icon: NavIcon }) => ({
              path,
              label,
              title,
              // Pre-rendered here, not passed as a component reference:
              // MobileNav is a Client Component, and a bare function
              // (a component isn't "use server") can't cross that boundary
              // as a prop — a rendered element can.
              icon: <NavIcon className="h-4 w-4 shrink-0" />,
            }))}
          />
        </div>
      </div>
    </header>
  );
}
