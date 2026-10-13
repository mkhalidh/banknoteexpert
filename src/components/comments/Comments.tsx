"use client";

import { useEffect, useRef, useState } from "react";
import "@waline/client/style";
import "./comments-theme.css";

interface WalineInstance {
  destroy: () => void;
}

/**
 * Guest Q&A comments (Waline), lazy-mounted only when scrolled into view so
 * the ~150KB client chunk and the widget's own network calls never touch
 * pages that don't render this component, and never delay first paint on
 * pages that do. A fixed-height placeholder holds the layout so there's no
 * shift when the real widget replaces it.
 */
export function Comments({ path }: { path?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !mountRef.current) return;
    let instance: WalineInstance | null = null;
    let cancelled = false;
    const mount = mountRef.current;
    const markUserLinks = () => {
      mount.querySelectorAll<HTMLAnchorElement>(".wl-content a, .wl-nick").forEach(link => {
        link.relList.add("ugc", "nofollow", "noopener", "noreferrer");
      });
    };
    const linksObserver = new MutationObserver(markUserLinks);
    linksObserver.observe(mount, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });

    import("@waline/client").then(({ init }) => {
      if (cancelled || !mountRef.current) return;
      instance = init({
        el: mountRef.current,
        // Must be a full absolute URL (protocol + host). @waline/client's own
        // config normalizer blindly prepends "https://" to anything that
        // doesn't already start with a scheme, so a relative path like "/api"
        // silently becomes the broken "https:///api", and an empty string
        // becomes just "https://" with no host at all, either one makes the
        // widget's own requests fail before they even leave the browser.
        // @waline/client's transport then appends its own "api/" segment on
        // top of this, so this is deliberately the bare origin, not ".../api".
        serverURL: window.location.origin,
        emoji: ["https://unpkg.com/@waline/emojis@1.1.0/weibo"],
        path,
        meta: ["nick", "mail", "link"],
        requiredMeta: ["nick"],
        imageUploader: false,
        // The widget's own in-place "Login" button builds its popup URL
        // without the "/api" prefix the rest of the widget correctly uses
        // (a bug in @waline/client itself, not something serverURL can fix),
        // so it 404s. Guest commenting needs no login anyway; moderation is
        // handled from the admin dashboard at /api/ui instead.
        login: "disable",
      }) as unknown as WalineInstance;
    });

    return () => {
      cancelled = true;
      linksObserver.disconnect();
      instance?.destroy();
    };
  }, [shouldLoad, path]);

  return (
    <section aria-label="Comments" id="comments" className="scroll-mt-24">
      <h2 className="text-h2">Comments</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Have a serial number you want a second opinion on? Ask below, no account needed.
      </p>
      <div ref={containerRef} className="card mt-4 min-h-[24rem] p-5">
        {shouldLoad ? (
          <div ref={mountRef} className="waline-container" />
        ) : (
          <p className="text-sm text-zinc-500">Comments load when you scroll here.</p>
        )}
      </div>
    </section>
  );
}
