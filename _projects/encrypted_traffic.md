---
layout: page
title: Encrypted Traffic Classification
description:
img: assets/img/encrypted.jpg
importance: 1
category: work
giscus_comments: false
---

<!-- # Encrypted Traffic Classification Research -->

The management of internet traffic is essential to ensure the Quality of Services (QoS) and Quality of Experience (QoE) of users. Internet traffic classification is a key component in network management, providing network visibility, traffic-trend analyses, and intrusion detection. However, with the ongoing transition towards encryption protocols, the task of traffic classification has become increasingly challenging.

## Project Overview

Our research focuses on developing new methodologies for accurately classifying encrypted internet traffic in the modern protocol landscape. We investigate approaches that can maintain effectiveness even as privacy-preserving protocols become more prevalent.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/traffic-analysis.jpg" title="Traffic analysis visualization" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/encryption-protocols.jpg" title="Modern encryption protocols" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/classification-results.jpg" title="Classification results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Network traffic analysis visualization. Middle: Overview of modern encryption protocols. Right: Classification accuracy results.
</div>

## Research Challenges

The transition towards encryption protocols presents several key challenges:

1. Increased adoption of privacy-preserving protocols like ESNI and DoH
2. Limited visibility due to TLS 1.3 and similar protocols
3. Connection aggregation in QUIC, HTTP/2, and HTTP/3
4. Need for new classification methodologies

## Methodology

Our research approach includes:

- Analysis of traffic patterns in encrypted streams
- Development of machine learning models for classification
- Evaluation of classification accuracy across different protocols
- Assessment of scalability and real-time performance

## Impact

This research aims to:

1. Improve network management capabilities
2. Maintain effective traffic classification despite encryption
3. Balance privacy requirements with network visibility needs
4. Advance the state of the art in traffic analysis

The findings will help network operators and security professionals adapt to the evolving landscape of encrypted internet traffic.
