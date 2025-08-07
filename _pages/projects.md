---
layout: page
title: Projects
permalink: /projects/
description: A growing collection of our cool projects.
nav: true
nav_order: 3
display_categories: [work]
horizontal: false
---

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
  <div class="row row-cols-1 row-cols-md-3">
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
  <div class="row row-cols-1 row-cols-md-3">
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

/* Enhanced Project Cards */
.projects .card {
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.projects .card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  border-color: var(--global-theme-color);
}

.projects .card-title {
  color: var(--global-theme-color);
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.projects .card-text {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
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
}
</style>
