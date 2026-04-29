/* ================== TWEAKS PANEL ================== */
(function () {
  const panel = document.getElementById('tweaks-panel');
  if (!panel) return;
  const closeBtn = document.getElementById('tweaks-close');
  const root = document.documentElement;

  function save() { localStorage.setItem('medaccer-tweaks', JSON.stringify(window.__tweaks)); }

  function apply() {
    root.dataset.accent = window.__tweaks.accent;
    root.dataset.intensity = window.__tweaks.intensity;
    root.dataset.typography = window.__tweaks.typography;
    if (!window.__tweaks.grain) root.dataset.grain = 'off'; else delete root.dataset.grain;
    refreshActive();
  }

  function refreshActive() {
    panel.querySelectorAll('[data-key]').forEach(group => {
      const key = group.dataset.key;
      const val = window.__tweaks[key];
      const normalized = (key === 'grain') ? (val ? 'on' : 'off') : val;
      group.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.val === String(normalized)));
    });
  }

  panel.addEventListener('click', e => {
    const btn = e.target.closest('button[data-val]'); if (!btn) return;
    const group = btn.closest('[data-key]'); if (!group) return;
    const key = group.dataset.key;
    let val = btn.dataset.val;
    if (key === 'grain') val = (val === 'on');
    window.__tweaks[key] = val;
    save(); apply();
    window.parent.postMessage({type:'__edit_mode_set_keys', edits: { [key]: val }}, '*');
  });

  closeBtn?.addEventListener('click', () => {
    panel.hidden = true;
    window.parent.postMessage({type:'__edit_mode_close'}, '*');
  });

  // Edit-mode host protocol
  window.addEventListener('message', (ev) => {
    const d = ev.data; if (!d || typeof d !== 'object') return;
    if (d.type === '__activate_edit_mode') panel.hidden = false;
    if (d.type === '__deactivate_edit_mode') panel.hidden = true;
  });
  window.parent.postMessage({type: '__edit_mode_available'}, '*');

  apply();
})();
