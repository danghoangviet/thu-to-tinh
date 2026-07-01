"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-gradient">
          Code faster with AI.
          <br />
          Build better software.
        </h1>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The intelligent coding assistant that helps you write, review, and ship code faster than ever before.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white text-black hover:bg-zinc-200 transition-colors px-8 py-4 rounded-full font-medium text-lg flex items-center gap-2 group w-full sm:w-auto justify-center">
            Start Coding Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition-colors px-8 py-4 rounded-full font-medium text-lg w-full sm:w-auto justify-center">
            Read Docs
          </button>
        </div>
      </motion.div>
    </section>
  );
}
