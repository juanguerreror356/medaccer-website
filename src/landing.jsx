/* global React, Icons, ProblemVisual, EcosystemDiagram */

// ============================================================
// ESPECIALIDADES — data compartida (toda la landing se personaliza)
// Orden por prioridad de mercado (odonto = #1, oftalmo = #9)
// Cada especialidad tiene: headline propio, dolor real, propuesta única,
// número crítico, color de acento y demo de WhatsApp dedicado.
// ============================================================
const SPECIALTIES = [
  {
    id: 'odontologia',
    label: 'Odontología',
    icon: 'Smile',
    color: '#06B6D4', // cyan
    pronoun: 'tu consultorio dental',
    example: 'limpieza dental',
    examplePrice: '180.000',
    vocab: { pro: 'odontólogo(a)', patient: 'paciente', visit: 'cita' },
    headline: 'Su consultorio dental nunca duerme.',
    sub: 'MEDACCER recupera presupuestos abandonados, agenda controles de ortodoncia y genera RDA clínico mientras usted atiende.',
    pain: 'Presupuestos de $2-15M COP que el paciente abandona porque nadie le hace seguimiento.',
    valueProp: 'MEDACCER contacta automáticamente al paciente que no aceptó el tratamiento, le ofrece facilidades de pago y agenda la cita para arrancar.',
    bigNumber: { value: '$10.8M', label: 'COP/mes pierde un consultorio dental promedio en no-shows' },
    metric: '-52%', metricLabel: 'reducción típica de inasistencias',
    features: [
      { icon: 'FileText', t: 'Seguimiento de presupuestos', d: 'El bot retoma cotizaciones pendientes con el paciente y ofrece cuotas.' },
      { icon: 'Repeat', t: 'Recordatorios de fase 2', d: 'Endodoncias, ortodoncia, controles de implante — todo agendado solo.' },
      { icon: 'Mic', t: 'Notas clínicas por voz', d: 'Dictas 30s post-procedimiento; la IA estructura la HC y genera RDA.' },
      { icon: 'Shield', t: 'RDA Resolución 1888', d: 'Envío automático al MinSalud en formato HL7 FHIR R4.' },
    ],
    useCases: [
      'Agenda limpiezas, ortodoncia, endodoncia y urgencias',
      'Recuerda controles de ortodoncia cada 21 días',
      'Gestiona presupuestos y abonos de tratamientos largos',
    ],
  },
  {
    id: 'cirugia-plastica',
    label: 'Cirugía plástica',
    icon: 'Sparkles',
    color: '#EC4899', // magenta/rose
    pronoun: 'tu consultorio quirúrgico',
    example: 'rinoplastia',
    examplePrice: '12.500.000',
    vocab: { pro: 'cirujano(a)', patient: 'paciente', visit: 'cirugía' },
    headline: 'El seguimiento post-operatorio que salva reputaciones.',
    sub: 'Secuencias automáticas día 1, 3, 7, 15, 30, 90. Si el paciente reporta dolor anormal o envía una foto preocupante, MEDACCER lo escala al cirujano al instante.',
    pain: 'Un paciente insatisfecho post-cirugía puede destruir la reputación del cirujano en redes sociales. El seguimiento manual es imposible con 20+ pacientes en recuperación simultánea.',
    valueProp: 'MEDACCER envía secuencias post-quirúrgicas automáticas por procedimiento y detecta señales de alerta con IA — fotos, palabras clave, tonos de mensaje.',
    bigNumber: { value: '78%', label: 'de las demandas en cirugía plástica nacen por falta de comunicación post-operatoria' },
    metric: '−93%', metricLabel: 'tiempo manual de seguimiento',
    features: [
      { icon: 'Clock', t: 'Secuencias post-op por procedimiento', d: 'Rinoplastia, lipo, mamoplastia — cada uno con su protocolo.' },
      { icon: 'Image', t: 'Galería antes/después por paciente', d: 'Organizada por fecha y procedimiento. Compartible con consentimiento.' },
      { icon: 'AlertCircle', t: 'Detección de alertas con IA', d: 'Si la foto o el mensaje sugiere infección/seroma → alerta inmediata.' },
      { icon: 'Shield', t: 'Instrucciones pre-quirúrgicas', d: 'Confirmación de que el paciente entendió cada paso, día por día.' },
    ],
    useCases: [
      'Secuencias post-quirúrgicas día 1, 3, 7, 15, 30, 90',
      'Detección IA de fotos con señales de complicación',
      'Galería antes/después organizada por paciente',
    ],
  },
  {
    id: 'dermatologia',
    label: 'Dermatología',
    icon: 'Sun',
    color: '#F59E0B', // ámbar
    pronoun: 'tu consulta dermatológica',
    example: 'valoración de lunares',
    examplePrice: '180.000',
    vocab: { pro: 'dermatólogo(a)', patient: 'paciente', visit: 'valoración' },
    headline: 'Deje de recibir fotos de piel por WhatsApp sin contexto.',
    sub: 'Las fotos llegan organizadas a la ficha del paciente, con fecha y zona corporal. El bot responde con educación: "para evaluar su caso necesitamos consulta. ¿La agendo?"',
    pain: 'Los pacientes envían fotos a cualquier hora esperando diagnóstico gratis. El doctor no tiene cómo organizar ni cobrar.',
    valueProp: 'MEDACCER recibe las fotos, las indexa por paciente y zona corporal, y convierte la consulta gratis en cita pagada.',
    bigNumber: { value: '4 horas', label: 'a la semana pierde un dermatólogo respondiendo consultas no remuneradas por WhatsApp' },
    metric: '+38%', metricLabel: 'conversión foto → cita pagada',
    features: [
      { icon: 'Image', t: 'Indexación fotográfica', d: 'Cada foto va a la ficha del paciente con fecha y zona corporal.' },
      { icon: 'TrendingUp', t: 'Seguimiento de evolución', d: 'Mide el cambio de una lesión semana a semana sin esfuerzo.' },
      { icon: 'Bell', t: 'Recordatorios anuales', d: 'Mapeo corporal y controles de fotoenvejecimiento programados.' },
      { icon: 'DollarSign', t: 'Cobro inteligente', d: 'Convierte la consulta gratis en cita pagada con un mensaje educado.' },
    ],
    useCases: [
      'Recibe fotos de lesiones organizadas en la ficha',
      'Agenda mapeos corporales y tratamientos de acné',
      'Seguimiento post-procedimiento (láser, biopsias)',
    ],
  },
  {
    id: 'psicologia',
    label: 'Psicología',
    icon: 'Brain',
    color: '#8B5CF6', // violeta
    pronoun: 'tu consulta psicológica',
    example: 'sesión terapéutica',
    examplePrice: '130.000',
    vocab: { pro: 'psicólogo(a)', patient: 'paciente', visit: 'sesión' },
    headline: 'El espacio seguro entre sesiones.',
    sub: 'Check-ins empáticos, no corporativos. Reduce ansiedad pre-cita con normalización. Nunca almacena contenido clínico — solo lo administrativo.',
    pain: '40% de los pacientes cancela o no asiste por vergüenza, ansiedad o desmotivación. El terapeuta pierde ingresos y el paciente pierde progreso.',
    valueProp: 'MEDACCER envía check-ins entre sesiones con tono empático, calma la ansiedad pre-cita y nunca expone contenido clínico — solo administrativa.',
    bigNumber: { value: '$2.4M', label: 'COP/mes recupera un consultorio de 2 psicólogos al reducir cancelaciones 30%' },
    metric: '🔒 100%', metricLabel: 'confidencialidad clínica garantizada',
    privacyFirst: true,
    features: [
      { icon: 'Heart', t: 'Check-ins empáticos', d: '"¿Cómo se ha sentido esta semana?" — configurable y respetuoso.' },
      { icon: 'Mic', t: 'Notas de sesión por voz', d: 'Cifradas extremo a extremo. Solo accesibles para el terapeuta.' },
      { icon: 'Lock', t: 'Cero contenido clínico', d: 'Los recordatorios dicen "Cita con la Psi. Gómez", nada más.' },
      { icon: 'Calendar', t: 'Sesiones recurrentes', d: 'Semanales, quincenales, parejas, infantiles — sin recordatorio cruzado.' },
    ],
    useCases: [
      'Check-ins empáticos entre sesiones',
      'Recordatorios discretos, sin revelar motivo',
      'Cifrado extremo y confidencialidad total',
    ],
  },
  {
    id: 'nutricion',
    label: 'Nutrición',
    icon: 'Apple',
    color: '#10B981', // verde
    pronoun: 'tu consulta nutricional',
    example: 'plan alimentario',
    examplePrice: '150.000',
    vocab: { pro: 'nutricionista', patient: 'paciente', visit: 'consulta' },
    headline: 'Que su plan alimenticio no muera en el refrigerador.',
    sub: 'Check-ins semanales de adherencia. Reportes pre-control para que llegues a la consulta sabiendo cómo le fue al paciente esa semana.',
    pain: '70% de los pacientes abandona el plan después de 2 semanas. No hay seguimiento entre consultas.',
    valueProp: 'MEDACCER envía recordatorios personalizados, pregunta cómo va el paciente con el plan y reporta adherencia al nutricionista antes de cada control.',
    bigNumber: { value: '70%', label: 'de pacientes abandona el plan a las 2 semanas. MEDACCER baja esa cifra al 35%.' },
    metric: '×2', metricLabel: 'adherencia al plan vs. sin seguimiento',
    features: [
      { icon: 'CheckCircle', t: 'Check-in semanal de adherencia', d: 'Pregunta del fin de semana incluida — sin culpa, con apoyo.' },
      { icon: 'BarChart', t: 'Reporte pre-control', d: 'Llegas al control sabiendo cómo le fue al paciente esa quincena.' },
      { icon: 'Bell', t: 'Toma de suplementos', d: 'Recordatorios de magnesio, vitaminas y batidos a la hora exacta.' },
      { icon: 'Calendar', t: 'Controles automáticos', d: 'Quincenales o mensuales, agendados sin que tengas que hacer nada.' },
    ],
    useCases: [
      'Recordatorio diario de registro alimentario',
      'Reporte de adherencia antes de cada control',
      'Recordatorio de toma de suplementos',
    ],
  },
  {
    id: 'fisioterapia',
    label: 'Fisioterapia',
    icon: 'Activity',
    color: '#7C3AED', // púrpura
    pronoun: 'tu consulta de fisioterapia',
    example: 'sesión de terapia',
    examplePrice: '90.000',
    vocab: { pro: 'fisioterapeuta', patient: 'paciente', visit: 'sesión' },
    headline: 'Que su paciente no abandone en la sesión 4 de 20.',
    sub: 'Tracker de ejercicios en casa, barra de progreso visible al paciente, reporte de adherencia para el fisio.',
    pain: 'Tratamientos largos de 10-30 sesiones. 60% abandona antes de completar. Y no hacen ejercicios en casa.',
    valueProp: 'MEDACCER recuerda los ejercicios diarios, pregunta si los hizo y muestra al paciente su progreso visual: "lleva 8 de 20 sesiones (40%)".',
    bigNumber: { value: '60%', label: 'de pacientes abandona antes de completar el tratamiento. MEDACCER lo reduce al 22%.' },
    metric: '+38%', metricLabel: 'tasa de finalización del tratamiento',
    features: [
      { icon: 'CheckCircle', t: 'Tracker de ejercicios diarios', d: 'Botones rápidos: ✅ hechos, ⚠️ a medias, ❌ no pude.' },
      { icon: 'TrendingUp', t: 'Barra de progreso visible', d: 'El paciente ve su avance visualmente. La motivación sube.' },
      { icon: 'Bell', t: 'Recordatorio de cada sesión', d: '24h y 2h antes, con confirmación o reagendado en 1 mensaje.' },
      { icon: 'BarChart', t: 'Reporte de adherencia', d: 'Sabes antes de cada sesión cuánto cumplió en casa.' },
    ],
    useCases: [
      'Paquetes de 10 sesiones gestionados solos',
      'Tracker de ejercicios domiciliarios',
      'Evolución del dolor semana a semana',
    ],
  },
  {
    id: 'ginecologia',
    label: 'Ginecología',
    icon: 'Heart',
    color: '#DB2777', // rosa fuerte
    pronoun: 'tu consulta ginecológica',
    example: 'control prenatal',
    examplePrice: '220.000',
    vocab: { pro: 'ginecólogo(a)', patient: 'paciente', visit: 'consulta' },
    headline: 'Acompañe cada embarazo semana a semana, sin esfuerzo.',
    sub: 'Timeline automático de embarazo. La paciente recibe qué examen toca cada semana. Si algo se atrasa, te alerta.',
    pain: 'El seguimiento de embarazo tiene decenas de fechas críticas. La paciente olvida, el doctor no puede llamar a 30 embarazadas cada semana.',
    valueProp: 'MEDACCER guía a la paciente automáticamente: qué exámenes hacerse cada semana, cuándo es su próxima ecografía, y alerta al doctor si algo se atrasa.',
    bigNumber: { value: '40 semanas', label: 'de seguimiento por paciente embarazada — imposible manualmente con 30+ pacientes activas' },
    metric: '100%', metricLabel: 'pacientes con plan prenatal completo',
    features: [
      { icon: 'Calendar', t: 'Timeline de embarazo', d: '40 semanas con hitos preprogramados según norma colombiana.' },
      { icon: 'AlertCircle', t: 'Alertas de retraso', d: 'Si la paciente no se hizo el examen en su ventana, te avisa.' },
      { icon: 'Lock', t: 'Canal seguro de dudas', d: 'Preguntas frecuentes 24/7 con info validada por ti.' },
      { icon: 'Bell', t: 'Controles trimestrales', d: 'Citología, colposcopia, controles ginecológicos anuales.' },
    ],
    useCases: [
      'Timeline automático semana a semana',
      'Recordatorio de exámenes por trimestre',
      'Canal seguro para dudas frecuentes',
    ],
  },
  {
    id: 'pediatria',
    label: 'Pediatría',
    icon: 'Baby',
    color: '#22C55E', // verde claro
    pronoun: 'tu consultorio pediátrico',
    example: 'control de niño sano',
    examplePrice: '180.000',
    vocab: { pro: 'pediatra', patient: 'paciente', visit: 'control' },
    headline: 'Los padres preguntan a las 2 a.m. Su bot responde.',
    sub: 'Información validada para fiebre, vacunas, alimentación. Escala al pediatra solo cuando es necesario. Calendario de vacunación por hijo.',
    pain: 'Los padres ansiosos escriben a cualquier hora. El pediatra no puede estar disponible 24/7. Si no responde, pierde al paciente.',
    valueProp: 'MEDACCER responde dudas frecuentes 24/7 con info validada por el pediatra, escala solo cuando toca y lleva el calendario de vacunación de cada niño.',
    bigNumber: { value: '24/7', label: 'respuesta a dudas urgentes de padres con info que TÚ pre-aprobaste' },
    metric: '−68%', metricLabel: 'mensajes que llegan al WhatsApp personal del doctor',
    features: [
      { icon: 'Bot', t: 'FAQ médico 24/7', d: 'Respuestas pre-aprobadas por ti para fiebre, alimentación, sueño.' },
      { icon: 'Calendar', t: 'Calendario de vacunación', d: 'Por hijo. Recordatorio 7 días antes de cada dosis.' },
      { icon: 'Users', t: 'Gestión multi-hijo', d: 'Mismos padres, varios niños — fichas separadas, recordatorios juntos.' },
      { icon: 'AlertCircle', t: 'Triage de urgencia', d: 'Detecta señales rojas (fiebre alta, vómito persistente) y te alerta.' },
    ],
    useCases: [
      'Respuestas 24/7 a dudas frecuentes',
      'Calendario de vacunación por hijo',
      'Gestión multi-hijo del mismo núcleo',
    ],
  },
  {
    id: 'oftalmologia',
    label: 'Oftalmología',
    icon: 'Eye',
    color: '#3B82F6', // azul brillante
    pronoun: 'tu consultorio oftalmológico',
    example: 'cirugía LASIK',
    examplePrice: '5.500.000',
    vocab: { pro: 'oftalmólogo(a)', patient: 'paciente', visit: 'consulta' },
    headline: 'Que la cirugía de $5M no se pierda por un mensaje sin leer.',
    sub: 'Checklist pre-quirúrgico interactivo. Si el paciente no confirma que entendió las instrucciones, te alerta.',
    pain: 'Las cirugías de alto valor (LASIK, catarata) se pierden porque el paciente no confirma o no entiende la preparación.',
    valueProp: 'MEDACCER envía instrucciones pre-quirúrgicas paso a paso, exige confirmación interactiva y alerta si el paciente no entendió.',
    bigNumber: { value: '$5.500.000', label: 'COP es el ticket promedio de una cirugía LASIK. Una cancelación duele.' },
    metric: '0', metricLabel: 'cirugías canceladas por instrucciones mal entendidas',
    features: [
      { icon: 'CheckCircle', t: 'Checklist pre-quirúrgico', d: 'Lentes contacto, ayuno, acompañante — todo confirmado.' },
      { icon: 'AlertCircle', t: 'Alerta si no confirma', d: 'Si pasa el tiempo y no responde, te avisa para llamarlo tú.' },
      { icon: 'Clock', t: 'Seguimiento post-quirúrgico', d: 'Gotas, controles, restricciones — recordados a la hora exacta.' },
      { icon: 'Bell', t: 'Controles anuales', d: 'Agudeza visual, presión intraocular, fondo de ojo agendados solos.' },
    ],
    useCases: [
      'Checklist pre-quirúrgico interactivo',
      'Confirmación de preparación del paciente',
      'Seguimiento post-quirúrgico (gotas, controles)',
    ],
  },
];

