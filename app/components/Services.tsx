"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, BookOpen, Search, ShieldAlert, Briefcase, TrendingUp, BrainCircuit, Gamepad2, FileText, MonitorPlay, AlertTriangle, CheckCircle2, Trophy, ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

function ServiceCard({ service, index, Icon, iconColorClass }: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card/70 backdrop-blur-md rounded-3xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
    >
      <div 
        className="p-6 md:p-10 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 relative">
          <div className={`w-16 h-16 rounded-2xl flex flex-shrink-0 items-center justify-center border transition-transform group-hover:scale-110 ${iconColorClass}`}>
            <Icon size={32} />
          </div>
          <div className="flex-grow pr-8">
            <h4 className="text-2xl font-bold text-card-foreground leading-tight mb-3">{service.title}</h4>
            <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full uppercase tracking-wider">{service.subtitle}</span>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-muted/50 text-foreground/50 transition-transform duration-300 ${isExpanded ? "rotate-180 bg-accent/20 text-accent" : "group-hover:bg-muted group-hover:text-foreground"}`}>
              <ChevronDown size={24} />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 md:px-10 pb-6 md:pb-10 pt-2 border-t border-border/50">
              <div className="space-y-4 mb-8">
                <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2 text-red-500">
                    <AlertTriangle size={18} />
                    <span className="font-bold text-sm uppercase tracking-wider">El Problema</span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed text-sm">{service.problem}</p>
                </div>

                <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2 text-green-500">
                    <CheckCircle2 size={18} />
                    <span className="font-bold text-sm uppercase tracking-wider">Cómo lo resolvemos</span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed text-sm">{service.solution}</p>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2 text-accent">
                    <Trophy size={18} />
                    <span className="font-bold text-sm uppercase tracking-wider">Lo que gana el cliente</span>
                  </div>
                  <p className="text-foreground/80 font-medium leading-relaxed text-sm">{service.benefit}</p>
                </div>

                {service.table && (
                  <div className="mt-6 border border-border/50 rounded-2xl overflow-hidden bg-card">
                    <div className="bg-muted px-4 py-3 border-b border-border/50">
                      <span className="font-bold text-xs text-foreground uppercase tracking-wider">{service.table.title}</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                          <tr>
                            <th scope="col" className="px-4 py-3 font-semibold w-1/3">{service.table.headers[0]}</th>
                            <th scope="col" className="px-4 py-3 font-semibold">{service.table.headers[1]}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                          {service.table.rows.map((row: any, i: number) => (
                            <tr key={i} className="hover:bg-muted/20 transition-colors">
                              <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{row.norm}</td>
                              <td className="px-4 py-3 text-foreground/80">{row.purpose}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              <a href={`/tienda#${service.id}`} className="inline-flex items-center justify-center w-full py-4 rounded-xl bg-muted hover:bg-accent text-foreground hover:text-slate-900 font-bold transition-all shadow-sm group-hover:shadow-md gap-2">
                {service.cta} <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Services() {
  const { t } = useLanguage();

  const serviceIcons = [
    { icon: ShieldCheck, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    { icon: BookOpen, color: "bg-green-500/10 text-green-600 border-green-500/20" },
    { icon: Search, color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    { icon: ShieldAlert, color: "bg-red-500/10 text-red-600 border-red-500/20" },
    { icon: Briefcase, color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
    { icon: TrendingUp, color: "bg-accent/10 text-accent border-accent/20" },
    { icon: BrainCircuit, color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" },
    { icon: Gamepad2, color: "bg-pink-500/10 text-pink-600 border-pink-500/20" },
    { icon: FileText, color: "bg-teal-500/10 text-teal-600 border-teal-500/20" },
    { icon: MonitorPlay, color: "bg-orange-500/10 text-orange-600 border-orange-500/20" }
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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-8">
            {t.services.items.map((service, index) => {
              if (index % 2 !== 0) return null;
              const Icon = serviceIcons[index].icon;
              const iconColorClass = serviceIcons[index].color;
              
              return (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={index} 
                  Icon={Icon} 
                  iconColorClass={iconColorClass} 
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-8">
            {t.services.items.map((service, index) => {
              if (index % 2 === 0) return null;
              const Icon = serviceIcons[index].icon;
              const iconColorClass = serviceIcons[index].color;
              
              return (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={index} 
                  Icon={Icon} 
                  iconColorClass={iconColorClass} 
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
