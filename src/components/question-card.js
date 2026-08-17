import { saveProgress } from '../lib/progress.js';

export function renderQuestionCard(question, index, total, userAnswer = null) {
  if (!question) return '';

  const options = ['A', 'B', 'C', 'D'];
  const optionKeys = ['option_a', 'option_b', 'option_c', 'option_d'];
  
  let optionsHtml = '';
  
  for (let i = 0; i < 4; i++) {
    const optLabel = options[i];
    const optValue = question[optionKeys[i]];
    if (!optValue) continue;

    let classes = 'option-btn';
    
    if (userAnswer) {
      classes += ' disabled';
      if (optLabel === question.correct_option) {
        classes += ' correct';
      } else if (optLabel === userAnswer) {
        classes += ' wrong';
      }
    }

    optionsHtml += `
      <button class="${classes}" data-option="${optLabel}" ${userAnswer ? 'disabled' : ''}>
        <span class="option-label">${optLabel}</span>
        <span class="option-text">${optValue}</span>
      </button>
    `;
  }

  const solutionStyle = userAnswer ? 'style="display: block;"' : 'style="display: none;"';

  return `
    <div class="question-card" data-question-id="${question.id}" data-correct="${question.correct_option}">
      <div class="question-header">
        <span class="question-counter">Q ${index + 1} / ${total}</span>
      </div>
      <div class="question-text">
        <span class="question-number">${question.question_number}.</span>
        ${question.question_text}
      </div>
      
      <div class="options-container">
        ${optionsHtml}
      </div>
      
      <div class="solution-panel" ${solutionStyle}>
        <h4>Explanation:</h4>
        <p>${question.explanation || 'No explanation provided.'}</p>
      </div>

      <div class="question-navigation">
        <button class="btn btn-outline" id="prev-question" ${index === 0 ? 'disabled' : ''}>
          <i class="mdi mdi-arrow-left"></i> Previous
        </button>
        <button class="btn btn-primary" id="next-question" ${index === total - 1 ? 'disabled' : ''}>
          Next <i class="mdi mdi-arrow-right"></i>
        </button>
      </div>
    </div>
  `;
}

export function bindQuestionCard() {
  const card = document.querySelector('.question-card');
  if (!card) return;

  const questionId = card.dataset.questionId;
  const correctOption = card.dataset.correct;
  const optionBtns = card.querySelectorAll('.option-btn');
  const solutionPanel = card.querySelector('.solution-panel');
  
  optionBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      // If already answered, do nothing
      if (card.classList.contains('answered') || btn.classList.contains('disabled')) return;
      
      const selectedOption = btn.dataset.option;
      const isCorrect = selectedOption === correctOption;
      
      card.classList.add('answered');
      
      // Update UI
      optionBtns.forEach(ob => {
        ob.classList.add('disabled');
        ob.disabled = true;
        
        if (ob.dataset.option === correctOption) {
          ob.classList.add('correct');
        } else if (ob.dataset.option === selectedOption) {
          ob.classList.add('wrong');
        }
      });
      
      // Show solution with slide-down effect (CSS transition)
      solutionPanel.style.display = 'block';
      
      // Save progress
      try {
        await saveProgress(questionId, selectedOption, isCorrect);
      } catch (err) {
        console.error('Failed to save progress:', err);
      }
      
      // Dispatch event
      document.dispatchEvent(new CustomEvent('question-answered', {
        detail: {
          questionId,
          selectedOption,
          isCorrect
        }
      }));
    });
  });
}
