/* global React */
function ProblemVisual() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 0, alignItems: 'stretch', maxWidth: 880, margin: '0 auto' }}>

      {/* ── LEFT: SIN MEDACCER ── */}
      <div style={{ background: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: 20, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#E53E3E', textTransform: 'uppercase' }}>Sin MEDACCER</div>

        {/* Phone mockup */}
        <div style={{ background: '#1a1a2e', borderRadius: 24, padding: 12, width: 200, margin: '0 auto', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          {/* WhatsApp header */}
          <div style={{ background: '#075E54', borderRadius: '12px 12px 0 0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#128C7E', display: 'grid', placeItems: 'center', fontSize: 12, color: 'white', fontWeight: 700 }}>W</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>WhatsApp</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10 }}>47 sin leer</div>
            </div>
            <div style={{ background: '#E53E3E', color: 'white', borderRadius: '50%', width: 18, height: 18, display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700 }}>47</div>
          </div>
          {/* Messages */}
          <div style={{ background: '#ECE5DD', padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 6, borderRadius: '0 0 12px 12px' }}>
            {['Quiero cita para mañana', '¿Tienen disponibilidad?', 'Necesito reagendar urgente', '¿Cuánto vale la consulta?', 'Buenas, me duele mucho...', 'Profe, ¿me puede atender?'].map((msg, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '0 8px 8px 8px', padding: '5px 8px', fontSize: 10, color: '#333', lineHeight: 1.3, opacity: 1 - i * 0.08 }}>
                {msg}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, background: 'white', borderRadius: 12, padding: '14px', textAlign: 'center', border: '1px solid #FED7D7' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#E53E3E', lineHeight: 1 }}>47</div>
            <div style={{ fontSize: 11, color: '#718096', marginTop: 4 }}>msgs sin leer</div>
          </div>
          <div style={{ flex: 1, background: 'white', borderRadius: 12, padding: '14px', textAlign: 'center', border: '1px solid #FED7D7' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#E53E3E', lineHeight: 1 }}>26h</div>
            <div style={{ fontSize: 11, color: '#718096', marginTop: 4 }}>perdidas/semana</div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: '12px 16px', border: '1px solid #FED7D7', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#718096' }}>Costo mensual en tiempo</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#E53E3E', marginTop: 2 }}>~$1.200.000 COP</div>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px', gap: 8 }}>
        <div style={{ width: 1, flex: 1, background: 'linear-gradient(to bottom, transparent, #CBD5E0, transparent)' }}></div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#EDF2F7', border: '1px solid #CBD5E0', display: 'grid', placeItems: 'center', fontSize: 11, color: '#718096', fontWeight: 700, flexShrink: 0 }}>VS</div>
        <div style={{ width: 1, flex: 1, background: 'linear-gradient(to bottom, transparent, #CBD5E0, transparent)' }}></div>
      </div>

      {/* ── RIGHT: CON MEDACCER ── */}
      <div style={{ background: '#F0FFF4', border: '1px solid #C6F6D5', borderRadius: 20, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#276749', textTransform: 'uppercase' }}>Con MEDACCER</div>

        {/* Phone mockup */}
        <div style={{ background: '#1a1a2e', borderRadius: 24, padding: 12, width: 200, margin: '0 auto', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          {/* Bot header */}
          <div style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)', borderRadius: '12px 12px 0 0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'grid', placeItems: 'center', fontSize: 11, color: 'white', fontWeight: 700 }}>M</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>MEDACCER Bot</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, background: '#A7F3D0', borderRadius: '50%', display: 'inline-block' }}></span>IA en línea
              </div>
            </div>
            <div style={{ background: '#10B981', borderRadius: '50%', width: 18, height: 18, display: 'grid', placeItems: 'center', fontSize: 11 }}>✓</div>
          </div>
          {/* Clean conversation */}
          <div style={{ background: '#ECE5DD', padding: '10px', display: 'flex', flexDirection: 'column', gap: 6, borderRadius: '0 0 12px 12px' }}>
            <div style={{ background: '#25D366', borderRadius: '0 8px 8px 8px', padding: '5px 8px', fontSize: 10, color: 'white', alignSelf: 'flex-end', maxWidth: '80%' }}>Quiero cita mañana</div>
            <div style={{ background: '#1E40AF', borderRadius: '0 8px 8px 8px', padding: '5px 8px', fontSize: 10, color: 'white', maxWidth: '90%', lineHeight: 1.4 }}>¡Hola! Tengo disponible mañana 9am o 3pm ✓</div>
            <div style={{ background: '#25D366', borderRadius: '0 8px 8px 8px', padding: '5px 8px', fontSize: 10, color: 'white', alignSelf: 'flex-end' }}>A las 9am, gracias</div>
            <div style={{ background: '#1E40AF', borderRadius: '0 8px 8px 8px', padding: '5px 8px', fontSize: 10, color: 'white', lineHeight: 1.4 }}>✅ Agendado: mañana 9am. Te recordaré 24h antes.</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, background: 'white', borderRadius: 12, padding: '14px', textAlign: 'center', border: '1px solid #C6F6D5' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#276749', lineHeight: 1 }}>0</div>
            <div style={{ fontSize: 11, color: '#718096', marginTop: 4 }}>msgs sin atender</div>
          </div>
          <div style={{ flex: 1, background: 'white', borderRadius: 12, padding: '14px', textAlign: 'center', border: '1px solid #C6F6D5' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#276749', lineHeight: 1 }}>24/7</div>
            <div style={{ fontSize: 11, color: '#718096', marginTop: 4 }}>responde solo</div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: '12px 16px', border: '1px solid #C6F6D5', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#718096' }}>Desde MEDACCER</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#276749', marginTop: 2 }}>$129.000 COP / mes</div>
        </div>
      </div>
    </div>
  );
}
