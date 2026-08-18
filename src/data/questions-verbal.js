/**
 * SmartPrep — Comprehensive Verbal Ability Question Bank
 * Sourced from classic placement exams and IndiaBIX with grammar and lexical explanations.
 */

export const VERBAL_QUESTIONS = {
  // ─── SPOTTING ERRORS ──────────────────────────────────────────────────────
  'spotting-errors': [
    {
      question_number: 1,
      question_text: 'Find the error in the sentence: "He is (A) / one of the best player (B) / that I have seen. (C) / No error (D)"',
      option_a: 'He is',
      option_b: 'one of the best player',
      option_c: 'that I have seen.',
      option_d: 'No error',
      correct_option: 'B',
      explanation: 'After "one of the best", the noun must be plural: "one of the best players".'
    },
    {
      question_number: 2,
      question_text: 'Find the error: "Neither of the two candidates (A) / have paid (B) / their subscription. (C) / No error (D)"',
      option_a: 'Neither of the two candidates',
      option_b: 'have paid',
      option_c: 'their subscription.',
      option_d: 'No error',
      correct_option: 'B',
      explanation: '"Neither" is singular, so the auxiliary verb should be singular: "has paid" instead of "have paid".'
    },
    {
      question_number: 3,
      question_text: 'Find the error: "Unless you do not work hard (A) / you cannot pass (B) / the examination. (C) / No error (D)"',
      option_a: 'Unless you do not work hard',
      option_b: 'you cannot pass',
      option_c: 'the examination.',
      option_d: 'No error',
      correct_option: 'A',
      explanation: '"Unless" already contains a negative meaning. "Unless you do not work hard" is a double negative; it should be "Unless you work hard".'
    }
  ],

  // ─── SYNONYMS ─────────────────────────────────────────────────────────────
  'synonyms': [
    {
      question_number: 1,
      question_text: 'Choose the word most SIMILAR in meaning to: "ABANDON"',
      option_a: 'Try',
      option_b: 'Forsake',
      option_c: 'Cherish',
      option_d: 'Absorb',
      correct_option: 'B',
      explanation: 'ABANDON means to leave behind or give up. FORSAKE is its exact synonym.'
    },
    {
      question_number: 2,
      question_text: 'Choose the word most SIMILAR in meaning to: "BENEVOLENT"',
      option_a: 'Cruel',
      option_b: 'Generous',
      option_c: 'Greedy',
      option_d: 'Wicked',
      correct_option: 'B',
      explanation: 'BENEVOLENT means kindly, charitable, and generous.'
    },
    {
      question_number: 3,
      question_text: 'Choose the word most SIMILAR in meaning to: "CANDID"',
      option_a: 'Frank',
      option_b: 'Secretive',
      option_c: 'Dishonest',
      option_d: 'Shy',
      correct_option: 'A',
      explanation: 'CANDID means truthful, open, and straightforward (Frank).'
    }
  ],

  // ─── ANTONYMS ─────────────────────────────────────────────────────────────
  'antonyms': [
    {
      question_number: 1,
      question_text: 'Choose the word most OPPOSITE in meaning to: "ARTIFICIAL"',
      option_a: 'Red',
      option_b: 'Natural',
      option_c: 'Truthful',
      option_d: 'Solid',
      correct_option: 'B',
      explanation: 'ARTIFICIAL means man-made or synthetic. The direct antonym is NATURAL.'
    },
    {
      question_number: 2,
      question_text: 'Choose the word most OPPOSITE in meaning to: "EXPAND"',
      option_a: 'Convert',
      option_b: 'Condense',
      option_c: 'Congest',
      option_d: 'Conclude',
      correct_option: 'B',
      explanation: 'EXPAND means to become larger or increase in volume. CONDENSE means to compress or become smaller.'
    }
  ]
};
