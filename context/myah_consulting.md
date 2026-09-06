# Contexto del Proyecto: Myah Consulting

## Perfil de la Empresa
- **Nombre:** Myah Consulting
- **Descripción:** Firma de consultoría empresarial y servicios profesionales.
- **Servicios y Áreas de Especialización:** Acompañamiento a empresas en la implementación y gestión de:
  - **Normas ISO:**
    - ISO 9001 (Calidad)
    - ISO 14001 (Medio Ambiente)
    - ISO 45001 (Seguridad y Salud en el Trabajo)
    - ISO 27001 (Seguridad de la Información)
  - **Mejora Continua:** Optimización de procesos, planeación estratégica y productividad empresarial.
- **Propuesta de Valor:** Brindar soluciones empresariales orientadas al cumplimiento de los objetivos de la organización del cliente, ayudando a mejorar procesos, aumentar competitividad e incrementar la productividad mediante asesorías, formación y capacitación.

## Especificaciones de la Plataforma Web
La plataforma web consistirá en una **Landing Page** moderna y autoadministrable, respaldada íntegramente por **Firebase** como backend. Esta página servirá como el punto central para exhibir los servicios y atraer clientes.

### Módulo de Blog
- **Gestión de Entradas:** Creación, edición, eliminación, ocultamiento temporal o permanente de los posts.
- **Edición de Contenido:** Se realizará a través de **campos específicos** (título, bajada, cuerpo, etc.) en lugar de usar lenguajes como Markdown, para mantenerlo simple e intuitivo.
- **Multimedia y Enlaces:** Capacidad de subir imágenes asociadas a cada publicación e insertar enlaces.
- **Interacción del Usuario:** Será de solo lectura. No se habilitarán los comentarios para los visitantes.

### Módulo de Tienda (Store)
- **Gestión de Productos:** Capacidad de crear, publicar, archivar y borrar productos o servicios.
- **Promociones:** Creación de ofertas especiales y generación de cupones de descuento.
- **Precios:** Modificación de precios de forma dinámica.
- **Pagos:** Sin pasarela de pagos integrada en la primera fase. Las compras y transacciones se cerrarán mediante un vínculo directo a **WhatsApp**.

### Módulo de Registro y Usuarios
- **Registro:** Los visitantes podrán registrarse en la plataforma para acceder a ofertas especiales, información exclusiva o una futura comunidad.
- **Gestión de Leads (Firebase):** Todo el registro quedará gestionado a nivel de base de datos. Se tendrá acceso a la lista de usuarios registrados e interesados para medir la interacción y construir una base de contactos sólida.

### Panel de Administración (Configuración General)
Interfaz completa que permitirá a la CEO customizar y editar de forma autónoma toda la información pública:
- **Visuales:** Logo de la empresa (Myah Consulting) y foto de perfil profesional.
- **Contacto:** Teléfonos, direcciones de correo electrónico.
- **Redes Sociales:** Enlaces a los perfiles oficiales.
