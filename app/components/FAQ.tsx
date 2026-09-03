"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "¿Cuánto tiempo toma certificar mi empresa?",
    a: "Depende del tamaño y madurez actual de tus procesos, pero típicamente un proyecto de implementación desde cero toma entre 4 y 6 meses. Si ya tienes bases, podemos acelerar el proceso."
  },
  {
    q: "Mi empresa es pequeña, ¿necesito una norma ISO?",
    a: "Las normas ISO no son exclusivas para grandes corporaciones. De hecho, certificar una empresa pequeña es la forma más rápida de nivelar el campo de juego y competir por contratos que antes parecían inalcanzables."
  },
  {
    q: "Tenemos un sistema ISO antiguo que nadie usa, ¿pueden ayudar?",
    a: "Sí. Es lo que llamamos 'sistemas de papel'. Hacemos una reingeniería para actualizarlo, simplificarlo usando herramientas tecnológicas y hacer que realmente funcione para la empresa, no al revés."
  },
  {
    q: "¿Tienen cobertura fuera de Bogotá?",
    a: "Sí. Nuestro equipo está basado en Bogotá, pero contamos con metodologías de consultoría y auditoría virtual que nos permiten atender empresas en toda Colombia y Latinoamérica."
  },
  {
    q: "¿Qué pasa si no pasamos la auditoría de certificación?",
    a: "Nuestra metodología incluye una auditoría interna rigurosa y un simulacro antes de la auditoría final. Esto garantiza que llegues 100% preparado. Tenemos un porcentaje de éxito total con nuestros clientes."
  },
  {
    q: "¿Ustedes me venden el software (KAWAK/ISOLUCION)?",
    a: "No vendemos licencias de software, pero somos administradores expertos de estas plataformas. Si ya tienes una, te enseñamos a exprimirla al máximo. Si no, te asesoramos para elegir la mejor según tu presupuesto."
  }
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-wider text-accent uppercase mb-3">Dudas Comunes</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">
            Preguntas Frecuentes
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl overflow-hidden transition-colors ${open === index ? 'border-accent bg-accent/5' : 'border-border bg-card hover:border-accent/50'}`}
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-foreground focus:outline-none"
              >
                <span className="pr-8 text-lg">{faq.q}</span>
                {open === index ? (
                  <Minus className="text-accent flex-shrink-0" />
                ) : (
                  <Plus className="text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border/50 pt-4 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
