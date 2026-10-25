import type { WorkDiagram as Diagram } from "@/lib/content";
import type { WorkContent } from "@/lib/site-content";

interface WorkDiagramProps {
  title: string;
  markers: WorkContent["caseStudy"]["markers"];
  diagram: Diagram;
}

const markerClass = {
  human: "bg-[var(--gate)]",
  model: "bg-[var(--tint-blue)]",
} as const;

/**
 * Architecture flow for a case study, drawn as a numbered vertical pipeline so
 * it reads the same at phone width and inside the 760px article column.
 */
export default function WorkDiagram({ title, markers, diagram }: WorkDiagramProps) {
  const last = diagram.stages.length - 1;

  return (
    <figure className="m-0 mb-12 rounded-[22px] bg-[var(--surface)] p-6 sm:p-8">
      <div className="font-mono text-[12px] tracking-[0.1em] uppercase text-[var(--muted)] mb-6">
        {title}
      </div>
      <ol className="flex flex-col">
        {diagram.stages.map((stage, i) => (
          <li
            key={stage.label}
            className="relative grid [grid-template-columns:28px_minmax(0,1fr)] gap-x-4 pb-6 last:pb-0"
          >
            {i < last && (
              <span
                aria-hidden="true"
                className="absolute left-[13.5px] top-8 bottom-1 w-px bg-[var(--foreground)] opacity-25"
              />
            )}
            <span className="w-7 h-7 rounded-full border-[1.5px] border-[var(--foreground)] bg-[var(--background)] font-mono text-[11.5px] flex items-center justify-center">
              {i + 1}
            </span>
            <div className="flex flex-col gap-2.5 pt-0.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-serif text-[19px] leading-[1.3]">{stage.label}</span>
                {stage.marker && (
                  <span
                    className={`${markerClass[stage.marker]} rounded-full px-2.5 py-1 font-mono text-[11px] text-[var(--foreground)]`}
                  >
                    {markers[stage.marker]}
                  </span>
                )}
              </div>
              <ul className="flex flex-wrap gap-2">
                {stage.nodes.map((node) => (
                  <li
                    key={node}
                    className="font-mono text-[12px] rounded-full bg-[var(--card)] border border-[var(--hair)] px-3 py-1.5"
                  >
                    {node}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 pt-4 border-t border-[var(--hair)] text-[14.5px] leading-[1.55] text-[var(--muted)]">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}
