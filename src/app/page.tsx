import { Hero } from "@/components/Hero";
import { WorkflowPanel } from "@/components/WorkflowPanel";
import { Features } from "@/components/Features";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Hero />
      <WorkflowPanel />
      <Features />
    </div>
  );
}
