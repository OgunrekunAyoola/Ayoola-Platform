import Link from "next/link";
import Portrait from "@/components/ui/Portrait";
import { site } from "@/config/site";

export const metadata = {
  title: "About",
  description:
    "Ayoola Ogunrekun is an AI systems engineer in Lagos building agent systems, LLM pipelines and the cloud infrastructure they run on.",
};

export default function About() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24 sm:pb-[110px]">
      <div className="eyebrow mb-6">About</div>
      <h1 className="text-[clamp(44px,6vw,84px)] leading-[1.02] tracking-[-0.03em] max-w-[16ch] mb-12 sm:mb-16">
        The engineer <em>behind the systems.</em>
      </h1>

      <div className="grid gap-12 lg:gap-16 items-start [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
        <Portrait
          variant="about"
          priority
          className="w-full max-w-[520px] lg:sticky lg:top-[110px]"
        />

        <div className="flex flex-col gap-[22px] text-[17px] sm:text-[18px] leading-[1.75] text-[var(--body)]">
          <p className="font-serif text-[22px] sm:text-[26px] leading-[1.45] text-[var(--foreground)]">
            I&apos;m Ayoola, an AI systems engineer based in Lagos. I build AI
            that does real work in production: agent systems, LLM pipelines and
            the cloud infrastructure they run on, plus the controls that make
            them safe to trust.
          </p>
          <p>
            Right now I&apos;m an AI engineer on a finance-automation platform:
            26+ agents running on AWS Bedrock AgentCore, handling work that
            finance teams used to do by hand, from bank operations and accounts
            payable to revenue recognition and payroll. I built the
            human-in-the-loop flags and confidence controls that decide what the
            system does on its own and what waits for a person.
          </p>
          <p>
            Alongside that, I&apos;m the sole engineer on contract client work,
            which means I own everything end to end: architecture,
            infrastructure, deploys and whatever breaks at 2am.
          </p>
          <p>
            I&apos;m self-taught. What I care about is durability: software that
            survives its authors, scales without drama, and stays kind to the
            next engineer.
          </p>

          <div className="mt-6">
            <h2 className="font-mono font-normal text-[12px] tracking-[0.1em] uppercase text-[var(--muted)] mb-2">
              Experience
            </h2>
            <ol>
              {site.experience.map((item) => (
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
            <a href={site.cvPath} download className="btn btn-primary">
              Download CV ↓
            </a>
            <Link href="/work-with-me" className="btn btn-secondary">
              Work with me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
