---
layout: note
title: "CAPTCHAs people can read and bots can't"
permalink: /insights/cleaner-captchas/
description: An explainer from the Adaptive AI Lab — adversarial CAPTCHAs that fool image-recognition models with less visible noise, by choosing smarter targets and placing noise precisely.
figure: captcha
date: 2026-10-31
topic: "Adversarial AI"
summary: "Image classifiers now solve CAPTCHAs, so designers add adversarial noise that fools the bots. The trouble is that the noise also bothers people and can be filtered out. Our method chooses a smarter wrong answer for the bot and spends noise only where it counts: 20–40% less noise, fewer steps, and harder to filter."
links:
  - label: "Read the AAMAS 2026 paper"
    url: "https://doi.org/10.65109/afaw3962"
  - label: "Adversarial AI research"
    url: "/projects/adversarial_ai/"
---

Image CAPTCHAs ("select every picture with a bus") were meant to be easy for people and hard for machines. Modern image classifiers changed that. One defence is the **adversarial CAPTCHA**: add carefully computed noise that a person barely notices but that makes the classifier see something else. Earlier methods paid for this with visible noise that annoys people, and some of it could be removed by a simple image filter.

Our work with Meir Litman improves both halves. First, **a smarter target**: instead of pushing the bot toward a random wrong class, we push it toward a class it already confuses with the right one, chosen from how models actually mix up classes or from the image's own ranked predictions. Reaching that target takes fewer steps, about **41% fewer** for EfficientNet-B7 in one setting.

Second, **precise noise**: a version of the classic gradient attack that weighs each pixel by how much it matters, plus a step that spreads the noise so a median filter cannot simply wipe it out. Across six image models, from MobileNet to a Vision Transformer, the result needs **20–40% less noise**.
