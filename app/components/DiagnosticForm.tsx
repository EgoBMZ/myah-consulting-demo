"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Loader2, Send } from "lucide-react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useSettings } from "../../context/SettingsContext";

type Option = {
  label: string;
  points?: number;
};

type Question = {
  id: string;
  text: string;
  type: "choice" | "text";
  options?: Option[];
  isScored?: boolean;
};

const defaultDiagnosticQuestions: Question[] = [
  {
    id: "q1",
    text: "¿Qué tan preparada está tu empresa hoy para una auditoría o para las exigencias de un cliente grande?",
    type: "choice",
    isScored: true,
    options: [
      { label: "Nada preparada, sería un caos", points: 0 },
      { label: "Algo preparada, pero con huecos importantes", points: 1 },
      { label: "Bastante preparada, solo faltan detalles", points: 2 }
    ]
  },
  {
    id: "q2",
    text: "¿Tu empresa tiene procesos y procedimientos documentados?",
    type: "choice",
    isScored: true,
    options: [
      { label: "No, todo funciona de memoria", points: 0 },
      { label: "Algunos, pero desordenados o desactualizados", points: 1 },
      { label: "Sí, están documentados y se usan de verdad", points: 2 }
    ]
  },
  {
    id: "q3",
    text: "¿Alguna vez han iniciado un proceso de certificación ISO?",
    type: "choice",
    isScored: true,
    options: [
      { label: "Sí, lo intentamos y no lo terminamos", points: 0 },
      { label: "No, nunca hemos iniciado uno", points: 1 },
      { label: "Sí, tenemos una certificación vigente", points: 2 }
    ]
  },
  {
    id: "q4",
    text: "¿Tu empresa ha perdido o quedado por fuera de una licitación o contrato grande por no tener una certificación o un proceso en orden?",
    type: "choice",
    isScored: true,
    options: [
      { label: "Sí, nos ha pasado", points: 0 },
      { label: "No lo sé con certeza", points: 1 },
      { label: "No, nunca nos ha faltado nada para competir", points: 2 }
    ]
  },
  {
    id: "q5",
    text: "¿Cuántas personas trabajan hoy en tu empresa?",
    type: "choice",
    isScored: false,
    options: [
      { label: "1 a 10 personas" },
      { label: "11 a 50 personas" },
      { label: "51 a 200 personas" },
      { label: "Más de 200 personas" }
    ]
  },
  {
    id: "q6",
    text: "¿En qué sector trabaja tu empresa?",
    type: "text",
    isScored: false
  },
  {
    id: "q7",
    text: "¿Tienes una fecha límite o una oportunidad concreta (licitación, cliente nuevo, renovación) que dependa de esto?",
    type: "choice",
    isScored: false,
    options: [
      { label: "Sí, hay una urgencia o fecha límite clara" },
      { label: "No, solo quiero prepararme con tiempo" }
    ]
  },
  {
    id: "q8",
    text: "¿Qué te gustaría lograr primero?",
    type: "choice",
    isScored: false,
    options: [
      { label: "Ordenar mis procesos" },
      { label: "Certificarme en una norma" },
      { label: "Prepararme para una auditoría o licitación puntual" }
    ]
  }
];

