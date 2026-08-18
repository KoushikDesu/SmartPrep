import { showToast } from '../components/toast.js';
import { supabase } from '../lib/supabase.js';
import { getSeedQuestions } from '../data/seed-questions.js';
import { getTopicConcept } from '../data/topic-concepts.js';
import { saveProgress, hasAnswered } from '../lib/progress.js';
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
let lastAnsweredIndex = 0;

export async function renderPractice(topicSlug) {
  currentTopicSlug = topicSlug;
  
  // Track this topic in recently visited list
  try {
    const recent = JSON.parse(localStorage.getItem('smartprep_recent_modules') || '[]');
    const formatted = formatTitle(topicSlug);
    const existing = recent.filter(r => r.slug !== topicSlug);
    existing.unshift({
      title: formatted,
      slug: topicSlug,
      path: `#/practice/${topicSlug}`,
      icon: 'mdi-file-document-outline'
    });
    localStorage.setItem('smartprep_recent_modules', JSON.stringify(existing.slice(0, 5)));
  } catch (e) {}

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

  // Read saved resume index
  const savedResumeIndex = parseInt(localStorage.getItem(`smartprep_resume_${topicSlug}`) || '0', 10);
  currentIndex = (savedResumeIndex >= 0 && savedResumeIndex < questions.length) ? savedResumeIndex : 0;
  lastAnsweredIndex = currentIndex;

  const topicTitle = formatTitle(topicSlug);
  const concept = getTopicConcept(topicSlug);

  const formulasHtml = (concept.formulas || []).map(f => {
    if (typeof f === 'object') {
      return `
        <div class="formula-box">
          <div class="formula-title"><span class="mdi mdi-function-variant"></span> ${f.title}</div>
          <div class="formula-equation">${f.equation}</div>
        </div>
      `;
    }
    return `<div class="formula-box"><div class="formula-equation">${f}</div></div>`;
  }).join('');

  const tipsHtml = (concept.tips || []).map(t => `
    <li style="margin-bottom: 8px; display: flex; align-items: flex-start; gap: 6px;">
      <span class="mdi mdi-check-circle-outline" style="color: var(--color-success); font-size: 1.1rem; flex-shrink: 0; margin-top: 1px;"></span>
      <span>${t}</span>
    </li>
  `).join('');

  const linksHtml = (concept.studyLinks || []).map(l => `
    <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 6px 12px; display: inline-flex; align-items: center; gap: 4px;">
      <span class="mdi mdi-open-in-new"></span> ${l.title}
    </a>
  `).join('');

  return `
    <div class="page-container practice-page">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="back-bubble-btn" style="position: static; box-shadow: none;" onclick="window.history.back()" title="Back">
            <span class="mdi mdi-arrow-left"></span>
          </button>
          <div>
            <nav class="breadcrumb" style="margin-bottom: 2px;">
              <a href="#/categories">Categories</a>
              <span class="mdi mdi-chevron-right"></span>
              <span>${topicTitle}</span>
            </nav>
            <h2 style="font-size: var(--text-2xl);">${topicTitle}</h2>
          </div>
        </div>

        <!-- Top Action Buttons -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button id="toggle-concept-btn" class="btn btn-secondary btn-sm" style="background: rgba(37, 99, 235, 0.08); border-color: rgba(37, 99, 235, 0.25); color: var(--color-primary);">
            <span class="mdi mdi-book-open-outline"></span> Formulas & Concept
          </button>
          <button id="btn-jump-first" class="btn btn-secondary btn-sm">
            <span class="mdi mdi-page-first"></span> First Question
          </button>
          <button id="btn-jump-resume" class="btn btn-primary btn-sm">
            <span class="mdi mdi-restore"></span> Resume (Q${lastAnsweredIndex + 1})
          </button>
        </div>
      </div>

      <!-- Collapsible Formulas & Key Concepts Reference Card (HIDDEN BY DEFAULT) -->
      <div id="concept-reference-card" class="card hidden" style="margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary); background: var(--color-surface); padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 8px;">
          <h3 style="font-size: var(--text-lg); display: flex; align-items: center; gap: 8px; margin: 0;">
            <span class="mdi mdi-lightbulb-on-outline" style="color: var(--color-warning);"></span>
            ${concept.title}
          </h3>
          <button id="close-concept-btn" class="btn-icon" title="Hide Formulas">
            <span class="mdi mdi-close"></span>
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          <div>
            <h4 style="font-size: var(--text-sm); text-transform: uppercase; color: var(--color-primary); margin-bottom: 8px; letter-spacing: 0.05em;">
              Core Formulas & Theorems
            </h4>
            <div>
              ${formulasHtml}
            </div>
          </div>

          <div>
            <h4 style="font-size: var(--text-sm); text-transform: uppercase; color: var(--color-success); margin-bottom: 8px; letter-spacing: 0.05em;">
              Placement Exam Shortcuts & Tips
            </h4>
            <ul style="padding-left: 0.5rem; font-size: var(--text-sm); line-height: 1.6; color: var(--color-text-secondary); list-style: none;">
              ${tipsHtml}
            </ul>

            <h4 style="font-size: var(--text-sm); text-transform: uppercase; color: var(--color-text-secondary); margin-top: 12px; margin-bottom: 8px; letter-spacing: 0.05em;">
              Official Study References
            </h4>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${linksHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Small Gentle Helper Banner on Question 1 -->
      <div id="concept-hint-banner" class="concept-hint-banner">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="mdi mdi-lightbulb-on" style="color: var(--color-warning); font-size: 1.25rem;"></span>
          <span><strong>Quick Study Tip:</strong> Need formulas, shortcut equations or theory? Click <button id="open-concept-link" class="link-btn">Formulas & Concept</button> anytime!</span>
        </div>
        <button id="dismiss-hint-btn" class="btn-icon" title="Dismiss" style="padding: 2px;">
          <span class="mdi mdi-close"></span>
        </button>
      </div>

      <!-- Practice Question Container -->
      <div class="practice-container">
        <div class="practice-header">
          <div>
            <span class="badge badge-primary">Practice Mode</span>
          </div>
          <div class="progress-info">
            Question <span id="current-q-num">${currentIndex + 1}</span> of ${questions.length}
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
  const jumpFirstBtn = document.getElementById('btn-jump-first');
  const jumpResumeBtn = document.getElementById('btn-jump-resume');
  const toggleConceptBtn = document.getElementById('toggle-concept-btn');
  const closeConceptBtn = document.getElementById('close-concept-btn');
  const openConceptLink = document.getElementById('open-concept-link');
  const dismissHintBtn = document.getElementById('dismiss-hint-btn');
  const hintBanner = document.getElementById('concept-hint-banner');
  const conceptCard = document.getElementById('concept-reference-card');

  function toggleConcept() {
    if (conceptCard) {
      conceptCard.classList.toggle('hidden');
      if (!conceptCard.classList.contains('hidden')) {
        renderMathIn(conceptCard);
      }
    }
  }

  if (toggleConceptBtn) toggleConceptBtn.addEventListener('click', toggleConcept);
  if (openConceptLink) openConceptLink.addEventListener('click', toggleConcept);

  if (closeConceptBtn && conceptCard) {
    closeConceptBtn.addEventListener('click', () => {
      conceptCard.classList.add('hidden');
    });
  }

  if (dismissHintBtn && hintBanner) {
    dismissHintBtn.addEventListener('click', () => {
      hintBanner.style.display = 'none';
      localStorage.setItem('smartprep_hide_formula_tip', 'true');
    });
  }

  // Check if tip was previously dismissed
  if (localStorage.getItem('smartprep_hide_formula_tip') === 'true' && hintBanner) {
    hintBanner.style.display = 'none';
  }

  function renderMathIn(target) {
    if (window.renderMathInElement && target) {
      window.renderMathInElement(target, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }

  function attachOptionListeners() {
    const q = questions[currentIndex];
    if (!q) return;

    checkExistingAnswer(q);

    const options = container.querySelectorAll('.option-btn');
    const solutionPanel = container.querySelector('.solution-panel');

    options.forEach(btn => {
      btn.addEventListener('click', async () => {
        if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;

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

        if (solutionPanel) {
          solutionPanel.classList.remove('hidden');
          renderMathIn(solutionPanel);
        }

        localStorage.setItem(`smartprep_resume_${currentTopicSlug}`, currentIndex);
        lastAnsweredIndex = currentIndex;
        if (jumpResumeBtn) jumpResumeBtn.innerHTML = `<span class="mdi mdi-restore"></span> Resume (Q${lastAnsweredIndex + 1})`;

        try {
          const userId = appState.user?.id || 'guest';
          await saveProgress(userId, q.id || `local_${currentTopicSlug}_${currentIndex}`, selected, isCorrect, currentTopicSlug);
        } catch (e) {
          console.warn('Progress save status:', e);
        }
      });
    });
  }

  async function checkExistingAnswer(q) {
    try {
      const userId = appState.user?.id || 'guest';
      const qId = q.id || `local_${currentTopicSlug}_${currentIndex}`;
      const res = await hasAnswered(userId, qId);
      if (res && res.answered) {
        const solutionPanel = container.querySelector('.solution-panel');
        if (solutionPanel) {
          solutionPanel.classList.remove('hidden');
          renderMathIn(solutionPanel);
        }

        const selectedBtn = container.querySelector(`.option-btn[data-option="${res.selectedOption}"]`);
        const correctBtn = container.querySelector(`.option-btn[data-option="${q.correct_option}"]`);

        if (res.isCorrect) {
          if (selectedBtn) selectedBtn.classList.add('correct');
        } else {
          if (selectedBtn) selectedBtn.classList.add('wrong');
          if (correctBtn) correctBtn.classList.add('correct');
        }
      }
    } catch (e) {}
  }

  function updateView() {
    container.innerHTML = renderCurrentQuestion();
    if (numSpan) numSpan.textContent = currentIndex + 1;
    
    if (prevBtn) prevBtn.disabled = (currentIndex === 0);
    if (nextBtn) nextBtn.disabled = (currentIndex === questions.length - 1);
    
    localStorage.setItem(`smartprep_resume_${currentTopicSlug}`, currentIndex);
    attachOptionListeners();
    renderMathIn(container);
  }

  if (jumpFirstBtn) {
    jumpFirstBtn.addEventListener('click', () => {
      currentIndex = 0;
      updateView();
      showToast('Jumped to Question 1', 'info');
    });
  }

  if (jumpResumeBtn) {
    jumpResumeBtn.addEventListener('click', () => {
      const savedIndex = parseInt(localStorage.getItem(`smartprep_resume_${currentTopicSlug}`) || '0', 10);
      currentIndex = (savedIndex >= 0 && savedIndex < questions.length) ? savedIndex : 0;
      updateView();
      showToast(`Resumed at Question ${currentIndex + 1}`, 'info');
    });
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

  if (container) {
    attachOptionListeners();
    renderMathIn(container);
  }
}
