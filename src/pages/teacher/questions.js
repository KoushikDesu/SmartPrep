import { supabase } from '../../lib/supabase.js';
import { addQuestion } from '../../lib/questions.js';
import { showToast } from '../../components/toast.js';
import { showModal } from '../../components/modal.js';

const CATEGORY_OPTIONS = [
  { value: 'arithmetic-aptitude', label: 'Arithmetic Aptitude', topics: [
    'Problems on Trains', 'Time and Work', 'Time and Distance', 'Simple Interest',
    'Compound Interest', 'Profit and Loss', 'Partnership', 'Percentage',
    'Problems on Ages', 'Calendar', 'Clock', 'Average', 'Area',
    'Volume and Surface Area', 'Permutation and Combination', 'Numbers',
    'Problems on Numbers', 'HCF and LCM', 'Decimal Fraction', 'Simplification',
    'Square Root and Cube Root', 'Surds and Indices', 'Ratio and Proportion',
    'Chain Rule', 'Pipes and Cistern', 'Boats and Streams', 'Alligation or Mixture',
    'Logarithm', 'Races and Games', 'Stocks and Shares', 'Probability',
    'True Discount', "Banker's Discount", 'Odd Man Out and Series', 'Height and Distance'
  ]},
  { value: 'data-interpretation', label: 'Data Interpretation', topics: [
    'Table Charts', 'Pie Charts', 'Bar Charts', 'Line Charts'
  ]},
  { value: 'verbal-ability', label: 'Verbal Ability', topics: [
    'Spotting Errors', 'Synonyms', 'Antonyms', 'Sentence Completion',
    'Ordering of Sentences', 'Comprehension'
  ]},
  { value: 'logical-reasoning', label: 'Logical Reasoning', topics: [
    'Number Series', 'Letter and Symbol Series', 'Analogies',
    'Artificial Language', 'Blood Relations', 'Coding-Decoding'
  ]},
  { value: 'verbal-reasoning', label: 'Verbal Reasoning', topics: [
    'Logical Deduction', 'Letter and Symbol Series', 'Essential Part',
    'Analogies', 'Theme Detection', 'Cause and Effect'
  ]},
  { value: 'nonverbal-reasoning', label: 'Nonverbal Reasoning', topics: [
    'Series', 'Analogy', 'Classification', 'Mirror Images', 'Water Images', 'Paper Cutting'
  ]},
  { value: 'general-knowledge', label: 'General Knowledge', topics: [
    'Basic General Knowledge', 'General Science', 'World Geography', 'Indian History'
  ]},
  { value: 'engineering', label: 'Engineering', topics: [
    'Mechanical', 'Civil', 'ECE', 'EEE', 'CSE'
  ]},
  { value: 'programming', label: 'Programming', topics: [
    'C Basics', 'C++ OOP', 'Java Basics', 'Data Structures'
  ]},
];

let currentQuestions = [];

export async function renderTeacherQuestions() {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    currentQuestions = data || [];
  } catch (error) {
    console.error('Error fetching questions:', error);
    currentQuestions = [];
  }

  let tableContent = '';
  if (currentQuestions.length === 0) {
    tableContent = `
      <div class="empty-state">
        <span class="mdi mdi-file-question" style="font-size: 3rem; color: var(--color-text-light);"></span>
        <p>No questions added yet.</p>
      </div>
    `;
  } else {
    tableContent = `
      <div class="table-responsive">
        <table class="table" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--color-border); text-align: left;">
              <th style="padding: 1rem;">#</th>
              <th style="padding: 1rem;">Question</th>
              <th style="padding: 1rem;">Options</th>
              <th style="padding: 1rem;">Correct</th>
              <th style="padding: 1rem;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${currentQuestions.map((q, i) => `
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 1rem;">${i + 1}</td>
                <td style="padding: 1rem; max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${q.question_text}</td>
                <td style="padding: 1rem;">
                  A: ${q.option_a}<br>
                  B: ${q.option_b}<br>
                  C: ${q.option_c}<br>
                  D: ${q.option_d}
                </td>
                <td style="padding: 1rem; font-weight: bold;">${q.correct_option}</td>
                <td style="padding: 1rem; display: flex; gap: 0.5rem;">
                  <button class="btn btn-icon edit-q-btn" data-id="${q.id}" title="Edit"><span class="mdi mdi-pencil"></span></button>
                  <button class="btn btn-icon delete-q-btn" data-id="${q.id}" title="Delete" style="color: var(--color-error);"><span class="mdi mdi-trash-can"></span></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  return `
    <div class="teacher-questions fade-in">
      <div class="panel-header" style="margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1>Question Management</h1>
          <p>Add and manage questions.</p>
        </div>
        <button id="add-question-btn" class="btn btn-primary">
          <span class="mdi mdi-plus"></span> Add Question
        </button>
      </div>

      <div class="card" style="margin-bottom: 2rem;">
        <div class="filter-bar" style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
           <select class="form-input" style="max-width: 200px;">
             <option value="">All Categories</option>
           </select>
           <input type="text" class="form-input" placeholder="Search..." style="flex: 1;">
        </div>
        ${tableContent}
      </div>
    </div>
  `;
}

