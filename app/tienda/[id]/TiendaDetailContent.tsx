"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageCircle, Star, ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, Tag } from "lucide-react";
import { doc, getDoc, collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { tiendaProducts } from "../TiendaContent";
import { useCurrency } from "../../../context/CurrencyContext";
import { useSettings } from "../../../context/SettingsContext";

export function TiendaDetailContent({ id }: { id: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();
  const { settings } = useSettings();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        
        let fetchedProduct = null;
        if (docSnap.exists()) {
          fetchedProduct = { id: docSnap.id, ...docSnap.data() };
        } else {
          // fallback to local if not seeded yet
          fetchedProduct = tiendaProducts.find(p => p.id === id);
        }

        setProduct(fetchedProduct);

        // Fetch related
        const q = query(collection(db, "products"), where("status", "==", "published"), limit(5));
        const relSnap = await getDocs(q);
        const relData: any[] = [];
        relSnap.forEach(d => {
          if (d.id !== id) {
            relData.push({ id: d.id, ...d.data() });
          }
        });

        if (relData.length === 0) {
          setRelatedProducts(tiendaProducts.filter(p => p.id !== id).slice(0, 4));
        } else {
          setRelatedProducts(relData.slice(0, 4));
        }

      } catch (e) {
        console.error(e);
        setProduct(tiendaProducts.find(p => p.id === id));
        setRelatedProducts(tiendaProducts.filter(p => p.id !== id).slice(0, 4));
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-8 pb-24 bg-background min-h-screen animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 w-32 h-10 bg-muted rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="w-full">
              <div className="bg-card border border-border rounded-3xl h-[400px] md:h-[500px] bg-muted"></div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="w-40 h-8 bg-muted rounded-full mb-6"></div>
              <div className="w-full h-12 md:h-16 bg-muted rounded-xl mb-6"></div>
              <div className="w-3/4 h-12 md:h-16 bg-muted rounded-xl mb-6"></div>
              
              <div className="w-full h-6 bg-muted rounded mb-3 mt-4"></div>
              <div className="w-5/6 h-6 bg-muted rounded mb-3"></div>
              <div className="w-4/6 h-6 bg-muted rounded mb-12"></div>
              
              <div className="w-full h-24 bg-muted rounded-2xl"></div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 h-64 bg-muted"></div>
        </div>
      </div>
    );
  }

  if (!product && !loading) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Servicio no encontrado</h1>
        <Link href="/tienda" className="text-primary font-bold hover:underline">Volver a la tienda</Link>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const phoneNumber = settings.whatsappNumber;
    const message = encodeURIComponent(`Hola, estoy interesado en el servicio de la tienda: *${product.title}*. ¿Me podrían dar más información?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
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
    <div className="pt-8 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/tienda" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm">
            <ArrowLeft size={18} />
            Catálogo de Servicios
          </Link>
        </div>

        {/* Top Section: Photo & Sales Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          <div className="w-full">
            {product.image ? (
              <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg p-2">
                <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-muted group">
                  <img
                    src={product.image}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={product.title}
                  />
                  {product.originalPrice && (
                     <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                       <Tag size={16} />
                       ¡Oferta Especial!
                     </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-3xl h-[400px] flex items-center justify-center text-muted-foreground">
                Sin imagen disponible
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-xs bg-primary/10 w-max px-3 py-1 rounded-full border border-primary/20 mb-6 uppercase tracking-wider">
              <ShieldCheck size={14} /> Servicio Premium
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-6">{product.title}</h1>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed font-medium">
              {product.description}
            </p>
            
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 p-6 bg-card border border-border rounded-2xl shadow-sm">
              <div className="flex-1 w-full text-center lg:text-left min-w-0">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Inversión</p>
                <div className="flex flex-col justify-center lg:justify-start leading-tight">
                  {product.isQuote ? (
                    <span className="text-2xl lg:text-3xl font-black text-foreground">Cotizar servicio</span>
                  ) : (
                    <>
                      {product.originalPrice && (
                        <span className="text-sm lg:text-base text-muted-foreground/60 line-through font-semibold mb-1">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      <span className="text-2xl lg:text-3xl font-black text-foreground break-words">{product.price ? formatPrice(product.price) : "Cotizar"}</span>
                    </>
                  )}
                </div>
              </div>
              <button 
                onClick={handleWhatsApp}
                className="flex-shrink-0 w-full lg:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-[#128C7E] transition-all shadow-sm hover:-translate-y-0.5 hover:shadow-md"
              >
                <MessageCircle size={20} />
                Me Interesa
              </button>
            </div>
            <p className="text-center sm:text-right text-xs text-muted-foreground font-medium mt-4">
              Atención directa por WhatsApp con uno de nuestros asesores.
            </p>
          </div>
        </div>

        {/* Middle Section: Long Description & Includes */}
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6">Detalles del Servicio</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mb-12">
            {(product.longDescription || product.description || "").split('\n').map((paragraph: string, idx: number) => (
              paragraph.trim() !== "" && <p key={idx} className="mb-4">{paragraph.trim()}</p>
            ))}
          </div>

          <div className="pt-8 border-t border-border">
            <h3 className="text-xl md:text-2xl font-black text-foreground mb-8 flex items-center gap-3">
              <CheckCircle2 className="text-primary dark:text-accent" size={28} />
              Características Clave
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Array.isArray(product.features) ? product.features : (typeof product.features === 'string' ? product.features.split('\n').filter((f: string) => f.trim()) : [])).map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-muted/40 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 dark:hover:border-accent/30 dark:hover:bg-accent/5 transition-colors">
                  <CheckCircle2 size={24} className="text-primary dark:text-accent flex-shrink-0" />
                  <span className="text-foreground/90 font-medium leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section 2: Related Products Carousel */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-foreground">Otros servicios de interés</h3>
            
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
            {relatedProducts.map((related) => (
              <Link href={`/tienda/${related.id}`} key={related.id} className="min-w-[300px] max-w-[300px] bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col snap-start">
                <div className="h-40 w-full relative overflow-hidden bg-muted">
                  <img 
                    src={related.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"} 
                    alt={related.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{related.title}</h4>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    {related.isQuote ? (
                      <span className="font-black text-foreground">Cotizar</span>
                    ) : (
                      <span className="font-black text-foreground">{related.price ? formatPrice(related.price) : "Cotizar"}</span>
                    )}
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
