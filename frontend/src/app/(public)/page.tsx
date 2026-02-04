import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="py-32 text-center max-w-4xl mx-auto px-4 animate-fade-in-up">
        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 tracking-tight text-white leading-tight">
          Ayoola Ogunrekun
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Writer, Software Engineer, Expert, Entrepreneur, Creator.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/portfolio">
            <Button
              variant="primary"
              className="w-full sm:w-auto text-lg py-4 px-10"
            >
              View Portfolio
            </Button>
          </Link>
          <Link href="/blog">
            <Button
              variant="secondary"
              className="w-full sm:w-auto text-lg py-4 px-10"
            >
              Read the Blog
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="secondary"
              className="w-full sm:w-auto text-lg py-4 px-10 border-neutral-700 hover:border-yellow-500"
            >
              Work With Me
            </Button>
          </Link>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto px-4 pb-24 animate-fade-in-up [animation-delay:200ms]">
        <div className="space-y-8">
          <div className="flex justify-between items-end border-b border-neutral-800 pb-4">
            <h2 className="text-3xl font-serif font-bold text-white">Featured Thoughts</h2>
            <Link
              href="/blog"
              className="text-yellow-500 hover:text-yellow-400 text-sm font-medium tracking-wide"
            >
              VIEW ALL →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="group block glass-card p-8 rounded-xl">
              <span className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-3 block">
                Tech & Policy
              </span>
              <h3 className="text-xl font-bold text-neutral-200 group-hover:text-yellow-500 transition-colors mb-3 font-serif">
                The Future of Digital Governance
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Exploring how emerging technologies are reshaping the landscape
                of policy and governance in the 21st century.
              </p>
            </div>
            <div className="group block glass-card p-8 rounded-xl">
              <span className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-3 block">
                Engineering
              </span>
              <h3 className="text-xl font-bold text-neutral-200 group-hover:text-yellow-500 transition-colors mb-3 font-serif">
                Building Scalable Systems
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Lessons learned from architecting high-performance applications
                for thousands of users.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-end border-b border-neutral-800 pb-4">
            <h2 className="text-3xl font-serif font-bold text-white">Selected Work</h2>
            <Link
              href="/portfolio"
              className="text-yellow-500 hover:text-yellow-400 text-sm font-medium tracking-wide"
            >
              VIEW ALL →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="group block glass-card p-8 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-neutral-200 group-hover:text-yellow-500 transition-colors font-serif">
                  Ayoola Platform
                </h3>
                <span className="text-xs font-medium bg-neutral-800/80 text-neutral-300 px-3 py-1 rounded-full border border-neutral-700">
                  Full Stack
                </span>
              </div>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                A modern, high-performance personal platform built with Next.js,
                Node.js, and MongoDB.
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
                Real-time dashboard for tracking sales performance and user
                behavior metrics.
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
