"use client";

import { motion } from "framer-motion";
import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

const codeSnippet = `function calculateFibonacci(n: number): number {
  if (n <= 1) return n;

  // Optimized iterative approach
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}

// AI: The iterative approach is O(n) time and O(1) space,
// much better than the O(2^n) recursive approach.`;

export function CodePreview() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto px-4 mb-32"
    >
      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d0d] shadow-2xl shadow-indigo-500/10">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-[#111111]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="flex items-center gap-2 ml-4 text-xs text-zinc-400 font-mono bg-zinc-800/50 px-2 py-1 rounded-md">
              <Terminal className="w-3 h-3" />
              fibonacci.ts
            </div>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Editor Body */}
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm font-mono text-zinc-300 leading-relaxed">
            <code>
              <span className="text-blue-400">function</span> <span className="text-yellow-200">calculateFibonacci</span>(n: <span className="text-blue-400">number</span>): <span className="text-blue-400">number</span> {"{"}
              <br />
              {"  "}
              <span className="text-purple-400">if</span> (n {"<="} <span className="text-orange-300">1</span>) <span className="text-purple-400">return</span> n;
              <br />
              <br />
              {"  "}
              <span className="text-zinc-500">{"// Optimized iterative approach"}</span>
              <br />
              {"  "}
              <span className="text-blue-400">let</span> prev = <span className="text-orange-300">0</span>, curr = <span className="text-orange-300">1</span>;
              <br />
              {"  "}
              <span className="text-purple-400">for</span> (<span className="text-blue-400">let</span> i = <span className="text-orange-300">2</span>; i {"<="} n; i++) {"{"}
              <br />
              {"    "}
              <span className="text-blue-400">const</span> next = prev + curr;
              <br />
              {"    "}
              prev = curr;
              <br />
              {"    "}
              curr = next;
              <br />
              {"  }"}
              <br />
              {"  "}
              <span className="text-purple-400">return</span> curr;
              <br />
              {"}"}
              <br />
              <br />
              <span className="text-green-400">{"// AI: The iterative approach is O(n) time and O(1) space,"}</span>
              <br />
              <span className="text-green-400">{"// much better than the O(2^n) recursive approach."}</span>
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
