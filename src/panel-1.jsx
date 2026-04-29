/* global React */

function Sidebar({ active = 'dashboard', onNav = () => {} }) {
  const items = [
    { section: 'Principal' },
    { id: 'dashboard', label: 'Dashboard', icon: 'Dashboard' },
    { id: 'agenda', label: 'Agenda', icon: 'Calendar' },
    { id: 'conversaciones', label: 'Conversaciones', icon: 'Chat', badge: '3' },
    { id: 'pacientes', label: 'Pacientes', icon: 'Users' },
    { section: 'Inteligencia' },
    { id: 'bot', label: 'Editor del bot', icon: 'Bot' },
    { id: 'rda', label: 'RDA · Res. 1888', icon: 'FileText' },
    { id: 'notas', label: 'Notas clínicas IA', icon: 'Mic' },
    { id: 'automaciones', label: 'Automatizaciones', icon: 'Zap' },
    { section: 'Crecimiento' },
    { id: 'marketing', label: 'Marketing', icon: 'Megaphone' },
    { id: 'resenas', label: 'Reseñas Google', icon: 'Star' },
    { section: 'Cuenta' },
    { id: 'facturacion', label: 'Facturación', icon: 'CreditCard' },
    { id: 'integraciones', label: 'Integraciones', icon: 'Plug' },
    { id: 'ajustes', label: 'Ajustes', icon: 'Settings' },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="m-logo"><div className="m-logo-mark">M</div> MEDACCER</div>
      </div>
      {items.map((it, i) => {
        if (it.section) return <div key={i} className="sb-section">{it.section}</div>;
        const IC = Icons[it.icon];
        return (
          <div key={it.id} className={`sb-item ${active === it.id ? 'active' : ''}`} onClick={() => onNav(it.id)}>
            <IC size={17} /> {it.label}
            {it.badge && <span className="sb-badge">{it.badge}</span>}
          </div>
        );
      })}
      <div className="sb-footer">
        <div className="sb-avatar">JC</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Dr. Juan Carrillo</div>
          <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Plan Profesional</div>
        </div>
        <Icons.Settings size={16} stroke="var(--ink-500)" />
      </div>
    </aside>
  );
}

function TopBar({ title = 'Dashboard' }) {
  return (
    <div className="topbar">
      <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>
        <span>Consultorio Chicó</span> <Icons.ChevronRight size={12} /> <span style={{ color: 'var(--ink-900)', fontWeight: 500 }}>{title}</span>
      </div>
      <div className="topbar-search">
        <Icons.Search size={16} />
        <input placeholder="Buscar pacientes, citas, RDAs… ⌘K" />
      </div>
      <button className="btn btn-outline btn-sm"><Icons.Plus size={14} /> Nueva cita</button>
      <div className="tb-icon"><Icons.Bell size={18} /><div className="tb-dot"></div></div>
      <div className="tb-icon"><Icons.Headphones size={18} /></div>
      <div className="sb-avatar" style={{ width: 34, height: 34, fontSize: 12 }}>JC</div>
    </div>
  );
}

