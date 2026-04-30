/* global React */
// Pantallas extra: Signup, Onboarding, Mobile, Variantes Dashboard, Integraciones, Notas IA, Marketing, Pricing Detail

// ====== SIGNUP ======
function Signup() {
  return (
    <div style={{ minHeight: 860, display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'white' }}>
      <div style={{ padding: '72px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 560 }}>
        <div className="m-logo" style={{ marginBottom: 40 }}><div className="m-logo-mark">M</div> MEDACCER</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 48, lineHeight: 1.05, letterSpacing: '-0.02em', fontWeight: 400, margin: '0 0 12px' }}>
          Crea tu cuenta.<br/><em style={{ color: 'var(--m-blue)', fontStyle: 'italic' }}>7 días gratis.</em>
        </h1>
        <p style={{ color: 'var(--ink-600)', fontSize: 15, marginBottom: 32 }}>Sin tarjeta de crédito. Tu bot respondiendo en 48h.</p>

        <button className="btn btn-outline btn-lg" style={{ width: '100%', justifyContent: 'center', marginBottom: 10 }} onClick={() => window.location.hash = 'onboarding/0'}>
          <Icons.Google size={18} stroke="#4285F4" fill="#4285F4" /> Continuar con Google
        </button>
        <button className="btn btn-outline btn-lg" style={{ width: '100%', justifyContent: 'center', marginBottom: 20 }} onClick={() => window.location.hash = 'onboarding/0'}>
          <Icons.WhatsApp size={18} fill="#25D366" /> Continuar con WhatsApp
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 20px', color: 'var(--ink-400)', fontSize: 12 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--ink-200)' }}></div>
          <span>o con email</span>
          <div style={{ flex: 1, height: 1, background: 'var(--ink-200)' }}></div>
        </div>
        <div className="field">
          <label>Nombre completo</label>
          <input placeholder="Dr. Juan Carrillo" />
        </div>
        <div className="field">
          <label>Email profesional</label>
          <input placeholder="juan@tuconsultorio.com" />
        </div>
        <div className="field" style={{ marginBottom: 20 }}>
          <label>Especialidad</label>
          <select defaultValue="medicina-general">
            <option value="medicina-general">Medicina general</option>
            <option value="dermatologia">Dermatología</option>
            <option value="fisioterapia">Fisioterapia</option>
            <option value="nutricion">Nutrición</option>
            <option value="odontologia">Odontología</option>
            <option value="estetica">Medicina estética</option>
            <option value="psicologia">Psicología</option>
          </select>
        </div>
        <label style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--ink-600)', marginBottom: 24, alignItems: 'flex-start' }}>
          <input type="checkbox" defaultChecked style={{ marginTop: 3 }} />
          <span>Acepto los <a href="#" style={{ color: 'var(--m-blue)' }}>términos</a> y la <a href="#" style={{ color: 'var(--m-blue)' }}>política de privacidad</a> (Ley 1581)</span>
        </label>
        <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={() => window.location.hash = 'checkout'}>
          Continuar al plan <Icons.ArrowRight size={16} stroke="white" />
        </button>
        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink-500)', marginTop: 20 }}>
          ¿Ya tienes cuenta? <a href="#login" style={{ color: 'var(--m-blue)', fontWeight: 500 }}>Iniciar sesión</a>
        </div>
      </div>
      <div style={{ background: 'linear-gradient(160deg, #0A6BBF 0%, #064883 50%, #0B1220 100%)', padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(circle at 50% 30%, black, transparent 70%)' }}></div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 16 }}>Lo que viene después</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 42, lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400, margin: '0 0 28px' }}>
            En <em style={{ color: 'var(--m-teal)', fontStyle: 'italic' }}>48 horas</em> tu consultorio estará respondiendo solo.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 36 }}>
            {[
              { n: '01', t: 'Creas tu cuenta', d: 'Especialidad, nombre, email. 90 segundos.' },
              { n: '02', t: 'Eliges tu plan', d: 'Inicio, Profesional o Premium. Sin permanencia.' },
              { n: '03', t: 'Conectas WhatsApp + Google', d: 'OAuth + WhatsApp Business. Sin migraciones.' },
              { n: '04', t: 'Tu bot arranca', d: 'Responde pacientes esta misma semana.' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 14 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--m-teal)', minWidth: 28, paddingTop: 3 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{s.t}</div>
                  <div style={{ fontSize: 13, opacity: 0.65, lineHeight: 1.5 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div><div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--m-teal)', fontSize: 13, marginBottom: 4 }}><Icons.Shield size={14} stroke="#10B981" /> Ley 1581</div><div style={{ fontSize: 12, opacity: 0.6 }}>Datos cifrados</div></div>
            <div><div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--m-teal)', fontSize: 13, marginBottom: 4 }}><Icons.FileText size={14} stroke="#10B981" /> Res. 1888</div><div style={{ fontSize: 12, opacity: 0.6 }}>RDA automático</div></div>
            <div><div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--m-teal)', fontSize: 13, marginBottom: 4 }}><Icons.Check size={14} stroke="#10B981" /> Sin tarjeta</div><div style={{ fontSize: 12, opacity: 0.6 }}>Configura gratis</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== ONBOARDING ======
function Onboarding({ step = 0 }) {
  const steps = [
    { t: 'Tu consultorio', d: 'Datos básicos y horarios' },
    { t: 'Conecta WhatsApp', d: 'WhatsApp Business Cloud' },
    { t: 'Conecta Calendar', d: 'Google Calendar bidireccional' },
    { t: 'Servicios y precios', d: 'Lo que ofreces' },
    { t: 'Personaliza tu asistente', d: 'Tono, escalamiento, reglas' },
    { t: 'Activar y lanzar', d: 'Prueba en vivo' },
  ];
  const titles = [
    { kicker: 'Empezamos por lo básico', main: 'Datos de', emph: 'tu consultorio.' },
    { kicker: 'Tu canal principal', main: 'Conectemos', emph: 'WhatsApp Business.' },
    { kicker: 'Tu agenda en tiempo real', main: 'Conectemos', emph: 'Google Calendar.' },
    { kicker: 'Lo que ofreces', main: 'Servicios y', emph: 'precios.' },
    { kicker: 'Cómo debe sonar tu asistente', main: 'Personaliza', emph: 'tu asistente.' },
    { kicker: 'Último paso', main: 'Activa y', emph: 'lanza.' },
  ];
  const t = titles[step] || titles[0];

  return (
    <div className="ob-shell">
      <div className="ob-side">
        <div className="m-logo" style={{ color: 'white', marginBottom: 48 }}>
          <div className="m-logo-mark">M</div> MEDACCER
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Bienvenido Dr. Carrillo</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, lineHeight: 1.15, fontWeight: 400, marginBottom: 32, color: 'white' }}>En 6 pasos, tu consultorio estará <em style={{ color: 'var(--m-teal)', fontStyle: 'italic' }}>operando solo.</em></div>
        <div style={{ marginTop: 12 }}>
          {steps.map((s, i) => (
            <div key={i} className={`ob-step ${i === step ? 'active' : i < step ? 'done' : ''}`}>
              <div className="ob-step-num">{i < step ? <Icons.Check size={12} /> : i + 1}</div>
              <div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.55)', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          ¿Necesitas ayuda? <a href="#" style={{ color: 'var(--m-teal)', textDecoration: 'none' }}>Agenda una llamada con onboarding</a>
        </div>
      </div>
      <div className="ob-main">
        <div style={{ fontSize: 13, color: 'var(--m-blue)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>{t.kicker} · Paso {step + 1} de 6</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 44, lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400, margin: '0 0 14px', color: 'var(--ink-900)' }}>
          {t.main} <em style={{ color: 'var(--m-blue)', fontStyle: 'italic' }}>{t.emph}</em>
        </h1>

        {step === 0 && <OnboardingStep0 />}
        {step === 1 && <OnboardingStep1 />}
        {step === 2 && <OnboardingStep2 />}
        {step === 3 && <OnboardingStep3 />}
        {step === 4 && <OnboardingStep4 />}
        {step === 5 && <OnboardingStep5 />}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', marginTop: 36 }}>
          <button className="btn btn-ghost btn-lg" onClick={() => { if (step > 0) window.location.hash = 'onboarding/' + (step - 1); else window.location.hash = 'signup'; }}>← Atrás</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline btn-lg" onClick={() => { if (step < 5) window.location.hash = 'onboarding/' + (step + 1); else window.location.hash = 'app/dashboard'; }}>Saltar este paso</button>
            <button className="btn btn-primary btn-lg" onClick={() => { if (step < 5) window.location.hash = 'onboarding/' + (step + 1); else window.location.hash = 'app/dashboard'; }}>{step < 5 ? 'Continuar' : 'Activar y entrar al panel'} <Icons.ArrowRight size={16} stroke="white" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== ONBOARDING STEPS =====

function OnboardingStep0() {
  return (
    <>
      <p style={{ fontSize: 16, color: 'var(--ink-700)', lineHeight: 1.55, marginBottom: 32, maxWidth: 600 }}>
        Esto define cómo se presenta tu asistente al paciente y dónde aparece tu consultorio en confirmaciones, links de pago y RDAs. <b>Puedes editarlo después.</b>
      </p>

      <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 28, marginBottom: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-600)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18 }}>Identificación</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Nombre del consultorio <span style={{ color: 'var(--m-red)' }}>*</span></label>
            <input defaultValue="Consultorio Dr. Carrillo · Chicó" />
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>Lo que ven los pacientes en WhatsApp y emails.</div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Especialidad principal <span style={{ color: 'var(--m-red)' }}>*</span></label>
            <select defaultValue="odonto">
              <option value="medgral">Medicina general</option>
              <option value="odonto">Odontología</option>
              <option value="cx">Cirugía plástica</option>
              <option value="psico">Psicología</option>
              <option value="derma">Dermatología</option>
              <option value="pedia">Pediatría</option>
              <option value="gineco">Ginecología</option>
              <option value="oftalmo">Oftalmología</option>
              <option value="fisio">Fisioterapia</option>
              <option value="nutri">Nutrición</option>
            </select>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>Determina las plantillas y reglas del asistente.</div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>NIT / Cédula del prestador <span style={{ color: 'var(--m-red)' }}>*</span></label>
            <input defaultValue="900.123.456-7" />
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>Para facturación y RDA.</div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Registro Médico (RM) <span style={{ color: 'var(--m-red)' }}>*</span></label>
            <input defaultValue="RM-12345" />
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>Obligatorio para enviar RDAs a MinSalud.</div>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 28, marginBottom: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-600)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18 }}>Ubicación</div>
        <div className="field" style={{ marginBottom: 16 }}>
          <label>Dirección</label>
          <input defaultValue="Carrera 13 #93-40, Consultorio 502" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Ciudad</label>
            <input defaultValue="Bogotá" />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Departamento</label>
            <select defaultValue="cun"><option value="cun">Cundinamarca</option><option>Antioquia</option><option>Valle del Cauca</option></select>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Link Google Maps (opcional)</label>
            <input placeholder="https://maps.app.goo.gl/..." />
          </div>
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-600)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18 }}>Horarios de atención</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((d, i) => {
            const open = i < 5;
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 60px 1fr 1fr', gap: 14, alignItems: 'center', padding: '8px 0', borderBottom: i < 6 ? '1px solid var(--ink-100)' : 'none' }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink-800)' }}>{d}</div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 32, height: 18, borderRadius: 10, background: open ? 'var(--m-teal)' : 'var(--ink-300)', position: 'relative', display: 'inline-block' }}>
                    <span style={{ position: 'absolute', top: 2, left: open ? 16 : 2, width: 14, height: 14, borderRadius: '50%', background: 'white' }}></span>
                  </span>
                </label>
                <input type="text" defaultValue={open ? '8:00 am' : '—'} disabled={!open} style={{ opacity: open ? 1 : 0.4 }} />
                <input type="text" defaultValue={open ? (i === 4 ? '4:00 pm' : '6:00 pm') : '—'} disabled={!open} style={{ opacity: open ? 1 : 0.4 }} />
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-600)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Icons.Info size={14} stroke="var(--m-blue)" />
          <span>Tu asistente <b>no agenda fuera de estos horarios</b>. Fuera de horario responde con un mensaje informativo y te avisa al abrir.</span>
        </div>
      </div>
    </>
  );
}

