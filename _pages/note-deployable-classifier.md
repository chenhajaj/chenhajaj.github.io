---
layout: note
title: "Accuracy is only one part of a deployable classifier"
permalink: /insights/deployable-classifier/
description: A research note from the Adaptive AI Lab — production network classifiers must trade off update time, memory, latency, privacy, and behavior on unknown traffic, not only benchmark accuracy.
date: 2026-08-01
topic: "Production ML"
line: traffic
summary: "Real network systems also care about update time, memory, latency, privacy, and behavior on unknown traffic. Our work measures those trade-offs explicitly so a model can be chosen for the operating environment, not only for a benchmark leaderboard."
links:
  - label: "Encrypted traffic research"
    url: "/projects/encrypted_traffic/"
---

A model that tops a benchmark can still fail in a live network. Real deployments also care about **update time** when new applications appear, **memory** on middleboxes, **latency** per flow, **privacy** of the underlying traffic, and behavior on traffic the model has never seen.

Our work measures those trade-offs explicitly, so a model can be chosen for the operating environment — an ISP backbone, an enterprise gateway, or a hospital network — not only for a leaderboard position. The result is a practical selection framework: match the classifier to the constraints, and know what you are giving up when you do.
