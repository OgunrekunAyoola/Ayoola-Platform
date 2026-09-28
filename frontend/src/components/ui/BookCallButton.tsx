import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bookingHref, bookingLinkProps } from "@/config/site";

interface BookCallButtonProps {
  label?: string;
  className?: string;
}

export default function BookCallButton({
  label = "Book a call",
  className = "btn btn-primary",
}: BookCallButtonProps) {
  return (
    <Link href={bookingHref} {...bookingLinkProps} className={className}>
      {label}
      <ArrowRight className="w-[17px] h-[17px]" />
    </Link>
  );
}
