export function renderSidebar(profile) {
  const role = profile?.role || 'student';
  const currentHash = window.location.hash || '#/';
  
  const isActive = (path) => currentHash === path || currentHash.startsWith(path + '/') ? 'active' : '';

  const studentLinks = `
    <a href="#/categories" class="sidebar-item ${isActive('#/categories')}">
      <i class="mdi mdi-view-dashboard"></i> Dashboard
    </a>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">Practice</div>
    <a href="#/category/arithmetic-aptitude" class="sidebar-item ${isActive('#/category/arithmetic-aptitude')}">
      <i class="mdi mdi-calculator"></i> Arithmetic Aptitude
    </a>
    <a href="#/category/data-interpretation" class="sidebar-item ${isActive('#/category/data-interpretation')}">
      <i class="mdi mdi-chart-bar"></i> Data Interpretation
    </a>
    <a href="#/category/verbal-ability" class="sidebar-item ${isActive('#/category/verbal-ability')}">
      <i class="mdi mdi-format-text"></i> Verbal Ability
    </a>
    <a href="#/category/logical-reasoning" class="sidebar-item ${isActive('#/category/logical-reasoning')}">
      <i class="mdi mdi-head-lightbulb"></i> Logical Reasoning
    </a>
    <a href="#/category/verbal-reasoning" class="sidebar-item ${isActive('#/category/verbal-reasoning')}">
      <i class="mdi mdi-comment-processing"></i> Verbal Reasoning
    </a>
    <a href="#/category/nonverbal-reasoning" class="sidebar-item ${isActive('#/category/nonverbal-reasoning')}">
      <i class="mdi mdi-shape"></i> Nonverbal Reasoning
    </a>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">More</div>
    <a href="#/category/general-knowledge" class="sidebar-item ${isActive('#/category/general-knowledge')}">
      <i class="mdi mdi-earth"></i> General Knowledge
    </a>
    <a href="#/category/engineering" class="sidebar-item ${isActive('#/category/engineering')}">
      <i class="mdi mdi-cog"></i> Engineering
    </a>
    <a href="#/category/programming" class="sidebar-item ${isActive('#/category/programming')}">
      <i class="mdi mdi-code-braces"></i> Programming
    </a>
    <a href="#/category/current-affairs" class="sidebar-item ${isActive('#/category/current-affairs')}">
      <i class="mdi mdi-newspaper"></i> Current Affairs
    </a>
    <div class="sidebar-divider"></div>
    <a href="#/profile" class="sidebar-item ${isActive('#/profile')}">
      <i class="mdi mdi-account"></i> My Profile
    </a>
  `;

  const teacherLinks = `
    <div class="sidebar-section">Teacher Panel</div>
    <a href="#/teacher" class="sidebar-item ${isActive('#/teacher')}">
      <i class="mdi mdi-teach"></i> Teacher Dashboard
    </a>
    <a href="#/teacher/questions" class="sidebar-item ${isActive('#/teacher/questions')}">
      <i class="mdi mdi-file-question"></i> Manage Questions
    </a>
    <a href="#/teacher/students" class="sidebar-item ${isActive('#/teacher/students')}">
      <i class="mdi mdi-account-group"></i> Track Students
    </a>
    <a href="#/teacher/notifications" class="sidebar-item ${isActive('#/teacher/notifications')}">
      <i class="mdi mdi-bell-ring"></i> Send Notifications
    </a>
    <div class="sidebar-divider"></div>
  `;

  const adminLinks = `
    <div class="sidebar-section">Admin Panel</div>
    <a href="#/admin" class="sidebar-item ${isActive('#/admin')}">
      <i class="mdi mdi-shield-account"></i> Admin Dashboard
    </a>
    <a href="#/admin/users" class="sidebar-item ${isActive('#/admin/users')}">
      <i class="mdi mdi-account-multiple"></i> Manage Users
    </a>
    <a href="#/admin/teachers" class="sidebar-item ${isActive('#/admin/teachers')}">
      <i class="mdi mdi-teach"></i> Manage Teachers
    </a>
    <div class="sidebar-divider"></div>
  `;

  let content = '';
  if (role === 'admin') {
    content += adminLinks + teacherLinks + studentLinks;
  } else if (role === 'teacher') {
    content += teacherLinks + studentLinks;
  } else {
    content += studentLinks;
  }

  return `
    <aside class="sidebar">
      <div class="sidebar-content">
        ${content}
      </div>
    </aside>
  `;
}
