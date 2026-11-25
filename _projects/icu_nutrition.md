---
layout: project
title: Medical data science
description: Machine learning on clinical records, from ICU nutrition and mortality to drug-resistant infections in children, lung infection phenotypes and dementia risk.
img: assets/img/medical_new.png
importance: 2
category: work
outcome: "ICU mortality predicted from the first 48 hours of nutrition and clinical data (C-index 0.76, 2,942 patients; IEEE Access, 2025)"
featured_label: "Healthcare AI publications"
featured_url: "/publications/?line=medical"
papers_query: "@*[projects~=healthcare|covid-19]*"
---

<p class="intro">Critically ill patients are among the most vulnerable, yet decisions about their nutrition and early warning signs are still made largely by hand. We build machine learning on routine clinical records, much of it from the intensive care unit at Beilinson Hospital (Rabin Medical Center), to flag patients at risk early.</p>

<h3>Key results</h3>

<ul>
  <li><strong>ICU mortality.</strong> Random survival forests on the first 48 hours of nutrition and clinical data reached a C-index of 0.76 and a 10-day AUC of 0.874 in 2,942 ICU patients (IEEE Access, 2025).</li>
  <li><strong>Feeding intolerance.</strong> In 1,584 enterally fed ICU patients, models that include early feeding-intolerance markers predicted 90-day mortality (AUC 0.73) and early feeding failure (AUC 0.71); a gastric residual volume above 250 mL on day two mattered for both (Nutrients, 2023).</li>
  <li><strong>Drug-resistant infections in children.</strong> Five models built on 35,830 pediatric urinary tract infections rule out infections by ESBL-producing bacteria with a negative predictive value of about 0.98, using only data available at presentation (Pediatric Infectious Disease Journal, 2026).</li>
  <li><strong>Lung infection phenotypes.</strong> In 771 adults with bronchiectasis, older age, lower body mass index and more involved lobes were associated with nontuberculous mycobacterial infection (Respiratory Research, 2024).</li>
  <li><strong>Dementia risk from routine blood tests.</strong> Routine blood count and chemistry used to predict Alzheimer's dementia risk up to ten years ahead in a community cohort of 504,219 people (AAIC 2025 abstract; US patent application, 2025).</li>
  <li><strong>Earlier work.</strong> Crowdsourcing the labelling of sensitive medical records and clinical chart reviews (AMIA 2018), and predicting the spread of COVID-19 more than a month ahead (Heliyon, 2021).</li>
</ul>

<h3>How the evidence stands</h3>

<p>The studies so far are retrospective: models are built on historical records and checked by cross-validation. As the 2023 feeding-intolerance paper notes, prospective and external validation should come before clinical use.</p>
