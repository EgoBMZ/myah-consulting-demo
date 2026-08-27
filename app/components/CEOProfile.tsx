"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function CEOProfile() {
  const { t } = useLanguage();
  
  const skillIcons = [
    { icon: Award, color: "bg-blue-500/10 text-blue-500" },
    { icon: Briefcase, color: "bg-purple-500/10 text-purple-500" },
    { icon: GraduationCap, color: "bg-green-500/10 text-green-500" }
  ];

  return (
    <section id="nosotros" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Side */}
            <div className="bg-muted/30 p-8 lg:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-border">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-card shadow-2xl bg-muted mb-8 overflow-hidden"
              >
                {/* Placeholder for CEO Image */}
                <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">MY</span>
                </div>
              </motion.div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-card-foreground mb-2">Mery Yineth Angulo Herrera</h3>
                <p className="text-accent font-semibold text-lg">{t.profile.role}</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12 lg:pr-16 flex flex-col justify-center">
              <h2 className="text-sm font-bold tracking-wider text-accent uppercase mb-3">{t.profile.tag}</h2>
              <h3 className="text-3xl font-bold text-card-foreground mb-6">{t.profile.title}</h3>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t.profile.description}
              </p>

              <div className="space-y-6">
                {t.profile.skills.map((skill, index) => {
                  const Icon = skillIcons[index].icon;
                  return (
                    <div className="flex gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50" key={index}>
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${skillIcons[index].color}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-card-foreground">{skill.title}</h4>
                        <p className="text-muted-foreground text-sm mt-1">{skill.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
