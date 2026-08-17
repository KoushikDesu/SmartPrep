import { signUp } from '../lib/auth.js';
import { showToast } from '../components/toast.js';

export function renderSignup() {
  return `
    <div class="auth-page full-page">
      <div class="auth-card">
        <div class="auth-header text-center">
          <a href="#/" class="logo-link">
            <span class="mdi mdi-school"></span>
            <h2>SmartPrep</h2>
          </a>
          <h3 class="auth-title">Create your account</h3>
          <p class="auth-subtitle">Start your placement preparation journey</p>
        </div>
        
        <form id="signup-form" class="auth-form">
          <div class="form-group">
            <label for="signup-name">Full Name</label>
            <input type="text" id="signup-name" class="form-control" required placeholder="John Doe">
          </div>

          <div class="form-group">
            <label for="signup-username">Username</label>
            <input type="text" id="signup-username" class="form-control" required placeholder="johndoe">
          </div>

          <div class="form-group">
            <label for="signup-rollnumber">College Roll Number</label>
            <input type="text" id="signup-rollnumber" class="form-control" required placeholder="e.g. 21CS101">
          </div>
          
          <div class="form-group">
            <label for="signup-password">Password</label>
            <input type="password" id="signup-password" class="form-control" required placeholder="Min. 6 characters">
          </div>

          <div class="form-group">
            <label for="signup-confirm-password">Confirm Password</label>
            <input type="password" id="signup-confirm-password" class="form-control" required placeholder="Re-enter password">
          </div>

          <div id="signup-error" class="error-message hidden"></div>
          
          <button type="submit" id="signup-submit-btn" class="btn btn-primary btn-block">Create Account</button>
        </form>
        
        <div class="auth-footer text-center">
          <p>Already have an account? <a href="#/login">Sign in</a></p>
        </div>
      </div>
    </div>
  `;
}

export function bindSignup() {
  const form = document.getElementById('signup-form');
  const errorEl = document.getElementById('signup-error');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('signup-name').value.trim();
      const username = document.getElementById('signup-username').value.trim();
      const rollNumber = document.getElementById('signup-rollnumber').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;
      const submitBtn = document.getElementById('signup-submit-btn');

      if (!name || !username || !rollNumber || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
      }

      if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
      }

      if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating account...';
      hideError();

      try {
        const result = await signUp({ name, username, rollNumber, password });
        if (result.error) {
          showError(result.error.message || 'Registration failed');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Create Account';
        } else {
          showToast('Account created successfully!', 'success');
          // Auth state change listener will handle redirect
        }
      } catch (err) {
        showError(err.message || 'An error occurred during sign up');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
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
