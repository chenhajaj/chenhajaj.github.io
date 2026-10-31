---
layout: note
title: "Saying \"I don't know\" has a price"
permalink: /insights/saying-i-dont-know/
description: An explainer from the Adaptive AI Lab — how the rejection rate of an out-of-distribution detector trades caught unknown traffic against wrongly rejected known traffic.
figure: rejection
line: traffic
papers: [meiri2025outofdistribution]
date: 2026-10-31
topic: "Encrypted traffic"
summary: "A traffic classifier meets apps it was never trained on. It can refuse to label what looks unfamiliar, but every refusal threshold is a trade. Our study shows that moving the rejection rate from 10% to 30% catches up to 50% more unknown traffic while false alarms grow by less than 10%."
links:
  - label: "Read the FedCSIS 2025 paper"
    url: "https://doi.org/10.15439/2025F5708"
  - label: "Encrypted traffic research"
    url: "/projects/encrypted_traffic/"
---

Classic deep packet inspection had a safe fallback: whatever it did not recognise, it called "other". An AI classifier has no such habit. Shown traffic from an app it never trained on, it confidently picks one of the classes it knows. With encrypted DNS and encrypted server names spreading, AI classifiers are replacing inspection engines, so this matters.

**Out-of-distribution (OOD) detection** lets the model say "I don't know". The catch is the threshold: how much traffic it should be willing to reject. Reject too little and unknown apps slip through as known ones; reject too much and good traffic is turned away. We compared state-of-the-art OOD techniques for traffic classification across rejection rates, and found that the best technique **changes with the threshold**.

The practical result: raising the rejection rate from **10% to 30%** improved the true detection rate of unknown traffic by **up to 50%**, while the false detection rate rose by **less than 10%**. Our advice is to report OOD results across rejection rates, not at a single convenient point, and to choose the operating point that fits the network.
