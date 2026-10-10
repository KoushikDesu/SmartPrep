/**
 * SmartPrep — 60-Question Category Mastery Test Engine
 * Structure:
 * - 20 Easy Questions
 * - 20 Medium Questions
 * - 20 Authentic Past Exam Questions (GATE & Placement PYQs)
 * Pass Condition: Minimum 35 correct answers (58.3%)
 * Result includes:
 * - Pass/Fail status
 * - Accuracy percentage
 * - Detailed breakdown: Easy, Medium, Past Papers
 * - Personalized development areas / recommendations
 * - Category Completion Gold Badge unlocked on pass!
 */

import { getSeedQuestions } from '../data/seed-questions.js';
import { GATE_QUESTIONS } from '../data/questions-gate.js';
import { showToast } from '../components/toast.js';
import { recordDailyActivity } from '../lib/streak.js';
import { appState } from '../main.js';

let testQuestions = [];
let userAnswers = {};
let currentCategorySlug = '';
let currentCategoryTitle = '';
let testSubmitted = false;

function formatTitle(slug) {
  if (!slug) return 'Mastery Test';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate a 60-question test: 20 Easy, 20 Medium, 20 Past Papers
 */
function buildMasteryTestQuestions(categorySlug) {
  const allPool = [];

  // Gather questions from related topics or general pool
  const basePool = getSeedQuestions(categorySlug) || [];
  allPool.push(...basePool);

  // If pool has fewer than 60, gather from general aptitude and technical pools
  const extraSlugs = [
    'problems-on-trains', 'time-and-distance', 'time-and-work',
    'percentage', 'profit-and-loss', 'simple-interest',
    'c-declarations', 'c-pointers', 'sql-queries', 'sql-joins',
    'blood-relations', 'number-series', 'syllogism'
  ];

  for (const s of extraSlugs) {
    const list = getSeedQuestions(s) || [];
    allPool.push(...list);
  }

  // Gather past papers pool
  const pyqPool = [];
  Object.values(GATE_QUESTIONS).forEach(branchQuestions => {
    pyqPool.push(...branchQuestions);
  });

  // Split base pool by difficulty
  const easyPool = allPool.filter(q => (q.difficulty || 'Medium') === 'Easy');
  const mediumPool = allPool.filter(q => (q.difficulty || 'Medium') === 'Medium' || !q.difficulty);
  const hardPool = allPool.filter(q => (q.difficulty || 'Medium') === 'Hard');

  // Fill up to 20 Easy
  const selectedEasy = [];
  for (let i = 0; i < 20; i++) {
    const q = easyPool[i % (easyPool.length || 1)] || allPool[i % allPool.length];
    selectedEasy.push({
      ...q,
      test_q_num: i + 1,
      section_tag: 'Easy Section',
      difficulty: 'Easy'
    });
  }

  // Fill up to 20 Medium
  const selectedMedium = [];
  for (let i = 0; i < 20; i++) {
    const q = mediumPool[i % (mediumPool.length || 1)] || allPool[(i + 5) % allPool.length];
    selectedMedium.push({
      ...q,
      test_q_num: 20 + i + 1,
      section_tag: 'Medium Section',
      difficulty: 'Medium'
    });
  }

  // Fill up to 20 Past Papers
  const selectedPYQ = [];
  for (let i = 0; i < 20; i++) {
    const q = pyqPool[i % (pyqPool.length || 1)] || hardPool[i % (hardPool.length || 1)] || allPool[(i + 10) % allPool.length];
    selectedPYQ.push({
      ...q,
      test_q_num: 40 + i + 1,
      section_tag: 'Past Papers / GATE PYQs',
      difficulty: q.difficulty || 'Hard'
    });
  }

  return [...selectedEasy, ...selectedMedium, ...selectedPYQ];
}

export async function renderMasteryTest(categorySlug) {
  currentCategorySlug = categorySlug;
  currentCategoryTitle = formatTitle(categorySlug);
  testQuestions = buildMasteryTestQuestions(categorySlug);
  userAnswers = {};
  testSubmitted = false;

  const testCardsHtml = testQuestions.map((q, idx) => {
    const diffBadge = q.difficulty === 'Easy'
      ? `<span class="badge badge-easy">Easy</span>`
      : (q.difficulty === 'Hard' ? `<span class="badge badge-hard">Hard</span>` : `<span class="badge badge-medium">Medium</span>`);

    return `
      <div class="question-card" id="test-q-${idx}" style="margin-bottom: 1.5rem; border-left: 3.5px solid var(--color-primary);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-weight: 800; font-size: 1rem; color: var(--color-primary);">Question ${idx + 1} of 60</span>
            <span class="badge badge-primary" style="font-size: 0.7rem;">${q.section_tag}</span>
          </div>
          ${diffBadge}
        </div>

        <div class="question-text" style="font-size: 0.95rem; margin-bottom: 1rem; line-height: 1.55;">
          ${(q.question_text || '').replace(/\n/g, '<br>')}
        </div>

        <div class="options-container test-options-grid" data-index="${idx}">
          <button class="option-btn mastery-opt-btn" data-index="${idx}" data-option="A">
            <span class="option-letter">A</span>
            <span class="option-text">${q.option_a || 'Option A'}</span>
          </button>
          <button class="option-btn mastery-opt-btn" data-index="${idx}" data-option="B">
            <span class="option-letter">B</span>
            <span class="option-text">${q.option_b || 'Option B'}</span>
          </button>
          <button class="option-btn mastery-opt-btn" data-index="${idx}" data-option="C">
            <span class="option-letter">C</span>
            <span class="option-text">${q.option_c || 'Option C'}</span>
          </button>
          <button class="option-btn mastery-opt-btn" data-index="${idx}" data-option="D">
            <span class="option-letter">D</span>
            <span class="option-text">${q.option_d || 'Option D'}</span>
          </button>
        </div>

        <div class="test-explanation hidden" id="test-exp-${idx}" style="margin-top: 1rem; padding: 12px 16px; background: rgba(37, 99, 235, 0.05); border-radius: var(--radius-md); font-size: 0.85rem; border: 1px solid var(--color-border);">
          <strong style="color: var(--color-primary);"><span class="mdi mdi-lightbulb-on"></span> Solution:</strong>
          <p style="margin-top: 4px; color: var(--color-text-secondary);">${(q.explanation || 'Solution recorded.').replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="page-container" style="max-width: 900px; margin: 0 auto;">
      <!-- Test Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="back-bubble-btn" style="position: static; box-shadow: none;" onclick="window.history.back()" title="Back">
            <span class="mdi mdi-arrow-left"></span>
          </button>
          <div>
            <nav class="breadcrumb" style="margin-bottom: 2px;">
              <a href="#/categories">Categories</a>
              <span class="mdi mdi-chevron-right"></span>
              <span>Mastery Test</span>
            </nav>
            <h2 style="font-size: var(--text-2xl);">${currentCategoryTitle} Mastery Test</h2>
            <p class="subtitle" style="font-size: var(--text-sm);">60 Questions: 20 Easy, 20 Medium, 20 Past Papers | Pass Requirement: 35/60</p>
          </div>
        </div>

        <div style="text-align: right;">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-secondary);">Answered: <span id="answered-counter" style="color: var(--color-primary); font-size: 1.1rem;">0</span> / 60</div>
          <span class="badge badge-warning" style="font-size: 0.72rem;">Min 35 to Master Category</span>
        </div>
      </div>

      <!-- Quick Section Jump Bar -->
      <div class="card" style="margin-bottom: 1.5rem; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <a href="#test-q-0" class="btn btn-secondary btn-sm" style="font-size: 11px;">
            <span class="badge badge-easy" style="padding: 2px 6px;">Q1-20</span> Easy
          </a>
          <a href="#test-q-20" class="btn btn-secondary btn-sm" style="font-size: 11px;">
            <span class="badge badge-medium" style="padding: 2px 6px;">Q21-40</span> Medium
          </a>
          <a href="#test-q-40" class="btn btn-secondary btn-sm" style="font-size: 11px;">
            <span class="badge badge-hard" style="padding: 2px 6px;">Q41-60</span> Past Papers
          </a>
        </div>

        <button id="submit-mastery-test-btn" class="btn btn-primary" style="padding: 8px 20px; font-weight: 700;">
          <span class="mdi mdi-send-check"></span> Submit Test
        </button>
      </div>

      <!-- Result Banner Modal / Container -->
      <div id="test-result-container" class="hidden" style="margin-bottom: 2rem;"></div>

      <!-- Question List -->
      <div id="mastery-questions-list">
        ${testCardsHtml}
      </div>

      <!-- Bottom Floating Submit Bar -->
      <div style="position: sticky; bottom: 20px; background: var(--color-surface); padding: 16px 20px; border-radius: var(--radius-lg); box-shadow: 0 10px 25px rgba(0,0,0,0.15); border: 1.5px solid var(--color-primary); display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; z-index: 10;">
        <div>
          <div style="font-weight: 700; font-size: 0.95rem;">Ready to evaluate?</div>
          <div style="font-size: 0.8rem; color: var(--color-text-secondary);">Score >= 35 completes the category and awards a Gold Mastery Badge!</div>
        </div>
        <button id="submit-mastery-test-bottom-btn" class="btn btn-primary btn-lg" style="font-weight: 800; padding: 10px 24px;">
          Submit Test Now <span class="mdi mdi-arrow-right"></span>
        </button>
      </div>
    </div>
  `;
}

export function bindMasteryTest() {
  const listContainer = document.getElementById('mastery-questions-list');
  const answeredCounter = document.getElementById('answered-counter');
  const submitBtnTop = document.getElementById('submit-mastery-test-btn');
  const submitBtnBottom = document.getElementById('submit-mastery-test-bottom-btn');
  const resultContainer = document.getElementById('test-result-container');

  if (listContainer) {
    listContainer.addEventListener('click', (e) => {
      if (testSubmitted) return;
      const optBtn = e.target.closest('.mastery-opt-btn');
      if (!optBtn) return;

      const idx = parseInt(optBtn.dataset.index, 10);
      const chosen = optBtn.dataset.option;

      // Deselect siblings
      const parent = optBtn.closest('.options-container');
      parent.querySelectorAll('.mastery-opt-btn').forEach(b => b.classList.remove('selected'));
      optBtn.classList.add('selected');

      userAnswers[idx] = chosen;
      if (answeredCounter) answeredCounter.textContent = Object.keys(userAnswers).length;
    });
  }

  async function evaluateTest() {
    if (testSubmitted) return;

    const answeredCount = Object.keys(userAnswers).length;
    if (answeredCount < 10) {
      if (!confirm(`You have only answered ${answeredCount} of 60 questions. Do you still wish to submit?`)) {
        return;
      }
    }

    testSubmitted = true;
    let score = 0;
    let easyCorrect = 0;
    let mediumCorrect = 0;
    let pyqCorrect = 0;

    testQuestions.forEach((q, idx) => {
      const userChoice = userAnswers[idx];
      const isCorrect = (userChoice === q.correct_option);

      if (isCorrect) {
        score++;
        if (idx < 20) easyCorrect++;
        else if (idx < 40) mediumCorrect++;
        else pyqCorrect++;
      }

      // Show solutions and mark correct/wrong buttons
      const card = document.getElementById(`test-q-${idx}`);
      if (card) {
        const selectedBtn = card.querySelector(`.mastery-opt-btn[data-option="${userChoice}"]`);
        const correctBtn = card.querySelector(`.mastery-opt-btn[data-option="${q.correct_option}"]`);
        if (selectedBtn) {
          if (isCorrect) selectedBtn.classList.add('correct');
          else selectedBtn.classList.add('wrong');
        }
        if (correctBtn) correctBtn.classList.add('correct');

        const expEl = document.getElementById(`test-exp-${idx}`);
        if (expEl) expEl.classList.remove('hidden');
      }
    });

    const accuracy = Math.round((score / 60) * 100);
    const passed = (score >= 35);

    // Record activity for daily streak
    try {
      const userId = appState.user?.id || 'guest';
      await recordDailyActivity(userId);
    } catch (e) {}

    // Save category completion state if passed
    if (passed) {
      try {
        const completedMap = JSON.parse(localStorage.getItem('smartprep_completed_categories') || '{}');
        completedMap[currentCategorySlug] = {
          score,
          accuracy,
          completedAt: new Date().toISOString()
        };
        localStorage.setItem('smartprep_completed_categories', JSON.stringify(completedMap));
      } catch (e) {}
    }

    // Determine targeted development areas based on mistakes
    const developmentAreas = [];
    if (easyCorrect < 14) {
      developmentAreas.push({
        area: 'Fundamental Formulas & Basic Concepts',
        tip: 'Review core definitions and arithmetic shortcuts. You scored ' + easyCorrect + '/20 on Easy fundamentals.'
      });
    }
    if (mediumCorrect < 12) {
      developmentAreas.push({
        area: 'Multi-Step Problem Solving & Time Management',
        tip: 'Practice speed calculation techniques and structured equation setups. You scored ' + mediumCorrect + '/20 on Medium problems.'
      });
    }
    if (pyqCorrect < 12) {
      developmentAreas.push({
        area: 'GATE & Standard Placement Past Papers',
        tip: 'Deep-dive into previous 5 years GATE papers. High-yield theoretical nuances require closer attention (' + pyqCorrect + '/20).'
      });
    }
    if (developmentAreas.length === 0) {
      developmentAreas.push({
        area: 'Exceptional Mastery Across All Tiers',
        tip: 'Outstanding accuracy across fundamentals, intermediate logic, and past exam questions!'
      });
    }

    // Render result container
    if (resultContainer) {
      resultContainer.classList.remove('hidden');
      resultContainer.innerHTML = `
        <div class="card" style="padding: 2rem; border-top: 6px solid ${passed ? '#10b981' : '#ef4444'}; text-align: center; background: var(--color-surface); box-shadow: 0 8px 30px rgba(0,0,0,0.12);">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">
            ${passed ? '🏆' : '📚'}
          </div>
          <h2 style="font-size: 1.75rem; color: ${passed ? '#10b981' : 'var(--color-text)'}; margin-bottom: 6px;">
            ${passed ? 'Category Mastered! 🎉' : 'Test Completed — Keep Practicing!'}
          </h2>
          <p style="color: var(--color-text-secondary); font-size: 0.95rem; max-width: 550px; margin: 0 auto 1.5rem auto;">
            ${passed
              ? `Congratulations! You scored ${score}/60 (${accuracy}%), passing the 35-mark threshold. This category is officially marked as <strong>Completed</strong> with a Gold Trophy Badge.`
              : `You scored ${score}/60 (${accuracy}%). You need at least 35 correct answers to complete this category. Review the detailed solutions below and retry!`}
          </p>

          <!-- Score Metrics Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            <div style="padding: 12px; background: rgba(37,99,235,0.06); border-radius: var(--radius-md);">
              <div style="font-size: 0.75rem; color: var(--color-text-secondary); text-transform: uppercase;">Total Score</div>
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary);">${score} / 60</div>
            </div>
            <div style="padding: 12px; background: rgba(16,185,129,0.08); border-radius: var(--radius-md);">
              <div style="font-size: 0.75rem; color: var(--color-text-secondary); text-transform: uppercase;">Accuracy</div>
              <div style="font-size: 1.5rem; font-weight: 800; color: #10b981;">${accuracy}%</div>
            </div>
            <div style="padding: 12px; background: rgba(16,185,129,0.06); border-radius: var(--radius-md);">
              <div style="font-size: 0.75rem; color: var(--color-text-secondary); text-transform: uppercase;">Easy Tier</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: #10b981;">${easyCorrect} / 20</div>
            </div>
            <div style="padding: 12px; background: rgba(245,158,11,0.06); border-radius: var(--radius-md);">
              <div style="font-size: 0.75rem; color: var(--color-text-secondary); text-transform: uppercase;">Medium Tier</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: #f59e0b;">${mediumCorrect} / 20</div>
            </div>
            <div style="padding: 12px; background: rgba(239,68,68,0.06); border-radius: var(--radius-md);">
              <div style="font-size: 0.75rem; color: var(--color-text-secondary); text-transform: uppercase;">Past Papers</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: #ef4444;">${pyqCorrect} / 20</div>
            </div>
          </div>

          <!-- Targeted Development Areas -->
          <div style="text-align: left; background: var(--color-background); padding: 1.25rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; border: 1px solid var(--color-border);">
            <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 6px; color: var(--color-primary);">
              <span class="mdi mdi-chart-timeline-variant"></span> Personalized Areas to Develop
            </h4>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${developmentAreas.map(d => `
                <div style="padding: 8px 12px; background: var(--color-surface); border-radius: var(--radius-md); border-left: 3px solid var(--color-warning);">
                  <strong style="font-size: 0.85rem; color: var(--color-text);">${d.area}</strong>
                  <p style="font-size: 0.8rem; color: var(--color-text-secondary); margin-top: 2px;">${d.tip}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
            <a href="#/categories" class="btn btn-secondary">
              <span class="mdi mdi-arrow-left"></span> Back to Categories
            </a>
            <button onclick="window.scrollTo({top: 500, behavior: 'smooth'})" class="btn btn-primary">
              <span class="mdi mdi-file-find"></span> Review All 60 Solutions
            </button>
          </div>
        </div>
      `;

      resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    showToast(passed ? '🎉 Congratulations! Category Mastered!' : 'Test Evaluated. Review solutions below.', passed ? 'success' : 'info', 2500);
  }

  if (submitBtnTop) submitBtnTop.addEventListener('click', evaluateTest);
  if (submitBtnBottom) submitBtnBottom.addEventListener('click', evaluateTest);
}
