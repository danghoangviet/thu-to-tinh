"use client";

import { motion } from "framer-motion";
import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function CodePreview() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `// Initialize Jules AI Agent\nimport { JulesAgent } from '@jules/ai';\n\nconst agent = new JulesAgent({\n  apiKey: process.env.JULES_API_KEY,\n  model: 'jules-coder-v2',\n  temperature: 0.2\n});\n\n// Generate a React component\nconst response = await agent.generate({\n  prompt: 'Create a responsive pricing card component using Tailwind CSS',\n  framework: 'react'\n});\n\nconsole.log(response.code);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto max-w-5xl"
        >
          <div className="rounded-2xl border border-gray-800 bg-gray-900/80 shadow-2xl backdrop-blur-xl overflow-hidden">
            {/* Mac-style Window Controls */}
            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3 bg-gray-900/50">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80 border border-red-600"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500/80 border border-yellow-600"></div>
                <div className="h-3 w-3 rounded-full bg-green-500/80 border border-green-600"></div>
              </div>
              <div className="flex items-center text-xs text-gray-500 font-mono">
                <Terminal className="mr-1.5 h-3.5 w-3.5" />
                <span>agent.ts</span>
              </div>
              <div>
                <button
                  onClick={handleCopy}
                  className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                  aria-label="Copy code"
                >
                  {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed text-gray-300">
                <code>
                  <span className="text-gray-500">{/* // Initialize Jules AI Agent */}</span>{"\n"}
                  <span className="text-purple-400">import</span> {"{ "}
                  <span className="text-yellow-200">JulesAgent</span>
                  {" } "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-300">&apos;@jules/ai&apos;</span>
                  {";\n\n"}
                  <span className="text-purple-400">const</span> agent ={" "}
                  <span className="text-purple-400">new</span>{" "}
                  <span className="text-yellow-200">JulesAgent</span>
                  {"({\n"}
                  {"  "}apiKey: process.env.<span className="text-blue-300">JULES_API_KEY</span>
                  {",\n"}
                  {"  "}model: <span className="text-green-300">&apos;jules-coder-v2&apos;</span>
                  {",\n"}
                  {"  "}temperature: <span className="text-orange-300">0.2</span>
                  {"\n});\n\n"}
                  <span className="text-gray-500">{/* // Generate a React component */}</span>{"\n"}
                  <span className="text-purple-400">const</span> response ={" "}
                  <span className="text-purple-400">await</span> agent.<span className="text-blue-200">generate</span>
                  {"({\n"}
                  {"  "}prompt: <span className="text-green-300">&apos;Create a responsive pricing card component using Tailwind CSS&apos;</span>
                  {",\n"}
                  {"  "}framework: <span className="text-green-300">&apos;react&apos;</span>
                  {"\n});\n\n"}
                  <span className="text-blue-200">console</span>.<span className="text-blue-200">log</span>
                  {"(response.code);"}
                </code>
              </pre>
            </div>

            {/* Fake Output Area */}
            <div className="border-t border-gray-800 bg-black/40 px-6 py-4">
              <div className="flex items-center text-sm font-mono">
                <span className="text-green-400 mr-2">➜</span>
                <span className="text-gray-400">~</span>
                <span className="text-white ml-2">node agent.ts</span>
              </div>
              <div className="mt-2 text-sm font-mono text-gray-400">
                <span className="text-indigo-400 animate-pulse">Generating component... </span>
                <span className="text-green-400 ml-2">✓ Done in 1.2s</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
