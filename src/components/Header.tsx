"use client";

import { motion } from "framer-motion";
import { Code2, GitBranch } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Code2 className="w-6 h-6 text-brand" />
          <span className="font-semibold text-lg tracking-tight">Jules<span className="text-white/50">AI</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-white/70 hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm text-white/70 hover:text-white transition-colors">How it works</Link>
          <Link href="#pricing" className="text-sm text-white/70 hover:text-white transition-colors">Pricing</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="https://github.com" target="_blank" className="text-white/70 hover:text-white transition-colors">
            <GitBranch className="w-5 h-5" />
          </Link>
          <button className="hidden md:flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10">
            Sign In
          </button>
          <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white hover:bg-white/90 rounded-full transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </motion.header>
  );
}
