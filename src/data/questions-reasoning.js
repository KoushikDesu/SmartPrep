/**
 * SmartPrep — Comprehensive Logical Reasoning Question Bank
 * Sourced from classic placement exams and IndiaBIX with step-by-step deductions.
 */

export const REASONING_QUESTIONS = {
  // ─── BLOOD RELATIONS (15 FULL QUESTIONS) ──────────────────────────────────
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
    },
    {
      question_number: 6,
      question_text: 'Pointing to a person, Deepak said, "His only brother is the father of my daughter\'s father." How is the person related to Deepak?',
      option_a: 'Father',
      option_b: 'Grandfather',
      option_c: 'Uncle',
      option_d: 'Brother-in-law',
      correct_option: 'C',
      explanation: 'Deepak\'s daughter\'s father = Deepak himself.\nFather of Deepak = Deepak\'s father.\nHis only brother is Deepak\'s father => That person is Deepak\'s Uncle.'
    },
    {
      question_number: 7,
      question_text: 'Pointing to a girl in the photograph, Amar said, "Her mother\'s brother is the only son of my mother\'s father." How is the girl\'s mother related to Amar?',
      option_a: 'Mother',
      option_b: 'Sister',
      option_c: 'Aunt',
      option_d: 'Grandmother',
      correct_option: 'A',
      explanation: 'Only son of Amar\'s mother\'s father = Amar\'s maternal uncle.\nGirl\'s mother\'s brother = Amar\'s maternal uncle => Girl\'s mother is Amar\'s mother (or aunt).'
    },
    {
      question_number: 8,
      question_text: 'P is the brother of Q and R. S is R\'s mother. T is P\'s father. Which of the following statements cannot be definitely true?',
      option_a: 'T is Q\'s father',
      option_b: 'S is P\'s mother',
      option_c: 'P is S\'s son',
      option_d: 'Q is T\'s son',
      correct_option: 'D',
      explanation: 'The gender of Q is not mentioned (Q could be daughter or son). Therefore, "Q is T\'s son" cannot be definitely asserted.'
    },
    {
      question_number: 9,
      question_text: 'A woman introduces a man as the son of the brother of her mother. How is the man related to the woman?',
      option_a: 'Nephew',
      option_b: 'Son',
      option_c: 'Cousin',
      option_d: 'Uncle',
      correct_option: 'C',
      explanation: 'Brother of mother = Maternal uncle. Son of maternal uncle = Maternal cousin.'
    },
    {
      question_number: 10,
      question_text: 'Introducing Rajesh, Neha said, "His brother\'s father is the only son of my grandfather." How is Neha related to Rajesh?',
      option_a: 'Sister',
      option_b: 'Daughter',
      option_c: 'Mother',
      option_d: 'Aunt',
      correct_option: 'A',
      explanation: 'Only son of my grandfather = Father.\nRajesh\'s father is Neha\'s father.\nTherefore, Neha is Rajesh\'s sister.'
    },
    {
      question_number: 11,
      question_text: 'Rahul told Anand, "Yesterday I defeated the only brother of the daughter of my grandmother." Whom did Rahul defeat?',
      option_a: 'Father',
      option_b: 'Son',
      option_c: 'Father or Uncle',
      option_d: 'Brother',
      correct_option: 'A',
      explanation: 'Daughter of grandmother = Aunt.\nOnly brother of aunt = Father.\nRahul defeated his Father.'
    },
    {
      question_number: 12,
      question_text: 'If P $ Q means P is the father of Q; P # Q means P is the mother of Q; P * Q means P is the sister of Q, then how is Q related to N in N # L $ P * Q?',
      option_a: 'Grandson',
      option_b: 'Granddaughter',
      option_c: 'Grandchild (Grandson or Granddaughter)',
      option_d: 'Nephew',
      correct_option: 'C',
      explanation: 'N is mother of L, L is father of P and Q. Q is grandchild of N.'
    },
    {
      question_number: 13,
      question_text: 'Pointing to a lady, a man said, "The son of her only brother is the brother of my wife." How is the lady related to the man?',
      option_a: 'Mother-in-law',
      option_b: 'Sister of father-in-law',
      option_c: 'Maternal aunt',
      option_d: 'Grandmother',
      correct_option: 'B',
      explanation: 'Brother of wife = Brother-in-law. Son of lady\'s brother = Brother-in-law => Lady\'s brother is father-in-law. Lady is the sister of father-in-law.'
    },
    {
      question_number: 14,
      question_text: 'A is father of C and D is son of B. E is brother of A. If C is sister of D, how is B related to E?',
      option_a: 'Daughter',
      option_b: 'Brother-in-law',
      option_c: 'Sister-in-law',
      option_d: 'Sister',
      correct_option: 'C',
      explanation: 'A is father of C and D. D is son of B => B is mother of C and D, so B is wife of A. E is brother of A => B is sister-in-law of E.'
    },
    {
      question_number: 15,
      question_text: 'Pointing towards a person, a man said to a woman, "His mother is the only daughter of your father." How is the woman related to that person?',
      option_a: 'Daughter',
      option_b: 'Sister',
      option_c: 'Mother',
      option_d: 'Wife',
      correct_option: 'C',
      explanation: 'Only daughter of woman\'s father = Woman herself.\nSo the person\'s mother is the woman herself.'
    }
  ],

  // ─── NUMBER SERIES (15 FULL QUESTIONS) ────────────────────────────────────
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
    },
    {
      question_number: 4,
      question_text: 'Look at this series: 22, 21, 23, 22, 24, 23, ... What number should come next?',
      option_a: '22',
      option_b: '24',
      option_c: '25',
      option_d: '26',
      correct_option: 'C',
      explanation: 'Alternating subtraction of 1 and addition of 2: 22-1=21, 21+2=23, 23-1=22, 22+2=24, 24-1=23, 23+2=25.'
    },
    {
      question_number: 5,
      question_text: 'Look at this series: 53, 53, 40, 40, 27, 27, ... What number should come next?',
      option_a: '12',
      option_b: '14',
      option_c: '27',
      option_d: '53',
      correct_option: 'B',
      explanation: 'Each number is repeated, and then decreased by 13: 53-13=40, 40-13=27, 27-13=14.'
    },
    {
      question_number: 6,
      question_text: 'Look at this series: 3, 4, 7, 8, 11, 12, ... What number should come next?',
      option_a: '7',
      option_b: '10',
      option_c: '14',
      option_d: '15',
      correct_option: 'D',
      explanation: 'Alternating addition of 1 and 3: 3+1=4, 4+3=7, 7+1=8, 8+3=11, 11+1=12, 12+3=15.'
    },
    {
      question_number: 7,
      question_text: 'Look at this series: 8, 22, 8, 28, 8, ... What number should come next?',
      option_a: '9',
      option_b: '29',
      option_c: '32',
      option_d: '34',
      correct_option: 'D',
      explanation: '8 is repeated at alternate positions. Second series increases by 6: 22 + 6 = 28, 28 + 6 = 34.'
    },
    {
      question_number: 8,
      question_text: 'Look at this series: 31, 29, 24, 22, 17, ... What number should come next?',
      option_a: '15',
      option_b: '14',
      option_c: '13',
      option_d: '12',
      correct_option: 'A',
      explanation: 'Alternating subtraction of 2 and 5: 31-2=29, 29-5=24, 24-2=22, 22-5=17, 17-2=15.'
    },
    {
      question_number: 9,
      question_text: 'Look at this series: 1.5, 2.3, 3.1, 3.9, ... What number should come next?',
      option_a: '4.2',
      option_b: '4.4',
      option_c: '4.7',
      option_d: '5.1',
      correct_option: 'C',
      explanation: 'Constant addition of 0.8: 3.9 + 0.8 = 4.7.'
    },
    {
      question_number: 10,
      question_text: 'Look at this series: 14, 28, 20, 40, 32, 64, ... What number should come next?',
      option_a: '52',
      option_b: '56',
      option_c: '96',
      option_d: '128',
      correct_option: 'B',
      explanation: 'Alternating multiply by 2 and subtract 8: 14×2=28, 28-8=20, 20×2=40, 40-8=32, 32×2=64, 64-8=56.'
    },
    {
      question_number: 11,
      question_text: 'Look at this series: 2, 4, 6, 8, 10, ... What number should come next?',
      option_a: '11',
      option_b: '12',
      option_c: '13',
      option_d: '14',
      correct_option: 'B',
      explanation: 'Simple consecutive even number sequence: 10 + 2 = 12.'
    },
    {
      question_number: 12,
      question_text: 'Look at this series: 201, 202, 204, 207, ... What number should come next?',
      option_a: '205',
      option_b: '208',
      option_c: '210',
      option_d: '211',
      correct_option: 'D',
      explanation: 'Incremental additions: +1, +2, +3, +4 => 207 + 4 = 211.'
    },
    {
      question_number: 13,
      question_text: 'Look at this series: 544, 509, 474, 439, ... What number should come next?',
      option_a: '404',
      option_b: '414',
      option_c: '420',
      option_d: '445',
      correct_option: 'A',
      explanation: 'Constant subtraction of 35: 439 - 35 = 404.'
    },
    {
      question_number: 14,
      question_text: 'Look at this series: 80, 10, 70, 15, 60, ... What number should come next?',
      option_a: '20',
      option_b: '25',
      option_c: '30',
      option_d: '50',
      correct_option: 'A',
      explanation: 'Two interleaved series: (80, 70, 60, ...) subtracting 10, and (10, 15, 20, ...) adding 5.'
    },
    {
      question_number: 15,
      question_text: 'Look at this series: 2, 6, 18, 54, ... What number should come next?',
      option_a: '108',
      option_b: '148',
      option_c: '162',
      option_d: '216',
      correct_option: 'C',
      explanation: 'Geometric progression multiplying by 3: 54 × 3 = 162.'
    }
  ],

  // ─── CODING - DECODING (15 FULL QUESTIONS) ────────────────────────────────
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
    },
    {
      question_number: 3,
      question_text: 'In a code language, if DELHI is coded as 73541 and CALCUTTA as 82589662, how can CALICUT be coded?',
      option_a: '5279431',
      option_b: '5978213',
      option_c: '8251896',
      option_d: '8543691',
      correct_option: 'C',
      explanation: 'Letter-to-digit direct mapping:\nC=8, A=2, L=5, I=1, C=8, U=9, T=6 => 8251896.'
    },
    {
      question_number: 4,
      question_text: 'If RUMOUR is coded as QSIPSV, how would HERETIC be coded?',
      option_a: 'GFSFSJB',
      option_b: 'IFSFUJD',
      option_c: 'IFSFUJB',
      option_d: 'IDTDUJB',
      correct_option: 'B',
      explanation: 'Pattern is +1 on alternate or uniform letter shifts: H+1=I, E+1=F, R+1=S, E+1=F, T+1=U, I+1=J, C+1=D => IFSFUJD.'
    },
    {
      question_number: 5,
      question_text: 'If in a certain language, MADRAS is coded as NBESBT, how is BOMBAY coded in that language?',
      option_a: 'CPNCBX',
      option_b: 'CPNCBZ',
      option_c: 'CPOCBZ',
      option_d: 'CQOCBZ',
      correct_option: 'B',
      explanation: 'Each letter is shifted forward by 1 (+1): B+1=C, O+1=P, M+1=N, B+1=C, A+1=B, Y+1=Z => CPNCBZ.'
    },
    {
      question_number: 6,
      question_text: 'If TAP is coded as SZO, then how is FREEZE coded?',
      option_a: 'EQDFYG',
      option_b: 'ESDFYF',
      option_c: 'GQFDYF',
      option_d: 'EQDDYD',
      correct_option: 'D',
      explanation: 'Each letter is shifted backward by 1 (-1): F-1=E, R-1=Q, E-1=D, E-1=D, Z-1=Y, E-1=D => EQDDYD.'
    },
    {
      question_number: 7,
      question_text: 'In a certain code, SIKKIM is written as THLJJL. How is TRAINING written in that code?',
      option_a: 'SQBHOHOF',
      option_b: 'UQBHOHOF',
      option_c: 'UQBJOHHO',
      option_d: 'UQBJOHOH',
      correct_option: 'B',
      explanation: 'Alternating shifts of +1 and -1: T+1=U, R-1=Q, A+1=B, I-1=H, N+1=O, I-1=H, N+1=O, G-1=F => UQBHOHOF.'
    },
    {
      question_number: 8,
      question_text: 'If "cook" is called "butler", "butler" is called "manager", "manager" is called "teacher", "teacher" is called "clerk", who will teach in a class?',
      option_a: 'Cook',
      option_b: 'Butler',
      option_c: 'Manager',
      option_d: 'Clerk',
      correct_option: 'D',
      explanation: 'A teacher teaches in a class, and "teacher" is called "clerk".'
    },
    {
      question_number: 9,
      question_text: 'If light is called morning, morning is called dark, dark is called night, night is called sunshine, and sunshine is called dusk, when do we sleep?',
      option_a: 'Night',
      option_b: 'Sunshine',
      option_c: 'Dusk',
      option_d: 'Dark',
      correct_option: 'B',
      explanation: 'We sleep at night, and "night" is called "sunshine".'
    },
    {
      question_number: 10,
      question_text: 'In a code, "pit dar na" means "you are good"; "dar tok pa" means "good and bad"; "tim na tok" means "they are bad". Which word means "they"?',
      option_a: 'na',
      option_b: 'tok',
      option_c: 'tim',
      option_d: 'pit',
      correct_option: 'C',
      explanation: 'Common in 1st & 3rd: "are" = "na". Common in 2nd & 3rd: "bad" = "tok". Remaining in 3rd: "they" = "tim".'
    },
    {
      question_number: 11,
      question_text: 'If ROSE is coded as 6821, CHAIR is coded as 73456 and PREACH is coded as 961473, what is the code for SEARCH?',
      option_a: '246173',
      option_b: '214673',
      option_c: '214763',
      option_d: '216473',
      correct_option: 'B',
      explanation: 'S=2, E=1, A=4, R=6, C=7, H=3 => 214673.'
    },
    {
      question_number: 12,
      question_text: 'If in a code, MIND becomes KGLB and ARGUE becomes YPESC, then what will DIAGRAM be in that code?',
      option_a: 'BGYEPYK',
      option_b: 'BGYEPYJ',
      option_c: 'GLPEYKB',
      option_d: 'BGYEPMK',
      correct_option: 'A',
      explanation: 'Each letter is shifted backward by 2 (-2): D-2=B, I-2=G, A-2=Y, G-2=E, R-2=P, A-2=Y, M-2=K => BGYEPYK.'
    },
    {
      question_number: 13,
      question_text: 'In a certain code, "FORGET" is written as "DPPHCU". How would "DOCTOR" be written in that code?',
      option_a: 'BPAUMS',
      option_b: 'BPAUOM',
      option_c: 'EMDRPP',
      option_d: 'BPAUPS',
      correct_option: 'A',
      explanation: 'Pattern: -2, +1, -2, +1, -2, +1: D-2=B, O+1=P, C-2=A, T+1=U, O-2=M, R+1=S => BPAUMS.'
    },
    {
      question_number: 14,
      question_text: 'If MACHINE is coded as 19-7-9-14-15-20-11, how will DANGER be coded?',
      option_a: '10-7-20-13-11-24',
      option_b: '11-7-20-16-11-24',
      option_c: '13-7-20-9-11-25',
      option_d: '10-7-20-16-11-24',
      correct_option: 'A',
      explanation: 'Pattern is letter position + 6: D(4+6=10), A(1+6=7), N(14+6=20), G(7+6=13), E(5+6=11), R(18+6=24).'
    },
    {
      question_number: 15,
      question_text: 'If PAINT is coded as 74128 and EXCEL is coded as 93596, then how is ACCEPT coded?',
      option_a: '455978',
      option_b: '547978',
      option_c: '554978',
      option_d: '735961',
      correct_option: 'A',
      explanation: 'Direct letter substitution: A=4, C=5, C=5, E=9, P=7, T=8 => 455978.'
    }
  ],

  // ─── DIRECTION SENSE (15 FULL QUESTIONS) ──────────────────────────────────
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
    },
    {
      question_number: 3,
      question_text: 'Rasik walked 20 m towards north. Then he turned right and walks 30 m. Then he turns right and walks 35 m. Then he turns left and walks 15 m. Finally he turns left and walks 15 m. In which direction and how many metres is he from the starting position?',
      option_a: '15 m West',
      option_b: '30 m East',
      option_c: '30 m West',
      option_d: '45 m East',
      correct_option: 'D',
      explanation: 'Net horizontal = 30 East + 15 East = 45 m East. Net vertical = 20 North - 35 South + 15 North = 0 m. Position = 45 m East.'
    },
    {
      question_number: 4,
      question_text: 'A starting from his house walks 5 km East, then turns right and walks 3 km, then again turns right and walks 5 km. How far and in which direction is he from his house?',
      option_a: '3 km South',
      option_b: '3 km North',
      option_c: '5 km West',
      option_d: '5 km East',
      correct_option: 'A',
      explanation: 'East 5 km, South 3 km, West 5 km. He is exactly 3 km South of his house.'
    },
    {
      question_number: 5,
      question_text: 'One morning after sunrise, Suresh was standing facing a pole. The shadow of the pole fell exactly to his right. To which direction was he facing?',
      option_a: 'East',
      option_b: 'West',
      option_c: 'South',
      option_d: 'North',
      correct_option: 'C',
      explanation: 'In the morning, sun is in East, so shadows fall toward West. Since shadow is to his right, his right is West. Therefore, he is facing South.'
    },
    {
      question_number: 6,
      question_text: 'A child is looking for his father. He went 90 metres in the East before turning to his right. He went 20 metres before turning to his right again to look for his father at his uncle’s place 30 metres from this point. His father was not there. From here he went 100 metres to the North before meeting his father in a street. How far did the son meet his father from the starting point?',
      option_a: '80 metres',
      option_b: '100 metres',
      option_c: '140 metres',
      option_d: '260 metres',
      correct_option: 'B',
      explanation: 'X coordinate = 90 - 30 = 60 m East. Y coordinate = -20 + 100 = 80 m North. Distance = √(60² + 80²) = 100 metres.'
    },
    {
      question_number: 7,
      question_text: 'Kailash faces towards north. Turning to his right, he walks 25 metres. He then turns to his left and walks 30 metres. Next, he moves 25 metres to his right. He then turns to his right again and walks 55 metres. Finally, he turns to the right and moves 40 metres. In which direction is he now from his starting point?',
      option_a: 'South-West',
      option_b: 'South',
      option_c: 'North-West',
      option_d: 'South-East',
      correct_option: 'D',
      explanation: 'East: 25 + 25 - 40 = 10 m East. North: 30 - 55 = -25 m South. He is in South-East direction.'
    },
    {
      question_number: 8,
      question_text: 'Deepa moved a distance of 75 metres towards the north. She then turned to the left and walking for about 25 metres, turned left again and walked 80 metres. Finally, she turned to the right at an angle of 45°. In which direction was she moving finally?',
      option_a: 'North-East',
      option_b: 'North-West',
      option_c: 'South',
      option_d: 'South-West',
      correct_option: 'D',
      explanation: 'She was facing South. Turning 45° to the right turns her towards South-West.'
    },
    {
      question_number: 9,
      question_text: 'A river flows from west to east and on the way turns left and goes in a semi-circle round a hillock, and then turns at right-angles to the left. In what direction is the river finally flowing?',
      option_a: 'West',
      option_b: 'East',
      option_c: 'North',
      option_d: 'South',
      correct_option: 'B',
      explanation: 'Flowing East -> turns left (North) -> semi-circle around hill turns it facing South -> turns 90° left => turns East again.'
    },
    {
      question_number: 10,
      question_text: 'Santhosh walks 20 metres towards north. He then turns right and walks 10 metres. He again turns right and walks 20 metres. How far is he from his original position?',
      option_a: '10 metres',
      option_b: '20 metres',
      option_c: '30 metres',
      option_d: '40 metres',
      correct_option: 'A',
      explanation: 'He walks 20 m North, 10 m East, and 20 m South. He is 10 metres East from starting point.'
    },
    {
      question_number: 11,
      question_text: 'One evening before sunset Rekha and Hema were talking to each other face to face. If Hema\'s shadow was exactly to the right of Hema, which direction was Rekha facing?',
      option_a: 'North',
      option_b: 'South',
      option_c: 'East',
      option_d: 'Data inadequate',
      correct_option: 'B',
      explanation: 'At sunset, sun is in West, so shadows fall toward East. Since Hema\'s shadow is to her right, Hema\'s right is East => Hema faces North. Rekha is facing Hema => Rekha faces South.'
    },
    {
      question_number: 12,
      question_text: 'A person starts from point A and walks 4 km north to point B, then turns right and walks 3 km to point C. What is the shortest distance between A and C?',
      option_a: '5 km',
      option_b: '7 km',
      option_c: '6 km',
      option_d: '8 km',
      correct_option: 'A',
      explanation: 'Using Pythagorean theorem: Distance = √(4² + 3²) = √(16 + 9) = √25 = 5 km.'
    },
    {
      question_number: 13,
      question_text: 'Village A is to the West of Village B, which is to the South of Village C, which is to the West of Village D. In which direction is Village A with respect to Village D?',
      option_a: 'South-West',
      option_b: 'North-West',
      option_c: 'South-East',
      option_d: 'North',
      correct_option: 'A',
      explanation: 'A is West of B; B is South of C; C is West of D. Therefore, A is South-West of D.'
    },
    {
      question_number: 14,
      question_text: 'A car travels 6 km towards north, then turns left and travels 8 km. What is the shortest distance back to the starting point?',
      option_a: '10 km',
      option_b: '12 km',
      option_c: '14 km',
      option_d: '15 km',
      correct_option: 'A',
      explanation: 'Shortest distance = √(6² + 8²) = √(36 + 64) = √100 = 10 km.'
    },
    {
      question_number: 15,
      question_text: 'If South-East becomes North, North-East becomes West and so on, what will West become?',
      option_a: 'North-East',
      option_b: 'South-East',
      option_c: 'North-West',
      option_d: 'South-West',
      correct_option: 'B',
      explanation: 'Each direction is rotated by 135° anti-clockwise. Rotating West 135° anti-clockwise makes it South-East.'
    }
  ]
};
