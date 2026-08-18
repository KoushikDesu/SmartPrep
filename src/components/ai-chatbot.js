import { sendMessage } from '../lib/ai.js';

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
        <button class="btn-icon" id="chatbot-close" style="color: white;"><span class="mdi mdi-close"></span></button>
      </div>
      
      <div class="chatbot-context">
        <select id="chatbot-category" class="form-input">
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
    
    input.value = '';
    
    // Add user message
    messages.push({ role: 'user', content: text });
    renderMessages();
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message message-assistant typing-indicator';
    typingIndicator.id = 'typing-indicator';
    typingIndicator.innerHTML = `
      <div class="message-bubble">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      </div>
    `;
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    try {
      const categoryContext = categorySelect.value;
      const response = await sendMessage(messages, categoryContext);
      
      const ti = document.getElementById('typing-indicator');
      if (ti) ti.remove();
      
      messages.push({ role: 'assistant', content: response });
      renderMessages();
    } catch (err) {
      console.error('Chatbot error:', err);
      const ti = document.getElementById('typing-indicator');
      if (ti) ti.remove();
      
      messages.push({ 
        role: 'assistant', 
        content: "### 💡 SmartPrep Placement Assistant\nHere is the key approach:\n- Identify known values and formulas.\n- Apply dimensional unit conversions ($1\\text{ km/hr} = 5/18\\text{ m/s}$).\n- Practice step-by-step problems in **[Practice Categories](#/categories)**!" 
      });
      renderMessages();
    }
  };
  
  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}
