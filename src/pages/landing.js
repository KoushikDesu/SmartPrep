export function renderLanding() {
  return `
    <div class="landing-page">
      <!-- Navbar / Header -->
      <header class="landing-header">
        <div class="logo">
          <span class="mdi mdi-school-outline"></span>
          <h1>SmartPrep</h1>
        </div>
        <div class="auth-buttons">
          <a href="#/login" class="btn btn-ghost" id="landing-login-btn">Sign In</a>
          <a href="#/signup" class="btn btn-primary" id="landing-signup-btn">
            <span class="mdi mdi-account-plus-outline"></span> Join Free
          </a>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-badge">
          <span class="mdi mdi-lightning-bolt"></span> Comprehensive Placement Training
        </div>
        <h1 class="hero-title">
          Master Placements with <span class="gradient-text">Interactive Practice</span> & AI Guidance
        </h1>
        <p class="hero-subtitle">
          Practice 1,000+ curated Quantitative Aptitude, Logical Reasoning, Verbal, Coding & Technical interview questions with step-by-step mathematical solutions and real-time AI assistance.
        </p>
        <div class="hero-ctas">
          <a href="#/signup" class="btn btn-primary btn-lg" id="get-started-btn">
            Get Started Now <span class="mdi mdi-arrow-right"></span>
          </a>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="features-section">
        <div class="container">
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon-box" style="background: rgba(37, 99, 235, 0.1); color: #2563eb;">
                <span class="mdi mdi-target"></span>
              </div>
              <h3>Focused 1-by-1 Practice</h3>
              <p>Practice one problem at a time with instant color-coded feedback and detailed mathematical derivations.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon-box" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">
                <span class="mdi mdi-robot-outline"></span>
              </div>
              <h3>AI Doubts Solver</h3>
              <p>Stuck on a tricky problem? Tap the floating AI tutor to receive immediate step-by-step guidance tailored to your doubt.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon-box" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">
                <span class="mdi mdi-chart-donut-variant"></span>
              </div>
              <h3>Progress & Performance</h3>
              <p>Track your accuracy, completed questions, and master topics across Arithmetic, Verbal, and Engineering modules.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon-box" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6;">
                <span class="mdi mdi-account-tie"></span>
              </div>
              <h3>Teacher & Admin Portals</h3>
              <p>Educators can add customized questions, track student batches, and broadcast notifications for campus drives.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Category Preview -->
      <section class="categories-preview-section">
        <div class="container">
          <div class="text-center" style="margin-bottom: 2.5rem;">
            <span class="section-tag">Placement Syllabus</span>
            <h2 class="section-title">Everything You Need for Campus Hiring</h2>
            <p class="section-desc">Extensive question bank covering all major exam patterns</p>
          </div>

          <div class="categories-grid">
            <div class="category-card preview-card">
              <div class="category-header">
                <div class="category-icon" style="background: rgba(37, 99, 235, 0.1); color: #2563eb;">
                  <span class="mdi mdi-calculator-variant-outline"></span>
                </div>
                <div>
                  <h3>General Aptitude</h3>
                  <span class="card-count">35+ Quantitative Topics</span>
                </div>
              </div>
              <div class="subcategories-list">
                <span class="subcategory-pill">Problems on Trains</span>
                <span class="subcategory-pill">Time & Work</span>
                <span class="subcategory-pill">Profit & Loss</span>
                <span class="subcategory-pill">Probability</span>
                <span class="subcategory-pill">Percentages</span>
              </div>
            </div>

            <div class="category-card preview-card">
              <div class="category-header">
                <div class="category-icon" style="background: rgba(225, 29, 72, 0.1); color: #e11d48;">
                  <span class="mdi mdi-puzzle-outline"></span>
                </div>
                <div>
                  <h3>Verbal & Reasoning</h3>
                  <span class="card-count">Logical & Analytical</span>
                </div>
              </div>
              <div class="subcategories-list">
                <span class="subcategory-pill">Logical Reasoning</span>
                <span class="subcategory-pill">Verbal Ability</span>
                <span class="subcategory-pill">Blood Relations</span>
                <span class="subcategory-pill">Coding-Decoding</span>
              </div>
            </div>

            <div class="category-card preview-card">
              <div class="category-header">
                <div class="category-icon" style="background: rgba(5, 150, 105, 0.1); color: #059669;">
                  <span class="mdi mdi-code-tags"></span>
                </div>
                <div>
                  <h3>Programming & Tech</h3>
                  <span class="card-count">Core Computer Science</span>
                </div>
              </div>
              <div class="subcategories-list">
                <span class="subcategory-pill">C Programming</span>
                <span class="subcategory-pill">Java</span>
                <span class="subcategory-pill">Database & SQL</span>
                <span class="subcategory-pill">Computer Networks</span>
              </div>
            </div>

            <div class="category-card preview-card">
              <div class="category-header">
                <div class="category-icon" style="background: rgba(124, 58, 237, 0.1); color: #7c3aed;">
                  <span class="mdi mdi-cogs"></span>
                </div>
                <div>
                  <h3>Engineering Core</h3>
                  <span class="card-count">Branch Specific MCQs</span>
                </div>
              </div>
              <div class="subcategories-list">
                <span class="subcategory-pill">ECE</span>
                <span class="subcategory-pill">EEE</span>
                <span class="subcategory-pill">Mechanical</span>
                <span class="subcategory-pill">Civil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Educational Attribution & Footer -->
      <footer class="landing-footer">
        <div class="container">
          <div class="footer-attribution-card">
            <div class="attribution-badge">
              <span class="mdi mdi-school"></span> Educational Resource
            </div>
            <h3>Educational Purpose & Question Bank Credits</h3>
            <p>
              SmartPrep is built as an interactive learning and preparation environment for students. All aptitude exercises, question statements, and explanations are adapted from <strong><a href="https://www.indiabix.com/?v=3" target="_blank" rel="noopener noreferrer">IndiaBIX.com</a></strong>. All copyrights and intellectual property are reserved by IndiaBIX&trade; Technologies.
            </p>
            <div class="attribution-actions">
              <a href="https://www.indiabix.com/?v=3" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                <span class="mdi mdi-open-in-new"></span> Visit IndiaBIX Source
              </a>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="footer-brand">
              <span class="mdi mdi-school-outline"></span> <strong>SmartPrep</strong>
            </div>
            <p class="footer-copyright">
              &copy; 2026 SmartPrep &bull; Built with focus-enhancing aesthetics for campus preparation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  `;
}
