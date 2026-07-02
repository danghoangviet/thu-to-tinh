"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CodePanel } from "@/components/ui/CodePanel";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { CodeXml, GitMerge, TerminalSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gradient-mesh font-sans overflow-hidden">
      {/* Navbar placeholder */}
      <header className="absolute top-0 w-full flex items-center justify-between p-6 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
            <span className="text-zinc-950 font-bold text-xl leading-none">J</span>
          </div>
          <span className="text-xl font-medium tracking-tight">jules</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-zinc-100 transition-colors">Features</a>
          <a href="#" className="hover:text-zinc-100 transition-colors">Documentation</a>
          <a href="#" className="hover:text-zinc-100 transition-colors">Pricing</a>
        </nav>
        <Button variant="secondary" size="sm" className="hidden md:flex">Sign In</Button>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-48 flex flex-col items-center">

        {/* Hero Section */}
        <section className="w-full flex flex-col items-center text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-sm font-medium text-zinc-300 mb-8 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
            Introducing the ultimate AI engineer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl"
          >
            Ship code faster with <br className="hidden md:block" />
            <span className="text-gradient">intelligent automation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed"
          >
            Jules integrates seamlessly into your workflow to analyze, write, and test code.
            Experience the future of software development today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto">Get Started Free</Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">View Documentation</Button>
          </motion.div>

          <div className="w-full max-w-4xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none rounded-xl" />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-20" />
            <CodePanel />
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-6xl mx-auto py-24 border-t border-zinc-800/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need to build faster</h2>
            <p className="text-zinc-400 text-lg">Powerful tools designed for modern development teams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<CodeXml size={24} className="text-purple-400" />}
              title="AI Code Generation"
              description="Write complex functions, components, and entire files simply by describing what you need in natural language."
              delay={0.1}
            />
            <FeatureCard
              icon={<GitMerge size={24} className="text-blue-400" />}
              title="GitHub Integration"
              description="Review PRs, resolve merge conflicts, and automate your CI/CD pipelines directly from your repository."
              delay={0.2}
            />
            <FeatureCard
              icon={<TerminalSquare size={24} className="text-pink-400" />}
              title="Test Automation"
              description="Automatically generate comprehensive unit and integration tests to ensure your code is always production-ready."
              delay={0.3}
            />
          </div>
        </section>

      </main>

      <footer className="w-full py-8 border-t border-zinc-800/50 text-center text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} Jules AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
