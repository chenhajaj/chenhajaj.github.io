---
layout: page
title: ICU Nutrition Analysis
description: Analyzing nutrition delivery methods and patient outcomes in intensive care
img: assets/img/icu-nutrition.jpg
importance: 2
category: work
related_publications: false
---

# Medical Data Science: ICU Nutrition Study

This research project investigates the critical relationship between nutrition delivery methods and patient outcomes in intensive care units (ICUs). Malnutrition in ICU patients is associated with significantly higher mortality risks, making proper nutritional support essential for critical care.

## Project Overview

Our team has processed and analyzed comprehensive medical data from ICU patients at Rabin Medical Center spanning 2008-2018. The study focuses on comparing enteral nutrition (via gastrointestinal tract) versus parenteral nutrition in terms of key patient outcomes.

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
    Left: ICU patient monitoring systems. Middle: Enteral nutrition delivery setup. Right: Analysis of patient outcome data.
</div>

## Data Collection

Our comprehensive dataset includes:
- Clinical metrics
- Patient diagnoses
- Medication records
- Pathological events
- Nutritional intake data
- Patient outcomes

Data was collected through:
- Electronic medical records
- Bedside monitoring devices
- Clinical documentation

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/data-visualization.jpg" title="Data visualization" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/patient-outcomes.jpg" title="Patient outcomes chart" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Visualization of patient data (left) and outcomes analysis (right) from our 10-year study period.
</div>

## Research Objectives

Our study aims to evaluate:
1. Impact of nutrition delivery methods on mortality rates
2. Correlation with nosocomial infections
3. Effects on mechanical ventilation duration
4. Influence on ICU length of stay

This research helps establishing evidence-based guidelines for optimal nutrition delivery in critical care settings.

## Methodology

We employ advanced statistical analysis and machine learning techniques to process our decade-long dataset, identifying patterns and correlations between nutritional interventions and patient outcomes. Our approach combines clinical expertise with data science to derive actionable insights for ICU care protocols.

## Key Publications

<div class="publications">
  <div class="publication-list">
    {% bibliography -q @*[author ~= Raphaeli && !(author ~= Glik)] %}
  </div>
</div>





