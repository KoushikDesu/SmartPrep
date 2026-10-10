import { supabase } from '../lib/supabase.js';

export const FALLBACK_CATEGORIES = [
  {
    name: 'GATE Previous Questions',
    slug: 'gate-pyqs',
    icon: 'mdi-school',
    color: '#dc2626',
    gateStars: 6,
    badgeText: '5-Year PYQs (2020-2024)',
    subcategories: [
      { name: 'Computer Science (CS)', slug: 'gate-cs-cat' },
      { name: 'Electronics & Comm (EC)', slug: 'gate-ec-cat' },
      { name: 'Electrical Engg (EE)', slug: 'gate-ee-cat' },
      { name: 'Mechanical Engg (ME)', slug: 'gate-me-cat' },
      { name: 'Civil Engineering (CE)', slug: 'gate-ce-cat' },
    ]
  },
  {
    name: 'General Aptitude',
    slug: 'general-aptitude',
    icon: 'mdi-chart-donut-variant',
    color: '#0d9488',
    gateStars: 6,
    subcategories: [
      { name: 'Arithmetic Aptitude', slug: 'arithmetic-aptitude' },
      { name: 'Data Interpretation', slug: 'data-interpretation' },
    ]
  },
  {
    name: 'Engineering',
    slug: 'engineering',
    icon: 'mdi-cogs',
    color: '#7c3aed',
    gateStars: 6,
    subcategories: [
      { name: 'CSE Core Subjects', slug: 'cse' },
      { name: 'ECE Core Subjects', slug: 'ece' },
      { name: 'EEE Core Subjects', slug: 'eee' },
      { name: 'Mechanical Engineering', slug: 'mechanical-engineering' },
      { name: 'Civil Engineering', slug: 'civil-engineering' },
    ]
  },
  {
    name: 'Programming',
    slug: 'programming',
    icon: 'mdi-code-braces',
    color: '#059669',
    gateStars: 5,
    subcategories: [
      { name: 'C Programming', slug: 'c-programming' },
      { name: 'C++ Programming', slug: 'cpp-programming' },
      { name: 'C# Programming', slug: 'csharp-programming' },
      { name: 'Java Programming', slug: 'java-programming' },
    ]
  },
  {
    name: 'Technical MCQs',
    slug: 'technical-mcqs',
    icon: 'mdi-code-braces-box',
    color: '#db2777',
    gateStars: 5,
    subcategories: [
      { name: 'Database & SQL', slug: 'database' },
      { name: 'Computer Networks', slug: 'networking' },
      { name: 'Digital Electronics', slug: 'digital-electronics' },
      { name: 'Basic Electronics', slug: 'basic-electronics' },
    ]
  },
  {
    name: 'Verbal & Reasoning',
    slug: 'verbal-reasoning',
    icon: 'mdi-checkbox-marked-circle-outline',
    color: '#e11d48',
    gateStars: 4,
    subcategories: [
      { name: 'Verbal Ability', slug: 'verbal-ability' },
      { name: 'Logical Reasoning', slug: 'logical-reasoning' },
      { name: 'Verbal Reasoning', slug: 'verbal-reasoning-sub' },
      { name: 'Nonverbal Reasoning', slug: 'nonverbal-reasoning' },
    ]
  },
  {
    name: 'Online Tests',
    slug: 'online-tests',
    icon: 'mdi-clipboard-list',
    color: '#2563eb',
    gateStars: 4,
    subcategories: [
      { name: 'Aptitude Test', slug: 'aptitude-test' },
      { name: 'Verbal Ability Test', slug: 'verbal-ability-test' },
      { name: 'Logical Reasoning Test', slug: 'logical-reasoning-test' },
    ]
  },
  {
    name: 'Interview Preparation',
    slug: 'interview',
    icon: 'mdi-account-supervisor',
    color: '#d97706',
    gateStars: 3,
    subcategories: [
      { name: 'Placement Papers', slug: 'placement-papers' },
      { name: 'Group Discussion', slug: 'group-discussion' },
      { name: 'HR Interview', slug: 'hr-interview' },
    ]
  },
  {
    name: 'Current Affairs & GK',
    slug: 'current-affairs-gk',
    icon: 'mdi-earth',
    color: '#0284c7',
    gateStars: 2,
    subcategories: [
      { name: 'Current Affairs', slug: 'current-affairs' },
      { name: 'Basic General Knowledge', slug: 'basic-gk' },
      { name: 'General Science', slug: 'general-science' },
    ]
  },
  {
    name: 'Puzzles',
    slug: 'puzzles',
    icon: 'mdi-puzzle',
    color: '#8b5cf6',
    gateStars: 2,
    subcategories: [
      { name: 'Sudoku', slug: 'sudoku' },
      { name: 'Number Puzzles', slug: 'number-puzzles' },
      { name: 'Logical Puzzles', slug: 'logical-puzzles' },
    ]
  },
  {
    name: 'Medical Science',
    slug: 'medical-science',
    icon: 'mdi-dna',
    color: '#ea580c',
    gateStars: 1,
    subcategories: [
      { name: 'Microbiology', slug: 'microbiology' },
      { name: 'Biochemistry', slug: 'biochemistry' },
      { name: 'Biotechnology', slug: 'biotechnology' },
    ]
  },
];

