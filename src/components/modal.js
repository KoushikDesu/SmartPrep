export function showModal({ title, body, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, isDanger = false }) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const confirmBtnClass = isDanger ? 'btn-danger' : 'btn-primary';

  overlay.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="btn-icon modal-close" aria-label="Close modal">
          <i class="mdi mdi-close"></i>
        </button>
      </div>
      <div class="modal-body">
        ${body}
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline modal-cancel">${cancelText}</button>
        <button class="btn ${confirmBtnClass} modal-confirm">${confirmText}</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Trigger animation
  requestAnimationFrame(() => {
    overlay.classList.add('show');
    overlay.querySelector('.modal-card').classList.add('scale-in');
  });

  const close = () => {
    overlay.classList.remove('show');
    overlay.querySelector('.modal-card').classList.remove('scale-in');
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 200); // match transition duration
  };

  const closeBtn = overlay.querySelector('.modal-close');
  const cancelBtn = overlay.querySelector('.modal-cancel');
  const confirmBtn = overlay.querySelector('.modal-confirm');

  closeBtn.addEventListener('click', () => {
    if (onCancel) onCancel();
    close();
  });

  cancelBtn.addEventListener('click', () => {
    if (onCancel) onCancel();
    close();
  });

  confirmBtn.addEventListener('click', () => {
    if (onConfirm) onConfirm();
    close();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      if (onCancel) onCancel();
      close();
    }
  });

  return close;
}
