import { signIn } from '../lib/auth.js';
import { showToast } from '../components/toast.js';

export function renderLogin() {
  return `
    <div class="auth-page">
      <a href="#/" class="back-bubble-btn" title="Back to Home" aria-label="Back to Home">
        <span class="mdi mdi-arrow-left"></span>
      </a>

      <div class="auth-card">
        <div class="auth-header text-center">
          <a href="#/" class="logo-link">
            <span class="mdi mdi-school-outline"></span>
            <h2>SmartPrep</h2>
          </a>
          <h3 class="auth-title">Welcome Back</h3>
          <p class="auth-subtitle">Sign in to continue your placement preparation</p>
        </div>
        
        <form id="login-form" class="auth-form">
          <div class="form-group">
            <label for="login-id">Username or Roll Number</label>
            <input type="text" id="login-id" class="form-control" required placeholder="e.g. developer or 21CS101" autocomplete="username">
          </div>
          
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label for="login-password">Password</label>
            </div>
            <input type="password" id="login-password" class="form-control" required placeholder="••••••••" autocomplete="current-password">
          </div>

          <div id="login-error" class="error-message hidden"></div>
          
          <button type="submit" id="login-submit-btn" class="btn btn-primary btn-block btn-lg">
            Sign In <span class="mdi mdi-arrow-right"></span>
          </button>
        </form>
        
        <div class="auth-footer text-center">
          <p>Don't have an account? <a href="#/signup" style="font-weight: 600;">Sign up</a></p>
        </div>
      </div>
    </div>
  `;
}

export function bindLogin() {
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const userId = document.getElementById('login-id').value.trim();
      const password = document.getElementById('login-password').value;
      const submitBtn = document.getElementById('login-submit-btn');

      if (!userId || !password) {
        showError('Please enter your username/roll number and password.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="mdi mdi-loading mdi-spin"></span> Signing in...`;
      hideError();

      try {
        const result = await signIn(userId, password);
        if (result.error) {
          showError(result.error.message || 'Invalid credentials');
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Sign In <span class="mdi mdi-arrow-right"></span>`;
        } else {
          showToast('Welcome back to SmartPrep! 🎉', 'success');
        }
      } catch (err) {
        showError(err.message || 'An error occurred during sign in');
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Sign In <span class="mdi mdi-arrow-right"></span>`;
      }
    });
  }

  function showError(msg) {
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }
  }

  function hideError() {
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
    }
  }
}
