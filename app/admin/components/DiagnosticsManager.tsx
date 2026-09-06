"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { AdminSkeletonLoader } from "./AdminSkeletonLoader";
import { ClipboardList, Trash2, Eye, X, Phone, Mail, Building, CheckCircle2, AlertCircle, ArrowLeft, Search, Filter } from "lucide-react";

export interface DiagnosticAnswer {
  question: string;
  answer: string;
}

export interface Diagnostic {
  id: string;
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  termsAccepted: boolean;
  score: number;
  maxScore: number;
  resultLevel: string;
  answers: DiagnosticAnswer[];
  createdAt: string;
  status: "new" | "contacted" | "discarded";
}

export function DiagnosticsManager() {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingDiagnostic, setViewingDiagnostic] = useState<Diagnostic | null>(null);
  
  // Filters
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  const fetchDiagnostics = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "diagnostics"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data: Diagnostic[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Diagnostic);
      });
      setDiagnostics(data);
    } catch (e) {
      console.error("Error fetching diagnostics:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este diagnóstico? Esta acción no se puede deshacer.")) {
      try {
        await deleteDoc(doc(db, "diagnostics", id));
        setDiagnostics(diagnostics.filter(d => d.id !== id));
        if (viewingDiagnostic?.id === id) setViewingDiagnostic(null);
      } catch (e) {
        console.error("Error deleting diagnostic:", e);
        alert("Error al eliminar");
      }
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: "new" | "contacted" | "discarded") => {
    try {
      await updateDoc(doc(db, "diagnostics", id), { status: newStatus });
      setDiagnostics(diagnostics.map(d => d.id === id ? { ...d, status: newStatus } : d));
      if (viewingDiagnostic?.id === id) {
        setViewingDiagnostic({ ...viewingDiagnostic, status: newStatus });
      }
    } catch (e) {
      console.error("Error updating status:", e);
      alert("Error al actualizar estado");
    }
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return "Fecha desconocida";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const filteredDiagnostics = diagnostics.filter(d => {
    const matchesStatus = filterStatus === "all" || d.status === filterStatus;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.email.toLowerCase().includes(searchQuery.toLowerCase());
                          
    let matchesDate = true;
    if (startDateFilter || endDateFilter) {
      const dDate = new Date(d.createdAt.split('T')[0]);
      if (startDateFilter) {
        matchesDate = matchesDate && dDate >= new Date(startDateFilter);
      }
      if (endDateFilter) {
        matchesDate = matchesDate && dDate <= new Date(endDateFilter);
      }
    }

    return matchesStatus && matchesSearch && matchesDate;
  });

  if (loading) return <AdminSkeletonLoader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <ClipboardList size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Diagnósticos (Leads)</h2>
            <p className="text-sm text-muted-foreground">Gestiona los prospectos generados desde el Diagnóstico Express.</p>
          </div>
        </div>
      </div>

      {viewingDiagnostic ? (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="mb-4">
             <button 
                onClick={() => setViewingDiagnostic(null)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors text-sm font-semibold"
             >
                <ArrowLeft size={16} /> Volver a la lista
             </button>
          </div>
          <div className="flex justify-between items-start mb-6 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-foreground">{viewingDiagnostic.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  viewingDiagnostic.status === 'new' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                  viewingDiagnostic.status === 'contacted' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {viewingDiagnostic.status === 'new' ? 'Nuevo' : viewingDiagnostic.status === 'contacted' ? 'Contactado' : 'Descartado'}
                </span>
              </div>
              <p className="text-muted-foreground">{formatDate(viewingDiagnostic.createdAt)}</p>
            </div>
            <button 
              onClick={() => setViewingDiagnostic(null)}
              className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h4 className="font-bold text-foreground uppercase text-xs tracking-wider">Datos de Contacto</h4>
              
              <div className="flex items-center gap-3 text-muted-foreground">
                <Building size={18} className="text-primary" />
                <span className="font-medium text-foreground">{viewingDiagnostic.company}</span>
              </div>
              
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-primary" />
                <a href={`https://wa.me/${viewingDiagnostic.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer" className="font-medium text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
                  {viewingDiagnostic.whatsapp}
                </a>
              </div>
              
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-primary" />
                <a href={`mailto:${viewingDiagnostic.email}`} className="font-medium text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
                  {viewingDiagnostic.email}
                </a>
              </div>

              {viewingDiagnostic.termsAccepted && (
                <div className="flex items-center gap-2 mt-4 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/20">
                  <CheckCircle2 size={14} />
                  <span>Aceptó políticas de tratamiento de datos.</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-foreground uppercase text-xs tracking-wider">Resultado del Diagnóstico</h4>
              
              <div className="bg-muted p-4 rounded-xl border border-border">
                <div className="text-3xl font-black text-primary mb-1">
                  {viewingDiagnostic.score} <span className="text-lg text-muted-foreground font-medium">/ {viewingDiagnostic.maxScore}</span>
                </div>
                <div className="font-bold text-foreground text-lg mb-1">{viewingDiagnostic.resultLevel}</div>
              </div>

              <div className="flex gap-2">
                {viewingDiagnostic.status !== 'contacted' && (
                  <button 
                    onClick={() => handleUpdateStatus(viewingDiagnostic.id, 'contacted')}
                    className="flex-1 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Marcar Contactado
                  </button>
                )}
                {viewingDiagnostic.status !== 'discarded' && (
                  <button 
                    onClick={() => handleUpdateStatus(viewingDiagnostic.id, 'discarded')}
                    className="flex-1 py-2 bg-muted text-muted-foreground font-semibold rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    Descartar
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground uppercase text-xs tracking-wider mb-4">Detalle de Respuestas</h4>
            <div className="space-y-3">
              {viewingDiagnostic.answers?.map((ans, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-background border border-border rounded-lg">
                  <span className="text-sm text-foreground">{ans.question}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${ans.answer === 'Sí' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                    {ans.answer}
                  </span>
                </div>
              ))}
              {!viewingDiagnostic.answers && (
                <p className="text-sm text-muted-foreground italic">No hay detalles de respuestas guardados para este diagnóstico antiguo.</p>
              )}
            </div>
          </div>

        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar por nombre, empresa o correo..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:border-primary outline-none transition-all text-sm"
              />
            </div>
            
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'new', label: 'Nuevos' },
                  { id: 'contacted', label: 'Contactados' },
                  { id: 'discarded', label: 'Descartados' }
                ].map(status => (
                  <button
                    key={status.id}
                    onClick={() => setFilterStatus(status.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      filterStatus === status.id 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'bg-muted text-muted-foreground hover:bg-border'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-muted p-1 rounded-lg border border-border">
                <input 
                  type="date" 
                  title="Fecha inicio"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                  className="px-3 py-1.5 bg-background border border-border rounded-md focus:border-primary outline-none transition-all text-sm font-medium"
                />
                <span className="text-muted-foreground text-sm font-medium px-1">a</span>
                <input 
                  type="date" 
                  title="Fecha fin"
                  value={endDateFilter}
                  onChange={(e) => setEndDateFilter(e.target.value)}
                  className="px-3 py-1.5 bg-background border border-border rounded-md focus:border-primary outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            {filteredDiagnostics.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center">
                <AlertCircle size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">No se encontraron diagnósticos</h3>
                <p className="text-muted-foreground">Intenta ajustar los filtros de búsqueda.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted border-b border-border">
                      <th className="p-4 text-sm font-semibold text-muted-foreground">Prospecto</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">Empresa</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">Resultado</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">Estado</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">Fecha</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDiagnostics.map((diag) => (
                    <tr key={diag.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-foreground">{diag.name}</div>
                        <div className="text-xs text-muted-foreground">{diag.email}</div>
                      </td>
                      <td className="p-4 text-foreground font-medium">{diag.company}</td>
                      <td className="p-4">
                        <div className="font-bold text-primary">{diag.score}/{diag.maxScore}</div>
                        <div className="text-xs text-muted-foreground">{diag.resultLevel}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          diag.status === 'new' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          diag.status === 'contacted' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {diag.status === 'new' ? 'Nuevo' : diag.status === 'contacted' ? 'Contactado' : 'Descartado'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {formatDate(diag.createdAt)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setViewingDiagnostic(diag)}
                            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Ver detalles"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(diag.id)}
                            className="p-2 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </div>
      )}
    </div>
  );
}
