---
layout: project
title: A Multimodal Approach for Measuring Item Similarity
description: Multimodal AI that fuses computer vision and NLP to measure item similarity the way humans do — powering smarter recommendations in tourism, e-commerce, and real estate.
img: assets/img/tourism-new.png
importance: 3
category: work
outcome: "Vision + language + time for product similarity"
featured_label: "Multimodal research"
featured_url: "/publications/?line=similarity"
papers_query: "@*[projects~=similarity]*"
---

<p class="intro">When humans judge similarity, they consider appearance, function, atmosphere, and context simultaneously. Simple text matching or category tags miss most of this. We develop multimodal AI that fuses computer vision and NLP to measure item similarity the way people actually experience it.</p>

<h3>The Challenge</h3>

<p>Two hotels can look similar in photos but feel completely different in reviews. Two tourist destinations can share atmosphere despite different geographies. Traditional similarity metrics capture one dimension at a time — and fail at the nuanced comparisons that drive real user decisions.</p>

<h3>Our Approach</h3>

<ul>
  <li><strong>Visual Feature Extraction</strong> — Deep convolutional networks and vision transformers extract semantic features (architectural style, landscape type, activity level, color palette) directly from images without manual annotation.</li>
  <li><strong>Textual Semantic Analysis</strong> — Large language models encode review text and descriptions to capture cultural character, climate, offerings, and subjective user sentiment as dense semantic vectors.</li>
  <li><strong>Multimodal Fusion</strong> — Cross-attention mechanisms align visual and textual embeddings into a unified similarity space, validated against human expert judgments across thousands of item pairs.</li>
</ul>

<h3>Applications</h3>

<ul>
  <li><strong>Tourism &amp; Travel Recommendations</strong> — Suggesting alternative destinations when a user's top choice is unavailable, matched on experience rather than category. Validated against real booking patterns.</li>
  <li><strong>E-commerce &amp; Real Estate</strong> — Finding visually and contextually similar products or properties at different price points, improving discovery and reducing search abandonment.</li>
</ul>

<div class="figure-row">
  {% include figure.liquid loading="eager" path="assets/img/tourism.webp" alt="Tourism destinations" title="Tourism destinations" class="img-fluid rounded z-depth-1" %}
</div>
<div class="caption">
    Our AI analyzes visual and textual features of destinations to build similarity judgments that match human intuition across diverse travel contexts.
</div>
