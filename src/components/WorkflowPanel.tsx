"use client";

import { motion } from "framer-motion";
import { UserCircle, Bot, Code, Play } from "lucide-react";

export function WorkflowPanel() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 mb-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl overflow-hidden shadow-2xl"
      >
        {/* Fake Window Header */}
        <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex-1 text-center text-xs text-gray-500 font-mono">
            jules-agent — workflow
          </div>
        </div>

        {/* Workflow Content */}
        <div className="p-6 md:p-8 flex flex-col gap-6 font-mono text-sm">
          {/* Step 1: Prompt Input */}
          <div className="flex gap-4 items-start">
            <div className="mt-1">
              <UserCircle className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="text-gray-400 mb-1 text-xs uppercase tracking-wider">
                Step 1: The Prompt
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-gray-300">
                <p>
                  @jules main <br />
                  Can you bump the version of next.js to v15 and convert the
                  project to use app directory?
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Plan Generation */}
          <div className="flex gap-4 items-start">
            <div className="mt-1">
              <Bot className="w-8 h-8 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="text-gray-400 mb-1 text-xs uppercase tracking-wider">
                Step 2: The Plan
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-gray-300">
                <p className="mb-2">Here is my plan:</p>
                <p>I plan to update the following files to the new app directory structure.</p>
                <div className="mt-3 flex items-center gap-2 text-green-400">
                  <Play className="w-4 h-4" />
                  <span>Executing Plan...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Code Preview */}
          <div className="flex gap-4 items-start">
            <div className="mt-1">
              <Code className="w-8 h-8 text-green-400" />
            </div>
            <div className="flex-1">
              <div className="text-gray-400 mb-1 text-xs uppercase tracking-wider">
                Step 3: Code Diff
              </div>
              <div className="bg-[#0d1117] border border-white/10 rounded-lg p-4 text-gray-300 overflow-x-auto">
                <pre className="text-xs leading-relaxed">
                  <code>
                    <span className="text-gray-500">  9</span>{"\n"}
                    <span className="text-gray-500"> 10</span> &quot;dependencies&quot;: {"{\n"}
                    <span className="text-red-400 bg-red-400/10 block px-2"> 11-   &quot;next&quot;: &quot;10.2.3&quot;,</span>
                    <span className="text-green-400 bg-green-400/10 block px-2"> 11+   &quot;next&quot;: &quot;15.4.5&quot;,</span>
                    <span className="text-gray-500"> 12</span>   &quot;react&quot;: &quot;19.1.1&quot;,{"\n"}
                    <span className="text-gray-500"> 13</span>   &quot;react-dom&quot;: &quot;19.1.1&quot;{"\n"}
                    <span className="text-gray-500"> 14</span> {"}\n"}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
