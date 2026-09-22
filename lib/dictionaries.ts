export const dictionaries = {
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      about: "Nosotros",
      store: "Tienda",
      blog: "Blog",
      contact: "Consultoría"
    },
    hero: {
      badge: "Consultoría en gestión, cumplimiento y competitividad empresarial",
      title: "Tu empresa no necesita otra norma en la pared.",
      titleHighlight: "Necesita estar lista para ganar.",
      description: "Organizamos tu gestión, te certificamos donde lo necesites y preparamos tu empresa para competir por los contratos y oportunidades que hoy se te están escapando.",
      ctaPrimary: "Hacer mi diagnóstico gratis",
      ctaSecondary: "Ver cómo trabajamos",
      indicator1: "Especialistas en Sistemas Integrados de Gestión (HSEQ)",
      indicator2: "Experiencia en ISO 9001, 14001, 45001, 27001 y 37001",
      indicator3: "Bogotá, Colombia"
    },
    services: {
      tag: "¿Qué necesita tu empresa hoy?",
      title: "Servicios de MYAH Consulting agrupados por lo que quieres lograr",
      subtitle: "Te acompañamos en cada etapa de la implementación y auditoría de sistemas integrados de gestión.",
      learnMore: "Ver detalles",
      items: [
        {
          id: "certificacion",
          title: "Certificación ISO y esquemas sectoriales",
          subtitle: "ISO 9001 · 14001 · 45001 · 27001 · 37001 · 42001 · RUC · NORSOK",
          problem: "Existen muchas normas y esquemas de certificación —ISO, RUC, NORSOK— y no sabes cuál necesita realmente tu empresa o tu sector.",
          solution: "Identificamos qué certificación aplica a tu industria e implementamos el sistema completo, desde el diagnóstico hasta la auditoría.",
          benefit: "Sabes exactamente qué certificación necesitas y la consigues más rápido, con documentación de calidad desde el primer borrador.",
          table: {
            title: "¿CUÁL NECESITA EL CLIENTE?",
            headers: ["Norma / esquema", "Para qué sirve"],
            rows: [
              { norm: "ISO 9001", purpose: "Gestión de calidad" },
              { norm: "ISO 14001", purpose: "Gestión ambiental" },
              { norm: "ISO 45001", purpose: "Seguridad y salud en el trabajo" },
              { norm: "ISO 27001", purpose: "Seguridad de la información" },
              { norm: "ISO 37001", purpose: "Antisoborno" },
              { norm: "ISO 42001", purpose: "Gestión de inteligencia artificial" },
              { norm: "RUC", purpose: "Evaluación HSE para proveedores (Consejo Colombiano de Seguridad)" },
              { norm: "NORSOK", purpose: "Estándar sectorial de hidrocarburos y energía" }
            ]
          },
          cta: "Quiero certificar mi empresa"
        },
        {
          id: "organizacion",
          title: "Organización y procesos",
          subtitle: "Documentación y roles",
          problem: "Todo funciona de manera informal y depende de que ciertas personas “sepan cómo se hace”.",
          solution: "Levantamiento y documentación de procesos, definición de roles y estructuración de gestión documental.",
          benefit: "Tu empresa puede operar y crecer sin depender de una sola persona.",
          cta: "Quiero poner en orden mi empresa"
        },
        {
          id: "auditoria",
          title: "Preparación para auditorías",
          subtitle: "Interna · seguimiento · certificación",
          problem: "Se acerca una auditoría y no sabes si tu empresa va a pasarla.",
          solution: "Auditoría interna previa, identificación y cierre de no conformidades, simulacro de auditoría.",
          benefit: "Llegas a la auditoría real sin sorpresas.",
          cta: "Quiero prepararme para mi auditoría"
        },
        {
          id: "cumplimiento",
          title: "Cumplimiento legal y de riesgo",
          subtitle: "Ley 1581 de 2012 · SAGRILAFT · ISO 37001",
          problem: "No sabes si tu empresa cumple con la protección de datos personales, la prevención de lavado de activos o los estándares antisoborno.",
          solution: "Diagnóstico normativo e implementación de políticas de tratamiento de datos, sistemas de autocontrol de riesgo (SAGRILAFT) y gestión antisoborno (ISO 37001).",
          benefit: "Reduces tu exposición legal, reputacional y financiera frente a clientes, aliados y autoridades.",
          cta: "Quiero cumplir sin riesgos"
        },
        {
          id: "licitaciones",
          title: "Preparación para licitar",
          subtitle: "Contratación pública y privada",
          problem: "Quieres participar en procesos de contratación, pero te faltan certificaciones y requisitos formales.",
          solution: "Diagnóstico de brechas frente a pliegos de condiciones típicos e implementación acelerada de los sistemas requeridos.",
          benefit: "Puedes presentarte a licitaciones que hoy no puedes tomar por falta de requisitos.",
          cta: "Quiero estar listo para licitar"
        },
        {
          id: "procesos",
          title: "Mejora de procesos y productividad",
          subtitle: "Indicadores y eficiencia",
          problem: "Las cosas funcionan, pero de manera ineficiente, con reprocesos y sin indicadores claros.",
          solution: "Análisis de procesos, mejora continua y definición de indicadores de gestión con herramientas como Bizagi y Process Maker.",
          benefit: "Menos reprocesos, más productividad y decisiones basadas en datos reales.",
          cta: "Quiero mejorar mis procesos"
        },
        {
          id: "ia-gestion",
          title: "Inteligencia artificial aplicada a la gestión",
          subtitle: "Nuevo",
          problem: "Tu equipo pierde horas revisando documentos e indicadores a mano, y los riesgos se detectan tarde.",
          solution: "Incorporamos herramientas de IA para automatizar el control documental, monitorear indicadores en tiempo real y anticipar no conformidades antes de una auditoría.",
          benefit: "Menos horas perdidas en tareas repetitivas, más tiempo para decisiones estratégicas.",
          cta: "Quiero llevar IA a mi gestión"
        },
        {
          id: "gamificacion",
          title: "Gamificación y formación empresarial",
          subtitle: "Nuevo",
          problem: "Las capacitaciones en SG-SST, calidad o cultura organizacional se sienten obligatorias y se olvidan rápido.",
          solution: "Diseñamos formación gamificada — retos, niveles, insignias — para que tu equipo aprenda y aplique lo aprendido sobre calidad, seguridad y procesos.",
          benefit: "Mayor retención del conocimiento y un equipo que participa en vez de solo asistir.",
          cta: "Quiero formar a mi equipo de otra forma"
        },
        {
          id: "plantillas-ia",
          title: "Plantillas y documentación con IA",
          subtitle: "Nuevo",
          problem: "Redactar manuales, procedimientos y formatos desde cero consume semanas de trabajo y muchas veces termina pareciendo copiado de internet.",
          solution: "Generamos y ajustamos con inteligencia artificial la documentación base de tu sistema de gestión —manuales, procedimientos, formatos, matrices— adaptada al lenguaje y la realidad de tu empresa.",
          benefit: "Tienes un punto de partida sólido en días, no en semanas, y tu equipo dedica el tiempo a implementar, no a redactar.",
          cta: "Quiero mis plantillas con IA"
        },
        {
          id: "mentorias",
          title: "Mentorías virtuales ISO",
          subtitle: "Sesiones en línea",
          problem: "Necesitas resolver dudas puntuales sobre tu sistema de gestión, pero no siempre tiene sentido contratar una consultoría completa.",
          solution: "Sesiones de mentoría virtual, individuales o por equipo, para resolver dudas específicas de implementación, interpretación de la norma o preparación de auditoría directamente con un consultor.",
          benefit: "Avanzas con acompañamiento experto al ritmo de tu empresa, sin depender de un proyecto largo.",
          cta: "Quiero agendar una mentoría"
        }
      ]
    },
    profile: {
      tag: "Perfil Profesional",
      title: "Liderazgo con Experiencia",
      role: "CEO & Fundadora",
      description: "Administradora de Empresas especializada en Sistemas Integrados de Gestión (HSEQ). Ha liderado procesos de auditoría interna, optimización y planeación estratégica como coordinadora de calidad, y hoy pone ese conocimiento al servicio de empresas que quieren dejar de operar en el caos y empezar a competir en serio.",
      skills: [
        {
          title: "Experta en Calidad y HSEQ",
          desc: "Auditoría interna integral, optimización de procesos y planeación estratégica."
        },
        {
          title: "Administración de Herramientas",
          desc: "ISOLUCION, KAWAK, Microsoft Visio, Bizagi y Process Maker."
        },
        {
          title: "Docencia y Capacitación",
          desc: "Experiencia en modalidad virtual y presencial impartiendo gestión documental y habilidades blandas."
        }
      ]
    },
    footer: {
      description: "Ayudamos a empresas a organizar su gestión, certificarse y prepararse para competir por más oportunidades de negocio. La norma es el medio; tu crecimiento es el objetivo.",
      quickLinks: "Enlaces Rápidos",
      isoNorms: "¿Qué necesitas lograr?",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
      privacy: "Políticas de Privacidad",
      terms: "Términos de Servicio"
    },
    whatsapp: {
      tooltip: "¿En qué podemos ayudarte?",
      message: "¡Hola! 👋 Soy del equipo de MYAH Consulting. Para orientarte mejor y más rápido, cuéntame: ¿qué necesita tu empresa hoy?\n\n1️⃣ Certificarme en una norma ISO\n2️⃣ Organizar mis procesos\n3️⃣ Prepararme para una auditoría\n4️⃣ Cumplir con protección de datos / SAGRILAFT / antisoborno\n5️⃣ Prepararme para licitar\n6️⃣ Otro tema"
    }
  }
};

export type Language = 'es';
export type Dictionary = typeof dictionaries.es;
