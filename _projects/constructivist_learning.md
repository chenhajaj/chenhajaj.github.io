---
layout: page
title: Quantifying Constructivist Learning in Studio-Based Education
description: Data science methods for measuring learning in creative education settings
img: assets/img/arch.png
importance: 3
category: work
---

<style>
.post-header {
  display: none;
}

/* Project Content Styling */
.project-content {
  max-width: 900px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #2d3748;
}

.project-content .lead-text {
  font-size: 1.3rem;
  line-height: 1.7;
  color: #1a202c;
  margin-bottom: 3rem;
  font-weight: 400;
  border-left: 4px solid var(--global-theme-color);
  padding-left: 1.5rem;
  background: linear-gradient(to right, rgba(75, 108, 183, 0.05), transparent);
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1rem;
  border-radius: 0 8px 8px 0;
}

.project-content p {
  margin: 1rem 0;
  color: #4a5568;
}

.project-content h2 {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--global-theme-color);
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.8rem;
  border-bottom: 3px solid var(--global-theme-color);
}

.project-content h2::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 80px;
  height: 3px;
  background: linear-gradient(to right, #3b5998, var(--global-theme-color));
}

.project-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-top: 2rem;
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  border-left: 4px solid var(--global-theme-color);
  background: linear-gradient(to right, rgba(75, 108, 183, 0.08), transparent);
  padding: 0.8rem 0 0.8rem 1.2rem;
  border-radius: 0 8px 8px 0;
  transition: all 0.3s ease;
}

.project-content h3:hover {
  background: linear-gradient(to right, rgba(75, 108, 183, 0.12), transparent);
  transform: translateX(4px);
}

.project-content h3 + p {
  margin-top: 1rem;
  padding-left: 1.2rem;
  color: #4a5568;
}

.project-publications {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 2px solid #e2e8f0;
}

.project-publications h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--global-theme-color);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: none;
  background: none;
  padding: 0;
}

.project-publications h3:hover {
  transform: none;
}

.project-publications h3 i {
  font-size: 1.6rem;
}

@media (max-width: 768px) {
  .project-content {
    font-size: 1rem;
  }
  
  .project-content > p:first-of-type {
    font-size: 1.15rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .project-content h2 {
    font-size: 1.7rem;
    margin-top: 2.5rem;
  }
  
  .project-content h3 {
    font-size: 1.25rem;
    padding-left: 1rem;
  }
  
  .project-publications h3 {
    font-size: 1.5rem;
  }
}
</style>

<!-- Project Banner -->
<div class="project-banner" style="margin-bottom: 3rem; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-height: 400px; position: relative;">
  <div style="width: 100%; height: 400px; overflow: hidden; position: relative;">
    {% include figure.liquid loading="eager" path="assets/img/arch.png" title="Constructivist Learning" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" %}
  </div>
  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%); padding: 2.5rem; color: white;">
    <h1 style="margin: 0; font-size: 2.5rem; font-weight: 700; color: white; text-shadow: 0 2px 8px rgba(0,0,0,0.4);">Quantifying Constructivist Learning</h1>
    <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; color: rgba(255,255,255,0.95); text-shadow: 0 1px 4px rgba(0,0,0,0.3);">Data science methods for measuring learning in creative education settings</p>
  </div>
</div>

<div class="project-content">

<p class="lead-text">How do you measure learning in a design studio? Traditional tests don't work for creative education. We develop data science methods that quantify learning moments during design critiques—capturing breakthroughs, engagement, and cognitive development in real-time.</p>

<h2>Research Focus</h2>

<h3>Learning Measurement</h3>

<p>Quantify cognitive breakthroughs and engagement during critiques. Track learning patterns in real-time.</p>

<h3>Problem-Solving Analysis</h3>

<p>Study student-mentor collaboration. Identify scaffolding moments that guide breakthroughs.</p>

<h3>Assessment Methods</h3>

<p>Data-driven metrics for creative progress. Objective teaching effectiveness measures.</p>

<h2>Applications</h2>

<h3>For Educators</h3>

<p>Evidence-based teaching strategies with real-time feedback on student engagement. Personalized insights for individual learning styles.</p>

<h3>For Students</h3>

<p>Clear progress indicators showing skill development. Personalized learning paths tailored to individual strengths and challenges.</p>

<h3>For Research</h3>

<p>New understanding of how creativity develops. Methodological innovations applicable to other educational fields.</p>

<h2>Impact</h2>

<p>Our research provides practical tools for educators working in creative fields. The methods integrate with existing programs and are validated in actual studio environments. The work contributes to understanding how creative learning happens and how it can be measured and improved.</p>

<div class="project-publications">
  <h3><i class="fas fa-file-alt"></i> Related Publications</h3>
  <div class="publications">
    {% bibliography -q @*[author ~= Sopher] %}
  </div>
</div>

</div>