function OnboardingStep1() {
  return (
    <>
      <p style={{ fontSize: 16, color: 'var(--ink-700)', lineHeight: 1.55, marginBottom: 32, maxWidth: 600 }}>
        Conectaremos tu número a la <b>WhatsApp Business Cloud API oficial de Meta</b> — el check verde "Business Verified" lo ven tus pacientes.
      </p>

      <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 28, marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 22 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#25D36615', display: 'grid', placeItems: 'center' }}>
            <Icons.WhatsApp size={26} fill="#25D366" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 16 }}>WhatsApp Business Cloud API</div>
            <div style={{ fontSize: 13, color: 'var(--ink-600)' }}>Oficial de Meta · Sin colgar tu celular · Múltiples agentes</div>
          </div>
          <span className="chip chip-amber chip-dot">Pendiente</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { n: 1, t: 'Verifica tu negocio en Meta Business Manager', d: 'Si ya tienes Instagram/Facebook profesional, ya estás listo. Si no, lo hacemos por ti — toma 1 día hábil.', done: true },
            { n: 2, t: 'Autoriza MEDACCER como proveedor', d: 'Login con Meta y aceptas permisos de mensajería. Meta emite un token permanente.', done: true },
            { n: 3, t: 'Migra tu número a Cloud API', d: 'Tu número sale del WhatsApp Business app y entra a Cloud API. El historial en el celular no se pierde, pero deja de actualizarse en el celular.', done: false, active: true },
            { n: 4, t: 'Aprueba 3 plantillas iniciales', d: 'Recordatorio, confirmación, bienvenida. MEDACCER las envía a Meta — aprobación en 1 a 24 horas.', done: false },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: 14, borderRadius: 10, background: s.active ? 'var(--m-blue-50)' : s.done ? 'var(--m-teal-50)' : 'var(--ink-50)', border: s.active ? '1px solid var(--m-blue-100)' : '1px solid transparent' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: s.done ? 'var(--m-teal)' : s.active ? 'var(--m-blue)' : 'var(--ink-300)', color: 'white', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                {s.done ? <Icons.Check size={14} /> : s.n}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink-900)' }}>{s.t}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.5, marginTop: 4 }}>{s.d}</div>
              </div>
              {s.done && <span className="chip chip-teal" style={{ alignSelf: 'flex-start', fontSize: 10 }}>Hecho</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-600)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18 }}>Tu número de WhatsApp</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Número (formato internacional)</label>
            <input defaultValue="+57 301 234 5678" />
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>Si es nuevo, sin historial: aprobación inmediata.</div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Nombre que verá el paciente</label>
            <input defaultValue="Dr. Carrillo · Odontología" />
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>Aparece como nombre del contacto en su WhatsApp.</div>
          </div>
        </div>
        <button className="btn btn-primary btn-lg" style={{ marginTop: 20 }}>
          <Icons.WhatsApp size={16} fill="white" /> Iniciar verificación con Meta
        </button>
      </div>
    </>
  );
}

