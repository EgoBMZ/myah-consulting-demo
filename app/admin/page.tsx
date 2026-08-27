import { Metadata } from "next";
import { AdminContent } from "./AdminContent";

export const metadata: Metadata = {
  title: "Panel Administrativo | Myah Consulting",
  description: "Acceso seguro al panel administrativo de Myah Consulting.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminContent />;
}
