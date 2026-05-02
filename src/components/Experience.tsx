import { motion } from "motion/react";
import { CVData } from "../types";
import { Terminal, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";

export default function Experience({ data }: { data: CVData }) {
  return (
    <section id="experience" className="py-24 scroll-mt-24 relative overflow-hidden">
      {/* Decorative number */}
      <div className="section-num absolute -top-6 right-0 select-none pointer-events-none">03</div>

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
            03 / experience
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
            <span className="text-foreground">Career </span>
            <span className="gradient-text">Timeline</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Experience column ── */}
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em] mb-8">
              <Briefcase className="w-3.5 h-3.5 text-primary/60" />
              <span>Experience_Log</span>
              <span className="ml-auto text-primary/40">{data.experience_units.length} entries</span>
            </div>

            <div className="relative space-y-5 before:absolute before:inset-0 before:ml-[19px] before:h-full before:w-px before:bg-gradient-to-b before:from-primary/50 before:via-primary/15 before:to-transparent">
              {data.experience_units.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex items-start gap-5 group"
                >
                  {/* Node */}
                  <div className="shrink-0 w-10 h-10 z-10 relative">
                    <div className="absolute inset-0 rounded-xl bg-primary/8 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                    <div className="w-full h-full rounded-xl bg-secondary/80 border border-primary/20 group-hover:border-primary/55 flex items-center justify-center transition-all group-hover:shadow-[0_0_20px_rgba(180,190,254,0.2)] glass">
                      <Terminal className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 min-w-0">
                    <div className="glass rounded-xl border border-primary/10 hover:border-primary/25 transition-all duration-250 overflow-hidden group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] card-wow">
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
                      <div className="p-4 pl-5">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                          <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {exp.name}
                          </h4>
                          <Badge variant="outline" className="font-mono text-[9px] border-primary/15 text-primary/55 shrink-0 px-2">
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
                              <span className="flex items-center gap-1 text-xs text-muted-foreground/55 font-mono">
                                <MapPin className="w-2.5 h-2.5" />
                                {exp.location}
                              </span>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground/75 leading-relaxed font-mono">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Education column ── */}
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em] mb-8">
              <GraduationCap className="w-3.5 h-3.5 text-accent/60" />
              <span>Education_Log</span>
              <span className="ml-auto text-accent/40">{data.education_units.length} entries</span>
            </div>

            <div className="relative space-y-5 before:absolute before:inset-0 before:ml-[19px] before:h-full before:w-px before:bg-gradient-to-b before:from-accent/50 before:via-accent/15 before:to-transparent">
              {data.education_units.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex items-start gap-5 group"
                >
                  {/* Node */}
                  <div className="shrink-0 w-10 h-10 z-10 relative">
                    <div className="absolute inset-0 rounded-xl bg-accent/8 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                    <div className="w-full h-full rounded-xl bg-secondary/80 border border-accent/20 group-hover:border-accent/55 flex items-center justify-center transition-all group-hover:shadow-[0_0_20px_rgba(250,179,135,0.2)] glass">
                      <GraduationCap className="w-4 h-4 text-accent" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 min-w-0">
                    <div className="glass rounded-xl border border-accent/10 hover:border-accent/25 transition-all duration-250 overflow-hidden group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] card-wow">
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
                      <div className="p-4 pl-5">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                          <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                            {edu.name}
                          </h4>
                          <Badge variant="outline" className="font-mono text-[9px] border-accent/15 text-accent/55 shrink-0 px-2">
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
                              <span className="flex items-center gap-1 text-xs text-muted-foreground/55 font-mono">
                                <MapPin className="w-2.5 h-2.5" />
                                {edu.location}
                              </span>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground/75 leading-relaxed font-mono">
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
