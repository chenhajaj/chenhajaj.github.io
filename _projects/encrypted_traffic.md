---
layout: project
title: Encrypted Traffic Classification
description: AI-powered classification of encrypted network traffic — enabling security monitoring and QoS management without compromising encryption or user privacy.
img: assets/img/encrypted_new.png
importance: 1
category: work
outcome: "Retrieval-based adaptation and post-quantum traffic classification"
featured_label: "New Computer Networks paper"
featured_url: "https://doi.org/10.1016/j.comnet.2026.112739"
papers_query: "@*[projects~=encrypted-traffic|traffic-classification]*"
---

<p class="intro">Most internet traffic is now encrypted. Encryption protects privacy, but it also blinds the tools operators use to keep networks secure and fast. We build machine learning that classifies and analyses encrypted traffic without decrypting it, and keeps working as applications, protocols and threats change.</p>

<h3>Key Contributions</h3>

<ul>
  <li><strong>New classes without retraining</strong>: classification by retrieval lets an encrypted-traffic model add new application classes in seconds and flag out-of-distribution traffic in the same retrieval step (Computer Networks, 2026).</li>
  <li><strong>Post-quantum traffic</strong>: PQClass, which the paper presents as the first pipeline for classifying encrypted internet traffic of recently NIST-approved post-quantum algorithms (IEEE ICC 2025).</li>
  <li><strong>Learning from little labelled data</strong>: data augmentation and early prediction for traffic classification (Expert Systems with Applications, 2024; IEEE ICC 2025).</li>
  <li><strong>Signal processing views of traffic</strong>: STFT-TC and DWT-TC turn packet time series into short-time Fourier and wavelet representations for encrypted traffic classification (IEEE CCNC 2024).</li>
  <li><strong>Contrastive traffic representations</strong>: SimCSE-style embeddings learned from raw packets for malicious and VPN traffic detection and zero-day attack detection (IEEE Access, 2022).</li>
</ul>

<h3>Impact</h3>

<p>Applications include threat detection, quality-of-experience monitoring (for example, predicting game QoE from network traffic, IEEE CCNC 2026) and network management, all without decrypting user traffic. Our tools are open source, including OSF-EIMTC, a framework for standardized encrypted traffic classification (Computer Communications, 2024).</p>
