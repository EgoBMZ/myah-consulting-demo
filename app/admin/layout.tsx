"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user || !isAdmin) {
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      } else if (user && isAdmin && pathname === "/admin/login") {
        router.push("/admin");
      }
    }
  }, [user, loading, isAdmin, router, pathname]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if ((!user || !isAdmin) && pathname !== "/admin/login") {
    return null; 
  }

  return <>{children}</>;
}
