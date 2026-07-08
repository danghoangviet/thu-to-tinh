
import { motion } from 'framer-motion';
import { Card } from './Card';
import { Bot, GitBranch, TestTubeDiagonal, Zap, ShieldCheck, Cpu } from 'lucide-react';

const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Pair Programmer",
    description: "Write code faster with intelligent autocompletion and contextual suggestions based on your entire codebase."
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: "GitHub Integration",
    description: "Review PRs automatically, generate commit messages, and spot potential bugs before they get merged."
  },
  {
    icon: <TestTubeDiagonal className="w-6 h-6" />,
    title: "Test Automation",
    description: "Generate comprehensive unit and integration tests instantly to ensure your code is robust and production-ready."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Experience near-instant responses powered by our optimized infrastructure and specialized models."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Your code stays yours. We don't train our public models on your proprietary codebase or private data."
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Smart Refactoring",
    description: "Analyze code quality and automatically suggest improvements for better performance and readability."
  }
];

export default function Features() {
  return (
    <section className="flex flex-col gap-12">
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Everything you need to build faster
        </h2>
        <p className="text-zinc-400 text-lg">
          Our platform combines powerful AI models with deep integrations into your favorite tools,
          creating a seamless developer experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card gradient className="h-full hover:border-zinc-700 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-zinc-800/50 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
