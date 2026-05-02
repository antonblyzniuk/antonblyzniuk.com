import { useState, type ReactNode } from "react";
import { useMotionValue, useSpring, motion, AnimatePresence } from "motion/react";
import { CVData, Project } from "../types";
import { Github, ExternalLink, Folder, X, Globe, Code2, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

function TiltCard({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(rawX, { stiffness: 260, damping: 24 });
  const rotateX = useSpring(rawY, { stiffness: 260, damping: 24 });

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
        rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * -10);
      }}
      onMouseLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09 }}
      className={featured ? "md:col-span-2" : ""}
    >
      <TiltCard
        onClick={onClick}
        className="group cursor-pointer bento-card hover:border-primary/35 overflow-hidden transition-all duration-300 hover:shadow-[0_24px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(180,190,254,0.1)] block w-full"
      >
        {/* Image */}
        {project.image ? (
          <div className={`relative overflow-hidden ${featured ? "aspect-[3/2] sm:aspect-[16/7]" : "aspect-video"}`}>
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/15 to-transparent" />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/7 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
              <div className="p-3 rounded-xl bg-primary/20 border border-primary/40 shadow-[0_0_28px_rgba(180,190,254,0.3)] translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
            </div>

            {/* Tab bar */}
            <div className="absolute top-0 left-0 right-0 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[10px] text-white/55 glass rounded-md px-2 py-1 backdrop-blur-sm">
                <Folder className="w-3 h-3 text-accent/70 shrink-0" />
                <span className="truncate max-w-[120px]">
                  {project.name.toLowerCase().replace(/\s+/g, "_")}.sh
                </span>
              </div>
              <div className="flex gap-1.5 glass rounded-md px-2 py-1 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-destructive/60" />
                <div className="w-2 h-2 rounded-full bg-accent/60" />
                <div className="w-2 h-2 rounded-full bg-primary/60" />
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`${featured ? "aspect-[3/2] sm:aspect-[16/7]" : "aspect-video"} bg-secondary/25 flex items-center justify-center border-b border-primary/5 group-hover:bg-secondary/35 transition-colors`}
          >
            <Code2 className="w-12 h-12 text-primary/10" />
          </div>
        )}

        {/* Content */}
        <div className={`${featured ? "p-6 md:p-8" : "p-5"} space-y-3`}>
          <h3
            className={`font-display font-bold text-foreground group-hover:text-primary transition-colors leading-snug ${featured ? "text-xl md:text-2xl" : "text-base"}`}
          >
            {project.name}
          </h3>
          <p
            className={`text-muted-foreground/70 leading-relaxed font-mono ${featured ? "text-sm line-clamp-3" : "text-xs line-clamp-2"}`}
          >
            {project.description}
          </p>
          {project.links.length > 0 && (
            <div className="flex items-center gap-3 pt-2 border-t border-primary/5">
              {project.links.slice(0, 3).map((link, j) => (
                <span key={j} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/40">
                  {link.name.toLowerCase().includes("github")
                    ? <Github className="w-3 h-3" />
                    : <Globe className="w-3 h-3" />}
                  <span className="truncate max-w-[64px]">{link.name}</span>
                </span>
              ))}
              <span className="ml-auto text-[10px] font-mono text-primary/35 group-hover:text-primary/65 transition-colors flex items-center gap-1">
                open <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>
          )}
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Projects({ data }: { data: CVData }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [featured, ...rest] = data.projects;

  return (
    <section id="projects" className="py-24 scroll-mt-24 relative overflow-x-hidden">
      <div className="section-num absolute top-4 right-0 select-none pointer-events-none">04</div>

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
            <span>04 · projects</span>
            <div className="h-px w-6 bg-primary/20" />
          </div>
          <h2
            className="font-display font-black tracking-tight leading-[0.86]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <span className="block text-foreground">Selected</span>
            <span className="block gradient-text">Works</span>
          </h2>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured && (
            <ProjectCard project={featured} index={0} featured onClick={() => setSelected(featured)} />
          )}
          {rest.map((project, i) => (
            <ProjectCard key={i} project={project} index={i + 1} onClick={() => setSelected(project)} />
          ))}
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-background/92 backdrop-blur-2xl"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="relative max-w-4xl w-full max-h-full bento-card overflow-hidden border-primary/22 shadow-[0_40px_120px_rgba(0,0,0,0.85),0_0_60px_rgba(180,190,254,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="px-5 py-3 border-b border-primary/10 flex items-center justify-between">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  </div>
                )}

                <div className="p-6 md:p-10 space-y-6">
                  <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight gradient-text">
                    {selected.name}
                  </h2>
                  <div className="p-5 rounded-xl glass border border-primary/10 font-mono text-sm text-foreground/85 leading-relaxed">
                    <span className="text-primary/38 mr-3">&gt;</span>
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
                            className="gap-2.5 border-primary/18 hover:border-primary hover:bg-primary/8 font-mono text-sm"
                            asChild
                          >
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              {link.name.toLowerCase().includes("github")
                                ? <Github className="w-4 h-4" />
                                : <Globe className="w-4 h-4" />}
                              {link.name}
                              <ExternalLink className="w-3 h-3 opacity-45" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-2.5 border-t border-primary/8 flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                <span className="text-primary/45">status: inspecting</span>
                <span className="text-primary font-bold tracking-widest">READY_</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
