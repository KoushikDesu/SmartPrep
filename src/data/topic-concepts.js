/**
 * SmartPrep — Topic Formulas, Key Concepts & Study References
 * Formatted with clean visual HTML math notation and fraction styling.
 */

export const TOPIC_CONCEPTS = {
  'problems-on-trains': {
    title: 'Problems on Trains — Key Formulas & Rules',
    category: 'Arithmetic Aptitude',
    formulas: [
      {
        title: 'Speed Conversion (km/hr to m/s)',
        equation: 'Speed in m/s = Speed in km/hr × <span class="math-frac"><span class="math-num">5</span><span class="math-den">18</span></span>'
      },
      {
        title: 'Speed Conversion (m/s to km/hr)',
        equation: 'Speed in km/hr = Speed in m/s × <span class="math-frac"><span class="math-num">18</span><span class="math-den">5</span></span>'
      },
      {
        title: 'Crossing a Stationary Object (Pole, Tree, Man)',
        equation: 'Time Taken = <span class="math-frac"><span class="math-num">Length of Train</span><span class="math-den">Speed of Train</span></span>'
      },
      {
        title: 'Crossing a Platform, Bridge, or Tunnel',
        equation: 'Time Taken = <span class="math-frac"><span class="math-num">Length of Train + Length of Platform</span><span class="math-den">Speed of Train</span></span>'
      },
      {
        title: 'Two Trains in Opposite Directions',
        equation: 'Relative Speed = <span class="math-badge">u + v</span> | Total Distance = <span class="math-badge">L₁ + L₂</span> | Time = <span class="math-frac"><span class="math-num">L₁ + L₂</span><span class="math-den">u + v</span></span>'
      },
      {
        title: 'Two Trains in Same Direction (u > v)',
        equation: 'Relative Speed = <span class="math-badge">u - v</span> | Total Distance = <span class="math-badge">L₁ + L₂</span> | Time = <span class="math-frac"><span class="math-num">L₁ + L₂</span><span class="math-den">u - v</span></span>'
      }
    ],
    tips: [
      'Always ensure units of distance (meters) and speed (m/s) match before computing time.',
      'When a train passes a moving person in the same direction: Relative Speed = (Train Speed - Man Speed).'
    ],
    studyLinks: [
      { title: 'IndiaBIX — Problems on Trains Formulas', url: 'https://www.indiabix.com/aptitude/problems-on-trains/formulas' },
      { title: 'GeeksforGeeks — Train Problems Aptitude', url: 'https://www.geeksforgeeks.org/problems-on-trains/' }
    ]
  },

  'time-and-work': {
    title: 'Time and Work — Core Formulas & Rules',
    category: 'Arithmetic Aptitude',
    formulas: [
      {
        title: 'Work Rate per Day',
        equation: 'If A finishes work in <strong>n</strong> days, then A’s 1-day work = <span class="math-frac"><span class="math-num">1</span><span class="math-den">n</span></span>'
      },
      {
        title: 'Combined Work of 2 Persons (A and B)',
        equation: 'Total Time = <span class="math-frac"><span class="math-num">x × y</span><span class="math-den">x + y</span></span> days'
      },
      {
        title: 'Combined Work of 3 Persons (A, B, and C)',
        equation: 'Total Time = <span class="math-frac"><span class="math-num">x × y × z</span><span class="math-den">(xy + yz + zx)</span></span> days'
      },
      {
        title: 'Efficiency to Time Ratio',
        equation: 'If A is <strong>twice</strong> as efficient as B: Work Ratio = <span class="math-badge">2 : 1</span> | Time Taken Ratio = <span class="math-badge">1 : 2</span>'
      },
      {
        title: 'Chain Rule (Men, Days, Hours, Work)',
        equation: '<span class="math-frac"><span class="math-num">M₁ × D₁ × H₁</span><span class="math-den">W₁</span></span> = <span class="math-frac"><span class="math-num">M₂ × D₂ × H₂</span><span class="math-den">W₂</span></span>'
      }
    ],
    tips: [
      'Use the LCM method: Take total units of work as the LCM of individual days for faster mental calculations.',
      'Wages are always shared in proportion to the work done by each person.'
    ],
    studyLinks: [
      { title: 'IndiaBIX — Time and Work Formulas', url: 'https://www.indiabix.com/aptitude/time-and-work/formulas' },
      { title: 'GeeksforGeeks — Time & Work Shortcuts', url: 'https://www.geeksforgeeks.org/time-and-work/' }
    ]
  },

  'time-and-distance': {
    title: 'Time and Distance — Velocity Rules',
    category: 'Arithmetic Aptitude',
    formulas: [
      {
        title: 'Fundamental Equation',
        equation: 'Speed = <span class="math-frac"><span class="math-num">Distance</span><span class="math-den">Time</span></span> | Distance = Speed × Time | Time = <span class="math-frac"><span class="math-num">Distance</span><span class="math-den">Speed</span></span>'
      },
      {
        title: 'Average Speed (Equal Distances)',
        equation: 'Average Speed = <span class="math-frac"><span class="math-num">2 × u × v</span><span class="math-den">u + v</span></span> km/hr'
      },
      {
        title: 'Speed & Time Inverse Proportion',
        equation: 'If ratio of speeds = <span class="math-badge">a : b</span>, then ratio of times taken = <span class="math-badge">b : a</span>'
      }
    ],
    tips: [
      'Average speed is the harmonic mean 2uv/(u+v), NOT the simple average (u+v)/2.'
    ],
    studyLinks: [
      { title: 'IndiaBIX — Time & Distance Formulas', url: 'https://www.indiabix.com/aptitude/time-and-distance/formulas' }
    ]
  },

  'simple-interest': {
    title: 'Simple & Compound Interest Formulas',
    category: 'Arithmetic Aptitude',
    formulas: [
      {
        title: 'Simple Interest (S.I.)',
        equation: 'S.I. = <span class="math-frac"><span class="math-num">P × R × T</span><span class="math-den">100</span></span> (P = Principal, R = Rate%, T = Time in Years)'
      },
      {
        title: 'Total Maturity Amount (A)',
        equation: 'Amount = Principal + S.I. = P × (1 + <span class="math-frac"><span class="math-num">R × T</span><span class="math-den">100</span></span>)'
      },
      {
        title: 'Compound Interest (C.I.)',
        equation: 'Amount = P × (1 + <span class="math-frac"><span class="math-num">R</span><span class="math-den">100</span></span>)ⁿ | C.I. = Amount - Principal'
      },
      {
        title: '2-Year Difference between C.I. and S.I.',
        equation: 'Difference = P × (<span class="math-frac"><span class="math-num">R</span><span class="math-den">100</span></span>)²'
      }
    ],
    tips: [
      'If compounded half-yearly: Rate becomes R/2 and Time becomes 2n.'
    ],
    studyLinks: [
      { title: 'IndiaBIX — Simple Interest Formulas', url: 'https://www.indiabix.com/aptitude/simple-interest/formulas' }
    ]
  },

  'blood-relations': {
    title: 'Logical Reasoning — Blood Relations Family Tree',
    category: 'Logical Reasoning',
    formulas: [
      {
        title: 'Generations Order',
        equation: 'Grandparents ➔ Parents / Uncles / Aunts ➔ Self / Siblings / Spouse ➔ Children / Nephews'
      },
      {
        title: 'Notation Shortcuts',
        equation: '<span class="math-badge">[ + ] Male</span> | <span class="math-badge">[ - ] Female</span> | <span class="math-badge">[ = ] Married Couple</span> | <span class="math-badge">[ — ] Siblings</span>'
      }
    ],
    tips: [
      'Draw the generation tree vertically to easily deduce relations step by step.'
    ],
    studyLinks: [
      { title: 'IndiaBIX — Blood Relations Concepts', url: 'https://www.indiabix.com/logical-reasoning/blood-relations/' }
    ]
  },

  'c-pointers': {
    title: 'C Programming — Pointers & Memory Architecture',
    category: 'Programming',
    formulas: [
      {
        title: 'Address-of Operator (&)',
        equation: '<code>int *ptr = &amp;x;</code> (Stores memory address of variable x)'
      },
      {
        title: 'Dereference Operator (*)',
        equation: '<code>*ptr = 25;</code> (Directly modifies the value stored at the pointed address)'
      },
      {
        title: 'Dynamic Memory Allocation',
        equation: '<code>int *arr = (int*)malloc(n * sizeof(int));</code> | Always <code>free(arr);</code>'
      }
    ],
    tips: [
      'An uninitialized pointer is a wild pointer; always initialize to NULL or valid allocated address.'
    ],
    studyLinks: [
      { title: 'GeeksforGeeks — C Pointers Tutorial', url: 'https://www.geeksforgeeks.org/c-pointers/' }
    ]
  }
};

/**
 * Helper to get concept data for any topic slug
 */
export function getTopicConcept(topicSlug) {
  if (TOPIC_CONCEPTS[topicSlug]) {
    return TOPIC_CONCEPTS[topicSlug];
  }

  const formatted = topicSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${formatted} — Concept Overview & Formulas`,
    category: 'Placement Preparation',
    formulas: [
      {
        title: 'Core Topic Principles',
        equation: `Master standard definitions, step-by-step algorithms, and formula applications for ${formatted}.`
      },
      {
        title: 'Problem-Solving Strategy',
        equation: 'Identify given parameters ➔ Apply standard equation ➔ Verify dimensional units.'
      }
    ],
    tips: [
      'Eliminate improbable options first to maximize accuracy.',
      'Review step-by-step solutions to master underlying shortcut algorithms.'
    ],
    studyLinks: [
      { title: `IndiaBIX — ${formatted} Questions & Formulas`, url: `https://www.indiabix.com/search?q=${encodeURIComponent(formatted)}` },
      { title: 'GeeksforGeeks — Placement Aptitude', url: 'https://www.geeksforgeeks.org/aptitude-questions-and-answers/' }
    ]
  };
}
