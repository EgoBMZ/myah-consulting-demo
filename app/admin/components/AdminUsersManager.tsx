"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../lib/firebase";
import { Users, Plus, Trash2, Edit2, X, Shield, Mail, Calendar, UserPlus, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { AdminSkeletonLoader } from "./AdminSkeletonLoader";

interface AdminUser {
  email: string;
  name: string;
  photoURL: string;
  role: string;
  createdAt: string;
}

export function AdminUsersManager() {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    photoURL: "",
  });

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "admins"));
      const data: AdminUser[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ email: doc.id, ...doc.data() } as AdminUser);
      });
      setAdmins(data);
      
      // Auto-migrate master emails to the admins collection if empty
      if (data.length === 0) {
        await seedMasterAdmins();
      }
    } catch (e) {
      console.error("Error fetching admins:", e);
    }
    setLoading(false);
  };

  const seedMasterAdmins = async () => {
    try {
      const masterAdmins = [
        {
          email: "myahconsulting8@gmail.com",
          name: "Mery Yineth Angulo",
          photoURL: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
          role: "Super Admin"
        },
        {
          email: "pweb3781@gmail.com",
          name: "Equipo Myah",
          photoURL: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=100&auto=format&fit=crop",
          role: "Super Admin"
        }
      ];

      for (const admin of masterAdmins) {
        await setDoc(doc(db, "admins", admin.email), {
          ...admin,
          createdAt: new Date().toISOString()
        });
      }
      
      const querySnapshot = await getDocs(collection(db, "admins"));
      const data: AdminUser[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ email: doc.id, ...doc.data() } as AdminUser);
      });
      setAdmins(data);
    } catch (e) {
      console.error("Error seeding master admins", e);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) {
      alert("El correo y el nombre son obligatorios.");
      return;
    }

    // El email debe estar en minusculas para evitar problemas
    const adminEmail = formData.email.toLowerCase().trim();

    try {
      setIsUploading(true);
      
      let finalPhotoURL = formData.photoURL;
      
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const storageRef = ref(storage, `admins/${adminEmail}/profile_${Date.now()}.${fileExt}`);
        await uploadBytes(storageRef, imageFile);
        finalPhotoURL = await getDownloadURL(storageRef);
      }

      const newAdmin: AdminUser = {
        email: adminEmail,
        name: formData.name,
        photoURL: finalPhotoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
        role: isEditingUser ? (admins.find(a => a.email === adminEmail)?.role || "Admin") : "Admin",
        createdAt: isEditingUser ? (admins.find(a => a.email === adminEmail)?.createdAt || new Date().toISOString()) : new Date().toISOString()
      };

      // Guardamos en la coleccion "admins" usando el correo como ID
      await setDoc(doc(db, "admins", adminEmail), newAdmin);
      
      setFormData({ email: "", name: "", photoURL: "" });
      setImageFile(null);
      setIsCreating(false);
      setIsEditingUser(null);
      setIsUploading(false);
      fetchAdmins();
    } catch (error) {
      console.error("Error al guardar administrador:", error);
      alert("Error al guardar el administrador. Revisa tus permisos.");
      setIsUploading(false);
    }
  };

  const handleDelete = async (email: string) => {
    if (email === currentUser?.email) {
      alert("No puedes eliminarte a ti mismo.");
      return;
    }
    
    // Verificamos si es el email maestro en env (no se puede borrar desde aca porque sigue en .env, pero lo bloqueamos de la BD de todas formas)
    const masterEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
    if (masterEmails.includes(email)) {
      alert("Este es un administrador principal del sistema y no puede ser eliminado desde aquí.");
      return;
    }

    if (confirm(`¿Estás seguro de quitar a ${email} como administrador?`)) {
      try {
        await deleteDoc(doc(db, "admins", email));
        fetchAdmins();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  if (loading) return <AdminSkeletonLoader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-foreground flex items-center gap-2">
            <Shield className="text-primary" /> Administradores
          </h1>
          <p className="text-muted-foreground mt-1">Gestiona quién tiene acceso a este panel.</p>
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <UserPlus size={20} /> Nuevo Administrador
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4">
          <div className="mb-6">
             <button 
                onClick={() => {
                  setIsCreating(false);
                  setIsEditingUser(null);
                  setFormData({ email: "", name: "", photoURL: "" });
                  setImageFile(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors text-sm font-semibold"
             >
                <ArrowLeft size={16} /> Volver a la lista
             </button>
          </div>
          <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
            <h2 className="text-xl font-bold">{isEditingUser ? "Editar Administrador" : "Agregar Nuevo Administrador"}</h2>
            <button onClick={() => {
              setIsCreating(false);
              setIsEditingUser(null);
              setFormData({ email: "", name: "", photoURL: "" });
              setImageFile(null);
            }} className="p-2 text-muted-foreground hover:text-foreground bg-muted hover:bg-border rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1">Correo de Gmail <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background disabled:opacity-50"
                placeholder="ejemplo@gmail.com"
                disabled={!!isEditingUser}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {isEditingUser ? "No se puede cambiar el correo." : "El usuario usará 'Continuar con Google' usando este correo."}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Nombre <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="Ej. Juan Pérez"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Foto de Perfil</label>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 items-center">
                  <input 
                    type="url" 
                    value={formData.photoURL}
                    onChange={e => setFormData({...formData, photoURL: e.target.value})}
                    className="flex-1 p-3 border border-border rounded-xl bg-background"
                    placeholder="https://... (URL de la imagen)"
                    disabled={!!imageFile}
                  />
                  <div className="relative">
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setImageFile(e.target.files[0]);
                          setFormData({...formData, photoURL: ""}); // Clear URL if file selected
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button type="button" className="px-4 py-3 bg-muted hover:bg-border border border-border rounded-xl text-sm font-semibold whitespace-nowrap">
                      {imageFile ? "Archivo Seleccionado" : "Subir Archivo"}
                    </button>
                  </div>
                  {(formData.photoURL || imageFile) && (
                    <img 
                      src={imageFile ? URL.createObjectURL(imageFile) : formData.photoURL} 
                      alt="Preview" 
                      referrerPolicy="no-referrer" 
                      className="w-12 h-12 rounded-full object-cover border border-border shrink-0" 
                    />
                  )}
                </div>
                {imageFile && (
                  <div className="flex items-center justify-between bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-medium">
                    <span className="truncate max-w-[200px]">Archivo: {imageFile.name}</span>
                    <button type="button" onClick={() => setImageFile(null)} className="text-red-500 hover:text-red-700 ml-2">
                      Quitar
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-2 pt-2">
              <button 
                type="submit"
                disabled={isUploading}
                className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isUploading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                ) : (
                  <UserPlus size={20} />
                )}
                {isUploading ? "Guardando..." : "Guardar Administrador"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((admin) => (
          <div key={admin.email} className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/80"></div>
            <div className="flex items-center gap-4 mb-4 pl-2">
              {admin.photoURL ? (
                <img src={admin.photoURL} alt={admin.name} referrerPolicy="no-referrer" className="w-14 h-14 rounded-full object-cover border-2 border-background shadow-sm" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black text-xl">
                  {admin.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="font-bold text-foreground truncate max-w-[180px]" title={admin.name}>{admin.name}</h3>
                <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-md inline-block mt-1">
                  {admin.role}
                </span>
              </div>
            </div>
            <div className="pl-2 space-y-1">
              <p className="text-sm text-muted-foreground truncate" title={admin.email}>{admin.email}</p>
              {admin.createdAt && (
                <p className="text-xs text-muted-foreground/60">Agregado: {new Date(admin.createdAt).toLocaleDateString()}</p>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex justify-end pl-2 gap-2">
              <button 
                onClick={() => {
                  setFormData({
                    email: admin.email,
                    name: admin.name,
                    photoURL: admin.photoURL.includes('ui-avatars') ? "" : admin.photoURL
                  });
                  setIsEditingUser(admin.email);
                  setIsCreating(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-2 text-foreground/70 hover:bg-muted hover:text-foreground rounded-xl transition-colors flex items-center gap-2 text-sm font-semibold"
                title="Editar"
              >
                <Edit2 size={16} /> Editar
              </button>
              <button 
                onClick={() => handleDelete(admin.email)} 
                className="p-2 text-foreground/50 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors flex items-center gap-2 text-sm font-semibold"
                title="Eliminar Administrador"
              >
                <Trash2 size={16} /> Quitar Acceso
              </button>
            </div>
          </div>
        ))}
        {admins.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed border-border rounded-2xl bg-card">
            No se han agregado administradores adicionales.
          </div>
        )}
      </div>
    </div>
  );
}
