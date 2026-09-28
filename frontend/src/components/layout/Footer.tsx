import Link from "next/link";
import { site } from "@/config/site";

export default function Footer() {
  const exploreLinks = [
    { label: "Work", href: "/portfolio" },
    { label: "Work with me", href: "/work-with-me" },
    { label: "Writing", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  return (
    <footer className="border-t border-[var(--hair)] bg-[var(--chrome)] backdrop-blur-[14px]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-14 pb-9">
        <div className="grid gap-9 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] items-start">
          {/* Brand */}
          <div className="flex flex-col gap-3.5 max-w-[300px]">
            <div className="flex items-center gap-3">
              <span className="w-[34px] h-[34px] rounded-[10px] bg-[var(--accent)] text-[var(--accent-contrast)] flex items-center justify-center font-serif font-extrabold text-[16px]">
                AO
              </span>
              <span className="font-semibold text-[15px] text-[var(--foreground)]">
                Ayoola Ogunrekun
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              AI systems engineer building production AI that real teams can
              rely on.
            </p>
            <div className="flex items-center gap-5 text-sm text-[var(--muted)] font-medium pt-1">
              <Link
                href="/feed.xml"
                className="hover:text-[var(--accent)] transition-colors"
              >
                RSS
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] mb-1">
              Explore
            </span>
            {exploreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="navlink self-start"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3.5 mt-11 pt-6 border-t border-[var(--hair)]">
          <span className="font-mono text-[12.5px] text-[var(--muted)]">
            © {new Date().getFullYear()} Ayoola Ogunrekun
          </span>
          <span className="font-mono text-[12.5px] text-[var(--muted)]">
            {site.location}
          </span>
        </div>
      </div>
    </footer>
  );
}
