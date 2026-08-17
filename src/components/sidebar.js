export function renderSidebar(profile) {
  const role = profile?.role || 'student';
  const currentHash = window.location.hash || '#/categories';
  
  const isActive = (path) => currentHash === path ? 'active' : '';

  const POPULAR_SLUGS = new Set(['arithmetic-aptitude', 'verbal-ability', 'logical-reasoning', 'c-programming', 'database']);

  // Fetch recent modules from localStorage
  let recentLinks = '';
  try {
    const raw = localStorage.getItem('smartprep_recent_modules');
    const recent = raw ? JSON.parse(raw) : [];
    // Filter out items that are already in popular modules
    const uniqueRecents = recent.filter(item => !POPULAR_SLUGS.has(item.slug));

    if (uniqueRecents.length > 0) {
      recentLinks = `
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-title">Recently Visited</div>
        ${uniqueRecents.map(item => `
          <a href="${item.path || `#/practice/${item.slug}`}" class="sidebar-link ${isActive(item.path)}">
            <span class="mdi ${item.icon || 'mdi-history'}"></span>
            <span>${item.title}</span>
          </a>
        `).join('')}
      `;
    }
  } catch (e) {
    recentLinks = '';
  }

  const studentSection = `
    <div class="sidebar-section-title">Study Hub</div>
    <a href="#/categories" class="sidebar-link ${isActive('#/categories')}">
      <span class="mdi mdi-grid-large"></span>
      <span>All Categories</span>
    </a>
    <a href="#/profile" class="sidebar-link ${isActive('#/profile')}">
      <span class="mdi mdi-chart-box-outline"></span>
      <span>My Performance</span>
    </a>

    <div class="sidebar-divider"></div>
    <div class="sidebar-section-title">Popular Modules</div>
    <a href="#/category/arithmetic-aptitude" class="sidebar-link ${isActive('#/category/arithmetic-aptitude')}">
      <span class="mdi mdi-calculator-variant-outline"></span>
      <span>Arithmetic Aptitude</span>
    </a>
    <a href="#/category/verbal-ability" class="sidebar-link ${isActive('#/category/verbal-ability')}">
      <span class="mdi mdi-text-box-search-outline"></span>
      <span>Verbal Ability</span>
    </a>
    <a href="#/category/logical-reasoning" class="sidebar-link ${isActive('#/category/logical-reasoning')}">
      <span class="mdi mdi-lightbulb-on-outline"></span>
      <span>Logical Reasoning</span>
    </a>
    <a href="#/category/c-programming" class="sidebar-link ${isActive('#/category/c-programming')}">
      <span class="mdi mdi-code-tags"></span>
      <span>C Programming</span>
    </a>
    <a href="#/category/database" class="sidebar-link ${isActive('#/category/database')}">
      <span class="mdi mdi-database-outline"></span>
      <span>Database & SQL</span>
    </a>

    ${recentLinks}
  `;

  const teacherSection = `
    <div class="sidebar-divider"></div>
    <div class="sidebar-section-title">Instructor Studio</div>
    <a href="#/teacher" class="sidebar-link ${isActive('#/teacher')}">
      <span class="mdi mdi-view-dashboard-outline"></span>
      <span>Teacher Dashboard</span>
    </a>
    <a href="#/teacher/questions" class="sidebar-link ${isActive('#/teacher/questions')}">
      <span class="mdi mdi-file-document-edit-outline"></span>
      <span>Question Bank</span>
    </a>
    <a href="#/teacher/students" class="sidebar-link ${isActive('#/teacher/students')}">
      <span class="mdi mdi-account-group-outline"></span>
      <span>Student Roster</span>
    </a>
    <a href="#/teacher/notifications" class="sidebar-link ${isActive('#/teacher/notifications')}">
      <span class="mdi mdi-bullhorn-outline"></span>
      <span>Announcements</span>
    </a>
  `;

  const adminSection = `
    <div class="sidebar-section-title">Administration</div>
    <a href="#/admin" class="sidebar-link ${isActive('#/admin')}">
      <span class="mdi mdi-shield-crown-outline"></span>
      <span>Admin Overview</span>
    </a>
    <a href="#/admin/users" class="sidebar-link ${isActive('#/admin/users')}">
      <span class="mdi mdi-account-multiple-outline"></span>
      <span>User Accounts</span>
    </a>
    <a href="#/admin/teachers" class="sidebar-link ${isActive('#/admin/teachers')}">
      <span class="mdi mdi-school-outline"></span>
      <span>Faculty Members</span>
    </a>
    <div class="sidebar-divider"></div>
  `;

  let navContent = '';
  if (role === 'admin') {
    navContent = adminSection + teacherSection + studentSection;
  } else if (role === 'teacher') {
    navContent = teacherSection + studentSection;
  } else {
    navContent = studentSection;
  }

  return `
    <aside class="sidebar">
      <nav class="sidebar-nav">
        ${navContent}
      </nav>
    </aside>
  `;
}
