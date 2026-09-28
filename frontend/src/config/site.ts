export const site = {
  name: "Ayoola Ogunrekun",
  jobTitle: "AI Systems Engineer",
  tagline: "AI systems engineer",
  description:
    "Ayoola Ogunrekun is an AI systems engineer who designs, builds and runs production AI on AWS: multi-agent systems, LLM pipelines and the infrastructure underneath.",
  location: "Lagos, Nigeria · working with teams worldwide",
  timezone: "Lagos, Nigeria · WAT (UTC+1)",

  // Ink announcement bar above the header. Set to null to hide it.
  banner: {
    text: "Open to full-time remote AI engineering roles",
    detail: "Lagos → remote worldwide",
    cta: { label: "Work with me", href: "/work-with-me" },
  } as { text: string; detail: string; cta: { label: string; href: string } } | null,

  // TODO: replace with a real, deliverable inbox before launch.
  email: "TODO_REPLACE_EMAIL@example.com",
  // TODO: add a booking link (Calendly/Cal.com). "Book a call" falls back to /contact while empty.
  bookingUrl: "",
  // TODO: drop the CV at frontend/public/ayoola-ogunrekun-cv.pdf.
  cvPath: "/ayoola-ogunrekun-cv.pdf",
  githubUrl: "https://github.com/OgunrekunAyoola",
  // TODO: add your real LinkedIn profile URL.
  linkedinUrl: "",

  // TODO: set starting prices (number only, rendered as "From $…").
  reviewPriceFrom: "TODO",
  buildPriceFrom: "TODO",

  // TODO: fill in dates for each role.
  experience: [
    {
      role: "AI Engineer",
      org: "Digital agency · agentic month-end-close platform for an accounting firm",
      dates: "TODO",
    },
    {
      role: "Software Engineer, Contract (sole engineer)",
      org: "Software agency · client products",
      dates: "TODO",
    },
    {
      role: "Founder & Engineer",
      org: "WhatsApp vendor platform (independent B2B SaaS)",
      dates: "TODO",
    },
  ],

  stack: [
    "AWS",
    "Bedrock AgentCore",
    "LangGraph",
    "Lambda",
    "TypeScript",
    "Python",
    "Next.js",
  ],
} as const;

/** Booking link if configured, otherwise the contact page. */
export const bookingHref = site.bookingUrl || "/contact";

/** Extra props so an external booking link opens in a new tab. */
export const bookingLinkProps = /^https?:\/\//.test(bookingHref)
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {};
