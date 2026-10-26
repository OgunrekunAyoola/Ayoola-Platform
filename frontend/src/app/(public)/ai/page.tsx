import Link from "next/link";
import HeroMotion from "@/components/ai/HeroMotion";
import RunLog from "@/components/home/RunLog";
import BookCallButton from "@/components/ui/BookCallButton";
import OfferCard from "@/components/ui/OfferCard";
import Rich from "@/components/ui/Rich";
import { getAi } from "@/lib/site-content";

export const generateMetadata = () => getAi().meta;

export default function AiSystems() {
  const page = getAi();
  const { hero, principles, practice, builds, closing } = page;

  return (
    <div>
      <section className="wrap pt-[clamp(40px,5vw,64px)] pb-10 grid gap-[clamp(32px,4vw,80px)] items-center [grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr))]">
        <div className="flex flex-col">
          <Link href="/work-with-me" className="eyebrow mb-7 no-underline hover:underline underline-offset-4 self-start">
            {hero.eyebrow}
          </Link>
          <h1 className="text-[clamp(36px,4.99vw,78px)] leading-[1.02] m-0 mb-[30px] text-balance">
            <Rich text={hero.title} />
          </h1>
          <p className="text-[18px] leading-[1.6] text-[var(--muted)] max-w-[540px] m-0 mb-[30px]">{hero.sub}</p>
          <ul className="list-none m-0 mb-9 p-0 flex flex-col gap-2.5 text-[16px]">
            {hero.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden="true" className="arrow text-[var(--accent)]">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4 items-center">
            <a href={hero.primary.href} className="btn btn-ink h-14 px-7 text-[16.5px]">
              {hero.primary.label}
            </a>
            <Link href={hero.secondary.href} className="link-u text-[16px] font-medium">
              {hero.secondary.label}
            </Link>
          </div>
        </div>
        <figure className="m-0 relative w-full aspect-square max-h-[min(78vh,860px)] justify-self-center">
          <HeroMotion />
        </figure>
      </section>

      <section data-reveal className="wrap pt-[clamp(64px,9vw,120px)]">
        <div className="eyebrow mb-[18px]">{principles.eyebrow}</div>
        <h2 className="text-[clamp(30px,3.74vw,53px)] leading-[1.05] m-0 mb-14 max-w-[18ch]">
          <Rich text={principles.title} />
        </h2>
        <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
          {principles.items.map((p, i) => (
            <div key={p.title} className="border-t border-[var(--foreground)] pt-[22px] flex flex-col gap-[14px]">
              <span className="display font-medium text-[25px] text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[23px] leading-[1.15] m-0">{p.title}</h3>
              <p className="text-[16px] leading-[1.6] text-[var(--muted)] m-0">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        data-reveal
        className="wrap pt-[clamp(72px,9vw,120px)] grid gap-[clamp(32px,5vw,80px)] items-center [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]"
      >
        <div>
          <div className="eyebrow mb-[18px]">{practice.eyebrow}</div>
          <h2 className="text-[clamp(30px,3.74vw,53px)] leading-[1.05] m-0 mb-5">
            <Rich text={practice.title} />
          </h2>
          <p className="text-[17px] leading-[1.65] text-[var(--muted)] m-0 max-w-[52ch]">{practice.body}</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="bg-[var(--tint)] rounded-[26px] p-[clamp(20px,4vw,48px)]">
            <RunLog log={practice.log} />
          </div>
          <span className="self-end font-mono text-[11.5px] text-[var(--muted)]">Illustrative</span>
        </div>
      </section>

      <section id="ai-builds" data-reveal className="wrap pt-[clamp(72px,9vw,120px)] scroll-mt-[100px]">
        <div className="eyebrow mb-[18px]">{builds.eyebrow}</div>
        <h2 className="text-[clamp(30px,3.74vw,53px)] leading-[1.05] m-0 mb-2.5">
          <Rich text={builds.title} />
        </h2>
        <p className="display font-medium text-[clamp(19px,2.03vw,27px)] text-[var(--accent)] m-0 mb-4">
          {builds.tagline}
        </p>
        <p className="text-[17px] leading-[1.6] text-[var(--muted)] max-w-[600px] m-0 mb-12">{builds.body}</p>
        <div className="grid gap-[22px] items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          {builds.offers.map((offer) => (
            <OfferCard key={offer.title} offer={offer} />
          ))}
        </div>
      </section>

      <section data-reveal className="wrap pt-[clamp(72px,9vw,120px)] pb-[clamp(72px,9vw,110px)]">
        <div className="border border-[var(--foreground)] rounded-[28px] p-[clamp(36px,6vw,72px)] flex flex-wrap items-end justify-between gap-9 bg-[var(--card)]">
          <div className="max-w-[720px]">
            <h2 className="text-[clamp(27px,3.43vw,48px)] leading-[1.06] m-0 mb-5 text-balance">
              <Rich text={closing.title} />
            </h2>
            {closing.body && (
              <p className="text-[17px] leading-[1.6] text-[var(--muted)] m-0 max-w-[56ch]">{closing.body}</p>
            )}
          </div>
          <BookCallButton className="btn btn-ink h-14 px-[30px] text-[17px]" />
        </div>
      </section>
    </div>
  );
}
