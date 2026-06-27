"use client";

import { motion } from "framer-motion";
import { Code2, GitMerge, TestTube2 } from "lucide-react";

const features = [
  {
    title: "AI Coding Assistant",
    description: "Delegates routine tasks to advanced AI models like Gemini Pro. Let Jules handle the boilerplate, bug fixes, and version bumps.",
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
  },
  {
    title: "GitHub Integration",
    description: "Seamlessly integrates with your repositories. Just assign an issue to @jules and it will create a PR with the completed work.",
    icon: <GitMerge className="w-6 h-6 text-purple-400" />,
  },
  {
    title: "Test Automation",
    description: "Automatically writes and runs tests for the code it generates, ensuring high quality and minimizing regressions before you even review.",
    icon: <TestTube2 className="w-6 h-6 text-green-400" />,
  },
];

export function Features() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 mb-32" id="features">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Built for modern development
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Everything you need to automate your workflow and focus on the code that matters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-black/50 flex items-center justify-center mb-6 border border-white/10">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
