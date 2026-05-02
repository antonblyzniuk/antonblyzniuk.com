import { motion } from "motion/react";
import { CVData } from "../types";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import Typewriter from "./Typewriter";

interface CustomSectionsProps {
  data: CVData;
}

export default function CustomSections({ data }: CustomSectionsProps) {
  if (data.custom_sections.length === 0) return null;

  return (
    <>
      {data.custom_sections.map((section, sIdx) => (
        <section key={sIdx} className="py-20 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4 font-mono text-xs sm:text-sm overflow-hidden">
                <span className="text-primary shrink-0">root@portfolio:</span>
                <span className="text-accent shrink-0">~</span>
                <span className="text-foreground truncate">
                  $ <Typewriter text={`cat ./${section.title.toLowerCase().replace(/\s+/g, "_")}.log`} speed={50} />
                </span>
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-glow"
              >
                {section.title}
              </motion.h2>
            </div>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-primary/20 before:to-transparent max-w-3xl">
              {section.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex items-start gap-6 group"
                >
                  <div className="absolute left-0 w-10 h-10 rounded-xl bg-secondary border border-primary/20 flex items-center justify-center z-10 group-hover:border-primary/50 transition-colors shadow-[0_0_15px_rgba(158,206,106,0.1)]">
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 pt-1 ml-10">
                    <div className="bg-secondary/20 p-5 rounded-lg border border-primary/5 hover:border-primary/20 transition-all group-hover:bg-secondary/30">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          <Typewriter text={item.title} speed={50} delay={500 + i * 200} />
                        </h4>
                        {(item.from_date || item.to_date) && (
                          <Badge variant="outline" className="font-mono text-[10px] border-primary/20 text-primary">
                            {item.from_date ?? ""}
                            {item.to_date ? ` — ${item.to_date}` : ""}
                          </Badge>
                        )}
                      </div>
                      {item.subtitle && (
                        <div className="text-sm text-accent font-mono mb-3">{item.subtitle}</div>
                      )}
                      {item.description && (
                        <div className="text-sm text-muted-foreground leading-relaxed font-mono">
                          <span className="text-accent mr-2">{">>"}</span>
                          {item.description}
                        </div>
                      )}
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-primary/70 hover:text-primary transition-colors mt-2"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Open Link
                        </a>
                      )}
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
