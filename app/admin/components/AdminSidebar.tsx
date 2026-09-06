import { LayoutDashboard, ShoppingCart, FileText, Settings, LogOut, Users, AlertTriangle, Tags, ClipboardList, Star } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const { logout, user } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const menuItems = [
    { id: "services", label: "Servicios", icon: LayoutDashboard },
    { id: "store", label: "Tienda", icon: ShoppingCart },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "categories", label: "Categorías", icon: Tags },
    { id: "diagnosticos", label: "Diagnósticos", icon: ClipboardList },
    { id: "testimonials", label: "Casos de Éxito", icon: Star },
    { id: "administradores", label: "Administradores", icon: Users },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-full min-h-screen">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
        <p className="text-xs text-muted-foreground">{user?.email || "Demo Mode"}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground font-bold shadow-md"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors">
          <LogOut size={20} />
          <span>Salir</span>
        </button>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-xl max-w-md w-full animate-in zoom-in-95 fade-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="text-red-500 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">¿Cerrar Sesión?</h3>
              <p className="text-muted-foreground mb-8">
                Estás a punto de salir del panel de administración. Tendrás que volver a ingresar con Google para acceder de nuevo.
              </p>
              <div className="flex w-full gap-3">
                <button 
                  onClick={() => setShowLogoutModal(false)} 
                  className="flex-1 px-4 py-3 rounded-xl bg-muted hover:bg-border transition-colors font-bold"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    setShowLogoutModal(false);
                    logout();
                  }} 
                  className="flex-1 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors font-bold shadow-sm shadow-red-500/20"
                >
                  Sí, Salir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
