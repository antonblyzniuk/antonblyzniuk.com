import { useMotionValue, useSpring, motion } from "motion/react";
import { CVData } from "../types";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";

type ExpUnit = CVData["experience_units"][number];
type EduUnit = CVData["education_units"][number];

function ExpCard({
  item,
  i,
  colorType,
}: {
  item: ExpUnit | EduUnit;
  i: number;
  colorType: "primary" | "accent";
}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(rawX, { stiffness: 280, damping: 26 });
  const rotateX = useSpring(rawY, { stiffness: 280, damping: 26 });

  const isExp = colorType === "primary";
  const clr = isExp
    ? {
        node: "border-primary/22 group-hover:border-primary/55 group-hover:shadow-[0_0_22px_rgba(180,190,254,0.2)]",
        icon: "text-primary",
        bar: "from-primary/60 via-primary/20 to-transparent",
        card: "border-primary/9 hover:border-primary/28",
        title: "group-hover:text-primary",
        org: "text-accent",
        badge: "border-primary/18 text-primary/55",
      }
    : {
        node: "border-accent/22 group-hover:border-accent/55 group-hover:shadow-[0_0_22px_rgba(250,179,135,0.2)]",
        icon: "text-accent",
        bar: "from-accent/60 via-accent/20 to-transparent",
        card: "border-accent/9 hover:border-accent/28",
        title: "group-hover:text-accent",
        org: "text-primary",
        badge: "border-accent/18 text-accent/55",
      };

  const isExpItem = "organization" in item;
  const name        = item.name;
  const description = item.description;
  const fromDate    = item.from_date;
  const toDate      = item.to_date;
  const location    = item.location;
  const org         = isExpItem ? (item as ExpUnit).organization : undefined;
  const degree      = !isExpItem ? (item as EduUnit).degree : undefined;
  const field       = !isExpItem ? (item as EduUnit).field_of_study : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08, type: "spring", stiffness: 100, damping: 18 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 6);
        rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * -6);
      }}
      onMouseLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      className="relative flex items-start gap-5 group"
    >
      {/* Timeline node */}
      <div className="shrink-0 w-10 h-10 z-10 relative">
        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-md ${isExp ? "bg-primary/10" : "bg-accent/10"}`} />
        <div className={`w-full h-full rounded-xl glass border ${clr.node} flex items-center justify-center transition-all`}>
          {isExpItem
            ? <Briefcase className={`w-4 h-4 ${clr.icon}`} />
            : <GraduationCap className={`w-4 h-4 ${clr.icon}`} />
          }
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 min-w-0">
        <div
          className={`relative bento-card overflow-hidden transition-all duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] ${clr.card}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b ${clr.bar}`} />
          <div className="p-4 pl-5">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
              <h4 className={`text-sm font-bold text-foreground transition-colors leading-snug ${clr.title}`}>
                {name}
              </h4>
              <Badge
                variant="outline"
                className={`font-mono text-[9px] shrink-0 px-2 ${clr.badge}`}
              >
                {fromDate} — {toDate}
              </Badge>
            </div>
            {(org || degree || field || location) && (
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                {(org || degree || field) && (
                  <span className={`text-sm font-mono font-medium ${clr.org}`}>
                    {org ?? [degree, field].filter(Boolean).join(" · ")}
                  </span>
                )}
                {location && (
                  <>
                    <span className="text-muted-foreground/25 text-xs">·</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground/50 font-mono">
                      <MapPin className="w-2.5 h-2.5" />
                      {location}
                    </span>
                  </>
                )}
              </div>
            )}
            {description && (
              <p className="text-xs text-muted-foreground/70 leading-relaxed font-mono">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience({ data }: { data: CVData }) {
  return (
    <section id="experience" className="py-24 scroll-mt-24 relative overflow-x-hidden">
      <div className="section-num absolute top-4 right-0 select-none pointer-events-none">03</div>

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
            <span>03 · experience</span>
            <div className="h-px w-6 bg-primary/20" />
          </div>
          <h2
            className="font-display font-black tracking-tight leading-[0.86]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <span className="block text-foreground">Career</span>
            <span className="block gradient-text">Timeline</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Experience column ── */}
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em] mb-8">
              <Briefcase className="w-3.5 h-3.5 text-primary/55" />
              <span>Experience_Log</span>
              <span className="ml-auto text-primary/38">{data.experience_units.length} entries</span>
            </div>
            <div className="relative space-y-5 before:absolute before:inset-0 before:ml-[19px] before:h-full before:w-px before:bg-gradient-to-b before:from-primary/55 before:via-primary/12 before:to-transparent">
              {data.experience_units.map((exp, i) => (
                <ExpCard key={i} item={exp} i={i} colorType="primary" />
              ))}
            </div>
          </div>

          {/* ── Education column ── */}
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em] mb-8">
              <GraduationCap className="w-3.5 h-3.5 text-accent/55" />
              <span>Education_Log</span>
              <span className="ml-auto text-accent/38">{data.education_units.length} entries</span>
            </div>
            <div className="relative space-y-5 before:absolute before:inset-0 before:ml-[19px] before:h-full before:w-px before:bg-gradient-to-b before:from-accent/55 before:via-accent/12 before:to-transparent">
              {data.education_units.map((edu, i) => (
                <ExpCard key={i} item={edu} i={i} colorType="accent" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
