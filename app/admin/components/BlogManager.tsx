"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Save, Calendar, Eye, FileArchive, Clock, UploadCloud, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useAuth } from "../../../context/AuthContext";

export interface Post {
  id: string;
  title: string;
  extract: string;
  content: string;
  date: string;
  readTime: string;
  views: string;
  category: string;
  color: string;
  author: string;
  authorImage: string;
  image: string;
  createdBy: string;
  status: "draft" | "published";
}

const placeholderContent = `Este es un artículo en construcción. 

Pronto añadiremos todo el contenido relacionado con esta temática para que puedas mantenerte al día con las mejores prácticas y actualizaciones normativas de tu sector. 

¡Vuelve pronto para leer el artículo completo!`;

const hardcodedPosts = [
  {
    id: "nueva-iso-9001-2025",
    title: "Lo que debes saber sobre la actualización de la ISO 9001",
    extract: "Un resumen completo sobre los cambios esperados en la próxima revisión de la norma de gestión de calidad más popular del mundo y cómo prepararte.",
    date: "Oct 24, 2026",
    readTime: "5 min de lectura",
    views: "1,245 visualizaciones",
    author: "Mery Yineth Angulo",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
    category: "Calidad",
    color: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    content: "En un mundo empresarial en constante evolución, mantenerse al día con las normativas internacionales no es solo un requisito legal, sino una ventaja competitiva.\n\nLos cambios recientes en los estándares ISO ponen un mayor énfasis en el liderazgo y el compromiso de la alta dirección. La integración del análisis de riesgos en todos los niveles operativos se ha vuelto fundamental.\n\nLas empresas que adoptan estos cambios de manera proactiva reportan mejoras significativas en su eficiencia operativa, reducción de costos por fallas en procesos y, lo más importante, un aumento en la confianza de sus clientes y stakeholders.\n\n¿Cómo puedes preparar a tu equipo?\n1. Realiza un diagnóstico del estado actual de tus procesos.\n2. Capacita a tu personal clave en las nuevas exigencias de la norma.\n3. Actualiza tu documentación de manera paulatina.\n4. Fomenta una cultura de mejora continua y no solo orientada a pasar una auditoría.\n\nSi necesitas acompañamiento en este proceso de transición, en Myah Consulting estamos listos para ayudarte."
  },
  {
    id: "beneficios-iso-27001",
    title: "Ciberseguridad: Por qué la ISO 27001 es vital hoy en día",
    extract: "Con los ataques cibernéticos en aumento, implementar un Sistema de Gestión de Seguridad de la Información (SGSI) ya no es un lujo, sino una necesidad.",
    date: "Oct 18, 2026",
    readTime: "4 min de lectura",
    views: "980 visualizaciones",
    author: "Equipo Myah",
    authorImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=100&auto=format&fit=crop",
    category: "Seguridad",
    color: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070&auto=format&fit=crop",
    content: placeholderContent
  },
  {
    id: "auditoria-interna-tips",
    title: "5 Errores comunes durante una auditoría interna",
    extract: "Evita las 'no conformidades' más frecuentes en las auditorías internas de tu empresa con estos consejos prácticos de nuestros auditores líderes.",
    date: "Oct 10, 2026",
    readTime: "6 min de lectura",
    views: "1,500 visualizaciones",
    author: "Mery Yineth Angulo",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
    category: "Auditoría",
    color: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    content: placeholderContent
  },
  {
    id: "cultura-ambiental",
    title: "Creando una cultura ambiental empresarial con ISO 14001",
    extract: "No se trata solo de cumplir una norma, sino de transformar la visión de tu equipo hacia la sostenibilidad y la responsabilidad corporativa.",
    date: "Oct 02, 2026",
    readTime: "5 min de lectura",
    views: "850 visualizaciones",
    author: "Equipo Myah",
    authorImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=100&auto=format&fit=crop",
    category: "Ambiental",
    color: "bg-green-600",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    content: placeholderContent
  },
  {
    id: "sg-sst-implementacion",
    title: "Claves para un Sistema de Gestión en Seguridad y Salud efectivo",
    extract: "Aprende los pilares fundamentales para proteger a tu equipo de trabajo y reducir los índices de accidentabilidad bajo la ISO 45001.",
    date: "Sep 25, 2026",
    readTime: "7 min de lectura",
    views: "1,120 visualizaciones",
    author: "Mery Yineth Angulo",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
    category: "Salud",
    color: "bg-red-500",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
    content: placeholderContent
  },
  {
    id: "integracion-normas-iso",
    title: "Sistemas Integrados de Gestión: Calidad, Ambiente y Seguridad",
    extract: "Descubre cómo optimizar los recursos de tu empresa al integrar múltiples normas ISO en un solo sistema coherente y funcional.",
    date: "Sep 15, 2026",
    readTime: "8 min de lectura",
    views: "2,050 visualizaciones",
    author: "Equipo Myah",
    authorImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=100&auto=format&fit=crop",
    category: "Gestión Integrada",
    color: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    content: placeholderContent
  }
];

