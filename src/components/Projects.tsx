import { motion } from "motion/react";
import { CVData } from "../types";
import { Github, ExternalLink, Globe } from "lucide-react";

interface ProjectsProps {
  data: CVData;
}

function getLinkIcon(name: string) {
  return name.toLowerCase().includes("github")
    ? <Github className="w-3.5 h-3.5" />
    : <Globe className="w-3.5 h-3.5" />;
}

export default function Projects({ data }: ProjectsProps) {
  if (data.portfolio_items.length === 0) return null;

  const items = [...data.portfolio_items].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="py-12 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/20 group-hover:bg-primary/60 transition-colors duration-200" />

              {item.image && (
                <div className="aspect-video overflow-hidden bg-card/50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="flex flex-col flex-1 pl-5 pr-5 py-5 gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.category && (
                    <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 mt-0.5">
                      {item.category}
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {item.description}
                  </p>
                )}

                {item.links.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1 mt-auto">
                    {item.links.map((link, j) => (
                      <a
                        key={j}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-2.5 py-1.5 rounded-md hover:bg-primary/5 border border-transparent hover:border-primary/20"
                      >
                        {getLinkIcon(link.name)}
                        {link.name}
                        <ExternalLink className="w-3 h-3 opacity-40" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
