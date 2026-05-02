import { motion } from "motion/react";
import { CVData } from "../types";
import { Terminal, Github, Linkedin, Mail, ChevronRight, Monitor, ExternalLink, Globe, Phone, MapPin } from "lucide-react";
import Typewriter from "./Typewriter";

export default function Hero({ data }: { data: CVData }) {
  const mainPhoto = data.photos.find((p) => p.is_main)?.image || data.photos[0]?.image;

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("github")) return <Github className="w-4 h-4" />;
    if (n.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
    if (n.includes("mail") || n.includes("email")) return <Mail className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <section className="min-h-screen pt-32 pb-20 flex flex-col justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="terminal-window bg-secondary/30 backdrop-blur-sm overflow-hidden">
            {/* Terminal header */}
            <div className="bg-secondary border-b border-primary/10 px-4 py-2.5 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/70 hover:bg-destructive transition-colors cursor-default" />
                <div className="w-3 h-3 rounded-full bg-accent/70 hover:bg-accent transition-colors cursor-default" />
                <div className="w-3 h-3 rounded-full bg-primary/70 hover:bg-primary transition-colors cursor-default" />
              </div>
              <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
                <Monitor className="w-3 h-3" />
                ~/profile.sh
              </div>
              <div className="font-mono text-[10px] text-emerald-400/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SSH
              </div>
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
                {/* Profile photo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative group shrink-0"
                >
                  <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 relative">
                    <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-primary z-10 transition-all duration-500 group-hover:w-7 group-hover:h-7" />
                    <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-primary z-10 transition-all duration-500 group-hover:w-7 group-hover:h-7" />
                    <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-primary z-10 transition-all duration-500 group-hover:w-7 group-hover:h-7" />
                    <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-primary z-10 transition-all duration-500 group-hover:w-7 group-hover:h-7" />

                    <div className="w-full h-full rounded-lg overflow-hidden border border-primary/20 bg-secondary/50 shadow-[0_0_40px_rgba(180,190,254,0.08)] group-hover:shadow-[0_0_60px_rgba(180,190,254,0.15)] transition-shadow duration-500">
                      <img
                        src={mainPhoto || "https://picsum.photos/seed/profile/400/400"}
                        alt={`${data.first_name} ${data.last_name}`}
                        className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100 group-hover:brightness-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* CRT scanlines overlay */}
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.04)_3px,rgba(0,0,0,0.04)_4px)] pointer-events-none opacity-60" />
                    </div>

                    <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-secondary border border-primary/25 rounded-full px-3 py-0.5 font-mono text-[9px] text-emerald-400 flex items-center gap-1.5 whitespace-nowrap shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ONLINE
                    </div>
                  </div>
                </motion.div>

                {/* Info column */}
                <div className="flex-1 space-y-5 text-center md:text-left w-full min-w-0">
                  <div className="flex items-center gap-2 font-mono text-primary text-sm justify-center md:justify-start">
                    <ChevronRight className="w-4 h-4 shrink-0" />
                    <Typewriter text="whoami" speed={100} />
                  </div>

                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9]"
                  >
                    <span className="block text-foreground">{data.first_name}</span>
                    <span className="block text-primary text-glow">{data.last_name}</span>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="space-y-3"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/25 rounded-md font-mono text-primary text-sm">
                      <span className="text-primary/40">$</span>
                      <Typewriter text={data.profession} delay={800} speed={40} />
                    </div>

                    {(data.location || data.phone) && (
                      <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                        {data.location && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/80 border border-primary/15 rounded-md font-mono text-sm text-foreground/70">
                            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{data.location}</span>
                          </div>
                        )}
                        {data.phone && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/80 border border-primary/15 rounded-md font-mono text-sm text-foreground/70">
                            <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span>{data.phone}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>

                  {/* Links */}
                  {data.links.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="pt-1"
                    >
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-3 flex items-center gap-2 justify-center md:justify-start">
                        <Terminal className="w-3 h-3 text-primary" />
                        Connected_Channels
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {data.links.map((link, i) => (
                          <motion.a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + i * 0.07 }}
                            className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-primary/10 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200 font-mono text-xs text-muted-foreground hover:text-primary"
                          >
                            {getIcon(link.name)}
                            <span>{link.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="px-5 py-2 bg-secondary border-t border-primary/10 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-muted-foreground">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <span className="flex items-center gap-1.5 text-emerald-400/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE
                </span>
                <span className="flex items-center gap-1.5 truncate max-w-[160px]">
                  <Mail className="w-3 h-3 text-primary/50 shrink-0" />
                  {data.email}
                </span>
                {data.location && (
                  <span className="hidden sm:flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-primary/50 shrink-0" />
                    {data.location}
                  </span>
                )}
              </div>
              <span className="text-primary font-bold tracking-widest">READY_</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-primary/6 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </section>
  );
}
