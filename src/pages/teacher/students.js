import { supabase } from '../../lib/supabase.js';
import { appState } from '../../main.js';
import { getStudentList } from '../../lib/progress.js';

export async function renderTeacherStudents() {
  let students = [];
  try {
    const res = await getStudentList(); // Assumes this function fetches students
    if (res.data) students = res.data;
  } catch (error) {
    console.error('Error fetching students:', error);
  }

  let tableContent = '';
  if (students.length === 0) {
    tableContent = `
      <div class="empty-state">
        <span class="mdi mdi-account-group" style="font-size: 3rem; color: var(--color-text-light);"></span>
        <p>No students found.</p>
      </div>
    `;
  } else {
    tableContent = `
      <div class="table-responsive">
        <table class="table" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--color-border); text-align: left;">
              <th style="padding: 1rem;">Name</th>
              <th style="padding: 1rem;">Roll Number</th>
              <th style="padding: 1rem;">Questions Attempted</th>
              <th style="padding: 1rem;">Accuracy</th>
              <th style="padding: 1rem;">Progress</th>
            </tr>
          </thead>
          <tbody>
            ${students.map(s => {
              const attempted = s.questions_attempted || 0;
              const accuracy = s.accuracy || 0;
              return `
                <tr style="border-bottom: 1px solid var(--color-border); cursor: pointer;" class="student-row" data-id="${s.id}">
                  <td style="padding: 1rem;">${s.full_name || s.username || 'Unknown'}</td>
                  <td style="padding: 1rem;">${s.roll_number || '—'}</td>
                  <td style="padding: 1rem;">${attempted}</td>
                  <td style="padding: 1rem;">${accuracy}%</td>
                  <td style="padding: 1rem;">
                    <div style="width: 100%; height: 8px; background: var(--color-surface-hover); border-radius: 4px; overflow: hidden;">
                      <div style="width: ${accuracy}%; height: 100%; background: var(--color-primary);"></div>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  return `
    <div class="teacher-students fade-in">
      <div class="panel-header" style="margin-bottom: 2rem;">
        <h1>Student Progress Tracking</h1>
        <p>Monitor student performance and progress.</p>
      </div>

      <div class="card" style="margin-bottom: 2rem;">
        <div class="search-bar" style="margin-bottom: 1.5rem;">
          <input type="text" id="student-search" class="form-input" placeholder="Search students..." style="width: 100%; max-width: 400px;">
        </div>
        ${tableContent}
      </div>
    </div>
  `;
}
