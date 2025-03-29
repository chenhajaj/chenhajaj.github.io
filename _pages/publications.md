---
layout: page
permalink: /publications/
title: Publications
description: 
nav: true
nav_order: 2
---

<div class="publications">
  <p class="download-link">
    <a href="/assets/pdf/pub.pdf">
      Download Full Publication List
    </a>
  </p>
  <div class="publications-container">
    {% bibliography -f papers --group_by none %}
  </div>
</div>

<style>
/* Publications Container */
.publications {
  padding: 0 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Download link styling */
.download-link {
  margin: 1rem 0 3rem;
  text-align: center;
}

.download-link a {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.2rem;
  color: var(--global-theme-color);
  text-decoration: none;
  font-weight: 500;
  border: 2px solid var(--global-theme-color);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.download-link a:hover {
  background-color: var(--global-theme-color);
  color: white;
  text-decoration: none;
}

.download-link a::before {
  content: "📄";
  margin-right: 0.5rem;
  font-size: 1.2em;
}

/* Publication Entries */
.publications-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.entry {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0,0,0,0.1);
  position: relative;
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
  padding-right: 4rem;
}

.entry .title a {
  color: inherit;
  text-decoration: none;
  background-image: linear-gradient(var(--global-theme-color), var(--global-theme-color));
  background-size: 0 2px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.3s;
}

.entry .title a:hover {
  background-size: 100% 2px;
  color: inherit;
}

.entry .year {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 1rem;
  color: #666;
  font-weight: 500;
}

.entry .author {
  color: #666;
  font-size: 1rem;
  margin: 0.8rem 0;
  line-height: 1.6;
}

.entry .author em {
  color: var(--global-theme-color);
  font-style: normal;
  font-weight: 500;
}

.entry .periodical {
  color: #2c3e50;
  font-style: italic;
  font-size: 1rem;
  border-left: 3px solid var(--global-theme-color);
  padding-left: 1rem;
  margin: 0.8rem 0;
  line-height: 1.6;
}

.entry .links {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 1.2rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(0,0,0,0.1);
}

.entry .links .btn {
  font-size: 0.9rem;
  padding: 0.3rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.entry .links .btn:hover {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .publications {
    padding: 0 0.5rem;
  }

  .entry {
    padding: 1.5rem;
    border-radius: 8px;
  }
  
  .download-link {
    margin: 0.5rem 0 2rem;
  }
  
  .entry .title {
    font-size: 1.1rem;
    padding-right: 3.5rem;
  }
  
  .entry .year {
    font-size: 0.9rem;
    top: 1.5rem;
    right: 1.5rem;
  }
  
  .entry .author,
  .entry .periodical {
    font-size: 0.95rem;
    margin: 0.6rem 0;
  }
  
  .entry .links {
    gap: 0.6rem;
    margin-top: 1rem;
    padding-top: 1rem;
  }
  
  .entry .links .btn {
    font-size: 0.85rem;
    padding: 0.25rem 0.8rem;
  }
}
</style>

