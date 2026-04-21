---
layout: about
title: About
permalink: /
subtitle:

profile:
  align: right
  image: me.jpeg
  image_circular: false
  more_info: >
    <div class="contact-info">
      <p><i class="fas fa-building"></i> Office: 58.3.42</p>
      
      <div class="social-links">
        <a href="mailto:chenha@g.ariel.ac.il" title="Email"><i class="fas fa-envelope"></i></a>
        <a href="https://github.com/chenhajaj" title="GitHub"><i class="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/chen-hajaj-5ba59517" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
        <a href="https://scholar.google.com/citations?user=Ys5aNKYAAAAJ" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>
      </div>
    </div>

selected_papers: false
social: false
announcements:
  enabled: false
  scrollable: true
  limit: 5
latest_posts:
  enabled: false
  scrollable: true
  limit: 3
---

<div class="about-content">
  <!-- Impact Stats Hero -->
  <section class="impact-stats-hero">
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-value">$1.2M+</div>
        <div class="stat-label">Research Funding</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">4</div>
        <div class="stat-label">Patents</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">6</div>
        <div class="stat-label">Conferences Chaired</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">50+</div>
        <div class="stat-label">Publications</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">16</div>
        <div class="stat-label">Current Students</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">20</div>
        <div class="stat-label">Alumni Students</div>
      </div>
    </div>
  </section>

  <!-- About Me Section -->
  <section class="about-intro-section">
    <div class="about-intro-content">
      <p class="about-lead-text">
        I lead data science research and education as <strong>Associate Professor</strong> and <strong>Head of the Data Science Track</strong> at Ariel University, where I also serve as <strong>Head of the Faculty Review Board</strong> and <strong>NVIDIA University Ambassador</strong>.
      </p>
      <p class="about-intro-text">
        My research translates artificial intelligence theory into deployed systems with measurable real-world impact. I've secured over <strong>$1.2 million in competitive research funding</strong> and hold <strong>4 patents</strong> in AI applications spanning healthcare diagnostics, cybersecurity, and human behavior prediction.
      </p>
      <p class="about-intro-text">
        I bridge academia and industry through active collaborations with the Israel Innovation Authority, Ministry of Innovation Science and Technology, and leading technology companies—developing AI solutions for encrypted traffic analysis, medical decision support, and intelligent recommendation systems deployed at scale.
      </p>
    </div>

  </section>

  <!-- Research Focus -->
  <section class="research-focus-section">
    <h3><i class="fas fa-microscope"></i> Research Focus</h3>
    <div class="research-intro-container">
      <p class="research-intro">My research bridges theoretical foundations with practical applications, developing innovative solutions that address real-world challenges across diverse domains. Each area represents a commitment to advancing knowledge while creating tangible value for industry and society.</p>
    </div>
    <div class="research-stack">
      <div class="research-item featured">
        <div class="research-icon">
          <i class="fas fa-brain"></i>
        </div>
        <h4>Multimodal Learning</h4>
      </div>
      <div class="research-item">
        <div class="research-icon">
          <i class="fas fa-shield-alt"></i>
        </div>
        <h4>Cybersecurity & Network Monitoring</h4>
      </div>
      <div class="research-item">
        <div class="research-icon">
          <i class="fas fa-heartbeat"></i>
        </div>
        <h4>Medical Data Science</h4>
      </div>
      <div class="research-item">
        <div class="research-icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <h4>eCommerce</h4>
      </div>
      <div class="research-item">
        <div class="research-icon">
          <i class="fas fa-vr-cardboard"></i>
        </div>
        <h4>Design Spaces</h4>
      </div>
      <div class="research-item">
        <div class="research-icon">
          <i class="fas fa-users"></i>
        </div>
        <h4>Human Behavior Analysis</h4>
      </div>
    </div>
  </section>

  <!-- ── News ── -->
  <section style="margin-bottom:3rem;">
  <h3 style="color:var(--global-theme-color);font-size:1.4rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin-bottom:1.5rem;">📰 News</h3>
  <div style="display:flex;flex-direction:column;gap:0.5rem;">
  {% assign sorted_news = site.news | sort: "date" | reverse %}
  {% for item in sorted_news limit: 10 %}{% unless item.path contains "_TEMPLATE" %}
  <div style="display:flex;gap:1rem;padding:0.6rem 0;border-bottom:1px solid #f0f0f0;align-items:baseline;">
    <span style="min-width:110px;color:#718096;font-size:0.85rem;font-weight:500;flex-shrink:0;">{{ item.date | date: "%b %-d, %Y" }}</span>
    <span style="color:#2d3748;line-height:1.5;">{{ item.content | remove: '<p>' | remove: '</p>' }}</span>
  </div>
  {% endunless %}{% endfor %}
  </div>
  </section>

  <!-- Join Our Team -->
  <section class="join-team-section">
    <h3><i class="fas fa-user-plus"></i> Join Our Lab</h3>
    <div class="join-lab-cta">
      <div class="cta-main-content">
        <p class="welcome-text">We welcome motivated graduate students who are passionate about pushing the boundaries of AI research. Our lab provides a collaborative environment, cutting-edge projects, and opportunities to contribute to high-impact publications while working on meaningful problems that bridge theory and practice.</p>
      </div>
      <div class="cta-bottom">
        <div class="cta-benefits">
          <span class="benefit"><i class="fas fa-check"></i> Collaborative Environment</span>
          <span class="benefit"><i class="fas fa-check"></i> Industry Partnerships</span>
          <span class="benefit"><i class="fas fa-check"></i> Top-tier Publications</span>
          <span class="benefit"><i class="fas fa-check"></i> International Exposure</span>
        </div>
        <div class="cta-action">
          <a href="mailto:chenha@g.ariel.ac.il" class="btn-primary">
            <i class="fas fa-envelope"></i>
            Contact for Research Opportunities
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Research Opportunities -->
  <!-- <section class="impact-section">
    <h3><i class="fas fa-users"></i> Research Opportunities</h3>
    <div class="impact-grid">
      <div class="impact-card">
        <div class="impact-icon">
          <i class="fas fa-handshake"></i>
        </div>
        <div class="impact-content">
          <h4>Industry Partnerships</h4>
          <p>Active collaborations with leading tech companies and innovation authorities, including projects on multimodal learning and cybersecurity.</p>
        </div>
      </div>
      <div class="impact-card">
        <div class="impact-icon">
          <i class="fas fa-globe"></i>
        </div>
        <div class="impact-content">
          <h4>International Collaboration</h4>
          <p>Research partnerships spanning multiple countries, fostering global knowledge exchange and cross-cultural research initiatives.</p>
        </div>
      </div>
      <div class="impact-card">
        <div class="impact-icon">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="impact-content">
          <h4>Student Mentorship</h4>
          <p>Supervising numerous Ph.D. and M.Sc. students, guiding the next generation of AI researchers and practitioners.</p>
        </div>
      </div>
      <div class="impact-card">
        <div class="impact-icon">
          <i class="fas fa-search"></i>
        </div>
        <div class="impact-content">
          <h4>Research Assistants</h4>
          <p>Talented research assistants play a vital role in our cutting-edge research projects, contributing to breakthrough discoveries and innovative solutions.</p>
        </div>
      </div>
    </div>
  </section> -->

  <!-- Academic Leadership & Impact -->
  <section class="journey-section">
    <h3><i class="fas fa-crown"></i> Leadership & Impact</h3>
    <div class="timeline">
      <div class="timeline-item highlight">
        <div class="timeline-marker">
          <i class="fas fa-university"></i>
        </div>
        <div class="timeline-content">
          <h4>Senior Faculty & Administrative Leadership</h4>
          <p><strong>NVIDIA University Ambassador (2024-present)</strong> • Leading GPU computing and AI education initiatives.</p>
          <p><strong>Head of Faculty Review Board (2021-present)</strong> • Directing research quality and ethical standards across the Faculty of Engineering.</p>
          <p><strong>Head of Data Science Track (2021-present)</strong> • Overseeing curriculum development, student programs, and industry partnerships.</p>
          <p><strong>Director, Data Science & AI Research Center (2019-2024)</strong> • Built a research center securing $1.2M+ in competitive funding, producing 4 patents, and establishing collaborations with Israel Innovation Authority and Ministry of Innovation.</p>
          <span class="timeline-meta">Ariel University • 2018-Present</span>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-marker">
          <i class="fas fa-microscope"></i>
        </div>
        <div class="timeline-content">
          <h4>Postdoctoral Research</h4>
          <p>Developed machine learning algorithms for cybersecurity and network monitoring. Served on the Postdoc Association Committee, contributing to research policy and mentoring programs.</p>
          <span class="timeline-meta">Vanderbilt University • 2016-2018</span>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-marker">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="timeline-content">
          <h4>Ph.D. in Computer Science</h4>
          <p>Specialized in game theory and mechanism design, developing theoretical models and algorithms for strategic decision-making in competitive and cooperative environments.</p>
          <span class="timeline-meta">Bar-Ilan University • 2010-2016</span>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
