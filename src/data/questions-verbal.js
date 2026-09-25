/**
 * SmartPrep — Comprehensive Verbal Ability Question Bank
 * Sourced from classic placement exams and IndiaBIX with grammar and lexical explanations.
 */

export const VERBAL_QUESTIONS = {
  // ─── SPOTTING ERRORS (15 FULL QUESTIONS) ──────────────────────────────────
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
    },
    {
      question_number: 4,
      question_text: 'Find the error: "The sceneries of Kashmir (A) / is very (B) / charming. (C) / No error (D)"',
      option_a: 'The sceneries of Kashmir',
      option_b: 'is very',
      option_c: 'charming.',
      option_d: 'No error',
      correct_option: 'A',
      explanation: '"Scenery" is an uncountable noun and does not have a plural form "sceneries". It should be "The scenery of Kashmir".'
    },
    {
      question_number: 5,
      question_text: 'Find the error: "I have (A) / many works (B) / to do. (C) / No error (D)"',
      option_a: 'I have',
      option_b: 'many works',
      option_c: 'to do.',
      option_d: 'No error',
      correct_option: 'B',
      explanation: '"Work" is an uncountable noun. It should be "much work" or "many pieces of work", not "many works".'
    },
    {
      question_number: 6,
      question_text: 'Find the error: "He told me (A) / that he has seen (B) / the movie yesterday. (C) / No error (D)"',
      option_a: 'He told me',
      option_b: 'that he has seen',
      option_c: 'the movie yesterday.',
      option_d: 'No error',
      correct_option: 'B',
      explanation: 'With past time adverbs like "yesterday", past tense must be used: "he had seen" or "he saw", not "he has seen".'
    },
    {
      question_number: 7,
      question_text: 'Find the error: "Each of the students (A) / were given (B) / a prize. (C) / No error (D)"',
      option_a: 'Each of the students',
      option_b: 'were given',
      option_c: 'a prize.',
      option_d: 'No error',
      correct_option: 'B',
      explanation: '"Each" is singular and takes a singular verb: "was given" instead of "were given".'
    },
    {
      question_number: 8,
      question_text: 'Find the error: "He is senior (A) / than me (B) / in service. (C) / No error (D)"',
      option_a: 'He is senior',
      option_b: 'than me',
      option_c: 'in service.',
      option_d: 'No error',
      correct_option: 'B',
      explanation: 'Latin comparatives like senior, junior, superior, inferior take the preposition "to", not "than": "senior to me".'
    },
    {
      question_number: 9,
      question_text: 'Find the error: "He walked (A) / ten miles (B) / by foot. (C) / No error (D)"',
      option_a: 'He walked',
      option_b: 'ten miles',
      option_c: 'by foot.',
      option_d: 'No error',
      correct_option: 'C',
      explanation: 'The correct idiomatic preposition is "on foot", not "by foot".'
    },
    {
      question_number: 10,
      question_text: 'Find the error: "Supposing if (A) / it rains (B) / what shall we do? (C) / No error (D)"',
      option_a: 'Supposing if',
      option_b: 'it rains',
      option_c: 'what shall we do?',
      option_d: 'No error',
      correct_option: 'A',
      explanation: '"Supposing" and "if" mean the same thing; using both together is redundant. Use either "Supposing" or "If".'
    },
    {
      question_number: 11,
      question_text: 'Find the error: "The committee (A) / have taken (B) / its unanimous decision. (C) / No error (D)"',
      option_a: 'The committee',
      option_b: 'have taken',
      option_c: 'its unanimous decision.',
      option_d: 'No error',
      correct_option: 'B',
      explanation: 'When a collective noun acts as a single unanimous unit with "its", it takes a singular verb: "has taken".'
    },
    {
      question_number: 12,
      question_text: 'Find the error: "Although he was late (A) / but he stopped (B) / to help the child. (C) / No error (D)"',
      option_a: 'Although he was late',
      option_b: 'but he stopped',
      option_c: 'to help the child.',
      option_d: 'No error',
      correct_option: 'B',
      explanation: '"Although" is followed by "yet" or a comma, not "but".'
    },
    {
      question_number: 13,
      question_text: 'Find the error: "Hardly had I arrived (A) / than it began (B) / to rain heavily. (C) / No error (D)"',
      option_a: 'Hardly had I arrived',
      option_b: 'than it began',
      option_c: 'to rain heavily.',
      option_d: 'No error',
      correct_option: 'B',
      explanation: '"Hardly" and "Scarcely" are followed by "when", not "than" (No sooner is followed by than).'
    },
    {
      question_number: 14,
      question_text: 'Find the error: "He prevented me (A) / to go (B) / there. (C) / No error (D)"',
      option_a: 'He prevented me',
      option_b: 'to go',
      option_c: 'there.',
      option_d: 'No error',
      correct_option: 'B',
      explanation: '"Prevent" takes the preposition "from" followed by a gerund: "prevented me from going there".'
    },
    {
      question_number: 15,
      question_text: 'Find the error: "Bread and butter (A) / are (B) / his favorite breakfast. (C) / No error (D)"',
      option_a: 'Bread and butter',
      option_b: 'are',
      option_c: 'his favorite breakfast.',
      option_d: 'No error',
      correct_option: 'B',
      explanation: 'When two nouns express a single compound idea or item of food, they take a singular verb: "is his favorite breakfast".'
    }
  ],

  // ─── SYNONYMS (15 FULL QUESTIONS) ─────────────────────────────────────────
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
    },
    {
      question_number: 4,
      question_text: 'Choose the word most SIMILAR in meaning to: "DILIGENT"',
      option_a: 'Hardworking',
      option_b: 'Lazy',
      option_c: 'Proud',
      option_d: 'Careless',
      correct_option: 'A',
      explanation: 'DILIGENT means showing care and conscientiousness in one’s work or duties (Hardworking).'
    },
    {
      question_number: 5,
      question_text: 'Choose the word most SIMILAR in meaning to: "EMPATHY"',
      option_a: 'Cruelty',
      option_b: 'Understanding',
      option_c: 'Hostility',
      option_d: 'Apathy',
      correct_option: 'B',
      explanation: 'EMPATHY is the ability to understand and share the feelings of another.'
    },
    {
      question_number: 6,
      question_text: 'Choose the word most SIMILAR in meaning to: "FRUGAL"',
      option_a: 'Economical',
      option_b: 'Wasteful',
      option_c: 'Generous',
      option_d: 'Wealthy',
      correct_option: 'A',
      explanation: 'FRUGAL means sparing or economical with regard to money or food.'
    },
    {
      question_number: 7,
      question_text: 'Choose the word most SIMILAR in meaning to: "GARRULOUS"',
      option_a: 'Talkative',
      option_b: 'Quiet',
      option_c: 'Secretive',
      option_d: 'Dumb',
      correct_option: 'A',
      explanation: 'GARRULOUS means excessively talkative, especially on trivial matters.'
    },
    {
      question_number: 8,
      question_text: 'Choose the word most SIMILAR in meaning to: "IMPECCABLE"',
      option_a: 'Flawless',
      option_b: 'Damaged',
      option_c: 'Ugly',
      option_d: 'Ordinary',
      correct_option: 'A',
      explanation: 'IMPECCABLE means in accordance with the highest standards; faultless and flawless.'
    },
    {
      question_number: 9,
      question_text: 'Choose the word most SIMILAR in meaning to: "LUCID"',
      option_a: 'Clear',
      option_b: 'Murky',
      option_c: 'Confusing',
      option_d: 'Dark',
      correct_option: 'A',
      explanation: 'LUCID means expressed clearly; easy to understand.'
    },
    {
      question_number: 10,
      question_text: 'Choose the word most SIMILAR in meaning to: "METICULOUS"',
      option_a: 'Careful',
      option_b: 'Hasty',
      option_c: 'Negligent',
      option_d: 'Clumsy',
      correct_option: 'A',
      explanation: 'METICULOUS means showing great attention to detail; very careful and precise.'
    },
    {
      question_number: 11,
      question_text: 'Choose the word most SIMILAR in meaning to: "NOVICE"',
      option_a: 'Beginner',
      option_b: 'Veteran',
      option_c: 'Expert',
      option_d: 'Master',
      correct_option: 'A',
      explanation: 'NOVICE refers to a person new to and inexperienced in a job or situation (Beginner).'
    },
    {
      question_number: 12,
      question_text: 'Choose the word most SIMILAR in meaning to: "OBSOLETE"',
      option_a: 'Outdated',
      option_b: 'Modern',
      option_c: 'Recent',
      option_d: 'Fresh',
      correct_option: 'A',
      explanation: 'OBSOLETE means no longer produced or used; out of date.'
    },
    {
      question_number: 13,
      question_text: 'Choose the word most SIMILAR in meaning to: "PRAGMATIC"',
      option_a: 'Practical',
      option_b: 'Idealistic',
      option_c: 'Theoretical',
      option_d: 'Unrealistic',
      correct_option: 'A',
      explanation: 'PRAGMATIC means dealing with things sensibly and realistically based on practical considerations.'
    },
    {
      question_number: 14,
      question_text: 'Choose the word most SIMILAR in meaning to: "RESILIENT"',
      option_a: 'Tough',
      option_b: 'Fragile',
      option_c: 'Weak',
      option_d: 'Rigid',
      correct_option: 'A',
      explanation: 'RESILIENT means able to withstand or recover quickly from difficult conditions.'
    },
    {
      question_number: 15,
      question_text: 'Choose the word most SIMILAR in meaning to: "ZEALOUS"',
      option_a: 'Enthusiastic',
      option_b: 'Apathetic',
      option_c: 'Indifferent',
      option_d: 'Tired',
      correct_option: 'A',
      explanation: 'ZEALOUS means having or showing zeal; passionate and highly enthusiastic.'
    }
  ],

  // ─── ANTONYMS (15 FULL QUESTIONS) ─────────────────────────────────────────
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
    },
    {
      question_number: 3,
      question_text: 'Choose the word most OPPOSITE in meaning to: "ARROGANT"',
      option_a: 'Humble',
      option_b: 'Proud',
      option_c: 'Selfish',
      option_d: 'Rude',
      correct_option: 'A',
      explanation: 'ARROGANT means having an exaggerated sense of one’s own importance. HUMBLE is its direct opposite.'
    },
    {
      question_number: 4,
      question_text: 'Choose the word most OPPOSITE in meaning to: "ABUNDANT"',
      option_a: 'Scarce',
      option_b: 'Plenty',
      option_c: 'Full',
      option_d: 'Heavy',
      correct_option: 'A',
      explanation: 'ABUNDANT means existing in large quantities. SCARCE means in short supply.'
    },
    {
      question_number: 5,
      question_text: 'Choose the word most OPPOSITE in meaning to: "BRAVE"',
      option_a: 'Cowardly',
      option_b: 'Courageous',
      option_c: 'Bold',
      option_d: 'Strong',
      correct_option: 'A',
      explanation: 'BRAVE means showing courage. COWARDLY means lacking courage.'
    },
    {
      question_number: 6,
      question_text: 'Choose the word most OPPOSITE in meaning to: "TRANSPARENT"',
      option_a: 'Opaque',
      option_b: 'Clear',
      option_c: 'Bright',
      option_d: 'Fragile',
      correct_option: 'A',
      explanation: 'TRANSPARENT means allowing light to pass through. OPAQUE means not transparent.'
    },
    {
      question_number: 7,
      question_text: 'Choose the word most OPPOSITE in meaning to: "VIRTUE"',
      option_a: 'Vice',
      option_b: 'Goodness',
      option_c: 'Honor',
      option_d: 'Purity',
      correct_option: 'A',
      explanation: 'VIRTUE means moral excellence. VICE means an immoral habit or practice.'
    },
    {
      question_number: 8,
      question_text: 'Choose the word most OPPOSITE in meaning to: "LENIENT"',
      option_a: 'Strict',
      option_b: 'Gentle',
      option_c: 'Mild',
      option_d: 'Tolerant',
      correct_option: 'A',
      explanation: 'LENIENT means permissive or merciful. STRICT is its direct antonym.'
    },
    {
      question_number: 9,
      question_text: 'Choose the word most OPPOSITE in meaning to: "GUILTY"',
      option_a: 'Innocent',
      option_b: 'Criminal',
      option_c: 'Faulty',
      option_d: 'Responsible',
      correct_option: 'A',
      explanation: 'GUILTY means culpable of a crime. INNOCENT means free from guilt.'
    },
    {
      question_number: 10,
      question_text: 'Choose the word most OPPOSITE in meaning to: "HASTY"',
      option_a: 'Deliberate',
      option_b: 'Quick',
      option_c: 'Fast',
      option_d: 'Sudden',
      correct_option: 'A',
      explanation: 'HASTY means done with excessive speed or without caution. DELIBERATE means unhurried and careful.'
    },
    {
      question_number: 11,
      question_text: 'Choose the word most OPPOSITE in meaning to: "RIGID"',
      option_a: 'Flexible',
      option_b: 'Hard',
      option_c: 'Solid',
      option_d: 'Stiff',
      correct_option: 'A',
      explanation: 'RIGID means unable to bend or be forced out of shape. FLEXIBLE means capable of bending easily.'
    },
    {
      question_number: 12,
      question_text: 'Choose the word most OPPOSITE in meaning to: "CHAOS"',
      option_a: 'Order',
      option_b: 'Confusion',
      option_c: 'Disorder',
      option_d: 'Mess',
      correct_option: 'A',
      explanation: 'CHAOS means complete disorder and confusion. ORDER is the opposite state of harmony and arrangement.'
    },
    {
      question_number: 13,
      question_text: 'Choose the word most OPPOSITE in meaning to: "GENUINE"',
      option_a: 'Spurious',
      option_b: 'Authentic',
      option_c: 'Real',
      option_d: 'True',
      correct_option: 'A',
      explanation: 'GENUINE means authentic and real. SPURIOUS means counterfeit and false.'
    },
    {
      question_number: 14,
      question_text: 'Choose the word most OPPOSITE in meaning to: "HARMONY"',
      option_a: 'Discord',
      option_b: 'Peace',
      option_c: 'Agreement',
      option_d: 'Symphony',
      correct_option: 'A',
      explanation: 'HARMONY means agreement or accord. DISCORD means disagreement or strife.'
    },
    {
      question_number: 15,
      question_text: 'Choose the word most OPPOSITE in meaning to: "OPTIMISTIC"',
      option_a: 'Pessimistic',
      option_b: 'Hopeful',
      option_c: 'Cheerful',
      option_d: 'Confident',
      correct_option: 'A',
      explanation: 'OPTIMISTIC means hopeful and confident about the future. PESSIMISTIC means expecting the worst.'
    }
  ]
};
