/* global React, Icons, NavContext */

// ============================================================
// CHECKOUT — Pasarela de pagos estilo Stripe, con opción Beta gratis
// ============================================================

const PLANS = [
  {
    id: 'inicio',
    name: 'Inicio',
    monthly: 350000,
    yearly: 3500000,       // 10% dto
    setup: 500000,
    features: [
      'Bot WhatsApp 24/7 con IA',
      'Agendamiento automático',
      'Recordatorios y confirmaciones',
      'Hasta 500 pacientes activos',
      'Soporte por WhatsApp',
    ],
  },
  {
    id: 'pro',
    name: 'Profesional',
    monthly: 800000,
    yearly: 8000000,
    setup: 1000000,
    popular: true,
    features: [
      'Todo lo del plan Inicio',
      'Seguimiento de presupuestos',
      'Lista de espera inteligente',
      'Gestor de reseñas Google',
      'Marketing automatizado',
      'Notas clínicas con IA',
      'Pacientes ilimitados',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    monthly: 2000000,
    yearly: 20000000,
    setup: 2000000,
    features: [
      'Todo lo del plan Profesional',
      'Generador RDA (Resol. 1888)',
      'Triage inteligente',
      'Dashboard rentabilidad',
      'Seguimiento post‑op 24/7',
      'Integraciones CRM a medida',
      'Soporte prioritario 1‑on‑1',
    ],
  },
];

function fmtCOP(n) {
  return '$' + n.toLocaleString('es-CO') + ' COP';
}

function Checkout() {
  const [step, setStep] = React.useState(0); // 0: plan, 1: pago
  const [planId, setPlanId] = React.useState('pro');
  const [period, setPeriod] = React.useState('yearly'); // 'monthly' | 'yearly'
  const [beta, setBeta] = React.useState(true); // beta toggle por defecto ON
  const [processing, setProcessing] = React.useState(false);

  // payment form
  const [card, setCard] = React.useState('4242 4242 4242 4242');
  const [exp, setExp] = React.useState('12 / 28');
  const [cvc, setCvc] = React.useState('123');
  const [name, setName] = React.useState('Dr. Juan Carrillo');
  const [email, setEmail] = React.useState('doctor@consultorio.co');

  const plan = PLANS.find(p => p.id === planId) || PLANS[1];
  const baseMonthly = plan.monthly;
  const subtotal = period === 'yearly' ? plan.yearly : plan.monthly;
  const setupFee = beta ? 0 : plan.setup;
  const monthlyDiscount = beta ? subtotal : 0;
  const total = beta ? 0 : subtotal + setupFee;

  const submit = (e) => {
    e?.preventDefault?.();
    setProcessing(true);
    setTimeout(() => {
      window.location.hash = 'onboarding/0';
    }, 1800);
  };

  return (
    <div className="checkout-shell">
      {/* Header con logo + progreso */}
      <header className="checkout-head">
        <div className="checkout-head-inner">
          <a href="#landing" className="m-logo" style={{ fontSize: 18 }}><div className="m-logo-mark">M</div> MEDACCER</a>
          <div className="checkout-progress">
            <div className="ck-step ck-step-done"><span>1</span> Cuenta</div>
            <div className="ck-bar ck-bar-done"></div>
            <div className={`ck-step ${step >= 0 ? 'ck-step-active' : ''}`}><span>2</span> Plan</div>
            <div className={`ck-bar ${step >= 1 ? 'ck-bar-done' : ''}`}></div>
            <div className={`ck-step ${step >= 1 ? 'ck-step-active' : ''}`}><span>3</span> Pago</div>
            <div className="ck-bar"></div>
            <div className="ck-step"><span>4</span> Listo</div>
          </div>
          <a href="#landing" className="checkout-exit">← Salir</a>
        </div>
      </header>

      <div className="checkout-body">
        {/* LEFT column: forms */}
        <div className="checkout-left">
          {step === 0 && (
            <>
              <h1 className="checkout-title">Elige tu plan</h1>
              <p className="checkout-sub">Puedes cambiar o cancelar cuando quieras. 7 días de prueba sin tarjeta — solo se te cobra si decides continuar.</p>

              {/* Prueba gratis toggle */}
              <div className={`beta-card ${beta ? 'active' : ''}`} onClick={() => setBeta(!beta)}>
                <div className="beta-card-check">{beta ? <Icons.Check size={18} stroke="white" /> : null}</div>
                <div style={{ flex: 1 }}>
                  <div className="beta-card-title">
                    <b>Prueba 7 días</b>
                    <span className="chip chip-teal" style={{ marginLeft: 10 }}>Sin tarjeta</span>
                  </div>
                  <div className="beta-card-sub">Configura tu bot, responde pacientes reales, cancela cuando quieras. Solo cobramos si decides continuar.</div>
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: beta ? 'var(--m-teal-600)' : 'var(--ink-400)', fontWeight: 400 }}>
                  {beta ? 'Gratis' : 'Pagar'}
                </div>
              </div>

              {/* Period toggle */}
              <div className="period-toggle">
                <button className={period === 'monthly' ? 'on' : ''} onClick={() => setPeriod('monthly')}>Mensual</button>
                <button className={period === 'yearly' ? 'on' : ''} onClick={() => setPeriod('yearly')}>Anual <span className="save-badge">Ahorra 2 meses</span></button>
              </div>

              {/* Plans */}
              <div className="ck-plans">
                {PLANS.map(p => {
                  const price = period === 'yearly' ? p.yearly : p.monthly;
                  const suffix = period === 'yearly' ? '/año' : '/mes';
                  return (
                    <div key={p.id} className={`ck-plan ${planId === p.id ? 'selected' : ''} ${p.popular ? 'popular' : ''}`} onClick={() => setPlanId(p.id)}>
                      {p.popular && <div className="ck-plan-badge">Más popular</div>}
                      <div className="ck-plan-radio">{planId === p.id && <div className="ck-plan-radio-dot"></div>}</div>
                      <div style={{ flex: 1 }}>
                        <div className="ck-plan-name">{p.name}</div>
                        <div className="ck-plan-price">{fmtCOP(price)}<span style={{ fontSize: 13, color: 'var(--ink-500)', fontFamily: 'var(--font-sans)' }}>{suffix}</span></div>
                        <ul className="ck-plan-features">
                          {p.features.slice(0, 4).map((f, i) => <li key={i}><Icons.Check size={12} stroke="var(--m-teal)" /> {f}</li>)}
                          {p.features.length > 4 && <li style={{ color: 'var(--ink-500)', fontSize: 12 }}>+ {p.features.length - 4} más</li>}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 28 }} onClick={() => setStep(1)}>
                Continuar {beta ? 'con prueba gratis' : 'al pago'} <Icons.ArrowRight size={16} stroke="white" />
              </button>
              <div style={{ fontSize: 12, color: 'var(--ink-500)', textAlign: 'center', marginTop: 12 }}>
                {beta ? 'No se te cobrará nada durante los primeros 7 días' : 'Pago seguro procesado por Stripe'}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <button className="ck-back" onClick={() => setStep(0)}>← Cambiar plan</button>
              <h1 className="checkout-title">
                {beta ? 'Activa tu prueba de 7 días' : 'Método de pago'}
              </h1>
              <p className="checkout-sub">
                {beta
                  ? 'Guardamos tu información para no cobrarte nada durante la prueba. Te avisamos 48h antes del primer cargo y puedes decidir.'
                  : 'Pago seguro procesado por Stripe. Cifrado de grado bancario (TLS 1.3 + tokenización PCI‑DSS).'}
              </p>

              <form onSubmit={submit}>
                <div className="ck-form-group">
                  <label>Nombre completo</label>
                  <input value={name} onChange={e => setName(e.target.value)} required placeholder="Dr. Juan Carrillo" />
                </div>
                <div className="ck-form-group">
                  <label>Correo de facturación</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="tu@consultorio.co" />
                </div>

                <div className="ck-card-field">
                  <label>
                    <span>Información de la tarjeta</span>
                    <span className="ck-card-brands">
                      <CardBrand type="visa" />
                      <CardBrand type="mc" />
                      <CardBrand type="amex" />
                    </span>
                  </label>
                  <div className="ck-card-wrap">
                    <div className="ck-card-row">
                      <Icons.Lock size={14} stroke="var(--ink-500)" />
                      <input value={card} onChange={e => setCard(e.target.value)} placeholder="1234 1234 1234 1234" style={{ flex: 1 }} />
                    </div>
                    <div className="ck-card-row ck-card-row-split">
                      <input value={exp} onChange={e => setExp(e.target.value)} placeholder="MM / AA" style={{ flex: 1 }} />
                      <input value={cvc} onChange={e => setCvc(e.target.value)} placeholder="CVC" style={{ width: 100 }} />
                    </div>
                  </div>
                </div>

                <div className="ck-form-group">
                  <label>País</label>
                  <select defaultValue="CO">
                    <option value="CO">🇨🇴 Colombia</option>
                    <option value="MX">🇲🇽 México</option>
                    <option value="PE">🇵🇪 Perú</option>
                    <option value="CL">🇨🇱 Chile</option>
                    <option value="AR">🇦🇷 Argentina</option>
                  </select>
                </div>

                <label style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--ink-600)', margin: '20px 0', alignItems: 'flex-start' }}>
                  <input type="checkbox" defaultChecked style={{ marginTop: 3 }} />
                  <span>Autorizo a MEDACCER a almacenar mi método de pago para cobros recurrentes según el plan seleccionado. Puedo cancelar en cualquier momento.</span>
                </label>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={processing}>
                  {processing
                    ? <>Procesando <span className="spinner" style={{ marginLeft: 10 }}></span></>
                    : beta
                      ? <>Activar prueba gratis <Icons.ArrowRight size={16} stroke="white" /></>
                      : <>Pagar {fmtCOP(total)} <Icons.ArrowRight size={16} stroke="white" /></>
                  }
                </button>

                <div className="ck-trust-row">
                  <div><Icons.Lock size={13} stroke="var(--ink-500)" /> TLS 1.3 + PCI‑DSS</div>
                  <div><Icons.Shield size={13} stroke="var(--ink-500)" /> Stripe</div>
                  <div>Cancela cuando quieras</div>
                </div>
              </form>
            </>
          )}
        </div>

        {/* RIGHT column: order summary */}
        <aside className="checkout-right">
          <div className="ck-summary">
            <div className="ck-summary-title">Resumen</div>
            <div className="ck-summary-row">
              <div>
                <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>Plan seleccionado</div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{plan.name} · {period === 'yearly' ? 'Anual' : 'Mensual'}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--ink-900)', fontWeight: 400 }}>
                {fmtCOP(subtotal)}
              </div>
            </div>

            {!beta && (
              <div className="ck-summary-row">
                <div>
                  <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>Setup único</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Configuración inicial + migración</div>
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--ink-700)', fontWeight: 400 }}>
                  {fmtCOP(setupFee)}
                </div>
              </div>
            )}

            {beta && (
              <div className="ck-summary-row ck-summary-discount">
                <div>
                  <div style={{ fontSize: 13, color: 'var(--m-teal-700)', fontWeight: 600 }}>Prueba gratis 7 días</div>
                  <div style={{ fontSize: 12, color: 'var(--m-teal-700)' }}>Sin cargos durante el período de prueba</div>
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--m-teal-700)', fontWeight: 400 }}>
                  –{fmtCOP(monthlyDiscount + plan.setup)}
                </div>
              </div>
            )}

            <div className="ck-summary-divider"></div>

            <div className="ck-summary-row ck-summary-total">
              <div style={{ fontSize: 16, fontWeight: 600 }}>Total hoy</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: beta ? 'var(--m-teal-600)' : 'var(--ink-900)', fontWeight: 400, letterSpacing: '-0.02em' }}>
                {beta ? 'Gratis' : fmtCOP(total)}
              </div>
            </div>

            {beta && (
              <div style={{ padding: 12, background: 'var(--m-teal-50)', border: '1px solid var(--m-teal-100)', borderRadius: 10, fontSize: 12, color: 'var(--m-teal-700)', lineHeight: 1.5, marginTop: 14 }}>
                <b>Próximo cargo:</b> {period === 'yearly' ? fmtCOP(plan.yearly) : fmtCOP(plan.monthly)} — al finalizar tus 7 días de prueba. Te avisamos 48h antes.
              </div>
            )}

            <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 16, lineHeight: 1.5 }}>
              Todos los precios en pesos colombianos (COP). IVA no aplica al servicio SaaS según DIAN.
              Cancela cuando quieras desde tu panel — los datos se exportan en CSV.
            </div>
          </div>

          {/* Qué incluye - honesto */}
          <div className="ck-testimonial">
            <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--m-blue)', fontWeight: 600, marginBottom: 12 }}>Incluido en todos los planes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--ink-700)' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}><Icons.Check size={14} stroke="#10B981" /> Onboarding 1‑on‑1 de 90 minutos con un especialista</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}><Icons.Check size={14} stroke="#10B981" /> Configuración de tu bot, servicios y precios</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}><Icons.Check size={14} stroke="#10B981" /> Integración con Google Calendar y WhatsApp</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}><Icons.Check size={14} stroke="#10B981" /> Soporte por WhatsApp durante todo el setup</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}><Icons.Check size={14} stroke="#10B981" /> Asesoría Resolución 1888 sin costo extra</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Card brand icon
function CardBrand({ type }) {
  const styles = {
    visa: { background: '#1A1F71', color: 'white', font: '700 10px Helvetica,Arial,sans-serif' },
    mc:   { background: '#EB001B', color: 'white', font: '700 9px Helvetica,Arial,sans-serif' },
    amex: { background: '#006FCF', color: 'white', font: '700 8px Helvetica,Arial,sans-serif' },
  };
  const labels = { visa: 'VISA', mc: 'MC', amex: 'AMEX' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '2px 6px', borderRadius: 4, ...styles[type] }}>
      {labels[type]}
    </span>
  );
}

window.Checkout = Checkout;
