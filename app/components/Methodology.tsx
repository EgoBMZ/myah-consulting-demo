"use client";

import { motion } from "framer-motion";
import { Search, ListChecks, ShieldAlert, Trophy } from "lucide-react";

export function Methodology() {
  const steps = [
    {
      id: "01",
      title: "Radiografía",
      desc: "Entendemos cómo opera tu empresa hoy, dónde están los cuellos de botella y qué riesgos legales o normativos estás corriendo sin saberlo.",
      icon: Search,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      id: "02",
      title: "Orden",
      desc: "Documentamos procesos, definimos roles y estandarizamos la operación para que tu negocio funcione como un reloj, no dependiendo de apagar incendios.",
      icon: ListChecks,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      id: "03",
      title: "Preparación",
      desc: "Implementamos los requisitos de las normas ISO aplicables y realizamos auditorías internas rigurosas para asegurar que no haya sorpresas.",
      icon: ShieldAlert,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      id: "04",
      title: "Competitividad",
      desc: "Te acompañamos hasta obtener la certificación. Ahora tu empresa está lista para ganar licitaciones y cerrar contratos con grandes clientes.",
      icon: Trophy,
      color: "text-green-500",
      bg: "bg-green-500/10"
    }
  ];

  return (
    <section className="py-24 bg-muted/20 relative border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-wider text-accent uppercase mb-3">Nuestra Metodología</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">La Ruta MYAH</h3>
          <p className="text-foreground/70 text-lg">
            Un proceso paso a paso diseñado para transformar el caos operativo en una ventaja competitiva real y certificable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-border z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 border border-border shadow-sm bg-card group-hover:-translate-y-2 transition-transform duration-300 relative`}>
                  <div className={`absolute inset-0 rounded-2xl ${step.bg} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <Icon size={40} className={`${step.color} relative z-10`} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent text-slate-900 font-bold text-xs flex items-center justify-center shadow-md">
                    {step.id}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{step.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
