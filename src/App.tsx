import { useEffect, useState, useRef } from "react";
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
import Achievements from "./components/Achievements";
import CustomSections from "./components/CustomSections";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import FallingNumbers from "./components/FallingNumbers";
import AIChat from "./components/AIChat";
import CustomCursor from "./components/CustomCursor";
import { TooltipProvider } from "./components/ui/tooltip";

const ADMIN_SEQUENCE = ["ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp"];

const BOOT_LINES = [
  "INITIALIZING RUNTIME...",
  "LOADING PROFILE DATA...",
  "COMPILING EXPERIENCE...",
  "RENDERING UNIVERSE...",
  "LAUNCHING PORTFOLIO...",
];

function BootLoader() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= BOOT_LINES.length) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9998] flex flex-col" style={{ background: "#04040a" }}>
      {/* Monogram top-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute top-8 left-8 font-display font-black text-5xl text-white"
        style={{ letterSpacing: "-0.04em" }}
      >
        A.B
      </motion.div>

      {/* Boot lines center */}
      <div className="flex-1 flex items-center justify-center">
        <div className="space-y-1.5">
          {BOOT_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={visibleLines > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-[11px] tracking-widest"
              style={{ color: "#4a4a6a" }}
            >
              <span style={{ color: "rgba(124,106,255,0.4)", marginRight: "0.5em" }}>›</span>
              {line}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress bar bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="h-full"
          style={{ background: "linear-gradient(90deg, #7c6aff, #00ffcc)" }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [loaderExiting, setLoaderExiting] = useState(false);
  const minTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showLoader = (loading || !minTimeElapsed) && !loaderExiting;

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
    minTimerRef.current = setTimeout(() => setMinTimeElapsed(true), 2200);
    return () => {
      if (minTimerRef.current) clearTimeout(minTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cvData = await fetchCVData();
        setData(cvData);
        sendTelegramNotification("Website Visited");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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

  return (
    <TooltipProvider>
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <BootLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {data && (
        <>
          <CustomCursor />
          <FallingNumbers />
          <div className="scanline" />
          <div className="min-h-screen text-foreground font-sans selection:bg-primary/30 selection:text-primary relative z-[2] md:cursor-none">
            <Navbar data={data} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Hero data={data} />
              <About data={data} />
              <Skills data={data} />
              <Experience data={data} />
              <Achievements data={data} />
              <Projects data={data} />
              <CustomSections data={data} />
              <Gallery data={data} />
            </main>
            <Footer data={data} />
            <AIChat data={data} />
          </div>
        </>
      )}
    </TooltipProvider>
  );
}
