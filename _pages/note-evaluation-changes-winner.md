---
layout: note
title: "When the test changes the winner"
permalink: /insights/evaluation-changes-winner/
description: An explainer from the Adaptive AI Lab — how a train/test split that leaks recording sessions can crown the wrong traffic classifier, and why richer features matter more than the architecture.
figure: winner
image: assets/img/explainers/evaluation-changes-winner.jpg
og_image: /assets/img/explainers/evaluation-changes-winner.jpg
og_image_width: 1600
og_image_height: 900
line: traffic
papers: [hajaj2027evaluation, lichy2023rf]
date: 2026-10-31
topic: "Encrypted traffic"
summary: "Papers on traffic classification usually credit their gains to a newer model. We trained six deep models 2,016 times and found that how the data is split into training and test sets decides which model wins. Split it properly and the leader falls to last place."
links:
  - label: "Our CCNC 2027 paper (on Publications)"
    url: "/publications/?q=Evaluation%20Protocol"
  - label: "When a Random Forest beats deep nets (Computers & Security)"
    url: "https://doi.org/10.1016/j.cose.2022.103000"
  - label: "Encrypted traffic research"
    url: "/projects/encrypted_traffic/"
---

A traffic dataset is recorded in sessions: someone streams for an hour, chats for twenty minutes, downloads a file. If the flows of one session land on both sides of the train/test split, the model is tested on traffic it has, in effect, already seen. It looks brilliant, but partly because it remembers the session.

We trained six modern deep time-series models **2,016 times** on two public datasets. With the usual split, one model, Informer, led everywhere. Once we kept each recording session on one side only, Informer fell from **first to last** on the VNAT dataset, losing 15 points of macro-F1, and the runner-up took first place. The reason: **55.7%** of VNAT's flows come from just three recordings. On a dataset whose recordings are spread thin, the same change left the ranking untouched.

Two further lessons. Giving every model a slightly richer description of each moment of a flow (volume and timing per direction, not just packet counts) helped in **323 of 324** comparisons, more than any choice of architecture. And this echoes our earlier finding that a plain **Random Forest** can beat deep networks on malicious traffic. Before crediting a new model, check how it was tested.
