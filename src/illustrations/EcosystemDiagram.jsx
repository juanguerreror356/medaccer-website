/* global React */
function EcosystemDiagram() {
  return (
    <svg
      viewBox="0 0 800 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 800, display: 'block', margin: '0 auto' }}
    >
      <defs>
        <linearGradient id="eco-teal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="eco-green" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <marker id="eco-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="url(#eco-teal)" opacity="0.8" />
        </marker>
        <marker id="eco-arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="url(#eco-green)" opacity="0.8" />
        </marker>
        <filter id="eco-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ── PATIENT (left) ── */}
      <g>
        <rect x="20" y="100" width="110" height="80" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
        {/* Person icon */}
        <circle cx="75" cy="122" r="12" fill="#25D366" opacity="0.2" />
        <circle cx="75" cy="119" r="6" fill="#25D366" opacity="0.8" />
        <path d="M63 138 Q75 130 87 138" stroke="#25D366" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
        <text x="75" y="156" textAnchor="middle" fontSize="11" fontFamily="Geist, sans-serif" fill="#CBD5E1" fontWeight="600">Paciente</text>
        <text x="75" y="170" textAnchor="middle" fontSize="9" fontFamily="Geist, sans-serif" fill="#64748B">WhatsApp</text>
      </g>

      {/* Arrow: Patient → MEDACCER */}
      <path d="M132 140 L198 140" stroke="url(#eco-teal)" strokeWidth="2" markerEnd="url(#eco-arrow)" strokeDasharray="5 3" opacity="0.8" />
      <text x="165" y="132" textAnchor="middle" fontSize="8" fontFamily="Geist, sans-serif" fill="#94A3B8">mensaje</text>

      {/* ── MEDACCER AI (center) ── */}
      <g filter="url(#eco-glow)">
        <rect x="200" y="60" width="160" height="160" rx="16" fill="#0F1E3C" stroke="url(#eco-teal)" strokeWidth="2" />
        {/* Glow */}
        <rect x="200" y="60" width="160" height="160" rx="16" fill="none" stroke="#2563EB" strokeWidth="8" opacity="0.06" />
      </g>

      {/* MEDACCER brain icon */}
      <circle cx="280" cy="108" r="22" fill="url(#eco-teal)" opacity="0.15" />
      <circle cx="280" cy="108" r="14" fill="url(#eco-teal)" opacity="0.3" />
      {/* AI neural lines */}
      <circle cx="274" cy="104" r="2.5" fill="#06B6D4" />
      <circle cx="286" cy="104" r="2.5" fill="#06B6D4" />
      <circle cx="280" cy="114" r="2.5" fill="#06B6D4" />
      <line x1="274" y1="104" x2="286" y2="104" stroke="#06B6D4" strokeWidth="1" opacity="0.6" />
      <line x1="274" y1="104" x2="280" y2="114" stroke="#06B6D4" strokeWidth="1" opacity="0.6" />
      <line x1="286" y1="104" x2="280" y2="114" stroke="#06B6D4" strokeWidth="1" opacity="0.6" />

      <text x="280" y="142" textAnchor="middle" fontSize="13" fontFamily="Geist, sans-serif" fill="white" fontWeight="700">MEDACCER</text>
      <text x="280" y="157" textAnchor="middle" fontSize="10" fontFamily="Geist, sans-serif" fill="#93C5FD">IA · Gemini 2.5 Flash</text>

      {/* Features list */}
      <text x="215" y="178" fontSize="8.5" fontFamily="Geist, sans-serif" fill="#10B981">✓ Agendamiento 24/7</text>
      <text x="215" y="191" fontSize="8.5" fontFamily="Geist, sans-serif" fill="#10B981">✓ Triage de urgencias</text>
      <text x="215" y="204" fontSize="8.5" fontFamily="Geist, sans-serif" fill="#10B981">✓ Notas clínicas RDA</text>

      {/* Arrow: Patient response ← MEDACCER */}
      <path d="M200 152 L134 152" stroke="url(#eco-teal)" strokeWidth="2" markerEnd="url(#eco-arrow)" opacity="0.5" />
      <text x="167" y="164" textAnchor="middle" fontSize="8" fontFamily="Geist, sans-serif" fill="#94A3B8">respuesta</text>

      {/* Arrow: MEDACCER → Google Calendar */}
      <path d="M360 110 L426 110" stroke="url(#eco-teal)" strokeWidth="2" markerEnd="url(#eco-arrow)" strokeDasharray="5 3" opacity="0.8" />
      <text x="393" y="102" textAnchor="middle" fontSize="8" fontFamily="Geist, sans-serif" fill="#94A3B8">agenda cita</text>

      {/* Arrow: MEDACCER → Dashboard */}
      <path d="M360 170 L426 170" stroke="url(#eco-green)" strokeWidth="2" markerEnd="url(#eco-arrow-green)" strokeDasharray="5 3" opacity="0.8" />
      <text x="393" y="162" textAnchor="middle" fontSize="8" fontFamily="Geist, sans-serif" fill="#94A3B8">KPIs + RDA</text>

      {/* ── RIGHT COLUMN ── */}

      {/* Google Calendar */}
      <g>
        <rect x="428" y="70" width="110" height="76" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
        {/* Calendar icon */}
        <rect x="456" y="84" width="54" height="42" rx="4" fill="#1A56DB" opacity="0.3" />
        <rect x="456" y="84" width="54" height="12" rx="4" fill="#1A56DB" opacity="0.7" />
        <text x="483" y="94" textAnchor="middle" fontSize="8" fontFamily="Geist, sans-serif" fill="white" fontWeight="600">Google Cal</text>
        <line x1="462" y1="102" x2="504" y2="102" stroke="#1E3A5F" strokeWidth="1" />
        <circle cx="466" cy="110" r="3" fill="#10B981" />
        <circle cx="476" cy="110" r="3" fill="#EF4444" />
        <circle cx="486" cy="110" r="3" fill="#10B981" />
        <circle cx="496" cy="110" r="3" fill="#F59E0B" />
        <text x="483" y="136" textAnchor="middle" fontSize="9" fontFamily="Geist, sans-serif" fill="#64748B">Tu agenda real</text>
      </g>

      {/* WhatsApp reminders arrow */}
      <path d="M483 146 L483 180 L428 180" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
      <text x="490" y="166" fontSize="8" fontFamily="Geist, sans-serif" fill="#94A3B8">recordatorio</text>

      {/* Dashboard */}
      <g>
        <rect x="428" y="154" width="110" height="76" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
        <text x="483" y="172" textAnchor="middle" fontSize="9" fontFamily="Geist, sans-serif" fill="#CBD5E1" fontWeight="600">Dashboard</text>
        {/* Mini bar chart */}
        <rect x="442" y="185" width="8" height="18" rx="2" fill="#2563EB" opacity="0.7" />
        <rect x="454" y="178" width="8" height="25" rx="2" fill="#2563EB" opacity="0.85" />
        <rect x="466" y="181" width="8" height="22" rx="2" fill="#06B6D4" opacity="0.7" />
        <rect x="478" y="175" width="8" height="28" rx="2" fill="#06B6D4" opacity="0.9" />
        <rect x="490" y="183" width="8" height="20" rx="2" fill="#10B981" opacity="0.7" />
        <rect x="502" y="176" width="8" height="27" rx="2" fill="#10B981" opacity="0.9" />
        <text x="483" y="220" textAnchor="middle" fontSize="8" fontFamily="Geist, sans-serif" fill="#64748B">Ocupación + RDA</text>
      </g>

      {/* ── WhatsApp Business arrow ── */}
      <line x1="538" y1="108" x2="600" y2="108" stroke="url(#eco-green)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />

      {/* WhatsApp Business */}
      <g>
        <rect x="602" y="70" width="110" height="76" rx="12" fill="#1E293B" stroke="#25D366" strokeWidth="1.5" opacity="0.7" />
        <circle cx="657" cy="102" r="18" fill="#25D366" opacity="0.15" />
        <circle cx="657" cy="102" r="11" fill="#25D366" opacity="0.8" />
        <path d="M657 93 L657 102 L663 105" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <text x="657" y="128" textAnchor="middle" fontSize="9" fontFamily="Geist, sans-serif" fill="#CBD5E1" fontWeight="600">WhatsApp</text>
        <text x="657" y="139" textAnchor="middle" fontSize="8" fontFamily="Geist, sans-serif" fill="#64748B">Business API</text>
      </g>

      {/* Doctor icon */}
      <g>
        <rect x="602" y="154" width="110" height="76" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
        <circle cx="657" cy="176" r="11" fill="#2563EB" opacity="0.3" />
        <circle cx="657" cy="173" r="5.5" fill="#93C5FD" opacity="0.9" />
        <path d="M647 190 Q657 184 667 190" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.9" />
        {/* Stethoscope */}
        <path d="M651 193 Q648 200 654 203 Q660 206 662 200" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="662" cy="200" r="2.5" fill="#06B6D4" />
        <text x="657" y="218" textAnchor="middle" fontSize="9" fontFamily="Geist, sans-serif" fill="#CBD5E1" fontWeight="600">Médico</text>
        <text x="657" y="229" textAnchor="middle" fontSize="8" fontFamily="Geist, sans-serif" fill="#64748B">Libre para atender</text>
      </g>

      <line x1="538" y1="170" x2="600" y2="170" stroke="url(#eco-green)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />

      {/* ── BOTTOM LABEL ── */}
      <text x="400" y="268" textAnchor="middle" fontSize="11" fontFamily="Geist, sans-serif" fill="#475569" letterSpacing="0.04em">
        Todo conectado · Sin cambiar software · Sin migrar datos
      </text>
    </svg>
  );
}
