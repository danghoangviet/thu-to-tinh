
import { Button } from '../ui/Button';
import { Code2 } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-[#0f1115]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white">
          <Code2 className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-bold tracking-tight">Jules<span className="text-blue-500">.ai</span></span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden sm:inline-flex text-gray-400 hover:text-white">
            Sign In
          </Button>
          <Button variant="primary">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
