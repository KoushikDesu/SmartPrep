import { signOut } from '../lib/auth.js';
import { navigateTo } from '../router.js';

export function renderNavbar(profile) {
  const initials = profile?.full_name 
    ? profile.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : (profile?.username ? profile.username.substring(0, 2).toUpperCase() : 'U');
    
  const isAdmin = profile?.role === 'admin';
  const isTeacher = profile?.role === 'teacher';

  const homeHash = isAdmin ? '#/admin' : (isTeacher ? '#/teacher' : '#/categories');

  return `
    <nav class="navbar">
      <div class="navbar-inner">
        <div class="navbar-left">
          <button class="btn-icon navbar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar">
            <i class="mdi mdi-menu"></i>
          </button>
          <a href="${homeHash}" class="navbar-logo" id="navbar-logo-btn" title="SmartPrep Home">
            <span class="mdi mdi-school-outline"></span>
            <span class="logo-text">SmartPrep</span>
          </a>
        </div>
        <div class="navbar-actions">
          <button class="btn-icon" id="theme-toggle" aria-label="Toggle theme" title="Toggle theme">
            <i class="mdi mdi-theme-light-dark"></i>
          </button>
          <button class="btn-icon notification-bell" id="notification-bell" aria-label="Notifications" title="Notifications">
            <i class="mdi mdi-bell-outline"></i>
            <span class="notification-badge" id="notif-badge" style="display:none">0</span>
          </button>
          <div class="dropdown" id="user-dropdown">
            <button class="navbar-user" id="user-dropdown-toggle" aria-label="User Profile Menu">
              <div class="avatar avatar-sm">${initials}</div>
              <span class="navbar-username">${profile?.full_name || profile?.username || 'Student'}</span>
              <i class="mdi mdi-chevron-down dropdown-arrow"></i>
            </button>
            <div class="dropdown-menu" id="user-dropdown-menu">
              <a class="dropdown-item" href="#/profile"><i class="mdi mdi-account-circle-outline"></i> My Profile</a>
              <a class="dropdown-item" href="#/categories"><i class="mdi mdi-book-open-page-variant-outline"></i> Practice Categories</a>
              ${isAdmin ? '<a class="dropdown-item" href="#/admin"><i class="mdi mdi-shield-account-outline"></i> Admin Panel</a>' : ''}
              ${(isAdmin || isTeacher) ? '<a class="dropdown-item" href="#/teacher"><i class="mdi mdi-school-outline"></i> Teacher Panel</a>' : ''}
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" id="logout-btn" style="cursor: pointer; color: var(--color-error) !important;"><i class="mdi mdi-logout"></i> Sign Out</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;
}

export function bindNavbar() {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('toggle-sidebar'));
    });
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('toggle-theme'));
    });
  }

  const userToggle = document.getElementById('user-dropdown-toggle');
  const userMenu = document.getElementById('user-dropdown-menu');
  if (userToggle && userMenu) {
    userToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!userToggle.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.classList.remove('show');
      }
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await signOut();
      navigateTo('/');
    });
  }

  const notificationBell = document.getElementById('notification-bell');
  if (notificationBell) {
    notificationBell.addEventListener('click', () => {
      navigateTo('/profile');
    });
  }
}
