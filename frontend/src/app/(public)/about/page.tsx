import Link from "next/link";
import { Download } from "lucide-react";
import FramedPortrait from "@/components/ui/FramedPortrait";
import { site } from "@/config/site";

export const metadata = {
  title: "About",
  description:
    "Ayoola Ogunrekun is an AI systems engineer in Lagos building agent systems, LLM pipelines and the cloud infrastructure they run on.",
};

export default function About() {
  return (
    <section className="max-w-[1100px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24">
      <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-3.5">
        About
      </div>
      <h1 className="font-serif font-extrabold tracking-tight leading-[1.05] text-[clamp(34px,4.6vw,56px)] text-[var(--foreground)] max-w-[18ch] mb-10 sm:mb-12">
        The engineer behind the systems.
      </h1>

      <div className="grid grid-cols-1 lg:[grid-template-columns:0.85fr_1.15fr] gap-11 items-start">
        {/* portrait */}
        <div className="relative flex justify-center lg:justify-start items-start">
          <div
            className="absolute -inset-2 rounded-[28px] anim-glow pointer-events-none opacity-70"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, var(--glow), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <FramedPortrait
            priority
            className="relative w-full max-w-[300px] sm:max-w-[380px] aspect-[4/5]"
          />
        </div>

        {/* bio */}
        <div className="flex flex-col gap-5 text-[16.5px] sm:text-[17px] leading-[1.75] text-[var(--muted)]">
          <p>
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

          {/* Experience */}
          <div className="mt-4">
            <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] mb-4">
              Experience
            </h2>
            <ol className="relative border-l border-[var(--hair)] ml-1.5 flex flex-col gap-6">
              {site.experience.map((item) => (
                <li key={item.role + item.org} className="pl-6 relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[5px] top-[9px] w-[9px] h-[9px] rounded-full bg-[var(--accent)]"
                  />
                  <div className="font-mono text-[12px] text-[var(--muted)] mb-0.5">
                    {item.dates}
                  </div>
                  <div className="text-[16px] leading-[1.45] font-semibold text-[var(--foreground)]">
                    {item.role}
                  </div>
                  <div className="text-[15px] leading-[1.5] text-[var(--muted)]">
                    {item.org}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-3.5 mt-4">
            <a href={site.cvPath} download className="btn btn-primary">
              Download CV
              <Download className="w-[17px] h-[17px]" />
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
