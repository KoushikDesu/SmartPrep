import { supabase } from '../../lib/supabase.js';
import { adminCreateTeacher, adminDeleteUser, updateProfile } from '../../lib/auth.js';
import { showToast } from '../../components/toast.js';
import { showModal } from '../../components/modal.js';

let currentTeachers = [];

export async function renderAdminTeachers() {
  try {
    if (supabase) {
      const { data: teachers, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'teacher')
        .order('created_at', { ascending: false });

      if (error) throw error;
      currentTeachers = teachers || [];
    }
  } catch (error) {
    console.error('Error fetching teachers:', error);
    currentTeachers = [];
  }

  const tableBody = currentTeachers.length > 0
    ? currentTeachers.map(t => generateTeacherRow(t)).join('')
    : `<tr><td colspan="5" class="text-center" style="padding: 2.5rem;">No faculty teacher accounts registered yet.</td></tr>`;

  return `
    <div class="page-container admin-teachers">
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="back-bubble-btn" style="position: static; box-shadow: none;" onclick="window.history.back()" title="Back">
            <span class="mdi mdi-arrow-left"></span>
          </button>
          <div>
            <nav class="breadcrumb" style="margin-bottom: 2px;">
              <a href="#/admin">Admin Overview</a>
              <span class="mdi mdi-chevron-right"></span>
              <span>Faculty Members</span>
            </nav>
            <h2>Faculty Management</h2>
            <p class="subtitle">Create and manage instructor accounts for syllabus & question authoring</p>
          </div>
        </div>
        <button id="create-teacher-btn" class="btn btn-primary">
          <span class="mdi mdi-account-plus"></span> Add New Teacher
        </button>
      </div>

      <div class="card" style="padding: 1.5rem;">
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Faculty Member</th>
                <th>Username</th>
                <th>Employee / Roll ID</th>
                <th>Created</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="teachers-table-body">
              ${tableBody}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function generateTeacherRow(t) {
  const joinedDate = new Date(t.created_at || Date.now()).toLocaleDateString();
  const initials = (t.full_name || t.username || 'T').substring(0, 2).toUpperCase();

  return `
    <tr data-teacher-id="${t.id}">
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="avatar avatar-sm" style="background: linear-gradient(135deg, #d97706, #f59e0b);">${initials}</div>
          <div>
            <strong>${t.full_name || 'Professor'}</strong>
            <div style="font-size: 11px; color: var(--color-text-tertiary);">Faculty Instructor</div>
          </div>
        </div>
      </td>
      <td><strong>@${t.username}</strong></td>
      <td>${t.roll_number || 'FAC-ID'}</td>
      <td style="color: var(--color-text-secondary); font-size: var(--text-xs);">${joinedDate}</td>
      <td style="text-align: right;">
        <div style="display: inline-flex; gap: 6px;">
          <button class="btn btn-secondary btn-sm edit-teacher-btn" data-id="${t.id}" title="Edit Faculty">
            <span class="mdi mdi-pencil"></span> Edit
          </button>
          <button class="btn btn-danger btn-sm delete-teacher-btn" data-id="${t.id}" title="Delete Account">
            <span class="mdi mdi-trash-can-outline"></span>
          </button>
        </div>
      </td>
    </tr>
  `;
}

export function bindAdminTeachers() {
  const createBtn = document.getElementById('create-teacher-btn');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      showModal({
        title: 'Add Faculty Instructor',
        body: `
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="t-fullname" class="form-control" placeholder="e.g. Dr. Ramesh Kumar" required>
          </div>
          <div class="form-group">
            <label>Username</label>
            <input type="text" id="t-username" class="form-control" placeholder="e.g. ramesh_prof" required>
          </div>
          <div class="form-group">
            <label>Faculty / Employee ID</label>
            <input type="text" id="t-roll" class="form-control" placeholder="e.g. FAC-2026-01">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="t-password" class="form-control" placeholder="Min. 6 characters" required>
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" id="t-confirm" class="form-control" placeholder="Re-enter password" required>
          </div>
        `,
        confirmText: 'Create Faculty Account',
        cancelText: 'Cancel',
        onConfirm: async () => {
          const fullName = document.getElementById('t-fullname').value.trim();
          const username = document.getElementById('t-username').value.trim();
          const rollNumber = document.getElementById('t-roll').value.trim();
          const pwd = document.getElementById('t-password').value;
          const conf = document.getElementById('t-confirm').value;

          if (!fullName || !username || !pwd) {
            showToast('Please fill in all required fields', 'error');
            return false;
          }
          if (pwd.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return false;
          }
          if (pwd !== conf) {
            showToast('Passwords do not match', 'error');
            return false;
          }

          try {
            const res = await adminCreateTeacher({ fullName, username, password: pwd, rollNumber });
            if (res.error) throw res.error;
            showToast('Faculty teacher account created successfully!', 'success');
            setTimeout(() => window.location.reload(), 1000);
          } catch (err) {
            showToast(err.message || 'Creation failed', 'error');
            return false;
          }
        }
      });
    });
  }

  document.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('.edit-teacher-btn');
    const delBtn = e.target.closest('.delete-teacher-btn');

    if (editBtn) {
      const id = editBtn.dataset.id;
      const t = currentTeachers.find(x => x.id === id);
      if (t) {
        showModal({
          title: `Edit Faculty (@${t.username})`,
          body: `
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" id="edit-t-fullname" class="form-control" value="${t.full_name || ''}" required>
            </div>
            <div class="form-group">
              <label>Username</label>
              <input type="text" id="edit-t-username" class="form-control" value="${t.username || ''}" required>
            </div>
            <div class="form-group">
              <label>Employee / Roll ID</label>
              <input type="text" id="edit-t-roll" class="form-control" value="${t.roll_number || ''}">
            </div>
          `,
          confirmText: 'Save Changes',
          cancelText: 'Cancel',
          onConfirm: async () => {
            const fullName = document.getElementById('edit-t-fullname').value.trim();
            const username = document.getElementById('edit-t-username').value.trim();
            const roll = document.getElementById('edit-t-roll').value.trim();

            if (!fullName || !username) {
              showToast('Full name and username are required', 'error');
              return false;
            }

            try {
              const res = await updateProfile(id, { full_name: fullName, username, roll_number: roll });
              if (res.error) throw res.error;
              showToast('Faculty updated successfully', 'success');
              t.full_name = fullName;
              t.username = username;
              t.roll_number = roll;
              const row = document.querySelector(`tr[data-teacher-id="${id}"]`);
              if (row) row.outerHTML = generateTeacherRow(t);
            } catch (err) {
              showToast(err.message || 'Update failed', 'error');
              return false;
            }
          }
        });
      }
    }

    if (delBtn) {
      const id = delBtn.dataset.id;
      showModal({
        title: 'Delete Faculty Account',
        body: `<p style="font-size: var(--text-sm);">Are you sure you want to permanently remove this teacher account?</p>`,
        confirmText: 'Delete Faculty',
        cancelText: 'Cancel',
        isDanger: true,
        onConfirm: async () => {
          try {
            const res = await adminDeleteUser(id);
            if (res.error) throw res.error;
            showToast('Teacher account deleted', 'success');
            currentTeachers = currentTeachers.filter(x => x.id !== id);
            const row = document.querySelector(`tr[data-teacher-id="${id}"]`);
            if (row) row.remove();
          } catch (err) {
            showToast(err.message || 'Delete failed', 'error');
            return false;
          }
        }
      });
    }
  });
}
