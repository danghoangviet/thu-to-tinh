
import { motion } from 'framer-motion';
import { BrainCircuit, GitPullRequest, ShieldCheck, Zap, Workflow, TerminalSquare } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="w-6 h-6 text-blue-400" />,
    title: "Autonomous Coding",
    description: "Jules analyzes your codebase, understands the context, and writes production-ready code to solve complex issues."
  },
  {
    icon: <GitPullRequest className="w-6 h-6 text-purple-400" />,
    title: "Seamless GitHub Integration",
    description: "Create an issue and assign it to Jules. It will automatically open a PR with the fix and request a review."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
    title: "Test-Driven Verification",
    description: "Jules doesn't just guess. It writes tests, runs them in a sandboxed environment, and verifies the solution works."
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Lightning Fast Iterations",
    description: "Reduce turnaround time from hours to minutes. Review PRs instead of writing boilerplate."
  },
  {
    icon: <Workflow className="w-6 h-6 text-pink-400" />,
    title: "Learns Your Patterns",
    description: "Adapts to your team's coding standards and architectures by reading your existing repository history."
  },
  {
    icon: <TerminalSquare className="w-6 h-6 text-indigo-400" />,
    title: "CLI & Web Native",
    description: "Trigger workflows directly from your terminal or manage them through our intuitive web dashboard."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-[#0a0c0f] border-y border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">ship faster</span>
          </h2>
          <p className="text-lg text-gray-400">
            Jules isn't just an autocomplete. It's a fully autonomous agent that handles the entire lifecycle of a task, from issue to pull request.
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
              className="p-6 rounded-2xl bg-[#12141a] border border-gray-800/60 hover:border-gray-700 hover:bg-[#16181d] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
