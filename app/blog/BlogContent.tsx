"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Search } from "lucide-react";
import { useLanguage } from "../components/LanguageProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";

export function BlogContent() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback posts in case Firebase is empty
  const fallbackPosts = [
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
    }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), where("status", "==", "published"));
        const querySnapshot = await getDocs(q);
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        if (data.length > 0) {
          // Simplistic date sort assuming format MMM DD, YYYY or YYYY-MM-DD
          // In a real app we'd use a real timestamp
          setDynamicPosts(data);
        }
      } catch (e) {
        console.error("Error fetching posts:", e);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const posts = dynamicPosts.length > 0 ? dynamicPosts : fallbackPosts;

  const categories = ["Todos", ...Array.from(new Set(posts.map(post => post.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = (post.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (post.excerpt || post.extract || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Todos" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-16 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Blog y <span className="text-primary dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-accent dark:to-yellow-300 relative inline-block">
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
                    ? "bg-primary text-primary-foreground dark:bg-accent dark:text-slate-900 shadow-md" 
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-accent/10 dark:hover:text-accent"
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm h-[28rem] animate-pulse flex flex-col">
                <div className="h-56 bg-muted w-full"></div>
                <div className="p-6 md:p-8 flex flex-col gap-4 flex-grow">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="mt-auto flex justify-between items-center pt-5">
                    <div className="flex gap-2 items-center">
                      <div className="w-8 h-8 rounded-full bg-muted"></div>
                      <div className="w-24 h-4 bg-muted rounded"></div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-muted"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
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
                    
                    <h3 className="text-xl md:text-2xl font-black text-foreground mb-3 group-hover:text-primary dark:group-hover:text-accent transition-colors leading-snug">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-8 flex-grow leading-relaxed line-clamp-3">
                      {post.excerpt || post.extract}
                    </p>
                    
                    <div className="flex items-center justify-between pt-5 border-t border-border mt-auto">
                      <div className="flex items-center gap-3">
                        <img src={post.authorImage} alt={post.author} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover border-2 border-primary/20 dark:border-accent/20" />
                        <span className="text-sm font-bold text-foreground">{post.author}</span>
                      </div>
                      
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent hover:bg-primary hover:text-primary-foreground dark:hover:bg-accent dark:hover:text-slate-900 transition-colors shadow-sm"
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
