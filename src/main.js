/**
 * SmartPrep — Main Application Entry Point
 * Handles SPA rendering, auth lifecycle, and hash routing.
 */

import { supabase } from './lib/supabase.js';
import { getCurrentProfile } from './lib/auth.js';
import { renderNavbar, bindNavbar } from './components/navbar.js';
import { renderSidebar } from './components/sidebar.js';
import { initChatbot } from './components/ai-chatbot.js';
import { navigateTo } from './router.js';

// Page imports
import { renderLanding } from './pages/landing.js';
import { renderLogin, bindLogin } from './pages/login.js';
import { renderSignup, bindSignup } from './pages/signup.js';
import { renderCategories } from './pages/categories.js';
import { renderTopics } from './pages/topics.js';
import { renderPractice, bindPractice } from './pages/practice.js';
import { renderProfile } from './pages/profile.js';
import { renderAdminDashboard } from './pages/admin/dashboard.js';
import { renderAdminUsers, bindAdminUsers } from './pages/admin/users.js';
import { renderAdminTeachers, bindAdminTeachers } from './pages/admin/teachers.js';
import { renderTeacherDashboard } from './pages/teacher/dashboard.js';
import { renderTeacherQuestions, bindTeacherQuestions } from './pages/teacher/questions.js';
import { renderTeacherStudents } from './pages/teacher/students.js';
import { renderTeacherNotifications, bindTeacherNotifs } from './pages/teacher/notifications.js';

// Global App State
export const appState = {
  user: null,
  profile: null,
  sidebarOpen: false, // For mobile drawer
  sidebarCollapsed: false, // For desktop layout collapse
  theme: localStorage.getItem('smartprep-theme') || 'light',
};

export function updateAppState(updates) {
  Object.assign(appState, updates);
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', appState.theme);
  localStorage.setItem('smartprep-theme', appState.theme);
}

export function toggleTheme() {
  appState.theme = appState.theme === 'light' ? 'dark' : 'light';
  applyTheme();
}

export function toggleSidebar() {
  const isMobile = window.innerWidth <= 1024;
  const layout = document.querySelector('.app-layout');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (isMobile) {
    appState.sidebarOpen = !appState.sidebarOpen;
    if (sidebar) sidebar.classList.toggle('open', appState.sidebarOpen);
    if (overlay) overlay.classList.toggle('visible', appState.sidebarOpen);
  } else {
    appState.sidebarCollapsed = !appState.sidebarCollapsed;
    if (layout) layout.classList.toggle('sidebar-collapsed', appState.sidebarCollapsed);
    if (sidebar) sidebar.classList.toggle('collapsed', appState.sidebarCollapsed);
  }
}

document.addEventListener('toggle-sidebar', toggleSidebar);
document.addEventListener('toggle-theme', toggleTheme);

// Auto-close mobile sidebar on navigation link click
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 1024 && e.target.closest('.sidebar-link')) {
    appState.sidebarOpen = false;
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
  }
});

function isPublicRoute(path) {
  return path === '/' || path === '/home' || path === '/login' || path === '/signup';
}

/**
 * Main render function triggered on hash changes
 */
