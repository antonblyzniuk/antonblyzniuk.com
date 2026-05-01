import { motion } from "motion/react";
import { CVData } from "../types";
import { Badge } from "./ui/badge";
import Typewriter from "./Typewriter";

interface SkillsProps {
  data: CVData;
}

export default function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs sm:text-sm overflow-hidden">
            <span className="text-primary shrink-0">root@portfolio:</span>
            <span className="text-accent shrink-0">~</span>
            <span className="text-foreground truncate">$ <Typewriter text="ls --expertise" speed={50} /></span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-glow"
          >
            Tech Stack
          </motion.h2>
        </div>

        <div className="terminal-window bg-secondary/20 p-4 sm:p-8 border-primary/10">
          <div className="flex flex-wrap gap-4 justify-center">
            {data.skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 260,
                  damping: 20 
                }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group"
              >
                <Badge
                  variant="secondary"
                  className="bg-secondary/80 hover:bg-primary/20 text-muted-foreground hover:text-primary border border-primary/10 hover:border-primary/40 transition-all font-mono text-sm py-2 px-4 shadow-[0_0_10px_rgba(158,206,106,0.05)] hover:shadow-[0_0_20px_rgba(158,206,106,0.2)] whitespace-normal"
                >
                  <span className="text-accent mr-2">#</span>
                  <Typewriter text={skill.name} speed={50} delay={1000 + i * 100} />
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-8 font-mono text-sm">
            <span className="text-primary">root@portfolio:</span>
            <span className="text-accent">~</span>
            <span className="text-foreground">$ locale -a</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.languages.map((lang, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="terminal-window bg-secondary/40 p-4 border-primary/5 flex items-center justify-between group overflow-hidden"
              >
                <div className="font-mono">
                  <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    <Typewriter text={lang.name} speed={50} delay={1500 + i * 200} />
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                    {lang.level}
                  </div>
                </div>
                <motion.div 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-primary" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
