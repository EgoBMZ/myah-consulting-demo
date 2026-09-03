"use client";

import { useState } from "react";
import { AdminSidebar } from "./components/AdminSidebar";
import { ServicesManager } from "./components/ServicesManager";
import { StoreManager } from "./components/StoreManager";
import { BlogManager } from "./components/BlogManager";

// Initial mock data
const initialServices = [
  { id: "1", title: "Implementación ISO 9001", description: "Sistema de Gestión de Calidad.", price: "$999" },
  { id: "2", title: "Implementación ISO 14001", description: "Sistema de Gestión Ambiental.", price: "$899" },
];

const initialProducts = [
  { 
    id: "1", 
    title: "Kit de Implementación ISO 9001", 
    description: "Servicio completo de consultoría y auditoría.",
    longDescription: "Nuestro Kit de Implementación es la solución definitiva para empresas que buscan la certificación ISO 9001 sin las complicaciones típicas del proceso.",
    features: "Diagnóstico inicial completo\nMás de 40 plantillas\nAsesoría personalizada",
    price: "$499 USD", 
    originalPrice: "$899 USD",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    createdBy: "Admin",
    status: "published" as const
  },
  { 
    id: "2", 
    title: "Auditoría Interna Remota", 
    description: "Verifica el cumplimiento antes de la certificación.",
    longDescription: "Servicio de auditoría interna remota detallada.",
    features: "Revisión documental\nEntrevistas remotas\nInforme final",
    price: "$899 USD", 
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    createdBy: "Admin",
    status: "draft" as const
  },
];

const initialPosts = [
  { 
    id: "1", 
    title: "Lo que debes saber sobre la actualización normativa", 
    extract: "En un mundo empresarial en constante evolución...",
    content: "En un mundo empresarial en constante evolución, mantenerse al día con las normativas internacionales no es solo un requisito legal, sino una ventaja competitiva.\n\nLos cambios recientes en los estándares ISO ponen un mayor énfasis en el liderazgo y el compromiso de la alta dirección. La integración del análisis de riesgos en todos los niveles operativos se ha vuelto fundamental.\n\n¿Cómo puedes preparar a tu equipo?\n1. Realiza un diagnóstico del estado actual de tus procesos.\n2. Capacita a tu personal clave.",
    date: "2026-10-24",
    readTime: "5 min de lectura",
    category: "Gestión",
    author: "Mery Yineth Angulo",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    createdBy: "Admin",
    status: "published" as const
  },
  { 
    id: "2", 
    title: "Beneficios de ISO 27001", 
    extract: "Protege los datos de tu empresa con las mejores prácticas.",
    content: "La información es el activo más valioso de cualquier organización moderna...",
    date: "2026-10-15",
    readTime: "3 min de lectura",
    category: "Seguridad",
    author: "Equipo Myah",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    createdBy: "Admin",
    status: "draft" as const
  },
];

export function AdminContent() {
  const [activeTab, setActiveTab] = useState("store");

  // State for all sections (demo mode persistence)
  const [services, setServices] = useState(initialServices);
  const [products, setProducts] = useState(initialProducts);
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className="flex h-screen bg-background pt-20 overflow-hidden">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto p-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          {activeTab === "services" && (
            <ServicesManager services={services} setServices={setServices} />
          )}
          {activeTab === "store" && (
            <StoreManager products={products} setProducts={setProducts} />
          )}
          {activeTab === "blog" && (
            <BlogManager posts={posts} setPosts={setPosts} />
          )}
        </div>
      </main>
    </div>
  );
}
