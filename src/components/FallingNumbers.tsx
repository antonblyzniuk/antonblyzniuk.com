import { useEffect, useRef } from "react";

const CHARS = "01ABCDEFabcdef∑∆πΩλ∞";

interface Column {
  x: number;
  y: number;
  speed: number;
  trail: number[];
  colorBase: "violet" | "mint";
}

export default function FallingNumbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FONT_SIZE = 13;
    const TRAIL_LENGTH = 20;
    const OPACITY_BASE = 0.07;

    let cols: Column[] = [];
    let rafId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCols();
    }

    function initCols() {
      if (!canvas) return;
      const numCols = Math.floor(canvas.width / FONT_SIZE);
      cols = Array.from({ length: numCols }, (_, i) => ({
        x: i * FONT_SIZE,
        y: Math.random() * -canvas!.height,
        speed: 0.8 + Math.random() * 1.7,
        trail: [],
        colorBase: Math.random() < 0.5 ? "violet" : "mint",
      }));
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const col of cols) {
        const trailLen = Math.floor(col.y / FONT_SIZE);
        const startRow = Math.max(0, trailLen - TRAIL_LENGTH);

        for (let t = startRow; t <= trailLen; t++) {
          const isLead = t === trailLen;
          const fadeRatio = (t - startRow) / TRAIL_LENGTH;
          const alpha = isLead ? OPACITY_BASE * 8 : OPACITY_BASE * fadeRatio;

          if (alpha < 0.003) continue;

          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          const py = t * FONT_SIZE;

          if (isLead) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(alpha, 0.55)})`;
            ctx.shadowColor = col.colorBase === "violet" ? "#7c6aff" : "#00ffcc";
            ctx.shadowBlur = 6;
          } else {
            const r = col.colorBase === "violet" ? [124, 106, 255] : [0, 255, 204];
            ctx.fillStyle = `rgba(${r[0]}, ${r[1]}, ${r[2]}, ${alpha})`;
            ctx.shadowBlur = 0;
          }

          ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
          ctx.fillText(char, col.x, py);
        }

        col.y += col.speed;
        if (col.y > canvas.height + TRAIL_LENGTH * FONT_SIZE) {
          col.y = Math.random() * -FONT_SIZE * TRAIL_LENGTH;
        }
      }

      ctx.shadowBlur = 0;
    }

    function loop() {
      draw();
      rafId = requestAnimationFrame(loop);
    }

    resize();
    loop();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 1 }}
    />
  );
}