export async function renderApp() {
  const rawHash = window.location.hash || '#/';
  const path = rawHash.replace('#', '') || '/';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const segments = cleanPath.split('/').filter(Boolean);

  const app = document.getElementById('app');
  if (!app) return;

  // ─── 1. Public Pages (Landing, Login, Signup) ─────────────────
  if (cleanPath === '/' || cleanPath === '/home') {
    app.innerHTML = renderLanding();
    bindLandingEvents();
    return;
  }

  if (cleanPath === '/login') {
    if (appState.user) {
      navigateToRoleHome();
      return;
    }
    app.innerHTML = renderLogin();
    bindLogin();
    return;
  }

  if (cleanPath === '/signup') {
    if (appState.user) {
      navigateToRoleHome();
      return;
    }
    app.innerHTML = renderSignup();
    bindSignup();
    return;
  }

  // ─── 2. Protected App Shell ──────────────────────────────────
  const showSidebar = !isPublicRoute(cleanPath);
  const layoutClass = showSidebar 
    ? (appState.sidebarCollapsed ? 'sidebar-collapsed' : '') 
    : 'no-sidebar';

  app.innerHTML = `
    ${renderNavbar(appState.profile)}
    <div class="app-layout ${layoutClass}">
      ${showSidebar ? `
        <div class="sidebar-overlay" id="sidebar-overlay"></div>
        ${renderSidebar(appState.profile)}
      ` : ''}
      <main class="main-content" id="page-content">
        <div class="page-loader" id="page-loader" style="text-align: center; padding: 4rem;">
          <i class="mdi mdi-loading mdi-spin" style="font-size: 2.5rem; color: var(--color-primary);"></i>
        </div>
      </main>
    </div>
  `;

  bindNavbar();

  // If sidebar is collapsed on desktop, ensure sidebar element reflects it
  const sidebarEl = document.querySelector('.sidebar');
  if (sidebarEl && appState.sidebarCollapsed && window.innerWidth > 1024) {
    sidebarEl.classList.add('collapsed');
  }

  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', toggleSidebar);
  }

  // Initialize AI Floating Assistant
  initChatbot();

  // ─── 3. Route to Page Content ─────────────────────────────────
  const content = document.getElementById('page-content');
  if (!content) return;

  try {
    if (cleanPath === '/categories') {
      content.innerHTML = await renderCategories();
      return;
    }

    if (segments[0] === 'category' && segments[1]) {
      content.innerHTML = await renderTopics(segments[1]);
      return;
    }

    if (segments[0] === 'practice' && segments[1]) {
      content.innerHTML = await renderPractice(segments[1]);
      bindPractice();
      return;
    }

    if (cleanPath === '/profile') {
      content.innerHTML = await renderProfile();
      bindProfileEvents();
      return;
    }

    // Admin routes
    if (cleanPath === '/admin') {
      content.innerHTML = await renderAdminDashboard();
      return;
    }
    if (cleanPath === '/admin/users') {
      content.innerHTML = await renderAdminUsers();
      bindAdminUsers();
      return;
    }
    if (cleanPath === '/admin/teachers') {
      content.innerHTML = await renderAdminTeachers();
      bindAdminTeachers();
      return;
    }

    // Teacher routes
    if (cleanPath === '/teacher') {
      content.innerHTML = await renderTeacherDashboard();
      return;
    }
    if (cleanPath === '/teacher/questions') {
      content.innerHTML = await renderTeacherQuestions();
      bindTeacherQuestions();
      return;
    }
    if (cleanPath === '/teacher/students') {
      content.innerHTML = await renderTeacherStudents();
      return;
    }
    if (cleanPath === '/teacher/notifications') {
      content.innerHTML = await renderTeacherNotifications();
      bindTeacherNotifs();
      return;
    }

    // 404 Fallback
    content.innerHTML = `
      <div class="empty-state" style="margin-top: 60px;">
        <div class="empty-state-icon"><i class="mdi mdi-compass-off-outline"></i></div>
        <h2>Page Not Found</h2>
        <p style="margin-top: 8px;">The practice module you are looking for does not exist.</p>
        <a href="#/categories" class="btn btn-primary" style="margin-top: 20px;">Browse Categories</a>
      </div>
    `;
  } catch (error) {
    console.error('Render error:', error);
    content.innerHTML = `
      <div class="empty-state" style="margin-top: 60px;">
        <div class="empty-state-icon"><i class="mdi mdi-alert-circle-outline"></i></div>
        <h2>Something went wrong</h2>
        <p style="margin-top: 8px;">${error.message || 'An error occurred.'}</p>
        <a href="#/categories" class="btn btn-primary" style="margin-top: 20px;">Return to Categories</a>
      </div>
    `;
  }
}

function navigateToRoleHome() {
  const role = appState.profile?.role;
  if (role === 'admin') navigateTo('/admin');
  else if (role === 'teacher') navigateTo('/teacher');
  else navigateTo('/categories');
}

function bindLandingEvents() {
  const getStartedBtn = document.getElementById('get-started-btn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(appState.user ? '/categories' : '/signup');
    });
  }

  const loginBtn = document.getElementById('landing-login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('/login');
    });
  }

  const signupBtn = document.getElementById('landing-signup-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('/signup');
    });
  }
}

function bindProfileEvents() {
  const changePasswordForm = document.getElementById('change-password-form');
  if (changePasswordForm) {
    changePasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newPass = document.getElementById('new-password')?.value;
      const confirmPass = document.getElementById('confirm-new-password')?.value;
      const errorEl = document.getElementById('password-error');
      
      if (newPass !== confirmPass) {
        if (errorEl) errorEl.textContent = 'Passwords do not match';
        return;
      }
      if (newPass.length < 6) {
        if (errorEl) errorEl.textContent = 'Password must be at least 6 characters';
        return;
      }
      
      try {
        const { changePassword } = await import('./lib/auth.js');
        const { error } = await changePassword(newPass);
        if (error) throw error;
        const { showToast } = await import('./components/toast.js');
        showToast('Password changed successfully!', 'success');
        changePasswordForm.reset();
      } catch (err) {
        if (errorEl) errorEl.textContent = err.message || 'Failed to change password';
      }
    });
  }
}

async function init() {
  applyTheme();

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      appState.user = session.user;
      try {
        appState.profile = await getCurrentProfile();
      } catch (e) {
        console.warn('Profile fetch error:', e);
      }
    }
  } catch (e) {
    console.warn('Session init error:', e);
  }

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      appState.user = session.user;
      try {
        appState.profile = await getCurrentProfile();
      } catch (e) {
        console.warn('Profile fetch failed:', e);
      }
      navigateToRoleHome();
    } else if (event === 'SIGNED_OUT') {
      appState.user = null;
      appState.profile = null;
      navigateTo('/');
    }
  });

  window.addEventListener('hashchange', () => {
    renderApp();
  });

  await renderApp();
}

init().catch(console.error);
