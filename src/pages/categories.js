import { supabase } from '../lib/supabase.js';

const FALLBACK_CATEGORIES = [
  {
    name: 'General Aptitude',
    slug: 'general-aptitude',
    icon: 'mdi-chart-donut-variant',
    color: '#0d9488',
    subcategories: [
      { name: 'Arithmetic Aptitude', slug: 'arithmetic-aptitude' },
      { name: 'Data Interpretation', slug: 'data-interpretation' },
    ]
  },
  {
    name: 'Verbal & Reasoning',
    slug: 'verbal-reasoning',
    icon: 'mdi-checkbox-marked-circle-outline',
    color: '#e11d48',
    subcategories: [
      { name: 'Verbal Ability', slug: 'verbal-ability' },
      { name: 'Logical Reasoning', slug: 'logical-reasoning' },
      { name: 'Verbal Reasoning', slug: 'verbal-reasoning-sub' },
      { name: 'Nonverbal Reasoning', slug: 'nonverbal-reasoning' },
    ]
  },
  {
    name: 'Current Affairs & GK',
    slug: 'current-affairs-gk',
    icon: 'mdi-earth',
    color: '#0284c7',
    subcategories: [
      { name: 'Current Affairs', slug: 'current-affairs' },
      { name: 'Basic General Knowledge', slug: 'basic-gk' },
      { name: 'General Science', slug: 'general-science' },
    ]
  },
  {
    name: 'Interview Preparation',
    slug: 'interview',
    icon: 'mdi-account-supervisor',
    color: '#d97706',
    subcategories: [
      { name: 'Placement Papers', slug: 'placement-papers' },
      { name: 'Group Discussion', slug: 'group-discussion' },
      { name: 'HR Interview', slug: 'hr-interview' },
    ]
  },
  {
    name: 'Engineering',
    slug: 'engineering',
    icon: 'mdi-cogs',
    color: '#7c3aed',
    subcategories: [
      { name: 'Mechanical Engineering', slug: 'mechanical-engineering' },
      { name: 'Civil Engineering', slug: 'civil-engineering' },
      { name: 'ECE', slug: 'ece' },
      { name: 'EEE', slug: 'eee' },
      { name: 'CSE', slug: 'cse' },
    ]
  },
  {
    name: 'Programming',
    slug: 'programming',
    icon: 'mdi-code-braces',
    color: '#059669',
    subcategories: [
      { name: 'C Programming', slug: 'c-programming' },
      { name: 'C++ Programming', slug: 'cpp-programming' },
      { name: 'C# Programming', slug: 'csharp-programming' },
      { name: 'Java Programming', slug: 'java-programming' },
    ]
  },
  {
    name: 'Online Tests',
    slug: 'online-tests',
    icon: 'mdi-clipboard-list',
    color: '#2563eb',
    subcategories: [
      { name: 'Aptitude Test', slug: 'aptitude-test' },
      { name: 'Verbal Ability Test', slug: 'verbal-ability-test' },
      { name: 'Logical Reasoning Test', slug: 'logical-reasoning-test' },
    ]
  },
  {
    name: 'Technical MCQs',
    slug: 'technical-mcqs',
    icon: 'mdi-code-braces-box',
    color: '#db2777',
    subcategories: [
      { name: 'Networking', slug: 'networking' },
      { name: 'Database', slug: 'database' },
      { name: 'Basic Electronics', slug: 'basic-electronics' },
      { name: 'Digital Electronics', slug: 'digital-electronics' },
    ]
  },
  {
    name: 'Medical Science',
    slug: 'medical-science',
    icon: 'mdi-dna',
    color: '#ea580c',
    subcategories: [
      { name: 'Microbiology', slug: 'microbiology' },
      { name: 'Biochemistry', slug: 'biochemistry' },
      { name: 'Biotechnology', slug: 'biotechnology' },
    ]
  },
  {
    name: 'Puzzles',
    slug: 'puzzles',
    icon: 'mdi-puzzle',
    color: '#8b5cf6',
    subcategories: [
      { name: 'Sudoku', slug: 'sudoku' },
      { name: 'Number Puzzles', slug: 'number-puzzles' },
      { name: 'Logical Puzzles', slug: 'logical-puzzles' },
    ]
  },
];

export async function renderCategories() {
  let categories = FALLBACK_CATEGORIES;
  
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('categories')
        .select('*, subcategories(*)')
        .order('sort_order', { ascending: true });
        
      if (data && !error && data.length > 0) {
        categories = data.map(cat => ({
          ...cat,
          color: cat.color || '#0d9488',
          icon: cat.icon || 'mdi-book-open',
          subcategories: (cat.subcategories && cat.subcategories.length > 0) 
            ? cat.subcategories 
            : (FALLBACK_CATEGORIES.find(f => f.slug === cat.slug)?.subcategories || [])
        }));
      }
    }
  } catch (err) {
    console.log("Using fallback categories:", err);
  }

  const categoryCards = categories.map(cat => `
    <div class="category-card" style="border-top: 3.5px solid ${cat.color || 'var(--color-primary)'};">
      <div class="category-header">
        <div class="category-icon" style="background-color: ${cat.color}15; color: ${cat.color};">
          <span class="mdi ${cat.icon}"></span>
        </div>
        <h3>${cat.name}</h3>
      </div>
      <div class="subcategories-list">
        ${(cat.subcategories || []).map(sub => `
          <a href="#/category/${sub.slug}" class="subcategory-pill">${sub.name}</a>
        `).join('')}
      </div>
    </div>
  `).join('');

  return `
    <div class="page-container">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem;">
        <button class="back-bubble-btn" style="position: static; box-shadow: none;" onclick="window.location.hash='#/'" title="Back to Home">
          <span class="mdi mdi-arrow-left"></span>
        </button>
        <div>
          <h2 style="font-size: var(--text-2xl); margin-bottom: 2px;">Practice Categories</h2>
          <p class="subtitle" style="font-size: var(--text-sm);">Select a subject and subcategory to start placement training</p>
        </div>
      </div>
      
      <div class="categories-grid">
        ${categoryCards}
      </div>
    </div>
  `;
}
