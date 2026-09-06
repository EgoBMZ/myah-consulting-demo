import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaMcE_G79-fcUuUVAarOE3ZoBMP6qNEFs",
  authDomain: "smartchef-b732f.firebaseapp.com",
  projectId: "smartchef-b732f",
  storageBucket: "smartchef-b732f.firebasestorage.app",
  messagingSenderId: "643527940662",
  appId: "1:643527940662:web:cd80f560cf057f98025697"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tiendaProducts = [
  {
    id: "certificacion",
    title: "Certificación ISO y Esquemas Sectoriales",
    description: "Implementación completa de normas ISO (9001, 14001, 45001, 27001, etc.) desde el diagnóstico hasta la certificación.",
    longDescription: "Identificamos qué certificación aplica a tu industria e implementamos el sistema completo. Desde el diagnóstico inicial hasta el acompañamiento durante la auditoría de certificación. Te garantizamos documentación de calidad, capacitación a tu equipo y cero complicaciones operativas.",
    price: "Desde $1,499 USD",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    features: ["Diagnóstico inicial detallado", "Documentación 100% personalizada", "Acompañamiento en auditoría de certificación"],
    status: "published",
    createdBy: "Admin"
  },
  {
    id: "organizacion",
    title: "Organización y Procesos",
    description: "Levantamiento y documentación de procesos para que tu empresa opere sin depender de una sola persona.",
    longDescription: "Si tu empresa funciona de manera informal y el conocimiento está centralizado en pocos empleados, este servicio es para ti. Levantamos y documentamos tus procesos, definimos roles claros y estructuramos una gestión documental que permita escalar tu negocio de manera ordenada.",
    price: "Cotizar Servicio",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    features: ["Mapeo de procesos end-to-end", "Manuales de funciones y perfiles", "Estandarización operativa"],
    status: "published",
    createdBy: "Admin"
  },
  {
    id: "auditoria",
    title: "Preparación para Auditorías",
    description: "Auditoría interna previa, identificación y cierre de no conformidades antes del evento real.",
    longDescription: "¿Se acerca tu auditoría de certificación o seguimiento y no te sientes listo? Realizamos un simulacro exhaustivo bajo los mismos criterios del ente certificador. Detectamos brechas, redactamos hallazgos y te ayudamos a cerrar las no conformidades para que vayas a la fija.",
    price: "Desde $599 USD",
    originalPrice: "$899 USD",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    features: ["Simulacro de auditoría real", "Informe detallado de brechas", "Plan de cierre de hallazgos"],
    status: "published",
    createdBy: "Admin"
  },
  {
    id: "cumplimiento",
    title: "Cumplimiento Legal y de Riesgo",
    description: "Diagnóstico normativo e implementación de protección de datos (Ley 1581) y SAGRILAFT.",
    longDescription: "Reduce tu exposición legal y financiera. Implementamos de manera ágil y práctica los requerimientos de la Ley de Protección de Datos Personales, Sistemas de Autocontrol y Gestión del Riesgo (SAGRILAFT), y marcos antisoborno (ISO 37001), blindando a tu empresa ante autoridades y clientes corporativos.",
    price: "Cotizar Servicio",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    features: ["Matriz de requisitos legales", "Políticas de tratamiento de datos", "Gestión de riesgos de cumplimiento"],
    status: "published",
    createdBy: "Admin"
  },
  {
    id: "licitaciones",
    title: "Preparación para Licitar",
    description: "Cierre de brechas y cumplimiento de requisitos para participar en contratación pública y privada.",
    longDescription: "Muchos negocios rentables se pierden por no cumplir con un papel o un indicador. Analizamos los pliegos de condiciones típicos de tu sector, identificamos qué te falta e implementamos de forma acelerada los sistemas y certificados necesarios para que puedas competir por esos contratos.",
    price: "Desde $899 USD",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    features: ["Análisis de pliegos sectoriales", "Implementación acelerada", "Revisión documental pre-licitación"],
    status: "published",
    createdBy: "Admin"
  },
  {
    id: "procesos",
    title: "Mejora de Procesos y Productividad",
    description: "Análisis de ineficiencias, mejora continua y definición de indicadores clave (KPIs).",
    longDescription: "Transformamos procesos lentos y con reprocesos en flujos de valor altamente eficientes. Implementamos metodologías ágiles, definimos indicadores de gestión reales y automatizamos pasos innecesarios usando herramientas BPM como Bizagi, logrando un impacto directo en tu rentabilidad.",
    price: "Cotizar Servicio",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    features: ["Análisis de cuellos de botella", "Definición de KPIs", "Modelado BPMN"],
    status: "published",
    createdBy: "Admin"
  },
  {
    id: "ia-gestion",
    title: "Inteligencia Artificial en Gestión",
    description: "Automatización de control documental y monitoreo con IA para sistemas de gestión.",
    longDescription: "No más horas perdidas actualizando Excel y persiguiendo firmas. Integramos herramientas de Inteligencia Artificial para el control documental, el análisis predictivo de riesgos y el monitoreo de indicadores en tiempo real. Tu equipo se enfocará en la estrategia, la IA en la operatividad.",
    price: "Desde $1,200 USD",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    features: ["Auditorías impulsadas por IA", "Análisis predictivo de calidad", "Automatización de registros"],
    status: "published",
    createdBy: "Admin"
  },
  {
    id: "gamificacion",
    title: "Gamificación Empresarial",
    description: "Capacitaciones en HSEQ, calidad y cultura organizacional mediante retos y juegos.",
    longDescription: "Las capacitaciones aburridas no generan cambio de comportamiento. Diseñamos módulos de formación interactiva y gamificada (niveles, insignias, misiones) para que tu equipo interiorice las normas de calidad, seguridad y salud en el trabajo de manera divertida y memorable.",
    price: "Desde $499 USD",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    features: ["Diseño de dinámicas HSEQ", "Plataforma de recompensas", "Mayor retención de aprendizaje"],
    status: "published",
    createdBy: "Admin"
  },
  {
    id: "plantillas-ia",
    title: "Plantillas y Documentación con IA",
    description: "Generación automatizada de manuales, procedimientos y formatos adaptados a tu empresa.",
    longDescription: "Redactar documentación desde cero es el cuello de botella de toda implementación. Utilizamos prompts especializados e IA para generar rápidamente el esqueleto de tu sistema de gestión (manuales, procedimientos, matrices) adaptado exactamente al contexto y lenguaje de tu empresa.",
    price: "$299 USD",
    originalPrice: "$450 USD",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
    features: ["Generación ultra rápida", "Adaptación al tono corporativo", "Estructura 100% auditable"],
    status: "published",
    createdBy: "Admin"
  },
  {
    id: "mentorias",
    title: "Mentorías Virtuales ISO",
    description: "Sesiones en línea de 1 o 2 horas para resolver dudas específicas sobre tu sistema.",
    longDescription: "Si ya estás implementando tu sistema pero te estancaste en un requisito de la norma, o necesitas una segunda opinión antes de una auditoría, agenda una mentoría. Te sientas virtualmente con un experto auditor líder para destrabar tu proceso de inmediato.",
    price: "$120 USD / Hora",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    features: ["Consultoría bajo demanda", "Auditor líder asignado", "Grabación de la sesión incluida"],
    status: "published",
    createdBy: "Admin"
  }
];

async function seed() {
  for (const product of tiendaProducts) {
    await setDoc(doc(db, "products", product.id), product);
    console.log(`Saved ${product.id}`);
  }
  console.log("Done");
  process.exit(0);
}

seed();
