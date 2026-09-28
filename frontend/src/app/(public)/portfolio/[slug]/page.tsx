import { getAllWork, getWorkBySlug } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
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
    <article className="max-w-[760px] mx-auto px-5 sm:px-7 pt-14 sm:pt-16 pb-24 sm:pb-[110px]">
      <Link href="/portfolio" className="btn btn-ghost mb-10">
        ← All work
      </Link>

      <header className="mb-10 pb-10 border-b border-[var(--hair)]">
        <div className="eyebrow mb-[18px]">Case study</div>
        <h1 className="text-[clamp(36px,5vw,60px)] leading-[1.08] tracking-[-0.02em] mb-6">
          {project.title}
        </h1>

        {project.summary && (
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-[var(--muted)] mb-9">
            {project.summary}
          </p>
        )}

        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-5 mb-8">
          {meta.map((m) => (
            <div key={m.label} className="border-t border-[var(--hair)] pt-3.5">
              <dt className="font-mono text-[12px] tracking-[0.08em] uppercase text-[var(--muted)] mb-1.5">
                {m.label}
              </dt>
              <dd className="font-serif text-[20px] leading-[1.3]">{m.value}</dd>
            </div>
          ))}
        </dl>

        {project.stack?.length > 0 && (
          <ul className="flex flex-wrap gap-2.5 mb-8">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="font-mono text-[12.5px] rounded-full bg-[var(--surface)] px-3.5 py-[7px]"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="lk">
              Live ↗
            </a>
          )}
          {project.links?.repo && (
            <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="lk">
              GitHub ↗
            </a>
          )}
          <ShareButton title={project.title} text={project.summary} />
        </div>
      </header>

      <div className="prose prose-tokens prose-lg max-w-none prose-a:no-underline hover:prose-a:underline prose-img:rounded-[18px]">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </div>

      <CtaBand title="Building something similar?" className="mt-16" />
    </article>
  );
}
