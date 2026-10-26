"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type CurtainState = "idle" | "in" | "out";

// Timings from the design: the page swaps at 620ms, while the curtain fully
// covers the screen, and the curtain resets 650ms after it starts lifting.
const SWAP_MS = 620;
const LIFT_MS = 650;
// If the next page is slow to arrive, never leave the screen covered for long.
const SAFETY_MS = 4000;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Same-origin page links only: not new tabs, downloads, files, feeds or the API. */
function transitionTarget(e: MouseEvent): URL | null {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return null;
  }
  const a = (e.target as Element | null)?.closest?.("a");
  if (!a || !a.href || (a.target && a.target !== "_self") || a.hasAttribute("download")) {
    return null;
  }
  const url = new URL(a.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname.startsWith("/api") || /\.[a-z0-9]+$/i.test(url.pathname)) return null;
  // Same page (a hash or query change): no route change to cover, so let it through.
  if (url.pathname === window.location.pathname) return null;
  return url;
}

/**
 * Ink curtain between pages: rises over the screen, the route changes
 * underneath, then it lifts away. Disabled under reduced motion, where links
 * navigate normally.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<CurtainState>("idle");
  const pendingHash = useRef<string | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    let swap = 0;
    let safety = 0;
    const onClick = (e: MouseEvent) => {
      const url = transitionTarget(e);
      if (!url || reducedMotion()) return;
      // Capture phase on document runs before Next's <Link> handler, so we own this navigation.
      e.preventDefault();
      e.stopPropagation();
      if (busy.current) return;
      busy.current = true;
      pendingHash.current = url.hash;
      // Fetch the next page while the curtain rises, so it's ready at the swap.
      router.prefetch(url.pathname + url.search);
      setState("in");
      swap = window.setTimeout(() => {
        router.push(url.pathname + url.search + url.hash, { scroll: false });
      }, SWAP_MS);
      safety = window.setTimeout(() => {
        if (busy.current && pendingHash.current !== null) {
          pendingHash.current = null;
          setState("out");
          window.setTimeout(() => {
            setState("idle");
            busy.current = false;
          }, LIFT_MS);
        }
      }, SWAP_MS + SAFETY_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(swap);
      window.clearTimeout(safety);
    };
  }, [router]);

  // The new route has rendered under the curtain: jump to the top (or the
  // anchor) while it's covered, then lift.
  useEffect(() => {
    const hash = pendingHash.current;
    if (hash === null) return;
    pendingHash.current = null;
    const anchor = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (anchor) anchor.scrollIntoView({ behavior: "instant", block: "start" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const lift = window.requestAnimationFrame(() => setState("out"));
    const reset = window.setTimeout(() => {
      setState("idle");
      busy.current = false;
    }, LIFT_MS);
    return () => {
      window.cancelAnimationFrame(lift);
      window.clearTimeout(reset);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="curtain"
      data-state={state === "idle" ? undefined : state}
    />
  );
}
