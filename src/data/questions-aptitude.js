/**
 * SmartPrep — Comprehensive Quantitative Aptitude Question Bank
 * Sourced from classic placement exams and IndiaBIX with step-by-step mathematical explanations.
 */

export const APTITUDE_QUESTIONS = {
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
    },
    {
      question_number: 13,
      question_text: 'A and B can do a work in 8 days, B and C can do the same work in 12 days. A, B and C together can finish it in 6 days. A and C together will do it in:',
      option_a: '4 days',
      option_b: '6 days',
      option_c: '8 days',
      option_d: '12 days',
      correct_option: 'C',
      explanation: 'A + B + C = 1/6.\nA = (A + B + C) - (B + C) = 1/6 - 1/12 = 1/12.\nC = (A + B + C) - (A + B) = 1/6 - 1/8 = 1/24.\n(A + C)’s 1 day work = 1/12 + 1/24 = 3/24 = 1/8 => 8 days.'
    },
    {
      question_number: 14,
      question_text: 'A can do a piece of work in 14 days and B in 21 days. They begin together but 3 days before the completion of the work, A leaves off. The total number of days to complete the work is:',
      option_a: '6(3/5) days',
      option_b: '8.5 days',
      option_c: '10.2 days',
      option_d: '9(1/5) days',
      correct_option: 'C',
      explanation: 'In the last 3 days, B alone works = 3 × (1/21) = 1/7.\nRemaining work = 1 - 1/7 = 6/7.\n(A + B)’s 1 day work = 1/14 + 1/21 = 5/42.\nTime worked together = (6/7) / (5/42) = (6/7) × (42/5) = 36/5 = 7.2 days.\nTotal days = 7.2 + 3 = 10.2 days.'
    },
    {
      question_number: 15,
      question_text: '20 women can do a work in 16 days. 16 men can complete the same work in 15 days. What is the ratio between the capacity of a man and a woman?',
      option_a: '3 : 4',
      option_b: '4 : 3',
      option_c: '5 : 3',
      option_d: '2 : 1',
      correct_option: 'B',
      explanation: 'Total work = 20 × 16 = 320 women-days = 16 × 15 = 240 men-days.\n320 W = 240 M => M / W = 320 / 240 = 4 / 3.\nRatio = 4 : 3.'
    },
    {
      question_number: 16,
      question_text: 'A and B undertake to do a piece of work for Rs. 600. A alone can do it in 6 days while B alone can do it in 8 days. With the help of a boy, they finish it in 3 days. Find the boy’s share.',
      option_a: 'Rs. 75',
      option_b: 'Rs. 80',
      option_c: 'Rs. 100',
      option_d: 'Rs. 120',
      correct_option: 'A',
      explanation: 'Boy’s 3 days work = 1 - (3/6 + 3/8) = 1 - (1/2 + 3/8) = 1/8.\nBoy’s share = (1/8) × 600 = Rs. 75.'
    },
    {
      question_number: 17,
      question_text: 'A is 50% as efficient as B. C does half of the work done by A and B together. If C alone does the work in 40 days, then A, B and C together can do the work in:',
      option_a: '13(1/3) days',
      option_b: '15 days',
      option_c: '20 days',
      option_d: '30 days',
      correct_option: 'A',
      explanation: 'Efficiency: A = 1, B = 2 => (A + B) = 3.\nC’s efficiency = 3/2 = 1.5.\nTotal efficiency (A + B + C) = 3 + 1.5 = 4.5.\nRatio of C to (A + B + C) = 1.5 : 4.5 = 1 : 3.\nTime taken = 40 / 3 = 13(1/3) days.'
    },
    {
      question_number: 18,
      question_text: 'A can do a work in 20 days and B in 30 days. They work together for 7 days and then both leave the work. Then C finishes the remaining work in 10 days. In how many days can C alone finish the work?',
      option_a: '24 days',
      option_b: '25 days',
      option_c: '30 days',
      option_d: '36 days',
      correct_option: 'A',
      explanation: '(A + B)’s 7 days work = 7 × (1/20 + 1/30) = 7 × (5/60) = 7/12.\nRemaining work = 1 - 7/12 = 5/12 done by C in 10 days.\nC takes 10 × (12/5) = 24 days.'
    },
    {
      question_number: 19,
      question_text: '12 men can complete a work in 8 days. 16 women can complete the same work in 12 days. 8 men and 8 women started working together. In how many days will the work be completed?',
      option_a: '8 days',
      option_b: '9 days',
      option_c: '10 days',
      option_d: '12 days',
      correct_option: 'A',
      explanation: '12 × 8 = 96 men-days = 16 × 12 = 192 women-days => 1 man = 2 women.\n8 men + 8 women = 16 women + 8 women = 24 women.\nTime taken = 192 / 24 = 8 days.'
    },
    {
      question_number: 20,
      question_text: 'A can do a piece of work in 10 days, B in 12 days and C in 15 days. They begin together but A leaves the work after 2 days and B leaves 3 days before the completion of the work. How long did the work last?',
      option_a: '7 days',
      option_b: '8 days',
      option_c: '9 days',
      option_d: '10 days',
      correct_option: 'A',
      explanation: 'Let total days be x.\nA worked for 2 days, B worked for (x - 3) days, C worked for x days.\n2/10 + (x - 3)/12 + x/15 = 1 => 1/5 + (x - 3)/12 + x/15 = 1.\nMultiply by 60: 12 + 5(x - 3) + 4x = 60 => 12 + 5x - 15 + 4x = 60 => 9x - 3 = 60 => 9x = 63 => x = 7 days.'
    }
  ],

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
    }
  ],

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
  ]
};
