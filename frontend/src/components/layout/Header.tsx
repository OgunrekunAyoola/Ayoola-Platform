"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--hair)] bg-[var(--chrome)] backdrop-blur-[14px] transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-7 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="w-[38px] h-[38px] rounded-[11px] bg-[var(--accent)] text-[var(--accent-contrast)] flex items-center justify-center font-serif font-extrabold text-[18px] tracking-tight shadow-sm">
            AO
          </span>
          <span className="hidden sm:flex flex-col items-start leading-[1.15]">
            <span className="font-semibold text-[15.5px] text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              Ayoola Ogunrekun
            </span>
            <span className="font-mono text-[11px] text-[var(--muted)] tracking-[0.02em]">
              systems · writing · craft
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-[26px]">
          {navItems.map((item) => (
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

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/contact"
            className="btn btn-primary hidden sm:inline-flex !px-[18px] !py-2.5 !text-sm"
          >
            Start a project
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-10 h-10 rounded-[11px] border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md text-[var(--foreground)] flex items-center justify-center hover:border-[var(--accent)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden border-t border-[var(--hair)] bg-[var(--background)] absolute w-full left-0 shadow-xl"
        >
          <ul className="flex flex-col py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block px-6 py-3.5 text-base transition-colors ${
                    isActive(item.href)
                      ? "text-[var(--accent)] font-semibold bg-[var(--accent-soft)]"
                      : "text-[var(--muted)] hover:bg-[var(--card-bg)] hover:text-[var(--accent)]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="px-6 pt-3 pb-1">
              <Link
                href="/contact"
                className="btn btn-primary w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start a project
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
