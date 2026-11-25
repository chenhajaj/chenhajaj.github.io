---
layout: note
title: "Security and clinical ML share a hard problem"
permalink: /insights/security-clinical-ml/
description: "Network security and clinical machine learning fail in the same three ways: the world changes after deployment, rare cases cost the most, and confident mistakes are punished. Why the lab builds the same safeguards for both."
figure: shared_problem
image: assets/img/explainers/shared-hard-problem.jpg
og_image: /assets/img/explainers/shared-hard-problem.jpg
og_image_width: 1600
og_image_height: 900
line: other
date: 2026-07-01
topic: "Trustworthy AI"
summary: "Network security and clinical machine learning look unrelated, but they fail in the same ways: the world changes after deployment, rare cases cost the most, and confident mistakes are punished. So our cyber and health projects are built to the same requirements."
links:
  - label: "All research lines"
    url: "/projects/"
---

Cybersecurity and clinical machine learning (ML) look unrelated, but they fail in the same ways. Both **change after deployment**: new attacks and protocols on one side, new patient populations and devices on the other. Both contain **rare, high-cost cases**, such as a zero-day intrusion or a rare complication, that standard training underweights. And both **punish confident mistakes**: a missed intrusion or a missed diagnosis is not a rounding error.

So the same requirements apply to both. Models must stay **robust** as the data shifts, recognise inputs unlike anything they were trained on (**out-of-distribution detection**), show **evidence** a person can check, and be **validated** carefully before anyone relies on them.

Methods we build for one domain carry over to the other: retrieval-based adaptation, uncertainty-aware prediction and careful validation on data the model has not seen. Two traffic explainers show these ideas at work: [New classes in seconds, without retraining](/insights/classification-by-retrieval/) and [Saying "I don't know" has a price](/insights/saying-i-dont-know/).
