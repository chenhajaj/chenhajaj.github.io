---
layout: page
title: Our Lab
permalink: /people/
description: Current students and alumni of the Hajaj Lab at Ariel University
nav: true
nav_order: 3
---

<style>
/* Stats banner */
.people-stats{display:flex;gap:1.5rem;justify-content:center;margin:2rem 0 3rem;flex-wrap:wrap}
.people-stat{text-align:center;background:var(--global-theme-color);color:#fff!important;padding:1.25rem 2rem;border-radius:10px;min-width:130px}
.people-stat .stat-number{font-size:2.2rem;font-weight:700;line-height:1;color:#fff!important}
.people-stat .stat-label{font-size:0.8rem;margin-top:0.35rem;opacity:0.9;color:#fff!important;text-transform:uppercase;letter-spacing:0.04em}

/* Section titles */
.people-section-title{font-size:1.25rem;font-weight:700;color:var(--global-text-color);border-bottom:2px solid var(--global-theme-color);padding-bottom:0.5rem;margin:2.5rem 0 1.25rem;display:flex;align-items:center;gap:0.5rem}
.people-section-title i{color:var(--global-theme-color);font-size:1.1rem}

/* Card grid — wider so research area text is legible */
.people-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem;margin-bottom:2rem}

/* Individual card — horizontal layout: avatar left, text right */
.person-card{
  background:var(--global-card-bg-color);
  border:1px solid var(--global-divider-color);
  border-left:4px solid var(--global-theme-color);
  border-radius:10px;
  padding:1rem 1.25rem;
  display:flex;
  align-items:flex-start;
  gap:1rem;
  box-shadow:0 2px 6px rgba(0,0,0,0.05);
  transition:transform 0.2s,box-shadow 0.2s
}
.person-card:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,0.1)}

/* Avatar circle */
.person-avatar{
  width:48px;height:48px;flex-shrink:0;
  border-radius:50%;
  background:var(--global-theme-color);
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:1.1rem;font-weight:700;
}


/* Text block */
.person-info{flex:1;min-width:0}
.person-name{font-weight:700;font-size:0.95rem;color:var(--global-text-color);margin-bottom:0.2rem}
.person-role{font-size:0.78rem;color:var(--global-theme-color);font-weight:600;margin-bottom:0.4rem;text-transform:uppercase;letter-spacing:0.03em}
.person-area-label{font-size:0.7rem;font-weight:600;color:var(--global-text-color-light);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.15rem}
.person-area{font-size:0.82rem;color:var(--global-text-color);line-height:1.45}
.person-year{display:inline-block;font-size:0.72rem;font-weight:600;color:var(--global-theme-color);background:rgba(75,108,183,0.08);padding:0.15rem 0.45rem;border-radius:4px;margin-top:0.4rem}

