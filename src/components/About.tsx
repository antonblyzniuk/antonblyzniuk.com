import { motion } from "motion/react";
import { CVData } from "../types";
import { MapPin, Phone, Mail, Code2, Layers, BookOpen } from "lucide-react";
import { cn } from "../lib/utils";
import Typewriter from "./Typewriter";

export default function About({ data }: { data: CVData }) {
  const sysInfo = [
    { key: "USER", value: `${data.first_name} ${data.last_name}` },
    { key: "ROLE", value: data.profession },
    ...(data.location ? [{ key: "LOCATION", value: data.location, icon: MapPin }] : []),
    { key: "EMAIL", value: data.email, icon: Mail },
    ...(data.phone ? [{ key: "PHONE", value: data.phone, icon: Phone }] : []),
    { key: "SKILLS", value: `${data.skills.length} modules loaded`, icon: Code2 },
    { key: "EXPERIENCE", value: `${data.experience_units.length} entries`, icon: Layers },
    { key: "LANGUAGES", value: `${data.languages.length} locales`, icon: BookOpen },
  ] as const;

  return (
    <section id="about" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs sm:text-sm overflow-hidden">
            <span className="text-primary shrink-0">root@portfolio:</span>
            <span className="text-accent shrink-0">~</span>
            <span className="text-foreground truncate">$ <Typewriter text="cat profile_summary" speed={50} /></span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-glow"
          >
            System Overview
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="terminal-window bg-secondary/20 p-6 sm:p-8 border-primary/10 h-full">
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="text-primary">#</span>
                profile_summary.txt
              </div>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-mono">
                {data.about}
              </p>
            </div>
          </motion.div>

          {/* Sys info panel */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="terminal-window bg-secondary/40 border-primary/10 overflow-hidden">
              <div className="bg-secondary border-b border-primary/10 px-4 py-2 flex items-center gap-2 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary/60" />
                sys_info.json
              </div>
              <div className="p-4 space-y-1 font-mono text-sm">
                {sysInfo.map((item, i) => {
                  const Icon = "icon" in item ? item.icon : null;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start justify-between gap-3 py-2 border-b border-primary/5 last:border-0"
                    >
                      <span className="text-muted-foreground text-[10px] uppercase tracking-widest shrink-0 pt-0.5">
                        {item.key}
                      </span>
                      <span className="text-primary text-right text-xs leading-relaxed flex items-center gap-1.5 min-w-0">
                        {Icon && <Icon className="w-3 h-3 shrink-0 text-primary/60" />}
                        <span className="truncate">{item.value}</span>
                      </span>
                    </motion.div>
                  );
                })}
                <div className="flex items-center justify-between py-2 mt-1">
                  <span className="text-muted-foreground text-[10px] uppercase tracking-widest">STATUS</span>
                  <span className="text-emerald-400 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