export function DiagnosticForm() {
  const { settings } = useSettings();
  const [questions, setQuestions] = useState<Question[]>(defaultDiagnosticQuestions);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [step, setStep] = useState("start"); // start, questions, form, result
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [textAnswer, setTextAnswer] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    whatsappCode: "+57",
    customWhatsappCode: "",
    whatsapp: "",
    termsAccepted: false
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const snapshot = await getDocs(collection(db, "diagnosticQuestions"));
        if (!snapshot.empty) {
          const data: any[] = [];
          snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
          });
          data.sort((a, b) => (a.order || 0) - (b.order || 0));
          setQuestions(data);
        }
      } catch (error) {
        console.error("Error fetching diagnostic questions:", error);
      } finally {
        setLoadingQuestions(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleChoiceAnswer = (option: Option) => {
    if (questions[currentQ].isScored && option.points !== undefined) {
      setScore(s => s + option.points!);
    }
    
    saveAnswerAndProceed(option.label);
  };

  const handleTextAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textAnswer.trim()) return;
    saveAnswerAndProceed(textAnswer.trim());
    setTextAnswer("");
  };

  const saveAnswerAndProceed = (answerText: string) => {
    setAnswers(prev => [...prev, {
      question: questions[currentQ].text,
      answer: answerText
    }]);

    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setStep("form");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) return;

    setIsSubmitting(true);
    
    try {
      const result = getResult();
      
      const diagnosticData = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        whatsapp: `${formData.whatsappCode === 'otro' ? formData.customWhatsappCode : formData.whatsappCode}${formData.whatsapp}`,
        termsAccepted: formData.termsAccepted,
        score: score,
        maxScore: 8,
        resultLevel: result.level,
        answers: answers,
        createdAt: new Date().toISOString(),
        status: "new"
      };

      await addDoc(collection(db, "diagnostics"), diagnosticData);
      
      setStep("result");
    } catch (error) {
      console.error("Error saving diagnostic: ", error);
      alert("Hubo un error al guardar tu diagnóstico. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getResult = () => {
    if (score <= 2) return { 
      level: "Nivel Reactiva", 
      desc: "Según tus respuestas, tu empresa está en nivel Reactiva. Hoy seguramente resuelves el día a día apagando incendios, sin un sistema que te sostenga si llega una auditoría o un cliente grande a exigir orden. La buena noticia es que este es exactamente el punto donde empieza La Ruta MYAH: con una Radiografía clara de cómo opera tu empresa hoy, para saber qué ordenar primero."
    };
    if (score <= 4) return { 
      level: "Nivel Organizada", 
      desc: "Según tus respuestas, tu empresa está en nivel Organizada. Ya tienes algo de estructura, pero seguramente dispersa: procesos que existen a medias, o que dependen de que la persona correcta esté ese día. El siguiente paso de La Ruta MYAH es el de Orden: dejar tus procesos documentados y estandarizados, para que tu empresa funcione igual de bien la tengas presente o no."
    };
    if (score <= 6) return { 
      level: "Nivel Preparada", 
      desc: "Según tus respuestas, tu empresa está en nivel Preparada. Ya tienes bases sólidas: procesos que existen y funcionan. Lo que falta es formalizar ese trabajo con una certificación oficial y blindarlo frente a una auditoría real, sin sorpresas de última hora. El siguiente paso de La Ruta MYAH es el de Preparación: implementar los requisitos exactos de la norma que tu empresa necesita y llegar sin miedo a la auditoría de certificación."
    };
    return { 
      level: "Nivel Competitiva", 
      desc: "Según tus respuestas, tu empresa está en nivel Competitiva. Ya tienes procesos en orden y probablemente una certificación vigente — estás muy por delante de la mayoría de las empresas de tu sector. El siguiente paso de La Ruta MYAH es el de Competitividad: usar ese orden como ventaja real para ganar licitaciones y cerrar contratos con clientes grandes."
    };
  };

  const getWhatsAppLink = (level: string) => {
    let msg = `Hola, acabo de completar el diagnóstico empresarial.

*Mis Resultados:*
- Nombre: ${formData.name}
- Empresa: ${formData.company}
- Correo: ${formData.email}
- Teléfono: ${formData.whatsappCode === 'otro' ? formData.customWhatsappCode : formData.whatsappCode}${formData.whatsapp}
- Puntaje: ${score}/${questions.filter(q => q.isScored).length * 2}
- Nivel de Madurez: *${level}*

Me gustaría agendar una asesoría para saber por dónde empezar.`;
    return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const resetForm = () => {
    setStep("start");
    setScore(0);
    setCurrentQ(0);
    setAnswers([]);
    setFormData({
      name: "",
      company: "",
      email: "",
      whatsappCode: "+57",
      customWhatsappCode: "",
      whatsapp: "",
      termsAccepted: false
    });
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="diagnostico">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-card backdrop-blur-xl rounded-3xl shadow-2xl border border-border p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            {step === "start" && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Diagnóstico Express de Madurez Empresarial</h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Responde 8 preguntas rápidas y descubre en qué nivel se encuentra tu empresa: Reactiva, Organizada, Preparada o Competitiva.
                </p>
                <button 
                  onClick={() => setStep("questions")}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-slate-900 font-bold hover:bg-accent-hover transition-all shadow-lg hover:-translate-y-1 gap-2"
                >
                  Empezar Diagnóstico <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {step === "questions" && (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <div className="mb-8">
                  <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
                    <span>Pregunta {currentQ + 1} de {questions.length}</span>
                    <span>{Math.round(((currentQ) / questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQ) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
                  {questions[currentQ].text}
                </h3>

                {questions[currentQ].type === "choice" ? (
                  <div className="grid grid-cols-1 gap-4">
                    {questions[currentQ].options?.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => handleChoiceAnswer(opt)}
                        className="group p-5 rounded-2xl border-2 border-border hover:border-accent hover:bg-accent/5 transition-all text-left font-medium text-foreground flex items-center justify-between gap-4"
                      >
                        <span>{opt.label}</span>
                        <ArrowRight className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" size={20}/>
                      </button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleTextAnswerSubmit} className="flex flex-col gap-4 max-w-lg mx-auto">
                    <input 
                      autoFocus
                      type="text" 
                      value={textAnswer}
                      onChange={e => setTextAnswer(e.target.value)}
                      placeholder="Escribe tu respuesta aquí..."
                      className="w-full px-6 py-4 rounded-2xl bg-background border-2 border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-lg"
                    />
                    <button 
                      type="submit"
                      disabled={!textAnswer.trim()}
                      className="w-full py-4 rounded-xl bg-accent text-slate-900 font-bold hover:bg-accent-hover transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Continuar <ArrowRight size={20} />
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-2">¡Diagnóstico completado!</h3>
                <p className="text-muted-foreground mb-8">Ingresa tus datos para ver tu resultado y recibir recomendaciones personalizadas.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto text-left">
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Nombre completo" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                  <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Nombre de tu empresa" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}" title="Debe ser un correo válido (ej. usuario@dominio.com)" placeholder="Correo electrónico" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                  <div className="flex gap-2">
                    <select value={formData.whatsappCode} onChange={e => setFormData({...formData, whatsappCode: e.target.value})} className={`px-2 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all cursor-pointer ${formData.whatsappCode === 'otro' ? 'w-[80px]' : 'w-[110px]'}`}>
                      <option value="+57">🇨🇴 +57</option>
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+51">🇵🇪 +51</option>
                      <option value="+56">🇨🇱 +56</option>
                      <option value="+54">🇦🇷 +54</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="otro">Otro</option>
                    </select>
                    {formData.whatsappCode === "otro" && (
                      <input 
                        required 
                        type="text" 
                        value={formData.customWhatsappCode}
                        onChange={e => setFormData({...formData, customWhatsappCode: e.target.value})} 
                        placeholder="+XX" 
                        className="w-[70px] px-2 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      />
                    )}
                    <input required type="tel" value={formData.whatsapp} pattern="[0-9]*" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} onChange={e => setFormData({...formData, whatsapp: e.target.value})} placeholder="WhatsApp" className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                  </div>
                  
                  <div className="flex items-start gap-3 mt-4 mb-6">
                    <input 
                      type="checkbox" 
                      id="terms"
                      required
                      checked={formData.termsAccepted}
                      onChange={e => setFormData({...formData, termsAccepted: e.target.checked})}
                      className="mt-1 w-4 h-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      Autorizo el tratamiento de mis datos personales para ser contactado por llamadas, WhatsApp o correo electrónico con el fin de recibir los resultados y recomendaciones.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !formData.termsAccepted}
                    className="w-full py-4 flex items-center justify-center gap-2 rounded-xl bg-accent text-slate-900 font-bold hover:bg-accent-hover transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="animate-spin" size={20} /> Procesando...</>
                    ) : (
                      "Ver mi resultado"
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {step === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-semibold text-sm mb-6 border border-accent/30">
                  Tu Nivel de Madurez
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">{getResult().level}</h3>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                  {getResult().desc}
                </p>
                
                <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 max-w-lg mx-auto shadow-sm text-center">
                  <h4 className="text-xl font-bold text-foreground mb-6 flex items-center justify-center gap-2">
                    ¿Cuál es el siguiente paso?
                  </h4>
                  <a 
                    href={getWhatsAppLink(getResult().level)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setTimeout(resetForm, 500)}
                    className="w-full py-4 px-6 inline-flex items-center justify-center gap-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-all shadow-lg hover:-translate-y-1"
                  >
                    Hablar por WhatsApp con mi resultado
                  </a>
                  
                  <button 
                    onClick={resetForm}
                    className="w-full mt-4 py-4 px-6 inline-flex items-center justify-center gap-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-bold transition-all"
                  >
                    Volver a hacer el diagnóstico
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
