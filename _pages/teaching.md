---
layout: page
permalink: /teaching/
title: Teaching
description: Courses taught at Ariel University and other institutions, covering data science, machine learning, and computer science.
nav: true
nav_order: 5
---

<style>
.teaching-page { display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem 0; }

.teaching-entry {
  background: var(--global-card-bg-color);
  border: 1px solid var(--global-divider-color);
  border-left: 4px solid var(--global-theme-color);
  border-radius: 10px;
  padding: 1.5rem 1.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s, transform 0.2s;
}
.teaching-entry:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.1); transform: translateY(-2px); }

.teaching-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.teaching-institution-wrap { display: flex; align-items: center; gap: 1rem; }

.teaching-logo {
  width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0;
  background: var(--global-theme-color);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 1.1rem;
}

.teaching-institution { font-size: 1.15rem; font-weight: 700; color: var(--global-text-color); margin: 0; }

.teaching-period {
  display: inline-block;
  font-size: 0.78rem; font-weight: 600;
  color: var(--global-theme-color);
  background: rgba(75,108,183,0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  white-space: nowrap;
}

.teaching-courses { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0; }

.teaching-courses li {
  display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;
  padding: 0.5rem 0;
  border-top: 1px solid var(--global-divider-color);
  color: var(--global-text-color);
  font-size: 0.92rem;
}
.teaching-courses li:first-child { border-top: none; }

.teaching-courses li strong { color: var(--global-text-color); font-weight: 600; }

.course-desc {
  display: block;
  width: 100%;
  font-size: 0.82rem;
  color: var(--global-text-color-light);
  line-height: 1.55;
  margin-top: 0.25rem;
  padding-left: 0.1rem;
}

.course-badge {
  display: inline-block; padding: 0.15rem 0.55rem; border-radius: 20px;
  font-size: 0.7rem; font-weight: 600; flex-shrink: 0;
}
.course-badge.undergraduate { background: rgba(75,108,183,0.1); color: var(--global-theme-color); }
.course-badge.graduate { background: rgba(16,185,129,0.12); color: #065f46; }

.course-years {
  font-size: 0.78rem;
  color: var(--global-text-color-light);
  margin-left: auto;
}

@media (max-width: 600px) {
  .teaching-entry { padding: 1.25rem; }
  .teaching-courses li { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
  .course-years { margin-left: 0; }
}
</style>

<div class="teaching-page">

  <div class="teaching-entry">
    <div class="teaching-header">
      <div class="teaching-institution-wrap">
        <div class="teaching-logo"><i class="fas fa-university"></i></div>
        <h3 class="teaching-institution">Ariel University</h3>
      </div>
      <span class="teaching-period">2018 – present</span>
    </div>
    <ul class="teaching-courses">
      <li><strong>Machine Learning</strong> <span class="course-badge undergraduate">Undergraduate</span><span class="course-desc">Supervised &amp; unsupervised learning, decision trees, SVMs, neural networks, and model evaluation.</span></li>
      <li><strong>Advanced Topics in Machine Learning</strong> <span class="course-badge undergraduate">Undergraduate</span><span class="course-desc">Deep learning, CNNs, RNNs, transformers, and applied project work on real datasets.</span></li>
      <li><strong>Introduction to Computing (Python)</strong> <span class="course-badge undergraduate">Undergraduate</span><span class="course-desc">Programming fundamentals, algorithms, and data structures using Python for first-year students.</span></li>
      <li><strong>Search Engines and Recommendation Systems</strong> <span class="course-badge undergraduate">Undergraduate</span><span class="course-desc">Information retrieval, indexing, ranking algorithms, collaborative filtering, and content-based recommendations.</span></li>
    </ul>
  </div>

  <div class="teaching-entry">
    <div class="teaching-header">
      <div class="teaching-institution-wrap">
        <div class="teaching-logo"><i class="fas fa-university"></i></div>
        <h3 class="teaching-institution">Vanderbilt University</h3>
      </div>
      <span class="teaching-period">2016 – 2018</span>
    </div>
    <ul class="teaching-courses">
      <li><strong>Advanced Artificial Intelligence</strong> <span class="course-badge graduate">Graduate</span><span class="course-desc">Search, planning, probabilistic reasoning, machine learning, and AI ethics for graduate students.</span></li>
      <li><strong>Computational Economics</strong> <span class="course-badge graduate">Graduate</span><span class="course-desc">Game theory, mechanism design, auctions, and algorithmic approaches to economic modeling.</span></li>
    </ul>
  </div>

  <div class="teaching-entry">
    <div class="teaching-header">
      <div class="teaching-institution-wrap">
        <div class="teaching-logo"><i class="fas fa-university"></i></div>
        <h3 class="teaching-institution">Bar-Ilan University</h3>
      </div>
      <span class="teaching-period">2011 – 2016</span>
    </div>
    <ul class="teaching-courses">
      <li><strong>Introduction to Computer Science</strong> <span class="course-badge undergraduate">Undergraduate</span> <span class="course-years">2012–2016</span><span class="course-desc">Core CS concepts, problem-solving, and introduction to programming for engineering students.</span></li>
      <li><strong>Object-Oriented Programming</strong> <span class="course-badge undergraduate">Undergraduate</span> <span class="course-years">2013–2016</span><span class="course-desc">OOP principles — classes, inheritance, polymorphism, and design patterns in Java.</span></li>
      <li><strong>Operating Systems</strong> <span class="course-badge undergraduate">Undergraduate</span> <span class="course-years">2013–2016</span><span class="course-desc">Processes, threads, scheduling, memory management, file systems, and concurrency.</span></li>
      <li><strong>VERILOG</strong> <span class="course-badge undergraduate">Undergraduate</span> <span class="course-years">2014–2016</span><span class="course-desc">Hardware description language for digital design, simulation, and FPGA synthesis.</span></li>
      <li><strong>Simulation and Simulation Languages</strong> <span class="course-badge undergraduate">Undergraduate</span> <span class="course-years">2011–2014</span><span class="course-desc">Discrete-event simulation theory, modeling methodologies, and simulation tools.</span></li>
      <li><strong>Microprocessor Laboratory (ADuC841)</strong> <span class="course-badge undergraduate">Undergraduate</span> <span class="course-years">2011–2013</span><span class="course-desc">Hands-on microcontroller programming, interfacing, and embedded systems experiments.</span></li>
    </ul>
  </div>

</div>
