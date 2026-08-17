import { supabase } from '../../lib/supabase.js';
import { appState } from '../../main.js';

export async function renderAdminDashboard() {
  let userCount = '—';
  let teacherCount = '—';
  let questionCount = '—';
  let categoryCount = '—';

  try {
    const { count: totalUsers, error: usersErr } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    if (!usersErr) userCount = totalUsers;

    const { count: totalTeachers, error: teachersErr } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'teacher');
    if (!teachersErr) teacherCount = totalTeachers;

    const { count: totalQuestions, error: questionsErr } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });
    if (!questionsErr) questionCount = totalQuestions;

    const { count: totalCategories, error: categoriesErr } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });
    if (!categoriesErr) categoryCount = totalCategories;
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
  }

  return `
    <div class="admin-dashboard fade-in">
      <div class="panel-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, ${appState.user?.user_metadata?.full_name || 'Admin'}!</p>
      </div>

      <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <div class="stat-card card">
          <span class="mdi mdi-account-group stat-icon" style="font-size: 2rem; color: var(--color-primary);"></span>
          <div class="stat-info">
            <h3>Total Users</h3>
            <p class="stat-value" style="font-size: 1.5rem; font-weight: bold;">${userCount}</p>
          </div>
        </div>
        <div class="stat-card card">
          <span class="mdi mdi-human-male-board stat-icon" style="font-size: 2rem; color: var(--color-primary);"></span>
          <div class="stat-info">
            <h3>Total Teachers</h3>
            <p class="stat-value" style="font-size: 1.5rem; font-weight: bold;">${teacherCount}</p>
          </div>
        </div>
        <div class="stat-card card">
          <span class="mdi mdi-help-circle stat-icon" style="font-size: 2rem; color: var(--color-primary);"></span>
          <div class="stat-info">
            <h3>Total Questions</h3>
            <p class="stat-value" style="font-size: 1.5rem; font-weight: bold;">${questionCount}</p>
          </div>
        </div>
        <div class="stat-card card">
          <span class="mdi mdi-shape stat-icon" style="font-size: 2rem; color: var(--color-primary);"></span>
          <div class="stat-info">
            <h3>Categories</h3>
            <p class="stat-value" style="font-size: 1.5rem; font-weight: bold;">${categoryCount}</p>
          </div>
        </div>
      </div>

      <div class="quick-actions card">
        <h2 style="margin-bottom: 1rem;">Quick Actions</h2>
        <div class="actions-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
          <button class="btn btn-primary" onclick="window.location.hash='#/admin/users'">
            <span class="mdi mdi-account-cog"></span> Manage Users
          </button>
          <button class="btn btn-primary" onclick="window.location.hash='#/admin/teachers'">
            <span class="mdi mdi-badge-account"></span> Manage Teachers
          </button>
          <button class="btn btn-outline" onclick="window.location.hash='#/teacher'">
            <span class="mdi mdi-presentation"></span> Teacher Panel
          </button>
        </div>
      </div>
    </div>
  `;
}
