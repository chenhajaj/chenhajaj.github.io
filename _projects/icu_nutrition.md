---
layout: page
title: Medical Data Science
description: Machine learning for critical care — predicting ICU feeding complications, phenotyping rare respiratory diseases, and enabling privacy-preserving medical data collaboration.
img: assets/img/medical_new.png
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
<div class="project-banner" style="position:relative;height:260px;overflow:hidden;border-radius:16px;box-shadow:0 6px 28px rgba(0,0,0,.14);margin-bottom:3rem;">
  <img src="{{ '/assets/img/medical_new.png' | relative_url }}" alt="Medical Data Science" style="width:100%;height:100%;object-fit:cover;object-position:center;display:block;">
  <div class="project-banner-overlay" style="position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(to top,rgba(0,0,0,.78) 0%,rgba(0,0,0,.15) 55%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:2.5rem;color:white;">
    <h1 style="margin:0;font-size:2.2rem;font-weight:700;color:white;text-shadow:0 2px 8px rgba(0,0,0,.5);">Medical Data Science</h1>
    <p style="margin:.5rem 0 0;font-size:1.05rem;color:rgba(255,255,255,.9);">Machine learning for ICU nutrition, rare respiratory disease phenotyping, and privacy-preserving clinical data collaboration.</p>
  </div>
</div>

<div class="project-content">

<p class="lead-text">Critical care patients are among the most vulnerable — yet managing their nutrition, predicting complications, and coordinating care remains largely manual. We build machine learning systems that turn ICU data into actionable clinical decisions, improving patient outcomes through real-time prediction.</p>

<h2>Research Areas</h2>

<ul>
  <li><strong>ICU Nutrition &amp; Feeding Complications</strong> — Models trained on a decade of records from <strong>Rabin Medical Center</strong> that predict feeding intolerance and caloric deficit before symptoms appear, optimizing enteral nutrition per patient.</li>
  <li><strong>Rare Respiratory Disease Phenotyping</strong> — Unsupervised clustering and AI phenotypical analysis for NTM lung infections, accelerating diagnosis and predicting treatment response in pulmonology.</li>
  <li><strong>Privacy-Preserving Medical Data Collaboration</strong> — Federated learning and crowdsourcing frameworks enabling multi-hospital research without exposing patient records.</li>
</ul>

<h2>Technical Methods</h2>

<p>Our pipeline combines gradient-boosted trees and deep learning for tabular clinical data, time-series models for continuous monitoring streams, and survival analysis for time-to-event outcomes. All models are validated prospectively against held-out hospital cohorts before clinical reporting.</p>

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
    Left: Real-time patient monitoring generating continuous data streams. Middle: Critical care enteral nutrition delivery. Right: AI-driven analysis of complex clinical data patterns.
</div>

<div class="project-publications">
  <h3><i class="fas fa-file-alt"></i> Related Publications</h3>
  <div class="publications">
    {% bibliography -q @*[projects  ~= healthcare] %}
  </div>
</div>

</div>
