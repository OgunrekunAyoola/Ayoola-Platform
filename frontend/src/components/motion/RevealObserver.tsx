"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal], main h2, main figure";

/**
 * Unclips each reveal target the first time 8% of it is inside the viewport.
 * Re-scans on every route change and whenever new targets are added (e.g. the
 * contact form's "sent" panel), so nothing is left hidden.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    (window as Window & { __revealReady?: boolean }).__revealReady = true;
    if (!document.documentElement.classList.contains("reveal")) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.shown = "";
          io.unobserve(el);
          // Unclip finished (or, if transitionend never fires, after it would have).
          const settle = () => {
            el.dataset.settled = "";
            el.removeEventListener("transitionend", onEnd);
          };
          const onEnd = (e: TransitionEvent) => {
            if (e.target === el && e.propertyName === "clip-path") settle();
          };
          el.addEventListener("transitionend", onEnd);
          window.setTimeout(settle, 1300);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!("shown" in el.dataset)) io.observe(el);
      });
    };
    const frame = window.requestAnimationFrame(scan);
    const mo = new MutationObserver(scan);
    const main = document.querySelector("main");
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
