"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { MenuIcon, XIcon } from "@/components/ui/icons";

interface NavItem {
  path: string;
  label: string;
  title: string;
  icon: ReactNode;
}

/**
 * Hamburger toggle + dropdown panel for the header, shown only below the md
 * breakpoint where Header's own horizontal nav is hidden. Kept as a small
 * client island so Header itself can stay a server component.
 */
export function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--on-accent-strong)]"
      >
        {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>
      {open ? (
        <nav aria-label="Primary" className="absolute inset-x-0 top-full bg-[var(--accent)] px-4 pb-3">
          <ul className="flex flex-col gap-1 border-t border-[var(--on-accent)]/20 pt-2 text-sm">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  title={item.title}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-2.5 font-medium text-[var(--on-accent)] transition-colors hover:text-[var(--on-accent-strong)]"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