export function BlogManager() {
  const { user, adminProfile } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("bg-blue-500");
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  
  const [categories, setCategories] = useState<{id: string, name: string, color: string}[]>([]);

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

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const data: {id: string, name: string, color: string}[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as any);
      });
      setCategories(data);
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName) return;
    setIsSavingCategory(true);
    try {
      const id = newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const newCat = {
        id,
        name: newCategoryName,
        color: newCategoryColor,
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, "categories", id), newCat);
      setCategories([...categories, newCat]);
      setFormData({ ...formData, category: newCategoryName });
      setIsNewCategory(false);
      setNewCategoryName("");
      setNewCategoryColor("bg-blue-500");
    } catch (e) {
      console.error("Error creating category:", e);
      alert("Error al crear la categoría.");
    }
    setIsSavingCategory(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getCategoryColor = (categoryName: string) => {
    const cat = categories.find(c => c.name === categoryName);
    return cat ? cat.color : "bg-primary";
  };
  
  const [formData, setFormData] = useState<Post>({ 
    id: "", title: "", extract: "", content: "", date: "", readTime: "", views: "0 visualizaciones", category: "", color: "bg-blue-500", author: "Mery Yineth Angulo", authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop", image: "", createdBy: "Admin", status: "draft"
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const data: Post[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(data);
      
      if (data.length === 0) {
        await migrateFromLocal();
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (status: "draft" | "published") => {
    try {
      let postId = formData.id;
      if (!postId) {
        postId = formData.title.toLowerCase().replace(/[^a-z0-9áéíóúñü]+/g, '-').replace(/(^-|-$)+/g, '');
        if (!postId) postId = Date.now().toString();
      }
      
      const wordCount = formData.content.split(/\s+/).filter(word => word.length > 0).length;
      const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
      const readTime = `${readTimeMinutes} min de lectura`;
      const assignedColor = getCategoryColor(formData.category);

      const updatedPost = { 
        ...formData, 
        id: postId, 
        status, 
        readTime, 
        color: assignedColor,
        date: formData.date || new Date().toISOString().split('T')[0]
      };
      
      if (isEditing) {
        await updateDoc(doc(db, "posts", isEditing.id), { ...updatedPost });
      } else {
        await setDoc(doc(db, "posts", postId), { 
          ...updatedPost, 
          createdBy: "Admin"
        });
      }
      await fetchPosts();
      closeForm();
    } catch (e) {
      console.error(e);
      alert("Error guardando el artículo.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este artículo?")) {
      await deleteDoc(doc(db, "posts", id));
      await fetchPosts();
    }
  };

  const migrateFromLocal = async () => {
    try {
      let migrated = false;
      for (const post of hardcodedPosts) {
        await setDoc(doc(db, "posts", post.id), { ...post, status: "published", createdBy: "Admin" });
        migrated = true;
      }
      if (migrated) {
        console.log("Migración automática completada con éxito.");
        const querySnapshot = await getDocs(collection(db, "posts"));
        const data: Post[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as Post);
        });
        setPosts(data);
      }
    } catch (e) {
      console.error("Error en la migración automática:", e);
    }
  };

  const openEdit = (post: Post) => {
    setFormData(post);
    setIsEditing(post);
    setIsCreating(false);
    setIsNewCategory(false);
  };

  const openCreate = () => {
    const defaultAuthor = adminProfile?.name || user?.displayName || "Admin";
    const defaultPhoto = adminProfile?.photoURL || user?.photoURL || "";

    setFormData({ 
      id: "", 
      title: "", 
      extract: "", 
      content: "", 
      date: new Date().toISOString().split('T')[0], 
      readTime: "1 min de lectura", 
      views: "0 visualizaciones", 
      category: "", 
      color: "bg-blue-500", 
      author: defaultAuthor, 
      authorImage: defaultPhoto, 
      image: "", 
      createdBy: user?.email || "Admin", 
      status: "draft" 
    });
    setIsCreating(true);
    setIsEditing(null);
    setIsNewCategory(false);
  };

  const closeForm = () => {
    setIsEditing(null);
    setIsCreating(false);
    setShowPreview(false);
    setIsNewCategory(false);
  };

  if (loading) return <div>Cargando artículos...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-foreground">Blog</h1>
          <p className="text-muted-foreground mt-1">Publica y administra artículos.</p>
        </div>
        <div className="flex gap-3">
          {!isEditing && !isCreating && (
            <button 
              onClick={openCreate}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Plus size={20} /> Nuevo Artículo
            </button>
          )}
        </div>
      </div>

      {(isEditing || isCreating) ? (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
             <button 
                onClick={closeForm}
                className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors text-sm font-semibold"
             >
                <ArrowLeft size={16} /> Volver a la lista
             </button>
          </div>
          <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
            <h2 className="text-2xl font-bold">{isEditing ? "Editar Artículo" : "Nuevo Artículo"}</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent hover:text-slate-900 rounded-xl transition-colors font-semibold text-sm"
              >
                <Eye size={18} /> Previsualizar
              </button>
              <button onClick={closeForm} className="p-2 text-muted-foreground hover:text-foreground bg-muted hover:bg-border rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-1">Título</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full p-3 border border-border rounded-xl bg-background"
                  placeholder="Ej. Novedades en ISO 9001"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Extracto / Resumen</label>
                <textarea 
                  value={formData.extract}
                  onChange={e => setFormData({...formData, extract: e.target.value})}
                  className="w-full p-3 border border-border rounded-xl bg-background h-20"
                  placeholder="Un breve resumen que se verá en la tarjeta del blog..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Contenido Completo (Párrafos separados por saltos de línea)</label>
                <textarea 
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="w-full p-3 border border-border rounded-xl bg-background h-64 font-mono text-sm"
                  placeholder="Escribe tu artículo aquí..."
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-muted/30 p-5 rounded-2xl border border-border space-y-4">
                <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Configuración</h3>
                <div>
                  <label className="block text-sm font-semibold mb-1">Categoría</label>
                  {!isNewCategory ? (
                    <select
                      value={formData.category}
                      onChange={e => {
                        if (e.target.value === "new") {
                          setIsNewCategory(true);
                        } else {
                          setFormData({...formData, category: e.target.value});
                        }
                      }}
                      className="w-full p-3 border border-border rounded-xl bg-background"
                    >
                      <option value="" disabled>Selecciona una categoría</option>
                      {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      <option value="new">+ Crear nueva categoría...</option>
                    </select>
                  ) : (
                    <div className="bg-background border border-border p-4 rounded-xl space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm">Nueva Categoría</span>
                        <button 
                          onClick={() => setIsNewCategory(false)}
                          className="text-muted-foreground hover:text-foreground bg-muted p-1 rounded-md"
                          title="Cancelar"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      <input 
                        type="text" 
                        value={newCategoryName}
                        onChange={e => setNewCategoryName(e.target.value)}
                        className="w-full p-2.5 border border-border rounded-lg bg-card"
                        placeholder="Nombre (ej. Gestión)"
                        autoFocus
                      />
                      
                      <div>
                        <span className="text-xs font-semibold block mb-2 text-muted-foreground">Selecciona un color:</span>
                        <div className="flex flex-wrap gap-2">
                          {COLOR_PALETTE.map((colorObj) => (
                            <button
                              key={colorObj.class}
                              type="button"
                              onClick={() => setNewCategoryColor(colorObj.class)}
                              className={`w-6 h-6 rounded-full transition-all flex items-center justify-center border-2 ${
                                newCategoryColor === colorObj.class 
                                ? 'border-foreground scale-110 shadow-sm' 
                                : 'border-transparent hover:scale-110'
                              } ${colorObj.class}`}
                              title={colorObj.name}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleCreateCategory}
                        disabled={isSavingCategory || !newCategoryName}
                        className="w-full py-2 bg-primary text-primary-foreground font-bold rounded-lg disabled:opacity-50 transition-colors"
                      >
                        {isSavingCategory ? "Guardando..." : "Crear y Seleccionar"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-muted/30 p-5 rounded-2xl border border-border">
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Multimedia</h3>
                <div>
                  <label className="block text-sm font-semibold mb-1">URL de la Imagen Principal</label>
                  <input 
                    type="text" 
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full p-3 border border-border rounded-xl bg-background mb-2"
                    placeholder="https://..."
                  />
                  {formData.image && (
                    <div className="w-full h-32 rounded-xl overflow-hidden relative border border-border">
                      <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button 
                  onClick={() => handleSave("draft")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-muted hover:bg-border text-foreground font-bold rounded-xl transition-colors"
                >
                  <FileArchive size={20} /> Guardar como Borrador
                </button>
                <button 
                  onClick={() => handleSave("published")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-colors"
                >
                  <Save size={20} /> Publicar Artículo
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group">
              <div className="flex-1 pl-4 md:pl-0">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 font-medium">
                  <div className={`px-2 py-1 rounded-md text-xs font-bold border ${
                    post.status === "published" ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                  }`}>
                    {post.status === "published" ? "Publicado" : "Borrador"}
                  </div>
                  <div className="flex items-center gap-1"><Calendar size={14} /> {post.date}</div>
                  <div className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</div>
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-white ${post.color || "bg-primary"}`}>{post.category}</div>
                </div>
                <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                <p className="text-muted-foreground line-clamp-2 mb-2">{post.extract}</p>
                <div className="text-xs text-muted-foreground">
                  Modificado por: <span className="font-semibold text-foreground">{post.createdBy}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 md:border-l md:border-border md:pl-6">
                <button 
                  onClick={() => openEdit(post)} 
                  className="p-3 text-foreground/80 bg-muted/50 hover:bg-accent/10 hover:text-accent rounded-xl transition-colors"
                  title="Editar"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(post.id)} 
                  className="p-3 text-foreground/80 bg-muted/50 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-16 text-muted-foreground bg-card border border-border border-dashed rounded-3xl">
              <FileArchive size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg">No hay artículos dinámicos creados.</p>
            </div>
          )}
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <Eye className="text-accent" />
                <h3 className="font-bold text-lg">Previsualización del Blog</h3>
              </div>
              <button onClick={() => setShowPreview(false)} className="p-2 bg-background hover:bg-border rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto bg-background">
              {/* Blog Post Simulation */}
              <div className="w-full h-64 md:h-[400px] relative rounded-3xl overflow-hidden mb-8 bg-muted">
                {formData.image ? (
                  <img src={formData.image} alt={formData.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">Sin Imagen</div>
                )}
              </div>

              <div className="px-4 md:px-8">
                 <span className={`text-xs font-bold text-white px-3 py-1 rounded-full mb-6 inline-block ${formData.category ? getCategoryColor(formData.category) : "bg-primary"}`}>
                   {formData.category || "Categoría"}
                 </span>
                 <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-6">{formData.title || "Título del Artículo"}</h1>
                 
                 <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium mb-10 pb-10 border-b border-border">
                    <div className="flex items-center gap-3">
                      {formData.authorImage ? (
                        <img src={formData.authorImage} alt={formData.author} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover border-2 border-border" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">A</div>
                      )}
                      <span className="font-bold text-foreground">{formData.author || "Autor"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-accent" />
                      {formData.date || "Fecha"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-accent" />
                      {formData.readTime || "Tiempo"}
                    </div>
                 </div>

                 <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                   {formData.content ? (
                     formData.content.split('\n').map((paragraph, idx) => (
                       paragraph.trim() !== "" && <p key={idx} className="mb-6">{paragraph.trim()}</p>
                     ))
                   ) : (
                     <p>Contenido del artículo aparecerá aquí...</p>
                   )}
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
