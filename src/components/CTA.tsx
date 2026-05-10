import { motion } from "motion/react";
import { CVData } from "../types";
import { ArrowRight, Mail } from "lucide-react";

interface CTAProps {
  data: CVData;
}

export default function CTA({ data }: CTAProps) {
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative card overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative px-8 py-14 md:px-16 md:py-20 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Let's work together
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Open to backend development roles and freelance projects.
            Response within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              <Mail className="w-4 h-4" />
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </a>
            {data.pdf_resume && (
              <a
                href={data.pdf_resume}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all font-medium"
              >
                Download CV
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
