import { appState } from '../main.js';
import { getOverallProgress } from '../lib/progress.js';
import { renderAvatar } from '../components/avatar.js';

export async function renderProfile() {
  const profile = appState?.profile || {};
  const user = appState?.user || {};
  
  const name = profile.full_name || user.user_metadata?.full_name || user.user_metadata?.name || 'Student';
  const username = profile.username || user.user_metadata?.username || 'student';
  const rollNumber = profile.roll_number || user.user_metadata?.roll_number || user.user_metadata?.rollNumber || 'N/A';
  const role = (profile.role || user.user_metadata?.role || 'student').toUpperCase();

  let totalAnswered = 0;
  let correctAnswers = 0;
  let accuracy = 0;

  try {
    const stats = await getOverallProgress(user.id || 'guest');
    totalAnswered = stats.totalAnswered;
    correctAnswers = stats.correctAnswers;
    accuracy = stats.accuracy;
  } catch (e) {
    console.log('Error fetching user progress stats:', e);
  }

  const avatarHtml = renderAvatar(profile || { role }, 'xl');

  return `
    <div class="page-container profile-page">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem;">
        <button class="back-bubble-btn" style="position: static; box-shadow: none;" onclick="window.history.back()" title="Back">
          <span class="mdi mdi-arrow-left"></span>
        </button>
        <div>
          <h2 style="font-size: var(--text-2xl); margin-bottom: 2px;">My Learning Profile</h2>
          <p class="subtitle" style="font-size: var(--text-sm);">Track your placement preparation performance & credentials</p>
        </div>
      </div>

      <div class="profile-layout" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <!-- User Info Card with Scholar / Teacher Avatar -->
        <div class="card profile-card" style="text-align: center; padding: 2rem 1.5rem;">
          <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
            ${avatarHtml}
          </div>
          <h3 style="font-size: var(--text-xl);">${name}</h3>
          <p style="color: var(--color-text-secondary); margin-top: 2px;">@${username}</p>
          <div style="margin-top: 8px;">
            <span class="badge badge-primary">${role}</span>
          </div>
          
          <div style="margin-top: 1.5rem; text-align: left; padding: 1rem; background: var(--color-surface-alt); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: var(--color-text-secondary); font-size: var(--text-sm);">Roll Number:</span>
              <strong style="font-size: var(--text-sm);">${rollNumber}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--color-text-secondary); font-size: var(--text-sm);">Account Status:</span>
              <strong style="color: var(--color-success); font-size: var(--text-sm);">Active</strong>
            </div>
          </div>

          <div style="margin-top: 1.5rem; text-align: left;">
            <h4 style="font-size: var(--text-base); margin-bottom: 12px;">Change Password</h4>
            <form id="change-password-form">
              <div class="form-group" style="margin-bottom: 12px;">
                <label style="font-size: var(--text-xs);">New Password</label>
                <input type="password" id="new-password" class="form-control" placeholder="••••••••" required>
              </div>
              <div class="form-group" style="margin-bottom: 12px;">
                <label style="font-size: var(--text-xs);">Confirm Password</label>
                <input type="password" id="confirm-new-password" class="form-control" placeholder="••••••••" required>
              </div>
              <div id="password-error" class="error-message hidden" style="font-size: var(--text-xs); padding: 6px 10px;"></div>
              <button type="submit" class="btn btn-secondary btn-block btn-sm">Update Password</button>
            </form>
          </div>
        </div>

        <!-- Performance Stats -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 0;">
            <div class="stat-card" style="padding: 1.25rem;">
              <div class="stat-icon" style="background: rgba(37, 99, 235, 0.1); color: var(--color-primary); width: 44px; height: 44px; font-size: 1.25rem;">
                <span class="mdi mdi-clipboard-text-clock-outline"></span>
              </div>
              <div>
                <div class="stat-value" style="font-size: 1.75rem;">${totalAnswered}</div>
                <div class="stat-label" style="font-size: 12px;">Questions Solved</div>
              </div>
            </div>

            <div class="stat-card" style="padding: 1.25rem;">
              <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1); color: var(--color-success); width: 44px; height: 44px; font-size: 1.25rem;">
                <span class="mdi mdi-check-circle-outline"></span>
              </div>
              <div>
                <div class="stat-value" style="font-size: 1.75rem; color: var(--color-success);">${correctAnswers}</div>
                <div class="stat-label" style="font-size: 12px;">Correct Answers</div>
              </div>
            </div>

            <div class="stat-card" style="padding: 1.25rem;">
              <div class="stat-icon" style="background: rgba(245, 158, 11, 0.1); color: var(--color-warning); width: 44px; height: 44px; font-size: 1.25rem;">
                <span class="mdi mdi-percent-outline"></span>
              </div>
              <div>
                <div class="stat-value" style="font-size: 1.75rem;">${accuracy}%</div>
                <div class="stat-label" style="font-size: 12px;">Overall Accuracy</div>
              </div>
            </div>
          </div>

          <div class="card" style="padding: 1.5rem;">
            <h3 style="font-size: var(--text-lg); margin-bottom: 1rem;">Recommended Practice Modules</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="padding: 12px; border-radius: var(--radius-md); background: var(--color-surface-alt); border: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong>Arithmetic Aptitude: Problems on Trains</strong>
                  <p style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">Relative speed, platform lengths & train bridge crossings</p>
                </div>
                <a href="#/practice/problems-on-trains" class="btn btn-primary btn-sm">Practice</a>
              </div>

              <div style="padding: 12px; border-radius: var(--radius-md); background: var(--color-surface-alt); border: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong>Logical Reasoning: Blood Relations</strong>
                  <p style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">Coded family tree relations for TCS & Infosys</p>
                </div>
                <a href="#/practice/blood-relations" class="btn btn-primary btn-sm">Practice</a>
              </div>

              <div style="padding: 12px; border-radius: var(--radius-md); background: var(--color-surface-alt); border: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong>Programming: C & Pointers</strong>
                  <p style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">Pointer arithmetic & dynamic memory allocation</p>
                </div>
                <a href="#/practice/c-pointers" class="btn btn-primary btn-sm">Practice</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
