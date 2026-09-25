import { GEMINI_API_KEY, GEMINI_MODEL } from '../config.js';
import { getDomainResponse } from './ai-knowledge.js';

const FALLBACK_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro'
];

/**
 * Retrieves the currently active Gemini API key
 */
export function getStoredApiKey() {
  return localStorage.getItem('smartprep_gemini_api_key') || 
         localStorage.getItem('gemini_api_key') || 
         GEMINI_API_KEY || '';
}

/**
 * Saves a user-provided Gemini API key
 */
export function setStoredApiKey(key) {
  if (key && key.trim().length > 5) {
    localStorage.setItem('smartprep_gemini_api_key', key.trim());
    return true;
  } else {
    localStorage.removeItem('smartprep_gemini_api_key');
    return false;
  }
}

/**
 * Builds comprehensive system prompt for SmartPrep AI tutor & guide
 */
export function buildSystemPrompt(category, questionContext) {
  let prompt = `You are SmartPrep AI, the ultimate expert placement preparation mentor and intelligent guide for the SmartPrep platform.

## Platform Sitemap & Routes:
- Categories & Study Hub: #/categories (Aptitude, Verbal, Reasoning, C Programming, SQL, Engineering, Current Affairs)
- Topic Practice: #/practice/:topicSlug (Problems on Trains, Time & Work, Pointers in C, SQL Queries, Blood Relations)
- Student Performance: #/profile (Accuracy %, Total Solved, College Roll No)
- Teacher Studio: #/teacher (Question Bank authoring, Roster)
- Admin Center: #/admin (User management)

## Instructions:
1. When asked about math, formulas, or aptitude problems (e.g. Relative Speed, Trains, Time & Work, Probability), explain the fundamental concept first, state the exact formulas clearly with LaTeX notation, and provide a clear step-by-step example.
2. For coding questions (C, C++, Java, SQL), provide clean, commented code snippets and explain execution steps.
3. Keep your answers concise, structured, friendly, and visually clear using markdown and bold titles.`;

  if (category && category !== 'General') {
    const catName = typeof category === 'string' ? category : (category.category || '');
    if (catName) prompt += `\n\nCURRENT TOPIC CONTEXT: The student is currently studying '${catName}'.`;
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
          console.warn(`Gemini API ${model} response not ok:`, response.status);
        }
      } catch (err) {
        console.warn(`Model ${model} attempt failed, trying next...`);
      }
    }
  }

  // Guaranteed intelligent offline / local placement tutor reasoning engine
  const lastUserQuery = messages[messages.length - 1]?.content || '';
  return getDomainResponse(lastUserQuery, category);
}
