import { getAllWork, getWorkBySlug } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import ShareButton from "@/components/ui/ShareButton";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllWork().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-5 sm:px-7 py-20 md:py-28">
      <Link href="/portfolio" className="btn btn-ghost !pl-0 mb-10">
        <ArrowLeft className="w-4 h-4" />
        Back to Portfolio
      </Link>

      {/* Header */}
      <header className="mb-16 border-b border-[var(--hair)] pb-12">
        <div className="flex gap-2 mb-7 flex-wrap">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <h1 className="font-serif font-extrabold text-[clamp(34px,5.2vw,64px)] mb-6 text-[var(--foreground)] leading-tight tracking-tight">
          {project.title}
        </h1>

        <p className="text-xl text-[var(--muted)] mb-10 leading-relaxed max-w-3xl">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-10 text-base text-[var(--muted)]">
          <div>
            <span className="block text-[var(--muted)] uppercase text-xs tracking-widest font-bold mb-2">
              Role
            </span>
            <span className="text-[var(--foreground)] font-medium text-lg">
              {project.role}
            </span>
          </div>
          {project.client && (
            <div>
              <span className="block text-[var(--muted)] uppercase text-xs tracking-widest font-bold mb-2">
                Client
              </span>
              <span className="text-[var(--foreground)] font-medium text-lg">
                {project.client}
              </span>
            </div>
          )}
          {(project.links?.live || project.links?.repo) && (
            <div>
              <span className="block text-[var(--muted)] uppercase text-xs tracking-widest font-bold mb-2">
                Links
              </span>
              <div className="flex gap-6">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lk"
                  >
                    Live Demo ↗
                  </a>
                )}
                {project.links?.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lk"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          )}
          <div>
            <span className="block text-[var(--muted)] uppercase text-xs tracking-widest font-bold mb-2">
              Share
            </span>
            <ShareButton title={project.title} text={project.summary} />
          </div>
        </div>
      </header>

      {/* Case Study Content */}
      <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </div>
    </article>
  );
}
