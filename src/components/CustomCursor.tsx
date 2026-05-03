import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

type CursorMode = "default" | "pointer" | "text" | "drag";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 18, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 18, mass: 0.8 });

  const [mode, setMode] = useState<CursorMode>("default");
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const modeRef = useRef<CursorMode>("default");
  modeRef.current = mode;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const t = e.target as HTMLElement;
      const isPointer = !!(
        t.closest("a") ||
        t.closest("button") ||
        t.getAttribute("role") === "button" ||
        t.closest("[data-cursor='pointer']")
      );
      const isText = !!(
        t.closest("h1") ||
        t.closest("h2") ||
        t.closest("[data-cursor='text']")
      );
      const isDrag = !!t.closest("[data-cursor='drag']");

      if (isDrag) setMode("drag");
      else if (isText) setMode("text");
      else if (isPointer) setMode("pointer");
      else setMode("default");
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, visible]);

  const ringWidth = mode === "text" ? 80 : mode === "pointer" ? 60 : 40;
  const ringHeight = mode === "text" ? 20 : mode === "pointer" ? 60 : 40;
  const ringBg = mode === "pointer" ? "rgba(124,106,255,0.08)" : "transparent";
  const ringBorder =
    mode === "drag"
      ? "1px dashed rgba(124,106,255,0.7)"
      : mode === "pointer"
      ? "1px solid rgba(124,106,255,0.85)"
      : "1px solid rgba(124,106,255,0.5)";

  return (
    <>
      {/* Outer ring — spring lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: ringWidth,
          height: ringHeight,
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.8 : 1,
          background: ringBg,
          border: ringBorder,
          borderRadius: mode === "text" ? "4px" : "50%",
        }}
        transition={{
          width: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
          height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
          borderRadius: { duration: 0.2 },
          opacity: { duration: 0.2 },
          scale: { duration: 0.1 },
          background: { duration: 0.2 },
          border: { duration: 0.2 },
        }}
      >
        {mode === "text" && (
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "11px",
              color: "rgba(124,106,255,0.9)",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            T
          </span>
        )}
        {mode === "drag" && (
          <span style={{ fontSize: "10px", color: "rgba(124,106,255,0.8)" }}>⇔</span>
        )}
      </motion.div>

      {/* Inner dot — immediate follow, mix-blend-mode difference */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          background: "#7c6aff",
          mixBlendMode: "difference",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.7 : mode !== "default" ? 0 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { duration: 0.12 },
        }}
      />
    </>
  );
}
