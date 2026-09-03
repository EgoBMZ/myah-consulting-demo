"use client";

import { motion } from "framer-motion";

export function ProblemSection() {
  return (
    <section className="py-24 bg-muted/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-8">
            No necesitas otra carpeta llena de procedimientos que nadie lee.
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Necesitas saber, con claridad, si tu empresa está realmente preparada para crecer, para una auditoría, o para competir por el próximo contrato grande.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
