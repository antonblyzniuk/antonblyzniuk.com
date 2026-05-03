import { motion } from "motion/react";
import { CVData } from "../types";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

type ExpUnit = CVData["experience_units"][number];
type EduUnit = CVData["education_units"][number];

function TimelineCard({
  item,
  index,
  side,
  type,
}: {
  item: ExpUnit | EduUnit;
  index: number;
  side: "left" | "right";
  type: "exp" | "edu";
}) {
  const isExp = type === "exp";
  const isExpItem = "organization" in item;
  const org = isExpItem ? (item as ExpUnit).organization : undefined;
  const degree = !isExpItem ? (item as EduUnit).degree : undefined;
  const field = !isExpItem ? (item as EduUnit).field_of_study : undefined;
  const accentColor = isExp ? "#7c6aff" : "#00ffcc";
  const accentColorDim = isExp ? "rgba(124,106,255,0.3)" : "rgba(0,255,204,0.3)";

  return (
    <div
      className={`relative flex items-start gap-0 ${
        side === "right" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: side === "left" ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-[calc(50%-28px)] group"
      >
        <div
          className="liquid-card rounded-2xl p-5 relative z-[1] group-hover:border-opacity-30 transition-all duration-300"
          style={{
            borderColor: `${accentColor}15`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = `${accentColor}30`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = `${accentColor}15`;
          }}
        >
          {/* Date above card */}
          <div
            className="font-mono text-[10px] uppercase tracking-widest mb-2 relative z-[1]"
            style={{ color: accentColorDim }}
          >
            {item.from_date} — {item.to_date}
          </div>

          {/* Company */}
          {(org || degree || field) && (
            <div
              className="font-display font-bold text-base mb-1 gradient-text relative z-[1]"
            >
              {org ?? [degree, field].filter(Boolean).join(" · ")}
            </div>
          )}

          {/* Role */}
          <h4 className="font-display font-bold text-xl leading-snug text-foreground mb-2 relative z-[1]">
            {item.name}
          </h4>

          {/* Location */}
          {item.location && (
            <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground mb-3 relative z-[1]">
              <MapPin className="w-3 h-3" />
              {item.location}
            </div>
          )}

          {/* Description */}
          {item.description && (
            <div className="space-y-1 relative z-[1]">
              {item.description.split(". ").filter(Boolean).slice(0, 3).map((sentence, i) => (
                <p key={i} className="flex items-start gap-2 font-mono text-xs text-muted-foreground leading-relaxed">
                  <span style={{ color: accentColor }} className="mt-0.5 shrink-0">▸</span>
                  {sentence.replace(/\.$/, "")}.
                </p>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Center dot on the line */}
      <div className="w-14 flex-none flex items-center justify-center pt-6 relative">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-3 h-3 rounded-full relative z-10 group-hover:scale-125"
          style={{
            background: "#04040a",
            border: `2px solid ${accentColor}`,
          }}
        />
      </div>

      {/* Empty side */}
      <div className="w-[calc(50%-28px)]" />
    </div>
  );
}

export default function Experience({ data }: { data: CVData }) {
  const all = [
    ...data.experience_units.map((e, i) => ({ item: e, type: "exp" as const, globalIdx: i })),
    ...data.education_units.map((e, i) => ({ item: e, type: "edu" as const, globalIdx: data.experience_units.length + i })),
  ].sort((a, b) => {
    const ya = parseInt(a.item.to_date) || 0;
    const yb = parseInt(b.item.to_date) || 0;
    return yb - ya;
  });

  return (
    <section id="experience" className="py-24 scroll-mt-24 relative overflow-x-hidden">
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
            <span>03 · timeline</span>
            <div className="h-px w-6 bg-primary/20" />
          </div>
          <h2
            className="font-display font-black leading-[0.86]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            <span className="block text-foreground">CAREER</span>
            <span className="block gradient-text">TIMELINE</span>
          </h2>
        </motion.div>

        {/* Desktop: alternating timeline */}
        <div className="hidden lg:block relative">
          {/* Center vertical line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{
              background: "linear-gradient(to bottom, #7c6aff, #00ffcc 50%, #7c6aff)",
              opacity: 0.35,
            }}
          />

          <div className="space-y-8">
            {all.map(({ item, type, globalIdx }, i) => (
              <TimelineCard
                key={`${type}-${globalIdx}`}
                item={item}
                index={i}
                side={i % 2 === 0 ? "left" : "right"}
                type={type}
              />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: single column */}
        <div className="lg:hidden grid grid-cols-1 gap-8">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em] mb-6">
              <Briefcase className="w-3.5 h-3.5" style={{ color: "#7c6aff" }} />
              <span>Experience</span>
              <span className="ml-auto text-xs" style={{ color: "rgba(124,106,255,0.4)" }}>
                {data.experience_units.length} entries
              </span>
            </div>
            <div
              className="relative space-y-5"
              style={{
                paddingLeft: "1.5rem",
                borderLeft: "2px solid rgba(124,106,255,0.2)",
              }}
            >
              {data.experience_units.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="liquid-card rounded-xl p-4 relative z-[1]">
                    <div className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "rgba(124,106,255,0.5)" }}>
                      {exp.from_date} — {exp.to_date}
                    </div>
                    {exp.organization && (
                      <div className="gradient-text font-bold text-sm mb-1 relative z-[1]">{exp.organization}</div>
                    )}
                    <h4 className="font-display font-bold text-base text-foreground mb-2 relative z-[1]">{exp.name}</h4>
                    {exp.location && (
                      <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground mb-2 relative z-[1]">
                        <MapPin className="w-3 h-3" />{exp.location}
                      </div>
                    )}
                    {exp.description && (
                      <p className="font-mono text-xs text-muted-foreground leading-relaxed relative z-[1]">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          {data.education_units.length > 0 && (
            <div>
              <div className="flex items-center gap-2.5 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em] mb-6">
                <GraduationCap className="w-3.5 h-3.5" style={{ color: "#00ffcc" }} />
                <span>Education</span>
                <span className="ml-auto text-xs" style={{ color: "rgba(0,255,204,0.4)" }}>
                  {data.education_units.length} entries
                </span>
              </div>
              <div
                className="relative space-y-5"
                style={{ paddingLeft: "1.5rem", borderLeft: "2px solid rgba(0,255,204,0.2)" }}
              >
                {data.education_units.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="liquid-card rounded-xl p-4 relative z-[1]">
                      <div className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "rgba(0,255,204,0.5)" }}>
                        {edu.from_date} — {edu.to_date}
                      </div>
                      {(edu.degree || edu.field_of_study) && (
                        <div className="gradient-text font-bold text-sm mb-1 relative z-[1]">
                          {[edu.degree, edu.field_of_study].filter(Boolean).join(" · ")}
                        </div>
                      )}
                      <h4 className="font-display font-bold text-base text-foreground mb-2 relative z-[1]">{edu.name}</h4>
                      {edu.description && (
                        <p className="font-mono text-xs text-muted-foreground leading-relaxed relative z-[1]">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
