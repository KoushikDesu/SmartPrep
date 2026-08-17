import { showToast } from '../components/toast.js';
import { supabase } from '../lib/supabase.js';
import { getSeedQuestions } from '../data/seed-questions.js';
import { saveProgress } from '../lib/progress.js';
import { appState } from '../main.js';

function formatTitle(slug) {
  if (!slug) return 'Practice';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

let currentIndex = 0;
let questions = [];
let currentTopicSlug = '';

export async function renderPractice(topicSlug) {
  currentTopicSlug = topicSlug;
  currentIndex = 0;
  
  // 1. Try to load from Supabase DB first
  try {
    if (supabase) {
      const { data: topicData } = await supabase
        .from('topics')
        .select('id, name')
        .eq('slug', topicSlug)
        .single();
        
      if (topicData) {
        const { data: qData } = await supabase
          .from('questions')
          .select('*')
          .eq('topic_id', topicData.id)
          .order('question_number', { ascending: true });
          
        if (qData && qData.length > 0) {
          questions = qData;
        }
      }
    }
  } catch (err) {
    console.log('Fetching from Supabase failed, using seed questions');
  }

  // 2. Fallback to seed questions
  if (!questions || questions.length === 0) {
    questions = getSeedQuestions(topicSlug);
  }

  // 3. Fallback to default questions if topic has no specific seeds
  if (!questions || questions.length === 0) {
    questions = getSeedQuestions('problems-on-trains');
  }

  const topicTitle = formatTitle(topicSlug);

  return `
    <div class="page-container practice-page">
      <nav class="breadcrumb">
        <a href="#/categories">Categories</a>
        <span class="mdi mdi-chevron-right"></span>
        <a href="#/category/general-aptitude">General Aptitude</a>
        <span class="mdi mdi-chevron-right"></span>
        <span>${topicTitle}</span>
      </nav>

      <div class="practice-container">
        <div class="practice-header">
          <div>
            <h2>${topicTitle}</h2>
            <p class="text-sm" style="color: var(--color-text-secondary); margin-top: 2px;">Multiple Choice Questions & Solutions</p>
          </div>
          <div class="progress-info">
            Question <span id="current-q-num">1</span> of ${questions.length}
          </div>
        </div>
        
        <div id="question-container">
          ${renderCurrentQuestion()}
        </div>

        <div class="practice-navigation">
          <button id="btn-prev" class="btn btn-secondary" ${currentIndex === 0 ? 'disabled' : ''}>
            <span class="mdi mdi-arrow-left"></span> Previous
          </button>
          <button id="btn-next" class="btn btn-primary" ${currentIndex === questions.length - 1 ? 'disabled' : ''}>
            Next <span class="mdi mdi-arrow-right"></span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderCurrentQuestion() {
  const q = questions[currentIndex];
  if (!q) return '<p class="text-center" style="padding: 2rem;">No questions found for this topic.</p>';
  
  return `
    <div class="question-card" data-id="${q.id || currentIndex + 1}">
      <div class="question-text">
        <span class="q-number">Q${q.question_number || (currentIndex + 1)}.</span>
        <div>${q.question_text.replace(/\n/g, '<br>')}</div>
      </div>
      
      <div class="options-container">
        <button class="option-btn" data-option="A">
          <span class="option-letter">A</span>
          <span class="option-text">${q.option_a}</span>
        </button>
        <button class="option-btn" data-option="B">
          <span class="option-letter">B</span>
          <span class="option-text">${q.option_b}</span>
        </button>
        <button class="option-btn" data-option="C">
          <span class="option-letter">C</span>
          <span class="option-text">${q.option_c}</span>
        </button>
        <button class="option-btn" data-option="D">
          <span class="option-letter">D</span>
          <span class="option-text">${q.option_d}</span>
        </button>
      </div>

      <div class="solution-panel hidden" id="solution-${q.id || currentIndex + 1}">
        <h4><span class="mdi mdi-lightbulb-on-outline"></span> Explanation & Solution</h4>
        <div class="explanation-content" style="margin-top: 8px;">
          ${(q.explanation || 'No explanation provided.').replace(/\n/g, '<br>')}
        </div>
      </div>
    </div>
  `;
}

export function bindPractice() {
  const container = document.getElementById('question-container');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const numSpan = document.getElementById('current-q-num');

  function attachOptionListeners() {
    const q = questions[currentIndex];
    if (!q) return;

    const options = container.querySelectorAll('.option-btn');
    const solutionPanel = container.querySelector('.solution-panel');

    options.forEach(btn => {
      btn.addEventListener('click', async () => {
        if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return; // Already answered

        const selected = btn.dataset.option;
        const correct = q.correct_option;
        const isCorrect = (selected === correct);

        if (isCorrect) {
          btn.classList.add('correct');
          showToast('Correct answer! 🎉', 'success');
        } else {
          btn.classList.add('wrong');
          const correctBtn = container.querySelector(`.option-btn[data-option="${correct}"]`);
          if (correctBtn) correctBtn.classList.add('correct');
          showToast('Incorrect option', 'error');
        }

        // Show explanation
        if (solutionPanel) solutionPanel.classList.remove('hidden');

        // Save progress if logged in
        if (appState.user && q.id) {
          try {
            await saveProgress(appState.user.id, q.id, selected, isCorrect);
          } catch (e) {
            console.log('Progress save status:', e);
          }
        }
      });
    });
  }

  function updateView() {
    container.innerHTML = renderCurrentQuestion();
    if (numSpan) numSpan.textContent = currentIndex + 1;
    
    if (prevBtn) prevBtn.disabled = (currentIndex === 0);
    if (nextBtn) nextBtn.disabled = (currentIndex === questions.length - 1);
    
    attachOptionListeners();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateView();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < questions.length - 1) {
        currentIndex++;
        updateView();
      }
    });
  }

  if (container) attachOptionListeners();
}
