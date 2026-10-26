"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Rich from "@/components/ui/Rich";
import LagosClock from "@/components/motion/LagosClock";
import { bookingHref, bookingLinkProps } from "@/config/site";
import type { SiteContent } from "@/lib/site-content";

interface HeaderProps {
  site: Pick<SiteContent, "name" | "headerTag" | "nav" | "availability" | "menuCard">;
  email: string;
  githubUrl: string;
}

const EASE = "cubic-bezier(.2,.8,.2,1)";

export default function Header({ site, email, githubUrl }: HeaderProps) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  // The menu belongs to the page it was opened on, so a route change closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const [menuTop, setMenuTop] = useState(73);
  const open = openOn !== null && openOn === pathname;

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  const toggle = () => {
    const bottom = headerRef.current?.getBoundingClientRect().bottom;
    if (bottom !== undefined) setMenuTop(Math.max(0, Math.round(bottom)));
    setOpenOn(open ? null : pathname);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    const desktop = window.matchMedia("(min-width: 900px)");
    const onDesktop = () => desktop.matches && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-30 border-b border-[var(--hair)] bg-[var(--chrome)] backdrop-blur-[18px] backdrop-saturate-[1.6]"
      >
        <div className="wrap py-3 min-h-[72px] flex items-center justify-between gap-4">
          <Link href="/" className="flex items-baseline gap-2 min-w-0 text-[var(--foreground)] no-underline">
            <span className="display text-[21px] leading-none whitespace-nowrap">{site.name}</span>
            <span className="display font-medium text-[14px] text-[var(--accent)] whitespace-nowrap">
              {site.headerTag}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden min-[900px]:flex items-center gap-[clamp(18px,2.2vw,34px)]">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[15.5px] whitespace-nowrap no-underline py-1 border-b-[1.5px] transition-colors duration-200 hover:text-[var(--accent)] ${
                    active
                      ? "text-[var(--accent)] border-[var(--accent)]"
                      : "text-[var(--foreground)] border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href={bookingHref}
            {...bookingLinkProps}
            className="btn btn-ink hidden min-[900px]:inline-flex h-[46px] px-[22px] text-[15.5px]"
          >
            <span aria-hidden="true" className="w-[7px] h-[7px] rounded-full bg-[var(--accent-dot)]" />
            Book a call
          </Link>

          <button
            type="button"
            onClick={toggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`min-[900px]:hidden relative w-12 h-12 flex-none rounded-full border border-[var(--hair-strong)] cursor-pointer transition-colors duration-300 ${
              open ? "bg-[var(--foreground)]" : "bg-transparent"
            }`}
          >
            {[open ? "rotate(45deg)" : "translateY(-4px)", open ? "rotate(-45deg)" : "translateY(4px)"].map(
              (transform, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`absolute left-[14px] right-[14px] top-[23px] h-[1.5px] ${
                    open ? "bg-[var(--background)]" : "bg-[var(--foreground)]"
                  }`}
                  style={{ transform, transition: `transform .4s ${EASE}, background-color .3s` }}
                />
              ),
            )}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        className="min-[900px]:hidden fixed inset-x-0 bottom-0 z-[25] overflow-auto flex flex-col px-[22px] pt-2 pb-6 bg-[var(--background)]"
        style={{
          top: menuTop,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .3s ease",
        }}
      >
        <nav aria-label="Main" className="flex flex-col">
          {site.nav.map((item, i) => {
            const active = isActive(item.href);
            const delay = open ? `${(0.06 + i * 0.05).toFixed(2)}s` : "0s";
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="grid [grid-template-columns:34px_minmax(0,1fr)_auto] items-center gap-3 py-[18px] border-b border-[var(--hair)] no-underline text-[var(--foreground)]"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(18px)",
                  transition: `opacity .45s ease ${delay}, transform .6s ${EASE} ${delay}`,
                }}
              >
                <span className={`font-mono text-[11px] ${active ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-1 min-w-0">
                  <span
                    className={`display text-[31px] leading-[1.05] ${active ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}
                  >
                    {item.label}
                  </span>
                  <span className="text-[14px] text-[var(--muted)]">{item.desc}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`arrow text-[18px] ${active ? "text-[var(--accent)]" : "text-[var(--placeholder)]"}`}
                >
                  →
                </span>
              </Link>
            );
          })}
        </nav>

        <div
          className="mt-[22px] rounded-[24px] p-6 flex flex-col gap-[14px] bg-[var(--accent)] text-[var(--on-accent)]"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(18px)",
            transition: `opacity .45s ease ${open ? ".32s" : "0s"}, transform .6s ${EASE} ${open ? ".32s" : "0s"}`,
          }}
        >
          <span className="flex items-center gap-[10px] text-[14px] text-[var(--on-accent-soft)]">
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[var(--on-accent-soft)]" />
            {site.availability}
          </span>
          <span className="display text-[25px] leading-[1.1] [&_em]:not-italic [&_em]:text-inherit">
            <Rich text={site.menuCard.title} />
          </span>
          <div className={`grid gap-[10px] ${email ? "grid-cols-2" : "grid-cols-1"}`}>
            <Link
              href={bookingHref}
              {...bookingLinkProps}
              className="btn btn-paper h-[50px] text-[16px] font-medium"
            >
              Book a call
            </Link>
            {email && (
              <a href={`mailto:${email}`} className="btn btn-paper-outline h-[50px] text-[16px]">
                Email me
              </a>
            )}
          </div>
        </div>

        <div className="mt-auto pt-[22px] flex justify-between items-center gap-3 font-mono text-[12px] text-[var(--muted)]">
          <LagosClock />
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] flex items-center text-[var(--foreground)] no-underline"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </>
  );
}
