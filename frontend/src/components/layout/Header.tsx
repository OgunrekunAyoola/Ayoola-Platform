"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { site, bookingHref, bookingLinkProps } from "@/config/site";

const NAV = [
  { label: "Work", href: "/portfolio" },
  { label: "Work with me", href: "/work-with-me" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  const close = () => setIsMobileMenuOpen(false);

  return (
    <>
      {site.banner && (
        <div className="on-inverse bg-[var(--inverse)] text-[var(--inverse-fg)] text-[14px] sm:text-[15px]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-7 py-[11px] sm:py-[13px] flex flex-wrap items-center justify-center gap-x-[18px] gap-y-1.5 text-center">
            <span aria-hidden="true" className="hidden sm:inline text-[var(--accent-bright)]">
              ✦
            </span>
            <span>{site.banner.text}</span>
            <span aria-hidden="true" className="hidden sm:inline w-px h-4 bg-white/40" />
            <span className="hidden sm:inline text-[var(--inverse-muted)]">
              {site.banner.detail}
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-[var(--accent-bright)]">
              ✦
            </span>
            <Link
              href={site.banner.cta.href}
              className="font-medium text-[var(--accent-bright)] hover:underline underline-offset-4"
            >
              {site.banner.cta.label} →
            </Link>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-[var(--hair)] bg-[var(--chrome)] backdrop-blur-[12px]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-7 h-16 md:h-[76px] flex items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-[var(--foreground)] min-w-0"
            onClick={close}
          >
            <span
              aria-hidden="true"
              className="w-[34px] h-[34px] shrink-0 rounded-full bg-[var(--btn)] text-[var(--btn-fg)] flex items-center justify-center font-serif italic text-[17px]"
            >
              a
            </span>
            <span className="font-serif font-semibold text-[19px] sm:text-[23px] tracking-[-0.01em] whitespace-nowrap">
              {site.name}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden md:flex items-center gap-[34px]">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive(item.href) ? "true" : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="navlink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <ThemeToggle />
            <Link
              href={bookingHref}
              {...bookingLinkProps}
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Book a call
            </Link>
            <button
              className="md:hidden w-11 h-11 rounded-full border-[1.5px] border-[var(--foreground)] text-[var(--foreground)] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Main"
            className="md:hidden absolute w-full left-0 border-t border-b border-[var(--hair)] bg-[var(--background)] shadow-[0_24px_40px_-24px_var(--shadow)]"
          >
            <ul className="flex flex-col px-5 py-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex items-center justify-between py-4 border-b border-[var(--hair)] font-serif text-[22px] ${
                      isActive(item.href) ? "text-[var(--accent)]" : "text-[var(--foreground)]"
                    }`}
                    onClick={close}
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-[var(--subtle)] text-base">
                      →
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-5 pb-2">
                <Link
                  href={bookingHref}
                  {...bookingLinkProps}
                  className="btn btn-primary w-full"
                  onClick={close}
                >
                  Book a call
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
