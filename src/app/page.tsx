import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CodePreview from "@/components/CodePreview";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand/30">
      <Header />
      <main>
        <Hero />
        <CodePreview />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
