import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CVData } from "../types";
import { Award, ExternalLink, BadgeCheck, X, ZoomIn } from "lucide-react";

interface CertificationsProps {
  data: CVData;
}

function formatMonthYear(date: string | null) {
  if (!date) return null;
  const [year, month] = date.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Certifications({ data }: CertificationsProps) {
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const hasCerts = data.certifications.length > 0;
  const hasAwards = data.awards.length > 0;
  if (!hasCerts && !hasAwards) return null;

  const certs = [...data.certifications].sort((a, b) => a.order - b.order);
  const awards = [...data.awards].sort((a, b) => a.order - b.order);

  return (
    <>
      <section id="certifications" className="py-12 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Certifications & Awards
          </h2>

          <div className="space-y-8">
            {hasCerts && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Certifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {certs.map((cert, i) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="card card-hover p-4 flex gap-3 items-start"
                    >
                      <BadgeCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-sm leading-snug">{cert.name}</p>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {cert.image && (
                              <button
                                onClick={() => setLightboxUrl(cert.image)}
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="View certificate"
                              >
                                <ZoomIn className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {cert.credential_url && (
                              <a
                                href={cert.credential_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-primary font-medium mt-0.5">
                          {cert.issuing_organization}
                        </p>
                        {cert.issue_date && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatMonthYear(cert.issue_date)}
                            {cert.expiry_date && ` — ${formatMonthYear(cert.expiry_date)}`}
                          </p>
                        )}
                        {cert.image && (
                          <button
                            onClick={() => setLightboxUrl(cert.image)}
                            className="mt-3 w-full rounded-md overflow-hidden border border-border/50 relative group"
                            aria-label="View certificate fullscreen"
                          >
                            <img
                              src={cert.image}
                              alt={`${cert.name} certificate`}
                              className="w-full object-cover max-h-36"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {hasAwards && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Awards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {awards.map((award, i) => (
                    <motion.div
                      key={award.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="card card-hover p-4 flex gap-3 items-start"
                    >
                      <Award className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm leading-snug">{award.title}</p>
                        {award.issuer && (
                          <p className="text-xs text-primary font-medium mt-0.5">{award.issuer}</p>
                        )}
                        {award.date && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatMonthYear(award.date)}
                          </p>
                        )}
                        {award.description && (
                          <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                            {award.description}
                          </p>
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

      <AnimatePresence>
        {lightboxUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setLightboxUrl(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              onClick={() => setLightboxUrl(null)}
              aria-label="Close"
            >
              <X className="w-7 h-7" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightboxUrl}
              alt="Certificate fullscreen"
              className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
