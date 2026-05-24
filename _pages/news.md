---
layout: page
title: News
permalink: /news/
description: Latest updates, publications, and announcements from the Hajaj Lab.
nav: true
nav_order: 7
---

<style>
.news-page { display: flex; flex-direction: column; gap: 0; max-width: 860px; }
.news-page-item {
  display: flex; gap: 1.25rem; align-items: flex-start;
  padding: 1.1rem 0; border-bottom: 1px solid var(--global-divider-color);
}
.news-page-item:last-child { border-bottom: none; }
.news-page-badge {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-width: 56px; height: 56px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  text-align: center;
}
.news-page-badge .nm { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #fff; line-height: 1; }
.news-page-badge .ny { font-size: 0.85rem; font-weight: 600; color: rgba(255,255,255,0.85); line-height: 1; margin-top: 2px; }
.news-page-body { flex: 1; font-size: 1rem; line-height: 1.7; color: var(--global-text-color); padding-top: 0.2rem; }
</style>

<div class="news-page">
{% assign sorted_news = site.news | sort: "date" | reverse %}
{% for item in sorted_news %}{% unless item.path contains "_TEMPLATE" %}
<div class="news-page-item">
  <div class="news-page-badge">
    <span class="nm">{{ item.date | date: "%b" }}</span>
    <span class="ny">{{ item.date | date: "%Y" }}</span>
  </div>
  <div class="news-page-body">
    {{ item.content | markdownify | remove: '<p>' | remove: '</p>' | strip }}
  </div>
</div>
{% endunless %}{% endfor %}
</div>
