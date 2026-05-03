import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useMotionValue, useDragControls, animate } from "motion/react";

interface WindowFrameProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function WindowFrame({ title, children, className }: WindowFrameProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dragControls = useDragControls();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dragging, setDragging] = useState(false);
  const [countdown, setCountdown] = useState(false);

  const scheduleReturn = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCountdown(true);
    timerRef.current = setTimeout(() => {
      setCountdown(false);
      animate(x, 0, { type: "spring", stiffness: 60, damping: 13 });
      animate(y, 0, { type: "spring", stiffness: 60, damping: 13 });
    }, 3000);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      style={{
        x,
        y,
        zIndex: dragging ? 999 : 1,
        position: "relative",
      }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => { setDragging(false); scheduleReturn(); }}
      className={className}
    >
      {/* Window chrome */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="flex items-center justify-between px-4 py-2.5 rounded-t-2xl cursor-grab active:cursor-grabbing select-none"
        style={{
          background: "rgba(8,8,20,0.92)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(124,106,255,0.14)",
          borderLeft: "1px solid rgba(124,106,255,0.14)",
          borderRight: "1px solid rgba(124,106,255,0.14)",
          borderBottom: "1px solid rgba(124,106,255,0.06)",
          boxShadow: dragging ? "0 -4px 30px rgba(124,106,255,0.08)" : "none",
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,95,87,0.75)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,188,46,0.75)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "rgba(40,201,64,0.75)" }} />
        </div>

        {/* Title + return indicator */}
        <div className="flex items-center gap-2">
          {countdown && (
            <span
              className="font-mono text-[9px] tracking-widest"
              style={{ color: "rgba(124,106,255,0.5)" }}
            >
              returning…
            </span>
          )}
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(168,154,255,0.6)" }}>
            {title}
          </span>
        </div>

        {/* Grip */}
        <div className="flex gap-[3px] opacity-25">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="w-[3px] h-[3px] rounded-full bg-primary" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          borderLeft: "1px solid rgba(124,106,255,0.1)",
          borderRight: "1px solid rgba(124,106,255,0.1)",
          borderBottom: "1px solid rgba(124,106,255,0.1)",
          borderRadius: "0 0 1rem 1rem",
          boxShadow: dragging
            ? "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,106,255,0.2), 0 0 60px rgba(124,106,255,0.08)"
            : "none",
          transition: "box-shadow 0.2s ease",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
