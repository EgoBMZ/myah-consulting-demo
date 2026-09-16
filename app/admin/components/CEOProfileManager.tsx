"use client";

import { useState, useEffect } from "react";
import { Save, Image as ImageIcon, Trash2 } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { AdminSkeletonLoader } from "./AdminSkeletonLoader";

export interface CEOProfileData {
  tag: string;
  title: string;
  description: string;
  name: string;
  role: string;
  buttonText: string;
  imageUrl: string;
  skills: {
    title: string;
    desc: string;
    icon: string;
  }[];
}

const defaultProfileData: CEOProfileData = {
  tag: "LIDERAZGO EMPRESARIAL",
  title: "Liderazgo con experiencia y visión estratégica",
  description: "Con años de experiencia en la implementación de sistemas de gestión, lidero a las empresas hacia la excelencia operativa y la certificación de estándares internacionales.",
  name: "Mery Yineth Angulo Herrera",
  role: "CEO & Consultora Principal",
  buttonText: "Agendar Consultoría",
  imageUrl: "",
  skills: [
    { title: "Experta en calidad", desc: "Más de 10 años auditando y certificando empresas.", icon: "Award" },
    { title: "Administración", desc: "Visión estratégica para negocios.", icon: "Briefcase" },
    { title: "Docencia", desc: "Capacitación continua a equipos de trabajo.", icon: "GraduationCap" }
  ]
};

export function CEOProfileManager() {
  const [data, setData] = useState<CEOProfileData>(defaultProfileData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "content", "ceoProfile");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data() as CEOProfileData);
        } else {
          // If it doesn't exist, use default and save it
          await setDoc(docRef, defaultProfileData);
          setData(defaultProfileData);
        }
      } catch (error) {
        console.error("Error fetching CEO Profile data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, "content", "ceoProfile");
      await setDoc(docRef, data);
      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error al guardar los datos del perfil.");
    }
    setSaving(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillChange = (index: number, field: keyof CEOProfileData["skills"][0], value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setData({ ...data, skills: newSkills });
  };

  if (loading) return <AdminSkeletonLoader />;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-foreground">Perfil Profesional (CEO)</h1>
          <p className="text-muted-foreground mt-1">Configura la sección "Nosotros" y el perfil de liderazgo.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-accent text-slate-900 px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          <Save size={20} /> {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Información Personal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nombre Completo</label>
              <input 
                type="text" 
                value={data.name}
                onChange={e => setData({...data, name: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Cargo / Rol</label>
              <input 
                type="text" 
                value={data.role}
                onChange={e => setData({...data, role: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="Ej. CEO & Consultora Principal"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Foto de Perfil</label>
              <div className="flex items-center gap-4">
                {data.imageUrl ? (
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border border-border">
                    <ImageIcon size={32} className="text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 cursor-pointer"
                  />
                  <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                    <button 
                      onClick={() => setData({ ...data, imageUrl: "" })}
                      className="text-red-500 hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={12}/> Quitar foto
                    </button>
                    <span>|</span>
                    También puedes pegar una URL de imagen abajo:
                  </div>
                  <input 
                    type="text" 
                    value={data.imageUrl.startsWith("data:image") ? "Imagen Base64 cargada" : data.imageUrl}
                    onChange={e => {
                      if (!e.target.value.startsWith("Imagen Base64")) {
                        setData({...data, imageUrl: e.target.value})
                      }
                    }}
                    disabled={data.imageUrl.startsWith("data:image")}
                    placeholder="https://ejemplo.com/mifoto.jpg"
                    className="w-full p-2 mt-1 border border-border rounded-lg bg-background text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Textos de la Sección</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Etiqueta Superior</label>
            <input 
              type="text" 
              value={data.tag}
              onChange={e => setData({...data, tag: e.target.value})}
              className="w-full p-3 border border-border rounded-xl bg-background"
              placeholder="Ej. LIDERAZGO EMPRESARIAL"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Título Principal</label>
            <input 
              type="text" 
              value={data.title}
              onChange={e => setData({...data, title: e.target.value})}
              className="w-full p-3 border border-border rounded-xl bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Descripción</label>
            <textarea 
              value={data.description}
              onChange={e => setData({...data, description: e.target.value})}
              className="w-full p-3 border border-border rounded-xl bg-background h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Texto del Botón CTA (WhatsApp)</label>
            <input 
              type="text" 
              value={data.buttonText}
              onChange={e => setData({...data, buttonText: e.target.value})}
              className="w-full p-3 border border-border rounded-xl bg-background"
            />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Tarjetas de Experiencia / Habilidades</h2>
        <div className="space-y-6">
          {data.skills.map((skill, index) => (
            <div key={index} className="p-4 border border-border/50 rounded-xl bg-muted/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Título de Tarjeta {index + 1}</label>
                  <input 
                    type="text" 
                    value={skill.title}
                    onChange={e => handleSkillChange(index, "title", e.target.value)}
                    className="w-full p-2 border border-border rounded-lg bg-background text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Descripción</label>
                  <input 
                    type="text" 
                    value={skill.desc}
                    onChange={e => handleSkillChange(index, "desc", e.target.value)}
                    className="w-full p-2 border border-border rounded-lg bg-background text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
