
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Terminal, Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  const codeSnippet = `import { jules } from '@jules/ai';

const assistant = new jules.Assistant({
  model: 'jules-1.5-pro',
  tools: ['code_execution', 'file_search']
});

const response = await assistant.generate(
  "Build a production-ready React app"
);

console.log(response.code);`;

  return (
    <section className="flex flex-col lg:flex-row items-center gap-16 pt-12 lg:pt-24">
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur text-sm text-zinc-300"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Introducing Jules AI 1.5 Pro</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl lg:text-7xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500"
        >
          The next generation of AI coding
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg lg:text-xl text-zinc-400 max-w-2xl"
        >
          Build, debug, and deploy faster with our most capable AI yet.
          Seamlessly integrated into your workflow, from concept to production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button size="lg" className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white">
            Start building for free <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Terminal className="w-4 h-4" /> Read the docs
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex-1 w-full max-w-2xl relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-transparent blur-3xl -z-10 rounded-full" />
        <div className="rounded-xl border border-zinc-800 bg-[#0c0c0e] shadow-2xl overflow-hidden">
          <div className="flex items-center px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto text-xs text-zinc-500 font-mono">agent.ts</div>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
