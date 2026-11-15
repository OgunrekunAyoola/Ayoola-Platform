import Link from "next/link";
import RunLog from "@/components/home/RunLog";
import ProofList from "@/components/services/ProofList";
import ClosingRow from "@/components/ui/ClosingRow";
import OfferCard from "@/components/ui/OfferCard";
import Rich from "@/components/ui/Rich";
import { bookingHref, bookingLinkProps } from "@/config/site";
import { pageMetadata } from "@/lib/page-meta";
import { getServices } from "@/lib/site-content";

export function generateMetadata() {
  const { meta } = getServices();
  return pageMetadata({ ...meta, path: "/services" });
}

const sectionTop = "scroll-mt-[100px] pt-[clamp(72px,9vw,120px)]";
const sectionRule = "border-t border-[var(--foreground)] pt-[clamp(32px,5vw,48px)]";
const h2 = "text-[clamp(30px,3.74vw,53px)] leading-[1.05] m-0 mb-2.5";
const tagline = "display font-medium text-[clamp(19px,2.03vw,27px)] m-0 mb-4";
const lead = "text-[17px] leading-[1.6] text-[var(--muted)] max-w-[620px] m-0";

function CheckList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="label m-0 mb-[18px]">{title}</h3>
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

export default function Services() {
  const page = getServices();
  const { rescue, builds, ai } = page;
  const sections = [
    { id: "rescue", label: rescue.nav },
    { id: "builds", label: builds.nav },
    { id: "ai", label: ai.nav },
  ];

  return (
    <div className="pb-[clamp(72px,9vw,120px)]">
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
          <div className="eyebrow mb-[18px]">{rescue.eyebrow}</div>
          <h2 id="rescue-title" className={h2}>
            <Rich text={rescue.title} />
          </h2>
          <p className={tagline}>
            <Rich text={rescue.tagline} />
          </p>
          <p className={`${lead} mb-12`}>{rescue.body}</p>

          <div
            data-reveal
            className="grid gap-[22px] items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]"
          >
            {rescue.offers.map((offer) => (
              <OfferCard key={offer.title} offer={offer} />
            ))}
          </div>
          <p className="text-[16px] leading-[1.6] text-[var(--body)] m-0 mt-6 max-w-[64ch]">{rescue.retainer}</p>

          <div className="flex flex-wrap gap-4 items-center mt-8">
            <Link href="/contact?type=rescue" className="btn btn-ink h-14 px-7 text-[16.5px]">
              {rescue.cta} <span aria-hidden="true">→</span>
            </Link>
            <Link href={bookingHref} {...bookingLinkProps} className="link-u text-[16px] font-medium">
              Book a call
            </Link>
          </div>

          <div className="grid gap-x-12 gap-y-14 mt-[clamp(56px,7vw,88px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
            <CheckList title={rescue.checks.title} items={rescue.checks.items} />
            <ProofList title={page.proofTitle} items={rescue.proof} stacked />
          </div>
        </div>
      </section>

      {/* 02 Product builds */}
      <section id="builds" aria-labelledby="builds-title" className={`wrap ${sectionTop}`}>
        <div className={sectionRule}>
          <div className="eyebrow mb-[18px]">{builds.eyebrow}</div>
          <h2 id="builds-title" className={h2}>
            <Rich text={builds.title} />
          </h2>
          <p className={tagline}>
            <Rich text={builds.tagline} />
          </p>
          <p className={`${lead} mb-12`}>{builds.body}</p>

          <div
            data-reveal
            className="grid gap-x-12 gap-y-10 items-start [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]"
          >
            <OfferCard offer={builds.offer} quoted={page.quoted} />
            <CheckList title={builds.strengths.title} items={builds.strengths.items} />
          </div>

          <h3 className="text-[clamp(27px,2.96vw,42px)] m-0 mt-[clamp(64px,8vw,100px)] mb-10">
            <Rich text={builds.process.title} />
          </h3>
          <ol className="list-none m-0 p-0 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))]">
            {builds.process.steps.map((step, i) => (
              <li key={step.title} className="border-t border-[var(--foreground)] pt-[22px] flex flex-col gap-2.5">
                <span className="display font-medium text-[25px] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-[22px] m-0">{step.title}</h4>
                <p className="text-[15.5px] leading-[1.6] text-[var(--muted)] m-0">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-[clamp(56px,7vw,88px)]">
            <ProofList title={page.proofTitle} items={builds.proof} />
          </div>
        </div>
      </section>

      {/* 03 AI & finance automation (was /ai) */}
      <section id="ai" aria-labelledby="ai-title" className={`wrap ${sectionTop}`}>
        <div className={sectionRule}>
          <div className="eyebrow mb-[18px]">{ai.eyebrow}</div>
          <h2 id="ai-title" className={h2}>
            <Rich text={ai.title} />
          </h2>
          <p className={`${lead} mt-4 mb-[30px]`}>{ai.sub}</p>
          <ul className="list-none m-0 p-0 flex flex-col gap-2.5 text-[16px]">
            {ai.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden="true" className="arrow text-[var(--accent)]">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div data-reveal className="pt-[clamp(56px,7vw,96px)]">
            <div className="eyebrow mb-[18px]">{ai.principles.eyebrow}</div>
            <h3 className="text-[clamp(27px,2.96vw,42px)] leading-[1.05] m-0 mb-12 max-w-[18ch]">
              <Rich text={ai.principles.title} />
            </h3>
            <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
              {ai.principles.items.map((p, i) => (
                <div key={p.title} className="border-t border-[var(--foreground)] pt-[22px] flex flex-col gap-[14px]">
                  <span className="display font-medium text-[25px] text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-[23px] leading-[1.15] m-0">{p.title}</h4>
                  <p className="text-[16px] leading-[1.6] text-[var(--muted)] m-0">{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            data-reveal
            className="pt-[clamp(56px,7vw,96px)] grid gap-[clamp(32px,5vw,80px)] items-center [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]"
          >
            <div>
              <div className="eyebrow mb-[18px]">{ai.practice.eyebrow}</div>
              <h3 className="text-[clamp(27px,2.96vw,42px)] leading-[1.05] m-0 mb-5">
                <Rich text={ai.practice.title} />
              </h3>
              <p className="text-[17px] leading-[1.65] text-[var(--muted)] m-0 max-w-[52ch]">{ai.practice.body}</p>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="bg-[var(--tint)] rounded-[26px] p-[clamp(20px,4vw,48px)]">
                <RunLog log={ai.practice.log} />
              </div>
              <span className="self-end font-mono text-[11.5px] text-[var(--muted)]">Illustrative</span>
            </div>
          </div>

          <div
            data-reveal
            className="pt-[clamp(56px,7vw,96px)] grid gap-[22px] items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]"
          >
            {ai.offers.map((offer) => (
              <OfferCard key={offer.title} offer={offer} quoted={page.quoted} />
            ))}
          </div>

          <div className="mt-[clamp(56px,7vw,88px)]">
            <ProofList title={page.proofTitle} items={ai.proof} />
          </div>
        </div>
      </section>

      <div className="wrap">
        <ClosingRow title={page.closing.title} body={page.closing.body} className="mt-[clamp(72px,9vw,120px)]" />
      </div>
    </div>
  );
}
