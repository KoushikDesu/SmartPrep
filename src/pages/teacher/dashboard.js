import { supabase } from '../../lib/supabase.js';
import { appState } from '../../main.js';

export async function renderTeacherDashboard() {
  let questionsCount = '—';
  let studentsCount = '—';
  let notifsCount = '—';

  try {
    const { count: qCount, error: qErr } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });
    if (!qErr) questionsCount = qCount;

    const { count: sCount, error: sErr } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student');
    if (!sErr) studentsCount = sCount;

    const { count: nCount, error: nErr } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('sender_id', appState.user?.id);
    if (!nErr) notifsCount = nCount;
  } catch (error) {
    console.error('Error fetching teacher stats:', error);
  }

  return `
    <div class="teacher-dashboard fade-in">
      <div class="panel-header">
        <h1>Teacher Dashboard</h1>
        <p>Welcome, ${appState.user?.user_metadata?.full_name || 'Teacher'}!</p>
      </div>

      <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <div class="stat-card card">
          <span class="mdi mdi-help-circle stat-icon" style="font-size: 2rem; color: var(--color-primary);"></span>
          <div class="stat-info">
            <h3>Questions Added</h3>
            <p class="stat-value" style="font-size: 1.5rem; font-weight: bold;">${questionsCount}</p>
          </div>
        </div>
        <div class="stat-card card">
          <span class="mdi mdi-account-school stat-icon" style="font-size: 2rem; color: var(--color-primary);"></span>
          <div class="stat-info">
            <h3>Students Tracked</h3>
            <p class="stat-value" style="font-size: 1.5rem; font-weight: bold;">${studentsCount}</p>
          </div>
        </div>
        <div class="stat-card card">
          <span class="mdi mdi-bell stat-icon" style="font-size: 2rem; color: var(--color-primary);"></span>
          <div class="stat-info">
            <h3>Notifications Sent</h3>
            <p class="stat-value" style="font-size: 1.5rem; font-weight: bold;">${notifsCount}</p>
          </div>
        </div>
      </div>

      <div class="quick-actions card" style="margin-bottom: 2rem;">
        <h2 style="margin-bottom: 1rem;">Quick Actions</h2>
        <div class="actions-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
          <button class="btn btn-primary" onclick="window.location.hash='#/teacher/questions'">
            <span class="mdi mdi-file-question"></span> Manage Questions
          </button>
          <button class="btn btn-primary" onclick="window.location.hash='#/teacher/students'">
            <span class="mdi mdi-account-group"></span> View Students
          </button>
          <button class="btn btn-primary" onclick="window.location.hash='#/teacher/notifications'">
            <span class="mdi mdi-bell-ring"></span> Send Notification
          </button>
        </div>
      </div>
      
      <div class="recent-activity card">
        <h2 style="margin-bottom: 1rem;">Recent Activity</h2>
        <p class="text-muted">Activity feed will appear here.</p>
      </div>
    </div>
  `;
}
