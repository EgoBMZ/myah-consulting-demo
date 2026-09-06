import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Eye, FileArchive, ArrowLeft, CheckCircle2, ShoppingCart } from "lucide-react";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { AdminSkeletonLoader } from "./AdminSkeletonLoader";

interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string;
  price: string;
  originalPrice: string;
  isQuote: boolean;
  image: string;
  createdBy: string;
  status: "draft" | "published";
}

interface StoreManagerProps {
  // Props removed since it now reads from Firebase
}

export function StoreManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<Product>({ 
    id: "", title: "", description: "", longDescription: "", features: "", price: "", originalPrice: "", isQuote: false, image: "", createdBy: "Admin", status: "draft" 
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data: Product[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (status: "draft" | "published") => {
    try {
      const updatedProduct = { ...formData, status };
      let finalId = updatedProduct.id;
      if (!finalId) {
        finalId = updatedProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        if (!finalId) finalId = Date.now().toString();
        updatedProduct.id = finalId;
      }
      
      await setDoc(doc(db, "products", finalId), {
        ...updatedProduct,
        createdBy: "Admin"
      });
      
      await fetchProducts();
      closeForm();
    } catch (e) {
      console.error("Error saving product", e);
      alert("Error al guardar producto");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        await fetchProducts();
      } catch (e) {
        console.error("Error deleting product", e);
      }
    }
  };

  const openEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(product);
    setIsCreating(false);
  };

  const openCreate = () => {
    setFormData({ id: "", title: "", description: "", longDescription: "", features: "", price: "", originalPrice: "", isQuote: false, image: "", createdBy: "Admin", status: "draft" });
    setIsCreating(true);
    setIsEditing(null);
  };

  const closeForm = () => {
    setIsEditing(null);
    setIsCreating(false);
    setShowPreview(false);
  };

  if (loading) return <AdminSkeletonLoader />;

  const handleSeed = async () => {
    if (!confirm("¿Deseas poblar la tienda con los 10 servicios por defecto?")) return;
    setLoading(true);
    try {
      const { tiendaProducts } = await import("../../tienda/TiendaContent");
      for (const product of tiendaProducts) {
        await setDoc(doc(db, "products", product.id), {
          ...product,
          status: "published",
          createdBy: "Admin",
          createdAt: new Date().toISOString()
        });
      }
      await fetchProducts();
      alert("¡Tienda sincronizada con éxito!");
    } catch (e) {
      console.error(e);
      alert("Error al sincronizar");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-foreground">Tienda</h1>
          <p className="text-muted-foreground mt-1">Gestiona los kits y productos digitales.</p>
        </div>
        {!isEditing && !isCreating && (
          <div className="flex items-center gap-3">
          <button
            onClick={handleSeed}
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-xl font-bold hover:bg-secondary/80 transition-colors shadow-sm"
          >
            Sincronizar Datos Iniciales
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Nuevo Producto</span>
          </button>
        </div>
        )}
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
            <h2 className="text-2xl font-bold">{isEditing ? "Editar Producto" : "Nuevo Producto"}</h2>
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
                <label className="block text-sm font-semibold mb-1">Título del Producto</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full p-3 border border-border rounded-xl bg-background"
                  placeholder="Ej. Kit ISO 27001"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Descripción Corta</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full p-3 border border-border rounded-xl bg-background h-20"
                  placeholder="Se muestra en la tarjeta del listado..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Descripción Larga</label>
                <textarea 
                  value={formData.longDescription}
                  onChange={e => setFormData({...formData, longDescription: e.target.value})}
                  className="w-full p-3 border border-border rounded-xl bg-background h-32"
                  placeholder="Detalles completos que se muestran en la página del producto..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Características (Una por línea)</label>
                <textarea 
                  value={formData.features}
                  onChange={e => setFormData({...formData, features: e.target.value})}
                  className="w-full p-3 border border-border rounded-xl bg-background h-32"
                  placeholder="Diagnóstico inicial completo&#10;Más de 40 plantillas..."
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-muted/30 p-5 rounded-2xl border border-border">
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Precios & Imagen</h3>
                
                <div className="flex items-center gap-2 mb-4 bg-muted/50 p-4 rounded-xl border border-border">
                  <input
                    type="checkbox"
                    id="isQuote"
                    checked={formData.isQuote}
                    onChange={(e) => {
                      setFormData({ 
                        ...formData, 
                        isQuote: e.target.checked,
                        price: e.target.checked ? "" : formData.price 
                      });
                    }}
                    className="w-5 h-5 rounded text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                  />
                  <label htmlFor="isQuote" className="text-sm font-semibold text-foreground cursor-pointer select-none flex-grow">
                    Requiere cotización
                  </label>
                </div>

                {!formData.isQuote && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-1">Precio Actual</label>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})}
                        className="w-full p-3 border border-border rounded-xl bg-background"
                        placeholder="Ej. $499 USD"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-1">Precio Original</label>
                      <input
                        type="text"
                        value={formData.originalPrice}
                        onChange={e => setFormData({...formData, originalPrice: e.target.value})}
                        className="w-full p-3 border border-border rounded-xl bg-background"
                        placeholder="Ej. $899 USD"
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">URL de la Imagen</label>
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
              </div>

              <div className="flex flex-col gap-3">
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
                  <Save size={20} /> Publicar Producto
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col group relative overflow-hidden">
              {/* Status Badge */}
              <div className={`absolute top-4 left-4 z-10 text-xs font-bold px-2 py-1 rounded-md shadow-sm border ${
                product.status === "published" 
                ? "bg-green-500/10 text-green-600 border-green-500/20" 
                : "bg-amber-500/10 text-amber-600 border-amber-500/20"
              }`}>
                {product.status === "published" ? "Publicado" : "Borrador"}
              </div>

              <div className="h-48 bg-muted rounded-xl mb-4 flex items-center justify-center text-muted-foreground relative overflow-hidden group-hover:shadow-md transition-all">
                {product.image ? (
                  <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <ImageIcon size={32} className="opacity-50" />
                )}
              </div>
              <h3 className="font-bold text-lg mb-1 line-clamp-1">{product.title}</h3>
              <p className="text-xs text-muted-foreground mb-4">Creado por: {product.createdBy}</p>
              
              <div className="flex items-center gap-2 mb-4 mt-auto">
                {product.isQuote ? (
                  <span className="font-bold text-lg">Cotizar</span>
                ) : (
                  <>
                    <span className="text-xl font-black">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                    )}
                  </>
                )}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <button 
                  onClick={() => openEdit(product)} 
                  className="text-sm font-semibold flex items-center gap-1.5 text-foreground/80 hover:text-accent bg-muted/50 hover:bg-accent/10 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Edit2 size={16} /> Editar
                </button>
                <button 
                  onClick={() => handleDelete(product.id)} 
                  className="text-sm font-semibold flex items-center gap-1.5 text-red-500 hover:text-red-600 bg-red-500/5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Trash2 size={16} /> Eliminar
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground bg-card border border-border border-dashed rounded-3xl">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg">No hay productos registrados en la tienda.</p>
            </div>
          )}
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <Eye className="text-accent" />
                <h3 className="font-bold text-lg">Previsualización del Producto</h3>
              </div>
              <button onClick={() => setShowPreview(false)} className="p-2 bg-background hover:bg-border rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto bg-background">
              {/* Product Layout Simulation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="w-full h-[400px] rounded-3xl overflow-hidden bg-muted relative">
                  {formData.image ? (
                    <img src={formData.image} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">Sin Imagen</div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="text-4xl font-black mb-6">{formData.title || "Título del Producto"}</h1>
                  <p className="text-lg text-muted-foreground mb-8">{formData.description || "Descripción corta del producto."}</p>
                  
                  <div className="bg-card border border-border p-6 rounded-3xl shadow-sm mb-6">
                    <span className="block text-sm text-muted-foreground font-semibold mb-1 uppercase">Inversión Total</span>
                    <div className="flex items-baseline gap-3">
                      {formData.isQuote ? (
                        <span className="text-4xl font-black">Cotizar servicio</span>
                      ) : (
                        <>
                          <span className="text-4xl font-black">{formData.price || "$0"}</span>
                          {formData.originalPrice && <span className="text-xl text-muted-foreground/60 line-through font-semibold">{formData.originalPrice}</span>}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 bg-card border border-border rounded-3xl p-8">
                <h2 className="text-2xl font-black mb-6">Detalles del Servicio</h2>
                <div className="prose dark:prose-invert max-w-none mb-8">
                  {formData.longDescription.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
                
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-primary" /> ¿Qué incluye?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.features.split('\n').filter(f => f.trim()).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-muted/40 rounded-2xl border border-border/50">
                      <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
