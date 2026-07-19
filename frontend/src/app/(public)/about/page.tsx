import Link from "next/link";
import FramedPortrait from "@/components/ui/FramedPortrait";

const SKILLS = [
  "AI integration",
  "full-stack engineering",
  "product & systems",
  "automation",
  "technical writing",
];

export const metadata = {
  title: "About",
  description:
    "Ayoola Ogunrekun — software engineer, writer, and creator building intelligent systems.",
};

export default function About() {
  return (
    <section className="max-w-[1100px] mx-auto px-5 sm:px-7 pt-20 pb-24">
      <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-3.5">
        About
      </div>
      <h1 className="font-serif font-extrabold tracking-tight leading-[1.05] text-[clamp(34px,4.6vw,56px)] text-[var(--foreground)] max-w-[18ch] mb-12">
        The engineer behind the systems.
      </h1>

      <div className="grid grid-cols-1 lg:[grid-template-columns:0.85fr_1.15fr] gap-11 items-start">
        {/* portrait */}
        <div className="relative min-h-[360px] flex justify-center lg:justify-start items-start">
          <div
            className="absolute -inset-2 rounded-[28px] anim-glow pointer-events-none opacity-70"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, var(--glow), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <FramedPortrait className="relative w-full max-w-[380px] aspect-[4/5]" />
        </div>

        {/* bio */}
        <div className="flex flex-col gap-5 text-[17px] leading-[1.75] text-[var(--muted)]">
          <p>
            I&apos;m Ayoola — a software engineer who builds at the intersection
            of software, AI, and writing. Ayoola Platform is my umbrella for
            everything I make: client systems, personal tools, and experiments
            at the edge of AI and the web.
          </p>
          <p>
            I care about the unglamorous parts —{" "}
            <span className="text-[var(--foreground)] font-medium">
              durability
            </span>
            : software that survives its authors, scales without drama, and stays
            kind to the next engineer. I&apos;m interested in how technology can
            change operations, storytelling, and even policy — not only business
            metrics.
          </p>
          <p>
            When I&apos;m not shipping, I&apos;m writing.{" "}
            <Link href="/blog" className="lk">
              The blog
            </Link>{" "}
            is where I think out loud about systems, abstraction, and the
            discipline of finishing.
          </p>

          <div className="flex flex-wrap gap-2.5 mt-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="font-mono text-[12.5px] text-[var(--foreground)] border border-[var(--card-border)] rounded-full px-3.5 py-[7px]"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3.5 mt-3.5">
            <Link href="/contact" className="btn btn-primary">
              Work with me
            </Link>
            <Link href="/portfolio" className="btn btn-secondary">
              See the work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
