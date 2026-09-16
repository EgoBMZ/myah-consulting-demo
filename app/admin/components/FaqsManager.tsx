"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Plus, Edit2, Trash2, Loader2, Save, X } from "lucide-react";

export function FaqsManager() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<any>({ q: "", a: "", order: 0 });

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "faqs"));
      const data: any[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentFaq.id) {
        await updateDoc(doc(db, "faqs", currentFaq.id), {
          q: currentFaq.q,
          a: currentFaq.a,
          order: Number(currentFaq.order),
        });
      } else {
        await addDoc(collection(db, "faqs"), {
          q: currentFaq.q,
          a: currentFaq.a,
          order: Number(currentFaq.order),
        });
      }
      setIsEditing(false);
      setCurrentFaq({ q: "", a: "", order: 0 });
      fetchFaqs();
    } catch (error) {
      console.error("Error saving FAQ:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar esta pregunta frecuente?")) {
      try {
        await deleteDoc(doc(db, "faqs", id));
        fetchFaqs();
      } catch (error) {
        console.error("Error deleting FAQ:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Gestión de FAQs</h2>
        {!isEditing && (
          <button
            onClick={() => {
              setCurrentFaq({ q: "", a: "", order: faqs.length });
              setIsEditing(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
          >
            <Plus size={20} />
            Nueva FAQ
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm mb-8 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">{currentFaq.id ? 'Editar FAQ' : 'Nueva FAQ'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Pregunta</label>
              <input
                required
                type="text"
                value={currentFaq.q}
                onChange={e => setCurrentFaq({...currentFaq, q: e.target.value})}
                className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Respuesta</label>
              <textarea
                required
                rows={4}
                value={currentFaq.a}
                onChange={e => setCurrentFaq({...currentFaq, a: e.target.value})}
                className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Orden (número)</label>
              <input
                required
                type="number"
                value={currentFaq.order}
                onChange={e => setCurrentFaq({...currentFaq, order: e.target.value})}
                className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 rounded-xl bg-muted hover:bg-border font-bold transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
              >
                <Save size={18} />
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : (
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-bold text-foreground text-lg mb-2">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
                <p className="text-xs text-muted-foreground mt-2 font-mono">Orden: {faq.order}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentFaq(faq);
                    setIsEditing(true);
                  }}
                  className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {faqs.length === 0 && (
            <div className="text-center p-12 bg-card border border-border rounded-2xl text-muted-foreground">
              No hay preguntas frecuentes creadas aún.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
