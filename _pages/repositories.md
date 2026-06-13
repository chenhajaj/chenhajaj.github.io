---
layout: page
title: Code & Software
permalink: /software/
description:
nav: true
nav_order: 6
---

<style>
.repo-section-title {
  font-size: 1.2rem; font-weight: 700;
  color: var(--global-text-color);
  border-bottom: 2px solid var(--global-theme-color);
  padding-bottom: 0.4rem;
  margin: 2rem 0 1rem;
}
.repo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.repo-card {
  background: var(--global-card-bg-color);
  border: 1px solid var(--global-divider-color);
  border-left: 3px solid var(--global-theme-color);
  border-radius: 8px;
  padding: 1rem 1.1rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: transform 0.15s, box-shadow 0.15s;
}
.repo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0,0,0,0.1);
  text-decoration: none;
}
.repo-card-name {
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--global-theme-color);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.repo-card-name i { font-size: 0.85rem; opacity: 0.7; }
.repo-card-desc {
  font-size: 0.82rem;
  color: var(--global-text-color);
  line-height: 1.5;
  flex: 1;
}
.repo-card-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: var(--global-text-color-light);
  margin-top: 0.25rem;
}
.repo-card-meta span { display: flex; align-items: center; gap: 0.25rem; }
</style>

Open-source code is hosted under the [ArielCyber GitHub organization](https://github.com/ArielCyber) and [chenhajaj's GitHub](https://github.com/chenhajaj).

## Encrypted Traffic & Network Security

<div class="repo-grid">
{% for repo in site.data.repositories.repos.encrypted_traffic %}
<a class="repo-card" href="{{ repo.url }}" target="_blank" rel="noopener">
  <div class="repo-card-name"><i class="fab fa-github"></i>{{ repo.name }}</div>
  <div class="repo-card-desc">{{ repo.description }}</div>
  <div class="repo-card-meta">
    {% if repo.stars > 0 %}<span>⭐ {{ repo.stars }}</span>{% endif %}
    {% if repo.language %}<span>{{ repo.language }}</span>{% endif %}
  </div>
</a>
{% endfor %}
</div>

## Frameworks, Pipelines & Utilities

<div class="repo-grid">
{% for repo in site.data.repositories.repos.frameworks_pipelines_utilities %}
<a class="repo-card" href="{{ repo.url }}" target="_blank" rel="noopener">
  <div class="repo-card-name"><i class="fab fa-github"></i>{{ repo.name }}</div>
  <div class="repo-card-desc">{{ repo.description }}</div>
  <div class="repo-card-meta">
    {% if repo.stars > 0 %}<span>⭐ {{ repo.stars }}</span>{% endif %}
    {% if repo.language %}<span>{{ repo.language }}</span>{% endif %}
  </div>
</a>
{% endfor %}
</div>

## API Security & Malware Detection

<div class="repo-grid">
{% for repo in site.data.repositories.repos.api_malware %}
<a class="repo-card" href="{{ repo.url }}" target="_blank" rel="noopener">
  <div class="repo-card-name"><i class="fab fa-github"></i>{{ repo.name }}</div>
  <div class="repo-card-desc">{{ repo.description }}</div>
  <div class="repo-card-meta">
    {% if repo.stars > 0 %}<span>⭐ {{ repo.stars }}</span>{% endif %}
    {% if repo.language %}<span>{{ repo.language }}</span>{% endif %}
  </div>
</a>
{% endfor %}
</div>

## eCommerce

<div class="repo-grid">
{% for repo in site.data.repositories.repos.ecommerce %}
<a class="repo-card" href="{{ repo.url }}" target="_blank" rel="noopener">
  <div class="repo-card-name"><i class="fab fa-github"></i>{{ repo.name }}</div>
  <div class="repo-card-desc">{{ repo.description }}</div>
  <div class="repo-card-meta">
    {% if repo.stars > 0 %}<span>⭐ {{ repo.stars }}</span>{% endif %}
    {% if repo.language %}<span>{{ repo.language }}</span>{% endif %}
  </div>
</a>
{% endfor %}
</div>
