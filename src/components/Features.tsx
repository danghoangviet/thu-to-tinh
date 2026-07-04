"use client";

import { motion } from "framer-motion";
import { Code2, GitGraph, TestTube2, Zap, Shield, Cpu } from "lucide-react";

const features = [
  {
    name: "AI Coding Assistant",
    description: "Write code 10x faster with our context-aware AI. It understands your entire codebase and generates production-ready components.",
    icon: Code2,
  },
  {
    name: "Seamless GitHub Integration",
    description: "Connect your repositories instantly. Jules automatically reviews PRs, creates issues, and suggests performance improvements.",
    icon: GitGraph,
  },
  {
    name: "Test Automation",
    description: "Never ship a bug again. Our AI automatically generates unit, integration, and end-to-end tests for every new feature.",
    icon: TestTube2,
  },
  {
    name: "Lightning Fast Performance",
    description: "Optimized infrastructure ensures your code generation and analysis requests are processed in milliseconds.",
    icon: Zap,
  },
  {
    name: "Enterprise Security",
    description: "Your code never leaves your private environment. We use zero-retention policies and SOC2 compliant infrastructure.",
    icon: Shield,
  },
  {
    name: "Advanced LLM Engine",
    description: "Powered by the latest advancements in language models, specifically fine-tuned for software engineering tasks.",
    icon: Cpu,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Supercharge your development
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Jules integrates directly into your existing workflow, automating the tedious tasks so you can focus on building great products.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-2xl border border-gray-800 bg-gray-900/50 p-8 shadow-sm hover:border-gray-700 hover:bg-gray-800/50 transition-colors"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                  <feature.icon className="h-6 w-6 text-indigo-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-white">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
