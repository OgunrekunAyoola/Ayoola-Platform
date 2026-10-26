import Link from "next/link";
import { site } from "@/config/site";
import ClosingRow from "@/components/ui/ClosingRow";
import OfferCard from "@/components/ui/OfferCard";
import Rich from "@/components/ui/Rich";
import { getWorkWithMe } from "@/lib/site-content";
import { hasCv } from "@/lib/cv";

export const generateMetadata = () => getWorkWithMe().meta;

export default function WorkWithMe() {
  const page = getWorkWithMe();
  const { roles, builds, process } = page;

  return (
    <div className="wrap pt-[clamp(56px,7vw,96px)] pb-[clamp(72px,9vw,120px)]">
      <div className="eyebrow mb-6">{page.intro.eyebrow}</div>
      <h1 className="text-[clamp(37px,5.15vw,81px)] leading-[1.02] m-0 mb-6">
        <Rich text={page.intro.title} />
      </h1>
      <p className="text-[18px] leading-[1.6] text-[var(--muted)] max-w-[600px] m-0 mb-8">{page.intro.sub}</p>
      <nav aria-label="On this page" className="flex flex-wrap gap-5 mb-[72px]">
        <a href="#roles" className="link-u text-[16px] font-medium">
          {page.anchors.roles}
        </a>
        <a href="#builds" className="link-u text-[16px] font-medium">
          {page.anchors.builds}
        </a>
      </nav>

      {/* Roles */}
      <section
        id="roles"
        data-reveal
        className="scroll-mt-[100px] border-t border-[var(--foreground)] pt-[clamp(32px,5vw,48px)] grid gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]"
      >
        <div>
          <h2 className="text-[clamp(27px,2.96vw,42px)] leading-[1.08] m-0 mb-5">{roles.title}</h2>
          <p className="text-[17px] leading-[1.65] text-[var(--body)] m-0 mb-8">{roles.body}</p>
          <div className="flex flex-wrap gap-4 items-center">
            {hasCv && (
              <a href={site.cvPath} download className="btn btn-ink h-[52px] px-[26px] text-[16px]">
                Download CV ↓
              </a>
            )}
            <Link href="/contact" className="link-u text-[16px] font-medium">
              Get in touch
            </Link>
          </div>
        </div>
        <div>
          <h3 className="label m-0 mb-[18px]">{roles.bringTitle}</h3>
          <ul className="list-none m-0 p-0 flex flex-col">
            {roles.bring.map((item) => (
              <li
                key={item}
                className="flex gap-3 items-start py-[14px] border-t border-[var(--hair)] text-[15.5px] leading-[1.55]"
              >
                <span aria-hidden="true" className="arrow text-[var(--accent)]">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Builds */}
      <section id="builds" className="scroll-mt-[100px] pt-[110px]">
        <h2 className="text-[clamp(30px,3.74vw,53px)] leading-[1.05] m-0 mb-2.5">{builds.title}</h2>
        <p className="display font-medium text-[clamp(19px,2.03vw,27px)] text-[var(--accent)] m-0 mb-4">
          {builds.tagline}
        </p>
        <p className="text-[17px] leading-[1.6] text-[var(--muted)] max-w-[600px] m-0 mb-12">{builds.body}</p>

        <div
          data-reveal
          className="grid gap-[22px] items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]"
        >
          {builds.offers.map((offer) => (
            <OfferCard key={offer.title} offer={offer} />
          ))}
          <Link
            href={builds.specialism.cta.href}
            className="no-underline rounded-[26px] p-[clamp(28px,3.5vw,44px)] flex flex-col gap-[18px] bg-[var(--accent)] text-[var(--on-accent)] transition-colors duration-300 hover:bg-[var(--accent-hover)]"
          >
            <div className="flex justify-between items-center gap-3 flex-wrap">
              <h3 className="text-[clamp(22px,2.18vw,30px)] m-0">{builds.specialism.title}</h3>
              <span className="bg-[var(--on-accent)] text-[var(--accent)] text-[11.5px] font-semibold tracking-[0.08em] uppercase px-[13px] py-[7px] rounded-full">
                {builds.specialism.badge}
              </span>
            </div>
            <p className="text-[16px] leading-[1.65] text-[var(--on-accent-muted)] m-0 flex-1">
              {builds.specialism.body}
            </p>
            <span className="btn btn-paper self-start h-12 px-6 text-[15.5px]">{builds.specialism.cta.label}</span>
          </Link>
        </div>

        <h2 className="text-[clamp(27px,2.96vw,42px)] m-0 mt-[110px] mb-10">
          <Rich text={process.title} />
        </h2>
        <ol className="list-none m-0 p-0 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))]">
          {process.steps.map((step, i) => (
            <li key={step.title} className="border-t border-[var(--foreground)] pt-[22px] flex flex-col gap-2.5">
              <span className="display font-medium text-[25px] text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[22px] m-0">{step.title}</h3>
              <p className="text-[15.5px] leading-[1.6] text-[var(--muted)] m-0">{step.body}</p>
            </li>
          ))}
        </ol>

        <ClosingRow title={page.closing.title} body={page.closing.body} className="mt-20" />
      </section>
    </div>
  );
}
