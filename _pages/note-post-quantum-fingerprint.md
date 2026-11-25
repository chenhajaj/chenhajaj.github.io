---
layout: note
title: "Post-quantum encryption leaves a fingerprint"
permalink: /insights/post-quantum-fingerprint/
description: "Encrypted traffic still shows whether a connection uses post-quantum cryptography, and even which browser and operating system made it: 86%, 91% and 98% accuracy in our ICC 2025 paper."
figure: pqc
image: assets/img/explainers/post-quantum-fingerprint.jpg
og_image: /assets/img/explainers/post-quantum-fingerprint.jpg
og_image_width: 1600
og_image_height: 900
line: traffic
papers: [marnerides2025pqclass]
date: 2026-10-31
topic: "Encrypted traffic"
summary: "The internet is starting to switch to encryption that quantum computers cannot break. The new keys are much larger, and that changes the shape of the traffic. From encrypted traffic alone, our PQClass pipeline tells whether a connection uses post-quantum cryptography, and which browser and operating system made it."
links:
  - label: "Read the ICC 2025 paper"
    url: "https://doi.org/10.1109/icc52391.2025.11160818"
  - label: "Encrypted traffic research"
    url: "/projects/encrypted_traffic/"
---

A large enough quantum computer would break the key exchange that protects most connections today. Browsers and servers have therefore begun moving to **post-quantum cryptography** (PQC), using algorithms recently standardised by NIST, the US standards body. The switch is happening quietly, connection by connection, and network operators cannot see it because the traffic is encrypted.

The new keys are much bigger than the old ones, about 38 times bigger for the key a browser sends to start a connection. That leaves a mark on the shape of the connection even when every byte is encrypted. Our **PQClass** pipeline reads that shape. On real-world traffic it detects whether a post-quantum algorithm is in use with **86%** accuracy, and from the same post-quantum traffic it identifies the **browser** (91%) and the **operating system** (98%).

That matters on both sides. Network engineers can plan for the extra load and latency the new algorithms bring, and security teams can see how far the migration has actually gone on their network. This work continues in our Israel–Cyprus project on multi-layered classification of post-quantum encrypted traffic, with Angelos Marnerides at the University of Cyprus.
