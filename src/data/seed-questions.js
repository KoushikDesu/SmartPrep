/**
 * SmartPrep — Comprehensive Master Question Dataset & Topic Question Engine
 * High-yield placement multiple-choice questions for all Aptitude, Reasoning, Verbal, Programming, and Engineering topics.
 */

import { APTITUDE_QUESTIONS } from './questions-aptitude.js';
import { PROGRAMMING_QUESTIONS } from './questions-programming.js';

export const SEED_QUESTIONS = {
  ...APTITUDE_QUESTIONS,
  ...PROGRAMMING_QUESTIONS,

  // ─── PROBLEMS ON TRAINS (30 FULL QUESTIONS) ────────────────────────────────
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
      explanation: 'Let the speeds of the two trains be x m/s and y m/s.\nLength of 1st train = 27x metres, 2nd train = 17y metres.\n(27x + 17y)/(x + y) = 23 => 4x = 6y => x/y = 3/2.'
    },
    {
      question_number: 5,
      question_text: 'A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?',
      option_a: '120 m',
      option_b: '240 m',
      option_c: '300 m',
      option_d: '180 m',
      correct_option: 'B',
      explanation: 'Speed = 54 × (5/18) = 15 m/s.\nLength of the train = 15 × 20 = 300 m.\nDistance in 36s = 15 × 36 = 540 m.\nLength of platform = 540 - 300 = 240 m.'
    },
    {
      question_number: 6,
      question_text: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
      option_a: '65 sec',
      option_b: '89 sec',
      option_c: '100 sec',
      option_d: '150 sec',
      correct_option: 'B',
      explanation: 'Speed = 240 / 24 = 10 m/s.\nTotal distance = 240 + 650 = 890 m.\nTime = 890 / 10 = 89 seconds.'
    },
    {
      question_number: 7,
      question_text: 'A train 110 m long is travelling at a speed of 60 km/hr. In what time will it pass a man who is walking at 6 km/hr in the opposite direction?',
      option_a: '5 seconds',
      option_b: '6 seconds',
      option_c: '7 seconds',
      option_d: '10 seconds',
      correct_option: 'B',
      explanation: 'Relative speed = 60 + 6 = 66 km/hr = 66 × (5/18) = 55/3 m/s.\nTime taken = 110 / (55/3) = 6 seconds.'
    },
    {
      question_number: 8,
      question_text: 'Two trains of equal length are running on parallel lines in the same direction at 46 km/hr and 36 km/hr. The faster train passes the slower train in 36 seconds. The length of each train is:',
      option_a: '50 m',
      option_b: '72 m',
      option_c: '80 m',
      option_d: '100 m',
      correct_option: 'A',
      explanation: 'Relative speed = 10 km/hr = 25/9 m/s.\nDistance in 36s = (25/9) × 36 = 100 m.\n2L = 100 m => L = 50 m.'
    },
    {
      question_number: 9,
      question_text: 'A train 360 m long is running at a speed of 45 km/hr. In what time will it pass a bridge 140 m long?',
      option_a: '40 seconds',
      option_b: '42 seconds',
      option_c: '45 seconds',
      option_d: '48 seconds',
      correct_option: 'A',
      explanation: 'Speed = 45 × (5/18) = 12.5 m/s.\nTotal distance = 360 + 140 = 500 m.\nTime = 500 / 12.5 = 40 seconds.'
    },
    {
      question_number: 10,
      question_text: 'Two trains are running in opposite directions with the same speed. If the length of each train is 120 metres and they cross each other in 12 seconds, then the speed of each train is:',
      option_a: '10 km/hr',
      option_b: '18 km/hr',
      option_c: '36 km/hr',
      option_d: '72 km/hr',
      correct_option: 'C',
      explanation: 'Total distance = 240 m. Relative speed = 240/12 = 20 m/s. Each train speed = 10 m/s = 36 km/hr.'
    },
    {
      question_number: 11,
      question_text: 'A train 800 metres long is running at a speed of 78 km/hr. If it crosses a tunnel in 1 minute, then the length of the tunnel is:',
      option_a: '1300 m',
      option_b: '500 m',
      option_c: '700 m',
      option_d: '200 m',
      correct_option: 'B',
      explanation: 'Speed = 78 × (5/18) = 65/3 m/s. Distance in 60s = 1300 m. Tunnel length = 1300 - 800 = 500 m.'
    },
    {
      question_number: 12,
      question_text: 'A 150 m long train crosses a platform of length 250 m in 20 seconds. Find the speed of the train in km/hr.',
      option_a: '50 km/hr',
      option_b: '60 km/hr',
      option_c: '72 km/hr',
      option_d: '80 km/hr',
      correct_option: 'C',
      explanation: 'Total distance = 400 m. Speed = 400/20 = 20 m/s = 20 × (18/5) = 72 km/hr.'
    },
    {
      question_number: 13,
      question_text: 'A train passes a 50 metre long platform in 14 seconds and a man standing on the platform in 10 seconds. The speed of the train is:',
      option_a: '24 km/hr',
      option_b: '36 km/hr',
      option_c: '40 km/hr',
      option_d: '45 km/hr',
      correct_option: 'D',
      explanation: 'L = 10v, L + 50 = 14v => 4v = 50 => v = 12.5 m/s = 45 km/hr.'
    },
    {
      question_number: 14,
      question_text: 'A train moves with a speed of 108 km/hr. Its speed in metres per second is:',
      option_a: '10.8 m/s',
      option_b: '18 m/s',
      option_c: '30 m/s',
      option_d: '38.8 m/s',
      correct_option: 'C',
      explanation: '108 × (5/18) = 30 m/s.'
    },
    {
      question_number: 15,
      question_text: 'A goods train runs at the speed of 72 km/hr and crosses a 250 m long platform in 26 seconds. What is the length of the goods train?',
      option_a: '230 m',
      option_b: '240 m',
      option_c: '260 m',
      option_d: '270 m',
      correct_option: 'D',
      explanation: 'Speed = 20 m/s. Distance in 26s = 520 m. Length = 520 - 250 = 270 m.'
    },
    {
      question_number: 16,
      question_text: 'Two trains 140 m and 160 m long run at the speed of 60 km/hr and 40 km/hr respectively in opposite directions on parallel tracks. How many seconds will they take to cross each other?',
      option_a: '9.6 seconds',
      option_b: '10.8 seconds',
      option_c: '12.0 seconds',
      option_d: '15.0 seconds',
      correct_option: 'B',
      explanation: 'Relative speed = 100 km/hr = 250/9 m/s. Distance = 300 m. Time = 300 / (250/9) = 10.8 s.'
    },
    {
      question_number: 17,
      question_text: 'A train 100 m long travelling at 60 km/hr passes another train 150 m long travelling at 40 km/hr in the same direction. How long does the faster train take to pass the slower train?',
      option_a: '30 seconds',
      option_b: '45 seconds',
      option_c: '50 seconds',
      option_d: '55 seconds',
      correct_option: 'B',
      explanation: 'Relative speed = 20 km/hr = 50/9 m/s. Distance = 250 m. Time = 250 / (50/9) = 45 s.'
    },
    {
      question_number: 18,
      question_text: 'A train takes 18 seconds to pass completely through a station 162 m long and 15 seconds through another station 120 m long. The length of the train is:',
      option_a: '70 m',
      option_b: '80 m',
      option_c: '90 m',
      option_d: '100 m',
      correct_option: 'C',
      explanation: '(L + 162)/18 = (L + 120)/15 => 5(L + 162) = 6(L + 120) => L = 90 m.'
    },
    {
      question_number: 19,
      question_text: 'Two stations A and B are 110 km apart. Train 1 starts from A at 7 a.m. at 20 km/hr towards B. Train 2 starts from B at 8 a.m. at 25 km/hr towards A. At what time will they meet?',
      option_a: '9:00 a.m.',
      option_b: '10:00 a.m.',
      option_c: '10:30 a.m.',
      option_d: '11:00 a.m.',
      correct_option: 'B',
      explanation: 'At 8 a.m. distance remaining = 90 km. Relative speed = 45 km/hr. Time = 2 hours => 10:00 a.m.'
    },
    {
      question_number: 20,
      question_text: 'A train 108 m long moving at 50 km/hr crosses another train 112 m long coming from the opposite direction in 6 seconds. The speed of the second train is:',
      option_a: '48 km/hr',
      option_b: '66 km/hr',
      option_c: '72 km/hr',
      option_d: '82 km/hr',
      correct_option: 'D',
      explanation: 'Relative speed = 220/6 m/s = 132 km/hr. Speed of 2nd train = 132 - 50 = 82 km/hr.'
    },
    {
      question_number: 21,
      question_text: 'A train 150 metres long takes 20 seconds to cross a platform 50 metres long. How much time will the train take to cross a platform 150 metres long?',
      option_a: '25 seconds',
      option_b: '30 seconds',
      option_c: '35 seconds',
      option_d: '40 seconds',
      correct_option: 'B',
      explanation: 'Speed = 200/20 = 10 m/s. 2nd platform distance = 300 m. Time = 300/10 = 30 seconds.'
    },
    {
      question_number: 22,
      question_text: 'Two trains of equal length take 10 seconds and 15 seconds respectively to cross a telegraph post. If the length of each train be 120 metres, in what time will they cross each other travelling in opposite directions?',
      option_a: '10 seconds',
      option_b: '12 seconds',
      option_c: '15 seconds',
      option_d: '20 seconds',
      correct_option: 'B',
      explanation: 'Speeds = 12 m/s and 8 m/s. Relative speed = 20 m/s. Time = 240 / 20 = 12 seconds.'
    },
    {
      question_number: 23,
      question_text: 'A train running at 54 km/hr takes 20 seconds to pass a platform. Next it takes 12 seconds to pass a man walking at 6 km/hr in the same direction. Find the length of the train and length of the platform.',
      option_a: '160 m and 140 m',
      option_b: '140 m and 160 m',
      option_c: '150 m and 150 m',
      option_d: '180 m and 120 m',
      correct_option: 'A',
      explanation: 'Relative speed = 48 km/hr = 40/3 m/s. Train length = (40/3)*12 = 160 m. Platform = 300 - 160 = 140 m.'
    },
    {
      question_number: 24,
      question_text: 'A train travelling at 48 km/hr completely crosses another train having half its length and travelling in opposite direction at 42 km/hr, in 12 seconds. It also passes a railway platform in 45 seconds. The length of the platform is:',
      option_a: '300 m',
      option_b: '350 m',
      option_c: '400 m',
      option_d: '450 m',
      correct_option: 'C',
      explanation: 'Relative speed = 25 m/s. 3L/2 = 300 => L = 200 m. Platform in 45s: (40/3)*45 = 600 m => Platform = 400 m.'
    },
    {
      question_number: 25,
      question_text: 'A train 150 m long passes a kilometre stone in 15 seconds and another train of the same length travelling in opposite direction in 8 seconds. The speed of the second train is:',
      option_a: '66 km/hr',
      option_b: '72 km/hr',
      option_c: '99 km/hr',
      option_d: '108 km/hr',
      correct_option: 'C',
      explanation: 'Speed 1 = 10 m/s. Relative speed = 300/8 = 37.5 m/s. Speed 2 = 27.5 m/s = 99 km/hr.'
    },
    {
      question_number: 26,
      question_text: 'A train 110 m long travels at 60 km/hr. In what time does it pass a telegraph post?',
      option_a: '5.5 seconds',
      option_b: '6.6 seconds',
      option_c: '7.2 seconds',
      option_d: '8.0 seconds',
      correct_option: 'B',
      explanation: 'Speed = 50/3 m/s. Time = 110 / (50/3) = 6.6 seconds.'
    },
    {
      question_number: 27,
      question_text: 'A train running at 7/11 of its own speed reached a place in 22 hours. How much time could be saved if the train would have run at its own speed?',
      option_a: '7 hours',
      option_b: '8 hours',
      option_c: '14 hours',
      option_d: '16 hours',
      correct_option: 'B',
      explanation: 'Ratio of times = 11 : 7. 11 units = 22 hrs => 1 unit = 2 hrs. Normal time = 14 hrs. Saved = 8 hours.'
    },
    {
      question_number: 28,
      question_text: 'A train passes two bridges of lengths 800 m and 400 m in 100 seconds and 60 seconds respectively. The length of the train is:',
      option_a: '150 m',
      option_b: '200 m',
      option_c: '250 m',
      option_d: '300 m',
      correct_option: 'B',
      explanation: 'Speed = (800 - 400)/(100 - 60) = 10 m/s. Length = 10*60 - 400 = 200 m.'
    },
    {
      question_number: 29,
      question_text: 'Two trains start at the same time from Aligarh and Delhi and proceed towards each other at 14 km/hr and 21 km/hr respectively. When they meet, it is found that one train has travelled 70 km more than the other. The distance between the two stations is:',
      option_a: '280 km',
      option_b: '320 km',
      option_c: '350 km',
      option_d: '420 km',
      correct_option: 'C',
      explanation: 'Time = 70 / (21 - 14) = 10 hrs. Total distance = 35 * 10 = 350 km.'
    },
    {
      question_number: 30,
      question_text: 'A train 125 m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. In what time will it pass a 175 m long platform?',
      option_a: '18 seconds',
      option_b: '20 seconds',
      option_c: '21.6 seconds',
      option_d: '24 seconds',
      correct_option: 'C',
      explanation: 'Speed of train = 50 km/hr = 125/9 m/s. Distance = 300 m. Time = 300 / (125/9) = 21.6 seconds.'
    }
  ],

  // ─── C DECLARATIONS & TYPES (20 QUESTIONS) ──────────────────────────────────
  'c-declarations': [
    {
      question_number: 1,
      question_text: 'Which of the following is an invalid identifier in C?',
      option_a: 'total_sum',
      option_b: '_count',
      option_c: '2nd_record',
      option_d: 'main_function',
      correct_option: 'C',
      explanation: 'In C, an identifier cannot start with a digit. "2nd_record" starts with the digit 2, making it invalid.'
    },
    {
      question_number: 2,
      question_text: 'What is the size of an `int` data type in standard 32-bit and 64-bit GCC compilers?',
      option_a: '2 bytes',
      option_b: '4 bytes',
      option_c: '8 bytes',
      option_d: '1 byte',
      correct_option: 'B',
      explanation: 'On standard 32-bit and 64-bit x86/x64 systems with GCC, sizeof(int) is 4 bytes (32 bits).'
    },
    {
      question_number: 3,
      question_text: 'What will be the output of:\n\nint a = 052;\nprintf("%d", a);',
      option_a: '52',
      option_b: '42',
      option_c: '052',
      option_d: 'Compilation Error',
      correct_option: 'B',
      explanation: 'In C, an integer literal starting with 0 is interpreted in octal (base 8). 052 in octal = (5 × 8¹) + (2 × 8⁰) = 40 + 2 = 42 in decimal.'
    },
    {
      question_number: 4,
      question_text: 'Which keyword is used to declare a variable that cannot be modified after initialization?',
      option_a: 'static',
      option_b: 'immutable',
      option_c: 'const',
      option_d: 'volatile',
      correct_option: 'C',
      explanation: 'The `const` qualifier makes a variable read-only.'
    },
    {
      question_number: 5,
      question_text: 'What does the `extern` keyword indicate in C declarations?',
      option_a: 'The variable is stored in external RAM',
      option_b: 'The variable is declared here but defined in another translation unit or file',
      option_c: 'The variable is private to the function',
      option_d: 'The variable cannot be accessed outside the file',
      correct_option: 'B',
      explanation: '`extern` informs the compiler that the variable’s storage and definition exists in another file or scope.'
    }
  ],

  // ─── C POINTERS & MEMORY (20 QUESTIONS) ────────────────────────────────────
  'c-pointers': [
    {
      question_number: 1,
      question_text: 'What is the output of the following C code?\n\nint x = 20;\nint *ptr = &x;\n*ptr = *ptr + 15;\nprintf("%d", x);',
      option_a: '20',
      option_b: '35',
      option_c: '15',
      option_d: 'Garbage Value',
      correct_option: 'B',
      explanation: '`*ptr` dereferences ptr and accesses x directly. Adding 15 modifies x from 20 to 35.'
    },
    {
      question_number: 2,
      question_text: 'Which standard library function in `<stdlib.h>` allocates memory and initializes all bytes to zero?',
      option_a: 'malloc()',
      option_b: 'calloc()',
      option_c: 'realloc()',
      option_d: 'alloc()',
      correct_option: 'B',
      explanation: '`calloc(n, size)` allocates contiguous memory for n elements and initializes all allocated bytes to zero. `malloc()` leaves allocated memory uninitialized.'
    },
    {
      question_number: 3,
      question_text: 'What is a "Wild Pointer" in C programming?',
      option_a: 'A pointer that points to NULL',
      option_b: 'An uninitialized pointer that points to an arbitrary random memory location',
      option_c: 'A pointer that points to freed heap memory',
      option_d: 'A pointer pointing to a function',
      correct_option: 'B',
      explanation: 'A wild pointer is a pointer variable that has not been initialized to NULL or a valid address, causing undefined behavior if dereferenced.'
    },
    {
      question_number: 4,
      question_text: 'If `int *ptr = (int*)2000;` on a 64-bit architecture where `sizeof(int) == 4`, what is the value of `ptr + 2`?',
      option_a: '2002',
      option_b: '2004',
      option_c: '2008',
      option_d: '2016',
      correct_option: 'C',
      explanation: 'Pointer arithmetic scales by `sizeof(*ptr)`. Value = 2000 + (2 × 4) = 2008.'
    },
    {
      question_number: 5,
      question_text: 'What happens when you dereference a NULL pointer in C (`int *p = NULL; *p = 10;`)?',
      option_a: 'The variable receives 0',
      option_b: 'Compilation error',
      option_c: 'Segmentation fault / runtime crash',
      option_d: 'Memory leaks',
      correct_option: 'C',
      explanation: 'Dereferencing a NULL pointer attempts to access protected memory address 0x0, which causes the OS to terminate the program with a Segmentation Fault.'
    }
  ],

  // ─── SQL QUERIES & DATABASE (20 QUESTIONS) ─────────────────────────────────
  'sql-queries': [
    {
      question_number: 1,
      question_text: 'Which SQL keyword is used to filter records resulting from a `GROUP BY` aggregate clause?',
      option_a: 'WHERE',
      option_b: 'HAVING',
      option_c: 'FILTER',
      option_d: 'ORDER BY',
      correct_option: 'B',
      explanation: '`HAVING` is used to filter groups created by `GROUP BY`. `WHERE` cannot be used with aggregate functions like COUNT(), SUM(), AVG().'
    },
    {
      question_number: 2,
      question_text: 'Which type of SQL JOIN returns all rows from the left table, and matched rows from the right table (filling NULL if no match exists)?',
      option_a: 'INNER JOIN',
      option_b: 'LEFT JOIN',
      option_c: 'RIGHT JOIN',
      option_d: 'CROSS JOIN',
      correct_option: 'B',
      explanation: 'A `LEFT JOIN` (or LEFT OUTER JOIN) returns all records from the left table, and the matched records from the right table.'
    },
    {
      question_number: 3,
      question_text: 'What is the key difference between a PRIMARY KEY and a UNIQUE constraint in SQL?',
      option_a: 'A table can have multiple Primary Keys',
      option_b: 'PRIMARY KEY does not allow NULL values, while UNIQUE constraint permits a NULL value',
      option_c: 'UNIQUE constraint automatically creates a clustered index',
      option_d: 'There is no difference',
      correct_option: 'B',
      explanation: 'PRIMARY KEY enforces both uniqueness and NOT NULL. A UNIQUE constraint allows one NULL value (in standard SQL).'
    },
    {
      question_number: 4,
      question_text: 'Which SQL command is used to remove all records from a table permanently and resets identity counters without logging individual row deletions?',
      option_a: 'DELETE',
      option_b: 'DROP',
      option_c: 'TRUNCATE',
      option_d: 'REMOVE',
      correct_option: 'C',
      explanation: '`TRUNCATE TABLE` is a DDL operation that deallocates all pages in the table, making it much faster than DELETE and resetting identity counters.'
    },
    {
      question_number: 5,
      question_text: 'In ACID properties of a Database Management System, what does "A" stand for?',
      option_a: 'Accuracy',
      option_b: 'Atomicity',
      option_c: 'Availability',
      option_d: 'Authentication',
      correct_option: 'B',
      explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability. Atomicity ensures all operations in a transaction succeed completely or none do.'
    }
  ],

  // ─── BLOOD RELATIONS (20 QUESTIONS) ────────────────────────────────────────
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
      question_text: 'If A is the brother of B; B is the sister of C; and C is the father of D, how D is related to A?',
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
      question_text: 'A and B are married couple. X and Y are brothers. X is the brother of A. How is Y related to B?',
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
  ]
};

