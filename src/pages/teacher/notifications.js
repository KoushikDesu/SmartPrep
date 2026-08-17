import { supabase } from '../../lib/supabase.js';
import { showToast } from '../../components/toast.js';
import { appState } from '../../main.js';

let history = [];
let studentsList = [];

export async function renderTeacherNotifications() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) history = data || [];

      const { data: sData } = await supabase.from('profiles').select('id, full_name, username, roll_number').eq('role', 'student');
      studentsList = sData || [];
    }
  } catch (err) {
    console.error(err);
    history = [];
  }

  const historyContent = history.length === 0 ? `
    <tr><td colspan="4" class="text-center" style="padding: 2.5rem;">No notifications sent yet.</td></tr>
  ` : history.map(n => `
    <tr>
      <td><strong style="color: var(--color-text);">${n.title}</strong></td>
      <td style="max-width: 320px; font-size: var(--text-sm); color: var(--color-text-secondary);">${n.message}</td>
      <td>
        <span class="badge ${n.target_type === 'all' ? 'badge-primary' : 'badge-warning'}">
          ${n.target_type === 'all' ? 'All Students' : 'Direct Message'}
        </span>
      </td>
      <td style="color: var(--color-text-tertiary); font-size: var(--text-xs);">${new Date(n.created_at).toLocaleString()}</td>
    </tr>
  `).join('');

  const studentOptions = studentsList.map(s => `
    <option value="${s.id}">${s.full_name || s.username} (${s.roll_number || 'Roll N/A'})</option>
  `).join('');

  return `
    <div class="page-container teacher-notifications">
      <div class="page-header" style="margin-bottom: 2rem;">
        <nav class="breadcrumb">
          <a href="#/teacher">Instructor Studio</a>
          <span class="mdi mdi-chevron-right"></span>
          <span>Announcements</span>
        </nav>
        <h2>Broadcast Announcements</h2>
        <p class="subtitle">Publish test alerts, recruitment drive updates, and study material reminders to students</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
        <!-- Compose Announcement Card -->
        <div class="card" style="padding: 1.5rem;">
          <h3 style="font-size: var(--text-lg); margin-bottom: 1.25rem;">Compose Notice</h3>
          
          <div class="form-group">
            <label>Announcement Title</label>
            <input type="text" id="notif-title" class="form-control" placeholder="e.g. TCS Campus Mock Test Schedule" required>
          </div>

          <div class="form-group">
            <label>Target Audience</label>
            <select id="notif-target" class="form-control">
              <option value="all">Broadcast to All Enrolled Students</option>
              <option value="specific">Send to Specific Student</option>
            </select>
          </div>

          <div class="form-group hidden" id="student-select-group">
            <label>Select Student</label>
            <select id="notif-student-id" class="form-control">
              ${studentOptions || '<option value="">No students available</option>'}
            </select>
          </div>

          <div class="form-group">
            <label>Announcement Message</label>
            <textarea id="notif-message" class="form-control" rows="4" placeholder="Write announcement details..." required></textarea>
          </div>

          <button id="send-notif-btn" class="btn btn-primary btn-block">
            <span class="mdi mdi-send-outline"></span> Broadcast Announcement
          </button>
        </div>

        <!-- Sent Broadcast History -->
        <div class="card" style="padding: 1.5rem;">
          <h3 style="font-size: var(--text-lg); margin-bottom: 1.25rem;">Broadcast Log</h3>
          
          <div class="table-wrapper">
            <table class="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Target</th>
                  <th>Sent At</th>
                </tr>
              </thead>
              <tbody>
                ${historyContent}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindTeacherNotifs() {
  const targetSelect = document.getElementById('notif-target');
  const studentGroup = document.getElementById('student-select-group');
  const sendBtn = document.getElementById('send-notif-btn');

  if (targetSelect && studentGroup) {
    targetSelect.addEventListener('change', (e) => {
      if (e.target.value === 'specific') {
        studentGroup.classList.remove('hidden');
      } else {
        studentGroup.classList.add('hidden');
      }
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', async () => {
      const title = document.getElementById('notif-title')?.value.trim();
      const message = document.getElementById('notif-message')?.value.trim();
      const target = document.getElementById('notif-target')?.value || 'all';
      const studentId = document.getElementById('notif-student-id')?.value;

      if (!title || !message) {
        showToast('Please enter both title and message', 'error');
        return;
      }

      sendBtn.disabled = true;
      sendBtn.innerHTML = `<span class="mdi mdi-loading mdi-spin"></span> Sending...`;

      try {
        const { error } = await supabase.from('notifications').insert({
          title,
          message,
          target_type: target,
          target_user_id: target === 'specific' ? studentId : null,
          sender_id: appState.user?.id
        });

        if (error) throw error;
        showToast('Announcement broadcasted to students! 📢', 'success');
        setTimeout(() => window.location.reload(), 800);
      } catch (err) {
        showToast(err.message || 'Failed to send notification', 'error');
        sendBtn.disabled = false;
        sendBtn.innerHTML = `<span class="mdi mdi-send-outline"></span> Broadcast Announcement`;
      }
    });
  }
}
