"use client";

import { motion } from "framer-motion";
import { Code2, GitMerge, TestTube2, Zap, Shield, Cpu } from "lucide-react";

const features = [
  {
    name: "AI Coding Assistant",
    description: "Write code faster with contextual autocomplete and intelligent code generation tailored to your codebase.",
    icon: Code2,
  },
  {
    name: "GitHub Integration",
    description: "Seamlessly review PRs, generate commit messages, and resolve merge conflicts automatically.",
    icon: GitMerge,
  },
  {
    name: "Test Automation",
    description: "Generate unit and integration tests instantly. Catch bugs before they reach production.",
    icon: TestTube2,
  },
  {
    name: "Lightning Fast",
    description: "Optimized for speed, Jules responds in milliseconds, keeping you in the flow state.",
    icon: Zap,
  },
  {
    name: "Secure by Design",
    description: "Enterprise-grade security ensures your code remains private and is never used to train public models.",
    icon: Shield,
  },
  {
    name: "Advanced Context",
    description: "Understands your entire repository architecture to provide highly relevant suggestions.",
    icon: Cpu,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Supercharge your workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Everything you need to build better software, faster. Jules integrates directly into your existing tools.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 hover:bg-[#111111] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                <feature.icon className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.name}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
