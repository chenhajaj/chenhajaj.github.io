---
layout: note
title: "Accuracy is only one part of a deployable classifier"
permalink: /insights/deployable-classifier/
description: "Two encrypted-traffic classifiers with the same accuracy differ widely in training time, memory, speed per flow and handling of unknown traffic. What we measured, and how to choose between them."
figure: deployable
image: assets/img/explainers/deployable-classifier.jpg
og_image: /assets/img/explainers/deployable-classifier.jpg
og_image_width: 1600
og_image_height: 900
line: traffic
papers: [zion2026ultrafast]
date: 2026-08-01
topic: "Encrypted traffic"
summary: "A traffic classifier that tops a benchmark can still be the wrong choice for a live network. We compared two equally accurate classifiers and found large differences in update time, memory, speed per flow and handling of unknown traffic. The right choice depends on the network."
links:
  - label: "Read the Computer Networks paper"
    url: "https://doi.org/10.1016/j.comnet.2026.112739"
  - label: "Encrypted traffic research"
    url: "/projects/encrypted_traffic/"
---

Papers usually rank traffic classifiers by accuracy alone. A live network asks more: how long an **update** takes when a new app appears, how much **memory** the model needs, how fast it labels each flow, and what it does with traffic it has never seen.

Our Computer Networks paper measured all of these for two classifiers on 184 applications (the public CESNET-TLS22 dataset). A Random Forest and our retrieval classifier were **equally accurate**: macro-F1, a score that counts every app equally, was 0.925 and 0.923. Everything else differed. The retrieval classifier trained about **ten times faster**, added a new app in **seconds instead of thousands of seconds**, held 1.2 million flows in **171 MB instead of 1,350 MB**, and flagged unknown traffic. The Random Forest labelled each flow **faster**.

So the choice depends on where the classifier runs. A backbone link that needs every microsecond favours the forest; a gateway where new apps appear weekly and memory is tight favours retrieval. Measuring these costs alongside accuracy shows what each choice gives up. How the retrieval classifier works is explained in [New classes in seconds, without retraining](/insights/classification-by-retrieval/).
