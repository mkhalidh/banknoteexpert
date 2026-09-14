"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@/components/ui/icons";

type Theme = "light" | "dark";

/**
 * Light is the deliberate default (not the OS `prefers-color-scheme`) — dark
 * is only ever an explicit choice made here. Reads/writes `data-theme` on
 * <html>; the blocking script in layout.tsx applies a stored 'dark' value
 * before first paint so there's no flash. Starts from the DOM's current
 * attribute (set by that same script) so the icon is correct on first paint,
 * with no hydration mismatch since server and client agree it's absent by
 * default.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the attribute the blocking script may have already set
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="btn-secondary h-9 w-9 shrink-0 p-0 text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      {theme === "dark" ? (
        <SunIcon className="h-4 w-4 text-[var(--foreground)]" />
      ) : (
        <MoonIcon className="h-4 w-4 text-[var(--foreground)]" />
      )}
    </button>
  );
}
