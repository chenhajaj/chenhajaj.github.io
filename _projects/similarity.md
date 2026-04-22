---
layout: page
title: A Multimodal Approach for Measuring Item Similarity
description: Multimodal AI that fuses computer vision and NLP to measure item similarity the way humans do — powering smarter recommendations in tourism, e-commerce, and real estate.
img: assets/img/tourism-new.png
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
<div class="project-banner" style="position:relative;height:260px;overflow:hidden;border-radius:16px;box-shadow:0 6px 28px rgba(0,0,0,.14);margin-bottom:3rem;">
  <img src="{{ '/assets/img/tourism-new.png' | relative_url }}" alt="Multimodal Item Similarity" style="width:100%;height:100%;object-fit:cover;object-position:center;display:block;">
  <div class="project-banner-overlay" style="position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(to top,rgba(0,0,0,.78) 0%,rgba(0,0,0,.15) 55%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:2.5rem;color:white;">
    <h1 style="margin:0;font-size:2.2rem;font-weight:700;color:white;text-shadow:0 2px 8px rgba(0,0,0,.5);">Multimodal Item Similarity</h1>
    <p style="margin:.5rem 0 0;font-size:1.05rem;color:rgba(255,255,255,.9);">Fusing computer vision and NLP to measure item similarity the way humans do — for tourism, e-commerce, and real estate recommendations.</p>
  </div>
</div>

<div class="project-content">
<p class="lead-text">When humans judge similarity, they consider appearance, function, atmosphere, and context simultaneously. Simple text matching or category tags miss most of this. We develop multimodal AI that fuses computer vision and NLP to measure item similarity the way people actually experience it.</p>

<h2>The Challenge</h2>

<p>Two hotels can look similar in photos but feel completely different in reviews. Two tourist destinations can share atmosphere despite different geographies. Traditional similarity metrics capture one dimension at a time — and fail at the nuanced comparisons that drive real user decisions.</p>

<h2>Our Approach</h2>

<ul>
  <li><strong>Visual Feature Extraction</strong> — Deep convolutional networks and vision transformers extract semantic features (architectural style, landscape type, activity level, color palette) directly from images without manual annotation.</li>
  <li><strong>Textual Semantic Analysis</strong> — Large language models encode review text and descriptions to capture cultural character, climate, offerings, and subjective user sentiment as dense semantic vectors.</li>
  <li><strong>Multimodal Fusion</strong> — Cross-attention mechanisms align visual and textual embeddings into a unified similarity space, validated against human expert judgments across thousands of item pairs.</li>
</ul>

<h2>Applications</h2>

<ul>
  <li><strong>Tourism &amp; Travel Recommendations</strong> — Suggesting alternative destinations when a user's top choice is unavailable, matched on experience rather than category. Validated against real booking patterns.</li>
  <li><strong>E-commerce &amp; Real Estate</strong> — Finding visually and contextually similar products or properties at different price points, improving discovery and reducing search abandonment.</li>
</ul>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/tourism.webp" title="Tourism destinations" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our AI analyzes visual and textual features of destinations to build similarity judgments that match human intuition across diverse travel contexts.
</div>

<div class="project-publications">
  <h3><i class="fas fa-file-alt"></i> Related Publications</h3>
  <div class="publications">
    {% bibliography -q @*[projects ~= similarity] %}
  </div>
</div>

</div>
