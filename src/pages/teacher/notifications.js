import { supabase } from '../../lib/supabase.js';
import { sendNotification } from '../../lib/notifications.js';
import { showToast } from '../../components/toast.js';
import { appState } from '../../main.js';

export async function renderTeacherNotifications() {
  let history = [];
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('sender_id', appState.user?.id)
      .order('created_at', { ascending: false });
    if (!error) history = data;
  } catch (err) {
    console.error(err);
  }

  const historyContent = history.length === 0 ? `
    <div class="empty-state">
      <p>No notifications sent yet.</p>
    </div>
  ` : `
    <table class="table" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="border-bottom: 1px solid var(--color-border); text-align: left;">
          <th style="padding: 1rem;">Title</th>
          <th style="padding: 1rem;">Message</th>
          <th style="padding: 1rem;">Target</th>
          <th style="padding: 1rem;">Sent At</th>
        </tr>
      </thead>
      <tbody>
        ${history.map(n => `
          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 1rem; font-weight: bold;">${n.title}</td>
            <td style="padding: 1rem; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${n.message}</td>
            <td style="padding: 1rem;">${n.user_id ? 'Specific Student' : 'All Students'}</td>
            <td style="padding: 1rem;">${new Date(n.created_at).toLocaleString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  return `
    <div class="teacher-notifications fade-in">
      <div class="panel-header" style="margin-bottom: 2rem;">
        <h1>Notifications</h1>
        <p>Send announcements to students.</p>
      </div>

      <div class="card" style="margin-bottom: 2rem;">
        <h2 style="margin-bottom: 1rem;">Compose Notification</h2>
        <div class="form-group" style="margin-bottom: 1rem;">
          <label class="form-label">Title</label>
          <input type="text" id="notif-title" class="form-input" placeholder="Enter title">
        </div>
        <div class="form-group" style="margin-bottom: 1rem;">
          <label class="form-label">Message</label>
          <textarea id="notif-message" class="form-input" rows="4" placeholder="Enter message"></textarea>
        </div>
        <div class="form-group" style="margin-bottom: 1rem;">
          <label class="form-label">Target</label>
          <select id="notif-target" class="form-input">
            <option value="all">All Students</option>
            <option value="specific">Specific Student</option>
          </select>
        </div>
        <div class="form-group" id="student-search-group" style="display: none; margin-bottom: 1rem;">
          <label class="form-label">Student ID</label>
          <input type="text" id="notif-student-search" class="form-input" placeholder="Enter student UUID">
        </div>
        <button id="send-notif-btn" class="btn btn-primary">
          <span class="mdi mdi-send"></span> Send Notification
        </button>
      </div>

      <div class="card">
        <h2 style="margin-bottom: 1rem;">Sent History</h2>
        <div class="table-responsive">
          ${historyContent}
        </div>
      </div>
    </div>
  `;
}

export function bindTeacherNotifs() {
  const targetSelect = document.getElementById('notif-target');
  const searchGroup = document.getElementById('student-search-group');
  const sendBtn = document.getElementById('send-notif-btn');

  if (targetSelect && searchGroup) {
    targetSelect.addEventListener('change', (e) => {
      if (e.target.value === 'specific') {
        searchGroup.style.display = 'block';
      } else {
        searchGroup.style.display = 'none';
      }
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', async () => {
      const title = document.getElementById('notif-title').value;
      const message = document.getElementById('notif-message').value;
      const target = document.getElementById('notif-target').value;
      const studentId = document.getElementById('notif-student-search').value;

      if (!title || !message) return showToast('Title and message are required', 'error');
      
      const payload = {
        title,
        message,
        user_id: target === 'specific' ? studentId : null,
        type: 'announcement',
        sender_id: appState.user?.id
      };

      try {
        const res = await sendNotification(payload);
        if (res && res.error) throw res.error;
        showToast('Notification sent successfully', 'success');
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        showToast(err.message || 'Failed to send notification', 'error');
      }
    });
  }
}
