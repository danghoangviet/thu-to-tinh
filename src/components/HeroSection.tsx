"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
          Introducing Jules 2.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Build faster with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
            AI-powered
          </span>{" "}
          coding
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Elevate your development workflow. Jules is your intelligent pair programmer,
          automating boilerplate, writing tests, and catching bugs before they hit production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-medium flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
            Start building for free
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
            <Terminal className="w-4 h-4 text-zinc-400" />
            npm install jules
          </button>
        </motion.div>
      </div>
    </section>
  );
}