function OnboardingStep2() {
  return (
    <>
      <p style={{ fontSize: 16, color: 'var(--ink-700)', lineHeight: 1.55, marginBottom: 32, maxWidth: 600 }}>
        Tu asistente verá tu disponibilidad real y bloqueará citas directamente. <b>Sin dobles agendas, sin conflictos.</b> Sincronización bidireccional en tiempo real.
      </p>

      <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 28, marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'white', border: '1px solid var(--ink-200)', display: 'grid', placeItems: 'center' }}>
            <Icons.Google size={24} stroke="#4285F4" fill="#4285F4" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Google Calendar</div>
            <div style={{ fontSize: 13, color: 'var(--ink-600)' }}>OAuth 2.0 · Solo eventos del calendario seleccionado</div>
          </div>
          <span className="chip chip-teal chip-dot">Conectado · dr.carrillo@gmail.com</span>
        </div>

        <div style={{ background: 'var(--m-teal-50)', border: '1px solid #A7F3D0', borderRadius: 10, padding: 14, display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: '#065F46' }}>
          <Icons.Check size={16} stroke="#10B981" />
          <div>
            <b>Conectado correctamente.</b> Importamos tus últimas 200 citas para entender tu ritmo de trabajo. El asistente ya conoce tus huecos típicos y bloqueos recurrentes.
          </div>
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 28, marginBottom: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-600)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18 }}>Configuración de slots</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Calendario destino</label>
            <select defaultValue="c1">
              <option value="c1">Consultorio Chicó (principal)</option>
              <option>Personal</option>
              <option>+ Nuevo calendario</option>
            </select>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>Donde el asistente crea los eventos.</div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Duración por defecto</label>
            <select defaultValue="45">
              <option>30 min</option><option value="45">45 min</option><option>60 min</option>
            </select>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>Puedes ajustar por tipo de servicio luego.</div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Buffer entre citas</label>
            <select defaultValue="10">
              <option>0 min</option><option value="10">10 min</option><option>15 min</option><option>20 min</option>
            </select>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>Tiempo libre entre paciente y paciente.</div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Antelación mínima</label>
            <select defaultValue="2h">
              <option>1 hora</option><option value="2h">2 horas</option><option>4 horas</option><option>1 día</option>
            </select>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>El asistente no agenda con menos antelación.</div>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-600)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Bloqueos automáticos detectados</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { t: 'Almuerzo', d: '12:30 pm – 1:30 pm · todos los días', tag: 'Detectado' },
            { t: 'Reunión semanal con equipo', d: 'Lunes 8:00 – 9:00 am', tag: 'Detectado' },
            { t: 'Sin agendamiento últimos 30 min', d: 'Cierre del día reservado para emergencias', tag: 'Sugerido' },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, background: 'var(--ink-50)', borderRadius: 10 }}>
              <Icons.Clock size={16} stroke="var(--ink-600)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{b.t}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-600)' }}>{b.d}</div>
              </div>
              <span className="chip" style={{ background: b.tag === 'Detectado' ? 'var(--m-teal-50)' : 'var(--m-blue-50)', color: b.tag === 'Detectado' ? '#065F46' : 'var(--m-blue)', fontSize: 10 }}>{b.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function OnboardingStep3() {
  const [services, setServices] = React.useState([
    { name: 'Consulta de valoración', dur: '30 min', price: '180.000' },
    { name: 'Limpieza dental', dur: '45 min', price: '180.000' },
    { name: 'Resina simple', dur: '60 min', price: '250.000' },
    { name: 'Blanqueamiento', dur: '90 min', price: '850.000' },
    { name: 'Control ortodoncia', dur: '30 min', price: '120.000' },
  ]);

  return (
    <>
      <p style={{ fontSize: 16, color: 'var(--ink-700)', lineHeight: 1.55, marginBottom: 32, maxWidth: 600 }}>
        Define qué ofreces para que el asistente sepa qué citas crear y cuánto cobrar. Pre-cargamos plantilla para tu especialidad — <b>edítala como prefieras</b>.
      </p>

      <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 24, marginBottom: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 40px', gap: 12, padding: '0 0 12px', borderBottom: '1px solid var(--ink-200)', fontSize: 11, fontWeight: 700, color: 'var(--ink-600)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <div>Servicio</div>
          <div>Duración</div>
          <div>Precio (COP)</div>
          <div></div>
        </div>
        {services.map((s, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 40px', gap: 12, padding: '12px 0', borderBottom: i < services.length - 1 ? '1px solid var(--ink-100)' : 'none', alignItems: 'center' }}>
            <input defaultValue={s.name} style={{ border: '1px solid transparent', background: 'transparent', padding: '8px 10px', borderRadius: 6, fontSize: 14 }} onFocus={(e) => e.target.style.background = 'var(--ink-50)'} onBlur={(e) => e.target.style.background = 'transparent'} />
            <input defaultValue={s.dur} style={{ border: '1px solid transparent', background: 'transparent', padding: '8px 10px', borderRadius: 6, fontSize: 14 }} onFocus={(e) => e.target.style.background = 'var(--ink-50)'} onBlur={(e) => e.target.style.background = 'transparent'} />
            <input defaultValue={s.price} style={{ border: '1px solid transparent', background: 'transparent', padding: '8px 10px', borderRadius: 6, fontSize: 14 }} onFocus={(e) => e.target.style.background = 'var(--ink-50)'} onBlur={(e) => e.target.style.background = 'transparent'} />
            <button onClick={() => setServices(services.filter((_, idx) => idx !== i))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}>
              <Icons.Trash size={14} stroke="var(--ink-500)" />
            </button>
          </div>
        ))}
        <button className="btn btn-outline btn-sm" style={{ marginTop: 14 }} onClick={() => setServices([...services, { name: '', dur: '30 min', price: '' }])}>
          <Icons.Plus size={14} stroke="var(--ink-700)" /> Agregar servicio
        </button>
      </div>

      <div style={{ background: 'var(--m-blue-50)', border: '1px solid var(--m-blue-100)', borderRadius: 12, padding: 18, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Icons.Info size={18} stroke="var(--m-blue)" />
        <div style={{ fontSize: 13, color: 'var(--ink-800)', lineHeight: 1.55 }}>
          <b>Cómo usa esto el asistente:</b> cuando un paciente pregunta "cuánto cuesta X", el bot consulta esta lista. Si pregunta por algo no listado, escala a tu equipo en lugar de inventar precios.
        </div>
      </div>
    </>
  );
}

function OnboardingStep4() {
  const [tono, setTono] = React.useState('cercano');
  return (
    <>
      <p style={{ fontSize: 16, color: 'var(--ink-700)', lineHeight: 1.55, marginBottom: 32, maxWidth: 600 }}>
        Tu asistente debe sonar como tu consultorio — no como un robot genérico. Define el tono y las reglas de escalamiento.
      </p>

      <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 28, marginBottom: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-600)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Nombre y tono</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Nombre del asistente</label>
            <input defaultValue="Ada" />
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>Cómo se presenta el bot ("Hola, soy Ada del consultorio…").</div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Trato al paciente</label>
            <select defaultValue="usted">
              <option value="usted">Usted (formal, recomendado)</option>
              <option value="tu">Tú (cercano)</option>
              <option value="auto">Adaptarse al paciente</option>
            </select>
          </div>
        </div>

        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-700)', marginBottom: 10 }}>Tono general</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { id: 'profesional', t: 'Profesional', d: 'Formal, neutro, sin emojis' },
            { id: 'cercano', t: 'Cercano', d: 'Cálido pero educado · 1-2 emojis suaves' },
            { id: 'casual', t: 'Casual', d: 'Coloquial, amistoso · emojis libres' },
          ].map((o) => (
            <button key={o.id} onClick={() => setTono(o.id)} style={{ textAlign: 'left', padding: 14, borderRadius: 10, border: tono === o.id ? '2px solid var(--m-blue)' : '1px solid var(--ink-200)', background: tono === o.id ? 'var(--m-blue-50)' : 'white', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink-900)' }}>{o.t}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-600)', marginTop: 3 }}>{o.d}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 28, marginBottom: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-600)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>Cuándo escalar a humano</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { t: 'Síntomas de urgencia médica', d: 'Dolor agudo, sangrado, trauma, fiebre alta, pérdida de visión.', on: true, locked: true },
            { t: 'Paciente molesto o frustrado', d: 'Detecta tono negativo y pasa a un humano.', on: true },
            { t: 'Reclamos por cobros o facturación', d: 'Cualquier disputa va directo a tu equipo.', on: true },
            { t: 'Pacientes nuevos con caso complejo', d: 'Si describe múltiples síntomas o procedimientos.', on: false },
            { t: 'Solicitudes fuera de tu especialidad', d: 'El bot sugiere derivar y notifica al equipo.', on: true },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: 14, background: 'var(--ink-50)', borderRadius: 10, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-900)' }}>{r.t} {r.locked && <span style={{ fontSize: 10, color: 'var(--m-red)', fontWeight: 700, marginLeft: 6 }}>OBLIGATORIO</span>}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-600)', marginTop: 2 }}>{r.d}</div>
              </div>
              <span style={{ width: 36, height: 20, borderRadius: 12, background: r.on ? 'var(--m-teal)' : 'var(--ink-300)', position: 'relative', flexShrink: 0, opacity: r.locked ? 0.7 : 1 }}>
                <span style={{ position: 'absolute', top: 2, left: r.on ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: 'white' }}></span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-600)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Mensaje de bienvenida</div>
        <textarea
          defaultValue="¡Hola! 👋 Soy Ada, asistente del Dr. Carrillo. Puedo ayudarte a agendar tu cita, resolver dudas sobre tratamientos o conectarte con el equipo. ¿Qué necesitas hoy?"
          style={{ width: '100%', minHeight: 100, padding: 14, border: '1px solid var(--ink-200)', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', lineHeight: 1.55, resize: 'vertical' }}
        />
        <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 8 }}>Lo primero que ve el paciente al escribir por primera vez.</div>
      </div>
    </>
  );
}

