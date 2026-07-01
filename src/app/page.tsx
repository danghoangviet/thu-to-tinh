import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CodePreview } from "@/components/CodePreview";
import { Features } from "@/components/Features";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full flex flex-col pt-16">
        <Hero />
        <CodePreview />
        <Features />
      </main>
      <footer className="border-t border-zinc-900 py-8 px-4 text-center text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} Jules AI. All rights reserved.</p>
      </footer>
    </>
  );
}
