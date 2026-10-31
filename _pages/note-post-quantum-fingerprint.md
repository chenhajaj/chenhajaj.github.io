---
layout: note
title: "Post-quantum encryption leaves a fingerprint"
permalink: /insights/post-quantum-fingerprint/
description: An explainer from the Adaptive AI Lab — encrypted traffic still shows whether a connection uses post-quantum cryptography, and even which browser and operating system made it.
figure: pqc
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

A large enough quantum computer would break the key exchange that protects most connections today, so browsers and servers have begun moving to **post-quantum cryptography** (PQC), using algorithms recently standardised by NIST. The switch is happening quietly, connection by connection, and network operators cannot see it: the traffic is encrypted.

The new keys are much bigger than the old ones, and that leaves a mark on the shape of a connection even when every byte is encrypted. Our **PQClass** pipeline reads that shape. On real-world traffic it detects whether a post-quantum algorithm is in use with **86%** accuracy, and from the same post-quantum traffic it identifies the **browser** (91%) and the **operating system** (98%).

That matters on both sides. Network engineers can plan for the extra load and latency the new algorithms bring, and security teams can see how far the migration has actually gone on their network. This work continues in our Israel–Cyprus project on multi-layered classification of post-quantum encrypted traffic, with Angelos Marnerides.
