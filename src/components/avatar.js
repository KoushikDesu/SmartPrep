/**
 * SmartPrep — Avatar Component
 * Renders default scholar badge for students, professor badge for teachers, and crown for admins.
 */

export function renderAvatar(profileOrRole, size = 'md') {
  let role = 'student';
  let name = 'Student';

  if (typeof profileOrRole === 'object' && profileOrRole !== null) {
    role = profileOrRole.role || 'student';
    name = profileOrRole.full_name || profileOrRole.username || 'User';
  } else if (typeof profileOrRole === 'string') {
    role = profileOrRole;
  }

  const roleLower = (role || 'student').toLowerCase();
  const sizeClass = size === 'lg' ? 'avatar-lg' : (size === 'sm' ? 'avatar-sm' : (size === 'xl' ? 'avatar-xl' : ''));

  if (roleLower === 'admin') {
    return `
      <div class="avatar avatar-admin ${sizeClass}" title="System Administrator (${name})">
        <span class="mdi mdi-shield-crown-outline"></span>
      </div>
    `;
  }

  if (roleLower === 'teacher') {
    return `
      <div class="avatar avatar-teacher ${sizeClass}" title="Faculty Instructor (${name})">
        <span class="mdi mdi-school-outline"></span>
      </div>
    `;
  }

  // Default Student / Scholar
  return `
    <div class="avatar avatar-student ${sizeClass}" title="Scholar Student (${name})">
      <span class="mdi mdi-account-school-outline"></span>
    </div>
  `;
}
