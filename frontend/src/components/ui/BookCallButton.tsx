import Link from "next/link";
import { bookingHref, bookingLinkProps } from "@/config/site";

interface BookCallButtonProps {
  label?: string;
  className?: string;
}

export default function BookCallButton({
  label = "Book a call",
  className = "btn btn-ink h-14 px-7 text-[17px]",
}: BookCallButtonProps) {
  return (
    <Link href={bookingHref} {...bookingLinkProps} className={className}>
      {label} <span aria-hidden="true">→</span>
    </Link>
  );
}
