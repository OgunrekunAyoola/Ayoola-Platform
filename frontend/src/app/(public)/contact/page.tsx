import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import { site } from "@/config/site";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch about consulting, engineering, or speaking engagements.",
};

export default function Contact() {
  const socialLinks = [
    { href: site.socials.github, Icon: Github, label: "GitHub" },
    ...(site.socials.linkedin
      ? [{ href: site.socials.linkedin, Icon: Linkedin, label: "LinkedIn" }]
      : []),
  ];

  return (
    <section className="max-w-[980px] mx-auto px-5 sm:px-7 pt-20 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Info */}
        <div>
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-3.5">
            Contact
          </div>
          <h1 className="font-serif font-extrabold tracking-tight leading-[1.05] text-[clamp(34px,4.6vw,52px)] text-[var(--foreground)] mb-5">
            Let&apos;s build something durable.
          </h1>
          <p className="text-[18px] text-[var(--muted)] leading-[1.65] mb-7">
            Tell me about the system you&apos;re trying to ship. I read every
            message and reply within two business days.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 text-[var(--foreground)] text-[15.5px] hover:text-[var(--accent)] transition-colors"
            >
              <span className="w-10 h-10 rounded-[11px] bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center shrink-0">
                <Mail className="w-[18px] h-[18px]" />
              </span>
              {site.email}
            </a>
            <div className="flex items-center gap-3 text-[var(--muted)] text-[15.5px]">
              <span className="w-10 h-10 rounded-[11px] bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center shrink-0">
                <MapPin className="w-[18px] h-[18px]" />
              </span>
              {site.location}
            </div>
            <div className="flex gap-2.5 mt-2">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-[11px] border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] flex items-center justify-center transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="glass rounded-[18px] p-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
