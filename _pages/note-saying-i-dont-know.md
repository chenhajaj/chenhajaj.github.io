---
layout: note
title: "Saying \"I don't know\" has a price"
permalink: /insights/saying-i-dont-know/
description: "A traffic classifier that may reject unfamiliar traffic catches more unknown apps but turns away some good traffic. How the rejection rate sets that trade, from our FedCSIS 2025 study."
figure: rejection
image: assets/img/explainers/saying-i-dont-know.jpg
og_image: /assets/img/explainers/saying-i-dont-know.jpg
og_image_width: 1600
og_image_height: 900
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

Classic deep packet inspection, which identifies traffic by reading its contents, had a safe fallback: whatever it did not recognise, it called "other". An AI classifier has no such habit. Shown traffic from an app it never trained on, it confidently picks one of the classes it knows. Encrypted DNS and encrypted server names are making inspection engines obsolete, and AI classifiers are taking their place, so this gap matters.

**Out-of-distribution (OOD) detection** lets the model say "I don't know". The catch is the threshold: how much traffic it should be willing to reject. Reject too little and unknown apps slip through as known ones; reject too much and good traffic is turned away. We compared state-of-the-art OOD techniques for traffic classification across rejection rates, and found that the best technique **changes with the threshold**.

The practical result: raising the rejection rate from **10% to 30%** improved the true detection rate of unknown traffic by **up to 50%**, while the false detection rate rose by **less than 10%**. Our advice is to report OOD results across rejection rates, not at a single convenient point, and to choose the operating point that fits the network.