.about-content {
  max-width: 100%;
  margin: 0;
  padding: 0;
}

/* Ensure content doesn't overlap with profile image */
@media (min-width: 769px) {
  .about-content {
    margin-right: 0;
  }
}

@media (max-width: 768px) {
  .about-content {
    margin-right: 0;
  }
}

/* Impact Stats Hero */
.impact-stats-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2.5rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  line-height: 1;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.stat-label {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.95);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

/* Global Section Styling */
section {
  margin-bottom: 4rem;
  padding: 0;
}

/* About Intro Section Override */
.about-intro-section {
  background: white !important;
  padding: 3rem !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 20px !important;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08) !important;
}

.about-lead-text {
  font-size: 1.35rem !important;
  line-height: 1.7 !important;
  color: #1a202c !important;
  margin-bottom: 2rem !important;
  font-weight: 500 !important;
  border-left: 4px solid var(--global-theme-color) !important;
  padding-left: 1.5rem !important;
  background: linear-gradient(to right, rgba(75, 108, 183, 0.05), transparent) !important;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  padding-right: 1rem !important;
  border-radius: 0 12px 12px 0 !important;
}

.about-intro-text {
  font-size: 1.1rem !important;
  line-height: 1.8 !important;
  color: #4a5568 !important;
  margin-bottom: 1.5rem !important;
}

