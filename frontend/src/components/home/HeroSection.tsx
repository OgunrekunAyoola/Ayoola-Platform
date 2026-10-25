"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Rich from "@/components/ui/Rich";
import type { HomeContent } from "@/lib/site-content";

interface HeroSectionProps {
  hero: HomeContent["hero"];
  visual: React.ReactNode;
}

export default function HeroSection({ hero, visual }: HeroSectionProps) {
  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-12 sm:pt-16 pb-10 grid gap-12 lg:gap-14 items-center lg:grid-cols-2">
      <motion.div
        className="flex flex-col"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div
          variants={fadeUp}
          className="eyebrow flex items-center gap-2.5 mb-6 sm:mb-7"
        >
          <span className="w-[7px] h-[7px] rounded-full bg-[var(--accent)] shrink-0" />
          {hero.eyebrow}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-balance text-[clamp(46px,6.6vw,92px)] leading-[1.02] tracking-[-0.03em] mb-7 sm:mb-[30px]"
        >
          <Rich text={hero.title} />
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-[17.5px] sm:text-[19px] leading-[1.6] text-[var(--muted)] max-w-[540px] mb-9 sm:mb-11"
        >
          {hero.sub}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3.5 mb-[30px]">
          <Link href={hero.primary.href} className="btn btn-primary btn-lg">
            {hero.primary.label} <span aria-hidden="true">→</span>
          </Link>
          <Link href={hero.secondary.href} className="btn btn-secondary btn-lg">
            {hero.secondary.label}
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="font-mono text-[13px] text-[var(--muted)]">
          {hero.footnote}
        </motion.div>
      </motion.div>

      {visual}
    </section>
  );
}
