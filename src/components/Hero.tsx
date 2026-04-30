import { motion } from "motion/react";
import { CVData } from "../types";
import { Terminal, Github, Linkedin, Mail, ChevronRight, Monitor, ExternalLink, Globe } from "lucide-react";
import { Button } from "./ui/button";
import Typewriter from "./Typewriter";

interface HeroProps {
  data: CVData;
}

export default function Hero({ data }: HeroProps) {
  const mainPhoto = data.photos.find((p) => p.is_main)?.image || data.photos[0]?.image;

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("github")) return <Github className="w-5 h-5" />;
    if (n.includes("linkedin")) return <Linkedin className="w-5 h-5" />;
    if (n.includes("mail") || n.includes("email")) return <Mail className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  return (
    <section className="min-h-screen pt-32 pb-20 flex flex-col justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="terminal-window bg-secondary/40 backdrop-blur-sm border-primary/20 shadow-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-secondary/80 border-b border-primary/10 px-4 py-2 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
              <div className="text-xs font-mono text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
                <Monitor className="w-3.5 h-3.5" />
                Terminal — session_01
              </div>
              <div className="w-12" />
            </div>

            <div className="p-6 md:p-10 space-y-8">
              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                {/* Profile Image with Terminal Frame */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative group shrink-0"
                >
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl border-2 border-primary/30 p-2 bg-secondary/50 group-hover:border-primary transition-all duration-500 shadow-[0_0_30px_rgba(180,190,254,0.1)] group-hover:shadow-[0_0_50px_rgba(180,190,254,0.2)]">
                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                      <img
                        src={mainPhoto || "https://picsum.photos/seed/profile/400/400"}
                        alt={`${data.first_name} ${data.last_name}`}
                        className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-primary/5 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                    </div>
                  </div>
                  {/* Decorative corner elements */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />
                </motion.div>

                <div className="flex-1 space-y-6 text-center md:text-left w-full">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-mono text-primary text-sm mb-2 justify-center md:justify-start">
                      <ChevronRight className="w-4 h-4" />
                      <Typewriter text="whoami" speed={100} />
                    </div>
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none"
                    >
                      {data.first_name}{" "}
                      <span className="text-primary text-glow block sm:inline">{data.last_name}</span>
                    </motion.h1>
                    <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mt-4">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="px-3 py-1 bg-primary/10 border border-primary/20 rounded font-mono text-primary text-sm md:text-base"
                      >
                        <Typewriter text={data.profession} delay={1000} speed={50} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Links Section - Redesigned as Active Connections */}
                  <div className="space-y-6 pt-4">
                    <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                        <Terminal className="w-3 h-3 text-primary" />
                        Active_Connections
                      </div>
                      <div className="font-mono text-[9px] text-primary/50 animate-pulse">
                        SCANNING_PORTS...
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {data.links.map((link, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                        >
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 p-2.5 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 relative overflow-hidden"
                          >
                            {/* Connection Status Indicator */}
                            <div className="flex flex-col items-center gap-1 shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover:animate-ping" />
                              <div className="w-[1px] h-3 bg-primary/20" />
                            </div>
                            
                            {/* Icon & Label */}
                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                              <div className="p-1.5 rounded-lg bg-secondary border border-primary/5 group-hover:border-primary/20 group-hover:text-primary transition-all transform group-hover:scale-110 shrink-0">
                                {getIcon(link.name)}
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary/20 rounded-full blur-[2px] animate-pulse" />
                              </div>
                              <div className="flex flex-col overflow-hidden">
                                <span className="text-xs font-bold group-hover:text-primary transition-colors truncate">
                                  {link.name}
                                </span>
                                <div className="flex items-center gap-1.5 font-mono text-[7px] text-muted-foreground uppercase tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity">
                                  <span className="truncate max-w-[80px]">{link.url.replace(/^https?:\/\//, "").split("/")[0]}</span>
                                  <span className="text-accent/50">{10 + i * 5}ms</span>
                                </div>
                              </div>
                            </div>

                            {/* Action Indicator */}
                            <div className="flex items-center gap-2 font-mono text-[8px] text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                              <ExternalLink className="w-3 h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>

                            {/* Hover background scanline */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          </a>
                        </motion.div>
                      ))}
                    </div>

                    {/* Connection Stats */}
                    <div className="flex items-center gap-4 pt-2 font-mono text-[9px] text-muted-foreground/50">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        TCP_LISTEN
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-accent" />
                        ENCRYPTED_TLS_1.3
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Terminal Footer Status */}
              <div className="pt-6 border-t border-primary/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    System Online
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    v2.4.0-stable
                  </span>
                  <span className="hidden sm:flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    CPU: 12%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden md:inline">UTF-8</span>
                  <span className="hidden md:inline">Ln 1, Col 1</span>
                  <span className="text-primary font-bold">READY_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10" />
      
      {/* Decorative Code Snippets */}
      <div className="absolute top-40 right-10 font-mono text-[10px] text-primary/10 hidden xl:block select-none pointer-events-none">
        <pre>{`
function initialize() {
  const core = new Core();
  core.connect();
  return core.status;
}
        `}</pre>
      </div>
      <div className="absolute bottom-40 left-10 font-mono text-[10px] text-primary/10 hidden xl:block select-none pointer-events-none">
        <pre>{`
{
  "status": "active",
  "uptime": "99.9%",
  "location": "remote"
}
        `}</pre>
      </div>
    </section>
  );
}
