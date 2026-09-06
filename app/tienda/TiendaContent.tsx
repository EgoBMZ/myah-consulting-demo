"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useCurrency } from "../../context/CurrencyContext";

export const tiendaProducts = [
  {
    id: "certificacion",
    title: "Certificación ISO y Esquemas Sectoriales",
    description: "Implementación completa de normas ISO (9001, 14001, 45001, 27001, etc.) desde el diagnóstico hasta la certificación.",
    longDescription: "Identificamos qué certificación aplica a tu industria e implementamos el sistema completo. Desde el diagnóstico inicial hasta el acompañamiento durante la auditoría de certificación. Te garantizamos documentación de calidad, capacitación a tu equipo y cero complicaciones operativas.",
    price: "Desde $1,499 USD",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    features: ["Diagnóstico inicial detallado", "Documentación 100% personalizada", "Acompañamiento en auditoría de certificación"]
  },
  {
    id: "organizacion",
    title: "Organización y Procesos",
    description: "Levantamiento y documentación de procesos para que tu empresa opere sin depender de una sola persona.",
    longDescription: "Si tu empresa funciona de manera informal y el conocimiento está centralizado en pocos empleados, este servicio es para ti. Levantamos y documentamos tus procesos, definimos roles claros y estructuramos una gestión documental que permita escalar tu negocio de manera ordenada.",
    price: "Cotizar Servicio",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    features: ["Mapeo de procesos end-to-end", "Manuales de funciones y perfiles", "Estandarización operativa"]
  },
  {
    id: "auditoria",
    title: "Preparación para Auditorías",
    description: "Auditoría interna previa, identificación y cierre de no conformidades antes del evento real.",
    longDescription: "¿Se acerca tu auditoría de certificación o seguimiento y no te sientes listo? Realizamos un simulacro exhaustivo bajo los mismos criterios del ente certificador. Detectamos brechas, redactamos hallazgos y te ayudamos a cerrar las no conformidades para que vayas a la fija.",
    price: "Desde $599 USD",
    originalPrice: "$899 USD",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    features: ["Simulacro de auditoría real", "Informe detallado de brechas", "Plan de cierre de hallazgos"]
  },
  {
    id: "cumplimiento",
    title: "Cumplimiento Legal y de Riesgo",
    description: "Diagnóstico normativo e implementación de protección de datos (Ley 1581) y SAGRILAFT.",
    longDescription: "Reduce tu exposición legal y financiera. Implementamos de manera ágil y práctica los requerimientos de la Ley de Protección de Datos Personales, Sistemas de Autocontrol y Gestión del Riesgo (SAGRILAFT), y marcos antisoborno (ISO 37001), blindando a tu empresa ante autoridades y clientes corporativos.",
    price: "Cotizar Servicio",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    features: ["Matriz de requisitos legales", "Políticas de tratamiento de datos", "Gestión de riesgos de cumplimiento"]
  },
  {
    id: "licitaciones",
    title: "Preparación para Licitar",
    description: "Cierre de brechas y cumplimiento de requisitos para participar en contratación pública y privada.",
    longDescription: "Muchos negocios rentables se pierden por no cumplir con un papel o un indicador. Analizamos los pliegos de condiciones típicos de tu sector, identificamos qué te falta e implementamos de forma acelerada los sistemas y certificados necesarios para que puedas competir por esos contratos.",
    price: "Desde $899 USD",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    features: ["Análisis de pliegos sectoriales", "Implementación acelerada", "Revisión documental pre-licitación"]
  },
  {
    id: "procesos",
    title: "Mejora de Procesos y Productividad",
    description: "Análisis de ineficiencias, mejora continua y definición de indicadores clave (KPIs).",
    longDescription: "Transformamos procesos lentos y con reprocesos en flujos de valor altamente eficientes. Implementamos metodologías ágiles, definimos indicadores de gestión reales y automatizamos pasos innecesarios usando herramientas BPM como Bizagi, logrando un impacto directo en tu rentabilidad.",
    price: "Cotizar Servicio",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    features: ["Análisis de cuellos de botella", "Definición de KPIs", "Modelado BPMN"]
  },
  {
    id: "ia-gestion",
    title: "Inteligencia Artificial en Gestión",
    description: "Automatización de control documental y monitoreo con IA para sistemas de gestión.",
    longDescription: "No más horas perdidas actualizando Excel y persiguiendo firmas. Integramos herramientas de Inteligencia Artificial para el control documental, el análisis predictivo de riesgos y el monitoreo de indicadores en tiempo real. Tu equipo se enfocará en la estrategia, la IA en la operatividad.",
    price: "Desde $1,200 USD",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    features: ["Auditorías impulsadas por IA", "Análisis predictivo de calidad", "Automatización de registros"]
  },
  {
    id: "gamificacion",
    title: "Gamificación Empresarial",
    description: "Capacitaciones en HSEQ, calidad y cultura organizacional mediante retos y juegos.",
    longDescription: "Las capacitaciones aburridas no generan cambio de comportamiento. Diseñamos módulos de formación interactiva y gamificada (niveles, insignias, misiones) para que tu equipo interiorice las normas de calidad, seguridad y salud en el trabajo de manera divertida y memorable.",
    price: "Desde $499 USD",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    features: ["Diseño de dinámicas HSEQ", "Plataforma de recompensas", "Mayor retención de aprendizaje"]
  },
  {
    id: "plantillas-ia",
    title: "Plantillas y Documentación con IA",
    description: "Generación automatizada de manuales, procedimientos y formatos adaptados a tu empresa.",
    longDescription: "Redactar documentación desde cero es el cuello de botella de toda implementación. Utilizamos prompts especializados e IA para generar rápidamente el esqueleto de tu sistema de gestión (manuales, procedimientos, matrices) adaptado exactamente al contexto y lenguaje de tu empresa.",
    price: "$299 USD",
    originalPrice: "$450 USD",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
    features: ["Generación ultra rápida", "Adaptación al tono corporativo", "Estructura 100% auditable"]
  },
  {
    id: "mentorias",
    title: "Mentorías Virtuales ISO",
    description: "Sesiones en línea de 1 o 2 horas para resolver dudas específicas sobre tu sistema.",
    longDescription: "Si ya estás implementando tu sistema pero te estancaste en un requisito de la norma, o necesitas una segunda opinión antes de una auditoría, agenda una mentoría. Te sientas virtualmente con un experto auditor líder para destrabar tu proceso de inmediato.",
    price: "$120 USD / Hora",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    features: ["Consultoría bajo demanda", "Auditor líder asignado", "Grabación de la sesión incluida"]
  }
];

