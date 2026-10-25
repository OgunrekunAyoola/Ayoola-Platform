import { Fragment } from "react";
import { getAllWork, getWorkBySlug } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import ShareButton from "@/components/ui/ShareButton";
import CtaBand from "@/components/ui/CtaBand";
import Rich from "@/components/ui/Rich";
import WorkDiagram from "@/components/portfolio/WorkDiagram";
import { getWorkPage } from "@/lib/site-content";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const DIAGRAM_MARKER = /^<!--\s*diagram\s*-->$/m;

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

  const labels = getWorkPage().caseStudy;

  // A `<!-- diagram -->` line in the body places the diagram; otherwise it leads the body.
  const sections = project.content.split(DIAGRAM_MARKER);
  const diagramAt = sections.length > 1 ? 1 : 0;
  const diagram = project.diagram && (
    <WorkDiagram title={labels.diagramTitle} markers={labels.markers} diagram={project.diagram} />
  );
  const meta = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Year", value: String(project.year) },
    { label: "Status", value: project.status },
  ];

  return (
    <article className="max-w-[760px] mx-auto px-5 sm:px-7 pt-14 sm:pt-16 pb-24 sm:pb-[110px]">
      <Link href="/portfolio" className="btn btn-ghost mb-10">
        {labels.back}
      </Link>

      <header className="mb-10 pb-10 border-b border-[var(--hair)]">
        <div className="eyebrow mb-[18px]">{labels.eyebrow}</div>
        <h1 className="text-[clamp(36px,5vw,60px)] leading-[1.08] tracking-[-0.02em] mb-6">
          {project.title}
        </h1>

        <p className="text-[18px] sm:text-[20px] leading-[1.6] text-[var(--muted)] mb-9">
          {project.summary}
        </p>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5 mb-8">
          {meta.map((m) => (
            <div key={m.label} className="border-t border-[var(--hair)] pt-3.5">
              <dt className="font-mono text-[12px] tracking-[0.08em] uppercase text-[var(--muted)] mb-1.5">
                {m.label}
              </dt>
              <dd className="font-serif text-[20px] leading-[1.3]">{m.value}</dd>
            </div>
          ))}
        </dl>

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

      {project.facts && (
        <dl className="grid gap-px bg-[var(--hair)] border-y border-[var(--hair)] mb-12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,160px),1fr))]">
          {project.facts.map((fact) => (
            <div
              key={fact.label}
              className="bg-[var(--background)] py-5 pr-4 flex flex-col-reverse justify-end gap-1.5"
            >
              <dt className="text-[14.5px] leading-[1.45] text-[var(--muted)]">{fact.label}</dt>
              <dd className="font-serif font-medium text-[30px] sm:text-[34px] leading-[1.1]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {sections.map((markdown, i) => (
        <Fragment key={i}>
          {i === diagramAt && diagram}
          {markdown && (
            <div className="prose prose-tokens prose-lg max-w-none mb-12 prose-a:no-underline hover:prose-a:underline prose-img:rounded-[18px]">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          )}
        </Fragment>
      ))}

      <CtaBand
        title={<Rich text={labels.closing.title} />}
        body={labels.closing.body}
        className="mt-16"
      />
    </article>
  );
}
