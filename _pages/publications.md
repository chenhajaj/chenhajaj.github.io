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
    <div class="header-actions">
      <a href="/assets/pdf/pub.pdf" class="download-btn">
        <i class="fas fa-download"></i>
        Download Full List
      </a>
    </div>
  </div>

  <!-- Filter and Navigation Bar -->
  <div class="filter-section">
    <div class="search-container">
      <i class="fas fa-search search-icon"></i>
      <input type="text" id="search-input" class="search-input" placeholder="Search publications by title, author, venue...">
      <button id="clear-search" class="clear-btn" title="Clear search">
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <div class="filter-controls">
      <div class="filter-group">
        <label><i class="fas fa-tags"></i> Filter by Topic:</label>
        <select id="topic-filter" class="filter-select">
          <option value="all">All Topics</option>
          <option value="machine-learning">Machine Learning</option>
          <option value="security">Security</option>
          <option value="traffic-classification">Traffic Classification</option>
          <option value="healthcare">Healthcare</option>
          <option value="e-commerce">E-Commerce</option>
          <option value="generative-ai">Generative AI</option>
          <option value="multi-agent-systems">Multi-Agent Systems</option>
          <option value="human-computer-interaction">Human-Computer Interaction</option>
          <option value="education">Education</option>
          <option value="computer-vision">Computer Vision</option>
          <option value="speech-processing">Speech Processing</option>
          <option value="game-theory">Game Theory</option>
          <option value="covid-19">COVID-19</option>
          <option value="emotion-analysis">Emotion Analysis</option>
          <option value="similarity">Similarity</option>
        </select>
      </div>

      <div class="filter-group">
        <label><i class="fas fa-calendar-alt"></i> Year:</label>
        <select id="year-filter" class="filter-select">
          <option value="all">All Years</option>
        </select>
      </div>

      <div class="filter-group">
        <label><i class="fas fa-book"></i> Type:</label>
        <select id="type-filter" class="filter-select">
          <option value="all">All Types</option>
          <option value="article">Journal Articles</option>
          <option value="inproceedings">Conference Papers</option>
          <option value="misc">Patents & Others</option>
        </select>
      </div>

      <button id="reset-filters" class="reset-btn">
        <i class="fas fa-redo"></i> Reset All
      </button>
    </div>

    <div class="stats-bar">
      <span class="stat-badge">
        <i class="fas fa-file-alt"></i>
        <span id="visible-count">0</span> of <span id="total-count">0</span> publications
      </span>
    </div>
  </div>

  <!-- Publications Container -->
  <div id="publications-list" class="publications-container">
    {% bibliography -f papers --group_by year --group_order descending %}
  </div>

  <!-- No Results Message -->
  <div id="no-results" class="no-results" style="display: none;">
    <i class="fas fa-search"></i>
    <h3>No publications found</h3>
    <p>Try adjusting your search or filter criteria</p>
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
  margin-bottom: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
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

/* Filter Section */
.filter-section {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
  position: sticky;
  top: 70px;
  z-index: 100;
}

.search-container {
  position: relative;
  margin-bottom: 1rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
  font-size: 1.1rem;
}

.search-input {
  width: 100%;
  padding: 0.6rem 2.5rem 0.6rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.search-input:focus {
  outline: none;
  border-color: var(--global-theme-color);
  background: white;
  box-shadow: 0 0 0 3px rgba(75, 108, 183, 0.1);
}

.clear-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: none;
}

.clear-btn:hover {
  background: #e2e8f0;
  color: #4a5568;
}

.clear-btn.active {
  display: block;
}

.filter-controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: flex-end;
  margin-bottom: 0.75rem;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  display: block;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.3rem;
  font-size: 0.85rem;
}

.filter-group label i {
  margin-right: 0.3rem;
  color: var(--global-theme-color);
}

.filter-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.85rem;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:hover {
  border-color: #cbd5e0;
}

.filter-select:focus {
  outline: none;
  border-color: var(--global-theme-color);
  background: white;
  box-shadow: 0 0 0 3px rgba(75, 108, 183, 0.1);
}

.reset-btn {
  padding: 0.5rem 1rem;
  background: #f56565;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  white-space: nowrap;
}

