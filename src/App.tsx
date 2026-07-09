
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Footer } from './components/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0f1115] text-white font-sans selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
