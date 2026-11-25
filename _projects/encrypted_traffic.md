---
layout: project
title: Encrypted traffic classification
description: Machine learning that classifies encrypted network traffic without decrypting it, for security monitoring and network management.
img: assets/img/encrypted_new.png
importance: 1
category: work
outcome: "New application classes added in seconds with no retraining, at Random Forest accuracy (Computer Networks, 2026)"
featured_label: "New Computer Networks paper"
featured_url: "https://doi.org/10.1016/j.comnet.2026.112739"
papers_query: "@*[projects~=encrypted-traffic|traffic-classification]*"
---

<p class="intro">Most internet traffic is now encrypted. Encryption protects privacy, but it also blinds the tools operators use to keep networks secure and fast. We build machine learning that classifies and analyses encrypted traffic without decrypting it, and keeps working as applications, protocols and threats change.</p>

<h3>Key results</h3>

<ul>
  <li><strong>New classes without retraining.</strong> Classification by retrieval adds a new application class by inserting a few labelled flows into a running index: seconds instead of the thousands of seconds a retrained model needs. It matches a Random Forest's accuracy (macro F1 0.923 against 0.925 on CESNET-TLS22) and flags out-of-distribution traffic in the same retrieval step (Computer Networks, 2026).</li>
  <li><strong>Post-quantum traffic.</strong> PQClass, which the paper presents as the first pipeline for classifying encrypted internet traffic of recently NIST-approved post-quantum algorithms (IEEE ICC 2025).</li>
  <li><strong>Traffic as graphs.</strong> GraphMux fuses several graph views of a flow, built only from packet timing, direction and length (Computer Networks, 2026).</li>
  <li><strong>Learning from little labelled data.</strong> Data augmentation and early prediction for traffic classification (Expert Systems with Applications, 2024; IEEE ICC 2025).</li>
  <li><strong>Signal-processing views of traffic.</strong> Short-time Fourier and wavelet representations of packet time series (IEEE CCNC 2024).</li>
  <li><strong>Evaluation that holds up.</strong> Deep models do not necessarily beat a Random Forest on malicious traffic (Computers &amp; Security, 2023); the evaluation protocol can change which model wins (IEEE CCNC 2027); and how much unknown traffic a model rejects trades off against its measured success (FedCSIS 2025).</li>
  <li><strong>Earlier foundations.</strong> Packet classification when only part of the input is available (IEEE INFOCOM 2021), and contrastive (SimCSE-style) embeddings from raw packets for malicious, VPN and zero-day traffic (IEEE Access, 2022).</li>
</ul>

<h3>Where it applies</h3>

<p>Threat detection, quality-of-experience monitoring (for example, predicting game QoE from network traffic, IEEE CCNC 2026) and network management, all without decrypting user traffic. Our tools are open source, including OSF-EIMTC, a framework for standardized encrypted traffic classification (Computer Communications, 2024).</p>
