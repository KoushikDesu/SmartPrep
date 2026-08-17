import { signOut } from '../lib/auth.js';
import { navigateTo } from '../router.js';
import { renderAvatar } from './avatar.js';

export function renderNavbar(profile) {
  const isAdmin = profile?.role === 'admin';
  const isTeacher = profile?.role === 'teacher';
  const homeHash = isAdmin ? '#/admin' : (isTeacher ? '#/teacher' : '#/categories');
  const avatarHtml = renderAvatar(profile, 'sm');

  return `
    <nav class="navbar">
      <div class="navbar-inner">
        <div class="navbar-left">
          <button class="btn-icon navbar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar">
            <span class="mdi mdi-menu"></span>
          </button>
          <a href="${homeHash}" class="navbar-logo" id="navbar-logo-btn" title="SmartPrep Home">
            <span class="mdi mdi-school-outline"></span>
            <span class="logo-text">SmartPrep</span>
          </a>
        </div>
        <div class="navbar-actions">
          <button class="btn-icon" id="theme-toggle" aria-label="Toggle theme" title="Toggle theme">
            <span class="mdi mdi-theme-light-dark"></span>
          </button>
          <div class="dropdown" id="user-dropdown">
            <button class="navbar-user" id="user-dropdown-toggle" aria-label="User Profile Menu">
              ${avatarHtml}
              <span class="navbar-username">${profile?.full_name || profile?.username || 'Student'}</span>
              <span class="mdi mdi-chevron-down dropdown-arrow"></span>
            </button>
            <div class="dropdown-menu" id="user-dropdown-menu">
              <a class="dropdown-item" href="#/profile"><span class="mdi mdi-account-circle-outline"></span> My Profile</a>
              <a class="dropdown-item" href="#/categories"><span class="mdi mdi-book-open-page-variant-outline"></span> Practice Categories</a>
              ${isAdmin ? '<a class="dropdown-item" href="#/admin"><span class="mdi mdi-shield-account-outline"></span> Admin Overview</a>' : ''}
              ${(isAdmin || isTeacher) ? '<a class="dropdown-item" href="#/teacher"><span class="mdi mdi-school-outline"></span> Teacher Studio</a>' : ''}
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" id="logout-btn" style="cursor: pointer; color: var(--color-error) !important;"><span class="mdi mdi-logout"></span> Sign Out</a>
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

  const dropdownToggle = document.getElementById('user-dropdown-toggle');
  const dropdownMenu = document.getElementById('user-dropdown-menu');

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      dropdownMenu.classList.remove('show');
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      await signOut();
      navigateTo('/');
    });
  }
}
