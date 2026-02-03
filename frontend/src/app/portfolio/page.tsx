import { fetchProjects, Project } from "@/lib/api-client";
import ProjectCard from "@/components/portfolio/ProjectCard";

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

  return (
    <main className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-neutral-100">
            Selected Work
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl">
            A collection of projects exploring software engineering, product
            design, and creative problem solving.
          </p>
        </header>

        {error ? (
          <div className="text-red-500 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

        {projects.length === 0 && !error && (
          <div className="text-center py-20 bg-neutral-900/30 rounded-xl border border-neutral-800">
            <p className="text-neutral-500">No projects found.</p>
          </div>
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
