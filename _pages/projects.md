---
layout: page
title: Projects
permalink: /projects/
description: Research projects in AI, cybersecurity, healthcare, and data science.
nav: true
nav_order: 3
display_categories: [work]
horizontal: false
---

<style>
/* Enhanced Projects Page Styling */
.projects {
  padding: 2rem 0;
}

.projects .card {
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin-bottom: 2rem;
}

.projects .card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(37,99,235,0.15);
  border-color: #3b82f6;
}

.projects .card-img-top {
  height: 300px;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1 / 1;
}

.projects .card-body {
  padding: 2rem;
}

.projects .card-title {
  color: #1e40af;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  min-height: 3.5rem;
}

.projects .card-text {
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.6;
}

.projects .category {
  color: #2563eb;
  font-size: 2rem;
  font-weight: 700;
  margin: 3rem 0 2rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #3b82f6;
}

.projects a {
  text-decoration: none;
}

.project-img-container {
  position: relative;
  overflow: hidden;
  height: 300px;
  aspect-ratio: 1 / 1;
}

.project-img-placeholder {
  height: 300px;
  aspect-ratio: 1 / 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
}

.projects .row {
  margin-left: -1rem;
  margin-right: -1rem;
}

.projects .col {
  padding: 1rem;
}
</style>

<!-- pages/projects.md -->
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>

<style>
/* Project Image Standardization - Fixed Size */
.project-img-container {
  width: 100%;
  height: 200px !important;
  overflow: hidden;
  background: #f8f9fa;
  display: block;
  position: relative;
}

.project-img-container img,
.project-img {
  width: 100% !important;
  height: 200px !important;
  object-fit: cover !important;
  transition: transform 0.3s ease;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.project-img:hover {
  transform: scale(1.05);
}

.project-img-placeholder {
  width: 100%;
  height: 200px !important;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--global-theme-color);
  font-size: 3rem;
  border-radius: 0.375rem 0.375rem 0 0;
}

/* Horizontal Project Images - Fixed Size */
.project-img-container-horizontal {
  width: 100%;
  height: 250px !important;
  overflow: hidden;
  background: #f8f9fa;
  display: block;
  position: relative;
}

.project-img-container-horizontal img,
.project-img-horizontal {
  width: 100% !important;
  height: 250px !important;
  object-fit: cover !important;
  transition: transform 0.3s ease;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.project-img-horizontal:hover {
  transform: scale(1.05);
}

.project-img-placeholder-horizontal {
  width: 100%;
  height: 250px !important;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--global-theme-color);
  font-size: 3rem;
  border-radius: 0.375rem 0 0 0.375rem;
}

/* Override Bootstrap Card Image Styles */
.projects .card .card-img-top {
  width: 100% !important;
  height: 200px !important;
  object-fit: cover !important;
  border-radius: 0.375rem 0.375rem 0 0 !important;
}

.projects .card .card-img {
  width: 100% !important;
  height: 250px !important;
  object-fit: cover !important;
  border-radius: 0.375rem 0 0 0.375rem !important;
}

/* Enhanced Project Cards - One per row layout */
.projects .card {
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-bottom: 2rem;
}

.projects .card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  border-color: var(--global-theme-color);
}

.projects .card-title {
  color: var(--global-theme-color);
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.projects .card-text {
  color: #4a5568;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

/* One-column layout spacing */
.projects .row.row-cols-1 .col {
  margin-bottom: 0;
}

.projects .row.row-cols-1 .card {
  margin-bottom: 3rem;
}

/* Publications in Projects */
.project-publications {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid #e2e8f0;
  margin-top: 2rem;
}

.project-publications h3 {
  color: var(--global-theme-color);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.project-publications h3 i {
  font-size: 1.25rem;
}

.project-publications .bibliography {
  margin: 0;
}

.project-publications .bibliography li {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid var(--global-theme-color);
  transition: all 0.3s ease;
}

.project-publications .bibliography li:hover {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transform: translateX(4px);
}

.project-publications .bibliography li:last-child {
  margin-bottom: 0;
}

.project-publications .bibliography .title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.project-publications .bibliography .author {
  color: #4a5568;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.project-publications .bibliography .periodical {
  color: var(--global-theme-color);
  font-size: 0.85rem;
  font-weight: 500;
}

/* Project Page Content Styling */
.projects-page h1 {
  color: var(--global-theme-color);
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.projects-page h2 {
  color: #1a202c;
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.projects-page h3 {
  color: #2d3748;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.projects-page p {
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 1.25rem;
  font-size: 1.05rem;
}

.projects-page strong {
  color: #1a202c;
  font-weight: 600;
  display: block;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.projects-page ul {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.projects-page li {
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 0.75rem;
}

/* Mobile Responsive - Maintain Fixed Sizes */
@media (max-width: 768px) {
  .project-img-container,
  .project-img-placeholder {
    height: 180px !important;
  }
  
  .project-img-container img,
  .project-img,
  .projects .card .card-img-top {
    height: 180px !important;
  }
  
  .project-img-container-horizontal,
  .project-img-placeholder-horizontal {
    height: 200px !important;
  }
  
  .project-img-container-horizontal img,
  .project-img-horizontal,
  .projects .card .card-img {
    height: 200px !important;
  }
  
  .project-publications {
    padding: 1.5rem;
  }
  
  .project-publications .bibliography li {
    padding: 1.25rem;
  }
  
  .projects-page h1 {
    font-size: 1.75rem;
  }
  
  .projects-page h2 {
    font-size: 1.3rem;
  }
  
  .projects-page p {
    font-size: 1rem;
  }
}
</style>
