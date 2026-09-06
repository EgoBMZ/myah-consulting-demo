"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Eye, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export function BlogDetailContent({ id }: { id: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [article, setArticle] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackArticle = {
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
  };

  const fallbackRelatedPosts = [
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
    }
  ];

  useEffect(() => {
    const fetchArticleAndRelated = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setArticle(data);
          
          // Fetch related posts (same category, published, limit 4, excluding current)
          const q = query(
            collection(db, "posts"), 
            where("status", "==", "published"),
            where("category", "==", data.category),
            limit(5)
          );
          
          const relatedSnap = await getDocs(q);
          const related: any[] = [];
          relatedSnap.forEach(rDoc => {
            if (rDoc.id !== id) {
              related.push({ id: rDoc.id, ...rDoc.data() });
            }
          });
          
          // If we didn't find enough related by category, just get latest published ones
          if (related.length === 0) {
            const fallbackQ = query(
              collection(db, "posts"),
              where("status", "==", "published"),
              limit(4)
            );
            const fallbackSnap = await getDocs(fallbackQ);
            fallbackSnap.forEach(rDoc => {
              if (rDoc.id !== id && related.length < 4) {
                related.push({ id: rDoc.id, ...rDoc.data() });
              }
            });
          }
          
          setRelatedPosts(related.slice(0, 4));
        } else {
          // Si no existe en Firebase, usamos el fallback de prueba
          setArticle(fallbackArticle);
          setRelatedPosts(fallbackRelatedPosts);
        }
      } catch (e) {
        console.error("Error fetching article:", e);
        setArticle(fallbackArticle);
        setRelatedPosts(fallbackRelatedPosts);
      }
      setLoading(false);
    };

    fetchArticleAndRelated();
  }, [id]);

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

  if (loading) {
    return (
      <div className="pt-8 pb-24 bg-background min-h-screen flex flex-col animate-pulse">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-32 h-10 bg-muted rounded-full mb-8"></div>
          
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm mb-16">
            <div className="w-full h-64 md:h-[400px] bg-muted"></div>
            
            <div className="p-8 md:p-12">
               <div className="w-24 h-6 bg-muted rounded-full mb-6"></div>
               <div className="h-10 bg-muted rounded-md w-3/4 mb-6"></div>
               
               <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted border-2 border-border"></div>
                    <div className="w-32 h-4 bg-muted rounded"></div>
                  </div>
                  <div className="w-24 h-4 bg-muted rounded"></div>
                  <div className="w-24 h-4 bg-muted rounded"></div>
               </div>
               
               <div className="space-y-4">
                 <div className="h-4 bg-muted rounded w-full"></div>
                 <div className="h-4 bg-muted rounded w-full"></div>
                 <div className="h-4 bg-muted rounded w-3/4"></div>
                 <div className="h-4 bg-muted rounded w-full"></div>
                 <div className="h-4 bg-muted rounded w-5/6"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-24 bg-background min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Link href="/blog" className="inline-flex items-center gap-2 text-foreground font-semibold hover:text-accent transition-colors mb-8 bg-muted px-4 py-2 rounded-full border border-border shadow-sm">
          <ArrowLeft size={18} />
          Volver al blog
        </Link>

        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm mb-16"
        >
          <div className="w-full h-64 md:h-[400px] relative">
            <img src={article.image || fallbackArticle.image} alt={article.title} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div className="p-8 md:p-12">
             <div className="inline-block bg-muted text-foreground text-xs font-bold px-3 py-1 rounded-full mb-6 border border-border">
               {article.category}
             </div>
             <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-6">{article.title}</h1>
             <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium mb-10 pb-10 border-b border-border">
                <div className="flex items-center gap-3">
                  <img src={article.authorImage || fallbackArticle.authorImage} alt={article.author} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover border-2 border-border" />
                  <span className="font-bold text-foreground">{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-accent" />
                  {article.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-accent" />
                  {article.readTime}
                </div>
                {article.views && (
                  <div className="flex items-center gap-2">
                    <Eye size={16} className="text-accent" />
                    {article.views}
                  </div>
                )}
             </div>

             <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
               {article.content?.split('\n').map((paragraph: string, idx: number) => (
                 paragraph.trim() !== "" && <p key={idx} className="mb-6">{paragraph.trim()}</p>
               ))}
             </div>

             <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Compartir este artículo:</span>
                <button className="p-3 rounded-full bg-muted text-foreground hover:bg-accent hover:text-slate-900 transition-colors shadow-sm">
                  <Share2 size={20} />
                </button>
             </div>
          </div>
        </motion.article>
      </div>

      {relatedPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-foreground">Artículos Relacionados</h3>
              
              <div className="hidden sm:flex items-center gap-4">
                 <div className="flex items-center gap-2">
                   <button onClick={scrollLeft} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary dark:hover:bg-accent dark:hover:text-slate-900 dark:hover:border-accent transition-colors">
                     <ChevronLeft size={20} />
                   </button>
                   <button onClick={scrollRight} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary dark:hover:bg-accent dark:hover:text-slate-900 dark:hover:border-accent transition-colors">
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
              {relatedPosts.map((related) => (
                <Link href={`/blog/${related.id}`} key={related.id} className="min-w-[300px] max-w-[300px] bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col snap-start">
                  <div className="h-40 w-full relative overflow-hidden bg-muted">
                    <img 
                      src={related.image || fallbackArticle.image} 
                      alt={related.title} 
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className={`absolute top-4 left-4 text-xs font-bold text-white px-2 py-1 rounded-full shadow-md ${related.color || "bg-primary"}`}>
                      {related.category}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                      <Calendar size={12} />
                      {related.date}
                    </div>
                    <h4 className="font-bold text-foreground mb-2 group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-2">{related.title}</h4>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm font-semibold text-foreground group-hover:text-primary dark:group-hover:text-accent transition-colors">Leer más</span>
                      <span className="w-8 h-8 rounded-full bg-muted text-foreground flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground dark:group-hover:bg-accent dark:group-hover:text-slate-900 transition-colors">
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="flex sm:hidden items-center justify-between mt-4">
               <div className="flex items-center gap-2">
                   <button onClick={scrollLeft} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary dark:hover:bg-accent dark:hover:text-slate-900 dark:hover:border-accent transition-colors">
                     <ChevronLeft size={20} />
                   </button>
                   <button onClick={scrollRight} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary dark:hover:bg-accent dark:hover:text-slate-900 dark:hover:border-accent transition-colors">
                     <ChevronRight size={20} />
                   </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
