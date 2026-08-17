const FALLBACK_TOPICS = {
  'arithmetic-aptitude': [
    { name: 'Problems on Trains', slug: 'problems-on-trains', questionCount: 30 },
    { name: 'Time and Distance', slug: 'time-and-distance', questionCount: 25 },
    { name: 'Height and Distance', slug: 'height-and-distance', questionCount: 20 },
    { name: 'Time and Work', slug: 'time-and-work', questionCount: 28 },
    { name: 'Simple Interest', slug: 'simple-interest', questionCount: 22 },
    { name: 'Compound Interest', slug: 'compound-interest', questionCount: 18 },
    { name: 'Profit and Loss', slug: 'profit-and-loss', questionCount: 35 },
    { name: 'Partnership', slug: 'partnership', questionCount: 15 },
    { name: 'Percentage', slug: 'percentage', questionCount: 40 },
    { name: 'Problems on Ages', slug: 'problems-on-ages', questionCount: 25 },
    { name: 'Calendar', slug: 'calendar', questionCount: 15 },
    { name: 'Clock', slug: 'clock', questionCount: 12 },
    { name: 'Average', slug: 'average', questionCount: 30 },
    { name: 'Area', slug: 'area', questionCount: 25 },
    { name: 'Volume and Surface Area', slug: 'volume-surface-area', questionCount: 20 },
    { name: 'Numbers', slug: 'numbers', questionCount: 45 },
    { name: 'Problems on Numbers', slug: 'problems-on-numbers', questionCount: 35 },
    { name: 'Problems on H.C.F and L.C.M', slug: 'hcf-lcm', questionCount: 28 },
    { name: 'Decimal Fraction', slug: 'decimal-fraction', questionCount: 20 },
    { name: 'Simplification', slug: 'simplification', questionCount: 30 },
    { name: 'Square Root and Cube Root', slug: 'square-root-cube-root', questionCount: 22 },
    { name: 'Surds and Indices', slug: 'surds-indices', questionCount: 18 },
    { name: 'Ratio and Proportion', slug: 'ratio-proportion', questionCount: 32 },
    { name: 'Chain Rule', slug: 'chain-rule', questionCount: 15 },
    { name: 'Pipes and Cistern', slug: 'pipes-cistern', questionCount: 20 },
    { name: 'Boats and Streams', slug: 'boats-streams', questionCount: 18 },
    { name: 'Alligation or Mixture', slug: 'alligation-mixture', questionCount: 22 },
    { name: 'Logarithm', slug: 'logarithm', questionCount: 15 },
    { name: 'Races and Games', slug: 'races-games', questionCount: 10 },
    { name: 'Stocks and Shares', slug: 'stocks-shares', questionCount: 12 },
    { name: 'Probability', slug: 'probability', questionCount: 25 },
    { name: 'True Discount', slug: 'true-discount', questionCount: 10 },
    { name: 'Banker\'s Discount', slug: 'bankers-discount', questionCount: 8 },
    { name: 'Odd Man Out and Series', slug: 'odd-man-out', questionCount: 30 },
  ],
  'default': [
    { name: 'Basics', slug: 'basics', questionCount: 20 },
    { name: 'Intermediate', slug: 'intermediate', questionCount: 30 },
    { name: 'Advanced', slug: 'advanced', questionCount: 15 },
    { name: 'Mock Test', slug: 'mock-test', questionCount: 50 },
  ]
};

function formatTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function renderTopics(categorySlug) {
  // Use categorySlug to fetch topics, fallback to dictionary
  let topics = FALLBACK_TOPICS[categorySlug] || FALLBACK_TOPICS['default'];
  
  const categoryTitle = formatTitle(categorySlug);

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
      <nav class="breadcrumb">
        <a href="#/categories">Categories</a>
        <span class="mdi mdi-chevron-right"></span>
        <span>${categoryTitle}</span>
      </nav>

      <div class="page-header">
        <h2>${categoryTitle}</h2>
        <p class="subtitle">Select a topic to start practicing</p>
      </div>
      
      <div class="topics-grid">
        ${topicCards}
      </div>
    </div>
  `;
}
