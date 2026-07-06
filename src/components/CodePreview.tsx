"use client";

import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, FileCode2, Play } from "lucide-react";

export function CodePreview() {
  return (
    <section className="px-6 pb-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden shadow-2xl shadow-indigo-500/10"
        >
          {/* Header */}
          <div className="h-12 border-b border-white/10 flex items-center px-4 justify-between bg-[#111]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-zinc-400">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/5">
                <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
                <span>page.tsx</span>
              </span>
            </div>
            <div className="flex items-center">
              <button className="flex items-center gap-1.5 text-xs text-white bg-indigo-500/20 hover:bg-indigo-500/30 px-3 py-1.5 rounded-md transition-colors border border-indigo-500/30">
                <Play className="w-3.5 h-3.5 text-indigo-400" />
                Run code
              </button>
            </div>
          </div>

          <div className="flex h-[400px] md:h-[500px]">
            {/* Sidebar */}
            <div className="hidden md:flex w-64 border-r border-white/10 bg-[#0a0a0a] flex-col p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                <FolderGit2 className="w-4 h-4" />
                Explorer
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-zinc-300 hover:bg-white/5 cursor-pointer">
                  <span className="text-zinc-500">▼</span> src
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-zinc-400 hover:bg-white/5 cursor-pointer pl-6">
                  <span className="text-zinc-500">▼</span> app
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/10 text-white cursor-pointer pl-10 border border-white/5">
                  <FileCode2 className="w-4 h-4 text-blue-400" />
                  page.tsx
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-zinc-400 hover:bg-white/5 cursor-pointer pl-10">
                  <FileCode2 className="w-4 h-4 text-blue-400" />
                  layout.tsx
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-zinc-400 hover:bg-white/5 cursor-pointer pl-6">
                  <span className="text-zinc-500">▶</span> components
                </div>
              </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 bg-[#0d0d0d] p-6 overflow-auto font-mono text-sm leading-loose">
              <div className="flex">
                <div className="flex flex-col text-zinc-600 select-none pr-4 text-right border-r border-white/10 mr-4 min-w-[2rem]">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                  <span>10</span>
                  <span>11</span>
                  <span>12</span>
                  <span>13</span>
                  <span>14</span>
                  <span>15</span>
                </div>
                <div className="flex flex-col text-zinc-300 whitespace-pre">
                  <span><span className="text-pink-400">import</span> {"{"} useState {"}"} <span className="text-pink-400">from</span> <span className="text-green-300">"react"</span>;</span>
                  <span><span className="text-pink-400">import</span> {"{"} generateCode {"}"} <span className="text-pink-400">from</span> <span className="text-green-300">"@jules/ai"</span>;</span>
                  <span></span>
                  <span><span className="text-pink-400">export default function</span> <span className="text-blue-300">AIAssistant</span>() {"{"}</span>
                  <span>  <span className="text-pink-400">const</span> [prompt, setPrompt] = <span className="text-blue-300">useState</span>(<span className="text-green-300">""</span>);</span>
                  <span>  <span className="text-pink-400">const</span> [isGenerating, setIsGenerating] = <span className="text-blue-300">useState</span>(<span className="text-blue-300">false</span>);</span>
                  <span></span>
                  <span>  <span className="text-pink-400">const</span> <span className="text-blue-300">handleGenerate</span> = <span className="text-pink-400">async</span> () {"=>"} {"{"}</span>
                  <span>    <span className="text-blue-300">setIsGenerating</span>(<span className="text-blue-300">true</span>);</span>
                  <span>    <span className="text-zinc-500 italic">// AI generates the component</span></span>
                  <span>    <span className="text-pink-400">const</span> code = <span className="text-pink-400">await</span> <span className="text-blue-300">generateCode</span>(prompt);</span>
                  <span>    <span className="text-blue-300">applyChanges</span>(code);</span>
                  <span>    <span className="text-blue-300">setIsGenerating</span>(<span className="text-blue-300">false</span>);</span>
                  <span>  {"}"};</span>
                  <span></span>
                  <span>  <span className="text-pink-400">return</span> (</span>
                  <span>    <span className="text-zinc-400">{"<div className=\"flex flex-col gap-4\">"}</span></span>
                  <span>      ...</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
