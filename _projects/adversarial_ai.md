---
layout: project
title: Adversarial artificial intelligence
description: Machine learning for security that keeps working when attackers adapt, from malware and intrusion detection to usable CAPTCHAs and coordination under attack.
img: assets/img/cyber_new.png
importance: 1
category: work
outcome: "Conserved features significantly improve the robustness of PDF malware detectors to evasion attacks that work on real malware (USENIX Security 2019)"
featured_label: "Featured research collection"
featured_url: "/publications/?line=adversarial"
papers_query: "@*[projects~=security|cyber-threat-intelligence]*"
---

<p class="intro">Machine learning now guards networks, phones and online services, and attackers adapt to it. We study how detectors fail when an adversary changes its inputs, and build detectors that stay reliable: features an attacker cannot change without breaking the attack, models that recognise threats they have not seen, and defences people can still use.</p>

<h3>Key results</h3>

<ul>
  <li><strong>Robust malware detection.</strong> Adding conserved features, which an attacker cannot change without breaking the malware, significantly improves the robustness of PDF malware detectors to evasion attacks that can be carried out on real malware, not only in feature space (USENIX Security 2019).</li>
  <li><strong>Android malware under attack.</strong> An evasion attack cut Drebin's detection rate by 12%, but the functionality of the manipulated apps fell by 72%, so attack evaluations should check that the malware still works (CSCML 2020). Changing the share of benign apps in training cut MaMaDroid's detection rate by more than 40% (Expert Systems with Applications, 2023).</li>
  <li><strong>Usable adversarial CAPTCHAs.</strong> Precise gradient perturbations and smarter target classes give CAPTCHAs less visible noise while making them harder for automated solvers (AAMAS 2026).</li>
  <li><strong>Unknown attacks in networks and clouds.</strong> Graph-based detectors that find known and unknown intrusions without labelled attacks (D-MAGIC, IEEE ICC 2025 and Computer Networks, 2026), anomalous cloud users (IEEE CCNC 2026) and low-and-slow HTTP/2 denial of service (Computers &amp; Security, 2026).</li>
  <li><strong>Little labelled data.</strong> GAN-like self-supervision for SMS spam detection (Computers &amp; Security, 2024) and few-shot detection of API injection attacks by retrieval (Computers &amp; Security, 2025).</li>
  <li><strong>Malicious domains.</strong> A feature selection that halves the feature set and resists evasion (Electronics, 2022).</li>
  <li><strong>Coordination under attack.</strong> In experiments with people on networks, adversarial players were quite successful at blocking consensus, and letting neighbours communicate improved coordination and resilience (AAMAS 2019; Network Science, 2021). When an attacker can target workers, the best assignment of identical tasks can be computed efficiently, while for varied tasks the problem is NP-hard (IJCAI 2018).</li>
</ul>
