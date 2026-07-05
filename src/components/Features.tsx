"use client";

import { motion } from "framer-motion";
import { BrainCircuit, GitBranch, ShieldAlert, Sparkles, Workflow, Zap } from "lucide-react";

const features = [
  {
    title: "AI-Powered Coding",
    description: "Write code faster with context-aware autocomplete and intelligent suggestions that understand your entire project.",
    icon: <BrainCircuit className="w-6 h-6 text-brand" />,
  },
  {
    title: "Seamless GitHub Integration",
    description: "Automatically review pull requests, generate commit messages, and sync with your repositories effortlessly.",
    icon: <GitBranch className="w-6 h-6 text-purple-400" />,
  },
  {
    title: "Test Automation",
    description: "Generate unit and integration tests instantly. Catch bugs before they make it to production.",
    icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
  },
  {
    title: "Lightning Fast",
    description: "Experience zero latency. Our optimized models run inference faster than you can type.",
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: "Smart Refactoring",
    description: "Highlight messy code and let Jules clean it up with modern best practices and design patterns.",
    icon: <Sparkles className="w-6 h-6 text-green-400" />,
  },
  {
    title: "Custom Workflows",
    description: "Define your own coding standards and let Jules enforce them across your entire engineering team.",
    icon: <Workflow className="w-6 h-6 text-blue-400" />,
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-black relative">
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-500">ship faster</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            Jules integrates directly into your existing workflow, acting as an expert pair programmer that never sleeps.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand/50 transition-all group relative overflow-hidden"
            >
              {/* Subtle gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="bg-black/50 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-white/5 relative z-10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
