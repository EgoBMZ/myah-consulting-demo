"use client";

import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";

export function Testimonials() {
  // Empty array as requested, to be filled with real testimonials later
  const testimonials: any[] = [];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-sm font-bold tracking-wider text-accent uppercase mb-3">Casos de Éxito</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-16">
          Empresas que ya transformaron su gestión
        </h3>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testi, i) => (
              <div key={i} className="bg-card border border-border p-8 rounded-2xl text-left relative">
                <Quote className="absolute top-6 right-6 text-muted/30" size={40} />
                <p className="text-muted-foreground mb-6 relative z-10">"{testi.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full overflow-hidden">
                    {/* Placeholder image */}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testi.name}</h4>
                    <p className="text-sm text-muted-foreground">{testi.role}, {testi.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-card border border-border border-dashed p-12 rounded-3xl"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
              <Quote size={28} />
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-4">
              Estamos documentando nuevas historias
            </h4>
            <p className="text-muted-foreground mb-8">
              Sé uno de nuestros primeros casos de éxito documentados. Transforma el caos de tu empresa en un sistema competitivo y certificable.
            </p>
            <a href="#contacto" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-slate-900 font-bold hover:bg-accent-hover transition-all shadow-sm gap-2">
              Quiero ser un caso de éxito <ArrowRight size={18} />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
