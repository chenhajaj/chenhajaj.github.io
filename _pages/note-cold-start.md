---
layout: note
title: "Recommending a product nobody has clicked yet"
permalink: /insights/cold-start/
description: An explainer from the Adaptive AI Lab — recommending brand-new products by finding their closest existing look-alike from image, text and attributes, with no retraining.
figure: coldstart
line: similarity
papers: [goldstein2024warm, yehiel2026ilais]
date: 2026-10-31
topic: "E-commerce and multimodal AI"
summary: "Recommendation engines learn from clicks and purchases, so a brand-new product has nothing to learn from. We describe a new item by its photo, its text and its attributes, find its closest existing look-alike, and borrow that item's history. On fashion data this improved hit rate by 7% for new items, with no retraining."
links:
  - label: "Read the ICIS 2024 paper"
    url: "https://aisel.aisnet.org/icis2024/digital_comm/digital_comm/9/"
  - label: "E-commerce and multimodal AI research"
    url: "/projects/similarity/"
---

Most recommendation systems run on behaviour: people who bought this also bought that. A product that went on sale this morning has no behaviour yet, so it is never recommended, so it gets no clicks. This is the **cold-start problem**, and in fashion, where collections turn over every season, it never goes away.

With Anat Goldstein, we treat a new product the way a shop assistant would: by what it looks like and what it is. Its **photo, description and attributes** become one combined representation, and we find the existing product it most resembles. That look-alike already has a history, so we recommend what is usually bought with it. Combining all three sources beat any one of them alone.

On data from the H&M store, adding this step to a standard collaborative-filtering recommender improved hit rate by **7%** for new items, and it needs **no retraining** when products arrive. The same multimodal similarity also prices products: our ILAIS 2026 paper with Eylon Yehiel, which won second place for best paper, uses image, text and price history to suggest a price for an item.
