
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CodeWindowProps {
  className?: string;
}

export function CodeWindow({ className }: CodeWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border border-gray-800 bg-[#0d0f12] shadow-2xl overflow-hidden",
        className
      )}
    >
      <div className="flex items-center px-4 py-3 border-b border-gray-800 bg-[#14171c]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs font-medium text-gray-400 font-mono">agent-workspace.ts</div>
      </div>

      <div className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-gray-300">
        <div className="flex">
          <span className="text-gray-600 mr-4 select-none">1</span>
          <span className="text-purple-400">import</span> <span className="text-blue-300 ml-1">{"{"}</span><span className="mx-1">agent</span><span className="text-blue-300 mr-1">{"}"}</span> <span className="text-purple-400 mr-1">from</span> <span className="text-green-300">'@jules/core'</span><span className="text-gray-400">;</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 mr-4 select-none">2</span>
          <span>&nbsp;</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 mr-4 select-none">3</span>
          <span className="text-purple-400 mr-1">async function</span> <span className="text-blue-400">resolveIssue</span><span className="text-yellow-200">(</span>issueId: <span className="text-blue-300">string</span><span className="text-yellow-200">)</span> <span className="text-blue-300 ml-1">{"{"}</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 mr-4 select-none">4</span>
          <span className="pl-4"><span className="text-purple-400 mr-1">const</span> context = <span className="text-purple-400 mr-1">await</span> agent.<span className="text-blue-400">analyze</span><span className="text-yellow-200">(</span>issueId<span className="text-yellow-200">)</span><span className="text-gray-400">;</span></span>
        </div>
        <div className="flex">
          <span className="text-gray-600 mr-4 select-none">5</span>
          <span className="pl-4 text-gray-500 italic">// Automatically generate and verify the fix</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 mr-4 select-none">6</span>
          <span className="pl-4"><span className="text-purple-400 mr-1">const</span> solution = <span className="text-purple-400 mr-1">await</span> agent.<span className="text-blue-400">solve</span><span className="text-yellow-200">(</span>context<span className="text-yellow-200">)</span><span className="text-gray-400">;</span></span>
        </div>
        <div className="flex">
          <span className="text-gray-600 mr-4 select-none">7</span>
          <span>&nbsp;</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 mr-4 select-none">8</span>
          <span className="pl-4"><span className="text-purple-400 mr-1">if</span> <span className="text-yellow-200">(</span><span className="text-purple-400 mr-1">await</span> solution.<span className="text-blue-400">testsPass</span><span className="text-purple-300">()</span><span className="text-yellow-200">)</span> <span className="text-yellow-200 ml-1">{"{"}</span></span>
        </div>
        <div className="flex">
          <span className="text-gray-600 mr-4 select-none">9</span>
          <span className="pl-8"><span className="text-purple-400">return</span> solution.<span className="text-blue-400">createPullRequest</span><span className="text-purple-300">()</span><span className="text-gray-400">;</span></span>
        </div>
        <div className="flex">
          <span className="text-gray-600 mr-4 select-none">10</span>
          <span className="pl-4"><span className="text-yellow-200">{"}"}</span></span>
        </div>
        <div className="flex">
          <span className="text-gray-600 mr-4 select-none">11</span>
          <span className="text-blue-300">{"}"}</span>
        </div>
        <div className="flex mt-2">
          <span className="text-gray-600 mr-4 select-none">&nbsp;</span>
          <span className="flex items-center text-green-400">
            <span className="animate-pulse mr-2">➜</span> <span className="text-gray-300">Fix verified and PR created successfully.</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
