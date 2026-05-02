import { motion } from "motion/react";
import { CVData } from "../types";
import { Github, Linkedin, Mail, Terminal, Globe, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import Typewriter from "./Typewriter";

export default function Footer({ data }: { data: CVData }) {
  const currentYear = new Date().getFullYear();

  const getLinkIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("github")) return <Github className="w-4 h-4" />;
    if (n.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <footer className="py-20 border-t border-primary/10 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="terminal-window bg-secondary/20 border-primary/10 overflow-hidden">
            {/* Terminal header */}
            <div className="bg-secondary border-b border-primary/10 px-4 py-2.5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
              </div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                ~/contact.sh
              </div>
              <div className="w-10" />
            </div>

            <div className="p-6 sm:p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                {/* CTA */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 font-mono text-sm text-primary">
                    <span className="text-muted-foreground">$</span>
                    <Typewriter text="./initialize_connection.sh" speed={60} />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter leading-tight">
                    Let's build<br />
                    <span className="text-primary text-glow">something great</span>
                  </h2>
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed max-w-sm">
                    Open to new projects and collaborations. Response time under 24h.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {data.links.map((link, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="border-primary/20 hover:border-primary hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all font-mono text-xs gap-2"
                        asChild
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {getLinkIcon(link.name)}
                          {link.name}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Contact details */}
                <div className="space-y-4">
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-6">
                    Direct Lines
                  </div>

                  <a
                    href={`mailto:${data.email}`}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-primary/10 hover:border-primary/30 hover:bg-secondary/60 transition-all"
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-0.5">Email</div>
                      <div className="font-mono text-sm text-foreground group-hover:text-primary transition-colors truncate">
                        {data.email}
                      </div>
                    </div>
                  </a>

                  {data.phone && (
                    <a
                      href={`tel:${data.phone}`}
                      className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-accent/10 hover:border-accent/30 hover:bg-secondary/60 transition-all"
                    >
                      <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors shrink-0">
                        <Phone className="w-4 h-4 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-0.5">Phone</div>
                        <div className="font-mono text-sm text-foreground group-hover:text-accent transition-colors truncate">
                          {data.phone}
                        </div>
                      </div>
                    </a>
                  )}

                  {data.location && (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-primary/10">
                      <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-0.5">Location</div>
                        <div className="font-mono text-sm text-foreground truncate">
                          {data.location}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer bar */}
            <div className="px-6 py-3 bg-secondary border-t border-primary/10 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                <span>© {currentYear} {data.first_name.toLowerCase()}{data.last_name.toLowerCase()}.com</span>
              </div>
              <span className="text-primary/50">exit 0  <span className="text-muted-foreground/40"># crafted by {data.first_name}</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-primary/4 blur-[60px] -z-10 rounded-full" />
    </footer>
  );
}
