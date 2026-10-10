import { signOut } from '../lib/auth.js';
import { navigateTo } from '../router.js';
import { renderAvatar } from './avatar.js';
import { getStreakInfo } from '../lib/streak.js';

export function renderNavbar(profile) {
  const isAdmin = profile?.role === 'admin';
  const isTeacher = profile?.role === 'teacher';
  const homeHash = isAdmin ? '#/admin' : (isTeacher ? '#/teacher' : '#/categories');
  const avatarHtml = renderAvatar(profile, 'sm');

  // Initial streak display from cache
  let cachedStreak = 1;
  let cachedFreezes = 4;
  try {
    const raw = localStorage.getItem(`smartprep_streak_${profile?.id || 'guest'}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      cachedStreak = parsed.streak || 1;
      cachedFreezes = typeof parsed.freezes === 'number' ? parsed.freezes : 4;
    }
  } catch (e) {}

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
          <!-- Streak & 4-Day Streak Freeze Display -->
          <div class="streak-pill" id="navbar-streak-pill" title="Daily Streak: ${cachedStreak} Days | ${cachedFreezes}/4 Freezes remaining (miss up to 4 days without breaking streak)">
            <span class="mdi mdi-fire" style="color: #f97316; font-size: 1.1rem;"></span>
            <span id="navbar-streak-count">${cachedStreak}d</span>
            <span style="opacity: 0.4; font-size: 0.75rem;">|</span>
            <span class="mdi mdi-snowflake" style="color: #38bdf8; font-size: 0.95rem;"></span>
            <span id="navbar-freeze-count" style="color: #38bdf8;">${cachedFreezes}/4</span>
          </div>

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

export function bindNavbar(profile) {
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

  // Update streak dynamically
  async function refreshStreakDisplay() {
    try {
      const streakInfo = await getStreakInfo(profile?.id || 'guest');
      const countEl = document.getElementById('navbar-streak-count');
      const freezeEl = document.getElementById('navbar-freeze-count');
      const pill = document.getElementById('navbar-streak-pill');
      if (countEl) countEl.textContent = `${streakInfo.streak || 1}d`;
      if (freezeEl) freezeEl.textContent = `${streakInfo.freezes}/4`;
      if (pill) {
        pill.title = `Daily Streak: ${streakInfo.streak || 1} Days | ${streakInfo.freezes}/4 Freezes remaining (Protected for up to 4 missed days!)`;
      }
    } catch (e) {}
  }

  refreshStreakDisplay();

  window.addEventListener('smartprep-streak-updated', (ev) => {
    const detail = ev.detail;
    if (detail) {
      const countEl = document.getElementById('navbar-streak-count');
      const freezeEl = document.getElementById('navbar-freeze-count');
      if (countEl) countEl.textContent = `${detail.streak || 1}d`;
      if (freezeEl) freezeEl.textContent = `${detail.freezes}/4`;
    }
  });
}
