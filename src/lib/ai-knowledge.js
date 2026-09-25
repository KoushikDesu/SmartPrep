/**
 * SmartPrep — Comprehensive Placement Intelligence & Domain Knowledge Engine
 * Provides instant, deep, step-by-step reasoning across all 40+ placement topics.
 */

export const DOMAIN_KNOWLEDGE = [
  // 1. Relative Speed & Motion
  {
    keywords: ['relative speed', 'relative', 'relative velocity', 'opposite direction', 'same direction', 'passing each other', 'crossing each other'],
    category: 'Arithmetic Aptitude',
    topic: 'Relative Speed',
    solve: (query) => `### ⚡ Relative Speed — Core Concepts & Formulas

**Relative Speed** is the speed of one moving object with respect to another moving object.

---

### 1. Bodies Moving in Opposite Directions:
When two bodies move towards each other or in opposite directions with speeds $u$ and $v$:
$$\\text{Relative Speed} = u + v$$
* **Intuition:** Because they are approaching each other, the distance between them decreases at a rate equal to the **sum of their speeds**.
* **Time taken to cross each other:**
  $$\\text{Time} = \\frac{\\text{Total Distance } (L_1 + L_2)}{u + v}$$

---

### 2. Bodies Moving in the Same Direction:
When two bodies move in the same direction with speeds $u$ and $v$ (where $u > v$):
$$\\text{Relative Speed} = u - v$$
* **Intuition:** The faster body only gains ground at the rate of the **difference between speeds**.
* **Time taken to overtake / cross:**
  $$\\text{Time} = \\frac{\\text{Total Distance } (L_1 + L_2)}{u - v}$$

---

### 3. Essential Speed Conversions:
* **To convert $\\text{km/hr} \\to \\text{m/s}$:** Multiply by $\\frac{5}{18}$
  $$72\\text{ km/hr} = 72 \\times \\frac{5}{18} = 20\\text{ m/s}$$
* **To convert $\\text{m/s} \\to \\text{km/hr}$:** Multiply by $\\frac{18}{5}$
  $$25\\text{ m/s} = 25 \\times \\frac{18}{5} = 90\\text{ km/hr}$$

👉 Practice 30+ solved placement questions in **[Problems on Trains](#/practice/problems-on-trains)** and **[Time and Distance](#/practice/time-and-distance)**!`
  },

  // 2. Problems on Trains
  {
    keywords: ['train', 'trains', 'platform', 'pole', 'bridge', 'speed of train', 'tunnel', 'kilometer stone'],
    category: 'Arithmetic Aptitude',
    topic: 'Problems on Trains',
    solve: (query) => `### 🚆 Problems on Trains — Step-by-Step Concepts & Formulas

**1. Speed Unit Conversion Rules:**
* **To convert from km/hr to m/s:** Multiply by $\\frac{5}{18}$
  $$\\text{Speed (m/s)} = \\text{Speed (km/hr)} \\times \\frac{5}{18}$$
* **To convert from m/s to km/hr:** Multiply by $\\frac{18}{5}$
  $$\\text{Speed (km/hr)} = \\text{Speed (m/s)} \\times \\frac{18}{5}$$

**2. Crossing Objects of Negligible Length (Man, Pole, Telegraph Post, Tree):**
$$\\text{Time taken} = \\frac{\\text{Length of Train}}{\\text{Speed of Train}}$$

**3. Crossing Objects of Length $L_2$ (Platform, Bridge, Tunnel, Standing Train):**
$$\\text{Time taken} = \\frac{\\text{Length of Train } (L_1) + \\text{Length of Platform } (L_2)}{\\text{Speed of Train}}$$

**4. Relative Speed of Two Trains:**
* **Opposite Directions:** $\\text{Relative Speed} = u + v \\implies \\text{Time} = \\frac{L_1 + L_2}{u + v}$
* **Same Direction ($u > v$):** $\\text{Relative Speed} = u - v \\implies \\text{Time} = \\frac{L_1 + L_2}{u - v}$

👉 Practice 30+ multiple choice questions with solutions in **[Problems on Trains](#/practice/problems-on-trains)**!`
  },

  // 3. Time and Work
  {
    keywords: ['time and work', 'piece of work', 'work and wages', 'man days', 'efficiency', 'work'],
    category: 'Arithmetic Aptitude',
    topic: 'Time and Work',
    solve: (query) => `### ⏱️ Time and Work — Core Formulas & Shortcut Methods

**1. Work Rate Fundamental Rule:**
* If A can finish a piece of work in $n$ days, A's 1 day's work = $\\frac{1}{n}$.
* If A's 1 day's work = $\\frac{1}{n}$, A will take $n$ days to complete the work.

**2. Combined Work Shortcuts:**
* **Two Workers (A in $x$ days, B in $y$ days):**
  $$\\text{Together time} = \\frac{x \\times y}{x + y}\\text{ days}$$
* **Three Workers (A in $x$, B in $y$, C in $z$ days):**
  $$\\text{Together time} = \\frac{xyz}{xy + yz + zx}\\text{ days}$$

**3. LCM Shortcut Method (Recommended for Exams):**
* Assume Total Work = $\\text{LCM}(x, y, z)$ units.
* Efficiency of each person = $\\frac{\\text{Total Work}}{\\text{Days taken}}$.
* Combined days = $\\frac{\\text{Total Work}}{\\text{Sum of efficiencies}}$.

**4. Chain Rule (Men, Days, Hours, Work):**
$$\\frac{M_1 \\times D_1 \\times H_1}{W_1} = \\frac{M_2 \\times D_2 \\times H_2}{W_2}$$

👉 Try step-by-step problems in **[Time and Work](#/practice/time-and-work)**!`
  },

  // 4. Time, Speed and Distance
  {
    keywords: ['time and distance', 'speed', 'distance', 'average speed', 'speed distance', 'km/h', 'm/sec', 'aeroplane', 'car speed', 'bus'],
    category: 'Arithmetic Aptitude',
    topic: 'Time and Distance',
    solve: (query) => `### 🚗 Time, Speed and Distance — Master Guide

**1. Fundamental Relations:**
$$\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}} \\quad | \\quad \\text{Distance} = \\text{Speed} \\times \\text{Time} \\quad | \\quad \\text{Time} = \\frac{\\text{Distance}}{\\text{Speed}}$$

**2. Average Speed when Covering Equal Distances:**
* If a person travels a distance at speed $u$ and returns the same distance at speed $v$:
  $$\\text{Average Speed} = \\frac{2uv}{u + v}$$
  *(Note: It is the harmonic mean, NOT the simple average $\\frac{u+v}{2}$)*

**3. Ratio of Speeds vs Ratio of Times:**
* If the ratio of speeds is $a : b$, the ratio of times taken to cover the same distance is:
  $$\\text{Time Ratio} = \\frac{1}{a} : \\frac{1}{b} = b : a$$

👉 Start solving problems in **[Time and Distance](#/practice/time-and-distance)**!`
  },

  // 5. Simple and Compound Interest
  {
    keywords: ['simple interest', 'compound interest', 'principal', 'rate of interest', 'compounded', 'interest', 's.i.', 'c.i.'],
    category: 'Arithmetic Aptitude',
    topic: 'Simple & Compound Interest',
    solve: (query) => `### 💰 Simple & Compound Interest Formulas

**1. Simple Interest (S.I.):**
$$\\text{S.I.} = \\frac{P \\times R \\times T}{100}$$
$$\\text{Total Amount } (A) = P + \\text{S.I.} = P\\left(1 + \\frac{R \\times T}{100}\\right)$$

**2. Compound Interest (C.I.):**
$$\\text{Amount } (A) = P\\left(1 + \\frac{R}{100}\\right)^n \\quad | \\quad \\text{C.I.} = A - P$$
* **If Compounded Half-Yearly:** $\\text{Rate} = \\frac{R}{2}$, $\\text{Periods} = 2n$
* **If Compounded Quarterly:** $\\text{Rate} = \\frac{R}{4}$, $\\text{Periods} = 4n$

**3. Exam Difference Shortcuts:**
* **Difference between C.I. and S.I. for 2 Years:**
  $$\\text{Diff}_2 = P\\left(\\frac{R}{100}\\right)^2$$
* **Difference between C.I. and S.I. for 3 Years:**
  $$\\text{Diff}_3 = P\\left(\\frac{R}{100}\\right)^2 \\times \\left(3 + \\frac{R}{100}\\right)$$

👉 Test your skills in **[Simple Interest](#/practice/simple-interest)** & **[Compound Interest](#/practice/compound-interest)**!`
  },

  // 6. C Programming & Pointers
  {
    keywords: ['c programming', 'pointer', 'pointers', 'malloc', 'calloc', 'memory', 'seg fault', 'segmentation fault', 'struct', 'sizeof'],
    category: 'Programming',
    topic: 'C Programming & Pointers',
    solve: (query) => `### 💻 C Pointers & Memory Management Guide

**1. Pointer Basics:**
* \`&\` (Address-of operator): Retrieves the memory address of a variable.
* \`*\` (Dereference operator): Accesses the value stored at the pointed memory address.

\`\`\`c
int x = 25;
int *ptr = &x;     // ptr holds the memory address of x
printf("%d", *ptr); // Dereferences ptr to output 25
*ptr = 50;         // Modifies value of x to 50
\`\`\`

**2. Pointer Arithmetic Scaling Rule:**
* Incrementing a pointer (\`ptr + n\`) advances by $n \\times \\text{sizeof}(*ptr)$ bytes:
  $$\\text{New Address} = \\text{Base Address} + (n \\times \\text{sizeof}(\\text{Data Type}))$$

**3. Dynamic Memory Allocation (\`<stdlib.h>\`):**
* \`malloc(size)\`: Allocates uninitialized memory containing garbage values.
* \`calloc(n, size)\`: Allocates memory for $n$ items and initializes all bytes to **0**.
* \`free(ptr)\`: Deallocates heap memory (set \`ptr = NULL\` to avoid dangling pointers).

👉 Practice code debugging MCQs in **[C Pointers](#/practice/c-pointers)** & **[C Declarations](#/practice/c-declarations)**!`
  },

  // 7. SQL & Database
  {
    keywords: ['sql', 'database', 'join', 'joins', 'group by', 'having', 'primary key', 'foreign key', 'acid', 'truncate', 'delete'],
    category: 'Database',
    topic: 'SQL & Database Architecture',
    solve: (query) => `### 🗄️ SQL & RDBMS Core Interview Concepts

**1. WHERE vs HAVING Clause:**
* \`WHERE\`: Filters individual rows **before** aggregation (cannot use aggregate functions).
* \`HAVING\`: Filters aggregated groups **after** \`GROUP BY\` (e.g. \`HAVING COUNT(*) > 5\`).

**2. SQL JOIN Types:**
* **INNER JOIN:** Returns matching records from both tables.
* **LEFT JOIN:** Returns all records from the left table + matching records from right.
* **RIGHT JOIN:** Returns all records from the right table + matching records from left.
* **FULL OUTER JOIN:** Returns all records when there is a match in either table.

**3. ACID Properties:**
* **A - Atomicity:** All operations in a transaction succeed completely or none do.
* **C - Consistency:** Preserves database integrity rules and constraints.
* **I - Isolation:** Concurrent transactions execute without interfering.
* **D - Durability:** Committed data is permanently saved even after server crashes.

👉 Master database queries in **[SQL Queries](#/practice/sql-queries)**!`
  },

  // 8. Blood Relations
  {
    keywords: ['blood relation', 'blood relations', 'family tree', 'maternal', 'paternal', 'uncle', 'nephew', 'niece'],
    category: 'Logical Reasoning',
    topic: 'Blood Relations',
    solve: (query) => `### 👨‍👩‍👦 Blood Relations — Tree Decoding Strategy

**1. Relationship Mapping:**
* **Mother's / Father's Son:** Brother (or Myself).
* **Mother's / Father's only Son:** Myself (if male).
* **Mother's / Father's Daughter:** Sister (or Myself).
* **Father's Brother:** Paternal Uncle.
* **Mother's Brother:** Maternal Uncle.
* **Brother's / Sister's Son:** Nephew.
* **Brother's / Sister's Daughter:** Niece.

**2. Generation Level Notation:**
* **Generation +2:** Grandfather, Grandmother
* **Generation +1:** Father, Mother, Uncle, Aunt
* **Generation 0 (Self):** Brother, Sister, Cousin, Spouse
* **Generation -1:** Son, Daughter, Nephew, Niece

👉 Practice deduction problems in **[Blood Relations](#/practice/blood-relations)**!`
  },

  // 9. Platform Navigation & Sitemap
  {
    keywords: ['how to', 'where to', 'navigate', 'find', 'category', 'profile', 'admin', 'teacher', 'login', 'signup', 'dashboard'],
    category: 'Website Guide',
    topic: 'SmartPrep Platform Navigation',
    solve: (query) => `### 🧭 SmartPrep Platform Navigation & Sitemap

Here is how you can access every area of the platform:

1. 📚 **Practice All Categories (\`#/categories\`):**
   * Access 10+ modules: Arithmetic Aptitude, Verbal Ability, Logical Reasoning, C Programming, Data Structures, Engineering, and Current Affairs.
2. 📝 **Interactive Practice Suite (\`#/practice/:topicSlug\`):**
   * Practice one question at a time with instant green/red validation, full solutions, and formula cards.
   * Auto-resumes where you left off. Click **"First Question"** to start over or **"Resume"** to jump to your saved question.
3. 📊 **My Performance Profile (\`#/profile\`):**
   * Displays questions solved, correct answers count, accuracy %, college roll number, and password management.
4. 👨‍🏫 **Teacher Studio (\`#/teacher\`):**
   * Author questions in **Question Bank Studio**, view student accuracy roster, and publish campus recruitment drive notices.
5. 🛡️ **Admin Overview (\`#/admin\`):**
   * Manage user accounts, create faculty logins, and reset passwords.

Which module would you like to open today?`
  },

  // 10. Greetings & Capabilities
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'who are you', 'what can you do', 'what can u do', 'help me'],
    category: 'General',
    topic: 'Assistant Capabilities',
    solve: (query) => `### 👋 Hello! I'm your SmartPrep AI Placement Mentor

I am here to guide your preparation and solve any questions across technical tests and campus interviews:

* 📐 **Quantitative Aptitude:** Step-by-step solutions for *Problems on Trains, Relative Speed, Time & Work, Interest, Percentages, Ratio & Proportion*.
* 🧠 **Logical Reasoning:** Deductions for *Blood Relations, Number Series, Coding-Decoding, Direction Sense*.
* 💻 **Technical & Programming:** Execution tracing for *C Pointers, Control Loops, Recursion, Memory Allocation, SQL Queries & Joins*.
* 🧭 **Platform Navigation:** Finding topic modules, practicing one question at a time, and checking your accuracy roster.

What problem or topic would you like to solve right now?`
  },

  // 11. Representative Values & Central Tendency
  {
    keywords: ['representative value', 'representative', 'central tendency', 'mean', 'median', 'mode'],
    category: 'Arithmetic Aptitude',
    topic: 'Representative Values & Statistics',
    solve: (query) => `### 📊 Representative Value (Measures of Central Tendency)

In quantitative aptitude and statistics, a **representative value** is a single number that summarizes or represents the central point of an entire dataset.

---

### 1. Arithmetic Mean (Average):
The sum of all values divided by the number of observations:
$$\\text{Mean } (\\bar{x}) = \\frac{\\sum x_i}{n} = \\frac{x_1 + x_2 + \\dots + x_n}{n}$$
* **Example:** The representative value for scores $10, 20, 30$ is $\\frac{10+20+30}{3} = 20$.

---

### 2. Median (Middle Value):
The value dividing the ordered data into two equal halves:
* **If $n$ is odd:** Middle term at position $\\frac{n + 1}{2}$.
* **If $n$ is even:** Average of the two middle terms at positions $\\frac{n}{2}$ and $\\frac{n}{2} + 1$.

---

### 3. Mode (Most Frequent Value):
The observation that appears with the highest frequency in the dataset.
* **Empirical Relationship for Moderately Asymmetrical Distributions:**
  $$\\text{Mode} = 3(\\text{Median}) - 2(\\text{Mean})$$

👉 Practice standard average and data interpretation questions in **[Average](#/practice/average)**!`
  },

  // 12. Probability & Combinatorics
  {
    keywords: ['probability', 'permutation', 'combination', 'dice', 'cards', 'coin', 'coins', 'sample space'],
    category: 'Arithmetic Aptitude',
    topic: 'Probability & Combinations',
    solve: (query) => `### 🎲 Probability & Combinatorics Shortcuts

**1. Classical Probability Definition:**
$$P(E) = \\frac{\\text{Number of favorable outcomes } n(E)}{\\text{Total number of exhaustive outcomes } n(S)}$$
* $0 \\le P(E) \\le 1$ and $P(E) + P(\\text{not } E) = 1$.

**2. Combinations Formula (Selection):**
$$^nC_r = \\frac{n!}{r!(n - r)!}$$
* *Example:* Selecting 2 cards from 52 cards: $^{52}C_2 = \\frac{52 \\times 51}{2 \\times 1} = 1326$.

**3. Standard Sample Spaces:**
* **Tossing $n$ coins:** Total outcomes $= 2^n$.
* **Rolling $n$ dice:** Total outcomes $= 6^n$ (for 2 dice, $n(S) = 36$).
* **Deck of 52 Cards:** 4 suits of 13 cards each (26 Red, 26 Black), 12 Face cards (4 Jacks, 4 Queens, 4 Kings).`
  }
];

