---
layout: project
title: Speech and Audio AI
description: Machine learning that listens — splitting recordings by who is speaking, in Hebrew, English and French, and predicting the emotions that music evokes.
importance: 3
category: work
outcome: "Language-independent speaker change detection"
featured_label: "Speech and audio publications"
featured_url: "/publications/?line=speech"
papers_query: "@*[projects~=speech-processing|emotion-analysis]*"
---

<p class="intro">A meeting recording, a call-centre conversation or a podcast is only useful once you know who said what. We build models that find the moments a new speaker starts talking, group the segments by speaker, and work across languages.</p>

<h3>The Challenge</h3>

<p>Speaker change detection (SCD) splits a recording at every speaker turn. Speaker diarization and automatic transcription both depend on it: when the turns are wrong, everything built on top of them is wrong too. Systems that listen to the voice signal alone struggle as the number of speakers grows and when recordings mix languages.</p>

<h3>Our Approach</h3>

<ul>
  <li><strong>Reading the words, not only the voice</strong> — A word-embedding approach to speaker change detection that outperformed voice-based solutions for diarization, reaching 82.12% recall and an 89.02% F1 score on speaker turns (Interspeech 2021).</li>
  <li><strong>Hybrid speech and text models</strong> — A framework that learns from the speech signal, the transcript and metadata together, evaluated on a commercial Hebrew dataset and the ICSI Meeting Corpus, and robust across the two languages (IEEE/ACM Transactions on Audio, Speech, and Language Processing, 2021).</li>
  <li><strong>Multilingual diarization</strong> — A language-independent framework using transformer-based text models and speech embeddings, tested on English, French and Hebrew. Textual information improved on speech-only approaches without hurting diarization (Expert Systems with Applications, 2023).</li>
</ul>

<h3>Beyond Speech</h3>

<ul>
  <li><strong>Emotions in music</strong> — A two-layer AI model that predicts the main emotion a listener connects with a song they chose, built on songs selected by about 4,447 people, with and without demographic factors (Multimedia Systems, 2026).</li>
</ul>
