---
layout: page
title: "Accuracy is only one part of a deployable classifier"
permalink: /insights/deployable-classifier/
description: A research note from the Adaptive AI Lab — production network classifiers must trade off update time, memory, latency, privacy, and behavior on unknown traffic, not only benchmark accuracy.
nav: false
---

<p style="color:var(--global-text-color-light);font-size:0.85rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">Research note · August 2026 · Production ML</p>

{% include figure.liquid loading="eager" path="assets/img/encrypted.png" alt="Network traffic analysis pipeline" class="img-fluid rounded z-depth-1" %}

A model that tops a benchmark can still fail in a live network. Real deployments also care about **update time** when new applications appear, **memory** on middleboxes, **latency** per flow, **privacy** of the underlying traffic, and behavior on traffic the model has never seen.

Our work measures those trade-offs explicitly, so a model can be chosen for the operating environment — an ISP backbone, an enterprise gateway, or a hospital network — not only for a leaderboard position. The result is a practical selection framework: match the classifier to the constraints, and know what you are giving up when you do.

[Explore the encrypted-traffic project →](/projects/encrypted_traffic/)

[← All research notes](/insights/)
