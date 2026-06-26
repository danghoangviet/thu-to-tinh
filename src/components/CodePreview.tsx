"use client";

import { motion } from "framer-motion";
import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function CodePreview() {
  const [copied, setCopied] = useState(false);

  const codeString = `import { jules } from "@jules-ai/core";

// Initialize your AI assistant
const assistant = new jules.Assistant({
  model: "jules-v2",
  apiKey: process.env.JULES_API_KEY
});

// Generate code contextually
const response = await assistant.generate({
  prompt: "Create a resilient fetch wrapper with retries",
  context: ["./api.ts", "./types.ts"]
});

console.log(response.code);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="rounded-2xl border border-white/10 bg-[#0c0c0c] overflow-hidden shadow-2xl relative"
      >
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111111]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="ml-4 flex items-center gap-2 text-xs text-gray-400 font-mono">
              <Terminal className="h-3 w-3" />
              <span>agent.ts</span>
            </div>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        {/* Editor Body */}
        <div className="p-6 overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed">
            <code>
              <span className="text-purple-400">import</span> {"{ "}
              <span className="text-blue-400">jules</span>
              {" }"} <span className="text-purple-400">from</span>{" "}
              <span className="text-green-400">&quot;@jules-ai/core&quot;</span>
              {";\n\n"}
              <span className="text-gray-500">{"// Initialize your AI assistant\n"}</span>
              <span className="text-purple-400">const</span> assistant ={" "}
              <span className="text-purple-400">new</span>{" "}
              <span className="text-blue-400">jules.Assistant</span>
              {"({\n"}
              {"  "}model: <span className="text-green-400">&quot;jules-v2&quot;</span>
              {",\n"}
              {"  "}apiKey: <span className="text-blue-400">process.env.JULES_API_KEY</span>
              {"\n});\n\n"}
              <span className="text-gray-500">{"// Generate code contextually\n"}</span>
              <span className="text-purple-400">const</span> response ={" "}
              <span className="text-purple-400">await</span> assistant.
              <span className="text-yellow-200">generate</span>
              {"({\n"}
              {"  "}prompt: <span className="text-green-400">&quot;Create a resilient fetch wrapper with retries&quot;</span>
              {",\n"}
              {"  "}context: [{" "}
              <span className="text-green-400">&quot;./api.ts&quot;</span>
              {", "}
              <span className="text-green-400">&quot;./types.ts&quot;</span>
              {" ]\n});\n\n"}
              <span className="text-blue-400">console</span>.
              <span className="text-yellow-200">log</span>
              {"(response.code);"}
            </code>
          </pre>
        </div>
      </motion.div>
    </section>
  );
}
