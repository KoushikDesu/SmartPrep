import { supabase } from '../../lib/supabase.js';

let currentStudents = [];

export async function renderTeacherStudents() {
  try {
    if (supabase) {
      const { data: students, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student')
        .order('created_at', { ascending: false });

      if (!error && students) {
        // Fetch progress for each student
        const { data: allProgress } = await supabase.from('user_progress').select('*');
        
        currentStudents = students.map(s => {
          const userProgs = (allProgress || []).filter(p => p.user_id === s.id);
          const attempted = userProgs.length;
          const correct = userProgs.filter(p => p.is_correct).length;
          const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
          return {
            ...s,
            attempted,
            correct,
            accuracy
          };
        });
      }
    }
  } catch (error) {
    console.error('Error fetching students:', error);
    currentStudents = [];
  }

  const tableBody = currentStudents.length > 0 
    ? currentStudents.map(s => generateStudentRow(s)).join('')
    : `<tr><td colspan="5" class="text-center" style="padding: 2.5rem;">No enrolled students found.</td></tr>`;

  return `
    <div class="page-container teacher-students">
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="back-bubble-btn" style="position: static; box-shadow: none;" onclick="window.history.back()" title="Back">
            <span class="mdi mdi-arrow-left"></span>
          </button>
          <div>
            <nav class="breadcrumb" style="margin-bottom: 2px;">
              <a href="#/teacher">Instructor Studio</a>
              <span class="mdi mdi-chevron-right"></span>
              <span>Student Tracking</span>
            </nav>
            <h2>Student Performance Roster</h2>
            <p class="subtitle">Real-time tracking of questions attempted, accuracy, and preparation progress</p>
          </div>
        </div>
      </div>

      <div class="card" style="padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div style="position: relative; max-width: 380px; width: 100%;">
            <input type="text" id="student-search-input" class="form-control" placeholder="Search by student name or roll number..." style="padding-left: 36px;">
            <span class="mdi mdi-magnify" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--color-text-tertiary);"></span>
          </div>
          <div style="font-size: var(--text-sm); color: var(--color-text-secondary);">
            Enrolled: <strong>${currentStudents.length}</strong> students
          </div>
        </div>

        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll Number</th>
                <th>Attempted</th>
                <th>Accuracy</th>
                <th style="width: 180px;">Performance</th>
              </tr>
            </thead>
            <tbody id="students-table-body">
              ${tableBody}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function generateStudentRow(s) {
  const initials = (s.full_name || s.username || 'S').substring(0, 2).toUpperCase();
  const accuracyColor = s.accuracy >= 75 ? 'var(--color-success)' : (s.accuracy >= 40 ? 'var(--color-warning)' : 'var(--color-text-secondary)');

  return `
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="avatar avatar-sm">${initials}</div>
          <div>
            <strong>${s.full_name || 'Student'}</strong>
            <div style="font-size: 11px; color: var(--color-text-tertiary);">@${s.username}</div>
          </div>
        </div>
      </td>
      <td><strong>${s.roll_number || '—'}</strong></td>
      <td>
        <strong>${s.attempted || 0}</strong> <span style="font-size: 11px; color: var(--color-text-tertiary);">questions</span>
      </td>
      <td>
        <span style="font-weight: 700; color: ${accuracyColor};">${s.accuracy || 0}%</span>
        <span style="font-size: 11px; color: var(--color-text-tertiary);">(${s.correct || 0} correct)</span>
      </td>
      <td>
        <div style="width: 100%; height: 8px; background: var(--color-surface-alt); border-radius: var(--radius-full); overflow: hidden; border: 1px solid var(--color-border);">
          <div style="width: ${s.accuracy || 0}%; height: 100%; background: ${s.accuracy >= 75 ? 'var(--color-success)' : 'var(--color-primary)'}; border-radius: var(--radius-full);"></div>
        </div>
      </td>
    </tr>
  `;
}
