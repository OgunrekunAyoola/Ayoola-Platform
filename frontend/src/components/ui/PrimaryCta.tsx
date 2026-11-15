import Link from "next/link";

interface PrimaryCtaProps {
  href: string;
  label: string;
  /** Layout only (margins, width). The look is fixed: one primary style site-wide. */
  className?: string;
  /** e.g. target/rel for an external booking link. */
  linkProps?: { target?: string; rel?: string };
}

/** The site's one primary call-to-action: ink pill, label, Syne arrow. */
export default function PrimaryCta({ href, label, className = "", linkProps = {} }: PrimaryCtaProps) {
  return (
    <Link href={href} {...linkProps} className={`btn btn-ink btn-cta ${className}`}>
      {label}
      <span aria-hidden="true" className="arrow">
        →
      </span>
    </Link>
  );
}
