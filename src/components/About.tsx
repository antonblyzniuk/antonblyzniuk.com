import { motion } from "motion/react";
import { CVData } from "../types";
import { MapPin, Phone, Mail, Code2, Layers, BookOpen } from "lucide-react";

export default function About({ data }: { data: CVData }) {
  const sysInfo = [
    { key: "USER",       value: `${data.first_name} ${data.last_name}` },
    { key: "ROLE",       value: data.profession },
    ...(data.location  ? [{ key: "LOCATION",   value: data.location,                          icon: MapPin   }] : []),
    { key: "EMAIL",      value: data.email,                                                      icon: Mail     },
    ...(data.phone     ? [{ key: "PHONE",       value: data.phone,                              icon: Phone    }] : []),
    { key: "SKILLS",     value: `${data.skills.length} modules loaded`,                          icon: Code2    },
    { key: "EXPERIENCE", value: `${data.experience_units.length} entries`,                       icon: Layers   },
    { key: "LANGUAGES",  value: `${data.languages.length} locales`,                             icon: BookOpen },
  ] as const;

  return (
    <section id="about" className="py-24 scroll-mt-24 relative overflow-hidden">
      {/* Decorative section number */}
      <div className="section-num absolute -top-6 right-0 select-none pointer-events-none">01</div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3 font-mono text-xs text-primary/60 uppercase tracking-[0.25em]">
            <span className="w-8 h-px bg-primary/30" />
            01 / about
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
            <span className="text-foreground">System </span>
            <span className="gradient-text">Overview</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* ── Bio card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="h-full glass rounded-2xl border border-primary/12 p-7 sm:p-9 shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.22em] mb-5">
                <span className="text-primary">#</span>
                profile_summary.txt
              </div>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-mono">
                {data.about}
              </p>

              {/* Decorative prompt at bottom */}
              <div className="mt-8 pt-5 border-t border-primary/8 font-mono text-xs text-muted-foreground/50 flex items-center gap-2">
                <span className="text-primary/40">$</span>
                <span>cat profile_summary.txt — <span className="text-primary/60">EOF</span></span>
              </div>
            </div>
          </motion.div>

          {/* ── Sys-info panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass rounded-2xl border border-primary/12 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
              {/* Panel header */}
              <div className="px-5 py-3 border-b border-primary/8 flex items-center gap-2.5 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                <span className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-destructive/50" />
                  <span className="w-2 h-2 rounded-full bg-accent/50" />
                  <span className="w-2 h-2 rounded-full bg-primary/50" />
                </span>
                {data.first_name.toLowerCase()}_profile
              </div>

              <div className="p-5 space-y-0.5 font-mono text-sm">
                {sysInfo.map((item, i) => {
                  const Icon = "icon" in item ? item.icon : null;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="flex items-start justify-between gap-3 py-2.5 border-b border-primary/5 last:border-0 group"
                    >
                      <span className="text-muted-foreground text-[10px] uppercase tracking-widest shrink-0 pt-0.5">
                        {item.key}
                      </span>
                      <span className="text-primary text-right text-xs leading-snug flex items-center gap-1.5 min-w-0">
                        {Icon && <Icon className="w-3 h-3 shrink-0 text-primary/50" />}
                        <span className="truncate">{item.value}</span>
                      </span>
                    </motion.div>
                  );
                })}

                {/* Status row */}
                <div className="flex items-center justify-between py-2.5 mt-1">
                  <span className="text-muted-foreground text-[10px] uppercase tracking-widest">STATUS</span>
                  <span className="text-emerald-400 text-xs flex items-center gap-1.5 font-semibold">
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
