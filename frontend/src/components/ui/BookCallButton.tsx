import PrimaryCta from "@/components/ui/PrimaryCta";
import { bookingHref, bookingLabel, bookingLinkProps } from "@/config/site";

interface BookCallButtonProps {
  /** Overrides the label, e.g. "Book a 30-minute call" (only shown with a booking link). */
  label?: string;
  className?: string;
}

/**
 * The booking call to action in the primary style. Reads "Get in touch" and
 * opens /contact until a booking link is configured (see bookingCta).
 */
export default function BookCallButton({ label = bookingLabel, className = "" }: BookCallButtonProps) {
  return <PrimaryCta href={bookingHref} label={label} className={className} linkProps={bookingLinkProps} />;
}
