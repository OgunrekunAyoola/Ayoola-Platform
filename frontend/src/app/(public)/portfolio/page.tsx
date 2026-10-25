import { getAllWork } from "@/lib/content";
import { getWorkPage } from "@/lib/site-content";
import ProjectCard from "@/components/portfolio/ProjectCard";
import Rich from "@/components/ui/Rich";

export const generateMetadata = () => getWorkPage().meta;

export default function PortfolioPage() {
  const page = getWorkPage();
  const projects = getAllWork();
  const { alsoBuilt } = page;

  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24 sm:pb-[110px]">
      <div className="eyebrow mb-6">{page.eyebrow}</div>
      <h1 className="text-[clamp(44px,6vw,84px)] leading-[1.02] tracking-[-0.03em] mb-6">
        <Rich text={page.title} />
      </h1>
      <p className="text-[17.5px] sm:text-[19px] leading-[1.6] text-[var(--muted)] max-w-[600px] mb-12 sm:mb-16">
        {page.sub}
      </p>

      {projects.length === 0 ? (
        <div className="rounded-[28px] bg-[var(--surface)] grid [grid-template-columns:10%_1fr] overflow-hidden min-h-[240px] sm:min-h-[280px]">
          <div className="bg-[var(--tint-blue)]" />
          <div className="flex flex-col items-start justify-center gap-[18px] p-7 sm:p-14">
            <span className="font-mono text-[12.5px] text-[var(--muted)]">{page.empty.label}</span>
            <p className="font-serif font-medium text-[26px] sm:text-[32px] leading-[1.2] max-w-[22ch]">
              {page.empty.body}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}

      {alsoBuilt.items.length > 0 && (
        <section className="mt-24 sm:mt-[110px]">
          <h2 className="text-[clamp(30px,3.6vw,46px)] leading-[1.1] tracking-[-0.02em] mb-8 sm:mb-10">
            <Rich text={alsoBuilt.title} />
          </h2>
          <ul className="border-b border-[var(--hair)]">
            {alsoBuilt.items.map((item) => (
              <li
                key={item.title}
                className="grid gap-x-10 gap-y-2.5 py-6 sm:py-7 border-t border-[var(--hair)] md:[grid-template-columns:minmax(0,1fr)_minmax(0,1.7fr)]"
              >
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[22px] sm:text-[24px] leading-[1.25]">
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="lk">
                        {item.title} ↗
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <span className="font-mono text-[12px] text-[var(--muted)]">
                    {item.descriptor} · {item.year}
                  </span>
                </div>
                <p className="text-[16px] leading-[1.6] text-[var(--muted)]">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
