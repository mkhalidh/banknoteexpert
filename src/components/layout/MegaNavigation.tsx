"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { MenuIcon, XIcon } from "@/components/ui/icons";
import type { navigation } from "@/config/navigation";

export function MegaNavigation({ items }: { items: typeof navigation }) {
  const pathname = usePathname() ?? "/";
  const currentPath = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
  const activeIndex = currentPath === "/tools/" ? -1 : currentPath.includes("2-dollar") ? 2 : currentPath === "/star-note-lookup/" ? 1 : currentPath === "/" || currentPath.startsWith("/fancy-serial") || currentPath === "/where-is-the-serial-number-on-a-dollar-bill/" ? 0 : 3;
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const mobileToggle = useRef<HTMLButtonElement | null>(null);
  const toggles = useRef<(HTMLButtonElement | null)[]>([]);
  const close = () => { setOpen(null); setMobile(false); };
  return <div className="mega-navigation" onMouseLeave={() => setOpen(null)} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  }} onKeyDown={event => {
    if (event.key === "Escape") { if (mobile) mobileToggle.current?.focus(); else if (open !== null) toggles.current[open]?.focus(); setOpen(null); setMobile(false); }
  }}>
    <button ref={mobileToggle} type="button" className="mega-mobile-toggle" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} aria-controls="primary-navigation" onClick={() => setMobile(!mobile)}>{mobile ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}</button>
    <nav id="primary-navigation" aria-label="Primary" className={mobile ? "mega-primary is-mobile-open" : "mega-primary"}>
      <Link className="mega-tools-link" aria-current={currentPath === "/tools/" ? "page" : undefined} href="/tools/" onClick={close}>Tools</Link>
      <ul className="mega-top-list">{items.map((item,index) => <li key={item.label} onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setOpen(index); }}>
        <div className={`mega-trigger-row${activeIndex === index ? " is-active" : ""}`}><Link className="site-nav-link" aria-current={currentPath === item.path ? "page" : activeIndex === index ? "location" : undefined} href={item.path} onClick={close}>{item.label}</Link><button ref={node => { toggles.current[index] = node; }} type="button" className="mega-toggle" aria-label={`Explore ${item.label}`} aria-expanded={open === index} aria-controls={`mega-panel-${index}`} onClick={() => setOpen(open === index ? null : index)}><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></button></div>
        <div id={`mega-panel-${index}`} className="mega-panel" hidden={open !== index}><div className="mega-panel-inner">
          <Link href={item.path} className="mega-panel-title" onClick={close}>{item.label}</Link>
          <div className="mega-columns">{item.columns.map(column => <section key={column.label}><p className="mega-column-label"><a href={column.path} onClick={close}>{column.label}</a></p><ul aria-label={column.label}>{column.links.map(link => <li key={link.path}><Link aria-current={currentPath === link.path ? "page" : undefined} href={link.path} onClick={close}>{link.label}</Link></li>)}</ul></section>)}</div>
          <button type="button" aria-label="Close submenu" className="mega-close" onClick={() => {setOpen(null);toggles.current[index]?.focus();}}><XIcon className="h-5 w-5" /></button>
        </div></div>
      </li>)}</ul>
    </nav>
  </div>;
}
