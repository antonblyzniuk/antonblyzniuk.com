import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { CVData } from "../types";
import { MapPin, Phone, Mail, Code2, Layers, Briefcase, Award } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(value / 30));
    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function About({ data }: { data: CVData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const numY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const sysInfo = [
    { key: "USER", value: `${data.first_name} ${data.last_name}` },
    { key: "ROLE", value: data.profession },
    ...(data.location ? [{ key: "LOC", value: data.location, Icon: MapPin }] : []),
    { key: "EMAIL", value: data.email, Icon: Mail },
    ...(data.phone ? [{ key: "PHONE", value: data.phone, Icon: Phone }] : []),
    { key: "STATUS", value: "Online", isStatus: true },
  ] as const;

  const stats = [
    { label: "Projects", value: data.projects.length, suffix: "+", Icon: Code2, color: "#7c6aff" },
    { label: "Positions", value: data.experience_units.length, suffix: "", Icon: Briefcase, color: "#ff6b6b" },
    { label: "Skills", value: data.skills.length, suffix: "+", Icon: Layers, color: "#a89aff" },
    { label: "Certs", value: data.certifications.length, suffix: "", Icon: Award, color: "#00ffcc" },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 scroll-mt-24 relative overflow-x-hidden">
      {/* Parallax section number */}
      <motion.div
        style={{ y: numY }}
        className="absolute top-4 right-0 select-none pointer-events-none font-syne font-black"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-syne, Syne, sans-serif)",
            fontSize: "10rem",
            fontWeight: 900,
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: "1px rgba(124,106,255,0.04)",
          }}
        >
          01
        </span>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header with clip-path reveal */}
        <div className="mb-14">
          <div className="section-eyebrow mb-5">
            <div className="h-px flex-1 max-w-[48px] bg-gradient-to-r from-transparent to-primary/25" />
            <span>01 · about</span>
            <div className="h-px w-6 bg-primary/20" />
          </div>
          <h2
            className="font-display font-black leading-[0.86]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            <motion.span
              className="block text-foreground overflow-hidden"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              SYSTEM
            </motion.span>
            <motion.span
              className="block gradient-text overflow-hidden"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              OVERVIEW
            </motion.span>
          </h2>
        </div>

        {/* Bio + sys-info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start mb-5">

          {/* Bio card with fake terminal + typewriter */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="h-full liquid-card rounded-2xl p-7 sm:p-9 relative z-[1]">
              {/* Fake terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/10">
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-3/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-2/50" />
                </span>
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.22em] ml-2">
                  profile_summary.txt
                </span>
              </div>
              <p className="text-base sm:text-[17px] leading-[1.75] font-mono" style={{ color: "rgba(232,232,240,0.75)" }}>
                {data.about}
              </p>
              <div className="mt-8 pt-5 border-t border-primary/7 font-mono text-xs flex items-center gap-2" style={{ color: "rgba(74,74,106,0.5)" }}>
                <span style={{ color: "rgba(124,106,255,0.4)" }}>$</span>
                <span>cat profile_summary.txt</span>
                <span style={{ color: "rgba(124,106,255,0.6)" }} className="ml-1">EOF</span>
              </div>
            </div>
          </motion.div>

          {/* Sys-info panel */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            <div className="liquid-card rounded-2xl overflow-hidden relative z-[1]">
              <div className="px-5 py-3 border-b border-primary/10 flex items-center gap-2.5 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                <span className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-destructive/50" />
                  <span className="w-2 h-2 rounded-full bg-accent-3/50" />
                  <span className="w-2 h-2 rounded-full bg-accent-2/50" />
                </span>
                {data.first_name.toLowerCase()}_profile
              </div>
              <div className="p-5 space-y-0.5 font-mono text-sm">
                {sysInfo.map((item, i) => {
                  const Icon = "Icon" in item && item.Icon ? item.Icon : null;
                  const isStatus = "isStatus" in item && item.isStatus;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 + i * 0.055, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start justify-between gap-3 py-2.5 border-b last:border-0"
                      style={{ borderColor: "rgba(124,106,255,0.07)" }}
                    >
                      <span className="text-muted-foreground text-[10px] uppercase tracking-widest shrink-0 pt-0.5">
                        {item.key}
                      </span>
                      <span
                        className="text-right text-xs leading-snug flex items-center gap-1.5 min-w-0"
                        style={{ color: isStatus ? "#4ade80" : "#a89aff" }}
                      >
                        {Icon && <Icon className="w-3 h-3 shrink-0 opacity-60" />}
                        {isStatus ? (
                          <span className="flex items-center gap-1.5 font-semibold">
                            {/* Two concentric pulsing rings */}
                            <span className="relative flex items-center justify-center w-3 h-3">
                              <motion.span
                                className="absolute rounded-full border border-emerald-400"
                                style={{ width: "100%", height: "100%" }}
                                animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                              />
                              <motion.span
                                className="absolute rounded-full border border-emerald-400"
                                style={{ width: "100%", height: "100%" }}
                                animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                              />
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            </span>
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

        {/* Holographic stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="liquid-card rounded-2xl p-5 flex flex-col gap-3 group relative z-[1]"
              style={{ boxShadow: "none" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  `0 0 30px ${stat.color}25, 0 0 80px ${stat.color}10`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Shimmer sweep on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{
                  background: `linear-gradient(105deg, transparent 30%, ${stat.color}12 50%, transparent 70%)`,
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s ease-in-out",
                }}
              />

              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: `${stat.color}15`,
                  border: `1px solid ${stat.color}25`,
                  boxShadow: `0 0 12px ${stat.color}20`,
                }}
              >
                <stat.Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <div
                  className="font-display font-black text-5xl leading-none relative z-[1]"
                  style={{ color: stat.color }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest mt-1" style={{ color: "#4a4a6a" }}>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
