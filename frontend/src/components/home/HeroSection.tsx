"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import RunLog from "@/components/home/RunLog";

export default function HeroSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 lg:pt-20 pb-16">
      <div className="grid grid-cols-1 lg:[grid-template-columns:1.05fr_0.95fr] gap-12 items-center">
        {/* Copy */}
        <motion.div
          className="text-center lg:text-left"
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
            AI Systems Engineer · Lagos → remote worldwide
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif font-extrabold tracking-tight leading-[1.03] text-[clamp(40px,5.4vw,68px)] text-[var(--foreground)] mb-6"
          >
            AI that{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[#f59e0b]">
              holds up
            </span>{" "}
            in production.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[18.5px] text-[var(--muted)] max-w-[540px] mx-auto lg:mx-0 leading-[1.65] mb-[34px]"
          >
            I design, build and run AI systems on AWS: multi-agent workflows,
            LLM pipelines, and the infrastructure underneath, with the controls
            that let real teams rely on them.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-3.5 justify-center lg:justify-start mb-[30px]"
          >
            <Link href="/portfolio" className="btn btn-primary">
              See the work
              <ArrowRight className="w-[17px] h-[17px]" />
            </Link>
            <Link href="/work-with-me" className="btn btn-secondary">
              Work with me
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="font-mono text-[13px] text-[var(--muted)]"
          >
            {"// WAT (UTC+1) · full overlap with UK & EU · mornings for US East"}
          </motion.div>
        </motion.div>

        {/* Run log — desktop only so it never pushes the hero copy down */}
        <div className="hidden lg:flex relative items-center justify-center">
          <div
            className="absolute -inset-3 rounded-[34px] anim-glow pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, var(--glow), transparent 70%)",
              filter: "blur(46px)",
            }}
          />
          <div className="relative z-[1] w-full flex justify-center">
            <RunLog />
          </div>
        </div>
      </div>
    </section>
  );
}
