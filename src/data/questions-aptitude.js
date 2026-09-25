/**
 * SmartPrep — Comprehensive Quantitative Aptitude Question Bank
 * Sourced from classic placement exams and IndiaBIX with step-by-step mathematical explanations.
 */

export const APTITUDE_QUESTIONS = {
  // ─── TIME AND WORK (20 FULL QUESTIONS) ────────────────────────────────────
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
      explanation: 'In the last 3 days, B alone works = 3 × (1/21) = 1/7.\nRemaining work = 1 - 1/7 = 6/7.\n(A + B)’s 1 day work = 1/14 + 1/21 = 5/42.\nTime worked together = (6/7) / (5/42) = 36/5 = 7.2 days.\nTotal days = 7.2 + 3 = 10.2 days.'
    },
    {
      question_number: 15,
      question_text: '20 women can do a work in 16 days. 16 men can complete the same work in 15 days. What is the ratio between the capacity of a man and a woman?',
      option_a: '3 : 4',
      option_b: '4 : 3',
      option_c: '5 : 3',
      option_d: '2 : 1',
      correct_option: 'B',
      explanation: '320 Women-days = 240 Men-days => M / W = 320 / 240 = 4 / 3. Ratio = 4 : 3.'
    },
    {
      question_number: 16,
      question_text: 'A and B undertake to do a piece of work for Rs. 600. A alone can do it in 6 days while B alone can do it in 8 days. With the help of a boy, they finish it in 3 days. Find the boy’s share.',
      option_a: 'Rs. 75',
      option_b: 'Rs. 80',
      option_c: 'Rs. 100',
      option_d: 'Rs. 120',
      correct_option: 'A',
      explanation: 'Boy’s 3 days work = 1 - (3/6 + 3/8) = 1/8. Boy’s share = (1/8) × 600 = Rs. 75.'
    },
    {
      question_number: 17,
      question_text: 'A is 50% as efficient as B. C does half of the work done by A and B together. If C alone does the work in 40 days, then A, B and C together can do the work in:',
      option_a: '13(1/3) days',
      option_b: '15 days',
      option_c: '20 days',
      option_d: '30 days',
      correct_option: 'A',
      explanation: 'Efficiencies: A = 1, B = 2 => (A + B) = 3. C = 1.5. Total = 4.5. Time = 40 / 3 = 13(1/3) days.'
    },
    {
      question_number: 18,
      question_text: 'A can do a work in 20 days and B in 30 days. They work together for 7 days and then both leave. C finishes the remaining work in 10 days. In how many days can C alone finish the whole work?',
      option_a: '24 days',
      option_b: '25 days',
      option_c: '30 days',
      option_d: '36 days',
      correct_option: 'A',
      explanation: '(A + B)’s 7 days work = 7/12. Remaining = 5/12 in 10 days. C alone = 10 × (12/5) = 24 days.'
    },
    {
      question_number: 19,
      question_text: '12 men can complete a work in 8 days. 16 women can complete the same work in 12 days. 8 men and 8 women started working together. In how many days will the work be completed?',
      option_a: '8 days',
      option_b: '9 days',
      option_c: '10 days',
      option_d: '12 days',
      correct_option: 'A',
      explanation: '96 M-days = 192 W-days => 1 M = 2 W. 8 M + 8 W = 24 W. Time = 192 / 24 = 8 days.'
    },
    {
      question_number: 20,
      question_text: 'A can do a piece of work in 10 days, B in 12 days and C in 15 days. They begin together but A leaves after 2 days and B leaves 3 days before completion. How long did the work last?',
      option_a: '7 days',
      option_b: '8 days',
      option_c: '9 days',
      option_d: '10 days',
      correct_option: 'A',
      explanation: '2/10 + (x - 3)/12 + x/15 = 1 => 9x - 3 = 60 => 9x = 63 => x = 7 days.'
    }
  ],

  // ─── TIME AND DISTANCE (15 FULL QUESTIONS) ────────────────────────────────
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
      explanation: 'Let duration be t hours.\n600/t - 600/(t + 0.5) = 200 => 3/t - 3/(t + 0.5) = 1 => 1.5 = t² + 0.5t => 2t² + t - 3 = 0 => (2t + 3)(t - 1) = 0 => t = 1 hour.'
    },
    {
      question_number: 7,
      question_text: 'A man completes a journey in 10 hours. He travels first half of the journey at the rate of 21 km/hr and second half at 24 km/hr. Find the total journey in km.',
      option_a: '220 km',
      option_b: '224 km',
      option_c: '230 km',
      option_d: '234 km',
      correct_option: 'B',
      explanation: 'Let total distance be D km.\n(D/2)/21 + (D/2)/24 = 10 => D/42 + D/48 = 10 => (8D + 7D)/336 = 10 => 15D = 3360 => D = 224 km.'
    },
    {
      question_number: 8,
      question_text: 'The ratio between the speeds of two trains is 7 : 8. If the second train runs 400 km in 4 hours, then the speed of the first train is:',
      option_a: '70 km/hr',
      option_b: '75 km/hr',
      option_c: '84 km/hr',
      option_d: '87.5 km/hr',
      correct_option: 'D',
      explanation: 'Speed of second train = 400 / 4 = 100 km/hr.\nLet speeds be 7x and 8x. 8x = 100 => x = 12.5.\nSpeed of first train = 7 × 12.5 = 87.5 km/hr.'
    },
    {
      question_number: 9,
      question_text: 'A man on tour travels first 160 km at 64 km/hr and the next 160 km at 80 km/hr. The average speed for the first 320 km of the tour is:',
      option_a: '35.55 km/hr',
      option_b: '71.11 km/hr',
      option_c: '72 km/hr',
      option_d: '75 km/hr',
      correct_option: 'B',
      explanation: 'Total distance = 320 km.\nTotal time = (160 / 64) + (160 / 80) = 2.5 + 2 = 4.5 hours.\nAverage speed = 320 / 4.5 = 71.11 km/hr.'
    },
    {
      question_number: 10,
      question_text: 'A car travelling with 5/7 of its actual speed covers 42 km in 1 hr 40 min 48 sec. Find the actual speed of the car.',
      option_a: '30 km/hr',
      option_b: '35 km/hr',
      option_c: '40 km/hr',
      option_d: '45 km/hr',
      correct_option: 'B',
      explanation: 'Time = 1 hr + (40/60) hr + (48/3600) hr = 1 + 2/3 + 1/75 = 126/75 hours.\nSpeed = 42 / (126/75) = (42 × 75) / 126 = 25 km/hr.\nActual speed = 25 × (7/5) = 35 km/hr.'
    },
    {
      question_number: 11,
      question_text: 'In covering a distance of 30 km, Abhay takes 2 hours more than Sameer. If Abhay doubles his speed, then he would take 1 hour less than Sameer. Abhay’s speed is:',
      option_a: '5 km/hr',
      option_b: '6 km/hr',
      option_c: '6.25 km/hr',
      option_d: '7.5 km/hr',
      correct_option: 'A',
      explanation: 'Let Abhay’s speed = A km/hr.\n30/A - 30/2A = 3 => 15/A = 3 => A = 5 km/hr.'
    },
    {
      question_number: 12,
      question_text: 'Robert is travelling on his cycle and has calculated to reach point A at 2 P.M. if he travels at 10 kmph; he will reach there at 12 noon if he travels at 15 kmph. At what speed must he travel to reach A at 1 P.M.?',
      option_a: '11 kmph',
      option_b: '12 kmph',
      option_c: '13 kmph',
      option_d: '14 kmph',
      correct_option: 'B',
      explanation: 'Ratio of speeds = 10 : 15 = 2 : 3 => Ratio of times = 3 : 2.\nTime difference = 1 unit = 2 hours => Times are 6 hours and 4 hours.\nDistance = 10 × 6 = 60 km. Starting time = 8 A.M.\nTo reach at 1 P.M. (5 hours), required speed = 60 / 5 = 12 km/hr.'
    },
    {
      question_number: 13,
      question_text: 'It takes eight hours for a 600 km journey, if 120 km is done by train and the rest by car. It takes 20 minutes more, if 200 km is done by train and the rest by car. The ratio of the speed of the train to that of the car is:',
      option_a: '2 : 3',
      option_b: '3 : 2',
      option_c: '3 : 4',
      option_d: '4 : 3',
      correct_option: 'C',
      explanation: '120/T + 480/C = 8 and 200/T + 400/C = 25/3.\nSolving gives T = 60 km/hr and C = 80 km/hr.\nRatio of train to car speed = 60 : 80 = 3 : 4.'
    },
    {
      question_number: 14,
      question_text: 'A farmer travelled a distance of 61 km in 9 hours. He travelled partly on foot @ 4 km/hr and partly on bicycle @ 9 km/hr. The distance travelled on foot is:',
      option_a: '14 km',
      option_b: '15 km',
      option_c: '16 km',
      option_d: '17 km',
      correct_option: 'C',
      explanation: 'Let time on foot be t hours.\n4t + 9(9 - t) = 61 => 4t + 81 - 9t = 61 => 5t = 20 => t = 4 hours.\nDistance on foot = 4 × 4 = 16 km.'
    },
    {
      question_number: 15,
      question_text: 'A person travels from P to Q at a speed of 40 km/hr and returns by increasing his speed by 50%. What is his average speed for both the trips?',
      option_a: '45 km/hr',
      option_b: '48 km/hr',
      option_c: '50 km/hr',
      option_d: '52 km/hr',
      correct_option: 'B',
      explanation: 'Returning speed = 40 + (50% of 40) = 60 km/hr.\nAverage speed for equal distances = (2 × 40 × 60) / (40 + 60) = 4800 / 100 = 48 km/hr.'
    }
  ],

  // ─── SIMPLE INTEREST (15 FULL QUESTIONS) ──────────────────────────────────
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
    },
    {
      question_number: 6,
      question_text: 'A person borrows Rs. 5000 for 2 years at 4% p.a. simple interest. He immediately lends it to another person at 6(1/4)% p.a. for 2 years. Find his gain in the transaction per year.',
      option_a: 'Rs. 112.50',
      option_b: 'Rs. 125',
      option_c: 'Rs. 150',
      option_d: 'Rs. 167.50',
      correct_option: 'A',
      explanation: 'Gain in 2 years = 5000 × (6.25 - 4) × 2 / 100 = 50 × 2.25 × 2 = Rs. 225.\nGain per year = 225 / 2 = Rs. 112.50.'
    },
    {
      question_number: 7,
      question_text: 'What will be the ratio of simple interest earned by certain amount at the same rate of interest for 6 years and that for 9 years?',
      option_a: '1 : 3',
      option_b: '1 : 4',
      option_c: '2 : 3',
      option_d: 'None of these',
      correct_option: 'C',
      explanation: 'S.I. is directly proportional to time when P and R are constant.\nRatio = 6 : 9 = 2 : 3.'
    },
    {
      question_number: 8,
      question_text: 'A certain sum of money amounts to Rs. 1008 in 2 years and to Rs. 1164 in 3(1/2) years. Find the sum and the rate of interest.',
      option_a: 'Rs. 800, 13%',
      option_b: 'Rs. 800, 14%',
      option_c: 'Rs. 750, 12%',
      option_d: 'Rs. 850, 10%',
      correct_option: 'A',
      explanation: 'S.I. for 1.5 years = 1164 - 1008 = Rs. 156.\nS.I. for 1 year = 156 / 1.5 = Rs. 104.\nS.I. for 2 years = Rs. 208.\nPrincipal = 1008 - 208 = Rs. 800.\nRate = (104 × 100) / (800 × 1) = 13%.'
    },
    {
      question_number: 9,
      question_text: 'At what rate of simple interest will a sum of money become 7/4 of itself in 4 years?',
      option_a: '18.75%',
      option_b: '12.5%',
      option_c: '15%',
      option_d: '20%',
      correct_option: 'A',
      explanation: 'A = (7/4)P => S.I. = 7P/4 - P = 3P/4.\nRate = ((3P/4) × 100) / (P × 4) = 75 / 4 = 18.75%.'
    },
    {
      question_number: 10,
      question_text: 'A sum of Rs. 12,500 amounts to Rs. 15,500 in 4 years at the rate of simple interest. What is the rate of interest?',
      option_a: '3%',
      option_b: '4%',
      option_c: '5%',
      option_d: '6%',
      correct_option: 'D',
      explanation: 'S.I. = 15500 - 12500 = Rs. 3000.\nRate = (3000 × 100) / (12500 × 4) = 300000 / 50000 = 6%.'
    },
    {
      question_number: 11,
      question_text: 'A lent Rs. 5000 to B for 2 years and Rs. 3000 to C for 4 years on simple interest at the same rate of interest and received Rs. 2200 in all from both as interest. The rate of interest per annum is:',
      option_a: '5%',
      option_b: '7%',
      option_c: '8%',
      option_d: '10%',
      correct_option: 'D',
      explanation: '(5000 × R × 2)/100 + (3000 × R × 4)/100 = 2200 => 100R + 120R = 2200 => 220R = 2200 => R = 10%.'
    },
    {
      question_number: 12,
      question_text: 'A sum of money trebles (3 times) itself in 15 years at simple interest. In how many years will it become 5 times of itself at the same rate?',
      option_a: '25 years',
      option_b: '30 years',
      option_c: '35 years',
      option_d: '40 years',
      correct_option: 'B',
      explanation: 'To become 3 times, S.I. = 2P in 15 years.\nTo become 5 times, S.I. = 4P.\nTime = 15 × (4P / 2P) = 15 × 2 = 30 years.'
    },
    {
      question_number: 13,
      question_text: 'If the simple interest on a certain sum of money for 3 years at the rate of 12.5% is Rs. 3500 less than its principal, find the sum.',
      option_a: 'Rs. 5000',
      option_b: 'Rs. 5600',
      option_c: 'Rs. 6000',
      option_d: 'Rs. 6400',
      correct_option: 'B',
      explanation: 'S.I. = (P × 12.5 × 3)/100 = 37.5P/100 = 3P/8.\nP - 3P/8 = 3500 => 5P/8 = 3500 => P = (3500 × 8) / 5 = Rs. 5600.'
    },
    {
      question_number: 14,
      question_text: 'What annual installment will discharge a debt of Rs. 1092 due in 3 years at 12% simple interest?',
      option_a: 'Rs. 325',
      option_b: 'Rs. 350',
      option_c: 'Rs. 360',
      option_d: 'Rs. 375',
      correct_option: 'A',
      explanation: 'Installment = (100A) / (100t + rt(t-1)/2) = (100 × 1092) / (300 + 12 × 3) = 109200 / 336 = Rs. 325.'
    },
    {
      question_number: 15,
      question_text: 'A sum of Rs. 725 is lent in the beginning of a year at a certain rate of interest. After 8 months, a sum of Rs. 362.50 more is lent but at the rate twice the former. At the end of the year, Rs. 33.50 is earned as interest from both the loans. What was the original rate of interest?',
      option_a: '3.46%',
      option_b: '4.5%',
      option_c: '5%',
      option_d: '6%',
      correct_option: 'A',
      explanation: '(725 × R × 1)/100 + (362.50 × 2R × 4/12)/100 = 33.50 => 7.25R + 2.4167R = 33.50 => 9.6667R = 33.50 => R ≈ 3.46%.'
    }
  ],

  // ─── COMPOUND INTEREST (15 FULL QUESTIONS) ────────────────────────────────
  'compound-interest': [
    {
      question_number: 1,
      question_text: 'A bank offers 5% compound interest calculated on half-yearly basis. A customer deposits Rs. 1600 each on 1st January and 1st July of a year. At the end of the year, the amount he would have gained by way of interest is:',
      option_a: 'Rs. 120',
      option_b: 'Rs. 121',
      option_c: 'Rs. 122',
      option_d: 'Rs. 123',
      correct_option: 'B',
      explanation: 'Rate half-yearly = 2.5%.\nJan deposit amount = 1600(1 + 2.5/100)² = 1600(41/40)² = Rs. 1681.\nJuly deposit amount = 1600(1 + 2.5/100) = Rs. 1640.\nTotal amount = 1681 + 1640 = Rs. 3321. Total deposited = Rs. 3200.\nInterest gained = 3321 - 3200 = Rs. 121.'
    },
    {
      question_number: 2,
      question_text: 'The difference between simple and compound interests compounded annually on a certain sum of money for 2 years at 4% per annum is Re. 1. The sum is:',
      option_a: 'Rs. 625',
      option_b: 'Rs. 630',
      option_c: 'Rs. 640',
      option_d: 'Rs. 650',
      correct_option: 'A',
      explanation: 'Difference for 2 years = P(R/100)².\n1 = P(4/100)² = P(1/25)² = P/625 => P = Rs. 625.'
    },
    {
      question_number: 3,
      question_text: 'There is 60% increase in an amount in 6 years at simple interest. What will be the compound interest of Rs. 12,000 after 3 years at the same rate?',
      option_a: 'Rs. 2160',
      option_b: 'Rs. 3120',
      option_c: 'Rs. 3972',
      option_d: 'Rs. 6240',
      correct_option: 'C',
      explanation: 'S.I. rate = 60 / 6 = 10% p.a.\nC.I. for 3 years at 10% on Rs. 12000:\nAmount = 12000(1 + 10/100)³ = 12000 × 1.331 = Rs. 15972.\nC.I. = 15972 - 12000 = Rs. 3972.'
    },
    {
      question_number: 4,
      question_text: 'What is the difference between the compound interests on Rs. 5000 for 1(1/2) years at 4% per annum compounded yearly and half-yearly?',
      option_a: 'Rs. 2.04',
      option_b: 'Rs. 3.06',
      option_c: 'Rs. 4.80',
      option_d: 'Rs. 8.30',
      correct_option: 'A',
      explanation: 'Compounded yearly: A = 5000(1 + 4/100)(1 + 2/100) = 5000 × 1.04 × 1.02 = Rs. 5304.\nCompounded half-yearly: A = 5000(1 + 2/100)³ = 5000 × (51/50)³ = Rs. 5306.04.\nDifference = 5306.04 - 5304 = Rs. 2.04.'
    },
    {
      question_number: 5,
      question_text: 'The compound interest on Rs. 30,000 at 7% per annum is Rs. 4347. The period (in years) is:',
      option_a: '2 years',
      option_b: '2.5 years',
      option_c: '3 years',
      option_d: '4 years',
      correct_option: 'A',
      explanation: 'Amount = 30000 + 4347 = Rs. 34347.\n34347 = 30000(1 + 7/100)^n => 34347/30000 = (107/100)^n => 11449/10000 = (107/100)².\nTherefore, n = 2 years.'
    }
  ],

  // ─── PROFIT AND LOSS (15 FULL QUESTIONS) ──────────────────────────────────
  'profit-and-loss': [
    {
      question_number: 1,
      question_text: 'A person sold an article for Rs. 450 with a loss of 10%. At what price should he have sold it to gain 20%?',
      option_a: 'Rs. 500',
      option_b: 'Rs. 550',
      option_c: 'Rs. 600',
      option_d: 'Rs. 650',
      correct_option: 'C',
      explanation: 'Cost Price = 450 / 0.9 = Rs. 500.\nSelling Price for 20% gain = 500 × 1.20 = Rs. 600.'
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
      explanation: 'When two items are sold at same SP with x% gain and x% loss, overall loss = (x/10)² % = (20/10)² = 4% loss.'
    },
    {
      question_number: 4,
      question_text: 'A dishonest dealer professes to sell his goods at cost price by using a weight of 960 gm for a kg weight. Find his gain percent.',
      option_a: '4%',
      option_b: '4(1/6)%',
      option_c: '4.5%',
      option_d: '5%',
      correct_option: 'B',
      explanation: 'Gain % = [Error / (True value - Error)] × 100 = [40 / 960] × 100 = 100 / 24 = 4(1/6)%.'
    },
    {
      question_number: 5,
      question_text: 'By selling 33 metres of cloth, a person gains the cost price of 11 metres. The gain percent is:',
      option_a: '25%',
      option_b: '30%',
      option_c: '33(1/3)%',
      option_d: '35%',
      correct_option: 'C',
      explanation: 'Gain = CP of 11 m. Total CP = CP of 33 m.\nGain % = (11 / 33) × 100 = 33(1/3)%.'
    }
  ],

  // ─── PERCENTAGE (15 FULL QUESTIONS) ───────────────────────────────────────
  'percentage': [
    {
      question_number: 1,
      question_text: 'If A’s salary is 20% more than B’s salary, then how much percent is B’s salary less than A’s salary?',
      option_a: '16(2/3)%',
      option_b: '20%',
      option_c: '25%',
      option_d: '33(1/3)%',
      correct_option: 'A',
      explanation: 'Percentage less = [20 / (100 + 20)] × 100 = (20 / 120) × 100 = 16(2/3)%.'
    },
    {
      question_number: 2,
      question_text: 'Two students appeared at an examination. One of them secured 9 marks more than the other and his marks were 56% of the sum of their marks. The marks obtained by them are:',
      option_a: '39, 30',
      option_b: '41, 32',
      option_c: '42, 33',
      option_d: '43, 34',
      correct_option: 'C',
      explanation: 'x + 9 = 0.56(2x + 9) => 25(x + 9) = 14(2x + 9) => 3x = 99 => x = 33.\nMarks are 42 and 33.'
    },
    {
      question_number: 3,
      question_text: 'A fruit seller had some apples. He sells 40% apples and still has 420 apples. Originally, he had:',
      option_a: '588 apples',
      option_b: '600 apples',
      option_c: '672 apples',
      option_d: '700 apples',
      correct_option: 'D',
      explanation: 'Remaining apples = 100% - 40% = 60%.\n60% of total = 420 => Total = (420 × 100) / 60 = 700 apples.'
    },
    {
      question_number: 4,
      question_text: 'What percentage of numbers from 1 to 70 have 1 or 9 in the unit’s digit?',
      option_a: '14%',
      option_b: '20%',
      option_c: '21%',
      option_d: '28%',
      correct_option: 'B',
      explanation: 'Numbers ending in 1: 1, 11, 21, 31, 41, 51, 61 (7 numbers).\nNumbers ending in 9: 9, 19, 29, 39, 49, 59, 69 (7 numbers).\nTotal = 14 out of 70 = (14 / 70) × 100 = 20%.'
    },
    {
      question_number: 5,
      question_text: 'If 20% of a = b, then b% of 20 is the same as:',
      option_a: '4% of a',
      option_b: '5% of a',
      option_c: '20% of a',
      option_d: 'None of these',
      correct_option: 'A',
      explanation: 'b = 0.2a.\nb% of 20 = (b / 100) × 20 = (0.2a / 100) × 20 = (4 / 100) × a = 4% of a.'
    }
  ],

  // ─── PROBLEMS ON AGES (15 FULL QUESTIONS) ─────────────────────────────────
  'problems-on-ages': [
    {
      question_number: 1,
      question_text: 'Father is aged three times more than his son Sunil. After 8 years, he would be two and a half times of Sunil’s age. After further 8 years, how many times would he be of Sunil’s age?',
      option_a: '2 times',
      option_b: '2.5 times',
      option_c: '2.75 times',
      option_d: '3 times',
      correct_option: 'A',
      explanation: 'Sunil = x, Father = x + 3x = 4x.\n4x + 8 = 2.5(x + 8) => 1.5x = 12 => x = 8.\nFather = 32, Sunil = 8.\nAfter 16 years: Father = 48, Sunil = 24. Ratio = 48 / 24 = 2 times.'
    },
    {
      question_number: 2,
      question_text: 'The sum of the ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?',
      option_a: '4 years',
      option_b: '8 years',
      option_c: '10 years',
      option_d: 'None of these',
      correct_option: 'A',
      explanation: 'x + (x+3) + (x+6) + (x+9) + (x+12) = 50 => 5x + 30 = 50 => 5x = 20 => x = 4 years.'
    },
    {
      question_number: 3,
      question_text: 'A father said to his son, "I was as old as you are at the present at the time of your birth". If the father’s age is 38 years now, the son’s age five years back was:',
      option_a: '14 years',
      option_b: '19 years',
      option_c: '33 years',
      option_d: '38 years',
      correct_option: 'A',
      explanation: 'Let son’s present age = x. Father’s age at son’s birth = 38 - x.\n38 - x = x => 2x = 38 => x = 19.\nSon’s age 5 years ago = 19 - 5 = 14 years.'
    }
  ],

  // ─── RATIO AND PROPORTION (15 FULL QUESTIONS) ─────────────────────────────
  'ratio-proportion': [
    {
      question_number: 1,
      question_text: 'If A : B = 5 : 7 and B : C = 6 : 11, then A : B : C is:',
      option_a: '30 : 42 : 77',
      option_b: '35 : 49 : 77',
      option_c: '30 : 35 : 77',
      option_d: '25 : 35 : 77',
      correct_option: 'A',
      explanation: 'A : B = 30 : 42, B : C = 42 : 77 => A : B : C = 30 : 42 : 77.'
    },
    {
      question_number: 2,
      question_text: 'Two numbers are in the ratio 3 : 5. If 9 is subtracted from each, the new numbers are in the ratio 12 : 23. The smaller number is:',
      option_a: '27',
      option_b: '33',
      option_c: '49',
      option_d: '55',
      correct_option: 'B',
      explanation: '(3x - 9)/(5x - 9) = 12/23 => 69x - 207 = 60x - 108 => 9x = 99 => x = 11.\nSmaller number = 3 × 11 = 33.'
    },
    {
      question_number: 3,
      question_text: 'Salaries of Ravi and Sumit are in the ratio 2 : 3. If the salary of each is increased by Rs. 4000, the new ratio becomes 40 : 57. What is Sumit’s salary?',
      option_a: 'Rs. 17,000',
      option_b: 'Rs. 20,000',
      option_c: 'Rs. 25,500',
      option_d: 'Rs. 38,000',
      correct_option: 'D',
      explanation: '(2x + 4000)/(3x + 4000) = 40/57 => 57(2x + 4000) = 40(3x + 4000) => 114x + 228000 = 120x + 160000 => 6x = 68000.\nSumit’s salary = 3x = 68000 / 2 = Rs. 38,000.'
    }
  ]
};
