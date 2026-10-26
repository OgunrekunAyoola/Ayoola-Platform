import Link from "next/link";
import Rich from "@/components/ui/Rich";
import { getSite } from "@/lib/site-content";
import { site as settings, bookingHref, bookingLinkProps } from "@/config/site";

export default function Footer() {
  const site = getSite();
  const [first, ...rest] = site.name.split(" ");
  const elsewhere = [
    { label: "GitHub ↗", href: settings.githubUrl },
    ...(settings.linkedinUrl ? [{ label: "LinkedIn ↗", href: settings.linkedinUrl }] : []),
  ];

  return (
    <footer className="border-t border-[var(--foreground)] bg-[var(--background)] overflow-hidden">
      <div className="wrap pt-[clamp(56px,7vw,100px)] pb-8">
        <div className="flex flex-wrap items-end justify-between gap-8 pb-14 border-b border-[var(--hair)]">
          <h2 className="text-[clamp(30px,3.9vw,59px)] leading-[1.05] m-0 max-w-[20ch] text-balance">
            <Rich text={site.footer.cta} />
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href={bookingHref} {...bookingLinkProps} className="btn btn-green h-14 px-[30px] text-[16.5px]">
              Book a call →
            </Link>
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="btn btn-outline h-14 px-[30px] text-[16.5px]">
                Email me
              </a>
            )}
          </div>
        </div>

        <div className="grid gap-10 py-[52px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
          <div className="flex flex-col gap-3">
            <span className="label text-[11.5px] mb-1">Explore</span>
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="self-start text-[16px] no-underline text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="label text-[11.5px] mb-1">Elsewhere</span>
            {elsewhere.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start text-[16px] no-underline text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/feed.xml"
              className="self-start text-[16px] no-underline text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              RSS
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="label text-[11.5px] mb-1">Based in</span>
            <span className="text-[16px] leading-[1.6] text-[var(--body)]">
              {site.footer.basedIn.map((line, i) => (
                <span key={line} className="block">
                  {line}
                  {i < site.footer.basedIn.length - 1 && <span className="sr-only">. </span>}
                </span>
              ))}
            </span>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="display text-[clamp(36px,7.8vw,160px)] leading-[0.9] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(19,32,26,0.3)] mb-7 select-none"
        >
          {first}{" "}
          <span className="[-webkit-text-stroke:1px_rgba(30,107,74,0.45)]">{rest.join(" ")}</span>
        </div>

        <div className="flex flex-wrap justify-between gap-[14px] font-mono text-[12px] text-[var(--muted)]">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>{site.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
