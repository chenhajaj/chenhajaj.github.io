---
layout: page
title: "Security and clinical ML share a hard problem"
permalink: /insights/security-clinical-ml/
description: A research note from the Adaptive AI Lab — cybersecurity and clinical machine learning both face distribution shift, rare high-cost cases, and punished confident mistakes, so they share design requirements.
nav: false
---

<p style="color:var(--global-text-color-light);font-size:0.85rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">Research note · July 2026 · Trustworthy AI</p>

{% include figure.liquid loading="eager" path="assets/img/medical_new.png" alt="Medical data science" class="img-fluid rounded z-depth-1" %}

Cybersecurity and clinical machine learning look unrelated, but they fail in the same ways. Both domains **change after deployment** — new attack patterns, new patient populations, new devices. Both contain **rare, high-cost cases** that standard training underweights. And both **punish confident mistakes**: a missed intrusion and a missed diagnosis are not rounding errors.

That makes robustness, out-of-distribution detection, interpretable evidence, and careful validation shared design requirements across our cyber and health projects. Methods we build for one domain — retrieval-based adaptation, uncertainty-aware prediction, prospective validation — transfer directly to the other.

[See the research portfolio →](/projects/)

[← All research notes](/insights/)
