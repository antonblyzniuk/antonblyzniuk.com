import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CVData } from "../types";
import { Image as ImageIcon, X, Maximize2 } from "lucide-react";

export default function Gallery({ data }: { data: CVData }) {
  const [selected, setSelected] = useState<string | null>(null);
  if (data.photos.length === 0) return null;

  return (
    <section id="gallery" className="py-24 scroll-mt-24 relative overflow-x-hidden">
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
            <span>gallery</span>
            <div className="h-px w-6 bg-primary/20" />
          </div>
          <h2
            className="font-display font-black tracking-tight leading-[0.86]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <span className="block text-foreground">Photo</span>
            <span className="block gradient-text">Stream</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 180, damping: 22 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelected(photo.image)}
              className="bento-card hover:border-primary/32 overflow-hidden group aspect-square relative cursor-pointer transition-all duration-300 hover:shadow-[0_20px_56px_rgba(0,0,0,0.6),0_0_36px_rgba(180,190,254,0.09)]"
            >
              <img
                src={photo.image}
                alt="Gallery"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.1]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-background/38 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <div className="p-3 rounded-xl glass border border-primary/30 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_0_24px_rgba(180,190,254,0.22)]">
                  <Maximize2 className="w-5 h-5 text-primary" />
                </div>
              </div>
              {photo.is_main && (
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-primary/90 text-background font-mono text-[8px] uppercase tracking-widest rounded-md">
                  Main
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Status */}
        <div className="mt-8 pt-5 border-t border-primary/7 flex items-center justify-between font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <ImageIcon className="w-3 h-3" />
            {data.photos.length} assets loaded
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-background/94 backdrop-blur-2xl"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative max-w-6xl w-full bento-card overflow-hidden border-primary/22 shadow-[0_40px_120px_rgba(0,0,0,0.88)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-5 py-3 border-b border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/60" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Image_Inspector
                  </span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2.5 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative bg-black/20 flex items-center justify-center max-h-[75vh]">
                <img
                  src={selected}
                  alt="Fullscreen"
                  className="w-full max-h-[75vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-5 py-2.5 border-t border-primary/8 flex items-center justify-between font-mono text-[10px] text-muted-foreground/45">
                <span className="text-primary/45 truncate max-w-[50vw]">
                  FILE: {selected.split("/").pop()}
                </span>
                <span className="text-primary font-bold tracking-widest">READY_</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
