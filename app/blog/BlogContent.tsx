"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Search } from "lucide-react";
import { useLanguage } from "../components/LanguageProvider";

export function BlogContent() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const posts = [
    {
      id: "nueva-iso-9001-2025",
      title: "Lo que debes saber sobre la actualización de la ISO 9001",
      excerpt: "Un resumen completo sobre los cambios esperados en la próxima revisión de la norma de gestión de calidad más popular del mundo y cómo prepararte.",
      date: "Oct 24, 2026",
      author: "Mery Yineth Angulo",
      authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
      category: "Calidad",
      color: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "beneficios-iso-27001",
      title: "Ciberseguridad: Por qué la ISO 27001 es vital hoy en día",
      excerpt: "Con los ataques cibernéticos en aumento, implementar un Sistema de Gestión de Seguridad de la Información (SGSI) ya no es un lujo, sino una necesidad.",
      date: "Oct 18, 2026",
      author: "Equipo Myah",
      authorImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=100&auto=format&fit=crop",
      category: "Seguridad",
      color: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "auditoria-interna-tips",
      title: "5 Errores comunes durante una auditoría interna",
      excerpt: "Evita las 'no conformidades' más frecuentes en las auditorías internas de tu empresa con estos consejos prácticos de nuestros auditores líderes.",
      date: "Oct 10, 2026",
      author: "Mery Yineth Angulo",
      authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
      category: "Auditoría",
      color: "bg-emerald-500",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "cultura-ambiental",
      title: "Creando una cultura ambiental empresarial con ISO 14001",
      excerpt: "No se trata solo de cumplir una norma, sino de transformar la visión de tu equipo hacia la sostenibilidad y la responsabilidad corporativa.",
      date: "Oct 02, 2026",
      author: "Equipo Myah",
      authorImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=100&auto=format&fit=crop",
      category: "Ambiental",
      color: "bg-green-600",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
    },
    {
      id: "sg-sst-implementacion",
      title: "Claves para un Sistema de Gestión en Seguridad y Salud efectivo",
      excerpt: "Aprende los pilares fundamentales para proteger a tu equipo de trabajo y reducir los índices de accidentabilidad bajo la ISO 45001.",
      date: "Sep 25, 2026",
      author: "Mery Yineth Angulo",
      authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
      category: "Salud",
      color: "bg-red-500",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "integracion-normas-iso",
      title: "Sistemas Integrados de Gestión: Calidad, Ambiente y Seguridad",
      excerpt: "Descubre cómo optimizar los recursos de tu empresa al integrar múltiples normas ISO en un solo sistema coherente y funcional.",
      date: "Sep 15, 2026",
      author: "Equipo Myah",
      authorImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=100&auto=format&fit=crop",
      category: "Gestión Integrada",
      color: "bg-amber-500",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop"
    }
  ];

  const categories = ["Todos", ...Array.from(new Set(posts.map(post => post.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Todos" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-16 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Blog y <span className="text-primary relative inline-block">
              Novedades
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre artículos, guías y las últimas actualizaciones normativas para mantener tu empresa siempre a la vanguardia.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-card p-4 rounded-2xl border border-border shadow-sm">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === category 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-full bg-background text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-muted/50 rounded-3xl border border-border border-dashed">
             <h3 className="text-xl font-bold text-foreground mb-2">No se encontraron artículos</h3>
             <p className="text-muted-foreground">Intenta con otra palabra clave o selecciona una categoría diferente.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  {/* Thumbnail - No overlay tint */}
                  <Link href={`/blog/${post.id}`} className="block h-56 w-full relative overflow-hidden bg-muted">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className={`absolute top-4 left-4 text-xs font-bold text-white px-3 py-1.5 rounded-full shadow-lg ${post.color}`}>
                      {post.category}
                    </div>
                  </Link>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {post.date}
                      </div>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-8 flex-grow leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-5 border-t border-border mt-auto">
                      <div className="flex items-center gap-3">
                        <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-full object-cover border-2 border-primary/20" />
                        <span className="text-sm font-bold text-foreground">{post.author}</span>
                      </div>
                      
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
