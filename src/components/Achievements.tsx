import { motion } from "motion/react";
import { CVData } from "../types";
import { Shield, Star, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";

export default function Achievements({ data }: { data: CVData }) {
  const hasCerts  = data.certifications.length > 0;
  const hasAwards = data.awards.length > 0;
  if (!hasCerts && !hasAwards) return null;

  return (
    <section id="achievements" className="py-24 scroll-mt-24 relative overflow-x-hidden">
      <div className="section-num absolute top-4 right-0 select-none pointer-events-none">05</div>

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
            <span>05 · achievements</span>
            <div className="h-px w-6 bg-primary/20" />
          </div>
          <h2
            className="font-display font-black tracking-tight leading-[0.86]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <span className="block text-foreground">Certs &amp;</span>
            <span className="block gradient-text">Awards</span>
          </h2>
        </motion.div>

        <div className={`grid gap-14 ${hasCerts && hasAwards ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>

          {/* ── Certifications ── */}
          {hasCerts && (
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.22em] mb-8">
                <span className="text-primary/60 font-bold">##</span>
                <span>Certifications</span>
                <span className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 130, damping: 20 }}
                    whileHover={{ y: -4 }}
                    className="bento-card p-5 hover:border-primary/28 group transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/18 group-hover:border-primary/40 flex items-center justify-center shrink-0 transition-all group-hover:shadow-[0_0_20px_rgba(180,190,254,0.18)]">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {cert.name}
                          </h4>
                          {(cert.issue_date || cert.expiry_date) && (
                            <Badge variant="outline" className="font-mono text-[9px] border-primary/18 text-primary/55 shrink-0">
                              {cert.issue_date}{cert.expiry_date ? ` — ${cert.expiry_date}` : ""}
                            </Badge>
                          )}
                        </div>
                        {cert.issuing_organization && (
                          <div className="text-sm text-accent font-mono mb-1.5">{cert.issuing_organization}</div>
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
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-primary/60 hover:text-primary transition-colors"
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
              <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.22em] mb-8">
                <span className="text-accent/60 font-bold">##</span>
                <span>Awards</span>
                <span className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.awards.map((award, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 130, damping: 20 }}
                    whileHover={{ y: -4 }}
                    className="bento-card p-5 border-accent/12 hover:border-accent/28 group transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/8 border border-accent/18 group-hover:border-accent/40 flex items-center justify-center shrink-0 transition-all group-hover:shadow-[0_0_20px_rgba(250,179,135,0.18)]">
                        <Star className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                            {award.title}
                          </h4>
                          {award.date && (
                            <Badge variant="outline" className="font-mono text-[9px] border-accent/18 text-accent/55 shrink-0">
                              {award.date}
                            </Badge>
                          )}
                        </div>
                        {award.issuer && (
                          <div className="text-sm text-primary font-mono mb-1.5">{award.issuer}</div>
                        )}
                        {award.description && (
                          <div className="text-xs text-muted-foreground/75 leading-relaxed font-mono">
                            <span className="text-accent/45 mr-2">{">>"}</span>
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
