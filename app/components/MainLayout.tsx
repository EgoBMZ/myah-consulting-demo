"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-grow flex flex-col h-screen overflow-hidden">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 flex flex-col">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
