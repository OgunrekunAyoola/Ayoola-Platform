import { getAllWork } from "@/lib/content";
import ProjectCard from "@/components/portfolio/ProjectCard";

export const metadata = {
  title: "Work",
  description:
    "Case studies from production systems: the problem, the architecture, the decisions, and what broke along the way.",
};

export default function PortfolioPage() {
  const projects = getAllWork();

  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24 sm:pb-[110px]">
      <div className="eyebrow mb-6">Work</div>
      <h1 className="text-[clamp(44px,6vw,84px)] leading-[1.02] tracking-[-0.03em] mb-6">
        Systems <em>in production.</em>
      </h1>
      <p className="text-[17.5px] sm:text-[19px] leading-[1.6] text-[var(--muted)] max-w-[600px] mb-12 sm:mb-16">
        Case studies from production systems: the problem, the architecture,
        the decisions, and what broke along the way.
      </p>

      {projects.length === 0 ? (
        <div className="rounded-[28px] bg-[var(--surface)] grid [grid-template-columns:10%_1fr] overflow-hidden min-h-[240px] sm:min-h-[280px]">
          <div className="bg-[var(--tint-blue)]" />
          <div className="flex flex-col items-start justify-center gap-[18px] p-7 sm:p-14">
            <span className="font-mono text-[12.5px] text-[var(--muted)]">{"// in progress"}</span>
            <p className="font-serif font-medium text-[26px] sm:text-[32px] leading-[1.2] max-w-[22ch]">
              Case studies are being written up. Check back soon.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
