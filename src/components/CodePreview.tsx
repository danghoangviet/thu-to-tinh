"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Circle, FileJson, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function CodePreview() {
  const [typedCode, setTypedCode] = useState("");
  const codeToType = `function calculateFibanocci(n: number): number {
  if (n <= 1) return n;
  return calculateFibanocci(n - 1) + calculateFibanocci(n - 2);
}

// 🤖 Jules AI: Let's optimize this with memoization
// for better performance!

function calculateFibanocciOptimized(n: number, memo: Record<number, number> = {}): number {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] = calculateFibanocciOptimized(n - 1, memo) +
            calculateFibanocciOptimized(n - 2, memo);

  return memo[n];
}`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedCode(codeToType.substring(0, i));
      i++;
      if (i > codeToType.length) clearInterval(interval);
    }, 20); // typing speed
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative px-6 pb-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl overflow-hidden animate-float"
      >
        {/* Editor Header */}
        <div className="flex items-center px-4 h-12 border-b border-white/5 bg-white/5">
          <div className="flex gap-2">
            <Circle className="w-3 h-3 fill-red-500 text-red-500" />
            <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <Circle className="w-3 h-3 fill-green-500 text-green-500" />
          </div>
          <div className="flex items-center gap-2 mx-auto text-xs text-white/50 bg-black/30 px-3 py-1 rounded-md border border-white/5">
            <FileJson className="w-3 h-3" />
            math.ts
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 min-h-[400px]">
          {/* File Explorer / AI Panel (Sidebar) */}
          <div className="hidden md:block border-r border-white/5 bg-black/20 p-4">
            <div className="text-xs font-semibold text-white/40 mb-4 uppercase tracking-wider">Jules Assistant</div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="flex items-start gap-2 text-sm text-white/80">
                  <Sparkles className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <p>I noticed you're writing a Fibonacci function. The recursive approach can be slow for large numbers. Would you like me to optimize it with memoization?</p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs bg-brand/20 text-brand px-2 py-1 rounded border border-brand/30 hover:bg-brand/30 transition-colors">Apply Fix</button>
                  <button className="text-xs bg-white/5 text-white/60 px-2 py-1 rounded border border-white/10 hover:bg-white/10 transition-colors">Dismiss</button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/40 pt-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                No errors found
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <div className="col-span-1 md:col-span-2 p-4 bg-[#0d0d0d] font-mono text-sm overflow-x-auto relative">
             <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-white/30">
               <ChevronRight className="w-4 h-4" />
               TypeScript
             </div>
             <pre className="text-white/80 leading-relaxed">
               <code>
                 {typedCode}
                 <span className="inline-block w-2 h-4 bg-brand/70 animate-pulse ml-1 align-middle"></span>
               </code>
             </pre>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
