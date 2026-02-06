import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="py-24 md:py-32 text-center max-w-5xl mx-auto px-4 animate-fade-in-up">
        <p className="text-yellow-500 font-medium tracking-widest uppercase mb-6 text-sm md:text-base">
          Ayoola Ogunrekun
        </p>
        <h1 className="text-4xl md:text-7xl font-serif font-bold mb-8 tracking-tight text-white leading-tight">
          I build AI-enhanced web systems and tools.
        </h1>
        <p className="text-xl md:text-2xl text-neutral-300 mb-6 max-w-3xl mx-auto leading-relaxed font-light">
          I use AI, code, and writing to automate work, prototype new products,
          and tell clear stories—for myself and for teams I collaborate with.
        </p>
        <p className="text-lg text-neutral-500 mb-12 max-w-2xl mx-auto font-mono text-sm uppercase tracking-wider">
          Full-stack engineer · Lagos → Global · Available for select projects
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/portfolio#systems">
            <Button
              variant="primary"
              className="w-full sm:w-auto text-lg py-4 px-10"
            >
              View Systems
            </Button>
          </Link>
          <Link href="/services">
            <Button
              variant="secondary"
              className="w-full sm:w-auto text-lg py-4 px-10 border-neutral-700 hover:border-yellow-500"
            >
              Hire Me
            </Button>
          </Link>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="/portfolio#systems"
            className="group block bg-neutral-900/30 border border-neutral-800 p-8 rounded-xl hover:bg-neutral-900/50 transition-all duration-300 hover:border-yellow-500/50"
          >
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors">
              Client & Collaboration Work
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              AI-enhanced systems and websites I’ve built with clients and
              teams.
            </p>
          </Link>

          <Link
            href="/portfolio#experiments"
            className="group block bg-neutral-900/30 border border-neutral-800 p-8 rounded-xl hover:bg-neutral-900/50 transition-all duration-300 hover:border-yellow-500/50"
          >
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors">
              Products & Experiments
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Personal projects, prototypes, and tools where I explore ideas.
            </p>
          </Link>

          <Link
            href="/blog"
            className="group block bg-neutral-900/30 border border-neutral-800 p-8 rounded-xl hover:bg-neutral-900/50 transition-all duration-300 hover:border-yellow-500/50"
          >
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors">
              Writing & Ideas
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Essays and notes on technology, systems, and creativity.
            </p>
          </Link>
        </div>
      </section>

      {/* Proof Points Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-900/30 border border-neutral-800 p-8 rounded-xl text-center">
            <h3 className="text-4xl font-bold text-white mb-2">70%</h3>
            <p className="text-neutral-400 text-sm uppercase tracking-wider font-medium">
              Reduction in Ops Time
            </p>
            <p className="text-neutral-500 text-sm mt-2">
              With custom booking automation
            </p>
          </div>
          <div className="bg-neutral-900/30 border border-neutral-800 p-8 rounded-xl text-center">
            <h3 className="text-4xl font-bold text-white mb-2">200+</h3>
            <p className="text-neutral-400 text-sm uppercase tracking-wider font-medium">
              Monthly Users
            </p>
            <p className="text-neutral-500 text-sm mt-2">
              On shipped AI-powered tools
            </p>
          </div>
          <div className="bg-neutral-900/30 border border-neutral-800 p-8 rounded-xl text-center">
            <h3 className="text-4xl font-bold text-white mb-2">4 Weeks</h3>
            <p className="text-neutral-400 text-sm uppercase tracking-wider font-medium">
              Time to Launch
            </p>
            <p className="text-neutral-500 text-sm mt-2">
              For full custom platforms
            </p>
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto px-4 pb-32 animate-fade-in-up [animation-delay:200ms]">
        <div className="space-y-10">
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
                Exploring how emerging technologies are reshaping the landscape
                of policy and governance in the 21st century.
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
                Lessons learned from architecting high-performance applications
                for thousands of users.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-10">
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
                <span className="text-xs font-medium bg-neutral-800/80 text-neutral-300 px-3 py-1 rounded-full border border-neutral-700">
                  Data
                </span>
              </div>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                A real-time data visualization engine for monitoring sales
                performance and user behavior—built for an e-commerce startup.
              </p>
              <div className="flex gap-2">
                <span className="text-xs text-yellow-500/90 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                  React
                </span>
                <span className="text-xs text-yellow-500/90 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                  D3.js
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
