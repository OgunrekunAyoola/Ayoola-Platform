import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  /** May contain <em> for the italic green emphasis. */
  title: ReactNode;
  /** Optional action (e.g. "All writing") aligned right on wider screens. */
  action?: ReactNode;
  className?: string;
  /** Tailwind max-width for the heading, e.g. "max-w-[16ch]". */
  titleClassName?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  action,
  className = "mb-10 sm:mb-14",
  titleClassName = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-x-5 gap-y-5 ${className}`}
    >
      <div>
        <div className="eyebrow mb-[18px]">{eyebrow}</div>
        <h2 className={`text-[clamp(34px,4.4vw,60px)] leading-[1.06] tracking-[-0.02em] ${titleClassName}`}>
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
