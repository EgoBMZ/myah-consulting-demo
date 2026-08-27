import { Metadata } from "next";
import { BlogDetailContent } from "./BlogDetailContent";

export const metadata: Metadata = {
  title: "Artículo | Myah Consulting",
  description: "Lee las últimas novedades normativas en el blog de Myah Consulting.",
  keywords: ["ISO", "normativas", "calidad", "certificación"],
  openGraph: {
    title: "Artículo | Myah Consulting",
    description: "Lee las últimas novedades normativas en el blog de Myah Consulting.",
    type: "article",
  },
};

export default async function BlogDetailPage(props: { params: Promise<{ id: string }> }) {
  // En Server Components de Next.js 15+ desenvolvemos params
  const { id } = await props.params;
  return <BlogDetailContent id={id} />;
}
