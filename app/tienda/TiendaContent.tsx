"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "../components/LanguageProvider";

export function TiendaContent() {
  const { t } = useLanguage();

  const products = [
    {
      id: "iso-9001-kit",
      title: "Kit de Implementación ISO 9001",
      description: "Plantillas, manuales y guías paso a paso para implementar el Sistema de Gestión de Calidad.",
      price: "$499 USD",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
      features: ["Manual de Calidad", "Procedimientos Obligatorios", "Formatos Editables"]
    },
    {
      id: "iso-14001-kit",
      title: "Kit de Implementación ISO 14001",
      description: "Documentación completa para el Sistema de Gestión Ambiental, adaptada a la última versión.",
      price: "$499 USD",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
      features: ["Política Ambiental", "Matriz de Riesgos", "Control Operacional"]
    },
    {
      id: "auditoria-interna",
      title: "Paquete de Auditoría Interna",
      description: "Servicio de auditoría interna remota para verificar el cumplimiento antes de la certificación.",
      price: "$899 USD",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
      features: ["Auditor Líder Certificado", "Informe Detallado", "Plan de Acción"]
    },
    {
      id: "consultoria-horas",
      title: "Bolsa de Horas de Consultoría",
      description: "10 horas de asesoría personalizada con nuestros expertos en normativas ISO.",
      price: "$599 USD",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
      features: ["Resolución de Dudas", "Revisión de Documentos", "Soporte Prioritario"]
    },
    {
      id: "iso-45001-kit",
      title: "Kit de Implementación ISO 45001",
      description: "Documentación para el Sistema de Gestión de Seguridad y Salud en el Trabajo.",
      price: "$499 USD",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
      features: ["Matriz IPERC", "Planes de Emergencia", "Formatos SST"]
    },
    {
      id: "iso-27001-kit",
      title: "Kit de Implementación ISO 27001",
      description: "Protege los activos de información de tu empresa con las mejores prácticas globales.",
      price: "$699 USD",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
      features: ["Declaración de Aplicabilidad", "Políticas de Seguridad", "Evaluación de Riesgos"]
    }
  ];

  return (
    <div className="pt-16 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Catálogo de <span className="text-primary dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-accent dark:to-yellow-300 relative inline-block">
              Servicios
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Adquiere nuestros kits de documentación, paquetes de auditoría y horas de consultoría directamente desde nuestra plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Header - REMOVED OVERLAY TINT */}
              <Link href={`/tienda/${product.id}`} className="block h-48 relative overflow-hidden bg-muted">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </Link>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                    <Link href={`/tienda/${product.id}`}>{product.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-primary dark:text-accent flex-shrink-0" />
                        <span className="text-xs text-foreground/80 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xl font-black text-foreground">{product.price}</span>
                  <Link 
                    href={`/tienda/${product.id}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent hover:bg-primary hover:text-primary-foreground dark:hover:bg-accent dark:hover:text-slate-900 transition-colors shadow-sm"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
