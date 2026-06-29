"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, TerminalSquare, GitBranch, Code2, ArrowRight, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-zinc-800">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-black">
              <Bot className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight">AI Coder</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#demo" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Demo</a>
            <a href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:flex text-zinc-400 hover:text-white">Sign In</Button>
            <Button className="bg-white text-black hover:bg-zinc-200">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/40 via-black to-black -z-10" />

          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-300 mb-8 backdrop-blur-sm"
            >
              <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
              Introducing AI Coder 2.0
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-4xl font-bold tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 mb-6"
            >
              Code Faster with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[700px] text-lg sm:text-xl text-zinc-400 mb-10"
            >
              Your intelligent pair programmer. Build applications, fix bugs, and write tests at the speed of thought. Fully integrated with your favorite tools.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 gap-2 h-12 px-8 text-base">
                Start Building <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-base">
                <GitBranch className="h-4 w-4" /> Sign in with GitHub
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Code Preview Section */}
        <section className="pb-24 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="container mx-auto max-w-5xl"
          >
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
              <div className="flex items-center px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex gap-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs text-zinc-500 font-mono flex-1 text-center pr-12">agent.ts</div>
              </div>
              <div className="p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto text-zinc-300">
                <div className="flex">
                  <span className="text-zinc-600 w-8 select-none">1</span>
                  <span className="text-purple-400">import</span> <span className="text-yellow-200">{"{ AI }"}</span> <span className="text-purple-400">from</span> <span className="text-green-300">&apos;@ai-coder/sdk&apos;</span><span className="text-zinc-500">;</span>
                </div>
                <div className="flex">
                  <span className="text-zinc-600 w-8 select-none">2</span>
                  <br />
                </div>
                <div className="flex">
                  <span className="text-zinc-600 w-8 select-none">3</span>
                  <span className="text-purple-400">const</span> <span className="text-blue-300">agent</span> <span className="text-zinc-400">=</span> <span className="text-purple-400">new</span> <span className="text-yellow-100">AI</span><span className="text-zinc-400">{"({"}</span>
                </div>
                <div className="flex">
                  <span className="text-zinc-600 w-8 select-none">4</span>
                  <span className="pl-4 text-blue-300">model</span><span className="text-zinc-400">:</span> <span className="text-green-300">&apos;claude-3-5-sonnet&apos;</span><span className="text-zinc-500">,</span>
                </div>
                <div className="flex">
                  <span className="text-zinc-600 w-8 select-none">5</span>
                  <span className="pl-4 text-blue-300">temperature</span><span className="text-zinc-400">:</span> <span className="text-orange-300">0.2</span><span className="text-zinc-500">,</span>
                </div>
                <div className="flex">
                  <span className="text-zinc-600 w-8 select-none">6</span>
                  <span className="pl-4 text-blue-300">tools</span><span className="text-zinc-400">:</span> <span className="text-zinc-400">[&apos;</span><span className="text-green-300">bash</span><span className="text-zinc-400">&apos;, &apos;</span><span className="text-green-300">github</span><span className="text-zinc-400">&apos;, &apos;</span><span className="text-green-300">fs</span><span className="text-zinc-400">&apos;]</span>
                </div>
                <div className="flex">
                  <span className="text-zinc-600 w-8 select-none">7</span>
                  <span className="text-zinc-400">{"});"}</span>
                </div>
                <div className="flex">
                  <span className="text-zinc-600 w-8 select-none">8</span>
                  <br />
                </div>
                <div className="flex">
                  <span className="text-zinc-600 w-8 select-none">9</span>
                  <span className="text-zinc-500 italic">{`// Instruct the AI to build a feature`}</span>
                </div>
                <div className="flex">
                  <span className="text-zinc-600 w-8 select-none">10</span>
                  <span className="text-purple-400">await</span>{" "} <span className="text-blue-300">agent</span><span className="text-zinc-400">.</span><span className="text-yellow-100">execute</span><span className="text-zinc-400">(</span>
                </div>
                <div className="flex">
                  <span className="text-zinc-600 w-8 select-none">11</span>
                  <span className="pl-4 text-green-300">&quot;Add a dark mode toggle to the navigation bar using Tailwind CSS.&quot;</span>
                </div>
                <div className="flex relative">
                  <span className="text-zinc-600 w-8 select-none">12</span>
                  <span className="text-zinc-400">);</span>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute left-[38px] top-1 w-2 h-5 bg-white/80 rounded-[1px]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 border-t border-zinc-900 bg-zinc-950/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to ship faster</h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Powerful features designed for modern development workflows. Let AI handle the heavy lifting while you focus on architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="bg-zinc-900/40 border-zinc-800/60 hover:bg-zinc-900/60 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
                    <TerminalSquare className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">AI Pair Programming</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400 text-base leading-relaxed">
                    Write code, refactor legacy systems, and debug complex issues with an AI that understands your entire codebase context.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/40 border-zinc-800/60 hover:bg-zinc-900/60 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20">
                    <GitBranch className="h-6 w-6 text-emerald-400" />
                  </div>
                  <CardTitle className="text-xl">GitHub Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400 text-base leading-relaxed">
                    Create PRs, review code, and resolve merge conflicts automatically. AI Coder integrates seamlessly with your GitHub repositories.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/40 border-zinc-800/60 hover:bg-zinc-900/60 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
                    <Code2 className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">Test Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400 text-base leading-relaxed">
                    Generate comprehensive unit and integration tests instantly. Ensure your code is robust and production-ready before deployment.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/10 -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10" />

          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Ready to supercharge your workflow?</h2>
            <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
              Join thousands of developers who are shipping better code faster with AI Coder.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 h-14 px-10 text-lg font-medium shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <Zap className="mr-2 h-5 w-5" /> Start for Free
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 text-sm text-zinc-500">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">AI Coder</span>
            </div>
            <p className="mb-4">Building the future of software engineering.</p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-100 mb-3">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-100 mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-100 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-zinc-900 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 AI Coder Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors"><GitBranch className="h-5 w-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
