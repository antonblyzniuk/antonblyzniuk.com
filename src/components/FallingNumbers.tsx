import { useEffect, useRef } from "react";

export default function FallingNumbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const chars = "01アカサタナハマ0123456789ABCDEF$><{}[]#@";
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);

    const drops = Array.from({ length: cols }, () => ({
      y: Math.random() * -(canvas.height / fontSize),
      speed: 0.15 + Math.random() * 0.55,
      bright: Math.random() > 0.80,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(30, 30, 46, 0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const y = drop.y * fontSize;
        const x = i * fontSize;
        const char = chars[Math.floor(Math.random() * chars.length)];

        if (drop.bright) {
          // Bright catppuccin-green head with glow
          ctx.shadowColor = "rgba(166, 227, 161, 0.55)";
          ctx.shadowBlur = 8;
          ctx.fillStyle = "rgba(166, 227, 161, 0.9)";
          ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
          ctx.fillText(char, x, y);
          ctx.shadowBlur = 0;
          // Fading trail char just ahead
          ctx.fillStyle = "rgba(166, 227, 161, 0.22)";
          ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y + fontSize);
        } else {
          ctx.fillStyle = "rgba(180, 190, 254, 0.032)";
          ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
          ctx.fillText(char, x, y);
        }

        if (y > canvas.height && Math.random() > 0.974) {
          drops[i].y = 0;
          drops[i].bright = Math.random() > 0.80;
          drops[i].speed = 0.15 + Math.random() * 0.55;
        }
        drops[i].y += drops[i].speed;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-20"
      style={{ opacity: 0.55, filter: "blur(0.3px)" }}
    />
  );
}