export function renderStarRating(stars = 6) {
  const maxStars = 6;
  const fullStars = Math.min(maxStars, Math.max(1, stars));
  const emptyStars = maxStars - fullStars;

  return `
    <span class="badge-gate-star" title="GATE Exam Importance: ${fullStars} of 6 Stars">
      <span style="color: #f59e0b; letter-spacing: 1px;">${'★'.repeat(fullStars)}</span><span style="color: var(--color-border); letter-spacing: 1px;">${'☆'.repeat(emptyStars)}</span>
      <span style="font-size: 0.72rem; color: var(--color-text-tertiary); margin-left: 4px; font-weight: 600;">GATE: ${fullStars}/6★</span>
    </span>
  `;
}

export async function renderCategories() {
  let categories = FALLBACK_CATEGORIES;
  
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('categories')
        .select('*, subcategories(*)')
        .order('sort_order', { ascending: true });
        
      if (data && !error && data.length > 0) {
        // Merge with our rich local list
        categories = FALLBACK_CATEGORIES;
      }
    }
  } catch (err) {
    console.log("Using fallback categories:", err);
  }

  const categoryCards = categories.map(cat => {
    const starHtml = renderStarRating(cat.gateStars || 4);

    return `
      <div class="category-card" style="border-top: 3.5px solid ${cat.color || 'var(--color-primary)'};">
        <div class="category-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="category-icon" style="background-color: ${cat.color}15; color: ${cat.color};">
              <span class="mdi ${cat.icon}"></span>
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.05rem;">${cat.name}</h3>
              <div style="margin-top: 3px;">
                ${starHtml}
              </div>
            </div>
          </div>
          ${cat.badgeText ? `<span class="badge badge-error" style="font-size: 10px; font-weight: 700;">${cat.badgeText}</span>` : ''}
        </div>
        <div class="subcategories-list">
          ${(cat.subcategories || []).map(sub => `
            <a href="#/category/${sub.slug}" class="subcategory-pill">${sub.name}</a>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="page-container">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="back-bubble-btn" style="position: static; box-shadow: none;" onclick="window.location.hash='#/'" title="Back to Home">
            <span class="mdi mdi-arrow-left"></span>
          </button>
          <div>
            <h2 style="font-size: var(--text-2xl); margin-bottom: 2px;">Practice Categories</h2>
            <p class="subtitle" style="font-size: var(--text-sm);">Choose a stream, explore 6-star GATE topics, or dive into 5-Year Past Questions</p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge badge-primary" style="padding: 6px 12px; font-size: 0.75rem;">
            <span class="mdi mdi-star"></span> 6-Star GATE Weightage Scale
          </span>
        </div>
      </div>
      
      <div class="categories-grid">
        ${categoryCards}
      </div>
    </div>
  `;
}
