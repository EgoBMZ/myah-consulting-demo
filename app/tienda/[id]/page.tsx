import { Metadata } from "next";
import { TiendaDetailContent } from "./TiendaDetailContent";

export const metadata: Metadata = {
  title: "Detalle del Servicio | Myah Consulting",
  description: "Información detallada sobre nuestros servicios de consultoría, auditoría y certificación ISO.",
  keywords: ["ISO", "consultoría detallada", "auditoría interna"],
  openGraph: {
    title: "Detalle del Servicio | Myah Consulting",
    description: "Información detallada sobre nuestros servicios de consultoría, auditoría y certificación ISO.",
    type: "website",
  },
};

export default async function TiendaDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  return <TiendaDetailContent id={id} />;
}
