import { GEMINI_API_KEY, GEMINI_MODEL } from '../config.js';

const FALLBACK_MODELS = [
  GEMINI_MODEL,
  'gemini-2.5-flash',
  'gemini-1.5-flash',
  'gemini-2.0-flash-exp',
  'gemini-1.5-pro'
];

/**
 * Builds comprehensive system prompt for SmartPrep AI tutor & guide
 */
export function buildSystemPrompt(category, questionContext) {
  let prompt = `You are SmartPrep AI, an intelligent, encouraging placement preparation tutor and complete website guide for SmartPrep.

## Platform Capabilities & Navigation Sitemap:
- Study Hub & All Categories: #/categories (Features Arithmetic Aptitude, Data Interpretation, Verbal Ability, Logical Reasoning, Verbal Reasoning, Nonverbal Reasoning, General Knowledge, Engineering, Programming, Current Affairs).
- Topic Practice: #/category/:categorySlug (Lists specific topics such as Problems on Trains, Time & Work, Blood Relations, Pointers in C, SQL Queries, etc.).
- Active Practice Suite: #/practice/:topicSlug (Focused one-question-at-a-time practice with instant validation and step-by-step mathematical explanations).
- Student Performance Profile: #/profile (Tracks total questions solved, correct counts, accuracy %, roll number, and recommendations).
- Instructor Studio (for Teachers): #/teacher (Author questions, review student accuracy roster, broadcast recruitment drive announcements).
- Administration Center (for Admins): #/admin (Manage user roles, create faculty accounts, reset passwords).

## Your Role:
1. Explain aptitude, logical reasoning, programming (C, C++, Java, Python, SQL), and engineering concepts step-by-step with clear formulas, examples, and shortcuts.
2. Guide users seamlessly to the right section or practice module on the website when they ask where to study something.
3. Be encouraging, concise, highly educational, and format mathematical formulas clearly with bullet points.`;

  if (category) {
    prompt += `\n\nCURRENT CONTEXT: The student is currently in the '${category}' module.`;
  }
  if (questionContext) {
    prompt += `\nCURRENT QUESTION CONTEXT: ${JSON.stringify(questionContext)}`;
  }

  return prompt;
}

/**
 * Sends chat to Gemini API with automatic model fallback
 * @param {Array<{role: string, content: string}>} messages Array of messages
 * @param {Object} context Context object
 * @returns {Promise<string>}
 */
export async function sendMessage(messages, context = {}) {
  const apiKey = GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }

  const systemPrompt = buildSystemPrompt(context.category, context.question);

  const formattedMessages = messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  let lastError = null;

  // Try models in fallback order
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
        if (text) return text;
      } else {
        const errorData = await response.json().catch(() => ({}));
        lastError = new Error(errorData.error?.message || `Model ${model} returned status ${response.status}`);
      }
    } catch (err) {
      lastError = err;
    }
  }

  // If all Gemini API calls fail, provide intelligent local fallback guidance
  console.warn('All Gemini models failed, using intelligent assistant fallback:', lastError);
  return getLocalTutorResponse(messages[messages.length - 1]?.content || '');
}

/**
 * Local offline tutor fallback when network/API key is unavailable
 */
function getLocalTutorResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('train') || q.includes('speed') || q.includes('distance')) {
    return `### Speed, Time & Distance Formula Reference:\n- **Speed = Distance / Time**\n- **km/hr to m/s:** Multiply by 5/18 (e.g. $72 \\times \\frac{5}{18} = 20\\text{ m/s}$)\n- **m/s to km/hr:** Multiply by 18/5\n- **Two trains moving in opposite directions:** Relative speed = $u + v$\n- **Two trains in same direction:** Relative speed = $u - v$\n\nYou can practice 10+ questions on this directly in **[Arithmetic Aptitude: Problems on Trains](#/practice/problems-on-trains)**!`;
  }

  if (q.includes('work') || q.includes('pipe') || q.includes('time')) {
    return `### Time & Work Core Rule:\n- If A can do a piece of work in $n$ days, A's 1 day's work = $\\frac{1}{n}$.\n- If A is thrice as good a workman as B, Ratio of work done by A and B = $3:1$.\n\nHead over to **[Time and Work](#/practice/time-and-work)** to practice placement problems with full solutions!`;
  }

  if (q.includes('pointer') || q.includes('c') || q.includes('programming')) {
    return `### C Pointers Quick Guide:\n- \`int *p = &x;\` — \`p\` stores the memory address of variable \`x\`.\n- \`*p\` dereferences the pointer to access or modify the value stored at that address.\n- Pointer arithmetic: \`p + 1\` moves the pointer by \`sizeof(datatype)\` bytes.\n\nPractice C & Data Structure questions under **[Programming: C Basics](#/practice/c-pointers)**!`;
  }

  if (q.includes('where') || q.includes('how') || q.includes('guide') || q.includes('navigate')) {
    return `### SmartPrep Navigation Guide:\n- **All Modules:** Go to **[Categories](#/categories)** to explore Aptitude, Reasoning, and Programming.\n- **Your Performance:** Visit **[My Profile](#/profile)** to track accuracy and questions solved.\n- **Instructor Studio:** Log in as teacher to access **[Teacher Dashboard](#/teacher)**.\n\nLet me know which topic you would like help with!`;
  }

  return `I am your SmartPrep placement preparation assistant! I can help you solve aptitude formulas, explain logical reasoning puzzles, debug C/Java programming problems, or guide you to any practice module on the platform. What topic would you like to prepare today?`;
}
