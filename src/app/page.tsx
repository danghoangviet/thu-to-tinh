import Hero from "@/components/Hero";
import CodePreview from "@/components/CodePreview";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <CodePreview />
      <Features />

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Jules AI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
