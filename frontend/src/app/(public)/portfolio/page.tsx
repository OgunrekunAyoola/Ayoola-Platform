import { getAllWork } from "@/lib/content";
import ProjectCard from "@/components/portfolio/ProjectCard";

export const metadata = {
  title: "Portfolio",
  description: "Selected works and case studies.",
};

export default function PortfolioPage() {
  const projects = getAllWork();

  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-20 pb-24">
      <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-3.5">
        Portfolio
      </div>
      <h1 className="font-serif font-extrabold tracking-tight leading-[1.05] text-[clamp(34px,4.6vw,56px)] text-[var(--foreground)] mb-3.5">
        Systems, shipped.
      </h1>
      <p className="text-[18px] text-[var(--muted)] max-w-[560px] mb-12">
        A selection of the platforms, tools, and experiments I&apos;ve designed,
        built, and kept running.
      </p>

      {projects.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl">
          <p className="text-[var(--muted)]">
            No projects published yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