function OnboardingStep5() {
  return (
    <>
      <p style={{ fontSize: 16, color: 'var(--ink-700)', lineHeight: 1.55, marginBottom: 32, maxWidth: 600 }}>
        Tu asistente está listo. Antes de exponerlo a pacientes reales, hagamos una <b>prueba en vivo</b> y revisemos lo configurado.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
        <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-600)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Resumen de tu setup</div>
            <span className="chip chip-teal chip-dot">Listo</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['Consultorio', 'Dr. Carrillo · Chicó'],
              ['Especialidad', 'Odontología'],
              ['WhatsApp', '+57 301 234 5678 · verificado'],
              ['Calendar', 'Consultorio Chicó'],
              ['Servicios', '5 cargados'],
              ['Asistente', 'Ada · tono cercano'],
              ['Reglas escalamiento', '4 activas'],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 6 ? '1px solid var(--ink-100)' : 'none', fontSize: 13 }}>
                <span style={{ color: 'var(--ink-600)' }}>{k}</span>
                <span style={{ fontWeight: 600, color: 'var(--ink-900)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#075E54', borderRadius: 16, padding: 20, color: 'white' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Prueba en vivo · WhatsApp</div>
          <div style={{ background: '#0d3d36', borderRadius: 12, padding: 16, fontSize: 13, lineHeight: 1.55 }}>
            <div style={{ marginBottom: 10, color: 'rgba(255,255,255,0.9)' }}>Envía cualquier mensaje a tu número desde tu celular personal y mira cómo responde tu asistente. Las primeras 5 conversaciones son gratis.</div>
            <button className="btn" style={{ background: '#25D366', color: 'white', width: '100%', justifyContent: 'center' }}>
              <Icons.WhatsApp size={16} fill="white" /> Abrir WhatsApp con mi número
            </button>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--m-amber)', borderRadius: 12, padding: 18, color: '#1A1F28', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Icons.Info size={18} stroke="#1A1F28" />
        <div style={{ fontSize: 13, lineHeight: 1.55 }}>
          <b>Antes de activar:</b> al darle "Activar y entrar al panel", tu asistente empieza a recibir mensajes reales de pacientes. Asegúrate de haber revisado los servicios y horarios. Puedes pausarlo desde el panel en cualquier momento.
        </div>
      </div>
    </>
  );
}

