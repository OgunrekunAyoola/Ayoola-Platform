import Rich from "@/components/ui/Rich";
import BookCallButton from "@/components/ui/BookCallButton";

interface ClosingRowProps {
  title: string;
  body?: string;
  className?: string;
}

/** Ink rule, a closing line and one clear next step ("Not sure which fits?"). */
export default function ClosingRow({ title, body, className = "" }: ClosingRowProps) {
  return (
    <div
      className={`border-t border-[var(--foreground)] pt-[clamp(28px,4vw,44px)] flex flex-wrap items-center justify-between gap-7 ${className}`}
    >
      <div className="max-w-[620px]">
        <h3 className={`text-[clamp(25px,2.81vw,39px)] leading-[1.08] m-0 ${body ? "mb-3" : ""}`}>
          <Rich text={title} />
        </h3>
        {body && <p className="text-[16.5px] leading-[1.6] text-[var(--body)] m-0">{body}</p>}
      </div>
      <BookCallButton label="Book a call" className="btn btn-ink h-14 px-[30px] text-[17px]" />
    </div>
  );
}
