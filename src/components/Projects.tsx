import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CVData, Project } from "../types";
import { Github, ExternalLink, Folder, X, Globe, Code2, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

function ProjectCard({
  project,
  index,
  featured,
  onClick,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      layoutId={`project-${project.name.toLowerCase().replace(/\s+/g, "_")}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className={`group cursor-pointer glass rounded-2xl border border-primary/12 hover:border-primary/35 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(180,190,254,0.1)] ${featured ? "md:col-span-2" : ""}`}
    >
      {/* Image */}
      {project.image ? (
        <div className={`relative overflow-hidden ${featured ? "aspect-[21/9] sm:aspect-[16/7]" : "aspect-video"}`}>
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
            <div className="p-3 rounded-xl bg-primary/20 border border-primary/40 shadow-[0_0_24px_rgba(180,190,254,0.3)] translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </div>
          </div>
          {/* Tab bar overlay on image */}
          <div className="absolute top-0 left-0 right-0 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[10px] text-white/60 glass rounded-md px-2 py-1">
              <Folder className="w-3 h-3 text-accent/70 shrink-0" />
              <span className="truncate max-w-[120px]">{project.name.toLowerCase().replace(/\s+/g, "_")}.sh</span>
            </div>
            <div className="flex gap-1.5 glass rounded-md px-2 py-1">
              <div className="w-2 h-2 rounded-full bg-destructive/60" />
              <div className="w-2 h-2 rounded-full bg-accent/60" />
              <div className="w-2 h-2 rounded-full bg-primary/60" />
            </div>
          </div>
        </div>
      ) : (
        <div className={`${featured ? "aspect-[21/9] sm:aspect-[16/7]" : "aspect-video"} bg-secondary/30 flex items-center justify-center border-b border-primary/6 group-hover:bg-secondary/45 transition-colors`}>
          <Code2 className="w-12 h-12 text-primary/12" />
        </div>
      )}

      {/* Content */}
      <div className={`${featured ? "p-6 md:p-8" : "p-5"} space-y-3`}>
        <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors leading-snug ${featured ? "text-xl md:text-2xl" : "text-base"}`}>
          {project.name}
        </h3>
        <p className={`text-muted-foreground/75 leading-relaxed font-mono ${featured ? "text-sm line-clamp-3" : "text-xs line-clamp-2"}`}>
          {project.description}
        </p>

        {project.links.length > 0 && (
          <div className="flex items-center gap-3 pt-2 border-t border-primary/6">
            {project.links.slice(0, 3).map((link, j) => (
              <span key={j} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/45">
                {link.name.toLowerCase().includes("github")
                  ? <Github className="w-3 h-3" />
                  : <Globe className="w-3 h-3" />}
                <span className="truncate max-w-[64px]">{link.name}</span>
              </span>
            ))}
            <span className="ml-auto text-[10px] font-mono text-primary/35 group-hover:text-primary/70 transition-colors flex items-center gap-1">
              open <ExternalLink className="w-2.5 h-2.5" />
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects({ data }: { data: CVData }) {
  const [selected, setSelected] = useState<Project | null>(null);

  const [featured, ...rest] = data.projects;

  return (
    <section id="projects" className="py-24 scroll-mt-24 relative overflow-hidden">
      {/* Decorative number */}
      <div className="section-num absolute -top-6 right-0 select-none pointer-events-none">04</div>

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
            04 / projects
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
            <span className="text-foreground">Selected </span>
            <span className="gradient-text">Works</span>
          </h2>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured && (
            <ProjectCard
              project={featured}
              index={0}
              featured
              onClick={() => setSelected(featured)}
            />
          )}
          {rest.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i + 1}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>

        {/* ── Modal ── */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-background/90 backdrop-blur-2xl"
              onClick={() => setSelected(null)}
            >
              <motion.div
                layoutId={`project-${selected.name.toLowerCase().replace(/\s+/g, "_")}`}
                className="relative max-w-4xl w-full max-h-full glass rounded-2xl overflow-hidden border border-primary/25 shadow-[0_40px_120px_rgba(0,0,0,0.8),0_0_60px_rgba(180,190,254,0.12)]"
                onClick={(e) => e.stopPropagation()}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
              >
                {/* Modal header */}
                <div className="px-5 py-3 border-b border-primary/12 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-accent/60" />
                      <div className="w-3 h-3 rounded-full bg-primary/60" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5" />
                      {selected.name.toLowerCase().replace(/\s+/g, "_")}.sh
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2.5 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
                  {selected.image && (
                    <div className="relative w-full overflow-hidden max-h-[45vh]">
                      <img
                        src={selected.image}
                        alt={selected.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
                    </div>
                  )}

                  <div className="p-6 md:p-10 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight gradient-text">
                      {selected.name}
                    </h2>

                    <div className="p-5 rounded-xl glass border border-primary/12 font-mono text-sm text-foreground/90 leading-relaxed">
                      <span className="text-primary/40 mr-3">&gt;</span>
                      {selected.description}
                    </div>

                    {selected.links.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.22em]">
                          Available_Deployments
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {selected.links.map((link, k) => (
                            <Button
                              key={k}
                              variant="outline"
                              className="gap-2.5 border-primary/20 hover:border-primary hover:bg-primary/8 font-mono text-sm"
                              asChild
                            >
                              <a href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.name.toLowerCase().includes("github")
                                  ? <Github className="w-4 h-4" />
                                  : <Globe className="w-4 h-4" />}
                                {link.name}
                                <ExternalLink className="w-3 h-3 opacity-50" />
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 py-2.5 border-t border-primary/10 flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                  <span className="text-primary/55">status: inspecting</span>
                  <span className="text-primary font-bold tracking-widest">READY_</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
