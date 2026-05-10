import { motion } from "motion/react";
import { CVData } from "../types";
import { MapPin } from "lucide-react";

interface ExperienceProps {
  data: CVData;
}

function formatDate(date: string | null) {
  if (!date) return "Present";
  const [year, month] = date.split("-");
  const d = new Date(Number(year), Number(month) - 1);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Experience({ data }: ExperienceProps) {
  const hasExperience = data.experience_units.length > 0;
  const hasEducation = data.education_units.length > 0;

  if (!hasExperience && !hasEducation) return null;

  const experience = [...data.experience_units].sort((a, b) => a.order - b.order);
  const education = [...data.education_units].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="py-12 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Experience</h2>

        <div className="space-y-8">
          {hasExperience && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                Work
              </h3>
              <div>
                {experience.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="relative pl-6 pb-8 last:pb-0"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                    <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
                    <div className="card card-hover p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{exp.title}</h4>
                        <span className="text-xs font-mono text-muted-foreground whitespace-nowrap shrink-0">
                          {formatDate(exp.from_date)} — {formatDate(exp.to_date)}
                        </span>
                      </div>
                      {exp.organization && (
                        <p className="text-sm text-primary font-medium mb-1">{exp.organization}</p>
                      )}
                      {exp.location && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </p>
                      )}
                      {exp.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{exp.description}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {hasEducation && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                Education
              </h3>
              <div>
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="relative pl-6 pb-8 last:pb-0"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                    <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary/50 ring-2 ring-background" />
                    <div className="card card-hover p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{edu.institution}</h4>
                        <span className="text-xs font-mono text-muted-foreground whitespace-nowrap shrink-0">
                          {formatDate(edu.from_date)} — {formatDate(edu.to_date)}
                        </span>
                      </div>
                      {(edu.degree || edu.field_of_study) && (
                        <p className="text-sm text-primary/70 font-medium mb-1">
                          {[edu.degree, edu.field_of_study].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      {edu.location && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                          <MapPin className="w-3 h-3" />
                          {edu.location}
                        </p>
                      )}
                      {edu.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{edu.description}</p>
                      )}
                      {edu.image && (
                        <img
                          src={edu.image}
                          alt={edu.institution}
                          className="mt-3 w-10 h-10 object-contain rounded"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
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
