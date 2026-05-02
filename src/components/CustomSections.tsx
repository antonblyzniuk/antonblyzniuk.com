import { motion } from "motion/react";
import { CVData } from "../types";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";

export default function CustomSections({ data }: { data: CVData }) {
  if (data.custom_sections.length === 0) return null;

  return (
    <>
      {data.custom_sections.map((section, sIdx) => (
        <section key={sIdx} className="py-24 scroll-mt-24 relative overflow-x-hidden">
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
                <span>{section.title.toLowerCase()}</span>
                <div className="h-px w-6 bg-primary/20" />
              </div>
              <h2
                className="font-display font-black tracking-tight leading-[0.86]"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                <span className="block gradient-text">{section.title}</span>
              </h2>
            </motion.div>

            <div className="relative space-y-5 before:absolute before:inset-0 before:ml-[19px] before:h-full before:w-px before:bg-gradient-to-b before:from-primary/45 before:via-primary/10 before:to-transparent max-w-3xl">
              {section.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 110, damping: 20 }}
                  className="relative flex items-start gap-5 group"
                >
                  {/* Node */}
                  <div className="shrink-0 w-10 h-10 z-10 relative">
                    <div className="w-full h-full rounded-xl glass border border-primary/18 group-hover:border-primary/50 flex items-center justify-center transition-all group-hover:shadow-[0_0_20px_rgba(180,190,254,0.18)]">
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 min-w-0">
                    <div className="relative bento-card hover:border-primary/22 transition-all duration-300 overflow-hidden group-hover:shadow-[0_10px_36px_rgba(0,0,0,0.45)]">
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/55 via-primary/15 to-transparent" />
                      <div className="p-4 pl-5">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                          <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {item.title}
                          </h4>
                          {(item.from_date || item.to_date) && (
                            <Badge variant="outline" className="font-mono text-[9px] border-primary/16 text-primary/50 shrink-0 px-2">
                              {item.from_date ?? ""}{item.to_date ? ` — ${item.to_date}` : ""}
                            </Badge>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-sm text-accent font-mono mb-2">{item.subtitle}</div>
                        )}
                        {item.description && (
                          <p className="text-xs text-muted-foreground/70 leading-relaxed font-mono">
                            <span className="text-accent/45 mr-2">{">>"}</span>
                            {item.description}
                          </p>
                        )}
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-primary/55 hover:text-primary transition-colors mt-2"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Open Link
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
