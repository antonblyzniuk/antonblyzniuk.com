import { motion } from "motion/react";
import { CVData } from "../types";
import { cn } from "../lib/utils";

const levelOrder: Record<string, number> = { expert: 4, advanced: 3, intermediate: 2, beginner: 1 };

function getLevelDots(level: string | null) {
  const map: Record<string, number> = { expert: 4, advanced: 3, intermediate: 2, beginner: 1 };
  return map[level?.toLowerCase() ?? ""] ?? 0;
}

function getLevelColors(level: string | null) {
  switch (level?.toLowerCase()) {
    case "expert":
      return {
        chip: "border-primary/28 bg-primary/8 text-primary hover:border-primary/65 hover:bg-primary/15 hover:shadow-[0_0_24px_rgba(180,190,254,0.22)]",
        dot: "bg-primary",
        glow: "0 0 24px rgba(180,190,254,0.25)",
      };
    case "advanced":
      return {
        chip: "border-[#cba6f7]/22 bg-[#cba6f7]/7 text-[#cba6f7] hover:border-[#cba6f7]/50 hover:bg-[#cba6f7]/14",
        dot: "bg-[#cba6f7]",
        glow: "",
      };
    case "intermediate":
      return {
        chip: "border-accent/22 bg-accent/7 text-accent hover:border-accent/50 hover:bg-accent/14",
        dot: "bg-accent",
        glow: "",
      };
    default:
      return {
        chip: "border-border/70 bg-surface/60 text-muted-foreground hover:border-border",
        dot: "bg-muted-foreground/50",
        glow: "",
      };
  }
}

function getLevelBarColor(level: string | null) {
  switch (level?.toLowerCase()) {
    case "expert":       return "bg-gradient-to-r from-primary to-[#cba6f7]";
    case "advanced":     return "bg-gradient-to-r from-[#cba6f7] to-primary/70";
    case "intermediate": return "bg-gradient-to-r from-accent to-accent/70";
    default:             return "bg-muted-foreground/50";
  }
}

function getLevelWidth(level: string | null) {
  switch (level?.toLowerCase()) {
    case "expert":       return "100%";
    case "advanced":     return "78%";
    case "intermediate": return "52%";
    case "beginner":     return "26%";
    default:             return "0%";
  }
}

const catColors: Record<number, { line: string; label: string }> = {
  0: { line: "from-primary/60 to-transparent", label: "text-primary/60" },
  1: { line: "from-[#cba6f7]/60 to-transparent", label: "text-[#cba6f7]/60" },
  2: { line: "from-accent/60 to-transparent", label: "text-accent/60" },
  3: { line: "from-[#89dceb]/60 to-transparent", label: "text-[#89dceb]/60" },
};

export default function Skills({ data }: { data: CVData }) {
  const hasLevels     = data.skills.some((s) => s.level);
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
    : null;

  return (
    <section id="skills" className="py-24 scroll-mt-24 relative overflow-x-hidden">
      <div className="section-num absolute top-4 right-0 select-none pointer-events-none">02</div>

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
            <span>02 · skills</span>
            <div className="h-px w-6 bg-primary/20" />
          </div>
          <h2
            className="font-display font-black tracking-tight leading-[0.86]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <span className="block text-foreground">Tech</span>
            <span className="block gradient-text">Stack</span>
          </h2>
        </motion.div>

        {/* Skills display */}
        {hasLevels && grouped ? (
          <div className="space-y-10">
            {Object.entries(grouped).map(([category, skills], catIdx) => {
              const cc = catColors[catIdx % 4];
              return (
                <motion.div
                  key={catIdx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.08 }}
                >
                  <div className="flex items-center gap-3 mb-5 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.22em]">
                    <span className={`font-bold ${cc.label}`}>##</span>
                    <span>{category}</span>
                    <span className={`flex-1 h-px bg-gradient-to-r ${cc.line}`} />
                    <span className="text-muted-foreground/40 text-[10px]">{skills.length} modules</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {skills.map((skill, i) => {
                      const colors = getLevelColors(skill.level);
                      const dots = getLevelDots(skill.level);
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: catIdx * 0.05 + i * 0.03,
                            type: "spring",
                            stiffness: 300,
                            damping: 22,
                          }}
                          whileHover={{ y: -4, scale: 1.04 }}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-sm cursor-default transition-all duration-200",
                            colors.chip
                          )}
                          style={colors.glow ? { boxShadow: "none" } : undefined}
                        >
                          <span>{skill.name}</span>
                          {dots > 0 && (
                            <span className="flex items-center gap-0.5 ml-0.5">
                              {[1, 2, 3, 4].map((d) => (
                                <span
                                  key={d}
                                  className={cn(
                                    "w-[5px] h-[5px] rounded-full transition-opacity",
                                    d <= dots ? colors.dot : "bg-current opacity-15"
                                  )}
                                />
                              ))}
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : hasLevels ? (
          /* Flat list with gradient progress bars */
          <div className="bento-card p-5 sm:p-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5">
              {sorted.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.035 }}
                  className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-primary/5 transition-colors group"
                >
                  <span className="text-accent/45 text-xs shrink-0">$</span>
                  <span className="font-mono text-sm text-foreground/75 flex-1 truncate group-hover:text-foreground transition-colors">
                    {skill.name}
                  </span>
                  {skill.level && (
                    <>
                      <div className="w-20 h-1 bg-secondary/80 rounded-full overflow-hidden shrink-0">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: getLevelWidth(skill.level) }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.03 + 0.2, duration: 0.8, ease: "easeOut" }}
                          className={cn("h-full rounded-full", getLevelBarColor(skill.level))}
                        />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider w-16 text-right shrink-0 text-muted-foreground/45 group-hover:text-muted-foreground/75 transition-opacity">
                        {skill.level}
                      </span>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Badge cloud */
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.82 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.035, type: "spring", stiffness: 280, damping: 20 }}
                whileHover={{ y: -4, scale: 1.06 }}
                className="px-4 py-2.5 bento-card border-primary/15 hover:border-primary/40 hover:bg-primary/8 font-mono text-sm text-muted-foreground hover:text-primary transition-all duration-200 cursor-default"
              >
                <span className="text-accent/55 mr-2">#</span>
                {skill.name}
              </motion.div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.22em]">
              <span className="text-accent/65 font-bold">##</span>
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
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="bento-card border-accent/12 hover:border-accent/30 p-4 transition-all duration-200 group"
                >
                  <div className="font-mono text-sm font-bold text-foreground group-hover:text-accent transition-colors truncate">
                    {lang.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1.5">
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
