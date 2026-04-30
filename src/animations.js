/* ═══════════════════════════════════════════════════════
   MEDACCER — animations.js
   GSAP ScrollTrigger layer — stagger, counters, 3D tilt
   Loads after React renders to avoid conflicts.
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Wait for React to finish rendering ─────────────── */
  var MAX_POLLS = 60; // 12 s ceiling
  var polls = 0;

  function domReady() {
    return !!(
      document.querySelector('.hero-grid-layout') &&
      document.querySelector('.pricing-grid') &&
      document.querySelector('#early-access')
    );
  }

  function waitForDom(cb) {
    if (domReady()) {
      cb();
    } else if (++polls < MAX_POLLS) {
      setTimeout(function () { waitForDom(cb); }, 200);
    }
    // Silent failure: CSS animations cover basics without GSAP
  }

  /* ── Main init ──────────────────────────────────────── */
  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    /* ── 1. Pricing cards stagger ─────────────────────── */
    var pricingGrid = document.querySelector('.pricing-grid');
    if (pricingGrid) {
      ScrollTrigger.create({
        trigger: pricingGrid,
        start: 'top 82%',
        once: true,
        onEnter: function () {
          gsap.from(pricingGrid.querySelectorAll('.price-card'), {
            y: 44,
            opacity: 0,
            duration: 0.65,
            stagger: 0.14,
            ease: 'power3.out',
          });
        },
      });
    }

    /* ── 2. "Cómo funciona" steps stagger ─────────────── */
    var flowSection = document.getElementById('flow');
    if (flowSection) {
      var flowGrid = flowSection.querySelector('[style*="repeat(4"]');
      if (flowGrid) {
        ScrollTrigger.create({
          trigger: flowSection,
          start: 'top 78%',
          once: true,
          onEnter: function () {
            gsap.from(Array.from(flowGrid.children), {
              y: 36,
              opacity: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power3.out',
            });
          },
        });
      }
    }

    /* ── 3. Early access perks stagger ───────────────── */
    var earlySection = document.getElementById('early-access');
    if (earlySection) {
      var perks = earlySection.querySelectorAll('.early-perk');
      if (perks.length) {
        ScrollTrigger.create({
          trigger: earlySection,
          start: 'top 78%',
          once: true,
          onEnter: function () {
            gsap.from(perks, {
              x: -28,
              opacity: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power3.out',
            });
          },
        });
      }
    }

    /* ── 4. Early access counter animation ───────────── */
    var counterEl = document.querySelector('.early-counter-num');
    if (counterEl) {
      ScrollTrigger.create({
        trigger: counterEl,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          var obj = { v: 0 };
          gsap.to(obj, {
            v: 12,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function () {
              counterEl.innerHTML =
                Math.round(obj.v) +
                '<span class="early-counter-of">/50</span>';
            },
          });
        },
      });
    }

    /* ── 5. Early access progress bar ────────────────── */
    var progressFill = document.querySelector('.early-progress-fill');
    if (progressFill) {
      progressFill.style.width = '0%';
      ScrollTrigger.create({
        trigger: progressFill,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.to(progressFill, {
            width: '24%',
            duration: 1.6,
            ease: 'power2.out',
          });
        },
      });
    }

    /* ── 6. Module sidebar items stagger ─────────────── */
    var modulesEl = document.querySelector('.modules-interactive');
    if (modulesEl) {
      ScrollTrigger.create({
        trigger: modulesEl,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.from(modulesEl.querySelectorAll('.mod-item'), {
            x: -20,
            opacity: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power2.out',
          });
        },
      });
    }

    /* ── 7. FAQ items stagger ────────────────────────── */
    var faqList = document.querySelector('.faq-list');
    if (faqList) {
      ScrollTrigger.create({
        trigger: faqList,
        start: 'top 82%',
        once: true,
        onEnter: function () {
          gsap.from(faqList.querySelectorAll('.faq-item'), {
            y: 16,
            opacity: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out',
          });
        },
      });
    }

    /* ── 8. ROI headline flash on slider change ───────── */
    var roiHeadline = document.querySelector('.roi-headline-num');
    if (roiHeadline && typeof MutationObserver !== 'undefined') {
      var tween = null;
      new MutationObserver(function () {
        if (tween) tween.kill();
        tween = gsap.fromTo(
          roiHeadline,
          { scale: 1.04 },
          {
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
            clearProps: 'scale',
          }
        );
      }).observe(roiHeadline, { childList: true, subtree: true });
    }

    /* ── 9. Section title reveals ─────────────────────── */
    document.querySelectorAll('.section, .section-dark').forEach(function (sec) {
      var els = sec.querySelectorAll(
        ':scope > .section-label, :scope > .section-title, :scope > .section-sub, :scope > h2'
      );
      if (!els.length) return;
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 84%',
        once: true,
        onEnter: function () {
          gsap.from(els, {
            y: 24,
            opacity: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
      });
    });

    /* ── 10. Spec card 3D tilt on hover ───────────────── */
    document.querySelectorAll('.spec-card-big').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var mx = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        var my = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
        gsap.to(card, {
          rotateY: mx,
          rotateX: my,
          duration: 0.25,
          ease: 'power1.out',
          transformPerspective: 900,
          transformOrigin: 'center center',
          overwrite: 'auto',
        });
      });
      card.addEventListener('mouseleave', function () {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    });

    /* ── 11. Integration cards stagger ───────────────── */
    var intGrid = document.querySelector('.integrations-simple-grid, .integrations-grid');
    if (intGrid) {
      ScrollTrigger.create({
        trigger: intGrid,
        start: 'top 82%',
        once: true,
        onEnter: function () {
          gsap.from(intGrid.querySelectorAll('.integration-card, .integration-simple-card'), {
            y: 28,
            opacity: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power2.out',
          });
        },
      });
    }

    /* ── 12. CTA final block reveal ──────────────────── */
    var ctaFinal = document.querySelector('.cta-final');
    if (ctaFinal) {
      ScrollTrigger.create({
        trigger: ctaFinal,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.from(ctaFinal, {
            y: 28,
            opacity: 0,
            duration: 0.75,
            ease: 'power3.out',
          });
        },
      });
    }
  }

  /* ── Bootstrap ──────────────────────────────────────── */
  window.addEventListener('load', function () {
    waitForDom(init);
  });
})();
