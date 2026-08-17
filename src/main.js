/**
 * SmartPrep — Main Application Entry Point
 * Initializes the SPA, auth listener, and renders the app shell.
 */

import { supabase } from './lib/supabase.js';
import { getCurrentProfile, signOut } from './lib/auth.js';
import { renderNavbar, bindNavbar } from './components/navbar.js';
import { renderSidebar } from './components/sidebar.js';
import { initChatbot } from './components/ai-chatbot.js';
import { navigateTo } from './router.js';

// ─── Page imports ────────────────────────────────────
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

// ─── Global App State ────────────────────────────────
export const appState = {
  user: null,
  profile: null,
  sidebarOpen: false,
  theme: localStorage.getItem('smartprep-theme') || 'light',
};

/** Update global app state */
export function updateAppState(updates) {
  Object.assign(appState, updates);
}

/** Apply theme to document */
function applyTheme() {
  document.documentElement.setAttribute('data-theme', appState.theme);
  localStorage.setItem('smartprep-theme', appState.theme);
}

/** Toggle theme */
export function toggleTheme() {
  appState.theme = appState.theme === 'light' ? 'dark' : 'light';
  applyTheme();
}

/** Toggle sidebar */
export function toggleSidebar() {
  appState.sidebarOpen = !appState.sidebarOpen;
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (sidebar) sidebar.classList.toggle('open', appState.sidebarOpen);
  if (overlay) overlay.classList.toggle('visible', appState.sidebarOpen);
}

// Listen for custom events from components (avoids circular imports)
document.addEventListener('toggle-sidebar', toggleSidebar);
document.addEventListener('toggle-theme', toggleTheme);

/** Check if route needs sidebar */
function needsSidebar(hash) {
  const noSidebar = ['', '#/', '#/home', '#/login', '#/signup'];
  return !noSidebar.includes(hash.split('?')[0]);
}

/** Check if route needs chatbot */
function needsChatbot(hash) {
  const noChatbot = ['', '#/', '#/home', '#/login', '#/signup'];
  return !noChatbot.includes(hash.split('?')[0]) && appState.user;
}

// ─── Render the full app ─────────────────────────────
export async function renderApp() {
  const app = document.getElementById('app');
  const hash = window.location.hash || '#/';
  const showSidebar = needsSidebar(hash) && appState.user;
  const showChatbot = needsChatbot(hash);

  // Build app shell
  app.innerHTML = `
    ${appState.user ? renderNavbar(appState.profile) : ''}
    <div class="app-layout ${showSidebar ? '' : 'no-sidebar'}">
      ${showSidebar ? `
        <div class="sidebar-overlay" id="sidebar-overlay"></div>
        ${renderSidebar(appState.profile)}
      ` : ''}
      <main class="main-content" id="page-content">
        <div class="page-loader" id="page-loader">
          <div class="spinner"><i class="mdi mdi-loading mdi-spin mdi-36px"></i></div>
        </div>
      </main>
    </div>
  `;

  // Bind navbar events
  if (appState.user) {
    bindNavbar();
  }

  // Bind sidebar overlay click
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', toggleSidebar);
  }

  // Route to the correct page
  await routePage(hash);

  // Init chatbot if needed
  if (showChatbot) {
    initChatbot();
  }
}