// ====== DASHBOARD VARIANT B — Cards informativos ======
function DashboardB() {
  return (
    <div className="page" style={{ background: 'linear-gradient(180deg, #F6FBFF, #FBFAF7)' }}>
      <div className="page-head">
        <div>
          <div style={{ fontSize: 13, color: 'var(--m-blue)', fontWeight: 600, marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Jueves 23 abril</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>Buenos días, <em style={{ color: 'var(--m-blue)', fontStyle: 'italic' }}>Juan.</em></h1>
          <div className="page-sub" style={{ marginTop: 6 }}>Ada resolvió 23 conversaciones mientras dormías. Creó 4 citas, confirmó 7 y escaló 1.</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ background: 'linear-gradient(135deg, #0A6BBF, #064883)', color: 'white', borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.4), transparent)' }}></div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Tu día en 1 vistazo</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, marginTop: 24 }}>
              {[['14','Citas hoy','+3'],['$2.4M','Facturado','+18%'],['87%','Ocupación','+6pt'],['4','Pendientes','—']].map(([n, l, d], i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 40, lineHeight: 1, fontWeight: 400, letterSpacing: '-0.02em' }}>{n}</div>
                  <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{l}</div>
                  <div style={{ fontSize: 11, marginTop: 6, color: 'var(--m-teal)', fontWeight: 600 }}>{d !== '—' ? d : ''}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', gap: 12 }}>
              <button className="btn" style={{ background: 'white', color: 'var(--m-blue)' }}><Icons.Plus size={14} stroke="#0A6BBF" /> Nueva cita</button>
              <button className="btn" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}><Icons.Calendar size={14} stroke="white" /> Ver agenda</button>
            </div>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid var(--ink-200)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>Siguiente cita</div>
              <div style={{ fontSize: 13, color: 'var(--m-blue)', fontWeight: 600, marginTop: 4 }}>en 18 minutos</div>
            </div>
            <span className="chip chip-teal chip-dot">Confirmada</span>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--ink-100)' }}>
            <div className="conv-avatar" style={{ width: 44, height: 44, fontSize: 14 }}>AR</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>Andrea Ruiz</div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Control ortodoncia · 30 min</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-600)', margin: '14px 0', lineHeight: 1.5 }}>
            <Icons.Sparkles size={12} stroke="#0A6BBF" /> <b>Resumen previo:</b> Última visita 18 mar. Ajuste de bracket 16, molestia leve reportada. Traer radiografía reciente.
          </div>
          <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Abrir ficha</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {[
          { t: 'Conversaciones activas', n: '3', d: '2 nuevas · 1 escalada', i: 'Chat', color: 'blue' },
          { t: 'RDA por firmar', n: '3', d: 'De consultas de ayer', i: 'FileText', color: 'amber' },
          { t: 'Reseñas pendientes', n: '5', d: 'Pacientes contentos', i: 'Star', color: 'teal' },
        ].map((c, i) => {
          const IC = Icons[c.i];
          return (
            <div key={i} style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 16, padding: 24, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `var(--m-${c.color}-50)`, color: `var(--m-${c.color === 'amber' ? 'amber' : c.color})`, display: 'grid', placeItems: 'center' }}>
                  <IC size={18} />
                </div>
                <Icons.ArrowRight size={18} stroke="var(--ink-400)" />
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em' }}>{c.n}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{c.t}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>{c.d}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ====== DASHBOARD VARIANT C — Dark mode ======
function DashboardC() {
  const kpis = [
    { label: 'Citas hoy', num: '14', delta: '+3' },
    { label: 'Ingresos', num: '$18.4M', delta: '+12%' },
    { label: 'No-shows', num: '4.2%', delta: '-38%' },
    { label: 'Ocupación', num: '87%', delta: '+6pt' },
  ];
  return (
    <div className="page" style={{ background: '#0B1220', color: 'white', minHeight: 860 }}>
      <div className="page-head">
        <div>
          <h1 className="page-title" style={{ color: 'white', fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 36 }}>
            Control, <em style={{ color: 'var(--m-teal)', fontStyle: 'italic' }}>Dr. Carrillo.</em>
          </h1>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>Jueves 23 abril · Última sync hace 2 s</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="chip" style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--m-teal)' }}><span className="dot-live"></span> Bot activo</span>
          <button className="btn" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.12)' }}>Últimos 30d</button>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((k, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{k.label}</div>
            <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 10 }}>{k.num}</div>
            <div style={{ fontSize: 12, color: 'var(--m-teal)', marginTop: 4 }}>{k.delta} vs anterior</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginTop: 16 }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ fontWeight: 600 }}>Flujo de operación en vivo</div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Últimas 2 horas</span>
          </div>
          <div style={{ position: 'relative', height: 200, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            {[30,45,62,58,78,90,82,95,72,68,85,95].map((h, i) => (
              <div key={i} style={{ flex: 1, background: `linear-gradient(180deg, var(--m-teal), rgba(16,185,129,0.2))`, height: h + '%', borderRadius: '3px 3px 0 0', position: 'relative' }}></div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>
            <span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span><span>ahora</span>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 12, color: 'var(--m-teal)', marginBottom: 14, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Insight del día</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.25, fontWeight: 400 }}>Tu ocupación de <em style={{ color: 'var(--m-teal)', fontStyle: 'italic' }}>jueves</em> es la más alta de la semana. Podrías abrir un 5to bloque.</div>
          <button className="btn btn-sm" style={{ marginTop: 20, background: 'var(--m-teal)', color: '#0B1220', fontWeight: 600 }}>Configurar <Icons.ArrowRight size={14} stroke="#0B1220" /></button>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24, marginTop: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 14 }}>Actividad del bot · En vivo <span className="dot-live" style={{ marginLeft: 8 }}></span></div>
        {[
          ['10:42','María F. López','agendó limpieza','Cita creada','teal'],
          ['10:28','Carlos Rodríguez','confirmó cita','Confirmada','blue'],
          ['09:51','Ana Pérez','consultó blanqueamiento','Info',''],
          ['08:47','+57 315 ••••','urgencia dental','Escalada','red'],
        ].map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', padding: '12px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none', alignItems: 'center', gap: 12, fontSize: 14 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{r[0]}</div>
            <div><b style={{ color: 'white' }}>{r[1]}</b> <span style={{ color: 'rgba(255,255,255,0.6)' }}>{r[2]}</span></div>
            <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, background: r[4] === 'teal' ? 'rgba(16,185,129,0.15)' : r[4] === 'blue' ? 'rgba(10,107,191,0.2)' : r[4] === 'red' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.08)', color: r[4] === 'teal' ? 'var(--m-teal)' : r[4] === 'blue' ? '#7AB5F0' : r[4] === 'red' ? '#FCA5A5' : 'rgba(255,255,255,0.6)' }}>{r[3]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ====== MOBILE VIEW ======
function MobilePanel() {
  return (
    <div style={{ padding: 40, background: 'linear-gradient(160deg, var(--m-blue-50), white)', minHeight: 860, display: 'grid', placeItems: 'center' }}>
      <div className="mobile-frame">
        <div className="mobile-screen">
          <div className="mobile-status">
            <span>9:41</span>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="3" height="4" rx="0.5"/><rect x="4" y="4" width="3" height="6" rx="0.5"/><rect x="8" y="2" width="3" height="8" rx="0.5"/><rect x="12" y="0" width="3" height="10" rx="0.5"/></svg>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M7 2C4.5 2 2.5 3 1 4.5L2 5.5C3.2 4.4 4.9 3.5 7 3.5s3.8.9 5 2l1-1C11.5 3 9.5 2 7 2zm0 3C5.5 5 4.3 5.5 3.5 6.3l1 1c.6-.5 1.5-1 2.5-1s1.9.5 2.5 1l1-1C9.7 5.5 8.5 5 7 5zm0 3c-.8 0-1.4.3-1.8.7L7 10l1.8-1.3c-.4-.4-1-.7-1.8-.7z"/></svg>
              <div style={{ width: 24, height: 11, border: '1px solid currentColor', borderRadius: 3, position: 'relative', padding: 1 }}>
                <div style={{ width: '85%', height: '100%', background: 'currentColor', borderRadius: 1 }}></div>
              </div>
            </span>
          </div>
          <div style={{ padding: '12px 20px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Jue 23 abril</div>
                <div style={{ fontSize: 22, fontFamily: 'var(--font-serif)', fontWeight: 400, letterSpacing: '-0.02em' }}>Hola, <em style={{ color: 'var(--m-blue)' }}>Dr. Juan</em></div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #0A6BBF, #10B981)', color: 'white', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 600 }}>JC</div>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: '0 16px' }}>
            <div style={{ background: 'linear-gradient(135deg, #0A6BBF, #064883)', color: 'white', borderRadius: 16, padding: 18, marginBottom: 14 }}>
              <div style={{ fontSize: 11, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Próxima cita</div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>En 18 min · 9:00 am</div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 10 }}>Andrea Ruiz</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>Control ortodoncia · 30 min</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button style={{ padding: '7px 12px', background: 'white', color: 'var(--m-blue)', borderRadius: 8, fontSize: 12, fontWeight: 600, border: 'none' }}>Abrir ficha</button>
                <button style={{ padding: '7px 12px', background: 'rgba(255,255,255,0.15)', color: 'white', borderRadius: 8, fontSize: 12, border: '1px solid rgba(255,255,255,0.2)' }}>Reagendar</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Citas hoy</div>
                <div style={{ fontSize: 26, fontFamily: 'var(--font-serif)', fontWeight: 400 }}>14</div>
                <div style={{ fontSize: 10, color: 'var(--m-teal-600)', fontWeight: 600 }}>+3 vs ayer</div>
              </div>
              <div style={{ background: 'white', border: '1px solid var(--ink-200)', borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Ingresos día</div>
                <div style={{ fontSize: 26, fontFamily: 'var(--font-serif)', fontWeight: 400 }}>$2.4M</div>
                <div style={{ fontSize: 10, color: 'var(--m-teal-600)', fontWeight: 600 }}>+18%</div>
              </div>
            </div>

            <div style={{ fontSize: 12, color: 'var(--ink-500)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', margin: '14px 4px 8px' }}>Para ti hoy</div>
            {[
              { i: 'FileText', t: 'Firmar 3 RDA', d: 'De consultas de ayer', tag: 'Urgente', color: 'red' },
              { i: 'Chat', t: 'Revisar 2 escalaciones', d: 'Pacientes esperando', tag: 'Pendiente', color: 'amber' },
              { i: 'Mic', t: 'Dictar nota: María López', d: 'Post-limpieza', tag: '30s', color: '' },
            ].map((t, i) => {
              const IC = Icons[t.i];
              return (
                <div key={i} style={{ background: 'white', border: '1px solid var(--ink-100)', borderRadius: 12, padding: 12, marginBottom: 8, display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--ink-50)', display: 'grid', placeItems: 'center', color: 'var(--ink-700)' }}><IC size={16} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{t.t}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{t.d}</div>
                  </div>
                  <span className={`chip chip-${t.color}`} style={{ fontSize: 10 }}>{t.tag}</span>
                </div>
              );
            })}
          </div>
          <div className="mobile-nav">
            {[
              { i: 'Home', l: 'Inicio', active: true },
              { i: 'Calendar', l: 'Agenda' },
              { i: 'Chat', l: 'Chats' },
              { i: 'Users', l: 'Pacientes' },
              { i: 'Mic', l: 'Dictar' },
            ].map((n, i) => {
              const IC = Icons[n.i];
              return (
                <div key={i} className={`mobile-nav-item ${n.active ? 'active' : ''}`}>
                  <IC size={20} /> <span>{n.l}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== INTEGRACIONES ======
function Integraciones() {
  const ints = [
    { n: 'WhatsApp Business', d: 'Cloud API · conectado al bot', on: true, color: '#25D366', i: 'WhatsApp' },
    { n: 'Google Calendar', d: 'Sync bidireccional', on: true, color: '#4285F4', i: 'Calendar' },
    { n: 'Google Reviews', d: 'Solicita reseñas automáticas', on: true, color: '#FBBC04', i: 'Star' },
    { n: 'Stripe / Wompi', d: 'Cobra a pacientes desde el bot', on: false, color: '#635BFF', i: 'CreditCard' },
    { n: 'Zapier', d: 'Conecta con 5.000+ apps externas', on: false, color: '#FF4A00', i: 'Zap' },
    { n: 'Gmail SMTP', d: 'Envío de recordatorios por correo', on: true, color: '#EA4335', i: 'Mail' },
    { n: 'Sheets / Airtable', d: 'Exporta reportes automáticos', on: false, color: '#34A853', i: 'FileText' },
    { n: 'HubSpot', d: 'Sincroniza tu CRM externo', on: false, color: '#FF7A59', i: 'Users' },
    { n: 'API MEDACCER', d: 'Acceso programático · docs', on: true, color: '#0A6BBF', i: 'Plug' },
  ];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Integraciones</h1>
          <div className="page-sub">Conecta MEDACCER con las herramientas que ya usas</div>
        </div>
        <button className="btn btn-outline btn-sm">Solicitar integración</button>
      </div>
      <div className="auto-grid">
        {ints.map((it, i) => {
          const IC = Icons[it.i];
          return (
            <div key={i} className="auto-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: it.color + '18', color: it.color, display: 'grid', placeItems: 'center' }}>
                  <IC size={22} />
                </div>
                {it.on ? <span className="chip chip-teal chip-dot">Conectado</span> : <button className="btn btn-outline btn-sm">Conectar</button>}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 14 }}>{it.n}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-600)', marginTop: 4 }}>{it.d}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

window.Signup = Signup;
window.Onboarding = Onboarding;
window.DashboardB = DashboardB;
window.DashboardC = DashboardC;
window.MobilePanel = MobilePanel;
window.Integraciones = Integraciones;
