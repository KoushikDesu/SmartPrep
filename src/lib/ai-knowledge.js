/**
 * SmartPrep — Comprehensive Placement Intelligence & Domain Knowledge Engine
 * Provides instant, deep, step-by-step reasoning across all 40+ placement topics.
 */

export const DOMAIN_KNOWLEDGE = [
  // 1. Problems on Trains
  {
    keywords: ['train', 'trains', 'platform', 'pole', 'bridge', 'speed of train'],
    category: 'Arithmetic Aptitude',
    topic: 'Problems on Trains',
    solve: (query) => `### 🚆 Problems on Trains — Step-by-Step Concepts & Formulas

**1. Speed Unit Conversion Rules:**
* **To convert from km/hr to m/s:** Multiply by $\\frac{5}{18}$
  $$\\text{Speed (m/s)} = \\text{Speed (km/hr)} \\times \\frac{5}{18}$$
  *Example:* $72\\text{ km/hr} = 72 \\times \\frac{5}{18} = 20\\text{ m/s}$.
* **To convert from m/s to km/hr:** Multiply by $\\frac{18}{5}$
  $$\\text{Speed (km/hr)} = \\text{Speed (m/s)} \\times \\frac{18}{5}$$

**2. Crossing Objects of Negligible Length (Man, Pole, Telegraph Post, Tree):**
$$\\text{Time taken} = \\frac{\\text{Length of Train}}{\\text{Speed of Train}}$$

**3. Crossing Objects of Length $L_2$ (Platform, Bridge, Tunnel, Standing Train):**
$$\\text{Time taken} = \\frac{\\text{Length of Train } (L_1) + \\text{Length of Platform } (L_2)}{\\text{Speed of Train}}$$

**4. Relative Speed of Two Trains:**
* **Moving in Opposite Directions:** $\\text{Relative Speed} = u + v$
  $$\\text{Time to cross each other} = \\frac{L_1 + L_2}{u + v}$$
* **Moving in the Same Direction ($u > v$):** $\\text{Relative Speed} = u - v$
  $$\\text{Time to cross each other} = \\frac{L_1 + L_2}{u - v}$$

👉 Practice 30+ multiple choice questions with solutions in **[Problems on Trains](#/practice/problems-on-trains)**!`
  },

  // 2. Time and Work
  {
    keywords: ['time and work', 'piece of work', 'work and wages', 'man days', 'efficiency'],
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

  // 3. Time and Distance
  {
    keywords: ['time and distance', 'average speed', 'speed distance', 'km/h', 'm/sec'],
    category: 'Arithmetic Aptitude',
    topic: 'Time and Distance',
    solve: (query) => `### 🚗 Time, Speed and Distance — Master Guide

**1. Basic Formulas:**
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

  // 4. Simple and Compound Interest
  {
    keywords: ['simple interest', 'compound interest', 'principal', 'rate of interest', 'compounded'],
    category: 'Arithmetic Aptitude',
    topic: 'Simple & Compound Interest',
    solve: (query) => `### 💰 Simple & Compound Interest Formulas

**1. Simple Interest (S.I.):**
$$\\text{S.I.} = \\frac{P \\times R \\times T}{100}$$
$$\\text{Total Amount } (A) = P + \\text{S.I.} = P\\left(1 + \\frac{R \\times T}{100}\\right)$$
*($P$ = Principal, $R$ = Annual Rate %, $T$ = Time in years)*

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

  // 5. Profit and Loss
  {
    keywords: ['profit', 'loss', 'cost price', 'selling price', 'marked price', 'discount'],
    category: 'Arithmetic Aptitude',
    topic: 'Profit and Loss',
    solve: (query) => `### 🏷️ Profit and Loss — Essential Rules & Percentages

**1. Basic Definitions:**
* **Cost Price (C.P.):** Price at which an article is bought.
* **Selling Price (S.P.):** Price at which an article is sold.

**2. Gain and Loss Calculations:**
* **Gain (Profit) when $S.P. > C.P.$:** $\\text{Gain} = S.P. - C.P.$
  $$\\text{Gain \\%} = \\left(\\frac{\\text{Gain}}{C.P.} \\times 100\\right)\\%$$
* **Loss when $C.P. > S.P.$:** $\\text{Loss} = C.P. - S.P.$
  $$\\text{Loss \\%} = \\left(\\frac{\\text{Loss}}{C.P.} \\times 100\\right)\\%$$

**3. Finding S.P. and C.P. Directly:**
* $S.P. = \\left(\\frac{100 + \\text{Gain \\%}}{100}\\right) \\times C.P. \\quad | \\quad S.P. = \\left(\\frac{100 - \\text{Loss \\%}}{100}\\right) \\times C.P.$
* $C.P. = \\left(\\frac{100}{100 + \\text{Gain \\%}}\\right) \\times S.P. \\quad | \\quad C.P. = \\left(\\frac{100}{100 - \\text{Loss \\%}}\\right) \\times S.P.$

**4. False Weights Shortcut:**
$$\\text{Gain \\%} = \\left(\\frac{\\text{Error}}{\\text{True Value} - \\text{Error}} \\times 100\\right)\\%$$

👉 Practice now in **[Profit and Loss](#/practice/profit-and-loss)**!`
  },

  // 6. Percentage
  {
    keywords: ['percentage', 'percent', 'increase percent', 'decrease percent', 'population'],
    category: 'Arithmetic Aptitude',
    topic: 'Percentage',
    solve: (query) => `### 📊 Percentage Calculations & Formulas

**1. Basic Concept:**
$$x\\% \\text{ of } A = \\frac{x}{100} \\times A$$

**2. Percentage Increase & Decrease:**
$$\\text{\\% Increase} = \\left(\\frac{\\text{Increase}}{\\text{Original Value}} \\times 100\\right)\\%$$
$$\\text{\\% Decrease} = \\left(\\frac{\\text{Decrease}}{\\text{Original Value}} \\times 100\\right)\\%$$

**3. Commodity Price & Consumption Rule:**
* If price increases by $R\\%$, reduction in consumption to keep expenditure same:
  $$\\text{Reduction \\%} = \\left(\\frac{R}{100 + R} \\times 100\\right)\\%$$
* If price decreases by $R\\%$, increase in consumption:
  $$\\text{Increase \\%} = \\left(\\frac{R}{100 - R} \\times 100\\right)\\%$$

**4. Successive Percentage Change:**
$$\\text{Net Change} = \\left(a + b + \\frac{a \\times b}{100}\\right)\\%$$

👉 Practice in **[Percentage](#/practice/percentage)**!`
  },

  // 7. Blood Relations
  {
    keywords: ['blood relation', 'blood relations', 'maternal', 'paternal', 'brother-in-law', 'sister-in-law', 'family tree'],
    category: 'Logical Reasoning',
    topic: 'Blood Relations',
    solve: (query) => `### 👨‍👩‍👧‍👦 Logical Reasoning — Blood Relations Family Tree

**1. Standard Symbol Notation:**
* Male: $\\mathbf{[ + ]}$ or Square $\\Box$
* Female: $\\mathbf{[ - ]}$ or Circle $\\bigcirc$
* Married Couple: Double horizontal line $\\mathbf{=}$ (e.g. $A = B$)
* Siblings (Brother/Sister): Single horizontal line $\\mathbf{-}$ (e.g. $A - B$)
* Generation Hierarchy (Parent to Child): Vertical line $\\mathbf{|}$

**2. Key Family Tree Terms:**
* **Maternal:** Mother's side (e.g. Maternal Uncle = Mother's Brother)
* **Paternal:** Father's side (e.g. Paternal Uncle = Father's Brother)
* **Brother-in-law:** Spouse's brother OR Sister's husband
* **Sister-in-law:** Spouse's sister OR Brother's wife
* **Nephew / Niece:** Brother's or Sister's Son / Daughter

👉 Practice TCS & Infosys questions in **[Blood Relations](#/practice/blood-relations)**!`
  },

  // 8. C Pointers & Memory
  {
    keywords: ['pointer', 'pointers', 'malloc', 'calloc', 'free', 'dereference', 'segmentation fault', 'pointer arithmetic'],
    category: 'Programming',
    topic: 'C Pointers & Memory Architecture',
    solve: (query) => `### 💻 C Programming — Pointers & Memory Concepts

**1. Pointer Basics:**
A pointer is a variable that stores the memory address of another variable.
\`\`\`c
int x = 10;
int *ptr = &x; // ptr stores address of x (& is address-of operator)
printf("%d", *ptr); // Outputs 10 (* is dereference operator)
\`\`\`

**2. Pointer Arithmetic:**
* \`ptr + 1\` increases address by \`sizeof(datatype)\` bytes.
* For \`int *p\` (4 bytes): if \`p = 2000\`, \`p + 1 = 2004\`.

**3. Dynamic Memory Allocation (\`<stdlib.h>\`):**
* **\`malloc(size)\`**: Allocates raw uninitialized memory.
  \`\`\`c
  int *arr = (int*)malloc(5 * sizeof(int));
  \`\`\`
* **\`calloc(n, size)\`**: Allocates memory and initializes all bytes to 0.
* **\`free(ptr)\`**: Releases allocated memory to prevent memory leaks. Always set \`ptr = NULL;\` afterwards.

**4. Common Pitfalls:**
* **Wild Pointer:** Uninitialized pointer pointing to arbitrary memory.
* **Dangling Pointer:** Pointer pointing to memory that has already been freed.
* **Segmentation Fault:** Attempting to read/write invalid or restricted memory address (e.g. dereferencing \`NULL\`).

👉 Practice technical MCQs in **[Programming: C Pointers](#/practice/c-pointers)**!`
  },

  // 9. SQL & Databases
  {
    keywords: ['sql', 'database', 'join', 'inner join', 'left join', 'primary key', 'foreign key', 'normalization', 'group by'],
    category: 'Programming',
    topic: 'Database & SQL Queries',
    solve: (query) => `### 🗄️ Database Management & SQL Core Concepts

**1. SQL Joins Explained:**
* **INNER JOIN:** Returns rows where there is a match in both tables.
* **LEFT JOIN (LEFT OUTER JOIN):** Returns all rows from left table, and matched rows from right table (NULL if no match).
* **RIGHT JOIN:** Returns all rows from right table, and matched rows from left table.
* **FULL OUTER JOIN:** Returns rows when there is a match in either left or right table.

**2. Key Constraints:**
* **PRIMARY KEY:** Unique identifier for each record. Cannot contain \`NULL\` values.
* **FOREIGN KEY:** Field in one table referencing the Primary Key of another table, ensuring referential integrity.
* **UNIQUE:** Ensures all values in a column are distinct, allows a single \`NULL\`.

**3. GROUP BY vs WHERE vs HAVING:**
* \`WHERE\` filters rows **before** aggregation.
* \`GROUP BY\` groups rows that have the same values into summary rows.
* \`HAVING\` filters aggregated groups **after** \`GROUP BY\` (e.g. \`HAVING COUNT(*) > 5\`).

👉 Explore MCQs in **[Database & SQL](#/category/database)**!`
  },

  // 10. Platform Navigation & Sitemap
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
  if (categoryContext) {
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
* 📐 **Aptitude Formulas:** Ask about *Problems on Trains, Time & Work, Interest, Percentages, Probability, Speed & Distance*.
* 🧠 **Logical Reasoning:** Ask about *Blood Relations, Syllogisms, Number Series, Coding-Decoding*.
* 💻 **Coding & Technical:** Ask about *C Pointers, Memory Allocation, Data Structures, SQL Joins, OOP in Java/C++*.
* 🧭 **Platform Navigation:** Ask how to practice modules, track your profile accuracy, or access faculty tools.

*Type your question or problem statement above to get started!*`;
}
