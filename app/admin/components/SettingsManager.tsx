"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Save, Loader2, Info } from "lucide-react";

export function SettingsManager() {
  const [settings, setSettings] = useState({
    whatsappNumber: "573000000000",
    whatsappMessage: "Hola, vengo de la web de MYAH Consulting. Me gustaría recibir asesoría.",
    footerEmail: "contacto@myahconsulting.com",
    footerPhone: "+57 300 000 0000",
    footerAddress: "Bogotá, Colombia",
    socialFacebook: "https://www.facebook.com/people/MYAH-Consulting/100067957115397/",
    socialInstagram: "https://www.instagram.com/myahconsulting?igsh=MXVhc3B0Ym50MTMyMA%3D%3D",
    socialLinkedIn: "https://www.linkedin.com/in/myah-consulting-70976a200",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "appSettings", "global");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as any);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      await setDoc(doc(db, "appSettings", "global"), settings, { merge: true });
      setMessage({ type: "success", text: "Configuración guardada exitosamente." });
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage({ type: "error", text: "Error al guardar la configuración." });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="animate-spin text-muted-foreground w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Configuración Global</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Guardar Cambios
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl ${message.type === 'success' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'} flex items-center gap-2`}>
          <Info size={20} />
          <span>{message.text}</span>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold mb-6 border-b border-border pb-4">Contacto y Enlaces</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Número de WhatsApp (ej. 573000000000)</label>
            <input
              type="text"
              name="whatsappNumber"
              value={settings.whatsappNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-foreground">Mensaje por defecto (WhatsApp)</label>
            <textarea
              name="whatsappMessage"
              value={settings.whatsappMessage || ""}
              onChange={e => setSettings({ ...settings, whatsappMessage: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email (Footer)</label>
            <input
              type="text"
              name="footerEmail"
              value={settings.footerEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Teléfono (Footer)</label>
            <input
              type="text"
              name="footerPhone"
              value={settings.footerPhone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Dirección (Footer)</label>
            <input
              type="text"
              name="footerAddress"
              value={settings.footerAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Enlace Facebook</label>
            <input
              type="text"
              name="socialFacebook"
              value={settings.socialFacebook}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Enlace Instagram</label>
            <input
              type="text"
              name="socialInstagram"
              value={settings.socialInstagram}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Enlace LinkedIn</label>
            <input
              type="text"
              name="socialLinkedIn"
              value={settings.socialLinkedIn}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
