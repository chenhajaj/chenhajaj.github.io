---
layout: page
permalink: /contact/
title: Contact
nav: true
nav_order: 7
---

<div class="contact-page">

  <div class="contact-grid">

    <div class="contact-card">
      <div class="contact-card-icon"><i class="fas fa-envelope"></i></div>
      <h3>Email</h3>
      <p><a href="mailto:chenha@g.ariel.ac.il">chenha@g.ariel.ac.il</a></p>
    </div>

    <div class="contact-card">
      <div class="contact-card-icon"><i class="fas fa-building"></i></div>
      <h3>Office</h3>
      <p>Room 58.3.42<br>Ariel University, Ariel, Israel</p>
    </div>

    <div class="contact-card">
      <div class="contact-card-icon"><i class="fas fa-users"></i></div>
      <h3>Prospective Students</h3>
      <p>Interested in joining the lab? Send an email with your CV and a short description of your research interests.</p>
      <a href="mailto:chenha@g.ariel.ac.il?subject=Prospective%20Student" class="contact-cta">
        <i class="fas fa-paper-plane"></i> Get in Touch
      </a>
    </div>

  </div>

  <div class="contact-socials">
    <h3>Find me online</h3>
    <div class="contact-social-links">
      <a href="https://github.com/chenhajaj" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-github"></i> GitHub
      </a>
      <a href="https://www.linkedin.com/in/chen-hajaj-5ba59517" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-linkedin"></i> LinkedIn
      </a>
      <a href="https://scholar.google.com/citations?user=Zy2cIskAAAAJ" target="_blank" rel="noopener noreferrer">
        <i class="fas fa-graduation-cap"></i> Google Scholar
      </a>
      <a href="https://orcid.org/0000-0001-9940-5654" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-orcid"></i> ORCID
      </a>
    </div>
  </div>

</div>

<style>
.contact-page { max-width: 100%; padding: 2rem 0; }

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.contact-card {
  background: var(--global-card-bg-color);
  border: 1px solid var(--global-divider-color);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.contact-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.contact-card-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.contact-card h3 {
  color: var(--global-theme-color);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.contact-card p {
  color: var(--global-text-color);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.contact-card a {
  color: var(--global-theme-color);
}

.contact-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.1rem;
  background: var(--global-theme-color);
  color: white !important;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.contact-cta:hover { opacity: 0.85; text-decoration: none; }

.contact-socials h3 {
  color: var(--global-theme-color);
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.contact-social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.contact-social-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.1rem;
  border: 1.5px solid var(--global-theme-color);
  border-radius: 6px;
  color: var(--global-theme-color);
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.contact-social-links a:hover {
  background: var(--global-theme-color);
  color: white;
  text-decoration: none;
}

@media (max-width: 480px) {
  .contact-grid { grid-template-columns: 1fr; }
  .contact-social-links { gap: 0.75rem; }
}
</style>