// ============================================================
// DEMOS DEL CHAT — guion específico por especialidad
// Cada especialidad tiene escenarios únicos con su vocabulario real
// ============================================================
const SCRIPT_OVERRIDES = {
  'odontologia': {
    agendar: [
      { from: 'patient', text: 'Hola, quiero información de diseño de sonrisa, cuánto cuesta?', delay: 700 },
      { from: 'typing', delay: 900 },
      { from: 'bot', text: `¡Hola! Soy Ada, asistente del Dr. Vargas 🦷\n\nDiseño de sonrisa incluye:\n• Valoración + diagnóstico digital\n• 8-10 carillas en porcelana\n• Mockup digital antes de comenzar\n\n💰 Desde $4.800.000 hasta $9.500.000 (depende del caso)\n📅 Tratamiento de 3-4 semanas\n\n¿Le agendo una valoración inicial gratuita?`, delay: 1500 },
      { from: 'patient', text: 'Sí por favor, esta semana si pueden', delay: 1100 },
      { from: 'typing', delay: 600 },
      { from: 'bot', text: `📅 Espacios disponibles:\n• Mié 24 — 2:00 p.m.\n• Jue 25 — 11:00 a.m.\n• Vie 26 — 4:30 p.m.\n\n✨ La valoración es sin compromiso e incluye fotos clínicas y plan personalizado.`, delay: 1300 },
    ],
    confundido: [
      { from: 'patient', text: 'me está doliendo una muela pero no sé cuál, es toda la zona', delay: 700 },
      { from: 'typing', delay: 1000 },
      { from: 'bot', text: `Ay, dolor dental es lo peor 😖 Vamos a agilizar esto.\n\n¿El dolor es?\n• Punzante y constante (nervio)\n• Al morder algo duro (fractura)\n• Solo con frío/calor (sensibilidad)\n• Al tocar con la lengua (absceso)`, delay: 1500 },
      { from: 'patient', text: 'punzante, toda la noche no pude dormir', delay: 1200 },
      { from: 'typing', delay: 800 },
      { from: 'bot', text: `🚨 Eso suena a pulpitis — necesita atención HOY.\n\nTe abrí urgencia:\n📅 Hoy 4:00 p.m.\n💰 Valoración urgente $150.000 (si es endodoncia se descuenta del tratamiento)`, delay: 1300 },
    ],
    seguimiento: [
      { from: 'bot', text: `Hola María 👋 hace 15 días te dimos el presupuesto del diseño de sonrisa ($6.800.000).\n\n¿Pudiste revisarlo? Si tienes dudas, el Dr. Vargas puede explicarte por una llamada de 5 min sin costo.\n\n💡 Por cierto: tenemos plan de financiación a 12 meses sin interés.`, delay: 800 },
      { from: 'patient', text: 'Lo estaba pensando justo, financiación cómo es?', delay: 1300 },
      { from: 'typing', delay: 800 },
      { from: 'bot', text: `Perfecto 🙌 Las opciones son:\n\n📊 12 cuotas: $566.000/mes (sin interés)\n📊 18 cuotas: $389.000/mes (5% interés)\n📊 24 cuotas: $312.000/mes (8% interés)\n\nTodas con aprobación inmediata por Bancolombia o Wompi. ¿Te agendo la cita para arrancar?`, delay: 1500 },
    ],
  },
  'cirugia-plastica': {
    agendar: [
      { from: 'patient', text: 'Hola, quería información sobre rinoplastia', delay: 700 },
      { from: 'typing', delay: 1000 },
      { from: 'bot', text: `Hola, soy Ada, asistente del Dr. Mendoza ✨\n\nLa rinoplastia incluye:\n• Valoración 3D facial\n• Cirugía con técnica abierta o cerrada\n• Hospitalización 1 noche\n• Seguimiento post-op 90 días\n\n💰 Desde $11.000.000 a $18.000.000\n⏱️ Recuperación: 7-10 días sin trabajar\n\n¿Le interesa una valoración?`, delay: 1500 },
      { from: 'patient', text: 'Sí, pero antes me pueden mandar fotos de antes/después?', delay: 1200 },
      { from: 'typing', delay: 800 },
      { from: 'bot', text: `Por supuesto. El Dr. comparte galería SOLO en valoración (consentimiento de pacientes).\n\n📅 Espacios:\n• Lun 22 — 4:00 p.m.\n• Jue 25 — 10:00 a.m.\n\n💰 Valoración $200.000 (se descuenta del tratamiento)`, delay: 1400 },
    ],
    confundido: [
      { from: 'patient', text: 'no sé si me hago lipo o lipopapada o ambas, qué me recomiendan', delay: 700 },
      { from: 'typing', delay: 1100 },
      { from: 'bot', text: `Excelente pregunta 💡 La decisión correcta depende de:\n\n1️⃣ Cantidad de grasa localizada\n2️⃣ Calidad de tu piel (elasticidad)\n3️⃣ Tu objetivo estético\n\nEl Dr. Mendoza usa simulación 3D en valoración para que VEAS el resultado antes de operar.\n\n¿Te agendo la valoración 3D?`, delay: 1500 },
    ],
    'post-op': [
      { from: 'bot', text: `Hola Andrea 💖\n\nDía 7 post-rinoplastia. ¿Cómo te sientes?\n\n1️⃣ Mejor de lo esperado\n2️⃣ Como esperaba\n3️⃣ Tengo dudas/molestias\n\n📸 Por favor envíanos una foto frontal y de perfil — es la rutina del día 7.`, delay: 700 },
      { from: 'patient', text: '2 — pero me preocupa que tengo una zona morada en el pómulo derecho', delay: 1300 },
      { from: 'patient', text: '(📸 foto adjunta)', delay: 600 },
      { from: 'typing', delay: 1300 },
      { from: 'bot', text: `Entendido, recibí tu foto.\n\n🚨 Marqué la consulta como prioritaria. El Dr. Mendoza te llamará en los próximos 30 minutos para revisar.\n\nMientras tanto: NO toques la zona, NO apliques nada por tu cuenta. La hinchazón asimétrica al día 7 puede ser normal pero el doctor quiere verla en persona.`, delay: 1700 },
      { from: 'bot', text: `🚨 Alerta enviada al Dr. Mendoza con foto adjunta`, delay: 800 },
    ],
  },
  'dermatologia': {
    agendar: [
      { from: 'patient', text: 'Hola, tengo un lunar que cambió de color, quiero valoración', delay: 700 },
      { from: 'typing', delay: 900 },
      { from: 'bot', text: `Hola, soy Ada, asistente de la Dra. Morales 🌿\n\nLo valoramos pronto. Para adelantar el diagnóstico:\n\n📸 ¿Podrías enviarme 2 fotos del lunar?\n1. Con buena luz, cerca\n2. Con una regla o moneda al lado (escala)\n\nLas fotos van directo a tu ficha — la Dra. las revisa antes de tu cita.`, delay: 1500 },
      { from: 'patient', text: '(📸 foto adjunta · 1 de 2)', delay: 1100 },
      { from: 'typing', delay: 1000 },
      { from: 'bot', text: `📂 Recibido — guardado en tu ficha como "Lunar dorso, 27 abr 2026"\n\n🟡 Para evaluar el caso clínicamente necesitamos consulta presencial con dermatoscopia.\n\nEspacios:\n• Mié 24 — 9:30 a.m.\n• Jue 25 — 4:00 p.m.\n\n💰 $180.000 (valoración + dermatoscopia)`, delay: 1400 },
    ],
    confundido: [
      { from: 'patient', text: 'tengo granos en la espalda hace meses, ya probé de todo', delay: 700 },
      { from: 'typing', delay: 900 },
      { from: 'bot', text: `Entiendo, el acné en espalda es frustrante. La Dra. suele tratarlo con éxito 💪\n\nPara preparar tu valoración, ¿me cuentas?\n\n1️⃣ ¿Hace cuánto te salieron?\n2️⃣ ¿Usas jabones con químicos fuertes?\n3️⃣ ¿Tomas algún medicamento hormonal?`, delay: 1500 },
      { from: 'patient', text: '6 meses, jabón normal, anticonceptivos sí', delay: 1300 },
      { from: 'typing', delay: 800 },
      { from: 'bot', text: `Gracias 🙌 Le paso la info a la Dra.\n\nAgendé valoración con protocolo anti‑acné ($180.000):\n\n📅 Vie 26 abr — 10:30 a.m.`, delay: 1200 },
    ],
    foto: [
      { from: 'patient', text: 'Doctora, me salió esto en la cara, qué tendré?', delay: 700 },
      { from: 'patient', text: '(📸 foto adjunta)', delay: 600 },
      { from: 'typing', delay: 1100 },
      { from: 'bot', text: `Hola, soy Ada, la asistente de la Dra. 🌿 No puedo dar diagnóstico, pero sí ayudarte:\n\n📂 Guardé tu foto en una ficha temporal a tu nombre.\n\n💡 Para evaluar lesiones de piel necesitamos consulta — la dermatoscopia ve cosas que la cámara no.\n\n¿Te agendo? Tengo Mié 9:30 o Jue 4:00 p.m. ($180.000).`, delay: 1700 },
    ],
  },
  'psicologia': {
    agendar: [
      { from: 'patient', text: 'Hola, quiero empezar terapia, nunca he ido antes', delay: 700 },
      { from: 'typing', delay: 1000 },
      { from: 'bot', text: `Hola, soy Ada, asistente de la Psi. Gómez 💙\n\nMe alegra que estés dando este paso — es un acto de valentía.\n\nLa primera sesión es de 60 min y busca:\n• Conocerte sin juicios\n• Entender qué te trajo aquí\n• Co‑diseñar un camino a tu ritmo\n\n💰 $130.000 · 🔒 Totalmente confidencial`, delay: 1700 },
      { from: 'patient', text: 'Gracias. Prefiero en la tarde si es posible', delay: 1200 },
      { from: 'typing', delay: 600 },
      { from: 'bot', text: `📅 Espacios tarde esta semana:\n• Mar 23 — 4:00 p.m.\n• Jue 25 — 6:00 p.m.\n• Vie 26 — 5:30 p.m.\n\n🔒 Los recordatorios llegan como "Cita con la Dra. Gómez" — sin detalles.`, delay: 1400 },
    ],
    'check-in': [
      { from: 'bot', text: `Hola María 💙 ¿Cómo se ha sentido esta semana?\n\n(Esto es solo un check-in, no necesitas responder en detalle si no quieres)`, delay: 700 },
      { from: 'patient', text: 'Pesada, el lunes lloré un buen rato', delay: 1500 },
      { from: 'typing', delay: 1100 },
      { from: 'bot', text: `Gracias por compartirlo, María. Llorar también es procesar.\n\n📅 Recuerda que su próxima sesión es el jueves a las 3:00 p.m.\n\n¿Quiere confirmar o prefiere reagendar?`, delay: 1600 },
      { from: 'patient', text: 'Confirmo, gracias', delay: 1100 },
      { from: 'bot', text: `🔒 Su mensaje no se guarda en historia clínica — solo lo lee la Psi. Gómez antes de la sesión.`, delay: 1100 },
    ],
    confundido: [
      { from: 'patient', text: 'no sé si es ansiedad o solo estrés laboral, cómo lo distingo', delay: 700 },
      { from: 'typing', delay: 1200 },
      { from: 'bot', text: `Es una pregunta muy sabia 🙏 La Psi. Gómez explora justamente eso en sesión.\n\nAlgunas señales clave:\n• Estrés → alivia al descansar\n• Ansiedad → persiste incluso en descanso\n• Física: palpitaciones, respiración corta\n\nNo tienes que saberlo tú — para eso es la valoración inicial ($130.000).`, delay: 1700 },
    ],
  },
  'nutricion': {
    agendar: [
      { from: 'patient', text: 'Hola, quiero empezar un plan alimentario para bajar 8 kilos', delay: 700 },
      { from: 'typing', delay: 900 },
      { from: 'bot', text: `¡Hola! Soy Ada, asistente de la nutricionista Laura 🌱\n\nGenial que des el paso 💪 Tu primera consulta incluye:\n\n• Valoración antropométrica\n• Análisis de hábitos\n• Plan personalizado 30 días\n• App con recetas y lista de mercado\n\n💰 $150.000 (incluye control a los 15 días)`, delay: 1500 },
      { from: 'patient', text: 'Listo, qué tengo?', delay: 1100 },
      { from: 'typing', delay: 700 },
      { from: 'bot', text: `📅 Jue 25 abr · 2:00 p.m.\n\n📋 Para tu cita trae:\n• Exámenes recientes (si tienes)\n• Lista de qué comes en un día típico\n• Agua: 1 vaso antes de venir`, delay: 1400 },
    ],
    'check-in': [
      { from: 'bot', text: `Hola Carlos 🌱 Es jueves, día de check-in de tu plan.\n\n¿Cómo te fue esta semana con las comidas?\n1️⃣ Excelente — seguí el plan al 100%\n2️⃣ Bien — algunas escapadas pero rescatable\n3️⃣ Difícil — necesito ayuda`, delay: 700 },
      { from: 'patient', text: '2, el fin de semana me descontrolé en una comida familiar', delay: 1300 },
      { from: 'typing', delay: 900 },
      { from: 'bot', text: `Es totalmente normal 🤗 La adherencia perfecta no existe — la consistencia sí.\n\n📊 Esta semana: 5/7 días en plan = 71%. Esto es BUENO.\n\nLa nutri Laura ya tiene el reporte para tu control del lunes. ¿Confirmas la cita?`, delay: 1500 },
    ],
    confundido: [
      { from: 'patient', text: 'como puedo bajar de peso sin pasar hambre?', delay: 700 },
      { from: 'typing', delay: 1100 },
      { from: 'bot', text: `Pregunta excelente 🥗 Laura trabaja con un enfoque de comer BIEN, no comer MENOS.\n\nAntes de la consulta te sirve saber:\n• Las dietas restrictivas fallan el 80% de las veces\n• El plan que ella diseña considera tu horario, gustos y cultura\n\n¿Agendamos una valoración inicial?`, delay: 1500 },
    ],
  },
  'fisioterapia': {
    agendar: [
      { from: 'patient', text: 'Hola, el médico me mandó 10 sesiones por dolor lumbar', delay: 700 },
      { from: 'typing', delay: 900 },
      { from: 'bot', text: `¡Hola! Soy Ada, asistente del fisio Carlos 💪\n\nPerfecto, te armo el paquete:\n\n📦 **Paquete 10 sesiones lumbar**\n💰 $750.000 (ahorras $150.000 vs individual)\n⏱️ 1 hora c/u, 3x semana recomendado\n\n¿Arrancamos esta semana?`, delay: 1500 },
      { from: 'patient', text: 'Sí, lun/mié/vie me va bien en la tarde', delay: 1200 },
      { from: 'typing', delay: 700 },
      { from: 'bot', text: `✅ Agenda creada:\n\n• Lun 22 · 5:00 p.m.\n• Mié 24 · 5:00 p.m.\n• Vie 26 · 5:00 p.m.\n... (hasta completar 10)\n\n🏠 Te mandaré ejercicios domiciliarios después de cada sesión.`, delay: 1300 },
    ],
    ejercicios: [
      { from: 'bot', text: `Buenos días Juan ☀️ Hoy toca hacer sus 3 ejercicios de rodilla:\n\n1️⃣ Extensión 3×15\n2️⃣ Sentadilla isométrica 3×30s\n3️⃣ Bicicleta estática 15min\n\n¿Los completó ayer?\n\nA. Sí, todos\nB. Solo algunos\nC. No pude`, delay: 700 },
      { from: 'patient', text: 'B — solo el 1 y 3, la sentadilla me dolió', delay: 1300 },
      { from: 'typing', delay: 900 },
      { from: 'bot', text: `Gracias por el reporte 🙌\n\n💡 Si la sentadilla isométrica le duele, BÁJELE el tiempo a 15s. La idea es progresar gradual.\n\n📊 Su progreso: Sesión 8 de 20 ✅ (40% del tratamiento)\nAdherencia esta semana: 5/6 días — muy bien.\n\nNos vemos hoy a las 5 p.m.`, delay: 1700 },
    ],
    confundido: [
      { from: 'patient', text: 'me duele el hombro hace una semana, no sé si es muscular', delay: 700 },
      { from: 'typing', delay: 1000 },
      { from: 'bot', text: `Tranquilo(a), eso lo evaluamos 🤝\n\n¿Podrías describirme?\n• Dolor al levantar el brazo (sí/no)\n• Dolor al dormir del lado (sí/no)\n• Hiciste algún esfuerzo reciente`, delay: 1400 },
      { from: 'patient', text: 'sí al levantar, al dormir también, estuve cargando cajas', delay: 1200 },
      { from: 'typing', delay: 800 },
      { from: 'bot', text: `Suena a una lesión de manguito rotador leve 💡\n\nTe agendo valoración inicial ($90.000) — incluye plan de tratamiento:\n\n📅 Mañana 10:00 a.m.`, delay: 1200 },
    ],
  },
  'ginecologia': {
    agendar: [
      { from: 'patient', text: 'Hola, soy nueva paciente, estoy embarazada de 10 semanas', delay: 700 },
      { from: 'typing', delay: 900 },
      { from: 'bot', text: `¡Felicitaciones, qué hermoso! 💕 Soy Ada, asistente de la Dra. Patiño.\n\nLa consulta inicial de embarazo incluye:\n• Anamnesis completa\n• Eco obstétrica de control\n• Solicitud de exámenes 1er trimestre\n• Plan de seguimiento personalizado\n\n💰 $220.000\n\n¿Le agendo esta semana?`, delay: 1500 },
      { from: 'patient', text: 'Sí, qué disponibilidad hay?', delay: 1100 },
      { from: 'typing', delay: 600 },
      { from: 'bot', text: `📅 Espacios:\n• Mar 23 — 9:30 a.m.\n• Jue 25 — 11:00 a.m.\n• Vie 26 — 3:00 p.m.\n\n🤰 A partir de hoy le mando información semanal: qué exámenes hacer, qué cambios esperar, signos de alarma.`, delay: 1400 },
    ],
    timeline: [
      { from: 'bot', text: `Hola Carolina 🌸 Hoy entras a la **semana 20 de tu embarazo**.\n\n📋 Esta semana toca:\n• Ecografía morfológica (la más importante del embarazo)\n• Curva de glucosa entre semana 24-26\n\n¿Le agendo la eco morfo? Tiene Wompi para pago si quiere abonar.`, delay: 700 },
      { from: 'patient', text: 'Sí porfa, la eco es esta semana o puedo la próxima?', delay: 1200 },
      { from: 'typing', delay: 800 },
      { from: 'bot', text: `La ventana ideal es semana 20-22 (mejor visualización). Le agendo opciones:\n\n📅 Esta semana:\n• Vie 26 — 4:00 p.m. ($350.000)\n\n📅 Próxima semana (sem. 21):\n• Mar 30 — 10:00 a.m.\n• Jue 1 may — 3:30 p.m.\n\nLa eco morfo es la más completa: anatomía fetal detallada y sexo si quiere saber.`, delay: 1700 },
    ],
    confundido: [
      { from: 'patient', text: 'tengo un retraso de 4 días y dolor abdominal leve, qué hago', delay: 700 },
      { from: 'typing', delay: 1000 },
      { from: 'bot', text: `Vamos paso a paso 🤝 No tiene que diagnosticarse usted.\n\n¿Ha tenido relaciones sin protección este ciclo?\n¿El dolor es tipo cólico o constante?\n¿Tiene sangrado?\n\n💡 Si hay sangrado fuerte o dolor 8+/10, vaya a urgencias YA.`, delay: 1500 },
      { from: 'patient', text: 'Sí, tipo cólico, no hay sangrado', delay: 1100 },
      { from: 'typing', delay: 800 },
      { from: 'bot', text: `Tranquila — no parece urgencia. Le agendo prioritario:\n\n📅 Mañana 9:00 a.m. ($220.000)\n\nMientras: hágase un test de embarazo de farmacia (es el primer paso). Y si el dolor empeora, vaya a urgencias.`, delay: 1600 },
    ],
  },
  'pediatria': {
    agendar: [
      { from: 'patient', text: 'Hola, mi bebé cumple 2 meses la próxima semana, le toca control y vacunas', delay: 700 },
      { from: 'typing', delay: 900 },
      { from: 'bot', text: `¡Qué bien que esté pendiente! 👶 Soy Ada, asistente del Dr. Pérez.\n\nA los 2 meses toca:\n• Control de niño sano\n• Vacunas: pentavalente, polio, neumococo, rotavirus\n\n💰 Control $180.000 + vacunas (depende del esquema EPS o particular)\n\n¿Cómo se llama el bebé?`, delay: 1500 },
      { from: 'patient', text: 'Mateo, nació el 1 de marzo', delay: 1100 },
      { from: 'typing', delay: 800 },
      { from: 'bot', text: `Mateo Pérez 🎉 Le agendo:\n\n📅 Lun 6 may — 10:00 a.m.\n📋 Lleve carnet de vacunas\n\n📲 A partir de hoy le mando recordatorios automáticos:\n• 3-2-1 días antes de cada control\n• 7 días antes de cada vacuna\n• Tips por edad`, delay: 1400 },
    ],
    'urgencia-2am': [
      { from: 'patient', text: 'mi bebé tiene 38.5 de fiebre, qué le doy?', delay: 700 },
      { from: 'typing', delay: 1100 },
      { from: 'bot', text: `Soy Ada, asistente del Dr. Pérez 👶 (estoy disponible 24/7).\n\n📋 Ficha de Mateo (5 meses, peso 7.4 kg):\n\n💊 El Dr. Pérez le tiene recetado **acetaminofén 100mg/ml**\nDosis: 1.1 ml cada 6 horas (máx 4 al día)\n\n🚨 SI:\n• Fiebre supera 39.5°C\n• Llanto inconsolable >2 horas\n• Manchas rojas en la piel\n• Convulsiones\n→ URGENCIAS YA\n\n¿Le agendo cita mañana con el Dr.?`, delay: 1700 },
      { from: 'patient', text: 'sí, gracias, sí me preocupa', delay: 1100 },
      { from: 'typing', delay: 600 },
      { from: 'bot', text: `📅 Mañana 10:00 a.m. — agendado.\n\n📲 El Dr. Pérez está notificado de la consulta. Si necesita algo en la madrugada, escríbame y le respondo en menos de 1 minuto.`, delay: 1400 },
    ],
    confundido: [
      { from: 'patient', text: 'mi hijo de 3 años no quiere comer hace una semana, está bien?', delay: 700 },
      { from: 'typing', delay: 1000 },
      { from: 'bot', text: `Tranquila, le ayudo 🤗\n\nPara evaluar:\n• ¿Tiene fiebre o decaimiento?\n• ¿Está activo, juega normal?\n• ¿Hizo algún cambio en su rutina (guardería, mudanza)?\n• ¿Toma líquidos bien?`, delay: 1500 },
      { from: 'patient', text: 'No fiebre, juega normal, empezó la guardería hace 2 semanas', delay: 1300 },
      { from: 'typing', delay: 800 },
      { from: 'bot', text: `💡 Probablemente sea ajuste por la guardería — es muy común a esa edad.\n\nMientras: ofrezca comidas pequeñas frecuentes y mucho líquido.\n\nSi no mejora en 5 días o pierde peso, agendamos. ¿Quiere control preventivo igual?`, delay: 1500 },
    ],
  },
  'oftalmologia': {
    agendar: [
      { from: 'patient', text: 'Hola, quería información sobre cirugía LASIK', delay: 700 },
      { from: 'typing', delay: 900 },
      { from: 'bot', text: `¡Hola! Soy Ada, asistente del Dr. Cortés 👁️\n\nLa cirugía LASIK incluye:\n• Topografía corneal + tomografía\n• Cirugía láser ambos ojos (15 min)\n• Controles 1d, 7d, 30d, 90d\n• Garantía de 1 año\n\n💰 $5.500.000 ambos ojos (financiación disponible)\n⏱️ Recuperación 24-48h\n\n¿Le agendo evaluación pre-quirúrgica?`, delay: 1600 },
      { from: 'patient', text: 'Sí, qué incluye la evaluación?', delay: 1100 },
      { from: 'typing', delay: 700 },
      { from: 'bot', text: `📋 Evaluación pre-LASIK ($380.000):\n• Refracción objetiva y subjetiva\n• Topografía corneal\n• Tomografía OCT\n• Diámetro pupilar y película lagrimal\n\n⚠️ Importante: no usar lentes de contacto blandos 7 días antes (rígidos 30 días).\n\n📅 Espacios: Mar 23 — 8:00 a.m. | Jue 25 — 4:00 p.m.`, delay: 1700 },
    ],
    'pre-quirurgico': [
      { from: 'bot', text: `Hola Andrés 👁️ Su cirugía LASIK es el **viernes 26 a las 7:00 a.m.**\n\nFalta solo 48 horas. Por favor confirme que entendió las siguientes instrucciones:\n\n✅ NO usar lentes de contacto desde HOY\n✅ Ayuno de 8 horas (desde las 11 p.m. del jueves)\n✅ Venir SIN maquillaje en los ojos\n✅ Venir acompañado (no podrá conducir)\n✅ Traer lentes oscuros\n\nResponda con un ✅ por cada punto que entendió.`, delay: 700 },
      { from: 'patient', text: '✅ ✅ ✅ ✅ no tengo lentes oscuros', delay: 1500 },
      { from: 'typing', delay: 800 },
      { from: 'bot', text: `Perfecto que confirme 🙌\n\n💡 Sin lentes oscuros: nosotros le obsequiamos un par UV400 protector el día de la cirugía. No se preocupe.\n\n📲 Si tiene cualquier duda en las próximas 48h, escríbame — el Dr. Cortés está al tanto de su caso.`, delay: 1600 },
    ],
    confundido: [
      { from: 'patient', text: 'a mis 50 años empecé a no ver bien de cerca, qué será?', delay: 700 },
      { from: 'typing', delay: 1000 },
      { from: 'bot', text: `Es muy común a esa edad 👁️ Suele ser **presbicia** (vista cansada).\n\nEs natural y tratable. Opciones:\n• Lentes de lectura\n• Lentes progresivos\n• Cirugía PresbyMax (similar a LASIK pero para presbicia)\n\nEl Dr. Cortés recomienda valoración primero ($380.000) para ver qué le conviene a usted específicamente.\n\n¿Le agendo?`, delay: 1700 },
    ],
  },
};

