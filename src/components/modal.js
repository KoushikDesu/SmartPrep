/**
 * SmartPrep — Reusable Modal Dialog
 * Flexible modal supporting both object config and positional params with custom action buttons.
 */

export function showModal(titleOrConfig, bodyContent, buttonsArray) {
  let title = 'Notification';
  let body = '';
  let buttons = [];

  if (typeof titleOrConfig === 'object') {
    title = titleOrConfig.title || 'Notification';
    body = titleOrConfig.body || '';
    const confirmText = titleOrConfig.confirmText || 'Confirm';
    const cancelText = titleOrConfig.cancelText || 'Cancel';
    const onConfirm = titleOrConfig.onConfirm;
    const onCancel = titleOrConfig.onCancel;
    const isDanger = titleOrConfig.isDanger || false;

    buttons = [
      { label: cancelText, class: 'btn-secondary', onClick: onCancel },
      { label: confirmText, class: isDanger ? 'btn-danger' : 'btn-primary', onClick: onConfirm }
    ];
  } else {
    title = titleOrConfig || 'Notification';
    body = bodyContent || '';
    if (Array.isArray(buttonsArray) && buttonsArray.length > 0) {
      buttons = buttonsArray.map(b => ({
        label: b.label || 'OK',
        class: b.class ? (b.class.includes('btn') ? b.class : `btn ${b.class}`) : 'btn-primary',
        onClick: b.onClick
      }));
    } else {
      buttons = [
        { label: 'Close', class: 'btn-secondary', onClick: null }
      ];
    }
  }

  // Remove existing modals if any
  const existing = document.querySelectorAll('.modal-overlay');
  existing.forEach(m => m.remove());

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const buttonsHtml = buttons.map((b, i) => `
    <button type="button" class="btn ${b.class}" data-btn-index="${i}">${b.label}</button>
  `).join('');

  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="btn-icon modal-close" aria-label="Close modal">
          <span class="mdi mdi-close"></span>
        </button>
      </div>
      <div class="modal-body">
        ${body}
      </div>
      <div class="modal-footer">
        ${buttonsHtml}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const close = () => {
    overlay.classList.add('removing');
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 150);
  };

  // Bind close icon
  const closeBtn = overlay.querySelector('.modal-close');
  if (closeBtn) closeBtn.addEventListener('click', close);

  // Bind overlay click outside
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // Bind action buttons
  const renderedButtons = overlay.querySelectorAll('[data-btn-index]');
  renderedButtons.forEach(btnEl => {
    const idx = parseInt(btnEl.dataset.btnIndex, 10);
    const btnConfig = buttons[idx];
    btnEl.addEventListener('click', async () => {
      if (btnConfig && typeof btnConfig.onClick === 'function') {
        const result = await btnConfig.onClick();
        if (result !== false) close();
      } else {
        close();
      }
    });
  });

  return close;
}
