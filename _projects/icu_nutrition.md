---
layout: page
title: Medical Data Science
description: Machine learning applications for critical care and medical decision-making
img: assets/img/icu-nutrition.jpg
importance: 2
category: work
related_publications: false
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
    {% include figure.liquid loading="eager" path="assets/img/icu-nutrition.jpg" title="Medical Data Science" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" %}
  </div>
  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%); padding: 2.5rem; color: white;">
    <h1 style="margin: 0; font-size: 2.5rem; font-weight: 700; color: white; text-shadow: 0 2px 8px rgba(0,0,0,0.4);">Medical Data Science</h1>
    <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; color: rgba(255,255,255,0.95); text-shadow: 0 1px 4px rgba(0,0,0,0.3);">Machine learning applications for critical care and medical decision-making</p>
  </div>
</div>

<div class="project-content">

<p class="lead-text">Critical care medicine generates massive amounts of data, but making real-time predictions from it is challenging. We develop machine learning systems for ICU nutrition, respiratory diseases, and collaborative medical research—improving patient outcomes through data-driven insights.</p>

<h2>Research Areas</h2>

<h3>Critical Care Nutrition</h3>

<p>Predict ICU feeding complications before symptoms appear. Optimize protein intake per patient. Identify high-risk cases early using decade-long datasets from Rabin Medical Center.</p>

<h3>Respiratory Medicine</h3>

<p>AI phenotypical analysis for rare diseases like NTM infections. Accelerate diagnosis and predict treatment responses.</p>

<h3>Medical Data Collaboration</h3>

<p>Privacy-preserving crowdsourcing for medical datasets. Enable scalable research while protecting patient data.</p>

<h2>Technical Methods</h2>

<h3>Predictive Modeling</h3>

<p>Machine learning models trained on extensive clinical datasets. Validation using real patient data from hospital systems.</p>

<h3>Phenotypical Analysis</h3>

<p>Pattern recognition in complex patient profiles to identify disease characteristics and treatment responses.</p>

<h3>Privacy-Preserving Learning</h3>

<p>Methods that enable data sharing and collaboration while maintaining patient privacy and data security.</p>

<h2>Impact</h2>

<p>Our critical care nutrition models have shown reductions in feeding complications through early prediction. Respiratory medicine applications enable faster diagnosis of rare conditions. The collaborative data collection frameworks support medical research at scale while preserving privacy.</p>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/icu-monitoring.jpg" title="ICU patient monitoring" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/enteral-feeding.jpg" title="Enteral feeding setup" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/data-analysis.jpg" title="Medical data analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Real-time patient monitoring generating continuous data streams. Middle: Critical care nutrition delivery systems. Right: AI-powered analysis of complex medical patterns.
</div>

<div class="project-publications">
  <h3><i class="fas fa-file-alt"></i> Related Publications</h3>
  <div class="publications">
    {% bibliography -q @*[projects  ~= healthcare] %}
  </div>
</div>

</div>
