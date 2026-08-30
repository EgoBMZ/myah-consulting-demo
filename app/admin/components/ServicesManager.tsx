import { useState } from "react";
import { Plus, Edit2, Trash2, X, Save } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
}

interface ServicesManagerProps {
  services: Service[];
  setServices: (services: Service[]) => void;
}

export function ServicesManager({ services, setServices }: ServicesManagerProps) {
  const [isEditing, setIsEditing] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Service>({ id: "", title: "", description: "", price: "" });

  const handleSave = () => {
    if (isEditing) {
      setServices(services.map(s => s.id === isEditing.id ? formData : s));
    } else {
      setServices([...services, { ...formData, id: Date.now().toString() }]);
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const openEdit = (service: Service) => {
    setFormData(service);
    setIsEditing(service);
    setIsCreating(false);
  };

  const openCreate = () => {
    setFormData({ id: "", title: "", description: "", price: "" });
    setIsCreating(true);
    setIsEditing(null);
  };

  const closeForm = () => {
    setIsEditing(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-foreground">Servicios</h1>
          <p className="text-muted-foreground mt-1">Gestiona los servicios ofrecidos en la plataforma.</p>
        </div>
        <button 
          onClick={openCreate}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} /> Nuevo Servicio
        </button>
      </div>

      {(isEditing || isCreating) ? (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{isEditing ? "Editar Servicio" : "Nuevo Servicio"}</h2>
            <button onClick={closeForm} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Título</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="Ej. Auditoría Interna"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Descripción</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background h-24"
                placeholder="Breve descripción del servicio..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Precio (Referencial)</label>
              <input 
                type="text" 
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="Ej. $500"
              />
            </div>
            <div className="flex justify-end pt-4">
              <button 
                onClick={handleSave}
                className="bg-accent text-slate-900 px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-accent-hover transition-colors"
              >
                <Save size={20} /> Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-sm text-muted-foreground">
                  <th className="p-4 font-semibold">TÍTULO</th>
                  <th className="p-4 font-semibold">DESCRIPCIÓN</th>
                  <th className="p-4 font-semibold">PRECIO</th>
                  <th className="p-4 font-semibold text-right">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      No hay servicios registrados.
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr key={service.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-4 font-medium">{service.title}</td>
                      <td className="p-4 text-muted-foreground text-sm max-w-xs truncate">{service.description}</td>
                      <td className="p-4">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-semibold">
                          {service.price}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit(service)} className="p-2 text-foreground/70 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => handleDelete(service.id)} className="p-2 text-foreground/70 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
