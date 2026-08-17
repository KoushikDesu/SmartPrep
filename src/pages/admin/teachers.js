import { supabase } from '../../lib/supabase.js';
import { adminCreateTeacher, adminDeleteUser, updateProfile } from '../../lib/auth.js';
import { showToast } from '../../components/toast.js';
import { showModal } from '../../components/modal.js';

let currentTeachers = [];

export async function renderAdminTeachers() {
  try {
    const { data: teachers, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'teacher')
      .order('created_at', { ascending: false });

    if (error) throw error;
    currentTeachers = teachers || [];
  } catch (error) {
    console.error('Error fetching teachers:', error);
    currentTeachers = [];
  }

  let tableContent = '';
  if (currentTeachers.length === 0) {
    tableContent = `
      <div class="empty-state">
        <span class="mdi mdi-human-male-board" style="font-size: 3rem; color: var(--color-text-light);"></span>
        <p>No teachers found.</p>
      </div>
    `;
  } else {
    tableContent = `
      <div class="table-responsive">
        <table class="table" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--color-border); text-align: left;">
              <th style="padding: 1rem;">Name</th>
              <th style="padding: 1rem;">Username</th>
              <th style="padding: 1rem;">Created</th>
              <th style="padding: 1rem;">Actions</th>
            </tr>
          </thead>
          <tbody id="teachers-table-body">
            ${currentTeachers.map(t => generateTeacherRow(t)).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  return `
    <div class="admin-teachers fade-in">
      <div class="panel-header" style="margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1>Teacher Management</h1>
          <p>Manage teacher accounts.</p>
        </div>
        <button id="create-teacher-btn" class="btn btn-primary">
          <span class="mdi mdi-plus"></span> Create Teacher
        </button>
      </div>

      <div class="card" style="margin-bottom: 2rem;">
        ${tableContent}
      </div>
    </div>
  `;
}

function generateTeacherRow(t) {
  const joinedDate = new Date(t.created_at).toLocaleDateString();
  return `
    <tr style="border-bottom: 1px solid var(--color-border);">
      <td style="padding: 1rem;">${t.full_name || '—'}</td>
      <td style="padding: 1rem;">${t.username || '—'}</td>
      <td style="padding: 1rem;">${joinedDate}</td>
      <td style="padding: 1rem; display: flex; gap: 0.5rem;">
        <button class="btn btn-icon edit-teacher-btn" data-id="${t.id}" title="Edit Teacher">
          <span class="mdi mdi-pencil"></span>
        </button>
        <button class="btn btn-icon delete-teacher-btn" data-id="${t.id}" title="Delete Teacher" style="color: var(--color-error);">
          <span class="mdi mdi-trash-can"></span>
        </button>
      </td>
    </tr>
  `;
}

export function bindAdminTeachers() {
  const createBtn = document.getElementById('create-teacher-btn');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      showModal('Create Teacher', `
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" id="t-fullname" class="form-input">
        </div>
        <div class="form-group">
          <label class="form-label">Username</label>
          <input type="text" id="t-username" class="form-input">
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" id="t-password" class="form-input">
        </div>
        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input type="password" id="t-confirm" class="form-input">
        </div>
      `, [
        { label: 'Cancel', class: 'btn-outline' },
        { label: 'Create', class: 'btn-primary', onClick: async () => {
          const fullName = document.getElementById('t-fullname').value;
          const username = document.getElementById('t-username').value;
          const pwd = document.getElementById('t-password').value;
          const conf = document.getElementById('t-confirm').value;

          if (!username || !pwd) return showToast('Username and password required', 'error');
          if (pwd !== conf) return showToast('Passwords do not match', 'error');

          try {
            const res = await adminCreateTeacher(username, pwd, fullName);
            if (res.error) throw res.error;
            showToast('Teacher created successfully', 'success');
            setTimeout(() => window.location.reload(), 1000);
          } catch (err) {
            showToast(err.message || 'Creation failed', 'error');
          }
        }}
      ]);
    });
  }

  document.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('.edit-teacher-btn');
    const delBtn = e.target.closest('.delete-teacher-btn');

    if (editBtn) {
      const id = editBtn.dataset.id;
      const t = currentTeachers.find(x => x.id === id);
      if (t) {
        showModal('Edit Teacher', `
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" id="edit-t-fullname" class="form-input" value="${t.full_name || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Username</label>
            <input type="text" id="edit-t-username" class="form-input" value="${t.username || ''}">
          </div>
        `, [
          { label: 'Cancel', class: 'btn-outline' },
          { label: 'Save', class: 'btn-primary', onClick: async () => {
            const updates = {
              full_name: document.getElementById('edit-t-fullname').value,
              username: document.getElementById('edit-t-username').value
            };
            try {
              const res = await updateProfile(id, updates);
              if (res.error) throw res.error;
              showToast('Teacher updated', 'success');
              setTimeout(() => window.location.reload(), 1000);
            } catch (err) {
              showToast(err.message || 'Update failed', 'error');
            }
          }}
        ]);
      }
    }

    if (delBtn) {
      const id = delBtn.dataset.id;
      showModal('Delete Teacher', `
        <p>Are you sure you want to delete this teacher?</p>
      `, [
        { label: 'Cancel', class: 'btn-outline' },
        { label: 'Delete', class: 'btn-primary', onClick: async () => {
          try {
            const res = await adminDeleteUser(id);
            if (res.error) throw res.error;
            showToast('Teacher deleted', 'success');
            setTimeout(() => window.location.reload(), 1000);
          } catch (err) {
            showToast(err.message || 'Delete failed', 'error');
          }
        }}
      ]);
    }
  });
}
