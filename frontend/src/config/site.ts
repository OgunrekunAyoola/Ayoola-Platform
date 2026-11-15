/**
 * Settings: contact details and links. Page copy (name, role, descriptions,
 * banner, experience, services) lives in content/site/*.yaml.
 */
export const site = {
  // Main inbox: contact page, footer and mobile menu "Email me", and the form's fallback.
  email: "oreofeogunrekun@gmail.com",
  // PLACEHOLDER (open item): add a booking link (e.g. Cal.com). Until then every
  // "Book a call" (header, footer, closing rows, contact page) opens /contact.
  bookingUrl: "",
  githubUrl: "https://github.com/OgunrekunAyoola",
  linkedinUrl: "https://www.linkedin.com/in/ayoolaogunrekun",
} as const;

/** Booking link if configured, otherwise the contact page. */
export const bookingHref = site.bookingUrl || "/contact";

/** Extra props so an external booking link opens in a new tab. */
export const bookingLinkProps = /^https?:\/\//.test(bookingHref)
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {};
