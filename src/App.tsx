import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Code2,
  GitBranch,
  Terminal,
  Cpu,
  Zap,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Jules AI
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#demo" className="text-sm text-gray-300 hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing</a>
            <button className="text-sm px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors">
              Get Early Access
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">Features</a>
            <a href="#demo" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">How it works</a>
            <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">Pricing</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] max-w-[1000px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent blur-3xl rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Jules AI v1.0 is now in beta
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Your autonomous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-300% animate-gradient">
              AI software engineer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Write tests, fix bugs, and build features automatically. Jules understands your entire codebase and works alongside you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              Start building for free <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <GitBranch className="w-5 h-5" /> Install GitHub App
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const CodePreview = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="rounded-xl border border-white/10 bg-surface/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-blue-500/10"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 text-xs text-gray-400 font-mono flex items-center gap-2">
              <Terminal className="w-3 h-3" /> jules-ai-agent
            </div>
          </div>
          <div className="text-xs text-gray-500 font-mono">bash</div>
        </div>

        <div className="p-6 font-mono text-sm overflow-x-auto">
          <div className="flex flex-col gap-2">
            <div className="text-gray-400">
              <span className="text-green-400">➜</span> <span className="text-blue-400">~/project</span> jules plan "fix the memory leak in the connection pool"
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-300 mt-2"
            >
              <span className="text-purple-400">⚡</span> Analyzing codebase...
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-gray-300"
            >
              <span className="text-blue-400">ℹ</span> Found potential issue in src/db/pool.ts
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-gray-300"
            >
              <span className="text-yellow-400">★</span> Proposed plan:
              <br />
              &nbsp;&nbsp;1. Add connection timeout handler
              <br />
              &nbsp;&nbsp;2. Ensure idle connections are closed
              <br />
              &nbsp;&nbsp;3. Write integration test for pool limits
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
              className="mt-4"
            >
              <span className="text-green-400">✓</span> Executing plan...
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5 }}
              className="text-gray-400"
            >
              <div><span className="text-green-500">+</span> src/db/pool.ts (modified 12 lines)</div>
              <div><span className="text-green-500">+</span> src/db/__tests__/pool.test.ts (added 45 lines)</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5 }}
              className="mt-2 text-green-400 font-bold"
            >
              ✨ Successfully fixed memory leak and added tests. PR created!
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-blue-400" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: Code2,
      title: "Context-Aware Coding",
      description: "Jules analyzes your entire repository to write code that perfectly matches your existing style and architecture patterns."
    },
    {
      icon: GitBranch,
      title: "Seamless Integration",
      description: "Works directly with GitHub. Assign issues to Jules and get a fully tested Pull Request ready for your review."
    },
    {
      icon: Cpu,
      title: "Test Automation",
      description: "Never write boilerplate tests again. Jules automatically generates comprehensive unit and integration tests for all changes."
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description: "Describe what you want to build, and Jules will scaffold the entire feature, including frontend, backend, and database changes."
    }
  ];

  return (
    <div id="features" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Supercharge your development</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to ship features faster and with higher confidence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="border-t border-white/10 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <Bot className="w-5 h-5 text-gray-400" />
        <span className="text-gray-400 font-medium">Jules AI</span>
      </div>
      <div className="flex gap-6 text-sm text-gray-500">
        <a href="#" className="hover:text-white transition-colors">Documentation</a>
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
      </div>
      <div className="text-sm text-gray-600">
        © {new Date().getFullYear()} Jules AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-background selection:bg-blue-500/30">
      <Nav />
      <main>
        <Hero />
        <CodePreview />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
