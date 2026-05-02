export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Primary orb — top left, lavender */}
      <div
        className="absolute rounded-full"
        style={{
          width: "60vw",
          height: "60vw",
          top: "-20vw",
          left: "-15vw",
          background:
            "radial-gradient(circle, rgba(180,190,254,0.07) 0%, transparent 70%)",
          animation: "orb1 18s ease-in-out infinite",
        }}
      />
      {/* Secondary orb — bottom right, peach */}
      <div
        className="absolute rounded-full"
        style={{
          width: "50vw",
          height: "50vw",
          bottom: "-15vw",
          right: "-10vw",
          background:
            "radial-gradient(circle, rgba(250,179,135,0.06) 0%, transparent 70%)",
          animation: "orb2 22s ease-in-out infinite",
        }}
      />
      {/* Tertiary orb — mid left, mauve */}
      <div
        className="absolute rounded-full"
        style={{
          width: "35vw",
          height: "35vw",
          top: "40%",
          left: "5%",
          background:
            "radial-gradient(circle, rgba(203,166,247,0.045) 0%, transparent 70%)",
          animation: "orb3 26s ease-in-out infinite",
        }}
      />
      {/* Quaternary orb — top right, blue */}
      <div
        className="absolute rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          top: "10%",
          right: "5%",
          background:
            "radial-gradient(circle, rgba(137,180,250,0.04) 0%, transparent 70%)",
          animation: "orb4 30s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes orb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(4vw, 6vw) scale(1.08); }
          66%       { transform: translate(-3vw, 3vw) scale(0.94); }
        }
        @keyframes orb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(-5vw, -4vw) scale(1.1); }
          70%       { transform: translate(3vw, -6vw) scale(0.92); }
        }
        @keyframes orb3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(6vw, -5vw) scale(1.12); }
        }
        @keyframes orb4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30%       { transform: translate(-4vw, 5vw) scale(0.9); }
          65%       { transform: translate(2vw, 8vw) scale(1.06); }
        }
      `}</style>
    </div>
  );
}
