import { getSeedQuestions } from '../data/seed-questions.js';

const FALLBACK_TOPICS = {
  // General Aptitude
  'arithmetic-aptitude': [
    { name: 'Problems on Trains', slug: 'problems-on-trains' },
    { name: 'Time and Distance', slug: 'time-and-distance' },
    { name: 'Time and Work', slug: 'time-and-work' },
    { name: 'Simple Interest', slug: 'simple-interest' },
    { name: 'Compound Interest', slug: 'compound-interest' },
    { name: 'Profit and Loss', slug: 'profit-and-loss' },
    { name: 'Percentage', slug: 'percentage' },
    { name: 'Problems on Ages', slug: 'problems-on-ages' },
    { name: 'Ratio and Proportion', slug: 'ratio-proportion' },
    { name: 'Pipes and Cistern', slug: 'pipes-cistern' },
    { name: 'Boats and Streams', slug: 'boats-streams' },
    { name: 'Alligation or Mixture', slug: 'alligation-mixture' },
    { name: 'Average', slug: 'average' },
    { name: 'Area & Perimeter', slug: 'area' },
    { name: 'Volume and Surface Area', slug: 'volume-surface-area' },
    { name: 'Numbers & Divisibility', slug: 'numbers' },
    { name: 'Problems on H.C.F and L.C.M', slug: 'hcf-lcm' },
    { name: 'Simplification', slug: 'simplification' },
    { name: 'Permutations and Combinations', slug: 'permutations-and-combinations' },
    { name: 'Probability', slug: 'probability' },
    { name: 'Calendar & Clocks', slug: 'calendar-and-clocks' },
  ],

  'data-interpretation': [
    { name: 'Table Charts & Data Grids', slug: 'table-charts' },
    { name: 'Pie Charts & Sector Percentages', slug: 'pie-charts' },
    { name: 'Bar Charts (Single & Multi-Bar)', slug: 'bar-charts' },
    { name: 'Line Graphs & Trend Analysis', slug: 'line-graphs' },
  ],

  // Verbal & Reasoning
  'verbal-ability': [
    { name: 'Spotting Errors in Sentences', slug: 'spotting-errors' },
    { name: 'Synonyms & Vocabulary Match', slug: 'synonyms' },
    { name: 'Antonyms & Word Opposites', slug: 'antonyms' },
    { name: 'Sentence Improvement & Grammar', slug: 'sentence-improvement' },
    { name: 'Ordering of Words & Parajumbles', slug: 'ordering-of-words' },
    { name: 'One Word Substitutions', slug: 'one-word-substitutes' },
    { name: 'Idioms and Phrases', slug: 'idioms-and-phrases' },
    { name: 'Reading Comprehension Passages', slug: 'comprehension' },
    { name: 'Cloze Test & Fillers', slug: 'cloze-test' },
  ],

  'logical-reasoning': [
    { name: 'Blood Relations & Family Tree', slug: 'blood-relations' },
    { name: 'Number Series & Pattern Completion', slug: 'number-series' },
    { name: 'Syllogisms & Venn Deductions', slug: 'syllogism' },
    { name: 'Coding - Decoding Puzzles', slug: 'coding-decoding' },
    { name: 'Direction Sense & Navigation Tests', slug: 'direction-sense-test' },
    { name: 'Seating Arrangement (Linear & Circular)', slug: 'seating-arrangement' },
    { name: 'Analogies & Classification', slug: 'analogies' },
    { name: 'Statement and Assumptions', slug: 'statement-and-assumption' },
    { name: 'Statement and Conclusions', slug: 'statement-and-conclusion' },
  ],

  'verbal-reasoning-sub': [
    { name: 'Logical Deduction & Syllogisms', slug: 'logical-deduction' },
    { name: 'Statement and Course of Action', slug: 'statement-course-action' },
    { name: 'Cause and Effect Reasoning', slug: 'cause-and-effect' },
    { name: 'Statement and Argument Analysis', slug: 'statement-and-argument' },
  ],

  'nonverbal-reasoning': [
    { name: 'Pattern Series Completion', slug: 'pattern-series' },
    { name: 'Analogy Figures & Mirror Images', slug: 'mirror-images' },
    { name: 'Paper Folding & Cutting', slug: 'paper-folding' },
    { name: 'Embedded Figures & Matrix', slug: 'embedded-figures' },
  ],

  // Programming
  'c-programming': [
    { name: 'C Declarations & Data Types', slug: 'c-declarations' },
    { name: 'Control Instructions & Loops', slug: 'c-control-instructions' },
    { name: 'Pointers & Memory Architecture', slug: 'c-pointers' },
    { name: 'Functions & Recursion', slug: 'c-functions' },
    { name: 'Arrays & 2D Matrices', slug: 'c-arrays' },
    { name: 'Strings & String Functions', slug: 'c-strings' },
    { name: 'Structures & Unions', slug: 'c-structures' },
    { name: 'Bitwise Operators & Shifts', slug: 'c-bitwise' },
    { name: 'C Preprocessor & Macros', slug: 'c-preprocessor' },
    { name: 'File Handling & I/O', slug: 'c-file-handling' },
  ],

  'cpp-programming': [
    { name: 'C++ OOP & Class Encapsulation', slug: 'cpp-classes' },
    { name: 'Inheritance & Polymorphism', slug: 'cpp-inheritance' },
    { name: 'Constructors & Destructors', slug: 'cpp-constructors' },
    { name: 'Templates & Standard Template Library (STL)', slug: 'cpp-stl' },
    { name: 'Exception Handling in C++', slug: 'cpp-exceptions' },
  ],

  'csharp-programming': [
    { name: 'C# Language Fundamentals', slug: 'csharp-fundamentals' },
    { name: 'C# OOP & Properties', slug: 'csharp-oop' },
    { name: 'LINQ Queries & Collections', slug: 'csharp-linq' },
    { name: 'Delegates & Events', slug: 'csharp-delegates' },
  ],

  'java-programming': [
    { name: 'Java OOPs & Abstraction', slug: 'java-oop' },
    { name: 'Java Collections Framework', slug: 'java-collections' },
    { name: 'Multithreading & Concurrency', slug: 'java-threads' },
    { name: 'Exception Handling in Java', slug: 'java-exceptions' },
    { name: 'JVM Memory Architecture & GC', slug: 'java-jvm-memory' },
  ],

  // Technical MCQs
  'database': [
    { name: 'SQL Queries, SELECT & Clauses', slug: 'sql-queries' },
    { name: 'SQL Joins (Inner, Left, Right, Full)', slug: 'sql-joins' },
    { name: 'DBMS Architecture & RDBMS Models', slug: 'db-architecture' },
    { name: 'Database Normalization (1NF, 2NF, 3NF, BCNF)', slug: 'db-normalization' },
    { name: 'Transactions, ACID & Concurrency', slug: 'db-transactions' },
    { name: 'Keys & Integrity Constraints', slug: 'db-keys' },
    { name: 'NoSQL Databases & MongoDB Basics', slug: 'nosql-basics' },
  ],

  'networking': [
    { name: 'OSI 7-Layer & TCP/IP Model', slug: 'osi-tcp-model' },
    { name: 'IP Addressing & Subnetting', slug: 'ip-subnetting' },
    { name: 'Routing Protocols (OSPF, BGP, RIP)', slug: 'routing-protocols' },
    { name: 'Network Security & Firewalls', slug: 'network-security' },
    { name: 'HTTP, DNS, DHCP Protocols', slug: 'app-layer-protocols' },
  ],

  'basic-electronics': [
    { name: 'Semiconductors & Diodes', slug: 'semiconductor-diodes' },
    { name: 'BJT & MOSFET Transistors', slug: 'bjt-mosfet' },
    { name: 'Op-Amps & Amplifiers', slug: 'op-amps' },
  ],

  'digital-electronics': [
    { name: 'Logic Gates & Boolean Algebra', slug: 'logic-gates' },
    { name: 'Combinational Circuits (Mux/Demux)', slug: 'combinational-circuits' },
    { name: 'Sequential Circuits & Flip Flops', slug: 'flip-flops' },
    { name: 'Counters & Shift Registers', slug: 'counters-registers' },
  ],

  // Engineering
  'cse': [
    { name: 'Data Structures & Algorithms', slug: 'cs-dsa' },
    { name: 'Operating Systems & Scheduling', slug: 'cs-os' },
    { name: 'Computer Networks (CN)', slug: 'cs-cn' },
    { name: 'Database Management Systems (DBMS)', slug: 'cs-dbms' },
    { name: 'Theory of Computation (TOC)', slug: 'cs-toc' },
  ],

  'mechanical-engineering': [
    { name: 'Thermodynamics & Heat Transfer', slug: 'mech-thermodynamics' },
    { name: 'Fluid Mechanics & Hydraulics', slug: 'mech-fluids' },
    { name: 'Strength of Materials (SOM)', slug: 'mech-som' },
    { name: 'Theory of Machines & Kinematics', slug: 'mech-machines' },
  ],

  'civil-engineering': [
    { name: 'Building Materials & Construction', slug: 'civil-materials' },
    { name: 'Surveying & Levelling', slug: 'civil-surveying' },
    { name: 'Structural Analysis & RCC', slug: 'civil-structures' },
    { name: 'Geotechnical & Soil Mechanics', slug: 'civil-soil' },
  ],

  'ece': [
    { name: 'Signals & Systems', slug: 'ece-signals' },
    { name: 'Analog & Digital Communication', slug: 'ece-communication' },
    { name: 'Microprocessors (8085/8086) & Embedded', slug: 'ece-microprocessors' },
    { name: 'VLSI Design & CMOS', slug: 'ece-vlsi' },
  ],

  'eee': [
    { name: 'Electrical Circuit Analysis', slug: 'eee-circuits' },
    { name: 'Electrical Machines (Transformers/Motors)', slug: 'eee-machines' },
    { name: 'Power Systems & Grid Transmission', slug: 'eee-power-systems' },
    { name: 'Control Systems', slug: 'eee-control-systems' },
  ],

  // Current Affairs & GK
  'current-affairs': [
    { name: 'National & State Affairs', slug: 'gk-national' },
    { name: 'Economy, Banking & RBI Updates', slug: 'gk-economy' },
    { name: 'Awards, Honours & Summit Events', slug: 'gk-awards' },
    { name: 'Sports & Global Tournaments', slug: 'gk-sports' },
  ],

  'basic-gk': [
    { name: 'Indian Constitution & Polity', slug: 'gk-polity' },
    { name: 'Indian History & Freedom Struggle', slug: 'indian-history' },
    { name: 'Geography, Rivers & Wildlife Parks', slug: 'geography' },
    { name: 'World Organizations (UN, WHO, IMF)', slug: 'world-orgs' },
  ],

  'general-science': [
    { name: 'Physics Concepts & Laws', slug: 'science-physics' },
    { name: 'Chemistry & Elements', slug: 'science-chemistry' },
    { name: 'Biology & Human Physiology', slug: 'science-biology' },
  ],

  // Interview Preparation
  'placement-papers': [
    { name: 'TCS NQT Placement Practice', slug: 'tcs-nqt-papers' },
    { name: 'Infosys Online Test Prep', slug: 'infosys-papers' },
    { name: 'Wipro Elite NLTH Practice', slug: 'wipro-papers' },
    { name: 'Accenture Placement Assessment', slug: 'accenture-papers' },
    { name: 'Cognizant GenC Exam Prep', slug: 'cognizant-papers' },
  ],

  'group-discussion': [
    { name: 'Current Technology GD Topics', slug: 'gd-tech' },
    { name: 'Social & Economic GD Scenarios', slug: 'gd-social' },
    { name: 'Case-Based Group Discussions', slug: 'gd-case-study' },
  ],

  'hr-interview': [
    { name: 'Behavioral HR Questions', slug: 'hr-behavioral' },
    { name: 'Situational & Conflict Resolution', slug: 'hr-situational' },
    { name: 'Career Goals & Strengths/Weaknesses', slug: 'hr-goals' },
  ],

  // Online Tests & Mock
  'aptitude-test': [
    { name: 'Quantitative Speed Mock Test 1', slug: 'aptitude-mock-1' },
    { name: 'Quantitative Speed Mock Test 2', slug: 'aptitude-mock-2' },
  ],

  'verbal-ability-test': [
    { name: 'Verbal Grammar & Vocab Mock', slug: 'verbal-mock-1' },
  ],

  'logical-reasoning-test': [
    { name: 'Reasoning & Puzzles Mock Test', slug: 'reasoning-mock-1' },
  ],

  // Medical Science
  'microbiology': [
    { name: 'Bacteriology & Microorganisms', slug: 'microbio-bacteriology' },
    { name: 'Virology & Immunology', slug: 'microbio-immunology' },
  ],

  'biochemistry': [
    { name: 'Proteins, Enzymes & Metabolism', slug: 'biochem-enzymes' },
    { name: 'Nucleic Acids (DNA & RNA)', slug: 'biochem-dna-rna' },
  ],

  'biotechnology': [
    { name: 'Recombinant DNA & Genetic Engineering', slug: 'biotech-genetic' },
    { name: 'Fermentation & Bio-processing', slug: 'biotech-fermentation' },
  ],

  // Puzzles
  'sudoku': [
    { name: 'Standard 9x9 Sudoku Grid Logic', slug: 'sudoku-9x9' },
  ],

  'number-puzzles': [
    { name: 'Mathematical Magic Squares & Matrices', slug: 'magic-squares' },
    { name: 'Missing Number in Figures', slug: 'missing-number' },
  ],

  'logical-puzzles': [
    { name: 'River Crossing & Weighing Puzzles', slug: 'river-crossing-puzzles' },
    { name: 'Truth Tellers and Liars', slug: 'truth-tellers-liars' },
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

  const topicCards = topics.map(topic => {
    const actualCount = getSeedQuestions(topic.slug).length;
    return `
      <a href="#/practice/${topic.slug}" class="topic-card no-underline">
        <div class="topic-card-inner">
          <div class="topic-icon">
            <span class="mdi mdi-book-open-page-variant"></span>
          </div>
          <div class="topic-content">
            <h4>${topic.name}</h4>
            <span class="badge badge-primary">${actualCount} Questions</span>
          </div>
          <span class="mdi mdi-chevron-right topic-arrow"></span>
        </div>
      </a>
    `;
  }).join('');

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
