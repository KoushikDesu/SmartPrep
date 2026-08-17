import { supabase } from '../../lib/supabase.js';
import { appState } from '../../main.js';

export async function renderTeacherDashboard() {
  const teacherName = appState.profile?.full_name || 'Professor';

  let questionsCount = 0;
  let studentsCount = 0;
  let notifsCount = 0;

  try {
    if (supabase) {
      const { count: qCount } = await supabase.from('questions').select('*', { count: 'exact', head: true });
      questionsCount = qCount || 0;

      const { count: sCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student');
      studentsCount = sCount || 0;

      const { count: nCount } = await supabase.from('notifications').select('*', { count: 'exact', head: true });
      notifsCount = nCount || 0;
    }
  } catch (error) {
    console.error('Error fetching teacher stats:', error);
  }

  return `
    <div class="page-container teacher-dashboard">
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2>Instructor Dashboard</h2>
          <p class="subtitle">Welcome back, <strong>${teacherName}</strong>! Manage test syllabus, student progress, and announcements.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <a href="#/teacher/questions" class="btn btn-primary btn-sm">
            <span class="mdi mdi-plus"></span> Add Question
          </a>
          <a href="#/teacher/notifications" class="btn btn-secondary btn-sm">
            <span class="mdi mdi-bullhorn-outline"></span> Post Notice
          </a>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(37, 99, 235, 0.12); color: #2563eb;">
            <span class="mdi mdi-help-box-multiple-outline"></span>
          </div>
          <div>
            <div class="stat-value">${questionsCount}</div>
            <div class="stat-label">Active Question Bank</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(16, 185, 129, 0.12); color: #059669;">
            <span class="mdi mdi-account-school-outline"></span>
          </div>
          <div>
            <div class="stat-value">${studentsCount}</div>
            <div class="stat-label">Enrolled Students</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(245, 158, 11, 0.12); color: #d97706;">
            <span class="mdi mdi-bell-badge-outline"></span>
          </div>
          <div>
            <div class="stat-value">${notifsCount}</div>
            <div class="stat-label">Broadcast Alerts</div>
          </div>
        </div>
      </div>

      <!-- Action & Navigation Hub -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        <div class="card" style="padding: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;">
            <span class="mdi mdi-file-document-edit-outline" style="font-size: 1.5rem; color: var(--color-primary);"></span>
            <h3 style="font-size: var(--text-lg);">Question Bank Studio</h3>
          </div>
          <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: 1.5rem;">
            Author new multiple-choice placement questions with options A, B, C, D, assign topic categories, and input step-by-step mathematical explanations.
          </p>
          <a href="#/teacher/questions" class="btn btn-primary btn-block btn-sm">
            Manage Questions &rarr;
          </a>
        </div>

        <div class="card" style="padding: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;">
            <span class="mdi mdi-account-group-outline" style="font-size: 1.5rem; color: var(--color-success);"></span>
            <h3 style="font-size: var(--text-lg);">Student Performance Tracking</h3>
          </div>
          <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: 1.5rem;">
            Review student accuracy percentages, questions attempted, and batch performance metrics across various placement modules.
          </p>
          <a href="#/teacher/students" class="btn btn-secondary btn-block btn-sm">
            Inspect Student Roster &rarr;
          </a>
        </div>

        <div class="card" style="padding: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;">
            <span class="mdi mdi-bullhorn-outline" style="font-size: 1.5rem; color: var(--color-warning);"></span>
            <h3 style="font-size: var(--text-lg);">Announcements & Drive Notices</h3>
          </div>
          <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: 1.5rem;">
            Broadcast campus recruitment notices, practice schedule alerts, and test guidelines directly to all registered students.
          </p>
          <a href="#/teacher/notifications" class="btn btn-secondary btn-block btn-sm">
            Post Announcement &rarr;
          </a>
        </div>
      </div>
    </div>
  `;
}
