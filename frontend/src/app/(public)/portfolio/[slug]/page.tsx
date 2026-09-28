import { getAllWork, getWorkBySlug } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import ShareButton from "@/components/ui/ShareButton";
import CtaBand from "@/components/ui/CtaBand";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Only pre-built slugs exist; anything else (including drafts in production) is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllWork().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) {
    return { title: "Case study not found" };
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

  const meta = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Year", value: project.year ? String(project.year) : "" },
  ].filter((m) => m.value);

  return (
    <article className="max-w-[720px] mx-auto px-5 sm:px-7 pt-14 sm:pt-20 pb-24">
      <Link href="/portfolio" className="btn btn-ghost !pl-0 mb-8">
        <ArrowLeft className="w-4 h-4" />
        All work
      </Link>

      <header className="mb-12 border-b border-[var(--hair)] pb-10">
        <h1 className="font-serif font-extrabold text-[clamp(32px,5vw,52px)] mb-5 text-[var(--foreground)] leading-[1.1] tracking-tight">
          {project.title}
        </h1>

        {project.summary && (
          <p className="text-[18px] sm:text-[19px] text-[var(--muted)] mb-8 leading-[1.6]">
            {project.summary}
          </p>
        )}

        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-5 mb-7">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] mb-1.5">
                {m.label}
              </dt>
              <dd className="text-[var(--foreground)] font-medium text-[16px]">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>

        {project.stack?.length > 0 && (
          <ul className="flex gap-2 flex-wrap mb-7">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="font-mono text-[12px] text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-full"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="lk"
            >
              Live ↗
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
          <ShareButton title={project.title} text={project.summary} />
        </div>
      </header>

      <div className="prose prose-tokens prose-lg max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-blockquote:font-serif prose-blockquote:not-italic">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </div>

      <CtaBand title="Building something similar?" as="h2" className="mt-16" />
    </article>
  );
}
