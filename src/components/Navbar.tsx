import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Terminal, FileText, Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { CVData } from "../types";
import { sendTelegramNotification } from "../services/notifications";
import { cn } from "../lib/utils";
import Typewriter from "./Typewriter";

interface NavbarProps {
  data: CVData;
}

export default function Navbar({ data }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(
    `connecting to ${data.first_name.toLowerCase()}.portfolio...`
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      setConnectionStatus(`${data.first_name.toLowerCase()}@portfolio — session active`);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [data.first_name]);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const notifyDownload = () => {
    sendTelegramNotification("CV Downloaded");
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 lg:px-8",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container mx-auto flex justify-center">
        <div className={cn(
          "terminal-window bg-secondary/80 backdrop-blur-md border-primary/20 overflow-hidden transition-all duration-500",
          isScrolled ? "rounded-lg shadow-lg" : "rounded-xl shadow-2xl",
          "w-full max-w-6xl"
        )}>
          {/* Terminal Header - Thinner */}
          <div className="terminal-header px-3 py-1 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-destructive/50" />
              <div className="w-2 h-2 rounded-full bg-accent/50" />
              <div className="w-2 h-2 rounded-full bg-primary/50" />
            </div>
            <div className="text-[9px] font-mono text-muted-foreground flex items-center gap-2 uppercase tracking-tighter overflow-hidden max-w-[40vw] sm:max-w-none">
              <Terminal className="w-2.5 h-2.5 shrink-0" />
              <span className="truncate"><Typewriter text={connectionStatus} speed={50} /></span>
            </div>
            <div className="w-8" />
          </div>

          <div className="px-3 sm:px-4 py-2 flex items-center justify-between gap-4 relative z-[1]">
            {/* Unified Logo & Name Section */}
            <motion.a
              href="#"
              className="flex items-center gap-2 sm:gap-3 group shrink-0"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all transform group-hover:scale-110">
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src="/assets/logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(180,190,254,0.4)] relative z-10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/bottts/svg?seed=anton&backgroundColor=1a1b26";
                  }}
                />
              </div>
              <div className="font-mono flex flex-col">
                <div className="text-sm sm:text-lg font-black tracking-tighter flex items-center">
                  <span className="text-primary text-glow">antonblyzniuk</span>
                  <span className="text-foreground/90 hidden sm:inline">.com</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1 h-3 sm:w-1.5 sm:h-4 bg-primary ml-1 shadow-[0_0_10px_rgba(180,190,254,0.8)]"
                  />
                </div>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity absolute -left-3">
                    &gt;
                  </span>
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="font-mono text-[9px] text-muted-foreground hover:text-primary hover:bg-primary/5 gap-2 h-7"
                onClick={copyEmail}
              >
                {copied ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                <span className="truncate max-w-[80px]">{copied ? "COPIED" : "EMAIL"}</span>
              </Button>

              {data.pdf_resume && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="font-mono text-[10px] h-7 border-primary/30 hover:bg-primary/10 hover:border-primary group relative overflow-hidden px-3"
                >
                  <a
                    href={data.pdf_resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={`Resume_${data.first_name}_${data.last_name}.pdf`}
                    onClick={notifyDownload}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <FileText className="w-3 h-3" />
                      RESUME
                    </span>
                  </a>
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                className="text-foreground p-2.5 hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
            <div
              className="fixed inset-0 z-[49]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden container mx-auto px-4 mt-2 flex justify-end"
            >
              <div className="terminal-window bg-secondary border-primary/20 p-5 space-y-5 w-full max-w-xs shadow-2xl rounded-xl">
                <div className="flex flex-col gap-3 relative z-[1]">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="font-mono text-base text-muted-foreground hover:text-primary transition-colors flex items-center gap-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-primary">&gt;</span>
                      {link.name}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col gap-2 pt-4 border-t border-primary/10 relative z-[1]">
                  <Button
                    onClick={copyEmail}
                    variant="outline"
                    size="sm"
                    className="w-full font-mono text-[10px] justify-start gap-3 h-9"
                  >
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                    <span className="truncate">{copied ? "EMAIL_COPIED" : "COPY_EMAIL"}</span>
                  </Button>
                  {data.pdf_resume && (
                    <Button
                      asChild
                      size="sm"
                      className="w-full font-mono bg-primary text-secondary hover:bg-primary/90 h-9"
                    >
                      <a
                        href={data.pdf_resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={`Resume_${data.first_name}_${data.last_name}.pdf`}
                        onClick={notifyDownload}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        RESUME.sh
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
          )}
        </AnimatePresence>
      </nav>
  );
}
