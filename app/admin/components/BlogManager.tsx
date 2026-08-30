import { useState } from "react";
import { Plus, Edit2, Trash2, X, Save, Calendar, Eye, FileArchive, Clock, Image as ImageIcon } from "lucide-react";

interface Post {
  id: string;
  title: string;
  extract: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  authorImage: string;
  image: string;
  createdBy: string;
  status: "draft" | "published";
}

interface BlogManagerProps {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

export function BlogManager({ posts, setPosts }: BlogManagerProps) {
  const [isEditing, setIsEditing] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<Post>({ 
    id: "", title: "", extract: "", content: "", date: "", readTime: "", category: "", author: "Admin", authorImage: "", image: "", createdBy: "Admin", status: "draft"
  });

  const handleSave = (status: "draft" | "published") => {
    const updatedPost = { ...formData, status };
    if (isEditing) {
      setPosts(posts.map(p => p.id === isEditing.id ? updatedPost : p));
    } else {
      setPosts([...posts, { ...updatedPost, id: Date.now().toString(), createdBy: "Admin", date: new Date().toISOString().split('T')[0] }]);
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const openEdit = (post: Post) => {
    setFormData(post);
    setIsEditing(post);
    setIsCreating(false);
  };

  const openCreate = () => {
    setFormData({ id: "", title: "", extract: "", content: "", date: new Date().toISOString().split('T')[0], readTime: "", category: "", author: "Mery Yineth Angulo", authorImage: "", image: "", createdBy: "Admin", status: "draft" });
    setIsCreating(true);
    setIsEditing(null);
  };

  const closeForm = () => {
    setIsEditing(null);
    setIsCreating(false);
    setShowPreview(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-foreground">Blog</h1>
          <p className="text-muted-foreground mt-1">Publica y administra artículos.</p>
        </div>
        {!isEditing && !isCreating && (
          <button 
            onClick={openCreate}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <Plus size={20} /> Nuevo Artículo
          </button>
        )}
      </div>

      {(isEditing || isCreating) ? (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
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
                  className="w-full p-3 border border-border rounded-xl bg-background h-64"
                  placeholder="Escribe tu artículo aquí..."
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-muted/30 p-5 rounded-2xl border border-border space-y-4">
                <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Configuración</h3>
                <div>
                  <label className="block text-sm font-semibold mb-1">Categoría</label>
                  <input 
                    type="text" 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full p-3 border border-border rounded-xl bg-background"
                    placeholder="Ej. Gestión, Auditoría..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Tiempo de Lectura</label>
                  <input 
                    type="text" 
                    value={formData.readTime}
                    onChange={e => setFormData({...formData, readTime: e.target.value})}
                    className="w-full p-3 border border-border rounded-xl bg-background"
                    placeholder="Ej. 5 min de lectura"
                  />
                </div>
                {isEditing && (
                  <div>
                    <label className="block text-sm font-semibold mb-1">Fecha de Publicación</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="w-full p-3 border border-border rounded-xl bg-background"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold mb-1">Autor Visible</label>
                  <input 
                    type="text" 
                    value={formData.author}
                    onChange={e => setFormData({...formData, author: e.target.value})}
                    className="w-full p-3 border border-border rounded-xl bg-background"
                  />
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
                  <div className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded-md text-foreground">{post.category}</div>
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
              <p className="text-lg">No hay artículos creados.</p>
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
                 <div className="inline-block bg-muted text-foreground text-xs font-bold px-3 py-1 rounded-full mb-6 border border-border">
                   {formData.category || "Categoría"}
                 </div>
                 <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-6">{formData.title || "Título del Artículo"}</h1>
                 
                 <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium mb-10 pb-10 border-b border-border">
                    <div className="flex items-center gap-3">
                      {formData.authorImage ? (
                        <img src={formData.authorImage} alt={formData.author} className="w-8 h-8 rounded-full object-cover border-2 border-border" />
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
