import { motion } from "motion/react";
import { CVData } from "../types";
import { Github, Linkedin, Mail, ChevronRight, Monitor, ExternalLink, Globe, Phone, MapPin, Download } from "lucide-react";
import Typewriter from "./Typewriter";
import { sendTelegramNotification } from "../services/notifications";

export default function Hero({ data }: { data: CVData }) {
  const mainPhoto = data.photos.find((p) => p.is_main)?.image || data.photos[0]?.image;

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("github")) return <Github className="w-4 h-4" />;
    if (n.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
    if (n.includes("mail") || n.includes("email")) return <Mail className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <section className="min-h-screen pt-28 pb-20 flex flex-col justify-center relative overflow-hidden">
      {/* Dot-grid, fades toward edges */}
      <div
        className="absolute inset-0 dot-grid pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 90%)",
          opacity: 0.5,
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 -left-48 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-accent/4 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-center">

          {/* ── Left: Content ── */}
          <div className="space-y-8 order-2 lg:order-1">

            {/* Terminal prompt */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 font-mono text-sm text-primary"
            >
              <ChevronRight className="w-4 h-4 shrink-0" />
              <Typewriter text="whoami --verbose" speed={80} />
            </motion.div>

            {/* Name — MASSIVE */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-black tracking-tighter leading-[0.86]"
              style={{ fontSize: "clamp(3.2rem, 10.5vw, 9rem)" }}
            >
              <span className="block text-foreground">{data.first_name.toUpperCase()}</span>
              <span className="block gradient-text">{data.last_name.toUpperCase()}</span>
            </motion.h1>

            {/* Profession + meta chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <div className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-xl border border-primary/15 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <Typewriter text={data.profession} delay={700} speed={35} className="font-mono text-sm text-foreground/90" />
              </div>
              {data.location && (
                <div className="flex items-center gap-1.5 px-3 py-2.5 glass rounded-xl border border-primary/10 font-mono text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 text-primary/60 shrink-0" />
                  {data.location}
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-1.5 px-3 py-2.5 glass rounded-xl border border-accent/10 font-mono text-xs text-muted-foreground">
                  <Phone className="w-3 h-3 text-accent/60 shrink-0" />
                  {data.phone}
                </div>
              )}
            </motion.div>

            {/* Social links + resume CTA */}
            {data.links.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2.5"
              >
                {data.links.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.65 + i * 0.07 }}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-primary/15 hover:border-primary/45 hover:bg-primary/8 transition-all duration-200 font-mono text-sm text-muted-foreground hover:text-primary group"
                  >
                    {getIcon(link.name)}
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </motion.a>
                ))}
                {data.pdf_resume && (
                  <motion.a
                    href={data.pdf_resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.65 + data.links.length * 0.07 }}
                    whileHover={{ y: -3 }}
                    onClick={() => sendTelegramNotification("CV Downloaded")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/15 border border-primary/40 hover:bg-primary/25 hover:border-primary/65 transition-all font-mono text-sm text-primary font-semibold shadow-[0_0_24px_rgba(180,190,254,0.15)]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Resume.pdf
                  </motion.a>
                )}
              </motion.div>
            )}

            {/* Status row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap items-center gap-6 font-mono text-[11px] text-muted-foreground/55 pt-4 border-t border-primary/8"
            >
              <span className="flex items-center gap-1.5 text-emerald-400/90">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE
              </span>
              <span className="flex items-center gap-1.5">
                <Monitor className="w-3 h-3" />
                REMOTE
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-primary/40" />
                {data.email}
              </span>
              <span className="ml-auto text-primary font-bold tracking-widest">READY_</span>
            </motion.div>
          </div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 90, damping: 18 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              {/* Spinning conic gradient ring */}
              <div
                className="absolute -inset-[4px] rounded-2xl z-0"
                style={{
                  background: "conic-gradient(from 0deg, rgba(180,190,254,0.75), rgba(203,166,247,0.65), rgba(250,179,135,0.65), rgba(137,180,250,0.55), rgba(180,190,254,0.75))",
                  animation: "ring-spin 9s linear infinite",
                  filter: "blur(3px)",
                }}
              />
              {/* Gap layer */}
              <div className="absolute -inset-[3px] rounded-2xl bg-background z-0" />

              {/* Photo box */}
              <div className="relative z-10 w-64 h-64 sm:w-[290px] sm:h-[290px] lg:w-[320px] lg:h-[320px] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(180,190,254,0.18),0_40px_100px_rgba(0,0,0,0.65)] group">
                <img
                  src={mainPhoto || "https://picsum.photos/seed/profile/400/400"}
                  alt={`${data.first_name} ${data.last_name}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.03)_3px,rgba(0,0,0,0.03)_4px)] pointer-events-none opacity-40" />
              </div>

              {/* ONLINE badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 glass rounded-full border border-emerald-400/25 font-mono text-[10px] text-emerald-400 flex items-center gap-1.5 whitespace-nowrap shadow-xl z-20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </motion.div>

              {/* Corner brackets */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary/55 z-20 pointer-events-none" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary/55 z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary/55 z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary/55 z-20 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
