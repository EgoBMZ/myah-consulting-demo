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
      isoNorms: "Normas ISO",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
      privacy: "Políticas de Privacidad",
      terms: "Términos de Servicio"
    },
    whatsapp: {
      tooltip: "¿En qué podemos ayudarte?",
      message: "¡Hola! 👋 Soy del equipo de MYAH Consulting. Para orientarte mejor y más rápido, cuéntame: ¿qué necesita tu empresa hoy?\n\n1️⃣ Certificarme en una norma ISO\n2️⃣ Organizar mis procesos\n3️⃣ Prepararme para una auditoría\n4️⃣ Cumplir con protección de datos / SAGRILAFT / antisoborno\n5️⃣ Prepararme para licitar\n6️⃣ Otro tema"
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About Us",
      store: "Store",
      blog: "Blog",
      contact: "Consulting"
    },
    hero: {
      badge: "Consulting in management, compliance, and business competitiveness",
      title: "Your company doesn't need another standard on the wall.",
      titleHighlight: "It needs to be ready to win.",
      description: "We organize your management, certify you where you need it, and prepare your company to compete for contracts and opportunities that are currently slipping away.",
      ctaPrimary: "Get my free diagnosis",
      ctaSecondary: "See how we work",
      indicator1: "Specialists in Integrated Management Systems (HSEQ)",
      indicator2: "Experience in ISO 9001, 14001, 45001, 27001 and 37001",
      indicator3: "Bogotá, Colombia"
    },
    services: {
      tag: "What does your company need today?",
      title: "MYAH Consulting services grouped by your goals",
      subtitle: "We accompany you at every stage of the implementation and audit of integrated management systems.",
      learnMore: "See details",
      items: [
        {
          id: "certificacion",
          title: "ISO Certification and sectoral schemes",
          subtitle: "ISO 9001 · 14001 · 45001 · 27001 · 37001 · 42001 · RUC · NORSOK",
          problem: "There are many standards and certification schemes—ISO, RUC, NORSOK—and you don't know which one your company or sector really needs.",
          solution: "We identify which certification applies to your industry and implement the complete system, from diagnosis to audit.",
          benefit: "You know exactly what certification you need and you get it faster, with quality documentation from the first draft.",
          table: {
            title: "WHICH ONE DOES THE CLIENT NEED?",
            headers: ["Standard / scheme", "What it is for"],
            rows: [
              { norm: "ISO 9001", purpose: "Quality management" },
              { norm: "ISO 14001", purpose: "Environmental management" },
              { norm: "ISO 45001", purpose: "Occupational health and safety" },
              { norm: "ISO 27001", purpose: "Information security" },
              { norm: "ISO 37001", purpose: "Anti-bribery" },
              { norm: "ISO 42001", purpose: "Artificial intelligence management" },
              { norm: "RUC", purpose: "HSE evaluation for suppliers (Colombian Safety Council)" },
              { norm: "NORSOK", purpose: "Hydrocarbons and energy sectoral standard" }
            ]
          },
          cta: "I want to certify my company"
        },
        {
          id: "organizacion",
          title: "Organization and processes",
          subtitle: "Documentation and roles",
          problem: "Everything works informally and depends on certain people 'knowing how to do it'.",
          solution: "Process mapping and documentation, role definition, and document management structuring.",
          benefit: "Your company can operate and grow without depending on a single person.",
          cta: "I want to organize my company"
        },
        {
          id: "auditoria",
          title: "Audit preparation",
          subtitle: "Internal · follow-up · certification",
          problem: "An audit is approaching and you don't know if your company will pass it.",
          solution: "Prior internal audit, identification and closure of non-conformities, mock audit.",
          benefit: "You reach the real audit with no surprises.",
          cta: "I want to prepare for my audit"
        },
        {
          id: "cumplimiento",
          title: "Legal and risk compliance",
          subtitle: "Law 1581 of 2012 · SAGRILAFT · ISO 37001",
          problem: "You don't know if your company complies with personal data protection, money laundering prevention, or anti-bribery standards.",
          solution: "Regulatory diagnosis and implementation of data processing policies, risk self-control systems (SAGRILAFT), and anti-bribery management (ISO 37001).",
          benefit: "You reduce your legal, reputational, and financial exposure to clients, allies, and authorities.",
          cta: "I want to comply without risks"
        },
        {
          id: "licitaciones",
          title: "Preparation for bidding",
          subtitle: "Public and private contracting",
          problem: "You want to participate in contracting processes, but you lack certifications and formal requirements.",
          solution: "Gap diagnosis against typical specifications and accelerated implementation of the required systems.",
          benefit: "You can bid for contracts that you cannot take today due to lack of requirements.",
          cta: "I want to be ready to bid"
        },
        {
          id: "procesos",
          title: "Process and productivity improvement",
          subtitle: "Indicators and efficiency",
          problem: "Things work, but inefficiently, with rework and no clear indicators.",
          solution: "Process analysis, continuous improvement, and definition of management indicators with tools like Bizagi and Process Maker.",
          benefit: "Less rework, more productivity, and decisions based on real data.",
          cta: "I want to improve my processes"
        },
        {
          id: "ia-gestion",
          title: "Artificial intelligence applied to management",
          subtitle: "New",
          problem: "Your team wastes hours reviewing documents and indicators manually, and risks are detected late.",
          solution: "We incorporate AI tools to automate document control, monitor indicators in real time, and anticipate non-conformities before an audit.",
          benefit: "Fewer hours wasted on repetitive tasks, more time for strategic decisions.",
          cta: "I want to bring AI to my management"
        },
        {
          id: "gamificacion",
          title: "Gamification and corporate training",
          subtitle: "New",
          problem: "Training in OSH, quality, or organizational culture feels mandatory and is quickly forgotten.",
          solution: "We design gamified training —challenges, levels, badges— so your team learns and applies what they learned about quality, safety, and processes.",
          benefit: "Greater knowledge retention and a team that participates instead of just attending.",
          cta: "I want to train my team differently"
        },
        {
          id: "plantillas-ia",
          title: "AI Templates and documentation",
          subtitle: "New",
          problem: "Writing manuals, procedures, and formats from scratch takes weeks of work and often ends up looking copied from the internet.",
          solution: "We generate and adjust with AI the base documentation of your management system—manuals, procedures, formats, matrices—adapted to your company's language and reality.",
          benefit: "You have a solid starting point in days, not weeks, and your team spends time implementing, not writing.",
          cta: "I want my AI templates"
        },
        {
          id: "mentorias",
          title: "ISO virtual mentoring",
          subtitle: "Online sessions",
          problem: "You need to resolve specific doubts about your management system, but it doesn't always make sense to hire full consulting.",
          solution: "Virtual mentoring sessions, individual or by team, to resolve specific doubts about implementation, standard interpretation, or audit preparation directly with a consultant.",
          benefit: "You progress with expert guidance at your company's pace, without depending on a long project.",
          cta: "I want to schedule a mentoring session"
        }
      ]
    },
    profile: {
      tag: "Professional Profile",
      title: "Leadership with Experience",
      role: "CEO & Founder",
      description: "Business Administrator specialized in Integrated Management Systems (HSEQ). Has led internal audit processes, optimization, and strategic planning as a quality coordinator, and today puts that knowledge at the service of companies that want to stop operating in chaos and start competing seriously.",
      skills: [
        {
          title: "Expert in Quality and HSEQ",
          desc: "Comprehensive internal audit, process optimization, and strategic planning."
        },
        {
          title: "Tool Administration",
          desc: "ISOLUCION, KAWAK, Microsoft Visio, Bizagi, and Process Maker."
        },
        {
          title: "Teaching and Training",
          desc: "Experience in virtual and face-to-face modalities teaching document management and soft skills."
        }
      ]
    },
    footer: {
      description: "We help companies organize their management, get certified, and prepare to compete for more business opportunities. The standard is the means; your growth is the goal.",
      quickLinks: "Quick Links",
      isoNorms: "ISO Standards",
      contact: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    whatsapp: {
      tooltip: "How can we help you?",
      message: "Hello! 👋 I'm from the MYAH Consulting team. To guide you better and faster, tell me: what does your company need today?\n\n1️⃣ Get certified in an ISO standard\n2️⃣ Organize my processes\n3️⃣ Prepare for an audit\n4️⃣ Comply with data protection / SAGRILAFT / anti-bribery\n5️⃣ Prepare to bid\n6️⃣ Other topic"
    }
  }
};

export type Language = 'es' | 'en';
export type Dictionary = typeof dictionaries.es;
