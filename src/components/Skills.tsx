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
    case "expert":       return { chip: "border-primary/30 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/18 hover:shadow-[0_0_20px_rgba(180,190,254,0.2)]", dot: "bg-primary" };
    case "advanced":     return { chip: "border-primary/20 bg-primary/6 text-primary/80 hover:border-primary/40 hover:bg-primary/12", dot: "bg-primary/70" };
    case "intermediate": return { chip: "border-accent/25 bg-accent/8 text-accent/90 hover:border-accent/50 hover:bg-accent/14", dot: "bg-accent" };
    default:             return { chip: "border-border/60 bg-secondary/40 text-muted-foreground hover:border-border", dot: "bg-muted-foreground/50" };
  }
}

function getLevelBarColor(level: string | null) {
  switch (level?.toLowerCase()) {
    case "expert":       return "bg-primary";
    case "advanced":     return "bg-primary/70";
    case "intermediate": return "bg-accent";
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
    <section id="skills" className="py-24 scroll-mt-24 relative overflow-hidden">
      {/* Decorative number */}
      <div className="section-num absolute -top-6 right-0 select-none pointer-events-none">02</div>

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
            02 / skills
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
            <span className="text-foreground">Tech </span>
            <span className="gradient-text">Stack</span>
          </h2>
        </motion.div>

        {/* Skills display */}
        {hasLevels && grouped ? (
          /* Grouped categories — chip cloud with level dots */
          <div className="space-y-10">
            {Object.entries(grouped).map(([category, skills], catIdx) => (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.07 }}
              >
                <div className="flex items-center gap-3 mb-4 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
                  <span className="text-accent/70 font-bold">##</span>
                  <span>{category}</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-primary/15 to-transparent" />
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill, i) => {
                    const colors = getLevelColors(skill.level);
                    const dots = getLevelDots(skill.level);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.88 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIdx * 0.06 + i * 0.035, type: "spring", stiffness: 280, damping: 22 }}
                        whileHover={{ y: -3 }}
                        className={cn(
                          "flex items-center gap-2 px-3.5 py-2 rounded-xl border font-mono text-sm cursor-default transition-all duration-200",
                          colors.chip
                        )}
                      >
                        <span>{skill.name}</span>
                        {dots > 0 && (
                          <span className="flex items-center gap-0.5 ml-1">
                            {[1, 2, 3, 4].map((d) => (
                              <span
                                key={d}
                                className={cn("w-1 h-1 rounded-full", d <= dots ? colors.dot : "bg-current/15")}
                              />
                            ))}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : hasLevels ? (
          /* Flat list with progress bars */
          <div className="glass rounded-2xl border border-primary/12 p-5 sm:p-7 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0.5">
              {sorted.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-primary/5 transition-colors group"
                >
                  <span className="text-accent/50 text-xs shrink-0">$</span>
                  <span className="font-mono text-sm text-foreground/80 flex-1 truncate group-hover:text-foreground transition-colors">
                    {skill.name}
                  </span>
                  {skill.level && (
                    <>
                      <div className="w-20 h-1.5 bg-secondary/80 rounded-full overflow-hidden shrink-0">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: getLevelWidth(skill.level) }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.03 + 0.2, duration: 0.7, ease: "easeOut" }}
                          className={cn("h-full rounded-full", getLevelBarColor(skill.level))}
                        />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider w-16 text-right shrink-0 text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-opacity">
                        {skill.level}
                      </span>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Badge cloud — no level data */
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ y: -4, scale: 1.06 }}
                className="px-4 py-2 rounded-xl glass border border-primary/15 hover:border-primary/40 hover:bg-primary/8 font-mono text-sm text-muted-foreground hover:text-primary transition-all duration-200 cursor-default"
              >
                <span className="text-accent/60 mr-2">#</span>
                {skill.name}
              </motion.div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
              <span className="text-accent/70 font-bold">##</span>
              <span>Languages</span>
              <span className="flex-1 h-px bg-gradient-to-r from-accent/15 to-transparent" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {data.languages.map((lang, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -3 }}
                  className="glass rounded-xl border border-accent/12 hover:border-accent/30 p-4 transition-all duration-200 group card-wow"
                >
                  <div className="font-mono text-sm font-bold text-foreground group-hover:text-accent transition-colors truncate">
                    {lang.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
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
