import { motion } from "motion/react";
import { CVData } from "../types";
import { Github, Linkedin, Mail, Monitor, ExternalLink, Globe, Phone, MapPin, Download, ArrowDown } from "lucide-react";
import Typewriter from "./Typewriter";
import { sendTelegramNotification } from "../services/notifications";

export default function Hero({ data }: { data: CVData }) {
  const mainPhoto = data.photos.find((p) => p.is_main)?.image || data.photos[0]?.image;

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("github"))   return <Github   className="w-3.5 h-3.5" />;
    if (n.includes("linkedin")) return <Linkedin className="w-3.5 h-3.5" />;
    if (n.includes("mail") || n.includes("email")) return <Mail className="w-3.5 h-3.5" />;
    return <Globe className="w-3.5 h-3.5" />;
  };

  return (
    <section className="h-screen overflow-hidden flex flex-col justify-center relative">

      {/* ── Aurora background ── */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="aurora-blob" style={{ width: "900px", height: "900px", background: "radial-gradient(circle, rgba(180,190,254,0.12) 0%, transparent 65%)", top: "-350px", left: "-280px", animation: "aurora-1 26s ease-in-out infinite" }} />
        <div className="aurora-blob" style={{ width: "700px", height: "700px", background: "radial-gradient(circle, rgba(203,166,247,0.10) 0%, transparent 65%)", top: "10%", right: "-200px", animation: "aurora-2 32s ease-in-out infinite" }} />
        <div className="aurora-blob" style={{ width: "500px", height: "500px", background: "radial-gradient(circle, rgba(250,179,135,0.08) 0%, transparent 65%)", bottom: "-60px", left: "30%", animation: "aurora-3 22s ease-in-out infinite" }} />
        <div className="aurora-blob" style={{ width: "380px", height: "380px", background: "radial-gradient(circle, rgba(137,220,235,0.06) 0%, transparent 65%)", top: "60%", left: "8%", animation: "aurora-4 29s ease-in-out infinite" }} />
      </div>

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 dot-grid pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 10%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 10%, transparent 80%)",
          opacity: 0.28,
        }}
      />

      {/* ── Horizontal accent line ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.2, ease: "easeOut" }}
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "calc(50% + 2px)", height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(180,190,254,0.04) 20%, rgba(180,190,254,0.1) 50%, rgba(180,190,254,0.04) 80%, transparent 100%)", transformOrigin: "center" }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-16 sm:pt-20">
        {/*
          Always 2 columns — photo on right, text on left.
          Grid auto-sizes photo column to content width (clamp-controlled).
        */}
        <div className="grid grid-cols-[1fr_auto] gap-5 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* ── Left: Content ── */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 min-w-0">

            {/* Terminal prompt */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="hidden sm:flex items-center gap-2 font-mono text-sm text-primary/60"
            >
              <span className="text-primary/30">~/</span>
              <Typewriter text="whoami --verbose" speed={60} />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
                className="inline-block w-[6px] h-[14px] bg-primary/50"
              />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, type: "spring", stiffness: 55, damping: 14 }}
            >
              <h1
                className="font-display font-black tracking-tighter leading-[0.82]"
                style={{ fontSize: "clamp(2.1rem, 7.8vw, 10rem)" }}
              >
                <span className="block text-foreground glitch-hover">{data.first_name.toUpperCase()}</span>
                <span className="block gradient-text text-glow">{data.last_name.toUpperCase()}</span>
              </h1>
            </motion.div>

            {/* Profession + location */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
              className="flex flex-wrap items-center gap-2"
            >
              <div
                className="relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-primary/20 overflow-hidden group cursor-default"
                style={{ background: "rgba(180,190,254,0.06)" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-foreground/85 relative z-10 truncate max-w-[200px] sm:max-w-none">
                  <Typewriter text={data.profession} delay={550} speed={25} />
                </span>
              </div>
              {data.location && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-primary/10 font-mono text-xs text-muted-foreground" style={{ background: "rgba(8,8,16,0.55)" }}>
                  <MapPin className="w-3 h-3 text-primary/45 shrink-0" />
                  {data.location}
                </div>
              )}
              {data.phone && (
                <div className="hidden md:flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-accent/15 font-mono text-xs text-muted-foreground" style={{ background: "rgba(8,8,16,0.55)" }}>
                  <Phone className="w-3 h-3 text-accent/45 shrink-0" />
                  {data.phone}
                </div>
              )}
            </motion.div>

            {/* Social links + resume */}
            {data.links.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="flex flex-wrap gap-2"
              >
                {data.links.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.54 + i * 0.06, type: "spring", stiffness: 300 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-primary/14 hover:border-primary/45 hover:bg-primary/8 transition-colors duration-200 font-mono text-xs sm:text-sm text-muted-foreground hover:text-primary group"
                    style={{ background: "rgba(8,8,16,0.55)" }}
                  >
                    {getIcon(link.name)}
                    <span className="hidden xs:inline sm:inline">{link.name}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </motion.a>
                ))}
                {data.pdf_resume && (
                  <motion.a
                    href={data.pdf_resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.54 + data.links.length * 0.06, type: "spring", stiffness: 300 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => sendTelegramNotification("CV Downloaded")}
                    className="relative flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-primary/40 font-mono text-xs sm:text-sm text-primary font-semibold overflow-hidden group"
                    style={{ background: "rgba(180,190,254,0.08)", boxShadow: "0 0 28px rgba(180,190,254,0.14)" }}
                  >
                    <span className="absolute inset-0 bg-primary/8 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 pointer-events-none" />
                    <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 relative z-10" />
                    <span className="relative z-10">CV</span>
                  </motion.a>
                )}
              </motion.div>
            )}

            {/* Status row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.88 }}
              className="hidden sm:flex flex-wrap items-center gap-4 font-mono text-[11px] text-muted-foreground/40 pt-3 sm:pt-4 border-t border-primary/8"
            >
              <span className="flex items-center gap-1.5 text-emerald-400/85">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE
              </span>
              <span className="flex items-center gap-1.5">
                <Monitor className="w-3 h-3" />
                REMOTE
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-primary/35" />
                {data.email}
              </span>
              <span className="ml-auto text-primary font-bold tracking-widest text-shimmer">READY_</span>
            </motion.div>
          </div>

          {/* ── Right: Photo ── always right, no order swapping ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.14, type: "spring", stiffness: 60, damping: 16 }}
            className="flex justify-end"
          >
            {/* Padding wrapper = safe zone for decorative overflows */}
            <div className="relative p-2 sm:p-4 lg:p-7">

              {/* Outer colour-cycling glow */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "conic-gradient(from 0deg, rgba(180,190,254,0.20), rgba(203,166,247,0.16), rgba(250,179,135,0.13), rgba(137,220,235,0.10), rgba(180,190,254,0.20))",
                  animation: "ring-spin 16s linear infinite",
                  filter: "blur(50px)",
                  opacity: 0.8,
                }}
              />

              {/* Inner photo stack */}
              <div className="relative">
                {/* Spinning gradient ring */}
                <div
                  className="absolute -inset-[3px] sm:-inset-[5px] rounded-2xl z-0"
                  style={{
                    background: "conic-gradient(from 0deg, #b4befe, #cba6f7, #fab387, #89dceb, #a6e3a1, #b4befe)",
                    animation: "ring-spin 8s linear infinite",
                    filter: "blur(2px)",
                  }}
                />
                {/* Gap fill */}
                <div
                  className="absolute -inset-[2px] sm:-inset-[3px] rounded-2xl z-0"
                  style={{ background: "var(--color-background)" }}
                />

                {/* Photo */}
                <div
                  className="relative z-10 rounded-2xl overflow-hidden group"
                  style={{
                    width: "clamp(105px, 24vw, 390px)",
                    aspectRatio: "3 / 4",
                    boxShadow: "0 0 50px rgba(180,190,254,0.14), 0 20px 55px rgba(0,0,0,0.75)",
                  }}
                >
                  <img
                    src={mainPhoto || "https://picsum.photos/seed/profile/400/500"}
                    alt={`${data.first_name} ${data.last_name}`}
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-[1.05] group-hover:brightness-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
                </div>

                {/* ONLINE badge */}
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 300 }}
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-400/25 font-mono text-[10px] text-emerald-400 whitespace-nowrap z-20"
                  style={{ background: "rgba(8,8,16,0.92)", backdropFilter: "blur(14px)", boxShadow: "0 4px 20px rgba(74,222,128,0.14)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </motion.div>

                {/* Corner brackets */}
                <div className="hidden sm:block absolute -top-2.5 -left-2.5 w-5 h-5 border-t-2 border-l-2 border-primary/55 z-20" />
                <div className="hidden sm:block absolute -top-2.5 -right-2.5 w-5 h-5 border-t-2 border-r-2 border-primary/55 z-20" />
                <div className="hidden sm:block absolute -bottom-2.5 -left-2.5 w-5 h-5 border-b-2 border-l-2 border-primary/55 z-20" />
                <div className="hidden sm:block absolute -bottom-2.5 -right-2.5 w-5 h-5 border-b-2 border-r-2 border-primary/55 z-20" />
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
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-muted-foreground/28 pointer-events-none select-none"
      >
        <span className="tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3 h-3 opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
