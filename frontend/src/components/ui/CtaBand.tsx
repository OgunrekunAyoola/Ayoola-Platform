import { ReactNode } from "react";
import BookCallButton from "@/components/ui/BookCallButton";

interface CtaBandProps {
  title: string;
  body?: string;
  /** Heading level; defaults to h2. */
  as?: "h2" | "h3";
  /** Defaults to a "Book a call" button. */
  action?: ReactNode;
  className?: string;
}

/** Accent-tinted glass band used to close a page or section with one clear next step. */
export default function CtaBand({
  title,
  body,
  as: Heading = "h2",
  action = <BookCallButton />,
  className = "",
}: CtaBandProps) {
  return (
    <div
      className={`glass rounded-[18px] p-7 sm:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-6 ${className}`}
      style={{
        background: "linear-gradient(150deg, var(--accent-soft), var(--card-bg))",
      }}
    >
      <div className="max-w-[620px]">
        <Heading className="font-serif font-bold text-[clamp(24px,2.8vw,32px)] leading-[1.2] tracking-tight text-[var(--foreground)] mb-2">
          {title}
        </Heading>
        {body && (
          <p className="text-[15.5px] text-[var(--muted)] leading-[1.6]">{body}</p>
        )}
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}
