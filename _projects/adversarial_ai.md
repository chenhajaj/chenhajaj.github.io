---
layout: page
title: Adversarial Artificial Intelligence
description: Developing robust AI systems that withstand adversarial attacks — across network security, mobile malware, healthcare AI, and social network manipulation.
img: assets/img/cyber_new.png
importance: 1
category: work
related_publications: true
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
  <img src="{{ '/assets/img/cyber_new.png' | relative_url }}" alt="Adversarial Artificial Intelligence" style="width:100%;height:100%;object-fit:cover;object-position:center;display:block;">
  <div class="project-banner-overlay" style="position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(to top,rgba(0,0,0,.78) 0%,rgba(0,0,0,.15) 55%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:2.5rem;color:white;">
    <h1 style="margin:0;font-size:2.2rem;font-weight:700;color:white;text-shadow:0 2px 8px rgba(0,0,0,.5);">Adversarial Artificial Intelligence</h1>
    <p style="margin:.5rem 0 0;font-size:1.05rem;color:rgba(255,255,255,.9);">Developing robust AI that withstands adversarial attacks across networks, mobile, healthcare, and social systems.</p>
  </div>
</div>

<div class="project-content">

<p class="lead-text">AI systems deployed in healthcare, security, and finance can be manipulated by adversarial inputs — carefully crafted perturbations that cause confident wrong predictions. We develop defenses, detection systems, and robust architectures that remain reliable even when attacked.</p>

<h2>Research Areas</h2>

<ul>
  <li><strong>Adversarial CAPTCHAs &amp; Usable Security</strong> — Designing CAPTCHAs that are easy for humans but hard for AI using precise noise targeting. Published at <strong>AAMAS 2026</strong>.</li>
  <li><strong>Encrypted Network Traffic</strong> — Detecting anomalies and classifying malicious traffic in fully encrypted streams without decryption, using contrastive learning for zero-day attacks.</li>
  <li><strong>Android Malware Detection</strong> — ML-based classifiers hardened against evasion attacks, maintaining accuracy even when adversaries know the detection method.</li>
  <li><strong>Healthcare AI Robustness</strong> — Adversarial training and certified defenses for medical diagnosis and patient prediction models under attack.</li>
  <li><strong>Social Network Manipulation</strong> — Detecting coordinated inauthentic behavior, bot accounts, and disinformation using graph-based anomaly detection.</li>
</ul>

<h2>Technical Approaches</h2>

<ul>
  <li><strong>Contrastive &amp; Self-Supervised Learning</strong> — SimCSE-based methods that build robust representations effective for zero-shot detection of novel attack patterns.</li>
  <li><strong>Adversarial Training &amp; Certified Defenses</strong> — Training on adversarial examples with provable robustness guarantees via randomized smoothing for safety-critical applications.</li>
  <li><strong>Privacy-Preserving Detection</strong> — Federated learning and differential privacy techniques that protect sensitive data while maintaining detection performance.</li>
</ul>

<div class="project-publications">
  <h3><i class="fas fa-file-alt"></i> Related Publications</h3>
  <div class="publications">
    {% bibliography -q @*[projects ~= security] %}
  </div>
</div>

</div>
