import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { CVData } from "../types";

const levelOrder: Record<string, number> = { expert: 4, advanced: 3, intermediate: 2, beginner: 1 };

function getLevelWidth(level: string | null): number {
  switch (level?.toLowerCase()) {
    case "expert": return 100;
    case "advanced": return 78;
    case "intermediate": return 52;
    case "beginner": return 26;
    default: return 0;
  }
}

function getLevelLabel(level: string | null): string {
  return level?.toUpperCase() ?? "N/A";
}

const catColorAccents = [
  { border: "#7c6aff", text: "#a89aff" },
  { border: "#00ffcc", text: "#00ffcc" },
  { border: "#ff6b6b", text: "#ff6b6b" },
  { border: "#ffcc00", text: "#ffcc00" },
];

export default function Skills({ data }: { data: CVData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const hasCategories = data.skills.some((s) => s.category);
  const sorted = [...data.skills].sort((a, b) => {
    const la = levelOrder[a.level?.toLowerCase() ?? ""] ?? 0;
    const lb = levelOrder[b.level?.toLowerCase() ?? ""] ?? 0;
    return lb - la;
  });

  const grouped = hasCategories
    ? sorted.reduce((acc, skill) => {
        const cat = skill.category || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
      }, {} as Record<string, typeof sorted>)
    : { All: sorted };

  const categories = Object.keys(grouped);
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? "All");
  const activeSkills = grouped[activeCategory] ?? sorted;

  return (
    <section ref={sectionRef} id="skills" className="py-24 scroll-mt-24 relative overflow-x-hidden">
      {/* Parallax background text */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-syne, Syne, sans-serif)",
            fontSize: "clamp(6rem, 22vw, 20rem)",
            fontWeight: 900,
            color: "transparent",
            WebkitTextStroke: "1px rgba(124,106,255,0.025)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          SKILLS
        </span>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="section-eyebrow mb-5">
            <div className="h-px flex-1 max-w-[48px] bg-gradient-to-r from-transparent to-primary/25" />
            <span>02 · capabilities</span>
            <div className="h-px w-6 bg-primary/20" />
          </div>
          <h2
            className="font-display font-black leading-[0.86]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            <span className="block text-foreground">TECH</span>
            <span className="block gradient-text">CAPABILITIES</span>
          </h2>
        </motion.div>

        {/* Two-panel layout — hidden on mobile */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left panel: category list (40%) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[40%]"
          >
            {/* Mobile: horizontal scrollable tabs */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex-none px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-200"
                  style={{
                    background: activeCategory === cat ? "rgba(124,106,255,0.15)" : "rgba(8,8,22,0.6)",
                    border: `1px solid ${activeCategory === cat ? "rgba(124,106,255,0.4)" : "rgba(124,106,255,0.1)"}`,
                    color: activeCategory === cat ? "#a89aff" : "#4a4a6a",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Desktop: clickable rows */}
            <div className="hidden lg:block space-y-1">
              {categories.map((cat, i) => {
                const accent = catColorAccents[i % catColorAccents.length];
                const isActive = activeCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full text-left px-4 py-3 rounded-lg font-mono text-sm flex items-center gap-3 group transition-all duration-200"
                    style={{
                      borderLeft: `2px solid ${isActive ? accent.border : "transparent"}`,
                      background: isActive ? `${accent.border}0a` : "transparent",
                    }}
                  >
                    <motion.span
                      animate={{ x: isActive ? 4 : 0, color: isActive ? accent.text : "#4a4a6a" }}
                      transition={{ duration: 0.2 }}
                      className="font-bold"
                    >
                      →
                    </motion.span>
                    <span
                      style={{ color: isActive ? accent.text : "#4a4a6a" }}
                      className="uppercase tracking-widest text-xs flex-1 transition-colors duration-200 group-hover:text-foreground"
                    >
                      {cat}
                    </span>
                    <span className="text-[10px]" style={{ color: isActive ? accent.border : "rgba(74,74,106,0.4)" }}>
                      {grouped[cat]?.length ?? 0}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Right panel: skill bars (60%) */}
          <div className="w-full lg:w-[60%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3"
              >
                {activeSkills.map((skill, i) => (
                  <motion.div
                    key={`${activeCategory}-${skill.name}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-sm text-foreground/85 group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                      {skill.level && (
                        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "#4a4a6a" }}>
                          {getLevelLabel(skill.level)}
                        </span>
                      )}
                    </div>
                    {skill.level && (
                      <div
                        className="h-[2px] rounded-full overflow-hidden"
                        style={{ background: "rgba(124,106,255,0.08)" }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${getLevelWidth(skill.level)}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.04 + 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #7c6aff, #00ffcc)" }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.22em]">
              <span style={{ color: "rgba(255,107,107,0.7)" }} className="font-bold">##</span>
              <span>Languages</span>
              <span className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.languages.map((lang, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="liquid-card rounded-xl p-4 group relative z-[1]"
                >
                  <div className="font-mono text-sm font-bold text-foreground/85 group-hover:text-primary-light transition-colors truncate relative z-[1]">
                    {lang.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1.5 relative z-[1]">
                    {lang.level}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
