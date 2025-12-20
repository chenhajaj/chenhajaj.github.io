---
layout: cv
permalink: /cv/
title: Curriculum Vitae
nav: true
nav_order: 1
cv_pdf: CV.pdf
description: Academic CV including education, academic administration, conferences, patents, and grants.
use_resume: false
---

<!-- CV Impact Hero -->
<div class="cv-impact-hero">
  <div class="hero-content">
    <h1 class="hero-title">Academic Excellence & Leadership</h1>
    <p class="hero-subtitle">Associate Professor | Data Science Track Head | NVIDIA University Ambassador</p>
  </div>
  <div class="impact-stats-grid">
    <div class="impact-stat">
      <div class="stat-icon"><i class="fas fa-dollar-sign"></i></div>
      <div class="stat-info">
        <div class="stat-number">$1.2M+</div>
        <div class="stat-label">Research Funding</div>
      </div>
    </div>
    <div class="impact-stat">
      <div class="stat-icon"><i class="fas fa-lightbulb"></i></div>
      <div class="stat-info">
        <div class="stat-number">4</div>
        <div class="stat-label">Patents</div>
      </div>
    </div>
    <div class="impact-stat">
      <div class="stat-icon"><i class="fas fa-users"></i></div>
      <div class="stat-info">
        <div class="stat-number">6</div>
        <div class="stat-label">Conferences</div>
      </div>
    </div>
    <div class="impact-stat">
      <div class="stat-icon"><i class="fas fa-file-alt"></i></div>
      <div class="stat-info">
        <div class="stat-number">50+</div>
        <div class="stat-label">Publications</div>
      </div>
    </div>
    <div class="impact-stat">
      <div class="stat-icon"><i class="fas fa-user-graduate"></i></div>
      <div class="stat-info">
        <div class="stat-number">12</div>
        <div class="stat-label">Current Students</div>
      </div>
    </div>
    <div class="impact-stat">
      <div class="stat-icon"><i class="fas fa-graduation-cap"></i></div>
      <div class="stat-info">
        <div class="stat-number">8</div>
        <div class="stat-label">Alumni</div>
      </div>
    </div>
  </div>
</div>

<style>
/* CV Impact Hero Section */
.cv-impact-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3.5rem 3rem;
  border-radius: 24px;
  margin-bottom: 3rem;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
  position: relative;
  overflow: hidden;
}

.cv-impact-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.cv-impact-hero::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
  border-radius: 50%;
}

.hero-content {
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 1;
}

.hero-title {
  color: white;
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0,0,0,0.15);
}

.impact-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.impact-stat {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  cursor: default;
}

