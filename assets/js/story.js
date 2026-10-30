/*
 * The lab, year by year: a scroll-driven replay of the paper map.
 * Markup in _includes/story.liquid; data from <script id="research-data">
 * (papers, co-authors, graduates) and <script id="story-milestones">.
 *
 * The section is tall and its panel is sticky, so scrolling through it moves a
 * year marker from the first paper to now. Columns fill square by square, the
 * newest year glows, counters climb and captions mark what happened.
 * Without motion the panel shows the finished picture (CSS keeps it short).
 */
(function () {
  "use strict";

  var section = document.querySelector("[data-story]");
  var dataEl = document.getElementById("research-data");
  if (!section || !dataEl) return;

  var data;
  try {
    data = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }
  var milestones = [];
  try {
    milestones = JSON.parse(document.getElementById("story-milestones").textContent);
  } catch (e) {}

  var root = document.documentElement;
  var animate = root.classList.contains("motion-ok");
  var canvas = section.querySelector("canvas");
  var ctx = canvas && canvas.getContext("2d");
  if (!ctx) return;

  var yearEl = section.querySelector(".story-year");
  var countEls = {};
  Array.prototype.forEach.call(section.querySelectorAll("[data-count]"), function (el) {
    countEls[el.getAttribute("data-count")] = el;
  });
  var captionsEl = section.querySelector(".story-captions");
  var hintEl = section.querySelector(".story-hint");

  // ---- data by year ---------------------------------------------------
  var thisYear = new Date().getFullYear();
  var first = data.first_year;
  var last = Math.min(data.last_year, thisYear); // accepted papers for next year join this one
  var years = [];
  for (var y = first; y <= last; y++) years.push(y);

  var order = data.lines.map(function (l) {
    return l.key;
  });
  order.push("other");
  var names = { other: data.other.name };
  var colors = { other: data.other.color[1] };
  data.lines.forEach(function (l) {
    names[l.key] = l.name;
    colors[l.key] = l.color[1];
  });

  var refereed = { journal: 1, conference: 1 };
  var columns = {};
  years.forEach(function (yy) {
    columns[yy] = [];
  });
  data.papers.forEach(function (p) {
    var yy = Math.min(Math.max(p.year, first), last);
    columns[yy].push({ line: p.line || "other", solid: !!refereed[p.kind] });
  });
  // Refereed papers at the bottom, then by line, so colours stack in bands.
  years.forEach(function (yy) {
    columns[yy].sort(function (a, b) {
      return b.solid - a.solid || order.indexOf(a.line) - order.indexOf(b.line);
    });
  });
  var maxCol = years.reduce(function (m, yy) {
    return Math.max(m, columns[yy].length);
  }, 1);

  // Events: career milestones plus the first paper in each research line.
  var events = milestones.map(function (m) {
    return { year: m.year, text: m.text, line: null };
  });
  var seen = {};
  years.forEach(function (yy) {
    columns[yy].forEach(function (p) {
      if (p.line !== "other" && !seen[p.line]) {
        seen[p.line] = true;
        events.push({ year: yy, text: "First paper in " + names[p.line], line: p.line });
      }
    });
  });
  events.sort(function (a, b) {
    return a.year - b.year || (a.line ? 1 : 0) - (b.line ? 1 : 0);
  });

  function countUpTo(yy) {
    var papers = 0;
    years.forEach(function (c) {
      if (c <= yy) papers += columns[c].length;
    });
    var people = data.people.filter(function (p) {
      return p.first && Math.min(p.first, last) <= yy;
    }).length;
    var grads = (data.graduates || []).filter(function (g) {
      return g <= yy;
    }).length;
    return { papers: papers, people: people, grads: grads };
  }

  // ---- drawing ----------------------------------------------------------
  var W = 0,
    H = 0,
    dpr = 1,
    cell = 10,
    gap = 3,
    colW = 14,
    left = 0,
    base = 0;

  function resize() {
    var box = canvas.parentNode.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    W = box.width;
    H = box.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var axis = 26;
    var byWidth = W / years.length;
    var byHeight = (H - axis - 8) / maxCol;
    var pitch = Math.max(6, Math.min(byWidth, byHeight, 34));
    gap = Math.max(2, Math.round(pitch * 0.18));
    cell = pitch - gap;
    colW = pitch;
    left = (W - colW * years.length) / 2;
    base = H - axis;
  }

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function draw(pos) {
    // pos: years since `first`, fractional (0 .. years.length)
    ctx.clearRect(0, 0, W, H);
    ctx.font = "500 12px Archivo, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    years.forEach(function (yy, i) {
      var x = left + i * colW + gap / 2;
      var col = columns[yy];
      var shown = pos - i; // > 1: whole column, 0..1: filling, < 0: not yet
      var current = shown > 0 && shown < 1.6;
      // year labels: every few years, the current year always
      var label = i === 0 || (yy % 5 === 0 && last - yy >= 2) || yy === last || (current && shown < 1);
      if (label) {
        ctx.fillStyle = shown > 0 ? "rgba(214, 222, 255, 0.9)" : "rgba(214, 222, 255, 0.35)";
        ctx.fillText("’" + String(yy).slice(2), x + cell / 2, base + 8);
      }
      if (shown <= 0) return;
      var n = col.length;
      var k = Math.min(n, shown * n); // squares visible, fractional
      for (var j = 0; j < n; j++) {
        var t = Math.max(0, Math.min(1, k - j)); // this square's arrival 0..1
        if (t <= 0) break;
        var e = animate ? easeOut(t) : 1;
        var size = cell * (0.4 + 0.6 * e);
        var cx = x + cell / 2;
        var cy = base - j * colW - cell / 2 - (1 - e) * colW * 1.5;
        var p = col[j];
        ctx.globalAlpha = e;
        var c = colors[p.line] || colors.other;
        if (current && t > 0) {
          ctx.shadowColor = c;
          ctx.shadowBlur = 10 * (1.6 - Math.min(shown, 1.6));
        } else {
          ctx.shadowBlur = 0;
        }
        var r = Math.min(3, size / 4);
        roundRect(cx - size / 2, cy - size / 2, size, size, r);
        if (p.solid) {
          ctx.fillStyle = c;
          ctx.fill();
        } else {
          ctx.lineWidth = Math.max(1.5, size / 7);
          ctx.strokeStyle = c;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    });
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // ---- text ---------------------------------------------------------------
  var lastYearShown = null;
  function setText(yy, final) {
    if (yy === lastYearShown && !final) return;
    lastYearShown = yy;
    yearEl.textContent = final ? "Today" : String(yy);
    var c = countUpTo(final ? last : yy);
    if (countEls.papers) countEls.papers.textContent = c.papers;
    if (countEls.people) countEls.people.textContent = c.people;
    if (countEls.grads) countEls.grads.textContent = c.grads;
    // the last three events up to this year, newest first
    var past = events.filter(function (ev) {
      return ev.year <= yy;
    });
    var show = past.slice(-3).reverse();
    captionsEl.textContent = "";
    show.forEach(function (ev, i) {
      var li = document.createElement("li");
      if (i === 0 && ev.year === yy) li.className = "is-new";
      if (ev.line) li.style.setProperty("--c", colors[ev.line]);
      var yr = document.createElement("span");
      yr.className = "num";
      yr.textContent = ev.year;
      li.appendChild(yr);
      li.appendChild(document.createTextNode(" " + ev.text));
      captionsEl.appendChild(li);
    });
  }

  // ---- scroll -------------------------------------------------------------
  var queued = false;
  function progress() {
    if (!animate) return 1;
    var rect = section.getBoundingClientRect();
    var travel = section.offsetHeight - window.innerHeight;
    if (travel <= 0) return 1;
    return Math.max(0, Math.min(1, -rect.top / travel));
  }

  var lastPos = null;
  function frame(force) {
    queued = false;
    var p = progress();
    // the last 8% of travel rests on the finished picture
    var q = Math.min(1, p / 0.92);
    var pos = q * years.length;
    if (pos === lastPos && force !== true) return; // nothing changed (e.g. before or after the section)
    lastPos = pos;
    var yy = Math.min(last, first + Math.floor(Math.min(pos, years.length - 0.001)));
    draw(pos);
    setText(yy, q >= 1);
    if (hintEl) hintEl.classList.toggle("is-gone", p > 0.04);
  }

  function request() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(frame);
  }

  resize();
  frame(true);
  // Listen to scrolling only while the section is on (or near) the screen;
  // far away the picture cannot change, so nothing is redrawn.
  if (animate) {
    var listening = false;
    var listen = function (on) {
      if (on === listening) return;
      listening = on;
      if (on) {
        window.addEventListener("scroll", request, { passive: true });
        request();
      } else {
        window.removeEventListener("scroll", request);
        request(); // one last frame so the picture rests at the right end
      }
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (entries) {
          listen(entries[entries.length - 1].isIntersecting);
        },
        { rootMargin: "50% 0px 50% 0px" }
      ).observe(section);
    } else {
      listen(true);
    }
  }
  if ("ResizeObserver" in window) {
    new ResizeObserver(function () {
      resize();
      lastYearShown = null;
      frame(true);
    }).observe(canvas.parentNode);
  } else {
    window.addEventListener("resize", function () {
      resize();
      frame(true);
    });
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      draw(progress() >= 1 ? years.length : Math.min(1, progress() / 0.92) * years.length);
    });
  }
})();
