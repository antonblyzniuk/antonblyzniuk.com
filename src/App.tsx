import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { fetchCVData } from "./services/api";
import { sendTelegramNotification } from "./services/notifications";
import { CVData } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import FallingNumbers from "./components/FallingNumbers";
import AIChat from "./components/AIChat";
import { TooltipProvider } from "./components/ui/tooltip";

export default function App() {
  const [data, setData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cvData = await fetchCVData();
        setData(cvData);
        
        // Notify on visit (Client-side)
        sendTelegramNotification("Website Visited");
        
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold text-destructive mb-4">Error</h1>
        <p className="text-muted-foreground max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <TooltipProvider>
      <FallingNumbers />
      <div className="scanline" />
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">
        {/* Background Grid Effect */}
        <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <Navbar data={data} />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Hero data={data} />
          <About data={data} />
          <Skills data={data} />
          <Experience data={data} />
          <Projects data={data} />
          <Gallery data={data} />
        </main>

        <Footer data={data} />
        <AIChat data={data} />
      </div>
    </TooltipProvider>
  );
}
