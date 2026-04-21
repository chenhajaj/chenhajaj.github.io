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
  },{id: "nav-",
          title: "",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-people",
          title: "People",
          description: "Current students and alumni of the Hajaj Lab at Ariel University",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "Research projects in AI, Cybersecurity, Healthcare, and Data Science.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "news-new-paper-in-ieee-access-leveraging-osint-for-advanced-proactive-cybersecurity-strategies-and-solutions-doi-10-1109-access-2025-3603868-️",
          title: 'New paper in IEEE Access: Leveraging OSINT for Advanced Proactive Cybersecurity: Strategies and...',
          description: "",
          section: "News",},{id: "news-two-papers-presented-at-ieee-ccnc-2026-in-las-vegas-qoe-prediction-for-call-of-duty-and-cloudy-with-a-chance-of-anomalies-dynamic-gnn-for-cloud-anomaly-detection-️",
          title: 'Two papers presented at IEEE CCNC 2026 in Las Vegas: QoE Prediction for...',
          description: "",
          section: "News",},{id: "news-new-paper-published-in-computer-networks-real-time-network-security-integrating-ann-and-dynamic-graph-based-clustering-doi-10-1016-j-comnet-2026-112016",
          title: 'New paper published in Computer Networks: Real-Time Network Security: Integrating ANN and Dynamic...',
          description: "",
          section: "News",},{id: "news-paper-accepted-at-aamas-2026-cleaner-adversarial-captchas-intelligent-targets-and-precise-noise-for-usable-security-meir-litman-amp-amp-chen-hajaj",
          title: 'Paper accepted at AAMAS 2026: Cleaner Adversarial CAPTCHAs: Intelligent Targets and Precise Noise...',
          description: "",
          section: "News",},{id: "news-one-paper-accepted-at-ieee-icc-2026-in-glasgow-uncovering-microservice-faults-udi-aharon-et-al",
          title: 'One paper accepted at IEEE ICC 2026 in Glasgow: Uncovering Microservice Faults (Udi...',
          description: "",
          section: "News",},{id: "projects-adversarial-artificial-intelligence",
          title: 'Adversarial Artificial Intelligence',
          description: "Research on developing robust and secure AI systems against malicious attacks",
          section: "Projects",handler: () => {
              window.location.href = "/projects/adversarial_ai/";
            },},{id: "projects-quantifying-constructivist-learning-in-studio-based-education",
          title: 'Quantifying Constructivist Learning in Studio-Based Education',
          description: "Data science methods for measuring learning in creative education settings",
          section: "Projects",handler: () => {
              window.location.href = "/projects/constructivist_learning/";
            },},{id: "projects-encrypted-traffic-classification",
          title: 'Encrypted Traffic Classification',
          description: "AI-powered methods for classifying and analyzing encrypted network traffic",
          section: "Projects",handler: () => {
              window.location.href = "/projects/encrypted_traffic/";
            },},{id: "projects-medical-data-science",
          title: 'Medical Data Science',
          description: "Machine learning applications for critical care and medical decision-making",
          section: "Projects",handler: () => {
              window.location.href = "/projects/icu_nutrition/";
            },},{id: "projects-incentive-design",
          title: 'Incentive Design',
          description: "Mechanism design for strategic decision-making in networks and crowdsourcing",
          section: "Projects",handler: () => {
              window.location.href = "/projects/incentive_design/";
            },},{id: "projects-a-multimodal-approach-for-measuring-item-similarity",
          title: 'A Multimodal Approach for Measuring Item Similarity',
          description: "Measuring similarity between items using computer vision and natural language processing",
          section: "Projects",handler: () => {
              window.location.href = "/projects/similarity/";
            },},{
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
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=Zy2cIskAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
