---
layout: page
title: "New classes in seconds, without retraining"
permalink: /insights/classification-by-retrieval/
description: A research note from the Adaptive AI Lab — classification by retrieval adds new encrypted-traffic classes without retraining, and detects unknown traffic in the same step.
nav: false
---

<p style="color:var(--global-text-color-light);font-size:0.85rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">Research note · September 2026 · Encrypted Traffic</p>

{% include figure.liquid loading="eager" path="assets/img/encrypted_new.png" alt="Encrypted traffic classification" class="img-fluid rounded z-depth-1" %}

Most traffic classifiers become expensive to maintain when applications and threats change: every new application means collecting data, retraining, and redeploying the model. **Classification by retrieval** takes a different path — it stores compact flow representations and learns a new class by adding a few labeled examples to the index. No retraining run, no downtime.

The same nearest-neighbor distance that assigns a class also tells us when traffic belongs to **none** of the known classes, so out-of-distribution detection comes from the same retrieval step — a practical answer to zero-day and previously unseen traffic.

[Read the Computer Networks paper →](https://doi.org/10.1016/j.comnet.2026.112739) · [Explore the encrypted-traffic project →](/projects/encrypted_traffic/)

[← All research notes](/insights/)
