"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Save } from "lucide-react";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { AdminSkeletonLoader } from "./AdminSkeletonLoader";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  order: number;
}

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Testimonial>({
    id: "", name: "", role: "", company: "", quote: "", image: "", order: 0
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const data: Testimonial[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Testimonial);
      });
      data.sort((a, b) => a.order - b.order);
      setTestimonials(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateDoc(doc(db, "testimonials", formData.id), { ...formData });
      } else {
        const newId = Date.now().toString();
        await setDoc(doc(db, "testimonials", newId), { ...formData, id: newId });
      }
      await fetchTestimonials();
      closeForm();
    } catch (e) {
      console.error(e);
      alert("Error guardando el caso de éxito.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este caso de éxito?")) {
      await deleteDoc(doc(db, "testimonials", id));
      await fetchTestimonials();
    }
  };

  const openEdit = (testimonial: Testimonial) => {
    setFormData(testimonial);
    setIsEditing(testimonial);
    setIsCreating(false);
  };

  const openCreate = () => {
    setFormData({ id: "", name: "", role: "", company: "", quote: "", image: "", order: testimonials.length });
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
          <h1 className="text-3xl font-black text-foreground">Casos de Éxito</h1>
          <p className="text-muted-foreground mt-1">Administra los testimonios que se muestran en la página principal.</p>
        </div>
        <div className="flex gap-3">
          {!isEditing && !isCreating && (
            <button 
              onClick={openCreate}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Plus size={20} /> Nuevo Caso
            </button>
          )}
        </div>
      </div>

      {(isEditing || isCreating) ? (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{isEditing ? "Editar Caso de Éxito" : "Nuevo Caso de Éxito"}</h2>
            <button onClick={closeForm} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold mb-1">Nombre del Cliente</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="Ej. Juan Pérez"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold mb-1">Empresa</label>
              <input 
                type="text" 
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="Ej. Industrias ABC"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold mb-1">Cargo</label>
              <input 
                type="text" 
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="Ej. Director de Calidad"
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
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-1">Testimonio (Cita)</label>
              <textarea 
                value={formData.quote}
                onChange={e => setFormData({...formData, quote: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background h-24"
                placeholder="Ej. Gracias a Myah Consulting logramos..."
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-1">URL de la Foto (Opcional)</label>
              <input 
                type="text" 
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="https://..."
              />
            </div>
            
            <div className="col-span-2 flex justify-end pt-4 border-t border-border mt-4">
              <button 
                onClick={handleSave}
                className="bg-accent text-slate-900 px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-accent-hover transition-colors"
              >
                <Save size={20} /> Guardar Caso de Éxito
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
                  <th className="p-4 font-semibold">CLIENTE Y EMPRESA</th>
                  <th className="p-4 font-semibold">TESTIMONIO</th>
                  <th className="p-4 font-semibold text-right">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      No hay casos de éxito registrados.
                    </td>
                  </tr>
                ) : (
                  testimonials.map((testi) => (
                    <tr key={testi.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-4 text-center font-bold">{testi.order}</td>
                      <td className="p-4 font-medium">
                        {testi.name}
                        <br/>
                        <span className="text-xs text-muted-foreground">{testi.role}, {testi.company}</span>
                      </td>
                      <td className="p-4 text-muted-foreground text-sm max-w-xs truncate">{testi.quote}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit(testi)} className="p-2 text-foreground/70 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => handleDelete(testi.id)} className="p-2 text-foreground/70 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
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