.reset-btn:hover {
  background: #e53e3e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);
}

.stats-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 2px solid #e2e8f0;
}

.stat-badge {
  background: linear-gradient(135deg, var(--global-theme-color), #3b5998);
  color: white;
  padding: 0.4rem 0.9rem;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 2px 8px rgba(75, 108, 183, 0.3);
}

.stat-badge i {
  font-size: 1rem;
}

/* No Results Message */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px dashed #cbd5e0;
  margin-top: 2rem;
}

.no-results i {
  font-size: 3rem;
  color: #a0aec0;
  margin-bottom: 1rem;
}

.no-results h3 {
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.no-results p {
  color: #718096;
  font-size: 0.95rem;
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
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.year-group:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 35px rgba(0,0,0,0.12);
}

.publications-container h2 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--global-theme-color);
  margin: 0 0 0.8rem 0;
  padding: 0 0 0.4rem 0;
  border-bottom: 2.5px solid var(--global-theme-color);
  position: relative;
}

.publications-container h2::after {
  content: "";
  position: absolute;
  bottom: -2.5px;
  left: 0;
  width: 35px;
  height: 2.5px;
  background: #3b5998;
}

/* Publication Entries */
.publications-container {
  margin-bottom: 1.5rem;
}

/* Style year groupings as rectangles */
.publications-container .year {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
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
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  padding: 0 0 0.5rem 0;
  border-bottom: 3px solid var(--global-theme-color);
  position: relative;
}

.publications-container .bibliography h2::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 40px;
  height: 3px;
  background: #3b5998;
}

/* Year container styling */
.publications-container .bibliography h2 + .bibliography {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

/* Publications grouped by year styling */
.publications-container > .bibliography h2 ~ ol {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

/* Year grouping with JavaScript enhancement */
.year-card {
  background: white;
  padding: 1.2rem;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
  margin-bottom: 1.2rem;
  transition: all 0.3s ease;
}

.year-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 18px rgba(0,0,0,0.1);
}

.year-card h2 {
  margin-top: 0;
  margin-bottom: 0.8rem;
}

.year-card .bibliography {
  margin: 0;
}

.entry {
  background: white;
  padding: 0.9rem;
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.08);
  position: relative;
  margin-bottom: 0.65rem;
  overflow: hidden;
}

.entry::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(to bottom, var(--global-theme-color), #3b5998);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.entry:hover {
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.entry:hover::before {
  transform: scaleY(1);
}

.entry .title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.3;
  margin: 0 0 0.35rem 0;
  padding-right: 3rem;
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
  top: 0.9rem;
  right: 0.9rem;
  font-size: 0.75rem;
  color: var(--global-theme-color);
  font-weight: 600;
  background: #f8fafc;
  padding: 0.15rem 0.45rem;
  border-radius: 10px;
  border: 1.5px solid var(--global-theme-color);
}

.entry .author {
  color: #4a5568;
  font-size: 0.8rem;
  margin: 0.35rem 0;
  line-height: 1.4;
}

