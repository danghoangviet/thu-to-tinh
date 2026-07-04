"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl">
        <div className="aspect-[1000/1000] w-[60rem] rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl flex flex-col items-center"
        >
          <div className="mb-8 inline-flex items-center rounded-full border border-gray-800 bg-gray-900/50 px-3 py-1 text-sm font-medium text-gray-300 backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4 text-indigo-400" />
            <span>Introducing Jules 2.0</span>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Build faster with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              AI-powered
            </span>
            {" "}intelligence
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
            Experience the next generation of software development. Jules AI seamlessly integrates with your workflow to write, review, and ship code faster than ever before.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 flex items-center"
            >
              Start Building Free <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
            <a href="#features" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
              Explore Features <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
