---
layout: page
permalink: /students/
title: Research Group
description: Meet our talented team of researchers
nav: true
nav_order: 3
---

<style>
.post-header {
  display: none;
}
</style>

<!-- Header Image - Compact Banner Style -->
<div class="header-image" style="margin-bottom: 3rem; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-height: 400px; position: relative;">
  <div style="width: 100%; height: 400px; overflow: hidden; position: relative;">
    {% include figure.liquid loading="eager" path="assets/img/grad.webp" title="Graduation" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" %}
  </div>
  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%); padding: 2.5rem; color: white;">
    <h1 style="margin: 0; font-size: 2.5rem; font-weight: 700; color: white; text-shadow: 0 2px 8px rgba(0,0,0,0.4);">Research Group</h1>
    <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; color: rgba(255,255,255,0.95); text-shadow: 0 1px 4px rgba(0,0,0,0.3);">Meet our talented team of researchers</p>
  </div>
</div>

<!-- PhD Students Section -->
<div class="student-section" style="margin-bottom: 4rem; display: block; background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%); padding: 2.5rem; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
  <h2 style="color: #2563eb; margin-bottom: 2rem; display: flex; align-items: center; gap: 0.75rem; font-size: 2rem; font-weight: 700; letter-spacing: -0.02em;">
    <i class="fas fa-user-graduate" style="color: #3b82f6;"></i> PhD Students
  </h2>
  <div class="student-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 2rem;">
    {% for student in site.data.students.phd_students %}
      {% include student_card.liquid student=student %}
    {% endfor %}
  </div>
</div>

<!-- PhD Alumni Section -->
<div class="student-section card-element">
  <h2><i class="fas fa-award"></i> PhD Alumni</h2>
  <div class="student-grid">
    {% for student in site.data.students.phd_alumni %}
      {% include student_card.liquid student=student %}
    {% endfor %}
  </div>
</div>

<!-- Masters Students Section -->
<div class="student-section card-element">
  <h2><i class="fas fa-user-graduate"></i> Masters Students</h2>
  <div class="student-grid">
    {% for student in site.data.students.masters_students %}
      {% include student_card.liquid student=student %}
    {% endfor %}
  </div>
</div>

<!-- Masters Alumni Section -->
<div class="student-section card-element">
  <h2><i class="fas fa-award"></i> Masters Alumni</h2>
  <div class="student-grid">
    {% for student in site.data.students.masters_alumni %}
      {% include student_card.liquid student=student %}
    {% endfor %}
  </div>
</div>

<!-- Current Research Assistants Section -->
<div class="student-section card-element">
  <h2><i class="fas fa-flask"></i> Research Assistants</h2>
  <div class="student-grid">
    {% for student in site.data.students.research_assistants %}
      {% include student_card.liquid student=student %}
    {% endfor %}
  </div>
</div>

<!-- Former Research Assistants Section -->
<div class="student-section card-element">
  <h2><i class="fas fa-history"></i> Former Research Assistants</h2>
  <div class="student-grid">
    {% for student in site.data.students.former_research_assistants %}
      {% include student_card.liquid student=student %}
    {% endfor %}
  </div>
</div>

<style>
.research-group {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  color: #333;
  display: block;
  visibility: visible;
  opacity: 1;
}

.header-image {
  margin-bottom: 2rem;
  display: block;
  visibility: visible;
}

.header-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: block;
}

.student-section {
  margin-bottom: 3rem;
  display: block;
  visibility: visible;
  opacity: 1;
}

.student-section h2 {
  color: #4b6cb7;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: left;
  visibility: visible;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  visibility: visible;
} !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
  display: block;
  visibility: visible;
  opacity: 1;
}

.member-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.member-card.alumni {
  background: #f8f9fa !important;
}

.member-card strong {
  display: block;
  color: #4b6cb7 !important;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-align: left;
  visibility: visible;
}

.member-card p {
  color: #333 !important;
  margin: 0.3rem 0;
  text-align: left;
  line-height: 1.5;
  display: block;
  visibility: visible
.member-card p {
  color: var(--global-text-color, #333);
  margin: 0.3rem 0;
  text-align: left;
  line-height: 1.5;
}

.graduation-year {
  color: #666 !important;
  font-size: 0.9rem;
  margin: 0.3rem 0;
}

.research-area {
  color: #2c3e50 !important;
  margin: 0.3rem 0;
  font-size: 0.95rem;
}

.research-area i,
.graduation-year i {
  margin-right: 0.3rem;
  color: var(--global-theme-color, #4b6cb7);
    grid-template-columns: 1fr;
  }
  
  .member-card {
    padding: 1rem;
  }
}
</style>
<style>
/* Enhanced styling for all sections */
.student-section {
  margin-bottom: 4rem !important;
  display: block !important;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%) !important;
  padding: 2.5rem !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important;
}

.student-section h2 {
  color: #2563eb !important;
  margin-bottom: 2rem !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
  font-size: 2rem !important;
  font-weight: 700 !important;
}

.student-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
  gap: 2rem !important;
}

.member-card {
  padding: 2rem !important;
  border-radius: 12px !important;
  background: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
  border: 2px solid #e5e7eb !important;
  transition: all 0.3s ease !important;
}

.member-card:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 12px 28px rgba(37,99,235,0.15) !important;
  border-color: #3b82f6 !important;
}

.member-card.alumni {
  background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%) !important;
  border-color: #fbbf24 !important;
}

.member-card.alumni:hover {
  box-shadow: 0 12px 28px rgba(251,191,36,0.2) !important;
  border-color: #f59e0b !important;
}

.member-card strong {
  display: block !important;
  color: #1e40af !important;
  font-size: 1.25rem !important;
  margin-bottom: 0.75rem !important;
  font-weight: 700 !important;
}

.member-card p {
  color: #4b5563 !important;
  margin: 0.5rem 0 !important;
  font-size: 1rem !important;
  line-height: 1.6 !important;
}

.graduation-year {
  color: #9ca3af !important;
  font-size: 0.95rem !important;
}

.research-area {
  color: #374151 !important;
}

.member-card i {
  color: #3b82f6 !important;
}
</style>
