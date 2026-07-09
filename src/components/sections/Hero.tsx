
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { CodeWindow } from '../ui/CodeWindow';
import { ArrowRight, Terminal } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
              <span>Jules AI is now in public beta</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              The AI software engineer that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">actually codes</span>.
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
              Resolve bugs, build features, and refactor code directly from your GitHub issues. Jules integrates seamlessly into your workflow.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="w-full sm:w-auto group">
                Start Building Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <Terminal className="w-4 h-4 mr-2" />
                Read the Docs
              </Button>
            </div>

            <div className="mt-10 flex items-center space-x-4 text-sm text-gray-500 font-medium">
              <span>Trusted by innovative engineering teams</span>
            </div>
          </motion.div>

          <div className="relative w-full">
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50" />
            <CodeWindow className="relative w-full max-w-xl lg:max-w-none mx-auto lg:ml-auto" />
          </div>

        </div>
      </div>
    </section>
  );
}