export function bindTeacherQuestions() {
  const addBtn = document.getElementById('add-question-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const catOptions = CATEGORY_OPTIONS.map(c => `<option value="${c.value}">${c.label}</option>`).join('');
      
      showModal('Add New Question', `
        <div class="form-group">
          <label class="form-label">Category</label>
          <select id="q-category" class="form-input">
            <option value="">Select Category</option>
            ${catOptions}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Topic / Subcategory</label>
          <select id="q-topic" class="form-input" disabled>
            <option value="">Select Category First</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Question Text</label>
          <textarea id="q-text" class="form-input" rows="3"></textarea>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Option A</label>
            <input type="text" id="q-opt-a" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">Option B</label>
            <input type="text" id="q-opt-b" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">Option C</label>
            <input type="text" id="q-opt-c" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">Option D</label>
            <input type="text" id="q-opt-d" class="form-input">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Correct Option</label>
          <select id="q-correct" class="form-input">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Explanation (Optional)</label>
          <textarea id="q-explanation" class="form-input" rows="2"></textarea>
        </div>
      `, [
        { label: 'Cancel', class: 'btn-outline' },
        { label: 'Save Question', class: 'btn-primary', onClick: async () => {
          const payload = {
            category_id: document.getElementById('q-category').value,
            subcategory_id: document.getElementById('q-topic').value, // mapping topic to subcategory
            question_text: document.getElementById('q-text').value,
            option_a: document.getElementById('q-opt-a').value,
            option_b: document.getElementById('q-opt-b').value,
            option_c: document.getElementById('q-opt-c').value,
            option_d: document.getElementById('q-opt-d').value,
            correct_option: document.getElementById('q-correct').value,
            explanation: document.getElementById('q-explanation').value
          };
          
          if (!payload.category_id || !payload.question_text || !payload.option_a || !payload.option_b) {
            return showToast('Please fill required fields', 'error');
          }

          try {
            const res = await addQuestion(payload);
            if (res.error) throw res.error;
            showToast('Question added successfully', 'success');
            setTimeout(() => window.location.reload(), 1000);
          } catch (err) {
            showToast(err.message || 'Error adding question', 'error');
          }
        }}
      ]);

      // Handle category change
      setTimeout(() => {
        const catSelect = document.getElementById('q-category');
        const topicSelect = document.getElementById('q-topic');
        if (catSelect && topicSelect) {
          catSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            const cat = CATEGORY_OPTIONS.find(c => c.value === val);
            if (cat) {
              topicSelect.disabled = false;
              topicSelect.innerHTML = cat.topics.map(t => `<option value="${t.toLowerCase().replace(/ /g, '-')}">${t}</option>`).join('');
            } else {
              topicSelect.disabled = true;
              topicSelect.innerHTML = '<option value="">Select Category First</option>';
            }
          });
        }
      }, 100);
    });
  }

  // Bind edit/delete
  document.addEventListener('click', async (e) => {
    const delBtn = e.target.closest('.delete-q-btn');
    if (delBtn) {
      const id = delBtn.dataset.id;
      showModal('Delete Question', '<p>Delete this question permanently?</p>', [
        { label: 'Cancel', class: 'btn-outline' },
        { label: 'Delete', class: 'btn-primary', onClick: async () => {
          try {
            const { error } = await supabase.from('questions').delete().eq('id', id);
            if (error) throw error;
            showToast('Question deleted', 'success');
            setTimeout(() => window.location.reload(), 1000);
          } catch (err) {
            showToast(err.message, 'error');
          }
        }}
      ]);
    }
  });
}
