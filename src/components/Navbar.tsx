import React from "react";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span className="font-semibold text-lg tracking-tight text-white">Jules.ai</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-white hover:text-indigo-400 transition-colors">
            Log in
          </button>
          <button className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