/* Join CTA */
.join-cta{background:var(--global-theme-color);color:#fff;border-radius:12px;padding:2rem;text-align:center;margin-top:3rem}
.join-cta h3{font-size:1.3rem;margin-bottom:0.6rem;color:#fff}
.join-cta p{opacity:0.9;margin-bottom:1.25rem;font-size:0.95rem;color:#fff !important}
.btn-join{display:inline-block;background:#fff;color:var(--global-theme-color);padding:0.65rem 1.75rem;border-radius:8px;font-weight:700;text-decoration:none;transition:all 0.2s;font-size:0.9rem}
.btn-join:hover{background:rgba(75,108,183,0.12);transform:translateY(-2px);text-decoration:none}

@media(max-width:600px){
  .people-grid{grid-template-columns:1fr;gap:0.9rem}
  .people-stats{gap:0.9rem}
  .people-stat{padding:1rem 1.25rem;min-width:110px}
}
</style>

{% assign phd_count = site.data.students.phd_students | size %}
{% assign msc_count = site.data.students.masters_students | size %}
{% assign phd_alumni_count = site.data.students.phd_alumni | size %}
{% assign msc_alumni_count = site.data.students.masters_alumni | size %}
{% assign current_count = phd_count | plus: msc_count %}
{% assign alumni_count = phd_alumni_count | plus: msc_alumni_count %}

<!-- Stats Banner -->
<div class="people-stats">
  <div class="people-stat">
    <div class="stat-number">{{ phd_count }}</div>
    <div class="stat-label">PhD Students</div>
  </div>
  <div class="people-stat">
    <div class="stat-number">{{ msc_count }}</div>
    <div class="stat-label">MSc Students</div>
  </div>
  <div class="people-stat">
    <div class="stat-number">{{ alumni_count }}</div>
    <div class="stat-label">Alumni</div>
  </div>
</div>

<!-- Current PhD Students -->
<h2 class="people-section-title"><i class="fas fa-user-graduate"></i> Current PhD Students</h2>
<div class="people-grid">
{% for student in site.data.students.phd_students %}
  <div class="person-card">
    <div class="person-avatar">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    <div class="person-info">
      <div class="person-name">{{ student.name }}</div>
      {% if student.research_area %}
        <div class="person-area">{{ student.research_area }}</div>
      {% endif %}
    </div>
  </div>
{% endfor %}
</div>

<!-- Current MSc Students -->
<h2 class="people-section-title"><i class="fas fa-book-open"></i> Current MSc Students</h2>
<div class="people-grid">
{% for student in site.data.students.masters_students %}
  <div class="person-card">
    <div class="person-avatar">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    <div class="person-info">
      <div class="person-name">{{ student.name }}</div>
      {% if student.research_area %}
        <div class="person-area">{{ student.research_area }}</div>
      {% endif %}
    </div>
  </div>
{% endfor %}
</div>

<!-- PhD Alumni -->
<h2 class="people-section-title"><i class="fas fa-trophy"></i> PhD Alumni</h2>
<div class="people-grid">
{% for student in site.data.students.phd_alumni %}
  <div class="person-card">
    <div class="person-avatar">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    <div class="person-info">
      <div class="person-name">{{ student.name }}</div>
      {% if student.graduation_year %}<span class="person-year">{{ student.graduation_year }}</span>{% endif %}
      {% if student.research_area %}
        <div class="person-area">{{ student.research_area }}</div>
      {% endif %}
    </div>
  </div>
{% endfor %}
</div>

<!-- MSc Alumni -->
<h2 class="people-section-title"><i class="fas fa-medal"></i> MSc Alumni</h2>
<div class="people-grid">
{% for student in site.data.students.masters_alumni %}
  <div class="person-card">
    <div class="person-avatar">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    <div class="person-info">
      <div class="person-name">{{ student.name }}</div>
      {% if student.graduation_year %}<span class="person-year">{{ student.graduation_year }}</span>{% endif %}
      {% if student.research_area %}
        <div class="person-area">{{ student.research_area }}</div>
      {% endif %}
    </div>
  </div>
{% endfor %}
</div>

<!-- Research Assistants -->
{% if site.data.students.research_assistants and site.data.students.research_assistants.size > 0 %}
<h2 class="people-section-title"><i class="fas fa-flask"></i> Research Assistants</h2>
<div class="people-grid">
{% for student in site.data.students.research_assistants %}
  <div class="person-card">
    <div class="person-avatar">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    <div class="person-info">
      <div class="person-name">{{ student.name }}</div>
      {% if student.research_area %}
        <div class="person-area">{{ student.research_area }}</div>
      {% endif %}
    </div>
  </div>
{% endfor %}
</div>
{% endif %}

<!-- Former Research Assistants -->
{% if site.data.students.former_research_assistants and site.data.students.former_research_assistants.size > 0 %}
<h2 class="people-section-title"><i class="fas fa-history"></i> Former Research Assistants</h2>
<div class="people-grid">
{% for student in site.data.students.former_research_assistants %}
  <div class="person-card">
    <div class="person-avatar">{{ student.name | split: ' ' | first | slice: 0 }}{{ student.name | split: ' ' | last | slice: 0 }}</div>
    <div class="person-info">
      <div class="person-name">{{ student.name }}</div>
      {% if student.graduation_year %}<span class="person-year">{{ student.graduation_year }}</span>{% endif %}
      {% if student.research_area %}
        <div class="person-area">{{ student.research_area }}</div>
      {% endif %}
    </div>
  </div>
{% endfor %}
</div>
{% endif %}

<!-- Join CTA -->
<div class="join-cta">
  <h3>Join the Lab</h3>
  <p>Looking for motivated PhD and MSc students passionate about AI, cybersecurity, and data science. Get in touch if you want to work on cutting-edge research with real-world impact.</p>
  <a href="mailto:chenha@g.ariel.ac.il" class="btn-join">Get in Touch →</a>
</div>
