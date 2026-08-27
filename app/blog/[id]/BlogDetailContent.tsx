"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Eye, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function BlogDetailContent({ id }: { id: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const article = {
    title: "Lo que debes saber sobre la actualización normativa y cómo prepararte",
    author: "Mery Yineth Angulo",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
    date: "Octubre 24, 2026",
    readTime: "5 min de lectura",
    views: "1,245 visualizaciones",
    category: "Gestión",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    content: `
      En un mundo empresarial en constante evolución, mantenerse al día con las normativas internacionales no es solo un requisito legal, sino una ventaja competitiva. 
      
      Los cambios recientes en los estándares ISO ponen un mayor énfasis en el liderazgo y el compromiso de la alta dirección. La integración del análisis de riesgos en todos los niveles operativos se ha vuelto fundamental.
      
      Las empresas que adoptan estos cambios de manera proactiva reportan mejoras significativas en su eficiencia operativa, reducción de costos por fallas en procesos y, lo más importante, un aumento en la confianza de sus clientes y stakeholders.
      
      ¿Cómo puedes preparar a tu equipo?
      1. Realiza un diagnóstico del estado actual de tus procesos.
      2. Capacita a tu personal clave en las nuevas exigencias de la norma.
      3. Actualiza tu documentación de manera paulatina.
      4. Fomenta una cultura de mejora continua y no solo orientada a pasar una auditoría.
      
      Si necesitas acompañamiento en este proceso de transición, en Myah Consulting estamos listos para ayudarte.
    `,
    relatedPosts: [
      {
        id: "auditoria-interna-tips",
        title: "5 Errores comunes durante una auditoría interna",
        date: "Oct 10, 2026",
        category: "Auditoría",
        color: "bg-emerald-500",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: "cultura-ambiental",
        title: "Creando una cultura ambiental empresarial con ISO 14001",
        date: "Oct 02, 2026",
        category: "Ambiental",
        color: "bg-green-600",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
      },
      {
        id: "sg-sst-implementacion",
        title: "Claves para un Sistema de Gestión en Seguridad y Salud efectivo",
        date: "Sep 25, 2026",
        category: "Salud",
        color: "bg-red-500",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: "integracion-normas-iso",
        title: "Sistemas Integrados de Gestión: Calidad, Ambiente y Seguridad",
        date: "Sep 15, 2026",
        category: "Gestión Integrada",
        color: "bg-amber-500",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop"
      }
    ]
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-8 pb-24 bg-background min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors mb-8 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm">
          <ArrowLeft size={18} />
          Volver al blog
        </Link>

        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm mb-16"
        >
          {/* Image without any tint */}
          <div className="w-full h-64 md:h-[400px] relative">
            <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div className="p-8 md:p-12">
             <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-6 border border-primary/20">
               {article.category}
             </div>
             <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-6">{article.title}</h1>
             <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium mb-10 pb-10 border-b border-border">
                <div className="flex items-center gap-3">
                  <img src={article.authorImage} alt={article.author} className="w-8 h-8 rounded-full object-cover border-2 border-primary/20" />
                  <span className="font-bold text-foreground">{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  {article.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  {article.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-primary" />
                  {article.views}
                </div>
             </div>

             <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
               {article.content.split('\n').map((paragraph, idx) => (
                 paragraph.trim() !== "" && <p key={idx} className="mb-6">{paragraph.trim()}</p>
               ))}
             </div>

             <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Compartir este artículo:</span>
                <button className="p-3 rounded-full bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm">
                  <Share2 size={20} />
                </button>
             </div>
          </div>
        </motion.article>
      </div>

      {/* Related Posts Carousel - Expanded Width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-foreground">Artículos Relacionados</h3>
            
            <div className="hidden sm:flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <button onClick={scrollLeft} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                   <ChevronLeft size={20} />
                 </button>
                 <button onClick={scrollRight} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                   <ChevronRight size={20} />
                 </button>
               </div>
            </div>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {article.relatedPosts.map((related) => (
              <Link href={`/blog/${related.id}`} key={related.id} className="min-w-[300px] max-w-[300px] bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col snap-start">
                <div className="h-40 w-full relative overflow-hidden bg-muted">
                  <img 
                    src={related.image} 
                    alt={related.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className={`absolute top-4 left-4 text-xs font-bold text-white px-2 py-1 rounded-full shadow-md ${related.color}`}>
                    {related.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                    <Calendar size={12} />
                    {related.date}
                  </div>
                  <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{related.title}</h4>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm font-semibold text-primary">Leer más</span>
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="flex sm:hidden items-center justify-between mt-4">
             <div className="flex items-center gap-2">
                 <button onClick={scrollLeft} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                   <ChevronLeft size={20} />
                 </button>
                 <button onClick={scrollRight} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                   <ChevronRight size={20} />
                 </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
