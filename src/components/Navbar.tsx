import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, FileText, Check, Copy } from "lucide-react";
import { CVData } from "../types";
import { cn } from "../lib/utils";

interface NavbarProps {
  data: CVData;
}

const BASE_NAV_LINKS = [
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Projects", href: "#projects", id: "projects" },
];

export default function Navbar({ data }: NavbarProps) {
  const NAV_LINKS = [
    ...BASE_NAV_LINKS,
    ...(data.certifications.length > 0 || data.awards.length > 0
      ? [{ name: "Certifications", href: "#certifications", id: "certifications" }]
      : []),
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
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

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.certifications.length, data.awards.length]);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="font-semibold text-foreground hover:text-primary transition-colors">
            {data.first_name} {data.last_name}
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm transition-colors relative",
                  activeSection === link.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute -bottom-[21px] left-0 right-0 h-px bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={copyEmail}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-white/5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy email</span>
            </button>

            {data.pdf_resume && (
              <a
                href={data.pdf_resume}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <FileText className="w-3.5 h-3.5" />
                Resume
              </a>
            )}
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-[-1]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden bg-card border-b border-border px-4 pb-4"
            >
              <nav className="flex flex-col gap-1 pt-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "py-2 px-3 rounded-md transition-colors",
                      activeSection === link.id
                        ? "text-foreground bg-white/5 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-md hover:bg-white/5 transition-colors w-full"
                >
                  {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                  <span className="truncate">{copied ? "Email copied!" : data.email}</span>
                </button>
                {data.pdf_resume && (
                  <a
                    href={data.pdf_resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    Download Resume
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