// ====== DASHBOARD ======
function Dashboard({ variant = 'A' }) {
  const kpis = [
    { label: 'Citas hoy', num: '14', delta: '+3 vs ayer', up: true, icon: 'Calendar' },
    { label: 'Ingresos del mes', num: '$18.4M', delta: '+12 % vs mar', up: true, icon: 'TrendingUp' },
    { label: 'No-shows', num: '4.2%', delta: '-38 % vs ene', up: true, icon: 'TrendingDown' },
    { label: 'Ocupación', num: '87%', delta: '+6 pt', up: true, icon: 'Activity' },
  ];
  const bars = [58, 72, 65, 80, 91, 87, 68];
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Buenos días, Dr. Carrillo 👋</h1>
          <div className="page-sub">Esto pasó en tu consultorio mientras no estabas.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="btn btn-outline btn-sm" style={{ paddingRight: 24 }}>
            <option>Últimos 30 días</option><option>Esta semana</option><option>Este mes</option>
          </select>
          <button className="btn btn-outline btn-sm"><Icons.Download size={14} /> Exportar</button>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((k, i) => {
          const IC = Icons[k.icon];
          return (
            <div key={i} className="kpi">
              <div className="kpi-head">
                <span>{k.label}</span>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--m-blue-50)', color: 'var(--m-blue)', display: 'grid', placeItems: 'center' }}><IC size={15} /></div>
              </div>
              <div className="kpi-num">{k.num}</div>
              <div className={`kpi-delta ${k.up ? 'up' : 'down'}`}>
                <Icons.TrendingUp size={12} /> {k.delta}
              </div>
            </div>
          );
        })}
      </div>

      <div className="panel-grid">
        <div>
          <div className="panel" style={{ marginBottom: 16 }}>
            <div className="panel-head">
              <div>
                <div className="panel-title">Citas por día</div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Abril 17 – Abril 23</div>
              </div>
              <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--ink-600)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--m-blue)' }}></span> Atendidas</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--m-blue-100)' }}></span> Agendadas</span>
              </div>
            </div>
            <div className="chart-bars">
              {bars.map((h, i) => (
                <div key={i} className="chart-bar" style={{ height: h + '%' }}>
                  <div className="chart-bar-label">{days[i]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Actividad del bot (hoy)</div>
              <span className="ai-badge"><span className="dot-live"></span> En vivo</span>
            </div>
            <div className="divide-y">
              {[
                { t: '10:42', who: 'María F. López', action: 'agendó una limpieza', tag: 'Cita creada', color: 'teal' },
                { t: '10:28', who: 'Carlos Rodríguez', action: 'confirmó cita del jueves', tag: 'Confirmada', color: 'blue' },
                { t: '09:51', who: 'Ana Pérez', action: 'preguntó por precio de blanqueamiento', tag: 'Info', color: 'muted' },
                { t: '09:14', who: 'Luis Gómez', action: 'solicitó reagendamiento', tag: 'Reagendada', color: 'amber' },
                { t: '08:47', who: '+57 315 ••••••', action: 'consulta sobre urgencia', tag: 'Escalada a ti', color: 'red' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', padding: '12px 0', alignItems: 'center', gap: 12, fontSize: 14 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-500)' }}>{a.t}</div>
                  <div><b>{a.who}</b> <span style={{ color: 'var(--ink-600)' }}>{a.action}</span></div>
                  <span className={`chip chip-${a.color === 'muted' ? '' : a.color}`}>{a.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="panel" style={{ marginBottom: 16 }}>
            <div className="panel-head">
              <div className="panel-title">Próximas citas</div>
              <a href="#" style={{ fontSize: 12, color: 'var(--m-blue)' }}>Ver agenda</a>
            </div>
            <div className="divide-y">
              {[
                { t: '9:00', name: 'Andrea Ruiz', svc: 'Control ortodoncia', status: 'Confirmada' },
                { t: '10:00', name: 'María F. López', svc: 'Limpieza', status: 'Nueva' },
                { t: '11:30', name: 'Carlos M. Díaz', svc: 'Resina 23', status: 'Confirmada' },
                { t: '14:00', name: 'Laura Jiménez', svc: 'Evaluación inicial', status: 'Pendiente' },
                { t: '15:30', name: 'Julián Torres', svc: 'Blanqueamiento', status: 'Confirmada' },
              ].map((c, i) => (
                <div key={i} className="agenda-row">
                  <div className="agenda-time">{c.t}</div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{c.svc}</div>
                  </div>
                  <span className={`chip ${c.status === 'Confirmada' ? 'chip-teal' : c.status === 'Nueva' ? 'chip-blue' : 'chip-amber'}`}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Tareas del día</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { t: 'Firmar RDA de 3 pacientes de ayer', icon: 'FileText', tag: 'Urgente', color: 'red' },
                { t: 'Revisar 2 escalaciones del bot', icon: 'Chat', tag: 'Pendiente', color: 'amber' },
                { t: 'Confirmar campaña de limpieza 6m', icon: 'Megaphone', tag: 'Info', color: '' },
              ].map((t, i) => {
                const IC = Icons[t.icon];
                return (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: 12, background: 'var(--ink-50)', borderRadius: 8, alignItems: 'center' }}>
                    <IC size={16} stroke="var(--ink-600)" />
                    <div style={{ flex: 1, fontSize: 13 }}>{t.t}</div>
                    <span className={`chip chip-${t.color}`} style={{ fontSize: 10 }}>{t.tag}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== AGENDA ======
function Agenda() {
  const days = ['Lun 22', 'Mar 23', 'Mié 24', 'Jue 25', 'Vie 26'];
  const hours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
  const events = [
    { day: 0, top: 0, height: 60, title: 'Andrea Ruiz', svc: 'Control', color: 'blue' },
    { day: 0, top: 120, height: 90, title: 'Carlos Díaz', svc: 'Resina', color: 'teal' },
    { day: 0, top: 360, height: 60, title: 'Laura J.', svc: 'Evaluación', color: 'amber' },
    { day: 1, top: 60, height: 60, title: 'Julián T.', svc: 'Blanqueamiento', color: 'blue' },
    { day: 1, top: 240, height: 120, title: 'María López', svc: 'Limpieza', color: 'teal' },
    { day: 2, top: 0, height: 60, title: 'Ana Pérez', svc: 'Control', color: 'blue' },
    { day: 2, top: 180, height: 120, title: 'Luis Gómez', svc: 'Endodoncia', color: 'muted' },
    { day: 3, top: 120, height: 60, title: 'Sofía Mora', svc: 'Limpieza', color: 'teal' },
    { day: 3, top: 300, height: 90, title: 'Reservada', svc: 'Urgencia', color: 'amber' },
    { day: 4, top: 60, height: 60, title: 'Pedro R.', svc: 'Control', color: 'blue' },
    { day: 4, top: 180, height: 90, title: 'Valentina C.', svc: 'Blanqueamiento', color: 'teal' },
  ];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Agenda</h1>
          <div className="page-sub">Sincronizada con Google Calendar · Actualizado hace 2 s</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline btn-sm"><Icons.ChevronLeft size={14} /></button>
          <button className="btn btn-outline btn-sm">Hoy</button>
          <button className="btn btn-outline btn-sm"><Icons.ChevronRight size={14} /></button>
          <div style={{ fontWeight: 600, fontSize: 15, display: 'grid', placeItems: 'center', padding: '0 12px' }}>Abril 22 – 26, 2026</div>
          <button className="btn btn-outline btn-sm">Semana</button>
          <button className="btn btn-primary btn-sm"><Icons.Plus size={14} stroke="white" /> Bloque</button>
        </div>
      </div>

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="cal-head">
          <div></div>
          {days.map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="cal-body">
          <div className="cal-time-col">
            {hours.map(h => <div key={h} className="cal-hour">{h}</div>)}
          </div>
          {days.map((d, i) => (
            <div key={i} className="cal-day-col" style={{ position: 'relative' }}>
              {hours.map((_, j) => <div key={j} style={{ height: 60, borderBottom: '1px solid var(--ink-100)' }}></div>)}
              {events.filter(e => e.day === i).map((e, k) => (
                <div key={k} className={`cal-event cal-event-${e.color}`} style={{ top: e.top + 'px', height: (e.height - 4) + 'px' }}>
                  <div className="cal-event-title">{e.title}</div>
                  <div>{e.svc}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ====== CONVERSATIONS ======
function Conversations() {
  const convs = [
    { n: 'María F. López', t: '10:42', snippet: 'Listo María Fernanda! Cita confirmada…', active: true, unread: false, tag: 'Bot', color: 'blue', init: 'MF' },
    { n: 'Andrea Ruiz', t: '10:14', snippet: 'Perfecto, nos vemos mañana 🙌', unread: true, tag: 'Bot', color: 'blue', init: 'AR' },
    { n: '+57 315 •• 2938', t: '09:47', snippet: '¿El doctor atiende urgencias ahora?', unread: true, tag: '⚠ Escalado', color: 'red', init: '?' },
    { n: 'Carlos Rodríguez', t: '09:28', snippet: 'Confirmo jueves 3:30 pm', tag: 'Bot', color: 'blue', init: 'CR' },
    { n: 'Ana Pérez', t: 'Ayer', snippet: 'Gracias por la info sobre blanqueamiento', tag: 'Bot', color: 'blue', init: 'AP' },
    { n: 'Luis Gómez', t: 'Ayer', snippet: 'Quiero reagendar para la próxima…', tag: 'Bot', color: 'blue', init: 'LG' },
    { n: 'Sofía Mora', t: 'Lun', snippet: 'Llego un poco tarde, 10 min', tag: 'Bot', color: 'blue', init: 'SM' },
  ];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Conversaciones</h1>
          <div className="page-sub">Bandeja unificada · Bot activo · 847 mensajes esta semana</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline btn-sm"><Icons.Filter size={14} /> Filtrar</button>
          <button className="btn btn-outline btn-sm">Todas</button>
        </div>
      </div>
      <div className="conv-wrap">
        <div className="conv-list scroll">
          {convs.map((c, i) => (
            <div key={i} className={`conv-item ${c.active ? 'active' : ''}`}>
              <div className="conv-avatar">{c.init}</div>
              <div className="conv-preview">
                <div className="conv-name-row">
                  <div className="conv-name">{c.n}</div>
                  <div className="conv-time">{c.t}</div>
                </div>
                <div className="conv-snippet">{c.snippet}</div>
                <span className={`conv-chip chip-${c.color}`} style={{ marginTop: 4 }}>{c.tag}</span>
              </div>
              {c.unread && <div style={{ width: 8, height: 8, borderRadius: 50, background: 'var(--m-blue)', alignSelf: 'center' }}></div>}
            </div>
          ))}
        </div>
        <div className="conv-main">
          <div className="conv-head">
            <div className="conv-avatar">MF</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>María F. López</div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>+57 310 555 1234 · Paciente activa · Ortodoncia</div>
            </div>
            <span className="ai-badge"><Icons.Bot size={12} /> Bot activo</span>
            <button className="btn btn-outline btn-sm">Tomar control</button>
            <div className="tb-icon"><Icons.MoreH size={18} /></div>
          </div>
          <div className="conv-msgs scroll">
            <div className="msg msg-patient" style={{ whiteSpace: 'pre-line' }}>Hola, quiero agendar una limpieza dental para esta semana 🦷<div className="msg-meta">10:23</div></div>
            <div className="msg msg-bot" style={{ whiteSpace: 'pre-line' }}>¡Hola! Soy Ada, asistente del Dr. Carrillo. Tengo estos espacios:{'\n\n'}• Mié 24 — 10:00 am{'\n'}• Jue 25 — 3:30 pm{'\n'}• Vie 26 — 9:00 am<div className="msg-meta">10:24 ✓✓</div></div>
            <div className="msg msg-patient">El jueves a las 3:30 porfa<div className="msg-meta">10:38</div></div>
            <div className="msg msg-bot" style={{ whiteSpace: 'pre-line' }}>¡Perfecto! ✅ Confirmado:{'\n\n'}📅 Jueves 25 abril, 3:30 pm{'\n'}📍 Cra 15 #93-47{'\n'}💰 $180.000{'\n\n'}¿Tu nombre y cédula?<div className="msg-meta">10:39 ✓✓</div></div>
            <div className="msg msg-patient">María Fernanda López, CC 1020345678<div className="msg-meta">10:41</div></div>
            <div className="msg msg-bot">Listo María Fernanda! Cita confirmada y cargada en la agenda. Te recordaré 24h antes 🙌<div className="msg-meta">10:42 ✓✓</div></div>
            <div style={{ alignSelf: 'center', fontSize: 11, color: 'var(--ink-600)', background: 'rgba(255,255,255,0.8)', padding: '4px 10px', borderRadius: 8, marginTop: 10 }}>
              <Icons.Sparkles size={11} /> Cita creada en Google Calendar · Paciente agregado al CRM
            </div>
          </div>
          <div className="conv-input">
            <Icons.Paperclip size={20} stroke="var(--ink-500)" />
            <input placeholder="Escribe para intervenir (pausará el bot)..." />
            <button className="btn btn-primary btn-sm"><Icons.Send size={14} stroke="white" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Sidebar = Sidebar;
window.TopBar = TopBar;
window.Dashboard = Dashboard;
window.Agenda = Agenda;
window.Conversations = Conversations;
