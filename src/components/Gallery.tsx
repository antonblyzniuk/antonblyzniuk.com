import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CVData } from "../types";
import { Image as ImageIcon, X } from "lucide-react";

function MarqueeRow({
  photos,
  reverse,
  className,
}: {
  photos: { image: string; is_main: boolean }[];
  reverse?: boolean;
  className?: string;
}) {
  const doubled = [...photos, ...photos, ...photos, ...photos];
  return (
    <div
      className={`marquee-row overflow-hidden ${className ?? ""}`}
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={reverse ? "marquee-track-reverse" : "marquee-track"}
        style={{ gap: "12px" }}
      >
        {doubled.map((photo, i) => (
          <div
            key={i}
            className="flex-none group relative cursor-pointer"
            style={{
              width: "200px",
              height: "150px",
              borderRadius: "12px",
              overflow: "hidden",
              flexShrink: 0,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "scale(1.2)";
              el.style.zIndex = "10";
              el.style.position = "relative";
              el.style.boxShadow = "0 0 30px rgba(124,106,255,0.3), 0 0 80px rgba(124,106,255,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "scale(1)";
              el.style.zIndex = "0";
              el.style.boxShadow = "none";
            }}
          >
            <img
              src={photo.image}
              alt="Gallery"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery({ data }: { data: CVData }) {
  const [selected, setSelected] = useState<string | null>(null);
  if (data.photos.length === 0) return null;

  const row1 = data.photos.filter((_, i) => i % 2 === 0);
  const row2 = data.photos.filter((_, i) => i % 2 !== 0);

  return (
    <section id="gallery" className="py-24 scroll-mt-24 relative overflow-x-hidden">
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
            <span>visual log</span>
            <div className="h-px w-6 bg-primary/20" />
          </div>
          <h2
            className="font-display font-black leading-[0.86]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            <span className="block text-foreground">VISUAL</span>
            <span className="block gradient-text">LOG</span>
          </h2>
        </motion.div>
      </div>

      {/* Infinite marquee — bleeds edge to edge */}
      <div className="space-y-4 overflow-hidden" onClick={(e) => {
        // Find clicked image
        const img = (e.target as HTMLElement).closest("div[style*='border-radius']");
        if (img) {
          const imgEl = img.querySelector("img");
          if (imgEl) setSelected(imgEl.src);
        }
      }}>
        {/* Row 1 scrolls left */}
        <MarqueeRow photos={row1.length > 0 ? row1 : data.photos} />
        {/* Row 2 scrolls right — hidden on mobile */}
        {row2.length > 0 && (
          <div className="hidden sm:block">
            <MarqueeRow photos={row2} reverse />
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Status */}
        <div
          className="mt-8 pt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest"
          style={{ borderTop: "1px solid rgba(124,106,255,0.07)", color: "rgba(74,74,106,0.5)" }}
        >
          <span className="flex items-center gap-2">
            <ImageIcon className="w-3 h-3" />
            {data.photos.length} assets loaded
          </span>
          <span className="flex items-center gap-1.5" style={{ color: "rgba(74,222,128,0.6)" }}>
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            buffer ready
          </span>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(4,4,10,0.94)", backdropFilter: "blur(24px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative max-w-6xl w-full liquid-card rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.88)" }}
              onClick={(e) => e.stopPropagation()}
            >
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
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Image Inspector
                  </span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2.5 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative flex items-center justify-center max-h-[75vh]" style={{ background: "rgba(0,0,0,0.2)" }}>
                <img
                  src={selected}
                  alt="Fullscreen"
                  className="w-full max-h-[75vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div
                className="px-5 py-2.5 flex items-center justify-between font-mono text-[10px] relative z-[1]"
                style={{ borderTop: "1px solid rgba(124,106,255,0.08)", color: "rgba(74,74,106,0.5)" }}
              >
                <span className="truncate max-w-[50vw]" style={{ color: "rgba(124,106,255,0.45)" }}>
                  FILE: {selected.split("/").pop()}
                </span>
                <span className="font-bold tracking-widest text-shimmer">READY_</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
