"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

const questions = [
  "¿Tienes procesos documentados que todos siguen?",
  "¿Conoces tus principales riesgos legales y operativos?",
  "¿Estás preparado para una auditoría sorpresa hoy?",
  "¿Mides la satisfacción de tus clientes de forma sistemática?",
  "¿Tienes un plan de mejora continua activo?",
  "¿Tus empleados conocen y aplican las políticas de seguridad?",
  "¿Cumples con la normativa de protección de datos (Ley 1581)?",
  "¿Tienes certificaciones que te permitan participar en grandes licitaciones?"
];

export function DiagnosticForm() {
  const [step, setStep] = useState("start"); // start, questions, form, result
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (yes: boolean) => {
    if (yes) setScore(s => s + 1);
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setStep("form");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("result");
  };

  const getResult = () => {
    if (score <= 2) return { level: "Empresa Reactiva", desc: "Operas apagando incendios. Necesitas orden urgente." };
    if (score <= 4) return { level: "Empresa Organizada", desc: "Tienes bases, pero dependes de personas, no de sistemas." };
    if (score <= 6) return { level: "Empresa Preparada", desc: "Estás listo para dar el siguiente paso hacia la certificación." };
    return { level: "Empresa Competitiva", desc: "Tienes un sistema maduro. Es hora de ganar grandes contratos." };
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
                  {questions[currentQ]}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleAnswer(true)}
                    className="p-6 rounded-2xl border-2 border-border hover:border-accent hover:bg-accent/5 transition-all text-lg font-semibold text-foreground flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="text-accent" /> Sí
                  </button>
                  <button 
                    onClick={() => handleAnswer(false)}
                    className="p-6 rounded-2xl border-2 border-border hover:border-destructive hover:bg-destructive/5 transition-all text-lg font-semibold text-foreground flex items-center justify-center gap-2"
                  >
                    No
                  </button>
                </div>
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
                  <input required type="text" placeholder="Nombre completo" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                  <input required type="text" placeholder="Nombre de tu empresa" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                  <input required type="email" placeholder="Correo electrónico" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                  <input required type="tel" placeholder="WhatsApp" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                  <button type="submit" className="w-full py-4 rounded-xl bg-accent text-slate-900 font-bold hover:bg-accent-hover transition-all shadow-lg mt-4">
                    Ver mi resultado
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
                <p className="text-xl text-muted-foreground mb-10 max-w-lg mx-auto">{getResult().desc}</p>
                
                <a href="#contacto" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-1 gap-2">
                  Agendar asesoría gratuita <ArrowRight size={20} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
