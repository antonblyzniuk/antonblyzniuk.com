import { motion } from "motion/react";
import { CVData } from "../types";
import { Github, Linkedin, Mail, Terminal, Heart, ChevronRight, Globe } from "lucide-react";
import { Button } from "./ui/button";
import Typewriter from "./Typewriter";

interface FooterProps {
  data: CVData;
}

export default function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 border-t border-primary/10 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="terminal-window bg-secondary/20 border-primary/10 p-5 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-2 font-mono text-sm text-primary mb-4">
                  <ChevronRight className="w-4 h-4" />
                  <Typewriter text="./contact" speed={100} />
                </div>
                <h2 className="text-4xl font-bold tracking-tighter">
                  Initialize <span className="text-primary text-glow">Connection</span>
                </h2>
                <div className="text-muted-foreground font-mono text-sm leading-relaxed">
                  <Typewriter text="System is ready for new project requests or collaborative inquiries. Response latency: < 24 hours." speed={20} delay={500} />
                </div>
                <div className="flex flex-wrap gap-4">
                  {data.links.map((link, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="icon"
                      className="border-primary/20 hover:border-primary hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
                      asChild
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.name.toLowerCase().includes("github") ? (
                          <Github className="w-5 h-5" />
                        ) : link.name.toLowerCase().includes("linkedin") ? (
                          <Linkedin className="w-5 h-5" />
                        ) : (
                          <Globe className="w-5 h-5" />
                        )}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="terminal-window bg-secondary/40 p-6 border-primary/5 space-y-4">
                  <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.href = `mailto:${data.email}`}>
                    <div className="p-3 rounded-xl bg-secondary border border-primary/10 group-hover:border-primary/40 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Direct Line</div>
                      <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate max-w-full">
                        <Typewriter text={data.email} speed={50} delay={1000} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-primary/5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-2">
                      <span>CONNECTION_STATUS</span>
                      <span className="text-emerald-500">ENCRYPTED</span>
                    </div>
                    <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        className="h-full bg-primary"
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-primary/10 flex flex-wrap items-center justify-between gap-6 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                <span>© {currentYear} antonblyzniuk.com — ALL_RIGHTS_RESERVED</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  Built with <Heart className="w-3 h-3 text-destructive fill-destructive" /> by Anton
                </span>
                <span className="text-primary">v2.4.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent -z-10" />
    </footer>
  );
}
