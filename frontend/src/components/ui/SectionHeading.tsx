import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  /** Optional action (e.g. an "All work" link) aligned to the right on wider screens. */
  action?: ReactNode;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  action,
  className = "mb-[34px]",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-x-5 gap-y-3 ${className}`}
    >
      <div>
        <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-2.5">
          {eyebrow}
        </div>
        <h2 className="font-serif font-bold tracking-tight text-[clamp(28px,3.4vw,40px)] leading-[1.15] text-[var(--foreground)]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
