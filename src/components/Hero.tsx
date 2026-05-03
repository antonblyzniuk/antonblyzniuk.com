import { useEffect, useRef, useCallback, type RefObject, type CSSProperties } from "react";
import { motion } from "motion/react";
import { CVData } from "../types";
import { Github, Linkedin, Mail, Globe, Download } from "lucide-react";
import Typewriter from "./Typewriter";
import { sendTelegramNotification } from "../services/notifications";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  idx: number;
}

function useParticleCanvas(containerRef: RefObject<HTMLDivElement | null>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;
    const count = isMobile ? 0 : isTablet ? 60 : 120;
    particlesRef.current = Array.from({ length: count }, (_, idx) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      idx,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas || !container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initParticles(canvas);
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particlesRef.current;
      const mouse = mouseRef.current;

      // Update particles
      for (const p of ps) {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.4;
          p.vy += (dy / dist) * force * 0.4;
        }

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) {
          p.vx = (p.vx / speed) * 2;
          p.vy = (p.vy / speed) * 2;
        }
        // Gentle return to original velocity
        p.vx *= 0.98;
        p.vy *= 0.98;
        if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.1;

        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }
      }

      // Draw connections
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            const isViolet = (ps[i].idx + ps[j].idx) % 2 === 0;
            ctx.strokeStyle = isViolet
              ? `rgba(124,106,255,${alpha})`
              : `rgba(0,255,204,${alpha * 0.5})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of ps) {
        ctx.fillStyle = "rgba(124,106,255,0.4)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop() {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    loop();

    window.addEventListener("resize", resize);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [containerRef, initParticles]);

  return canvasRef;
}

function CharReveal({ text, className, style, delay = 0 }: {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  return (
    <span className={className} style={style}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * 0.025,
            type: "spring",
            stiffness: 120,
            damping: 18,
          }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function getIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("github")) return <Github className="w-4 h-4" />;
  if (n.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
  if (n.includes("mail") || n.includes("email")) return <Mail className="w-4 h-4" />;
  return <Globe className="w-4 h-4" />;
}

export default function Hero({ data }: { data: CVData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useParticleCanvas(containerRef);
  const mainPhoto = data.photos.find((p) => p.is_main)?.image || data.photos[0]?.image;

  return (
    <section
      ref={containerRef}
      className="h-screen overflow-hidden flex flex-col justify-center relative"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none hidden sm:block"
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, #04040a 100%)",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-16 sm:pt-20">
        <div className="grid grid-cols-[1fr_auto] gap-5 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* Left: Content */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6 min-w-0">

            {/* Available for work badge */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{
                border: "1px solid rgba(0,255,204,0.2)",
                background: "rgba(0,255,204,0.04)",
                color: "#00ffcc",
              }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#00ffcc" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              AVAILABLE FOR WORK
            </motion.div>

            {/* Name */}
            <div
              className="relative"
              data-cursor="text"
            >
              {/* Ghost text behind last name */}
              <div
                className="absolute pointer-events-none select-none font-display font-black"
                style={{
                  fontSize: "clamp(5rem, 16vw, 20rem)",
                  lineHeight: 0.85,
                  top: "40%",
                  left: "-2%",
                  opacity: 0.03,
                  color: "#7c6aff",
                  zIndex: -1,
                  whiteSpace: "nowrap",
                }}
              >
                {data.last_name.toUpperCase()}
              </div>

              <h1
                className="font-display font-black leading-[0.85]"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 12rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                <CharReveal
                  text={data.first_name.toUpperCase()}
                  className="block text-foreground chroma-hover"
                  delay={0.1}
                />
                <CharReveal
                  text={data.last_name.toUpperCase()}
                  className="block gradient-text"
                  delay={0.2}
                />
              </h1>
            </div>

            {/* Role chip with typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-sm"
              style={{
                border: "1px solid rgba(124,106,255,0.2)",
                background: "rgba(124,106,255,0.06)",
              }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <Typewriter text={data.profession} delay={600} speed={25} />
            </motion.div>

            {/* Description */}
            {data.about && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.9 }}
                className="text-base leading-relaxed font-mono max-w-sm"
                style={{ color: "rgba(232,232,240,0.6)" }}
              >
                {data.about.slice(0, 140)}{data.about.length > 140 ? "…" : ""}
              </motion.p>
            )}

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              {/* Download CV */}
              {data.pdf_resume && (
                <a
                  href={data.pdf_resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  onClick={() => sendTelegramNotification("CV Downloaded")}
                  className="liquid-card rounded-xl px-5 py-3 font-mono text-sm font-bold text-primary-light flex items-center gap-2 glow-primary hover:scale-[1.02] transition-transform relative z-[1] group overflow-hidden"
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, rgba(124,106,255,0.15) 60%, transparent 80%)",
                      animation: "shimmer 1.2s ease-in-out",
                    }}
                  />
                  <Download className="w-4 h-4 relative z-[1]" />
                  <span className="relative z-[1]">Download CV</span>
                </a>
              )}

              {/* Social icon circles */}
              {data.links.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.06, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 group"
                  style={{
                    border: "1px solid rgba(124,106,255,0.15)",
                    background: "rgba(8,8,22,0.6)",
                  }}
                  title={link.name}
                >
                  {getIcon(link.name)}
                </motion.a>
              ))}
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.9 }}
              className="font-mono text-xs tracking-widest flex flex-wrap items-center gap-x-4 gap-y-1"
              style={{ color: "rgba(74,74,106,0.7)" }}
            >
              <span>{data.projects.length}+ Projects</span>
              <span style={{ color: "rgba(74,74,106,0.4)" }}>·</span>
              <span>{data.experience_units.length}+ Years Exp</span>
              <span style={{ color: "rgba(74,74,106,0.4)" }}>·</span>
              <span>{data.skills.length}+ Skills</span>
              {data.certifications.length > 0 && (
                <>
                  <span style={{ color: "rgba(74,74,106,0.4)" }}>·</span>
                  <span>{data.certifications.length} Certs</span>
                </>
              )}
            </motion.div>
          </div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 60, damping: 16 }}
            className="flex justify-end"
          >
            <div className="relative p-3 sm:p-5">

              {/* Spinning ring */}
              <div
                className="absolute -inset-[3px] sm:-inset-[6px] rounded-2xl z-0"
                style={{
                  background: "conic-gradient(from 0deg, #7c6aff, #00ffcc, #ff6b6b, #7c6aff)",
                  animation: "ring-spin 6s linear infinite",
                  filter: "blur(3px)",
                  opacity: 0.7,
                }}
              />
              {/* Gap fill */}
              <div
                className="absolute -inset-[2px] sm:-inset-[4px] rounded-2xl z-0"
                style={{ background: "#04040a" }}
              />

              {/* Photo */}
              <div
                className="relative z-10 overflow-hidden group will-change-transform"
                style={{
                  width: "clamp(160px, 28vw, 420px)",
                  aspectRatio: "3 / 4",
                  clipPath: "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
                  transition: "clip-path 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  boxShadow: "0 0 50px rgba(124,106,255,0.14), 0 20px 55px rgba(0,0,0,0.75)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.clipPath =
                    "polygon(0% 0%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%, 0% 0%)";
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.clipPath =
                    "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)";
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                }}
              >
                <img
                  src={mainPhoto || "https://picsum.photos/seed/profile/400/500"}
                  alt={`${data.first_name} ${data.last_name}`}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                {/* Violet tint overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 40% 30%, rgba(124,106,255,0.3), transparent 60%)",
                    mixBlendMode: "color",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
              </div>

              {/* Corner brackets */}
              <div className="hidden sm:block absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-primary/60 z-20" />
              <div className="hidden sm:block absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-primary/60 z-20" />
              <div className="hidden sm:block absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-primary/60 z-20" />
              <div className="hidden sm:block absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-primary/60 z-20" />

              {/* Floating badges */}
              {/* Bottom-left: relocation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="absolute -bottom-4 -left-4 hidden sm:block z-20"
                style={{ animation: "float 3s ease-in-out infinite" }}
              >
                <div
                  className="liquid-card rounded-lg px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest relative z-[1]"
                  style={{ color: "#00ffcc" }}
                >
                  OPEN TO RELOCATION
                </div>
              </motion.div>

              {/* Top-right: experience */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85, type: "spring" }}
                className="absolute -top-4 -right-4 hidden sm:block z-20"
                style={{ animation: "float-b 3.5s ease-in-out infinite 0.5s" }}
              >
                <div
                  className="liquid-card rounded-lg px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest relative z-[1]"
                  style={{ color: "#a89aff" }}
                >
                  {data.experience_units.length}+ YRS EXP
                </div>
              </motion.div>

              {/* ONLINE badge */}
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.1, type: "spring" }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[10px] text-emerald-400 whitespace-nowrap z-20"
                style={{
                  background: "rgba(4,4,10,0.92)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  boxShadow: "0 4px 20px rgba(74,222,128,0.12)",
                }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                ONLINE NOW
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none"
      >
        {/* SVG scroll mouse icon */}
        <motion.svg
          width="20"
          height="30"
          viewBox="0 0 20 30"
          fill="none"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" />
          <motion.rect
            x="9" y="7"
            width="2" height="6"
            rx="1"
            fill="currentColor"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>
        <span className="font-mono text-[9px] tracking-widest uppercase">
          SCROLL TO EXPLORE
        </span>
      </motion.div>
    </section>
  );
}
