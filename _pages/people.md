---
layout: page
title: People
permalink: /people/
description: Current students and alumni of the Hajaj Lab at Ariel University
nav: true
nav_order: 3
---

<style>
/* ── Lab Stats ──────────────────────────────────────────────────────── */
.people-stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 2rem 0 3rem;
  flex-wrap: wrap;
}
.people-stat {
  text-align: center;
  background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
  color: white;
  padding: 1.5rem 2.5rem;
  border-radius: 12px;
  min-width: 140px;
}
.people-stat .stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}
.people-stat .stat-label {
  font-size: 0.85rem;
  margin-top: 0.4rem;
  opacity: 0.9;
}

/* ── Section Headers ────────────────────────────────────────────────── */
.people-section-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
  border-bottom: 3px solid #4b6cb7;
  padding-bottom: 0.5rem;
  margin: 2.5rem 0 1.5rem;
}

/* ── Student Cards ──────────────────────────────────────────────────── */
.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.person-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}
.person-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}
.person-photo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem;
  display: block;
  border: 3px solid #4b6cb7;
}
.person-photo-placeholder {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
}
.person-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: #2d3748;
  margin-bottom: 0.25rem;
}
.person-role {
  font-size: 0.8rem;
  color: #4b6cb7;
  font-weight: 500;
  margin-bottom: 0.4rem;
}
.person-thesis {
  font-size: 0.75rem;
  color: #718096;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}
.person-year {
  font-size: 0.75rem;
  color: #a0aec0;
}
.person-position {
  font-size: 0.75rem;
  color: #48bb78;
  font-weight: 500;
  margin-top: 0.25rem;
}
.person-links {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
}
.person-links a {
  color: #718096;
  font-size: 1rem;
  transition: color 0.2s;
}
.person-links a:hover {
  color: #4b6cb7;
}

/* ── Join CTA ───────────────────────────────────────────────────────── */
.join-cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  margin-top: 3rem;
}
.join-cta h3 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: white;
}
.join-cta p {
  opacity: 0.9;
  margin-bottom: 1.5rem;
}
.btn-join {
  display: inline-block;
  background: white;
  color: #764ba2;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-join:hover {
  background: #f7fafc;
  transform: translateY(-2px);
  text-decoration: none;
}

@media (max-width: 600px) {
  .people-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  .people-stats {
    gap: 1rem;
  }
  .people-stat {
    padding: 1rem 1.5rem;
    min-width: 120px;
  }
}
</style>

{% assign current = site.data.students | where: "status", "current" %}
{% assign alumni = site.data.students | where: "status", "alumni" %}

<!-- Stats Banner -->
<div class="people-stats">
  <div class="people-stat">
    <div class="stat-number">{{ current | size }}</div>
    <div class="stat-label">Current Students</div>
  </div>
  <div class="people-stat">
    <div class="stat-number">{{ alumni | size }}</div>
    <div class="stat-label">Alumni</div>
  </div>
</div>

<!-- Current Students -->
<h2 class="people-section-title">🎓 Current Students</h2>

<div class="people-grid">
{% for student in current %}
  <div class="person-card">
    {% if student.photo %}
      <img class="person-photo"
           src="{{ '/assets/img/students/' | append: student.photo | relative_url }}"
           alt="{{ student.name }}"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="person-photo-placeholder" style="display:none;">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    {% else %}
      <div class="person-photo-placeholder">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    {% endif %}
    <div class="person-name">{{ student.name }}</div>
    <div class="person-role">{{ student.role }}</div>
    {% if student.thesis %}
      <div class="person-thesis">{{ student.thesis }}</div>
    {% endif %}
    <div class="person-year">Joined {{ student.year_joined }}</div>
    <div class="person-links">
      {% if student.linkedin %}<a href="{{ student.linkedin }}" target="_blank"><i class="fab fa-linkedin"></i></a>{% endif %}
      {% if student.github %}<a href="https://github.com/{{ student.github }}" target="_blank"><i class="fab fa-github"></i></a>{% endif %}
      {% if student.email %}<a href="mailto:{{ student.email }}"><i class="fas fa-envelope"></i></a>{% endif %}
    </div>
  </div>
{% endfor %}
</div>

<!-- Alumni -->
<h2 class="people-section-title">🏆 Alumni</h2>

<div class="people-grid">
{% for student in alumni %}
  <div class="person-card">
    {% if student.photo %}
      <img class="person-photo"
           src="{{ '/assets/img/students/' | append: student.photo | relative_url }}"
           alt="{{ student.name }}"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="person-photo-placeholder" style="display:none;">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    {% else %}
      <div class="person-photo-placeholder">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    {% endif %}
    <div class="person-name">{{ student.name }}</div>
    <div class="person-role">{{ student.role }}{% if student.year_graduated %} · {{ student.year_graduated }}{% endif %}</div>
    {% if student.thesis %}
      <div class="person-thesis">{{ student.thesis }}</div>
    {% endif %}
    {% if student.current_position and student.current_position != "" %}
      <div class="person-position">📍 {{ student.current_position }}</div>
    {% endif %}
    <div class="person-links">
      {% if student.linkedin %}<a href="{{ student.linkedin }}" target="_blank"><i class="fab fa-linkedin"></i></a>{% endif %}
      {% if student.github %}<a href="https://github.com/{{ student.github }}" target="_blank"><i class="fab fa-github"></i></a>{% endif %}
    </div>
  </div>
{% endfor %}
</div>

<!-- Join CTA -->
<div class="join-cta">
  <h3>Join the Lab</h3>
  <p>We're looking for motivated PhD and MSc students passionate about AI, cybersecurity, and data science. If you want to work on cutting-edge research with real-world impact, get in touch.</p>
  <a href="mailto:chen.hajaj@ariel.ac.il" class="btn-join">Get in Touch →</a>
</div>
