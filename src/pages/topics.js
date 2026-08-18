const FALLBACK_TOPICS = {
  'arithmetic-aptitude': [
    { name: 'Problems on Trains', slug: 'problems-on-trains', questionCount: 30 },
    { name: 'Time and Distance', slug: 'time-and-distance', questionCount: 25 },
    { name: 'Time and Work', slug: 'time-and-work', questionCount: 28 },
    { name: 'Simple Interest', slug: 'simple-interest', questionCount: 22 },
    { name: 'Compound Interest', slug: 'compound-interest', questionCount: 18 },
    { name: 'Profit and Loss', slug: 'profit-and-loss', questionCount: 35 },
    { name: 'Percentage', slug: 'percentage', questionCount: 40 },
    { name: 'Problems on Ages', slug: 'problems-on-ages', questionCount: 25 },
    { name: 'Ratio and Proportion', slug: 'ratio-proportion', questionCount: 32 },
    { name: 'Pipes and Cistern', slug: 'pipes-cistern', questionCount: 20 },
    { name: 'Boats and Streams', slug: 'boats-streams', questionCount: 18 },
    { name: 'Alligation or Mixture', slug: 'alligation-mixture', questionCount: 22 },
    { name: 'Average', slug: 'average', questionCount: 30 },
    { name: 'Area & Perimeter', slug: 'area', questionCount: 25 },
    { name: 'Volume and Surface Area', slug: 'volume-surface-area', questionCount: 20 },
    { name: 'Numbers & Divisibility', slug: 'numbers', questionCount: 45 },
    { name: 'Problems on H.C.F and L.C.M', slug: 'hcf-lcm', questionCount: 28 },
    { name: 'Simplification', slug: 'simplification', questionCount: 30 },
    { name: 'Permutations and Combinations', slug: 'permutations-and-combinations', questionCount: 20 },
    { name: 'Probability', slug: 'probability', questionCount: 25 },
    { name: 'Calendar & Clocks', slug: 'calendar-and-clocks', questionCount: 20 },
  ],

  'c-programming': [
    { name: 'C Declarations & Data Types', slug: 'c-declarations', questionCount: 25 },
    { name: 'Control Instructions & Loops', slug: 'c-control-instructions', questionCount: 25 },
    { name: 'Pointers & Memory Architecture', slug: 'c-pointers', questionCount: 30 },
    { name: 'Functions & Recursion', slug: 'c-functions', questionCount: 20 },
    { name: 'Arrays & 2D Matrices', slug: 'c-arrays', questionCount: 22 },
    { name: 'Strings & String Functions', slug: 'c-strings', questionCount: 20 },
    { name: 'Structures & Unions', slug: 'c-structures', questionCount: 18 },
    { name: 'Bitwise Operators & Shifts', slug: 'c-bitwise', questionCount: 20 },
    { name: 'C Preprocessor & Macros', slug: 'c-preprocessor', questionCount: 15 },
    { name: 'File Handling & I/O', slug: 'c-file-handling', questionCount: 15 },
  ],

  'programming': [
    { name: 'C Language Fundamentals', slug: 'c-declarations', questionCount: 25 },
    { name: 'C Pointers & Dynamic Memory', slug: 'c-pointers', questionCount: 30 },
    { name: 'C++ Object Oriented Programming', slug: 'cpp-oop', questionCount: 25 },
    { name: 'Java Core Concepts & Collections', slug: 'java-core', questionCount: 30 },
    { name: 'Data Structures (Stacks & Queues)', slug: 'data-structures-stack-queue', questionCount: 25 },
    { name: 'Data Structures (Trees & Graphs)', slug: 'data-structures-trees', questionCount: 20 },
    { name: 'Algorithms (Sorting & Searching)', slug: 'algorithms-sorting-searching', questionCount: 25 },
    { name: 'Python Programming Basics', slug: 'python-basics', questionCount: 25 },
  ],

  'logical-reasoning': [
    { name: 'Blood Relations & Family Tree', slug: 'blood-relations', questionCount: 30 },
    { name: 'Number Series & Pattern Completion', slug: 'number-series', questionCount: 35 },
    { name: 'Syllogisms & Venn Deductions', slug: 'syllogism', questionCount: 30 },
    { name: 'Coding - Decoding Puzzles', slug: 'coding-decoding', questionCount: 30 },
    { name: 'Direction Sense & Navigation Tests', slug: 'direction-sense-test', questionCount: 25 },
    { name: 'Seating Arrangement (Linear & Circular)', slug: 'seating-arrangement', questionCount: 25 },
    { name: 'Analogies & Classification', slug: 'analogies', questionCount: 20 },
    { name: 'Statement and Assumptions', slug: 'statement-and-assumption', questionCount: 20 },
    { name: 'Statement and Conclusions', slug: 'statement-and-conclusion', questionCount: 20 },
  ],

  'verbal-ability': [
    { name: 'Spotting Errors in Sentences', slug: 'spotting-errors', questionCount: 35 },
    { name: 'Synonyms & Vocabulary Match', slug: 'synonyms', questionCount: 40 },
    { name: 'Antonyms & Word Opposites', slug: 'antonyms', questionCount: 40 },
    { name: 'Sentence Improvement & Grammar', slug: 'sentence-improvement', questionCount: 30 },
    { name: 'Ordering of Words & Parajumbles', slug: 'ordering-of-words', questionCount: 25 },
    { name: 'One Word Substitutions', slug: 'one-word-substitutes', questionCount: 30 },
    { name: 'Idioms and Phrases', slug: 'idioms-and-phrases', questionCount: 30 },
    { name: 'Reading Comprehension Passages', slug: 'comprehension', questionCount: 20 },
    { name: 'Cloze Test & Fillers', slug: 'cloze-test', questionCount: 25 },
  ],

  'database': [
    { name: 'SQL Queries, SELECT & Clauses', slug: 'sql-queries', questionCount: 30 },
    { name: 'SQL Joins (Inner, Left, Right, Full)', slug: 'sql-joins', questionCount: 25 },
    { name: 'DBMS Architecture & RDBMS Models', slug: 'db-architecture', questionCount: 20 },
    { name: 'Database Normalization (1NF, 2NF, 3NF, BCNF)', slug: 'db-normalization', questionCount: 25 },
    { name: 'Transactions, ACID & Concurrency', slug: 'db-transactions', questionCount: 20 },
    { name: 'Keys & Integrity Constraints', slug: 'db-keys', questionCount: 20 },
    { name: 'NoSQL Databases & MongoDB Basics', slug: 'nosql-basics', questionCount: 15 },
  ],

  'data-interpretation': [
    { name: 'Table Charts & Data Grids', slug: 'table-charts', questionCount: 25 },
    { name: 'Pie Charts & Sector Percentages', slug: 'pie-charts', questionCount: 25 },
    { name: 'Bar Charts (Single & Multi-Bar)', slug: 'bar-charts', questionCount: 25 },
    { name: 'Line Graphs & Trend Analysis', slug: 'line-graphs', questionCount: 20 },
  ],

  'general-knowledge': [
    { name: 'Basic General Knowledge', slug: 'basic-gk', questionCount: 35 },
    { name: 'Indian History & Freedom Struggle', slug: 'indian-history', questionCount: 30 },
    { name: 'Indian Geography & Rivers', slug: 'geography', questionCount: 25 },
    { name: 'General Science & Inventions', slug: 'general-science', questionCount: 30 },
    { name: 'World Organizations (UN, WHO, IMF)', slug: 'world-orgs', questionCount: 20 },
    { name: 'Current Affairs & Technology News', slug: 'current-affairs-gk', questionCount: 30 },
  ],

  'engineering': [
    { name: 'Computer Science & IT Fundamentals', slug: 'cs-engineering', questionCount: 30 },
    { name: 'Electronics & Communication (ECE)', slug: 'ece-engineering', questionCount: 25 },
    { name: 'Electrical Engineering (EEE)', slug: 'eee-engineering', questionCount: 25 },
    { name: 'Mechanical Engineering Core', slug: 'mechanical-engineering', questionCount: 25 },
    { name: 'Civil Engineering Fundamentals', slug: 'civil-engineering', questionCount: 25 },
  ],

  'default': [
    { name: 'Core Concept Questions', slug: 'core-concepts', questionCount: 25 },
    { name: 'Intermediate Placement MCQs', slug: 'intermediate-mcqs', questionCount: 25 },
    { name: 'Advanced Company Test Problems', slug: 'advanced-problems', questionCount: 20 },
  ]
};

function formatTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function renderTopics(categorySlug) {
  let topics = FALLBACK_TOPICS[categorySlug] || FALLBACK_TOPICS['arithmetic-aptitude'];
  const categoryTitle = formatTitle(categorySlug);

  // Track recent category
  try {
    const recent = JSON.parse(localStorage.getItem('smartprep_recent_modules') || '[]');
    const existing = recent.filter(r => r.slug !== categorySlug);
    existing.unshift({
      title: categoryTitle,
      slug: categorySlug,
      path: `#/category/${categorySlug}`,
      icon: 'mdi-folder-open-outline'
    });
    localStorage.setItem('smartprep_recent_modules', JSON.stringify(existing.slice(0, 5)));
  } catch (e) {}

  const topicCards = topics.map(topic => `
    <a href="#/practice/${topic.slug}" class="topic-card no-underline">
      <div class="topic-card-inner">
        <div class="topic-icon">
          <span class="mdi mdi-book-open-page-variant"></span>
        </div>
        <div class="topic-content">
          <h4>${topic.name}</h4>
          <span class="badge badge-primary">${topic.questionCount} Questions</span>
        </div>
        <span class="mdi mdi-chevron-right topic-arrow"></span>
      </div>
    </a>
  `).join('');

  return `
    <div class="page-container">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem;">
        <button class="back-bubble-btn" style="position: static; box-shadow: none;" onclick="window.history.back()" title="Back">
          <span class="mdi mdi-arrow-left"></span>
        </button>
        <div>
          <nav class="breadcrumb" style="margin-bottom: 2px;">
            <a href="#/categories">Categories</a>
            <span class="mdi mdi-chevron-right"></span>
            <span>${categoryTitle}</span>
          </nav>
          <h2 style="font-size: var(--text-2xl);">${categoryTitle}</h2>
          <p class="subtitle" style="font-size: var(--text-sm);">Select a topic to start practicing with step-by-step solutions</p>
        </div>
      </div>

      <div class="topics-grid">
        ${topicCards}
      </div>
    </div>
  `;
}
