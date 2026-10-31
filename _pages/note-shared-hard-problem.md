---
layout: note
title: "Security and clinical ML share a hard problem"
permalink: /insights/security-clinical-ml/
description: A research note from the Adaptive AI Lab — cybersecurity and clinical machine learning both face distribution shift, rare high-cost cases, and punished confident mistakes, so they share design requirements.
figure: shared_problem
image: assets/img/explainers/shared-hard-problem.jpg
og_image: /assets/img/explainers/shared-hard-problem.jpg
og_image_width: 1600
og_image_height: 900
line: other
date: 2026-07-01
topic: "Trustworthy AI"
summary: "Both domains change after deployment, contain rare high-cost cases, and punish confident mistakes. That makes robustness, out-of-distribution detection, interpretable evidence, and careful validation common design requirements across our cyber and health projects."
links:
  - label: "All research lines"
    url: "/projects/"
---

Cybersecurity and clinical machine learning look unrelated, but they fail in the same ways. Both domains **change after deployment** — new attack patterns, new patient populations, new devices. Both contain **rare, high-cost cases** that standard training underweights. And both **punish confident mistakes**: a missed intrusion and a missed diagnosis are not rounding errors.

That makes robustness, out-of-distribution detection, interpretable evidence, and careful validation shared design requirements across our cyber and health projects. Methods we build for one domain — retrieval-based adaptation, uncertainty-aware prediction, prospective validation — transfer directly to the other.
