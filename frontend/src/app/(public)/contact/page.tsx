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
    <section className="wrap pt-[clamp(56px,7vw,96px)] pb-[clamp(72px,9vw,120px)] grid gap-16 items-start [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
      <div>
        <div className="eyebrow mb-6">{page.eyebrow}</div>
        <h1 className="text-[clamp(36px,4.52vw,69px)] leading-[1.03] m-0 mb-6">
          <Rich text={page.title} />
        </h1>
        <p className="text-[18px] leading-[1.6] text-[var(--muted)] m-0 mb-9">{page.sub}</p>

        <BookCallButton label={page.bookLabel} className="btn btn-ink h-14 px-7 text-[17px] mb-12" />

        <dl className="m-0 flex flex-col border-b border-[var(--hair)]">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid [grid-template-columns:110px_1fr] gap-4 py-[18px] border-t border-[var(--hair)]"
            >
              <dt className="label text-[11.5px] pt-[3px]">{row.label}</dt>
              <dd className="m-0 text-[16px] min-w-0">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-[26px] border border-[var(--card-border)] bg-[var(--card)] p-[clamp(28px,4vw,44px)]">
        <ContactForm {...page.form} email={site.email} />
      </div>
    </section>
  );
}
