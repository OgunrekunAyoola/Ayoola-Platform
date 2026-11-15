import Link from "next/link";
import RunLog from "@/components/home/RunLog";
import ProofList from "@/components/services/ProofList";
import OfferCard from "@/components/ui/OfferCard";
import PrimaryCta from "@/components/ui/PrimaryCta";
import Rich from "@/components/ui/Rich";
import { bookingHref, bookingLabel, bookingLinkProps } from "@/config/site";
import { pageMetadata } from "@/lib/page-meta";
import { getServices, type ServicesContent } from "@/lib/site-content";

export function generateMetadata() {
  const { meta } = getServices();
  return pageMetadata({ ...meta, path: "/services" });
}

const sectionTop = "scroll-mt-[100px] pt-[clamp(72px,9vw,120px)]";
const sectionRule = "border-t border-[var(--foreground)] pt-[clamp(32px,5vw,48px)]";
const block = "mt-[clamp(56px,7vw,88px)]";

type SectionCopy = Pick<ServicesContent["rescue"], "eyebrow" | "title" | "tagline" | "body">;

/** Eyebrow, the section's one H2, its tagline and a short intro. Same in all three sections. */
function SectionIntro({ id, copy }: { id: string; copy: SectionCopy }) {
  return (
    <div>
      <div className="eyebrow mb-[18px]">{copy.eyebrow}</div>
      <h2 id={id} className="text-[clamp(30px,3.74vw,53px)] leading-[1.05] m-0 mb-2.5">
        <Rich text={copy.title} />
      </h2>
      <p className="display font-medium text-[clamp(19px,2.03vw,27px)] m-0 mb-4">
        <Rich text={copy.tagline} />
      </p>
      <p className="text-[17px] leading-[1.6] text-[var(--muted)] max-w-[620px] m-0">{copy.body}</p>
    </div>
  );
}

/** Small mono subhead for the blocks inside a section ("What I look for", "How it works", "Proof"). */
function Subhead({ children }: { children: React.ReactNode }) {
  return <h3 className="label m-0 mb-[18px]">{children}</h3>;
}

function CheckList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <Subhead>{title}</Subhead>
      <ul className="list-none m-0 p-0 flex flex-col">
        {items.map((item) => (
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
  );
}

/** Numbered items under a subhead: the build process and the AI principles. */
function NumberedRow({ title, items }: { title: string; items: { title: string; body: string }[] }) {
  return (
    <div data-reveal className={block}>
      <Subhead>{title}</Subhead>
      <ol className="list-none m-0 p-0 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))]">
        {items.map((item, i) => (
          <li key={item.title} className="border-t border-[var(--foreground)] pt-[22px] flex flex-col gap-2.5">
            <span className="display font-medium text-[25px] text-[var(--accent)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="text-[21px] leading-[1.15] m-0">{item.title}</h4>
            <p className="text-[15.5px] leading-[1.6] text-[var(--muted)] m-0">{item.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Services() {
  const page = getServices();
  const { rescue, builds, ai } = page;
  const sections = [
    { id: "rescue", label: rescue.nav },
    { id: "builds", label: builds.nav },
    { id: "ai", label: ai.nav },
  ];

  return (
    <div className="pb-[clamp(88px,10vw,140px)]">
      <section className="wrap pt-[clamp(56px,7vw,96px)]">
        <div className="eyebrow mb-6">{page.intro.eyebrow}</div>
        <h1 className="text-[clamp(37px,5.15vw,81px)] leading-[1.02] m-0 mb-6 max-w-[16ch]">
          <Rich text={page.intro.title} />
        </h1>
        <p className="text-[18px] leading-[1.6] text-[var(--muted)] max-w-[620px] m-0 mb-8">{page.intro.sub}</p>
        <nav aria-label="On this page" className="flex flex-wrap gap-x-6 gap-y-3">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="link-u text-[16px] font-medium">
              {`${s.label} ↓`}
            </a>
          ))}
        </nav>
      </section>

      {/* 01 Rescue & security audit: the only priced offers */}
      <section id="rescue" aria-labelledby="rescue-title" className={`wrap ${sectionTop}`}>
        <div className={sectionRule}>
          <SectionIntro id="rescue-title" copy={rescue} />

          <div
            data-reveal
            className="mt-12 grid gap-[22px] items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]"
          >
            {rescue.offers.map((offer) => (
              <OfferCard key={offer.title} offer={offer} />
            ))}
          </div>
          <p className="text-[16px] leading-[1.6] text-[var(--body)] m-0 mt-6 max-w-[64ch]">{rescue.retainer}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-4 items-center mt-8">
            <PrimaryCta href="/contact?type=rescue" label={rescue.cta} />
            <Link href={bookingHref} {...bookingLinkProps} className="link-u text-[16px] font-medium">
              {bookingLabel}
            </Link>
          </div>

          <div className={`${block} grid gap-x-12 gap-y-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]`}>
            <CheckList title={rescue.checks.title} items={rescue.checks.items} />
            <ProofList title={page.proofTitle} items={rescue.proof} stacked />
          </div>
        </div>
      </section>

      {/* 02 Product builds */}
      <section id="builds" aria-labelledby="builds-title" className={`wrap ${sectionTop}`}>
        <div className={sectionRule}>
          <SectionIntro id="builds-title" copy={builds} />
          <div data-reveal className="mt-12">
            <OfferCard offer={builds.offer} quoted={page.quoted} wide />
          </div>
          <NumberedRow title={builds.process.title} items={builds.process.steps} />
          <div className={block}>
            <ProofList title={page.proofTitle} items={builds.proof} />
          </div>
        </div>
      </section>

      {/* 03 AI systems (was /ai): the log sits beside the intro; Finance automation is the first card */}
      <section id="ai" aria-labelledby="ai-title" className={`wrap ${sectionTop}`}>
        <div className={sectionRule}>
          <div className="grid gap-x-[clamp(32px,5vw,80px)] gap-y-10 items-center [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
            <SectionIntro id="ai-title" copy={ai} />
            <figure className="m-0 flex flex-col gap-2.5">
              <div className="bg-[var(--tint)] rounded-[26px] p-[clamp(20px,4vw,48px)]">
                <RunLog log={ai.log} />
              </div>
              <figcaption className="self-end font-mono text-[11.5px] text-[var(--muted)]">Illustrative</figcaption>
            </figure>
          </div>

          <div
            data-reveal
            className="mt-12 grid gap-[22px] items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]"
          >
            {ai.offers.map((offer) => (
              <OfferCard key={offer.title} offer={offer} quoted={page.quoted} />
            ))}
          </div>
          <NumberedRow title={ai.principles.title} items={ai.principles.items} />
          <div className={block}>
            <ProofList title={page.proofTitle} items={ai.proof} />
          </div>
        </div>
      </section>
    </div>
  );
}
