import { motion } from "motion/react";
import { CVData } from "../types";
import { Code2, Globe2, Cpu } from "lucide-react";
import Typewriter from "./Typewriter";

interface AboutProps {
  data: CVData;
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 font-mono text-sm">
            <span className="text-primary">root@portfolio:</span>
            <span className="text-accent">~</span>
            <span className="text-foreground">$ <Typewriter text="cat profile_summary" speed={50} /></span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-glow"
          >
            System Overview
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="terminal-window bg-secondary/20 p-8 border-primary/10">
              <div className="text-lg text-muted-foreground leading-relaxed font-mono">
                <span className="text-primary mr-2">#</span>
                {data.about}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="terminal-window bg-secondary/40 p-6 border-primary/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-primary">/</span>
                System Status
              </h3>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center py-2 border-b border-primary/5">
                  <span className="text-muted-foreground">USER</span>
                  <span className="text-primary">{data.frist_name.toLowerCase()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary/5">
                  <span className="text-muted-foreground">UPTIME</span>
                  <span className="text-primary">99.9%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">STATUS</span>
                  <span className="text-emerald-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
