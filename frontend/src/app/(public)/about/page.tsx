import Link from "next/link";
import Portrait from "@/components/ui/Portrait";
import Rich from "@/components/ui/Rich";
import { site } from "@/config/site";
import { getAbout } from "@/lib/site-content";
import { hasCv } from "@/lib/cv";

export const generateMetadata = () => getAbout().meta;

export default function About() {
  const about = getAbout();

  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24 sm:pb-[110px]">
      <div className="eyebrow mb-6">{about.eyebrow}</div>
      <h1 className="text-[clamp(44px,6vw,84px)] leading-[1.02] tracking-[-0.03em] max-w-[16ch] mb-12 sm:mb-16">
        <Rich text={about.title} />
      </h1>

      <div className="grid gap-12 lg:gap-16 items-start [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
        <Portrait
          variant="about"
          priority
          className="w-full max-w-[520px] lg:sticky lg:top-[110px]"
        />

        <div className="flex flex-col gap-[22px] text-[17px] sm:text-[18px] leading-[1.75] text-[var(--body)]">
          <p className="font-serif text-[22px] sm:text-[26px] leading-[1.45] text-[var(--foreground)]">
            {about.lead}
          </p>
          {about.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="mt-6">
            <h2 className="font-mono font-normal text-[12px] tracking-[0.1em] uppercase text-[var(--muted)] mb-2">
              {about.experienceTitle}
            </h2>
            <ol>
              {about.experience.map((item) => (
                <li
                  key={item.role + item.org}
                  className="grid [grid-template-columns:minmax(0,1fr)_auto] gap-x-5 gap-y-1.5 py-5 border-t border-[var(--hair)]"
                >
                  <span className="font-serif text-[20px] sm:text-[22px] leading-[1.3] text-[var(--foreground)]">
                    {item.role}
                  </span>
                  <span className="font-mono text-[12.5px] text-[var(--muted)] pt-1.5">
                    {item.dates}
                  </span>
                  <span className="text-[16px] leading-[1.5] text-[var(--muted)]">
                    {item.org}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {hasCv && (
              <a href={site.cvPath} download className="btn btn-primary">
                Download CV ↓
              </a>
            )}
            <Link href="/work-with-me" className={hasCv ? "btn btn-secondary" : "btn btn-primary"}>
              Work with me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
