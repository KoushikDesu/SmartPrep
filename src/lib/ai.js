import { GEMINI_API_KEY, GEMINI_MODEL } from '../config.js';

const FALLBACK_MODELS = [
  'gemini-2.5-flash',
  'gemini-1.5-flash',
  'gemini-2.0-flash-exp',
  'gemini-1.5-pro'
];

const DEFAULT_API_KEY = GEMINI_API_KEY;

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
    const catName = typeof category === 'string' ? category : (category.category || '');
    if (catName) prompt += `\n\nCURRENT CONTEXT: The student is currently studying the '${catName}' module.`;
  }
  if (questionContext) {
    prompt += `\nCURRENT QUESTION CONTEXT: ${JSON.stringify(questionContext)}`;
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

  const apiKey = DEFAULT_API_KEY;

  if (apiKey) {
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
            maxOutputTokens: 800,
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
        }
      } catch (err) {
        console.warn(`Model ${model} attempt error:`, err);
      }
    }
  }

  // Guaranteed intelligent offline / local placement tutor reasoning engine
  const lastUserQuery = messages[messages.length - 1]?.content || '';
  return getLocalTutorResponse(lastUserQuery, category);
}

/**
 * Local offline tutor fallback when network/API key is unavailable
 */
function getLocalTutorResponse(query, category = '') {
  const q = query.toLowerCase();

  if (q.includes('train') || q.includes('speed') || q.includes('distance') || q.includes('km/hr') || q.includes('m/s')) {
    return `### Speed, Time & Distance Reference:\n- **Speed = Distance / Time**\n- **km/hr to m/s:** Multiply by $\\frac{5}{18}$ (e.g. $72 \\times \\frac{5}{18} = 20\\text{ m/s}$)\n- **m/s to km/hr:** Multiply by $\\frac{18}{5}$\n- **Passing a platform:** $\\text{Time} = \\frac{\\text{Train Length} + \\text{Platform Length}}{\\text{Speed}}$\n- **Relative speed (opposite directions):** $u + v$\n- **Relative speed (same direction):** $u - v$\n\nPractice 30+ questions right now in **[Problems on Trains](#/practice/problems-on-trains)**!`;
  }

  if (q.includes('work') || q.includes('pipe') || q.includes('cistern') || q.includes('efficiency')) {
    return `### Time & Work Core Rules:\n- If A completes work in $n$ days, A's 1-day work = $\\frac{1}{n}$.\n- If A and B work together: $\\text{Time} = \\frac{xy}{x + y}$ days.\n- Work and Wages formula: $\\frac{M_1 \\times D_1 \\times H_1}{W_1} = \\frac{M_2 \\times D_2 \\times H_2}{W_2}$.\n\nJump into **[Time and Work Practice](#/practice/time-and-work)** to solve step-by-step problems!`;
  }

  if (q.includes('interest') || q.includes('compound') || q.includes('simple interest') || q.includes('principal')) {
    return `### Interest Formulas:\n- **Simple Interest (S.I.):** $\\text{S.I.} = \\frac{P \\times R \\times T}{100}$\n- **Total Amount:** $A = P + \\text{S.I.}$\n- **Compound Interest (C.I.):** $A = P\\left(1 + \\frac{R}{100}\\right)^n$\n- **2-Year Difference (C.I. - S.I.):** $\\text{Diff} = P\\left(\\frac{R}{100}\\right)^2$\n\nPractice in **[Simple Interest](#/practice/simple-interest)**!`;
  }

  if (q.includes('pointer') || q.includes('c') || q.includes('malloc') || q.includes('memory') || q.includes('programming')) {
    return `### C Pointers & Memory Concepts:\n- \`int *p = &var;\` — \`p\` stores the memory address of \`var\`.\n- \`*p\` dereferences the pointer to read/modify the stored value.\n- \`ptr + 1\` increments address by \`sizeof(*ptr)\` bytes.\n- Always free allocated memory: \`free(ptr); ptr = NULL;\`.\n\nPractice coding MCQs in **[Programming: C Pointers](#/practice/c-pointers)**!`;
  }

  if (q.includes('relation') || q.includes('blood') || q.includes('family') || q.includes('reasoning')) {
    return `### Blood Relations Tree Shortcuts:\n- Use **+** for Male, **-** for Female.\n- Use **=** for Married Couples, **-** for Siblings, and **|** for Parent-Child generations.\n- Maternal = Mother's side | Paternal = Father's side.\n\nPractice in **[Logical Reasoning: Blood Relations](#/practice/blood-relations)**!`;
  }

  if (q.includes('where') || q.includes('how') || q.includes('navigate') || q.includes('categories') || q.includes('profile')) {
    return `### SmartPrep Platform Sitemap:\n- 📚 **[Practice Categories](#/categories):** Explore Aptitude, Reasoning, Verbal, and Programming modules.\n- 📈 **[My Performance](#/profile):** View your questions attempted, accuracy percentage, and roll number.\n- 👨‍🏫 **[Teacher Studio](#/teacher):** Author new questions and view student accuracy roster.\n- 🛡️ **[Admin Overview](#/admin):** Manage accounts and faculty.\n\nWhat topic would you like to prepare next?`;
  }

  return `I am your SmartPrep placement AI mentor! I can help you solve aptitude calculations, explain logical reasoning puzzles, review C/Java code snippets, or guide you to any practice module on the website. Ask me any question or formula you'd like to understand!`;
}
