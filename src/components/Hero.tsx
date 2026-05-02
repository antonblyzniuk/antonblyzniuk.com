import { motion } from "motion/react";
import { CVData } from "../types";
import { Github, Linkedin, Mail, Monitor, ExternalLink, Globe, Phone, MapPin, Download } from "lucide-react";
import Typewriter from "./Typewriter";
import { sendTelegramNotification } from "../services/notifications";

export default function Hero({ data }: { data: CVData }) {
  const mainPhoto = data.photos.find((p) => p.is_main)?.image || data.photos[0]?.image;

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("github"))   return <Github   className="w-4 h-4" />;
    if (n.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
    if (n.includes("mail") || n.includes("email")) return <Mail className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <section className="min-h-screen pt-24 pb-24 flex flex-col justify-center relative overflow-x-hidden">

      {/* ── Aurora background ── */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="aurora-blob"
          style={{
            width: "900px", height: "900px",
            background: "radial-gradient(circle, rgba(180,190,254,0.14) 0%, transparent 70%)",
            top: "-300px", left: "-250px",
            animation: "aurora-1 24s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-blob"
          style={{
            width: "700px", height: "700px",
            background: "radial-gradient(circle, rgba(203,166,247,0.11) 0%, transparent 70%)",
            top: "20%", right: "-200px",
            animation: "aurora-2 30s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-blob"
          style={{
            width: "550px", height: "550px",
            background: "radial-gradient(circle, rgba(250,179,135,0.09) 0%, transparent 70%)",
            bottom: "-100px", left: "25%",
            animation: "aurora-3 20s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-blob"
          style={{
            width: "450px", height: "450px",
            background: "radial-gradient(circle, rgba(137,220,235,0.07) 0%, transparent 70%)",
            top: "55%", left: "5%",
            animation: "aurora-4 27s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 dot-grid pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 15%, transparent 82%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 15%, transparent 82%)",
          opacity: 0.35,
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_440px] gap-10 lg:gap-16 items-center">

          {/* ── Left: Content ── */}
          <div className="space-y-7 order-2 lg:order-1">

            {/* Terminal prompt */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 font-mono text-sm text-primary/70"
            >
              <span className="text-primary/35">~/</span>
              <Typewriter text="whoami --verbose" speed={70} />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
                className="inline-block w-[7px] h-[15px] bg-primary/60 ml-0.5"
              />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 55, damping: 14 }}
            >
              <h1
                className="font-display font-black tracking-tighter leading-[0.84]"
                style={{ fontSize: "clamp(3.2rem, 10.5vw, 10rem)" }}
              >
                <span className="block text-foreground glitch-hover">{data.first_name.toUpperCase()}</span>
                <span className="block gradient-text text-glow">{data.last_name.toUpperCase()}</span>
              </h1>
            </motion.div>

            {/* Profession + meta chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <div
                className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-primary/18 overflow-hidden group cursor-default"
                style={{ background: "rgba(180,190,254,0.05)" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/6 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <Typewriter text={data.profession} delay={700} speed={30} className="font-mono text-sm text-foreground/90 relative z-10" />
              </div>
              {data.location && (
                <div
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-primary/10 font-mono text-xs text-muted-foreground"
                  style={{ background: "rgba(8,8,16,0.6)" }}
                >
                  <MapPin className="w-3 h-3 text-primary/50 shrink-0" />
                  {data.location}
                </div>
              )}
              {data.phone && (
                <div
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-accent/15 font-mono text-xs text-muted-foreground"
                  style={{ background: "rgba(8,8,16,0.6)" }}
                >
                  <Phone className="w-3 h-3 text-accent/50 shrink-0" />
                  {data.phone}
                </div>
              )}
            </motion.div>

            {/* Social links + resume */}
            {data.links.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
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
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.62 + i * 0.07, type: "spring", stiffness: 280 }}
                    whileHover={{ y: -4, scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/14 hover:border-primary/45 hover:bg-primary/8 transition-colors duration-200 font-mono text-sm text-muted-foreground hover:text-primary group"
                    style={{ background: "rgba(8,8,16,0.55)" }}
                  >
                    {getIcon(link.name)}
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-55 transition-opacity" />
                  </motion.a>
                ))}
                {data.pdf_resume && (
                  <motion.a
                    href={data.pdf_resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.62 + data.links.length * 0.07, type: "spring", stiffness: 280 }}
                    whileHover={{ y: -4, scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => sendTelegramNotification("CV Downloaded")}
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/38 font-mono text-sm text-primary font-semibold overflow-hidden group"
                    style={{
                      background: "rgba(180,190,254,0.1)",
                      boxShadow: "0 0 28px rgba(180,190,254,0.12)",
                    }}
                  >
                    <span className="absolute inset-0 bg-primary/8 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 pointer-events-none" />
                    <Download className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10">Resume.pdf</span>
                  </motion.a>
                )}
              </motion.div>
            )}

            {/* Status row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
              className="flex flex-wrap items-center gap-5 font-mono text-[11px] text-muted-foreground/45 pt-5 border-t border-primary/7"
            >
              <span className="flex items-center gap-1.5 text-emerald-400/85">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE
              </span>
              <span className="flex items-center gap-1.5">
                <Monitor className="w-3 h-3" />
                REMOTE
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-primary/38" />
                {data.email}
              </span>
              <span className="ml-auto text-primary font-bold tracking-widest text-shimmer">READY_</span>
            </motion.div>
          </div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, type: "spring", stiffness: 65, damping: 17 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            {/*
              Wrapper gives explicit padding so absolute decorators don't overflow
              p-10 = 40px on all sides (matches the glow blur radius)
            */}
            <div className="relative p-10">

              {/* Soft outer glow — contained in the padding area */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "conic-gradient(from 0deg, rgba(180,190,254,0.18), rgba(203,166,247,0.14), rgba(250,179,135,0.12), rgba(137,220,235,0.10), rgba(180,190,254,0.18))",
                  animation: "ring-spin 14s linear infinite",
                  filter: "blur(55px)",
                  opacity: 0.7,
                }}
              />

              {/* Photo box — the actual sizing anchor */}
              <div className="relative">
                {/* Spinning gradient ring */}
                <div
                  className="absolute -inset-[5px] rounded-2xl z-0"
                  style={{
                    background: "conic-gradient(from 0deg, #b4befe, #cba6f7, #fab387, #89dceb, #a6e3a1, #b4befe)",
                    animation: "ring-spin 7s linear infinite",
                    filter: "blur(3px)",
                  }}
                />
                {/* Gap (background fill between ring and photo) */}
                <div
                  className="absolute -inset-[4px] rounded-2xl z-0"
                  style={{ background: "var(--color-background)" }}
                />

                {/* Photo */}
                <div
                  className="relative z-10 w-[260px] h-[280px] sm:w-[280px] sm:h-[300px] lg:w-[320px] lg:h-[340px] rounded-2xl overflow-hidden group"
                  style={{ boxShadow: "0 0 80px rgba(180,190,254,0.18), 0 32px 80px rgba(0,0,0,0.75)" }}
                >
                  <img
                    src={mainPhoto || "https://picsum.photos/seed/profile/400/500"}
                    alt={`${data.first_name} ${data.last_name}`}
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-[1.06] group-hover:brightness-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                </div>

                {/* ONLINE badge — positioned below photo, inside the padding area */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 300 }}
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border border-emerald-400/25 font-mono text-[10px] text-emerald-400 flex items-center gap-1.5 whitespace-nowrap z-20"
                  style={{
                    background: "rgba(8,8,16,0.88)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 4px 24px rgba(74,222,128,0.15)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </motion.div>

                {/* Corner brackets */}
                <div className="absolute -top-3 -left-3 w-7 h-7 border-t-2 border-l-2 border-primary/55 z-20 pointer-events-none" />
                <div className="absolute -top-3 -right-3 w-7 h-7 border-t-2 border-r-2 border-primary/55 z-20 pointer-events-none" />
                <div className="absolute -bottom-3 -left-3 w-7 h-7 border-b-2 border-l-2 border-primary/55 z-20 pointer-events-none" />
                <div className="absolute -bottom-3 -right-3 w-7 h-7 border-b-2 border-r-2 border-primary/55 z-20 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] text-muted-foreground/35 pointer-events-none select-none"
      >
        <span className="tracking-widest uppercase">scroll</span>
        <div
          className="w-px h-8 bg-gradient-to-b from-primary/40 to-transparent"
          style={{ animation: "bounce-y 1.8s ease-in-out infinite" }}
        />
      </motion.div>
    </section>
  );
}
