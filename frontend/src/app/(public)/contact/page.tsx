import { site } from "@/config/site";
import BookCallButton from "@/components/ui/BookCallButton";
import Rich from "@/components/ui/Rich";
import { getContact, getSite } from "@/lib/site-content";
import ContactForm from "./ContactForm";

export const generateMetadata = () => getContact().meta;

export default function Contact() {
  const page = getContact();

  const elsewhere = [
    { href: site.githubUrl, label: "GitHub" },
    ...(site.linkedinUrl ? [{ href: site.linkedinUrl, label: "LinkedIn" }] : []),
  ];

  const rows = [
    ...(site.email
      ? [
          {
            label: "Email",
            value: (
              <a href={`mailto:${site.email}`} className="lk break-all">
                {site.email}
              </a>
            ),
          },
        ]
      : []),
    { label: "Based in", value: getSite().timezone },
    {
      label: "Elsewhere",
      value: (
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          {elsewhere.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="lk">
              {l.label} ↗
            </a>
          ))}
        </span>
      ),
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24 sm:pb-[110px] grid gap-12 lg:gap-16 items-start [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
      <div>
        <div className="eyebrow mb-6">{page.eyebrow}</div>
        <h1 className="text-[clamp(42px,5.4vw,76px)] leading-[1.03] tracking-[-0.03em] mb-6">
          <Rich text={page.title} />
        </h1>
        <p className="text-[17.5px] sm:text-[19px] leading-[1.6] text-[var(--muted)] mb-9">
          {page.sub}
        </p>

        <BookCallButton
          label={page.bookLabel}
          className="btn btn-primary btn-lg w-full sm:w-auto mb-12"
        />

        <dl className="border-b border-[var(--hair)]">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid [grid-template-columns:110px_1fr] gap-4 py-[18px] border-t border-[var(--hair)]"
            >
              <dt className="font-mono text-[12px] tracking-[0.08em] uppercase text-[var(--muted)] pt-[3px]">
                {row.label}
              </dt>
              <dd className="text-[16.5px] min-w-0">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-[28px] bg-[var(--surface)] p-[clamp(24px,4vw,44px)]">
        <ContactForm {...page.form} />
      </div>
    </section>
  );
}
