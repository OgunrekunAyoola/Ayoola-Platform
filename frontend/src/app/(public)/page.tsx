import Link from "next/link";
import { ArrowRight, Layers, Wrench, FlaskConical } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  fetchPosts,
  fetchProjects,
  type Post,
  type Project,
} from "@/lib/api-client";

export const dynamic = "force-dynamic";

const STACK = ["Next.js", "TypeScript", "Node", "AI / LLMs", "PostgreSQL"];

const categoryIcon = (category: Project["category"]) => {
  if (category === "systems") return Layers;
  if (category === "tools") return Wrench;
  return FlaskConical;
};

export default async function Home() {
  let featured: Post[] = [];
  let work: Project[] = [];

  try {
    const res = await fetchPosts(1, 3);
    featured = res.data;
  } catch {
    featured = [];
  }

  try {
    const projects = await fetchProjects();
    work = (projects.filter((p) => p.isFeatured).length
      ? projects.filter((p) => p.isFeatured)
      : projects
    ).slice(0, 3);
  } catch {
    work = [];
  }

  return (
    <div>
      <HeroSection />

      {/* Building-with strip */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-7">
        <ScrollReveal className="glass rounded-2xl px-7 py-[22px] flex flex-wrap gap-x-11 gap-y-[18px] items-center justify-between">
          <span className="font-mono text-xs tracking-[0.1em] uppercase text-[var(--muted)]">
            Building with
          </span>
          <div className="flex flex-wrap gap-x-9 gap-y-3.5 items-center">
            {STACK.map((item) => (
              <span
                key={item}
                className="font-serif font-bold text-[19px] text-[var(--foreground)] opacity-[0.78]"
              >
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Thoughts */}
      {featured.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-14">
          <ScrollReveal className="flex items-end justify-between gap-5 mb-[34px]">
            <div>
              <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-2.5">
                Featured thoughts
              </div>
              <h2 className="font-serif font-bold tracking-tight text-[clamp(28px,3.4vw,40px)] text-[var(--foreground)]">
                Writing on systems &amp; craft
              </h2>
            </div>
            <Link href="/blog" className="btn btn-ghost shrink-0">
              All writing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {featured.map((post, i) => (
              <ScrollReveal key={post._id} delay={i}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="glass glass-i group flex flex-col gap-3.5 rounded-2xl p-6 min-h-[210px] h-full"
                >
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--accent)]">
                    {post.tags?.[0] ?? "Writing"}
                  </span>
                  <h3 className="font-serif font-semibold text-[21px] leading-[1.2] tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[14.5px] text-[var(--muted)] leading-[1.55] flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    {post.readingTime} min read
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Selected Work */}
      {work.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-5 sm:px-7 py-14 pb-24">
          <ScrollReveal className="flex items-end justify-between gap-5 mb-[34px]">
            <div>
              <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-2.5">
                Selected work
              </div>
              <h2 className="font-serif font-bold tracking-tight text-[clamp(28px,3.4vw,40px)] text-[var(--foreground)]">
                Systems I&apos;ve shipped
              </h2>
            </div>
            <Link href="/portfolio" className="btn btn-ghost shrink-0">
              Full portfolio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {work.map((proj, i) => {
              const Icon = categoryIcon(proj.category);
              return (
                <ScrollReveal key={proj._id} delay={i}>
                  <Link
                    href={`/portfolio/${proj.slug}`}
                    className="glass glass-i group flex flex-col rounded-[18px] overflow-hidden h-full"
                  >
                    <div className="h-[148px] relative border-b border-[var(--hair)] overflow-hidden bg-[linear-gradient(150deg,var(--accent-soft),transparent)]">
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          backgroundImage:
                            "linear-gradient(var(--hair) 1px, transparent 1px), linear-gradient(90deg, var(--hair) 1px, transparent 1px)",
                          backgroundSize: "22px 22px",
                        }}
                      />
                      <Icon className="absolute left-5 top-5 w-[26px] h-[26px] text-[var(--accent)]" />
                      <span className="absolute right-4 bottom-3.5 font-mono text-[11px] text-[var(--muted)]">
                        {proj.techStack?.slice(0, 2).join(" · ")}
                      </span>
                    </div>
                    <div className="p-[22px] flex flex-col gap-2.5 flex-1">
                      <div className="flex items-center justify-between gap-2.5">
                        <h3 className="font-serif font-semibold text-[20px] tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                          {proj.title}
                        </h3>
                        <span className="font-mono text-[11px] text-[var(--accent)] border border-[var(--accent-line)] rounded-full px-2.5 py-[3px]">
                          {new Date(proj.createdAt).getFullYear()}
                        </span>
                      </div>
                      <p className="text-[14.5px] text-[var(--muted)] leading-[1.55] line-clamp-3">
                        {proj.summary}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
