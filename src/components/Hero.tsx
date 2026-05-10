import { motion } from "motion/react";
import { CVData } from "../types";
import { Github, Linkedin, Mail, Globe, MapPin, Phone, FileText, Instagram, Send } from "lucide-react";

interface HeroProps {
  data: CVData;
}

function getLinkIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("github")) return <Github className="w-4 h-4" />;
  if (n.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
  if (n.includes("instagram")) return <Instagram className="w-4 h-4" />;
  if (n.includes("telegram")) return <Send className="w-4 h-4" />;
  if (n.includes("mail") || n.includes("email")) return <Mail className="w-4 h-4" />;
  return <Globe className="w-4 h-4" />;
}

function getFirstSentence(text: string, maxLen = 140): string {
  const dot = text.search(/[.!?]\s/);
  const cut = dot > 0 && dot < maxLen ? dot + 1 : maxLen;
  return text.slice(0, cut).trim();
}

function calcYears(fromDate: string): number {
  const start = new Date(fromDate);
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
}

export default function Hero({ data }: HeroProps) {
  const mainPhoto = data.photos.find((p) => p.is_main);

  const tagline = data.about ? getFirstSentence(data.about) : null;

  const firstExp = [...data.experience_units].sort((a, b) => a.order - b.order)[0];
  const yearsExp = firstExp ? calcYears(firstExp.from_date) : null;

  const stats = [
    yearsExp ? { value: `${yearsExp}+`, label: "Years experience" } : null,
    data.portfolio_items.length > 0 ? { value: `${data.portfolio_items.length}`, label: "Projects built" } : null,
    data.skills.length > 0 ? { value: `${data.skills.length}+`, label: "Technologies" } : null,
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <section className="min-h-screen flex items-center pt-16 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left: content */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Name + headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight">
                {data.first_name}{" "}
                <span className="gradient-text">{data.last_name}</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                {data.headline}
              </p>
              {tagline && (
                <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-md">
                  {tagline}
                </p>
              )}
            </motion.div>

            {/* Stats row */}
            {stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-6 py-4 border-y border-border"
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
            >
              {data.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary/60" />
                  {data.location}
                </span>
              )}
              <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Mail className="w-3.5 h-3.5 text-primary/60" />
                {data.email}
              </a>
              {data.phone && (
                <a href={`tel:${data.phone}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Phone className="w-3.5 h-3.5 text-primary/60" />
                  {data.phone}
                </a>
              )}
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {data.links.filter((l) => !l.url.includes("mail.google.com")).map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all text-sm font-medium"
                >
                  {getLinkIcon(link.name)}
                  {link.name}
                </a>
              ))}
              {data.pdf_resume && (
                <a
                  href={data.pdf_resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  <FileText className="w-4 h-4" />
                  Download CV
                </a>
              )}
            </motion.div>
          </div>

          {/* Right: main photo */}
          {mainPhoto && (
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow behind photo */}
                <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl -z-10" />
                {/* Decorative corner accent */}
                <div className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl" />
                <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-primary/40 rounded-bl-2xl" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 110, damping: 18 }}
                  className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl"
                >
                  <img src={mainPhoto.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />


                </motion.div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
