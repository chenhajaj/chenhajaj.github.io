---
layout: note
title: "New classes in seconds, without retraining"
permalink: /insights/classification-by-retrieval/
description: A research note from the Adaptive AI Lab — classification by retrieval adds new encrypted-traffic classes without retraining, and detects unknown traffic in the same step.
figure: cbr
date: 2026-09-01
topic: "Encrypted traffic"
summary: "Most traffic classifiers become expensive to maintain when applications and threats change. Classification by retrieval stores compact flow representations and learns a new class by adding a few labeled examples to the index. The same nearest-neighbor distance also helps detect traffic that does not belong to any known class."
links:
  - label: "Read the Computer Networks paper"
    url: "https://doi.org/10.1016/j.comnet.2026.112739"
  - label: "Encrypted traffic research"
    url: "/projects/encrypted_traffic/"
---

Most traffic classifiers become expensive to maintain when applications and threats change: every new application means collecting data, retraining, and redeploying the model. **Classification by retrieval** takes a different path — it stores compact flow representations and learns a new class by adding a few labeled examples to the index. No retraining run, no downtime.

The same nearest-neighbor distance that assigns a class also tells us when traffic belongs to **none** of the known classes, so out-of-distribution detection comes from the same retrieval step — a practical answer to zero-day and previously unseen traffic.
