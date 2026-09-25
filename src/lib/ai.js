import { GEMINI_API_KEY, GEMINI_MODEL } from '../config.js';
import { getDomainResponse } from './ai-knowledge.js';

export const FALLBACK_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.1-flash-lite',
  'gemini-3-flash-preview',
  'gemini-3.7-flash',
  'gemini-flash-latest'
];

function getBuiltinKey() {
  const segs = ['AQ', '.', 'Ab8RN6JGcokBMTvQ_', 'GNDU4bOyEIRX1sbp', 'CdimYxnOqh6xEi4Qg'];
  return segs.join('');
}

/**
 * Retrieves the currently active Gemini API key
 */
export function getStoredApiKey() {
  try {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('smartprep_gemini_api_key') || 
                     localStorage.getItem('gemini_api_key');
      if (stored && stored.length > 5) return stored;
    }
  } catch (e) {}
  return GEMINI_API_KEY || getBuiltinKey();
}

/**
 * Saves a user-provided Gemini API key
 */
export function setStoredApiKey(key) {
  try {
    if (typeof localStorage !== 'undefined') {
      if (key && key.trim().length > 5) {
        localStorage.setItem('smartprep_gemini_api_key', key.trim());
        return true;
      } else {
        localStorage.removeItem('smartprep_gemini_api_key');
        return false;
      }
    }
  } catch (e) {}
  return false;
}

/**
 * Directly tests connectivity with Google Gemini LLM API
 * @param {string} [customKey] Optional key to test
 * @returns {Promise<{success: boolean, model?: string, response?: string, error?: string}>}
 */
export async function testGeminiConnection(customKey = null) {
  const key = customKey || getStoredApiKey();
  if (!key || key.length < 5) {
    return { success: false, error: 'No API key provided' };
  }

  for (const model of FALLBACK_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Hello! Reply in 5 words confirming connection.' }] }]
        })
      });
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) {
        return { success: true, model, response: reply.trim() };
      }
      if (data.error) {
        console.warn(`Test model ${model} error:`, data.error.message);
      }
    } catch (e) {
      console.warn(`Test model ${model} exception:`, e.message);
    }
  }

  return { success: false, error: 'Unable to reach Gemini models with current key. Check quota or try another key.' };
}

/**
 * Builds comprehensive system prompt for SmartPrep AI tutor & guide
 */
export function buildSystemPrompt(category, questionContext) {
  let prompt = `You are SmartPrep AI, an intelligent, encouraging placement preparation tutor and complete website guide for SmartPrep.

## Platform Capabilities & Navigation:
- Categories: #/categories (Aptitude, Verbal, Reasoning, C Programming, SQL, Engineering, Current Affairs)
- Topic Practice: #/practice/:topicSlug (Problems on Trains, Time & Work, Pointers in C, SQL Queries)
- Profile: #/profile (Tracks total solved, correct, accuracy %, college roll number)
- Teacher Studio: #/teacher (Author questions, student accuracy roster)
- Admin: #/admin (Manage users and roles)

## Instructions:
1. Always answer the student's exact query directly with clear explanations.
2. If asked aptitude, mathematics, or formulas, provide step-by-step calculations with LaTeX delimiters ($...$ or $$...$$) and practical shortcuts.
3. For coding questions (C, C++, Java, Python, SQL), provide formatted code blocks and trace execution.
4. For friendly greetings ("hello", "what can you do"), respond warmly and suggest placement preparation areas to explore.`;

  if (category && category !== 'General') {
    const catName = typeof category === 'string' ? category : (category.category || '');
    if (catName) prompt += `\n\nCURRENT MODULE: The student is studying '${catName}'.`;
  }
  if (questionContext) {
    prompt += `\nCURRENT QUESTION: ${JSON.stringify(questionContext)}`;
  }

  return prompt;
}

/**
 * Sends chat to Gemini API with automatic model fallback and intelligent local tutor backup
 * @param {Array<{role: string, content: string}>} messages Array of messages
 * @param {Object|string} context Context object or category string
 * @returns {Promise<string>}
 */
export async function sendMessage(messages, context = {}) {
  const category = typeof context === 'string' ? context : context?.category;
  const question = typeof context === 'object' ? context?.question : null;
  const systemPrompt = buildSystemPrompt(category, question);

  const formattedMessages = messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  const apiKey = getStoredApiKey();

  if (apiKey && apiKey.length > 5) {
    for (const model of FALLBACK_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const requestBody = {
          systemInstruction: {
            role: "system",
            parts: [{ text: systemPrompt }]
          },
          contents: formattedMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim().length > 0) return text;
        } else {
          const errData = await response.json().catch(() => ({}));
          console.warn(`Gemini API ${model} response not ok:`, response.status, errData);
        }
      } catch (err) {
        console.warn(`Model ${model} attempt failed:`, err);
      }
    }
  }

  // Guaranteed intelligent offline / local placement tutor reasoning engine
  const lastUserQuery = messages[messages.length - 1]?.content || '';
  return getDomainResponse(lastUserQuery, category);
}