export function TiendaContent() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const data: any[] = [];
        snapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
        
        // If Firebase is empty, fallback to local tiendaProducts temporarily
        if (data.length === 0) {
          setProducts(tiendaProducts);
        } else {
          // Sort by some logic or just use as is. Filter only published
          const published = data.filter(p => p.status !== "draft");
          setProducts(published.length > 0 ? published : data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(tiendaProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
            Descubre nuestras soluciones especializadas en consultoría, gestión e implementación normativa para escalar tu empresa.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col animate-pulse h-[28rem]">
                <div className="h-48 w-full bg-muted"></div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-5/6 mb-6"></div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-muted"></div><div className="h-3 bg-muted rounded w-2/3"></div></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-muted"></div><div className="h-3 bg-muted rounded w-1/2"></div></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-muted"></div><div className="h-3 bg-muted rounded w-3/4"></div></div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="h-3 bg-muted rounded w-16"></div>
                      <div className="h-6 bg-muted rounded w-24"></div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-muted"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <Link href={`/tienda/${product.id}`} className="block h-48 relative overflow-hidden bg-muted">
                  <img 
                    src={product.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"} 
                    alt={product.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary dark:group-hover:text-accent transition-colors leading-tight">
                      <Link href={`/tienda/${product.id}`}>{product.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {(Array.isArray(product.features) ? product.features : (typeof product.features === 'string' ? product.features.split('\n').filter((f: string) => f.trim()) : [])).slice(0,3).map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-primary dark:text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-foreground/80 font-medium leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.isQuote ? (
                        <span className="text-xl font-black text-foreground">Cotizar servicio</span>
                      ) : (
                        <>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through font-medium">{formatPrice(product.originalPrice)}</span>
                          )}
                          <span className="text-xl font-black text-foreground">{product.price ? formatPrice(product.price) : "Cotizar"}</span>
                        </>
                      )}
                    </div>
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
        )}
      </div>
    </div>
  );
}
