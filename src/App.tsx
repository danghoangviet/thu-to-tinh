
import Hero from './components/Hero';
import Features from './components/Features';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-50 selection:bg-indigo-500/30 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 flex flex-col gap-32">
        <Hero />
        <Features />
      </main>
    </div>
  );
}

export default App;
