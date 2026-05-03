import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Menu, X, FileText, Check, Copy } from "lucide-react";
import { CVData } from "../types";
import { sendTelegramNotification } from "../services/notifications";
import { cn } from "../lib/utils";

interface NavbarProps {
  data: CVData;
}

export default function Navbar({ data }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <>
      {/* Scroll progress bar — very top of viewport */}
      <div className="fixed top-0 left-0 right-0 z-[9996] h-[2px] pointer-events-none">
        <motion.div
          style={{
            width: progressWidth,
            height: "100%",
            background: "linear-gradient(90deg, #7c6aff, #00ffcc)",
          }}
        />
      </div>

      <nav className="fixed top-[2px] left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-500">
        <div
          className={cn(
            "container mx-auto flex items-center justify-between max-w-6xl transition-all duration-500 px-4 sm:px-6",
            isScrolled && "rounded-xl px-5 py-3"
          )}
          style={
            isScrolled
              ? {
                  background: "rgba(4,4,10,0.85)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  borderBottom: "1px solid rgba(124,106,255,0.08)",
                }
              : undefined
          }
        >
          {/* Monogram logo with spring entrance */}
          <motion.a
            href="#"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="font-display font-black text-xl tracking-tight text-foreground chroma-hover select-none"
            style={{ letterSpacing: "-0.03em" }}
          >
            <span style={{ color: "#a89aff" }}>
              {data.first_name[0]}
            </span>
            <span className="text-foreground/50 mx-0.5">·</span>
            <span className="text-foreground">
              {data.last_name[0]}
            </span>
          </motion.a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="mag-link font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary-light transition-colors duration-200"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={copyEmail}
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary-light transition-colors flex items-center gap-1.5 px-3 py-2"
            >
              {copied ? <Check className="w-3 h-3" style={{ color: "#00ffcc" }} /> : <Copy className="w-3 h-3" />}
              {copied ? "COPIED" : "EMAIL"}
            </motion.button>

            {data.pdf_resume && (
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                href={data.pdf_resume}
                target="_blank"
                rel="noopener noreferrer"
                download={`Resume_${data.first_name}_${data.last_name}.pdf`}
                onClick={() => sendTelegramNotification("CV Downloaded")}
                className="liquid-card rounded-lg px-4 py-2 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 hover:scale-[1.02] transition-transform relative z-[1]"
                style={{ color: "#a89aff" }}
              >
                <FileText className="w-3 h-3" />
                RESUME
              </motion.a>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-foreground p-2 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed inset-0 z-[80] flex flex-col justify-center px-10"
            style={{ background: "#04040a" }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>

            <div className="space-y-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 200, damping: 25 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-display font-black text-5xl tracking-tight text-foreground/90 hover:text-primary transition-colors"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-16 flex flex-col gap-3"
            >
              <button
                onClick={copyEmail}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2 hover:text-primary transition-colors w-fit"
              >
                {copied ? <Check className="w-3.5 h-3.5" style={{ color: "#00ffcc" }} /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "EMAIL COPIED" : data.email}
              </button>
              {data.pdf_resume && (
                <a
                  href={data.pdf_resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  onClick={() => sendTelegramNotification("CV Downloaded")}
                  className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2 w-fit"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Download Resume
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
