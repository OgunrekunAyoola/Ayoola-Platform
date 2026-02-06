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

  return (
    <main className="min-h-screen py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 md:mb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-neutral-100 tracking-tight">
            Selected Work
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed font-light">
            A collection of projects exploring software engineering, product
            design, and creative problem solving.
          </p>
        </header>

        {error && (
          <div className="text-red-500 bg-red-500/10 p-4 rounded-lg border border-red-500/20 text-center mb-12">
            {error}
          </div>
        )}

        {!hasProjects && !error && (
          <div className="text-center py-20 bg-neutral-900/30 rounded-xl border border-neutral-800">
            <p className="text-neutral-500">No projects found.</p>
          </div>
        )}

        {/* Systems Section - High Value */}
        {systems.length > 0 && (
          <section className="mb-24">
            <div className="flex items-end gap-4 mb-8 border-b border-neutral-800 pb-4">
              <h2 className="text-3xl font-bold text-white">Systems</h2>
              <span className="text-neutral-500 pb-1 text-sm uppercase tracking-wider">
                High-Value Platforms
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {systems.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Tools Section */}
        {tools.length > 0 && (
          <section className="mb-24">
            <div className="flex items-end gap-4 mb-8 border-b border-neutral-800 pb-4">
              <h2 className="text-3xl font-bold text-white">Tools</h2>
              <span className="text-neutral-500 pb-1 text-sm uppercase tracking-wider">
                Utilities & Libraries
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Experiments Section */}
        {experiments.length > 0 && (
          <section id="experiments" className="mb-24">
            <div className="flex items-end gap-4 mb-8 border-b border-neutral-800 pb-4">
              <h2 className="text-3xl font-bold text-white">Experiments</h2>
              <span className="text-neutral-500 pb-1 text-sm uppercase tracking-wider">
                Prototypes & Concepts
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiments.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* My Journey Section */}
        <section className="mt-32 border-t border-neutral-800 pt-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-white">
              My Journey as a Developer
            </h2>
            <div className="prose prose-invert prose-yellow text-neutral-400">
              <p className="mb-4">
                [Placeholder: This section will detail my background, how I
                started coding, and my growth path.]
              </p>
              <p>
                From early experiments to building complex platforms, my journey
                has been driven by curiosity and a desire to build things that
                matter.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
