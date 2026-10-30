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

  // The switch is one deliberate change: .theme-switching turns off every
  // colour transition on the page (otherwise some 160 of them start at once,
  // each at its own pace), and where view transitions exist the old and new
  // pages crossfade in 220 ms (_motion.scss). Reduced motion: instant.
  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    labelThemeButton(themeBtn);
    themeBtn.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      var apply = function () {
        root.setAttribute("data-theme", next);
        labelThemeButton(themeBtn);
      };
      var done = function () {
        root.classList.remove("theme-switching");
      };
      root.classList.add("theme-switching");
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      if (root.classList.contains("motion-ok") && document.startViewTransition) {
        var vt = document.startViewTransition(apply);
        vt.finished.then(done, done);
      } else {
        apply();
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(done);
        });
      }
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
    // .is-floating turns the header into a floating pill on wide screens
    // (Aceternity's resizable navbar; styles in _effects.scss).
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      header.classList.toggle("is-floating", window.scrollY > 120);
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

  // Spring-like follower for decorative pointer and scroll tracking: values
  // ease toward their targets each frame, and the loop stops once settled.
  // It writes `transform` straight onto one element (no inherited CSS
  // variables, which would restyle every child on each frame).
  function follower(keys, stiffness, apply) {
    var aim = {};
    var cur = {};
    var running = false;
    keys.forEach(function (k) {
      aim[k] = 0;
      cur[k] = 0;
    });
    var step = function () {
      var moving = false;
      keys.forEach(function (k) {
        var d = aim[k] - cur[k];
        if (Math.abs(d) > 0.001) {
          cur[k] += d * stiffness;
          moving = true;
        } else {
          cur[k] = aim[k];
        }
      });
      apply(cur);
      if (moving) window.requestAnimationFrame(step);
      else running = false;
    };
    return function (target) {
      for (var k in target) aim[k] = target[k];
      if (!running) {
        running = true;
        window.requestAnimationFrame(step);
      }
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
    each(".line-card, .feature, .grant-bars, .career, .review-bars, .spotlight", function (el) {
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
  // left to right in about 0.7 s, on the first page view of a visit only
  // (seen again, it would just delay the sentence). The real text never moves.
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
      chars.push({ el: span, at: 120 + chars.length * 6 + Math.random() * 120 });
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
  if (motionOk && document.querySelector("[data-encrypt]")) {
    var decryptedBefore = false;
    try {
      decryptedBefore = sessionStorage.getItem("decrypted") === "1";
      sessionStorage.setItem("decrypted", "1");
    } catch (e) {}
    if (!decryptedBefore) each("[data-encrypt]", decrypt);
  }

  // Aurora: the hero's colour fields lean toward the pointer and drift as the
  // page scrolls. No timer-driven motion.
  var aurora = document.querySelector(".atlas-aurora");
  if (aurora && motionOk) {
    var heroBox = aurora.parentNode;
    var moveAurora = follower(["x", "y", "s"], 0.08, function (v) {
      aurora.style.transform =
        "translate3d(" + (v.x * 2.5).toFixed(3) + "%," + (v.y * 2 - v.s * 6).toFixed(3) + "%,0) scale(" + (1.04 + v.s * 0.06).toFixed(4) + ")";
    });
    if (finePointer) {
      heroBox.addEventListener(
        "pointermove",
        function (e) {
          var r = heroBox.getBoundingClientRect();
          moveAurora({ x: ((e.clientX - r.left) / r.width) * 2 - 1, y: ((e.clientY - r.top) / r.height) * 2 - 1 });
        },
        { passive: true }
      );
    }
    window.addEventListener(
      "scroll",
      function () {
        moveAurora({ s: clamp01(window.scrollY / Math.max(1, heroBox.offsetHeight)) });
      },
      { passive: true }
    );
  }

  // Spotlight: a soft glow follows the pointer over research cards, and lit
  // dots follow it over the "join the lab" card. Each card gets one
  // decorative layer; the script writes only `transform` on the moving
  // element, once per frame (no CSS variables on the card, which would
  // restyle all of its children). Mouse and trackpad only, motion allowed.
  function spotlight(card, withGrid) {
    var spot = document.createElement("span");
    spot.className = "spot";
    spot.setAttribute("aria-hidden", "true");
    var dot = document.createElement("span");
    dot.className = "spot-dot";
    spot.appendChild(dot);
    var grid = null;
    if (withGrid) {
      grid = document.createElement("span");
      grid.className = "spot-grid";
      dot.appendChild(grid);
    }
    card.insertBefore(spot, card.firstChild);
    var x = 0;
    var y = 0;
    var draw = perFrame(function () {
      dot.style.transform = "translate3d(" + x + "px," + y + "px,0)";
      // The grid stays still relative to the card while its window moves.
      if (grid) grid.style.transform = "translate3d(" + -x + "px," + -y + "px,0)";
    });
    card.addEventListener("pointerenter", function () {
      if (grid) {
        grid.style.width = card.offsetWidth + "px";
        grid.style.height = card.offsetHeight + "px";
      }
    });
    card.addEventListener(
      "pointermove",
      function (e) {
        var r = card.getBoundingClientRect();
        x = Math.round(e.clientX - r.left);
        y = Math.round(e.clientY - r.top);
        draw();
      },
      { passive: true }
    );
  }
  if (finePointer && motionOk) {
    each(".line-card", function (card) {
      spotlight(card, false);
    });
    each(".join-card", function (card) {
      spotlight(card, true);
    });
  }

  // Marquee: the venue list rotates continuously as a linear Web Animation
  // (runs off the main thread) and speeds up while the page scrolls (Magic
  // UI's scroll-based velocity). Hover pauses it, the button stops it
  // (remembered for the next visit), and keyboard focus lays it out flat so
  // every link can be seen.
  var venues = document.querySelector(".venues");
  var marquee = venues && venues.querySelector(".marquee");
  if (marquee && motionOk && marquee.animate) {
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
    var SPEED = 38; // pixels per second
    var stopped = false;
    var hovered = false;
    var anim = null;
    var boost = 0;
    var decaying = false;
    var lastY = window.scrollY;
    var sync = function () {
      if (!anim) return;
      if (stopped || hovered) anim.pause();
      else anim.play();
    };
    var start = function () {
      var half = mList.offsetWidth;
      if (!half) return;
      anim = mTrack.animate([{ transform: "translate3d(0,0,0)" }, { transform: "translate3d(-50%,0,0)" }], {
        duration: (half / SPEED) * 1000,
        iterations: Infinity,
        easing: "linear",
      });
      sentRate = 1;
      sync();
    };
    var setStopped = function (on) {
      stopped = on;
      pauseBtn.setAttribute("aria-pressed", on ? "true" : "false");
      sync();
    };
    try {
      stopped = localStorage.getItem("marquee-paused") === "1";
    } catch (e) {}
    pauseBtn.setAttribute("aria-pressed", stopped ? "true" : "false");
    start();
    pauseBtn.addEventListener("click", function () {
      setStopped(!stopped);
      try {
        localStorage.setItem("marquee-paused", stopped ? "1" : "0");
      } catch (e) {}
    });
    marquee.addEventListener("mouseenter", function () {
      hovered = true;
      sync();
    });
    marquee.addEventListener("mouseleave", function () {
      hovered = false;
      sync();
    });
    // Scrolling adds a little speed (at most 2x, so the strip never races
    // past the reader), which bleeds off in real time: about 90% gone after
    // 0.6 s, however slow the device's frames are. The rate is handed to the
    // compositor at most every 100 ms, not every frame.
    var lastT = 0;
    var lastSent = 0;
    var sentRate = 1;
    var setRate = function (rate, t) {
      if (!anim || rate === sentRate || (rate !== 1 && t - lastSent < 100)) return;
      lastSent = t;
      sentRate = rate;
      if (anim.updatePlaybackRate) anim.updatePlaybackRate(rate);
      else anim.playbackRate = rate;
    };
    var decay = function (t) {
      var dt = lastT ? Math.min(0.25, (t - lastT) / 1000) : 0.016;
      lastT = t;
      boost *= Math.pow(0.02, dt);
      if (boost < 0.05) boost = 0;
      setRate(Math.round((1 + boost) * 20) / 20, t);
      if (boost > 0) window.requestAnimationFrame(decay);
      else {
        decaying = false;
        lastT = 0;
      }
    };
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        boost = Math.min(1, boost + Math.abs(y - lastY) * 0.004);
        lastY = y;
        if (!decaying) {
          decaying = true;
          window.requestAnimationFrame(decay);
        }
      },
      { passive: true }
    );
    marquee.addEventListener("focusin", function () {
      if (anim) anim.cancel();
      anim = null;
      marquee.classList.remove("is-live");
      mCopy.hidden = true;
    });
    marquee.addEventListener("focusout", function (e) {
      if (marquee.contains(e.relatedTarget)) return;
      mCopy.hidden = false;
      marquee.classList.add("is-live");
      start();
    });
  }

  // Blur-fade reveals (Magic UI's blur fade): blocks arrive from a soft blur
  // the first time they scroll into view, a few at a time in order.
  if (motionOk && hasIO) {
    var revealSel = [
      "main .band > .band-head",
      "main .band > .band-body > *",
      "main .rows > li",
      "main .news-list > li",
      "main .person-cards > li",
      "main .alumni-cards > li",
      "main .course-cards > li",
      "main .repo-cards > li",
      "main .award-cards > li",
      "main .page-head > *",
      "main .note-head > *",
      "main .note-body .prose > *",
    ].join(",");
    var reveals = Array.prototype.filter.call(document.querySelectorAll(revealSel), function (el) {
      // Lists reveal item by item, so their containers do not fade as one.
      return (
        !el.closest(".atlas, .atlas-band") &&
        !el.matches(".rows, .news-list, .person-cards, .alumni-cards, .course-cards, .repo-cards, .award-cards") &&
        !el.querySelector(".rows, .news-list, .person-cards, .alumni-cards, .course-cards, .repo-cards, .award-cards")
      );
    });
    // Phones and touch screens get a plain 240 ms fade (CSS), with no
    // stagger, started a fifth of a screen before the block arrives, so text
    // is never still fading while it is being read. With a mouse, blocks fade
    // in from a soft blur, a few at a time, as they enter.
    var revealObs = new IntersectionObserver(
      function (entries) {
        var batch = 0;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          revealObs.unobserve(entry.target);
          if (finePointer) entry.target.style.setProperty("--d", String(Math.min(batch++, 6)));
          entry.target.classList.add("is-shown");
        });
      },
      { threshold: 0, rootMargin: finePointer ? "0px 0px -6% 0px" : "0px 0px 20% 0px" }
    );
    // Content already on screen, or above it, never "arrives" again: not on
    // load, not after a jump to #section, and not on research pages while the
    // card picture is growing into the header (the view transition).
    var fold = window.innerHeight;
    var target = null;
    try {
      target = location.hash && document.querySelector(decodeURIComponent(location.hash));
    } catch (e) {}
    if (target) fold = Math.max(fold, target.getBoundingClientRect().top + fold * 1.25);
    // All reads first, then all writes (one layout, not one per block).
    var boxes = reveals.map(function (el) {
      return el.getBoundingClientRect();
    });
    reveals.forEach(function (el, i) {
      if (boxes[i].top < fold) return;
      el.classList.add("reveal");
      if (finePointer && boxes[i].height > 400) el.classList.add("is-tall");
      revealObs.observe(el);
    });
  }

  // Flip words (Aceternity): [data-flip] runs once through its words when it
  // is fully in view (under five seconds) and rests on the last one. Every
  // word sits in the same grid cell, so the phrase keeps the width of the
  // longest word and nothing around it moves; it ends its sentence, so the
  // reserved room reads as the end of the line. Screen readers get the final
  // phrase only.
  if (motionOk && hasIO) {
    each("[data-flip]", function (el) {
      var words = el.getAttribute("data-flip").split("|");
      var endEl = el.querySelector(".flip-end");
      var end = endEl ? endEl.textContent : "";
      var final = words[words.length - 1];
      el.textContent = "";
      var sr = document.createElement("span");
      sr.className = "visually-hidden";
      sr.textContent = final + end;
      var stack = document.createElement("span");
      stack.className = "flip-stack";
      stack.setAttribute("aria-hidden", "true");
      var spans = words.map(function (w) {
        var s = document.createElement("span");
        s.className = "flip-word";
        s.textContent = w;
        if (end) {
          var e = document.createElement("span");
          e.className = "flip-end";
          e.textContent = end;
          s.appendChild(e);
        }
        stack.appendChild(s);
        return s;
      });
      var show = function (i) {
        spans.forEach(function (s, j) {
          s.classList.toggle("is-on", i === j);
        });
      };
      show(words.length - 1);
      el.append(sr, stack);
      var watch = new IntersectionObserver(
        function (entries) {
          if (!entries[0].isIntersecting) return;
          watch.disconnect();
          el.classList.add("is-running");
          words.forEach(function (w, i) {
            setTimeout(function () {
              show(i);
              if (i < words.length - 1) el.setAttribute("data-step", String(i));
              else el.removeAttribute("data-step");
            }, i * 1100);
          });
        },
        { threshold: 1 }
      );
      watch.observe(el);
    });
  }

  // Tracing beam (Aceternity) beside research notes: a fill element scales
  // down the margin with reading (transform only).
  var tracings = document.querySelectorAll(".tracing");
  if (tracings.length && motionOk) {
    var fills = Array.prototype.map.call(tracings, function (t) {
      var fill = document.createElement("span");
      fill.className = "trace-fill";
      fill.setAttribute("aria-hidden", "true");
      t.appendChild(fill);
      return fill;
    });
    var drawTracing = perFrame(function () {
      var line = window.innerHeight * 0.55;
      Array.prototype.forEach.call(tracings, function (t, i) {
        var r = t.getBoundingClientRect();
        fills[i].style.transform = "scaleY(" + clamp01((line - r.top) / Math.max(1, r.height)).toFixed(3) + ")";
      });
    });
    window.addEventListener("scroll", drawTracing, { passive: true });
    window.addEventListener("resize", drawTracing);
    drawTracing();
  }

  // Scroll timeline: the rail fills and dots light as entries pass the
  // reading line (62% down the window).
  // Per scroll frame it reads one box per timeline, then writes one
  // transform per timeline; the dots are lit by an IntersectionObserver, so
  // no row is measured while scrolling.
  var timelines = Array.prototype.slice.call(document.querySelectorAll(".timeline"));
  if (timelines.length && motionOk) {
    var tlFills = timelines.map(function (tl) {
      var fill = document.createElement("span");
      fill.className = "timeline-fill";
      fill.setAttribute("aria-hidden", "true");
      tl.appendChild(fill);
      tl.classList.add("is-live");
      return fill;
    });
    var drawTimelines = perFrame(function () {
      var line = window.innerHeight * 0.62;
      var boxes = timelines.map(function (tl) {
        return tl.getBoundingClientRect();
      });
      boxes.forEach(function (r, i) {
        var p = clamp01((line - r.top) / Math.max(1, r.height)).toFixed(3);
        if (tlFills[i]._p === p) return; // off screen and unchanged
        tlFills[i]._p = p;
        tlFills[i].style.transform = "scaleY(" + p + ")";
      });
    });
    window.addEventListener("scroll", drawTimelines, { passive: true });
    window.addEventListener("resize", drawTimelines);
    drawTimelines();
    if (hasIO) {
      var lightObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var top = entry.rootBounds ? entry.rootBounds.top : 0;
            entry.target.classList.toggle("is-lit", entry.isIntersecting || entry.boundingClientRect.bottom <= top);
          });
        },
        { rootMargin: "0px 0px -38% 0px" }
      );
      timelines.forEach(function (tl) {
        Array.prototype.forEach.call(tl.querySelectorAll(":scope > .entry-row"), function (row) {
          lightObs.observe(row);
        });
      });
    }
  }

  /* -------------------------------------------- 2. publication panels */

  // "Copy BibTeX" swaps to "Copied" in place: both labels share one grid
  // cell, so the button keeps its width and the row does not shift. A
  // polite live region says it for screen readers.
  each(".copy-button", function (btn) {
    var a = document.createElement("span");
    a.className = "cb-a";
    a.textContent = btn.textContent.trim();
    var b = document.createElement("span");
    b.className = "cb-b";
    b.setAttribute("aria-hidden", "true");
    b.textContent = "Copied";
    btn.textContent = "";
    btn.append(a, b);
  });
  var copyStatus = null;
  function announce(text) {
    if (!copyStatus) {
      copyStatus = document.createElement("span");
      copyStatus.className = "visually-hidden";
      copyStatus.setAttribute("role", "status");
      document.body.appendChild(copyStatus);
    }
    copyStatus.textContent = "";
    setTimeout(function () {
      copyStatus.textContent = text;
    }, 50);
  }

  document.addEventListener("click", function (e) {
    var toggle = e.target.closest(".pub-toggle");
    if (toggle) {
      var panel = document.getElementById(toggle.getAttribute("aria-controls"));
      if (!panel) return;
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      panel.hidden = open;
      // Opening settles in over 180 ms; closing is instant.
      panel.classList.remove("is-entering");
      if (!open && motionOk) {
        void panel.offsetWidth;
        panel.classList.add("is-entering");
      }
      return;
    }
    var copy = e.target.closest(".copy-button");
    if (copy) {
      var src = document.getElementById(copy.getAttribute("data-copy"));
      var pre = src && src.querySelector("pre");
      if (!pre) return;
      var done = function () {
        clearTimeout(copy._t);
        copy.classList.add("is-copied");
        announce("BibTeX copied to the clipboard");
        copy._t = setTimeout(function () {
          copy.classList.remove("is-copied");
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
      mapEl.dispatchEvent(new CustomEvent("papermap:filter", { detail: { keys: shown === records.length ? null : keys, year: s.year } }));
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
    var legacy = { article: "journal", inproceedings: "conference", misc: "preprint", workshop: "short", abstract: "short" };
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

// Filter chips: News (by kind) and Teaching (by topic). Each group of
// .filter-chip buttons with data-filter="<attr>" shows only the items whose
// data-<attr> matches; sections left empty are hidden; the count is announced.
(function () {
  var groups = document.querySelectorAll("[data-filter-group]");
  Array.prototype.forEach.call(groups, function (group) {
    var attr = group.getAttribute("data-filter-group");
    var scope = document.querySelector(group.getAttribute("data-filter-scope")) || document;
    var items = scope.querySelectorAll(group.getAttribute("data-filter-items"));
    var sections = scope.querySelectorAll(group.getAttribute("data-filter-sections") || "_none_");
    var chips = group.querySelectorAll(".filter-chip");
    var status = group.querySelector("[aria-live]");
    var motion = document.documentElement.classList.contains("motion-ok");

    function apply(value) {
      var shown = 0;
      Array.prototype.forEach.call(items, function (el) {
        var match = !value || (el.getAttribute("data-" + attr) || "").split(" ").indexOf(value) !== -1;
        var wasHidden = el.hidden;
        el.hidden = !match;
        if (match) {
          shown++;
          if (wasHidden && motion) {
            el.classList.remove("is-entering");
            void el.offsetWidth;
            el.classList.add("is-entering");
          }
        }
      });
      Array.prototype.forEach.call(sections, function (sec) {
        sec.hidden = !sec.querySelector(group.getAttribute("data-filter-items") + ":not([hidden])");
      });
      Array.prototype.forEach.call(chips, function (c) {
        c.setAttribute("aria-pressed", (c.getAttribute("data-value") || "") === value ? "true" : "false");
      });
      if (status) status.textContent = shown + (shown === 1 ? " item shown" : " items shown");
    }

    Array.prototype.forEach.call(chips, function (c) {
      c.addEventListener("click", function () {
        apply(c.getAttribute("data-value") || "");
      });
    });
  });
})();
