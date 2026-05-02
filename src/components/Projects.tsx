import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CVData, Project } from "../types";
import { Github, ExternalLink, Terminal, Folder, X, Globe, Code2, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import Typewriter from "./Typewriter";

export default function Projects({ data }: { data: CVData }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs sm:text-sm overflow-hidden">
            <span className="text-primary shrink-0">root@portfolio:</span>
            <span className="text-accent shrink-0">~</span>
            <span className="text-foreground truncate">$ <Typewriter text="find ./projects -type d" speed={50} /></span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-glow"
          >
            Selected Works
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.projects.map((project, i) => (
            <motion.div
              key={i}
              layoutId={`project-${project.name.toLowerCase().replace(/\s+/g, "_")}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelectedProject(project)}
              className="terminal-window bg-secondary/20 border-primary/10 overflow-hidden group hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(180,190,254,0.08)] transition-all duration-300 cursor-pointer"
            >
              {/* Tab bar */}
              <div className="bg-secondary border-b border-primary/10 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground min-w-0">
                  <Folder className="w-3 h-3 text-accent/70 shrink-0" />
                  <span className="truncate">{project.name.toLowerCase().replace(/\s+/g, "_")}.sh</span>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-destructive/40" />
                  <div className="w-2 h-2 rounded-full bg-accent/40" />
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                </div>
              </div>

              {/* Image */}
              {project.image ? (
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Permanent bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-secondary/80 to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="p-3 rounded-xl bg-primary/20 border border-primary/40 shadow-[0_0_20px_rgba(180,190,254,0.2)]">
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              ) : (
                /* Placeholder when no image */
                <div className="aspect-video bg-secondary/30 flex items-center justify-center border-b border-primary/5 group-hover:bg-secondary/40 transition-colors">
                  <Code2 className="w-10 h-10 text-primary/15" />
                </div>
              )}

              {/* Content */}
              <div className="p-5 space-y-2.5">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  <Typewriter text={project.name} speed={50} delay={500 + i * 200} />
                </h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed font-mono line-clamp-2">
                  {project.description}
                </p>

                {/* Links row */}
                {project.links.length > 0 && (
                  <div className="flex items-center gap-3 pt-2.5 border-t border-primary/5">
                    {project.links.slice(0, 3).map((link, j) => (
                      <span key={j} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/50">
                        {link.name.toLowerCase().includes("github")
                          ? <Github className="w-3 h-3" />
                          : <Globe className="w-3 h-3" />}
                        <span className="truncate max-w-[56px]">{link.name}</span>
                      </span>
                    ))}
                    <span className="ml-auto text-[10px] font-mono text-primary/30 group-hover:text-primary/60 transition-colors flex items-center gap-1">
                      open <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-background/95 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                layoutId={`project-${selectedProject.name.toLowerCase().replace(/\s+/g, "_")}`}
                className="relative max-w-4xl w-full max-h-full terminal-window overflow-hidden bg-secondary/50 border-primary/30 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Modal header */}
                <div className="bg-secondary border-b border-primary/10 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-accent/60" />
                      <div className="w-3 h-3 rounded-full bg-primary/60" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5" />
                      {selectedProject.name.toLowerCase().replace(/\s+/g, "_")}.sh
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
                  {selectedProject.image && (
                    <div className="relative w-full sm:aspect-video overflow-hidden max-h-[40vh] sm:max-h-none">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent" />
                    </div>
                  )}

                  <div className="p-6 md:p-10 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-glow">
                      {selectedProject.name}
                    </h2>

                    <div className="p-5 rounded-lg bg-primary/5 border border-primary/10 font-mono text-sm text-foreground/90 leading-relaxed">
                      <span className="text-primary/50 mr-3">&gt;</span>
                      {selectedProject.description}
                    </div>

                    {selectedProject.links.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                          Available_Deployments
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.links.map((link, k) => (
                            <Button
                              key={k}
                              variant="outline"
                              className="gap-2.5 border-primary/20 hover:border-primary hover:bg-primary/5 font-mono text-sm"
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

                <div className="px-5 py-2 bg-secondary border-t border-primary/10 flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                  <span className="text-primary/60">status: inspecting</span>
                  <span className="text-primary font-bold">READY_</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
