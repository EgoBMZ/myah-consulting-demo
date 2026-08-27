"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShoppingCart, Star, ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, Tag } from "lucide-react";

export function TiendaDetailContent({ id }: { id: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const product = {
    title: "Kit de Implementación ISO 9001:2015 Completo",
    description: "Este es un servicio completo de consultoría y auditoría diseñado para ayudar a las empresas a alcanzar y mantener el cumplimiento con los estándares internacionales más rigurosos. Obtén todas las herramientas y metodologías probadas por expertos en la industria.",
    longDescription: `
      Nuestro Kit de Implementación es la solución definitiva para empresas que buscan la certificación ISO 9001 sin las complicaciones típicas del proceso. Hemos condensado años de experiencia en consultoría en un paquete estructurado y fácil de seguir.
      
      No solo te entregamos documentos; te proporcionamos un mapa de ruta claro hacia la excelencia operativa. Cada plantilla ha sido diseñada para ser 100% auditable y ha pasado rigurosas inspecciones por casas certificadoras a nivel mundial.
    `,
    originalPrice: "$899 USD",
    price: "$499 USD",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Diagnóstico inicial completo en línea",
      "Más de 40 plantillas y manuales editables",
      "Asesoría personalizada por expertos (2 horas)",
      "Soporte continuo por correo durante 6 meses"
    ],
    testimonials: [
      {
        id: 1,
        author: "Carlos Martínez",
        company: "TechSolutions S.A.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
        rating: 5,
        text: "Gracias a este kit logramos certificar nuestra empresa en tiempo récord. Las plantillas son increíblemente detalladas y fáciles de adaptar a nuestra realidad."
      },
      {
        id: 2,
        author: "Laura Gómez",
        company: "Industrias del Norte",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
        rating: 5,
        text: "El soporte incluido valió cada centavo. Resuelven tus dudas rápidamente y te guían paso a paso. Altamente recomendado para PYMES."
      }
    ],
    relatedProducts: [
      {
        id: "iso-14001-kit",
        title: "Kit ISO 14001 Ambiental",
        description: "Documentación completa para el Sistema de Gestión Ambiental, adaptada a la última versión. Protege el planeta y a tu empresa.",
        price: "$499 USD",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
      },
      {
        id: "auditoria-interna",
        title: "Auditoría Interna Remota",
        description: "Servicio de auditoría interna remota para verificar el cumplimiento antes de la certificación oficial.",
        price: "$899 USD",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: "iso-45001-kit",
        title: "Kit ISO 45001 Seguridad",
        description: "Documentación para el Sistema de Gestión de Seguridad y Salud en el Trabajo. Evita riesgos y protege a tus empleados.",
        price: "$499 USD",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: "iso-27001-kit",
        title: "Kit ISO 27001 Seguridad",
        description: "Protege los activos de información de tu empresa con las mejores prácticas globales y evita ciberataques.",
        price: "$699 USD",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
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
    <div className="pt-8 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/tienda" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm">
            <ArrowLeft size={18} />
            Catálogo
          </Link>
          {/* ID badge removed as requested */}
        </div>

        {/* Top Section: Photo & Sales Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left: Single Image (Optional) */}
          <div className="w-full">
            {product.image ? (
              <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg p-2">
                <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-muted group">
                  <img
                    src={product.image}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={product.title}
                  />
                  {/* Discount Badge on Image */}
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

          {/* Right: Product Details & CTA */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-xs bg-primary/10 w-max px-3 py-1 rounded-full border border-primary/20 mb-6 uppercase tracking-wider">
              <ShieldCheck size={14} /> Servicio Premium
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-6">{product.title}</h1>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed font-medium">
              {product.description}
            </p>

            <div className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
              {/* Subtle background glow for the pricing box */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <span className="block text-sm text-muted-foreground font-semibold mb-1 uppercase tracking-wider">Inversión Total</span>
                <div className="flex flex-col">
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground/60 line-through font-semibold mb-1">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-black text-foreground">{product.price}</span>
                </div>
              </div>
              <button className="relative z-10 flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_8px_30px_rgba(52,211,153,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(52,211,153,0.4)]">
                <ShoppingCart size={22} />
                Comprar Ahora
              </button>
            </div>
            <p className="text-center sm:text-right text-xs text-muted-foreground font-medium mt-4">
              Recibirás acceso inmediato tras el pago.
            </p>
          </div>
        </div>

        {/* Middle Section: Long Description & Includes */}
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6">Detalles del Servicio</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mb-12">
            {product.longDescription.split('\n').map((paragraph, idx) => (
              paragraph.trim() !== "" && <p key={idx} className="mb-4">{paragraph.trim()}</p>
            ))}
          </div>

          <div className="pt-8 border-t border-border">
            <h3 className="text-xl md:text-2xl font-black text-foreground mb-8 flex items-center gap-3">
              <CheckCircle2 className="text-primary" size={28} />
              ¿Qué incluye este servicio?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-muted/40 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                  <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                  <span className="text-foreground/90 font-medium leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section 1: Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-black text-foreground mb-4">Lo que dicen nuestros clientes</h3>
            <p className="text-muted-foreground">Empresas que ya lograron su certificación con nuestros servicios.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-card border border-border p-8 rounded-3xl shadow-sm flex flex-col h-full">
                <div className="flex text-accent mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={18} className="fill-accent" />)}
                </div>
                <p className="text-muted-foreground italic mb-8 flex-grow leading-relaxed text-lg">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
                  <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.author}</h4>
                    <span className="text-sm text-muted-foreground">{testimonial.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section 2: Related Products Carousel */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-foreground">Otros servicios que podrían interesarte</h3>
            
            <div className="hidden sm:flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <button onClick={scrollLeft} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                   <ChevronLeft size={20} />
                 </button>
                 <button onClick={scrollRight} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                   <ChevronRight size={20} />
                 </button>
               </div>
               <Link href="/tienda" className="flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors ml-4 pl-4 border-l border-border">
                 Ver catálogo
               </Link>
            </div>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {product.relatedProducts.map((related) => (
              <Link href={`/tienda/${related.id}`} key={related.id} className="min-w-[300px] max-w-[300px] bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col snap-start">
                <div className="h-40 w-full relative overflow-hidden bg-muted">
                  <img 
                    src={related.image} 
                    alt={related.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{related.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{related.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-black text-foreground">{related.price}</span>
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
             <Link href="/tienda" className="flex items-center justify-center gap-2 text-primary font-semibold hover:text-accent transition-colors">
                 Ver catálogo <ArrowRight size={16} />
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
