import Link from "next/link";
import { getSite } from "@/lib/site-content";

export default function Footer() {
  const site = getSite();
  const [first, ...rest] = site.name.split(" ");

  return (
    <footer className="border-t border-[var(--hair)] bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 sm:pt-[72px] pb-9">
        <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))] items-start">
          <div className="flex flex-col gap-4 max-w-[380px]">
            <span className="serif-em font-serif font-semibold text-[30px] sm:text-[34px] tracking-[-0.02em] leading-[1.1]">
              {first} <em>{rest.join(" ")}</em>
            </span>
            <p className="text-[16px] leading-[1.6] text-[var(--muted)]">
              {site.footer.blurb}
            </p>
            <Link href="/feed.xml" className="lk self-start text-[15px]">
              RSS
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[12px] tracking-[0.1em] uppercase text-[var(--muted)] mb-1">
              Explore
            </span>
            {site.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="self-start text-[16px] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3.5 mt-14 pt-6 border-t border-[var(--hair)] font-mono text-[12.5px] text-[var(--muted)]">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>{site.location}</span>
        </div>
      </div>
    </footer>
  );
}
