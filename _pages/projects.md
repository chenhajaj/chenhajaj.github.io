---
layout: page
title: Projects
permalink: /projects/
description: Research projects in AI, Cybersecurity, Healthcare, and Data Science.
nav: true
nav_order: 3
horizontal: false
---

<style>
/* ── Projects Grid ─────────────────────────────────────────── */
.projects {
  padding: 1rem 0 3rem;
}

/* 3-col on large, 2-col on medium, 1-col on small */
.projects .row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 1.5rem;
}

/* ── Card Base ──────────────────────────────────────────────── */
.projects .card {
  border: none;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
  background: #fff;
  height: 100%;
}

.projects .card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 32px rgba(0,0,0,0.14);
}

/* ── Image Area ─────────────────────────────────────────────── */
.project-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f0f4fa;
}

/* Neutralise figure/picture wrappers from figure.liquid */
.project-img-wrap figure,
.project-img-wrap picture {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.project-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.35s ease;
}

/* Diagram images: show fully, no cropping */
.project-img-wrap.img-contain img {
  object-fit: contain;
  padding: 1rem;
  background: #f8fafc;
}
.project-img-wrap.img-contain::after { display: none; }

.projects .card:hover .project-img-wrap img {
  transform: scale(1.06);
}

/* Gradient overlay on photo images */
.project-img-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.38) 100%);
  pointer-events: none;
}

.project-img-placeholder {
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 3.5rem;
}

/* ── Card Body ──────────────────────────────────────────────── */
.projects .card-body {
  padding: 1.25rem 1.4rem 1.4rem;
}

.projects .card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--global-theme-color, #2563eb);
  margin-bottom: 0.5rem;
  line-height: 1.35;
}

.projects .card-text {
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.projects a {
  text-decoration: none;
}

/* ── GitHub badge ───────────────────────────────────────────── */
.projects .github-icon {
  margin-top: 0.75rem;
}

/* ── Responsive tweaks ──────────────────────────────────────── */
@media (max-width: 768px) {
  .project-img-placeholder {
    height: 190px;
  }
}
</style>

<!-- pages/projects.md -->
<div class="projects">
{% assign sorted_projects = site.projects | sort: "importance" %}
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
  {% for project in sorted_projects %}
  <div class="col">
    <a href="{% if project.redirect %}{{ project.redirect }}{% else %}{{ project.url | relative_url }}{% endif %}">
      <div class="card hoverable">
        {% if project.img %}
          <div class="project-img-wrap">
            {%
              include figure.liquid
              loading="eager"
              path=project.img
              sizes="400px"
              alt=project.title
              class=""
            %}
          </div>
        {% else %}
          <div class="project-img-placeholder">
            <i class="fas fa-project-diagram"></i>
          </div>
        {% endif %}
        <div class="card-body">
          <h2 class="card-title">{{ project.title }}</h2>
          <p class="card-text">{{ project.description }}</p>
          {% if project.github %}
          <div class="github-icon">
            <a href="{{ project.github }}" title="Code Repository">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
          {% endif %}
        </div>
      </div>
    </a>
  </div>
  {% endfor %}
</div>
</div>
