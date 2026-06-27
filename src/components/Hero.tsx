"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="w-full pt-24 pb-12 md:pt-32 md:pb-24 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent"
      >
        Jules does coding tasks you don&apos;t want to do.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl"
      >
        More time for the code you want to write, and everything else.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)]">
          Try Jules
        </button>
      </motion.div>
    </section>
  );
}
