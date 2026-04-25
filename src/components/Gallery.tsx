import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CVData } from "../types";
import { Terminal, Image as ImageIcon, Search, ChevronRight, X, Maximize2 } from "lucide-react";
import Typewriter from "./Typewriter";

interface GalleryProps {
  data: CVData;
}

export default function Gallery({ data }: GalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
        <div className="flex items-center gap-2 mb-4 font-mono text-sm">
          <span className="text-primary">root@portfolio:</span>
          <span className="text-accent">~</span>
          <span className="text-foreground">$ <Typewriter text="view ./gallery/*.jpg" speed={50} /></span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-glow"
        >
          Photo Stream
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedPhoto(photo.image)}
            className="terminal-window bg-secondary/20 border-primary/10 overflow-hidden group hover:border-primary/30 transition-all aspect-square relative cursor-pointer"
          >
            <img
              src={photo.image}
              alt="Gallery"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <div className="p-2 rounded-xl bg-secondary border border-primary/20 transform scale-90 group-hover:scale-100 transition-transform">
                <Maximize2 className="w-5 h-5 text-primary" />
              </div>
            </div>
            {photo.is_main && (
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-primary text-secondary font-mono text-[8px] uppercase tracking-widest rounded-none">
                Main_Asset
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-background/95 backdrop-blur-xl"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-6xl w-full max-h-full terminal-window overflow-hidden bg-secondary/40 border-primary/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header - Matching Projects */}
              <div className="bg-secondary/80 border-b border-primary/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/60" />
                  </div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Image_Inspector
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative overflow-hidden bg-black/20 flex items-center justify-center">
                <img
                  src={selectedPhoto}
                  alt="Fullscreen"
                  className="w-full h-full object-contain max-h-[75vh]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 bg-secondary/80 border-t border-primary/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-4">
                  <span className="text-primary">FILE: {selectedPhoto.split('/').pop()}</span>
                  <span className="hidden sm:inline">TYPE: IMAGE/JPEG</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline">ZOOM: 100%</span>
                  <span className="text-accent">STATUS: RENDERED</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Status Line */}
      <div className="mt-8 pt-4 border-t border-primary/5 flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <ImageIcon className="w-3 h-3" />
            {data.photos.length} Assets Loaded
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Buffer Ready
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>1920x1080</span>
          <span>SRGB</span>
        </div>
      </div>
    </div>
  </section>
  );
}
