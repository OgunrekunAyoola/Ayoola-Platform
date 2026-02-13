import { fetchProject } from "@/lib/api-client";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import PersonaSummary from "@/components/portfolio/PersonaSummary";
import ShareButton from "@/components/ui/ShareButton";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await fetchProject(slug);
    return {
      title: `${project.title} | Ayoola`,
      description: project.summary,
    };
  } catch {
    return {
      title: "Project Not Found | Ayoola",
    };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  let project;

  try {
    project = await fetchProject(slug);
  } catch (error) {
    console.error("Error fetching project:", error);
    notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-black text-white py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="text-yellow-500 hover:text-yellow-400 mb-12 inline-block transition-colors text-base font-medium"
        >
          ← Back to Portfolio
        </Link>

        {/* Header */}
        <header className="mb-20 border-b border-neutral-800 pb-16">
          <div className="flex gap-2 mb-8 flex-wrap">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm font-medium text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-neutral-100 leading-tight tracking-tight">
            {project.title}
          </h1>

          <p className="text-2xl text-neutral-400 mb-12 leading-relaxed max-w-3xl font-light">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-12 text-base text-neutral-400">
            <div>
              <span className="block text-neutral-500 uppercase text-xs tracking-widest font-bold mb-2">
                Role
              </span>
              <span className="text-white font-medium text-lg">
                {project.role}
              </span>
            </div>
            {(project.links.demoUrl || project.links.repoUrl) && (
              <div>
                <span className="block text-neutral-500 uppercase text-xs tracking-widest font-bold mb-2">
                  Links
                </span>
                <div className="flex gap-6">
                  {project.links.demoUrl && (
                    <a
                      href={project.links.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-500 hover:underline hover:text-yellow-400 transition-colors"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.links.repoUrl && (
                    <a
                      href={project.links.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-500 hover:underline hover:text-yellow-400 transition-colors"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            )}
            <div>
              <span className="block text-neutral-500 uppercase text-xs tracking-widest font-bold mb-2">
                Share
              </span>
              <ShareButton title={project.title} text={project.summary} />
            </div>
          </div>
        </header>

        {/* AI Summary Widget */}
        <PersonaSummary projectId={project._id} />

        {/* Case Study Content */}
        <div className="prose prose-invert prose-yellow max-w-none prose-lg prose-headings:font-bold prose-a:text-yellow-500 hover:prose-a:text-yellow-400">
          <ReactMarkdown>{project.description || ""}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
