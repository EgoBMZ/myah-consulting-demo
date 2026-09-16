"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Save, UploadCloud } from "lucide-react";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { dictionaries } from "../../../lib/dictionaries";
import { AdminSkeletonLoader } from "./AdminSkeletonLoader";

export interface AppService {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  benefit: string;
  cta: string;
  ctaMessage: string;
  order: number;
  icon: string;
  iconColorClass: string;
  table: any | null;
}

const defaultIcons = [
  { icon: "ShieldCheck", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  { icon: "BookOpen", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  { icon: "Search", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  { icon: "ShieldAlert", color: "bg-red-500/10 text-red-600 border-red-500/20" },
  { icon: "Briefcase", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  { icon: "TrendingUp", color: "bg-accent/10 text-accent border-accent/20" },
  { icon: "BrainCircuit", color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" },
  { icon: "Gamepad2", color: "bg-pink-500/10 text-pink-600 border-pink-500/20" },
  { icon: "FileText", color: "bg-teal-500/10 text-teal-600 border-teal-500/20" },
  { icon: "MonitorPlay", color: "bg-orange-500/10 text-orange-600 border-orange-500/20" }
];

export function ServicesManager() {
  const [services, setServices] = useState<AppService[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<AppService | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<AppService>({
    id: "", title: "", subtitle: "", problem: "", solution: "", benefit: "", cta: "", ctaMessage: "", order: 0, icon: "ShieldCheck", iconColorClass: "bg-blue-500/10 text-blue-600 border-blue-500/20", table: null
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "services"));
      const data: AppService[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as AppService);
      });
      data.sort((a, b) => a.order - b.order);
      setServices(data);
      
      if (data.length === 0) {
        await migrateFromLocal();
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateDoc(doc(db, "services", formData.id), { ...formData });
      } else {
        const newId = Date.now().toString();
        await setDoc(doc(db, "services", newId), { ...formData, id: newId });
      }
      await fetchServices();
      closeForm();
    } catch (e) {
      console.error(e);
      alert("Error guardando el servicio.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este servicio?")) {
      await deleteDoc(doc(db, "services", id));
      await fetchServices();
    }
  };

  const migrateFromLocal = async () => {
    try {
      let migrated = false;
      const items = dictionaries.es.services.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const iconInfo = defaultIcons[i % defaultIcons.length];
        const data: AppService = {
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          problem: item.problem,
          solution: item.solution,
          benefit: item.benefit,
          cta: item.cta,
          ctaMessage: item.ctaMessage || `Hola, estoy interesado en ${item.title}`,
          table: item.table || null,
          order: i,
          icon: iconInfo.icon,
          iconColorClass: iconInfo.color
        };
        await setDoc(doc(db, "services", item.id), data);
        migrated = true;
      }
      
      if (migrated) {
        console.log("Migración automática de servicios completada con éxito.");
        const querySnapshot = await getDocs(collection(db, "services"));
        const data: AppService[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as AppService);
        });
        data.sort((a, b) => a.order - b.order);
        setServices(data);
      }
    } catch (e) {
      console.error("Error en la migración automática de servicios:", e);
    }
  };

  const openEdit = (service: AppService) => {
    setFormData(service);
    setIsEditing(service);
    setIsCreating(false);
  };

  const openCreate = () => {
    setFormData({ id: "", title: "", subtitle: "", problem: "", solution: "", benefit: "", cta: "", ctaMessage: "", order: services.length, icon: "ShieldCheck", iconColorClass: "bg-blue-500/10 text-blue-600 border-blue-500/20", table: null });
    setIsCreating(true);
    setIsEditing(null);
  };

  const closeForm = () => {
    setIsEditing(null);
    setIsCreating(false);
  };

  if (loading) return <AdminSkeletonLoader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-foreground">Servicios Dinámicos</h1>
          <p className="text-muted-foreground mt-1">Administra los servicios que se muestran en la página principal.</p>
        </div>
        <div className="flex gap-3">
          {!isEditing && !isCreating && (
            <button 
              onClick={openCreate}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Plus size={20} /> Nuevo Servicio
            </button>
          )}
        </div>
      </div>

      {(isEditing || isCreating) ? (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{isEditing ? "Editar Tarjeta de Servicio" : "Nueva Tarjeta de Servicio"}</h2>
            <button onClick={closeForm} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold mb-1">Título</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold mb-1">Subtítulo (ej. ISO 9001...)</label>
              <input 
                type="text" 
                value={formData.subtitle}
                onChange={e => setFormData({...formData, subtitle: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-1">El Problema</label>
              <textarea 
                value={formData.problem}
                onChange={e => setFormData({...formData, problem: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background h-20"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-1">Cómo lo resolvemos</label>
              <textarea 
                value={formData.solution}
                onChange={e => setFormData({...formData, solution: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background h-20"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-1">Lo que gana el cliente (Beneficio)</label>
              <textarea 
                value={formData.benefit}
                onChange={e => setFormData({...formData, benefit: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background h-20"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold mb-1">Botón CTA</label>
              <input 
                type="text" 
                value={formData.cta}
                onChange={e => setFormData({...formData, cta: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="Ej. Quiero certificarme"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold mb-1">Mensaje de WhatsApp</label>
              <input 
                type="text" 
                value={formData.ctaMessage || ""}
                onChange={e => setFormData({...formData, ctaMessage: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="Ej. Hola, estoy interesado en..."
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold mb-1">Orden de aparición</label>
              <input 
                type="number" 
                value={formData.order}
                onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                className="w-full p-3 border border-border rounded-xl bg-background"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold mb-1">Nombre de Icono (Lucide)</label>
              <input 
                type="text" 
                value={formData.icon}
                onChange={e => setFormData({...formData, icon: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold mb-1">Color de Icono (Clases Tailwind)</label>
              <input 
                type="text" 
                value={formData.iconColorClass}
                onChange={e => setFormData({...formData, iconColorClass: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
              />
            </div>
            
            <div className="col-span-2 flex justify-end pt-4 border-t border-border mt-4">
              <button 
                onClick={handleSave}
                className="bg-accent text-slate-900 px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-accent-hover transition-colors"
              >
                <Save size={20} /> Guardar Tarjeta
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
                  <th className="p-4 font-semibold w-16">ORDEN</th>
                  <th className="p-4 font-semibold">TÍTULO</th>
                  <th className="p-4 font-semibold">PROBLEMA</th>
                  <th className="p-4 font-semibold text-right">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      No hay servicios dinámicos registrados. Pulsa "Migrar desde Local" o "Nuevo Servicio".
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr key={service.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-4 text-center font-bold">{service.order}</td>
                      <td className="p-4 font-medium">
                        {service.title}
                        <br/>
                        <span className="text-xs text-muted-foreground">{service.subtitle}</span>
                      </td>
                      <td className="p-4 text-muted-foreground text-sm max-w-xs truncate">{service.problem}</td>
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
