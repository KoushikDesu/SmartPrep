import { appState } from '../main.js';
import { supabase } from '../lib/supabase.js';
import { showToast } from '../components/toast.js';

export async function renderProfile() {
  const user = appState?.user;
  
  const name = user?.user_metadata?.name || 'Guest User';
  const username = user?.user_metadata?.username || 'guest';
  const rollNumber = user?.user_metadata?.rollNumber || 'N/A';
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return `
    <div class="page-container profile-page">
      <div class="page-header">
        <h2>My Profile</h2>
      </div>

      <div class="profile-layout">
        <!-- Sidebar / User Info -->
        <div class="profile-sidebar">
          <div class="profile-card">
            <div class="avatar-large">${initials}</div>
            <h3>${name}</h3>
            <p class="text-muted">@${username}</p>
            <div class="badge badge-primary badge-outline" style="margin-top: 0.5rem;">Student</div>
            
            <hr class="divider">
            
            <div class="profile-details">
              <div class="detail-item">
                <span class="mdi mdi-identifier"></span>
                <span>Roll No: <strong>${rollNumber}</strong></span>
              </div>
              <div class="detail-item">
                <span class="mdi mdi-email-outline"></span>
                <span>Not provided</span>
              </div>
            </div>
          </div>

          <div class="settings-card">
            <h4>Account Settings</h4>
            <form id="change-password-form">
              <div class="form-group">
                <label>New Password</label>
                <input type="password" id="new-password" class="form-control" placeholder="Enter new password">
              </div>
              <button type="submit" class="btn btn-outline btn-block">Update Password</button>
            </form>
          </div>
        </div>

        <!-- Main Content / Stats -->
        <div class="profile-main">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon" style="background: #e6f7f5; color: #2a9d8f;">
                <span class="mdi mdi-check-all"></span>
              </div>
              <div class="stat-content">
                <p class="stat-label">Total Answered</p>
                <h3 class="stat-value">124</h3>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background: #e2f0e9; color: #00b894;">
                <span class="mdi mdi-target"></span>
              </div>
              <div class="stat-content">
                <p class="stat-label">Correct Answers</p>
                <h3 class="stat-value">98</h3>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background: #fdf0ed; color: #e76f51;">
                <span class="mdi mdi-percent"></span>
              </div>
              <div class="stat-content">
                <p class="stat-label">Accuracy</p>
                <h3 class="stat-value">79%</h3>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background: #efecfc; color: #6c5ce7;">
                <span class="mdi mdi-bookshelf"></span>
              </div>
              <div class="stat-content">
                <p class="stat-label">Categories Explored</p>
                <h3 class="stat-value">4</h3>
              </div>
            </div>
          </div>

          <div class="progress-section">
            <h4>Category Progress</h4>
            <div class="progress-list">
              <div class="progress-item">
                <div class="progress-header">
                  <span>General Aptitude</span>
                  <span>45/150</span>
                </div>
                <div class="progress-track">
                  <div class="progress-bar" style="width: 30%; background: #2a9d8f;"></div>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-header">
                  <span>Verbal & Reasoning</span>
                  <span>20/120</span>
                </div>
                <div class="progress-track">
                  <div class="progress-bar" style="width: 16%; background: #e76f51;"></div>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-header">
                  <span>Programming</span>
                  <span>59/200</span>
                </div>
                <div class="progress-track">
                  <div class="progress-bar" style="width: 29.5%; background: #00b894;"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="notifications-section">
            <h4>Recent Notifications</h4>
            <div class="notification-list">
              <div class="notification-item unread">
                <div class="notif-icon"><span class="mdi mdi-bell-outline"></span></div>
                <div class="notif-content">
                  <p><strong>Admin</strong> added new questions to <em>Data Structures</em>.</p>
                  <span class="notif-time">2 hours ago</span>
                </div>
              </div>
              <div class="notification-item">
                <div class="notif-icon"><span class="mdi mdi-trophy-outline"></span></div>
                <div class="notif-content">
                  <p>You reached a 3-day streak! Keep it up!</p>
                  <span class="notif-time">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
