// Fuente única de verdad del bot. El copy viene de Services.tsx, Process.tsx
// y Portfolio.tsx: si cambias el sitio, actualiza esto también.

export const krea = {
  nombre: "Krea Studios",
  descripcion: "Sitios web y automatización con IA para negocios que quieren vender más.",
  ubicacion:
    "Guadalajara, Jalisco. Trabajamos 100% en línea con clientes de todo México y de otros países; en Guadalajara también podemos vernos en persona.",
  contacto: {
    email: "hola@studioskrea.com",
    instagram: "https://www.instagram.com/studioskrea",
    sitio: "https://studioskrea.com",
  },
  primerPaso:
    "Una llamada gratis de 20-30 minutos para entender el negocio y recomendar lo que sí conviene. Sin compromiso.",
  servicios: [
    {
      nombre: "Sitios web que convierten",
      detalle: "Diseño y código a medida. Rápido en celular, listo para Google y pensado para que te escriban.",
    },
    {
      nombre: "Tiendas en línea que venden",
      detalle: "Catálogo claro y compra sencilla, sobre todo desde el celular.",
    },
    {
      nombre: "Identidad visual y marca",
      detalle: "Logo, colores y tipografía consistentes en tu sitio, tus redes y tu WhatsApp.",
    },
    {
      nombre: "Chatbots para WhatsApp e Instagram",
      detalle: "Contestan las preguntas de siempre en segundos, a cualquier hora. Este mismo chat es un ejemplo.",
    },
    {
      nombre: "Recordatorios y seguimiento",
      detalle: "Recordatorios automáticos de citas y seguimiento a cada prospecto. Menos faltas, menos leads olvidados.",
    },
    {
      nombre: "Respuesta a reseñas",
      detalle: "Cada reseña recibe respuesta a tiempo y con el tono de tu marca.",
    },
  ],
  proceso: [
    { paso: "Estrategia", detalle: "Entendemos tu negocio y vemos dónde pierdes clientes." },
    { paso: "Diseño", detalle: "Definimos el sitio, el flujo del chatbot o los dos, alineado a tu marca." },
    { paso: "Desarrollo", detalle: "Construimos el sitio y conectamos las automatizaciones." },
    { paso: "Lanzamiento", detalle: "Publicamos, revisamos cada detalle y lo dejamos listo para vender y atender." },
  ],
  portafolio: [
    {
      nombre: "EspaXio Inmobiliaria",
      tipo: "Landing page con catálogo de propiedades, chatbot y contacto por WhatsApp",
      url: "https://www.espaxioinmobiliaria.com/es",
    },
    {
      nombre: "World Cup Nights",
      tipo: "Sitio bilingüe de reservas para un party bus en Guadalajara 2026",
      url: "https://www.worldcupnights.lat/",
    },
    {
      nombre: "Luis Felipe IV",
      tipo: "Sitio personal para creador musical con buzón de canciones y newsletter",
      url: "https://www.luisfelipeiv.com/",
    },
    {
      nombre: "Landana",
      tipo: "Landing de fotografía y video aéreo con paquetes y precios",
      url: "https://landana-sky.vercel.app/",
    },
  ],
  // Precios en MXN. Son de referencia: el precio final se confirma en la llamada.
  // Modelo principal: 3 paquetes mensuales que ya incluyen el sitio web.
  paquetes: [
    {
      nombre: "Chispa",
      instalacion: "$2,500 MXN",
      mensualidad: "$1,500 MXN/mes",
      tiempo: "1-2 semanas",
      ideal: "Negocios que necesitan presencia profesional y no perder clientes por no contestar rápido.",
      incluye: [
        "Landing page a medida (versión móvil, SEO básico, botón de WhatsApp y formulario)",
        "Chatbot de WhatsApp o Instagram (uno de los dos): preguntas frecuentes, horarios y precios, y pasa la conversación a una persona cuando hace falta",
        "Ficha de Google Maps configurada",
      ],
    },
    {
      nombre: "Corriente",
      instalacion: "$4,500 MXN",
      mensualidad: "$3,000 MXN/mes",
      tiempo: "2-3 semanas",
      ideal: "Negocios con citas o ventas constantes. Es el más popular.",
      incluye: [
        "Sitio web completo (hasta 6 secciones o páginas)",
        "Chatbot de WhatsApp e Instagram (los dos): agenda citas, cotiza y responde todo el catálogo",
        "Recordatorios automáticos de citas",
        "Seguimiento automático de prospectos",
        "Respuesta a reseñas de Google (borrador para que el negocio lo apruebe)",
        "Ficha de Google Maps y reporte mensual: conversaciones, citas agendadas y prospectos captados",
      ],
    },
    {
      nombre: "Voltaje",
      instalacion: "desde $7,000 MXN",
      mensualidad: "desde $4,500 MXN/mes",
      tiempo: "3-5 semanas",
      ideal: "Negocios con varios procesos que quieren automatizar a fondo.",
      incluye: [
        "Sitio web completo o tienda en línea",
        "Todo lo de Corriente",
        "Integración con su CRM o Notion",
        "Automatización del alta de clientes nuevos y de la facturación, si aplica",
        "Soporte prioritario y hasta 4 horas de ajustes al mes",
      ],
    },
  ],
  incluidoEnTodos:
    "Hosting, dominio gestionado, certificado de seguridad, respaldos, soporte por WhatsApp y cambios menores (textos, fotos, precios).",
  complementos: [
    { nombre: "Instagram además de WhatsApp en Chispa", precio: "+$700 MXN/mes" },
    { nombre: "Automatización extra", precio: "+$800 MXN/mes" },
    { nombre: "Identidad visual (logo, colores y tipografía)", precio: "desde $5,000 MXN (pago único)" },
  ],
  pagoUnico: {
    nota: "Opción para quien prefiere solo el sitio, sin mensualidad. Los chatbots y automatizaciones solo se ofrecen en los paquetes mensuales.",
    opciones: [
      { nombre: "Landing page", precio: "$8,500 MXN", tiempo: "1-2 semanas" },
      { nombre: "Sitio web completo", precio: "$16,000-24,000 MXN", tiempo: "2-4 semanas" },
      { nombre: "Tienda en línea", precio: "desde $22,000 MXN", tiempo: "3-5 semanas" },
    ],
    mantenimientoOpcional: "$600 MXN/mes (hosting, seguridad, respaldos y hasta 1 hora de cambios al mes)",
  },
  condiciones: [
    "Permanencia mínima de 12 meses en los paquetes mensuales. Por eso la instalación es baja.",
    "Si se cancela antes de los 12 meses, se paga lo que falta para cubrir el valor del sitio y el cliente se lo lleva.",
    "A partir de los 12 meses el sitio es 100% del cliente: puede quedarse o irse sin penalización.",
    "Pago anual por adelantado: 2 meses gratis.",
    "El dominio se registra a nombre del cliente y el contenido es suyo desde el primer día.",
  ],
  formasDePago: [
    "Instalación: se paga al empezar el proyecto.",
    "Mensualidad: se cobra por adelantado a partir del mes del lanzamiento.",
    "Pago único: 50% de anticipo y 50% al entregar. Desde $15,000 MXN se puede pagar en 3 partes (40/30/30).",
    "Transferencia o depósito. Si se requiere factura, se agrega IVA.",
    "Los mensajes que inicia el negocio por WhatsApp (por ejemplo, recordatorios) tienen un costo de Meta de centavos por mensaje, que se cobra aparte al costo, sin comisión.",
  ],
};
