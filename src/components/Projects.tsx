import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CVData, Project } from "../types";
import { Github, ExternalLink, Terminal, Search, Folder, X, Globe, Code2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Typewriter from "./Typewriter";

interface ProjectsProps {
  data: CVData;
}

export default function Projects({ data }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 font-mono text-sm">
            <span className="text-primary">root@portfolio:</span>
            <span className="text-accent">~</span>
            <span className="text-foreground">$ <Typewriter text="find ./projects -type d" speed={50} /></span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.map((project, i) => (
            <motion.div
              key={i}
              layoutId={`project-${project.name}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="terminal-window bg-secondary/20 border-primary/10 overflow-hidden group hover:border-primary/30 transition-all cursor-pointer"
            >
              {/* Project Header */}
              <div className="bg-secondary/50 border-b border-primary/10 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  <Folder className="w-3 h-3 text-accent" />
                  {project.name.toLowerCase().replace(/\s+/g, "_")}
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary/30" />
                  <div className="w-2 h-2 rounded-full bg-primary/10" />
                </div>
              </div>

              {project.image && (
                <div className="relative aspect-video overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    <div className="p-3 rounded-xl bg-primary/20 border border-primary/40 transform scale-90 group-hover:scale-100 transition-transform">
                      <Search className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    <Typewriter text={project.name} speed={50} delay={500 + i * 200} />
                  </h3>
                  <div className="text-sm text-muted-foreground leading-relaxed font-mono line-clamp-2">
                    <span className="text-primary mr-2">#</span>
                    {project.description}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.name.split(" ").slice(0, 3).map((tag, j) => (
                    <Badge
                      key={j}
                      variant="outline"
                      className="font-mono text-[10px] border-primary/10 text-muted-foreground"
                    >
                      {tag.toLowerCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      {/* Project Modal */}
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
              layoutId={`project-${selectedProject.name}`}
              className="relative max-w-6xl w-full max-h-full terminal-window overflow-hidden bg-secondary/40 border-primary/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Modal Header */}
              <div className="bg-secondary/80 border-b border-primary/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/60" />
                  </div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5" />
                    Project_Inspector.sh
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
                {selectedProject.image && (
                  <div className="relative aspect-video w-full">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60" />
                  </div>
                )}

                <div className="p-6 md:p-10 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-glow">
                      {selectedProject.name}
                    </h2>
                    <div className="p-6 rounded-lg bg-primary/5 border border-primary/10 font-mono text-sm md:text-base text-foreground leading-relaxed">
                      <span className="text-primary mr-3 font-bold">&gt;</span>
                      {selectedProject.description}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                      Available_Deployments
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {selectedProject.links.map((link, k) => (
                        <Button
                          key={k}
                          variant="outline"
                          className="gap-3 border-primary/20 hover:border-primary hover:bg-primary/5 group"
                          asChild
                        >
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.name.toLowerCase().includes("github") ? (
                              <Github className="w-5 h-5" />
                            ) : (
                              <Globe className="w-5 h-5" />
                            )}
                            <span className="font-mono text-sm">{link.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-3 bg-secondary/80 border-t border-primary/10 flex items-center justify-between font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-4">
                  <span className="text-primary">Status: INSPECTING</span>
                  <span>Buffer: 100%</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>ID: {selectedProject.name.toUpperCase().slice(0, 8)}</span>
                  <span className="text-primary">READY_</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </section>
  );
}
