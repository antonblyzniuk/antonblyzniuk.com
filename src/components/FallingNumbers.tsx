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
      speed: 0.12 + Math.random() * 0.60,
      bright: Math.random() > 0.75,
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
          ctx.shadowColor = "rgba(166, 227, 161, 0.6)";
          ctx.shadowBlur = 10;
          ctx.fillStyle = "rgba(166, 227, 161, 0.95)";
          ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
          ctx.fillText(char, x, y);
          ctx.shadowBlur = 0;

          // Secondary trail char (immediate below)
          ctx.fillStyle = "rgba(166, 227, 161, 0.35)";
          ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y + fontSize);

          // Third trail char (fading further)
          ctx.fillStyle = "rgba(166, 227, 161, 0.12)";
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y + fontSize * 2);
        } else {
          ctx.fillStyle = "rgba(180, 190, 254, 0.028)";
          ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
          ctx.fillText(char, x, y);
        }

        if (y > canvas.height && Math.random() > 0.972) {
          drops[i].y = 0;
          drops[i].bright = Math.random() > 0.75;
          drops[i].speed = 0.12 + Math.random() * 0.60;
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
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.65, filter: "blur(0.3px)" }}
    />
  );
}
