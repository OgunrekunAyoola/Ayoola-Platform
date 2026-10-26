import { getAllWork } from "@/lib/content";
import { getWorkPage } from "@/lib/site-content";
import WorkCard from "@/components/portfolio/WorkCard";
import Rich from "@/components/ui/Rich";

export const generateMetadata = () => getWorkPage().meta;

export default function PortfolioPage() {
  const page = getWorkPage();
  const projects = getAllWork();
  const { alsoBuilt } = page;

  return (
    <section className="wrap pt-[clamp(56px,7vw,96px)] pb-[clamp(72px,9vw,120px)]">
      <div className="eyebrow mb-6">{page.eyebrow}</div>
      <h1 className="text-[clamp(37px,5.15vw,81px)] leading-[1.02] m-0 mb-6">
        <Rich text={page.title} />
      </h1>
      <p className="text-[18px] leading-[1.6] text-[var(--muted)] max-w-[600px] m-0 mb-16">{page.sub}</p>

      {projects.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-[var(--placeholder)] bg-[var(--card)] flex flex-col items-start justify-center gap-[18px] p-[clamp(32px,5vw,64px)] min-h-[280px]">
          <span className="font-mono text-[12.5px] text-[var(--muted)]">{page.empty.label}</span>
          <p className="display text-[clamp(20px,2.34vw,31px)] leading-[1.2] m-0 max-w-[24ch]">{page.empty.body}</p>
        </div>
      ) : (
        <div data-reveal className="flex flex-col gap-3">
          {projects.map((project, i) => (
            <WorkCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      )}

      {alsoBuilt.items.length > 0 && (
        <section data-reveal className="pt-[clamp(72px,9vw,120px)]">
          <h2 className="h-section mb-[clamp(20px,2.5vw,32px)]">
            <Rich text={alsoBuilt.title} />
          </h2>
          <ul className="list-none m-0 p-0 flex flex-col border-b border-[var(--hair-strong)]">
            {alsoBuilt.items.map((item, i) => {
              const row = (
                <>
                  <span className="font-mono text-[12.5px] text-[var(--accent)] pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-1.5">
                    <span className="display text-[clamp(20px,1.87vw,27px)] leading-[1.15]">{item.title}</span>
                    <span className="font-mono text-[12px] text-[var(--muted)]">
                      {item.descriptor} · {item.year}
                    </span>
                  </span>
                  <span className="text-[15.5px] leading-[1.55] text-[var(--muted)] max-w-[52ch]">{item.body}</span>
                </>
              );
              const cls =
                "grid [grid-template-columns:clamp(36px,4vw,64px)_minmax(0,1fr)] md:[grid-template-columns:clamp(36px,4vw,64px)_minmax(0,1fr)_minmax(0,1.5fr)] gap-x-[clamp(16px,2.5vw,40px)] gap-y-2 py-[clamp(20px,2.4vw,30px)] px-[clamp(4px,1vw,16px)] border-t border-[var(--hair-strong)] [&>*:last-child]:col-start-2 md:[&>*:last-child]:col-start-auto";
              return (
                <li key={item.title}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cls} no-underline text-[var(--foreground)] transition-[background-color,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-[var(--row-hover)] hover:translate-x-1.5`}
                    >
                      {row}
                    </a>
                  ) : (
                    <div className={cls}>{row}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </section>
  );
}
