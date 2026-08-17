import { GEMINI_API_KEY, GEMINI_MODEL } from '../config.js';

/**
 * Builds system prompt for Gemini
 * @param {string} category 
 * @param {number|string} questionNumber 
 * @returns {string}
 */
export function buildSystemPrompt(category, questionNumber) {
  let prompt = 'You are SmartPrep AI, a placement preparation assistant. You help students understand aptitude, reasoning, programming, and engineering concepts. Provide clear, step-by-step explanations. Be encouraging and educational.';
  
  if (category) {
    prompt += ` The user is currently practicing questions in the '${category}' category.`;
  }
  if (questionNumber) {
    prompt += ` They might ask about Question #${questionNumber}.`;
  }
  
  return prompt;
}

/**
 * Sends chat to Gemini API
 * @param {Array<{role: string, content: string}>} messages Array of messages
 * @param {Object} context Context object
 * @param {string} [context.category] Current category
 * @param {string|number} [context.questionNumber] Current question number
 * @returns {Promise<string>}
 */
export async function sendMessage(messages, context = {}) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const systemPrompt = buildSystemPrompt(context.category, context.questionNumber);
    
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    const requestBody = {
      systemInstruction: {
        role: "system",
        parts: [{ text: systemPrompt }]
      },
      contents: formattedMessages,
      generationConfig: {
        temperature: 0.7,
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to communicate with AI');
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'No response generated.';
  } catch (error) {
    console.error('AI Error:', error);
    throw error;
  }
}
