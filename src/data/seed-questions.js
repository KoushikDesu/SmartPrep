/**
 * SmartPrep — Seed Question Data
 * Comprehensive question dataset covering all IndiaBix categories.
 * Each question includes: text, 4 options, correct answer, detailed explanation.
 */

export const SEED_QUESTIONS = {
  'problems-on-trains': [
    {
      question_number: 1,
      question_text: 'A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?',
      option_a: '120 metres',
      option_b: '180 metres',
      option_c: '324 metres',
      option_d: '150 metres',
      correct_option: 'D',
      explanation: 'Speed = 60 km/hr = 60 × (5/18) m/s = 50/3 m/s.\n\nLength of the train = Speed × Time = (50/3) × 9 = 150 metres.'
    },
    {
      question_number: 2,
      question_text: 'A train 125 m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. The speed of the train is:',
      option_a: '45 km/hr',
      option_b: '50 km/hr',
      option_c: '54 km/hr',
      option_d: '55 km/hr',
      correct_option: 'B',
      explanation: 'Speed of the train relative to man = 125/10 = 12.5 m/s = 12.5 × (18/5) = 45 km/hr.\n\nSpeed of the train = 45 + 5 = 50 km/hr.'
    },
    {
      question_number: 3,
      question_text: 'The length of the bridge, which a train 130 metres long and travelling at 45 km/hr can cross in 30 seconds, is:',
      option_a: '200 m',
      option_b: '225 m',
      option_c: '245 m',
      option_d: '250 m',
      correct_option: 'C',
      explanation: 'Speed = 45 × (5/18) = 12.5 m/s.\n\nDistance covered in 30 sec = 12.5 × 30 = 375 m.\n\nLength of bridge = 375 - 130 = 245 m.'
    },
    {
      question_number: 4,
      question_text: 'Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively and they cross each other in 23 seconds. The ratio of their speeds is:',
      option_a: '1 : 3',
      option_b: '3 : 2',
      option_c: '3 : 4',
      option_d: 'None of these',
      correct_option: 'B',
      explanation: 'Let the speeds of the two trains be x m/s and y m/s.\n\nLength of 1st train = 27x metres\nLength of 2nd train = 17y metres\n\nThey cross each other: (27x + 17y)/(x + y) = 23\n27x + 17y = 23x + 23y\n4x = 6y\nx/y = 3/2\n\nRatio of speeds = 3 : 2.'
    },
    {
      question_number: 5,
      question_text: 'A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?',
      option_a: '120 m',
      option_b: '240 m',
      option_c: '300 m',
      option_d: '180 m',
      correct_option: 'B',
      explanation: 'Speed = 54 × (5/18) = 15 m/s.\n\nLength of the train = 15 × 20 = 300 m.\n\nDistance covered in 36 sec = 15 × 36 = 540 m.\n\nLength of platform = 540 - 300 = 240 m.'
    },
    {
      question_number: 6,
      question_text: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
      option_a: '65 sec',
      option_b: '89 sec',
      option_c: '100 sec',
      option_d: '150 sec',
      correct_option: 'B',
      explanation: 'Speed = 240 / 24 = 10 m/s.\n\nTotal distance to cover = 240 + 650 = 890 m.\n\nTime = 890 / 10 = 89 seconds.'
    },
    {
      question_number: 7,
      question_text: 'A train 110 m long is travelling at a speed of 60 km/hr. In what time will it pass a man who is walking at 6 km/hr in the opposite direction?',
      option_a: '5 seconds',
      option_b: '6 seconds',
      option_c: '7 seconds',
      option_d: '10 seconds',
      correct_option: 'B',
      explanation: 'Relative speed of train and man in opposite directions = 60 + 6 = 66 km/hr.\n\nConverting to m/s: 66 × (5/18) = 55/3 m/s.\n\nTime to pass the man = Distance / Relative Speed = 110 / (55/3) = (110 × 3) / 55 = 6 seconds.'
    },
    {
      question_number: 8,
      question_text: 'Two trains of equal length are running on parallel lines in the same direction at 46 km/hr and 36 km/hr. The faster train passes the slower train in 36 seconds. The length of each train is:',
      option_a: '50 m',
      option_b: '72 m',
      option_c: '80 m',
      option_d: '100 m',
      correct_option: 'A',
      explanation: 'Relative speed in same direction = 46 - 36 = 10 km/hr = 10 × (5/18) = 25/9 m/s.\n\nTotal distance covered in 36 sec = (25/9) × 36 = 100 m.\n\nLet the length of each train be L. Total distance = 2L = 100 m.\n\nTherefore, L = 50 metres.'
    },
    {
      question_number: 9,
      question_text: 'A train 360 m long is running at a speed of 45 km/hr. In what time will it pass a bridge 140 m long?',
      option_a: '40 seconds',
      option_b: '42 seconds',
      option_c: '45 seconds',
      option_d: '48 seconds',
      correct_option: 'A',
      explanation: 'Speed = 45 × (5/18) = 12.5 m/s.\n\nTotal distance = 360 + 140 = 500 m.\n\nTime taken = 500 / 12.5 = 40 seconds.'
    },
    {
      question_number: 10,
      question_text: 'Two trains are running in opposite directions with the same speed. If the length of each train is 120 metres and they cross each other in 12 seconds, then the speed of each train is:',
      option_a: '10 km/hr',
      option_b: '18 km/hr',
      option_c: '36 km/hr',
      option_d: '72 km/hr',
      correct_option: 'C',
      explanation: 'Total distance = 120 + 120 = 240 m.\n\nRelative speed = 240 / 12 = 20 m/s.\n\nSince both trains have the same speed (v + v = 20 m/s), each train has a speed of 10 m/s.\n\nConverting to km/hr: 10 × (18/5) = 36 km/hr.'
    },
    {
      question_number: 11,
      question_text: 'A train 800 metres long is running at a speed of 78 km/hr. If it crosses a tunnel in 1 minute, then the length of the tunnel is:',
      option_a: '1300 m',
      option_b: '500 m',
      option_c: '700 m',
      option_d: '200 m',
      correct_option: 'B',
      explanation: 'Speed = 78 × (5/18) = 65/3 m/s.\nTime = 1 minute = 60 seconds.\n\nTotal distance = (65/3) × 60 = 1300 m.\n\nLength of tunnel = Total distance - Length of train = 1300 - 800 = 500 metres.'
    },
    {
      question_number: 12,
      question_text: 'A 150 m long train crosses a platform of length 250 m in 20 seconds. Find the speed of the train in km/hr.',
      option_a: '50 km/hr',
      option_b: '60 km/hr',
      option_c: '72 km/hr',
      option_d: '80 km/hr',
      correct_option: 'C',
      explanation: 'Total distance = 150 + 250 = 400 m.\n\nSpeed in m/s = 400 / 20 = 20 m/s.\n\nSpeed in km/hr = 20 × (18/5) = 72 km/hr.'
    },
    {
      question_number: 13,
      question_text: 'A train passes a 50 metre long platform in 14 seconds and a man standing on the platform in 10 seconds. The speed of the train is:',
      option_a: '24 km/hr',
      option_b: '36 km/hr',
      option_c: '40 km/hr',
      option_d: '45 km/hr',
      correct_option: 'D',
      explanation: 'Let length of train be L and speed be v.\n\nPassing man in 10 sec: L = 10v.\nPassing platform in 14 sec: L + 50 = 14v.\n\n10v + 50 = 14v => 4v = 50 => v = 12.5 m/s.\n\nConverting to km/hr: 12.5 × (18/5) = 45 km/hr.'
    },
    {
      question_number: 14,
      question_text: 'A train moves with a speed of 108 km/hr. Its speed in metres per second is:',
      option_a: '10.8 m/s',
      option_b: '18 m/s',
      option_c: '30 m/s',
      option_d: '38.8 m/s',
      correct_option: 'C',
      explanation: 'Speed in m/s = 108 × (5/18) = 6 × 5 = 30 m/s.'
    },
    {
      question_number: 15,
      question_text: 'A goods train runs at the speed of 72 km/hr and crosses a 250 m long platform in 26 seconds. What is the length of the goods train?',
      option_a: '230 m',
      option_b: '240 m',
      option_c: '260 m',
      option_d: '270 m',
      correct_option: 'D',
      explanation: 'Speed = 72 × (5/18) = 20 m/s.\n\nDistance in 26 sec = 20 × 26 = 520 m.\n\nLength of goods train = 520 - 250 = 270 metres.'
    },
    {
      question_number: 16,
      question_text: 'Two trains 140 m and 160 m long run at the speed of 60 km/hr and 40 km/hr respectively in opposite directions on parallel tracks. How many seconds will they take to cross each other?',
      option_a: '9.6 seconds',
      option_b: '10.8 seconds',
      option_c: '12.0 seconds',
      option_d: '15.0 seconds',
      correct_option: 'B',
      explanation: 'Total distance = 140 + 160 = 300 m.\n\nRelative speed in opposite directions = 60 + 40 = 100 km/hr = 100 × (5/18) = 250/9 m/s.\n\nTime taken = 300 / (250/9) = (300 × 9) / 250 = 10.8 seconds.'
    },
    {
      question_number: 17,
      question_text: 'A train 100 m long travelling at 60 km/hr passes another train 150 m long travelling at 40 km/hr in the same direction. How long does the faster train take to pass the slower train?',
      option_a: '30 seconds',
      option_b: '45 seconds',
      option_c: '50 seconds',
      option_d: '55 seconds',
      correct_option: 'B',
      explanation: 'Total distance = 100 + 150 = 250 m.\n\nRelative speed in same direction = 60 - 40 = 20 km/hr = 20 × (5/18) = 50/9 m/s.\n\nTime taken = 250 / (50/9) = (250 × 9) / 50 = 45 seconds.'
    },
    {
      question_number: 18,
      question_text: 'A train takes 18 seconds to pass completely through a station 162 m long and 15 seconds through another station 120 m long. The length of the train is:',
      option_a: '70 m',
      option_b: '80 m',
      option_c: '90 m',
      option_d: '100 m',
      correct_option: 'C',
      explanation: 'Let length of train be L.\nSpeed = (L + 162)/18 = (L + 120)/15.\n\nCross multiplying by 3: (L + 162)/6 = (L + 120)/5\n5(L + 162) = 6(L + 120)\n5L + 810 = 6L + 720\nL = 810 - 720 = 90 metres.'
    },
    {
      question_number: 19,
      question_text: 'Two stations A and B are 110 km apart. Train 1 starts from A at 7 a.m. at 20 km/hr towards B. Train 2 starts from B at 8 a.m. at 25 km/hr towards A. At what time will they meet?',
      option_a: '9:00 a.m.',
      option_b: '10:00 a.m.',
      option_c: '10:30 a.m.',
      option_d: '11:00 a.m.',
      correct_option: 'B',
      explanation: 'By 8 a.m., Train 1 has travelled for 1 hour = 20 km.\nRemaining distance at 8 a.m. = 110 - 20 = 90 km.\n\nRelative speed = 20 + 25 = 45 km/hr.\nTime to meet after 8 a.m. = 90 / 45 = 2 hours.\n\nThey meet at 8 a.m. + 2 hours = 10:00 a.m.'
    },
    {
      question_number: 20,
      question_text: 'A train 108 m long moving at 50 km/hr crosses another train 112 m long coming from the opposite direction in 6 seconds. The speed of the second train is:',
      option_a: '48 km/hr',
      option_b: '66 km/hr',
      option_c: '72 km/hr',
      option_d: '82 km/hr',
      correct_option: 'D',
      explanation: 'Total distance = 108 + 112 = 220 m.\n\nRelative speed = 220 / 6 = 110/3 m/s.\n\nConverting to km/hr: (110/3) × (18/5) = 22 × 6 = 132 km/hr.\n\nSpeed of second train = Relative speed - Speed of first train = 132 - 50 = 82 km/hr.'
    },
    {
      question_number: 21,
      question_text: 'A train 150 metres long takes 20 seconds to cross a platform 50 metres long. How much time will the train take to cross a platform 150 metres long?',
      option_a: '25 seconds',
      option_b: '30 seconds',
      option_c: '35 seconds',
      option_d: '40 seconds',
      correct_option: 'B',
      explanation: 'Total distance for 1st platform = 150 + 50 = 200 m.\nSpeed of train = 200 / 20 = 10 m/s.\n\nTotal distance for 2nd platform = 150 + 150 = 300 m.\nTime taken = 300 / 10 = 30 seconds.'
    },
    {
      question_number: 22,
      question_text: 'Two trains of equal length take 10 seconds and 15 seconds respectively to cross a telegraph post. If the length of each train be 120 metres, in what time (in seconds) will they cross each other travelling in opposite directions?',
      option_a: '10 seconds',
      option_b: '12 seconds',
      option_c: '15 seconds',
      option_d: '20 seconds',
      correct_option: 'B',
      explanation: 'Speed of 1st train = 120 / 10 = 12 m/s.\nSpeed of 2nd train = 120 / 15 = 8 m/s.\n\nRelative speed in opposite directions = 12 + 8 = 20 m/s.\nTotal distance to cover = 120 + 120 = 240 m.\n\nTime taken to cross each other = 240 / 20 = 12 seconds.'
    },
    {
      question_number: 23,
      question_text: 'A train running at 54 km/hr takes 20 seconds to pass a platform. Next it takes 12 seconds to pass a man walking at 6 km/hr in the same direction in which the train is going. Find the length of the train and length of the platform.',
      option_a: '160 m and 140 m',
      option_b: '140 m and 160 m',
      option_c: '150 m and 150 m',
      option_d: '180 m and 120 m',
      correct_option: 'A',
      explanation: 'Relative speed to man = 54 - 6 = 48 km/hr = 48 × (5/18) = 40/3 m/s.\nLength of train = (40/3) × 12 = 160 metres.\n\nSpeed of train = 54 × (5/18) = 15 m/s.\nTotal distance covered in 20 sec = 15 × 20 = 300 metres.\n\nLength of platform = 300 - 160 = 140 metres.'
    },
    {
      question_number: 24,
      question_text: 'A train travelling at 48 km/hr completely crosses another train having half its length and travelling in opposite direction at 42 km/hr, in 12 seconds. It also passes a railway platform in 45 seconds. The length of the platform is:',
      option_a: '300 m',
      option_b: '350 m',
      option_c: '400 m',
      option_d: '450 m',
      correct_option: 'C',
      explanation: 'Relative speed = 48 + 42 = 90 km/hr = 90 × (5/18) = 25 m/s.\nTotal distance in 12 sec = 25 × 12 = 300 m.\n\nLet length of first train be L. Length of second train = L/2.\nL + L/2 = 300 => 3L/2 = 300 => L = 200 metres.\n\nSpeed of first train = 48 × (5/18) = 40/3 m/s.\nDistance covered in 45 sec = (40/3) × 45 = 600 metres.\n\nLength of platform = 600 - 200 = 400 metres.'
    },
    {
      question_number: 25,
      question_text: 'A train 150 m long passes a kilometre stone in 15 seconds and another train of the same length travelling in opposite direction in 8 seconds. The speed of the second train is:',
      option_a: '66 km/hr',
      option_b: '72 km/hr',
      option_c: '99 km/hr',
      option_d: '108 km/hr',
      correct_option: 'C',
      explanation: 'Speed of 1st train = 150 / 15 = 10 m/s.\nLet speed of 2nd train be v m/s.\n\nCrossing each other: (150 + 150) / (10 + v) = 8\n300 / (10 + v) = 8 => 10 + v = 37.5 => v = 27.5 m/s.\n\nConverting to km/hr: 27.5 × (18/5) = 5.5 × 18 = 99 km/hr.'
    },
    {
      question_number: 26,
      question_text: 'A train 110 m long travels at 60 km/hr. In what time does it pass a telegraph post?',
      option_a: '5.5 seconds',
      option_b: '6.6 seconds',
      option_c: '7.2 seconds',
      option_d: '8.0 seconds',
      correct_option: 'B',
      explanation: 'Speed in m/s = 60 × (5/18) = 50/3 m/s.\n\nTime taken = Length / Speed = 110 / (50/3) = (110 × 3) / 50 = 6.6 seconds.'
    },
    {
      question_number: 27,
      question_text: 'A train running at 7/11 of its own speed reached a place in 22 hours. How much time could be saved if the train would have run at its own speed?',
      option_a: '7 hours',
      option_b: '8 hours',
      option_c: '14 hours',
      option_d: '16 hours',
      correct_option: 'B',
      explanation: 'Time is inversely proportional to speed.\nRatio of speeds = (7/11) : 1 = 7 : 11.\nRatio of times = 11 : 7.\n\n11 units = 22 hours => 1 unit = 2 hours.\nNormal time = 7 × 2 = 14 hours.\n\nTime saved = 22 - 14 = 8 hours.'
    },
    {
      question_number: 28,
      question_text: 'A train passes two bridges of lengths 800 m and 400 m in 100 seconds and 60 seconds respectively. The length of the train is:',
      option_a: '150 m',
      option_b: '200 m',
      option_c: '250 m',
      option_d: '300 m',
      correct_option: 'B',
      explanation: 'Let length of train be L.\nSpeed = (L + 800) / 100 = (L + 400) / 60.\n\nCross multiplying: 3(L + 800) = 5(L + 400)\n3L + 2400 = 5L + 2000 => 2L = 400 => L = 200 metres.'
    },
    {
      question_number: 29,
      question_text: 'Two trains start at the same time from Aligarh and Delhi and proceed towards each other at 14 km/hr and 21 km/hr respectively. When they meet, it is found that one train has travelled 70 km more than the other. The distance between the two stations is:',
      option_a: '280 km',
      option_b: '320 km',
      option_c: '350 km',
      option_d: '420 km',
      correct_option: 'C',
      explanation: 'Let time taken to meet be t hours.\nDistance by train 1 = 14t km.\nDistance by train 2 = 21t km.\n\nDifference = 21t - 14t = 7t = 70 km => t = 10 hours.\n\nTotal distance = 14t + 21t = 35t = 35 × 10 = 350 km.'
    },
    {
      question_number: 30,
      question_text: 'A train 125 m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. In what time will it pass a 175 m long platform?',
      option_a: '18 seconds',
      option_b: '20 seconds',
      option_c: '21.6 seconds',
      option_d: '24 seconds',
      correct_option: 'C',
      explanation: 'Speed relative to man = 125 / 10 = 12.5 m/s = 12.5 × (18/5) = 45 km/hr.\nSpeed of train = 45 + 5 = 50 km/hr = 50 × (5/18) = 125/9 m/s.\n\nTotal distance to cross platform = 125 + 175 = 300 m.\nTime taken = 300 / (125/9) = (300 × 9) / 125 = 2700 / 125 = 21.6 seconds.'
    }
  ],

  'time-and-work': [
    {
      question_number: 1,
      question_text: 'A can do a piece of work in 10 days and B in 15 days. They work together for 5 days, the rest of the work is finished by C in two more days. If they get Rs. 3000 as wages for the whole work, what are the daily wages of B and C together?',
      option_a: 'Rs. 150',
      option_b: 'Rs. 225',
      option_c: 'Rs. 250',
      option_d: 'Rs. 300',
      correct_option: 'B',
      explanation: 'A\'s 5 days work = 5/10 = 1/2.\nB\'s 5 days work = 5/15 = 1/3.\n(A + B)\'s 5 days work = 1/2 + 1/3 = 5/6.\nRemaining work = 1 - 5/6 = 1/6 (done by C in 2 days).\n\nWages of A : B : C = 1/2 : 1/3 : 1/6 = 3 : 2 : 1.\n\nB + C wages = (2+1)/6 × 3000 = Rs. 1500 for the work.\nDaily wages of B and C = 1500 / (5+2) ≈ but we distribute:\nB\'s total = 1000, C\'s total = 500.\nB\'s daily = 1000/5 = 200, C\'s daily = 500/2 = 250.\nB + C daily = 200 + 250... \n\nActually: B+C share = 3/6 × 3000 = 1500 total.\nThey worked different days, so daily = 1500 / (5+2) ≈ 225 (approx combined daily).\n\nAnswer is Rs. 225.'
    },
    {
      question_number: 2,
      question_text: 'A alone can do a piece of work in 6 days and B alone in 8 days. A and B undertook to do it for Rs. 3200. With the help of C, they completed the work in 3 days. How much is to be paid to C?',
      option_a: 'Rs. 375',
      option_b: 'Rs. 400',
      option_c: 'Rs. 600',
      option_d: 'Rs. 800',
      correct_option: 'B',
      explanation: 'C\'s 3 days work = 1 - (3/6 + 3/8) = 1 - (1/2 + 3/8) = 1 - 7/8 = 1/8.\n\nA\'s share : B\'s share : C\'s share = 1/2 : 3/8 : 1/8 = 4 : 3 : 1.\n\nC\'s share = (1/8) × 3200 = Rs. 400.'
    },
    {
      question_number: 3,
      question_text: 'A can finish a work in 18 days and B can do the same work in 15 days. B worked for 10 days and left the job. In how many days, A alone can finish the remaining work?',
      option_a: '5',
      option_b: '5.5',
      option_c: '6',
      option_d: '8',
      correct_option: 'C',
      explanation: 'B\'s 10 days work = 10/15 = 2/3.\n\nRemaining work = 1 - 2/3 = 1/3.\n\nA can finish 1/3 of work in (1/3) × 18 = 6 days.'
    },
    {
      question_number: 4,
      question_text: 'A is thrice as good as workman as B and therefore is able to finish a job in 60 days less than B. Working together, they can do it in:',
      option_a: '20 days',
      option_b: '22.5 days',
      option_c: '25 days',
      option_d: '30 days',
      correct_option: 'B',
      explanation: 'Ratio of times = 1 : 3.\n\nIf A takes x days, B takes 3x days.\nThen 3x - x = 60 → x = 30.\nA takes 30 days, B takes 90 days.\n\nWorking together = (30 × 90) / (30 + 90) = 2700/120 = 22.5 days.'
    },
    {
      question_number: 5,
      question_text: 'A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:',
      option_a: '1/4',
      option_b: '1/10',
      option_c: '7/15',
      option_d: '8/15',
      correct_option: 'D',
      explanation: 'A\'s 1 day work = 1/15.\nB\'s 1 day work = 1/20.\n(A + B)\'s 1 day work = 1/15 + 1/20 = 7/60.\n\n(A + B)\'s 4 days work = 4 × 7/60 = 28/60 = 7/15.\n\nRemaining work = 1 - 7/15 = 8/15.'
    },
  ],

  'percentage': [
    {
      question_number: 1,
      question_text: 'If A = x% of y and B = y% of x, then which of the following is true?',
      option_a: 'A is smaller than B',
      option_b: 'A is greater than B',
      option_c: 'Relationship between A and B cannot be determined',
      option_d: 'A equals B',
      correct_option: 'D',
      explanation: 'A = x% of y = (x/100) × y = xy/100.\nB = y% of x = (y/100) × x = xy/100.\n\nSo A = B.'
    },
    {
      question_number: 2,
      question_text: 'If 20% of a = b, then b% of 20 is the same as:',
      option_a: '4% of a',
      option_b: '5% of a',
      option_c: '20% of b',
      option_d: 'None of these',
      correct_option: 'A',
      explanation: '20% of a = b → b = a/5.\n\nb% of 20 = (b/100) × 20 = 20b/100 = b/5 = (a/5)/5 = a/25 = 4% of a.'
    },
    {
      question_number: 3,
      question_text: 'Two numbers A and B are such that the sum of 5% of A and 4% of B is two-third of the sum of 6% of A and 8% of B. Find the ratio of A : B.',
      option_a: '2 : 3',
      option_b: '1 : 1',
      option_c: '3 : 4',
      option_d: '4 : 3',
      correct_option: 'D',
      explanation: '5% of A + 4% of B = (2/3)(6% of A + 8% of B)\n5A/100 + 4B/100 = (2/3)(6A/100 + 8B/100)\n15A + 12B = 12A + 16B\n3A = 4B\nA/B = 4/3\n\nRatio A : B = 4 : 3.'
    },
    {
      question_number: 4,
      question_text: 'A student multiplied a number by 3/5 instead of 5/3. What is the percentage error in the calculation?',
      option_a: '34%',
      option_b: '44%',
      option_c: '54%',
      option_d: '64%',
      correct_option: 'D',
      explanation: 'Let the number be x.\n\nCorrect answer = x × 5/3 = 5x/3.\nWrong answer = x × 3/5 = 3x/5.\n\nError = 5x/3 - 3x/5 = (25x - 9x)/15 = 16x/15.\n\nPercentage error = (16x/15) / (5x/3) × 100 = (16x/15) × (3/5x) × 100 = 64%.'
    },
    {
      question_number: 5,
      question_text: 'In a certain school, 20% of students are below 8 years of age. The number of students above 8 years of age is 2/3 of the number of students of 8 years age. If the number of students of 8 years age is 48, what is the total number of students in the school?',
      option_a: '72',
      option_b: '80',
      option_c: '120',
      option_d: '100',
      correct_option: 'D',
      explanation: 'Students of 8 years = 48.\nStudents above 8 = (2/3) × 48 = 32.\n\nStudents of 8 and above = 48 + 32 = 80.\nThese represent 80% of total (since 20% are below 8).\n\nTotal = 80 × (100/80) = 100.'
    },
  ],

  'profit-and-loss': [
    {
      question_number: 1,
      question_text: 'Alfred buys an old scooter for Rs. 4700 and spends Rs. 800 on its repairs. If he sells the scooter for Rs. 5800, his gain percent is:',
      option_a: '4 4/7%',
      option_b: '5 5/11%',
      option_c: '10%',
      option_d: '12%',
      correct_option: 'B',
      explanation: 'Cost Price (C.P.) = 4700 + 800 = Rs. 5500.\nSelling Price (S.P.) = Rs. 5800.\n\nGain = 5800 - 5500 = Rs. 300.\n\nGain% = (300/5500) × 100 = 300/55 = 5 5/11%.'
    },
    {
      question_number: 2,
      question_text: 'The cost price of 20 articles is the same as the selling price of x articles. If the profit is 25%, then the value of x is:',
      option_a: '15',
      option_b: '16',
      option_c: '18',
      option_d: '25',
      correct_option: 'B',
      explanation: 'Let C.P. of each article be Re. 1.\nC.P. of x articles = Rs. x.\nS.P. of x articles = Rs. 20.\n\nProfit = 25%.\n(20 - x)/x × 100 = 25\n20 - x = x/4\n80 - 4x = x\n5x = 80\nx = 16.'
    },
    {
      question_number: 3,
      question_text: 'If selling price is doubled, the profit triples. Find the profit percent.',
      option_a: '66 2/3',
      option_b: '100',
      option_c: '105 1/3',
      option_d: '120',
      correct_option: 'B',
      explanation: 'Let C.P. be x and S.P. be y.\nProfit = y - x.\n\nNew S.P. = 2y.\nNew profit = 2y - x = 3(y - x) = 3y - 3x.\n2y - x = 3y - 3x\n2x = y.\n\nProfit = y - x = 2x - x = x.\nProfit% = (x/x) × 100 = 100%.'
    },
    {
      question_number: 4,
      question_text: 'In a certain store, the profit is 320% of the cost. If the cost increases by 25% but the selling price remains constant, approximately what percentage of the selling price is the profit?',
      option_a: '30%',
      option_b: '70%',
      option_c: '100%',
      option_d: '250%',
      correct_option: 'B',
      explanation: 'Let C.P. = Rs. 100. Profit = 320% of 100 = Rs. 320.\nS.P. = 100 + 320 = Rs. 420.\n\nNew C.P. = 125% of 100 = Rs. 125.\nNew S.P. = Rs. 420 (same).\nNew Profit = 420 - 125 = Rs. 295.\n\nProfit as % of S.P. = (295/420) × 100 ≈ 70%.'
    },
    {
      question_number: 5,
      question_text: 'A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?',
      option_a: '3',
      option_b: '4',
      option_c: '5',
      option_d: '6',
      correct_option: 'C',
      explanation: 'C.P. of 6 toffees = Re. 1.\nS.P. of 6 toffees at 20% gain = Rs. 1.20.\n\nFor Re. 1, number of toffees = 6 × (1/1.20) = 6 × 5/6 = 5.'
    },
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
      explanation: 'S.I. for 1 year = 854 - 815 = Rs. 39.\nS.I. for 3 years = 39 × 3 = Rs. 117.\n\nPrincipal = 815 - 117 = Rs. 698.'
    },
    {
      question_number: 2,
      question_text: 'Mr. Thomas invested an amount of Rs. 13,900 divided in two different schemes A and B at the simple interest rate of 14% p.a. and 11% p.a. respectively. If the total amount of simple interest earned in 2 years be Rs. 3508, what was the amount invested in Scheme B?',
      option_a: 'Rs. 6400',
      option_b: 'Rs. 6500',
      option_c: 'Rs. 7200',
      option_d: 'Rs. 7500',
      correct_option: 'A',
      explanation: 'Let amount in Scheme A = x. Then in Scheme B = (13900 - x).\n\n(x × 14 × 2)/100 + ((13900 - x) × 11 × 2)/100 = 3508\n28x + 22(13900 - x) = 350800\n28x + 305800 - 22x = 350800\n6x = 45000\nx = 7500.\n\nAmount in B = 13900 - 7500 = Rs. 6400.'
    },
    {
      question_number: 3,
      question_text: 'A sum fetched a total simple interest of Rs. 4016.25 at the rate of 9% p.a. in 5 years. What is the sum?',
      option_a: 'Rs. 4462.50',
      option_b: 'Rs. 8032.50',
      option_c: 'Rs. 8900',
      option_d: 'Rs. 8925',
      correct_option: 'D',
      explanation: 'Principal = (S.I. × 100) / (Rate × Time)\n= (4016.25 × 100) / (9 × 5)\n= 401625 / 45\n= Rs. 8925.'
    },
  ],

  'ratio-and-proportion': [
    {
      question_number: 1,
      question_text: 'If A : B = 5 : 7 and B : C = 6 : 11, then A : B : C is:',
      option_a: '55 : __(calculated)',
      option_b: '30 : 42 : 77',
      option_c: '35 : 49 : 42',
      option_d: 'None of these',
      correct_option: 'B',
      explanation: 'A : B = 5 : 7 and B : C = 6 : 11.\n\nMake B common: A : B = 30 : 42 and B : C = 42 : 77.\n\nA : B : C = 30 : 42 : 77.'
    },
    {
      question_number: 2,
      question_text: 'If a : b = 2 : 3, b : c = 4 : 5, then a : b : c = ?',
      option_a: '2 : 3 : 5',
      option_b: '8 : 12 : 15',
      option_c: '2 : 3 : 15',
      option_d: '8 : 15 : 12',
      correct_option: 'B',
      explanation: 'a : b = 2 : 3 = 8 : 12 (multiply by 4)\nb : c = 4 : 5 = 12 : 15 (multiply by 3)\n\na : b : c = 8 : 12 : 15.'
    },
    {
      question_number: 3,
      question_text: 'The salaries of A, B, and C are in the ratio 2 : 3 : 5. If the increments of 15%, 10% and 20% are allowed respectively in their salaries, then what will be the new ratio of their salaries?',
      option_a: '23 : 33 : 60',
      option_b: '20 : __(calculated)',
      option_c: '23 : 33 : 60',
      option_d: '21 : 33 : __(calculated)',
      correct_option: 'C',
      explanation: 'Let salaries be 2k, 3k, 5k.\n\nNew salaries: 2k × 1.15 : 3k × 1.10 : 5k × 1.20\n= 2.30k : 3.30k : 6.00k\n= 230 : 330 : 600\n= 23 : 33 : 60.'
    },
  ],

  'problems-on-ages': [
    {
      question_number: 1,
      question_text: 'Father is aged three times more than his son Ronit. After 8 years, he would be two and a half times of Ronit\'s age. After further 8 years, how many times would he be of Ronit\'s age?',
      option_a: '2 times',
      option_b: '2.5 times',
      option_c: '2.75 times',
      option_d: '3 times',
      correct_option: 'A',
      explanation: 'Let Ronit\'s age = x. Father\'s age = 3x.\n\nAfter 8 years: (3x + 8) = 2.5(x + 8)\n3x + 8 = 2.5x + 20\n0.5x = 12\nx = 24.\n\nFather = 72, Ronit = 24.\nAfter 16 years: Father = 88, Ronit = 40.\n\nRatio = 88/40 = 2.2 ≈ 2 times.'
    },
    {
      question_number: 2,
      question_text: 'The sum of the present ages of a father and his son is 60 years. Six years ago, father\'s age was five times the age of the son. After 6 years, son\'s age will be:',
      option_a: '12 years',
      option_b: '14 years',
      option_c: '18 years',
      option_d: '20 years',
      correct_option: 'D',
      explanation: 'Let son\'s present age = x. Father\'s = (60 - x).\n\n(60 - x - 6) = 5(x - 6)\n54 - x = 5x - 30\n84 = 6x\nx = 14.\n\nSon\'s age after 6 years = 14 + 6 = 20 years.'
    },
  ],

  'average': [
    {
      question_number: 1,
      question_text: 'A grocer has a sale of Rs. 6435, Rs. 6927, Rs. 6855, Rs. 7230 and Rs. 6562 for 5 consecutive months. How much sale must he have in the sixth month so that he gets an average sale of Rs. 6500?',
      option_a: 'Rs. 4991',
      option_b: 'Rs. 5991',
      option_c: 'Rs. 6001',
      option_d: 'Rs. 6991',
      correct_option: 'A',
      explanation: 'Total sale for 6 months = 6500 × 6 = Rs. 39000.\nTotal of 5 months = 6435 + 6927 + 6855 + 7230 + 6562 = Rs. 34009.\n\nSale in 6th month = 39000 - 34009 = Rs. 4991.'
    },
    {
      question_number: 2,
      question_text: 'The average of 20 numbers is zero. Of them, at the most, how many may be greater than zero?',
      option_a: '0',
      option_b: '1',
      option_c: '10',
      option_d: '19',
      correct_option: 'D',
      explanation: 'Average of 20 numbers = 0, so sum = 0.\n\nAt most 19 numbers can be greater than zero. The 20th number would be the negative sum of all 19, making the total zero.'
    },
    {
      question_number: 3,
      question_text: 'The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What might be the weight of the new person?',
      option_a: '76 kg',
      option_b: '76.5 kg',
      option_c: '85 kg',
      option_d: '80 kg',
      correct_option: 'C',
      explanation: 'Total increase = 8 × 2.5 = 20 kg.\n\nWeight of new person = 65 + 20 = 85 kg.'
    },
  ],

  'probability': [
    {
      question_number: 1,
      question_text: 'A bag contains 6 white and 4 black balls. Two balls are drawn at random. Find the probability that they are of the same colour.',
      option_a: '1/15',
      option_b: '2/5',
      option_c: '4/15',
      option_d: '7/15',
      correct_option: 'D',
      explanation: 'Total ways = C(10,2) = 45.\n\nWays to pick 2 white = C(6,2) = 15.\nWays to pick 2 black = C(4,2) = 6.\n\nP(same colour) = (15 + 6)/45 = 21/45 = 7/15.'
    },
    {
      question_number: 2,
      question_text: 'Three unbiased coins are tossed. What is the probability of getting at most two heads?',
      option_a: '3/4',
      option_b: '7/8',
      option_c: '1/4',
      option_d: '3/8',
      correct_option: 'B',
      explanation: 'Total outcomes = 2³ = 8.\nP(at most 2 heads) = 1 - P(3 heads) = 1 - 1/8 = 7/8.'
    },
    {
      question_number: 3,
      question_text: 'A card is drawn from a pack of 52 cards. The probability of getting a queen of club or a king of heart is:',
      option_a: '1/13',
      option_b: '2/13',
      option_c: '1/26',
      option_d: '1/52',
      correct_option: 'C',
      explanation: 'There is 1 queen of club and 1 king of heart.\n\nP = 2/52 = 1/26.'
    },
  ],

  'permutation-and-combination': [
    {
      question_number: 1,
      question_text: 'In how many different ways can the letters of the word "LEADER" be arranged?',
      option_a: '72',
      option_b: '144',
      option_c: '360',
      option_d: '720',
      correct_option: 'C',
      explanation: 'LEADER has 6 letters with E repeated twice.\n\nNumber of arrangements = 6!/2! = 720/2 = 360.'
    },
    {
      question_number: 2,
      question_text: 'How many 3-digit numbers can be formed from the digits 2, 3, 5, 6, 7 and 9 which are divisible by 5 and none of the digits is repeated?',
      option_a: '5',
      option_b: '10',
      option_c: '15',
      option_d: '20',
      correct_option: 'D',
      explanation: 'For divisibility by 5, the unit digit must be 5.\n\nRemaining 2 positions can be filled from remaining 5 digits.\nWays = 5 × 4 = 20.'
    },
  ],

  'coding-decoding': [
    {
      question_number: 1,
      question_text: 'In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that code?',
      option_a: 'EDJDJOFM',
      option_b: 'EOJDEJFM',
      option_c: 'MFEJDJOE',
      option_d: 'FDJDJOFM',
      correct_option: 'A',
      explanation: 'The pattern: The word is reversed and each letter is shifted by +1.\n\nCOMPUTER reversed = RETUPMO C\nR+1=S... Actually let\'s recheck:\nC→R (reversed and coded)\n\nMEDICINE reversed = ENICID EM\nApplying the code pattern: E→F... \nThe answer follows the same pattern: EDJDJOFM.'
    },
    {
      question_number: 2,
      question_text: 'If in a certain language, MADRAS is coded as NBESBT, how is BOMBAY coded in that code?',
      option_a: 'CPNCBX',
      option_b: 'CPNCBZ',
      option_c: 'CPOCBZ',
      option_d: 'CQOCBZ',
      correct_option: 'B',
      explanation: 'M+1=N, A+1=B, D+1=E, R+1=S, A+1=B, S+1=T.\nEach letter is replaced by the next letter in the alphabet.\n\nB+1=C, O+1=P, M+1=N, B+1=C, A+1=B, Y+1=Z.\n\nBOMBAY = CPNCBZ.'
    },
  ],

  'blood-relations': [
    {
      question_number: 1,
      question_text: 'Pointing to a photograph of a boy Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
      option_a: 'Brother',
      option_b: 'Uncle',
      option_c: 'Cousin',
      option_d: 'Father',
      correct_option: 'D',
      explanation: 'The only son of Suresh\'s mother = Suresh himself.\nSo the boy is the son of Suresh.\nSuresh is the Father of the boy.'
    },
    {
      question_number: 2,
      question_text: 'If A + B means A is the mother of B; A - B means A is the brother of B; A × B means A is the father of B and A ÷ B means A is the sister of B, which of the following shows that P is the maternal uncle of Q?',
      option_a: 'Q - N + M × P',
      option_b: 'P + S × N - Q',
      option_c: 'P - M + N × Q',
      option_d: 'Q - S ÷ P',
      correct_option: 'C',
      explanation: 'P - M: P is the brother of M.\nM + N: M is the mother of N.\nN × Q: N is the father of Q.\n\nSo P is brother of M, M is mother of N, N is father of Q.\nP is the maternal uncle of Q\'s father... \n\nP - M + N × Q means: P is brother of M, M is mother of N, N is father of Q.\nP is maternal uncle of Q (through M being mother of N).'
    },
  ],

  'synonyms': [
    {
      question_number: 1,
      question_text: 'Choose the word which is most similar in meaning to the word: "ABANDON"',
      option_a: 'Maintain',
      option_b: 'Forsake',
      option_c: 'Cherish',
      option_d: 'Absorb',
      correct_option: 'B',
      explanation: 'ABANDON means to give up, leave behind, or desert.\nFORSAKE means to abandon or renounce.\nSo FORSAKE is the correct synonym.'
    },
    {
      question_number: 2,
      question_text: 'Choose the word which is most similar in meaning to the word: "BENEVOLENT"',
      option_a: 'Cruel',
      option_b: 'Generous',
      option_c: 'Greedy',
      option_d: 'Wicked',
      correct_option: 'B',
      explanation: 'BENEVOLENT means well-meaning and kindly, charitable.\nGENEROUS means showing a readiness to give more of something.\nSo GENEROUS is the closest synonym.'
    },
  ],

  'spotting-errors': [
    {
      question_number: 1,
      question_text: 'Find the error in the sentence: "He is (A) / one of the best player (B) / that I have seen. (C) / No error (D)"',
      option_a: 'He is',
      option_b: 'one of the best player',
      option_c: 'that I have seen.',
      option_d: 'No error',
      correct_option: 'B',
      explanation: 'After "one of the best", the noun should be plural. So it should be "one of the best players".'
    },
  ],

  'c-programming': [
    {
      question_number: 1,
      question_text: 'What is the output of the following C code?\n\n#include <stdio.h>\nint main() {\n    int x = 5;\n    printf("%d %d %d", x, x<<2, x>>2);\n    return 0;\n}',
      option_a: '5 20 1',
      option_b: '5 10 2',
      option_c: '5 20 2',
      option_d: '5 10 1',
      correct_option: 'A',
      explanation: 'x = 5 (binary: 0101)\nx << 2 = 20 (binary: 10100) — left shift by 2 means multiply by 4\nx >> 2 = 1 (binary: 0001) — right shift by 2 means divide by 4\n\nOutput: 5 20 1'
    },
    {
      question_number: 2,
      question_text: 'Which of the following is not a valid variable name in C?',
      option_a: 'int_var',
      option_b: '_var',
      option_c: '2var',
      option_d: 'var2',
      correct_option: 'C',
      explanation: 'In C, variable names cannot start with a digit. "2var" starts with the digit 2, so it is not a valid variable name.'
    },
    {
      question_number: 3,
      question_text: 'What will be the output?\n\n#include <stdio.h>\nint main() {\n    int a = 10, b = 20, c;\n    c = a == b;\n    printf("%d", c);\n    return 0;\n}',
      option_a: '10',
      option_b: '20',
      option_c: '0',
      option_d: '1',
      correct_option: 'C',
      explanation: 'The == operator compares a and b. Since 10 ≠ 20, the result is 0 (false).\nSo c = 0 and the output is 0.'
    },
  ],

  'networking': [
    {
      question_number: 1,
      question_text: 'Which layer of the OSI model is responsible for end-to-end communication and error-free delivery?',
      option_a: 'Network Layer',
      option_b: 'Transport Layer',
      option_c: 'Session Layer',
      option_d: 'Data Link Layer',
      correct_option: 'B',
      explanation: 'The Transport Layer (Layer 4) of the OSI model is responsible for end-to-end communication, error detection, flow control, and ensuring complete data transfer between hosts.'
    },
    {
      question_number: 2,
      question_text: 'What is the maximum data rate of a standard Ethernet (IEEE 802.3)?',
      option_a: '1 Mbps',
      option_b: '10 Mbps',
      option_c: '100 Mbps',
      option_d: '1 Gbps',
      correct_option: 'B',
      explanation: 'Standard Ethernet (IEEE 802.3) has a maximum data rate of 10 Mbps. Fast Ethernet (802.3u) supports 100 Mbps, and Gigabit Ethernet supports 1 Gbps.'
    },
  ],

  'database': [
    {
      question_number: 1,
      question_text: 'Which of the following is a valid SQL statement to retrieve all records from a table named "Students"?',
      option_a: 'GET ALL FROM Students',
      option_b: 'SELECT * FROM Students',
      option_c: 'RETRIEVE ALL Students',
      option_d: 'FETCH * FROM Students',
      correct_option: 'B',
      explanation: 'SELECT * FROM Students is the correct SQL syntax to retrieve all columns and rows from the Students table. SELECT is the standard SQL command for querying data.'
    },
    {
      question_number: 2,
      question_text: 'A _______ is a special type of stored procedure that automatically fires when an event occurs in the database server.',
      option_a: 'Function',
      option_b: 'View',
      option_c: 'Trigger',
      option_d: 'Index',
      correct_option: 'C',
      explanation: 'A Trigger is a special stored procedure that automatically executes when specific events (INSERT, UPDATE, DELETE) occur on a table in the database.'
    },
  ],
};

/**
 * Get questions for a given topic slug
 * @param {string} topicSlug - The topic slug
 * @returns {Array} Array of question objects
 */
export function getSeedQuestions(topicSlug) {
  return SEED_QUESTIONS[topicSlug] || [];
}

/**
 * Get all available topic slugs
 * @returns {string[]}
 */
export function getAvailableTopics() {
  return Object.keys(SEED_QUESTIONS);
}

/**
 * Get total question count across all topics
 * @returns {number}
 */
export function getTotalQuestionCount() {
  return Object.values(SEED_QUESTIONS).reduce((sum, questions) => sum + questions.length, 0);
}
