/*
 * Site behaviour for chenhajaj.github.io (no dependencies).
 *  1. Theme toggle and mobile menu
 *  -  Motion and effects: number ticker, encrypted text, aurora, spotlight
 *     cards, rotating venue strip, scroll timeline (21st.dev ideas)
 *  2. Publication panels (abstract / BibTeX) and copy buttons
 *  3. Publications page filters
 */
(function () {
  "use strict";

  var root = document.documentElement;

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

  // The name in the header always leads to the top of the home page. On the
  // home page itself it scrolls up in place instead of reloading.
  var wordmark = document.querySelector(".wordmark");
  if (wordmark && document.body.classList.contains("page-home")) {
    wordmark.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      var smooth = !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      if (window.history && history.replaceState && location.hash) history.replaceState(null, "", location.pathname + location.search);
      var name = document.getElementById("hero-name");
      if (name) {
        name.setAttribute("tabindex", "-1");
        name.focus({ preventScroll: true });
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

  /* ----------------------------------------------------------- motion */
  // Effects ported from 21st.dev ideas (see _sass/signal/_effects.scss).
  // Motion runs only when the visitor allows it (the inline script in the
  // layout sets .motion-ok); content is always readable without it.
  var motionOk = root.classList.contains("motion-ok");
  var finePointer = !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  var hasIO = "IntersectionObserver" in window;

  function each(sel, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(sel), fn);
  }

  function clamp01(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }

  // Run fn at most once per frame.
  function perFrame(fn) {
    var queued = false;
    return function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        fn();
      });
    };
  }

  // Number ticker: a number counts up once it is fully on screen. Screen
  // readers get the final value; the moving copy is hidden from them, and its
  // width is reserved so nothing beside it moves.
  function prepareTicker(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (!isFinite(target) || target <= 0) return null;
    var final = el.textContent.trim();
    el.style.minWidth = el.offsetWidth + "px";
    el.textContent = "";
    var sr = document.createElement("span");
    sr.className = "visually-hidden";
    sr.textContent = final;
    var shown = document.createElement("span");
    shown.setAttribute("aria-hidden", "true");
    shown.textContent = "0";
    el.append(sr, shown);
    return function run() {
      var t0 = null;
      var step = function (t) {
        if (t0 === null) t0 = t;
        var k = Math.min(1, (t - t0) / 1600);
        var e = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        shown.textContent = k < 1 ? Math.round(target * e).toLocaleString("en-US") : final;
        if (k < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };
  }

  if (motionOk && hasIO) {
    var seen = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          seen.unobserve(entry.target);
          entry.target.classList.add("is-inview");
        });
      },
      { threshold: 0.35 }
    );
    each(".line-card, .feature", function (el) {
      seen.observe(el);
    });

    var full = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          full.unobserve(entry.target);
          if (entry.target._tick) entry.target._tick();
        });
      },
      { threshold: 1 }
    );
    each("[data-count]", function (el) {
      el._tick = prepareTicker(el);
      if (el._tick) full.observe(el);
    });
  }

  // Encrypted text: [data-encrypt] scrambles into cipher glyphs and decrypts
  // left to right, once, in under two seconds. The real text never moves.
  function decrypt(el) {
    var text = el.textContent.replace(/\s+/g, " ").trim();
    var GLYPHS = "01<>/{}[]#%&*+=$@ABCDEF0123456789";
    var pick = function () {
      return GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
    };
    var sr = document.createElement("span");
    sr.className = "visually-hidden";
    sr.textContent = text;
    var shown = document.createElement("span");
    shown.setAttribute("aria-hidden", "true");
    var chars = [];
    for (var i = 0; i < text.length; i++) {
      var c = text.charAt(i);
      if (c === " ") {
        shown.appendChild(document.createTextNode(" "));
        continue;
      }
      var span = document.createElement("span");
      span.className = "enc-ch";
      span.textContent = c;
      span.setAttribute("data-g", pick());
      shown.appendChild(span);
      chars.push({ el: span, at: 220 + chars.length * 18 + Math.random() * 240 });
    }
    el.textContent = "";
    el.append(sr, shown);
    var t0 = null;
    var last = 0;
    var step = function (t) {
      if (t0 === null) t0 = t;
      var dt = t - t0;
      var shuffle = t - last > 55;
      if (shuffle) last = t;
      var left = 0;
      chars.forEach(function (ch) {
        if (!ch.el.hasAttribute("data-g")) return;
        if (dt >= ch.at) ch.el.removeAttribute("data-g");
        else {
          left++;
          if (shuffle) ch.el.setAttribute("data-g", pick());
        }
      });
      if (left) window.requestAnimationFrame(step);
      else el.textContent = text;
    };
    window.requestAnimationFrame(step);
  }
  if (motionOk) each("[data-encrypt]", decrypt);

  // Aurora: the hero's colour fields lean toward the pointer and drift as the
  // page scrolls. No timer-driven motion.
  var atlas = document.querySelector(".atlas:not(.atlas-band)");
  if (atlas && motionOk) {
    if (finePointer) {
      atlas.addEventListener(
        "pointermove",
        function (e) {
          var r = atlas.getBoundingClientRect();
          atlas.style.setProperty("--px", ((((e.clientX - r.left) / r.width) * 2 - 1) * 1).toFixed(3));
          atlas.style.setProperty("--py", ((((e.clientY - r.top) / r.height) * 2 - 1) * 1).toFixed(3));
        },
        { passive: true }
      );
    }
    var auroraScroll = perFrame(function () {
      atlas.style.setProperty("--sy", clamp01(window.scrollY / Math.max(1, atlas.offsetHeight)).toFixed(3));
    });
    window.addEventListener("scroll", auroraScroll, { passive: true });
  }

  // Spotlight cards: a glow and lit border follow the pointer.
  if (finePointer) {
    document.addEventListener(
      "pointermove",
      function (e) {
        var card = e.target.closest && e.target.closest(".line-card");
        if (!card) return;
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", Math.round(e.clientX - r.left) + "px");
        card.style.setProperty("--my", Math.round(e.clientY - r.top) + "px");
      },
      { passive: true }
    );
  }

  // Marquee: the venue list rotates continuously and speeds up while the page
  // scrolls (Magic UI's scroll-based velocity). Hover pauses it, the button
  // stops it (remembered for the next visit), and keyboard focus lays it out
  // flat so every link can be seen.
  var venues = document.querySelector(".venues");
  var marquee = venues && venues.querySelector(".marquee");
  if (marquee && motionOk) {
    var mTrack = marquee.querySelector(".marquee-track");
    var mList = mTrack.querySelector(".marquee-list");
    var mCopy = mList.cloneNode(true);
    mCopy.setAttribute("aria-hidden", "true");
    mCopy.removeAttribute("aria-labelledby");
    Array.prototype.forEach.call(mCopy.querySelectorAll("a"), function (a) {
      a.setAttribute("tabindex", "-1");
    });
    mTrack.appendChild(mCopy);
    marquee.classList.add("is-live");
    venues.classList.add("has-marquee");

    var pauseBtn = venues.querySelector(".marquee-pause");
    var stopped = false;
    var hovered = false;
    var flat = false;
    var offset = 0;
    var boost = 0;
    var lastY = window.scrollY;
    var lastT = null;
    var BASE = 38; // pixels per second
    var setStopped = function (on) {
      stopped = on;
      pauseBtn.setAttribute("aria-pressed", on ? "true" : "false");
    };
    try {
      setStopped(localStorage.getItem("marquee-paused") === "1");
    } catch (e) {
      setStopped(false);
    }
    pauseBtn.addEventListener("click", function () {
      setStopped(!stopped);
      try {
        localStorage.setItem("marquee-paused", stopped ? "1" : "0");
      } catch (e) {}
    });
    marquee.addEventListener("mouseenter", function () {
      hovered = true;
    });
    marquee.addEventListener("mouseleave", function () {
      hovered = false;
    });
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        boost = Math.min(900, boost + Math.abs(y - lastY) * 6);
        lastY = y;
      },
      { passive: true }
    );
    var spin = function (t) {
      if (lastT === null) lastT = t;
      var dt = Math.min(0.1, (t - lastT) / 1000);
      lastT = t;
      boost *= Math.pow(0.04, dt);
      var half = mList.offsetWidth;
      if (!stopped && !hovered && !flat && half && !document.hidden) {
        offset = (offset + (BASE + boost) * dt) % half;
        marquee.style.setProperty("--mq-x", (-offset).toFixed(1) + "px");
      }
      window.requestAnimationFrame(spin);
    };
    window.requestAnimationFrame(spin);
    marquee.addEventListener("focusin", function () {
      flat = true;
      marquee.classList.remove("is-live");
      mCopy.hidden = true;
    });
    marquee.addEventListener("focusout", function (e) {
      if (marquee.contains(e.relatedTarget)) return;
      flat = false;
      mCopy.hidden = false;
      marquee.classList.add("is-live");
    });
  }

  // Scroll timeline: the rail fills and dots light as entries pass the
  // reading line (62% down the window).
  var timelines = document.querySelectorAll(".timeline");
  if (timelines.length && motionOk) {
    var drawTimelines = perFrame(function () {
      var line = window.innerHeight * 0.62;
      Array.prototype.forEach.call(timelines, function (tl) {
        var r = tl.getBoundingClientRect();
        tl.style.setProperty("--p", clamp01((line - r.top) / Math.max(1, r.height)).toFixed(3));
        Array.prototype.forEach.call(tl.children, function (row) {
          row.classList.toggle("is-lit", row.getBoundingClientRect().top + 24 < line);
        });
      });
    });
    Array.prototype.forEach.call(timelines, function (tl) {
      tl.classList.add("is-live");
    });
    window.addEventListener("scroll", drawTimelines, { passive: true });
    window.addEventListener("resize", drawTimelines);
    drawTimelines();
  }

  /* -------------------------------------------- 2. publication panels */

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

  /* ------------------------------------------- 3. publications filters */

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

  // Research lines come from data-lines on each paper (set in _layouts/bib.liquid
  // from _data/research_lines.yml). Old links used ?topic=...; map them to lines.
  var TOPIC_TO_LINE = {
    traffic: "traffic",
    "encrypted traffic": "traffic",
    "encrypted-traffic": "traffic",
    security: "adversarial",
    cybersecurity: "adversarial",
    "group-security": "adversarial",
    health: "medical",
    healthcare: "medical",
    "group-healthcare": "medical",
    agents: "incentives",
    "multi-agent": "incentives",
    "group-multiagent": "incentives",
    commerce: "similarity",
    "e-commerce": "similarity",
    "group-ecommerce": "similarity",
    education: "learning",
  };
  var mapEl = document.getElementById("pubs-map");

  var records = pubs.map(function (el) {
    var text = ["pub-title", "pub-authors", "pub-venue"].map(function (c) {
      var n = el.querySelector("." + c);
      return n ? n.textContent : "";
    });
    var abs = el.querySelector('[id^="abs-"]');
    return {
      el: el,
      key: (el.id || "").replace(/^pub-/, ""),
      line: el.getAttribute("data-line") || "other",
      lines: (el.getAttribute("data-lines") || "").split(",").filter(Boolean),
      li: el.closest("li") || el,
      year: el.getAttribute("data-year"),
      kind: el.getAttribute("data-kind"),
      hay: (text.join(" ") + " " + (abs ? abs.textContent : "")).toLowerCase(),
    };
  });

  function inLine(rec, line) {
    if (!line || line === "all") return true;
    if (line === "other") return rec.line === "other";
    return rec.lines.indexOf(line) !== -1;
  }

  // Counts next to each option (over the whole list, so they never jump around)
  Array.prototype.forEach.call(filterForm.querySelectorAll('input[name="line"]'), function (input) {
    var c =
      input.value === "all"
        ? records.length
        : records.filter(function (r) {
            return inLine(r, input.value);
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
    var line = filterForm.querySelector('input[name="line"]:checked');
    var kind = filterForm.querySelector('input[name="kind"]:checked');
    return {
      q: search.value.trim().toLowerCase(),
      line: line ? line.value : "all",
      kind: kind ? kind.value : "all",
      year: yearSel.value,
    };
  }

  function apply(updateUrl) {
    var s = current();
    var terms = s.q ? s.q.split(/\s+/) : [];
    var shown = 0;
    var keys = [];
    records.forEach(function (r) {
      var ok =
        inLine(r, s.line) &&
        (s.kind === "all" || r.kind === s.kind) &&
        (s.year === "all" || r.year === s.year) &&
        terms.every(function (t) {
          return r.hay.indexOf(t) !== -1;
        });
      r.li.hidden = !ok;
      if (ok) {
        shown++;
        keys.push(r.key);
      }
    });
    if (mapEl) {
      mapEl.dispatchEvent(
        new CustomEvent("papermap:filter", { detail: { keys: shown === records.length ? null : keys, year: s.year } })
      );
    }
    // Hide year headings with nothing left under them
    Array.prototype.forEach.call(list.querySelectorAll("ol.bibliography"), function (ol) {
      var any = ol.querySelector("li:not([hidden])");
      ol.hidden = !any;
      var h = ol.previousElementSibling;
      if (h && h.matches("h2.bibliography")) h.hidden = !any;
    });

    var active = (s.q ? 1 : 0) + (s.line !== "all" ? 1 : 0) + (s.kind !== "all" ? 1 : 0) + (s.year !== "all" ? 1 : 0);
    // Built with DOM nodes, not innerHTML, so no text is ever parsed as HTML.
    var strong = document.createElement("strong");
    countEl.textContent = "";
    if (shown === records.length) {
      strong.textContent = String(records.length);
      countEl.append(strong, " publications");
    } else {
      strong.textContent = String(shown);
      countEl.append("Showing ", strong, " of " + records.length + " publications");
    }
    resetBtn.hidden = active === 0;
    empty.hidden = shown !== 0;
    if (togglePanel) togglePanel.textContent = active ? "Filter publications (" + active + " active)" : "Filter publications";

    if (updateUrl && window.history && history.replaceState) {
      var params = new URLSearchParams();
      if (s.q) params.set("q", search.value.trim());
      if (s.line !== "all") params.set("line", s.line);
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
  if (params.get("line")) check("line", params.get("line").toLowerCase());
  else if (params.get("topic")) check("line", TOPIC_TO_LINE[params.get("topic").toLowerCase()] || "all");
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
  // Clicking a year column in the map filters by that year (or clears it).
  document.addEventListener("papermap:year", function (e) {
    var yr = e.detail && e.detail.year;
    if (!yr) return;
    yearSel.value = yr === "all" || yearSel.querySelector('option[value="' + yr + '"]') ? yr : "all";
    apply(true);
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
