import { motion } from "motion/react";
import { CVData } from "../types";
import { Award, ExternalLink, BadgeCheck } from "lucide-react";

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
  const hasCerts = data.certifications.length > 0;
  const hasAwards = data.awards.length > 0;
  if (!hasCerts && !hasAwards) return null;

  const certs = [...data.certifications].sort((a, b) => a.order - b.order);
  const awards = [...data.awards].sort((a, b) => a.order - b.order);

  return (
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
                        {cert.credential_url && (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
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
  );
}
