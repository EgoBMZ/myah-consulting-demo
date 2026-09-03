"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 bg-accent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900/10 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
            ¿Listo para dejar de apagar incendios?
          </h2>
          <p className="text-xl text-slate-900/80 mb-10 max-w-2xl mx-auto">
            Descubre qué necesita tu empresa hoy y traza una ruta clara hacia el orden, la certificación y los grandes negocios.
          </p>
          <a
            href="#diagnostico"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1 gap-2 text-lg"
          >
            Hacer mi diagnóstico gratis <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
