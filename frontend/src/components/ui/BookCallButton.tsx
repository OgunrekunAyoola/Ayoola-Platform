import Link from "next/link";
import { bookingHref, bookingLinkProps } from "@/config/site";

interface BookCallButtonProps {
  label?: string;
  className?: string;
}

export default function BookCallButton({
  label = "Book a call",
  className = "btn btn-primary btn-lg",
}: BookCallButtonProps) {
  return (
    <Link href={bookingHref} {...bookingLinkProps} className={className}>
      {label} <span aria-hidden="true">→</span>
    </Link>
  );
}
