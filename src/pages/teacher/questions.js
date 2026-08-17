import { supabase } from '../../lib/supabase.js';
import { showToast } from '../../components/toast.js';
import { showModal } from '../../components/modal.js';
import { appState } from '../../main.js';

let currentQuestions = [];
let availableTopics = [];

export async function renderTeacherQuestions() {
  try {
    if (supabase) {
      const { data: qData, error: qErr } = await supabase
        .from('questions')
        .select('*, topics(name, slug)')
        .order('created_at', { ascending: false });

      if (!qErr) currentQuestions = qData || [];

      const { data: tData } = await supabase
        .from('topics')
        .select('id, name, slug')
        .order('name', { ascending: true });
        
      availableTopics = tData || [];
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
    currentQuestions = [];
  }

  const tableBody = currentQuestions.length > 0
    ? currentQuestions.map((q, i) => generateQuestionRow(q, i)).join('')
    : `<tr><td colspan="5" class="text-center" style="padding: 2.5rem;">No questions added to the bank yet.</td></tr>`;

  return `
    <div class="page-container teacher-questions">
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <nav class="breadcrumb">
            <a href="#/teacher">Instructor Studio</a>
            <span class="mdi mdi-chevron-right"></span>
            <span>Question Bank</span>
          </nav>
          <h2>Question Bank Studio</h2>
          <p class="subtitle">Author, review, and manage practice multiple-choice questions</p>
        </div>
        <button id="add-question-btn" class="btn btn-primary">
          <span class="mdi mdi-plus-circle-outline"></span> Create Question
        </button>
      </div>

      <div class="card" style="padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div style="position: relative; max-width: 380px; width: 100%;">
            <input type="text" id="question-search-input" class="form-control" placeholder="Search by question text or topic..." style="padding-left: 36px;">
            <span class="mdi mdi-magnify" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--color-text-tertiary);"></span>
          </div>
          <div style="font-size: var(--text-sm); color: var(--color-text-secondary);">
            Total: <strong>${currentQuestions.length}</strong> questions
          </div>
        </div>

        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 45px;">#</th>
                <th>Topic</th>
                <th>Question Preview</th>
                <th>Answer</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="questions-table-body">
              ${tableBody}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function generateQuestionRow(q, index) {
  const topicName = q.topics?.name || 'Aptitude Topic';
  const previewText = (q.question_text || '').replace(/<[^>]*>?/gm, '');

  return `
    <tr data-question-id="${q.id}">
      <td><span style="font-weight: 600; color: var(--color-text-tertiary);">${index + 1}</span></td>
      <td><span class="badge badge-primary">${topicName}</span></td>
      <td style="max-width: 380px;">
        <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500;">
          ${previewText}
        </div>
        <div style="font-size: 11px; color: var(--color-text-tertiary); margin-top: 2px;">
          A: ${(q.option_a || '').substring(0, 20)}... | B: ${(q.option_b || '').substring(0, 20)}...
        </div>
      </td>
      <td>
        <span class="badge badge-success" style="font-weight: 700;">Option ${q.correct_option}</span>
      </td>
      <td style="text-align: right;">
        <div style="display: inline-flex; gap: 6px;">
          <button class="btn btn-secondary btn-sm view-q-btn" data-id="${q.id}" title="View Details">
            <span class="mdi mdi-eye-outline"></span> View
          </button>
          <button class="btn btn-danger btn-sm delete-q-btn" data-id="${q.id}" title="Delete Question">
            <span class="mdi mdi-trash-can-outline"></span>
          </button>
        </div>
      </td>
    </tr>
  `;
}

export function bindTeacherQuestions() {
  const searchInput = document.getElementById('question-search-input');
  const tbody = document.getElementById('questions-table-body');
  const addBtn = document.getElementById('add-question-btn');

  if (searchInput && tbody) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const filtered = currentQuestions.filter(q => 
        (q.question_text && q.question_text.toLowerCase().includes(term)) ||
        (q.topics?.name && q.topics.name.toLowerCase().includes(term)) ||
        (q.explanation && q.explanation.toLowerCase().includes(term))
      );
      tbody.innerHTML = filtered.length > 0 
        ? filtered.map((q, i) => generateQuestionRow(q, i)).join('')
        : `<tr><td colspan="5" class="text-center" style="padding: 2.5rem;">No matching questions found.</td></tr>`;
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const topicOptions = availableTopics.map(t => `<option value="${t.id}">${t.name}</option>`).join('');

      showModal({
        title: 'Add Question to Practice Bank',
        body: `
          <div class="form-group">
            <label>Select Practice Topic</label>
            <select id="new-q-topic" class="form-control">
              ${topicOptions || '<option value="">Problems on Trains</option>'}
            </select>
          </div>
          <div class="form-group">
            <label>Question Statement</label>
            <textarea id="new-q-text" class="form-control" rows="3" placeholder="Enter the problem statement..." required></textarea>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label>Option A</label>
              <input type="text" id="new-q-opt-a" class="form-control" placeholder="Option A text" required>
            </div>
            <div class="form-group">
              <label>Option B</label>
              <input type="text" id="new-q-opt-b" class="form-control" placeholder="Option B text" required>
            </div>
            <div class="form-group">
              <label>Option C</label>
              <input type="text" id="new-q-opt-c" class="form-control" placeholder="Option C text" required>
            </div>
            <div class="form-group">
              <label>Option D</label>
              <input type="text" id="new-q-opt-d" class="form-control" placeholder="Option D text" required>
            </div>
          </div>
          <div class="form-group">
            <label>Correct Option</label>
            <select id="new-q-correct" class="form-control">
              <option value="A">Option A</option>
              <option value="B">Option B</option>
              <option value="C">Option C</option>
              <option value="D">Option D</option>
            </select>
          </div>
          <div class="form-group">
            <label>Mathematical Explanation / Solution</label>
            <textarea id="new-q-exp" class="form-control" rows="3" placeholder="Step-by-step formula and solution..."></textarea>
          </div>
        `,
        confirmText: 'Save Question',
        cancelText: 'Cancel',
        onConfirm: async () => {
          const topicId = document.getElementById('new-q-topic')?.value || availableTopics[0]?.id;
          const qText = document.getElementById('new-q-text')?.value.trim();
          const optA = document.getElementById('new-q-opt-a')?.value.trim();
          const optB = document.getElementById('new-q-opt-b')?.value.trim();
          const optC = document.getElementById('new-q-opt-c')?.value.trim();
          const optD = document.getElementById('new-q-opt-d')?.value.trim();
          const correctOpt = document.getElementById('new-q-correct')?.value;
          const explanation = document.getElementById('new-q-exp')?.value.trim();

          if (!qText || !optA || !optB || !optC || !optD) {
            showToast('Please fill in question text and all 4 options', 'error');
            return false;
          }

          try {
            const { data, error } = await supabase.from('questions').insert({
              topic_id: topicId,
              question_number: currentQuestions.length + 1,
              question_text: qText,
              option_a: optA,
              option_b: optB,
              option_c: optC,
              option_d: optD,
              correct_option: correctOpt,
              explanation: explanation || 'Standard placement solution.',
              created_by: appState.user?.id
            }).select();

            if (error) throw error;
            showToast('Question successfully added to bank! 🎉', 'success');
            setTimeout(() => window.location.reload(), 800);
          } catch (err) {
            showToast(err.message || 'Failed to save question', 'error');
            return false;
          }
        }
      });
    });
  }

  document.addEventListener('click', async (e) => {
    const viewBtn = e.target.closest('.view-q-btn');
    const delBtn = e.target.closest('.delete-q-btn');

    if (viewBtn) {
      const qId = viewBtn.dataset.id;
      const q = currentQuestions.find(x => x.id === qId);
      if (q) {
        showModal({
          title: `Question Preview (${q.topics?.name || 'Aptitude'})`,
          body: `
            <div style="font-size: var(--text-base); font-weight: 600; color: var(--color-text); margin-bottom: 1rem;">
              ${q.question_text}
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 1rem;">
              <div style="padding: 8px 12px; border-radius: var(--radius-sm); background: ${q.correct_option === 'A' ? 'var(--color-success-bg)' : 'var(--color-surface-alt)'}; border: 1px solid ${q.correct_option === 'A' ? 'var(--color-success)' : 'var(--color-border)'};">
                <strong>A:</strong> ${q.option_a} ${q.correct_option === 'A' ? '✓ (Correct)' : ''}
              </div>
              <div style="padding: 8px 12px; border-radius: var(--radius-sm); background: ${q.correct_option === 'B' ? 'var(--color-success-bg)' : 'var(--color-surface-alt)'}; border: 1px solid ${q.correct_option === 'B' ? 'var(--color-success)' : 'var(--color-border)'};">
                <strong>B:</strong> ${q.option_b} ${q.correct_option === 'B' ? '✓ (Correct)' : ''}
              </div>
              <div style="padding: 8px 12px; border-radius: var(--radius-sm); background: ${q.correct_option === 'C' ? 'var(--color-success-bg)' : 'var(--color-surface-alt)'}; border: 1px solid ${q.correct_option === 'C' ? 'var(--color-success)' : 'var(--color-border)'};">
                <strong>C:</strong> ${q.option_c} ${q.correct_option === 'C' ? '✓ (Correct)' : ''}
              </div>
              <div style="padding: 8px 12px; border-radius: var(--radius-sm); background: ${q.correct_option === 'D' ? 'var(--color-success-bg)' : 'var(--color-surface-alt)'}; border: 1px solid ${q.correct_option === 'D' ? 'var(--color-success)' : 'var(--color-border)'};">
                <strong>D:</strong> ${q.option_d} ${q.correct_option === 'D' ? '✓ (Correct)' : ''}
              </div>
            </div>
            <div style="padding: 12px; background: var(--color-surface-alt); border-left: 3px solid var(--color-primary); border-radius: var(--radius-sm);">
              <strong style="color: var(--color-primary); font-size: var(--text-xs); text-transform: uppercase;">Explanation:</strong>
              <p style="font-size: var(--text-sm); margin-top: 4px; line-height: 1.5;">${q.explanation || 'No explanation provided.'}</p>
            </div>
          `,
          confirmText: 'Close',
          cancelText: ''
        });
      }
    }

    if (delBtn) {
      const qId = delBtn.dataset.id;
      showModal({
        title: 'Delete Question',
        body: `<p style="font-size: var(--text-sm);">Are you sure you want to permanently delete this question from the active practice bank?</p>`,
        confirmText: 'Delete Question',
        cancelText: 'Cancel',
        isDanger: true,
        onConfirm: async () => {
          try {
            const { error } = await supabase.from('questions').delete().eq('id', qId);
            if (error) throw error;
            showToast('Question removed', 'success');
            currentQuestions = currentQuestions.filter(x => x.id !== qId);
            const row = document.querySelector(`tr[data-question-id="${qId}"]`);
            if (row) row.remove();
          } catch (err) {
            showToast(err.message || 'Delete failed', 'error');
            return false;
          }
        }
      });
    }
  });
}
