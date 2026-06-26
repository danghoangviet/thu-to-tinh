"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8"
        >
          <Sparkles className="h-4 w-4 text-blue-400" />
          <span>Introducing Jules AI 2.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-8"
        >
          Your intelligent <br className="hidden sm:block" />
          <span className="text-gradient">coding companion</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          Jules helps you write, test, and ship code faster. Seamlessly integrated into your workflow with advanced AI capabilities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            Start coding for free
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 text-white font-medium hover:bg-white/10 border border-white/10 transition-colors">
            View Documentation
          </button>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
