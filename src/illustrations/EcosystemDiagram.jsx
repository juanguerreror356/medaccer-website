/* global React */
function EcosystemDiagram() {
  const nodes = [
    { label: 'Paciente', sub: 'WhatsApp', icon: '👤', color: '#25D366', bg: '#F0FFF4', side: 'left' },
    { label: 'MEDACCER', sub: 'IA · 24/7', icon: 'M', color: '#2563EB', bg: 'linear-gradient(135deg,#2563EB,#06B6D4)', center: true },
    { label: 'Google Cal', sub: 'Tu agenda real', icon: '📅', color: '#1A56DB', bg: '#EEF2FF', side: 'right-top' },
    { label: 'Dashboard', sub: 'KPIs en vivo', icon: '📊', color: '#06B6D4', bg: '#ECFEFF', side: 'right-mid' },
    { label: 'WhatsApp API', sub: 'Respuestas auto', icon: '💬', color: '#25D366', bg: '#F0FFF4', side: 'right-bot' },
    { label: 'Médico', sub: 'Libre para atender', icon: '⚕️', color: '#8B5CF6', bg: '#F5F3FF', side: 'doctor' },
  ];

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', fontFamily: 'Geist, sans-serif' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 200px', gap: 0, alignItems: 'center', minHeight: 320 }}>

        {/* LEFT — Paciente */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: '#F0FFF4', border: '1px solid #C6F6D5', display: 'grid', placeItems: 'center', fontSize: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            👤
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1A202C' }}>Paciente</div>
            <div style={{ fontSize: 11, color: '#718096' }}>WhatsApp</div>
          </div>
        </div>

        {/* CENTER — flow lines + MEDACCER node */}
        <div style={{ position: 'relative', height: 320 }}>
          <svg viewBox="0 0 400 320" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="ed-g1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
              <marker id="ed-arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <polyline points="0,0 7,3.5 0,7" fill="none" stroke="url(#ed-g1)" strokeWidth="1.2" />
              </marker>
            </defs>

            {/* Left arrow — patient to center */}
            <line x1="10" y1="160" x2="150" y2="160" stroke="url(#ed-g1)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#ed-arr)" />
            <text x="80" y="152" textAnchor="middle" fontSize="10" fill="#A0AEC0" fontFamily="Geist,sans-serif">mensaje</text>

            {/* Response arrow */}
            <line x1="150" y1="172" x2="10" y2="172" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ed-arr)" />
            <text x="80" y="186" textAnchor="middle" fontSize="10" fill="#A0AEC0" fontFamily="Geist,sans-serif">respuesta</text>

            {/* Right arrows to services */}
            <line x1="250" y1="148" x2="380" y2="72" stroke="url(#ed-g1)" strokeWidth="1.8" strokeDasharray="5 3" markerEnd="url(#ed-arr)" />
            <line x1="250" y1="160" x2="380" y2="160" stroke="url(#ed-g1)" strokeWidth="1.8" strokeDasharray="5 3" markerEnd="url(#ed-arr)" />
            <line x1="250" y1="172" x2="380" y2="248" stroke="url(#ed-g1)" strokeWidth="1.8" strokeDasharray="5 3" markerEnd="url(#ed-arr)" />

            {/* MEDACCER center node */}
            <rect x="155" y="108" width="95" height="104" rx="18" fill="url(#ed-g1)" />
            <text x="202" y="148" textAnchor="middle" fontSize="22" fontWeight="700" fill="white" fontFamily="Geist,sans-serif">M</text>
            <text x="202" y="166" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="Geist,sans-serif">MEDACCER</text>
            <text x="202" y="180" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.8)" fontFamily="Geist,sans-serif">IA · 24/7</text>
            {/* Green dot */}
            <circle cx="234" cy="118" r="5" fill="#10B981" />
          </svg>
        </div>

        {/* RIGHT — 3 services */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: '📅', label: 'Google Cal', sub: 'Tu agenda real', color: '#1A56DB', bg: '#EEF2FF' },
            { icon: '📊', label: 'Dashboard', sub: 'KPIs + RDA', color: '#06B6D4', bg: '#ECFEFF' },
            { icon: '💬', label: 'WhatsApp', sub: 'Respuestas auto', color: '#25D366', bg: '#F0FFF4' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: s.bg, borderRadius: 12, padding: '10px 14px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1A202C' }}>{s.label}</div>
                <div style={{ fontSize: 10, color: '#718096' }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom label */}
      <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: '#A0AEC0', letterSpacing: '0.04em' }}>
        Todo conectado · Sin cambiar software · Sin migrar datos
      </div>
    </div>
  );
}
