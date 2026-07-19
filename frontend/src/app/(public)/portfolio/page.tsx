import { fetchProjects, Project } from "@/lib/api-client";
import ProjectCard from "@/components/portfolio/ProjectCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portfolio | Ayoola Ogunrekun",
  description: "Selected works and case studies.",
};

export default async function PortfolioPage() {
  let projects: Project[] = [];
  let error: string | null = null;

  try {
    projects = await fetchProjects();
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    error = "Failed to load projects. Please try again later.";
  }

  // Group projects by category
  const systems = projects.filter((p) => p.category === "systems");
  const tools = projects.filter((p) => p.category === "tools");
  const experiments = projects.filter(
    (p) => p.category === "experiments" || !p.category,
  ); // Default fallback

  const hasProjects = projects.length > 0;

  const sections = [
    { key: "systems", label: "High-value platforms", items: systems },
    { key: "tools", label: "Utilities & libraries", items: tools },
    { key: "experiments", label: "Prototypes & concepts", items: experiments },
  ].filter((s) => s.items.length > 0);

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

      {error && (
        <div className="text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/20 text-center mb-12">
          {error}
        </div>
      )}

      {!hasProjects && !error && (
        <div className="text-center py-20 glass rounded-2xl">
          <p className="text-[var(--muted)]">No projects found.</p>
        </div>
      )}

      {sections.map((section) => (
        <section
          key={section.key}
          id={section.key}
          className="mb-16 scroll-mt-24"
        >
          <div className="flex items-end gap-4 mb-7 border-b border-[var(--hair)] pb-4">
            <h2 className="font-serif font-bold text-[28px] tracking-tight text-[var(--foreground)] capitalize">
              {section.key}
            </h2>
            <span className="text-[var(--muted)] pb-1 font-mono text-xs uppercase tracking-wider">
              {section.label}
            </span>
          </div>
          <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            {section.items.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