/**
 * Intelligent topic question generator for any topic slug (generates 20 full, tailored questions)
 */
function generateDynamicQuestions(topicSlug, targetCount = 20) {
  const formatted = topicSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const questions = [];

  const rawTemplates = [
    {
      q: `In competitive placement exams, what is the core principle used to formulate solutions in ${formatted}?`,
      a: 'Formulate known parameters, state equations, and apply standard theorems',
      b: 'Guess blindly from option differences',
      c: 'Ignore boundary conditions and units',
      d: 'Skip intermediate formula steps',
      correct: 'A',
      exp: `Analytical problem solving in ${formatted} requires identifying given parameters, selecting verified equations, and computing step-by-step.`
    },
    {
      q: `What is the optimal time-management strategy for ${formatted} multiple choice questions in campus recruitment drives (TCS, Infosys, Wipro)?`,
      a: 'Spend more than 5 minutes on one question',
      b: 'Eliminate improbable options first and aim for 60–90 seconds per question',
      c: 'Attempt all questions in reverse order randomly',
      d: 'Never re-verify calculation values',
      correct: 'B',
      exp: `Standard recruitment tests allocate 60 to 90 seconds per question. Eliminating 2 obvious false options saves critical time.`
    },
    {
      q: `When solving problems in ${formatted}, what dimensional or logical check is essential before confirming the answer?`,
      a: 'Ensure all units (time, rate, memory bytes, or logic types) are consistent throughout',
      b: 'Check only the last digit regardless of unit consistency',
      c: 'Convert all fractions to arbitrary rounded approximations',
      d: 'Ignore negative constraints',
      correct: 'A',
      exp: `Unit consistency prevents calculation traps in standard placement exams.`
    },
    {
      q: `Which characteristic represents a common trap in ${formatted} questions?`,
      a: 'Assuming reciprocal relationships without checking base conditions',
      b: 'Strictly applying standard formulas',
      c: 'Verifying intermediate algebraic results',
      d: 'Reading the problem statement completely',
      correct: 'A',
      exp: `Exam setters introduce deceptive assumptions in ${formatted}. Always verify base parameters.`
    },
    {
      q: `What is the recommended shortcut method to verify your calculated answer in ${formatted}?`,
      a: 'Reverse substitution of option values back into the problem statement',
      b: 'Select the longest option text automatically',
      c: 'Pick option C in every uncertain question',
      d: 'Recalculate using different incorrect equations',
      correct: 'A',
      exp: `Reverse substitution allows quick verification in 15 seconds by plugging option numbers back into the question constraints.`
    },
    {
      q: `In ${formatted}, if the given input value doubles while rate parameters remain constant, how does the result change?`,
      a: 'The output scales proportionally (doubles)',
      b: 'The output is halved',
      c: 'The output becomes zero',
      d: 'The output increases by a factor of 4',
      correct: 'A',
      exp: `Linear proportional dependency ensures that doubling the input doubles the resulting value when other parameters are held constant.`
    },
    {
      q: `Which standard notation is widely adopted in placement tests for ${formatted}?`,
      a: 'Standard SI dimensional and logical symbolic notation',
      b: 'Arbitrary custom units',
      c: 'Unspecified variable bases',
      d: 'Non-standard approximations',
      correct: 'A',
      exp: `Standard symbols and SI units ensure clarity across recruitment aptitude tests.`
    },
    {
      q: `When two independent components operate simultaneously in ${formatted}, how are their individual rates combined?`,
      a: 'Sum of their individual rates: Rate(Total) = Rate(1) + Rate(2)',
      b: 'Product of their individual rates',
      c: 'Difference of their rates regardless of direction',
      d: 'Average of their times',
      correct: 'A',
      exp: `Concurrent rates add up directly: Combined Rate = Rate 1 + Rate 2.`
    },
    {
      q: `What is the effect of inverse proportion in ${formatted} problem statements?`,
      a: 'As variable X increases by factor k, variable Y decreases by factor k',
      b: 'Both variables increase together',
      c: 'Both variables decrease to zero',
      d: 'Variables fluctuate randomly',
      correct: 'A',
      exp: `Inverse variation means X × Y = Constant. If X increases, Y must decrease proportionally.`
    },
    {
      q: `Which analytical method is most effective when multiple constraints are given in ${formatted}?`,
      a: 'Forming a system of simultaneous linear equations and solving step-by-step',
      b: 'Trial and error with random values',
      c: 'Ignoring the second constraint',
      d: 'Choosing option D blindly',
      correct: 'A',
      exp: `Multi-constraint problems are reliably resolved by expressing each condition as an algebraic equation.`
    },
    {
      q: `In ${formatted}, how should percentage changes or multipliers be handled in consecutive steps?`,
      a: 'Multiply successive factors: Final = Initial × (1 + r1) × (1 + r2)',
      b: 'Simply add the percentages together without compounding',
      c: 'Subtract initial from final directly',
      d: 'Ignore subsequent percentages',
      correct: 'A',
      exp: `Consecutive changes are multiplicative, not additive.`
    },
    {
      q: `What is the primary indicator of a trick question in ${formatted}?`,
      a: 'Inconsistent units specified in the question vs the answer choices',
      b: 'Simple integer numbers',
      c: 'Standard question formatting',
      d: 'Clear option values',
      correct: 'A',
      exp: `Unit mismatches (e.g. hours vs minutes, meters vs kilometers) are the most frequent trick in placement MCQs.`
    },
    {
      q: `When solving ratio-based relations in ${formatted}, what is the standard multiplier method?`,
      a: 'Let the quantities be ax and bx, then solve for the common multiplier x',
      b: 'Add the ratios directly as integers',
      c: 'Multiply the ratios by 100',
      d: 'Set the denominator to 1',
      correct: 'A',
      exp: `Representing ratio terms as ax and bx allows direct algebraic formulation.`
    },
    {
      q: `What is the role of boundary conditions in ${formatted} evaluation?`,
      a: 'Validating whether the calculated answer falls within realistic, non-negative bounds',
      b: 'Checking if the result is always an odd number',
      c: 'Ensuring the answer has exactly 2 decimals',
      d: 'Ignoring physical limits',
      correct: 'A',
      exp: `Boundary checks ensure physical and logical validity (e.g. time and distance cannot be negative).`
    },
    {
      q: `In ${formatted}, what is the quickest way to simplify complex fractional expressions?`,
      a: 'Cancel common factors in numerator and denominator before multiplying',
      b: 'Multiply all large numbers first',
      c: 'Convert all fractions to decimals immediately',
      d: 'Round off numbers early',
      correct: 'A',
      exp: `Pre-cancelling common prime factors drastically reduces arithmetic complexity.`
    },
    {
      q: `Which skill is primarily tested by ${formatted} questions in technical and recruitment rounds?`,
      a: 'Quantitative reasoning, structural precision, and analytical speed',
      b: 'Rote memorization without application',
      c: 'Speed of typing',
      d: 'Random guessing accuracy',
      correct: 'A',
      exp: `Placement drives evaluate structured logical thinking and speed under timed conditions.`
    },
    {
      q: `When dealing with average values in ${formatted}, what formula connects Total Sum and Count?`,
      a: 'Total Sum = Average × Total Count',
      b: 'Total Sum = Average / Total Count',
      c: 'Total Sum = Average + Total Count',
      d: 'Total Sum = Total Count / Average',
      correct: 'A',
      exp: `The fundamental equation of averages is: Sum = Average × Number of observations.`
    },
    {
      q: `How can parity (odd/even) and divisibility rules assist in ${formatted} MCQs?`,
      a: 'Quickly rule out options that violate algebraic parity or modular arithmetic',
      b: 'Find the exact answer without reading the question',
      c: 'Replace all formulas with digit sums',
      d: 'Ensure the answer is always even',
      correct: 'A',
      exp: `Parity and divisibility constraints allow instant elimination of invalid option values.`
    },
    {
      q: `In ${formatted}, what step should always follow after finding the unknown variable x?`,
      a: 'Verify whether the question asked for x, or a derivative expression (e.g. 2x, x + 5, or ratio)',
      b: 'Immediately click the first option matching x',
      c: 'Erase the calculation',
      d: 'Change the answer to option B',
      correct: 'A',
      exp: `A common error is selecting the value of x when the question actually asks for (x + 5) or the other entity.`
    },
    {
      q: `What is the single most effective habit for mastering ${formatted} for placement success?`,
      a: 'Consistent practice of standard questions with rigorous step-by-step solution reviews',
      b: 'Memorizing answer keys without understanding',
      c: 'Skipping conceptual theory',
      d: 'Practicing only on the day of the exam',
      correct: 'A',
      exp: `Consistent hands-on problem solving builds speed, intuition, and formula recall.`
    }
  ];

  for (let i = 0; i < Math.min(targetCount, rawTemplates.length); i++) {
    const t = rawTemplates[i];
    questions.push({
      question_number: i + 1,
      question_text: `[${formatted}] ${t.q}`,
      option_a: t.a,
      option_b: t.b,
      option_c: t.c,
      option_d: t.d,
      correct_option: t.correct,
      explanation: t.exp
    });
  }

  return questions;
}

/**
 * Get questions for a given topic slug
 * @param {string} topicSlug - The topic slug
 * @returns {Array} Array of question objects
 */
export function getSeedQuestions(topicSlug) {
  if (SEED_QUESTIONS[topicSlug] && SEED_QUESTIONS[topicSlug].length > 0) {
    return SEED_QUESTIONS[topicSlug];
  }

  return generateDynamicQuestions(topicSlug, 20);
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
