/* global React, Icons, SPECIALTIES */

// ============================================================
// BLOG PAGE — contenido de alto valor, lectura real, recursos
// ============================================================

const AUTHORS = {
  sofia: { name: 'Dra. Sofía Mendoza', role: 'Directora clínica', initials: 'SM', color: '#0A6BBF' },
  daniel: { name: 'Daniel Restrepo', role: 'Legal & Normativa', initials: 'DR', color: '#10B981' },
  valeria: { name: 'Valeria Ortiz', role: 'UX clínica', initials: 'VO', color: '#F59E0B' },
  andres: { name: 'Andrés Patiño', role: 'IA & producto', initials: 'AP', color: '#8B5CF6' },
};

const BLOG_POSTS = [
  // Normativa (relevante a todas las especialidades)
  { id: 1, spec: ['all'], cat: 'Normativa', author: 'daniel', title: 'Resolución 1888/2025: guía práctica para cumplir el RDA antes del 15 de abril', excerpt: 'Todo lo que un consultorio independiente necesita saber sobre el Resumen Digital de Atención, los plazos y cómo automatizarlo sin migrar de software.', time: '8 min', date: '18 abr 2026', featured: true, tag: 'Destacado' },
  { id: 2, spec: ['all'], cat: 'Normativa', author: 'daniel', title: 'Ley 1581 en la práctica: consentimiento digital al iniciar conversación por WhatsApp', excerpt: 'Cómo cumplir protección de datos sin hacer firmar 3 papeles al paciente.', time: '6 min', date: '10 abr 2026' },

  // Por especialidad
  { id: 10, spec: ['medicina-general'], cat: 'Medicina general', author: 'sofia', title: 'Triage automatizado: qué síntomas debe escalar el bot a humano', excerpt: 'Matriz de decisión para configurar respuestas automáticas seguras.', time: '7 min', date: '15 abr 2026' },
  { id: 11, spec: ['medicina-general'], cat: 'Medicina general', author: 'sofia', title: '5 recordatorios automáticos que reducen el abandono de tratamientos crónicos', excerpt: 'Plantillas listas para tensión, diabetes, tiroides y colesterol.', time: '5 min', date: '9 abr 2026' },

  { id: 20, spec: ['dermatologia'], cat: 'Dermatología', author: 'valeria', title: 'Pre‑evaluación de lesiones por WhatsApp: cómo pedir la foto correcta', excerpt: 'Scripts del bot para obtener iluminación, escala y ángulo útil.', time: '6 min', date: '14 abr 2026' },
  { id: 21, spec: ['dermatologia'], cat: 'Dermatología', author: 'sofia', title: 'Post‑láser: secuencia de cuidados que deberías automatizar', excerpt: 'De día 0 a día 14, mensaje por mensaje.', time: '8 min', date: '6 abr 2026' },

  { id: 30, spec: ['fisioterapia'], cat: 'Fisioterapia', author: 'valeria', title: 'Paquetes de 10 sesiones: cómo evitar que pacientes abandonen en la sesión 4', excerpt: 'Métricas, puntos de fricción y mensajes de reengagement.', time: '9 min', date: '13 abr 2026' },
  { id: 31, spec: ['fisioterapia'], cat: 'Fisioterapia', author: 'andres', title: 'Ejercicios domiciliarios por audio: ¿funcionan los mensajes de voz?', excerpt: 'Lo que medimos en 6 meses de pilotos con fisioterapeutas.', time: '7 min', date: '4 abr 2026' },

  { id: 40, spec: ['nutricion'], cat: 'Nutrición', author: 'valeria', title: 'Registro alimentario diario sin fricción: qué hora, qué formato, qué tono', excerpt: 'Hora óptima, longitud del mensaje, respuesta esperada.', time: '6 min', date: '12 abr 2026' },
  { id: 41, spec: ['nutricion'], cat: 'Nutrición', author: 'sofia', title: 'Cuándo responder dudas 24/7 y cuándo dejarlas para la siguiente consulta', excerpt: 'Reglas de escalado para nutricionistas solitarias.', time: '5 min', date: '2 abr 2026' },

  { id: 50, spec: ['odontologia'], cat: 'Odontología', author: 'andres', title: 'Qué tasa de no‑show es razonable y cuándo deberías preocuparte', excerpt: 'Benchmarks por ciudad, franja horaria y tipo de consulta.', time: '5 min', date: '11 abr 2026' },
  { id: 51, spec: ['odontologia'], cat: 'Odontología', author: 'daniel', title: 'Presupuestos de ortodoncia: cómo automatizar el seguimiento de abonos', excerpt: 'Plantillas de cobranza amable que no espantan al paciente.', time: '7 min', date: '28 mar 2026' },

  { id: 60, spec: ['estetica'], cat: 'Medicina estética', author: 'sofia', title: 'Protocolos multi‑sesión: la secuencia de WhatsApp que convierte', excerpt: 'Láser, toxina, rellenos — cada uno con su propio flujo.', time: '8 min', date: '10 abr 2026' },
  { id: 61, spec: ['estetica'], cat: 'Medicina estética', author: 'valeria', title: 'Solicitar foto antes/después sin que el paciente se sienta vigilado', excerpt: 'Tono, timing y permisos en 4 mensajes.', time: '6 min', date: '27 mar 2026' },

  { id: 70, spec: ['psicologia'], cat: 'Psicología', author: 'valeria', title: 'Recordatorios discretos: cómo confirmar sin revelar motivo de consulta', excerpt: 'Plantillas respetuosas con la privacidad del paciente.', time: '7 min', date: '9 abr 2026' },
  { id: 71, spec: ['psicologia'], cat: 'Psicología', author: 'sofia', title: 'Sesiones recurrentes: agenda automática quincenal sin choques', excerpt: 'Reglas para evitar sobre‑agenda con pacientes regulares.', time: '6 min', date: '26 mar 2026' },

  // Generales / IA
  { id: 80, spec: ['all'], cat: 'IA', author: 'andres', title: '5 automatizaciones que todo consultorio debería tener', excerpt: 'Plantillas listas: recordatorios, cumpleaños, seguimiento post‑op y más.', time: '7 min', date: '8 abr 2026' },
  { id: 81, spec: ['all'], cat: 'IA', author: 'andres', title: 'Cómo escribir el tono de voz de tu bot en 15 minutos', excerpt: 'Ejercicio práctico: 6 preguntas, un resultado.', time: '5 min', date: '5 abr 2026' },
  { id: 82, spec: ['all'], cat: 'Práctica', author: 'daniel', title: 'WhatsApp Business vs Cloud API: cuál necesita tu consultorio', excerpt: 'Diferencias, precios, límites y quién debe usar cada uno.', time: '6 min', date: '1 abr 2026' },
];

// Rutas de aprendizaje por nivel
const LEARNING_PATHS = [
  {
    level: 'Empieza aquí',
    levelColor: '#10B981',
    title: 'Primeros 30 días con MEDACCER',
    desc: 'El camino mínimo para dejar de gestionar agenda a mano sin romper nada.',
    steps: 5,
    time: '~35 min de lectura',
    topics: ['Configurar tono del bot', 'Conectar Google Calendar', 'Primeros recordatorios', 'Escalado a humano', 'Medición básica'],
  },
  {
    level: 'Intermedio',
    levelColor: '#0A6BBF',
    title: 'Automatización por especialidad',
    desc: 'Flujos específicos para protocolos multi‑sesión, triage y seguimiento post‑consulta.',
    steps: 7,
    time: '~60 min de lectura',
    topics: ['Matrices de triage', 'Secuencias post‑consulta', 'Audios clínicos', 'Reengagement', 'Paquetes de sesiones', 'Cobranza amable', 'Fotos de seguimiento'],
  },
  {
    level: 'Avanzado',
    levelColor: '#8B5CF6',
    title: 'Dashboard de rentabilidad y decisiones',
    desc: 'Cómo leer tus métricas, identificar fricciones y decidir sobre precios, franjas y mix de servicios.',
    steps: 6,
    time: '~50 min de lectura',
    topics: ['LTV por paciente', 'Análisis de no‑show', 'Horas valle', 'Mix de procedimientos', 'Reseñas vs recompra', 'Cuándo contratar'],
  },
];

