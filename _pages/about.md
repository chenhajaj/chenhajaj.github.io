---
layout: about
title: About
permalink: /
subtitle:

profile:
  align: right
  image: me.jpeg
  image_circular: false

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

  <!-- Hero: Profile + Stats -->
  <section class="hero-combined">
    <div class="hero-profile-row">
      <div class="profile-header-photo">
        <img src="/assets/img/me.jpeg" alt="Chen Hajaj" class="profile-photo-img" />
      </div>
      <div class="profile-header-text">
        <h2 class="profile-name">Chen Hajaj</h2>
        <p class="profile-title"><span id="typed-title" style="color:#fff;font-weight:700;"></span><span class="typed-cursor typed-cursor--blink" style="color:#fff;font-weight:700;">|</span></p>
        <p class="profile-institution"><i class="fas fa-university"></i> Ariel University</p>
        <div class="profile-contact-links">
          <a href="mailto:chenha@g.ariel.ac.il" title="Email"><i class="fas fa-envelope"></i> chenha@g.ariel.ac.il</a>
          <a href="https://github.com/chenhajaj" title="GitHub"><i class="fab fa-github"></i> GitHub</a>
          <a href="https://www.linkedin.com/in/chen-hajaj-5ba59517" title="LinkedIn"><i class="fab fa-linkedin"></i> LinkedIn</a>
          <a href="https://scholar.google.com/citations?user=Ys5aNKYAAAAJ" title="Google Scholar"><i class="ai ai-google-scholar"></i> Scholar</a>
          <a href="https://orcid.org/0000-0001-9940-5654" title="ORCID" target="_blank" rel="noopener"><i class="ai ai-orcid"></i> ORCID</a>
          <span class="profile-office"><i class="fas fa-building"></i> Office: 58.3.42</span>
        </div>
      </div>
    </div>
    <div class="hero-divider"></div>
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-value">$1.2M+</div>
        <div class="stat-label">Research Grants</div>
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
        <div class="stat-value">17</div>
        <div class="stat-label">Current Students</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">20</div>
        <div class="stat-label">Alumni</div>
      </div>
    </div>
  </section>

  <!-- About Me Section -->
  <section class="about-intro-section">
    <p class="about-lead-text">
      I am an <strong>Associate Professor</strong> and <strong>Head of the Data Science Track</strong> at Ariel University — working at the intersection of AI theory and real-world impact. I also serve as <strong>Head of the Faculty Review Board</strong> and <strong>NVIDIA University Ambassador</strong>.
    </p>
    <div class="about-pillars">
      <div class="about-pillar">
        <div class="about-pillar-icon"><i class="fas fa-brain"></i></div>
        <div class="about-pillar-body">
          <span class="about-pillar-title">Research</span>
          <span class="about-pillar-text">Translating AI into systems with measurable real-world impact — encrypted traffic analysis, medical decision support, and intelligent recommendation at scale.</span>
        </div>
      </div>
      <div class="about-pillar">
        <div class="about-pillar-icon"><i class="fas fa-handshake"></i></div>
        <div class="about-pillar-body">
          <span class="about-pillar-title">Partnerships</span>
          <span class="about-pillar-text">Close collaborations with the <strong>Israel Innovation Authority</strong> and the <strong>Ministry of Innovation, Science and Technology</strong>, bridging academic research and industry deployment.</span>
        </div>
      </div>
      <div class="about-pillar">
        <div class="about-pillar-icon"><i class="fas fa-graduation-cap"></i></div>
        <div class="about-pillar-body">
          <span class="about-pillar-title">Mentorship</span>
          <span class="about-pillar-text">Supervising <strong>17 current students</strong> and <strong>20 alumni</strong> across PhD and MSc programs, fostering the next generation of AI researchers.</span>
        </div>
      </div>
    </div>
  </section>

  <!-- News -->
  <section class="news-section">
    <h3><i class="fas fa-newspaper"></i> News</h3>
    <div class="news-list">
      {% assign sorted_news = site.news | sort: "date" | reverse %}
      {% for item in sorted_news limit: 10 %}{% unless item.path contains "_TEMPLATE" %}
      <div class="news-item">
        <div class="news-date-badge">
          <span class="news-month">{{ item.date | date: "%b" }}</span>
          <span class="news-year">{{ item.date | date: "%Y" }}</span>
        </div>
        <div class="news-body">
          <span class="news-text">{{ item.content | markdownify | remove: '<p>' | remove: '</p>' | strip }}</span>
        </div>
      </div>
      {% endunless %}{% endfor %}
    </div>
  </section>

  <!-- Leadership & Impact -->
  <section class="journey-section">
    <h3><i class="fas fa-crown"></i> Leadership &amp; Impact</h3>
    <div class="timeline">
      <div class="timeline-item highlight">
        <div class="timeline-marker">
          <i class="fas fa-university"></i>
        </div>
        <div class="timeline-content">
          <h4>Senior Faculty &amp; Administrative Leadership</h4>
          <p><strong>NVIDIA University Ambassador (2024–present)</strong> — Leading GPU computing and AI education initiatives at Ariel University.</p>
          <p><strong>Head of Faculty Review Board (2021–present)</strong> — Directing research quality and ethical standards across the Faculty of Engineering.</p>
          <p><strong>Head of Data Science Track (2021–present)</strong> — Overseeing curriculum development, student programs, and industry partnerships.</p>
          <p><strong>Director, Data Science &amp; AI Research Center (2019–2024)</strong> — Founded and directed a research center that secured over $1.2M in competitive funding, produced 4 patents, and established national collaborations with the Israel Innovation Authority and the Ministry of Innovation.</p>
          <span class="timeline-meta">Ariel University · 2018–present</span>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-marker">
          <i class="fas fa-microscope"></i>
        </div>
        <div class="timeline-content">
          <h4>Postdoctoral Research</h4>
          <p>Developed machine learning algorithms for cybersecurity and network traffic analysis. Served on the Postdoc Association Committee, contributing to research policy and mentoring programs.</p>
          <span class="timeline-meta">Vanderbilt University · 2016–2018</span>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-marker">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="timeline-content">
          <h4>Ph.D. in Computer Science</h4>
          <p>Specialized in game theory and mechanism design, developing theoretical models and algorithms for strategic decision-making in competitive and cooperative environments.</p>
          <span class="timeline-meta">Bar-Ilan University · 2010–2016</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Research Focus -->
  <section class="research-focus-section">
    <h3><i class="fas fa-microscope"></i> Research Focus</h3>
    <div class="research-stack">

      <div class="research-card featured">
        <div class="research-card-header">
          <div class="research-card-icon"><i class="fas fa-brain"></i></div>
          <h4>Multimodal Learning</h4>
        </div>
        <p>Fusing text, vision, audio, and structured data for tasks like item similarity, emotion recognition, and cross-modal retrieval.</p>
        <div class="research-tags"><span>Deep Learning</span><span>NLP</span><span>Computer Vision</span></div>
      </div>

      <div class="research-card">
        <div class="research-card-header">
          <div class="research-card-icon"><i class="fas fa-shield-alt"></i></div>
          <h4>Cybersecurity &amp; Network Analysis</h4>
        </div>
        <p>Classifying encrypted traffic, detecting anomalies, and building ML-based intrusion detection systems without breaking encryption.</p>
        <div class="research-tags"><span>Encrypted Traffic</span><span>Anomaly Detection</span><span>Network ML</span></div>
      </div>

      <div class="research-card">
        <div class="research-card-header">
          <div class="research-card-icon"><i class="fas fa-heartbeat"></i></div>
          <h4>Medical Data Science</h4>
        </div>
        <p>Applying machine learning to clinical data for ICU nutrition optimization, patient outcome prediction, and medical decision support.</p>
        <div class="research-tags"><span>Clinical AI</span><span>ICU</span><span>Healthcare</span></div>
      </div>

      <div class="research-card">
        <div class="research-card-header">
          <div class="research-card-icon"><i class="fas fa-store"></i></div>
          <h4>eCommerce &amp; Recommender Systems</h4>
        </div>
        <p>Designing intelligent recommendation engines, pricing strategies, and incentive-aware models that improve user experience and revenue.</p>
        <div class="research-tags"><span>Recommender Systems</span><span>Game Theory</span><span>Personalization</span></div>
      </div>

      <div class="research-card">
        <div class="research-card-header">
          <div class="research-card-icon"><i class="fas fa-cube"></i></div>
          <h4>Design Spaces</h4>
        </div>
        <p>Exploring human factors and cognitive dimensions in interface design, virtual environments, and constructivist learning systems.</p>
        <div class="research-tags"><span>HCI</span><span>VR/AR</span><span>Learning</span></div>
      </div>

      <div class="research-card">
        <div class="research-card-header">
          <div class="research-card-icon"><i class="fas fa-users-cog"></i></div>
          <h4>Human Behavior Analysis</h4>
        </div>
        <p>Modeling strategic and social behavior using computational tools — from multi-agent simulations to sentiment and emotion analysis.</p>
        <div class="research-tags"><span>Multi-Agent</span><span>Sentiment</span><span>Mechanism Design</span></div>
      </div>

    </div>
  </section>

  <!-- Join Our Lab -->
  <section class="join-team-section">
    <h3><i class="fas fa-user-plus"></i> Join Our Lab</h3>
    <div class="join-lab-cta">
      <p class="welcome-text">We welcome motivated graduate students passionate about advancing AI research. Our lab offers a collaborative environment, access to cutting-edge projects, strong industry connections, and a track record of high-impact publications.</p>
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
            Contact for Opportunities
          </a>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
