/* global React, Icons */
// Módulos finales + Demo potenciado + Blog potenciado + Dashboard unificado


function VoiceNotes() {
  const [recording, setRecording] = React.useState(true);
  const notes = [
    { p: 'María F. López', date: 'Hoy · 10:42', svc: 'Control endodoncia', summary: 'Evolución satisfactoria. Radiografía muestra cierre apical adecuado. Plan: iniciar corona cerámica próxima cita.', dur: '34 s', status: 'signed' },
    { p: 'Carlos Rodríguez', date: 'Hoy · 09:15', svc: 'Limpieza profunda', summary: 'Placa moderada zona molar. Instrucciones de higiene reforzadas. Control en 6 meses.', dur: '22 s', status: 'signed' },
    { p: 'Andrea Ruiz', date: 'Ayer · 16:30', svc: 'Ajuste ortodoncia', summary: 'Cambio de arco 014 a 016. Molestias reportadas 3/10. Próximo ajuste en 4 semanas.', dur: '41 s', status: 'draft' },
  ];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Notas clínicas por voz</h1>
          <div className="page-sub">Dicta 30 segundos · La IA estructura tu nota + genera RDA automáticamente</div>
        </div>
        <span className="chip chip-teal chip-dot">247 notas · 96 % precisión</span>
      </div>

      <div style={{ background: recording ? 'linear-gradient(135deg, #0A6BBF, #064883)' : 'white', color: recording ? 'white' : 'var(--ink-900)', borderRadius: 20, padding: 32, marginBottom: 24, border: recording ? 'none' : '1px solid var(--ink-200)', position: 'relative', overflow: 'hidden' }}>
        {recording && (
          <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.3), transparent)' }}></div>
        )}
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.75, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
              {recording ? '🔴 Grabando · 0:17' : 'Listo para grabar'}
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, lineHeight: 1.15, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 16 }}>
              {recording ? '"Paciente María López, control postoperatorio endodoncia en 26..."' : 'Toca para empezar a dictar'}
            </div>
            {recording && (
              <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 40, marginBottom: 16 }}>
                {[40,65,80,55,70,85,60,45,75,90,50,65,80,55,70,40,55,70,85,60].map((h, i) => (
                  <div key={i} style={{ width: 3, height: h + '%', background: 'var(--m-teal)', borderRadius: 2, animation: `pulse-dot ${0.8 + (i % 3) * 0.2}s infinite`, opacity: 0.7 + (h / 300) }}></div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setRecording(!recording)} className="btn" style={{ background: recording ? 'white' : 'var(--m-coral)', color: recording ? 'var(--m-blue)' : 'white', fontWeight: 600 }}>
                {recording ? <><Icons.Check size={14} stroke="#0A6BBF" /> Finalizar</> : <><Icons.Mic size={14} stroke="white" /> Empezar dictado</>}
              </button>
              {recording && <button className="btn" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Pausar</button>}
            </div>
          </div>
          <div style={{ width: 140, height: 140, borderRadius: '50%', background: recording ? 'rgba(255,255,255,0.1)' : 'var(--m-blue-50)', display: 'grid', placeItems: 'center', border: recording ? '2px solid rgba(255,255,255,0.2)' : 'none' }}>
            <Icons.Mic size={56} stroke={recording ? 'white' : 'var(--m-blue)'} sw={1.5} />
          </div>
        </div>
      </div>

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--ink-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 600 }}>Notas recientes</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn btn-outline btn-sm">Hoy</button>
            <button className="btn btn-ghost btn-sm">Esta semana</button>
            <button className="btn btn-ghost btn-sm">Todo</button>
          </div>
        </div>
        {notes.map((n, i) => (
          <div key={i} style={{ padding: '20px 24px', borderBottom: i < notes.length - 1 ? '1px solid var(--ink-100)' : 'none', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--m-blue-50)', color: 'var(--m-blue)', display: 'grid', placeItems: 'center' }}>
              <Icons.Mic size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                <b style={{ fontSize: 15 }}>{n.p}</b>
                <span className="chip">{n.svc}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-500)' }}>{n.date} · {n.dur}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-600)', lineHeight: 1.5 }}>{n.summary}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
              <span className={`chip ${n.status === 'signed' ? 'chip-teal' : 'chip-amber'}`}>{n.status === 'signed' ? '✓ Firmada + RDA' : 'Borrador'}</span>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: 12, color: 'var(--m-blue)' }}>Ver completa →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ====== MARKETING ======