.entry .author em {
  color: var(--global-theme-color);
  font-style: normal;
  font-weight: 600;
  background: linear-gradient(120deg, rgba(75, 108, 183, 0.1) 0%, rgba(75, 108, 183, 0.05) 100%);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.entry .periodical {
  color: #2d3748;
  font-style: italic;
  font-size: 0.8rem;
  background: #f8fafc;
  border-left: 2.5px solid var(--global-theme-color);
  padding: 0.45rem 0.7rem;
  margin: 0.35rem 0;
  line-height: 1.4;
  border-radius: 0 5px 5px 0;
  font-weight: 500;
}

.entry .links {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
}

.entry .links .btn {
  font-size: 0.65rem;
  padding: 0.25rem 0.55rem;
  border-radius: 5px;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.entry .links .btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}

.entry .links .btn {
  font-size: 0.75rem;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
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
    padding: 1.5rem 1rem;
    margin-bottom: 1.5rem;
  }

  .header-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .download-btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  .filter-section {
    padding: 1rem;
    position: static;
    margin-top: 0.5rem;
  }

  .search-input {
    padding: 0.8rem 2.5rem 0.8rem 2.5rem;
    font-size: 0.9rem;
  }

  .filter-controls {
    flex-direction: column;
    gap: 0.8rem;
  }

  .filter-group {
    min-width: 100%;
  }

  .filter-select {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }

  .reset-btn {
    width: 100%;
    padding: 0.6rem 1rem;
  }

  .stats-bar {
    flex-direction: column;
    gap: 0.8rem;
    align-items: stretch;
  }

  .stat-badge {
    justify-content: center;
    font-size: 0.85rem;
    padding: 0.4rem 1rem;
  }

  .publications-container h2 {
    font-size: 1.5rem;
    margin: 1.5rem 0 1rem 0;
  }

  .year-card {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
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
  
  .entry .links {
    gap: 0.8rem;
    margin-top: 1rem;
    padding-top: 1rem;
  }
  
  .entry .links .btn {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }

  .no-results {
    padding: 3rem 1.5rem;
  }

  .no-results i {
    font-size: 2rem;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Initialize variables
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  const topicFilter = document.getElementById('topic-filter');
  const yearFilter = document.getElementById('year-filter');
  const typeFilter = document.getElementById('type-filter');
  const resetBtn = document.getElementById('reset-filters');
  const publicationsList = document.getElementById('publications-list');
  const noResults = document.getElementById('no-results');
  const visibleCount = document.getElementById('visible-count');
  const totalCount = document.getElementById('total-count');

  // Group year headings with their corresponding publications
  const bibliography = publicationsList.querySelector('.bibliography');
  if (bibliography) {
    const yearHeadings = bibliography.querySelectorAll('h2');
    
    yearHeadings.forEach(function(heading) {
      let nextElement = heading.nextElementSibling;
      while (nextElement && !nextElement.matches('ol.bibliography')) {
        nextElement = nextElement.nextElementSibling;
      }
      
      if (nextElement && nextElement.matches('ol.bibliography')) {
        const yearCard = document.createElement('div');
        yearCard.className = 'year-card';
        yearCard.setAttribute('data-year', heading.textContent.trim());
        
        heading.parentNode.insertBefore(yearCard, heading);
        yearCard.appendChild(heading);
        yearCard.appendChild(nextElement);
      }
    });
  }

  // Get all publications
  const allPublications = document.querySelectorAll('.bibliography li');
  const yearCards = document.querySelectorAll('.year-card');
  
  // Populate year filter
  const years = new Set();
  yearCards.forEach(card => {
    const year = card.getAttribute('data-year');
    if (year) years.add(year);
  });
  
  Array.from(years).sort((a, b) => b - a).forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });

  // Update counts
  totalCount.textContent = allPublications.length;
  updateVisibleCount();

  // Get publication data
  function getPublicationData(publication) {
    const text = publication.textContent.toLowerCase();
    
    // Extract type from CSS classes first (Jekyll-Scholar adds these)
    let type = 'misc';
    const classList = publication.className;
    if (classList.includes('article') || classList.includes('entry-article')) {
      type = 'article';
    } else if (classList.includes('inproceedings') || classList.includes('entry-inproceedings')) {
      type = 'inproceedings';
    } else if (publication.querySelector('.periodical')) {
      // Fallback to text-based detection with comprehensive journal keywords
      const periodicalText = publication.querySelector('.periodical').textContent.toLowerCase();
      
      const journalKeywords = [
        'journal', 'transactions', 'research', 'review', 'letters', 
        'ieee access', 'plos', 'nature', 'science', 'acm', 
        'elsevier', 'springer', 'pergamon', 'mdpi', 'wiley',
        'computers & security', 'security', 'expert systems',
        'electronic commerce', 'heliyon', 'nutrients', 'electronics',
        'network science', 'clinical nutrition', 'respiratory research',
        'ssrn', 'arxiv', 'available at'
      ];
      
      const conferenceKeywords = [
        'conference', 'proceedings', 'symposium', 'workshop',
        'icccn', 'icc', 'infocom', 'ccnc', 'usenix', 'ijcai',
        'aaai', 'aamas', 'interspeech', 'cscml', 'caadria',
        'fie', 'isicem', 'isbi', 'icis'
      ];
      
      if (journalKeywords.some(keyword => periodicalText.includes(keyword))) {
        type = 'article';
      } else if (conferenceKeywords.some(keyword => periodicalText.includes(keyword))) {
        type = 'inproceedings';
      }
    }

    // Get year from parent card
    const yearCard = publication.closest('.year-card');
    const year = yearCard ? yearCard.getAttribute('data-year') : '';

    // Extract projects/topics from the text
    const projects = [];
    const topicKeywords = {
      'machine-learning': ['machine learning', 'ml', 'neural network', 'deep learning', 'classification', 'prediction'],
      'security': ['security', 'malware', 'attack', 'threat', 'anomaly', 'malicious', 'adversarial', 'cybersecurity'],
      'traffic-classification': ['traffic', 'encrypted traffic', 'network', 'packet'],
      'healthcare': ['health', 'medical', 'clinical', 'patient', 'disease'],
      'e-commerce': ['commerce', 'shopping', 'market', 'consumer'],
      'generative-ai': ['gan', 'generative', 'synthetic'],
      'multi-agent-systems': ['agent', 'multi-agent', 'coordination'],
      'human-computer-interaction': ['interaction', 'crowdsourcing', 'vigilance', 'tutor'],
      'education': ['education', 'student', 'learning group', 'teaching'],
      'computer-vision': ['vision', 'image', 'segmentation', 'anatomical'],
      'speech-processing': ['speech', 'speaker', 'diarization'],
      'game-theory': ['game theory', 'team formation'],
      'covid-19': ['covid'],
      'emotion-analysis': ['emotion', 'sentiment'],
      'similarity': ['similarity']
    };

    for (const [key, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        projects.push(key);
      }
    }

    return { text, type, year, projects };
  }

  // Filter publications
  function filterPublications() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedTopic = topicFilter.value;
    const selectedYear = yearFilter.value;
    const selectedType = typeFilter.value;

    let visiblePubs = 0;

    allPublications.forEach(pub => {
      const data = getPublicationData(pub);
      let isVisible = true;

      // Search filter
      if (searchTerm && !data.text.includes(searchTerm)) {
        isVisible = false;
      }

      // Topic filter
      if (selectedTopic !== 'all' && !data.projects.includes(selectedTopic)) {
        isVisible = false;
      }

      // Year filter
      if (selectedYear !== 'all' && data.year !== selectedYear) {
        isVisible = false;
      }

      // Type filter
      if (selectedType !== 'all' && data.type !== selectedType) {
        isVisible = false;
      }

      if (isVisible) {
        pub.style.display = '';
        visiblePubs++;
      } else {
        pub.style.display = 'none';
      }
    });

    // Hide/show year cards based on visible publications
    yearCards.forEach(card => {
      const visibleInCard = card.querySelectorAll('li:not([style*="display: none"])').length;
      card.style.display = visibleInCard > 0 ? '' : 'none';
    });

    // Show/hide no results message
    if (visiblePubs === 0) {
      publicationsList.style.display = 'none';
      noResults.style.display = 'block';
    } else {
      publicationsList.style.display = '';
      noResults.style.display = 'none';
    }

    updateVisibleCount();
  }

  function updateVisibleCount() {
    const visible = Array.from(allPublications).filter(pub => pub.style.display !== 'none').length;
    visibleCount.textContent = visible;
  }

  // Event listeners
  searchInput.addEventListener('input', function() {
    filterPublications();
    clearSearchBtn.classList.toggle('active', this.value.length > 0);
  });

  clearSearchBtn.addEventListener('click', function() {
    searchInput.value = '';
    this.classList.remove('active');
    filterPublications();
  });

  topicFilter.addEventListener('change', filterPublications);
  yearFilter.addEventListener('change', filterPublications);
  typeFilter.addEventListener('change', filterPublications);

  resetBtn.addEventListener('click', function() {
    searchInput.value = '';
    topicFilter.value = 'all';
    yearFilter.value = 'all';
    typeFilter.value = 'all';
    clearSearchBtn.classList.remove('active');
    filterPublications();
  });

  // Add highlight on hover for better UX
  allPublications.forEach(pub => {
    pub.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });
});
</script>
