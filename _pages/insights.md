---
layout: page
title: Research Notes
permalink: /insights/
description: Short, practical explanations of research from the Hajaj Lab.
nav: true
nav_order: 6
---
<style>.note-grid{display:grid;gap:1.25rem}.research-note{padding:1.5rem;border:1px solid var(--global-divider-color);border-left:5px solid #22a99a;border-radius:12px;background:var(--global-card-bg-color)}.research-note h2{margin-top:0}.note-tag{font-size:.75rem;font-weight:800;color:#0f766e;letter-spacing:.08em}.research-note:nth-child(2){border-left-color:#4f70be}.research-note:nth-child(3){border-left-color:#ef776f}</style>
<div class="note-grid">
<section class="research-note"><span class="note-tag">ENCRYPTED TRAFFIC</span><h2>New classes in seconds, without retraining</h2><p>Most traffic classifiers become expensive to maintain when applications and threats change. Classification by retrieval stores compact flow representations and learns a new class by adding a few labeled examples to the index. The same nearest-neighbor distance also helps detect traffic that does not belong to any known class.</p><p><a href="https://doi.org/10.1016/j.comnet.2026.112739">Read the Computer Networks paper →</a></p></section>
<section class="research-note"><span class="note-tag">PRODUCTION ML</span><h2>Accuracy is only one part of a deployable classifier</h2><p>Real network systems also care about update time, memory, latency, privacy, and behavior on unknown traffic. Our work measures those trade-offs explicitly so a model can be chosen for the operating environment, not only for a benchmark leaderboard.</p><p><a href="/projects/encrypted_traffic/">Explore encrypted-traffic research →</a></p></section>
<section class="research-note"><span class="note-tag">TRUSTWORTHY AI</span><h2>Security and clinical ML share a hard problem</h2><p>Both domains change after deployment, contain rare high-cost cases, and punish confident mistakes. That makes robustness, out-of-distribution detection, interpretable evidence, and careful validation common design requirements across our cyber and health projects.</p><p><a href="/projects/">See the research portfolio →</a></p></section>
</div>
