/*
 * Site behaviour for chenhajaj.github.io (no dependencies).
 *  1. Theme toggle and mobile menu
 *  2. Flow fingerprints: deterministic drawings of a network flow
 *  3. Publication panels (abstract / BibTeX) and copy buttons
 *  4. Publications page filters
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------ 1. frame */

  function effectiveTheme() {
    var forced = root.getAttribute("data-theme");
    if (forced === "dark" || forced === "light") return forced;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function labelThemeButton(btn) {
    var next = effectiveTheme() === "dark" ? "light" : "dark";
    btn.setAttribute("aria-label", "Switch to " + next + " theme");
    btn.setAttribute("title", "Switch to " + next + " theme");
  }

  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    labelThemeButton(themeBtn);
    themeBtn.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      labelThemeButton(themeBtn);
    });
  }

  var menuBtn = document.getElementById("menu-toggle");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.textContent = open ? "Close" : "Menu";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "Menu";
        menuBtn.focus();
      }
    });
  }

  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------------------------------------------------- 2. fingerprints */

  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Build a packet sequence that looks like a real encrypted connection:
  // a handshake, request/response bursts, idle gaps and, optionally, a
  // change of regime (the "shift") late in the flow.
  function makeFlow(slots, seed, shiftAt) {
    var r = rng(seed);
    var flow = new Array(slots);
    var i = 0;
    var MTU = 1500;
    // Each seed gets its own "application": burst length, request size,
    // idle gaps and upload share all vary, so every research line has a
    // recognisably different trace.
    var burstMean = 2 + r() * 9;
    var reqMax = 160 + r() * 1100;
    var ackRate = 0.2 + r() * 0.6;
    var gapRate = 0.1 + r() * 0.45;
    var upShare = 0.15 + r() * 0.3;

    function put(dir, size, shifted) {
      if (i < slots) flow[i++] = { dir: dir, size: Math.max(40, Math.min(MTU, size)), shift: !!shifted };
    }
    function gap(n) {
      for (var k = 0; k < n && i < slots; k++) flow[i++] = null;
    }

    // Handshake: client hello, server hello + certificate, finish
    put(1, 220 + r() * 300);
    put(-1, 1400 + r() * 100);
    put(-1, 1200 + r() * 300);
    put(-1, 300 + r() * 600);
    put(1, 80 + r() * 60);
    put(1, 120 + r() * 200);
    gap(1 + Math.floor(r() * 2));

    var shiftSlot = shiftAt ? Math.floor(slots * shiftAt) : slots + 1;

    while (i < slots) {
      var shifted = i >= shiftSlot;
      if (!shifted) {
        // request(s), then a response burst of near-MTU packets with a short tail
        put(1, 90 + r() * reqMax);
        if (r() < upShare) put(1, 90 + r() * reqMax);
        var burst = 1 + Math.floor(r() * burstMean * 2);
        for (var b = 0; b < burst; b++) put(-1, b < burst - 1 ? 1250 + r() * 250 : 200 + r() * 900);
        if (r() < ackRate) put(1, 60 + r() * 40);
        if (r() < gapRate) gap(1 + Math.floor(r() * 3));
      } else {
        // a different application: steady, medium-sized packets both ways
        var run = 4 + Math.floor(r() * 6);
        for (var s = 0; s < run; s++) {
          put(r() < 0.42 ? 1 : -1, 620 + r() * 520, true);
        }
        gap(r() < 0.2 ? 1 : 0);
      }
    }
    return { flow: flow, shiftSlot: shiftSlot };
  }

  var SVGNS = "http://www.w3.org/2000/svg";

  function drawFingerprint(el, animate) {
    var w = Math.max(80, Math.round(el.clientWidth));
    var h = Math.max(24, Math.round(el.clientHeight));
    var bar = parseFloat(el.getAttribute("data-bar") || "2");
    var step = parseFloat(el.getAttribute("data-step") || "4");
    var shiftAt = parseFloat(el.getAttribute("data-shift") || "0");
    var seed = hash(el.getAttribute("data-seed") || "flow");
    var slots = Math.floor(w / step);
    var data = makeFlow(slots, seed, shiftAt);
    var axis = Math.round(h * parseFloat(el.getAttribute("data-axis") || "0.42")) + 0.5;
    var upMax = axis - 2;
    var downMax = h - axis - 2;

    var svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    var line = document.createElementNS(SVGNS, "line");
    line.setAttribute("class", "fp-axis");
    line.setAttribute("x1", 0);
    line.setAttribute("x2", w);
    line.setAttribute("y1", axis);
    line.setAttribute("y2", axis);
    svg.appendChild(line);

    var shiftIndex = 0;
    for (var k = 0; k < data.flow.length; k++) {
      var p = data.flow[k];
      if (!p) continue;
      var bh = (p.size / 1500) * (p.dir > 0 ? upMax : downMax);
      var rect = document.createElementNS(SVGNS, "rect");
      rect.setAttribute("x", (k * step).toFixed(1));
      rect.setAttribute("width", bar);
      rect.setAttribute("height", bh.toFixed(1));
      rect.setAttribute("y", (p.dir > 0 ? axis - 0.5 - bh : axis + 0.5).toFixed(1));
      var cls = "fp-bar " + (p.dir > 0 ? "is-up" : "is-down");
      if (p.shift) cls += " is-shift";
      rect.setAttribute("class", cls);
      if (animate) rect.style.setProperty("--i", k);
      svg.appendChild(rect);
      if (p.shift && !shiftIndex) shiftIndex = k;
    }

    if (shiftAt && data.shiftSlot < slots) {
      var mx = data.shiftSlot * step - step / 2;
      var marker = document.createElementNS(SVGNS, "line");
      marker.setAttribute("class", "fp-marker");
      marker.setAttribute("x1", mx);
      marker.setAttribute("x2", mx);
      marker.setAttribute("y1", 0);
      marker.setAttribute("y2", h);
      svg.appendChild(marker);
    }

    el.style.setProperty("--n", data.shiftSlot);
    el.textContent = "";
    el.appendChild(svg);
    if (animate) el.classList.add("is-animated");
    else el.classList.remove("is-animated");
  }

  var prints = Array.prototype.slice.call(document.querySelectorAll(".fingerprint[data-seed]"));
  prints.forEach(function (el) {
    drawFingerprint(el, !reduceMotion && el.hasAttribute("data-animate"));
  });

  if (prints.length && "ResizeObserver" in window) {
    var widths = new WeakMap();
    var ro = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        var w = Math.round(entry.contentRect.width);
        if (widths.has(el) && Math.abs(widths.get(el) - w) > 6) drawFingerprint(el, false);
        widths.set(el, w);
      });
    });
    prints.forEach(function (el) {
      ro.observe(el);
    });
  }

  /* -------------------------------------------- 3. publication panels */

  document.addEventListener("click", function (e) {
    var toggle = e.target.closest(".pub-toggle");
    if (toggle) {
      var panel = document.getElementById(toggle.getAttribute("aria-controls"));
      if (!panel) return;
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      panel.hidden = open;
      return;
    }
    var copy = e.target.closest(".copy-button");
    if (copy) {
      var src = document.getElementById(copy.getAttribute("data-copy"));
      var pre = src && src.querySelector("pre");
      if (!pre) return;
      var done = function () {
        var label = copy.textContent;
        copy.textContent = "Copied";
        setTimeout(function () {
          copy.textContent = label;
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pre.textContent).then(done, function () {});
      } else {
        var range = document.createRange();
        range.selectNodeContents(pre);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try {
          document.execCommand("copy");
          done();
        } catch (err) {}
      }
    }
  });

  /* ------------------------------------------- 4. publications filters */

  var filterForm = document.getElementById("pub-filters");
  if (!filterForm) return;

  var list = document.getElementById("pub-list");
  var pubs = Array.prototype.slice.call(list.querySelectorAll(".pub"));
  var search = document.getElementById("pub-search");
  var yearSel = document.getElementById("pub-year");
  var countEl = document.getElementById("pub-count");
  var resetBtn = document.getElementById("pub-reset");
  var empty = document.getElementById("pub-empty");
  var togglePanel = document.getElementById("filters-toggle");
  var filtersBox = document.getElementById("filters");

  // Topic options group the free-form `projects` tags used in papers.bib.
  var TOPICS = {
    ai: {
      label: "AI and machine learning",
      tags: ["machine-learning", "generative-ai", "computer-vision", "speech-processing", "similarity", "emotion-analysis"],
    },
    security: {
      label: "Cybersecurity",
      tags: ["security", "cybersecurity", "traffic-classification", "cyber-threat-intelligence", "encrypted-traffic"],
    },
    traffic: { label: "Encrypted traffic", tags: ["encrypted-traffic", "traffic-classification"] },
    health: { label: "Healthcare", tags: ["healthcare", "covid-19"] },
    agents: { label: "Multi-agent systems", tags: ["multi-agent-systems", "game-theory"] },
    commerce: { label: "E-commerce and HCI", tags: ["e-commerce", "human-computer-interaction"] },
    education: { label: "Education", tags: ["education"] },
  };
  // Old links used labels such as ?topic=Cybersecurity
  var TOPIC_ALIASES = {
    "ai & ml": "ai",
    ai: "ai",
    "group-ai": "ai",
    cybersecurity: "security",
    "group-security": "security",
    security: "security",
    "encrypted traffic": "traffic",
    "encrypted-traffic": "traffic",
    healthcare: "health",
    "group-healthcare": "health",
    "multi-agent": "agents",
    "group-multiagent": "agents",
    "e-commerce": "commerce",
    "group-ecommerce": "commerce",
    education: "education",
  };

  var records = pubs.map(function (el) {
    var text = ["pub-title", "pub-authors", "pub-venue"].map(function (c) {
      var n = el.querySelector("." + c);
      return n ? n.textContent : "";
    });
    var abs = el.querySelector('[id^="abs-"]');
    var tags = (el.getAttribute("data-projects") || "").split(",").filter(Boolean);
    return {
      el: el,
      li: el.closest("li") || el,
      year: el.getAttribute("data-year"),
      kind: el.getAttribute("data-kind"),
      tags: tags,
      hay: (text.join(" ") + " " + (abs ? abs.textContent : "")).toLowerCase(),
    };
  });

  function inTopic(rec, topic) {
    if (!topic || topic === "all") return true;
    var t = TOPICS[topic];
    if (!t) return true;
    for (var i = 0; i < rec.tags.length; i++) if (t.tags.indexOf(rec.tags[i]) !== -1) return true;
    return false;
  }

  // Counts next to each option (over the whole list, so they never jump around)
  Array.prototype.forEach.call(filterForm.querySelectorAll('input[name="topic"]'), function (input) {
    var c =
      input.value === "all"
        ? records.length
        : records.filter(function (r) {
            return inTopic(r, input.value);
          }).length;
    var out = input.parentNode.querySelector(".count");
    if (out) out.textContent = c;
    if (c === 0 && input.value !== "all") input.parentNode.hidden = true;
  });
  Array.prototype.forEach.call(filterForm.querySelectorAll('input[name="kind"]'), function (input) {
    var c =
      input.value === "all"
        ? records.length
        : records.filter(function (r) {
            return r.kind === input.value;
          }).length;
    var out = input.parentNode.querySelector(".count");
    if (out) out.textContent = c;
    if (c === 0 && input.value !== "all") input.parentNode.hidden = true;
  });

  var years = [];
  records.forEach(function (r) {
    if (r.year && years.indexOf(r.year) === -1) years.push(r.year);
  });
  years
    .sort(function (a, b) {
      return b - a;
    })
    .forEach(function (y) {
      var o = document.createElement("option");
      o.value = y;
      o.textContent = y;
      yearSel.appendChild(o);
    });

  function current() {
    var topic = filterForm.querySelector('input[name="topic"]:checked');
    var kind = filterForm.querySelector('input[name="kind"]:checked');
    return {
      q: search.value.trim().toLowerCase(),
      topic: topic ? topic.value : "all",
      kind: kind ? kind.value : "all",
      year: yearSel.value,
    };
  }

  function apply(updateUrl) {
    var s = current();
    var terms = s.q ? s.q.split(/\s+/) : [];
    var shown = 0;
    records.forEach(function (r) {
      var ok =
        inTopic(r, s.topic) &&
        (s.kind === "all" || r.kind === s.kind) &&
        (s.year === "all" || r.year === s.year) &&
        terms.every(function (t) {
          return r.hay.indexOf(t) !== -1;
        });
      r.li.hidden = !ok;
      if (ok) shown++;
    });
    // Hide year headings with nothing left under them
    Array.prototype.forEach.call(list.querySelectorAll("ol.bibliography"), function (ol) {
      var any = ol.querySelector("li:not([hidden])");
      ol.hidden = !any;
      var h = ol.previousElementSibling;
      if (h && h.matches("h2.bibliography")) h.hidden = !any;
    });

    var active = (s.q ? 1 : 0) + (s.topic !== "all" ? 1 : 0) + (s.kind !== "all" ? 1 : 0) + (s.year !== "all" ? 1 : 0);
    countEl.innerHTML =
      shown === records.length
        ? "<strong>" + records.length + "</strong> publications"
        : "Showing <strong>" + shown + "</strong> of " + records.length + " publications";
    resetBtn.hidden = active === 0;
    empty.hidden = shown !== 0;
    if (togglePanel) togglePanel.textContent = active ? "Filter publications (" + active + " active)" : "Filter publications";

    if (updateUrl && window.history && history.replaceState) {
      var params = new URLSearchParams();
      if (s.q) params.set("q", search.value.trim());
      if (s.topic !== "all") params.set("topic", s.topic);
      if (s.kind !== "all") params.set("type", s.kind);
      if (s.year !== "all") params.set("year", s.year);
      var qs = params.toString();
      history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
    }
  }

  function check(name, value) {
    var input = filterForm.querySelector('input[name="' + name + '"][value="' + value + '"]');
    if (input) input.checked = true;
  }

  // Read initial state from the URL
  var params = new URLSearchParams(location.search);
  if (params.get("q")) search.value = params.get("q");
  if (params.get("topic")) {
    var t = params.get("topic").toLowerCase();
    check("topic", TOPICS[t] ? t : TOPIC_ALIASES[t] || "all");
  }
  if (params.get("type")) {
    var ty = params.get("type").toLowerCase();
    var legacy = { article: "journal", inproceedings: "conference", misc: "preprint" };
    check("kind", legacy[ty] || ty);
  }
  if (params.get("year")) yearSel.value = params.get("year");

  var timer;
  search.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      apply(true);
    }, 120);
  });
  filterForm.addEventListener("change", function () {
    apply(true);
  });
  filterForm.addEventListener("submit", function (e) {
    e.preventDefault();
  });
  resetBtn.addEventListener("click", function () {
    filterForm.reset();
    yearSel.value = "all";
    apply(true);
    search.focus();
  });
  if (togglePanel && filtersBox) {
    togglePanel.addEventListener("click", function () {
      var open = filtersBox.classList.toggle("is-open");
      togglePanel.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  apply(false);
})();
