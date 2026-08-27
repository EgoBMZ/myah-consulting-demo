"use client";

import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

// For the 404 page we might just render a simpler layout to avoid wrapping complex layout providers here,
// or we can assume it will be wrapped by the RootLayout.
// In Next.js App Router, not-found.tsx automatically inherits the RootLayout!

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center py-32 bg-background relative overflow-hidden">
         {/* Subtle abstract background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-xl mx-auto px-4 text-center relative z-10 mt-20">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20 text-accent">
              <AlertCircle size={48} />
            </div>
          </div>
          <h1 className="text-6xl font-black text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-bold text-foreground mb-4">Página no encontrada</h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Lo sentimos, no pudimos encontrar la página que estás buscando. Puede que haya sido movida, eliminada, o que el enlace sea incorrecto.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl"
          >
            <ArrowLeft size={20} />
            Volver al Inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
