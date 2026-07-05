"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-glow rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse" />
          <span className="text-sm font-medium text-white/80">Jules AI v2.0 is now available</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Your intelligent <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-500">
            coding companion
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10"
        >
          Supercharge your development workflow with AI that understands your codebase.
          Write better code, automate tests, and ship faster.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-black bg-white hover:bg-white/90 rounded-full transition-all hover:scale-105">
            Start Coding Free
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all">
            <Terminal className="w-4 h-4" />
            View Documentation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
