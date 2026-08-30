import { LayoutDashboard, ShoppingCart, FileText, Settings, LogOut } from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const menuItems = [
    { id: "services", label: "Servicios", icon: LayoutDashboard },
    { id: "store", label: "Tienda", icon: ShoppingCart },
    { id: "blog", label: "Blog", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-full min-h-screen">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
        <p className="text-xs text-muted-foreground">Demo Mode</p>
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
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors">
          <LogOut size={20} />
          <span>Salir</span>
        </button>
      </div>
    </aside>
  );
}
