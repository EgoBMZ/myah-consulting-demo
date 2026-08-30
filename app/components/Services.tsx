"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Leaf, HardHat, Lock, TrendingUp, BookOpen } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function Services() {
  const { t } = useLanguage();

  // We map the icons array by index matching the dictionaries array
  const serviceIcons = [
    { icon: ShieldCheck, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    { icon: Leaf, color: "bg-green-500/10 text-green-600 border-green-500/20" },
    { icon: HardHat, color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    { icon: Lock, color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
    { icon: TrendingUp, color: "bg-accent/10 text-accent border-accent/20" },
    { icon: BookOpen, color: "bg-primary/10 text-primary border-primary/20" }
  ];

  return (
    <section id="servicios" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-wider text-accent uppercase mb-3">{t.services.tag}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t.services.title}</h3>
          <p className="text-foreground/70 text-lg">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service, index) => {
            const Icon = serviceIcons[index].icon;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card/70 backdrop-blur-md rounded-2xl p-8 border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 border bg-muted/50 border-border text-primary dark:text-accent transition-transform group-hover:scale-110">
                  <Icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-card-foreground mb-1">{service.title}</h4>
                <p className="text-sm font-semibold text-accent mb-4">{service.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <a href={`/tienda#${service.id}`} className="text-primary dark:text-accent font-medium flex items-center gap-2 group-hover:text-accent dark:group-hover:text-yellow-300 transition-colors">
                  {t.services.learnMore} <span className="transform transition-transform group-hover:translate-x-1">→</span>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
