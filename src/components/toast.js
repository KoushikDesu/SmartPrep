/**
 * SmartPrep — Toast Notification Utility
 * Provides non-blocking notifications that auto-dismiss smoothly in 1.9s.
 */

export function showToast(message, type = 'info', duration = 1900) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.transition = 'all 200ms ease';
  
  let icon = 'information';
  if (type === 'success') icon = 'check-circle';
  if (type === 'error') icon = 'alert-circle';
  if (type === 'warning') icon = 'alert';

  toast.innerHTML = `
    <span class="mdi mdi-${icon} toast-icon" style="font-size: 1.25rem;"></span>
    <span class="toast-message" style="flex: 1;">${message}</span>
    <button class="btn-icon toast-close" style="padding: 2px; margin-left: 8px;"><span class="mdi mdi-close"></span></button>
  `;

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  let isRemoved = false;
  const removeToast = () => {
    if (isRemoved) return;
    isRemoved = true;
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(80px)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 200);
  };

  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', removeToast);
  }

  // Guaranteed auto-dismiss after exactly duration (default: 1.9 seconds)
  if (duration > 0) {
    setTimeout(removeToast, duration);
  }
}
