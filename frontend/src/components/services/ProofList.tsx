import Link from "next/link";
import { getWorkBySlug } from "@/lib/content";

interface ProofListProps {
  title: string;
  items: { slug: string; note: string }[];
  /** One card per row, for a half-width column. */
  stacked?: boolean;
}

/**
 * Case studies cited as proof for a service: title, honest status line and a
 * one-line note. A slug that doesn't resolve to a published case study is
 * skipped (and fails the content tests).
 */
export default function ProofList({ title, items, stacked = false }: ProofListProps) {
  const entries = items.flatMap((item) => {
    const project = getWorkBySlug(item.slug);
    return project ? [{ ...item, project }] : [];
  });
  if (entries.length === 0) return null;

  return (
    <div>
      <h3 className="label m-0 mb-[18px]">{title}</h3>
      <ul
        className={`list-none m-0 p-0 grid gap-3 ${
          stacked ? "grid-cols-1" : "[grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]"
        }`}
      >
        {entries.map(({ slug, note, project }) => (
          <li key={slug} className="flex">
            <Link
              href={`/portfolio/${slug}`}
              className="group no-underline text-[var(--foreground)] flex-1 flex flex-col gap-3 rounded-[22px] border border-[var(--card-border)] bg-[var(--card)] p-[clamp(22px,2.4vw,30px)] transition-colors duration-300 hover:border-[var(--accent)]"
            >
              <span className="display text-[clamp(19px,1.6vw,22px)] leading-[1.15]">{project.title}</span>
              <span className="text-[15px] leading-[1.55] text-[var(--muted)] flex-1">{note}</span>
              <span className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11.5px] text-[var(--accent)] border border-[var(--accent)] rounded-full px-[11px] py-1.5">
                  {project.status}
                </span>
                <span aria-hidden="true" className="arrow text-[18px] text-[var(--accent)]">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
