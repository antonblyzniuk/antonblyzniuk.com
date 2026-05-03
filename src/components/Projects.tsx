import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CVData, Project } from "../types";
import { Github, ExternalLink, X, Globe, Code2, ArrowUpRight } from "lucide-react";
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
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={featured ? "md:col-span-2" : ""}
    >
      <div
        onClick={onClick}
        className="group cursor-pointer liquid-card rounded-2xl overflow-hidden transition-all duration-300 relative z-[1] will-change-transform block"
        style={{
          transform: "translateY(0px)",
          boxShadow: "none",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(-12px)";
          el.style.boxShadow = "0 24px 70px rgba(0,0,0,0.6), 0 0 50px rgba(124,106,255,0.1)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(0px)";
          el.style.boxShadow = "none";
        }}
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
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(4,4,10,0.65)", backdropFilter: "blur(2px)" }}
            >
              <div
                className="px-5 py-3 rounded-xl font-mono text-sm font-bold flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                style={{
                  background: "rgba(124,106,255,0.15)",
                  border: "1px solid rgba(124,106,255,0.4)",
                  color: "#a89aff",
                }}
              >
                View Project
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`${featured ? "aspect-[3/2] sm:aspect-[16/7]" : "aspect-video"} flex items-center justify-center border-b`}
            style={{ background: "rgba(13,13,32,0.5)", borderColor: "rgba(124,106,255,0.08)" }}
          >
            <Code2 className="w-12 h-12" style={{ color: "rgba(124,106,255,0.1)" }} />
          </div>
        )}

        {/* Content */}
        <div className={`${featured ? "p-6 md:p-8" : "p-5"} space-y-3 relative z-[1]`}>
          <h3
            className={`font-display font-bold text-foreground group-hover:text-primary-light transition-colors leading-snug ${featured ? "text-xl md:text-2xl" : "text-base"}`}
          >
            {project.name}
          </h3>
          <p
            className={`text-muted-foreground leading-relaxed font-mono ${featured ? "text-sm line-clamp-3" : "text-xs line-clamp-2"}`}
          >
            {project.description}
          </p>
          {project.links.length > 0 && (
            <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "rgba(124,106,255,0.07)" }}>
              {project.links.slice(0, 3).map((link, j) => (
                <span key={j} className="flex items-center gap-1 text-[10px] font-mono" style={{ color: "rgba(74,74,106,0.6)" }}>
                  {link.name.toLowerCase().includes("github") ? <Github className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                  <span className="truncate max-w-[64px]">{link.name}</span>
                </span>
              ))}
              <span
                className="ml-auto text-[10px] font-mono flex items-center gap-1 group-hover:text-primary-light transition-colors"
                style={{ color: "rgba(124,106,255,0.4)" }}
              >
                open <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ data }: { data: CVData }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [featured, ...rest] = data.projects;

  return (
    <section id="projects" className="py-24 scroll-mt-24 relative overflow-x-hidden">
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
            <span>04 · work</span>
            <div className="h-px w-6 bg-primary/20" />
          </div>
          <h2
            className="font-display font-black leading-[0.86]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            <span className="block text-foreground">SELECTED</span>
            <span className="block gradient-text">WORK</span>
          </h2>
        </motion.div>

        {/* Filter bar — only "ALL" since Project has no category field */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-2 mb-8 overflow-x-auto pb-1"
        >
          <button
            className="flex-none px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-200"
            style={{
              background: "rgba(124,106,255,0.15)",
              border: "1px solid rgba(124,106,255,0.4)",
              color: "#a89aff",
            }}
          >
            ALL
          </button>
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {featured && (
              <ProjectCard
                key={featured.name}
                project={featured}
                index={0}
                featured
                onClick={() => setSelected(featured)}
              />
            )}
            {rest.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i + 1}
                onClick={() => setSelected(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(4,4,10,0.92)", backdropFilter: "blur(24px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="relative max-w-4xl w-full max-h-full liquid-card rounded-2xl overflow-hidden relative z-[1]"
              style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.85), 0 0 60px rgba(124,106,255,0.1)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div
                className="px-5 py-3 flex items-center justify-between relative z-[1]"
                style={{ borderBottom: "1px solid rgba(124,106,255,0.1)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,204,0,0.6)" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "rgba(124,106,255,0.6)" }} />
                  </div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5" />
                    {selected.name.toLowerCase().replace(/\s+/g, "_")}.sh
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2.5 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
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

                <div className="p-6 md:p-10 space-y-6 relative z-[1]">
                  <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight gradient-text">
                    {selected.name}
                  </h2>
                  <div
                    className="p-5 rounded-xl font-mono text-sm leading-relaxed"
                    style={{
                      background: "rgba(8,8,22,0.6)",
                      border: "1px solid rgba(124,106,255,0.1)",
                      color: "rgba(232,232,240,0.85)",
                    }}
                  >
                    <span style={{ color: "rgba(124,106,255,0.4)", marginRight: "0.75rem" }}>&gt;</span>
                    {selected.description}
                  </div>
                  {selected.links.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.22em]">
                        Available Deployments
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {selected.links.map((link, k) => (
                          <Button
                            key={k}
                            variant="outline"
                            className="gap-2.5 font-mono text-sm"
                            style={{
                              borderColor: "rgba(124,106,255,0.2)",
                            }}
                            asChild
                          >
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              {link.name.toLowerCase().includes("github") ? <Github className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
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

              <div
                className="px-6 py-2.5 flex items-center justify-between font-mono text-[9px] text-muted-foreground relative z-[1]"
                style={{ borderTop: "1px solid rgba(124,106,255,0.08)" }}
              >
                <span style={{ color: "rgba(124,106,255,0.45)" }}>status: inspecting</span>
                <span className="text-primary font-bold tracking-widest text-shimmer">READY_</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
