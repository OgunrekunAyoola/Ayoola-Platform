import Link from "next/link";
import Button from "@/components/ui/Button";
import HeroSection from "@/components/home/HeroSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <HeroSection />

      {/* Tracks Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal delay={0}>
            <Link
              href="/portfolio#systems"
              className="group block glass-card p-8 rounded-xl h-full"
            >
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                Client & Collaboration Work
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                AI-enhanced systems and websites I’ve built with clients and
                teams.
              </p>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <Link
              href="/portfolio#experiments"
              className="group block glass-card p-8 rounded-xl h-full"
            >
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                Products & Experiments
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                Personal projects, prototypes, and tools where I explore ideas.
              </p>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <Link
              href="/blog"
              className="group block glass-card p-8 rounded-xl h-full"
            >
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                Writing & Ideas
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                Essays and notes on technology, systems, and creativity.
              </p>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Proof Points Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal delay={0}>
            <div className="glass-card p-8 rounded-xl text-center h-full">
              <h3 className="text-4xl font-bold text-[var(--foreground)] mb-2">70%</h3>
              <p className="text-[var(--muted)] text-sm uppercase tracking-wider font-medium">
                Reduction in Ops Time
              </p>
              <p className="text-[var(--muted)]/80 text-sm mt-2">
                With custom booking automation
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="glass-card p-8 rounded-xl text-center h-full">
              <h3 className="text-4xl font-bold text-[var(--foreground)] mb-2">200+</h3>
              <p className="text-[var(--muted)] text-sm uppercase tracking-wider font-medium">
                Monthly Users
              </p>
              <p className="text-[var(--muted)]/80 text-sm mt-2">
                On shipped AI-powered tools
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="glass-card p-8 rounded-xl text-center h-full">
              <h3 className="text-4xl font-bold text-[var(--foreground)] mb-2">4 Weeks</h3>
              <p className="text-[var(--muted)] text-sm uppercase tracking-wider font-medium">
                Time to Launch
              </p>
              <p className="text-[var(--muted)]/80 text-sm mt-2">
                For full custom platforms
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="max-w-6xl mx-auto px-4 pb-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <ScrollReveal className="space-y-10">
            <div className="flex justify-between items-end border-b border-neutral-800 pb-6">
              <h2 className="text-4xl font-serif font-bold text-white tracking-tight">
                Featured Thoughts
              </h2>
              <Link
                href="/blog"
                className="text-yellow-500 hover:text-yellow-400 text-sm font-bold tracking-widest uppercase mb-1"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-8">
              <div className="group block glass-card p-10 rounded-2xl hover:bg-neutral-900/40 transition-all duration-300">
                <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-4 block">
                  Tech & Policy
                </span>
                <h3 className="text-2xl font-bold text-neutral-200 group-hover:text-yellow-500 transition-colors mb-4 font-serif leading-tight">
                  The Future of Digital Governance
                </h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Exploring how emerging technologies are reshaping the
                  landscape of policy and governance in the 21st century.
                </p>
              </div>
              <div className="group block glass-card p-10 rounded-2xl hover:bg-neutral-900/40 transition-all duration-300">
                <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-4 block">
                  Engineering
                </span>
                <h3 className="text-2xl font-bold text-neutral-200 group-hover:text-yellow-500 transition-colors mb-4 font-serif leading-tight">
                  Building Scalable Systems
                </h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Lessons learned from architecting high-performance
                  applications for thousands of users.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1} className="space-y-10">
            <div className="flex justify-between items-end border-b border-neutral-800 pb-6">
              <h2 className="text-4xl font-serif font-bold text-white tracking-tight">
                Selected Work
              </h2>
              <Link
                href="/portfolio"
                className="text-yellow-500 hover:text-yellow-400 text-sm font-bold tracking-widest uppercase mb-1"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-8">
              {/* Project 1: Platform/System */}
              <div className="group block glass-card p-10 rounded-2xl hover:bg-neutral-900/40 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-neutral-200 group-hover:text-yellow-500 transition-colors font-serif leading-tight">
                    Ayoola Platform
                  </h3>
                  <span className="text-xs font-bold bg-neutral-800/80 text-neutral-300 px-4 py-1.5 rounded-full border border-neutral-700 tracking-wider uppercase">
                    System
                  </span>
                </div>
                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                  A unified system for content management, portfolio showcasing,
                  and AI experimentation—built for my own digital operations.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs text-yellow-500/90 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                    Next.js
                  </span>
                  <span className="text-xs text-yellow-500/90 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                    TypeScript
                  </span>
                </div>
              </div>

              {/* Project 2: Client/Data */}
              <div className="group block glass-card p-8 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-neutral-200 group-hover:text-yellow-500 transition-colors font-serif">
                    E-Commerce Analytics
                  </h3>
                  <span className="text-xs font-bold bg-neutral-800/80 text-neutral-300 px-4 py-1.5 rounded-full border border-neutral-700 tracking-wider uppercase">
                    Data
                  </span>
                </div>
                <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                  Custom dashboard visualizing sales data and predicting
                  inventory needs using simple ML models.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
