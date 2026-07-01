import { BrainCircuit, GitPullRequest, TestTube2 } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function Features() {
  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6" />,
      title: "AI-Powered Coding",
      description: "Write code faster with intelligent completions, refactoring suggestions, and natural language to code translations.",
      delay: 0.1,
    },
    {
      icon: <GitPullRequest className="w-6 h-6" />,
      title: "Seamless GitHub Integration",
      description: "Connect your repositories directly. Review pull requests, resolve merge conflicts, and automate your CI/CD pipeline.",
      delay: 0.2,
    },
    {
      icon: <TestTube2 className="w-6 h-6" />,
      title: "Automated Testing",
      description: "Generate comprehensive unit tests and end-to-end tests automatically. Identify edge cases before they reach production.",
      delay: 0.3,
    },
  ];

  return (
    <section className="py-24 px-4 bg-black/50 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to ship faster</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Our intelligent assistant integrates into your workflow, helping you write better code and eliminate tedious tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
