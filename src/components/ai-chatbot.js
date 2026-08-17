import { sendMessage } from '../lib/ai.js';

let messages = [
  { role: 'assistant', content: "Hi! 👋 I'm your SmartPrep AI assistant. Select a category below and mention the question number you need help with, or just ask me anything about placements!" }
];

export function initChatbot() {
  // Check if already injected
  if (document.getElementById('chatbot-container')) return;

  const container = document.createElement('div');
  container.id = 'chatbot-container';
  
  container.innerHTML = `
    <div class="chatbot-panel hidden" id="chatbot-panel">
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <i class="mdi mdi-robot-outline"></i>
          <span>SmartPrep AI</span>
        </div>
        <button class="btn-icon" id="chatbot-close"><i class="mdi mdi-close"></i></button>
      </div>
      
      <div class="chatbot-context">
        <select id="chatbot-category" class="form-input">
          <option value="General">General Questions</option>
          <option value="Arithmetic Aptitude">Arithmetic Aptitude</option>
          <option value="Data Interpretation">Data Interpretation</option>
          <option value="Verbal Ability">Verbal Ability</option>
          <option value="Logical Reasoning">Logical Reasoning</option>
          <option value="Verbal Reasoning">Verbal Reasoning</option>
          <option value="Nonverbal Reasoning">Nonverbal Reasoning</option>
          <option value="General Knowledge">General Knowledge</option>
          <option value="Engineering">Engineering</option>
          <option value="Programming">Programming</option>
          <option value="Current Affairs">Current Affairs</option>
        </select>
      </div>
      
      <div class="chatbot-messages" id="chatbot-messages">
        <!-- Messages will be injected here -->
      </div>
      
      <div class="chatbot-input-area">
        <input type="text" id="chatbot-input" placeholder="Type your message..." autocomplete="off">
        <button class="btn btn-primary btn-icon" id="chatbot-send">
          <i class="mdi mdi-send"></i>
        </button>
      </div>
    </div>
    
    <button class="chatbot-fab" id="chatbot-fab" aria-label="Open AI Assistant">
      <i class="mdi mdi-robot"></i>
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
    el.innerHTML = `<div class="message-bubble">${msg.content}</div>`;
    container.appendChild(el);
  });
  
  container.scrollTop = container.scrollHeight;
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
      
      // Remove typing indicator
      const ti = document.getElementById('typing-indicator');
      if (ti) ti.remove();
      
      messages.push({ role: 'assistant', content: response });
      renderMessages();
    } catch (err) {
      console.error(err);
      const ti = document.getElementById('typing-indicator');
      if (ti) ti.remove();
      
      messages.push({ role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' });
      renderMessages();
    }
  };
  
  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}
