import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!(t.closest("a") || t.closest("button") || t.getAttribute("role") === "button"));
    };
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [visible]);

  return (
    <>
      {/* Outer ring — laggy, expands on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block rounded-full border border-primary/45"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          width: hovering ? 48 : 40,
          height: hovering ? 48 : 40,
          opacity: visible ? (hovering ? 0.8 : 0.5) : 0,
          scale: clicking ? 0.75 : 1,
        }}
        transition={{
          x: { type: "spring", stiffness: 120, damping: 18, mass: 0.4 },
          y: { type: "spring", stiffness: 120, damping: 18, mass: 0.4 },
          width: { duration: 0.2 },
          height: { duration: 0.2 },
          opacity: { duration: 0.2 },
          scale: { duration: 0.1 },
        }}
        style={{
          boxShadow: hovering ? "0 0 12px rgba(180,190,254,0.3)" : "none",
        }}
      />
      {/* Inner dot — snappy */}
      <motion.div
        className="fixed top-0 left-0 w-[5px] h-[5px] pointer-events-none z-[9999] hidden md:block rounded-full bg-primary"
        animate={{
          x: pos.x - 2.5,
          y: pos.y - 2.5,
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.5 : hovering ? 0 : 1,
        }}
        transition={{
          x: { type: "spring", stiffness: 800, damping: 30, mass: 0.1 },
          y: { type: "spring", stiffness: 800, damping: 30, mass: 0.1 },
          opacity: { duration: 0.15 },
          scale: { duration: 0.12 },
        }}
      />
    </>
  );
}
