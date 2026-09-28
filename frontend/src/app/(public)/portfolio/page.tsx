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
    <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24">
      <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-3.5">
        Work
      </div>
      <h1 className="font-serif font-extrabold tracking-tight leading-[1.05] text-[clamp(34px,4.6vw,56px)] text-[var(--foreground)] mb-3.5">
        Systems in production.
      </h1>
      <p className="text-[17px] sm:text-[18px] text-[var(--muted)] leading-[1.65] max-w-[600px] mb-12">
        Case studies from production systems: the problem, the architecture,
        the decisions, and what broke along the way.
      </p>

      {projects.length === 0 ? (
        <div className="text-center py-20 px-6 glass rounded-2xl">
          <p className="text-[var(--muted)]">
            Case studies are being written up. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
