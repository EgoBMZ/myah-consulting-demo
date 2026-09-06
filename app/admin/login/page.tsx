"use client";

import { useAuth } from "../../../context/AuthContext";
import { LogIn } from "lucide-react"; // lucide-react is commonly used, if not installed it might fail, but usually in Nextjs tailwind templates it is. I'll use standard svg just in case.

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8 bg-card p-10 rounded-xl shadow-lg border border-border">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            Acceso Administrativo
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Myah Consulting Panel
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={loginWithGoogle}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-primary-foreground group-hover:text-primary-foreground/80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
            </span>
            Iniciar sesión con Google
          </button>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-4">
          Solo administradores autorizados.
        </div>
      </div>
    </div>
  );
}
