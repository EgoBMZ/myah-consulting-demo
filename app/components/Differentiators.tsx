"use client";

import { motion } from "framer-motion";
import { Check, Target, User, Laptop, Briefcase } from "lucide-react";

export function Differentiators() {
  const diffs = [
    {
      title: "La norma es el medio, no el fin",
      desc: "Implementamos sistemas de gestión que realmente apoyan la operación, no documentos que terminan archivados.",
      icon: Target
    },
    {
      title: "Un solo interlocutor",
      desc: "Integramos calidad, procesos y cumplimiento para que tengas una visión clara y un acompañamiento integral.",
      icon: User
    },
    {
      title: "Tecnología que sí aporta",
      desc: "Utilizamos herramientas digitales e IA cuando ayudan a simplificar, analizar o mejorar la gestión.",
      icon: Laptop
    },
    {
      title: "Gestión que abre oportunidades",
      desc: "Fortalecemos tu empresa para responder mejor a clientes, auditorías, contratos y nuevas oportunidades.",
      icon: Briefcase
    }
  ];

  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-wider text-accent uppercase mb-3">¿Por qué MYAH?</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              No somos otra consultora teórica. Somos tu brazo ejecutor.
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Convertimos requisitos, normas y oportunidades de mejora en acciones concretas que ayudan a tu empresa a ordenarse, cumplir y estar preparada para crecer.
            </p>

            <ul className="space-y-4">
              {[
                "100% de éxito en auditorías de certificación",
                "Acompañamiento post-certificación disponible",
                "Diagnóstico transparente sin costos ocultos"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <div className="bg-primary/20 p-1 rounded-full text-primary">
                    <Check size={16} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {diffs.map((diff, index) => {
              const Icon = diff.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-accent mb-4 border border-border">
                    <Icon size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{diff.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{diff.desc}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
