import { motion } from "motion/react";
import { CVData } from "../types";
import { Github, Linkedin, Mail, Globe, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import Typewriter from "./Typewriter";

export default function Footer({ data }: { data: CVData }) {
  const currentYear = new Date().getFullYear();

  const getLinkIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("github"))   return <Github   className="w-4 h-4" />;
    if (n.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <footer id="contact" className="pt-32 pb-12 relative overflow-hidden">
      {/* Deep ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[400px] bg-primary/4 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/18 to-transparent" />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Huge CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 relative"
        >
          {/* Aurora behind CTA */}
          <div
            className="absolute inset-0 -z-10 opacity-15 blur-[120px] rounded-full"
            style={{
              background: "radial-gradient(ellipse at 50% 60%, #cba6f7 0%, #b4befe 50%, transparent 80%)",
            }}
          />

          <div className="section-eyebrow justify-center mb-7">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/25" />
            <Typewriter text="./initialize_connection.sh" speed={50} />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/25" />
          </div>

          <h2
            className="font-display font-black tracking-tighter leading-[0.86] mb-8"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            <span className="block text-foreground">Let's build</span>
            <span className="block gradient-text text-glow">something great</span>
          </h2>

          <p className="text-muted-foreground/60 font-mono text-sm leading-relaxed max-w-sm mx-auto mb-10">
            Open to new projects and collaborations.<br />Response time under 24h.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {data.links.map((link, i) => (
              <motion.div key={i} whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/18 hover:border-primary/50 hover:bg-primary/8 text-muted-foreground hover:text-primary transition-all font-mono text-xs gap-2 h-11 px-5"
                  asChild
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {getLinkIcon(link.name)}
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-45" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Contact cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {/* Email */}
          <motion.a
            href={`mailto:${data.email}`}
            whileHover={{ y: -4 }}
            className="group flex items-center gap-4 p-5 bento-card hover:border-primary/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_28px_rgba(180,190,254,0.08)] transition-all"
          >
            <div className="p-3 rounded-xl bg-primary/8 border border-primary/16 group-hover:bg-primary/16 transition-colors shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Email</div>
              <div className="font-mono text-sm text-foreground group-hover:text-primary transition-colors truncate">
                {data.email}
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-primary/0 group-hover:text-primary/55 transition-colors ml-auto shrink-0" />
          </motion.a>

          {/* Phone */}
          {data.phone && (
            <motion.a
              href={`tel:${data.phone}`}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-4 p-5 bento-card border-accent/10 hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_28px_rgba(250,179,135,0.07)] transition-all"
            >
              <div className="p-3 rounded-xl bg-accent/8 border border-accent/16 group-hover:bg-accent/16 transition-colors shrink-0">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Phone</div>
                <div className="font-mono text-sm text-foreground group-hover:text-accent transition-colors truncate">
                  {data.phone}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-accent/0 group-hover:text-accent/55 transition-colors ml-auto shrink-0" />
            </motion.a>
          )}

          {/* Location */}
          {data.location && (
            <div className="flex items-center gap-4 p-5 bento-card border-primary/7">
              <div className="p-3 rounded-xl bg-primary/6 border border-primary/12 shrink-0">
                <MapPin className="w-5 h-5 text-primary/65" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Location</div>
                <div className="font-mono text-sm text-foreground truncate">{data.location}</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-primary/7 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-muted-foreground/40">
          <span>© {currentYear} {data.first_name.toLowerCase()}{data.last_name.toLowerCase()}.com</span>
          <span className="text-primary/35">exit 0  <span className="text-muted-foreground/25"># crafted by {data.first_name}</span></span>
        </div>
      </div>
    </footer>
  );
}
