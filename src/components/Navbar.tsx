"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-white p-1.5 rounded-lg">
                <Terminal className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">Jules AI</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#docs" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
