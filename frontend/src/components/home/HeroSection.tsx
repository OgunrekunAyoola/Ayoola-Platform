"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Terminal, ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import FramedPortrait from "@/components/ui/FramedPortrait";

export default function HeroSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 lg:pt-20 pb-16">
      <div className="grid grid-cols-1 lg:[grid-template-columns:1.05fr_0.95fr] gap-12 items-center">
        {/* Copy */}
        <motion.div
          className="order-2 lg:order-1 text-center lg:text-left"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] anim-blink" />
            Ayoola Ogunrekun
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif font-extrabold tracking-tight leading-[1.03] text-[clamp(40px,5.4vw,68px)] text-[var(--foreground)] mb-6"
          >
            I build intelligent{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[#f59e0b]">
              systems
            </span>{" "}
            that ship — and keep shipping.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[18.5px] text-[var(--muted)] max-w-[540px] mx-auto lg:mx-0 leading-[1.65] mb-[34px]"
          >
            Software engineer, writer, and operator. I design resilient
            platforms, weave in AI where it earns its place, and write about what
            I learn along the way.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-3.5 justify-center lg:justify-start mb-[30px]"
          >
            <Link href="/portfolio" className="btn btn-primary">
              View systems
              <ArrowRight className="w-[17px] h-[17px]" />
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Start a project
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="font-mono text-[13px] text-[var(--muted)]"
          >
            {"// available for select engagements · 2026"}
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <div className="order-1 lg:order-2 relative flex items-center justify-center min-h-[420px] lg:min-h-[520px]">
          {/* glow */}
          <div
            className="absolute -inset-3 rounded-[34px] anim-glow pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, var(--glow), transparent 70%)",
              filter: "blur(46px)",
            }}
          />

          {/* ambient signal chips */}
          <div className="glass anim-floaty absolute top-4 -left-1.5 z-[1] rounded-[13px] px-3.5 py-2.5 hidden lg:flex items-center gap-2.5 opacity-95">
            <Code className="w-[18px] h-[18px] text-[var(--accent)]" />
            <span className="font-mono text-[12.5px] text-[var(--foreground)]">
              /systems/core
            </span>
          </div>
          <div className="glass anim-floaty-b absolute top-28 -right-0.5 z-[1] rounded-xl w-[46px] h-[46px] hidden lg:flex items-center justify-center text-[var(--accent)]">
            <Terminal className="w-5 h-5" />
          </div>

          {/* framed portrait */}
          <FramedPortrait
            priority
            float
            className="relative z-[2] w-[min(420px,82vw)] aspect-[4/5]"
          />
        </div>
      </div>
    </section>
  );
}
