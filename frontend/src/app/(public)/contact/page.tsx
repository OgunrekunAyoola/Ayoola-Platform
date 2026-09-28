import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import { site } from "@/config/site";
import BookCallButton from "@/components/ui/BookCallButton";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Tell me what you're building and where it's stuck. Book a 30-minute call or send a message.",
};

export default function Contact() {
  const socialLinks = [
    { href: site.githubUrl, Icon: Github, label: "GitHub" },
    ...(site.linkedinUrl
      ? [{ href: site.linkedinUrl, Icon: Linkedin, label: "LinkedIn" }]
      : []),
  ];

  return (
    <section className="max-w-[1060px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Info */}
        <div>
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-3.5">
            Contact
          </div>
          <h1 className="font-serif font-extrabold tracking-tight leading-[1.05] text-[clamp(34px,4.6vw,52px)] text-[var(--foreground)] mb-5">
            Let&apos;s talk about what you&apos;re building.
          </h1>
          <p className="text-[17px] sm:text-[18px] text-[var(--muted)] leading-[1.65] mb-7">
            Tell me what you&apos;re building and where it&apos;s stuck. I read
            every message and reply within two business days.
          </p>

          <BookCallButton
            label="Book a 30-minute call"
            className="btn btn-primary w-full sm:w-auto mb-9"
          />

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 text-[var(--foreground)] text-[15.5px] hover:text-[var(--accent)] transition-colors break-all"
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
              {site.timezone}
            </div>
            <div className="flex flex-wrap gap-2.5 mt-2">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-3.5 rounded-[11px] border border-[var(--card-border)] bg-[var(--card-bg)] text-[14px] font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon className="w-[17px] h-[17px]" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="glass rounded-[18px] p-6 sm:p-7">
          <h2 className="font-serif font-semibold text-[22px] tracking-tight text-[var(--foreground)] mb-5">
            Or send a message
          </h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
