"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Save, Loader2, Info, Plus, Trash2 } from "lucide-react";

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
    isoNormsLinks: [
      { label: "Certificar la calidad de mi empresa – ISO 9001", href: "/tienda" },
      { label: "Cumplir con seguridad y salud en el trabajo – ISO 45001", href: "/tienda" },
      { label: "Proteger la información de mi empresa – ISO 27001", href: "/tienda" },
      { label: "Cuidar el medio ambiente en mi operación – ISO 14001", href: "/tienda" },
      { label: "Prevenir el soborno y actuar con transparencia – ISO 37001", href: "/tienda" }
    ],
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

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
          <h3 className="text-xl font-bold">Enlaces de Normas ISO (Footer)</h3>
          <button
            type="button"
            onClick={() => setSettings({ ...settings, isoNormsLinks: [...(settings.isoNormsLinks || []), { label: "", href: "/tienda" }] })}
            className="flex items-center gap-1 px-3 py-1.5 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
          >
            <Plus size={16} />
            Agregar Enlace
          </button>
        </div>

        <div className="space-y-4">
          {(settings.isoNormsLinks || []).map((link: any, index: number) => (
            <div key={index} className="flex gap-4 items-start bg-background p-4 rounded-xl border border-border">
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Texto del enlace</label>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => {
                      const newLinks = [...(settings.isoNormsLinks || [])];
                      newLinks[index].label = e.target.value;
                      setSettings({ ...settings, isoNormsLinks: newLinks });
                    }}
                    className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm"
                    placeholder="Ej. Certificar la calidad de mi empresa – ISO 9001"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">URL destino</label>
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => {
                      const newLinks = [...(settings.isoNormsLinks || [])];
                      newLinks[index].href = e.target.value;
                      setSettings({ ...settings, isoNormsLinks: newLinks });
                    }}
                    className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm"
                    placeholder="Ej. /tienda o https://..."
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newLinks = [...(settings.isoNormsLinks || [])];
                  newLinks.splice(index, 1);
                  setSettings({ ...settings, isoNormsLinks: newLinks });
                }}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors mt-6"
                title="Eliminar enlace"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {(!settings.isoNormsLinks || settings.isoNormsLinks.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-4">No hay enlaces configurados. Agrega uno nuevo.</p>
          )}
        </div>
      </div>
    </div>
  );
}
