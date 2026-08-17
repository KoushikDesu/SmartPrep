export function renderLanding() {
  return `
    <div class="landing-page">
      <header class="landing-header">
        <div class="logo">
          <span class="mdi mdi-school"></span>
          <h1>SmartPrep</h1>
        </div>
        <div class="auth-buttons">
          <a href="#/login" class="btn btn-outline" id="landing-login-btn">Login</a>
          <a href="#/signup" class="btn btn-primary" id="landing-signup-btn">Sign Up</a>
        </div>
      </header>

      <section class="hero-section">
        <div class="hero-content">
          <h2 class="hero-title">Master Your Placement Preparation</h2>
          <p class="hero-subtitle">Practice aptitude, reasoning, verbal, programming and engineering questions with AI-powered assistance, progress tracking, and detailed solutions.</p>
          <div class="hero-ctas">
            <a href="#/signup" class="btn btn-primary btn-lg" id="get-started-btn">Get Started</a>
            <a href="https://www.indiabix.com/?v=3" target="_blank" class="btn btn-outline btn-lg">Browse Questions &rarr;</a>
          </div>
        </div>
      </section>

      <section class="features-section">
        <div class="container">
          <div class="features-grid">
            <div class="feature-card">
              <span class="mdi mdi-chart-box feature-icon"></span>
              <h3>Track Your Progress</h3>
              <p>Monitor your performance across all categories. Never lose your progress again.</p>
            </div>
            <div class="feature-card">
              <span class="mdi mdi-robot-outline feature-icon"></span>
              <h3>AI Assistant</h3>
              <p>Get instant explanations and step-by-step solutions from our AI tutor.</p>
            </div>
            <div class="feature-card">
              <span class="mdi mdi-bookshelf feature-icon"></span>
              <h3>Comprehensive Question Bank</h3>
              <p>Thousands of questions covering aptitude, reasoning, verbal, engineering, and more.</p>
            </div>
            <div class="feature-card">
              <span class="mdi mdi-account-group feature-icon"></span>
              <h3>Teacher & Admin Support</h3>
              <p>Teachers can add questions, track students, and send notifications.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="categories-preview-section">
        <div class="container">
          <h2 class="section-title">Everything You Need for Placement Prep</h2>
          <div class="categories-grid" id="landing-categories">
            <!-- Rendered by a short JS script or static HTML -->
            <div class="category-card">
              <div class="category-icon" style="background: #e6f7f5; color: #2a9d8f;">
                <span class="mdi mdi-chart-donut-variant"></span>
              </div>
              <h3>General Aptitude</h3>
              <p>Arithmetic, Data Interpretation...</p>
            </div>
            <div class="category-card">
              <div class="category-icon" style="background: #fdf0ed; color: #e76f51;">
                <span class="mdi mdi-checkbox-marked-circle-outline"></span>
              </div>
              <h3>Verbal & Reasoning</h3>
              <p>Verbal Ability, Logical Reasoning...</p>
            </div>
            <div class="category-card">
              <div class="category-icon" style="background: #e2f0e9; color: #00b894;">
                <span class="mdi mdi-code-braces"></span>
              </div>
              <h3>Programming</h3>
              <p>C, C++, Java, Python...</p>
            </div>
            <div class="category-card">
              <div class="category-icon" style="background: #efecfc; color: #6c5ce7;">
                <span class="mdi mdi-cogs"></span>
              </div>
              <h3>Engineering</h3>
              <p>Mechanical, Civil, ECE, CSE...</p>
            </div>
          </div>
        </div>
      </section>

      <section class="attribution-section">
        <div class="container text-center">
          <h3>📖 Want to practice without an account?</h3>
          <p>Visit IndiaBix.com directly for free practice questions.</p>
          <a href="https://www.indiabix.com/?v=3" target="_blank" class="btn btn-outline" style="margin: 1rem 0;">Go to IndiaBix.com</a>
          <p class="disclaimer">
            <small>
              This platform contains educational content sourced from IndiaBix.com. All question data, solutions, and explanations are the intellectual property of IndiaBix&trade; Technologies. This project is for educational purposes only. All rights reserved by IndiaBix&trade;.
            </small>
          </p>
        </div>
      </section>

      <footer class="landing-footer">
        <div class="container">
          <p>&copy; 2024 SmartPrep. Built for educational purposes.</p>
          <p>Data sourced from <a href="https://www.indiabix.com/?v=3" target="_blank">IndiaBix.com</a></p>
        </div>
      </footer>
    </div>
  `;
}
