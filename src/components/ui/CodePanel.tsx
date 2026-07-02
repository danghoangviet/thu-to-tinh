"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const CodePanel = () => {
  const [text, setText] = useState("");
  const fullText = `function jules() {
  console.log("Analyzing repository...");
  const stack = detectTechStack();

  if (stack.includes("React")) {
    return generateComponents();
  }

  return optimize();
}`;

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d0d] shadow-2xl"
    >
      <div className="flex items-center px-4 py-3 border-b border-zinc-800 bg-[#161616]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto text-xs text-zinc-500 font-mono">agent.ts</div>
      </div>
      <div className="p-6 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-zinc-300">
          <code>
            {text.split('\n').map((line, i) => (
              <span key={i} className="block">
                <span className="inline-block w-8 text-zinc-600 select-none mr-4">{i + 1}</span>
                {line.includes('function') || line.includes('const') || line.includes('return') || line.includes('if') ? (
                  <span className="text-purple-400">{line.match(/^(function|const|return|if)/)?.[0]} </span>
                ) : null}
                <span className={
                  line.includes('"') ? "text-green-400" :
                  line.includes('console') ? "text-blue-400" :
                  line.includes('//') ? "text-zinc-500" : "text-zinc-300"
                }>
                  {line.replace(/^(function|const|return|if) /, '')}
                </span>
              </span>
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-purple-500 ml-1 align-middle"
            />
          </code>
        </pre>
      </div>
    </motion.div>
  );
};
