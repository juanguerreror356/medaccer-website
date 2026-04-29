/* global React */
function ProblemVisual() {
  return (
    <svg
      viewBox="0 0 760 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 760, display: 'block', margin: '0 auto' }}
    >
      <defs>
        <linearGradient id="pv-grad-teal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="pv-grad-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0.7" />
        </linearGradient>
        <filter id="pv-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ── LEFT SIDE: SIN MEDACCER ── */}
      <text x="160" y="22" textAnchor="middle" fontSize="11" fontFamily="Geist, sans-serif" letterSpacing="0.08em" fill="#EF4444" fontWeight="600">SIN MEDACCER</text>

      {/* Phone outline */}
      <rect x="112" y="32" width="96" height="168" rx="14" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
      <rect x="120" y="48" width="80" height="136" rx="4" fill="#0F172A" />
      {/* Home bar */}
      <rect x="144" y="188" width="32" height="3" rx="1.5" fill="#334155" />

      {/* WhatsApp icon area */}
      <rect x="120" y="48" width="80" height="18" rx="0" fill="#075E54" />
      <text x="160" y="60" textAnchor="middle" fontSize="8" fontFamily="Geist, sans-serif" fill="white" fontWeight="600">● WhatsApp</text>

      {/* Unread message bubbles — chaotic */}
      <rect x="128" y="72" width="56" height="14" rx="7" fill="#25D366" opacity="0.9" />
      <text x="156" y="82" textAnchor="middle" fontSize="7" fill="white" fontFamily="Geist, sans-serif">Quiero cita para mañana</text>

      <rect x="128" y="90" width="48" height="14" rx="7" fill="#25D366" opacity="0.75" />
      <text x="152" y="100" textAnchor="middle" fontSize="7" fill="white" fontFamily="Geist, sans-serif">¿Tienen disponibilidad?</text>

      <rect x="128" y="108" width="52" height="14" rx="7" fill="#25D366" opacity="0.6" />
      <text x="154" y="118" textAnchor="middle" fontSize="7" fill="white" fontFamily="Geist, sans-serif">Necesito reagendar</text>

      <rect x="128" y="126" width="44" height="14" rx="7" fill="#25D366" opacity="0.45" />
      <text x="150" y="136" textAnchor="middle" fontSize="7" fill="white" fontFamily="Geist, sans-serif">¿Cuánto vale?</text>

      <rect x="128" y="144" width="50" height="14" rx="7" fill="#25D366" opacity="0.3" />
      <text x="153" y="154" textAnchor="middle" fontSize="7" fill="white" fontFamily="Geist, sans-serif">Buenas, me duele...</text>

      {/* Unread badge */}
      <circle cx="192" cy="60" r="8" fill="#EF4444" />
      <text x="192" y="63" textAnchor="middle" fontSize="7" fill="white" fontFamily="Geist, sans-serif" fontWeight="700">47</text>

      {/* Clock with stress */}
      <circle cx="56" cy="116" r="28" fill="#1E293B" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 2" />
      <line x1="56" y1="116" x2="56" y2="96" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      <line x1="56" y1="116" x2="72" y2="120" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      <text x="56" y="158" textAnchor="middle" fontSize="9" fill="#EF4444" fontFamily="Geist, sans-serif" fontWeight="600">−26 horas</text>
      <text x="56" y="170" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="Geist, sans-serif">por semana</text>

      {/* Stress arrows */}
      <path d="M88 90 Q100 80 112 72" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      <path d="M90 116 Q100 116 112 116" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
      <path d="M88 142 Q100 152 112 160" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />

      {/* ── DIVIDER ── */}
      <line x1="380" y1="20" x2="380" y2="290" stroke="#1E3A5F" strokeWidth="1" strokeDasharray="6 4" />
      <circle cx="380" cy="160" r="16" fill="#0F172A" stroke="#1E3A5F" strokeWidth="1" />
      <text x="380" y="164" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="Geist, sans-serif">VS</text>

      {/* ── RIGHT SIDE: CON MEDACCER ── */}
      <text x="600" y="22" textAnchor="middle" fontSize="11" fontFamily="Geist, sans-serif" letterSpacing="0.08em" fill="#10B981" fontWeight="600">CON MEDACCER</text>

      {/* Phone outline */}
      <rect x="552" y="32" width="96" height="168" rx="14" fill="#1E293B" stroke="#2563EB" strokeWidth="1.5" />
      <rect x="560" y="48" width="80" height="136" rx="4" fill="#0F172A" />
      <rect x="584" y="188" width="32" height="3" rx="1.5" fill="#334155" />

      {/* Bot header */}
      <rect x="560" y="48" width="80" height="18" rx="0" fill="#075E54" />
      <circle cx="570" cy="57" r="5" fill="url(#pv-grad-teal)" />
      <text x="610" y="60" textAnchor="middle" fontSize="8" fontFamily="Geist, sans-serif" fill="white" fontWeight="600">MEDACCER Bot</text>
      <circle cx="635" cy="57" r="3" fill="#10B981" />

      {/* Clean bot conversation */}
      <rect x="568" y="72" width="58" height="14" rx="7" fill="#25D366" opacity="0.9" />
      <text x="597" y="82" textAnchor="middle" fontSize="7" fill="white" fontFamily="Geist, sans-serif">Quiero cita mañana</text>

      <rect x="574" y="90" width="60" height="22" rx="4" fill="#1E40AF" opacity="0.9" />
      <text x="604" y="100" textAnchor="middle" fontSize="6.5" fill="white" fontFamily="Geist, sans-serif">¡Hola! Tengo disponible</text>
      <text x="604" y="109" textAnchor="middle" fontSize="6.5" fill="#93C5FD" fontFamily="Geist, sans-serif">mañana 9am o 3pm ✓</text>

      <rect x="568" y="116" width="42" height="14" rx="7" fill="#25D366" opacity="0.9" />
      <text x="589" y="126" textAnchor="middle" fontSize="7" fill="white" fontFamily="Geist, sans-serif">A las 9am pls</text>

      <rect x="574" y="134" width="60" height="22" rx="4" fill="#1E40AF" opacity="0.9" />
      <text x="604" y="144" textAnchor="middle" fontSize="6.5" fill="white" fontFamily="Geist, sans-serif">✅ Agendado: mañana</text>
      <text x="604" y="153" textAnchor="middle" fontSize="6.5" fill="#93C5FD" fontFamily="Geist, sans-serif">9:00am · Te recordaré</text>

      {/* Zero unread badge */}
      <circle cx="632" cy="60" r="8" fill="#10B981" />
      <text x="632" y="63" textAnchor="middle" fontSize="7" fill="white" fontFamily="Geist, sans-serif" fontWeight="700">✓</text>

      {/* Clock — free time */}
      <circle cx="704" cy="116" r="28" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
      <line x1="704" y1="116" x2="704" y2="96" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      <line x1="704" y1="116" x2="720" y2="120" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      {/* Freed time arc */}
      <path d="M676 116 A28 28 0 0 1 732 116" stroke="url(#pv-grad-teal)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <text x="704" y="158" textAnchor="middle" fontSize="9" fill="#10B981" fontFamily="Geist, sans-serif" fontWeight="600">+26 horas</text>
      <text x="704" y="170" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="Geist, sans-serif">recuperadas</text>

      {/* Flow arrows from bot to calendar */}
      <path d="M648 100 Q668 80 680 88" stroke="url(#pv-grad-teal)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M650 116 Q664 116 676 116" stroke="url(#pv-grad-teal)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      {/* Bottom labels */}
      <text x="160" y="230" textAnchor="middle" fontSize="12" fill="#EF4444" fontFamily="Geist, sans-serif" fontWeight="600" opacity="0.8">47 mensajes sin responder</text>
      <text x="160" y="246" textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="Geist, sans-serif">Tiempo perdido en admin</text>

      <text x="600" y="230" textAnchor="middle" fontSize="12" fill="#10B981" fontFamily="Geist, sans-serif" fontWeight="600">Agenda llena. Sin esfuerzo.</text>
      <text x="600" y="246" textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="Geist, sans-serif">24/7 · Sin intervención manual</text>

      {/* Bottom stats */}
      <rect x="60" y="262" width="240" height="36" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      <text x="180" y="278" textAnchor="middle" fontSize="10" fill="#94A3B8" fontFamily="Geist, sans-serif">Costo mensual admin:</text>
      <text x="180" y="292" textAnchor="middle" fontSize="13" fill="#EF4444" fontFamily="Geist, sans-serif" fontWeight="700">~$1.200.000 COP en tiempo</text>

      <rect x="460" y="262" width="240" height="36" rx="8" fill="#1E293B" stroke="#2563EB" strokeWidth="1" />
      <text x="580" y="278" textAnchor="middle" fontSize="10" fill="#94A3B8" fontFamily="Geist, sans-serif">Desde MEDACCER:</text>
      <text x="580" y="292" textAnchor="middle" fontSize="13" fill="#10B981" fontFamily="Geist, sans-serif" fontWeight="700">$129.000 COP / mes</text>
    </svg>
  );
}
