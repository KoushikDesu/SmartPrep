/**
 * SmartPrep — Comprehensive Quantitative Aptitude Question Bank
 * Sourced from classic placement exams and IndiaBIX with step-by-step mathematical explanations.
 */

export const APTITUDE_QUESTIONS = {
  // ─── TIME AND WORK ────────────────────────────────────────────────────────
  'time-and-work': [
    {
      question_number: 1,
      question_text: 'A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:',
      option_a: '7/15',
      option_b: '1/4',
      option_c: '1/10',
      option_d: '8/15',
      correct_option: 'D',
      explanation: 'A’s 1 day’s work = 1/15.\nB’s 1 day’s work = 1/20.\n(A + B)’s 1 day’s work = (1/15 + 1/20) = 7/60.\nWork done in 4 days = (7/60) × 4 = 7/15.\nRemaining work = 1 - 7/15 = 8/15.'
    },
    {
      question_number: 2,
      question_text: 'A can lay railway track between two given stations in 16 days and B can do the same job in 12 days. With help of C, they did the job in only 4 days. Then, C alone can do the job in:',
      option_a: '9(1/5) days',
      option_b: '9(2/5) days',
      option_c: '9(3/5) days',
      option_d: '10 days',
      correct_option: 'C',
      explanation: '(A + B + C)’s 1 day’s work = 1/4.\nA’s 1 day’s work = 1/16, B’s 1 day’s work = 1/12.\nC’s 1 day’s work = 1/4 - (1/16 + 1/12) = 1/4 - 7/48 = 5/48.\nSo C alone takes 48/5 = 9(3/5) days.'
    },
    {
      question_number: 3,
      question_text: 'A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?',
      option_a: '12 days',
      option_b: '15 days',
      option_c: '16 days',
      option_d: '18 days',
      correct_option: 'B',
      explanation: 'A’s 2 days work = 2 × (1/20) = 1/10.\n(A + B + C)’s 1 day work = 1/20 + 1/30 + 1/60 = 6/60 = 1/10.\nWork done in 3 days = 1/10 + 1/10 = 1/5.\nTotal work (1 unit) will be completed in 3 × 5 = 15 days.'
    },
    {
      question_number: 4,
      question_text: 'A is thrice as good a workman as B and therefore is able to finish a job in 60 days less than B. Working together, they can do it in:',
      option_a: '20 days',
      option_b: '22.5 days',
      option_c: '25 days',
      option_d: '30 days',
      correct_option: 'B',
      explanation: 'Ratio of times = 1 : 3.\nDifference in time = 3x - x = 2x = 60 => x = 30.\nA takes 30 days, B takes 90 days.\nTogether time = (30 × 90) / (30 + 90) = 2700 / 120 = 22.5 days.'
    },
    {
      question_number: 5,
      question_text: 'A alone can do a piece of work in 6 days and B alone in 8 days. A and B undertook to do it for Rs. 3200. With the help of C, they completed the work in 3 days. How much is to be paid to C?',
      option_a: 'Rs. 375',
      option_b: 'Rs. 400',
      option_c: 'Rs. 600',
      option_d: 'Rs. 800',
      correct_option: 'B',
      explanation: 'C’s 3 days work = 1 - (3/6 + 3/8) = 1 - (1/2 + 3/8) = 1/8.\nC’s share = (1/8) × 3200 = Rs. 400.'
    },
    {
      question_number: 6,
      question_text: 'If 6 men and 8 boys can do a piece of work in 10 days while 26 men and 48 boys can do the same in 2 days, the time taken by 15 men and 20 boys in doing the same work will be:',
      option_a: '4 days',
      option_b: '5 days',
      option_c: '6 days',
      option_d: '7 days',
      correct_option: 'A',
      explanation: '10(6M + 8B) = 2(26M + 48B) => 60M + 80B = 52M + 96B => 8M = 16B => 1M = 2B.\n6M + 8B = 12B + 8B = 20 boys take 10 days.\n15M + 20B = 30B + 20B = 50 boys.\nDays = (20 × 10) / 50 = 4 days.'
    },
    {
      question_number: 7,
      question_text: 'A can finish a work in 18 days and B can do the same work in 15 days. B worked for 10 days and left the job. In how many days, A alone can finish the remaining work?',
      option_a: '5 days',
      option_b: '5.5 days',
      option_c: '6 days',
      option_d: '8 days',
      correct_option: 'C',
      explanation: 'B’s 10 days work = 10/15 = 2/3.\nRemaining work = 1 - 2/3 = 1/3.\nA finishes in (1/3) × 18 = 6 days.'
    },
    {
      question_number: 8,
      question_text: '4 men and 6 women can complete a work in 8 days, while 3 men and 7 women can complete it in 10 days. In how many days will 10 women complete it?',
      option_a: '35 days',
      option_b: '40 days',
      option_c: '45 days',
      option_d: '50 days',
      correct_option: 'B',
      explanation: '8(4M + 6W) = 10(3M + 7W) => 32M + 48W = 30M + 70W => 2M = 22W => 1M = 11W.\n4M + 6W = 44W + 6W = 50 women take 8 days.\n10 women will take (50 × 8) / 10 = 40 days.'
    },
    {
      question_number: 9,
      question_text: 'A and B can do a piece of work in 72 days; B and C can do it in 120 days; A and C can do it in 90 days. In what time can A alone do it?',
      option_a: '80 days',
      option_b: '100 days',
      option_c: '120 days',
      option_d: '150 days',
      correct_option: 'C',
      explanation: '2(A + B + C) = 1/72 + 1/120 + 1/90 = 12/360 = 1/30 => A + B + C = 1/60.\nA = (A + B + C) - (B + C) = 1/60 - 1/120 = 1/120.\nA takes 120 days.'
    },
    {
      question_number: 10,
      question_text: 'A can do a piece of work in 4 hours; B and C together can do it in 3 hours, while A and C together can do it in 2 hours. How long will B alone take to do it?',
      option_a: '8 hours',
      option_b: '10 hours',
      option_c: '12 hours',
      option_d: '24 hours',
      correct_option: 'C',
      explanation: 'A’s work = 1/4.\nC’s work = (A + C) - A = 1/2 - 1/4 = 1/4.\nB’s work = (B + C) - C = 1/3 - 1/4 = 1/12.\nB takes 12 hours.'
    },
    {
      question_number: 11,
      question_text: 'A does 4/5 of a work in 20 days. He then calls in B and they together finish the remaining work in 3 days. How long B alone would take to do the whole work?',
      option_a: '23 days',
      option_b: '37.5 days',
      option_c: '40 days',
      option_d: '37.5 days',
      correct_option: 'B',
      explanation: 'A’s 1 day work = (4/5)/20 = 1/25.\nRemaining work = 1/5 done by (A + B) in 3 days => (A + B)’s 1 day work = (1/5)/3 = 1/15.\nB’s 1 day work = 1/15 - 1/25 = 2/75.\nB alone takes 75/2 = 37.5 days.'
    },
    {
      question_number: 12,
      question_text: 'A, B and C can complete a piece of work in 24, 6 and 12 days respectively. Working together, they will complete the same work in:',
      option_a: '1/24 day',
      option_b: '7/24 day',
      option_c: '3(3/7) days',
      option_d: '4 days',
      correct_option: 'C',
      explanation: '1 day work = 1/24 + 1/6 + 1/12 = (1 + 4 + 2)/24 = 7/24.\nTotal time = 24/7 = 3(3/7) days.'
    }
  ],

  // ─── TIME AND DISTANCE ────────────────────────────────────────────────────
  'time-and-distance': [
    {
      question_number: 1,
      question_text: 'A person crosses a 600 m long street in 5 minutes. What is his speed in km per hour?',
      option_a: '3.6 km/hr',
      option_b: '7.2 km/hr',
      option_c: '8.4 km/hr',
      option_d: '10 km/hr',
      correct_option: 'B',
      explanation: 'Speed = 600 m / (5 × 60 s) = 600 / 300 = 2 m/s.\nConverting to km/hr = 2 × (18/5) = 36/5 = 7.2 km/hr.'
    },
    {
      question_number: 2,
      question_text: 'An aeroplane covers a certain distance at a speed of 240 kmph in 5 hours. To cover the same distance in 1(2/3) hours, it must travel at a speed of:',
      option_a: '300 kmph',
      option_b: '360 kmph',
      option_c: '600 kmph',
      option_d: '720 kmph',
      correct_option: 'D',
      explanation: 'Distance = 240 × 5 = 1200 km.\nRequired time = 1(2/3) = 5/3 hours.\nSpeed = 1200 / (5/3) = (1200 × 3) / 5 = 720 kmph.'
    },
    {
      question_number: 3,
      question_text: 'If a person walks at 14 km/hr instead of 10 km/hr, he would have walked 20 km more. The actual distance travelled by him is:',
      option_a: '50 km',
      option_b: '56 km',
      option_c: '70 km',
      option_d: '80 km',
      correct_option: 'A',
      explanation: 'Let actual distance be x km.\nTime = x/10 = (x + 20)/14 => 14x = 10x + 200 => 4x = 200 => x = 50 km.'
    },
    {
      question_number: 4,
      question_text: 'A train can travel 50% faster than a car. Both start from point A at the same time and reach point B 75 kms away at the same time. On the way, the train lost about 12.5 minutes while stopping at the stations. The speed of the car is:',
      option_a: '100 kmph',
      option_b: '110 kmph',
      option_c: '120 kmph',
      option_d: '130 kmph',
      correct_option: 'C',
      explanation: 'Let car speed be x km/hr. Train speed = 1.5x.\n75/x - 75/1.5x = 12.5/60 => 75/x - 50/x = 125/600 => 25/x = 5/24 => x = 120 kmph.'
    },
    {
      question_number: 5,
      question_text: 'Excluding stoppages, the speed of a bus is 54 kmph and including stoppages, it is 45 kmph. For how many minutes does the bus stop per hour?',
      option_a: '9 min',
      option_b: '10 min',
      option_c: '12 min',
      option_d: '20 min',
      correct_option: 'B',
      explanation: 'Due to stoppages, it covers 54 - 45 = 9 km less per hour.\nTime to cover 9 km at 54 kmph = (9/54) × 60 = (1/6) × 60 = 10 minutes.'
    },
    {
      question_number: 6,
      question_text: 'In a flight of 600 km, an aircraft was slowed down due to bad weather. Its average speed for the trip was reduced by 200 km/hr and the time of flight increased by 30 minutes. The duration of the flight is:',
      option_a: '1 hour',
      option_b: '2 hours',
      option_c: '3 hours',
      option_d: '4 hours',
      correct_option: 'A',
      explanation: 'Let duration be t hours.\n600/t - 600/(t + 0.5) = 200 => 3/t - 3/(t + 0.5) = 1 => 3(t + 0.5) - 3t = t(t + 0.5) => 1.5 = t² + 0.5t => 2t² + t - 3 = 0 => (2t + 3)(t - 1) = 0 => t = 1 hour.'
    }
  ],

  // ─── SIMPLE INTEREST ──────────────────────────────────────────────────────
  'simple-interest': [
    {
      question_number: 1,
      question_text: 'A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:',
      option_a: 'Rs. 650',
      option_b: 'Rs. 690',
      option_c: 'Rs. 698',
      option_d: 'Rs. 700',
      correct_option: 'C',
      explanation: 'S.I. for 1 year = 854 - 815 = Rs. 39.\nS.I. for 3 years = 39 × 3 = Rs. 117.\nPrincipal = 815 - 117 = Rs. 698.'
    },
    {
      question_number: 2,
      question_text: 'Mr. Thomas invested an amount of Rs. 13,900 divided in two different schemes A and B at the simple interest rate of 14% p.a. and 11% p.a. respectively. If the total amount of simple interest earned in 2 years be Rs. 3508, what was the amount invested in Scheme B?',
      option_a: 'Rs. 6400',
      option_b: 'Rs. 6500',
      option_c: 'Rs. 7200',
      option_d: 'Rs. 7500',
      correct_option: 'A',
      explanation: 'Let investment in A be x. In B = 13900 - x.\n(x × 14 × 2)/100 + ((13900 - x) × 11 × 2)/100 = 3508.\n28x + 305800 - 22x = 350800 => 6x = 45000 => x = 7500 in A.\nScheme B = 13900 - 7500 = Rs. 6400.'
    },
    {
      question_number: 3,
      question_text: 'A sum fetched a total simple interest of Rs. 4016.25 at the rate of 9 p.c.p.a. in 5 years. What is the sum?',
      option_a: 'Rs. 4462.50',
      option_b: 'Rs. 8032.50',
      option_c: 'Rs. 8900',
      option_d: 'Rs. 8925',
      correct_option: 'D',
      explanation: 'Principal = (S.I. × 100) / (R × T) = (4016.25 × 100) / (9 × 5) = 401625 / 45 = Rs. 8925.'
    },
    {
      question_number: 4,
      question_text: 'How much time will it take for an amount of Rs. 450 to yield Rs. 81 as interest at 4.5% per annum of simple interest?',
      option_a: '3.5 years',
      option_b: '4 years',
      option_c: '4.5 years',
      option_d: '5 years',
      correct_option: 'B',
      explanation: 'Time = (S.I. × 100) / (P × R) = (81 × 100) / (450 × 4.5) = 8100 / 2025 = 4 years.'
    },
    {
      question_number: 5,
      question_text: 'A sum of money doubles itself in 10 years at simple interest. What is the rate of interest per annum?',
      option_a: '5%',
      option_b: '10%',
      option_c: '12%',
      option_d: '20%',
      correct_option: 'B',
      explanation: 'Let Principal = P. Amount = 2P => S.I. = P.\nRate = (S.I. × 100) / (P × T) = (P × 100) / (P × 10) = 10%.'
    }
  ],

  // ─── PROFIT AND LOSS ──────────────────────────────────────────────────────
  'profit-and-loss': [
    {
      question_number: 1,
      question_text: 'A person sold an article for Rs. 450 with a loss of 10%. At what price should he have sold it to gain 20%?',
      option_a: 'Rs. 500',
      option_b: 'Rs. 550',
      option_c: 'Rs. 600',
      option_d: 'Rs. 650',
      correct_option: 'C',
      explanation: 'Cost Price = 450 / (1 - 0.10) = 450 / 0.9 = Rs. 500.\nSelling Price for 20% gain = 500 × 1.20 = Rs. 600.'
    },
    {
      question_number: 2,
      question_text: 'If the cost price of 12 pens is equal to the selling price of 8 pens, the gain percentage is:',
      option_a: '25%',
      option_b: '33.33%',
      option_c: '50%',
      option_d: '66.67%',
      correct_option: 'C',
      explanation: 'Let CP of 1 pen = Rs. 1. CP of 8 pens = Rs. 8.\nSP of 8 pens = CP of 12 pens = Rs. 12.\nGain = 12 - 8 = Rs. 4.\nGain % = (4 / 8) × 100 = 50%.'
    },
    {
      question_number: 3,
      question_text: 'A shopkeeper sells two articles at Rs. 1000 each. On one he gains 20% and on the other he loses 20%. Overall he incurs:',
      option_a: 'No gain no loss',
      option_b: '4% loss',
      option_c: '4% gain',
      option_d: '2% loss',
      correct_option: 'B',
      explanation: 'When two items are sold at same SP with x% gain and x% loss, there is always a loss of (x/10)² % = (20/10)² = 4% loss.'
    }
  ],

  // ─── PERCENTAGE ───────────────────────────────────────────────────────────
  'percentage': [
    {
      question_number: 1,
      question_text: 'If A’s salary is 20% more than B’s salary, then how much percent is B’s salary less than A’s salary?',
      option_a: '16(2/3)%',
      option_b: '20%',
      option_c: '25%',
      option_d: '33(1/3)%',
      correct_option: 'A',
      explanation: 'Let B = 100 => A = 120.\nDifference = 20.\nPercentage less = (20 / 120) × 100 = 100 / 6 = 16(2/3)%.'
    },
    {
      question_number: 2,
      question_text: 'Two students appeared at an examination. One of them secured 9 marks more than the other and his marks were 56% of the sum of their marks. The marks obtained by them are:',
      option_a: '39, 30',
      option_b: '41, 32',
      option_c: '42, 33',
      option_d: '43, 34',
      correct_option: 'C',
      explanation: 'Let marks be x and (x + 9).\nx + 9 = (56/100)(2x + 9) => 25(x + 9) = 14(2x + 9) => 25x + 225 = 28x + 126 => 3x = 99 => x = 33.\nMarks are 42 and 33.'
    }
  ],

  // ─── PROBLEMS ON AGES ─────────────────────────────────────────────────────
  'problems-on-ages': [
    {
      question_number: 1,
      question_text: 'Father is aged three times more than his son Sunil. After 8 years, he would be two and a half times of Sunil’s age. After further 8 years, how many times would he be of Sunil’s age?',
      option_a: '2 times',
      option_b: '2.5 times',
      option_c: '2.75 times',
      option_d: '3 times',
      correct_option: 'A',
      explanation: 'Let Sunil’s age = x. Father’s age = x + 3x = 4x.\nAfter 8 yrs: 4x + 8 = 2.5(x + 8) => 4x + 8 = 2.5x + 20 => 1.5x = 12 => x = 8.\nFather = 32, Sunil = 8.\nAfter 16 years: Father = 32 + 16 = 48, Sunil = 8 + 16 = 24.\nRatio = 48 / 24 = 2 times.'
    },
    {
      question_number: 2,
      question_text: 'The sum of the ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?',
      option_a: '4 years',
      option_b: '8 years',
      option_c: '10 years',
      option_d: 'None of these',
      correct_option: 'A',
      explanation: 'Let ages be x, x+3, x+6, x+9, x+12.\nSum = 5x + 30 = 50 => 5x = 20 => x = 4 years.'
    }
  ],

  // ─── RATIO AND PROPORTION ─────────────────────────────────────────────────
  'ratio-proportion': [
    {
      question_number: 1,
      question_text: 'If A : B = 5 : 7 and B : C = 6 : 11, then A : B : C is:',
      option_a: '30 : 42 : 77',
      option_b: '35 : 49 : 77',
      option_c: '30 : 35 : 77',
      option_d: '25 : 35 : 77',
      correct_option: 'A',
      explanation: 'A : B = 5 : 7 = 30 : 42.\nB : C = 6 : 11 = 42 : 77.\nA : B : C = 30 : 42 : 77.'
    },
    {
      question_number: 2,
      question_text: 'Two numbers are in the ratio 3 : 5. If 9 is subtracted from each, the new numbers are in the ratio 12 : 23. The smaller number is:',
      option_a: '27',
      option_b: '33',
      option_c: '49',
      option_d: '55',
      correct_option: 'B',
      explanation: '(3x - 9)/(5x - 9) = 12/23 => 23(3x - 9) = 12(5x - 9) => 69x - 207 = 60x - 108 => 9x = 99 => x = 11.\nSmaller number = 3 × 11 = 33.'
    }
  ]
};
