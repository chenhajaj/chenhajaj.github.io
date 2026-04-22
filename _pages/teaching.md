---
layout: page
permalink: /teaching/
title: Teaching Experience
nav: true
nav_order: 5
---

<div class="teaching-page">

  <div class="teaching-entry">
    <div class="teaching-header">
      <div class="teaching-logo"><i class="fas fa-university"></i></div>
      <div>
        <h3 class="teaching-institution">Ariel University</h3>
        <span class="teaching-period">2018 – present</span>
      </div>
    </div>
    <ul class="teaching-courses">
      <li><strong>Machine Learning</strong> <span class="course-badge undergraduate">Undergraduate</span></li>
      <li><strong>Advanced Topics in Machine Learning</strong> <span class="course-badge undergraduate">Undergraduate</span></li>
      <li><strong>Introduction to Computing (Python)</strong> <span class="course-badge undergraduate">Undergraduate</span></li>
      <li><strong>Search Engines and Recommendation Systems</strong> <span class="course-badge undergraduate">Undergraduate</span></li>
    </ul>
  </div>

  <div class="teaching-entry">
    <div class="teaching-header">
      <div class="teaching-logo"><i class="fas fa-university"></i></div>
      <div>
        <h3 class="teaching-institution">Vanderbilt University</h3>
        <span class="teaching-period">2016 – 2018</span>
      </div>
    </div>
    <ul class="teaching-courses">
      <li><strong>Advanced Artificial Intelligence</strong> <span class="course-badge graduate">Graduate</span></li>
      <li><strong>Computational Economics</strong> <span class="course-badge graduate">Graduate</span></li>
    </ul>
  </div>

  <div class="teaching-entry">
    <div class="teaching-header">
      <div class="teaching-logo"><i class="fas fa-university"></i></div>
      <div>
        <h3 class="teaching-institution">Bar-Ilan University</h3>
        <span class="teaching-period">2011 – 2016</span>
      </div>
    </div>
    <ul class="teaching-courses">
      <li><strong>Introduction to Computer Science</strong> <span class="course-badge undergraduate">Undergraduate</span> <span class="course-years">2012–2016</span></li>
      <li><strong>Object-Oriented Programming</strong> <span class="course-badge undergraduate">Undergraduate</span> <span class="course-years">2013–2016</span></li>
      <li><strong>Operating Systems</strong> <span class="course-badge undergraduate">Undergraduate</span> <span class="course-years">2013–2016</span></li>
      <li><strong>VERILOG</strong> <span class="course-badge undergraduate">Undergraduate</span> <span class="course-years">2014–2016</span></li>
      <li><strong>Simulation and Simulation Languages</strong> <span class="course-badge undergraduate">Undergraduate</span> <span class="course-years">2011–2014</span></li>
      <li><strong>Microprocessor Laboratory (ADuC841)</strong> <span class="course-badge undergraduate">Undergraduate</span> <span class="course-years">2011–2013</span></li>
    </ul>
  </div>

</div>

<style>
.teaching-page { display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem 0; }
.teaching-entry {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  padding: 1.75rem 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.teaching-entry:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.1); transform: translateY(-2px); }
.teaching-header { display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1.25rem; }
.teaching-logo {
  width: 48px; height: 48px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 1.2rem;
}
.teaching-institution { font-size: 1.2rem; font-weight: 700; color: #2d3748; margin: 0 0 0.2rem 0; }
.teaching-period { font-size: 0.85rem; color: #718096; font-weight: 500; }
.teaching-courses { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; }
.teaching-courses li { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; color: #4a5568; font-size: 0.95rem; }
.teaching-courses li strong { color: #2d3748; }
.course-badge {
  display: inline-block; padding: 0.2rem 0.65rem; border-radius: 20px;
  font-size: 0.75rem; font-weight: 600; flex-shrink: 0;
}
.course-badge.undergraduate { background: rgba(75,108,183,0.1); color: var(--global-theme-color); }
.course-badge.graduate { background: rgba(16,185,129,0.1); color: #065f46; }
.course-years { font-size: 0.82rem; color: #a0aec0; }
@media (max-width: 600px) {
  .teaching-entry { padding: 1.25rem; }
  .teaching-courses li { flex-direction: column; align-items: flex-start; gap: 0.3rem; }
}
</style>
