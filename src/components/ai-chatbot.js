import { sendMessage, getStoredApiKey, setStoredApiKey, testGeminiConnection } from '../lib/ai.js';
import { showToast } from './toast.js';

let messages = [
  { role: 'assistant', content: "Hi! 👋 I'm your SmartPrep AI placement mentor. Ask me any aptitude question, coding doubt, formula, or ask for website navigation guidance!" }
];

function formatChatContent(content) {
  if (!content) return '';
  return content
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

export function initChatbot() {
  if (document.getElementById('chatbot-container')) return;

  const container = document.createElement('div');
  container.id = 'chatbot-container';
  
  container.innerHTML = `
    <div class="chatbot-panel hidden" id="chatbot-panel">
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <span class="mdi mdi-robot-outline"></span>
          <span>SmartPrep AI Tutor</span>
        </div>
        <div style="display: flex; align-items: center; gap: 4px;">
          <button class="btn-icon" id="chatbot-settings-btn" title="Configure Gemini API Key" style="color: white; font-size: 1.1rem;">
            <span class="mdi mdi-cog-outline"></span>
          </button>
          <button class="btn-icon" id="chatbot-close" style="color: white;"><span class="mdi mdi-close"></span></button>
        </div>
      </div>

      <!-- Settings Dropdown / Panel -->
      <div id="chatbot-settings-panel" class="hidden" style="padding: 10px 14px; background-color: var(--color-surface-alt); border-bottom: 1px solid var(--color-border); font-size: var(--text-xs);">
        <label style="display: block; font-weight: 600; margin-bottom: 4px; color: var(--color-text);">Google Gemini API Key:</label>
        <div style="display: flex; gap: 6px; margin-bottom: 6px;">
          <input type="password" id="gemini-key-input" class="form-input" style="padding: 4px 8px; font-size: var(--text-xs); flex: 1;" placeholder="Paste AI Studio API Key (AIzaSy...)" />
          <button id="save-gemini-key-btn" class="btn btn-primary" style="padding: 4px 10px; font-size: var(--text-xs);">Save</button>
          <button id="test-gemini-key-btn" class="btn btn-secondary" style="padding: 4px 10px; font-size: var(--text-xs);" title="Test Live LLM Connection">Test</button>
        </div>
        <div style="color: var(--color-text-tertiary); font-size: 10.5px; line-height: 1.3;">
          💡 Connects with Google Gemini 3.8 / 3.1 Flash LLMs. Paste your free Google AI Studio key to use your personal quota.
        </div>
      </div>
      
      <div class="chatbot-context">
        <select id="chatbot-category" class="form-input" style="font-size: var(--text-xs); padding: 6px 10px;">
          <option value="General">General / All Subjects</option>
          <option value="Arithmetic Aptitude">Arithmetic Aptitude</option>
          <option value="Data Interpretation">Data Interpretation</option>
          <option value="Verbal Ability">Verbal Ability</option>
          <option value="Logical Reasoning">Logical Reasoning</option>
          <option value="Programming">Programming (C, C++, Java, SQL)</option>
          <option value="Engineering">Engineering Subjects</option>
          <option value="Current Affairs">Current Affairs</option>
        </select>
      </div>
      
      <div class="chatbot-messages" id="chatbot-messages">
        <!-- Messages will be injected here -->
      </div>
      
      <div class="chatbot-input-area">
        <input type="text" id="chatbot-input" placeholder="Ask formulas, solve problems, or navigate..." autocomplete="off">
        <button class="btn btn-primary btn-icon" id="chatbot-send" title="Send message">
          <span class="mdi mdi-send"></span>
        </button>
      </div>
    </div>
    
    <button class="chatbot-fab" id="chatbot-fab" aria-label="Open AI Assistant" title="SmartPrep AI Assistant">
      <span class="mdi mdi-robot"></span>
      <div class="pulse-ring"></div>
    </button>
  `;
  
  document.body.appendChild(container);
  
  bindChatbot();
  renderMessages();
}

function renderMessages() {
  const container = document.getElementById('chatbot-messages');
  if (!container) return;
  
  container.innerHTML = '';
  
  messages.forEach(msg => {
    const el = document.createElement('div');
    el.className = `message message-${msg.role}`;
    el.innerHTML = `<div class="message-bubble">${formatChatContent(msg.content)}</div>`;
    container.appendChild(el);
  });
  
  container.scrollTop = container.scrollHeight;

  // Auto-render math in chat bubble if KaTeX is present
  setTimeout(() => {
    if (window.renderMathInElement) {
      window.renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }, 50);
}

function bindChatbot() {
  const fab = document.getElementById('chatbot-fab');
  const panel = document.getElementById('chatbot-panel');
  const closeBtn = document.getElementById('chatbot-close');
  const sendBtn = document.getElementById('chatbot-send');
  const input = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');
  const categorySelect = document.getElementById('chatbot-category');
  const settingsBtn = document.getElementById('chatbot-settings-btn');
  const settingsPanel = document.getElementById('chatbot-settings-panel');
  const keyInput = document.getElementById('gemini-key-input');
  const saveKeyBtn = document.getElementById('save-gemini-key-btn');
  const testKeyBtn = document.getElementById('test-gemini-key-btn');
  
  if (keyInput) {
    const existingKey = getStoredApiKey();
    if (existingKey) keyInput.value = existingKey;
  }

  if (settingsBtn && settingsPanel) {
    settingsBtn.addEventListener('click', () => {
      settingsPanel.classList.toggle('hidden');
    });
  }

  if (saveKeyBtn && keyInput) {
    saveKeyBtn.addEventListener('click', () => {
      const val = keyInput.value.trim();
      setStoredApiKey(val);
      if (val) {
        showToast('Gemini API Key saved successfully! 🚀', 'success', 1900);
      } else {
        showToast('Reset to default Gemini placement engine', 'info', 1900);
      }
      settingsPanel.classList.add('hidden');
    });
  }

  if (testKeyBtn && keyInput) {
    testKeyBtn.addEventListener('click', async () => {
      const val = keyInput.value.trim();
      showToast('Testing connection with Gemini LLM...', 'info', 1900);
      const res = await testGeminiConnection(val);
      if (res.success) {
        showToast(`✅ Connected to ${res.model}! Response: "${res.response}"`, 'success', 3500);
      } else {
        showToast(`❌ Connection issue: ${res.error}`, 'error', 3500);
      }
    });
  }

  const togglePanel = () => {
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
      input.focus();
    }
  };
  
  fab.addEventListener('click', togglePanel);
  closeBtn.addEventListener('click', togglePanel);
  
  const handleSend = async () => {
    const text = input.value.trim();
    if (!text) return;
    
    // Add User Message
    messages.push({ role: 'user', content: text });
    input.value = '';
    renderMessages();
    
    // Typing Indicator
    const typingEl = document.createElement('div');
    typingEl.className = 'message message-assistant typing-indicator-msg';
    typingEl.innerHTML = `
      <div class="message-bubble typing-indicator">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    `;
    messagesContainer.appendChild(typingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    try {
      const category = categorySelect.value;
      const response = await sendMessage(messages, { category });
      
      // Remove typing indicator
      const currentTyping = messagesContainer.querySelector('.typing-indicator-msg');
      if (currentTyping) currentTyping.remove();
      
      // Add Assistant Message
      messages.push({ role: 'assistant', content: response });
      renderMessages();
    } catch (err) {
      const currentTyping = messagesContainer.querySelector('.typing-indicator-msg');
      if (currentTyping) currentTyping.remove();
      
      messages.push({ role: 'assistant', content: "I'm having a brief connection hiccup, but feel free to ask again or browse the formula cards in practice mode!" });
      renderMessages();
    }
  };
  
  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  });
}