.impact-stat:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.22);
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.stat-icon {
  background: rgba(255, 255, 255, 0.25);
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon i {
  color: white;
  font-size: 1.5rem;
  text-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.stat-info {
  flex: 1;
  min-width: 0;
}

.stat-number {
  color: white;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 0.3rem;
  text-shadow: 0 2px 12px rgba(0,0,0,0.2);
}

.stat-label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .cv-impact-hero {
    padding: 2.5rem 1.5rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .impact-stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .impact-stat {
    padding: 1.25rem 0.85rem;
    gap: 0.75rem;
  }
  
  .stat-icon {
    width: 42px;
    height: 42px;
  }
  
  .stat-icon i {
    font-size: 1.25rem;
  }
  
  .stat-number {
    font-size: 1.6rem;
  }
  
  .stat-label {
    font-size: 0.75rem;
  }
}

/* Override default card styling with modern timeline */
.cv .card {
  background: white !important;
  border: 2px solid #e2e8f0 !important;
  border-radius: 16px !important;
  padding: 2.5rem !important;
  margin-bottom: 3rem !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important;
  transition: all 0.3s ease !important;
  position: relative !important;
  overflow: hidden !important;
}

.cv .card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, var(--global-theme-color), #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cv .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(75, 108, 183, 0.15) !important;
  border-color: var(--global-theme-color) !important;
}

.cv .card:hover::before {
  opacity: 1;
}

/* Section Titles with Icons */
.cv .card-title {
  color: #1e293b !important;
  font-size: 2rem !important;
  font-weight: 800 !important;
  margin-bottom: 2rem !important;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  padding-left: 3.5rem;
}

.cv .card-title::before {
  position: absolute;
  left: 0;
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
  font-size: 2rem;
  background: linear-gradient(135deg, var(--global-theme-color), #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Section-specific icons */
.cv .card:has(h3:contains("General")) .card-title::before {
  content: "\f007"; /* user */
}

.cv .card:has(h3:contains("Academic")) .card-title::before {
  content: "\f19c"; /* briefcase */
}

.cv .card:has(h3:contains("Conference")) .card-title::before {
  content: "\f0c0"; /* users */
}

.cv .card:has(h3:contains("Patents")) .card-title::before {
  content: "\f0e7"; /* lightbulb */
}

.cv .card:has(h3:contains("Grants")) .card-title::before {
  content: "\f155"; /* dollar */
}

.cv .card:has(h3:contains("Education")) .card-title::before {
  content: "\f19d"; /* graduation cap */
}

/* Timeline Styling */
.cv ul {
  list-style: none !important;
  padding-left: 0 !important;
  position: relative;
}

.cv ul::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 10px;
  bottom: 10px;
  width: 3px;
  background: linear-gradient(to bottom, var(--global-theme-color), #8b5cf6);
  border-radius: 2px;
}

.cv li {
  position: relative;
  padding-left: 50px !important;
  margin-bottom: 2rem !important;
  min-height: 60px;
}

.cv li::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 8px;
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, var(--global-theme-color), #8b5cf6);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(75, 108, 183, 0.2);
  z-index: 1;
}

/* Year badges */
.cv .list-group-item .badge,
.cv li strong:first-child {
  display: inline-block;
  background: linear-gradient(135deg, var(--global-theme-color), #8b5cf6) !important;
  color: white !important;
  padding: 0.5rem 1rem !important;
  border-radius: 12px !important;
  font-weight: 700 !important;
  font-size: 0.95rem !important;
  margin-bottom: 0.75rem !important;
  box-shadow: 0 4px 12px rgba(75, 108, 183, 0.3);
}

/* Content Typography */
.cv li p,
.cv li div {
  color: #475569;
  font-size: 1.05rem;
  line-height: 1.7;
  margin-top: 0.5rem;
}

.cv li strong {
  color: #1e293b;
  font-size: 1.2rem;
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
}

.cv li em {
  color: #64748b;
  font-size: 1rem;
  font-style: normal;
  display: block;
  margin-bottom: 0.75rem;
}

/* Special styling for Education section - move to end */
.cv .card:last-child {
  border-color: #dbeafe;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
}

.cv .card:last-child:hover {
  border-color: var(--global-theme-color);
}

/* Grants section - green accent */
.cv .card:nth-last-child(2) {
  border-color: #d1fae5;
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
}

.cv .card:nth-last-child(2):hover {
  border-color: #10b981;
}

.cv .card:nth-last-child(2)::before {
  background: linear-gradient(90deg, #10b981, #059669);
}

/* Patents section - purple accent */
.cv .card:nth-last-child(3) {
  border-color: #e9d5ff;
  background: linear-gradient(135deg, #ffffff 0%, #faf5ff 100%);
}

.cv .card:nth-last-child(3):hover {
  border-color: #8b5cf6;
}

.cv .card:nth-last-child(3)::before {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

/* Conferences section - orange accent */
.cv .card:nth-last-child(4) {
  border-color: #fed7aa;
  background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
}

.cv .card:nth-last-child(4):hover {
  border-color: #f59e0b;
}

.cv .card:nth-last-child(4)::before {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .cv .card {
    padding: 1.5rem !important;
  }
  
  .cv .card-title {
    font-size: 1.5rem !important;
    padding-left: 2.5rem;
  }
  
  .cv .card-title::before {
    font-size: 1.5rem;
  }
  
  .cv li {
    padding-left: 40px !important;
  }
  
  .cv li strong {
    font-size: 1.1rem;
  }
}
</style>