function Marketing() {
  const campaigns = [
    { t: 'Limpieza cada 6 meses', seg: '124 pacientes · última hace 5+ meses', status: 'Activa', sent: '87', opened: '79 %', conv: '18 %', color: 'teal' },
    { t: 'Cumpleaños del mes', seg: '34 pacientes cumpliendo en abril', status: 'Activa', sent: '22', opened: '91 %', conv: '—', color: 'amber' },
    { t: 'Reactivar inactivos 12m+', seg: '176 pacientes · sin visita 12 meses', status: 'Borrador', sent: '—', opened: '—', conv: '—', color: 'muted' },
    { t: 'Blanqueamiento verano', seg: 'Segmento premium · 89 pacientes', status: 'Programada', sent: '—', opened: '—', conv: '—', color: 'blue' },
    { t: 'Post-ortodoncia → retenedores', seg: 'Finalizaron tratamiento 2024', status: 'Activa', sent: '12', opened: '83 %', conv: '42 %', color: 'teal' },
  ];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Marketing</h1>
          <div className="page-sub">Campañas segmentadas por WhatsApp · 1.134 mensajes este mes</div>
        </div>
        <button className="btn btn-primary btn-sm"><Icons.Plus size={14} stroke="white" /> Nueva campaña</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { l: 'Enviados este mes', n: '1.134', d: '+24 % vs mar', i: 'Megaphone', c: 'blue' },
          { l: 'Tasa de apertura', n: '84 %', d: 'Promedio WhatsApp', i: 'Mail', c: 'teal' },
          { l: 'Conversión a cita', n: '23 %', d: '261 citas nuevas', i: 'Calendar', c: 'amber' },
          { l: 'Ingresos atribuidos', n: '$8.4M', d: 'De campañas activas', i: 'TrendingUp', c: 'teal' },
        ].map((k, i) => {
          const IC = Icons[k.i];
          return (
            <div key={i} className="kpi">
              <div className="kpi-head">
                <span>{k.l}</span>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `var(--m-${k.c}-50)`, color: `var(--m-${k.c === 'amber' ? 'amber' : k.c})`, display: 'grid', placeItems: 'center' }}><IC size={15} /></div>
              </div>
              <div className="kpi-num">{k.n}</div>
              <div className="kpi-delta up">{k.d}</div>
            </div>
          );
        })}
      </div>

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--ink-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 600 }}>Tus campañas</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <span className="chip chip-teal chip-dot">3 activas</span>
            <span className="chip">1 programada</span>
            <span className="chip">1 borrador</span>
          </div>
        </div>
        <table className="pt-table">
          <thead><tr><th>Campaña</th><th>Segmento</th><th>Enviados</th><th>Apertura</th><th>Conversión</th><th>Estado</th></tr></thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={i}>
                <td><b>{c.t}</b></td>
                <td style={{ color: 'var(--ink-600)', fontSize: 13 }}>{c.seg}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{c.sent}</td>
                <td>{c.opened}</td>
                <td style={{ color: 'var(--m-teal-600)', fontWeight: 600 }}>{c.conv}</td>
                <td><span className={`chip chip-${c.color}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ background: 'linear-gradient(135deg, var(--m-blue-50), var(--m-teal-50))', border: '1px solid var(--m-blue-100)', borderRadius: 14, padding: 20, marginTop: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: 'white', color: 'var(--m-blue)', display: 'grid', placeItems: 'center', boxShadow: 'var(--sh-sm)' }}>
          <Icons.Sparkles size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Ada sugiere: Campaña "Blanqueamiento prevacaciones"</div>
          <div style={{ fontSize: 13, color: 'var(--ink-600)' }}>Detecté 47 pacientes que ya consultaron por blanqueamiento y no agendaron. Segmento de alta conversión.</div>
        </div>
        <button className="btn btn-primary btn-sm">Crear campaña</button>
      </div>
    </div>
  );
}

// ====== RESEÑAS GOOGLE ======
function Reviews() {
  const reviews = [
    { name: 'Laura P.', stars: 5, date: 'Hace 2 días', text: 'Excelente atención del Dr. Carrillo. El proceso para agendar por WhatsApp fue súper fácil y rápido. La clínica es impecable.', from: 'Google', status: 'published' },
    { name: 'Diego M.', stars: 5, date: 'Hace 5 días', text: 'Increíble experiencia. Me atendieron una urgencia el mismo día. Muy recomendados.', from: 'Google', status: 'published' },
    { name: 'Valentina R.', stars: 4, date: 'Hace 1 semana', text: 'Muy buena atención y precios justos. El único detalle fue la espera de 15 min.', from: 'Google', status: 'published' },
    { name: 'Pedro G.', stars: 2, date: 'Hace 3 días', text: 'Me pareció caro y sentí que la limpieza fue rápida.', from: 'Interno', status: 'private', flagged: true },
  ];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Reseñas Google</h1>
          <div className="page-sub">Solicitamos reseñas solo a pacientes contentos · Filtramos negativas para feedback privado</div>
        </div>
        <button className="btn btn-outline btn-sm"><Icons.ExternalLink size={14} /> Ver en Google Maps</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 14, padding: 24 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 64, lineHeight: 1, color: 'var(--m-amber)', fontWeight: 400, letterSpacing: '-0.02em' }}>4.9</div>
              <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 4 }}>
                {[1,2,3,4,5].map(i => <Icons.Star key={i} size={14} stroke="#F59E0B" fill="#F59E0B" />)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 4 }}>127 reseñas</div>
            </div>
            <div style={{ flex: 1 }}>
              {[5,4,3,2,1].map((s, i) => {
                const pct = [88, 8, 2, 1, 1][i];
                return (
                  <div key={s} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 40px', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 12 }}>{s}★</span>
                    <div style={{ height: 6, background: 'var(--ink-100)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: pct + '%', height: '100%', background: 'var(--m-amber)' }}></div>
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--ink-500)', textAlign: 'right' }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-head">Solicitudes enviadas<div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--m-blue-50)', color: 'var(--m-blue)', display: 'grid', placeItems: 'center' }}><Icons.Send size={14} /></div></div>
          <div className="kpi-num">34</div>
          <div className="kpi-delta up">Este mes · +8 nuevas reseñas</div>
        </div>
        <div className="kpi">
          <div className="kpi-head">Tasa de respuesta<div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--m-teal-50)', color: 'var(--m-teal)', display: 'grid', placeItems: 'center' }}><Icons.TrendingUp size={14} /></div></div>
          <div className="kpi-num">68 %</div>
          <div className="kpi-delta up">vs 12 % antes de MEDACCER</div>
        </div>
      </div>

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--ink-200)', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 600 }}>Últimas reseñas</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn btn-outline btn-sm">Todas</button>
            <button className="btn btn-ghost btn-sm">Google</button>
            <button className="btn btn-ghost btn-sm">Privadas</button>
          </div>
        </div>
        {reviews.map((r, i) => (
          <div key={i} style={{ padding: '18px 24px', borderBottom: i < reviews.length - 1 ? '1px solid var(--ink-100)' : 'none', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 16 }}>
            <div className="conv-avatar">{r.name.split(' ').map(x => x[0]).join('')}</div>
            <div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <b>{r.name}</b>
                <div style={{ display: 'flex', gap: 1 }}>
                  {[1,2,3,4,5].map(s => <Icons.Star key={s} size={12} stroke={s <= r.stars ? '#F59E0B' : 'var(--ink-300)'} fill={s <= r.stars ? '#F59E0B' : 'transparent'} />)}
                </div>
                <span style={{ fontSize: 12, color: 'var(--ink-500)' }}>{r.date}</span>
                <span className={`chip ${r.from === 'Google' ? 'chip-blue' : ''}`} style={{ fontSize: 10 }}>{r.from}</span>
                {r.flagged && <span className="chip chip-red" style={{ fontSize: 10 }}>Filtrada · privada</span>}
              </div>
              <div style={{ fontSize: 14, color: 'var(--ink-700)', lineHeight: 1.5 }}>{r.text}</div>
              {r.flagged && (
                <div style={{ marginTop: 10, padding: 12, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, fontSize: 12, color: '#7F1D1D' }}>
                  <b>Feedback filtrado.</b> No llegó a Google. Considera contactar al paciente para resolver.
                </div>
              )}
            </div>
            <button className="btn btn-outline btn-sm">Responder</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ====== DASHBOARD UNIFICADO (A + B mix) ======
function DashboardFinal() {
  const kpis = [
    { label: 'Citas hoy', num: '14', delta: '+3 vs ayer', up: true, icon: 'Calendar', color: 'blue' },
    { label: 'Ingresos del mes', num: '$18.4M', delta: '+12 % vs mar', up: true, icon: 'TrendingUp', color: 'teal' },
    { label: 'No-shows', num: '4.2%', delta: '-38 % vs ene', up: true, icon: 'TrendingDown', color: 'teal' },
    { label: 'Ocupación', num: '87%', delta: '+6 pt', up: true, icon: 'Activity', color: 'amber' },
  ];
  const bars = [58, 72, 65, 80, 91, 87, 68];
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div style={{ fontSize: 13, color: 'var(--m-blue)', fontWeight: 600, marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Jueves 23 abril</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>Buenos días, <em style={{ color: 'var(--m-blue)', fontStyle: 'italic' }}>Dr. Carrillo.</em></h1>
          <div className="page-sub" style={{ marginTop: 6 }}>Ada resolvió 23 conversaciones mientras dormías · Creó 4 citas, confirmó 7, escaló 1.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="btn btn-outline btn-sm"><option>Últimos 30 días</option><option>Esta semana</option></select>
          <button className="btn btn-outline btn-sm"><Icons.Download size={14} /> Exportar</button>
        </div>
      </div>

      {/* Insight card + KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ background: 'linear-gradient(135deg, #0A6BBF, #064883)', color: 'white', borderRadius: 16, padding: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.35), transparent)' }}></div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              <Icons.Sparkles size={11} stroke="var(--m-teal)" /> Insight del día
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, lineHeight: 1.2, fontWeight: 400, marginBottom: 12 }}>
              Los <em style={{ color: 'var(--m-teal)', fontStyle: 'italic' }}>jueves</em> tienes 94 % de ocupación. Abrir un 5to bloque te daría ~$2.1M/mes extra.
            </div>
            <button className="btn btn-sm" style={{ background: 'var(--m-teal)', color: '#0B1220', fontWeight: 600 }}>Configurar bloque <Icons.ArrowRight size={12} stroke="#0B1220" /></button>
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Siguiente cita</div>
              <div style={{ fontSize: 12, color: 'var(--m-blue)', fontWeight: 600, marginTop: 2 }}>en 18 minutos · 9:00 am</div>
            </div>
            <span className="chip chip-teal chip-dot">Confirmada</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
            <div className="conv-avatar" style={{ width: 40, height: 40, fontSize: 13 }}>AR</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>Andrea Ruiz</div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Control ortodoncia · 30 min</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-600)', padding: 10, background: 'var(--m-blue-50)', borderRadius: 8, borderLeft: '3px solid var(--m-blue)', lineHeight: 1.5 }}>
            <Icons.Sparkles size={11} stroke="#0A6BBF" /> <b>Resumen previo:</b> Última visita 18 mar. Ajuste bracket 16. Traer radiografía reciente.
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((k, i) => {
          const IC = Icons[k.icon];
          return (
            <div key={i} className="kpi">
              <div className="kpi-head">
                <span>{k.label}</span>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `var(--m-${k.color}-50)`, color: `var(--m-${k.color === 'amber' ? 'amber' : k.color})`, display: 'grid', placeItems: 'center' }}><IC size={15} /></div>
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
                { t: '09:51', who: 'Ana Pérez', action: 'preguntó por precio de blanqueamiento', tag: 'Info', color: '' },
                { t: '09:14', who: 'Luis Gómez', action: 'solicitó reagendamiento', tag: 'Reagendada', color: 'amber' },
                { t: '08:47', who: '+57 315 ••••••', action: 'consulta sobre urgencia', tag: 'Escalada a ti', color: 'red' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', padding: '12px 0', alignItems: 'center', gap: 12, fontSize: 14 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-500)' }}>{a.t}</div>
                  <div><b>{a.who}</b> <span style={{ color: 'var(--ink-600)' }}>{a.action}</span></div>
                  <span className={`chip chip-${a.color}`}>{a.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="panel" style={{ marginBottom: 16 }}>
            <div className="panel-head">
              <div className="panel-title">Próximas citas</div>
              <a href="#agenda" style={{ fontSize: 12, color: 'var(--m-blue)' }}>Ver agenda →</a>
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

window.VoiceNotes = VoiceNotes;
window.Marketing = Marketing;
window.Reviews = Reviews;
window.DashboardFinal = DashboardFinal;
