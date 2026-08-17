import { signIn } from '../lib/auth.js';
import { showToast } from '../components/toast.js';

export function renderLogin() {
  return `
    <div class="auth-page full-page">
      <div class="auth-card">
        <div class="auth-header text-center">
          <a href="#/" class="logo-link">
            <span class="mdi mdi-school"></span>
            <h2>SmartPrep</h2>
          </a>
          <h3 class="auth-title">Welcome back</h3>
          <p class="auth-subtitle">Sign in to continue your preparation</p>
        </div>
        
        <form id="login-form" class="auth-form">
          <div class="form-group">
            <label for="login-userid">User ID (Username or Roll Number)</label>
            <input type="text" id="login-userid" class="form-control" required placeholder="Enter username or roll number">
          </div>
          
          <div class="form-group">
            <label for="login-password">Password</label>
            <div class="password-input-group">
              <input type="password" id="login-password" class="form-control" required placeholder="Enter password">
              <button type="button" class="toggle-password mdi mdi-eye-outline" tabindex="-1"></button>
            </div>
          </div>

          <div id="login-error" class="error-message hidden"></div>
          
          <button type="submit" id="login-submit-btn" class="btn btn-primary btn-block">Sign In</button>
        </form>
        
        <div class="auth-footer text-center">
          <p>Don't have an account? <a href="#/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  `;
}

export function bindLogin() {
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');
  const toggleBtn = document.querySelector('.toggle-password');
  const passInput = document.getElementById('login-password');

  if (toggleBtn && passInput) {
    toggleBtn.addEventListener('click', () => {
      const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passInput.setAttribute('type', type);
      toggleBtn.classList.toggle('mdi-eye-outline');
      toggleBtn.classList.toggle('mdi-eye-off-outline');
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const userId = document.getElementById('login-userid').value.trim();
      const password = passInput.value;
      const submitBtn = document.getElementById('login-submit-btn');

      if (!userId || !password) {
        showError('Please fill in all fields');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Signing in...';
      hideError();

      try {
        const result = await signIn(userId, password);
        if (result.error) {
          showError(result.error.message || 'Invalid credentials');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sign In';
        } else {
          showToast('Signed in successfully!', 'success');
          // Auth state change listener in main.js will handle redirect
        }
      } catch (err) {
        showError(err.message || 'An error occurred during login');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In';
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
