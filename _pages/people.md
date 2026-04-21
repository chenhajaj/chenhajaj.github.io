---
layout: page
title: People
permalink: /people/
description: Current students and alumni of the Hajaj Lab at Ariel University
nav: true
nav_order: 3
---

<style>
.people-stats{display:flex;gap:2rem;justify-content:center;margin:2rem 0 3rem;flex-wrap:wrap}
.people-stat{text-align:center;background:linear-gradient(135deg,#4b6cb7 0%,#182848 100%);color:#fff!important;padding:1.5rem 2.5rem;border-radius:12px;min-width:140px}
.people-stat .stat-number{font-size:2.5rem;font-weight:700;line-height:1;color:#fff!important}
.people-stat .stat-label{font-size:0.85rem;margin-top:0.4rem;opacity:0.9;color:#fff!important}
.people-section-title{font-size:1.4rem;font-weight:600;color:#2d3748;border-bottom:3px solid #4b6cb7;padding-bottom:0.5rem;margin:2.5rem 0 1.5rem}
.people-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.5rem;margin-bottom:2rem}
.person-card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem 1rem;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.06);transition:transform 0.2s,box-shadow 0.2s}
.person-card:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,0,0,0.1)}
.person-photo-placeholder{width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;color:white;font-size:1.8rem;font-weight:700}
.person-name{font-weight:600;font-size:0.95rem;color:#2d3748;margin-bottom:0.25rem}
.person-role{font-size:0.8rem;color:#4b6cb7;font-weight:500;margin-bottom:0.4rem}
.person-thesis{font-size:0.75rem;color:#718096;line-height:1.4}
.join-cta{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;border-radius:16px;padding:2.5rem;text-align:center;margin-top:3rem}
.join-cta h3{font-size:1.5rem;margin-bottom:0.75rem;color:white}
.join-cta p{opacity:0.9;margin-bottom:1.5rem}
.btn-join{display:inline-block;background:white;color:#764ba2;padding:0.75rem 2rem;border-radius:8px;font-weight:600;text-decoration:none}
.btn-join:hover{background:#f7fafc;transform:translateY(-2px);text-decoration:none}
@media(max-width:600px){.people-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1rem}.people-stats{gap:1rem}.people-stat{padding:1rem 1.5rem;min-width:120px}}
</style>

{% assign phd_students = site.data.students.phd_students %}
{% assign phd_alumni = site.data.students.phd_alumni %}
{% assign masters_students = site.data.students.masters_students %}
{% assign masters_alumni = site.data.students.masters_alumni %}
{% assign research_assistants = site.data.students.research_assistants %}
{% assign former_ras = site.data.students.former_research_assistants %}

{% assign current_count = phd_students.size | plus: masters_students.size | plus: research_assistants.size %}
{% assign alumni_count = phd_alumni.size | plus: masters_alumni.size | plus: former_ras.size %}

<div class="people-stats">
  <div class="people-stat">
    <div class="stat-number">{{ current_count }}</div>
    <div class="stat-label">Current Students</div>
  </div>
  <div class="people-stat">
    <div class="stat-number">{{ alumni_count }}</div>
    <div class="stat-label">Alumni</div>
  </div>
</div>

{% if phd_students %}
<h2 class="people-section-title">🎓 PhD Students</h2>
<div class="people-grid">
  {% for student in phd_students %}
  <div class="person-card">
    <div class="person-photo-placeholder">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    <div class="person-name">{{ student.name }}</div>
    <div class="person-role">PhD Student</div>
    {% if student.research_area %}<div class="person-thesis">{{ student.research_area }}</div>{% endif %}
  </div>
  {% endfor %}
</div>
{% endif %}

{% if masters_students %}
<h2 class="people-section-title">📚 MSc Students</h2>
<div class="people-grid">
  {% for student in masters_students %}
  <div class="person-card">
    <div class="person-photo-placeholder">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    <div class="person-name">{{ student.name }}</div>
    <div class="person-role">MSc Student</div>
    {% if student.research_area %}<div class="person-thesis">{{ student.research_area }}</div>{% endif %}
  </div>
  {% endfor %}
</div>
{% endif %}

{% if research_assistants %}
<h2 class="people-section-title">🔬 Research Assistants</h2>
<div class="people-grid">
  {% for student in research_assistants %}
  <div class="person-card">
    <div class="person-photo-placeholder">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    <div class="person-name">{{ student.name }}</div>
    <div class="person-role">Research Assistant</div>
    {% if student.research_area %}<div class="person-thesis">{{ student.research_area }}</div>{% endif %}
  </div>
  {% endfor %}
</div>
{% endif %}

{% if phd_alumni %}
<h2 class="people-section-title">🏆 PhD Alumni</h2>
<div class="people-grid">
  {% for student in phd_alumni %}
  <div class="person-card">
    <div class="person-photo-placeholder">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    <div class="person-name">{{ student.name }}</div>
    <div class="person-role">PhD{% if student.graduation_year %} · {{ student.graduation_year }}{% endif %}</div>
    {% if student.research_area %}<div class="person-thesis">{{ student.research_area }}</div>{% endif %}
  </div>
  {% endfor %}
</div>
{% endif %}

{% if masters_alumni %}
<h2 class="people-section-title">🎓 MSc Alumni</h2>
<div class="people-grid">
  {% for student in masters_alumni %}
  <div class="person-card">
    <div class="person-photo-placeholder">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    <div class="person-name">{{ student.name }}</div>
    <div class="person-role">MSc{% if student.graduation_year %} · {{ student.graduation_year }}{% endif %}</div>
    {% if student.research_area %}<div class="person-thesis">{{ student.research_area }}</div>{% endif %}
  </div>
  {% endfor %}
</div>
{% endif %}

{% if former_ras %}
<h2 class="people-section-title">🔬 Former Research Assistants</h2>
<div class="people-grid">
  {% for student in former_ras %}
  <div class="person-card">
    <div class="person-photo-placeholder">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    <div class="person-name">{{ student.name }}</div>
    <div class="person-role">RA{% if student.graduation_year %} · {{ student.graduation_year }}{% endif %}</div>
    {% if student.research_area %}<div class="person-thesis">{{ student.research_area }}</div>{% endif %}
  </div>
  {% endfor %}
</div>
{% endif %}

<div class="join-cta">
  <h3>Join the Lab</h3>
  <p>We are looking for motivated PhD and MSc students passionate about AI, cybersecurity, and data science. If you want to work on cutting-edge research with real-world impact, get in touch.</p>
  <a href="mailto:chen.hajaj@ariel.ac.il" class="btn-join">Get in Touch →</a>
</div>
