/* =======================================================
   EFFECTS — neural canvas, cursor, phone parallax, counters
======================================================= */
(function () {

  /* ========== CURSOR ========== */
  function initCursor() {
    const glow = document.getElementById('cursor-glow');
    const dot  = document.getElementById('cursor-dot');
    if (!glow) return;
    // Skip on touch devices & narrow viewports — custom cursor breaks taps on mobile
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const isNarrow = window.innerWidth < 1024;
    if (isTouch || isNarrow) {
      if (glow) glow.style.display = 'none';
      if (dot)  dot.style.display  = 'none';
      return;
    }
    let x=0,y=0,tx=0,ty=0;
    window.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; });
    function loop() {
      x += (tx - x) * 0.1; y += (ty - y) * 0.1;
      glow.style.left = tx + 'px'; glow.style.top = ty + 'px';
      dot.style.left = x + 'px';   dot.style.top = y + 'px';
      requestAnimationFrame(loop);
    } loop();
  }

  /* ========== SCROLL PROGRESS ========== */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.transform = `scaleX(${p})`;
      nav.classList.toggle('scrolled', h.scrollTop > 30);
    });
  }

  /* ========== NEURAL NETWORK CANVAS ========== */
  function initNeural() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, points = [], mouse = { x: -9999, y: -9999 };

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      // rebuild points
      const count = Math.min(80, Math.max(40, Math.floor(w * h / 14000)));
      points = [];
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - .5) * 0.25, vy: (Math.random() - .5) * 0.25,
          r: 1 + Math.random() * 1.4,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }
    resize(); window.addEventListener('resize', resize);

    window.addEventListener('pointermove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    });

    function tick() {
      ctx.clearRect(0, 0, w, h);
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#06B6D4';

      // update + draw points
      points.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.pulse += 0.02;

        // mouse attract
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 180) {
          p.x += dx * 0.002; p.y += dy * 0.002;
        }

        // draw node with glow pulse
        const alpha = 0.4 + 0.3 * Math.sin(p.pulse);
        ctx.fillStyle = `rgba(6,182,212,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 140) {
            const alpha = (1 - d/140) * 0.22;
            ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // mouse connections
      points.forEach(p => {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 200) {
          const alpha = (1 - d/200) * 0.55;
          ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ========== PHONE PARALLAX ========== */
  function initParallax() {
    const stage = document.getElementById('hero-stage');
    const scene = document.getElementById('stage-scene');
    const phone = document.getElementById('phone');
    if (!stage || !scene) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    stage.addEventListener('pointermove', e => {
      const rect = stage.getBoundingClientRect();
      tx = (e.clientX - rect.left - rect.width/2) / rect.width;
      ty = (e.clientY - rect.top - rect.height/2) / rect.height;
    });
    stage.addEventListener('pointerleave', () => { tx = 0; ty = 0; });

    function loop() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      if (phone) phone.style.transform = `rotateY(${-12 + cx*18}deg) rotateX(${6 - cy*12}deg)`;
      // parallax floating objects
      document.querySelectorAll('.float-obj').forEach((el, i) => {
        const factor = 1 + (i%3)*0.3;
        el.style.setProperty('--px', `${cx * 20 * factor}px`);
        el.style.setProperty('--py', `${cy * 20 * factor}px`);
      });
      requestAnimationFrame(loop);
    } loop();
  }

  /* ========== COUNTERS ========== */
  function initCounters() {
    const nums = document.querySelectorAll('[data-count]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        let start = 0;
        const dur = 1800;
        const t0 = performance.now();
        function step(t) {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = Math.floor(eased * target);
          el.textContent = prefix + val + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = prefix + target + suffix;
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });
    nums.forEach(n => obs.observe(n));
  }

  /* ========== BENTO CARD GLOW ON HOVER ========== */
  function initCardGlow() {
    document.querySelectorAll('.bento-card, .prod-card, .plan').forEach(card => {
      card.addEventListener('pointermove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  }

  /* ========== REVEAL ON SCROLL ========== */
  function initReveal() {
    const els = document.querySelectorAll('.bento-card, .prod-card, .plan, .comp-fact, .rda-stage, .rda-code');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity .8s cubic-bezier(.2,.8,.2,1) ${i*30}ms, transform .8s cubic-bezier(.2,.8,.2,1) ${i*30}ms`;
      obs.observe(el);
    });
  }

  function init() {
    initCursor();
    initScrollProgress();
    initNeural();
    initParallax();
    initCounters();
    initCardGlow();
    initReveal();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