/* ── About page specific styles ─────────────────────────────── */
.post-title { display: none !important; }

.about-content { max-width: 100%; margin: 0; padding: 0; }

section { margin-bottom: 4rem; }

/* Hero */
.hero-combined {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2.5rem;
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
}
.hero-profile-row { display: flex; align-items: center; gap: 2rem; }
.hero-divider { border: none; border-top: 1px solid rgba(255,255,255,0.25); margin: 2rem 0; }
.hero-combined .profile-name { color: white !important; }
.hero-combined .profile-title { color: rgba(255,255,255,0.9) !important; }
.hero-combined .profile-institution { color: rgba(255,255,255,0.75) !important; }
.hero-combined .profile-institution i { color: rgba(255,255,255,0.75) !important; }
.hero-combined .profile-contact-links a,
.hero-combined .profile-contact-links .profile-office {
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.3);
  color: white;
}
.hero-combined .profile-contact-links a i,
.hero-combined .profile-contact-links .profile-office i { color: white; }
.hero-combined .profile-contact-links a:hover {
  background: rgba(255,255,255,0.28);
  border-color: rgba(255,255,255,0.6);
  color: white;
  box-shadow: 0 3px 10px rgba(0,0,0,0.15);
}
.hero-combined .profile-photo-img {
  border-color: rgba(255,255,255,0.4);
  box-shadow: 0 6px 25px rgba(0,0,0,0.25);
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
}
.stat-item {
  text-align: center; padding: 1.25rem;
  background: rgba(255,255,255,0.15); backdrop-filter: blur(10px);
  border-radius: 14px; border: 1px solid rgba(255,255,255,0.25);
  transition: all 0.3s ease;
}
.stat-item:hover { transform: translateY(-4px); background: rgba(255,255,255,0.22); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
.stat-value { font-size: 2rem; font-weight: 700; color: white; line-height: 1; margin-bottom: 0.4rem; text-shadow: 0 2px 10px rgba(0,0,0,0.2); }
.stat-label { font-size: 0.8rem; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }

/* Profile Card */
.profile-header-text { flex: 1; min-width: 0; }
.profile-header-photo { flex-shrink: 0; }
.profile-photo-img {
  width: 140px; height: 140px; object-fit: cover;
  border-radius: 50%; border: 4px solid white;
  box-shadow: 0 6px 25px rgba(75,108,183,0.25);
}
.profile-name {
  font-size: 2rem !important; font-weight: 800 !important; color: #1a202c !important;
  margin: 0 0 0.3rem 0 !important; border: none !important; padding: 0 !important;
  display: block !important; align-items: unset !important; gap: unset !important;
}
.profile-name i { display: none; }
.profile-title { font-size: 1.05rem; color: var(--global-theme-color); font-weight: 600; margin: 0 0 0.3rem 0; }
.profile-institution { font-size: 0.9rem; color: #718096; margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.4rem; }
.profile-institution i { color: var(--global-theme-color); }
.profile-contact-links { display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; }
.profile-contact-links a,
.profile-contact-links .profile-office {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.35rem 0.8rem; border-radius: 8px;
  font-size: 0.85rem; font-weight: 500; text-decoration: none;
  transition: all 0.2s ease; border: 1px solid #e2e8f0;
  background: #f8fafc; color: #4a5568;
}
.profile-contact-links a:hover {
  color: var(--global-theme-color); border-color: var(--global-theme-color);
  background: white; transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(75,108,183,0.15); text-decoration: none;
}
.profile-contact-links a i,
.profile-contact-links .profile-office i { font-size: 0.85rem; color: var(--global-theme-color); }
.profile-office { cursor: default; }
.profile.float-right, .profile.float-left { display: none !important; }

/* About Intro */
.about-intro-section {
  background: white; padding: 2.25rem;
  border: 1px solid #e2e8f0; border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
}
.about-lead-text {
  font-size: 1.1rem; line-height: 1.75; color: #1a202c;
  margin-bottom: 1.75rem; font-weight: 500;
  border-left: 4px solid var(--global-theme-color);
  padding: 0.8rem 1rem 0.8rem 1.25rem;
  background: linear-gradient(to right, rgba(75,108,183,0.05), transparent);
  border-radius: 0 10px 10px 0;
}
.about-lead-text strong { color: var(--global-theme-color); font-weight: 700; }
.about-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.about-pillar {
  display: flex; align-items: flex-start; gap: 1rem;
  padding: 1.25rem; background: #f8fafc;
  border: 1px solid #e2e8f0; border-radius: 14px;
  transition: box-shadow 0.2s, transform 0.2s;
}
.about-pillar:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(75,108,183,0.12); }
.about-pillar-icon {
  width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 1.1rem;
}
.about-pillar-body { display: flex; flex-direction: column; gap: 0.35rem; }
.about-pillar-title { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--global-theme-color); }
.about-pillar-text { font-size: 0.92rem; line-height: 1.6; color: #4a5568; }
.about-pillar-text strong { color: #2d3748; font-weight: 600; }
@media (max-width: 768px) {
  .about-pillars { grid-template-columns: 1fr; }
  .about-pillar { padding: 1rem; }
}

/* Section headings */
.about-content h3 {
  color: #2d3748; font-size: 1.6rem; font-weight: 700;
  margin-bottom: 1.75rem; display: flex; align-items: center; gap: 0.65rem;
}
.about-content h3 i { color: var(--global-theme-color); font-size: 1.3rem; }

/* Research Focus */
.research-focus-section {
  background: white; padding: 2.5rem; border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;
}
.research-stack {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
/* Research Cards */
.research-card {
  display: flex; flex-direction: column; gap: 0.75rem;
  padding: 1.4rem 1.35rem; background: #f8fafc;
  border: 1px solid #e2e8f0; border-radius: 14px;
  transition: all 0.25s ease;
}
.research-card.featured {
  border: 2px solid var(--global-theme-color);
  background: linear-gradient(145deg, #f8fafc, rgba(75,108,183,0.05));
}
.research-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(75,108,183,0.13);
  background: white;
}
.research-card-header { display: flex; align-items: center; gap: 0.85rem; }
.research-card-icon {
  width: 42px; height: 42px; border-radius: 10px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 1rem;
  transition: transform 0.25s ease;
}
.research-card:hover .research-card-icon { transform: scale(1.12) rotate(5deg); }
.research-card h4 {
  color: #2d3748; font-size: 0.95rem; font-weight: 700; margin: 0; line-height: 1.35;
  transition: color 0.2s;
}
.research-card:hover h4 { color: var(--global-theme-color); }
.research-card p {
  font-size: 0.85rem; line-height: 1.65; color: #718096; margin: 0;
}
.research-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: auto; padding-top: 0.5rem; }
.research-tags span {
  font-size: 0.72rem; font-weight: 600; padding: 0.2rem 0.6rem;
  background: rgba(75,108,183,0.09); color: var(--global-theme-color);
  border-radius: 20px; letter-spacing: 0.02em;
}
@media (max-width: 900px) {
  .research-stack { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .research-stack { grid-template-columns: 1fr; }
  .research-card { padding: 1.1rem; }
}

/* Timeline */
.timeline { position: relative; padding-left: 2rem; }
.timeline::before {
  content: ''; position: absolute; left: 30px; top: 0; bottom: 0;
  width: 3px; background: linear-gradient(to bottom, var(--global-theme-color), #3b5998);
}
.timeline-item { position: relative; margin-bottom: 3rem; padding-left: 3rem; }
.timeline-item.highlight {
  background: linear-gradient(to right, rgba(75,108,183,0.03), transparent);
  padding: 2rem 2rem 2rem 5rem; margin-left: -2rem;
  border-radius: 12px; border: 1px solid rgba(75,108,183,0.2);
}
.timeline-item.highlight .timeline-content h4 { color: var(--global-theme-color); font-size: 1.35rem; }
.timeline-marker {
  position: absolute; left: -47px; top: 0; width: 58px; height: 58px;
  background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  border: 4px solid white; border-radius: 50%; display: flex; align-items: center;
  justify-content: center; color: white; font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(75,108,183,0.3); transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.timeline-item.highlight .timeline-marker { width: 66px; height: 66px; font-size: 1.4rem; left: -50px; }
.timeline-item:hover .timeline-marker { transform: scale(1.1); box-shadow: 0 6px 20px rgba(75,108,183,0.4); }
.timeline-content h4 { color: #2d3748; font-size: 1.2rem; font-weight: 600; margin: 0 0 0.75rem 0; }
.timeline-content p { color: #4a5568; line-height: 1.7; margin: 0 0 0.75rem 0; }
.timeline-meta { color: var(--global-theme-color); font-weight: 600; font-size: 0.9rem; }

/* News Section */
.news-section {
  background: white; padding: 2.5rem; border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;
}
.news-list { display: flex; flex-direction: column; gap: 0; }
.news-item {
  display: flex; gap: 1.25rem; align-items: center;
  padding: 1rem 0; border-bottom: 1px solid #f0f4f8;
  transition: background 0.2s ease;
  border-radius: 8px;
}
.news-item:last-child { border-bottom: none; }
.news-item:hover { background: #f8faff; padding-left: 0.6rem; padding-right: 0.6rem; margin: 0 -0.6rem; }
.news-date-badge {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-width: 54px; height: 54px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  text-align: center; gap: 1px;
}
.news-month { font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; line-height: 1; color: white !important; }
.news-year { font-size: 0.78rem; font-weight: 600; line-height: 1; color: rgba(255,255,255,0.85) !important; }
.news-body { flex: 1; }
.news-text { font-size: 0.92rem; line-height: 1.6; color: #2d3748; }
@media (max-width: 480px) {
  .news-section { padding: 1.5rem; }
  .news-item:hover { padding-left: 0.4rem; padding-right: 0.4rem; margin: 0 -0.4rem; }
  .news-date-badge { min-width: 48px; height: 48px; border-radius: 10px; }
  .news-month { font-size: 0.62rem; }
  .news-year { font-size: 0.72rem; }
}

/* Join Lab CTA */
.join-team-section .join-lab-cta {
  background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);
  padding: 2.5rem; border-radius: 20px; border: 1px solid #e2e8f0;
}
.welcome-text { color: #4a5568; line-height: 1.8; font-size: 1.05rem; margin-bottom: 2rem; max-width: 860px; }
.cta-bottom { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; }
.cta-benefits { display: flex; flex-wrap: wrap; gap: 1rem 1.5rem; flex: 1; }
.benefit { display: flex; align-items: center; gap: 0.45rem; color: #2d3748; font-weight: 500; font-size: 0.9rem; }
.benefit i { color: #10b981; }
.cta-action { flex-shrink: 0; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 0.65rem;
  padding: 0.9rem 2rem; background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  color: white; text-decoration: none; font-weight: 600; font-size: 0.95rem;
  border-radius: 12px; transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(75,108,183,0.3); border: none; white-space: nowrap;
}
.btn-primary:hover {
  transform: translateY(-3px); box-shadow: 0 10px 30px rgba(75,108,183,0.4);
  color: white; text-decoration: none; background: linear-gradient(135deg, #4b6cb7, #2c5282);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-profile-row { flex-direction: column; text-align: center; gap: 1.25rem; }
</style>

<!-- Typed.js -->
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.js"></script>
<script>
(function() {
  var el = document.getElementById('typed-title');
  if (!el) return;
  var manualCursor = el.nextElementSibling;
  if (manualCursor) manualCursor.style.display = 'none';
  new Typed('#typed-title', {
    strings: [
      'Associate Professor',
      'Head of Data Science Track',
      'AI &amp; Cybersecurity Researcher',
      'NVIDIA University Ambassador',
      'Head of Faculty Review Board'
    ],
    typeSpeed: 55, backSpeed: 30, backDelay: 2200,
    startDelay: 400, loop: true, smartBackspace: true, cursorChar: '|'
  });
})();
</script>