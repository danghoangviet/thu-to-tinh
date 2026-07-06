"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, GitMerge, TestTube2 } from "lucide-react";

const features = [
  {
    title: "AI-Powered Coding",
    description: "Write code 10x faster with our advanced LLM models trained on millions of high-quality repositories.",
    icon: BrainCircuit,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    title: "GitHub Integration",
    description: "Seamlessly connect with your repositories. Create PRs, review code, and merge directly from Jules.",
    icon: GitMerge,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Test Automation",
    description: "Automatically generate comprehensive unit and end-to-end tests for every component you build.",
    icon: TestTube2,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Everything you need to ship faster
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Jules integrates directly into your workflow, providing intelligent assistance at every step of the development lifecycle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${feature.bg}`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
