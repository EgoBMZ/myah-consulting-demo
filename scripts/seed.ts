import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";
import * as dotenv from 'dotenv';
import path from 'path';

// Note: since this is a local script, we need to load env from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
      { label: "1 a 10 personas", points: 0 },
      { label: "11 a 50 personas", points: 0 },
      { label: "51 a 200 personas", points: 0 },
      { label: "Más de 200 personas", points: 0 }
    ]
  },
  {
    id: "q6",
    text: "¿En qué sector trabaja tu empresa?",
    type: "text",
    isScored: false,
    options: []
  },
  {
    id: "q7",
    text: "¿Tienes una fecha límite o una oportunidad concreta (licitación, cliente nuevo, renovación) que dependa de esto?",
    type: "choice",
    isScored: false,
    options: [
      { label: "Sí, hay una urgencia o fecha límite clara", points: 0 },
      { label: "No, solo quiero prepararme con tiempo", points: 0 }
    ]
  },
  {
    id: "q8",
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

async function seed() {
  console.log("Seeding FAQS...");
  for (let i = 0; i < faqs.length; i++) {
    await addDoc(collection(db, "faqs"), { ...faqs[i], order: i + 1 });
  }
  
  console.log("Seeding Questions...");
  for (let i = 0; i < diagnosticQuestions.length; i++) {
    await addDoc(collection(db, "diagnosticQuestions"), { ...diagnosticQuestions[i], order: i + 1 });
  }

  console.log("Seeding App Settings...");
  await setDoc(doc(db, "appSettings", "global"), appSettings);

  console.log("Done!");
  process.exit(0);
}

seed().catch(console.error);
