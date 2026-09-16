"use client";

import { useState } from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState("");

  const faqs = [
    {
      q: "¿Cuánto tiempo toma certificar mi empresa?",
      a: "Depende del tamaño y madurez actual de tus procesos, pero típicamente un proyecto de implementación desde cero toma entre 4 y 6 meses. Si ya tienes bases, podemos acelerar el proceso."
    },
    {
      q: "Mi empresa es pequeña, ¿necesito una norma ISO?",
      a: "Las normas ISO no son exclusivas para grandes corporaciones. De hecho, certificar una empresa pequeña es la forma más rápida de nivelar el campo de juego y competir por contratos que antes parecían inalcanzables."
    },
    {
      q: "Tenemos un sistema ISO antiguo que nadie usa, ¿pueden ayudar?",
      a: "Sí. Es lo que llamamos 'sistemas de papel'. Hacemos una reingeniería para actualizarlo, simplificarlo usando herramientas tecnológicas y hacer que realmente funcione para la empresa, no al revés."
    },
    {
      q: "¿Tienen cobertura fuera de Bogotá?",
      a: "Sí. Nuestro equipo está basado en Bogotá, pero contamos con metodologías de consultoría y auditoría virtual que nos permiten atender empresas en toda Colombia y Latinoamérica."
    },
    {
      q: "¿Qué pasa si no pasamos la auditoría de certificación?",
      a: "Nuestra metodología incluye una auditoría interna rigurosa y un simulacro antes de la auditoría final. Esto garantiza que llegues 100% preparado. Tenemos un porcentaje de éxito total con nuestros clientes."
    },
    {
      q: "¿Ustedes me venden el software (KAWAK/ISOLUCION)?",
      a: "No vendemos licencias de software, pero somos administradores expertos de estas plataformas. Si ya tienes una, te enseñamos a exprimirla al máximo. Si no, te asesoramos para elegir la mejor según tu presupuesto."
    }
  ];

  const diagnosticQuestions = [
    {
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
      text: "¿Cuántas personas trabajan hoy en tu empresa?",
      type: "choice",
      isScored: false,
      options: [
        { label: "1 a 10 personas", points: 0 },
        { label: "11 a 50 personas", points: 0 },
        { label: "51 a 200 personas", points: 0 },
        { label: "Más de 200 personas", points: 0 }
      ]
    },
    {
      text: "¿En qué sector trabaja tu empresa?",
      type: "text",
      isScored: false,
      options: []
    },
    {
      text: "¿Tienes una fecha límite o una oportunidad concreta (licitación, cliente nuevo, renovación) que dependa de esto?",
      type: "choice",
      isScored: false,
      options: [
        { label: "Sí, hay una urgencia o fecha límite clara", points: 0 },
        { label: "No, solo quiero prepararme con tiempo", points: 0 }
      ]
    },
    {
      text: "¿Qué te gustaría lograr primero?",
      type: "choice",
      isScored: false,
      options: [
        { label: "Ordenar mis procesos", points: 0 },
        { label: "Certificarme en una norma", points: 0 },
        { label: "Prepararme para una auditoría o licitación puntual", points: 0 }
      ]
    }
  ];

  const appSettings = {
    whatsappNumber: "573173788220",
    footerEmail: "contacto@myahconsulting.com",
    footerPhone: "+57 317 378 8220",
    footerAddress: "Bogotá, Colombia",
    socialFacebook: "https://www.facebook.com/people/MYAH-Consulting/100067957115397/",
    socialInstagram: "https://www.instagram.com/myahconsulting?igsh=MXVhc3B0Ym50MTMyMA%3D%3D",
    socialLinkedIn: "https://www.linkedin.com/in/myah-consulting-70976a200",
  };

  const handleSeed = async () => {
    setLoading(true);
    setLog("Starting seed...\n");
    try {
      setLog((l) => l + "Seeding faqs...\n");
      for (let i = 0; i < faqs.length; i++) {
        await addDoc(collection(db, "faqs"), { ...faqs[i], order: i + 1 });
      }

      setLog((l) => l + "Seeding diagnosticQuestions...\n");
      for (let i = 0; i < diagnosticQuestions.length; i++) {
        await addDoc(collection(db, "diagnosticQuestions"), { ...diagnosticQuestions[i], order: i + 1 });
      }

      setLog((l) => l + "Seeding appSettings...\n");
      await setDoc(doc(db, "appSettings", "global"), appSettings);

      setLog((l) => l + "Done seeding!\n");
    } catch (e: any) {
      setLog((l) => l + "Error: " + e.message + "\n");
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Seed Database</h1>
      <button 
        onClick={handleSeed} 
        disabled={loading}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
      >
        {loading ? "Seeding..." : "Run Seed"}
      </button>
      <pre className="mt-4 p-4 bg-muted rounded-lg whitespace-pre-wrap">{log}</pre>
    </div>
  );
}
