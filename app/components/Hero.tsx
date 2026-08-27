"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Abstract Background Shapes - subtle enough to not distract */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted text-foreground font-semibold text-sm mb-6 border border-border shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
              {t.hero.badge}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 tracking-tight">
              {t.hero.title} <span className="text-primary relative inline-block">
                {t.hero.titleHighlight}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contacto"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-accent text-slate-900 font-bold hover:bg-accent-hover transition-all duration-300 shadow-lg hover:-translate-y-1 gap-2"
              >
                {t.hero.ctaPrimary} <ArrowRight size={18} />
              </Link>
              <Link
                href="#servicios"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-card backdrop-blur-md border border-border text-foreground font-semibold hover:bg-muted transition-all duration-300 gap-2 shadow-sm"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-foreground/80 font-medium">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1 rounded-full text-primary">
                   <CheckCircle2 size={16} />
                </div>
                <span>{t.hero.audit}</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="bg-primary/10 p-1 rounded-full text-primary">
                   <CheckCircle2 size={16} />
                </div>
                <span>{t.hero.cert}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Visual Representation of Consulting / Dashboard */}
            <div className="relative rounded-2xl bg-card border border-border shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden">
              <div className="h-12 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-8 grid gap-6">
                <div className="h-8 w-1/3 bg-muted rounded-md" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-primary/5 rounded-xl border border-primary/10 flex flex-col justify-between p-4 group hover:bg-primary/10 transition-colors">
                     <TrendingUp className="text-primary opacity-50" size={24} />
                     <div>
                       <div className="w-full bg-primary/20 h-2 rounded-full mb-2">
                         <div className="bg-primary w-3/4 h-2 rounded-full" />
                       </div>
                       <span className="text-xs font-bold text-foreground">{t.hero.efficiency}</span>
                     </div>
                  </div>
                  <div className="h-32 bg-accent/5 rounded-xl border border-accent/20 flex flex-col justify-between p-4 group hover:bg-accent/10 transition-colors">
                     <ShieldCheck className="text-accent opacity-70" size={24} />
                     <div>
                       <div className="w-full bg-accent/30 h-2 rounded-full mb-2">
                         <div className="bg-accent w-full h-2 rounded-full" />
                       </div>
                       <span className="text-xs font-bold text-foreground">{t.hero.compliance}</span>
                     </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-5/6 bg-muted rounded" />
                  <div className="h-4 w-4/6 bg-muted rounded" />
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-xl border border-border flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 border border-green-500/20">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{t.hero.badgeTitle}</p>
                <p className="text-xs text-muted-foreground">{t.hero.badgeDesc}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
