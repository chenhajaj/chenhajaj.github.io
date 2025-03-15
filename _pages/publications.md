---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012]
nav: true
nav_order: 2
---
<!-- ## My research spans several areas including Security & Privacy, Machine Learning, Healthcare, and Multi-Agent Systems. -->
<div class="publications">
  <!-- Publications by year -->
  {% for y in page.years %}
    <div class="year-section">
      <h2 class="year">{{y}}</h2>
      <div class="publications-container">
        {% bibliography -f papers -q @*[year={{y}}]* %}
      </div>
    </div>
  {% endfor %}
</div>

<style>
/* Publications Container */
.publications {
  padding-left: 3rem;
}

/* Year Section */
.year-section {
  margin-bottom: 3rem;
  position: relative;
}

.year {
  font-size: 2rem;
  color: #1976d2;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #1976d2;
}

/* Publication Entries */
.publications-container {
  display: grid;
  gap: 1.5rem;
  counter-reset: paper-counter;
}

.entry {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  border: 1px solid #eee;
  position: relative;
  counter-increment: paper-counter;
}

.entry::before {
  content: "[" counter(paper-counter) "]";
  position: absolute;
  left: -3rem;
  top: 2rem;
  color: #1976d2;
  font-weight: 500;
}

.entry:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.entry .title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.4;
  margin: 0;
}

.entry .title a {
  color: inherit;
  text-decoration: none;
}

.entry .title a:hover {
  color: #1976d2;
}

.entry .author {
  color: #666;
  font-size: 0.95rem;
}

.entry .author em {
  color: #1976d2;
  font-style: normal;
  font-weight: 500;
}

.entry .periodical {
  color: #2c3e50;
  font-style: italic;
  font-size: 0.95rem;
  border-left: 3px solid #1976d2;
  padding-left: 1rem;
  margin: 0.5rem 0;
}

.entry-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.entry .links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.entry .links .btn {
  font-size: 0.8rem;
  padding: 0.2rem 0.8rem;
  border-radius: 4px;
  background-color: white;
  color: #1976d2;
  border: 1px solid #1976d2;
  transition: all 0.2s ease;
}

.entry .links .btn:hover {
  background-color: #1976d2;
  color: white;
}

.entry .links .btn.pdf {
  color: #dc3545;
  border-color: #dc3545;
}

.entry .links .btn.pdf:hover {
  background-color: #dc3545;
  color: white;
}

.entry .links .btn.code {
  color: #28a745;
  border-color: #28a745;
}

.entry .links .btn.code:hover {
  background-color: #28a745;
  color: white;
}

@media (max-width: 768px) {
  .publications {
    padding-left: 2rem;
  }

  .entry {
    padding: 1.5rem;
  }
  
  .entry::before {
    left: -2.5rem;
    top: 1.5rem;
  }
  
  .entry-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .entry .links {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>

