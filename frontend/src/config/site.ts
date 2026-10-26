/**
 * Settings: contact details and links. Page copy (name, role, descriptions,
 * banner, experience, offers) lives in content/site/*.yaml.
 */
export const site = {
  // Main inbox: contact page, footer and mobile menu "Email me", and the form's fallback.
  email: "oreofeogunrekun@gmail.com",
  // TODO: add a booking link (Calendly/Cal.com). "Book a call" falls back to /contact while empty.
  bookingUrl: "",
  // TODO: drop the CV at frontend/public/ayoola-ogunrekun-cv.pdf. Download buttons hide until it exists.
  cvPath: "/ayoola-ogunrekun-cv.pdf",
  githubUrl: "https://github.com/OgunrekunAyoola",
  linkedinUrl: "https://www.linkedin.com/in/ayoolaogunrekun",
} as const;

/** Booking link if configured, otherwise the contact page. */
export const bookingHref = site.bookingUrl || "/contact";

/** Extra props so an external booking link opens in a new tab. */
export const bookingLinkProps = /^https?:\/\//.test(bookingHref)
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {};
