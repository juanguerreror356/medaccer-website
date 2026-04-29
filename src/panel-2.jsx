/* global React */

// ====== PATIENTS ======
function Patients() {
  const pts = [
    { n: 'María Fernanda López', age: 32, last: 'Hace 2 días', next: '25 abril', status: 'Activa', ltv: '$2.4M', init: 'MF' },
    { n: 'Carlos Rodríguez', age: 45, last: 'Hace 1 semana', next: '28 abril', status: 'Activa', ltv: '$1.8M', init: 'CR' },
    { n: 'Andrea Ruiz', age: 28, last: 'Hace 3 días', next: 'Mañana', status: 'Activa', ltv: '$3.1M', init: 'AR' },
    { n: 'Luis Gómez', age: 51, last: 'Hace 2 meses', next: '—', status: 'Inactiva', ltv: '$890K', init: 'LG' },
    { n: 'Ana Pérez', age: 36, last: 'Hace 5 días', next: '2 mayo', status: 'Activa', ltv: '$1.2M', init: 'AP' },
    { n: 'Julián Torres', age: 41, last: 'Hace 1 mes', next: '—', status: 'Seguimiento', ltv: '$740K', init: 'JT' },
    { n: 'Sofía Mora', age: 24, last: 'Hoy', next: '—', status: 'Activa', ltv: '$620K', init: 'SM' },
    { n: 'Valentina Cruz', age: 29, last: 'Ayer', next: '30 abril', status: 'Activa', ltv: '$1.9M', init: 'VC' },
  ];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Pacientes</h1>
          <div className="page-sub">1.247 pacientes · 84 nuevos este mes</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline btn-sm"><Icons.Filter size={14} /> Filtros</button>
          <button className="btn btn-outline btn-sm"><Icons.Download size={14} /> Exportar</button>
          <button className="btn btn-primary btn-sm"><Icons.Plus size={14} stroke="white" /> Paciente</button>
        </div>
      </div>
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', display: 'flex', gap: 8, borderBottom: '1px solid var(--ink-200)' }}>
          <span className="chip chip-blue chip-dot">Activas · 987</span>
          <span className="chip">Seguimiento · 84</span>
          <span className="chip">Inactivas · 176</span>
          <div className="topbar-search" style={{ marginLeft: 'auto', maxWidth: 280 }}>
            <Icons.Search size={14} />
            <input placeholder="Buscar paciente..." />
          </div>
        </div>
        <table className="pt-table">
          <thead><tr><th>Paciente</th><th>Edad</th><th>Última visita</th><th>Próxima cita</th><th>Estado</th><th>LTV</th><th></th></tr></thead>
          <tbody>
            {pts.map((p, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div className="conv-avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{p.init}</div>
                    <div><b>{p.n}</b></div>
                  </div>
                </td>
                <td>{p.age}</td>
                <td style={{ color: 'var(--ink-600)' }}>{p.last}</td>
                <td>{p.next}</td>
                <td><span className={`chip ${p.status === 'Activa' ? 'chip-teal' : p.status === 'Inactiva' ? 'chip-red' : 'chip-amber'}`}>{p.status}</span></td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{p.ltv}</td>
                <td><Icons.ChevronRight size={16} stroke="var(--ink-400)" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ====== BOT EDITOR ======
function BotEditor() {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Editor del bot</h1>
          <div className="page-sub">Personaliza el tono, servicios y respuestas · Cambios en vivo</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="chip chip-teal chip-dot">Publicado · v2.4</span>
          <button className="btn btn-outline btn-sm">Historial</button>
          <button className="btn btn-primary btn-sm">Publicar cambios</button>
        </div>
      </div>
      <div className="bot-editor">
        <div>
          <div className="field-group">
            <h3>Identidad del asistente</h3>
            <div className="field"><label>Nombre del bot</label><input defaultValue="Ada" /></div>
            <div className="field">
              <label>Personalidad</label>
              <select defaultValue="prof"><option value="prof">Profesional y cercano</option><option>Formal y clínico</option><option>Cálido y empático</option></select>
            </div>
            <div className="field">
              <label>Mensaje de bienvenida</label>
              <textarea rows="3" defaultValue="¡Hola! Soy Ada, asistente virtual del Dr. Carrillo. ¿En qué te puedo ayudar? 😊 Puedo agendar citas, resolver dudas o conectarte con el doctor." />
            </div>
          </div>
          <div className="field-group">
            <h3>Servicios y precios</h3>
            {[
              { s: 'Limpieza dental', p: '180.000', t: '45 min' },
              { s: 'Resina simple', p: '250.000', t: '60 min' },
              { s: 'Blanqueamiento', p: '850.000', t: '90 min' },
              { s: 'Control ortodoncia', p: '120.000', t: '30 min' },
              { s: 'Endodoncia', p: '650.000', t: '90 min' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 10, padding: '10px 0', borderBottom: i < 4 ? '1px solid var(--ink-100)' : 'none', alignItems: 'center', fontSize: 14 }}>
                <div>{s.s}</div>
                <div style={{ fontFamily: 'var(--font-mono)' }}>${s.p}</div>
                <div style={{ color: 'var(--ink-500)' }}>{s.t}</div>
                <Icons.Edit size={14} stroke="var(--ink-400)" />
              </div>
            ))}
            <button className="btn btn-outline btn-sm" style={{ marginTop: 12 }}><Icons.Plus size={14} /> Agregar servicio</button>
          </div>
          <div className="field-group">
            <h3>Comportamiento</h3>
            {[
              { l: 'Agendar automáticamente citas de rutina', d: 'Limpieza, control, evaluación', on: true },
              { l: 'Escalar urgencias al doctor', d: 'Dolor agudo, trauma, sangrado', on: true },
              { l: 'Pedir confirmación humana para cirugías', d: 'Endodoncia, cirugía de encías', on: true },
              { l: 'Responder fuera de horario', d: 'Mensaje informativo + CTA agendar', on: true },
              { l: 'Enviar ubicación + Waze automáticamente', d: 'Al confirmar cita nueva', on: false },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--ink-100)' : 'none', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{t.l}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{t.d}</div>
                </div>
                <div className={`toggle ${t.on ? 'on' : ''}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="panel" style={{ position: 'sticky', top: 16, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--ink-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Preview en vivo</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Prueba aquí antes de publicar</div>
              </div>
              <span className="ai-badge"><span className="dot-live"></span> Conectado</span>
            </div>
            <div style={{ padding: 16 }}>
              <ChatDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== RDA ======
function RDA() {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">RDA · Resolución 1888/2025</h1>
          <div className="page-sub">Resumen Digital de Atención · 247 enviados · 100 % conformidad HL7 FHIR</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="chip chip-teal chip-dot">Cumplimiento 100 %</span>
          <button className="btn btn-outline btn-sm"><Icons.Download size={14} /> Reporte Superintendencia</button>
          <button className="btn btn-primary btn-sm"><Icons.Plus size={14} stroke="white" /> Generar RDA</button>
        </div>
      </div>

      <div className="rda-card">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)', marginBottom: 4 }}>RDA-2026-0247 · Generado hace 8 min</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>María Fernanda López</div>
              <div style={{ fontSize: 13, color: 'var(--ink-600)' }}>CC 1.020.345.678 · 32 años · EPS Sanitas</div>
            </div>
            <span className="chip chip-teal">✓ Enviado al Min. Salud</span>
          </div>

          <div className="field-group" style={{ marginTop: 0 }}>
            <h3>Datos de la atención</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13 }}>
              <div><div style={{ color: 'var(--ink-500)', fontSize: 11 }}>Fecha</div><div style={{ fontWeight: 500 }}>23 abr 2026 · 10:42</div></div>
              <div><div style={{ color: 'var(--ink-500)', fontSize: 11 }}>Prestador</div><div style={{ fontWeight: 500 }}>Dr. Juan Carrillo</div></div>
              <div><div style={{ color: 'var(--ink-500)', fontSize: 11 }}>Tipo consulta</div><div style={{ fontWeight: 500 }}>Primera vez</div></div>
              <div><div style={{ color: 'var(--ink-500)', fontSize: 11 }}>CIE-10</div><div style={{ fontWeight: 500 }}>K04.1 Necrosis pulpar</div></div>
            </div>
          </div>

          <div className="field-group">
            <h3>Nota clínica (generada por IA desde audio)</h3>
            <div style={{ background: 'var(--ink-50)', padding: 14, borderRadius: 8, fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' }}>
              <b>Motivo:</b> Control postoperatorio tratamiento de conducto en 26.<br/>
              <b>Examen:</b> Ausencia de dolor a la palpación y percusión. Encía sin signos de inflamación. Radiografía muestra cierre apical adecuado.<br/>
              <b>Diagnóstico:</b> Evolución satisfactoria post endodoncia.<br/>
              <b>Plan:</b> Iniciar corona cerámica en próxima cita. Citar en 7 días.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center' }}>
              <span className="ai-badge"><Icons.Mic size={11} /> Transcrito de 34 s de audio</span>
              <span className="chip">Firma digital: ✓</span>
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>FHIR R4 payload</span>
            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--m-blue)' }}><Icons.Copy size={12} /> Copiar</button>
          </div>
          <div className="rda-fhir scroll">
{`{
  "resourceType": "Composition",
  "status": "final",
  "type": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "11490-0",
      "display": "Discharge summary"
    }]
  },
  "subject": {
    "reference": "Patient/1020345678",
    "display": "María F. López"
  },
  "date": "2026-04-23T10:42:00-05:00",
  "author": [{
    "reference": "Practitioner/dr-carrillo",
    "display": "Dr. Juan Carrillo"
  }],
  "section": [
    {
      "title": "Diagnóstico",
      "code": { "coding": [{
        "system": "CIE-10",
        "code": "K04.1"
      }]}
    },
    {
      "title": "Plan",
      "text": "Corona cerámica..."
    }
  ],
  "meta": {
    "profile": ["http://minsalud.gov.co/fhir/StructureDefinition/RDA-1888"],
    "tag": [{ "code": "res-1888-2025" }]
  }
}`}
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <div className="panel-head">
          <div className="panel-title">RDAs recientes</div>
          <a href="#" style={{ fontSize: 12, color: 'var(--m-blue)' }}>Ver todos</a>
        </div>
        <table className="pt-table" style={{ margin: '-20px -20px -20px' }}>
          <thead><tr><th>ID</th><th>Paciente</th><th>Fecha</th><th>CIE-10</th><th>Estado</th><th>Min. Salud</th></tr></thead>
          <tbody>
            {[
              ['RDA-0247', 'María F. López', '23 abr 10:42', 'K04.1', 'Enviado', 'teal'],
              ['RDA-0246', 'Carlos Rodríguez', '23 abr 09:15', 'Z01.2', 'Enviado', 'teal'],
              ['RDA-0245', 'Andrea Ruiz', '22 abr 16:30', 'K08.1', 'Enviado', 'teal'],
              ['RDA-0244', 'Luis Gómez', '22 abr 14:05', 'K04.7', 'Borrador', 'amber'],
              ['RDA-0243', 'Julián Torres', '22 abr 11:22', 'K03.6', 'Enviado', 'teal'],
            ].map((r, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r[0]}</td>
                <td><b>{r[1]}</b></td><td>{r[2]}</td>
                <td><span className="chip">{r[3]}</span></td>
                <td><span className={`chip chip-${r[5]}`}>{r[4]}</span></td>
                <td>{r[4] === 'Enviado' ? <Icons.Check size={14} stroke="#10B981" /> : <Icons.Clock size={14} stroke="#F59E0B" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ====== AUTOMATIONS ======
function Automations() {
  const autos = [
    { t: 'Recordatorio 24h antes', d: 'Mensaje automático 1 día antes de cada cita. Incluye ubicación y opción de confirmar/cancelar.', on: true, runs: '487', icon: 'Bell', color: 'blue' },
    { t: 'Limpieza cada 6 meses', d: 'Invita a pacientes con última limpieza hace 5+ meses a reservar su siguiente.', on: true, runs: '124', icon: 'Calendar', color: 'teal' },
    { t: 'Reactivar inactivos', d: 'Pacientes sin visita hace 6+ meses reciben mensaje personalizado con oferta.', on: true, runs: '89', icon: 'Users', color: 'amber' },
    { t: 'Cumpleaños de pacientes', d: 'Felicitación personalizada con descuento de 10% en limpieza.', on: false, runs: '—', icon: 'Heart', color: 'red' },
    { t: 'Seguimiento post-op 24h', d: 'Día siguiente a tratamiento: verifica dolor, inflamación y adherencia a indicaciones.', on: true, runs: '56', icon: 'Activity', color: 'teal' },
    { t: 'Reseña Google tras alta', d: 'Solicita reseña solo a pacientes con NPS ≥ 9. Filtra negativas a feedback privado.', on: true, runs: '34', icon: 'Star', color: 'amber' },
    { t: 'Lista de espera IA', d: 'Cuando hay cancelación, ofrece el cupo al paciente correcto según urgencia y cercanía.', on: true, runs: '18', icon: 'Clock', color: 'blue' },
    { t: 'Campaña blanqueamiento', d: 'Segmento: pacientes que completaron limpieza. Envía 7 días después con descuento.', on: false, runs: '—', icon: 'Sparkles', color: 'teal' },
    { t: 'Alerta de no-show', d: 'Si paciente no llega en 15 min, envía mensaje amable y ofrece reagendar.', on: true, runs: '12', icon: 'AlertCircle', color: 'red' },
  ];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Automatizaciones</h1>
          <div className="page-sub">Activa flujos con 1 click · 827 ejecuciones este mes · Sin código</div>
        </div>
        <button className="btn btn-primary btn-sm"><Icons.Plus size={14} stroke="white" /> Automatización</button>
      </div>

      <div style={{ background: 'linear-gradient(135deg, var(--m-blue-50), var(--m-teal-50))', border: '1px solid var(--m-blue-100)', borderRadius: 12, padding: 20, display: 'flex', gap: 20, marginBottom: 24, alignItems: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'white', display: 'grid', placeItems: 'center', boxShadow: 'var(--sh-sm)' }}>
          <Icons.Sparkles size={24} stroke="#0A6BBF" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Tu consultorio ganó <b style={{ color: 'var(--m-teal-600)' }}>47 horas</b> este mes gracias a las automatizaciones</div>
          <div style={{ fontSize: 13, color: 'var(--ink-600)' }}>Equivalente a $3.1M COP en tiempo del personal administrativo.</div>
        </div>
        <button className="btn btn-outline btn-sm">Ver reporte</button>
      </div>

      <div className="auto-grid">
        {autos.map((a, i) => {
          const IC = Icons[a.icon];
          return (
            <div key={i} className="auto-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="auto-icon" style={{ background: `var(--m-${a.color === 'red' ? 'red' : a.color === 'amber' ? 'amber' : a.color}-50, var(--m-blue-50))`, color: `var(--m-${a.color}, var(--m-blue))` }}>
                  <IC size={20} />
                </div>
                <div className={`toggle ${a.on ? 'on' : ''}`}></div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{a.t}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-600)', marginBottom: 12, minHeight: 54 }}>{a.d}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-500)', paddingTop: 10, borderTop: '1px solid var(--ink-100)' }}>
                <span>Este mes: <b style={{ color: 'var(--ink-800)' }}>{a.runs}</b> ejec.</span>
                <a href="#" style={{ color: 'var(--m-blue)' }}>Editar</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ====== BILLING ======
function Billing() {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Facturación</h1>
          <div className="page-sub">Plan Profesional · Próximo cargo: 23 mayo 2026</div>
        </div>
        <button className="btn btn-outline btn-sm">Cambiar plan</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <div className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>Plan actual</div>
              <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.01em' }}>Profesional</div>
              <div style={{ fontSize: 13, color: 'var(--ink-600)', marginTop: 4 }}>Renueva el 23 de mayo · $800.000 COP / mes</div>
            </div>
            <span className="chip chip-teal">Activo</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, paddingTop: 16, borderTop: '1px solid var(--ink-100)' }}>
            {[['Pacientes','∞','de ilimitado'],['Conversaciones','2.847','de 5.000 / mes'],['Doctores','1','de 2 incluidos']].map(([l,n,s],i) =>
              <div key={i}><div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{l}</div><div style={{ fontSize: 22, fontWeight: 600 }}>{n}</div><div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{s}</div></div>
            )}
          </div>
        </div>
        <div className="panel">
          <div className="panel-head"><div className="panel-title">Método de pago</div><a href="#" style={{ fontSize: 12, color: 'var(--m-blue)' }}>Cambiar</a></div>
          <div style={{ display: 'flex', gap: 14, padding: 16, border: '1px solid var(--ink-200)', borderRadius: 10, alignItems: 'center' }}>
            <div style={{ width: 44, height: 28, background: 'linear-gradient(135deg, #1A1F71, #4A6FE3)', borderRadius: 4, color: 'white', fontSize: 10, display: 'grid', placeItems: 'center', fontWeight: 700 }}>VISA</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>•••• •••• •••• 4821</div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Vence 09/28 · Dr. Juan Carrillo</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 12 }}>Facturación electrónica DIAN habilitada</div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--ink-200)', fontWeight: 600, fontSize: 15 }}>Historial de facturas</div>
        <table className="invoice-table">
          <tbody>
            {[
              ['INV-2026-04','23 abr 2026','Plan Profesional · abril','$800.000','Pagada'],
              ['INV-2026-03','23 mar 2026','Plan Profesional · marzo','$800.000','Pagada'],
              ['INV-2026-02','23 feb 2026','Plan Profesional · febrero','$800.000','Pagada'],
              ['INV-2026-01','23 ene 2026','Plan Profesional · enero','$800.000','Pagada'],
              ['INV-SETUP','15 dic 2025','Setup inicial MEDACCER','$1.000.000','Pagada'],
            ].map((r, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-500)' }}>{r[0]}</td>
                <td>{r[1]}</td>
                <td><b>{r[2]}</b></td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{r[3]}</td>
                <td><span className="chip chip-teal">{r[4]}</span></td>
                <td><Icons.Download size={14} stroke="var(--ink-500)" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

window.Patients = Patients;
window.BotEditor = BotEditor;
window.RDA = RDA;
window.Automations = Automations;
window.Billing = Billing;
