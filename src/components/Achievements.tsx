import { motion } from "motion/react";
import { CVData } from "../types";
import { Shield, Star, ExternalLink } from "lucide-react";

export default function Achievements({ data }: { data: CVData }) {
  const hasCerts = data.certifications.length > 0;
  const hasAwards = data.awards.length > 0;
  if (!hasCerts && !hasAwards) return null;

  const allItems = [
    ...data.certifications.map((c, i) => ({ type: "cert" as const, data: c, idx: i })),
    ...data.awards.map((a, i) => ({ type: "award" as const, data: a, idx: data.certifications.length + i })),
  ];

  return (
    <section id="achievements" className="py-24 scroll-mt-24 relative overflow-x-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="section-eyebrow mb-5">
            <div className="h-px flex-1 max-w-[48px] bg-gradient-to-r from-transparent to-primary/25" />
            <span>05 · credentials</span>
            <div className="h-px w-6 bg-primary/20" />
          </div>
          <h2
            className="font-display font-black leading-[0.86]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            <span className="block text-foreground">CERTS &amp;</span>
            <span className="block gradient-text">CREDENTIALS</span>
          </h2>
        </motion.div>

        {/* Masonry-inspired asymmetric grid */}
        <div className={`grid gap-4 ${hasCerts && hasAwards ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>

          {/* Certifications */}
          {hasCerts && (
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.22em] mb-6">
                <span style={{ color: "rgba(124,106,255,0.6)" }} className="font-bold">##</span>
                <span>Certifications</span>
                <span className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, rotate: (Math.random() - 0.5) * 4 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -8 }}
                    className="group"
                    style={{ gridRow: i === 0 ? "span 1" : undefined }}
                  >
                    <div
                      className="liquid-card rounded-2xl p-5 h-full relative z-[1] transition-all duration-300"
                      style={{
                        borderLeft: "4px solid rgba(124,106,255,0.4)",
                      }}
                    >
                      <div className="flex items-start gap-4 relative z-[1]">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all group-hover:shadow-[0_0_20px_rgba(124,106,255,0.3)]"
                          style={{
                            background: "rgba(124,106,255,0.1)",
                            border: "1px solid rgba(124,106,255,0.2)",
                            boxShadow: "0 0 12px rgba(124,106,255,0.1)",
                          }}
                        >
                          <Shield className="w-5 h-5" style={{ color: "#a89aff" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-foreground group-hover:text-primary-light transition-colors leading-snug mb-1">
                            {cert.name}
                          </h4>
                          {cert.issuing_organization && (
                            <div className="text-sm font-mono mb-1" style={{ color: "#ff6b6b" }}>
                              {cert.issuing_organization}
                            </div>
                          )}
                          {(cert.issue_date || cert.expiry_date) && (
                            <div className="font-mono text-[10px] text-muted-foreground mb-1.5">
                              {cert.issue_date}{cert.expiry_date ? ` — ${cert.expiry_date}` : ""}
                            </div>
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
                              className="inline-flex items-center gap-1.5 text-xs font-mono transition-colors hover:text-primary-light mag-link"
                              style={{ color: "rgba(124,106,255,0.6)" }}
                            >
                              <ExternalLink className="w-3 h-3" />
                              View Credential
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {hasAwards && (
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.22em] mb-6">
                <span style={{ color: "rgba(255,107,107,0.6)" }} className="font-bold">##</span>
                <span>Awards</span>
                <span className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.awards.map((award, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, rotate: (Math.random() - 0.5) * 4 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <div
                      className="liquid-card rounded-2xl p-5 h-full relative z-[1] transition-all duration-300"
                      style={{ borderLeft: "4px solid rgba(255,107,107,0.4)" }}
                    >
                      <div className="flex items-start gap-4 relative z-[1]">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all group-hover:shadow-[0_0_20px_rgba(255,107,107,0.3)]"
                          style={{
                            background: "rgba(255,107,107,0.1)",
                            border: "1px solid rgba(255,107,107,0.2)",
                            boxShadow: "0 0 12px rgba(255,107,107,0.1)",
                          }}
                        >
                          <Star className="w-5 h-5" style={{ color: "#ff6b6b" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors leading-snug mb-1">
                            {award.title}
                          </h4>
                          {award.issuer && (
                            <div className="text-sm font-mono mb-1" style={{ color: "#a89aff" }}>
                              {award.issuer}
                            </div>
                          )}
                          {award.date && (
                            <div className="font-mono text-[10px] text-muted-foreground mb-1.5">{award.date}</div>
                          )}
                          {award.description && (
                            <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                              <span style={{ color: "rgba(255,107,107,0.45)", marginRight: "0.5em" }}>{">>"}</span>
                              {award.description}
                            </p>
                          )}
                        </div>
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
