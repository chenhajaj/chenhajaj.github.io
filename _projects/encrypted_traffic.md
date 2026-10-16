---
layout: project
title: Encrypted Traffic Classification
description: AI-powered classification of encrypted network traffic — enabling security monitoring and QoS management without compromising encryption or user privacy.
img: assets/img/encrypted_new.png
importance: 1
category: work
outcome: "100+ application classes; retrieval-based adaptation"
featured_label: "New Computer Networks paper"
featured_url: "https://doi.org/10.1016/j.comnet.2026.112739"
papers_query: "@*[projects~=encrypted-traffic|traffic-classification]*"
---

<p class="intro">Over 90% of internet traffic is now encrypted. While encryption protects privacy, it makes traditional network monitoring impossible. We build AI systems that classify and analyze encrypted traffic without decryption — enabling security, quality of service, and compliance while preserving user privacy.</p>

<h3>Key Contributions</h3>

<ul>
  <li><strong>PQClass: Post-Quantum Traffic Classification</strong> — The first system to classify traffic encrypted with post-quantum algorithms (CRYSTALS-Kyber, NTRU), ensuring network visibility during the quantum cryptography transition.</li>
  <li><strong>GAN-Based Data Synthesis</strong> — Generative adversarial networks that produce realistic encrypted traffic datasets, addressing the scarcity of shareable labeled data in this domain.</li>
  <li><strong>Spectral Analysis for Protocol Identification</strong> — Frequency-domain analysis of packet inter-arrival times and sizes reveals application fingerprints inside TLS 1.3 and ESNI without any payload inspection.</li>
  <li><strong>Zero-Day Attack Detection</strong> — SimCSE-based contrastive learning builds traffic representations that generalize to unseen attack patterns without retraining on labeled attack data.</li>
</ul>

<h3>Impact</h3>

<p>Our methods are validated on real-world datasets from commercial ISPs and academic network captures. Applications include real-time threat detection in enterprise networks, QoE optimization for streaming services, and network capacity planning — all with full encryption preserved.</p>
