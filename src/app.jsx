/* global React, Landing, BlogPage, Signup, Checkout, Onboarding, Sidebar, TopBar, DashboardFinal, Agenda, Conversations, Patients, BotEditor, RDA, Automations, Billing, Integraciones, VoiceNotes, Marketing, Reviews, MobilePanel, Icons */

// ==== Router (hash based) ====
const ROUTES = {
  '': 'landing',
  'landing': 'landing',
  'blog': 'blog',
  'signup': 'signup',
  'checkout': 'checkout',
  'login': 'login',
  'onboarding': 'onboarding',
  'mobile': 'mobile',
};

function useHashRoute() {
  const parse = () => {
    const h = (window.location.hash || '#landing').replace(/^#/, '');
    if (h.startsWith('app/')) return { kind: 'app', view: h.slice(4) || 'dashboard' };
    if (h.startsWith('onboarding')) {
      const step = parseInt(h.split('/')[1] || '0');
      return { kind: 'onboarding', step };
    }
    return { kind: ROUTES[h] || 'landing' };
  };
  const [route, setRoute] = React.useState(parse);
  React.useEffect(() => {
    const handler = () => { setRoute(parse()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  const go = (hash) => { window.location.hash = hash; };
  return { route, go };
}

// ==== Toast system ====
const ToastContext = React.createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const push = (t) => {
    const id = Date.now() + Math.random();
    setToasts(ts => [...ts, { id, ...t }]);
    setTimeout(() => setToasts(ts => ts.filter(x => x.id !== id)), t.duration || 3200);
  };
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="toast-stack">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.kind || 'info'}`}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--m-' + (t.kind === 'success' ? 'teal' : t.kind === 'error' ? 'red' : 'blue') + '-50)', color: 'var(--m-' + (t.kind === 'success' ? 'teal' : t.kind === 'error' ? 'red' : 'blue') + ')', display: 'grid', placeItems: 'center' }}>
              {t.kind === 'success' ? <Icons.Check size={16} /> : t.kind === 'error' ? <Icons.AlertCircle size={16} /> : <Icons.Info size={16} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t.title}</div>
              {t.msg && <div style={{ fontSize: 13, color: 'var(--ink-600)', marginTop: 2 }}>{t.msg}</div>}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
const useToast = () => React.useContext(ToastContext);

// ==== Shell for app views ====
function AppShell({ view, onNav }) {
  const titles = {
    dashboard: 'Dashboard', agenda: 'Agenda', conversaciones: 'Conversaciones',
    pacientes: 'Pacientes', bot: 'Editor del bot', rda: 'RDA · Resolución 1888',
    notas: 'Notas clínicas IA', automaciones: 'Automatizaciones',
    marketing: 'Marketing', resenas: 'Reseñas Google',
    facturacion: 'Facturación', integraciones: 'Integraciones', ajustes: 'Ajustes',
  };
  const views = {
    dashboard: <DashboardFinal />,
    agenda: <Agenda />,
    conversaciones: <Conversations />,
    pacientes: <Patients />,
    bot: <BotEditor />,
    rda: <RDA />,
    notas: <VoiceNotes />,
    automaciones: <Automations />,
    marketing: <Marketing />,
    resenas: <Reviews />,
    facturacion: <Billing />,
    integraciones: <Integraciones />,
    ajustes: <AjustesPage />,
  };
  return (
    <div className="app-shell">
      <Sidebar active={view} onNav={(id) => onNav('app/' + id)} />
      <div>
        <TopBar title={titles[view] || 'Panel'} />
        {views[view] || <DashboardFinal />}
      </div>
    </div>
  );
}

// ==== Ajustes page (nueva, simple) ====
function AjustesPage() {
  const toast = useToast();
  const [dark, setDark] = React.useState(() => {
    try { return localStorage.getItem('medaccer-theme') === 'dark'; } catch { return false; }
  });
  const [emailNotif, setEmailNotif] = React.useState(() => {
    try { return localStorage.getItem('medaccer-notif-email') !== 'false'; } catch { return true; }
  });
  const [waNotif, setWaNotif] = React.useState(() => {
    try { return localStorage.getItem('medaccer-notif-wa') !== 'false'; } catch { return true; }
  });
  const [lang, setLang] = React.useState(() => {
    try { return localStorage.getItem('medaccer-lang') || 'es'; } catch { return 'es'; }
  });

  // Aplica el tema al <html> element
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem('medaccer-theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);
  React.useEffect(() => {
    try { localStorage.setItem('medaccer-notif-email', emailNotif); } catch {}
  }, [emailNotif]);
  React.useEffect(() => {
    try { localStorage.setItem('medaccer-notif-wa', waNotif); } catch {}
  }, [waNotif]);
  React.useEffect(() => {
    try { localStorage.setItem('medaccer-lang', lang); } catch {}
  }, [lang]);
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Ajustes</h1>
          <div className="page-sub">Preferencias del consultorio y del perfil del doctor</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="panel">
          <div className="panel-title" style={{ marginBottom: 16 }}>Perfil del consultorio</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500 }}>
              Nombre del consultorio
              <input className="field" defaultValue="Consultorio Dr. Carrillo" style={{ padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500 }}>
              Dirección
              <input className="field" defaultValue="Cra 15 #93-47, Chicó, Bogotá" style={{ padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500 }}>
              Teléfono WhatsApp
              <input className="field" defaultValue="+57 300 123 4567" style={{ padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }} />
            </label>
            <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={() => toast({ kind: 'success', title: 'Cambios guardados', msg: 'Perfil actualizado correctamente.' })}>Guardar cambios</button>
          </div>
        </div>
        <div className="panel">
          <div className="panel-title" style={{ marginBottom: 16 }}>Preferencias</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ToggleRow label="Modo oscuro" sub="Interfaz con tema oscuro (se guarda en tu dispositivo)" value={dark} onChange={(v) => { setDark(v); toast({ kind: 'success', title: v ? 'Modo oscuro activado' : 'Modo claro activado', msg: 'Preferencia guardada.' }); }} />
            <ToggleRow label="Notificaciones por email" sub="Resumen diario a las 7:00 a.m." value={emailNotif} onChange={(v) => { setEmailNotif(v); toast({ title: v ? 'Emails activados' : 'Emails desactivados' }); }} />
            <ToggleRow label="Notificaciones WhatsApp" sub="Escalaciones y urgencias" value={waNotif} onChange={(v) => { setWaNotif(v); toast({ title: v ? 'WhatsApp activado' : 'WhatsApp desactivado' }); }} />
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500, marginTop: 6 }}>
              Idioma
              <select value={lang} onChange={e => setLang(e.target.value)} style={{ padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', background: 'white' }}>
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </label>
          </div>
        </div>
        <div className="panel" style={{ gridColumn: '1 / -1', background: '#FEF2F2', borderColor: '#FECACA' }}>
          <div className="panel-title" style={{ color: '#7F1D1D', marginBottom: 8 }}>Zona de peligro</div>
          <div style={{ fontSize: 13, color: '#7F1D1D', marginBottom: 12 }}>Cerrar sesión o eliminar cuenta. Esto no afecta el historial clínico de pacientes.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline btn-sm" onClick={() => { window.location.hash = 'landing'; toast({ title: 'Sesión cerrada' }); }}>Cerrar sesión</button>
            <button className="btn btn-outline btn-sm" style={{ borderColor: '#DC2626', color: '#DC2626' }}>Eliminar cuenta</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, sub, value, onChange }) {
  const [v, setV] = React.useState(value);
  const cur = onChange ? value : v;
  const set = (x) => { if (onChange) onChange(x); else setV(x); };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', gap: 16, borderBottom: '1px solid var(--ink-100)' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3, lineHeight: 1.3 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.45 }}>{sub}</div>}
      </div>
      <button onClick={() => set(!cur)} style={{ width: 40, height: 22, borderRadius: 999, background: cur ? 'var(--m-blue)' : 'var(--ink-300)', border: 'none', position: 'relative', cursor: 'pointer', transition: 'background 0.15s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 2, left: cur ? 20 : 2, width: 18, height: 18, borderRadius: '50%', background: 'white', transition: 'left 0.15s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></span>
      </button>
    </div>
  );
}

// ==== App root ====
function MedaccerApp() {
  const { route, go } = useHashRoute();
  // Bootstrap theme desde localStorage
  React.useEffect(() => {
    try {
      const t = localStorage.getItem('medaccer-theme') || 'light';
      document.documentElement.setAttribute('data-theme', t);
    } catch {}
  }, []);
  // persist last route
  React.useEffect(() => {
    if (route.kind === 'app') localStorage.setItem('medaccer-last-view', route.view);
  }, [route]);

  return (
    <ToastProvider>
      <NavContext.Provider value={{ go }}>
        {route.kind === 'landing' && <Landing />}
        {route.kind === 'blog' && <BlogPage />}
        {route.kind === 'signup' && <Signup />}
        {route.kind === 'checkout' && <Checkout />}
        {route.kind === 'login' && <LoginPage />}
        {route.kind === 'onboarding' && <Onboarding step={route.step || 0} />}
        {route.kind === 'mobile' && <div style={{ minHeight: '100vh', background: '#f0eee9', display: 'grid', placeItems: 'center', padding: 40 }}><MobilePanel /></div>}
        {route.kind === 'app' && <AppShell view={route.view} onNav={go} />}
      </NavContext.Provider>
    </ToastProvider>
  );
}

// Nav context so child components can call go()
const NavContext = React.createContext({ go: () => {} });
window.NavContext = NavContext;
window.useNav = () => React.useContext(NavContext);

// ==== Login page (simple) ====
function LoginPage() {
  const toast = useToast();
  const [email, setEmail] = React.useState('demo@medaccer.co');
  const [pwd, setPwd] = React.useState('medaccer2026');
  const [loading, setLoading] = React.useState(false);
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ kind: 'success', title: 'Bienvenido de vuelta', msg: 'Cargando tu panel…' });
      window.location.hash = 'app/dashboard';
    }, 900);
  };
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A6BBF, #064883)', color: 'white', padding: 64, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <a href="#landing" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="m-logo" style={{ color: 'white', fontSize: 20 }}><div className="m-logo-mark" style={{ background: 'white', color: '#0A6BBF' }}>M</div> MEDACCER</div>
          </a>
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 52, lineHeight: 1.05, letterSpacing: '-0.025em', fontWeight: 400, marginBottom: 20 }}>
            Tu consultorio <em style={{ color: 'var(--m-teal)', fontStyle: 'italic' }}>nunca</em> duerme.
          </h1>
          <p style={{ fontSize: 17, opacity: 0.85, lineHeight: 1.5, maxWidth: 420 }}>
            Inicia sesión para ver tu agenda, conversaciones y métricas en tiempo real.
          </p>
        </div>
        <div style={{ fontSize: 13, opacity: 0.6 }}>© 2026 MEDACCER · Cumple Ley 1581 + Resolución 1888</div>
      </div>
      <div style={{ background: 'var(--paper)', display: 'grid', placeItems: 'center', padding: 40 }}>
        <form onSubmit={submit} style={{ width: '100%', maxWidth: 380 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, letterSpacing: '-0.02em', fontWeight: 400, marginBottom: 8 }}>Iniciar sesión</h2>
          <p style={{ color: 'var(--ink-600)', marginBottom: 20, fontSize: 14 }}>¿No tienes cuenta? <a href="#signup" style={{ color: 'var(--m-blue)', fontWeight: 500 }}>Crear una</a></p>

          <div style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FEF9E7 100%)', border: '1px solid #FDE68A', borderRadius: 10, padding: '12px 14px', marginBottom: 24, fontSize: 12.5, color: '#78350F', lineHeight: 1.55 }}>
            <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Credenciales demo</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>demo@medaccer.co &nbsp;·&nbsp; medaccer2026</div>
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>Cualquier email/contraseña también funciona — es un prototipo.</div>
          </div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Correo</label>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--ink-200)', borderRadius: 10, fontSize: 15, marginBottom: 16, fontFamily: 'inherit' }} />
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Contraseña</label>
          <input required type="password" value={pwd} onChange={e => setPwd(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--ink-200)', borderRadius: 10, fontSize: 15, marginBottom: 8, fontFamily: 'inherit' }} />
          <a href="#" style={{ fontSize: 12, color: 'var(--m-blue)', display: 'block', textAlign: 'right', marginBottom: 20 }}>¿Olvidaste tu contraseña?</a>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Iniciando…' : <>Iniciar sesión <Icons.ArrowRight size={16} stroke="white" /></>}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', color: 'var(--ink-500)', fontSize: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--ink-200)' }}></div>
            o continúa con
            <div style={{ flex: 1, height: 1, background: 'var(--ink-200)' }}></div>
          </div>
          <button type="button" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => toast({ title: 'Conectando con Google…' })}>Continuar con Google</button>
        </form>
      </div>
    </div>
  );
}

window.MedaccerApp = MedaccerApp;
