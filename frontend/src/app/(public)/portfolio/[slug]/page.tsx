import { Fragment } from "react";
import { getAllWork, getWorkBySlug } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import ShareButton from "@/components/ui/ShareButton";
import ClosingRow from "@/components/ui/ClosingRow";
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
    <article className="max-w-[808px] mx-auto px-6 pt-[clamp(48px,6vw,72px)] pb-[clamp(72px,9vw,120px)]">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-[15px] no-underline text-[var(--foreground)] hover:text-[var(--accent)] transition-colors mb-10"
      >
        {labels.back}
      </Link>

      <header className="mb-10 pb-10 border-b border-[var(--hair)]">
        <div className="eyebrow mb-[18px]">{labels.eyebrow}</div>
        <h1 className="text-[clamp(31px,4.21vw,53px)] leading-[1.06] m-0 mb-7">{project.title}</h1>

        <p className="text-[18px] sm:text-[19px] leading-[1.6] text-[var(--muted)] m-0 mb-9">{project.summary}</p>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5 m-0 mb-8">
          {meta.map((m) => (
            <div key={m.label} className="border-t border-[var(--hair)] pt-3.5">
              <dt className="label text-[11.5px] mb-1.5">{m.label}</dt>
              <dd className="display m-0 text-[18px] leading-[1.3]">{m.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="list-none m-0 mb-8 p-0 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="font-mono text-[11.5px] text-[var(--body)] border border-[var(--chip-border)] rounded-full px-[11px] py-1.5"
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
        <dl className="grid gap-px bg-[var(--hair)] border-y border-[var(--hair)] m-0 mb-12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,160px),1fr))]">
          {project.facts.map((fact) => (
            <div
              key={fact.label}
              className="bg-[var(--background)] py-5 pr-4 flex flex-col-reverse justify-end gap-2"
            >
              <dt className="text-[14.5px] leading-[1.45] text-[var(--muted)]">{fact.label}</dt>
              <dd className="display m-0 text-[clamp(27px,2.6vw,36px)] leading-none text-[var(--accent)]">
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

      <ClosingRow title={labels.closing.title} body={labels.closing.body} className="mt-16" />
    </article>
  );
}
