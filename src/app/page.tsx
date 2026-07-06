import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CodePreview } from "@/components/CodePreview";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CodePreview />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