/**
 * Finds matching domain knowledge and returns formatted explanation
 */
export function getDomainResponse(query, categoryContext = '') {
  const q = query.toLowerCase().trim();

  // 1. Direct keyword match
  for (const domain of DOMAIN_KNOWLEDGE) {
    for (const kw of domain.keywords) {
      if (q.includes(kw)) {
        return domain.solve(query);
      }
    }
  }

  // 2. Category match
  if (categoryContext && categoryContext !== 'General') {
    const matched = DOMAIN_KNOWLEDGE.find(d => 
      d.category.toLowerCase().includes(categoryContext.toLowerCase()) ||
      d.topic.toLowerCase().includes(categoryContext.toLowerCase())
    );
    if (matched) return matched.solve(query);
  }

  // 3. General intelligent guidance
  return `### 💡 SmartPrep Placement Assistant
I can help you solve and understand any placement problem!

**What I can do for you:**
* 📐 **Aptitude Formulas:** Ask about *Relative Speed, Representative Values, Problems on Trains, Time & Work, Interest, Percentages*.
* 🧠 **Logical Reasoning:** Ask about *Blood Relations, Syllogisms, Number Series, Coding-Decoding*.
* 💻 **Coding & Technical:** Ask about *C Pointers, Memory Allocation, Data Structures, SQL Joins, OOP in Java/C++*.
* 🧭 **Platform Navigation:** Ask how to practice modules, track your profile accuracy, or access faculty tools.

*Type your question or problem statement above to get started!*`;
}

