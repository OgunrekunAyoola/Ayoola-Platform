/**
 * Settings: contact details and links. Page copy (name, role, descriptions,
 * banner, story, services) lives in content/site/*.yaml.
 */
export const site = {
  // Main inbox: contact page, footer and mobile menu "Email me", and the form's fallback.
  email: "oreofeogunrekun@gmail.com",
  // PLACEHOLDER (open item): add a booking link (e.g. Cal.com). While empty,
  // every booking button reads "Get in touch" and opens /contact; once set,
  // they read "Book a call" and open the link.
  bookingUrl: "",
  githubUrl: "https://github.com/OgunrekunAyoola",
  linkedinUrl: "https://www.linkedin.com/in/ayoolaogunrekun",
} as const;

/**
 * The site-wide "book a call" button. A button must never promise a call and
 * open a form: with no booking link it says "Get in touch" and opens /contact;
 * with one it says "Book a call" and opens the link (in a new tab if external).
 */
export function bookingCta(url: string) {
  const external = /^https?:\/\//.test(url);
  return {
    href: url || "/contact",
    label: url ? "Book a call" : "Get in touch",
    linkProps: external ? { target: "_blank", rel: "noopener noreferrer" } : {},
  };
}

const booking = bookingCta(site.bookingUrl);

/** Booking link if configured, otherwise the contact page. */
export const bookingHref = booking.href;

/** "Book a call" with a booking link, "Get in touch" without one. */
export const bookingLabel = booking.label;

/** Extra props so an external booking link opens in a new tab. */
export const bookingLinkProps = booking.linkProps;
