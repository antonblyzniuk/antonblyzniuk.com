import { motion } from "motion/react";
import { CVData } from "../types";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";
import Typewriter from "./Typewriter";

const levelOrder: Record<string, number> = { expert: 4, advanced: 3, intermediate: 2, beginner: 1 };

function getLevelWidth(level: string | null) {
  switch (level?.toLowerCase()) {
    case "expert": return "100%";
    case "advanced": return "78%";
    case "intermediate": return "52%";
    case "beginner": return "26%";
    default: return "0%";
  }
}

function getLevelBarColor(level: string | null) {
  switch (level?.toLowerCase()) {
    case "expert": return "bg-primary";
    case "advanced": return "bg-primary/70";
    case "intermediate": return "bg-accent";
    default: return "bg-muted-foreground/50";
  }
}

function getLevelTextColor(level: string | null) {
  switch (level?.toLowerCase()) {
    case "expert": return "text-primary";
    case "advanced": return "text-primary/70";
    case "intermediate": return "text-accent";
    default: return "text-muted-foreground";
  }
}

export default function Skills({ data }: { data: CVData }) {
  const hasLevels = data.skills.some((s) => s.level);
  const hasCategories = data.skills.some((s) => s.category);

  const sortedSkills = [...data.skills].sort((a, b) => {
    const la = levelOrder[a.level?.toLowerCase() ?? ""] ?? 0;
    const lb = levelOrder[b.level?.toLowerCase() ?? ""] ?? 0;
    return lb - la;
  });

  const groupedSkills = hasCategories
    ? sortedSkills.reduce((acc, skill) => {
        const cat = skill.category || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
      }, {} as Record<string, typeof sortedSkills>)
    : null;

  return (
    <section id="skills" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs sm:text-sm overflow-hidden">
            <span className="text-primary shrink-0">root@portfolio:</span>
            <span className="text-accent shrink-0">~</span>
            <span className="text-foreground truncate">$ <Typewriter text="ls --expertise" speed={50} /></span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-glow"
          >
            Tech Stack
          </motion.h2>
        </div>

        <div className="terminal-window bg-secondary/20 p-4 sm:p-6 border-primary/10">
          {hasLevels ? (
            groupedSkills ? (
              /* Grouped + progress bars */
              <div className="space-y-8">
                {Object.entries(groupedSkills).map(([category, skills], catIdx) => (
                  <div key={catIdx}>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <span className="text-accent">##</span>
                      <span>{category}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0.5">
                      {skills.map((skill, i) => renderSkillRow(skill, catIdx * 20 + i, i))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Flat list + progress bars */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0.5">
                {sortedSkills.map((skill, i) => renderSkillRow(skill, i, i))}
              </div>
            )
          ) : (
            /* Badge cloud fallback — no level data */
            <div className="flex flex-wrap gap-3 justify-center">
              {data.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, type: "spring", stiffness: 260, damping: 20 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-secondary/80 hover:bg-primary/20 text-muted-foreground hover:text-primary border border-primary/10 hover:border-primary/40 transition-all font-mono text-sm py-2 px-4 hover:shadow-[0_0_16px_rgba(180,190,254,0.2)]"
                  >
                    <span className="text-accent mr-2">#</span>
                    <Typewriter text={skill.name} speed={50} delay={1000 + i * 80} />
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-2 mb-8 font-mono text-xs sm:text-sm overflow-hidden">
              <span className="text-primary shrink-0">root@portfolio:</span>
              <span className="text-accent shrink-0">~</span>
              <span className="text-foreground">$ locale -a</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.languages.map((lang, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="terminal-window bg-secondary/40 p-4 border-primary/5 group overflow-hidden relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-mono min-w-0">
                      <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        <Typewriter text={lang.name} speed={50} delay={1200 + i * 150} />
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                        {lang.level}
                      </div>
                    </div>
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-primary shrink-0"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function renderSkillRow(skill: CVData["skills"][number], index: number, key: number) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-primary/5 transition-colors group"
    >
      <span className="text-accent/60 text-xs shrink-0">$</span>
      <span className="font-mono text-sm text-foreground/80 flex-1 truncate group-hover:text-foreground transition-colors">
        {skill.name}
      </span>
      {skill.level && (
        <>
          <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden shrink-0">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: getLevelWidth(skill.level) }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 + 0.2, duration: 0.7, ease: "easeOut" }}
              className={cn("h-full rounded-full", getLevelBarColor(skill.level))}
            />
          </div>
          <span className={cn("text-[10px] font-mono uppercase tracking-wider w-16 text-right shrink-0 opacity-50 group-hover:opacity-100 transition-opacity", getLevelTextColor(skill.level))}>
            {skill.level}
          </span>
        </>
      )}
    </motion.div>
  );
}
