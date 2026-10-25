import { ReactNode } from "react";
import BookCallButton from "@/components/ui/BookCallButton";

interface CtaBandProps {
  /** May contain <em> for the italic emphasis. */
  title: ReactNode;
  body?: string;
  /** "ink": navy band with a white pill; "green": tinted band with an ink pill. */
  tone?: "ink" | "green";
  as?: "h2" | "h3";
  action?: ReactNode;
  className?: string;
}

/** Closing band with one clear next step. */
export default function CtaBand({
  title,
  body,
  tone = "ink",
  as: Heading = "h2",
  action,
  className = "",
}: CtaBandProps) {
  const ink = tone === "ink";

  return (
    <div
      className={`rounded-[32px] flex flex-wrap justify-between ${
        ink
          ? "on-inverse bg-[var(--inverse)] text-[var(--inverse-fg)] items-end gap-9 p-[clamp(32px,6vw,80px)]"
          : "bg-[var(--tint-green)] text-[var(--foreground)] items-center gap-7 p-[clamp(32px,5vw,64px)]"
      } ${className}`}
    >
      <div className={ink ? "max-w-[720px]" : "max-w-[620px]"}>
        <Heading
          className={`leading-[1.08] tracking-[-0.02em] ${ink ? "text-balance" : ""} ${
            ink ? "text-[clamp(32px,4.2vw,56px)]" : "text-[clamp(28px,3.4vw,44px)]"
          } ${body ? "mb-4 sm:mb-5" : ""}`}
        >
          {title}
        </Heading>
        {body && (
          <p
            className={`leading-[1.6] ${
              ink
                ? "text-[17px] sm:text-[18px] max-w-[56ch] text-[var(--inverse-muted)]"
                : "text-[17px] text-[var(--body)]"
            }`}
          >
            {body}
          </p>
        )}
      </div>
      {action ?? (
        <BookCallButton className={`btn btn-lg ${ink ? "btn-inverse" : "btn-primary"}`} />
      )}
    </div>
  );
}
