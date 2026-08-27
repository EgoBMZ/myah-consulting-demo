import { Metadata } from "next";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog y Novedades | Myah Consulting",
  description: "Descubre artículos, guías y las últimas actualizaciones normativas sobre certificaciones ISO, auditoría, calidad, medio ambiente y ciberseguridad.",
  keywords: ["blog ISO", "novedades ISO 9001", "noticias ISO 27001", "auditoría interna", "sostenibilidad", "gestión de calidad"],
  openGraph: {
    title: "Blog y Novedades | Myah Consulting",
    description: "Descubre artículos, guías y las últimas actualizaciones normativas sobre certificaciones ISO.",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
