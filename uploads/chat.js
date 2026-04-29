/* ================================================
   CHAT ENGINE v2 — Demo potenciado
   - Hero loop
   - Demo multi-escenario con:
     · Backstage por mensaje (sub-etapas)
     · Slots de calendario visibles
     · Nota de voz simulada (onda audio)
     · Payoff card al final
     · Controles play/pausa/velocidad/reinicio
================================================ */
(function () {

  let SPEED = 1;              // 0.5 / 1 / 2
  let PAUSED = false;
  let pauseResolver = null;

  const T = {
    typing: 1100,
    patient: 700,
    bot: 800,
    loopPause: 4200,
    widget: 1300,
    toast: 1500,
    payoff: 2500,
  };

  function wait(ms) {
    return new Promise((resolve) => {
      const target = ms / SPEED;
      const start = Date.now();
      let timer = null;
      function tick() {
        if (PAUSED) {
          pauseResolver = () => { pauseResolver = null; tick(); };
          return;
        }
        const elapsed = Date.now() - start;
        if (elapsed >= target) { resolve(); return; }
        timer = setTimeout(tick, Math.max(16, target - elapsed));
      }
      tick();
    });
  }

  function now() {
    const d = new Date();
    return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
  }

  // ============== HERO ==============
  const HERO_MESSAGES = [
    { type: 'patient', text: 'Hola doctor, me duele un diente 😟 ¿Tienen cita esta semana?' },
    { type: 'bot',     text: 'Hola. Lo siento. Le comparto los espacios más próximos:<br><br>✨ <b>Hoy</b> · 5:30 PM<br>✨ <b>Martes</b> · 10:00 AM<br>✨ <b>Miércoles</b> · 3:00 PM' },
    { type: 'patient', text: 'Hoy 5:30 por favor' },
    { type: 'bot',     text: '✅ Cita confirmada<br><br><b>Hoy</b> · 5:30 PM<br>📍 Cra 15 #92-10<br><br>Le enviaré recordatorio 2h antes.' },
  ];

  // ============== DEMO ==============
  // Each message can have a 'stage' (0..3) to sync the backstage panel
  // Widgets: 'calendar', 'voice', 'payoff'
  const SCENARIOS = {
    schedule: {
      label: 'Agendar cita',
      messages: [
        { type: 'patient', text: 'Hola, quiero agendar con el Dr. Rodríguez', stage: 0 },
        { type: 'bot',     text: 'Claro. Reviso la agenda del doctor un momento…', stage: 1 },
        { type: 'widget',  kind: 'calendar' },
        { type: 'bot',     text: 'Estos son los espacios disponibles esta semana:<br>✨ <b>Martes</b> · 3:00 PM<br>✨ <b>Jueves</b> · 10:00 AM<br>✨ <b>Viernes</b> · 4:30 PM', stage: 1 },
        { type: 'patient', text: 'Martes 3pm está perfecto', stage: 2 },
        { type: 'bot',     text: '✅ Listo. Le agendé <b>Martes 3:00 PM</b>.<br>Le enviaré recordatorio 24h y 2h antes.', stage: 2 },
        { type: 'toast',   text: '📅 Cita sincronizada al calendario del doctor', stage: 3 },
        { type: 'widget',  kind: 'payoff', data: { patient: 'María López', date: 'Martes 15 abril · 3:00 PM', doctor: 'Dr. Rodríguez', place: 'Cra 15 #92-10' } },
      ],
    },

    confused: {
      label: 'Paciente confundido',
      messages: [
        { type: 'patient', text: 'buenos dias quiero cancelar pero no sé si es mañana o el jueves', stage: 0 },
        { type: 'bot',     text: 'Buenos días 🙂 Déjeme buscar sus citas activas…', stage: 1 },
        { type: 'widget',  kind: 'calendar', variant: 'active' },
        { type: 'bot',     text: 'Veo una cita activa:<br><b>Jueves 17 · 2:30 PM</b> con Dr. Rodríguez.<br>¿Es esa la que quiere cancelar?', stage: 1 },
        { type: 'patient', text: 'si esa', stage: 2 },
        { type: 'bot',     text: '¿Prefiere <b>cancelar</b> o <b>moverla</b> a otra fecha? Tenemos espacios la próxima semana.', stage: 2 },
        { type: 'patient', text: 'muevela pa la otra semana', stage: 2 },
        { type: 'bot',     text: '✅ Listo.<br>Moví la cita al <b>Jueves 24 · 2:30 PM</b>.<br>Le aviso 24h antes.', stage: 2 },
        { type: 'toast',   text: '🔄 Cita reagendada · Hueco liberado en lista de espera', stage: 3 },
      ],
    },

    reminder: {
      label: 'Recordatorio',
      messages: [
        { type: 'bot',     text: 'Hola María 👋 Le recordamos su cita <b>mañana martes 3:00 PM</b>.<br>¿Confirma asistencia?', stage: 0 },
        { type: 'patient', text: 'Sí, ahí estaré ✓', stage: 2 },
        { type: 'bot',     text: '¡Gracias María! La esperamos mañana. Recuerde llegar 10 min antes.', stage: 2 },
        { type: 'toast',   text: '✅ Confirmada · María López · Martes 3:00 PM', variant: 'success', stage: 3 },
      ],
    },

    reschedule: {
      label: 'Reagendar',
      messages: [
        { type: 'patient', text: 'Necesito mover mi cita del martes', stage: 0 },
        { type: 'bot',     text: 'Claro. Busco espacios alternativos…', stage: 1 },
        { type: 'widget',  kind: 'calendar' },
        { type: 'bot',     text: 'Tenemos disponible:<br>• <b>Miércoles</b> · 2:00 PM<br>• <b>Viernes</b> · 9:00 AM<br>• <b>Sábado</b> · 11:00 AM', stage: 1 },
        { type: 'patient', text: 'Viernes 9am', stage: 2 },
        { type: 'bot',     text: '✅ Movida al <b>Viernes 9:00 AM</b>. Mismo procedimiento.', stage: 2 },
        { type: 'toast',   text: '🔄 Lista de espera notificada · hueco del martes ocupado', stage: 3 },
      ],
    },

    rda: {
      label: 'Generar RDA',
      messages: [
        { type: 'bot',     text: 'Doctor, terminó la consulta con <b>María López</b>. ¿Dicta el resumen?', stage: 0 },
        { type: 'widget',  kind: 'voice', duration: '0:08' },
        { type: 'patient', text: '<i>"Paciente femenina 32 años, profilaxis sin hallazgos, control en 6 meses."</i>', stage: 1 },
        { type: 'bot',     text: '✅ <b>RDA generado</b><br><br>Paciente: María López<br>Procedimiento: Profilaxis<br>Diagnóstico: Sin hallazgos<br>Control: 6 meses<br><br>¿Lo envío al Ministerio?', stage: 2 },
        { type: 'patient', text: 'Sí, enviar', stage: 2 },
        { type: 'toast',   text: '✓ RDA enviado · Cumple Resolución 1888', variant: 'success', stage: 3 },
      ],
    },

    emergency: {
      label: 'Urgencia',
      messages: [
        { type: 'patient', text: 'Se me cayó una corona, es urgente 😰', stage: 0 },
        { type: 'bot',     text: 'Lo entiendo, María. Detecto urgencia.<br>Lo escalo con el doctor ahora mismo ⚡', stage: 1 },
        { type: 'toast',   text: '🚨 Escalado a humano · Respuesta en &lt;2 min', stage: 1 },
        { type: 'bot',     text: 'Doctor disponible. Le abrimos espacio <b>hoy 6:00 PM</b> (cita emergencia). ¿Puede?', stage: 2 },
        { type: 'patient', text: 'Sí, voy saliendo', stage: 2 },
        { type: 'bot',     text: '✅ Confirmado. Llegue directo, lo esperamos.', stage: 2 },
        { type: 'toast',   text: '📍 Dirección enviada · Cra 15 #92-10', variant: 'success', stage: 3 },
      ],
    },

    review: {
      label: 'Reseña Google',
      messages: [
        { type: 'bot',     text: '¡Hola María! Gracias por visitarnos hoy.<br>¿Cómo calificaría su experiencia?', stage: 0 },
        { type: 'patient', text: '⭐⭐⭐⭐⭐ Excelente atención', stage: 2 },
        { type: 'bot',     text: '¡Nos alegra! 🙏 ¿Podría compartirlo en Google? Ayuda muchísimo al consultorio.<br><br>→ <b>Dejar reseña</b>', stage: 2 },
        { type: 'patient', text: 'Claro, ya la dejo', stage: 2 },
        { type: 'toast',   text: '⭐ Reseña publicada · Promedio: 4.9', variant: 'success', stage: 3 },
      ],
    },
  };

  // ========== DOM HELPERS ==========
  function mkTyping() {
    const el = document.createElement('div');
    el.className = 'typing-indicator';
    el.innerHTML = '<span></span><span></span><span></span>';
    return el;
  }
  function mkMessage(msg) {
    const el = document.createElement('div');
    el.className = `chat-message ${msg.type}`;
    el.innerHTML = msg.text + '<span class="wa-time">' + now() + (msg.type==='patient'?' ✓✓':'') + '</span>';
    return el;
  }
  function mkToast(msg) {
    const el = document.createElement('div');
    el.className = 'demo-toast-msg' + (msg.variant === 'success' ? ' toast-success' : '');
    el.innerHTML = msg.text;
    return el;
  }
  function mkCalendarWidget(variant) {
    const slots = variant === 'active'
      ? [
          { day: 'Jueves', date: '17 abril', time: '2:30 PM', active: true, label: 'Cita activa' },
        ]
      : [
          { day: 'Martes', date: '15 abril', time: '3:00 PM' },
          { day: 'Jueves', date: '17 abril', time: '10:00 AM' },
          { day: 'Viernes', date: '18 abril', time: '4:30 PM' },
        ];
    const el = document.createElement('div');
    el.className = 'chat-widget widget-calendar';
    el.innerHTML = `
      <div class="widget-head">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <span>${variant === 'active' ? 'Citas activas de María' : 'Consultando agenda del doctor…'}</span>
      </div>
      <div class="widget-slots">
        ${slots.map(s => `
          <div class="slot-card ${s.active ? 'slot-active' : ''}">
            <div class="slot-day">${s.day}</div>
            <div class="slot-date">${s.date}</div>
            <div class="slot-time">${s.time}</div>
            ${s.label ? `<div class="slot-label">${s.label}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
    return el;
  }
  function mkVoiceWidget(duration) {
    const el = document.createElement('div');
    el.className = 'chat-widget widget-voice';
    el.innerHTML = `
      <div class="voice-play">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <div class="voice-wave">
        ${Array.from({length: 22}).map((_,i) => `<span style="height:${20 + Math.sin(i)*30 + Math.random()*40}%;animation-delay:${i*0.08}s"></span>`).join('')}
      </div>
      <div class="voice-duration">${duration}</div>
    `;
    return el;
  }
  function mkPayoffWidget(data) {
    const el = document.createElement('div');
    el.className = 'chat-widget widget-payoff';
    el.innerHTML = `
      <div class="payoff-badge">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="payoff-title">Cita confirmada</div>
      <div class="payoff-grid">
        <div class="payoff-row"><span>Paciente</span><b>${data.patient}</b></div>
        <div class="payoff-row"><span>Fecha</span><b>${data.date}</b></div>
        <div class="payoff-row"><span>Doctor</span><b>${data.doctor}</b></div>
        <div class="payoff-row"><span>Lugar</span><b>${data.place}</b></div>
      </div>
    `;
    return el;
  }

  // ============ HERO CHAT ============
  async function initHeroChat() {
    const container = document.getElementById('hero-chat');
    if (!container) return;

    function scrollBottom() { container.scrollTop = container.scrollHeight; }

    async function runLoop() {
      while (true) {
        container.innerHTML = '';
        for (const msg of HERO_MESSAGES) {
          if (msg.type === 'bot') {
            const typing = mkTyping();
            container.appendChild(typing); scrollBottom();
            await wait(T.typing);
            typing.remove();
            const el = mkMessage(msg);
            container.appendChild(el); scrollBottom();
            requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
            await wait(T.bot);
          } else {
            const el = mkMessage(msg);
            container.appendChild(el); scrollBottom();
            requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
            await wait(T.patient);
          }
        }
        await wait(T.loopPause);
      }
    }

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { runLoop(); obs.unobserve(container); }
    }, { threshold: 0.1 });
    obs.observe(container);
  }

  // ============ DEMO CHAT ============
  async function initDemoChat() {
    const container = document.getElementById('demo-chat');
    const tabs = document.querySelectorAll('.demo-tab');
    const backstageSteps = document.querySelectorAll('.backstage-step');
    if (!container || !tabs.length) return;

    let currentKey = 'schedule';
    let currentRunId = 0;

    function scrollBottom() { container.scrollTop = container.scrollHeight; }

    function updateBackstage(stage) {
      if (stage == null || stage < 0) return;
      backstageSteps.forEach((s, i) => {
        s.classList.toggle('active', i <= stage);
        s.classList.toggle('done', i < stage);
      });
    }

    function resetBackstage() {
      backstageSteps.forEach(s => s.classList.remove('active', 'done'));
    }

    async function runScenario(key) {
      const myRun = ++currentRunId;
      container.innerHTML = '';
      resetBackstage();

      const scenario = SCENARIOS[key];
      if (!scenario) return;

      for (const msg of scenario.messages) {
        if (myRun !== currentRunId) return; // canceled
        if (msg.stage != null) updateBackstage(msg.stage);

        if (msg.type === 'widget') {
          let el;
          if (msg.kind === 'calendar') el = mkCalendarWidget(msg.variant);
          else if (msg.kind === 'voice') el = mkVoiceWidget(msg.duration);
          else if (msg.kind === 'payoff') el = mkPayoffWidget(msg.data);
          if (el) {
            container.appendChild(el); scrollBottom();
            requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
            await wait(msg.kind === 'payoff' ? T.payoff : T.widget);
          }
        } else if (msg.type === 'toast') {
          const el = mkToast(msg);
          container.appendChild(el); scrollBottom();
          requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
          await wait(T.toast);
        } else if (msg.type === 'bot') {
          const typing = mkTyping();
          container.appendChild(typing); scrollBottom();
          await wait(T.typing);
          if (myRun !== currentRunId) return;
          typing.remove();
          const el = mkMessage(msg);
          container.appendChild(el); scrollBottom();
          requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
          await wait(T.bot);
        } else {
          const el = mkMessage(msg);
          container.appendChild(el); scrollBottom();
          requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
          await wait(T.patient);
        }
      }

      await wait(T.loopPause);
      if (myRun === currentRunId) runScenario(key);
    }

    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.scenario;
        if (!SCENARIOS[key]) return;
        currentKey = key;
        tabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        runScenario(key);
      });
    });

    // Controls
    const btnPause = document.getElementById('demo-btn-pause');
    const btnReplay = document.getElementById('demo-btn-replay');
    const btnSpeed = document.getElementById('demo-btn-speed');

    if (btnPause) btnPause.addEventListener('click', () => {
      PAUSED = !PAUSED;
      btnPause.classList.toggle('is-paused', PAUSED);
      btnPause.querySelector('.ctrl-lbl').textContent = PAUSED ? 'Reanudar' : 'Pausar';
      if (!PAUSED && pauseResolver) pauseResolver();
    });
    if (btnReplay) btnReplay.addEventListener('click', () => {
      runScenario(currentKey);
    });
    if (btnSpeed) {
      const speeds = [1, 1.5, 2, 0.5];
      let si = 0;
      btnSpeed.addEventListener('click', () => {
        si = (si + 1) % speeds.length;
        SPEED = speeds[si];
        btnSpeed.querySelector('.ctrl-lbl').textContent = SPEED + 'x';
      });
    }

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { runScenario(currentKey); obs.unobserve(container); }
    }, { threshold: 0.15 });
    obs.observe(container);
  }

  function init() { initHeroChat(); initDemoChat(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
