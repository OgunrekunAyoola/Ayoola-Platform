import { ReactNode } from "react";
import Rich from "@/components/ui/Rich";

interface SectionHeadingProps {
  eyebrow: string;
  /** Content copy; `*phrase*` renders green. */
  title: string;
  /** Short paragraph or action (e.g. "All work →") aligned to the right on wide screens. */
  aside?: ReactNode;
  className?: string;
  titleClassName?: string;
}

/** Mono eyebrow over a Syne section title, with an optional right-hand aside. */
export default function SectionHeading({
  eyebrow,
  title,
  aside,
  className = "mb-[clamp(24px,3vw,40px)]",
  titleClassName = "",
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-5 ${className}`}>
      <div>
        <div className="eyebrow mb-[18px]">{eyebrow}</div>
        <h2 className={`h-section ${titleClassName}`}>
          <Rich text={title} />
        </h2>
      </div>
      {aside}
    </div>
  );
}
