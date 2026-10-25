import Link from "next/link";
import { site } from "@/config/site";
import CtaBand from "@/components/ui/CtaBand";
import Rich from "@/components/ui/Rich";
import { getWorkWithMe } from "@/lib/site-content";
import { hasCv } from "@/lib/cv";

export const generateMetadata = () => getWorkWithMe().meta;

const h2 = "text-[clamp(32px,4.4vw,60px)] leading-[1.06] tracking-[-0.02em]";

export default function WorkWithMe() {
  const page = getWorkWithMe();
  const { roles, builds, process } = page;

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24 sm:pb-[110px]">
      <div className="eyebrow mb-6">{page.intro.eyebrow}</div>
      <h1 className="text-[clamp(44px,6vw,84px)] leading-[1.02] tracking-[-0.03em] mb-6">
        <Rich text={page.intro.title} />
      </h1>
      <p className="text-[17.5px] sm:text-[19px] leading-[1.6] text-[var(--muted)] max-w-[600px] mb-8">
        {page.intro.sub}
      </p>
      <nav aria-label="On this page" className="flex flex-wrap gap-3 mb-14 sm:mb-[72px]">
        <a href="#roles" className="btn btn-secondary btn-sm">
          {page.anchors.roles}
        </a>
        <a href="#builds" className="btn btn-secondary btn-sm">
          {page.anchors.builds}
        </a>
      </nav>

      {/* A — Roles */}
      <section
        id="roles"
        className="scroll-mt-[100px] rounded-[32px] bg-[var(--tint-blue)] p-[clamp(26px,5vw,64px)] grid gap-10 sm:gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]"
      >
        <div>
          <h2 className="text-[clamp(30px,3.6vw,46px)] leading-[1.1] tracking-[-0.02em] mb-5">
            {roles.title}
          </h2>
          <p className="text-[17px] sm:text-[17.5px] leading-[1.65] text-[var(--body)] mb-8">
            {roles.body}
          </p>
          <div className="flex flex-wrap gap-3">
            {hasCv && (
              <a href={site.cvPath} download className="btn btn-primary">
                Download CV ↓
              </a>
            )}
            <Link href="/contact" className={hasCv ? "btn btn-secondary" : "btn btn-primary"}>
              Get in touch
            </Link>
          </div>
        </div>
        <div className="rounded-[22px] bg-[var(--card)] p-6 sm:p-[30px]">
          <h3 className="font-mono font-normal text-[12px] tracking-[0.1em] uppercase text-[var(--muted)] mb-[18px]">
            {roles.bringTitle}
          </h3>
          <ul className="flex flex-col">
            {roles.bring.map((item) => (
              <li
                key={item}
                className="flex gap-3 items-start py-[13px] border-t border-[var(--hair)] text-[16px] leading-[1.5]"
              >
                <span aria-hidden="true" className="text-[var(--accent)]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* B — Builds */}
      <section id="builds" className="scroll-mt-[100px] pt-24 sm:pt-[110px]">
        <h2 className={`${h2} mb-3`}>{builds.title}</h2>
        <p className="font-serif italic text-[clamp(22px,2.6vw,32px)] text-[var(--accent)] mb-4">
          {builds.tagline}
        </p>
        <p className="text-[17px] sm:text-[17.5px] leading-[1.6] text-[var(--muted)] max-w-[600px] mb-12">
          {builds.body}
        </p>

        <div className="grid gap-[22px] items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          {builds.offers.map((offer) =>
            offer.featured ? (
              <div
                key={offer.title}
                className="on-inverse rounded-[28px] bg-[var(--inverse)] text-[var(--inverse-fg)] p-7 sm:p-10 flex flex-col gap-[18px]"
              >
                <h3 className="text-[30px] sm:text-[34px] tracking-[-0.015em]">{offer.title}</h3>
                <p className="text-[16.5px] leading-[1.65] text-[var(--inverse-muted)]">
                  {offer.body}
                </p>
                {offer.includes && (
                  <ul className="flex flex-col gap-2.5">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[15.5px] leading-[1.5]">
                        <span aria-hidden="true" className="text-[var(--accent-bright)]">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <div
                key={offer.title}
                className="rounded-[28px] border border-[var(--hair)] bg-[var(--card)] p-7 sm:p-10 flex flex-col gap-[18px]"
              >
                <h3 className="text-[30px] sm:text-[34px] tracking-[-0.015em]">{offer.title}</h3>
                <p className="text-[16.5px] leading-[1.65] text-[var(--muted)]">{offer.body}</p>
                {offer.includes && (
                  <ul className="flex flex-col gap-2.5">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[15.5px] leading-[1.5]">
                        <span aria-hidden="true" className="text-[var(--accent)]">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ),
          )}
        </div>

        <h2 className="text-[clamp(30px,3.6vw,46px)] tracking-[-0.02em] mt-24 sm:mt-[110px] mb-10">
          {process.title}
        </h2>
        <ol className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))]">
          {process.steps.map((item, i) => (
            <li
              key={item.title}
              className="border-t-[1.5px] border-[var(--foreground)] pt-[22px] flex flex-col gap-2.5"
            >
              <span className="font-mono text-[13px] text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[26px]">{item.title}</h3>
              <p className="text-[16px] leading-[1.6] text-[var(--muted)]">{item.body}</p>
            </li>
          ))}
        </ol>

        <CtaBand
          tone="green"
          as="h3"
          className="mt-20"
          title={<Rich text={page.closing.title} />}
          body={page.closing.body}
        />
      </section>
    </div>
  );
}