.about-intro-text strong {
  color: #2d3748;
  font-weight: 600;
}

h3 {
  color: #2d3748;
  font-size: 1.85rem;
  font-weight: 700;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

h3 i {
  color: var(--global-theme-color);
  font-size: 1.5rem;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 20px;
  margin-bottom: 4rem;
  border: 1px solid #e2e8f0;
}

.hero-title {
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.greeting {
  display: block;
  font-size: 1.2rem;
  color: #4a5568;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.name {
  display: block;
  font-size: 3rem;
  color: var(--global-theme-color);
  font-weight: 800;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 2rem;
  font-weight: 500;
}

.hero-positions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin: 2rem 0 1.5rem 0;
}

.position-compact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  color: var(--global-theme-color);
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 3px 12px rgba(75, 108, 183, 0.2);
  border: 1px solid rgba(75, 108, 183, 0.2);
  transition: all 0.3s ease;
}

.position-compact:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(75, 108, 183, 0.3);
  background: white;
}

.position-compact i {
  font-size: 1rem;
  color: var(--global-theme-color);
}

.hero-institution {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
}

.hero-institution i {
  color: var(--global-theme-color);
  font-size: 1.2rem;
}

/* Research Focus Section */
.research-focus-section {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
}

.research-intro-container {
  text-align: center;
  padding: 1.5rem 0 2rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.research-intro {
  color: #2d3748;
  font-size: 1.05rem;
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto;
  font-weight: 400;
}

/* Research Items - 2x3 Matrix Layout */
.research-stack {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
}

.research-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.research-item.featured {
  background: linear-gradient(135deg, #f8fafc 0%, rgba(75, 108, 183, 0.05) 100%);
  border: 2px solid var(--global-theme-color);
}

.research-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  background: white;
}

.research-item.featured:hover {
  background: linear-gradient(135deg, white 0%, rgba(75, 108, 183, 0.02) 100%);
}

.research-icon {
  background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.research-item:hover .research-icon {
  transform: scale(1.1) rotate(5deg);
}

.research-item h4 {
  color: #2d3748;
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.research-item:hover h4 {
  color: var(--global-theme-color);
}

/* Timeline Section */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, var(--global-theme-color), #3b5998);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  padding-left: 3rem;
}

.timeline-item.highlight {
  background: linear-gradient(to right, rgba(75, 108, 183, 0.03), transparent);
  padding: 2rem;
  padding-left: 5rem;
  margin-left: -2rem;
  border-radius: 12px;
  border: 1px solid rgba(75, 108, 183, 0.2);
}

.timeline-item.highlight .timeline-content h4 {
  color: var(--global-theme-color);
  font-size: 1.5rem;
}

.timeline-marker {
  position: absolute;
  left: -47px;
  top: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  border: 4px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(75, 108, 183, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-item.highlight .timeline-marker {
  width: 70px;
  height: 70px;
  font-size: 1.5rem;
  left: -52px;
  box-shadow: 0 6px 25px rgba(75, 108, 183, 0.5);
}

.timeline-item:hover .timeline-marker {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(75, 108, 183, 0.4);
}

.timeline-content h4 {
  color: #2d3748;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 0.8rem 0;
}

.timeline-content p {
  color: #4a5568;
  line-height: 1.7;
  margin: 0 0 1rem 0;
}

.timeline-meta {
  color: var(--global-theme-color);
  font-weight: 600;
  font-size: 0.95rem;
}



/* Impact Section */
.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.impact-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  text-align: center;
}

.impact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

.impact-icon {
  background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  color: white;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin: 0 auto 1.5rem auto;
}

.impact-content h4 {
  color: #2d3748;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.impact-content p {
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

/* CTA Section */
.join-lab-cta {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;
}

.cta-main-content {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cta-main-content h4 {
  color: #2d3748;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
}

.welcome-text {
  color: #4a5568;
  line-height: 1.8;
  font-size: 1.1rem;
  margin: 0;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.cta-bottom {
  margin-top: 2rem;
  text-align: center;
}

.cta-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.benefit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2d3748;
  font-weight: 500;
  font-size: 0.9rem;
}

.benefit i {
  color: #10b981;
}

.cta-action {
  display: flex;
  justify-content: center;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 2.5rem;
  background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(75, 108, 183, 0.3);
  white-space: nowrap;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 35px rgba(75, 108, 183, 0.45);
  color: white;
  text-decoration: none;
  background: linear-gradient(135deg, #4b6cb7, #2c5282);
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .about-content {
    padding: 0 0.5rem;
  }

  /* Hero Section Mobile */
  .hero-section {
    padding: 2rem 1rem;
    margin-bottom: 2.5rem;
  }

  .name {
    font-size: 2.2rem !important;
  }

  .greeting {
    font-size: 1rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-positions {
    gap: 1rem;
    margin: 1.5rem 0 1rem 0;
    flex-direction: column;
    align-items: center;
  }

  .position-compact {
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
    gap: 0.4rem;
  }

  .hero-institution {
    font-size: 1rem;
    margin-top: 0.8rem;
  }

  /* Section Headers Mobile */
  h3 {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }

  section {
    margin-bottom: 2.5rem;
  }

  /* Research Focus Section Mobile */
  .research-focus-section {
    padding: 1.5rem;
  }

  .research-stack {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;
  }

  .research-item {
    padding: 1rem;
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }

  .research-item h4 {
    font-size: 0.9rem;
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .research-stack {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
    gap: 0.8rem;
  }

  .research-item {
    padding: 0.8rem;
  }

  .research-item h4 {
    font-size: 0.8rem;
  }



  /* Timeline Mobile */
  .timeline {
    padding-left: 1rem;
  }

  .timeline::before {
    left: 15px;
  }

  .timeline-item {
    padding-left: 2rem;
  }

  .timeline-marker {
    left: -32px;
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }

  .timeline-content h4 {
    font-size: 1.1rem;
  }

  .timeline-content p {
    font-size: 0.95rem;
  }

  /* Research Intro Mobile */
  .research-intro {
    font-size: 1rem;
  }

  .research-areas {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .area {
    padding: 1.5rem;
  }

  .area-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .area-header i {
    font-size: 1.5rem;
  }

  .area-header h4 {
    font-size: 1.1rem;
  }

  .area-highlights {
    justify-content: center;
  }

  /* Impact Section Mobile */
  .impact-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .impact-card {
    padding: 1.5rem;
  }

  .impact-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  /* CTA Section Mobile */
  .join-lab-cta {
    padding: 2rem;
    min-height: 250px;
  }

  .cta-main-content h4 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  .welcome-text {
    font-size: 1rem;
    line-height: 1.6;
  }

  .cta-bottom {
    margin-top: 1.5rem;
  }

  .cta-benefits {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .benefit {
    font-size: 0.85rem;
  }

  .btn-primary {
    padding: 1rem 2rem;
    font-size: 0.9rem;
  }
}

.contact-info {
  text-align: center;
  margin-top: 1rem;
}

.contact-info p {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  color: #4a5568;
  font-size: 0.95rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.social-links a {
  color: #4a5568;
  font-size: 1.25rem;
  transition: all 0.2s ease;
}

.social-links a:hover {
  color: #4b6cb7;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .research-areas {
    grid-template-columns: 1fr;
  }

  section {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
  }

  h3 {
    font-size: 1.15rem;
  }

  .area {
    padding: 1rem;
  }
}


</style>