// Recursos descargables
const RESOURCES = [
  { icon: 'FileText', title: 'Plantilla consentimiento Ley 1581', desc: 'Texto legal listo para enviar al abrir conversación por WhatsApp.', format: 'PDF · 2 páginas' },
  { icon: 'Zap', title: 'Matriz de triage por síntomas', desc: 'Excel con 47 síntomas y su acción sugerida (bot / escalar / urgencia).', format: 'XLSX · editable' },
  { icon: 'Clock', title: 'Secuencia post‑consulta (14 días)', desc: 'Mensajes día a día para adherencia a tratamiento.', format: 'Notion template' },
  { icon: 'Bot', title: 'Cheat sheet: tono del bot', desc: '6 preguntas para definir personalidad de tu asistente.', format: 'PDF · 1 página' },
];

// ============================================================

function BlogPage() {
  const [specFilter, setSpecFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [suggestOpen, setSuggestOpen] = React.useState(false);
  const [suggestion, setSuggestion] = React.useState('');
  const [suggestSent, setSuggestSent] = React.useState(false);
  const [readerOpen, setReaderOpen] = React.useState(null);
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSent, setNewsletterSent] = React.useState(false);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const filtered = BLOG_POSTS.filter(p => {
    if (specFilter !== 'all' && !p.spec.includes(specFilter) && !p.spec.includes('all')) return false;
    if (search && !(p.title + ' ' + p.excerpt).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  const submitSuggestion = (e) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    setSuggestSent(true);
    setTimeout(() => { setSuggestOpen(false); setSuggestion(''); setSuggestSent(false); }, 2600);
  };

  const submitNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSent(true);
    setTimeout(() => { setNewsletterSent(false); setNewsletterEmail(''); }, 3200);
  };

  return (
    <div className="landing blog-page">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="m-logo" style={{ cursor: 'pointer' }} onClick={() => window.location.hash = 'landing'}><div className="m-logo-mark">M</div> MEDACCER</div>
          <div className="nav-links" style={{ flex: 1 }}>
            <a href="#landing">Producto</a>
            <a href="#landing">Cómo funciona</a>
            <a href="#landing">Precios</a>
            <a href="#blog" style={{ color: 'var(--m-blue)', fontWeight: 600 }}>Blog</a>
            <a href="#landing">Resolución 1888</a>
          </div>
          <button className="btn btn-ghost" onClick={() => window.location.hash = 'login'}>Iniciar sesión</button>
          <button className="btn btn-primary" onClick={() => window.location.hash = 'signup'}>Empezar prueba gratis <Icons.ArrowRight size={16} stroke="white" /></button>
        </div>
      </nav>

      {/* BLOG HERO */}
      <section className="blog-hero">
        <div className="blog-hero-inner">
          <div>
            <div className="hero-eyebrow">
              <Icons.Sparkles size={14} stroke="#0A6BBF" /> Blog MEDACCER · actualizado cada semana
            </div>
            <h1 className="blog-hero-title">
              Guías prácticas para <em>modernizar</em> tu consultorio.
            </h1>
            <p className="blog-hero-sub">
              Casos reales, plantillas listas y análisis regulatorio escrito por el equipo clínico de MEDACCER — médicos, psicólogos y un abogado especializado en salud digital.
            </p>

            <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => scrollTo('articles')}>
                <Icons.ArrowRight size={14} stroke="white" /> Ver artículos
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => scrollTo('learning')}>
                <Icons.BookOpen size={14} /> Rutas de aprendizaje
              </button>
            </div>

            {/* Autores del equipo */}
            <div className="blog-team">
              <div className="blog-team-label">Equipo editorial</div>
              <div className="blog-team-row">
                {Object.values(AUTHORS).map((a, i) => (
                  <div key={i} className="blog-team-member" title={`${a.name} · ${a.role}`}>
                    <div className="blog-author-av" style={{ background: a.color }}>{a.initials}</div>
                    <div className="blog-team-meta">
                      <div className="blog-team-name">{a.name}</div>
                      <div className="blog-team-role">{a.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured en el hero */}
          {featured && (
            <div className="blog-hero-featured" onClick={() => setReaderOpen(featured)}>
              <div className="blog-hero-featured-img">
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 120, fontWeight: 400, letterSpacing: '-0.03em', color: 'white', lineHeight: 1 }}>1888</div>
                <div className="blog-feat-badge">Artículo destacado</div>
              </div>
              <div className="blog-hero-featured-body">
                <div className="blog-meta">
                  <span className="chip chip-blue">{featured.cat}</span>
                  <span>{featured.time} · {featured.date}</span>
                </div>
                <h3 className="blog-hero-featured-title">{featured.title}</h3>
                <p className="blog-hero-featured-excerpt">{featured.excerpt}</p>
                <div className="blog-hero-author">
                  <div className="blog-author-av-sm" style={{ background: AUTHORS[featured.author].color }}>{AUTHORS[featured.author].initials}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-800)' }}>{AUTHORS[featured.author].name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{AUTHORS[featured.author].role}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: 'var(--m-blue)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    Leer <Icons.ArrowRight size={12} stroke="var(--m-blue)" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* LEARNING PATHS */}
      <section id="learning" className="section blog-learning">
        <div className="section-eyebrow"><Icons.BookOpen size={14} stroke="var(--m-blue)" /> Rutas de aprendizaje</div>
        <h2 className="section-title" style={{ marginBottom: 32 }}>Por dónde empezar, según <em>qué tan lejos</em> quieras llegar.</h2>
        <div className="blog-paths">
          {LEARNING_PATHS.map((p, i) => (
            <div key={i} className="blog-path-card">
              <div className="blog-path-head">
                <div className="blog-path-level" style={{ background: p.levelColor + '18', color: p.levelColor }}>{p.level}</div>
                <div className="blog-path-step">{p.steps} pasos</div>
              </div>
              <div className="blog-path-title">{p.title}</div>
              <div className="blog-path-desc">{p.desc}</div>
              <div className="blog-path-topics">
                {p.topics.map((t, j) => (
                  <div key={j} className="blog-path-topic">
                    <div className="blog-path-num">{String(j + 1).padStart(2, '0')}</div>
                    <div>{t}</div>
                  </div>
                ))}
              </div>
              <div className="blog-path-foot">
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{p.time}</div>
                <button className="btn btn-outline btn-sm" onClick={() => alert('Ruta completa próximamente')}>Empezar ruta →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FILTROS + GRID */}
      <section id="articles" className="section" style={{ paddingTop: 64 }}>
        <div className="section-eyebrow"><Icons.FileText size={14} stroke="var(--m-blue)" /> Todos los artículos</div>
        <h2 className="section-title" style={{ marginBottom: 24 }}>Últimos de <em>cada especialidad</em>.</h2>

        <div className="blog-filters">
          <div className="blog-filter-group">
            <div className="blog-filter-label">Filtrar por especialidad</div>
            <div className="blog-filter-chips">
              <button className={`spec-chip ${specFilter === 'all' ? 'active' : ''}`} onClick={() => setSpecFilter('all')} style={specFilter === 'all' ? { background: 'var(--ink-900)', borderColor: 'var(--ink-900)', color: 'white' } : {}}>Todas</button>
              {SPECIALTIES.map(s => {
                const SIC = Icons[s.icon] || Icons.Stethoscope;
                return (
                  <button
                    key={s.id}
                    className={`spec-chip ${specFilter === s.id ? 'active' : ''}`}
                    onClick={() => setSpecFilter(s.id)}
                    style={specFilter === s.id ? { background: s.color, borderColor: s.color, color: 'white' } : {}}
                  >
                    <SIC size={12} stroke={specFilter === s.id ? 'white' : s.color} /> {s.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="blog-search">
            <Icons.Search size={16} stroke="var(--ink-500)" />
            <input type="text" placeholder="Buscar artículos…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* GRID */}
        <div className="blog-posts-grid">
          {rest.map(p => {
            const chipColor = p.cat === 'Normativa' ? 'blue' : p.cat === 'IA' ? 'amber' : 'teal';
            const specColor = SPECIALTIES.find(s => p.spec.includes(s.id))?.color || '#0A6BBF';
            const author = AUTHORS[p.author] || AUTHORS.sofia;
            return (
              <article key={p.id} className="blog-post-card" onClick={() => setReaderOpen(p)}>
                <div className="blog-post-img" style={{ background: `linear-gradient(135deg, ${specColor}22, ${specColor}08)` }}>
                  <div className="blog-post-img-cat" style={{ color: specColor }}>{p.cat}</div>
                </div>
                <div className="blog-post-body">
                  <div className="blog-meta">
                    <span className={`chip chip-${chipColor}`}>{p.cat}</span>
                    <span>{p.time}</span>
                  </div>
                  <h3 className="blog-post-title">{p.title}</h3>
                  <p className="blog-post-excerpt">{p.excerpt}</p>
                  <div className="blog-post-foot">
                    <div className="blog-author-av-xs" style={{ background: author.color }}>{author.initials}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-600)', fontWeight: 500 }}>{author.name.replace('Dra. ', '').replace('Dr. ', '')}</div>
                    <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--ink-500)' }}>{p.date}</div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--ink-500)' }}>
            <Icons.Search size={32} stroke="var(--ink-400)" />
            <div style={{ fontSize: 16, marginTop: 12 }}>No hay artículos con esos filtros todavía.</div>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setSuggestOpen(true)}>Sugerir este tema</button>
          </div>
        )}
      </section>

      {/* RECURSOS DESCARGABLES */}
      <section className="section blog-resources">
        <div className="blog-resources-head">
          <div>
            <div className="section-eyebrow"><Icons.Download size={14} stroke="var(--m-blue)" /> Recursos gratuitos</div>
            <h2 className="section-title">Plantillas listas para <em>descargar hoy</em>.</h2>
            <p style={{ fontSize: 16, color: 'var(--ink-600)', maxWidth: 560, marginTop: 12 }}>
              Lo que usamos con nuestros clientes, empaquetado para que lo uses así no seas usuario de MEDACCER.
            </p>
          </div>
        </div>
        <div className="blog-resources-grid">
          {RESOURCES.map((r, i) => {
            const RIC = Icons[r.icon] || Icons.FileText;
            return (
              <div key={i} className="blog-resource-card" onClick={() => alert('Descarga próximamente')}>
                <div className="blog-resource-ic"><RIC size={22} stroke="var(--m-blue)" /></div>
                <div style={{ flex: 1 }}>
                  <div className="blog-resource-title">{r.title}</div>
                  <div className="blog-resource-desc">{r.desc}</div>
                  <div className="blog-resource-meta">
                    <span>{r.format}</span>
                    <span className="blog-resource-cta">Descargar <Icons.Download size={12} stroke="var(--m-blue)" /></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section">
        <div className="blog-newsletter">
          <div className="blog-newsletter-left">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>
              <Icons.Mail size={12} stroke="rgba(255,255,255,0.7)" /> Newsletter semanal
            </div>
            <h3 className="blog-newsletter-title">Un email los martes. Diez minutos. Cero ruido.</h3>
            <p className="blog-newsletter-sub">
              Resumen de lo nuevo en normativa, plantillas de la semana y un caso real por semana. Sin spam, sin venderte nada.
            </p>
            <form onSubmit={submitNewsletter} className="blog-newsletter-form">
              <input type="email" placeholder="doctor@consultorio.co" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} required />
              <button type="submit" className="btn btn-primary">
                {newsletterSent ? <><Icons.Check size={14} stroke="white" /> ¡Listo!</> : <>Suscribirme <Icons.ArrowRight size={14} stroke="white" /></>}
              </button>
            </form>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 10 }}>
              Puedes cancelar con un click. Cumplimos Ley 1581.
            </div>
          </div>
          <div className="blog-newsletter-preview">
            <div className="blog-nlp-head">
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="blog-nlp-dot" style={{ background: '#FF5F57' }}></span>
                <span className="blog-nlp-dot" style={{ background: '#FEBC2E' }}></span>
                <span className="blog-nlp-dot" style={{ background: '#28C840' }}></span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>martes 21 abr 2026 · newsletter #37</div>
            </div>
            <div className="blog-nlp-body">
              <div style={{ fontSize: 11, color: 'var(--ink-500)', marginBottom: 4 }}>De: equipo@medaccer.com</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.2, color: 'var(--ink-900)', marginBottom: 14, fontWeight: 400, letterSpacing: '-0.01em' }}>
                Esta semana: Resolución 1888 prorrogada 30 días + plantilla de triage
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.55, marginBottom: 12 }}>
                El Ministerio extendió el plazo del RDA hasta el 15 de mayo. Aquí te contamos qué cambia (y qué no) para tu consultorio, y publicamos la matriz de triage que más nos pidieron…
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--ink-100)' }}>
                <div style={{ fontSize: 12, color: 'var(--m-blue)', fontWeight: 600 }}>Leer en el navegador →</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUGERIR TEMA */}
      <section className="section">
        <div className="blog-suggest-cta">
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400, color: 'var(--ink-900)', margin: '0 0 10px' }}>
              ¿Hay algo específico de tu práctica que no encuentras?
            </h3>
            <p style={{ fontSize: 16, color: 'var(--ink-600)', maxWidth: 520, lineHeight: 1.55 }}>
              Los temas más pedidos los escribimos primero. Cuéntanos qué necesitas leer y te avisamos cuando salga.
            </p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => setSuggestOpen(true)}>
            <Icons.Plus size={14} stroke="white" /> Sugerir un tema
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <div className="m-logo" style={{ color: 'white', marginBottom: 16 }}><div className="m-logo-mark">M</div> MEDACCER</div>
            <p style={{ color: 'var(--ink-400)', fontSize: 14, lineHeight: 1.6, maxWidth: 400 }}>
              Artículos y recursos para consultorios independientes en Colombia. Empezamos en Bogotá, crecemos lento y bien.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <a href="#landing" style={{ color: 'var(--ink-300)', fontSize: 14 }}>← Volver al sitio principal</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 MEDACCER SAS. Todos los derechos reservados.</div>
          <div>hola@medaccer.com</div>
        </div>
      </footer>

      {/* MODAL Sugerir tema */}
      {suggestOpen && (
        <div className="modal-backdrop" onClick={() => setSuggestOpen(false)}>
          <div className="modal modal-md" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">Sugerir un tema</div>
              <button className="modal-close" onClick={() => setSuggestOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              {suggestSent ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--m-teal-50)', color: 'var(--m-teal)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
                    <Icons.Check size={32} stroke="var(--m-teal)" />
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>¡Tema registrado!</div>
                  <div style={{ fontSize: 14, color: 'var(--ink-600)' }}>Lo evaluamos y te avisamos si lo escribimos.</div>
                </div>
              ) : (
                <form onSubmit={submitSuggestion}>
                  <p style={{ fontSize: 14, color: 'var(--ink-600)', marginBottom: 20, lineHeight: 1.5 }}>
                    ¿Hay algo específico de tu práctica que te gustaría que contáramos?
                  </p>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Tu especialidad</label>
                  <select style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', marginBottom: 14, background: 'white' }}>
                    {SPECIALTIES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Tema o pregunta</label>
                  <textarea
                    value={suggestion}
                    onChange={e => setSuggestion(e.target.value)}
                    rows={4}
                    placeholder="Ej: Cómo agendar urgencias de fin de semana sin quemarse"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', resize: 'vertical', marginBottom: 14 }}
                  />
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Tu email (opcional)</label>
                  <input type="email" placeholder="doctor@consultorio.co" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', marginBottom: 20 }} />
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>Enviar sugerencia <Icons.Send size={14} stroke="white" /></button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL LECTOR */}
      {readerOpen && <BlogReader post={readerOpen} onClose={() => setReaderOpen(null)} />}
    </div>
  );
}

// ============================================================
// BLOG READER — modal de lectura con artículo real
// ============================================================

function BlogReader({ post, onClose }) {
  const author = AUTHORS[post.author] || AUTHORS.sofia;
  const [progress, setProgress] = React.useState(0);
  const bodyRef = React.useRef(null);

  React.useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const onScroll = () => {
      const pct = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
      setProgress(Math.min(1, Math.max(0, pct)));
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Contenido específico según el artículo
  const content = getArticleContent(post.id);

  return (
    <div className="reader-backdrop" onClick={onClose}>
      <div className="reader-pane" onClick={e => e.stopPropagation()}>
        <div className="reader-progress"><div style={{ width: `${progress * 100}%` }}></div></div>
        <button className="reader-close" onClick={onClose} aria-label="Cerrar"><Icons.X size={20} stroke="var(--ink-700)" /></button>
        <div className="reader-body" ref={bodyRef}>
          <div className="reader-inner">
            <div className="reader-meta">
              <span className="chip chip-blue">{post.cat}</span>
              <span style={{ fontSize: 13, color: 'var(--ink-500)' }}>{post.time} · {post.date}</span>
            </div>
            <h1 className="reader-title">{post.title}</h1>
            <div className="reader-excerpt">{post.excerpt}</div>

            <div className="reader-author">
              <div className="blog-author-av" style={{ background: author.color, width: 44, height: 44, fontSize: 15 }}>{author.initials}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-900)' }}>{author.name}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>{author.role} · MEDACCER</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <button className="reader-action"><Icons.Share size={14} stroke="var(--ink-700)" /></button>
                <button className="reader-action"><Icons.Bookmark size={14} stroke="var(--ink-700)" /></button>
              </div>
            </div>

            <div className="reader-hero-img">
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 180, fontWeight: 400, letterSpacing: '-0.03em', color: 'white', lineHeight: 1 }}>
                {post.id === 1 ? '1888' : post.cat[0]}
              </div>
            </div>

            <div className="reader-content">
              {content}
            </div>

            <div className="reader-cta">
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 10px' }}>¿Quieres automatizar esto hoy?</h4>
              <p style={{ fontSize: 15, color: 'var(--ink-600)', lineHeight: 1.55, margin: '0 0 18px' }}>
                MEDACCER hace todo esto por defecto. Empieza gratis por 14 días, sin tarjeta.
              </p>
              <button className="btn btn-primary btn-lg" onClick={() => { onClose(); window.location.hash = 'signup'; }}>
                Empezar prueba gratis <Icons.ArrowRight size={14} stroke="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CONTENIDO DE ARTÍCULOS — minimal pero real
// ============================================================

function getArticleContent(id) {
  const defaultContent = (
    <>
      <p>En MEDACCER hemos trabajado con consultorios de Bogotá, Medellín y Cali durante el último año. Este artículo recoge lo que funciona — y lo que no — cuando llevamos un consultorio independiente a operar con soporte de IA.</p>
      <h2>Lo que vamos a cubrir</h2>
      <p>Este post está escrito pensando en un profesional que gestiona su propia agenda, responde WhatsApp a mano y siente que dedica más tiempo a <em>coordinar</em> que a <em>atender</em>. Si esa es tu realidad, sigue leyendo.</p>
      <blockquote>"La mayoría de consultorios independientes pierden entre 4 y 7 horas a la semana en tareas que podrían automatizar sin perder el trato humano."</blockquote>
      <h2>1. El diagnóstico honesto</h2>
      <p>Antes de cualquier automatización, hay que medir el estado actual. Tres números básicos: tasa de no‑show, tiempo medio de respuesta por WhatsApp, y porcentaje de pacientes que vuelven en menos de 90 días.</p>
      <p>Si nunca los has medido, no te preocupes: MEDACCER los captura automáticamente en las primeras dos semanas y te da un baseline limpio.</p>
      <h2>2. Empieza por lo aburrido</h2>
      <p>Los mejores ROI no vienen de la IA conversacional. Vienen de tres cosas aburridas: recordatorios 24h antes, confirmación con 1 click, y reagendar sin hablar con nadie.</p>
      <p>Con solo eso bien hecho, los consultorios que acompañamos reducen no‑shows entre 9 y 14 puntos porcentuales en el primer mes.</p>
      <h2>3. Cuándo escalar a humano</h2>
      <p>La regla: cualquier cosa fuera de agenda, pago, info básica o recordatorio — escala. Siempre. Un bot que intenta "resolver" dolor agudo o dudas clínicas genera más problemas que valor.</p>
      <h2>Siguiente paso</h2>
      <p>Si quieres ver esto funcionando con los datos de tu propio consultorio, puedes empezar una prueba gratuita de 14 días sin tarjeta. Al final del periodo te entregamos un reporte con tus números reales y te dejamos decidir.</p>
    </>
  );

  if (id === 1) {
    return (
      <>
        <div className="tldr">
          <div className="tldr-ic">i</div>
          <div className="tldr-body">
            <strong>En 60 segundos</strong>
            La Resolución 1888/2025 obliga a generar un Resumen Digital de Atención (RDA) por consulta, firmado digitalmente, desde el 15 de mayo. No reemplaza tu historia clínica — es una capa encima. Tres opciones: software HCE completo ($180k–450k/mes), hacerlo a mano (3–4 min por paciente), o capa por voz como MEDACCER (45 segundos por paciente).
          </div>
        </div>

        <p>La Resolución 1888 de 2025 introduce el <strong>Resumen Digital de Atención (RDA)</strong> como el estándar mínimo que debe generar cualquier consultorio, independiente del software que uses. El plazo inicial era 15 de abril, pero el Ministerio extendió a 15 de mayo tras las observaciones del sector.</p>

        <div className="stats-grid">
          <div className="stat-card"><div className="num">15 may</div><div className="lbl">Fecha límite efectiva (plazo extendido)</div></div>
          <div className="stat-card"><div className="num">10 años</div><div className="lbl">Tiempo mínimo de archivo del RDA</div></div>
          <div className="stat-card"><div className="num">3–4 min</div><div className="lbl">Tiempo manual por cada RDA digitado</div></div>
        </div>

        <h2>Qué es exactamente el RDA</h2>
        <p>Es un documento estructurado — no un formato PDF, sino un archivo con campos definidos — que resume cada consulta y debe poder exportarse al sistema público cuando se solicite. Incluye: identificación del paciente, fecha, CIE‑10 principal, conducta clínica, y firma digital del profesional.</p>

        <div className="callout">
          <div className="title">Importante</div>
          <p>El RDA no reemplaza la historia clínica. Es una capa por encima que permite interoperabilidad entre prestadores. Tu historia sigue siendo tuya, en el formato que ya uses.</p>
        </div>

        <h2>Las tres opciones reales</h2>
        <table className="compare">
          <thead>
            <tr><th>Opción</th><th>Costo</th><th>Tiempo por consulta</th><th>Cambio de flujo</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>HCE completo</strong><br/><span style={{fontSize: 12, color: 'var(--ink-500)'}}>Medilink, Servinte, etc</span></td>
              <td>$180k–450k/mes</td>
              <td className="good">1 min</td>
              <td className="bad">Total</td>
            </tr>
            <tr>
              <td><strong>Manual en Word/Excel</strong></td>
              <td>$0</td>
              <td className="bad">3–4 min</td>
              <td className="good">Ninguno</td>
            </tr>
            <tr>
              <td><strong>Capa por voz (MEDACCER)</strong></td>
              <td>$89k/mes</td>
              <td className="good">45 seg</td>
              <td className="good">Mínimo</td>
            </tr>
          </tbody>
        </table>

        <h2>Checklist para estar al día</h2>
        <ul className="checklist">
          <li>Confirma que estás en el REPS con tu NIT o RUT actualizado.</li>
          <li>Obtén o renueva tu firma digital certificada (Certicámara o Andes SCD).</li>
          <li>Define cómo vas a generar el RDA: a mano, con software, o con una capa encima.</li>
          <li>Prueba exportación real: al menos 5 RDA en los primeros 30 días.</li>
          <li>Archiva. El RDA debe estar disponible por 10 años.</li>
        </ul>

        <h2>Errores comunes que hemos visto</h2>
        <div className="callout warn">
          <div className="title">Firma escaneada en PNG</div>
          <p>No cumple. Debe ser firma digital certificada con estampa de tiempo. Una imagen de tu firma no tiene validez legal.</p>
        </div>
        <div className="callout warn">
          <div className="title">Digitalizar 3 años hacia atrás</div>
          <p>No se pide retroactivo. Solo a partir de la entrada en vigor. Muchos consultorios están perdiendo semanas en esto innecesariamente.</p>
        </div>

        <h2>Cómo lo resolvemos nosotros</h2>
        <p>Cuando terminas la consulta, grabas 30 segundos de voz. El sistema transcribe, extrae los campos requeridos (diagnóstico CIE‑10, conducta, medicamentos), te los muestra para revisión, y una vez apruebas genera el RDA firmado con tu certificado digital. El paciente lo recibe por WhatsApp si lo solicita.</p>

        <div className="timeline-box">
          <div className="row"><div className="when">0:00</div><div className="what"><strong>Terminas la consulta</strong>El paciente sale del consultorio.</div></div>
          <div className="row"><div className="when">0:30</div><div className="what"><strong>Dictas el resumen</strong>30 segundos de voz: diagnóstico, conducta, medicamentos.</div></div>
          <div className="row"><div className="when">0:40</div><div className="what"><strong>Revisas los campos extraídos</strong>El sistema pre‑llena CIE‑10, fármacos, dosis. Tú apruebas.</div></div>
          <div className="row"><div className="when">0:45</div><div className="what"><strong>RDA firmado y archivado</strong>Listo para exportar cuando se solicite. Paciente recibe copia por WhatsApp.</div></div>
        </div>
      </>
    );
  }

  if (id === 50) {
    return (
      <>
        <div className="tldr">
          <div className="tldr-ic">i</div>
          <div className="tldr-body">
            <strong>Resumen</strong>
            El no‑show promedio en odontología en Colombia es 18–22%. Por debajo de 12% estás bien, entre 15–22% es normal, arriba de 25% tienes un problema de agenda. Los tres factores con mayor impacto: recordatorio 24h (reduce 8–11 puntos), confirmación con 1 click (3–5 puntos), y reagendar sin hablar (2–4 puntos).
          </div>
        </div>

        <p>Esta es una pregunta que nos hacen casi todos los odontólogos independientes. La respuesta corta: <strong>depende de la ciudad, el barrio y tu franja horaria</strong>. La larga tiene matices que importan.</p>

        <h2>Benchmarks reales (muestra n=147 consultorios, 2024–2025)</h2>
        <div className="stats-grid">
          <div className="stat-card"><div className="num">12%</div><div className="lbl">No‑show saludable (top 25%)</div></div>
          <div className="stat-card"><div className="num">18%</div><div className="lbl">Promedio del sector</div></div>
          <div className="stat-card"><div className="num">25%+</div><div className="lbl">Zona roja — hay problema</div></div>
        </div>

        <h2>Variables que sí importan</h2>
        <table className="compare">
          <thead><tr><th>Factor</th><th>Efecto típico</th></tr></thead>
          <tbody>
            <tr><td>Primera cita del día (7–8am)</td><td className="bad">+6 puntos de no‑show</td></tr>
            <tr><td>Viernes tarde (después de 4pm)</td><td className="bad">+4 puntos</td></tr>
            <tr><td>Lunes mañana (9–11am)</td><td className="good">−3 puntos</td></tr>
            <tr><td>Recordatorio 24h antes por WhatsApp</td><td className="good">−8 a −11 puntos</td></tr>
            <tr><td>Confirmación con 1 click</td><td className="good">−3 a −5 puntos</td></tr>
            <tr><td>Reagendamiento self‑service</td><td className="good">−2 a −4 puntos</td></tr>
          </tbody>
        </table>

        <h2>El recordatorio que funciona</h2>
        <div className="wa-preview">
          <div className="wa-label">24 horas antes · WhatsApp</div>
          <div className="wa-bubble">
            Hola María, te recordamos tu cita de <strong>profilaxis</strong> mañana <strong>jueves 24 abr</strong> a las <strong>10:30 am</strong> con el Dr. García.<br/><br/>
            ¿Confirmas que vienes?<br/><br/>
            ✅ Sí, confirmo<br/>
            📅 Reagendar<br/>
            ❌ Cancelar
            <div className="time">09:30</div>
          </div>
          <div className="wa-bubble me">✅<div className="time">09:34 ✓✓</div></div>
        </div>

        <div className="callout">
          <div className="title">Por qué funciona</div>
          <p>Específico (nombre, procedimiento, hora), respeta el tiempo del paciente (3 opciones claras), y permite responder con un emoji. No pide llamadas ni formularios.</p>
        </div>

        <h2>Cuándo preocuparte</h2>
        <p>Si llevas 3 meses arriba de 25% de no‑show, el problema no es el paciente — es la agenda. Causas típicas que hemos encontrado:</p>
        <ul className="checklist">
          <li>Agendas citas sin cobrar al menos una señal de compromiso (confirmación, abono pequeño).</li>
          <li>Recordatorio llega menos de 12h antes, cuando el paciente ya hizo otros planes.</li>
          <li>El canal de cancelación es más difícil que simplemente no ir.</li>
          <li>Sobreagendas "por si las moscas" y cuando todos llegan el consultorio colapsa.</li>
        </ul>

        <h2>Qué hacer esta semana</h2>
        <p>Medir. Saca tus últimos 100 turnos programados y cuenta cuántos no llegaron, en qué franja horaria, y con cuánta anticipación se agendaron. Ahí está el 80% de la respuesta.</p>
      </>
    );
  }

  if (id === 80) {
    return (
      <>
        <div className="tldr">
          <div className="tldr-ic">i</div>
          <div className="tldr-body">
            <strong>En resumen</strong>
            Estas son las 5 automatizaciones con mejor ROI que hemos visto en consultorios independientes. Todas se pueden implementar en menos de 2 horas la primera vez. Si ya tienes MEDACCER, vienen encendidas por defecto.
          </div>
        </div>

        <p>Después de acompañar más de 200 consultorios en Colombia, estas son las 5 automatizaciones que <strong>siempre</strong> recomendamos activar primero. No son las más sofisticadas — son las que mueven la aguja con menos esfuerzo.</p>

        <h2>1. Recordatorio 24h antes</h2>
        <p>El ROI más alto de todos. Reduce no‑show entre 8 y 11 puntos porcentuales. Clave: que sea específico, corto, y permita confirmar con un emoji.</p>
        <div className="wa-preview">
          <div className="wa-label">Plantilla que funciona</div>
          <div className="wa-bubble">
            Hola {'{nombre}'}, te recordamos tu cita de <strong>{'{servicio}'}</strong> mañana <strong>{'{fecha}'}</strong> a las <strong>{'{hora}'}</strong>.<br/><br/>
            ✅ Confirmar · 📅 Reagendar · ❌ Cancelar
            <div className="time">09:30</div>
          </div>
        </div>

        <h2>2. Confirmación automática al agendar</h2>
        <p>Cuando un paciente agenda, recibe un mensaje con: resumen de la cita, cómo llegar, qué llevar (radiografía, ayunas, etc), y un link para reagendar con 1 click. Reduce llamadas al consultorio entre 30 y 50%.</p>

        <h2>3. Seguimiento post‑consulta</h2>
        <p>48 horas después de la consulta, un mensaje que pregunta cómo va el paciente. Humano, breve. No para vender — para cuidar. Dos efectos medibles:</p>
        <div className="stats-grid">
          <div className="stat-card"><div className="num">+23%</div><div className="lbl">Tasa de recurrencia a 90 días</div></div>
          <div className="stat-card"><div className="num">+41%</div><div className="lbl">Referidos espontáneos</div></div>
          <div className="stat-card"><div className="num">−60%</div><div className="lbl">Quejas escaladas</div></div>
        </div>

        <h2>4. Cumpleaños (sí, en serio)</h2>
        <p>Un mensaje corto el día del cumpleaños, con un detalle real (no un descuento genérico). Los pacientes lo recuerdan — y agendan.</p>
        <div className="callout">
          <div className="title">Tip</div>
          <p>Evita "feliz cumpleaños, tenemos 10% off". Prueba: "Feliz cumple, María. Si te acuerdas, este es un buen momento para tu control anual." Convierte el doble.</p>
        </div>

        <h2>5. Reactivación a 6 meses</h2>
        <p>Pacientes que no han vuelto en 6 meses reciben un mensaje personalizado. Recupera entre 12 y 18% de ellos. Clave: mencionar su último tratamiento por nombre, no ser genérico.</p>

        <h2>Lo que NO deberías automatizar (todavía)</h2>
        <div className="callout warn">
          <div className="title">Evita estos</div>
          <p>Diagnóstico por IA, dosis de medicamentos, manejo de urgencias, consejos clínicos. Todo eso es problema esperando a pasar. Automatiza logística, no medicina.</p>
        </div>
      </>
    );
  }

  if (id === 2) {
    return (
      <>
        <div className="tldr">
          <div className="tldr-ic">i</div>
          <div className="tldr-body">
            <strong>En resumen</strong>
            La Ley 1581 de 2012 aplica a cualquier consultorio que recolecte datos de pacientes — incluido WhatsApp. El primer mensaje que envías debe incluir aviso de privacidad y opción de oposición. El consentimiento se puede registrar digitalmente con timestamp. No hacerlo expone multas de 10 a 2.000 SMMLV.
          </div>
        </div>

        <p>La Ley 1581 de 2012 (Habeas Data) aplica a toda recolección de datos personales en Colombia. Cuando un paciente te escribe por WhatsApp — o tú le escribes primero — hay tratamiento de datos, y la Superintendencia de Industria y Comercio (SIC) puede pedirte evidencia del consentimiento.</p>

        <h2>Qué tienes que hacer en el primer mensaje</h2>
        <div className="callout">
          <div className="title">Mínimo legal</div>
          <p>Identidad del responsable, finalidad del tratamiento, canales para ejercer derechos (ARCO), y opción clara de oposición.</p>
        </div>

        <div className="wa-preview">
          <div className="wa-label">Plantilla que cumple</div>
          <div className="wa-bubble">
            Hola, soy el asistente del <strong>Consultorio {'{Nombre}'}</strong>. Para atenderte, trataremos tus datos personales con fines de agendamiento y comunicación clínica.<br/><br/>
            Puedes ejercer tus derechos en <strong>privacidad@tuclinica.co</strong>. Responde <strong>CONTINUAR</strong> para seguir, o <strong>OPOSICIÓN</strong> si prefieres no continuar.
            <div className="time">10:15</div>
          </div>
        </div>

        <h2>Lo que debes guardar</h2>
        <ul className="checklist">
          <li>Fecha, hora y número telefónico del consentimiento.</li>
          <li>Texto exacto mostrado al paciente en ese momento.</li>
          <li>Respuesta afirmativa del paciente (la palabra que usó).</li>
          <li>Versión del aviso de privacidad vigente al momento del consentimiento.</li>
        </ul>

        <h2>Multas típicas (2024–2025)</h2>
        <div className="stats-grid">
          <div className="stat-card"><div className="num">10 SMMLV</div><div className="lbl">Multa mínima</div></div>
          <div className="stat-card"><div className="num">2.000 SMMLV</div><div className="lbl">Multa máxima por caso</div></div>
          <div className="stat-card"><div className="num">$650M</div><div className="lbl">Sanciones SIC 2024 al sector salud</div></div>
        </div>

        <h2>Cómo lo resolvemos nosotros</h2>
        <p>MEDACCER envía el aviso automáticamente en el primer contacto, guarda timestamp y respuesta del paciente, y genera el log exportable si la SIC lo solicita. El aviso se actualiza cuando cambia la ley, sin que tú tengas que tocarlo.</p>
      </>
    );
  }

  if (id === 81) {
    return (
      <>
        <div className="tldr">
          <div className="tldr-ic">i</div>
          <div className="tldr-body">
            <strong>En resumen</strong>
            6 preguntas que deberías responder antes de configurar cualquier bot. El resultado es un "documento de voz" de 1 página que usarás para entrenar cualquier sistema de IA. Tiempo estimado: 15 minutos.
          </div>
        </div>

        <p>La mayoría de consultorios configuran su bot <em>probando</em> y terminan con una mezcla inconsistente: a veces formal, a veces coloquial, a veces usa "tú" y a veces "usted". El paciente siente que está hablando con 3 personas distintas.</p>

        <p>La solución no es más tecnología — es media hora decidiendo <strong>cómo suena tu consultorio</strong>.</p>

        <h2>Las 6 preguntas</h2>
        <div className="timeline-box">
          <div className="row"><div className="when">1</div><div className="what"><strong>¿Tú o usted?</strong>Elige y mantente. No mezcles. Regla práctica: "tú" para estética y pediatría, "usted" para especialistas mayores. Cuando dudes, "usted".</div></div>
          <div className="row"><div className="when">2</div><div className="what"><strong>¿Cuánto formal?</strong>Escala del 1 al 5. 1 = "¡Hey! 😎" · 5 = "Cordial saludo, estimado paciente". La mayoría de consultorios buenos están en 2–3.</div></div>
          <div className="row"><div className="when">3</div><div className="what"><strong>¿Cuán largos los mensajes?</strong>Define máximo de palabras por mensaje (recomendado: 35–50). Mensajes largos se ignoran.</div></div>
          <div className="row"><div className="when">4</div><div className="what"><strong>¿Emojis sí o no?</strong>Decide de entrada. Si decides sí, lista los 5–7 que puede usar (✅ 📅 🕐 💙 etc). No más.</div></div>
          <div className="row"><div className="when">5</div><div className="what"><strong>¿Cómo saluda?</strong>Una frase fija. "Hola {'{nombre}'}, soy {'{bot}'} del Consultorio {'{clinica}'}". No la cambies.</div></div>
          <div className="row"><div className="when">6</div><div className="what"><strong>¿Cómo se despide?</strong>Otra frase fija. "Cualquier cosa me avisas. Cuídate." Consistencia = confianza.</div></div>
        </div>

        <h2>Ejemplo: dos tonos válidos</h2>
        <table className="compare">
          <thead><tr><th>Situación</th><th>Consultorio A (formal)</th><th>Consultorio B (cercano)</th></tr></thead>
          <tbody>
            <tr><td>Saludo</td><td>Buen día, Sra. Martínez</td><td>Hola María 👋</td></tr>
            <tr><td>Confirmación</td><td>Le recordamos su cita de mañana</td><td>Te recordamos tu cita mañana ✅</td></tr>
            <tr><td>Despedida</td><td>Quedamos atentos</td><td>Nos vemos mañana 🙌</td></tr>
          </tbody>
        </table>

        <div className="callout">
          <div className="title">Lo importante</div>
          <p>Ambos están bien. Lo que está <em>mal</em> es mezclarlos. Elige uno y mantenlo en los 8–10 mensajes tipo que va a enviar tu bot.</p>
        </div>
      </>
    );
  }

  if (id === 10) {
    return (
      <>
        <div className="tldr">
          <div className="tldr-ic">i</div>
          <div className="tldr-body">
            <strong>En resumen</strong>
            Un bot mal configurado escala todo (inútil) o nada (peligroso). Aquí la matriz que usamos: 3 niveles de urgencia, 11 síntomas rojos que SIEMPRE escalan, y los mensajes de transición que mantienen la confianza.
          </div>
        </div>

        <p>Cuando un paciente escribe "me duele el pecho" a las 11 pm, tu bot tiene 3 caminos: (1) ignorar, (2) intentar diagnosticar, (3) escalar con dignidad. Solo la tercera es aceptable — pero hacerla bien es sutil.</p>

        <h2>Los 3 niveles que manejamos</h2>
        <table className="compare">
          <thead><tr><th>Nivel</th><th>Qué es</th><th>Acción</th></tr></thead>
          <tbody>
            <tr><td><strong>🟢 Verde</strong></td><td>Agenda, precios, confirmación, info básica</td><td className="good">Bot responde y resuelve</td></tr>
            <tr><td><strong>🟡 Amarillo</strong></td><td>Duda clínica no urgente, reporte de síntoma leve</td><td>Bot agenda cita y notifica a staff</td></tr>
            <tr><td><strong>🔴 Rojo</strong></td><td>Síntoma grave, dolor intenso, emergencia</td><td className="bad">Escalar YA a humano + orientación 123</td></tr>
          </tbody>
        </table>

        <h2>Los 11 síntomas rojos que SIEMPRE escalan</h2>
        <ul className="checklist">
          <li>Dolor de pecho + dificultad respiratoria</li>
          <li>Pérdida de fuerza o sensibilidad súbita en un lado del cuerpo</li>
          <li>Confusión o desorientación aguda</li>
          <li>Sangrado activo que no cede</li>
          <li>Convulsiones</li>
          <li>Fiebre &gt;39.5°C que no baja con antipirético</li>
          <li>Vómito con sangre o heces negras</li>
          <li>Dolor abdominal súbito intenso</li>
          <li>Caída con pérdida de conocimiento</li>
          <li>Intoxicación o ideación suicida</li>
          <li>Dificultad respiratoria en niño &lt;2 años</li>
        </ul>

        <h2>El mensaje de escalado que funciona</h2>
        <div className="wa-preview">
          <div className="wa-label">Escalado rojo · lo que envía el bot</div>
          <div className="wa-bubble">
            Esto que me cuentas requiere valoración <strong>urgente</strong>. No soy capaz de ayudarte bien desde aquí.<br/><br/>
            🚨 Si es grave, marca <strong>123</strong> o ve a urgencias.<br/>
            📞 También te estoy pasando con la Dra. Ramírez por teléfono: <strong>318 555 0198</strong>.<br/><br/>
            Mientras tanto, no tomes medicamentos sin indicación.
            <div className="time">21:47</div>
          </div>
        </div>

        <div className="callout warn">
          <div className="title">Regla de oro</div>
          <p>Si tu bot alguna vez respondió "eso no parece grave" a un paciente, probablemente no debería estar encendido.</p>
        </div>

        <h2>Qué NO hacer nunca</h2>
        <p>Diagnosticar, recomendar fármacos, decir "tómate algo", dar dosis. Todo eso es responsabilidad profesional que un bot no puede asumir — ni legal, ni ética, ni técnicamente.</p>
      </>
    );
  }

  if (id === 20) {
    return (
      <>
        <div className="tldr">
          <div className="tldr-ic">i</div>
          <div className="tldr-body">
            <strong>En resumen</strong>
            El 60% de fotos que llegan al consultorio son inutilizables: mala luz, sin escala, ángulo raro. Pero se puede entrenar al bot para pedirlas bien. Tres instrucciones simples suben la tasa de foto útil de 40% a 85%.
          </div>
        </div>

        <p>Cuando un paciente escribe "tengo un lunar raro", lo más útil es ver la lesión antes de la consulta. Pero el 60% de fotos que llegan son inutilizables — y pedirla de nuevo se siente invasivo.</p>

        <h2>Las 3 reglas que transforman la foto</h2>
        <div className="timeline-box">
          <div className="row"><div className="when">1</div><div className="what"><strong>Luz natural, cerca</strong>Pedir explícitamente: "con luz de ventana, sin flash, a 15 cm". Sube la utilidad 25%.</div></div>
          <div className="row"><div className="when">2</div><div className="what"><strong>Regla o moneda de escala</strong>"Pon una moneda de 500 al lado para tener referencia de tamaño." Crítico para lunares.</div></div>
          <div className="row"><div className="when">3</div><div className="what"><strong>Dos tomas: cerca y zona</strong>"Una pegada y otra mostrando la zona del cuerpo". Permite ver cambios futuros.</div></div>
        </div>

        <h2>El mensaje del bot que funciona</h2>
        <div className="wa-preview">
          <div className="wa-label">Cuando el paciente reporta lesión</div>
          <div className="wa-bubble">
            Para que la Dra. lo evalúe mejor antes de verte, ¿me envías <strong>2 fotos</strong>?<br/><br/>
            📸 Foto 1: <strong>muy cerca</strong>, con luz de ventana (sin flash)<br/>
            📸 Foto 2: <strong>zona completa</strong>, con una moneda al lado<br/><br/>
            Esto nos ayuda a decidir si es urgente o si puede esperar.
            <div className="time">14:22</div>
          </div>
        </div>

        <h2>Qué hacer con las fotos que recibes</h2>
        <div className="callout">
          <div className="title">Protocolo</div>
          <p>Etiquétalas con fecha + ID de paciente, archívalas en carpeta privada con el consentimiento guardado. Nunca las compartas por WhatsApp con otros profesionales sin consentimiento escrito específico.</p>
        </div>

        <h2>Lo que NO debe hacer el bot</h2>
        <div className="callout warn">
          <div className="title">Nunca</div>
          <p>Opinar sobre la foto ("parece benigno", "no me gusta como se ve"). Solo confirma recepción y dice que la Dra. la revisa antes de la cita. Diagnóstico visual sin consulta es irresponsable.</p>
        </div>
      </>
    );
  }

  if (id === 30) {
    return (
      <>
        <div className="tldr">
          <div className="tldr-ic">i</div>
          <div className="tldr-body">
            <strong>En resumen</strong>
            El abandono de paquetes de fisioterapia ocurre entre las sesiones 4–6, cuando el dolor inicial cedió y el compromiso afloja. Tres intervenciones simples recuperan el 40% de los que están por abandonar.
          </div>
        </div>

        <p>Le vendiste un paquete de 10 sesiones. Viene a las primeras 3 con puntualidad. En la 4 llega tarde. La 5 la reagenda. La 6 no viene y no responde. Pierdes el paciente, la sesión, y lo peor: el resultado clínico.</p>

        <h2>Qué pasa realmente en las sesiones 4–6</h2>
        <p>El paciente ya siente menos dolor (es el "cliff of improvement"). Mentalmente sale del modo urgencia. Los recordatorios genéricos dejan de impactar. Necesitas algo diferente.</p>

        <div className="stats-grid">
          <div className="stat-card"><div className="num">38%</div><div className="lbl">Tasa típica de abandono antes de sesión 10</div></div>
          <div className="stat-card"><div className="num">4–6</div><div className="lbl">Sesiones donde ocurre el 70% del abandono</div></div>
          <div className="stat-card"><div className="num">+40%</div><div className="lbl">Recuperación con intervención correcta</div></div>
        </div>

        <h2>Las 3 intervenciones que funcionan</h2>
        <div className="timeline-box">
          <div className="row"><div className="when">S3</div><div className="what"><strong>Mensaje de progreso</strong>"María, llevamos 3 sesiones. Tu movilidad mejoró un 30%. Faltan 7 para consolidar — este es el tramo donde la gente abandona, no seas parte de la estadística 💪"</div></div>
          <div className="row"><div className="when">S5</div><div className="what"><strong>Ejercicio en video</strong>Un video de 60 segundos del propio fisio mostrando un ejercicio nuevo. Personal, no genérico. Aumenta adherencia 2x.</div></div>
          <div className="row"><div className="when">S7</div><div className="what"><strong>Proyección a futuro</strong>"Quedan 3 sesiones. ¿Qué quieres estar haciendo el mes que viene que hoy no puedes?" Reconecta con el objetivo original.</div></div>
        </div>

        <h2>Cuándo dar la sesión perdida (y cuándo no)</h2>
        <table className="compare">
          <thead><tr><th>Situación</th><th>Acción</th></tr></thead>
          <tbody>
            <tr><td>Reagenda con 24h+ de anticipación</td><td className="good">Reprogramar sin costo</td></tr>
            <tr><td>Reagenda mismo día</td><td>Cobrar 50% (política clara desde el inicio)</td></tr>
            <tr><td>No viene, no avisa</td><td className="bad">Sesión perdida, sin reembolso</td></tr>
            <tr><td>Emergencia médica propia</td><td className="good">Reprogramar con constancia</td></tr>
          </tbody>
        </table>

        <div className="callout">
          <div className="title">Importante</div>
          <p>Estas políticas deben estar <em>en el contrato del paquete</em> desde el día 1. Aplicarlas después genera fricción.</p>
        </div>
      </>
    );
  }

  if (id === 40) {
    return (
      <>
        <div className="tldr">
          <div className="tldr-ic">i</div>
          <div className="tldr-body">
            <strong>En resumen</strong>
            El registro alimentario es el dato más valioso de un proceso nutricional — y el que menos gente lleva. Tres decisiones (hora, formato, tono) deciden si tu paciente lo hace 3 días o 30.
          </div>
        </div>

        <p>Le diste el plan de 30 días. Le pediste que te mande lo que come todos los días. Tres días después, silencio. Al décimo, el paciente llega a control sin datos. Vuelves a empezar.</p>

        <h2>La fricción está en 3 decisiones</h2>
        <div className="timeline-box">
          <div className="row"><div className="when">1</div><div className="what"><strong>Hora del recordatorio</strong>Ni 9 pm (olvido del día entero) ni 9 am (aún no comió). El sweet spot es <strong>20:30</strong> — ya cenó, todavía tiene energía.</div></div>
          <div className="row"><div className="when">2</div><div className="what"><strong>Formato de respuesta</strong>No pidas fotos de cada comida (demasiado). Pide solo <strong>la cena + cómo se sintió</strong>. Los otros datos los sacas en consulta.</div></div>
          <div className="row"><div className="when">3</div><div className="what"><strong>Tono del mensaje</strong>"¿Qué cenaste?" funciona mucho mejor que "Registra tu alimentación del día". Humano &gt; técnico.</div></div>
        </div>

        <h2>El mensaje que funciona vs el que no</h2>
        <div className="wa-preview">
          <div className="wa-label">❌ Lo que NO funciona</div>
          <div className="wa-bubble">
            Recordatorio: completa tu registro alimentario del día de hoy en la siguiente plantilla. Fecha: 24/04. Incluye: desayuno, media mañana, almuerzo, media tarde, cena.
            <div className="time">20:00</div>
          </div>
        </div>

        <div className="wa-preview">
          <div className="wa-label">✅ Lo que SÍ funciona</div>
          <div className="wa-bubble">
            Hola María 🌱 ¿qué cenaste hoy?<br/><br/>
            Puedes responder en una línea o una foto, como te sea más fácil. También cuéntame en palabras cómo te sentiste con la comida del día.
            <div className="time">20:30</div>
          </div>
        </div>

        <h2>Qué hacer cuando dejan de responder</h2>
        <p>Al tercer día sin respuesta: mensaje suave. Al quinto: llamada rápida (2 minutos). Al séptimo: ajustas el plan — algo no está funcionando.</p>

        <div className="callout">
          <div className="title">Regla</div>
          <p>Si al décimo día el paciente no ha respondido nada, el problema no es él — es el plan. Algo lo está frustrando y no te lo dice.</p>
        </div>
      </>
    );
  }

  if (id === 60) {
    return (
      <>
        <div className="tldr">
          <div className="tldr-ic">i</div>
          <div className="tldr-body">
            <strong>En resumen</strong>
            Los protocolos multi‑sesión (láser, rellenos, toxina) tienen un desafío: mantener al paciente comprometido entre visitas que pueden estar a 15–30 días. La secuencia de WhatsApp que compartimos aquí sube la tasa de completación del 62% al 88%.
          </div>
        </div>

        <p>Vendiste un protocolo de 4 sesiones de láser depilatorio. La paciente vino a la primera, emocionada. Ahora tiene que esperar 4 semanas para la siguiente. En ese tiempo pueden pasar muchas cosas — y casi todas juegan en contra de que vuelva.</p>

        <h2>La secuencia completa por procedimiento</h2>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, marginTop: 24, marginBottom: 12 }}>Láser depilatorio (4 sesiones, intervalo 4 sem)</h3>
        <div className="timeline-box">
          <div className="row"><div className="when">D0</div><div className="what"><strong>Confirma siguiente cita</strong>"Tu próxima sesión es el {'{fecha}'}. Te recuerdo usar bloqueador a diario y evitar sol intenso."</div></div>
          <div className="row"><div className="when">D7</div><div className="what"><strong>Check de efectos</strong>"¿Sientes la zona normal? ¿Cómo está saliendo el vello? Respóndeme con un emoji: 😀 bien / 😐 algo / 😟 raro"</div></div>
          <div className="row"><div className="when">D14</div><div className="what"><strong>Motivación + educación</strong>Tip corto sobre qué esperar en la sesión 2 (normalmente se ve reducción visible).</div></div>
          <div className="row"><div className="when">D24</div><div className="what"><strong>Recordatorio de preparación</strong>"Falta 1 sem. Recuerda rasurar 24h antes (no depilar con cera), venir sin bloqueador, y no broncearte."</div></div>
          <div className="row"><div className="when">D28</div><div className="what"><strong>Sesión 2</strong>Mismo flujo, repetir.</div></div>
        </div>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, marginTop: 28, marginBottom: 12 }}>Toxina botulínica (control a 14 días)</h3>
        <div className="timeline-box">
          <div className="row"><div className="when">D3</div><div className="what"><strong>Check de efectos iniciales</strong>"Ya deberías empezar a sentir disminución. Si notas algo raro (asimetría, ptosis), avísame hoy mismo."</div></div>
          <div className="row"><div className="when">D10</div><div className="what"><strong>Recordatorio del control</strong>"Tu control es en 4 días. Por favor trae foto frente a espejo sin expresión."</div></div>
          <div className="row"><div className="when">D14</div><div className="what"><strong>Control (retoque gratis si aplica)</strong>Durante la cita: foto comparativa. Retoque incluido si hay asimetría.</div></div>
        </div>

        <h2>Por qué los protocolos fallan típicamente</h2>
        <ul className="checklist">
          <li>Recordatorio solo el día antes, cuando el paciente ya olvidó por qué empezó.</li>
          <li>No se pide feedback entre sesiones — el paciente "se va" mentalmente.</li>
          <li>Mensajes genéricos que no mencionan el procedimiento específico.</li>
          <li>Reagendar es difícil, así que prefiere no volver.</li>
        </ul>

        <div className="callout">
          <div className="title">Regla de oro</div>
          <p>Un paciente que responde al menos 1 mensaje entre sesiones tiene 3x probabilidad de completar el protocolo. La meta de tu bot: provocar al menos una respuesta por semana.</p>
        </div>
      </>
    );
  }

  if (id === 70) {
    return (
      <>
        <div className="tldr">
          <div className="tldr-ic">i</div>
          <div className="tldr-body">
            <strong>En resumen</strong>
            El recordatorio de terapia es especial: debe confirmar sin que alguien más — familia, jefe, pareja — deduzca que el paciente está en terapia si revisa el celular. Estas son las plantillas que respetan esa privacidad.
          </div>
        </div>

        <p>A diferencia de otras especialidades, en psicología la privacidad del recordatorio es tan importante como el recordatorio mismo. Un mensaje que diga "recuerda tu sesión de terapia con la Psi. Gómez para trabajar tu ansiedad" puede crear un problema serio si el paciente deja el celular en la mesa.</p>

        <h2>Las reglas del recordatorio discreto</h2>
        <div className="timeline-box">
          <div className="row"><div className="when">1</div><div className="what"><strong>No uses la palabra "terapia", "psicólogo", "sesión"</strong>Reemplaza con "cita" o "reunión". Vocabulario neutro.</div></div>
          <div className="row"><div className="when">2</div><div className="what"><strong>No menciones motivo de consulta</strong>Nunca. Ni general ("ansiedad", "depresión"), ni específico.</div></div>
          <div className="row"><div className="when">3</div><div className="what"><strong>Usa iniciales o nombre genérico</strong>"Dra. MG" o "cita con Gómez" en lugar de "psicóloga María Gómez".</div></div>
          <div className="row"><div className="when">4</div><div className="what"><strong>Ofrece opt‑out explícito</strong>"Si prefieres que no te recuerde por aquí, respóndeme OFF y uso solo llamada."</div></div>
        </div>

        <h2>Plantillas probadas</h2>
        <div className="wa-preview">
          <div className="wa-label">Recordatorio 24h antes · máximo discreto</div>
          <div className="wa-bubble">
            Hola, te recuerdo tu cita de mañana <strong>jueves 25</strong> a las <strong>5:30 pm</strong>.<br/><br/>
            ¿Confirmas?<br/>
            ✅ Sí / 📅 Reagendar
            <div className="time">17:30</div>
          </div>
        </div>

        <div className="wa-preview">
          <div className="wa-label">Confirmación post‑sesión</div>
          <div className="wa-bubble">
            Gracias por venir hoy. Tu próxima cita quedó para el <strong>jueves 2 may, 5:30 pm</strong>. ¿Te sirve confirmarla ya?
            <div className="time">18:45</div>
          </div>
        </div>

        <h2>Excepciones</h2>
        <p>Si el paciente mismo pide mensajes más explícitos ("no hay problema, vivo solo"), respeta. Pero la configuración por defecto debe ser siempre máxima discreción.</p>

        <div className="callout warn">
          <div className="title">Error frecuente</div>
          <p>Un emoji delator. Evita 💙 en psicología general, 🧠 obvio, 🤍 en algunos contextos. Usa ✅ 📅 🕐 que son neutros.</p>
        </div>

        <h2>Firma del consentimiento</h2>
        <p>Desde la primera cita, muestra al paciente las dos versiones del mensaje (estándar y explícita) y que elija. Guarda la elección. Esto es un acto terapéutico en sí mismo — honra su autonomía.</p>
      </>
    );
  }

  return defaultContent;
}

window.BlogPage = BlogPage;
