import { motion } from "motion/react";
import { CVData } from "../types";

interface SkillsProps {
  data: CVData;
}

export default function Skills({ data }: SkillsProps) {
  if (data.skills.length === 0 && data.languages.length === 0) return null;

  const sorted = [...data.skills].sort((a, b) => a.order - b.order);

  const grouped = sorted.reduce<Map<string, typeof sorted>>((acc, skill) => {
    const key = skill.category ?? "Other";
    if (!acc.has(key)) acc.set(key, []);
    acc.get(key)!.push(skill);
    return acc;
  }, new Map());

  // "Other" always last
  const categories = [...grouped.keys()].sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return 0;
  });

  // Pre-compute global indices to avoid side-effects during render
  const categoryData = categories.map((category) => {
    const skills = grouped.get(category)!;
    return { category, skills };
  });
  const globalIndices: number[][] = [];
  let idx = 0;
  for (const { skills } of categoryData) {
    globalIndices.push(skills.map(() => idx++));
  }

  const badgeStyles = [
    "bg-primary/10 border-primary/20 text-primary hover:bg-primary/15",
    "bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/15",
    "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/15",
    "bg-violet-500/10 border-violet-500/20 text-violet-400 hover:bg-violet-500/15",
  ];

  const levelStyles = [
    "text-primary/60",
    "text-blue-400/60",
    "text-emerald-400/60",
    "text-violet-400/60",
  ];

  return (
    <section id="skills" className="py-12 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Skills</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Skills — takes 2/3 width */}
          <div className="lg:col-span-2 space-y-5">
            {categoryData.map(({ category, skills }, catIdx) => (
              <div key={category} className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: globalIndices[catIdx][skillIdx] * 0.04 }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold border transition-colors ${badgeStyles[catIdx % badgeStyles.length]}`}
                    >
                      {skill.name}
                      {skill.level && (
                        <span className={`text-xs font-normal ${levelStyles[catIdx % levelStyles.length]}`}>
                          {skill.level}
                        </span>
                      )}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Languages — right column */}
          {data.languages.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Languages
              </p>
              <div className="space-y-2">
                {data.languages.map((lang, i) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="card px-4 py-3 flex items-center justify-between"
                  >
                    <span className="text-sm font-semibold">{lang.name}</span>
                    <span className="text-xs text-muted-foreground">{lang.level}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
