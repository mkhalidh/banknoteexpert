"use client";

import { useEffect, useRef, useState } from "react";
import "@waline/client/style";
import "./comments-theme.css";

const SERVER_URL = "/api";

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

    import("@waline/client").then(({ init }) => {
      if (cancelled || !mountRef.current) return;
      instance = init({
        el: mountRef.current,
        serverURL: SERVER_URL,
        path,
        meta: ["nick", "mail", "link"],
        requiredMeta: ["nick"],
        imageUploader: false,
      }) as unknown as WalineInstance;
    });

    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, [shouldLoad, path]);

  return (
    <section aria-label="Comments" id="comments" className="scroll-mt-24">
      <h2 className="text-h2">Comments</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Have a serial number you want a second opinion on? Ask below, no account needed.
      </p>
      <div ref={containerRef} className="card mt-4 min-h-[14rem] p-5">
        {shouldLoad ? (
          <div ref={mountRef} className="waline-container" />
        ) : (
          <p className="text-sm text-zinc-500">Comments load when you scroll here.</p>
        )}
      </div>
    </section>
  );
}
