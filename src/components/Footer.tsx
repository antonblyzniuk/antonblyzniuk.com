import { motion } from "motion/react";
import { CVData } from "../types";
import { Github, Linkedin, Mail, Globe, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function Footer({ data }: { data: CVData }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.style.transition = "opacity 0.15s ease";
    document.body.style.opacity = "0.85";
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 150);
  };

  const getLinkIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("github")) return <Github className="w-5 h-5" />;
    if (n.includes("linkedin")) return <Linkedin className="w-5 h-5" />;
    if (n.includes("mail") || n.includes("email")) return <Mail className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  const getLinkColor = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("github")) return "#e8e8f0";
    if (n.includes("linkedin")) return "#0088ff";
    if (n.includes("mail") || n.includes("email")) return "#00ffcc";
    return "#a89aff";
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <footer
      id="contact"
      className="pt-24 pb-10 relative overflow-hidden"
      style={{ background: "#080816" }}
    >
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,106,255,0.3) 30%, rgba(0,255,204,0.2) 70%, transparent)" }}
      />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "80%",
          height: "300px",
          background: "radial-gradient(ellipse at 50% 100%, rgba(124,106,255,0.06), transparent 70%)",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Three column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-16">
          {/* Left: monogram + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="font-display font-black text-3xl mb-3"
              style={{ letterSpacing: "-0.04em" }}
            >
              <span style={{ color: "#a89aff" }}>{data.first_name[0]}</span>
              <span className="text-foreground/30 mx-1">·</span>
              <span className="text-foreground">{data.last_name[0]}</span>
            </div>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              {data.profession}
              <br />
              <span style={{ color: "rgba(74,74,106,0.6)" }}>Available for work</span>
            </p>
            {data.location && (
              <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground mt-3">
                <MapPin className="w-3 h-3" />
                {data.location}
              </div>
            )}
          </motion.div>

          {/* Center: nav links vertical */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Navigation</span>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mag-link font-mono text-sm text-muted-foreground hover:text-primary-light transition-colors w-fit"
              >
                {link.name}
              </a>
            ))}
          </motion.div>

          {/* Right: social icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Connect</span>
            {data.links.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 group transition-all duration-200"
              >
                <span
                  className="transition-all duration-200 group-hover:drop-shadow-lg"
                  style={{ color: "rgba(74,74,106,0.6)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.color = getLinkColor(link.name);
                    (e.currentTarget as HTMLSpanElement).style.filter = `drop-shadow(0 0 8px ${getLinkColor(link.name)}60)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.color = "rgba(74,74,106,0.6)";
                    (e.currentTarget as HTMLSpanElement).style.filter = "none";
                  }}
                >
                  {getLinkIcon(link.name)}
                </span>
                <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {link.name}
                </span>
              </motion.a>
            ))}

            {/* Email */}
            <motion.a
              href={`mailto:${data.email}`}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 group transition-all duration-200"
            >
              <Mail className="w-5 h-5" style={{ color: "rgba(74,74,106,0.6)" }} />
              <span className="font-mono text-sm text-muted-foreground group-hover:text-accent-2 transition-colors mag-link">
                {data.email}
              </span>
            </motion.a>

            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-3 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-5 h-5" style={{ color: "rgba(74,74,106,0.6)" }} />
                {data.phone}
              </a>
            )}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px]"
          style={{
            borderTop: "1px solid rgba(124,106,255,0.08)",
            color: "rgba(74,74,106,0.5)",
          }}
        >
          <span>
            © {currentYear} {data.first_name.toUpperCase()} {data.last_name.toUpperCase()} · BUILT WITH REACT · DEPLOYED ON RAILWAY
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-primary-light transition-colors group"
          >
            <span>↑ BACK TO TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
