import { supabase } from '../../lib/supabase.js';
import { updateProfile, adminChangePassword, adminDeleteUser } from '../../lib/auth.js';
import { showToast } from '../../components/toast.js';
import { showModal } from '../../components/modal.js';

let currentUsers = [];

export async function renderAdminUsers() {
  try {
    const { data: users, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    currentUsers = users || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    currentUsers = [];
  }

  let tableContent = '';
  if (currentUsers.length === 0) {
    tableContent = `
      <div class="empty-state">
        <span class="mdi mdi-account-off" style="font-size: 3rem; color: var(--color-text-light);"></span>
        <p>No users found.</p>
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
              <th style="padding: 1rem;">Roll Number</th>
              <th style="padding: 1rem;">Role</th>
              <th style="padding: 1rem;">Joined</th>
              <th style="padding: 1rem;">Actions</th>
            </tr>
          </thead>
          <tbody id="users-table-body">
            ${currentUsers.map(user => generateUserRow(user)).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  return `
    <div class="admin-users fade-in">
      <div class="panel-header" style="margin-bottom: 2rem;">
        <h1>User Management</h1>
        <p>Manage all users in the system.</p>
      </div>

      <div class="card" style="margin-bottom: 2rem;">
        <div class="search-bar" style="margin-bottom: 1.5rem;">
          <input type="text" id="user-search-input" class="form-input" placeholder="Search by name, username, or roll number..." style="width: 100%; max-width: 400px; padding: 0.5rem;">
        </div>
        ${tableContent}
      </div>
    </div>
  `;
}

function generateUserRow(user) {
  const joinedDate = new Date(user.created_at).toLocaleDateString();
  return `
    <tr style="border-bottom: 1px solid var(--color-border);">
      <td style="padding: 1rem;">${user.full_name || '—'}</td>
      <td style="padding: 1rem;">${user.username || '—'}</td>
      <td style="padding: 1rem;">${user.roll_number || '—'}</td>
      <td style="padding: 1rem;"><span class="badge" style="background: var(--color-surface-hover); padding: 0.2rem 0.5rem; border-radius: 4px;">${user.role || 'student'}</span></td>
      <td style="padding: 1rem;">${joinedDate}</td>
      <td style="padding: 1rem; display: flex; gap: 0.5rem;">
        <button class="btn btn-icon edit-user-btn" data-id="${user.id}" title="Edit User">
          <span class="mdi mdi-pencil"></span>
        </button>
        <button class="btn btn-icon change-pwd-btn" data-id="${user.id}" title="Change Password">
          <span class="mdi mdi-key"></span>
        </button>
        <button class="btn btn-icon delete-user-btn" data-id="${user.id}" title="Delete User" style="color: var(--color-error);">
          <span class="mdi mdi-trash-can"></span>
        </button>
      </td>
    </tr>
  `;
}

export function bindAdminUsers() {
  const searchInput = document.getElementById('user-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = currentUsers.filter(u => 
        (u.full_name && u.full_name.toLowerCase().includes(term)) ||
        (u.username && u.username.toLowerCase().includes(term)) ||
        (u.roll_number && u.roll_number.toLowerCase().includes(term))
      );
      const tbody = document.getElementById('users-table-body');
      if (tbody) {
        tbody.innerHTML = filtered.map(user => generateUserRow(user)).join('');
      }
    });
  }

  document.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('.edit-user-btn');
    const pwdBtn = e.target.closest('.change-pwd-btn');
    const delBtn = e.target.closest('.delete-user-btn');

    if (editBtn) {
      const userId = editBtn.dataset.id;
      const user = currentUsers.find(u => u.id === userId);
      if (user) {
        showModal('Edit User', `
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" id="edit-fullname" class="form-input" value="${user.full_name || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Username</label>
            <input type="text" id="edit-username" class="form-input" value="${user.username || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Roll Number</label>
            <input type="text" id="edit-roll" class="form-input" value="${user.roll_number || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Role</label>
            <select id="edit-role" class="form-input">
              <option value="student" ${user.role === 'student' ? 'selected' : ''}>Student</option>
              <option value="teacher" ${user.role === 'teacher' ? 'selected' : ''}>Teacher</option>
              <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
            </select>
          </div>
        `, [
          { label: 'Cancel', class: 'btn-outline' },
          { label: 'Save Changes', class: 'btn-primary', onClick: async () => {
            const updates = {
              full_name: document.getElementById('edit-fullname').value,
              username: document.getElementById('edit-username').value,
              roll_number: document.getElementById('edit-roll').value,
              role: document.getElementById('edit-role').value
            };
            try {
              const res = await updateProfile(userId, updates);
              if (res.error) throw res.error;
              showToast('User updated successfully', 'success');
              setTimeout(() => window.location.reload(), 1000);
            } catch (err) {
              showToast(err.message || 'Update failed', 'error');
            }
          }}
        ]);
      }
    }

    if (pwdBtn) {
      const userId = pwdBtn.dataset.id;
      showModal('Change Password', `
        <div class="form-group">
          <label class="form-label">New Password</label>
          <input type="password" id="new-pwd" class="form-input">
        </div>
      `, [
        { label: 'Cancel', class: 'btn-outline' },
        { label: 'Change Password', class: 'btn-primary', onClick: async () => {
          const pwd = document.getElementById('new-pwd').value;
          if (!pwd) return showToast('Password required', 'error');
          try {
            const res = await adminChangePassword(userId, pwd);
            if (res.error) throw res.error;
            showToast('Password changed successfully', 'success');
          } catch (err) {
            showToast(err.message || 'Password change failed', 'error');
          }
        }}
      ]);
    }

    if (delBtn) {
      const userId = delBtn.dataset.id;
      showModal('Delete User', `
        <p>Are you sure you want to delete this user? This action cannot be undone.</p>
      `, [
        { label: 'Cancel', class: 'btn-outline' },
        { label: 'Delete', class: 'btn-primary', onClick: async () => {
          try {
            const res = await adminDeleteUser(userId);
            if (res.error) throw res.error;
            showToast('User deleted', 'success');
            setTimeout(() => window.location.reload(), 1000);
          } catch (err) {
            showToast(err.message || 'Delete failed', 'error');
          }
        }}
      ]);
    }
  });
}
