/*
 * Site behaviour for chenhajaj.github.io (no dependencies).
 *  1. Theme toggle and mobile menu
 *  -  Motion: count-up numbers, charts that grow into view
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
  // Numbers count up and card charts grow when they first scroll into view.
  // Only when the visitor allows motion (the inline script sets .motion-ok).
  if (root.classList.contains("motion-ok") && "IntersectionObserver" in window) {
    var countUp = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      if (!isFinite(target) || target <= 0) return;
      var final = el.textContent;
      var t0 = null;
      var step = function (t) {
        if (t0 === null) t0 = t;
        var k = Math.min(1, (t - t0) / 1100);
        var e = 1 - Math.pow(1 - k, 3);
        el.textContent = k < 1 ? Math.round(target * e).toLocaleString("en-US") : final;
        if (k < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };
    var seen = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          seen.unobserve(el);
          el.classList.add("is-inview");
          if (el.hasAttribute("data-count")) countUp(el);
        });
      },
      { threshold: 0.4 }
    );
    Array.prototype.forEach.call(document.querySelectorAll(".line-card, [data-count]"), function (el) {
      seen.observe(el);
    });
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
