"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Tags, Plus, Trash2, Edit2, X, AlertTriangle, ArrowLeft } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt?: string;
}

const COLOR_PALETTE = [
  { name: "Azul", class: "bg-blue-500" },
  { name: "Rojo", class: "bg-red-500" },
  { name: "Verde", class: "bg-green-600" },
  { name: "Esmeralda", class: "bg-emerald-500" },
  { name: "Morado", class: "bg-purple-500" },
  { name: "Naranja", class: "bg-orange-500" },
  { name: "Ámbar", class: "bg-amber-500" },
  { name: "Rosa", class: "bg-pink-500" },
  { name: "Indigo", class: "bg-indigo-500" },
  { name: "Gris", class: "bg-gray-600" },
];

export function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    color: "bg-blue-500",
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const data: Category[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Category);
      });
      setCategories(data);
      
      // Auto-migrate if empty
      if (data.length === 0) {
        await runAutoMigration();
      }
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
    setLoading(false);
  };

  const runAutoMigration = async () => {
    console.log("No categories found. Auto-migrating from existing posts...");
    try {
      const postsSnapshot = await getDocs(collection(db, "posts"));
      const postCategories = new Set<string>();
      postsSnapshot.forEach((doc) => {
        const cat = doc.data().category;
        if (cat) postCategories.add(cat);
      });

      if (postCategories.size > 0) {
        const batch = writeBatch(db);
        const data: Category[] = [];
        
        let index = 0;
        postCategories.forEach((catName) => {
          const id = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          const colorClass = COLOR_PALETTE[index % COLOR_PALETTE.length].class;
          
          const newCat: Category = {
            id,
            name: catName,
            color: colorClass,
            createdAt: new Date().toISOString()
          };
          
          const docRef = doc(db, "categories", id);
          batch.set(docRef, newCat);
          data.push(newCat);
          index++;
        });

        await batch.commit();
        setCategories(data);
        console.log("Migration completed:", data);
      }
    } catch (e) {
      console.error("Error migrating categories:", e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.color) {
      alert("El nombre y el color son obligatorios.");
      return;
    }

    try {
      const id = formData.id || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const newCat: Category = {
        id,
        name: formData.name,
        color: formData.color,
        createdAt: isEditingId ? (categories.find(c => c.id === isEditingId)?.createdAt || new Date().toISOString()) : new Date().toISOString()
      };

      await setDoc(doc(db, "categories", id), newCat);
      
      setFormData({ id: "", name: "", color: "bg-blue-500" });
      setIsCreating(false);
      setIsEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error al guardar categoría:", error);
      alert("Error al guardar. Revisa la consola o tus permisos.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(`¿Estás seguro de eliminar esta categoría? (Los artículos que ya tengan esta categoría escrita conservarán el texto, pero podrían perder el color si no los actualizas).`)) {
      try {
        await deleteDoc(doc(db, "categories", id));
        fetchCategories();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  const openCreate = () => {
    setFormData({ id: "", name: "", color: "bg-blue-500" });
    setIsEditingId(null);
    setIsCreating(true);
  };

  const openEdit = (cat: Category) => {
    setFormData({
      id: cat.id,
      name: cat.name,
      color: cat.color
    });
    setIsEditingId(cat.id);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="p-8 text-muted-foreground flex items-center justify-center min-h-[400px]">
    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mr-4"></div>
    Cargando categorías...
  </div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-foreground flex items-center gap-3">
            <Tags className="text-primary w-8 h-8" /> Categorías del Blog
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Crea y personaliza las categorías para organizar tus artículos.</p>
        </div>
        {!isCreating && (
          <button 
            onClick={openCreate}
            className="bg-primary text-primary-foreground px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <Plus size={20} strokeWidth={3} /> Nueva Categoría
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4">
          <div className="mb-6">
             <button 
                onClick={() => {
                  setIsCreating(false);
                  setIsEditingId(null);
                  setFormData({ id: "", name: "", color: "bg-blue-500" });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors text-sm font-semibold"
             >
                <ArrowLeft size={16} /> Volver a la lista
             </button>
          </div>
          <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
            <h2 className="text-xl font-bold">{isEditingId ? "Editar Categoría" : "Agregar Nueva Categoría"}</h2>
            <button onClick={() => {
              setIsCreating(false);
              setIsEditingId(null);
              setFormData({ id: "", name: "", color: "bg-blue-500" });
            }} className="p-2 text-muted-foreground hover:text-foreground bg-muted hover:bg-border rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Nombre de la Categoría <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 border border-border rounded-xl bg-background shadow-inner font-medium text-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all disabled:opacity-50"
                placeholder="Ej. Gestión, Auditoría, ISO..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Color Visual <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-5 gap-3">
                {COLOR_PALETTE.map((colorObj) => (
                  <button
                    key={colorObj.class}
                    type="button"
                    onClick={() => setFormData({...formData, color: colorObj.class})}
                    className={`h-12 rounded-xl transition-all flex items-center justify-center border-2 ${
                      formData.color === colorObj.class 
                      ? 'border-primary scale-110 shadow-md ring-4 ring-primary/20' 
                      : 'border-transparent hover:scale-105 hover:shadow-sm'
                    } ${colorObj.class}`}
                    title={colorObj.name}
                  >
                    {formData.color === colorObj.class && (
                      <span className="text-white drop-shadow-md">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2 pt-4 flex gap-4">
              <button 
                type="submit"
                className="flex-1 px-6 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg rounded-xl transition-colors shadow-lg shadow-primary/25"
              >
                {isEditingId ? "Guardar Cambios" : "Guardar Categoría"}
              </button>
              <button 
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setIsEditingId(null);
                }}
                className="px-6 py-4 bg-muted hover:bg-border text-foreground font-bold text-lg rounded-xl transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {categories.length === 0 && !loading && !isCreating ? (
        <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tags className="text-primary w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No hay categorías</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Crea tu primera categoría para empezar a organizar los artículos del blog.</p>
          <button 
            onClick={openCreate}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            <Plus size={20} /> Crear Categoría
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between group relative overflow-hidden hover:shadow-md transition-all">
              <div className={`absolute top-0 left-0 w-full h-2 ${cat.color}`}></div>
              <div className="mt-2">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white mb-4 ${cat.color}`}>
                  Preview del Color
                </div>
                <h3 className="font-bold text-xl text-foreground truncate">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-2">ID: {cat.id}</p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border flex justify-end gap-2">
                <button 
                  onClick={() => openEdit(cat)}
                  className="p-2 text-foreground/70 hover:bg-muted hover:text-foreground rounded-xl transition-colors flex items-center gap-2 text-sm font-semibold"
                  title="Editar Categoría"
                >
                  <Edit2 size={16} /> Editar
                </button>
                <button 
                  onClick={() => handleDelete(cat.id)} 
                  className="p-2 text-foreground/50 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors flex items-center gap-2 text-sm font-semibold"
                  title="Eliminar Categoría"
                >
                  <Trash2 size={16} /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
