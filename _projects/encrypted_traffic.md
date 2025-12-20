---
layout: page
title: Encrypted Traffic Classification
description: AI-powered methods for classifying and analyzing encrypted network traffic
img: assets/img/encrypted.jpg
importance: 1
category: work
giscus_comments: false
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
    {% include figure.liquid loading="eager" path="assets/img/encrypted.jpg" title="Encrypted Traffic Classification" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" %}
  </div>
  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%); padding: 2.5rem; color: white;">
    <h1 style="margin: 0; font-size: 2.5rem; font-weight: 700; color: white; text-shadow: 0 2px 8px rgba(0,0,0,0.4);">Encrypted Traffic Classification</h1>
    <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; color: rgba(255,255,255,0.95); text-shadow: 0 1px 4px rgba(0,0,0,0.3);">AI-powered methods for classifying and analyzing encrypted network traffic</p>
  </div>
</div>

<div class="project-content">

<p class="lead-text">Over 90% of internet traffic is now encrypted. While encryption protects privacy, it also makes traditional network monitoring impossible. We develop AI systems that classify encrypted traffic without breaking encryption—enabling network security and management while preserving user privacy.</p>

<h2>Key Challenges</h2>

<p>Modern encryption protocols (TLS 1.3, ESNI, DoH, HTTP/3) hide traffic characteristics completely. Network operators need to identify traffic types for security monitoring, quality of service, and capacity planning, but cannot compromise encryption or user privacy.</p>

<h2>Our Approach</h2>

<h3>Generative AI for Data Synthesis</h3>

<p>Using GANs to create realistic encrypted traffic datasets. Addresses data scarcity in encrypted traffic research.</p>

<h3>Post-Quantum Traffic Classification</h3>

<p>First system (PQClass) to classify traffic encrypted with post-quantum algorithms. Prepares networks for quantum-resistant cryptography.</p>

<h3>Spectral Analysis</h3>

<p>Frequency-domain analysis identifies application patterns in encrypted communications without decryption.</p>

<h3>Advanced Data Augmentation</h3>

<p>Novel techniques that improve model performance across diverse network conditions.</p>

<h3>Zero-Day Detection</h3>

<p>SimCSE-based contrastive learning detects previously unseen attack patterns in encrypted traffic.</p>

<h2>Impact</h2>

<p>Our methods achieve high accuracy while fully respecting encryption and privacy. Applications include real-time threat detection, network optimization, and the world's first post-quantum traffic classification system.</p>

<div class="project-publications">
  <h3><i class="fas fa-file-alt"></i> Related Publications</h3>
  <div class="publications">
    {% bibliography -q @*[projects ~= traffic-classification] %}
  </div>
</div>

</div>
