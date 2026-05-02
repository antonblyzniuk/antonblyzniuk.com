import { motion } from "motion/react";
import { CVData } from "../types";
import { Shield, Star, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

export default function Achievements({ data }: { data: CVData }) {
  const hasCerts = data.certifications.length > 0;
  const hasAwards = data.awards.length > 0;

  if (!hasCerts && !hasAwards) return null;

  return (
    <section id="achievements" className="py-24 scroll-mt-24 relative overflow-hidden">
      {/* Decorative number */}
      <div className="section-num absolute -top-6 right-0 select-none pointer-events-none">05</div>

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
            05 / achievements
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
            <span className="text-foreground">Certs </span>
            <span className="gradient-text">& Awards</span>
          </h2>
        </motion.div>

        <div className={cn("grid gap-12", hasCerts && hasAwards ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1")}>

          {/* ── Certifications ── */}
          {hasCerts && (
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.2em] mb-7">
                <span className="text-accent/70 font-bold">##</span>
                <span>Certifications</span>
                <span className="flex-1 h-px bg-gradient-to-r from-primary/15 to-transparent" />
              </div>
              <div className="relative space-y-5 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-primary/15 before:to-transparent">
                {data.certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    className="relative flex items-start gap-6 group"
                  >
                    <div className="absolute left-0 w-10 h-10 rounded-xl glass border border-primary/20 flex items-center justify-center z-10 group-hover:border-primary/50 transition-all group-hover:shadow-[0_0_20px_rgba(180,190,254,0.15)]">
                      <Shield className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div className="flex-1 pt-0.5 ml-12">
                      <div className="glass rounded-xl border border-primary/8 hover:border-primary/22 transition-all p-5 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] card-wow">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {cert.name}
                          </h4>
                          {(cert.issue_date || cert.expiry_date) && (
                            <Badge variant="outline" className="font-mono text-[9px] border-primary/20 text-primary/60">
                              {cert.issue_date}{cert.expiry_date ? ` — ${cert.expiry_date}` : ""}
                            </Badge>
                          )}
                        </div>
                        {cert.issuing_organization && (
                          <div className="text-sm text-accent font-mono mb-2">{cert.issuing_organization}</div>
                        )}
                        {cert.credential_id && (
                          <div className="text-xs text-muted-foreground font-mono mb-1.5">
                            ID: {cert.credential_id}
                          </div>
                        )}
                        {cert.credential_url && (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-primary/65 hover:text-primary transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Credential
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── Awards ── */}
          {hasAwards && (
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.2em] mb-7">
                <span className="text-accent/70 font-bold">##</span>
                <span>Awards</span>
                <span className="flex-1 h-px bg-gradient-to-r from-accent/15 to-transparent" />
              </div>
              <div className="relative space-y-5 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-accent/50 before:via-accent/15 before:to-transparent">
                {data.awards.map((award, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    className="relative flex items-start gap-6 group"
                  >
                    <div className="absolute left-0 w-10 h-10 rounded-xl glass border border-accent/20 flex items-center justify-center z-10 group-hover:border-accent/50 transition-all group-hover:shadow-[0_0_20px_rgba(250,179,135,0.15)]">
                      <Star className="w-4.5 h-4.5 text-accent" />
                    </div>
                    <div className="flex-1 pt-0.5 ml-12">
                      <div className="glass rounded-xl border border-accent/8 hover:border-accent/22 transition-all p-5 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] card-wow">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h4 className="text-base font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                            {award.title}
                          </h4>
                          {award.date && (
                            <Badge variant="outline" className="font-mono text-[9px] border-accent/20 text-accent/60">
                              {award.date}
                            </Badge>
                          )}
                        </div>
                        {award.issuer && (
                          <div className="text-sm text-primary font-mono mb-2">{award.issuer}</div>
                        )}
                        {award.description && (
                          <div className="text-sm text-muted-foreground/80 leading-relaxed font-mono">
                            <span className="text-accent/50 mr-2">{">>"}</span>
                            {award.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
