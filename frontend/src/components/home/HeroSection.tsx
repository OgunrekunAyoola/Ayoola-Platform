"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Code, FileText, TrendingUp } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 lg:py-20 px-4 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left Column: Copy */}
        <motion.div
          className="space-y-8 text-center lg:text-left order-2 lg:order-1"
          variants={{
            hidden: { opacity: 1 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} custom={0}>
            <p className="text-[var(--accent)] font-medium tracking-widest uppercase mb-4 text-sm md:text-base">
              Ayoola Ogunrekun
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1] mb-6">
              Architecting Intelligent <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-yellow-200">
                Digital Systems
              </span>
            </h1>
          </motion.div>

          <motion.div variants={fadeUp} custom={1}>
            <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              I combine software engineering, AI integration, and technical
              writing to build scalable platforms and automate complex
              workflows.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6"
            variants={fadeUp}
            custom={2}
          >
            <Link href="/portfolio">
              <Button
                variant="primary"
                className="w-full sm:w-auto text-base md:text-lg py-3.5 px-8"
              >
                View Systems
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="secondary"
                className="w-full sm:w-auto text-base md:text-lg py-3.5 px-8"
              >
                Start a Project
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} custom={3}>
            <p className="text-sm text-[var(--muted)] font-mono uppercase tracking-wider mt-8 opacity-70">
              Full-stack engineer · Lagos → Global
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column: System Cards (Abstract Visuals) */}
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full flex items-center justify-center lg:block order-1 lg:order-2">
          {/* Card 1: Code (Back) */}
          <motion.div
            className="absolute lg:top-0 lg:right-10 w-60 sm:w-72 h-64 sm:h-80 glass-card rounded-2xl p-6 z-10 transform scale-90 lg:scale-100 top-0 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto"
            initial={{ opacity: 0, y: 40, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -10, rotate: -4, transition: { duration: 0.3 } }}
          >
            <div className="h-full flex flex-col justify-between">
              <Code className="w-10 h-10 text-blue-500" />
              <div className="space-y-3">
                <div className="h-2 w-full bg-[var(--muted)]/10 rounded-full" />
                <div className="h-2 w-3/4 bg-[var(--muted)]/10 rounded-full" />
                <div className="h-2 w-1/2 bg-[var(--muted)]/10 rounded-full" />
              </div>
              <span className="text-xs font-mono text-blue-500">
                /systems/core
              </span>
            </div>
          </motion.div>

          {/* Card 2: Content (Middle) */}
          <motion.div
            className="absolute lg:top-16 lg:right-32 w-60 sm:w-72 h-64 sm:h-80 glass-card rounded-2xl p-6 z-20 backdrop-blur-xl transform scale-95 lg:scale-100 top-4 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto"
            initial={{ opacity: 0, y: 40, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -10, rotate: 1, transition: { duration: 0.3 } }}
          >
            <div className="h-full flex flex-col justify-between">
              <FileText className="w-10 h-10 text-[var(--accent)]" />
              <div className="space-y-4">
                <div className="h-20 w-full bg-[var(--muted)]/5 rounded-lg border border-[var(--card-border)]" />
                <div className="space-y-2">
                  <div className="h-2 w-full bg-[var(--muted)]/10 rounded-full" />
                  <div className="h-2 w-5/6 bg-[var(--muted)]/10 rounded-full" />
                </div>
              </div>
              <span className="text-xs font-mono text-[var(--accent)]">
                /content/generate
              </span>
            </div>
          </motion.div>

          {/* Card 3: Growth (Front) */}
          <motion.div
            className="absolute lg:top-32 lg:right-52 w-60 sm:w-72 h-64 sm:h-80 glass-card rounded-2xl p-6 z-30 backdrop-blur-xl top-8 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto"
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ y: -10, rotate: -1, transition: { duration: 0.3 } }}
          >
            <div className="h-full flex flex-col justify-between">
              <TrendingUp className="w-10 h-10 text-green-500" />
              <div className="flex items-end gap-2 h-20 px-2">
                <div className="w-1/4 h-1/3 bg-[var(--muted)]/10 rounded-t" />
                <div className="w-1/4 h-1/2 bg-[var(--muted)]/10 rounded-t" />
                <div className="w-1/4 h-3/4 bg-[var(--muted)]/10 rounded-t" />
                <div className="w-1/4 h-full bg-green-500/20 rounded-t" />
              </div>
              <span className="text-xs font-mono text-green-500">
                /metrics/scale
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
