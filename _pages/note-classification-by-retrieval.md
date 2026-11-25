---
layout: note
title: "New classes in seconds, without retraining"
permalink: /insights/classification-by-retrieval/
description: "Classification by retrieval teaches an encrypted-traffic classifier a new app in seconds by adding a few labelled examples, with no retraining, and flags unknown traffic in the same step."
figure: cbr
image: assets/img/explainers/classification-by-retrieval.jpg
og_image: /assets/img/explainers/classification-by-retrieval.jpg
og_image_width: 1600
og_image_height: 900
line: traffic
papers: [zion2026ultrafast]
date: 2026-09-01
topic: "Encrypted traffic"
summary: "Every new app normally means retraining a traffic classifier, which is slow and costly. Classification by retrieval instead adds a few labelled examples to a searchable index, so the classifier learns a new app in seconds. The same lookup also flags traffic that matches no known app."
links:
  - label: "Read the Computer Networks paper"
    url: "https://doi.org/10.1016/j.comnet.2026.112739"
  - label: "Encrypted traffic research"
    url: "/projects/encrypted_traffic/"
---

Most internet traffic is encrypted, so networks use machine learning to tell which app a connection belongs to. That creates a maintenance problem. Every new app or threat means collecting labelled traffic, retraining the model and redeploying it, and new apps keep arriving.

**Classification by retrieval** works differently. Each flow is summarised by a short list of numbers taken from its first few packets, and these summaries are stored in an index built for fast nearest-neighbour search. A new flow takes the label of the closest stored flow. To teach the system a new app, we insert a handful of labelled examples into the running index. There is **no retraining and no downtime**, and the new class is ready in **seconds**, where retraining takes thousands of seconds.

The same distance tells us when a flow belongs to **none** of the known apps: if even its nearest neighbour is far away, it is flagged as unknown. Spotting new or unseen traffic, such as a zero-day threat, therefore comes from the same lookup rather than from a second model. How this classifier compares with a Random Forest on memory, speed and accuracy is the subject of [Accuracy is only one part of a deployable classifier](/insights/deployable-classifier/).
