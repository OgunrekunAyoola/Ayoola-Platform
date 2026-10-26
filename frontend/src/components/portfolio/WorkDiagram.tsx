import type { WorkDiagram as Diagram } from "@/lib/content";
import type { WorkContent } from "@/lib/site-content";

interface WorkDiagramProps {
  title: string;
  markers: WorkContent["caseStudy"]["markers"];
  diagram: Diagram;
}

const markerClass = {
  human: "bg-[var(--accent)] text-[var(--on-accent)]",
  model: "bg-[var(--tint)] text-[var(--foreground)]",
} as const;

/**
 * Architecture flow for a case study, drawn as a numbered vertical pipeline so
 * it reads the same at phone width and inside the 760px article column.
 */
export default function WorkDiagram({ title, markers, diagram }: WorkDiagramProps) {
  const last = diagram.stages.length - 1;

  return (
    <figure className="m-0 mb-12 rounded-[22px] border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-8">
      <div className="label mb-6">{title}</div>
      <ol className="list-none m-0 p-0 flex flex-col">
        {diagram.stages.map((stage, i) => (
          <li
            key={stage.label}
            className="relative grid [grid-template-columns:28px_minmax(0,1fr)] gap-x-4 pb-6 last:pb-0"
          >
            {i < last && (
              <span
                aria-hidden="true"
                className="absolute left-[13.5px] top-8 bottom-1 w-px bg-[var(--hair-strong)]"
              />
            )}
            <span className="w-7 h-7 rounded-full border border-[var(--foreground)] bg-[var(--background)] font-mono text-[11.5px] flex items-center justify-center">
              {i + 1}
            </span>
            <div className="flex flex-col gap-2.5 pt-0.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="display text-[19px] leading-[1.3]">{stage.label}</span>
                {stage.marker && (
                  <span className={`${markerClass[stage.marker]} rounded-full px-2.5 py-1 font-mono text-[11px]`}>
                    {markers[stage.marker]}
                  </span>
                )}
              </div>
              <ul className="list-none m-0 p-0 flex flex-wrap gap-2">
                {stage.nodes.map((node) => (
                  <li
                    key={node}
                    className="font-mono text-[11.5px] text-[var(--body)] rounded-full border border-[var(--chip-border)] px-[11px] py-1.5"
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
