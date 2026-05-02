import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CVData } from "../types";
import { MapPin, Phone, Mail, Code2, Layers, BookOpen, Briefcase, Award } from "lucide-react";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref}>
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 }}
          >
            {value}
          </motion.span>
          {suffix}
        </motion.span>
      ) : (
        <span>0{suffix}</span>
      )}
    </span>
  );
}

export default function About({ data }: { data: CVData }) {
  const sysInfo = [
    { key: "USER",       value: `${data.first_name} ${data.last_name}` },
    { key: "ROLE",       value: data.profession },
    ...(data.location ? [{ key: "LOC",  value: data.location, icon: MapPin  }] : []),
    { key: "EMAIL",      value: data.email,      icon: Mail   },
    ...(data.phone    ? [{ key: "PHONE", value: data.phone,   icon: Phone   }] : []),
    { key: "STATUS",     value: "Online",         icon: null   },
  ] as const;

  const stats = [
    {
      label: "Projects",
      value: data.projects.length,
      suffix: "+",
      icon: Code2,
      color: "primary" as const,
    },
    {
      label: "Positions",
      value: data.experience_units.length,
      suffix: "",
      icon: Briefcase,
      color: "accent" as const,
    },
    {
      label: "Skills",
      value: data.skills.length,
      suffix: "+",
      icon: Layers,
      color: "mauve" as const,
    },
    {
      label: "Certs",
      value: data.certifications.length,
      suffix: "",
      icon: Award,
      color: "sky" as const,
    },
  ];

  const colorMap = {
    primary: { border: "border-primary/18", text: "text-primary", bg: "bg-primary/8" },
    accent:  { border: "border-accent/18",  text: "text-accent",  bg: "bg-accent/8"  },
    mauve:   { border: "border-[#cba6f7]/18", text: "text-[#cba6f7]", bg: "bg-[#cba6f7]/8" },
    sky:     { border: "border-[#89dceb]/18", text: "text-[#89dceb]", bg: "bg-[#89dceb]/8" },
  };

  return (
    <section id="about" className="py-24 scroll-mt-24 relative overflow-x-hidden">
      <div className="section-num absolute top-4 right-0 select-none pointer-events-none">01</div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="section-eyebrow mb-5">
            <div className="h-px flex-1 max-w-[48px] bg-gradient-to-r from-transparent to-primary/25" />
            <span>01 · about</span>
            <div className="h-px w-6 bg-primary/20" />
          </div>
          <h2
            className="font-display font-black tracking-tight leading-[0.86]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <span className="block text-foreground">System</span>
            <span className="block gradient-text">Overview</span>
          </h2>
        </motion.div>

        {/* Bio + sys-info row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start mb-5">

          {/* ── Bio card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="h-full bento-card p-7 sm:p-9">
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.22em] mb-6">
                <span className="text-primary/60">#</span>
                profile_summary.txt
              </div>
              <p className="text-base sm:text-[17px] text-foreground/75 leading-[1.75] font-mono">
                {data.about}
              </p>
              <div className="mt-8 pt-5 border-t border-primary/7 font-mono text-xs text-muted-foreground/40 flex items-center gap-2">
                <span className="text-primary/35">$</span>
                <span>cat profile_summary.txt —{" "}<span className="text-primary/50">EOF</span></span>
              </div>
            </div>
          </motion.div>

          {/* ── Sys-info panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bento-card overflow-hidden">
              <div className="px-5 py-3 border-b border-primary/7 flex items-center gap-2.5 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                <span className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-destructive/50" />
                  <span className="w-2 h-2 rounded-full bg-accent/50" />
                  <span className="w-2 h-2 rounded-full bg-primary/50" />
                </span>
                {data.first_name.toLowerCase()}_profile
              </div>
              <div className="p-5 space-y-0.5 font-mono text-sm">
                {sysInfo.map((item, i) => {
                  const Icon = "icon" in item && item.icon ? item.icon : null;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 + i * 0.055 }}
                      className="flex items-start justify-between gap-3 py-2.5 border-b border-primary/5 last:border-0"
                    >
                      <span className="text-muted-foreground text-[10px] uppercase tracking-widest shrink-0 pt-0.5">
                        {item.key}
                      </span>
                      <span
                        className={`text-right text-xs leading-snug flex items-center gap-1.5 min-w-0 ${
                          item.key === "STATUS" ? "text-emerald-400 font-semibold" : "text-primary"
                        }`}
                      >
                        {Icon && <Icon className="w-3 h-3 shrink-0 opacity-60" />}
                        {item.key === "STATUS" ? (
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {item.value}
                          </span>
                        ) : (
                          <span className="truncate">{item.value}</span>
                        )}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {stats.map((stat, i) => {
            const colors = colorMap[stat.color];
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 160, damping: 20 }}
                className={`bento-card p-5 flex flex-col gap-3 ${colors.border}`}
              >
                <div className={`w-9 h-9 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${colors.text}`} />
                </div>
                <div>
                  <div className={`font-display font-black text-3xl ${colors.text} leading-none`}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
