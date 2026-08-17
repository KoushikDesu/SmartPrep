import { supabase } from '../../lib/supabase.js';
import { updateProfile, adminChangePassword, adminDeleteUser } from '../../lib/auth.js';
import { showToast } from '../../components/toast.js';
import { showModal } from '../../components/modal.js';

let currentUsers = [];

export async function renderAdminUsers() {
  try {
    if (supabase) {
      const { data: users, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      currentUsers = users || [];
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    currentUsers = [];
  }

  const tableBody = currentUsers.length > 0 
    ? currentUsers.map(user => generateUserRow(user)).join('')
    : `<tr><td colspan="5" class="text-center" style="padding: 2.5rem;">No user accounts found.</td></tr>`;

  return `
    <div class="page-container admin-users">
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="back-bubble-btn" style="position: static; box-shadow: none;" onclick="window.history.back()" title="Back">
            <span class="mdi mdi-arrow-left"></span>
          </button>
          <div>
            <nav class="breadcrumb" style="margin-bottom: 2px;">
              <a href="#/admin">Admin Overview</a>
              <span class="mdi mdi-chevron-right"></span>
              <span>User Accounts</span>
            </nav>
            <h2>User Management</h2>
            <p class="subtitle">Search, edit roles, reset passwords, and manage all accounts</p>
          </div>
        </div>
      </div>

      <div class="card" style="padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div style="position: relative; max-width: 380px; width: 100%;">
            <input type="text" id="user-search-input" class="form-control" placeholder="Search by name, username, or roll number..." style="padding-left: 36px;">
            <span class="mdi mdi-magnify" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--color-text-tertiary);"></span>
          </div>
          <div style="font-size: var(--text-sm); color: var(--color-text-secondary);">
            Showing <strong id="user-count-display">${currentUsers.length}</strong> accounts
          </div>
        </div>

        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Roll Number</th>
                <th>Role</th>
                <th>Created</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="users-table-body">
              ${tableBody}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function generateUserRow(user) {
  const joinedDate = new Date(user.created_at || Date.now()).toLocaleDateString();
  const initials = (user.full_name || user.username || 'U').substring(0, 2).toUpperCase();
  const roleBadge = user.role === 'admin' 
    ? 'badge-error' 
    : (user.role === 'teacher' ? 'badge-warning' : 'badge-primary');

  return `
    <tr data-user-id="${user.id}">
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="avatar avatar-sm">${initials}</div>
          <div>
            <strong>${user.full_name || 'User'}</strong>
            <div style="font-size: 11px; color: var(--color-text-tertiary);">@${user.username}</div>
          </div>
        </div>
      </td>
      <td><strong>${user.roll_number || '—'}</strong></td>
      <td><span class="badge ${roleBadge}">${user.role || 'student'}</span></td>
      <td style="color: var(--color-text-secondary); font-size: var(--text-xs);">${joinedDate}</td>
      <td style="text-align: right;">
        <div style="display: inline-flex; gap: 6px;">
          <button class="btn btn-secondary btn-sm edit-user-btn" data-id="${user.id}" title="Edit Profile">
            <span class="mdi mdi-pencil"></span> Edit
          </button>
          <button class="btn btn-secondary btn-sm change-pwd-btn" data-id="${user.id}" title="Reset Password">
            <span class="mdi mdi-key-outline"></span> Reset
          </button>
          <button class="btn btn-danger btn-sm delete-user-btn" data-id="${user.id}" title="Delete User">
            <span class="mdi mdi-trash-can-outline"></span>
          </button>
        </div>
      </td>
    </tr>
  `;
}

export function bindAdminUsers() {
  const searchInput = document.getElementById('user-search-input');
  const countDisplay = document.getElementById('user-count-display');
  const tbody = document.getElementById('users-table-body');

  if (searchInput && tbody) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const filtered = currentUsers.filter(u => 
        (u.full_name && u.full_name.toLowerCase().includes(term)) ||
        (u.username && u.username.toLowerCase().includes(term)) ||
        (u.roll_number && u.roll_number.toLowerCase().includes(term))
      );
      if (countDisplay) countDisplay.textContent = filtered.length;
      tbody.innerHTML = filtered.length > 0 
        ? filtered.map(user => generateUserRow(user)).join('')
        : `<tr><td colspan="5" class="text-center" style="padding: 2.5rem;">No matching users found.</td></tr>`;
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
        showModal({
          title: `Edit User (@${user.username})`,
          body: `
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" id="edit-fullname" class="form-control" value="${user.full_name || ''}" required>
            </div>
            <div class="form-group">
              <label>Username</label>
              <input type="text" id="edit-username" class="form-control" value="${user.username || ''}" required>
            </div>
            <div class="form-group">
              <label>College Roll Number</label>
              <input type="text" id="edit-roll" class="form-control" value="${user.roll_number || ''}">
            </div>
            <div class="form-group">
              <label>Role</label>
              <select id="edit-role" class="form-control">
                <option value="student" ${user.role === 'student' ? 'selected' : ''}>Student</option>
                <option value="teacher" ${user.role === 'teacher' ? 'selected' : ''}>Teacher</option>
                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
              </select>
            </div>
          `,
          confirmText: 'Save Changes',
          cancelText: 'Cancel',
          onConfirm: async () => {
            const fullName = document.getElementById('edit-fullname').value.trim();
            const username = document.getElementById('edit-username').value.trim();
            const rollNumber = document.getElementById('edit-roll').value.trim();
            const role = document.getElementById('edit-role').value;

            if (!fullName || !username) {
              showToast('Full name and username are required', 'error');
              return false;
            }

            try {
              const res = await updateProfile(userId, {
                full_name: fullName,
                username: username,
                roll_number: rollNumber,
                role: role
              });
              if (res.error) throw res.error;
              showToast('User profile updated successfully!', 'success');
              
              // Update local state and UI
              user.full_name = fullName;
              user.username = username;
              user.roll_number = rollNumber;
              user.role = role;
              const row = document.querySelector(`tr[data-user-id="${userId}"]`);
              if (row) row.outerHTML = generateUserRow(user);
            } catch (err) {
              showToast(err.message || 'Update failed', 'error');
              return false;
            }
          }
        });
      }
    }

    if (pwdBtn) {
      const userId = pwdBtn.dataset.id;
      showModal({
        title: 'Reset Password',
        body: `
          <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: 1rem;">
            Enter a new password for this user account:
          </p>
          <div class="form-group">
            <label>New Password</label>
            <input type="password" id="new-user-pwd" class="form-control" placeholder="Enter at least 6 characters" required>
          </div>
        `,
        confirmText: 'Update Password',
        cancelText: 'Cancel',
        onConfirm: async () => {
          const pwd = document.getElementById('new-user-pwd').value;
          if (!pwd || pwd.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return false;
          }
          try {
            const res = await adminChangePassword(userId, pwd);
            if (res.error) throw res.error;
            showToast('Password updated successfully!', 'success');
          } catch (err) {
            showToast(err.message || 'Password update failed', 'error');
            return false;
          }
        }
      });
    }

    if (delBtn) {
      const userId = delBtn.dataset.id;
      showModal({
        title: 'Delete User Account',
        body: `
          <p style="color: var(--color-text); font-size: var(--text-sm);">
            Are you sure you want to permanently delete this user account? All corresponding progress and statistics will be removed.
          </p>
        `,
        confirmText: 'Delete Account',
        cancelText: 'Cancel',
        isDanger: true,
        onConfirm: async () => {
          try {
            const res = await adminDeleteUser(userId);
            if (res.error) throw res.error;
            showToast('User account deleted', 'success');
            currentUsers = currentUsers.filter(u => u.id !== userId);
            const row = document.querySelector(`tr[data-user-id="${userId}"]`);
            if (row) row.remove();
            if (countDisplay) countDisplay.textContent = currentUsers.length;
          } catch (err) {
            showToast(err.message || 'Delete failed', 'error');
            return false;
          }
        }
      });
    }
  });
}
