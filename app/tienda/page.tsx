import { Metadata } from "next";
import { TiendaContent } from "./TiendaContent";

export const metadata: Metadata = {
  title: "Catálogo de Servicios | Myah Consulting",
  description: "Explora nuestros kits de implementación ISO, paquetes de auditoría interna y horas de consultoría. Soluciones empresariales para alcanzar la excelencia y certificación.",
  keywords: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "consultoría ISO", "auditoría interna", "certificación"],
  openGraph: {
    title: "Catálogo de Servicios | Myah Consulting",
    description: "Explora nuestros kits de implementación ISO, paquetes de auditoría interna y horas de consultoría.",
    type: "website",
  },
};

export default function TiendaPage() {
  return <TiendaContent />;
}