function buildScripts(sp) {
  const pron = sp.vocab.visit;
  const example = sp.example;
  const price = sp.examplePrice;
  const overrides = SCRIPT_OVERRIDES[sp.id] || {};
  // Default genérico para escenarios no personalizados
  const defaults = {
    agendar: [
      { from: 'patient', text: `Hola, quiero agendar ${pron === 'cita' ? 'una cita' : 'una ' + pron} para ${example} esta semana`, delay: 700 },
      { from: 'typing', delay: 800 },
      { from: 'bot', text: `¡Hola! Soy Ada, asistente del consultorio 🌿\n\nTe ayudo con eso. Tengo estos espacios disponibles:\n\n• Miércoles 24 — 10:00 a.m.\n• Jueves 25 — 3:30 p.m.\n• Viernes 26 — 9:00 a.m.\n\n¿Cuál te queda mejor?`, delay: 1200 },
      { from: 'patient', text: 'El jueves a las 3:30 porfa', delay: 1100 },
      { from: 'typing', delay: 600 },
      { from: 'bot', text: `¡Perfecto! ✅ Confirmado:\n\n📅 Jue 25 abr, 3:30 p.m.\n💰 $${price} COP\n\nTe enviaré un recordatorio 24h antes.`, delay: 1200 },
    ],
    confundido: [
      { from: 'patient', text: 'hola necesito ayuda no se como se llama lo que tengo', delay: 600 },
      { from: 'typing', delay: 900 },
      { from: 'bot', text: `Tranquilo(a), para eso estoy 🤝\n¿Podrías contarme qué sientes o qué necesitas? Puedes escribirme con tus palabras, enviar un audio, o una foto si aplica.`, delay: 1300 },
      { from: 'patient', text: 'me duele acá desde hace 3 días (audio adjunto)', delay: 1500 },
      { from: 'typing', delay: 1000 },
      { from: 'bot', text: `Entendí tu audio. Veo que es algo nuevo y te molesta bastante.\n\nVoy a agendarte lo antes posible para valoración. ¿Puedes mañana 9:00 a.m.?`, delay: 1400 },
    ],
    recordatorio: [
      { from: 'bot', text: `Hola María 👋 Te recordamos tu ${pron} de mañana:\n\n📅 Jue 25 abr · 3:30 p.m.\n📍 Cra 15 #93-47, Chicó\n\n¿Confirmas tu asistencia?`, delay: 500 },
      { from: 'patient', text: 'Sí, confirmo', delay: 1200 },
      { from: 'typing', delay: 500 },
      { from: 'bot', text: `¡Perfecto! Te esperamos mañana 🙌\n\nSi necesitas cambiar algo, escríbeme con 24h de anticipación para liberar el espacio a otra persona.`, delay: 1000 },
    ],
    reagendar: [
      { from: 'patient', text: 'Tengo una cita jueves pero me salió imprevisto, puedo cambiarla?', delay: 700 },
      { from: 'typing', delay: 900 },
      { from: 'bot', text: `Claro que sí. Veo tu ${pron} del jueves 25 a las 3:30 p.m.\n\nTengo estos espacios alternativos:\n\n• Vie 26 — 11:00 a.m.\n• Lun 29 — 2:00 p.m.\n• Mar 30 — 5:30 p.m.`, delay: 1300 },
      { from: 'patient', text: 'El lunes a las 2', delay: 1000 },
      { from: 'typing', delay: 500 },
      { from: 'bot', text: `Reagendado ✅\n\n📅 Lun 29 abr · 2:00 p.m.\n\nTu espacio del jueves ya se ofreció a lista de espera.`, delay: 1100 },
    ],
    rda: [
      { from: 'patient', text: '(🎙️ Audio de 28s del doctor)', delay: 600 },
      { from: 'typing', delay: 1400 },
      { from: 'bot', text: `✅ Nota clínica estructurada\n\n• Motivo: control mensual\n• Hallazgos: estables, sin novedades\n• Plan: continuar tratamiento, control en 30 días\n\n📤 RDA generado y enviado al Ministerio (Resolución 1888).`, delay: 1500 },
    ],
    urgencia: [
      { from: 'patient', text: 'Auxilio tengo muchísimo dolor no sé qué hacer', delay: 600 },
      { from: 'typing', delay: 700 },
      { from: 'bot', text: `Voy a pasar tu caso al equipo ahora mismo 🚨\n\n⏰ Tiempo estimado de respuesta: < 2 min\n\nMientras tanto, ¿puedes describirme brevemente dónde y qué tipo de dolor sientes?`, delay: 1000 },
      { from: 'bot', text: `📲 Escalado a humano: asistente notificada`, delay: 900 },
    ],
    resena: [
      { from: 'bot', text: `¡Gracias por visitarnos hoy, María! 🌟\n\n¿Cómo estuvo tu experiencia del 1 al 10?`, delay: 500 },
      { from: 'patient', text: '10/10, todo excelente', delay: 1100 },
      { from: 'typing', delay: 700 },
      { from: 'bot', text: `¡Nos alegra muchísimo! 🙌\n\n¿Nos ayudas con una reseña corta en Google? Es un click y nos apoya enormemente:\n\n🔗 g.co/r/consultorio`, delay: 1200 },
    ],
  };
  // Merge overrides on top of defaults
  return { ...defaults, ...overrides };
}

// ============================================================
// CHAT DEMO PRO — multi-escenario con tabs
// ============================================================
const DEMO_TABS = [
  { id: 'agendar',     label: 'Agendar',     icon: 'Calendar',   emoji: '📅' },
  { id: 'confundido',  label: 'Paciente confundido', icon: 'Help', emoji: '🤔' },
  { id: 'recordatorio',label: 'Recordatorio', icon: 'Bell',      emoji: '🔔' },
  { id: 'reagendar',   label: 'Reagendar',   icon: 'Repeat',     emoji: '🔄' },
  { id: 'rda',         label: 'Generar RDA', icon: 'FileText',   emoji: '📄' },
  { id: 'urgencia',    label: 'Urgencia',    icon: 'AlertCircle',emoji: '🚨' },
  { id: 'resena',      label: 'Reseña Google', icon: 'Star',     emoji: '⭐' },
];

