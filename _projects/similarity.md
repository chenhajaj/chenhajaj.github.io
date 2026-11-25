---
layout: project
title: E-commerce and multimodal AI
description: Multimodal AI that combines images, text and purchase data to judge how alike products and places are, and studies of how people shop online across devices.
img: assets/img/tourism-new.png
importance: 3
category: work
outcome: "Multimodal product embeddings give a 7% relative gain in cold-start hit rate on H&M data (ICIS 2024)"
featured_label: "Multimodal research"
featured_url: "/publications/?line=similarity"
papers_query: "@*[projects~=similarity|consumer-behavior]*"
---

<p class="intro">When people judge whether two items are alike, they weigh appearance, function, atmosphere and context together. Text matching and category tags miss most of this. We combine computer vision, language models and purchase data to measure similarity the way people experience it, and use it for search, recommendation and pricing.</p>

<h3>Key results</h3>

<ul>
  <li><strong>Destination similarity without expert knowledge.</strong> Using only data from a flight-search website, we compared image, text and product-network similarity measures with human judgements. No single method won on every aspect, so a hybrid combines them (Expert Systems with Applications, 2024).</li>
  <li><strong>Cold-start recommendations.</strong> A new fashion item gets an embedding from its images, text and attributes, is matched to the most similar existing item, and inherits that item's co-purchase links. Added to collaborative filtering, this gave a 7% relative gain in hit rate for new items on H&amp;M data, with no retraining (ICIS 2024; SIGDSA 2023).</li>
  <li><strong>Pricing by similarity.</strong> An attention model over image, text and temporal representations that prices products from similar ones (ILAIS 2026, best paper award, second place).</li>
  <li><strong>Shopping across devices.</strong> Hidden Markov models of the conversion funnel show that mobile and desktop shoppers take different paths to purchase (Electronic Commerce Research and Applications, 2022; SCECR 2020).</li>
</ul>
