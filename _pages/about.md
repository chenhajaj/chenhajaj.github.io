---
layout: about
title: About
permalink: /
subtitle: <a href='https://www.ariel.ac.il/en/faculty/engineering/ie-mgt/'>Industrial Engineering and Management</a> at <a href='https://www.ariel.ac.il/'>Ariel University</a>. 

profile:
  align: right
  image: Chen.jpeg
  image_circular: false
  more_info: >
    <div class="contact-info">
      <p><i class="fas fa-building"></i> Office: 58.3.42</p>
      
      <div class="social-links">
        <a href="mailto:chenha@g.ariel.ac.il" title="Email"><i class="fas fa-envelope"></i></a>
        <a href="https://github.com/chenhajaj" title="GitHub"><i class="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/chen-hajaj-b2b4b0b" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
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
  <section class="intro">
    <p>As an Assistant Professor in the Department of Industrial Engineering and Management at Ariel University, I lead initiatives at the forefront of data science and AI innovation. In my roles as Head of the Data Science Track and Director of the Faculty Review Board for Engineering, I drive academic excellence and shape the future of technological education.</p>
  </section>

  <section class="research-focus">
    <h3><i class="fas fa-microscope"></i> Research Areas</h3>
    <p class="research-intro">My research lies at the intersection of machine learning and strategic decision-making. I focus particularly on developing innovative AI solutions for critical domains including healthcare, cybersecurity, and human-AI interaction challenges.</p>
    <div class="research-areas">
      <div class="area">
        <h4><i class="fas fa-heartbeat"></i> Medical Data Science</h4>
        <p>Advancing healthcare through AI-driven solutions and predictive analytics</p>
      </div>
      <div class="area">
        <h4><i class="fas fa-shield-alt"></i> Network Security</h4>
        <p>Developing robust approaches for protecting digital infrastructure</p>
      </div>
      <div class="area">
        <h4><i class="fas fa-shopping-cart"></i> e-Commerce</h4>
        <p>Optimizing online retail experiences through strategic analysis</p>
      </div>
      <div class="area">
        <h4><i class="fas fa-robot"></i> Human-AI Interaction</h4>
        <p>Building effective bridges between human decision-makers and AI systems</p>
      </div>
    </div>
  </section>

  <section class="join-lab">
    <h3><i class="fas fa-users"></i> Join Our Lab</h3>
    <p>We welcome motivated M.Sc. and Ph.D. students interested in cutting-edge AI research. Our lab offers:</p>
    <ul>
      <li>Collaborative research environment</li>
      <li>Industry partnerships</li>
      <li>Real-world impact opportunities</li>
      <li>Publication in top-tier venues</li>
    </ul>
    <div class="contact-button">
      <a href="mailto:chenha@g.ariel.ac.il" class="btn">
        <i class="fas fa-envelope"></i> Contact About Research Opportunities
      </a>
    </div>
  </section>
</div>

<style>
.about-content {
  max-width: 900px;
  margin: 0 auto;
}

section {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
}

section:not(:last-child) {
  border-bottom: 1px solid #e2e8f0;
}

h3 {
  color: #2d3748;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

h3 i {
  color: #4b6cb7;
}

.research-areas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.area {
  background: #f8fafc;
  padding: 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.area:hover {
  border-color: #4b6cb7;
  transform: translateY(-2px);
}

.area h4 {
  color: #2d3748;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.area h4 i {
  color: #4b6cb7;
}

.area p {
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.join-lab ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.join-lab li {
  color: #4a5568;
  font-size: 0.95rem;
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.join-lab li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #4b6cb7;
}

.contact-button {
  margin-top: 1.5rem;
  text-align: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #4b6cb7;
  color: white;
  border-radius: 0.375rem;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn:hover {
  background-color: #3b5998;
  transform: translateY(-1px);
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

.research-intro {
  color: #2d3748;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
</style>