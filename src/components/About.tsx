import { motion } from "motion/react";
import { CVData } from "../types";

interface AboutProps {
  data: CVData;
}

export default function About({ data }: AboutProps) {
  if (!data.about) return null;

  return (
    <section id="about" className="py-12 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">About</h2>
        <div className="border-l-2 border-primary/30 pl-6">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
            {data.about}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
