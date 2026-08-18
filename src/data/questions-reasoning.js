/**
 * SmartPrep — Comprehensive Logical Reasoning Question Bank
 * Sourced from classic placement exams and IndiaBIX with step-by-step deductions.
 */

export const REASONING_QUESTIONS = {
  // ─── BLOOD RELATIONS ──────────────────────────────────────────────────────
  'blood-relations': [
    {
      question_number: 1,
      question_text: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
      option_a: 'Brother',
      option_b: 'Uncle',
      option_c: 'Cousin',
      option_d: 'Father',
      correct_option: 'D',
      explanation: 'Mother\'s only son = Suresh himself.\nSo, the boy is the son of Suresh.\nTherefore, Suresh is the father of the boy.'
    },
    {
      question_number: 2,
      question_text: 'If A is the brother of B; B is the sister of C; and C is the father of D, how is D related to A?',
      option_a: 'Brother',
      option_b: 'Sister',
      option_c: 'Nephew or Niece',
      option_d: 'Cannot be determined',
      correct_option: 'C',
      explanation: 'A, B, C are siblings (A: brother, B: sister, C: brother). D is the child of C. Since D\'s gender is not specified, D is either the Nephew or Niece of A.'
    },
    {
      question_number: 3,
      question_text: 'Introducing a man, a woman said, "His wife is the only daughter of my father." How is that man related to the woman?',
      option_a: 'Brother',
      option_b: 'Father-in-law',
      option_c: 'Husband',
      option_d: 'Maternal Uncle',
      correct_option: 'C',
      explanation: 'Only daughter of my father = The woman herself.\nSo the man\'s wife is the woman herself.\nTherefore, the man is the woman\'s husband.'
    },
    {
      question_number: 4,
      question_text: 'A and B are a married couple. X and Y are brothers. X is the brother of A. How is Y related to B?',
      option_a: 'Brother-in-law',
      option_b: 'Brother',
      option_c: 'Son-in-law',
      option_d: 'Cousin',
      correct_option: 'A',
      explanation: 'Since X and Y are brothers, and X is brother of A, Y is also brother of A.\nB is married to A, so Y is the brother-in-law of B.'
    },
    {
      question_number: 5,
      question_text: 'A\'s mother is sister of B and daughter of C. D is the daughter of B and sister of E. How is C related to E?',
      option_a: 'Sister-in-law',
      option_b: 'Grandmother or Grandfather',
      option_c: 'Aunt',
      option_d: 'Mother',
      correct_option: 'B',
      explanation: 'B and D\'s mother are children of C. Since E is sibling of D, E is also grandchild of C. Thus C is the Grandparent (Grandmother or Grandfather) of E.'
    }
  ],

  // ─── NUMBER SERIES ────────────────────────────────────────────────────────
  'number-series': [
    {
      question_number: 1,
      question_text: 'Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?',
      option_a: '(1/3)',
      option_b: '(1/8)',
      option_c: '(2/8)',
      option_d: '(1/16)',
      correct_option: 'B',
      explanation: 'Each number is divided by 2 to get the next number: (1/4) ÷ 2 = 1/8.'
    },
    {
      question_number: 2,
      question_text: 'Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?',
      option_a: '7',
      option_b: '10',
      option_c: '12',
      option_d: '13',
      correct_option: 'B',
      explanation: 'Alternating addition and subtraction: +3, -2, +3, -2, +3, -2...\n12 - 2 = 10.'
    },
    {
      question_number: 3,
      question_text: 'Look at this series: 36, 34, 30, 28, 24, ... What number should come next?',
      option_a: '20',
      option_b: '22',
      option_c: '23',
      option_d: '26',
      correct_option: 'B',
      explanation: 'Alternating subtraction: -2, -4, -2, -4, -2...\n24 - 2 = 22.'
    }
  ],

  // ─── CODING - DECODING ────────────────────────────────────────────────────
  'coding-decoding': [
    {
      question_number: 1,
      question_text: 'In a certain code, MONKEY is written as XDJMNL. How is TIGER written in that code?',
      option_a: 'SHFDQ',
      option_b: 'HFDSQ',
      option_c: 'RSAED',
      option_d: 'QDFHS',
      correct_option: 'D',
      explanation: 'The letters are reversed and then shifted by -1:\nY-1=X, E-1=D, K-1=J, N-1=M, O-1=N, M-1=L.\nFor TIGER: R-1=Q, E-1=D, G-1=F, I-1=H, T-1=S => QDFHS.'
    },
    {
      question_number: 2,
      question_text: 'If FRIEND is coded as HUMJTK, how is CANDLE coded in that code?',
      option_a: 'EDRIRL',
      option_b: 'DCQHQK',
      option_c: 'ESJFME',
      option_d: 'FYOBOC',
      correct_option: 'A',
      explanation: 'Pattern: +2, +3, +4, +5, +6, +7.\nC+2=E, A+3=D, N+4=R, D+5=I, L+6=R, E+7=L => EDRIRL.'
    }
  ],

  // ─── DIRECTION SENSE ──────────────────────────────────────────────────────
  'direction-sense-test': [
    {
      question_number: 1,
      question_text: 'A man walks 5 km toward South and then turns to the right. After walking 3 km he turns to the left and walks 5 km. Now in which direction is he from the starting place?',
      option_a: 'West',
      option_b: 'South',
      option_c: 'North-East',
      option_d: 'South-West',
      correct_option: 'D',
      explanation: 'He moves 5 km South, 3 km West, and 5 km South. His final coordinates relative to origin are (-3, -10), which is South-West.'
    },
    {
      question_number: 2,
      question_text: 'Rahul put his timepiece on the table in such a way that at 6 P.M. hour hand points to North. In which direction the minute hand will point at 9.15 P.M. ?',
      option_a: 'South-East',
      option_b: 'South',
      option_c: 'North',
      option_d: 'West',
      correct_option: 'D',
      explanation: 'At 6 PM, 6 on dial points North (inverted by 180°). At 9:15 PM, minute hand is at 3 (East in normal clock). Due to 180° inversion, it points West.'
    }
  ]
};