// ─── Route to page based on hash ────────────────────
async function routePage(hash) {
  const content = document.getElementById('page-content');
  if (!content) return;

  const path = hash.replace('#', '') || '/';
  const segments = path.split('/').filter(Boolean);

  try {
    // ── Public routes ──
    if (path === '/' || path === '/home') {
      // Landing page replaces entire app (no navbar/sidebar)
      const app = document.getElementById('app');
      app.innerHTML = renderLanding();
      bindLandingEvents();
      return;
    }

    if (path === '/login') {
      if (appState.user) { navigateTo('/categories'); return; }
      const app = document.getElementById('app');
      app.innerHTML = renderLogin();
      bindLogin();
      return;
    }

    if (path === '/signup') {
      if (appState.user) { navigateTo('/categories'); return; }
      const app = document.getElementById('app');
      app.innerHTML = renderSignup();
      bindSignup();
      return;
    }

    // ── Protected routes ──
    if (!appState.user) {
      navigateTo('/login');
      return;
    }

    if (path === '/categories') {
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

    if (path === '/profile') {
      content.innerHTML = await renderProfile();
      bindProfileEvents();
      return;
    }

    // ── Admin routes ──
    if (path === '/admin' && appState.profile?.role === 'admin') {
      content.innerHTML = await renderAdminDashboard();
      return;
    }
    if (path === '/admin/users' && appState.profile?.role === 'admin') {
      content.innerHTML = await renderAdminUsers();
      bindAdminUsers();
      return;
    }
    if (path === '/admin/teachers' && appState.profile?.role === 'admin') {
      content.innerHTML = await renderAdminTeachers();
      bindAdminTeachers();
      return;
    }

    // ── Teacher routes ──
    const isTeacherOrAdmin = ['teacher', 'admin'].includes(appState.profile?.role);
    if (path === '/teacher' && isTeacherOrAdmin) {
      content.innerHTML = await renderTeacherDashboard();
      return;
    }
    if (path === '/teacher/questions' && isTeacherOrAdmin) {
      content.innerHTML = await renderTeacherQuestions();
      bindTeacherQuestions();
      return;
    }
    if (path === '/teacher/students' && isTeacherOrAdmin) {
      content.innerHTML = await renderTeacherStudents();
      return;
    }
    if (path === '/teacher/notifications' && isTeacherOrAdmin) {
      content.innerHTML = await renderTeacherNotifications();
      bindTeacherNotifs();
      return;
    }

    // ── 404 ──
    content.innerHTML = `
      <div class="empty-state" style="margin-top: 120px;">
        <div class="empty-state-icon"><i class="mdi mdi-alert-circle-outline mdi-48px"></i></div>
        <h2>Page Not Found</h2>
        <p style="margin-top:8px; color: var(--color-text-secondary);">The page you're looking for doesn't exist.</p>
        <a href="#/categories" class="btn btn-primary" style="margin-top: 16px;">Go to Categories</a>
      </div>
    `;
  } catch (error) {
    console.error('Route error:', error);
    content.innerHTML = `
      <div class="empty-state" style="margin-top: 120px;">
        <div class="empty-state-icon"><i class="mdi mdi-alert-outline mdi-48px"></i></div>
        <h2>Something went wrong</h2>
        <p style="margin-top:8px; color: var(--color-text-secondary);">${error.message || 'An unexpected error occurred.'}</p>
        <a href="#/categories" class="btn btn-primary" style="margin-top: 16px;">Go Back</a>
      </div>
    `;
  }
}

// ─── Landing page event bindings ─────────────────────
function bindLandingEvents() {
  const getStartedBtn = document.getElementById('get-started-btn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      navigateTo(appState.user ? '/categories' : '/signup');
    });
  }
  const loginBtn = document.getElementById('landing-login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => navigateTo('/login'));
  }
  const signupBtn = document.getElementById('landing-signup-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => navigateTo('/signup'));
  }
}

// ─── Profile page event bindings ─────────────────────
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

// ─── Initialize ──────────────────────────────────────
async function init() {
  // Apply saved theme
  applyTheme();

  // Check for existing session
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      appState.user = session.user;
      try {
        appState.profile = await getCurrentProfile();
      } catch (e) {
        console.warn('Could not fetch profile:', e);
      }
    }
  } catch (e) {
    console.warn('Session check failed:', e);
  }

  // Listen for auth state changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      appState.user = session.user;
      try {
        appState.profile = await getCurrentProfile();
      } catch (e) {
        console.warn('Profile fetch failed:', e);
      }
      // Redirect based on role
      const role = appState.profile?.role;
      if (role === 'admin') navigateTo('/admin');
      else if (role === 'teacher') navigateTo('/teacher');
      else navigateTo('/categories');
    } else if (event === 'SIGNED_OUT') {
      appState.user = null;
      appState.profile = null;
      navigateTo('/');
    }
  });

  // Listen for hash changes
  window.addEventListener('hashchange', () => renderApp());

  // Initial render
  await renderApp();
}

// Boot
init().catch(console.error);
