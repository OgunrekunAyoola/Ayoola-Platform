"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Code, FileText, TrendingUp } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center py-20 px-4 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Copy */}
        <motion.div 
          className="space-y-8 text-center lg:text-left"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} custom={0}>
            <p className="text-[var(--accent)] font-medium tracking-widest uppercase mb-4 text-sm md:text-base">
              Ayoola Ogunrekun
            </p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1] mb-6">
              I build AI-enhanced <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-yellow-200">
                web systems
              </span>
            </h1>
          </motion.div>

          <motion.div variants={fadeUp} custom={1}>
            <p className="text-xl text-[var(--muted)] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              I use AI, code, and writing to automate work, prototype new products,
              and tell clear stories—for myself and for teams I collaborate with.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            variants={fadeUp} 
            custom={2}
          >
            <Link href="/portfolio#systems">
              <Button
                variant="primary"
                className="w-full sm:w-auto text-lg py-4 px-8 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
              >
                View Systems
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="secondary"
                className="w-full sm:w-auto text-lg py-4 px-8"
              >
                Hire Me
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
        <div className="relative h-[500px] w-full hidden lg:block">
          {/* Card 1: Code (Back) */}
          <motion.div
            className="absolute top-0 right-10 w-72 h-80 glass-card rounded-2xl p-6 border border-white/10 dark:border-white/5 z-10"
            initial={{ opacity: 0, y: 40, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -10, rotate: -4, transition: { duration: 0.3 } }}
          >
            <div className="h-full flex flex-col justify-between">
              <Code className="w-10 h-10 text-blue-400" />
              <div className="space-y-3">
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                <div className="h-2 w-1/2 bg-white/10 rounded-full" />
              </div>
              <span className="text-xs font-mono text-blue-400">/systems/core</span>
            </div>
          </motion.div>

          {/* Card 2: Content (Middle) */}
          <motion.div
            className="absolute top-16 right-32 w-72 h-80 glass-card rounded-2xl p-6 border border-white/10 dark:border-white/5 z-20 bg-black/40 dark:bg-black/60 backdrop-blur-xl"
            initial={{ opacity: 0, y: 40, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -10, rotate: 1, transition: { duration: 0.3 } }}
          >
            <div className="h-full flex flex-col justify-between">
              <FileText className="w-10 h-10 text-emerald-400" />
              <div className="space-y-4">
                 <div className="h-24 w-full bg-gradient-to-b from-white/5 to-transparent rounded-lg border border-white/5" />
              </div>
              <span className="text-xs font-mono text-emerald-400">/content/strategy</span>
            </div>
          </motion.div>

          {/* Card 3: Capital/Growth (Front) */}
          <motion.div
            className="absolute top-32 right-52 w-72 h-80 glass-card rounded-2xl p-6 border border-[var(--accent)]/30 z-30 shadow-2xl shadow-black/50"
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ y: -10, rotate: -1, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <div className="h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <TrendingUp className="w-10 h-10 text-[var(--accent)]" />
                <div className="px-2 py-1 rounded bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-bold">
                  +124%
                </div>
              </div>
              
              <div className="relative h-32 w-full">
                 {/* Abstract Chart */}
                 <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <path 
                      d="M0 100 C 50 100, 100 80, 150 40 S 250 0, 250 0" 
                      fill="none" 
                      stroke="var(--accent)" 
                      strokeWidth="2"
                    />
                    <path 
                      d="M0 100 L 250 100 L 250 0 C 250 0, 150 40, 0 100" 
                      fill="url(#gradient)" 
                      opacity="0.2"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--accent)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                 </svg>
              </div>

              <span className="text-xs font-mono text-[var(--accent)]">/growth/metrics</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
