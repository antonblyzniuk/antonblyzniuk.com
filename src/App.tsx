import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const P = "animate-pulse rounded-lg bg-card";

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 z-50">
        <div className="container mx-auto px-4 max-w-5xl h-full flex items-center justify-between">
          <div className={`${P} h-4 w-36`} />
          <div className="hidden md:flex gap-8">
            <div className={`${P} h-3 w-14`} />
            <div className={`${P} h-3 w-14`} />
            <div className={`${P} h-3 w-14`} />
            <div className={`${P} h-3 w-14`} />
          </div>
          <div className={`${P} h-8 w-20`} />
        </div>
      </div>
      <div className="pt-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-5xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
            <div className="space-y-5 order-2 lg:order-1">
              <div className={`${P} h-4 w-24`} />
              <div className={`${P} h-16 w-4/5`} />
              <div className={`${P} h-6 w-1/2`} />
              <div className="flex gap-3 flex-wrap">
                <div className={`${P} h-8 w-24`} />
                <div className={`${P} h-8 w-24`} />
                <div className={`${P} h-8 w-24`} />
                <div className={`${P} h-8 w-24`} />
              </div>
              <div className="flex gap-3 flex-wrap pt-2">
                <div className={`${P} h-10 w-28`} />
                <div className={`${P} h-10 w-28`} />
                <div className={`${P} h-10 w-28`} />
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-end">
              <div className="relative w-72 h-80">
                <div className={`${P} absolute w-52 h-64 top-0 left-8 rounded-2xl`} />
                <div className={`${P} absolute w-44 h-52 top-6 right-0 rounded-2xl`} />
                <div className={`${P} absolute w-40 h-48 bottom-0 left-0 rounded-2xl`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { ArrowUp } from "lucide-react";
import { fetchCVData } from "./services/api";
import { CVData } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import AIChat from "./components/AIChat";
import { TooltipProvider } from "./components/ui/tooltip";

const ADMIN_SEQUENCE = ["ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp"];

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [data, setData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const buffer: string[] = [];
    const onKeyDown = (e: KeyboardEvent) => {
      buffer.push(e.key);
      if (buffer.length > ADMIN_SEQUENCE.length) buffer.shift();
      if (buffer.join() === ADMIN_SEQUENCE.join()) {
        window.location.href = "https://pwb.api.antonblyzniuk.com/admin/";
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    fetchCVData()
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : "An unexpected error occurred"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold text-destructive mb-3">Failed to load</h1>
        <p className="text-muted-foreground max-w-md text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-5 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
        <Navbar data={data} />
        <main>
          <Hero data={data} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <About data={data} />
            <Skills data={data} />
            <Experience data={data} />
            <Projects data={data} />
            <Certifications data={data} />
            <CTA data={data} />
          </div>
        </main>
        <Footer data={data} />
        <ScrollToTop />
        <AIChat data={data} />
      </div>
    </TooltipProvider>
  );
}
