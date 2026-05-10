import { motion } from "motion/react";
import { CVData } from "../types";

interface SkillsProps {
  data: CVData;
}

export default function Skills({ data }: SkillsProps) {
  if (data.skills.length === 0 && data.languages.length === 0) return null;

  const skills = [...data.skills].sort((a, b) => a.order - b.order);
  const mid = Math.ceil(skills.length / 2);
  const coreSkills = skills.slice(0, mid);
  const toolSkills = skills.slice(mid);

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
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Core</p>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-semibold bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15 transition-colors"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>
            {toolSkills.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tools & Frameworks</p>
                <div className="flex flex-wrap gap-2">
                  {toolSkills.map((skill, i) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.04 }}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
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
