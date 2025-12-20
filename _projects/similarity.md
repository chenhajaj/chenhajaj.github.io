---
layout: page
title: A Multimodal Approach for Measuring Item Similarity
description: Measuring similarity between items using computer vision and natural language processing
img: assets/img/tourism.webp
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
    {% include figure.liquid loading="eager" path="assets/img/tourism.webp" title="Multimodal Item Similarity" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" %}
  </div>
  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%); padding: 2.5rem; color: white;">
    <h1 style="margin: 0; font-size: 2.5rem; font-weight: 700; color: white; text-shadow: 0 2px 8px rgba(0,0,0,0.4);">Multimodal Item Similarity</h1>
    <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; color: rgba(255,255,255,0.95); text-shadow: 0 1px 4px rgba(0,0,0,0.3);">Measuring similarity using computer vision and natural language processing</p>
  </div>
</div>

<div class="project-content">

<p class="lead-text">Measuring how similar two items are is more complex than it seems. People consider visual appearance, functionality, context, and subjective preferences—all simultaneously. We develop AI systems that combine computer vision and natural language processing to understand similarity the way humans do.</p>

<h2>The Challenge</h2>

<p>Traditional methods use simple categories or require extensive manual effort. They miss nuanced similarities that matter to users. Our solution: teach AI to analyze both visual and textual features, learning patterns that match human intuition.</p>

<h2>Our Approach</h2>

<h3>Visual Analysis</h3>

<p>Computer vision extracts features like architectural styles, landscapes, activities, and atmosphere from images.</p>

<h3>Text Processing</h3>

<p>NLP analyzes descriptions to understand cultural characteristics, offerings, climate, and context.</p>

<h3>Multimodal Integration</h3>

<p>Combining both creates similarity judgments that match human intuition.</p>

<h2>Applications</h2>

<h3>Tourism & Travel</h3>

<p>Destination recommendations that match travel preferences. Finding alternatives when favorites are unavailable.</p>

<h3>E-commerce & Real Estate</h3>

<p>Product and property recommendations based on visual and textual similarity.</p>

<h3>General Purpose</h3>

<p>Applicable to any domain requiring multi-faceted similarity measurement.</p>

<h2>Why It Works</h2>

<p>No single similarity measure captures human judgment. Our hybrid approach combines multiple dimensions, adapts to different domains, and learns from feedback. Validated against expert judgments and deployed at scale.</p>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/tourism.webp" title="Tourism destinations" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our AI system analyzes visual and textual features of destinations to understand similarity patterns that match human intuition.
</div>

<div class="project-publications">
  <h3><i class="fas fa-file-alt"></i> Related Publications</h3>
  <div class="publications">
    {% bibliography -q @*[projects ~= similarity] %}
  </div>
</div>

</div>
