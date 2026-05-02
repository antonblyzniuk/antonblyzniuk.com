import { motion } from "motion/react";
import { CVData } from "../types";
import { Terminal, ChevronRight, GitCommitVertical, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import Typewriter from "./Typewriter";

export default function Experience({ data }: { data: CVData }) {
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
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em] mb-8">
              <Terminal className="w-3.5 h-3.5 text-primary/60" />
              <span>Experience_Log</span>
              <span className="ml-auto text-primary/40">{data.experience_units.length} entries</span>
            </div>

            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-[19px] before:h-full before:w-px before:bg-gradient-to-b before:from-primary/40 before:via-primary/15 before:to-transparent">
              {data.experience_units.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex items-start gap-5 group"
                >
                  {/* Timeline node */}
                  <div className="shrink-0 w-10 h-10 z-10 relative">
                    <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_rgba(180,190,254,0.15)]" />
                    <div className="w-full h-full rounded-lg bg-secondary border border-primary/20 group-hover:border-primary/50 flex items-center justify-center transition-all group-hover:shadow-[0_0_16px_rgba(180,190,254,0.2)]">
                      <GitCommitVertical className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 min-w-0">
                    <div className="relative bg-secondary/15 rounded-lg border border-primary/8 hover:border-primary/20 group-hover:bg-secondary/25 transition-all overflow-hidden">
                      {/* Left accent bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/15 to-transparent" />

                      <div className="p-4 pl-5">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                          <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                            <Typewriter text={exp.name} speed={50} delay={400 + i * 150} />
                          </h4>
                          <Badge variant="outline" className="font-mono text-[9px] border-primary/15 text-primary/60 shrink-0 px-2">
                            {exp.from_date} — {exp.to_date}
                          </Badge>
                        </div>

                        {(exp.organization || exp.location) && (
                          <div className="flex flex-wrap items-center gap-2 mb-2.5">
                            {exp.organization && (
                              <span className="text-sm text-accent font-mono font-medium">{exp.organization}</span>
                            )}
                            {exp.organization && exp.location && (
                              <span className="text-muted-foreground/30 text-xs">·</span>
                            )}
                            {exp.location && (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground/60 font-mono">
                                <MapPin className="w-2.5 h-2.5" />
                                {exp.location}
                              </span>
                            )}
                          </div>
                        )}

                        <p className="text-sm text-muted-foreground/80 leading-relaxed font-mono">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em] mb-8">
              <Terminal className="w-3.5 h-3.5 text-accent/60" />
              <span>Education_Log</span>
              <span className="ml-auto text-accent/40">{data.education_units.length} entries</span>
            </div>

            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-[19px] before:h-full before:w-px before:bg-gradient-to-b before:from-accent/40 before:via-accent/15 before:to-transparent">
              {data.education_units.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex items-start gap-5 group"
                >
                  {/* Timeline node */}
                  <div className="shrink-0 w-10 h-10 z-10 relative">
                    <div className="absolute inset-0 rounded-lg bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_rgba(250,179,135,0.15)]" />
                    <div className="w-full h-full rounded-lg bg-secondary border border-accent/20 group-hover:border-accent/50 flex items-center justify-center transition-all group-hover:shadow-[0_0_16px_rgba(250,179,135,0.2)]">
                      <ChevronRight className="w-4 h-4 text-accent" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 min-w-0">
                    <div className="relative bg-secondary/15 rounded-lg border border-accent/8 hover:border-accent/20 group-hover:bg-secondary/25 transition-all overflow-hidden">
                      {/* Left accent bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent/50 via-accent/15 to-transparent" />

                      <div className="p-4 pl-5">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                          <h4 className="text-base font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                            <Typewriter text={edu.name} speed={50} delay={400 + i * 150} />
                          </h4>
                          <Badge variant="outline" className="font-mono text-[9px] border-accent/15 text-accent/60 shrink-0 px-2">
                            {edu.from_date} — {edu.to_date}
                          </Badge>
                        </div>

                        {(edu.degree || edu.field_of_study || edu.location) && (
                          <div className="flex flex-wrap items-center gap-2 mb-2.5">
                            {(edu.degree || edu.field_of_study) && (
                              <span className="text-sm text-primary font-mono">
                                {[edu.degree, edu.field_of_study].filter(Boolean).join(" · ")}
                              </span>
                            )}
                            {(edu.degree || edu.field_of_study) && edu.location && (
                              <span className="text-muted-foreground/30 text-xs">·</span>
                            )}
                            {edu.location && (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground/60 font-mono">
                                <MapPin className="w-2.5 h-2.5" />
                                {edu.location}
                              </span>
                            )}
                          </div>
                        )}

                        <p className="text-sm text-muted-foreground/80 leading-relaxed font-mono">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
