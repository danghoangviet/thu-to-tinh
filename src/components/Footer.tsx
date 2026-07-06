import React from "react";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-sm tracking-tight text-white">Jules.ai</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Jules Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
