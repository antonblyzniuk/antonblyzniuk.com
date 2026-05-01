import { motion } from "motion/react";
import { CVData } from "../types";
import { Terminal, Calendar, ChevronRight, GitCommitVertical } from "lucide-react";
import { Badge } from "./ui/badge";
import Typewriter from "./Typewriter";

interface ExperienceProps {
  data: CVData;
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs sm:text-sm overflow-hidden">
            <span className="text-primary shrink-0">root@portfolio:</span>
            <span className="text-accent shrink-0">~</span>
            <span className="text-foreground truncate">$ <Typewriter text="journalctl --unit=career --no-pager" speed={50} /></span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-glow"
          >
            System Logs: Career & Education
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              <Terminal className="w-4 h-4" />
              [ EXPERIENCE_LOG ]
            </div>
            
            <div className="space-y-6">
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-primary/20 before:to-transparent">
                {data.experience_units.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex items-start gap-6 group"
                  >
                    <div className="absolute left-0 w-10 h-10 rounded-xl bg-secondary border border-primary/20 flex items-center justify-center z-10 group-hover:border-primary/50 transition-colors shadow-[0_0_15px_rgba(158,206,106,0.1)]">
                      <GitCommitVertical className="w-5 h-5 text-primary" />
                    </div>
                    
                    <div className="flex-1 pt-1 ml-10">
                      <div className="bg-secondary/20 p-5 rounded-lg border border-primary/5 hover:border-primary/20 transition-all group-hover:bg-secondary/30">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            <Typewriter text={exp.name} speed={50} delay={500 + i * 200} />
                          </h4>
                          <Badge variant="outline" className="font-mono text-[10px] border-primary/20 text-primary">
                            {exp.from_date} — {exp.to_date}
                          </Badge>
                        </div>
                        {exp.organization && (
                          <div className="text-sm text-accent font-mono mb-3">{exp.organization}</div>
                        )}
                        <div className="text-sm text-muted-foreground leading-relaxed font-mono">
                          <span className="text-accent mr-2">{">>"}</span>
                          <Typewriter text={exp.description} speed={10} delay={1000 + i * 300} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              <Terminal className="w-4 h-4" />
              [ EDUCATION_LOG ]
            </div>

            <div className="space-y-6">
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-accent/50 before:via-accent/20 before:to-transparent">
                {data.education_units.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex items-start gap-6 group"
                  >
                    <div className="absolute left-0 w-10 h-10 rounded-xl bg-secondary border border-accent/20 flex items-center justify-center z-10 group-hover:border-accent/50 transition-colors shadow-[0_0_15px_rgba(224,175,104,0.1)]">
                      <ChevronRight className="w-5 h-5 text-accent" />
                    </div>
                    
                    <div className="flex-1 pt-1 ml-10">
                      <div className="bg-secondary/20 p-5 rounded-lg border border-accent/5 hover:border-accent/20 transition-all group-hover:bg-secondary/30">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                            <Typewriter text={edu.name} speed={50} delay={500 + i * 200} />
                          </h4>
                          <Badge variant="outline" className="font-mono text-[10px] border-accent/20 text-accent">
                            {edu.from_date} — {edu.to_date}
                          </Badge>
                        </div>
                        {(edu.degree || edu.field_of_study) && (
                          <div className="text-sm text-primary font-mono mb-3">
                            {[edu.degree, edu.field_of_study].filter(Boolean).join(" · ")}
                          </div>
                        )}
                        <div className="text-sm text-muted-foreground leading-relaxed font-mono">
                          <span className="text-primary mr-2">#</span>
                          <Typewriter text={edu.description} speed={10} delay={1000 + i * 300} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