function ChatDemoPro({ specialty, compact = false, started = false }) {
  const [scenario, setScenario] = React.useState('agendar');
  const [messages, setMessages] = React.useState([]);
  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(1);
  const scrollRef = React.useRef(null);

  const scripts = React.useMemo(() => buildScripts(specialty), [specialty]);
  const script = scripts[scenario] || scripts.agendar;

  // Start playing when parent signals demo started
  React.useEffect(() => {
    if (started) setPlaying(true);
  }, [started]);

  // reset when scenario or specialty changes
  React.useEffect(() => {
    setMessages([]);
    setStep(0);
  }, [scenario, specialty.id]);

  React.useEffect(() => {
    if (!playing) return;
    if (step >= script.length) {
      const t = setTimeout(() => { setMessages([]); setStep(0); }, 4200);
      return () => clearTimeout(t);
    }
    const cur = script[step];
    const delay = (cur.delay || 800) / speed;
    const t = setTimeout(() => {
      if (cur.from === 'typing') {
        setMessages(m => [...m, { type: 'typing', id: Date.now() }]);
        setTimeout(() => {
          setMessages(m => m.filter(x => x.type !== 'typing'));
          setStep(s => s + 1);
        }, delay);
      } else {
        setMessages(m => [...m.filter(x => x.type !== 'typing'), { type: cur.from, text: cur.text, id: Date.now() + Math.random() }]);
        setStep(s => s + 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [step, script, playing, speed]);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const curTab = DEMO_TABS.find(t => t.id === scenario) || DEMO_TABS[0];
  const [menuOpen, setMenuOpen] = React.useState(false);
  const accent = specialty.color;

  const hints = {
    agendar: { h: 'Agenda en segundos, sin formularios', p: 'Ada consulta tu Google Calendar en vivo, muestra los 3 slots más convenientes y bloquea el espacio en tiempo real.', k: [{v:'<5s',l:'Tiempo respuesta'},{v:'24/7',l:'Disponibilidad'}]},
    confundido: { h: 'Entiende texto, audio y fotos', p: 'GPT-4 con contexto clínico triagea pacientes que no saben describir lo que tienen y propone el siguiente paso correcto.', k: [{v:'97%',l:'Comprensión audio'},{v:'ES-CO',l:'Dialecto'}]},
    recordatorio: { h: 'Recordatorios que reducen no-shows', p: 'Envía 24h antes, confirma asistencia y libera el slot automáticamente si el paciente cancela.', k: [{v:'-40%',l:'No-shows típico'},{v:'auto',l:'Lista de espera'}]},
    reagendar: { h: 'Reagenda sin fricción', p: 'El paciente cambia su cita sin llamar. Ada ofrece alternativas y notifica al siguiente en lista de espera.', k: [{v:'0 calls',l:'A tu secretaria'},{v:'2 min',l:'Duración promedio'}]},
    rda: { h: 'RDA automático desde audio', p: 'Grabas una nota de 30s después de la consulta. Ada la estructura según Resolución 1888 y la envía al MinSalud.', k: [{v:'1888',l:'Resolución'},{v:'HL7',l:'FHIR nativo'}]},
    urgencia: { h: 'Escala a humano cuando toca', p: 'Ada detecta palabras clave de urgencia (dolor severo, sangrado, emergencia) y te notifica al instante por WhatsApp.', k: [{v:'<2min',l:'Escalado'},{v:'24/7',l:'Detección'}]},
    resena: { h: 'Reseñas en Google, sin pedirlas 2 veces', p: 'Después de una experiencia 9-10, Ada pide reseña con un link directo. Mejora tu reputación online automáticamente.', k: [{v:'4.8★',l:'Rating promedio'},{v:'+12x',l:'Reseñas/mes'}]},
  };
  const hint = hints[scenario] || hints.agendar;

  // Tap phone → next scenario
  const nextScenario = () => {
    const idx = DEMO_TABS.findIndex(t => t.id === scenario);
    const next = DEMO_TABS[(idx + 1) % DEMO_TABS.length];
    setScenario(next.id);
  };

  return (
    <div className={`demo-pro-wrap ${compact ? 'compact' : ''}`}>
      <div className="chat-demo-phone" style={{ position: 'relative' }}>
        {/* Play overlay — shown until a specialty is selected */}
        {!started && (
          <div className="demo-play-overlay" onClick={() => setPlaying(true)}>
            <div className="demo-play-btn" style={{ borderColor: accent, color: accent }}>
              <Icons.Play size={28} stroke={accent} />
            </div>
            <p style={{ margin: '12px 0 0', fontSize: 13, color: 'var(--ink-600)', textAlign: 'center', lineHeight: 1.4 }}>
              Elige tu especialidad<br/>para iniciar el demo
            </p>
          </div>
        )}
        <div className="chat-demo-inner">
          <div className="chat-demo-header" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}>
            <button style={{ background:'none', border:'none', color:'white', cursor:'pointer', padding:4 }}><Icons.ChevronLeft size={18} stroke="white" /></button>
            <div className="chat-avatar" style={{ background: 'rgba(255,255,255,0.25)' }}>Ad</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>Asistente · {specialty.label}</div>
              <div style={{ fontSize: 12, opacity: 0.9, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="dot-live" style={{ width: 6, height: 6, background: '#A7F3D0' }}></span> IA en línea · responde en &lt; 5 s
              </div>
            </div>
            <Icons.Phone size={18} stroke="white" />
          </div>

          {/* Scenario selector - slim pill dropdown */}
          <div className="demo-scenario-bar">
            <div className="demo-scenario-label">Escenario</div>
            <div className="demo-scenario-select" onClick={() => setMenuOpen(v => !v)}>
              <span style={{ fontSize: 14 }}>{curTab.emoji}</span>
              <span>{curTab.label}</span>
              <Icons.ChevronDown size={12} stroke="currentColor" />
              {menuOpen && (
                <div className="demo-scenario-menu" onClick={e => e.stopPropagation()}>
                  {DEMO_TABS.map(t => (
                    <button key={t.id} className={`demo-menu-item ${scenario === t.id ? 'on' : ''}`} onClick={() => { setScenario(t.id); setMenuOpen(false); }}>
                      <span style={{ fontSize: 14 }}>{t.emoji}</span> {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="demo-scenario-ctrls">
              <button className="demo-mini-ctrl" title={playing ? 'Pausar' : 'Reproducir'} onClick={() => setPlaying(p => !p)}>
                {playing ? <Icons.Pause size={12} /> : <Icons.Play size={12} />}
              </button>
              <button className="demo-mini-ctrl" title="Reiniciar" onClick={() => { setMessages([]); setStep(0); }}><Icons.RotateCcw size={12} /></button>
              <button className="demo-mini-ctrl" title="Velocidad" onClick={() => setSpeed(s => s === 1 ? 2 : s === 2 ? 3 : 1)}>{speed}×</button>
            </div>
          </div>

          <div className="chat-messages scroll" ref={scrollRef} style={{ '--accent': accent }}>
            {messages.map(m => (
              m.type === 'typing' ? (
                <div key={m.id} className="msg-typing"><span></span><span></span><span></span></div>
              ) : (
                <div key={m.id} className={`msg msg-${m.type}`} style={{ whiteSpace: 'pre-line', ...(m.type === 'bot' ? { borderLeftColor: accent } : {}) }}>
                  {m.text}
                  <div className="msg-meta">{m.type === 'bot' ? '10:24 ✓✓' : m.type === 'patient' ? '10:23' : ''}</div>
                </div>
              )
            ))}
          </div>
          <div className="chat-input-bar">
            <Icons.Paperclip size={20} stroke="#8696A0" />
            <div className="chat-input-fake">Escribe un mensaje…</div>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: accent, display: 'grid', placeItems: 'center', color: 'white' }}>
              <Icons.Mic size={16} stroke="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Side hint — contextual per scenario */}
      {!compact && <div className="demo-side-hint">
        <div className="hint-eyebrow" style={{ color: accent }}>
          <span style={{ fontSize: 14 }}>{curTab.emoji}</span> {curTab.label}
        </div>
        <h4>{hint.h}</h4>
        <p>{hint.p}</p>
        <div className="hint-metrics-grid">
          {hint.k.map((kv, i) => (
            <div key={i} className="hint-metric">
              <div className="hint-metric-val">{kv.v}</div>
              <div className="hint-metric-lbl">{kv.l}</div>
            </div>
          ))}
        </div>
        <div className="hint-tap"><span className="hint-tap-dot"></span>Toca el teléfono para ver otro escenario</div>
      </div>}
    </div>
  );
}

// ============================================================
// Dimple Chat Demo (kept for legacy/other places)
// ============================================================
function ChatDemo({ loop = true }) {
  return <ChatDemoPro specialty={SPECIALTIES[4]} compact />;
}

// ============================================================
// MODAL base
// ============================================================
function Modal({ open, onClose, title, children, size = 'md' }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal modal-${size}`} onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// ============================================================
// Módulo INTERACTIVO (reemplaza las 9 cards estáticas)
// ============================================================
const MODULES = [
  {
    id: 'whatsapp',
    title: 'WhatsApp con IA',
    tagline: '24/7 · El corazón de MEDACCER',
    icon: 'Bot',
    metrics: [{v: '<5s', l: 'Tiempo respuesta'}, {v: '97%', l: 'Comprensión audio'}, {v: '24/7', l: 'Disponibilidad'}],
    bullets: [
      'Entiende lenguaje natural, audios e imágenes',
      'Agenda, reagenda, cancela, responde dudas',
      'Responde en < 5 segundos, siempre',
      'Escala a humano solo cuando es necesario',
    ],
    preview: 'chat',
  },
  {
    id: 'agenda',
    title: 'Agenda sincronizada',
    tagline: 'Google Calendar bidireccional',
    icon: 'Calendar',
    metrics: [{v: '100%', l: 'Sincronizado'}, {v: 'auto', l: 'Buffer entre citas'}, {v: '∞', l: 'Consultorios'}],
    bullets: [
      'Ve tu disponibilidad real en tiempo real',
      'Bloquea automáticamente espacios ocupados',
      'Sincroniza consultorios múltiples',
      'Respeta tus horarios de descanso',
    ],
    preview: 'agenda',
  },
  {
    id: 'rda',
    title: 'Generador de RDA',
    tagline: 'Resolución 1888/2025',
    icon: 'FileText',
    metrics: [{v: 'HL7', l: 'FHIR nativo'}, {v: '<30s', l: 'Por consulta'}, {v: '100%', l: 'Cumplimiento'}],
    bullets: [
      'Formato HL7 FHIR nativo',
      'Envío automático al Ministerio',
      'Validación en tiempo real',
      'Historial auditado por paciente',
    ],
    preview: 'rda',
  },
  {
    id: 'notas',
    title: 'Notas clínicas por voz',
    tagline: 'Dictas 30s, IA estructura',
    icon: 'Mic',
    metrics: [{v: '30s', l: 'Dictas'}, {v: 'SOAP', l: 'Formato'}, {v: '2min', l: 'Ahorro/paciente'}],
    bullets: [
      'Grabas un audio después de cada paciente',
      'La IA genera nota SOAP estructurada',
      'Integración con historia clínica',
      'Editable antes de guardar',
    ],
    preview: 'voz',
  },
  {
    id: 'resenas',
    title: 'Gestor de reseñas',
    tagline: 'Google + filtro privado',
    icon: 'Star',
    metrics: [{v: '+12x', l: 'Reseñas/mes'}, {v: '4.8★', l: 'Rating promedio'}, {v: 'auto', l: 'Filtro negativos'}],
    bullets: [
      'Solicita reseña solo a pacientes contentos',
      'Detecta feedback negativo y lo deriva a ti',
      'Plantillas personalizables',
      'Dashboard de rating promedio',
    ],
    preview: 'resenas',
  },
  {
    id: 'marketing',
    title: 'Marketing automatizado',
    tagline: 'Campañas segmentadas',
    icon: 'Megaphone',
    metrics: [{v: '40%', l: 'Reactivación'}, {v: '95%', l: 'Open rate'}, {v: '0 spam', l: 'Plantillas pre-OK'}],
    bullets: [
      'Cumpleaños, controles, post‑tratamiento',
      'Reactivación de pacientes inactivos',
      'Plantillas WhatsApp pre‑aprobadas',
      'Métricas de apertura y conversión',
    ],
    preview: 'marketing',
  },
  {
    id: 'lista',
    title: 'Lista de espera inteligente',
    tagline: 'Rellena cancelaciones en segundos',
    icon: 'Clock',
    metrics: [{v: '<2min', l: 'Relleno promedio'}, {v: '80%', l: 'Tasa de aceptación'}, {v: 'auto', l: 'Priorización'}],
    bullets: [
      'Detecta cancelaciones automáticamente',
      'Ofrece el hueco al paciente correcto',
      'Prioriza por urgencia, historial o tiempo de espera',
      'Confirma y agenda sin intervención',
    ],
    preview: 'lista',
  },
  {
    id: 'dash',
    title: 'Dashboard de rentabilidad',
    tagline: 'Decisiones con datos',
    icon: 'TrendingUp',
    metrics: [{v: 'real-time', l: 'Actualización'}, {v: '12+', l: 'KPIs'}, {v: 'PDF/XLS', l: 'Exportación'}],
    bullets: [
      'Ocupación, ingresos, no‑shows en tiempo real',
      'LTV por paciente y por tratamiento',
      'Alertas inteligentes (agenda vacía, baja conversión)',
      'Exporta reportes mensuales',
    ],
    preview: 'dash',
  },
  {
    id: 'auto',
    title: 'Automatizaciones 1‑click',
    tagline: 'Biblioteca de flujos',
    icon: 'Zap',
    metrics: [{v: '18+', l: 'Flujos listos'}, {v: '1 click', l: 'Activación'}, {v: 'logs', l: 'Auditable'}],
    bullets: [
      'Triage, seguimiento, recordatorios de pago',
      'Activa con un toggle, sin tocar código',
      'Personalizables por especialidad',
      'Historial completo de ejecuciones',
    ],
    preview: 'auto',
  },
];

// ============================================================
// ROI Calculator — interactivo
// ============================================================
function ROICalculator() {
  const [patients, setPatients] = React.useState(180);
  const [price, setPrice] = React.useState(120000);
  const [noshow, setNoshow] = React.useState(18);
  const [hoursAdmin, setHoursAdmin] = React.useState(12); // horas/semana respondiendo WhatsApp

  // Cálculos
  const noshowAfter = Math.max(4, Math.round(noshow * 0.35)); // reducción ~65%
  const citasPerdidasAntes = Math.round(patients * noshow / 100);
  const citasPerdidasDespues = Math.round(patients * noshowAfter / 100);
  const citasRecuperadas = citasPerdidasAntes - citasPerdidasDespues;
  const ingresoRecuperado = citasRecuperadas * price;

  // Tiempo recuperado: 75% de las horas admin
  const horasRecuperadas = Math.round(hoursAdmin * 4 * 0.75);
  const valorHora = Math.round(price / 2); // valor hora-médico aproximado
  const valorTiempo = horasRecuperadas * valorHora;

  const plan = patients > 400 ? 'Premium' : patients > 150 ? 'Profesional' : 'Inicio';
  const costo = plan === 'Premium' ? 2000000 : plan === 'Profesional' ? 800000 : 350000;

  const ahorroTotal = ingresoRecuperado + valorTiempo;
  const roi = Math.round(((ahorroTotal - costo) / costo) * 100);
  const ahorroNeto = ahorroTotal - costo;

  const fmt = (n) => '$' + n.toLocaleString('es-CO');

  return (
    <div className="roi-calc">
      <div className="roi-calc-inputs">
        <div className="roi-input-group">
          <div className="roi-input-label">
            <span>Pacientes activos al mes</span>
            <span className="roi-input-value">{patients}</span>
          </div>
          <input type="range" min="40" max="600" step="10" value={patients} onChange={e => setPatients(+e.target.value)} className="roi-slider" />
          <div className="roi-range-hint"><span>40</span><span>600</span></div>
        </div>

        <div className="roi-input-group">
          <div className="roi-input-label">
            <span>Precio promedio por consulta</span>
            <span className="roi-input-value">{fmt(price)}</span>
          </div>
          <input type="range" min="40000" max="500000" step="5000" value={price} onChange={e => setPrice(+e.target.value)} className="roi-slider" />
          <div className="roi-range-hint"><span>$40K</span><span>$500K</span></div>
        </div>

        <div className="roi-input-group">
          <div className="roi-input-label">
            <span>Tu % de no‑shows actual</span>
            <span className="roi-input-value">{noshow}%</span>
          </div>
          <input type="range" min="5" max="35" step="1" value={noshow} onChange={e => setNoshow(+e.target.value)} className="roi-slider" />
          <div className="roi-range-hint"><span>5%</span><span>35%</span></div>
        </div>

        <div className="roi-input-group">
          <div className="roi-input-label">
            <span>Horas/semana respondiendo WhatsApp</span>
            <span className="roi-input-value">{hoursAdmin}h</span>
          </div>
          <input type="range" min="2" max="40" step="1" value={hoursAdmin} onChange={e => setHoursAdmin(+e.target.value)} className="roi-slider" />
          <div className="roi-range-hint"><span>2h</span><span>40h</span></div>
        </div>
      </div>

      <div className="roi-calc-output">
        <div className="roi-headline">
          <div className="roi-headline-eyebrow">Tu ahorro estimado mensual</div>
          <div className="roi-headline-num">{fmt(ahorroNeto)}<span className="roi-headline-period"> COP / mes</span></div>
          <div className={`roi-headline-roi ${roi > 0 ? 'positive' : 'negative'}`}>
            <Icons.Zap size={14} stroke={roi > 0 ? '#059669' : '#DC2626'} />
            ROI estimado: <b>{roi > 0 ? '+' : ''}{roi}%</b> sobre el plan recomendado
          </div>
        </div>

        <div className="roi-breakdown">
          <div className="roi-breakdown-row">
            <div>
              <div className="roi-row-label">Citas recuperadas (no‑shows ↓{Math.round((noshow - noshowAfter) / noshow * 100)}%)</div>
              <div className="roi-row-sub">{citasPerdidasAntes} → {citasPerdidasDespues} citas perdidas/mes</div>
            </div>
            <div className="roi-row-value">+ {fmt(ingresoRecuperado)}</div>
          </div>
          <div className="roi-breakdown-row">
            <div>
              <div className="roi-row-label">Tiempo recuperado (~75% menos admin)</div>
              <div className="roi-row-sub">{horasRecuperadas} horas/mes para atender más</div>
            </div>
            <div className="roi-row-value">+ {fmt(valorTiempo)}</div>
          </div>
          <div className="roi-breakdown-row">
            <div>
              <div className="roi-row-label">Plan recomendado: <b>{plan}</b></div>
              <div className="roi-row-sub">Basado en {patients} pacientes activos</div>
            </div>
            <div className="roi-row-value negative">− {fmt(costo)}</div>
          </div>
          <div className="roi-breakdown-row roi-total">
            <div><b>Ahorro neto mensual</b></div>
            <div className="roi-row-value"><b>{fmt(ahorroNeto)}</b></div>
          </div>
        </div>

        <div className="roi-disclaimer">
          Estimación basada en benchmarks de LATAM: tasa apertura WhatsApp 95%, reducción no‑shows ~65% con recordatorios IA, automatización de 75% de mensajería admin. Tus resultados reales pueden variar.
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Integrations — data
// ============================================================
const INTEGRATIONS = [
  { id: 'whatsapp', name: 'WhatsApp Business API', by: 'Meta', category: 'Mensajería', status: 'native',
    desc: 'Oficial de Meta. Check verde Business Verified. Plantillas aprobadas.',
    logo: 'whatsapp' },
  { id: 'gcal', name: 'Google Calendar', by: 'Google', category: 'Agenda', status: 'native',
    desc: 'OAuth 2.0. El bot lee tu disponibilidad real y crea eventos directo en tu calendario.',
    logo: 'google' },
  { id: 'n8n', name: 'n8n', by: 'n8n GmbH', category: 'Automatización', status: 'native',
    desc: 'Workflows visuales. Conecta MEDACCER con cualquier API sin código.',
    logo: 'n8n' },
  { id: 'twilio', name: 'Twilio', by: 'Twilio', category: 'SMS / Voz', status: 'native',
    desc: 'SMS de respaldo cuando el paciente no responde WhatsApp. Llamadas IVR opcionales.',
    logo: 'twilio' },
  { id: 'stripe', name: 'Stripe + Wompi', by: 'Stripe / Bancolombia', category: 'Pagos', status: 'native',
    desc: 'Cobra consultas y presupuestos por link. PSE, tarjetas, Nequi, Bancolombia.',
    logo: 'stripe' },
  { id: 'fhir', name: 'HL7 FHIR R4', by: 'MinSalud', category: 'Interoperabilidad', status: 'native',
    desc: 'Envío automático del RDA a la plataforma de interoperabilidad del Ministerio.',
    logo: 'minsalud' },
  { id: 'meta-ads', name: 'Meta Ads', by: 'Meta', category: 'Marketing', status: 'native',
    desc: 'Conecta anuncios de Instagram/Facebook → WhatsApp directo al bot con contexto de campaña.',
    logo: 'meta' },
  { id: 'google-my-business', name: 'Google Business Profile', by: 'Google', category: 'Reseñas', status: 'native',
    desc: 'Gestor de reseñas automatizado. Pide reseñas a pacientes contentos después de la consulta.',
    logo: 'google' },
  { id: 'zapier', name: 'Zapier', by: 'Zapier', category: 'Automatización', status: 'beta',
    desc: '5000+ apps. Conecta MEDACCER con Mailchimp, HubSpot, Notion, Airtable.',
    logo: 'zapier' },
  { id: 'hubspot', name: 'HubSpot CRM', by: 'HubSpot', category: 'CRM', status: 'beta',
    desc: 'Sincroniza pacientes como contactos y consultas como deals en HubSpot.',
    logo: 'hubspot' },
  { id: 'postmark', name: 'Postmark', by: 'ActiveCampaign', category: 'Email',  status: 'native',
    desc: 'Email transaccional de recordatorios y presupuestos con 99.9% deliverability.',
    logo: 'postmark' },
  { id: 'ml', name: 'Mercado Libre / Shopify', by: 'MercadoLibre / Shopify', category: 'E‑commerce', status: 'beta',
    desc: 'Para estéticas: vende productos desde el bot de WhatsApp con carrito real.',
    logo: 'ml' },
];

// Detailed connection guides per integration
const INTEGRATION_GUIDES = {
  whatsapp: {
    title: 'WhatsApp Business Cloud API (Meta)',
    what: 'El canal principal. Tu número existente pasa a ser WhatsApp Business Verified (check verde) con acceso a plantillas aprobadas, mensajería ilimitada y políticas de Meta cumplidas al 100%.',
    bullets: [
      'API oficial de Meta — cero riesgo de bloqueo',
      'Mantienes tu número actual',
      'Plantillas de mensajes aprobadas por Meta',
      'Costo de mensajes incluido en la mensualidad de MEDACCER',
    ],
    steps: [
      { n: 1, t: 'Verifica tu negocio en Meta Business Manager', d: 'Si ya tienes Instagram/Facebook profesional, ya estás. Si no, lo hacemos por ti — toma 1 día hábil.' },
      { n: 2, t: 'Autoriza MEDACCER como proveedor de API', d: 'Desde el onboarding haces click en "Conectar WhatsApp" → login Meta → aceptas permisos de mensajería. Meta emite un token permanente para tu número.' },
      { n: 3, t: 'Migra tu número a la Cloud API', d: 'Proceso de ~10 minutos. Tu número sale del WhatsApp Business app y entra a Cloud API. El historial de chats en el teléfono no se borra, pero desde ese momento los mensajes nuevos llegan a MEDACCER.' },
      { n: 4, t: 'Aprueba tus 3 primeras plantillas', d: 'Recordatorio, confirmación y bienvenida. MEDACCER las envía a Meta para aprobación — llega en 1‑24 h.' },
      { n: 5, t: 'Bot activo', d: 'En tu panel MEDACCER verás el toggle "WhatsApp: ON" con el check verde. Puedes enviar un mensaje de prueba desde cualquier número para confirmar.' },
    ],
    tech: 'Meta Cloud API v19.0 · Webhooks con firma HMAC-SHA256 · Rate limit 80 msg/s',
    cost: 'Incluido en todos los planes. Mensajes de utilidad y conversación ilimitados pagados por MEDACCER a Meta.',
  },
  n8n: {
    title: 'n8n — Automatización sin código',
    what: 'n8n es una herramienta visual open‑source para construir automatizaciones complejas arrastrando nodos. MEDACCER expone un nodo oficial para que conectes cualquier lógica personalizada.',
    bullets: [
      'Nodo oficial MEDACCER en el catálogo n8n',
      'Triggers: new_message, new_appointment, no_show, rda_generated',
      'Actions: send_message, create_appointment, escalate_to_human',
      'Self‑hosted o n8n Cloud — ambos funcionan',
    ],
    steps: [
      { n: 1, t: 'Instala n8n', d: 'Opción A: n8n Cloud (recomendado, $20 USD/mes). Opción B: Self‑host con Docker gratis (te damos el docker-compose). Opción C: usamos nuestra instancia compartida para tu consultorio.' },
      { n: 2, t: 'Busca el nodo "MEDACCER"', d: 'En n8n → + New Node → busca "medaccer". Lo encuentras en el catálogo oficial de community nodes.' },
      { n: 3, t: 'Conecta tu API key', d: 'En tu panel MEDACCER → Ajustes → API keys → "Crear key para n8n". Copia y pega en n8n.' },
      { n: 4, t: 'Diseña tu workflow visual', d: 'Ejemplo: "Cuando se crea una cita de estética → espera 24h → envía encuesta → si respuesta > 8, pide reseña Google". Sin escribir código.' },
      { n: 5, t: 'Activa el flujo', d: 'Toggle ON en n8n y listo. Puedes ver el historial de ejecuciones, reintentos automáticos y errores desde n8n directamente.' },
    ],
    tech: 'n8n v1.45+ · Webhook triggers vía JWT · 120 operaciones/min por API key',
    cost: 'MEDACCER gratis. n8n Cloud $20 USD/mes o self‑host $0 (requiere servidor).',
  },
  gcal: {
    title: 'Google Calendar',
    what: 'OAuth 2.0 con Google. El bot lee tu disponibilidad real (eventos en el calendar que elijas) y crea citas nuevas directo en Calendar con Meet automático.',
    bullets: [
      'OAuth 2.0 oficial — cero credenciales en código',
      'Multi‑calendar: asigna un color a cada servicio',
      'Bloqueos manuales respetados automáticamente',
      'Google Meet se crea automático en citas de telemedicina',
    ],
    steps: [
      { n: 1, t: 'Click "Conectar con Google"', d: 'En el onboarding o en Ajustes → Integraciones → Google Calendar.' },
      { n: 2, t: 'Consentimiento OAuth', d: 'Google te muestra qué permisos pedimos: ver disponibilidad, crear/actualizar eventos. Nada de lectura de otros Google services.' },
      { n: 3, t: 'Elige los calendarios', d: 'Marca cuáles calendarios usa el bot para disponibilidad. Por defecto: tu calendar principal.' },
      { n: 4, t: 'Mapea servicios a colores', d: 'Consulta general → azul, urgencia → rojo, estética → fucsia. Los eventos que el bot cree usarán esos colores automáticamente.' },
      { n: 5, t: 'Listo', d: 'El bot ya ve tu agenda. Los pacientes solo podrán agendar en huecos reales disponibles.' },
    ],
    tech: 'Google Calendar API v3 · OAuth 2.0 offline access · Token refresh automático',
    cost: 'Gratis. Solo requiere cuenta Google Workspace o Gmail personal.',
  },
  twilio: {
    title: 'Twilio — SMS y Voz',
    what: 'Respaldo de mensajería cuando el paciente no tiene WhatsApp o no responde en 30 min. Opcional: IVR de voz para consultorios que quieran atender teléfono también.',
    bullets: [
      'SMS con confirmación respondiendo "SI"',
      'Voz (IVR) opcional para citas telefónicas',
      'Hasta 500 SMS/mes incluidos',
      'Adicionales a $180 COP c/u',
    ],
    steps: [
      { n: 1, t: 'Usa cuenta MEDACCER (rápido)', d: 'Por defecto usamos nuestra cuenta Twilio. Los SMS salen de un número mexicano/colombiano shared.' },
      { n: 2, t: 'O conecta tu propia cuenta Twilio (opcional)', d: 'Si quieres un número dedicado y SMS ilimitados a tu costo. En Ajustes → Integraciones → Twilio → "Usar mi cuenta".' },
      { n: 3, t: 'Configura cuándo se envía SMS', d: 'Por defecto: si WhatsApp no entrega en 30 min. Ajustable desde el panel.' },
    ],
    tech: 'Twilio Messaging API · Delivery receipts · Status webhooks',
    cost: 'Incluido hasta 500 SMS/mes. Adicionales: $180 COP por SMS.',
  },
  stripe: {
    title: 'Stripe + Wompi (Colombia)',
    what: 'Cobra consultas y presupuestos con link de pago. El link llega por WhatsApp, el paciente paga y automáticamente se confirma la cita.',
    bullets: [
      'Wompi: PSE, tarjetas, Nequi, Bancolombia, Daviplata',
      'Stripe: tarjetas internacionales',
      'Link único por paciente con QR',
      'Comprobante automático al email',
    ],
    steps: [
      { n: 1, t: 'Conecta tu cuenta Wompi', d: 'Ajustes → Pagos → "Conectar Wompi". Ingresas tu API key (te la da Bancolombia al registrarte).' },
      { n: 2, t: 'O usa MEDACCER Pagos (sin cuenta Wompi)', d: 'Más rápido, pero el dinero llega a MEDACCER y nosotros te transferimos semanal (descontando fee de 3.5% + IVA).' },
      { n: 3, t: 'Configura qué servicios cobras anticipado', d: 'Ej: "Consulta estética → cobro 100% al agendar". "Consulta general → cobro 0% (se paga en consultorio)".' },
    ],
    tech: 'Wompi API v1 · Stripe API v2024 · PCI‑DSS compliance via Stripe Elements',
    cost: 'MEDACCER no cobra comisión adicional. Fee Wompi: 3.5% + IVA. Fee Stripe: 4.2%.',
  },
  fhir: {
    title: 'HL7 FHIR — Cumplimiento Resolución 1888',
    what: 'Envío automático del Resumen Digital de Atención (RDA) a la plataforma del Ministerio de Salud. El doctor solo dicta por voz — la IA hace el resto.',
    bullets: [
      'FHIR R4 compliant',
      'Firma digital con certificado del doctor',
      'Reintentos automáticos si falla el MinSalud',
      'Auditoría completa de envíos',
    ],
    steps: [
      { n: 1, t: 'Carga tu certificado digital', d: 'Ajustes → Legal → "Certificado RDA". Es el mismo que usas para facturación electrónica.' },
      { n: 2, t: 'Activa el flujo post‑consulta', d: 'Al cerrar una cita, el bot te recuerda por WhatsApp: "Dr. Carrillo, dicte el RDA de Juan Pérez". Dictas por voz.' },
      { n: 3, t: 'Revisa y firma', d: 'La IA estructura el FHIR. Tú revisas en 30 segundos y firmas. Se envía al Ministerio automáticamente.' },
      { n: 4, t: 'Dashboard de cumplimiento', d: 'Panel de Compliance muestra % RDAs enviados, fallos, reintentos. Cero riesgo de multa.' },
    ],
    tech: 'FHIR R4 Bundle (Patient + Encounter + Condition + Observation + Procedure) · OAuth 2.0 MinSalud · Certificado PKI',
    cost: 'Incluido en plan Premium. Disponible como add‑on para Profesional ($200.000/mes).',
  },
  'meta-ads': {
    title: 'Meta Ads (Facebook / Instagram)',
    what: 'Cuando corres anuncios Click‑to‑WhatsApp, el paciente llega al bot con el contexto de campaña (qué anuncio vio, en qué plataforma, qué producto/servicio). El bot lo atiende personalizado.',
    bullets: [
      'Deep linking de campaña → bot contexto',
      'Conversiones (cita agendada) devueltas a Meta',
      'Atribución real: ad → chat → cita → ingreso',
      'Lookalike audiences de pacientes reales',
    ],
    steps: [
      { n: 1, t: 'Conecta tu Meta Business', d: 'OAuth desde el panel. Permisos: ads_management + ads_read.' },
      { n: 2, t: 'Elige tu pixel', d: 'MEDACCER dispara eventos estándar (Lead, Schedule, Purchase) cuando el paciente avanza en el funnel.' },
      { n: 3, t: 'Optimiza por conversiones reales', d: 'Ahora puedes optimizar campañas por "Cita agendada" en lugar de "Clicks" — el CPA baja dramáticamente.' },
    ],
    tech: 'Meta Conversions API v19.0 · Server‑side events · Offline conversions',
    cost: 'Gratis. El costo es el propio ad spend en Meta.',
  },
  'google-my-business': {
    title: 'Google Business Profile',
    what: 'Después de consultas con feedback positivo, el bot pide reseña Google. Las reseñas negativas se redirigen a ti primero para resolución — no aparecen públicas.',
    bullets: [
      'Filtro inteligente: solo pacientes 9/10 y 10/10 reciben el link',
      'Respuesta a reseñas negativas primero',
      'Responses automáticas a reseñas (opcional)',
      'Dashboard de NPS y reseñas',
    ],
    steps: [
      { n: 1, t: 'Conecta Google Business', d: 'OAuth con tu cuenta Google. Permisos: leer reseñas, responder.' },
      { n: 2, t: 'Define tu NPS threshold', d: 'Por defecto: 9+ pide reseña pública. 7‑8 pide feedback privado. <7 dispara alerta al doctor.' },
      { n: 3, t: 'Configura respuestas automáticas', d: 'Plantillas personalizables. "Gracias {nombre}, nos alegra..." — el tono se adapta.' },
    ],
    tech: 'Google Business Profile API · OAuth 2.0',
    cost: 'Incluido desde plan Profesional.',
  },
  zapier: {
    title: 'Zapier',
    what: 'Si MEDACCER no tiene integración nativa con una app, Zapier es el puente. 5000+ apps conectadas vía triggers y actions.',
    bullets: [
      'App MEDACCER en directorio Zapier',
      'Triggers: new_appointment, no_show, new_message',
      'Actions: create_appointment, send_message',
      'Funciona con Mailchimp, HubSpot, Notion, Airtable, Monday, etc.',
    ],
    steps: [
      { n: 1, t: 'Cuenta Zapier', d: 'Free tier alcanza para la mayoría. Pro ($30 USD/mes) si necesitas > 750 tasks/mes.' },
      { n: 2, t: 'Busca "MEDACCER" en Zapier', d: 'Directamente en el directorio. Autoriza con tu API key MEDACCER.' },
      { n: 3, t: 'Construye tu Zap', d: 'Ejemplo: "Nueva cita MEDACCER → Crear fila en Google Sheets". O: "Email Mailchimp con tag → Crear paciente en MEDACCER".' },
    ],
    tech: 'Zapier Public App · OAuth 2.0',
    cost: 'MEDACCER gratis. Zapier free 100 tasks/mes o Pro $30 USD/mes.',
  },
  hubspot: {
    title: 'HubSpot CRM',
    what: 'Para consultorios que ya usan HubSpot como CRM comercial. Sincronización bidireccional de pacientes, citas y oportunidades.',
    bullets: [
      'Sync pacientes ↔ contactos HubSpot',
      'Citas → deals en pipeline HubSpot',
      'Notas clínicas en timeline del contacto',
      'Listas dinámicas para marketing',
    ],
    steps: [
      { n: 1, t: 'OAuth con HubSpot', d: 'Autorizas acceso a Contacts + Deals + Engagements.' },
      { n: 2, t: 'Mapea campos', d: 'Teléfono MEDACCER → Phone HubSpot. Especialidad → Custom property. Configurable.' },
      { n: 3, t: 'Elige modo sync', d: 'Tiempo real (webhook), cada hora o diario.' },
    ],
    tech: 'HubSpot API v3 · OAuth 2.0 · Webhooks',
    cost: 'MEDACCER gratis. HubSpot desde $0 (free CRM) hasta $50 USD/mes (Starter).',
  },
  postmark: {
    title: 'Postmark — Email transaccional',
    what: 'Email transaccional: recordatorios, presupuestos, recibos. Deliverability 99.9% — no cae a spam.',
    bullets: [
      'Deliverability 99.9%',
      'Dominio verificado con SPF/DKIM/DMARC',
      'Plantillas MJML responsive',
      'Logs de aperturas y clicks',
    ],
    steps: [
      { n: 1, t: 'Usa nuestra cuenta (default)', d: 'Emails salen de no‑reply@medaccer.com. Funciona sin configuración.' },
      { n: 2, t: 'O verifica tu dominio (recomendado)', d: 'En Ajustes → Email → "Verificar dominio". Agregas 3 records DNS (SPF, DKIM, DMARC). Emails salen de tu dominio.' },
    ],
    tech: 'Postmark API · MJML templates · SPF/DKIM/DMARC',
    cost: 'Incluido hasta 10.000 emails/mes. Adicionales: $0.0010 USD por email.',
  },
  ml: {
    title: 'Mercado Libre / Shopify',
    what: 'Para consultorios de estética y nutrición que venden productos. El bot de WhatsApp tiene carrito real y procesa órdenes con envío automático.',
    bullets: [
      'Catálogo sincronizado',
      'Carrito en WhatsApp',
      'Envíos MercadoEnvíos / Shopify Shipping',
      'Inventario compartido',
    ],
    steps: [
      { n: 1, t: 'Conecta tu tienda', d: 'OAuth ML o Shopify. Permisos read/write productos + órdenes.' },
      { n: 2, t: 'Mapea productos al bot', d: 'Elige qué productos el bot puede ofrecer (ej: skincare post‑láser). Los que no, se ocultan.' },
      { n: 3, t: 'Listo para vender', d: 'El paciente pregunta "¿Qué crema me recomiendas?" → bot muestra 3 opciones con fotos + precio → agrega al carrito → paga → envío.' },
    ],
    tech: 'ML API v2 / Shopify Admin API · OAuth · Webhooks de órdenes',
    cost: 'Incluido desde plan Profesional.',
  },
};

function IntegrationsSection({ onNav }) {
  const [cat, setCat] = React.useState('Todas');
  const cats = ['Todas', ...Array.from(new Set(INTEGRATIONS.map(i => i.category)))];
  const filtered = cat === 'Todas' ? INTEGRATIONS : INTEGRATIONS.filter(i => i.category === cat);

  return (
    <div>
      <div className="integrations-cats">
        {cats.map(c => (
          <button key={c} className={`integrations-cat ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="integrations-grid">
        {filtered.map(i => (
          <div key={i.id} className="integration-card" onClick={() => onNav && onNav(i.id)}>
            <div className="integration-logo" data-logo={i.logo}>
              <LogoGlyph kind={i.logo} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="integration-name">
                {i.name}
                {i.status === 'native' && <span className="integration-badge native">Nativo</span>}
                {i.status === 'beta' && <span className="integration-badge beta">Beta</span>}
              </div>
              <div className="integration-by">{i.by} · {i.category}</div>
              <div className="integration-desc">{i.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Logo glyphs — simple colored letters / shapes (placeholders nítidos)
function LogoGlyph({ kind }) {
  const styles = {
    whatsapp: { bg: '#25D366', letter: 'W', color: 'white' },
    google: { bg: '#fff', letter: 'G', color: '#4285F4', border: '1px solid #dadce0' },
    n8n: { bg: '#EA4B71', letter: 'n8', color: 'white' },
    twilio: { bg: '#F22F46', letter: 'T', color: 'white' },
    stripe: { bg: '#635BFF', letter: 'S', color: 'white' },
    minsalud: { bg: '#0A4D8C', letter: 'M', color: 'white' },
    meta: { bg: 'linear-gradient(135deg, #0081FB, #C926C9)', letter: 'M', color: 'white' },
    zapier: { bg: '#FF4F00', letter: 'Z', color: 'white' },
    hubspot: { bg: '#FF7A59', letter: 'H', color: 'white' },
    postmark: { bg: '#FFDE00', letter: 'P', color: '#000' },
    ml: { bg: '#FFE600', letter: 'ml', color: '#2D3277' },
  };
  const s = styles[kind] || { bg: '#888', letter: '?', color: 'white' };
  return (
    <div style={{ width: 44, height: 44, borderRadius: 10, background: s.bg, color: s.color, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: s.letter.length > 1 ? 13 : 18, border: s.border || 'none', letterSpacing: -0.5 }}>
      {s.letter}
    </div>
  );
}

function ModulesInteractive({ specialty }) {
  const [active, setActive] = React.useState('whatsapp');
  const mod = MODULES.find(m => m.id === active) || MODULES[0];
  const IC = Icons[mod.icon] || Icons.Zap;
  const idx = MODULES.findIndex(m => m.id === active);

  return (
    <div className="modules-interactive v2">
      <div className="modules-sidebar">
        <div className="modules-sidebar-head">
          <div style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-500)', textTransform: 'uppercase', fontWeight: 600 }}>Navegá los 9 módulos</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, letterSpacing: '-0.01em', marginTop: 6, color: 'var(--ink-900)' }}>Todo lo que incluye MEDACCER</div>
        </div>
        <div className="modules-list">
          {MODULES.map((m, i) => {
            const MIC = Icons[m.icon] || Icons.Zap;
            const on = active === m.id;
            return (
              <button key={m.id} className={`mod-item ${on ? 'active' : ''}`} onClick={() => setActive(m.id)}>
                <div className="mod-item-num">{String(i+1).padStart(2,'0')}</div>
                <div className="mod-item-icon"><MIC size={16} stroke={on ? 'var(--m-blue)' : 'currentColor'} /></div>
                <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                  <div className="mod-item-title">{m.title}</div>
                  <div className="mod-item-sub">{m.tagline}</div>
                </div>
                <Icons.ChevronRight size={14} stroke="currentColor" />
              </button>
            );
          })}
        </div>
      </div>
      <div className="modules-preview v2">
        <div className="modules-preview-head">
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: 1, minWidth: 0 }}>
            <div className="mod-preview-icon"><IC size={22} /></div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)', letterSpacing: '0.1em' }}>MÓDULO {String(idx+1).padStart(2,'0')} / 09</span>
                <span className="mod-badge-live"><span className="dot-live"></span>Activo</span>
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 4 }}>{mod.title}</div>
              <div style={{ color: 'var(--ink-500)', fontSize: 14, marginTop: 2 }}>{mod.tagline}</div>
            </div>
          </div>
          <div className="mod-preview-nav">
            <button className="mod-preview-nav-btn" onClick={() => setActive(MODULES[(idx - 1 + MODULES.length) % MODULES.length].id)}><Icons.ChevronLeft size={16} /></button>
            <button className="mod-preview-nav-btn" onClick={() => setActive(MODULES[(idx + 1) % MODULES.length].id)}><Icons.ChevronRight size={16} /></button>
          </div>
        </div>
        <div className="mod-preview-metrics">
          {(mod.metrics || []).map((met, i) => (
            <div key={i} className="mod-metric">
              <div className="mod-metric-val">{met.v}</div>
              <div className="mod-metric-lbl">{met.l}</div>
            </div>
          ))}
        </div>
        <div className="mod-preview-body v2">
          <div className="mod-preview-canvas">
            <ModulePreview type={mod.preview} specialty={specialty} />
          </div>
          <div className="mod-preview-side">
            <div className="mod-preview-side-title">Qué incluye</div>
            <ul className="mod-bullets v2">
              {mod.bullets.map((b, i) => (
                <li key={i}><span className="check"><Icons.Check size={12} stroke="white" /></span> <span>{b}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModulePreview({ type, specialty }) {
  if (type === 'chat') {
    return (
      <div className="mini-preview mini-chat-v2">
        <div className="mini-chat-head">
          <div className="mini-chat-avatar" style={{ background: specialty.color }}>Ad</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>Ada · Asistente</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span className="dot-live" style={{ background: '#A7F3D0', width: 5, height: 5 }}></span> en línea
            </div>
          </div>
          <Icons.Phone size={15} stroke="white" />
          <Icons.MoreH size={15} stroke="white" />
        </div>
        <div className="mini-chat-body">
          <div className="mini-chat-date">HOY</div>
          <div className="mini-msg mini-msg-p">Quiero agendar {specialty.example}<span className="mini-msg-time">10:23</span></div>
          <div className="mini-msg mini-msg-b">Claro 😊 Tengo estos espacios:<br/>• Mié 10:00 a.m.<br/>• Jue 3:30 p.m.<br/>• Vie 9:00 a.m.<span className="mini-msg-time">10:23 ✓✓</span></div>
          <div className="mini-msg mini-msg-p">Jueves 3:30 porfa<span className="mini-msg-time">10:24</span></div>
          <div className="mini-msg mini-msg-b">✅ Confirmado<br/>📅 Jue 25 · 3:30 p.m.<br/>💰 ${specialty.examplePrice} COP<span className="mini-msg-time">10:24 ✓✓</span></div>
        </div>
      </div>
    );
  }
  if (type === 'agenda') {
    return (
      <div className="mini-preview mini-agenda">
        <div className="mini-agenda-hours">
          {['9','10','11','12','1','2','3','4','5'].map(h => <div key={h}>{h}</div>)}
        </div>
        <div className="mini-agenda-grid">
          <div className="mini-slot mini-slot-booked" style={{ top: 0, height: 40 }}>9:00 · María L.</div>
          <div className="mini-slot mini-slot-booked" style={{ top: 80, height: 60 }}>11:00 · Juan P.</div>
          <div className="mini-slot mini-slot-new" style={{ top: 200, height: 40 }}>🔵 Nueva · 2:00 · Ana S.</div>
          <div className="mini-slot mini-slot-booked" style={{ top: 280, height: 40 }}>3:30 · Carlos R.</div>
        </div>
      </div>
    );
  }
  if (type === 'rda') {
    return (
      <div className="mini-preview mini-rda">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: '#0B1020', color: '#94D4FF', padding: 14, borderRadius: 8, whiteSpace: 'pre' }}>
{`{
  "resourceType": "Encounter",
  "status": "finished",
  "subject": { "reference": "Patient/12345" },
  "period": { "start": "2026-04-25T15:30:00-05" },
  "type": [{
    "coding": [{
      "system": "CIE-10",
      "code": "Z00.0"
    }]
  }]
}`}
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--m-teal-700)' }}>
          <span className="dot-live"></span> Enviado al Ministerio · 10:24 a.m.
        </div>
      </div>
    );
  }
  if (type === 'voz') {
    return (
      <div className="mini-preview mini-voz">
        <div className="mini-voz-bar">
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--m-blue)', display: 'grid', placeItems: 'center', color: 'white' }}><Icons.Mic size={16} stroke="white" /></div>
          <div style={{ flex: 1, display: 'flex', gap: 2, alignItems: 'center', height: 24 }}>
            {Array.from({length: 42}).map((_,i) => <div key={i} style={{ width: 2, borderRadius: 1, background: 'var(--m-blue)', height: 3 + (Math.sin(i/2)+1) * 10 + (Math.random()*4) }}></div>)}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-500)' }}>0:28</div>
        </div>
        <div style={{ marginTop: 14, padding: 12, background: '#F6F9FC', borderRadius: 8, fontSize: 13, lineHeight: 1.5 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>📝 Nota estructurada (SOAP)</div>
          <b>S:</b> Paciente refiere mejoría notable desde última sesión…<br/>
          <b>O:</b> Movilidad articular 85%, dolor 2/10 (previo 6/10)…<br/>
          <b>A:</b> Evolución favorable…<br/>
          <b>P:</b> Continuar con plan actual, control en 2 semanas.
        </div>
      </div>
    );
  }
  if (type === 'resenas') {
    return (
      <div className="mini-preview mini-resenas">
        <div className="resena-row">
          <div className="avatar-sm" style={{ background: '#EFF6FF', color: '#2563EB' }}>ML</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>María L.</div>
            <div style={{ display: 'flex', gap: 1, color: '#F59E0B', fontSize: 12 }}>★★★★★</div>
          </div>
          <span className="chip chip-teal">Publicada</span>
        </div>
        <div className="resena-row">
          <div className="avatar-sm" style={{ background: '#FEF3C7', color: '#92400E' }}>JP</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Juan P.</div>
            <div style={{ display: 'flex', gap: 1, color: '#F59E0B', fontSize: 12 }}>★★★☆☆</div>
          </div>
          <span className="chip chip-amber">Feedback privado</span>
        </div>
        <div className="resena-row">
          <div className="avatar-sm" style={{ background: '#ECFDF5', color: '#059669' }}>AS</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Ana S.</div>
            <div style={{ display: 'flex', gap: 1, color: '#F59E0B', fontSize: 12 }}>★★★★★</div>
          </div>
          <span className="chip chip-teal">Publicada</span>
        </div>
        <div style={{ marginTop: 8, padding: '10px 12px', background: 'var(--m-teal-50)', borderRadius: 8, fontSize: 12, color: 'var(--m-teal-700)' }}>
          Rating promedio: <b>4.8 ★</b> · 127 reseñas · +18 este mes
        </div>
      </div>
    );
  }
  if (type === 'marketing') {
    return (
      <div className="mini-preview mini-marketing">
        {[
          { icon: '🎂', name: 'Cumpleaños', status: 'Activa', stats: '18 enviados · 62% apertura' },
          { icon: '🪥', name: 'Control 6 meses', status: 'Activa', stats: '42 enviados · 31% conversión' },
          { icon: '💊', name: 'Post-tratamiento', status: 'Activa', stats: '23 enviados · 78% apertura' },
          { icon: '😴', name: 'Reactivar inactivos (6+ meses)', status: 'Pausada', stats: '0 enviados' },
        ].map((c, i) => (
          <div key={i} className="camp-row">
            <div style={{ fontSize: 18 }}>{c.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{c.stats}</div>
            </div>
            <span className={`chip chip-${c.status === 'Activa' ? 'teal' : 'amber'}`}>{c.status}</span>
          </div>
        ))}
      </div>
    );
  }
  if (type === 'lista') {
    return (
      <div className="mini-preview mini-lista">
        <div style={{ padding: 10, background: '#FEF3C7', borderRadius: 8, fontSize: 13, marginBottom: 10 }}>
          ⚠️ Juan P. canceló su cita de Vie 26 · 3:00 p.m.
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-500)', marginBottom: 8 }}>Ofreciendo a lista de espera (prioridad):</div>
        {[
          { name: 'Laura M.', reason: 'Espera 12 días', status: 'ofrecido' },
          { name: 'Diego T.', reason: 'Urgencia media', status: 'pendiente' },
          { name: 'Sofía R.', reason: 'Espera 5 días', status: 'pendiente' },
        ].map((p, i) => (
          <div key={i} className="lista-row">
            <div style={{ flex: 1, fontSize: 13 }}>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{p.reason}</div>
            </div>
            <span className={`chip chip-${p.status === 'ofrecido' ? 'blue' : 'amber'}`}>{p.status === 'ofrecido' ? '📲 Ofrecido' : 'Pendiente'}</span>
          </div>
        ))}
      </div>
    );
  }
  if (type === 'dash') {
    return (
      <div className="mini-preview mini-dash">
        <div className="mini-dash-grid">
          <div className="mini-kpi"><div className="mini-kpi-label">Ocupación</div><div className="mini-kpi-val">87%</div><div className="mini-kpi-delta up">+12%</div></div>
          <div className="mini-kpi"><div className="mini-kpi-label">Ingresos mes</div><div className="mini-kpi-val">$14.2M</div><div className="mini-kpi-delta up">+8%</div></div>
          <div className="mini-kpi"><div className="mini-kpi-label">No-shows</div><div className="mini-kpi-val">4.1%</div><div className="mini-kpi-delta down">-38%</div></div>
          <div className="mini-kpi"><div className="mini-kpi-label">LTV promedio</div><div className="mini-kpi-val">$680K</div><div className="mini-kpi-delta up">+15%</div></div>
        </div>
        <svg viewBox="0 0 300 80" style={{ width: '100%', marginTop: 12 }}>
          <polyline fill="none" stroke="var(--m-blue)" strokeWidth="2" points="0,60 40,55 80,48 120,52 160,38 200,30 240,25 300,18" />
          <polyline fill="rgba(10,107,191,0.1)" stroke="none" points="0,60 40,55 80,48 120,52 160,38 200,30 240,25 300,18 300,80 0,80" />
        </svg>
      </div>
    );
  }
  if (type === 'auto') {
    return (
      <div className="mini-preview mini-auto">
        {[
          { name: 'Triage de síntomas', active: true },
          { name: 'Recordatorio 24h antes', active: true },
          { name: 'Seguimiento post-procedimiento', active: true },
          { name: 'Recordatorio de pago', active: false },
          { name: 'Agradecimiento + reseña', active: true },
        ].map((a, i) => (
          <div key={i} className="auto-row">
            <div style={{ fontSize: 14, flex: 1 }}>{a.name}</div>
            <div style={{ width: 34, height: 18, borderRadius: 999, background: a.active ? 'var(--m-blue)' : 'var(--ink-300)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, left: a.active ? 18 : 2, width: 14, height: 14, borderRadius: '50%', background: 'white' }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// ============================================================
// LANDING principal
// ============================================================
function Landing() {
  const [openFaq, setOpenFaq] = React.useState(0);
  const [specialty, setSpecialty] = React.useState(SPECIALTIES[0]);
  const [modal, setModal] = React.useState(null); // 'res1888' | 'google' | null
  const [demoStarted, setDemoStarted] = React.useState(false);

  // Consume any pending modal request from other pages (e.g. blog → res1888)
  React.useEffect(() => {
    if (window.__pendingModal) {
      setModal(window.__pendingModal);
      window.__pendingModal = null;
    }
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="landing">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="m-logo" style={{ cursor: 'pointer' }} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} title="Ir al inicio"><div className="m-logo-mark">M</div> MEDACCER</div>
          <div className="nav-links" style={{ flex: 1 }}>
            <a href="#producto" onClick={(e) => { e.preventDefault(); scrollTo('producto'); }}>Producto</a>
            <a href="#como" onClick={(e) => { e.preventDefault(); scrollTo('como'); }}>Cómo funciona</a>
            <a href="#integraciones" onClick={(e) => { e.preventDefault(); scrollTo('integraciones'); }}>Integraciones</a>
            <a href="#precios" onClick={(e) => { e.preventDefault(); scrollTo('precios'); }}>Precios</a>
            <a href="#blog" onClick={(e) => { e.preventDefault(); window.location.hash = 'blog'; }}>Blog</a>
            <a href="#res1888" onClick={(e) => { e.preventDefault(); setModal('res1888'); }}>Resolución 1888</a>
          </div>
          <button className="btn btn-ghost" onClick={() => setModal('agendar')} title="Agenda una llamada con un especialista"><Icons.Calendar size={14} /> Agendar cita</button>
          <button className="btn btn-ghost" onClick={() => window.location.hash = 'login'}>Iniciar sesión</button>
          <button className="btn btn-primary" onClick={() => window.location.hash = 'signup'}>Empezar ahora <Icons.ArrowRight size={16} stroke="white" /></button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid"></div>
          <div className="hero-glow"></div>
          <div className="hero-glow2"></div>
        </div>

        {/* PASO 1 — Selector de especialidad: lo primero que ve el doctor */}
        <div className="spec-selector-hero" id="especialidades">
          <div className="spec-selector-intro">
            <div className="section-label" style={{ color: specialty.color, transition: 'color .4s ease' }}>
              <span className="dot-live" style={{ background: specialty.color, display: 'inline-block', marginRight: 6 }}></span>
              Paso 1 — Elige tu especialidad
            </div>
            <h2 className="spec-selector-title">
              ¿Cuál es tu especialidad?
            </h2>
            <p className="spec-selector-subtitle">
              El demo se personaliza al instante con tu vocabulario, tus precios y tus flujos reales.
            </p>
          </div>
          <div className="spec-selector-big">
            {SPECIALTIES.map(s => {
              const SIC = Icons[s.icon] || Icons.Stethoscope;
              const isActive = specialty.id === s.id;
              return (
                <button
                  key={s.id}
                  className={`spec-card-big ${isActive ? 'active' : ''}`}
                  onClick={() => { setSpecialty(s); setDemoStarted(true); scrollTo('demo'); }}
                  style={isActive ? { borderColor: s.color, background: `${s.color}0d`, boxShadow: `0 0 0 1px ${s.color}` } : {}}
                >
                  <div className="spec-card-icon" style={{ background: isActive ? s.color : `${s.color}15`, color: isActive ? 'white' : s.color }}>
                    <SIC size={20} stroke={isActive ? 'white' : s.color} />
                  </div>
                  <div className="spec-card-title">{s.label}</div>
                  <div className="spec-card-tag" style={{ color: s.color }}>{s.example}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* PASO 2 — Hero personalizado + demo */}
        <div className="hero-grid-layout" style={{ marginTop: 64 }}>
          <div>
            <div className="hero-eyebrow">
              <span className="dot-live"></span>
              Cumple Resolución 1888/2025 · HL7 FHIR nativo
            </div>
            <h1 className="hero-title" key={specialty.id + '-title'}>
              {specialty.headline}
            </h1>
            <p className="hero-sub" key={specialty.id + '-sub'}>
              {specialty.sub}
            </p>

            <div className="hero-ctas">
              <button className="btn btn-primary btn-lg" onClick={() => window.location.hash = 'signup'}>Empezar ahora <Icons.ArrowRight size={16} stroke="white" /></button>
              <button className="btn btn-outline btn-lg" onClick={() => { setDemoStarted(true); scrollTo('demo'); }}><Icons.Play size={14} /> Ver demo en vivo</button>
            </div>
            <div className="hero-trust">
              <div><Icons.Check size={14} stroke="#10B981" /> Sin tarjeta de crédito</div>
              <div><Icons.Check size={14} stroke="#10B981" /> Setup en 48 h</div>
              <div><Icons.Check size={14} stroke="#10B981" /> Cumple Ley 1581</div>
            </div>
          </div>
          <div className="chat-demo-wrap" id="demo">
            <ChatDemoPro specialty={specialty} started={demoStarted} />
          </div>
        </div>

        {/* Para qué especialidades — redesigned as rich strip */}
        <div className="spec-strip-v2">
          <div className="spec-strip-v2-head">
            <div className="spec-strip-v2-eye">
              <span className="dot-live" style={{ background: specialty.color }}></span>
              Adaptado en tiempo real
            </div>
            <h3 className="spec-strip-v2-title">
              Casos reales en <em style={{ color: specialty.color, fontStyle: 'italic' }}>{specialty.label.toLowerCase()}</em>
            </h3>
            <p className="spec-strip-v2-sub">
              Esto es lo que MEDACCER hace el primer mes en un consultorio de {specialty.label.toLowerCase()} — sin configuración manual.
            </p>
            <div className="spec-strip-v2-cases">
              {specialty.useCases.map((u, i) => (
                <div key={i} className="spec-case-card">
                  <div className="spec-case-num" style={{ color: specialty.color, borderColor: `${specialty.color}30` }}>{String(i+1).padStart(2,'0')}</div>
                  <div className="spec-case-text">{u}</div>
                </div>
              ))}
            </div>

            {/* KPI hero por especialidad */}
            <div className="spec-kpi-hero" key={specialty.id + '-kpi'} style={{ borderColor: `${specialty.color}25` }}>
              <div className="spec-kpi-left">
                <div className="spec-kpi-eye" style={{ color: specialty.color }}>
                  <Icons.AlertCircle size={14} stroke={specialty.color} /> El dato que duele
                </div>
                <div className="spec-kpi-value" style={{ color: specialty.color }}>{specialty.bigNumber.value}</div>
                <div className="spec-kpi-label">{specialty.bigNumber.label}</div>
              </div>
              <div className="spec-kpi-divider" style={{ background: `${specialty.color}25` }}></div>
              <div className="spec-kpi-right">
                <div className="spec-kpi-eye"><Icons.TrendingUp size={14} stroke="#10B981" /> Con MEDACCER</div>
                <div className="spec-kpi-metric">{specialty.metric}</div>
                <div className="spec-kpi-metric-label">{specialty.metricLabel}</div>
              </div>
            </div>

            {/* Pain → Solution */}
            <div className="spec-pain-grid" key={specialty.id + '-pain'}>
              <div className="spec-pain-card spec-pain-pain">
                <div className="spec-pain-tag">😤 El problema</div>
                <div className="spec-pain-text">{specialty.pain}</div>
              </div>
              <div className="spec-pain-arrow" style={{ color: specialty.color }}>→</div>
              <div className="spec-pain-card spec-pain-sol" style={{ borderColor: `${specialty.color}40` }}>
                <div className="spec-pain-tag" style={{ color: specialty.color }}>✨ MEDACCER lo resuelve</div>
                <div className="spec-pain-text">{specialty.valueProp}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* (sección especialidades antigua eliminada — ahora va justo debajo del hero) */}

      {/* PROBLEM / STATS - reescrito honesto */}
      <section className="section" id="producto">
        <div className="section-label">El contexto</div>
        <h2 className="section-title">Los consultorios independientes pierden <em>horas cada día</em> respondiendo WhatsApp manualmente.</h2>
        <p className="section-sub">No es por falta de atención — es que 1 persona no puede contestar mensajes, agendar citas, confirmar asistencias y atender pacientes al mismo tiempo. MEDACCER libera ese tiempo con una IA que entiende tu agenda y tu especialidad.</p>
        <div style={{ margin: '48px 0 56px' }}>
          <ProblemVisual />
        </div>
        <div className="stats-strip">
          <div>
            <div className="stat-num">95%</div>
            <div className="stat-label">Tasa de apertura de WhatsApp en LATAM</div>
          </div>
          <div>
            <div className="stat-num">40%</div>
            <div className="stat-label">Reducción esperada de no‑shows con recordatorios IA</div>
          </div>
          <div>
            <div className="stat-num">48h</div>
            <div className="stat-label">Setup completo y en producción</div>
          </div>
          <div>
            <div className="stat-num">24/7</div>
            <div className="stat-label">Tu consultorio siempre agenda citas</div>
          </div>
        </div>
      </section>

      {/* MODULES INTERACTIVOS */}
      <section className="section" id="como">
        <div className="section-label">Módulos incluidos</div>
        <h2 className="section-title">Un asistente. <em>Todo</em> el consultorio.</h2>
        <p className="section-sub">9 módulos trabajando juntos. Click en cada uno para ver cómo funciona en tu especialidad.</p>
        <ModulesInteractive specialty={specialty} />
      </section>

      {/* ROI CALCULATOR */}
      <section className="section" id="roi">
        <div className="section-label">Calculadora ROI</div>
        <h2 className="section-title">Calcula cuánto te <em>ahorrarías</em> con MEDACCER.</h2>
        <p className="section-sub">Mueve los deslizadores según tu consultorio real. Los números son estimaciones basadas en benchmarks reales de LATAM, no promesas.</p>
        <ROICalculator />
      </section>

      {/* INTEGRATIONS */}
      <section className="section" id="integraciones">
        <div className="section-label">Integraciones</div>
        <h2 className="section-title">Conecta MEDACCER con lo que <em>ya usas.</em></h2>
        <p className="section-sub">Se conecta con las apps que ya usas. Sin migrar datos, sin cambiar de número, sin contratar un técnico.</p>
        <div style={{ margin: '48px 0 40px' }}>
          <EcosystemDiagram />
        </div>
        <div className="integrations-simple-grid">
          {[
            { icon: '💬', name: 'WhatsApp', desc: 'Tu número actual, sin cambiarlo' },
            { icon: '📅', name: 'Google Calendar', desc: 'Ve tu agenda en tiempo real' },
            { icon: '💳', name: 'Pagos online', desc: 'Cobra por link desde el chat' },
            { icon: '📧', name: 'Email', desc: 'Recordatorios y confirmaciones' },
            { icon: '📱', name: 'SMS de respaldo', desc: 'Cuando no responden WhatsApp' },
            { icon: '🏥', name: 'MinSalud RDA', desc: 'Cumple Resolución 1888 automático' },
            { icon: '⭐', name: 'Reseñas Google', desc: 'Pide reseñas a pacientes felices' },
            { icon: '🔗', name: 'Tus apps actuales', desc: 'Conectamos lo que necesites' },
          ].map((intg, i) => (
            <div key={i} className="integration-simple-card">
              <span className="integration-simple-icon">{intg.icon}</span>
              <div>
                <div className="integration-simple-name">{intg.name}</div>
                <div className="integration-simple-desc">{intg.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS - DARK */}
      <section className="section-dark" id="flow">
        <div className="section-label" style={{ color: 'var(--m-teal)' }}>Cómo funciona</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 52, lineHeight: 1.05, letterSpacing: '-0.025em', fontWeight: 400, margin: '0 0 56px', maxWidth: 760 }}>
          En <em style={{ color: 'var(--m-teal)' }}>48 horas</em> tu consultorio opera solo.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {[
            { n: '01', t: 'Conectas WhatsApp', d: 'Autorizas tu número en WhatsApp Business Cloud. Sin cambiar de número, sin perder historial.', time: '15 min' },
            { n: '02', t: 'Conectas Google', d: 'Un click en "Conectar con Google". Autorizas acceso a tu Calendar y listo — el bot ve tu agenda real.', time: '5 min', clickable: true },
            { n: '03', t: 'Configuras tu bot', d: 'Servicios, precios, horarios, tono de voz. Todo editable desde el panel, sin tocar código.', time: '30 min' },
            { n: '04', t: 'Listo — a operar', d: 'Tu bot arranca. Empieza a contestar, agendar, recordar y generar RDA mientras tú atiendes.', time: '∞' },
          ].map((s, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 24, cursor: s.clickable ? 'pointer' : 'default' }} onClick={() => s.clickable && setModal('google')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--m-teal)' }}>
                <span>{s.n}</span><span>{s.time}</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 10px', letterSpacing: '-0.01em' }}>{s.t} {s.clickable && <span style={{ fontSize: 11, color: 'var(--m-teal)', marginLeft: 4 }}>ⓘ</span>}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EARLY ACCESS — primeros 50 consultorios */}
      <section className="section early-access-section" id="early-access">
        <div className="early-access-card">
          <div className="early-access-left">
            <div className="early-access-eye">
              <span className="dot-live" style={{ background: '#F59E0B' }}></span>
              Cohorte fundadora · cupos limitados
            </div>
            <h2 className="early-access-title">
              Sé uno de los <em>primeros 50 consultorios</em> en MEDACCER.
            </h2>
            <p className="early-access-sub">
              Estamos arrancando. Si entras ahora, tendrás soporte 1:1 directo con el equipo fundador, precio congelado de por vida, y prioridad en feature requests. Cuando lleguemos a 50 consultorios activos, esto se cierra y la cohorte siguiente paga 30% más.
            </p>
            <div className="early-access-perks">
              <div className="early-perk">
                <div className="early-perk-icon" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#D97706' }}><Icons.Heart size={18} stroke="#D97706" /></div>
                <div>
                  <div className="early-perk-title">Soporte 1:1 con fundadores</div>
                  <div className="early-perk-text">Tu WhatsApp directo al equipo. Sin tickets, sin help desk genérico.</div>
                </div>
              </div>
              <div className="early-perk">
                <div className="early-perk-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}><Icons.Lock size={18} stroke="#059669" /></div>
                <div>
                  <div className="early-perk-title">Precio congelado de por vida</div>
                  <div className="early-perk-text">Cuando subamos precios en 2027, tú sigues pagando lo que pagaste hoy.</div>
                </div>
              </div>
              <div className="early-perk">
                <div className="early-perk-icon" style={{ background: 'rgba(10, 107, 191, 0.12)', color: '#0A6BBF' }}><Icons.Sparkles size={18} stroke="#0A6BBF" /></div>
                <div>
                  <div className="early-perk-title">Voz en el roadmap</div>
                  <div className="early-perk-text">Tus feature requests entran al top de la cola. Co-construyes el producto.</div>
                </div>
              </div>
              <div className="early-perk">
                <div className="early-perk-icon" style={{ background: 'rgba(139, 92, 246, 0.12)', color: '#7C3AED' }}><Icons.Shield size={18} stroke="#7C3AED" /></div>
                <div>
                  <div className="early-perk-title">Setup gratis y migración asistida</div>
                  <div className="early-perk-text">Te migramos tu base de pacientes desde Excel, Doctoralia o lo que uses, sin costo.</div>
                </div>
              </div>
            </div>
            <div className="early-access-ctas">
              <button className="btn btn-primary btn-lg" onClick={() => window.location.hash = 'signup'}>
                Quiero ser de los primeros 50 <Icons.ArrowRight size={16} stroke="white" />
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => setModal('agendar')}>
                <Icons.Calendar size={14} /> Hablar con el fundador
              </button>
            </div>
          </div>
          <div className="early-access-right">
            <div className="early-counter">
              <div className="early-counter-num">12<span className="early-counter-of">/50</span></div>
              <div className="early-counter-label">Consultorios en la cohorte fundadora</div>
              <div className="early-progress">
                <div className="early-progress-fill" style={{ width: '24%' }}></div>
              </div>
              <div className="early-counter-hint">38 cupos disponibles</div>
            </div>
            <div className="early-trust-list">
              <div className="early-trust-item">
                <Icons.Check size={14} stroke="#10B981" /> Sin contrato anual — cancelas cuando quieras
              </div>
              <div className="early-trust-item">
                <Icons.Check size={14} stroke="#10B981" /> Devolución 100% si no te ayuda en 30 días
              </div>
              <div className="early-trust-item">
                <Icons.Check size={14} stroke="#10B981" /> Tus datos siempre son tuyos · exportables
              </div>
              <div className="early-trust-item">
                <Icons.Check size={14} stroke="#10B981" /> Cumple Ley 1581 y Resolución 1888 desde día 1
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="precios">
        <div className="section-label">Precios transparentes</div>
        <h2 className="section-title">Elige tu plan. <em>Cambia cuando quieras.</em></h2>
        <p className="section-sub">Sin permanencia, sin contratos de 12 meses, sin letra pequeña. Cancelas cuando quieras.</p>

        <div className="pricing-grid">
          {[
            { name: 'Starter', price: '129.000', setup: 'Sin costo de setup durante beta',
              features: ['Bot WhatsApp 24/7 con IA', 'Agendamiento automático', 'Recordatorios y confirmaciones', 'Hasta 200 citas / mes', 'Reporte semanal básico', 'Soporte por WhatsApp'], cta: 'Empezar gratis' },
            { name: 'Pro', price: '229.000', featured: true, setup: 'Sin costo de setup durante beta',
              features: ['Todo lo de Starter', 'Hasta 3 profesionales', 'Notas clínicas con IA', 'Citas ilimitadas', 'Lista de espera inteligente', 'Campañas de marketing', 'Gestor de reseñas Google'], cta: 'Más popular' },
            { name: 'Clínica', price: '349.000', setup: 'Sin costo de setup durante beta',
              features: ['Todo lo de Pro', 'Hasta 10 profesionales', 'Generador RDA automático', 'Triage inteligente', 'Dashboard de rentabilidad', 'Bot con tu marca (white‑label)', 'Soporte 1‑on‑1 prioritario'], cta: 'Contactar' },
          ].map((p, i) => (
            <div key={i} className={`price-card ${p.featured ? 'featured' : ''}`}>
              {p.featured && <div className="price-card-badge">Más elegido</div>}
              <div className="price-name">{p.name}</div>
              <div className="price-amount">${p.price}<span style={{ fontSize: 18, color: 'var(--ink-500)', fontFamily: 'var(--font-sans)' }}> COP</span></div>
              <div className="price-period">/mes · sin permanencia</div>
              <div className="price-setup">{p.setup}</div>
              <ul className="price-features">
                {p.features.map((f, j) => <li key={j}><span className="check"><Icons.Check size={16} /></span> {f}</li>)}
              </ul>
              <button className={`btn ${p.featured ? 'btn-primary' : 'btn-outline'} btn-lg`} style={{ width: '100%', justifyContent: 'center' }} onClick={() => window.location.hash = 'signup'}>{p.cta}</button>
            </div>
          ))}
        </div>

        <div className="trust-row" style={{ marginTop: 48, justifyContent: 'center' }}>
          <div><Icons.Shield size={16} stroke="#0A6BBF" /> Cumple Ley 1581 y Resolución 1888/2025</div>
          <div><Icons.Lock size={16} stroke="#0A6BBF" /> Cifrado AES-256 y TLS 1.3</div>
          <div><Icons.Check size={16} stroke="#10B981" /> Acceso beta sin tarjeta</div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="section" id="testimonios">
        <div className="section-label">Testimonios</div>
        <h2 className="section-title">Esperando a los <em>primeros 50.</em></h2>
        <p className="section-sub">Somos un producto nuevo y honesto. Todavía no tenemos testimonios — los primeros consultorios los están escribiendo. Si entras ahora, el tuyo puede ser el primero.</p>
        <div className="testimonials-waiting">
          <div className="tw-icon">
            <Icons.MessageSquare size={32} stroke="#2563EB" />
          </div>
          <div className="tw-text">
            <div className="tw-label">Cohorte fundadora activa</div>
            <p className="tw-desc">Los primeros 50 consultorios en MEDACCER tendrán soporte 1:1 directo con el equipo fundador. Sus historias reales serán las primeras en aparecer aquí.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => window.location.hash = 'signup'}>
            Sé el primero <Icons.ArrowRight size={16} stroke="white" />
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="section-label">Preguntas frecuentes</div>
        <h2 className="section-title">Lo que todos <em>nos preguntan.</em></h2>
        <div className="faq-list">
          {[
            { q: '¿Necesito cambiar de software o número de WhatsApp?', a: 'No. MEDACCER se conecta a tu número actual vía WhatsApp Business Cloud API (Meta) y a tu Google Calendar existente. No migras datos, no pierdes historial, no cambias de número.' },
            { q: '¿Mi número de WhatsApp Business actual puede ser bloqueado por usar esto?', a: 'No. Usamos la API oficial de WhatsApp Business Cloud autorizada por Meta — no es un scraping ni una integración no oficial. Tu número pasa a ser un número "Business Verified" con el check verde de WhatsApp, y cumple todas las políticas de Meta sobre mensajes comerciales y plantillas.' },
            { q: '¿Qué pasa si el paciente no tiene WhatsApp?', a: 'MEDACCER envía los recordatorios y confirmaciones también por SMS (Twilio) y email (Postmark) como respaldo. El paciente puede confirmar respondiendo "SI" al SMS o haciendo click en el link del email. Toda la actividad se centraliza en el mismo panel.' },
            { q: '¿Funciona sin internet en el consultorio?', a: 'El bot corre en la nube — siempre está disponible para tus pacientes. Tú y tu equipo accedemos al CRM por navegador (funciona en modo degradado si se cae tu internet: lee tus datos recientes en caché). La app móvil próximamente incluirá modo offline completo.' },
            { q: '¿Cómo funciona el cumplimiento de la Resolución 1888/2025?', a: 'Después de cada consulta, el doctor dicta un resumen por voz. Nuestra IA lo transcribe, lo estructura en formato HL7 FHIR y lo envía a la plataforma de interoperabilidad del Ministerio. Todo automático, cumpliendo el plazo legal del 15 de abril de 2026.' },
            { q: '¿Migro desde mi software actual (Clinic Cloud, Doctoralia, etc.)?', a: 'Sí. Durante el onboarding importamos tu base de pacientes desde CSV, Excel, Google Sheets o directamente desde 8 softwares del mercado: Clinic Cloud, Doctoralia, Medika, Agendapro, Calendly, Google Sheets, Excel y archivos planos. Tu histórico se mantiene.' },
            { q: '¿Qué pasa si la IA no entiende al paciente?', a: 'Escala automáticamente a ti o a tu asistente vía WhatsApp Business con todo el contexto de la conversación. La IA resuelve la mayoría de los casos y el resto llega clasificado y listo para responder en 1 click.' },
            { q: '¿Puedo personalizar los flujos del bot sin saber programar?', a: 'Sí. Todo se edita desde un panel visual: servicios, precios, horarios, tono de voz, preguntas de triage, plantillas de recordatorios, mensajes post‑consulta. Si necesitas algo más avanzado, incluimos integración con n8n para construir automatizaciones complejas arrastrando nodos (sin código).' },
            { q: '¿Mis datos y los de mis pacientes están seguros?', a: 'Sí. Cifrado AES-256 en reposo, TLS 1.3 en tránsito, servidores en AWS São Paulo (región Sur América para latencia baja), cumplimiento de Ley 1581 de protección de datos. Tus pacientes firman consentimiento digital al iniciar conversación con el bot. Certificación SOC 2 Type II en proceso.' },
            { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. Sin permanencia, sin letra pequeña. Cancelas desde el panel en dos clicks y exportas todos tus datos (pacientes, citas, conversaciones, RDAs) en CSV + PDF. El setup es el único pago único — la mensualidad se prorratea al día y se reembolsa lo no consumido.' },
            { q: '¿Cuánto cuesta realmente? ¿Hay costos ocultos?', a: 'Cero costos ocultos. La mensualidad incluye: mensajes WhatsApp ilimitados (pagados por MEDACCER a Meta), SMS de respaldo (hasta 500/mes por consultorio), almacenamiento de datos, soporte técnico, actualizaciones. Los únicos extras posibles son: (1) SMS adicionales si superas 500/mes ($180 COP c/u) y (2) custom integrations fuera del catálogo estándar (cotización individual).' },
            { q: '¿Funciona para mi especialidad?', a: 'MEDACCER está diseñado para 7 especialidades: medicina general, dermatología, fisioterapia, nutrición, odontología, medicina estética y psicología. Durante el onboarding configuramos vocabulario, servicios, precios y flujos específicos a tu práctica. Si tu especialidad no está en la lista, agéndate una llamada — la estamos agregando progresivamente.' },
          ].map((f, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                {f.q} <Icons.ChevronDown size={20} stroke="#6B7688" />
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <div className="cta-final">
        <h2>¿Listo para recuperar<br/><em style={{ fontStyle: 'italic' }}>el control</em> de tu consultorio?</h2>
        <p>Sin tarjeta. Tu bot respondiendo pacientes esta misma semana. Cancelas cuando quieras.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', position: 'relative', flexWrap: 'wrap' }}>
          <button className="btn btn-coral btn-lg" onClick={() => window.location.hash = 'signup'}>Empezar ahora <Icons.ArrowRight size={16} stroke="white" /></button>
          <button className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => setModal('agendar')}><Icons.Calendar size={14} stroke="white" /> Agendar con un especialista</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="m-logo" style={{ color: 'white', marginBottom: 16 }}><div className="m-logo-mark">M</div> MEDACCER</div>
            <p style={{ color: 'var(--ink-400)', fontSize: 14, lineHeight: 1.6, maxWidth: 300 }}>Automatización con IA para consultorios médicos y odontológicos independientes en Colombia y LATAM.</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <div style={{ padding: '6px 10px', background: 'var(--ink-800)', borderRadius: 6, fontSize: 12 }}>🇨🇴 Bogotá, Colombia</div>
              <div style={{ padding: '6px 10px', background: 'var(--ink-800)', borderRadius: 6, fontSize: 12 }}>🌎 LATAM</div>
            </div>
          </div>
          <div>
            <h4>Producto</h4>
            <ul>
              <li><a href="#como" onClick={(e) => { e.preventDefault(); scrollTo('como'); }}>Módulos</a></li>
              <li><a href="#flow" onClick={(e) => { e.preventDefault(); scrollTo('flow'); }}>Cómo funciona</a></li>
              <li><a href="#roi" onClick={(e) => { e.preventDefault(); scrollTo('roi'); }}>Calculadora ROI</a></li>
              <li><a href="#integraciones" onClick={(e) => { e.preventDefault(); scrollTo('integraciones'); }}>Integraciones</a></li>
              <li><a href="#precios" onClick={(e) => { e.preventDefault(); scrollTo('precios'); }}>Precios</a></li>
              <li><a href="#res1888" onClick={(e) => { e.preventDefault(); setModal('res1888'); }}>Resolución 1888</a></li>
            </ul>
          </div>
          <div>
            <h4>Especialidades</h4>
            <ul>
              {SPECIALTIES.map(s => <li key={s.id}><a href="#" onClick={(e) => { e.preventDefault(); setSpecialty(s); scrollTo('demo'); }}>{s.label}</a></li>)}
            </ul>
          </div>
          <div>
            <h4>Recursos</h4>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#res1888" onClick={(e) => { e.preventDefault(); setModal('res1888'); }}>Guía Resolución 1888</a></li>
              <li><a href="mailto:medaccer@gmail.com">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="terminos.html">Términos</a></li>
              <li><a href="privacidad.html">Privacidad</a></li>
              <li><a href="ley-1581.html">Ley 1581</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 MEDACCER SAS. Todos los derechos reservados.</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="mailto:medaccer@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>medaccer@gmail.com</a>
          </div>
        </div>
      </footer>

      {/* MODAL Resolución 1888 */}
      <Modal open={modal === 'res1888'} onClose={() => setModal(null)} title="Resolución 1888 de 2025" size="lg">
        <div style={{ padding: '4px 4px 0' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <span className="chip chip-blue">Normativa</span>
            <span className="chip chip-amber">Plazo: 15 abr 2026</span>
            <span className="chip chip-teal">HL7 FHIR</span>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-700)', marginBottom: 16 }}>
            La <b>Resolución 1888 de 2025</b> del Ministerio de Salud de Colombia obliga a todos los prestadores de servicios de salud — incluyendo consultorios independientes — a enviar un <b>Resumen Digital de Atención (RDA)</b> después de cada consulta a la plataforma de interoperabilidad nacional.
          </p>
          <div style={{ background: 'var(--m-blue-50)', border: '1px solid var(--m-blue-100)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--m-blue-700)', marginBottom: 8 }}>🗓️ Puntos clave</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.7, color: 'var(--ink-700)' }}>
              <li>Fecha límite: <b>15 de abril de 2026</b></li>
              <li>Formato obligatorio: <b>HL7 FHIR R4</b></li>
              <li>Aplica a <b>todos</b> los prestadores, públicos y privados</li>
              <li>Multas por incumplimiento: hasta <b>1.000 SMMLV</b></li>
            </ul>
          </div>
          <h4 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 10 }}>Cómo MEDACCER lo resuelve</h4>
          <ol style={{ paddingLeft: 18, fontSize: 14, lineHeight: 1.7, color: 'var(--ink-700)', margin: 0 }}>
            <li><b>Dictas un audio</b> de 20‑30s tras cada paciente desde tu móvil.</li>
            <li>Nuestra IA <b>transcribe y estructura</b> la nota en formato SOAP.</li>
            <li>Se genera el <b>RDA en HL7 FHIR R4</b> automáticamente.</li>
            <li>Se <b>envía al Ministerio</b> y queda auditado en tu panel.</li>
          </ol>
          <div style={{ marginTop: 24, padding: 16, background: 'var(--cream)', borderRadius: 12, fontSize: 13, color: 'var(--ink-600)' }}>
            <b>Importante:</b> Durante la beta privada, MEDACCER asesora el cumplimiento 1‑on‑1 sin costo adicional.
          </div>
          <button className="btn btn-primary btn-lg" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }} onClick={() => { setModal(null); window.location.hash = 'signup'; }}>Empezar ahora <Icons.ArrowRight size={16} stroke="white" /></button>
        </div>
      </Modal>

      {/* MODAL Conectar Google */}
      <Modal open={modal === 'google'} onClose={() => setModal(null)} title="Conectar con Google" size="md">
        <div style={{ padding: '4px' }}>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-700)', marginBottom: 20 }}>
            Autorizamos acceso a tu <b>Google Calendar</b> vía OAuth 2.0. Nunca almacenamos tu contraseña — Google nos da un token revocable.
          </p>
          <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 12, padding: 18, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <svg width="32" height="32" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
              <div>
                <div style={{ fontWeight: 600 }}>doctor@consultorio.co</div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Google Calendar · Google Workspace</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-600)', lineHeight: 1.6 }}>
              <div style={{ marginBottom: 6 }}><b>MEDACCER podrá:</b></div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>Ver tu agenda (disponibilidad real)</li>
                <li>Crear, actualizar y cancelar eventos</li>
                <li>Sincronizar con múltiples consultorios</li>
              </ul>
              <div style={{ marginTop: 10 }}><b>No podrá:</b> leer tus emails, archivos de Drive ni acceder a datos fuera de Calendar.</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setModal(null)}>Cancelar</button>
            <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setModal(null)}>Autorizar <Icons.ArrowRight size={14} stroke="white" /></button>
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 14, textAlign: 'center' }}>
            Puedes revocar el acceso en cualquier momento desde <u>myaccount.google.com/permissions</u>
          </div>
        </div>
      </Modal>

      {/* MODAL AGENDAR CITA */}
      <AgendarModal open={modal === 'agendar'} onClose={() => setModal(null)} />

      {/* MODAL Integración individual */}
      {typeof modal === 'string' && modal.startsWith('int:') && (() => {
        const id = modal.slice(4);
        const g = INTEGRATION_GUIDES[id];
        const i = INTEGRATIONS.find(x => x.id === id);
        if (!g || !i) return null;
        return (
          <Modal open={true} onClose={() => setModal(null)} title={g.title} size="lg">
            <div style={{ padding: '4px 4px 0' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20 }}>
                <LogoGlyph kind={i.logo} />
                <div>
                  <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>{i.category} · {i.by}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    {i.status === 'native' && <span className="integration-badge native">Integración nativa</span>}
                    {i.status === 'beta' && <span className="integration-badge beta">Beta</span>}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-700)', marginBottom: 20 }}>{g.what}</p>

              <div style={{ background: 'var(--m-blue-50)', border: '1px solid var(--m-blue-100)', borderRadius: 12, padding: 16, marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--m-blue-700)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Qué incluye</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.7, color: 'var(--ink-700)' }}>
                  {g.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>

              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-600)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cómo se integra</div>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {g.steps.map(s => (
                  <li key={s.n} style={{ display: 'flex', gap: 14, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--ink-100)' }}>
                    <div style={{ minWidth: 32, height: 32, borderRadius: 8, background: 'var(--m-blue)', color: 'white', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14 }}>{s.n}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 3 }}>{s.t}</div>
                      <div style={{ fontSize: 13.5, color: 'var(--ink-600)', lineHeight: 1.55 }}>{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
                <div style={{ background: 'var(--ink-50)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-500)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Detalles técnicos</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-700)', lineHeight: 1.5, fontFamily: 'var(--font-mono)' }}>{g.tech}</div>
                </div>
                <div style={{ background: 'var(--m-teal-50)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--m-teal-600)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Costo</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.5 }}>{g.cost}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setModal('int-all')}>Ver todas las integraciones</button>
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { setModal(null); window.location.hash = 'signup'; }}>Empezar ahora <Icons.ArrowRight size={14} stroke="white" /></button>
              </div>
            </div>
          </Modal>
        );
      })()}

      {/* MODAL Todas las integraciones */}
      <Modal open={modal === 'int-all'} onClose={() => setModal(null)} title="Cómo conectar cada integración" size="lg">
        <div style={{ padding: '4px 4px 0' }}>
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-600)', marginBottom: 20 }}>
            12 integraciones. Click en cualquiera para ver pasos detallados, costos y specs técnicas.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {INTEGRATIONS.map(i => (
              <button key={i.id} className="integration-mini" onClick={() => setModal('int:' + i.id)}>
                <LogoGlyph kind={i.logo} />
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {i.name}
                    {i.status === 'native' && <span className="integration-badge native" style={{ fontSize: 9 }}>Nativo</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{i.category}</div>
                </div>
                <Icons.ArrowRight size={14} stroke="#6B7688" />
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ============================================================
// MODAL — Agendar llamada con especialista
// ============================================================
function AgendarModal({ open, onClose }) {
  const [step, setStep] = React.useState(0);
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', specialty: 'odontologia', email: '', phone: '', notes: '' });
  const [confirmed, setConfirmed] = React.useState(false);

  React.useEffect(() => { if (!open) { setStep(0); setDate(null); setTime(null); setConfirmed(false); } }, [open]);

  // Generate next 14 business days
  const days = React.useMemo(() => {
    const out = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let d = new Date(today);
    d.setDate(d.getDate() + 1);
    while (out.length < 14) {
      if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return out;
  }, []);

  const slots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  const busy = new Set(['10:00', '15:00']); // demo busy slots

  const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const submit = () => {
    setConfirmed(true);
  };

  return (
    <Modal open={open} onClose={onClose} title={confirmed ? '¡Listo! Tu cita está confirmada' : 'Agenda una llamada con un especialista'} size="lg">
      {confirmed ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--m-teal-50)', color: 'var(--m-teal-700)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
            <Icons.Check size={32} stroke="currentColor" />
          </div>
          <p style={{ fontSize: 15, color: 'var(--ink-700)', lineHeight: 1.6, maxWidth: 440, margin: '0 auto 16px' }}>
            Te enviamos la confirmación a <b>{form.email}</b> con el enlace de Google Meet y un recordatorio vía WhatsApp 30 minutos antes.
          </p>
          <div style={{ background: 'var(--ink-50)', borderRadius: 12, padding: 18, maxWidth: 420, margin: '0 auto', textAlign: 'left', fontSize: 13, color: 'var(--ink-700)' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}><Icons.Calendar size={14} stroke="var(--m-blue)" /> <b>{date && dayNames[date.getDay()]} {date && date.getDate()} {date && monthNames[date.getMonth()]}</b> · <span>{time} (COT)</span></div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}><Icons.User size={14} stroke="var(--m-blue)" /> Con <b>Dr. Andrés López</b> · Onboarding MEDACCER</div>
            <div style={{ display: 'flex', gap: 10 }}><Icons.Clock size={14} stroke="var(--m-blue)" /> 30 minutos · Google Meet (enlace por email)</div>
          </div>
          <button className="btn btn-primary btn-lg" style={{ marginTop: 24 }} onClick={onClose}>Cerrar <Icons.Check size={14} stroke="white" /></button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20, fontSize: 13, color: 'var(--ink-600)' }}>
            {['Fecha y hora', 'Tus datos'].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: step >= i ? 'var(--m-blue)' : 'var(--ink-200)', color: step >= i ? 'white' : 'var(--ink-500)', fontSize: 11, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{i + 1}</div>
                <span style={{ color: step === i ? 'var(--ink-900)' : 'var(--ink-500)', fontWeight: step === i ? 600 : 400 }}>{s}</span>
              </div>
            ))}
          </div>

          {step === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--ink-800)' }}>Elige un día</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
                  {days.map((d, i) => {
                    const sel = date && d.toDateString() === date.toDateString();
                    return (
                      <button key={i} onClick={() => { setDate(d); setTime(null); }} style={{ border: sel ? '2px solid var(--m-blue)' : '1px solid var(--ink-200)', background: sel ? 'var(--m-blue-50)' : 'white', borderRadius: 10, padding: '10px 4px', cursor: 'pointer', textAlign: 'center', fontFamily: 'inherit' }}>
                        <div style={{ fontSize: 10, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{dayNames[d.getDay()]}</div>
                        <div style={{ fontSize: 20, fontFamily: 'var(--font-serif)', fontWeight: 400, color: sel ? 'var(--m-blue)' : 'var(--ink-900)', margin: '2px 0' }}>{d.getDate()}</div>
                        <div style={{ fontSize: 10, color: 'var(--ink-500)' }}>{monthNames[d.getMonth()]}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--ink-800)' }}>
                  {date ? `Horarios — ${dayNames[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]}` : 'Elige una hora'}
                </div>
                {date ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                    {slots.map(s => {
                      const isBusy = busy.has(s);
                      const sel = time === s;
                      return (
                        <button key={s} disabled={isBusy} onClick={() => setTime(s)} style={{ border: sel ? '2px solid var(--m-teal)' : '1px solid var(--ink-200)', background: isBusy ? 'var(--ink-100)' : sel ? 'var(--m-teal-50)' : 'white', borderRadius: 10, padding: '10px', cursor: isBusy ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: isBusy ? 'var(--ink-400)' : sel ? 'var(--m-teal-700)' : 'var(--ink-800)', textDecoration: isBusy ? 'line-through' : 'none' }}>
                          {s}
                        </button>
                      );
                    })}
                    <div style={{ gridColumn: '1 / -1', fontSize: 11, color: 'var(--ink-500)', marginTop: 4 }}>
                      Zona horaria: Bogotá (COT, UTC-5). Tachado = ocupado.
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: 24, background: 'var(--ink-50)', borderRadius: 10, color: 'var(--ink-500)', fontSize: 13, textAlign: 'center' }}>
                    Selecciona un día del calendario primero
                  </div>
                )}
              </div>
              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <button disabled={!date || !time} onClick={() => setStep(1)} className="btn btn-primary btn-lg" style={{ opacity: (date && time) ? 1 : 0.4, cursor: (date && time) ? 'pointer' : 'not-allowed' }}>
                  Continuar <Icons.ArrowRight size={14} stroke="white" />
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <div style={{ background: 'var(--m-blue-50)', border: '1px solid var(--m-blue-100)', borderRadius: 10, padding: '12px 14px', marginBottom: 20, fontSize: 13, color: 'var(--m-blue-700)', display: 'flex', gap: 10, alignItems: 'center' }}>
                <Icons.Calendar size={16} stroke="var(--m-blue)" />
                <b>{dayNames[date.getDay()]} {date.getDate()} {monthNames[date.getMonth()]}</b> · {time} (COT) · 30 min
                <button onClick={() => setStep(0)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--m-blue)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>Cambiar</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--ink-700)' }}>Nombre completo</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dra. Ana Pérez" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--ink-700)' }}>Especialidad</label>
                  <select value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', background: 'white' }}>
                    <option value="odontologia">Odontología</option>
                    <option value="estetica">Medicina estética</option>
                    <option value="psicologia">Psicología</option>
                    <option value="fisioterapia">Fisioterapia</option>
                    <option value="nutricion">Nutrición</option>
                    <option value="dermatologia">Dermatología</option>
                    <option value="medicina-general">Medicina general</option>
                    <option value="otra">Otra</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--ink-700)' }}>Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="dra.perez@consultorio.co" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--ink-700)' }}>WhatsApp</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+57 300 123 4567" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--ink-700)' }}>¿Qué te gustaría revisar en la llamada? (opcional)</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Ej: Tengo 3 consultorios en Bogotá y Medellín, quiero saber si MEDACCER escala a multi-sede." rows={3} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 13.5, fontFamily: 'inherit', resize: 'vertical' }} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)', marginBottom: 20, lineHeight: 1.5 }}>
                Al agendar aceptas que MEDACCER procese tus datos de contacto según la <a href="#" style={{ color: 'var(--m-blue)' }}>Ley 1581 de 2012</a>. No se comparten con terceros.
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button onClick={() => setStep(0)} className="btn btn-outline">← Atrás</button>
                <button disabled={!form.name || !form.email || !form.phone} onClick={submit} className="btn btn-primary btn-lg" style={{ opacity: (form.name && form.email && form.phone) ? 1 : 0.5 }}>
                  Confirmar cita <Icons.Check size={14} stroke="white" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

window.Landing = Landing;
window.ChatDemo = ChatDemo;
window.ChatDemoPro = ChatDemoPro;
