---
layout: project
title: Medical Data Science
description: Machine learning for critical care — predicting ICU feeding complications, phenotyping rare respiratory diseases, and enabling privacy-preserving medical data collaboration.
importance: 2
category: work
outcome: "Clinical prediction and privacy-preserving collaboration"
featured_label: "Healthcare AI publications"
featured_url: "/publications/?line=medical"
papers_query: "@*[projects~=healthcare|covid-19]*"
---

<p class="intro">Critical care patients are among the most vulnerable — yet managing their nutrition, predicting complications, and coordinating care remains largely manual. We build machine learning systems that turn ICU data into actionable clinical decisions, improving patient outcomes through real-time prediction.</p>

<h3>Research Areas</h3>

<ul>
  <li><strong>ICU Nutrition &amp; Feeding Complications</strong> — Models trained on a decade of records from <strong>Rabin Medical Center</strong> that predict feeding intolerance and caloric deficit before symptoms appear, optimizing enteral nutrition per patient.</li>
  <li><strong>Rare Respiratory Disease Phenotyping</strong> — Unsupervised clustering and AI phenotypical analysis for NTM lung infections, accelerating diagnosis and predicting treatment response in pulmonology.</li>
  <li><strong>Privacy-Preserving Medical Data Collaboration</strong> — Federated learning and crowdsourcing frameworks enabling multi-hospital research without exposing patient records.</li>
</ul>

<h3>Technical Methods</h3>

<p>Our pipeline combines gradient-boosted trees and deep learning for tabular clinical data, time-series models for continuous monitoring streams, and survival analysis for time-to-event outcomes. All models are validated prospectively against held-out hospital cohorts before clinical reporting.</p>

<div class="figure-row">
  {% include figure.liquid loading="eager" path="assets/img/icu-monitoring.jpg" alt="ICU patient monitoring" title="ICU patient monitoring" class="img-fluid rounded z-depth-1" %}
  {% include figure.liquid loading="eager" path="assets/img/enteral-feeding.jpg" alt="Enteral feeding setup" title="Enteral feeding setup" class="img-fluid rounded z-depth-1" %}
  {% include figure.liquid loading="eager" path="assets/img/data-analysis.jpg" alt="Medical data analysis" title="Medical data analysis" class="img-fluid rounded z-depth-1" %}
</div>
<div class="caption">
    Left: Real-time patient monitoring generating continuous data streams. Middle: Critical care enteral nutrition delivery. Right: AI-driven analysis of complex clinical data patterns.
</div>
