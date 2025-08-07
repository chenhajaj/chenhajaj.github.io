---
layout: page
permalink: /publications/
title: Publications
description:
nav: true
nav_order: 2
---

<div class="publications">
  <!-- Header Section -->
  <div class="publications-header">
    <h1 class="page-title">
      <i class="fas fa-graduation-cap"></i>
      Research Publications
    </h1>
    
    <div class="header-actions">
      <a href="/assets/pdf/pub.pdf" class="download-btn">
        <i class="fas fa-download"></i>
        Download Full List
      </a>
    </div>
  </div>

  <!-- Publications Container -->
  <div class="publications-container">
    {% bibliography -f papers --group_by year --group_order descending %}
  </div>
</div>

<style>
/* Publications Container */
.publications {
  padding: 0 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header Section */
.publications-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 20px;
  border: 1px solid #e2e8f0;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.page-title i {
  color: var(--global-theme-color);
  font-size: 2.2rem;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.header-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--global-theme-color);
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(75, 108, 183, 0.3);
}

.download-btn:hover {
  background: #3b5998;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(75, 108, 183, 0.4);
  color: white;
  text-decoration: none;
}

.stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--global-theme-color);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* Year Groups - Rectangle Cards */
.year-group {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 3rem;
  transition: all 0.3s ease;
}

.year-group:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 35px rgba(0,0,0,0.12);
}

.publications-container h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--global-theme-color);
  margin: 0 0 2rem 0;
  padding: 0 0 1rem 0;
  border-bottom: 3px solid var(--global-theme-color);
  position: relative;
}

.publications-container h2::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 60px;
  height: 3px;
  background: #3b5998;
}

/* Publication Entries */
.publications-container {
  margin-bottom: 3rem;
}

/* Style year groupings as rectangles */
.publications-container .year {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 3rem;
  transition: all 0.3s ease;
}

.publications-container .year:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 35px rgba(0,0,0,0.12);
}

/* Adjust spacing within year groups */
.publications-container .year h2 {
  margin-top: 0;
}

.publications-container .year .bibliography {
  margin-top: 0;
}

.publications-container .year .bibliography li:last-child {
  margin-bottom: 0;
}

/* Override default bibliography styling for year grouping */
.publications-container .bibliography h2 {
  color: var(--global-theme-color);
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 2rem 0;
  padding: 0 0 1rem 0;
  border-bottom: 3px solid var(--global-theme-color);
  position: relative;
}

.publications-container .bibliography h2::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 60px;
  height: 3px;
  background: #3b5998;
}

/* Year container styling */
.publications-container .bibliography h2 + .bibliography {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 3rem;
  transition: all 0.3s ease;
}

/* Publications grouped by year styling */
.publications-container > .bibliography h2 ~ ol {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 3rem;
  transition: all 0.3s ease;
}

/* Year grouping with JavaScript enhancement */
.year-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 3rem;
  transition: all 0.3s ease;
}

.year-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 35px rgba(0,0,0,0.12);
}

.year-card h2 {
  margin-top: 0;
  margin-bottom: 2rem;
}

.year-card .bibliography {
  margin: 0;
}

.entry {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0,0,0,0.08);
  position: relative;
  margin-bottom: 2rem;
  overflow: hidden;
}

.entry::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(to bottom, var(--global-theme-color), #3b5998);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.entry:hover {
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  transform: translateY(-4px);
}

.entry:hover::before {
  transform: scaleY(1);
}

.entry .title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  padding-right: 4rem;
}

.entry .title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.entry .title a:hover {
  color: var(--global-theme-color);
}

.entry .year {
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  font-size: 1.1rem;
  color: var(--global-theme-color);
  font-weight: 600;
  background: #f8fafc;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  border: 2px solid var(--global-theme-color);
}

.entry .author {
  color: #4a5568;
  font-size: 1.05rem;
  margin: 1rem 0;
  line-height: 1.7;
}

.entry .author em {
  color: var(--global-theme-color);
  font-style: normal;
  font-weight: 600;
  background: linear-gradient(120deg, rgba(75, 108, 183, 0.1) 0%, rgba(75, 108, 183, 0.05) 100%);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.entry .periodical {
  color: #2d3748;
  font-style: italic;
  font-size: 1.05rem;
  background: #f8fafc;
  border-left: 4px solid var(--global-theme-color);
  padding: 1rem 1.5rem;
  margin: 1rem 0;
  line-height: 1.6;
  border-radius: 0 8px 8px 0;
  font-weight: 500;
}

.entry .links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e2e8f0;
}

.entry .links .btn {
  font-size: 0.9rem;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  font-size: 0.8rem;
}

.entry .links .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}


@media (max-width: 768px) {
  .publications {
    padding: 0 0.5rem;
  }

  .publications-header {
    padding: 2rem 1rem;
    margin-bottom: 2rem;
  }

  .page-title {
    font-size: 1.8rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .page-title i {
    font-size: 1.6rem;
  }

  .page-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .header-actions {
    flex-direction: column;
    gap: 2rem;
  }

  .download-btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  .stats {
    gap: 1.5rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .publications-container h2 {
    font-size: 1.5rem;
    margin: 2rem 0 1.5rem 0;
  }

  .entry {
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }
  
  .entry .title {
    font-size: 1.1rem;
    padding-right: 3rem;
    margin-bottom: 0.8rem;
  }
  
  .entry .year {
    font-size: 0.9rem;
    top: 1.5rem;
    right: 1.5rem;
    padding: 0.2rem 0.6rem;
  }
  
  .entry .author {
    font-size: 0.95rem;
    margin: 0.8rem 0;
  }

  .entry .periodical {
    font-size: 0.95rem;
    margin: 0.8rem 0;
    padding: 0.8rem 1rem;
  }

  .entry .periodical::after {
    top: -6px;
    right: 0.5rem;
    font-size: 0.6rem;
    padding: 0.2rem 0.6rem;
  }
  
  .entry .links {
    gap: 0.8rem;
    margin-top: 1rem;
    padding-top: 1rem;
  }
  
  .entry .links .btn {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Group year headings with their corresponding publications
  const publicationsContainer = document.querySelector('.publications-container');
  if (publicationsContainer) {
    const bibliography = publicationsContainer.querySelector('.bibliography');
    if (bibliography) {
      const yearHeadings = bibliography.querySelectorAll('h2');
      
      yearHeadings.forEach(function(heading) {
        // Find the next bibliography list after this heading
        let nextElement = heading.nextElementSibling;
        while (nextElement && !nextElement.matches('ol.bibliography')) {
          nextElement = nextElement.nextElementSibling;
        }
        
        if (nextElement && nextElement.matches('ol.bibliography')) {
          // Create a year card container
          const yearCard = document.createElement('div');
          yearCard.className = 'year-card';
          
          // Insert the year card before the heading
          heading.parentNode.insertBefore(yearCard, heading);
          
          // Move the heading and bibliography list into the year card
          yearCard.appendChild(heading);
          yearCard.appendChild(nextElement);
        }
      });
    }
  }
});
</script>
