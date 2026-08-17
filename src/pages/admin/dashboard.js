import { supabase } from '../../lib/supabase.js';
import { appState } from '../../main.js';

export async function renderAdminDashboard() {
  let userCount = 0;
  let teacherCount = 0;
  let questionCount = 0;
  let categoryCount = 0;
  let recentUsers = [];

  try {
    if (supabase) {
      const { count: uCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      userCount = uCount || 0;

      const { count: tCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'teacher');
      teacherCount = tCount || 0;

      const { count: qCount } = await supabase.from('questions').select('*', { count: 'exact', head: true });
      questionCount = qCount || 0;

      const { count: cCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
      categoryCount = cCount || 0;

      const { data: recents } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5);
      recentUsers = recents || [];
    }
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
  }

  const recentRows = recentUsers.length > 0 ? recentUsers.map(u => `
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="avatar avatar-sm">${(u.full_name || u.username || 'U').substring(0, 2).toUpperCase()}</div>
          <div>
            <strong>${u.full_name || u.username}</strong>
            <div style="font-size: 11px; color: var(--color-text-tertiary);">@${u.username}</div>
          </div>
        </div>
      </td>
      <td>${u.roll_number || '—'}</td>
      <td>
        <span class="badge ${u.role === 'admin' ? 'badge-error' : (u.role === 'teacher' ? 'badge-warning' : 'badge-primary')}">
          ${u.role}
        </span>
      </td>
      <td style="color: var(--color-text-secondary); font-size: var(--text-xs);">${new Date(u.created_at).toLocaleDateString()}</td>
    </tr>
  `).join('') : `<tr><td colspan="4" class="text-center" style="padding: 2rem;">No registered users yet.</td></tr>`;

  return `
    <div class="page-container admin-dashboard">
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="back-bubble-btn" style="position: static; box-shadow: none;" onclick="window.history.back()" title="Back">
            <span class="mdi mdi-arrow-left"></span>
          </button>
          <div>
            <h2>System Control Center</h2>
            <p class="subtitle">Platform overview and user administration</p>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <a href="#/admin/users" class="btn btn-secondary btn-sm">
            <span class="mdi mdi-account-cog"></span> Users
          </a>
          <a href="#/admin/teachers" class="btn btn-primary btn-sm">
            <span class="mdi mdi-school"></span> Manage Faculty
          </a>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(37, 99, 235, 0.12); color: #2563eb;">
            <span class="mdi mdi-account-group-outline"></span>
          </div>
          <div>
            <div class="stat-value">${userCount}</div>
            <div class="stat-label">Total Accounts</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(245, 158, 11, 0.12); color: #d97706;">
            <span class="mdi mdi-school-outline"></span>
          </div>
          <div>
            <div class="stat-value">${teacherCount}</div>
            <div class="stat-label">Faculty Teachers</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(16, 185, 129, 0.12); color: #059669;">
            <span class="mdi mdi-help-circle-outline"></span>
          </div>
          <div>
            <div class="stat-value">${questionCount}</div>
            <div class="stat-label">Practice Questions</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(139, 92, 246, 0.12); color: #7c3aed;">
            <span class="mdi mdi-shape-outline"></span>
          </div>
          <div>
            <div class="stat-value">${categoryCount}</div>
            <div class="stat-label">Categories</div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
        <!-- Recent Users Table -->
        <div class="card" style="padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="font-size: var(--text-lg);">Recent Registrations</h3>
            <a href="#/admin/users" style="font-size: var(--text-xs); font-weight: 600;">View All &rarr;</a>
          </div>

          <div class="table-wrapper">
            <table class="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Roll No</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                ${recentRows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Quick Administration Controls -->
        <div class="card" style="padding: 1.5rem;">
          <h3 style="font-size: var(--text-lg); margin-bottom: 1rem;">Quick Controls</h3>
          
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <a href="#/admin/teachers" class="btn btn-secondary" style="justify-content: flex-start; padding: 14px 18px; text-align: left;">
              <span class="mdi mdi-account-plus-outline" style="font-size: 1.25rem; color: var(--color-primary);"></span>
              <div>
                <strong>Create Faculty Account</strong>
                <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">Provision teacher credentials for question authoring</div>
              </div>
            </a>

            <a href="#/admin/users" class="btn btn-secondary" style="justify-content: flex-start; padding: 14px 18px; text-align: left;">
              <span class="mdi mdi-key-outline" style="font-size: 1.25rem; color: var(--color-warning);"></span>
              <div>
                <strong>Reset User Passwords</strong>
                <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">Change passwords or delete inactive student accounts</div>
              </div>
            </a>

            <a href="#/teacher" class="btn btn-secondary" style="justify-content: flex-start; padding: 14px 18px; text-align: left;">
              <span class="mdi mdi-presentation" style="font-size: 1.25rem; color: var(--color-success);"></span>
              <div>
                <strong>Switch to Teacher View</strong>
                <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">Inspect questions and broadcast announcements</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}
