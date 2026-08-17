/**
 * SmartPrep — Topic Formulas, Key Concepts & Study References
 * Comprehensive formula bank modeled after IndiaBIX, GeeksforGeeks & standard placement syllabi.
 */

export const TOPIC_CONCEPTS = {
  'problems-on-trains': {
    title: 'Problems on Trains — Formulas & Core Concepts',
    category: 'Arithmetic Aptitude',
    formulas: [
      '<strong>Speed Conversion (km/hr to m/s):</strong> $x \\text{ km/hr} = \\left( x \\times \\frac{5}{18} \\right) \\text{ m/s}$',
      '<strong>Speed Conversion (m/s to km/hr):</strong> $x \\text{ m/s} = \\left( x \\times \\frac{18}{5} \\right) \\text{ km/hr}$',
      '<strong>Passing a Stationary Object of Negligible Length (pole, man, tree):</strong> Time taken = $\\frac{\\text{Length of train}}{\\text{Speed of train}}$',
      '<strong>Passing a Stationary Object of Length $L_2$ (platform, bridge, tunnel):</strong> Time taken = $\\frac{\\text{Length of train } (L_1) + \\text{Length of object } (L_2)}{\\text{Speed of train}}$',
      '<strong>Two Trains Moving in Opposite Directions:</strong> Relative Speed = $u + v$. Total distance = $L_1 + L_2$.',
      '<strong>Two Trains Moving in Same Direction:</strong> Relative Speed = $u - v$ (where $u > v$). Total distance = $L_1 + L_2$.'
    ],
    tips: [
      'Always ensure Units of distance (meters) and speed (m/s) match before computing time in seconds.',
      'When a train passes a man running in the same direction: Relative speed is $(u - v)$, and distance is only the length of the train.',
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
      '<strong>Work Rate:</strong> If A can do a piece of work in $n$ days, then A’s 1 day’s work = $\\frac{1}{n}$.',
      '<strong>Total Time:</strong> If A’s 1 day’s work = $\\frac{1}{n}$, then A completes the total work in $n$ days.',
      '<strong>Combined Work:</strong> If A can do a job in $x$ days and B in $y$ days, together they complete it in $\\frac{xy}{x + y}$ days.',
      '<strong>Three Workers:</strong> If A, B, C can complete in $x, y, z$ days respectively, together they finish in $\\frac{xyz}{xy + yz + zx}$ days.',
      '<strong>Efficiency Ratio:</strong> If A is twice as good a workman as B, Ratio of work done by A and B = $2 : 1$, and Ratio of time taken = $1 : 2$.',
      '<strong>Work & Wages Formula:</strong> $\\frac{M_1 \\times D_1 \\times H_1}{W_1} = \\frac{M_2 \\times D_2 \\times H_2}{W_2}$ ($M$=men, $D$=days, $H$=hours, $W$=work/units).'
    ],
    tips: [
      'Assume Total Work as the LCM of individual days for quick mental calculations.',
      'Wages are always divided in the ratio of the work done by each person.'
    ],
    studyLinks: [
      { title: 'IndiaBIX — Time and Work Formulas', url: 'https://www.indiabix.com/aptitude/time-and-work/formulas' },
      { title: 'GeeksforGeeks — Time and Work Shortcuts', url: 'https://www.geeksforgeeks.org/time-and-work/' }
    ]
  },

  'time-and-distance': {
    title: 'Time and Distance — Formulas & Velocity Rules',
    category: 'Arithmetic Aptitude',
    formulas: [
      '<strong>Fundamental Equation:</strong> $\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}$ | $\\text{Distance} = \\text{Speed} \\times \\text{Time}$ | $\\text{Time} = \\frac{\\text{Distance}}{\\text{Speed}}$',
      '<strong>Average Speed (Equal Distances):</strong> If a person travels a distance at $u$ km/hr and returns at $v$ km/hr, Average Speed = $\\frac{2uv}{u + v}$ km/hr.',
      '<strong>Ratio of Speeds:</strong> If the ratio of speeds of A and B is $a : b$, the ratio of times taken to cover the same distance is $\\frac{1}{a} : \\frac{1}{b} = b : a$.'
    ],
    tips: [
      'Average speed is NOT the arithmetic mean $\\frac{u + v}{2}$ when distances are equal; always use harmonic average $\\frac{2uv}{u + v}$.'
    ],
    studyLinks: [
      { title: 'IndiaBIX — Time & Distance Formulas', url: 'https://www.indiabix.com/aptitude/time-and-distance/formulas' }
    ]
  },

  'simple-interest': {
    title: 'Simple & Compound Interest Formulas',
    category: 'Arithmetic Aptitude',
    formulas: [
      '<strong>Simple Interest (S.I.):</strong> $\\text{S.I.} = \\frac{P \\times R \\times T}{100}$ ($P$ = Principal, $R$ = Rate% per annum, $T$ = Time in years).',
      '<strong>Total Amount (A):</strong> $A = P + \\text{S.I.} = P\\left(1 + \\frac{R \\times T}{100}\\right)$.',
      '<strong>Compound Interest (C.I.):</strong> $A = P\\left(1 + \\frac{R}{100}\\right)^n$ | $\\text{C.I.} = A - P$.',
      '<strong>Difference between C.I. and S.I. for 2 Years:</strong> $\\text{Difference} = P\\left(\\frac{R}{100}\\right)^2$.'
    ],
    tips: [
      'When interest is compounded half-yearly: Rate becomes $R/2$ and Time becomes $2n$.'
    ],
    studyLinks: [
      { title: 'IndiaBIX — Simple Interest Formulas', url: 'https://www.indiabix.com/aptitude/simple-interest/formulas' }
    ]
  },

  'blood-relations': {
    title: 'Logical Reasoning — Blood Relations Family Tree Rules',
    category: 'Logical Reasoning',
    formulas: [
      '<strong>Generation Hierarchy:</strong> Grandparents $\\to$ Parents/Uncles/Aunts $\\to$ Self/Siblings/Spouse $\\to$ Children/Nephews $\\to$ Grandchildren.',
      '<strong>Direct Relations:</strong> Mother’s or Father’s son = Brother | Mother’s or Father’s daughter = Sister.',
      '<strong>In-Law Relations:</strong> Son’s wife = Daughter-in-law | Daughter’s husband = Son-in-law | Spouse’s brother = Brother-in-law.'
    ],
    tips: [
      'Use symbols: Box for Male (+), Circle for Female (-), Double Line (=) for Married Couple, Single Line (-) for Siblings, Vertical Line (|) for Parent-Child.'
    ],
    studyLinks: [
      { title: 'IndiaBIX — Blood Relations Concepts', url: 'https://www.indiabix.com/logical-reasoning/blood-relations/' }
    ]
  },

  'c-pointers': {
    title: 'C Programming — Pointers & Memory Architecture',
    category: 'Programming',
    formulas: [
      '<strong>Address-of Operator (\`&\`):</strong> Returns the memory address of a variable (e.g. \`&x\`).',
      '<strong>Dereference Operator (\`*\`):</strong> Accesses the value residing at the pointed memory address (e.g. \`*ptr\`).',
      '<strong>Pointer Arithmetic:</strong> \`ptr + 1\` increments address by \`sizeof(*ptr)\` bytes.',
      '<strong>Dynamic Allocation:</strong> \`int *arr = (int*)malloc(n * sizeof(int));\` | Always \`free(arr);\` after use.'
    ],
    tips: [
      'An uninitialized pointer is a wild pointer; always initialize to \`NULL\` or valid memory.',
      'Array name decays to pointer to its first element: \`arr == &arr[0]\`.'
    ],
    studyLinks: [
      { title: 'GeeksforGeeks — C Pointers Tutorial', url: 'https://www.geeksforgeeks.org/c-pointers/' },
      { title: 'W3Schools — C Pointers', url: 'https://www.w3schools.com/c/c_pointers.php' }
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

  // Default concept fallback
  const formatted = topicSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${formatted} — Concept Overview & Study Guide`,
    category: 'Placement Preparation',
    formulas: [
      `<strong>Topic Fundamentals:</strong> Review core definitions and step-by-step mathematical theorems for ${formatted}.`,
      '<strong>Formula Precision:</strong> Read problem statements carefully and identify knowns vs unknowns before calculation.',
      '<strong>Time Management:</strong> Aim to solve standard placement multiple-choice questions in 60–90 seconds.'
    ],
    tips: [
      'Use elimination technique: rule out clearly wrong options to increase probability of correct choice.',
      'Practice with step-by-step mathematical explanations to master underlying shortcut algorithms.'
    ],
    studyLinks: [
      { title: `IndiaBIX — ${formatted} Questions & Formulas`, url: `https://www.indiabix.com/search?q=${encodeURIComponent(formatted)}` },
      { title: 'GeeksforGeeks — Placement Practice', url: 'https://www.geeksforgeeks.org/aptitude-questions-and-answers/' }
    ]
  };
}
