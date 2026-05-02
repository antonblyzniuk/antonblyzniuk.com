import { motion } from "motion/react";
import { CVData } from "../types";
import { Github, Linkedin, Mail, Globe, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import Typewriter from "./Typewriter";

export default function Footer({ data }: { data: CVData }) {
  const currentYear = new Date().getFullYear();

  const getLinkIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("github")) return <Github className="w-4 h-4" />;
    if (n.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <footer id="contact" className="pt-24 pb-12 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── CTA block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5 font-mono text-xs text-primary/55 uppercase tracking-[0.25em]">
            <span className="w-8 h-px bg-primary/30" />
            <Typewriter text="./initialize_connection.sh" speed={55} />
            <span className="w-8 h-px bg-primary/30" />
          </div>

          <h2 className="font-black tracking-tighter leading-[0.88] mb-8" style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}>
            <span className="text-foreground">Let's build</span>
            <br />
            <span className="gradient-text">something great</span>
          </h2>

          <p className="text-muted-foreground/70 font-mono text-sm leading-relaxed max-w-md mx-auto mb-8">
            Open to new projects and collaborations.<br />Response time under 24h.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {data.links.map((link, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/20 hover:border-primary/50 hover:bg-primary/8 text-muted-foreground hover:text-primary transition-all font-mono text-xs gap-2 h-10 px-5"
                  asChild
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {getLinkIcon(link.name)}
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-50" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Contact cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {/* Email */}
          <a
            href={`mailto:${data.email}`}
            className="group flex items-center gap-4 p-5 glass rounded-2xl border border-primary/10 hover:border-primary/35 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35),0_0_24px_rgba(180,190,254,0.08)] transition-all duration-250 card-wow"
          >
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/18 group-hover:bg-primary/20 transition-colors shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Email</div>
              <div className="font-mono text-sm text-foreground group-hover:text-primary transition-colors truncate">
                {data.email}
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-primary/0 group-hover:text-primary/60 transition-colors ml-auto shrink-0" />
          </a>

          {/* Phone */}
          {data.phone && (
            <a
              href={`tel:${data.phone}`}
              className="group flex items-center gap-4 p-5 glass rounded-2xl border border-accent/10 hover:border-accent/35 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35),0_0_24px_rgba(250,179,135,0.08)] transition-all duration-250 card-wow"
            >
              <div className="p-3 rounded-xl bg-accent/10 border border-accent/18 group-hover:bg-accent/20 transition-colors shrink-0">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Phone</div>
                <div className="font-mono text-sm text-foreground group-hover:text-accent transition-colors truncate">
                  {data.phone}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-accent/0 group-hover:text-accent/60 transition-colors ml-auto shrink-0" />
            </a>
          )}

          {/* Location */}
          {data.location && (
            <div className="flex items-center gap-4 p-5 glass rounded-2xl border border-primary/8">
              <div className="p-3 rounded-xl bg-primary/8 border border-primary/15 shrink-0">
                <MapPin className="w-5 h-5 text-primary/70" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Location</div>
                <div className="font-mono text-sm text-foreground truncate">{data.location}</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-primary/8 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-muted-foreground/50">
          <span>© {currentYear} {data.first_name.toLowerCase()}{data.last_name.toLowerCase()}.com</span>
          <span className="text-primary/40">exit 0  <span className="text-muted-foreground/30"># crafted by {data.first_name}</span></span>
        </div>
      </div>
    </footer>
  );
}
