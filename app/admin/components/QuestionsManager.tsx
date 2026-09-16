"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Plus, Edit2, Trash2, Loader2, Save, X, GripVertical } from "lucide-react";

type Option = { label: string; points: number };

type Question = {
  id?: string;
  text: string;
  type: "choice" | "text";
  isScored: boolean;
  options: Option[];
  order: number;
};

export function QuestionsManager() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const defaultQuestion: Question = {
    text: "",
    type: "choice",
    isScored: true,
    options: [{ label: "", points: 0 }],
    order: 0,
  };
  
  const [currentQuestion, setCurrentQuestion] = useState<Question>(defaultQuestion);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "diagnosticQuestions"));
      const data: any[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        text: currentQuestion.text,
        type: currentQuestion.type,
        isScored: currentQuestion.isScored,
        options: currentQuestion.type === "choice" ? currentQuestion.options : [],
        order: Number(currentQuestion.order),
      };

      if (currentQuestion.id) {
        await updateDoc(doc(db, "diagnosticQuestions", currentQuestion.id), payload);
      } else {
        await addDoc(collection(db, "diagnosticQuestions"), payload);
      }
      setIsEditing(false);
      setCurrentQuestion(defaultQuestion);
      fetchQuestions();
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar esta pregunta?")) {
      try {
        await deleteDoc(doc(db, "diagnosticQuestions", id));
        fetchQuestions();
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }
  };

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, { label: "", points: 0 }]
    });
  };

  const updateOption = (index: number, field: keyof Option, value: any) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = currentQuestion.options.filter((_, i) => i !== index);
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Gestión del Diagnóstico</h2>
        {!isEditing && (
          <button
            onClick={() => {
              setCurrentQuestion({ ...defaultQuestion, order: questions.length });
              setIsEditing(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
          >
            <Plus size={20} />
            Nueva Pregunta
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm mb-8 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">{currentQuestion.id ? 'Editar Pregunta' : 'Nueva Pregunta'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Texto de la pregunta</label>
              <input
                required
                type="text"
                value={currentQuestion.text}
                onChange={e => setCurrentQuestion({...currentQuestion, text: e.target.value})}
                className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de respuesta</label>
                <select
                  value={currentQuestion.type}
                  onChange={e => setCurrentQuestion({...currentQuestion, type: e.target.value as "choice" | "text"})}
                  className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                >
                  <option value="choice">Opción Múltiple</option>
                  <option value="text">Texto Libre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  ¿Suma puntos?
                  <p className="text-xs text-muted-foreground font-normal mt-0.5">Define si la respuesta sumará al resultado de madurez o si es solo para contexto.</p>
                </label>
                <select
                  value={currentQuestion.isScored ? "true" : "false"}
                  onChange={e => setCurrentQuestion({...currentQuestion, isScored: e.target.value === "true"})}
                  className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                >
                  <option value="true">Sí (evalúa madurez)</option>
                  <option value="false">No (solo contexto)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Orden
                  <p className="text-xs text-muted-foreground font-normal mt-0.5">Número que define la posición en la que aparecerá la pregunta en el formulario.</p>
                </label>
                <input
                  required
                  type="number"
                  value={currentQuestion.order}
                  onChange={e => setCurrentQuestion({...currentQuestion, order: Number(e.target.value)})}
                  className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
            </div>

            {currentQuestion.type === "choice" && (
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-foreground">Opciones</h4>
                  <button
                    type="button"
                    onClick={addOption}
                    className="text-sm px-3 py-1 bg-accent/10 text-accent font-bold rounded-lg hover:bg-accent/20 transition-colors"
                  >
                    + Agregar opción
                  </button>
                </div>
                
                {currentQuestion.options.map((opt, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <input
                        required
                        type="text"
                        value={opt.label}
                        onChange={e => updateOption(index, 'label', e.target.value)}
                        placeholder="Texto de la opción"
                        className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                      />
                    </div>
                    {currentQuestion.isScored && (
                      <div className="w-32">
                        <input
                          required
                          type="number"
                          value={opt.points}
                          onChange={e => updateOption(index, 'points', Number(e.target.value))}
                          placeholder="Puntos (ej. 2)"
                          title="Asigna cuántos puntos suma esta respuesta al nivel de madurez."
                          className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-2.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                      disabled={currentQuestion.options.length <= 1}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}

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
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-start gap-4">
              <div className="mt-1 cursor-move text-muted-foreground hover:text-foreground">
                <GripVertical size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold bg-muted px-2 py-1 rounded-md">Orden: {q.order}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${q.type === 'choice' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'}`}>
                    {q.type === 'choice' ? 'Opción Múltiple' : 'Texto Libre'}
                  </span>
                  {q.isScored && (
                    <span className="text-xs font-bold bg-green-500/10 text-green-500 px-2 py-1 rounded-md">
                      Puntuable
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-foreground text-lg mb-4">{q.text}</h4>
                
                {q.type === "choice" && q.options?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {q.options.map((opt: any, i: number) => (
                      <div key={i} className="text-sm bg-muted/50 p-2 rounded-lg flex justify-between items-center border border-border/50">
                        <span className="text-foreground/80">{opt.label}</span>
                        {q.isScored && (
                          <span className="font-bold text-accent bg-accent/10 px-2 py-0.5 rounded text-xs">{opt.points} pts</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setCurrentQuestion(q as Question);
                    setIsEditing(true);
                  }}
                  className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(q.id!)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {questions.length === 0 && (
            <div className="text-center p-12 bg-card border border-border rounded-2xl text-muted-foreground">
              No hay preguntas configuradas.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
