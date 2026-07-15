// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "Full list of publications by Chen Hajaj — machine learning, cybersecurity, healthcare AI, and multi-agent systems.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "Research projects in AI, Cybersecurity, Healthcare, and Data Science.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-our-lab",
          title: "Our Lab",
          description: "Current students and alumni of the Hajaj Lab at Ariel University",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "Courses taught at Ariel University and other institutions, covering data science, machine learning, and computer science.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-code-amp-software",
          title: "Code &amp; Software",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/software/";
          },
        },{id: "nav-contact",
          title: "Contact",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/contact/";
          },
        },{id: "nav-news",
          title: "News",
          description: "Latest updates, publications, and announcements from the Hajaj Lab.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "news-four-papers-accepted-at-ieee-icc-2025-d-magic-gnn-based-cybersecurity-attack-detection-encrypted-traffic-classification-via-advanced-data-augmentation-pqclass-post-quantum-encryption-traffic-classification-and-optimized-file-type-detection-and-one-shot-retrieval",
          title: 'Four papers accepted at IEEE ICC 2025: D-MAGIC (GNN-based cybersecurity attack detection), Encrypted...',
          description: "",
          section: "News",},{id: "news-new-paper-accepted-in-fatigue-amp-amp-fracture-of-engineering-materials-amp-amp-structures-wiley-measuring-and-analyzing-defects-of-additive-manufactured-ti-6al-4v-specimens-through-image-segmentation",
          title: 'New paper accepted in Fatigue &amp;amp;amp; Fracture of Engineering Materials &amp;amp;amp; Structures (Wiley):...',
          description: "",
          section: "News",},{id: "news-new-paper-in-ieee-access-leveraging-osint-for-advanced-proactive-cybersecurity-strategies-and-solutions-doi-10-1109-access-2025-3603868-️",
          title: 'New paper in IEEE Access: Leveraging OSINT for Advanced Proactive Cybersecurity: Strategies and...',
          description: "",
          section: "News",},{id: "news-new-paper-in-ieee-access-survival-forest-models-for-icu-mortality-prediction-based-on-nutrition-and-clinical-factors-doi-10-1109-access-2025-3649629",
          title: 'New paper in IEEE Access: Survival Forest Models for ICU Mortality Prediction based...',
          description: "",
          section: "News",},{id: "news-two-papers-presented-at-ieee-ccnc-2026-in-las-vegas-qoe-prediction-for-call-of-duty-and-cloudy-with-a-chance-of-anomalies-dynamic-gnn-for-cloud-anomaly-detection-️",
          title: 'Two papers presented at IEEE CCNC 2026 in Las Vegas: QoE Prediction for...',
          description: "",
          section: "News",},{id: "news-new-paper-published-in-computer-networks-real-time-network-security-integrating-ann-and-dynamic-graph-based-clustering-doi-10-1016-j-comnet-2026-112016",
          title: 'New paper published in Computer Networks: Real-Time Network Security: Integrating ANN and Dynamic...',
          description: "",
          section: "News",},{id: "news-new-paper-accepted-in-pediatric-infectious-disease-journal-pidj-machine-learning-tools-for-predicting-pediatric-urinary-tract-infections-caused-by-esbl-producing-bacteria",
          title: 'New paper accepted in Pediatric Infectious Disease Journal (PIDJ): Machine Learning Tools for...',
          description: "",
          section: "News",},{id: "news-grant-proposal-accepted-for-a-research-collaboration-with-crysys-lab-budapest-university-of-technology-looking-forward-to-hosting-our-colleagues-soon",
          title: 'Grant proposal accepted for a research collaboration with CrySyS Lab, Budapest University of...',
          description: "",
          section: "News",},{id: "news-paper-accepted-at-aamas-2026-cleaner-adversarial-captchas-intelligent-targets-and-precise-noise-for-usable-security-meir-litman-amp-amp-chen-hajaj",
          title: 'Paper accepted at AAMAS 2026: Cleaner Adversarial CAPTCHAs: Intelligent Targets and Precise Noise...',
          description: "",
          section: "News",},{id: "news-paper-accepted-at-ieee-icc-2026-in-glasgow-uncovering-microservice-faults-a-temporal-graph-approach-to-root-cause-analysis",
          title: 'Paper accepted at IEEE ICC 2026 in Glasgow: Uncovering Microservice Faults: A Temporal...',
          description: "",
          section: "News",},{id: "news-paper-accepted-at-dcc-2026-design-computing-and-cognition-paris-learning-through-concept-generation-the-case-of-academic-and-practitioner-teaching-in-the-design-engineering-studio",
          title: 'Paper accepted at DCC 2026 (Design, Computing and Cognition), Paris: Learning through Concept...',
          description: "",
          section: "News",},{id: "news-congratulations-to-yarin-amar-for-being-named-on-the-rector-s-list-for-academic-excellence-and-to-eylon-yehiel-for-being-awarded-the-dean-s-list-excellence-award-we-are-proud-of-your-outstanding-achievements",
          title: 'Congratulations to Yarin Amar for being named on the Rector’s List for academic...',
          description: "",
          section: "News",},{id: "news-best-paper-award-2nd-place-at-the-20th-ilais-conference-2026-peres-academic-center-product-pricing-by-multidimensional-similarity-a-multimodal-attention-framework-using-image-text-and-temporal-representations-with-eylon-yehiel-and-anat-goldstein",
          title: 'Best Paper Award (2nd Place) at the 20th ILAIS Conference 2026, Peres Academic...',
          description: "",
          section: "News",},{id: "projects-adversarial-artificial-intelligence",
          title: 'Adversarial Artificial Intelligence',
          description: "Developing robust AI systems that withstand adversarial attacks — across network security, mobile malware, healthcare AI, and social network manipulation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/adversarial_ai/";
            },},{id: "projects-quantifying-constructivist-learning-in-studio-based-education",
          title: 'Quantifying Constructivist Learning in Studio-Based Education',
          description: "Data science methods that quantify learning in design studio education — measuring cognitive breakthroughs, engagement, and teaching effectiveness during live critiques.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/constructivist_learning/";
            },},{id: "projects-encrypted-traffic-classification",
          title: 'Encrypted Traffic Classification',
          description: "AI-powered classification of encrypted network traffic — enabling security monitoring and QoS management without compromising encryption or user privacy.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/encrypted_traffic/";
            },},{id: "projects-medical-data-science",
          title: 'Medical Data Science',
          description: "Machine learning for critical care — predicting ICU feeding complications, phenotyping rare respiratory diseases, and enabling privacy-preserving medical data collaboration.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/icu_nutrition/";
            },},{id: "projects-incentive-design",
          title: 'Incentive Design',
          description: "Mechanism design and game theory for e-commerce platforms, team formation, and kidney exchange — aligning individual incentives with collective outcomes.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/incentive_design/";
            },},{id: "projects-a-multimodal-approach-for-measuring-item-similarity",
          title: 'A Multimodal Approach for Measuring Item Similarity',
          description: "Multimodal AI that fuses computer vision and NLP to measure item similarity the way humans do — powering smarter recommendations in tourism, e-commerce, and real estate.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/similarity/";
            },},{
        id: 'social-dblp',
        title: 'DBLP',
        section: 'Socials',
        handler: () => {
          window.open("https://dblp.uni-trier.de/pid/133/1819.html", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%68%65%6E%68%61@%67.%61%72%69%65%6C.%61%63.%69%6C", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/chenhajaj", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/chen-hajaj-5ba59517", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0001-9940-5654", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/https://www.researchgate.net/profile/Chen-Hajaj/", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=Zy2cIskAAAAJ", "_blank");
        },
      },{
        id: 'social-scopus',
        title: 'Scopus',
        section: 'Socials',
        handler: () => {
          window.open("https://www.scopus.com/authid/detail.uri?authorId=https://www.scopus.com/authid/detail.uri?authorId=56024371400", "_blank");
        },
      },{
        id: 'social-semanticscholar',
        title: 'Semantic Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://www.semanticscholar.org/author/3313085", "_blank");
        },
      },];
