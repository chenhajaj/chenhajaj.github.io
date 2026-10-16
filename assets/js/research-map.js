/*
 * Research map on the home page: one square per paper, by year, coloured by
 * research line. Data is inlined in <script id="research-data"> by
 * _plugins/research-data.rb. No dependencies.
 *
 * - squares drop into their year column once on load (skipped for
 *   prefers-reduced-motion)
 * - hover or tap a square to see the paper; click (or tap again) to open it
 * - legend chips highlight one research line
 */
(function () {
  "use strict";

  var el = document.getElementById("research-map");
  var dataEl = document.getElementById("research-data");
  if (!el || !dataEl) return;

  var data;
  try {
    data = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }

  var canvas = el.querySelector("canvas");
  var ctx = canvas && canvas.getContext("2d");
  if (!ctx) return;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pubsUrl = el.getAttribute("data-pubs") || "/publications/";
  var LABEL = "#c3cbef";
  var RULE = "rgba(214, 222, 255, 0.18)";

  var order = data.lines.map(function (l) {
    return l.key;
  });
  order.push("other");
  var colors = { other: data.other.color[1] };
  var names = { other: data.other.name };
  data.lines.forEach(function (l) {
    colors[l.key] = l.color[1];
    names[l.key] = l.name;
  });

  var years = [];
  for (var y = data.first_year; y <= data.last_year; y++) years.push(y);
  var byYear = {};
  data.papers.forEach(function (p) {
    (byYear[p.year] = byYear[p.year] || []).push(p);
  });
  years.forEach(function (yr) {
    (byYear[yr] = byYear[yr] || []).sort(function (a, b) {
      return order.indexOf(a.line) - order.indexOf(b.line) || (a.title < b.title ? -1 : 1);
    });
  });
  var maxCount = Math.max.apply(
    null,
    years.map(function (yr) {
      return byYear[yr].length;
    })
  );

  var squares = [];
  var W = 0;
  var H = 0;
  var labelH = 24;
  var colW = 0;
  var hover = null;
  var focusLine = null;
  var previewLine = null;
  var startTime = null;
  var animDone = reduceMotion;
  var tip = null;

  function layout() {
    W = el.clientWidth;
    H = el.clientHeight;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    colW = W / years.length;
    var perRow = colW >= 44 ? 2 : 1;
    var gap = colW >= 44 ? 4 : 3;
    var rows = Math.ceil(maxCount / perRow);
    var size = Math.min(24, (colW * 0.8 - (perRow - 1) * gap) / perRow, (H - labelH - 6 - (rows - 1) * gap) / rows);
    size = Math.max(5, Math.floor(size));

    squares = [];
    years.forEach(function (yr, i) {
      var list = byYear[yr];
      var blockW = perRow * size + (perRow - 1) * gap;
      var x0 = Math.round(colW * (i + 0.5) - blockW / 2);
      list.forEach(function (p, k) {
        var row = Math.floor(k / perRow);
        var col = k % perRow;
        squares.push({
          p: p,
          x: x0 + col * (size + gap),
          y: H - labelH - (row + 1) * size - row * gap,
          s: size,
          delay: i * 65 + row * 45,
        });
      });
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

  function activeLine() {
    return previewLine || focusLine;
  }

  function draw(now) {
    ctx.clearRect(0, 0, W, H);

    // baseline and year labels
    ctx.fillStyle = RULE;
    ctx.fillRect(0, H - labelH + 2, W, 1);
    ctx.fillStyle = LABEL;
    ctx.font = "500 12px Archivo, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    var step = colW >= 40 ? 1 : colW >= 22 ? 2 : 3;
    years.forEach(function (yr, i) {
      var isLast = i === years.length - 1;
      if (i % step !== 0 && !isLast) return;
      if (!isLast && step > 1 && years.length - 1 - i < step) return;
      var label = colW >= 40 ? String(yr) : "’" + String(yr).slice(2);
      ctx.fillText(label, colW * (i + 0.5), H - labelH + 8);
    });

    var line = activeLine();
    var pending = false;
    squares.forEach(function (sq) {
      var t = 1;
      if (!animDone) {
        t = Math.min(1, Math.max(0, (now - startTime - sq.delay) / 520));
        if (t < 1) pending = true;
      }
      var e = 1 - Math.pow(1 - t, 3);
      var alpha = e;
      if (line && sq.p.line !== line) alpha *= 0.18;
      if (alpha <= 0) return;
      var yOff = (1 - e) * -36;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = colors[sq.p.line] || colors.other;
      roundRect(sq.x, sq.y + yOff, sq.s, sq.s, Math.min(4, sq.s / 4));
      ctx.fill();
      if (hover === sq) {
        ctx.globalAlpha = 1;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        roundRect(sq.x - 2, sq.y - 2, sq.s + 4, sq.s + 4, Math.min(5, sq.s / 3));
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;

    if (pending) {
      window.requestAnimationFrame(draw);
    } else {
      animDone = true;
    }
  }

  function redraw() {
    if (animDone) draw(0);
  }

  function hit(x, y) {
    for (var i = 0; i < squares.length; i++) {
      var sq = squares[i];
      if (x >= sq.x - 2 && x <= sq.x + sq.s + 2 && y >= sq.y - 2 && y <= sq.y + sq.s + 2) return sq;
    }
    return null;
  }

  function paperUrl(p) {
    return p.url || pubsUrl + "?q=" + encodeURIComponent(p.title);
  }

  function showTip(sq) {
    if (!tip) {
      tip = document.createElement("div");
      tip.className = "atlas-tip";
      tip.setAttribute("role", "status");
      el.appendChild(tip);
    }
    var p = sq.p;
    tip.style.setProperty("--c", colors[p.line] || colors.other);
    tip.textContent = "";
    var parts = [
      ["tip-line", names[p.line] || names.other],
      ["tip-title", p.title],
      ["tip-meta", (p.venue ? p.venue + ", " : "") + p.year],
      ["tip-open", p.url ? "Click to open the paper" : "Click to find it in publications"],
    ];
    parts.forEach(function (part) {
      var d = document.createElement("div");
      d.className = part[0];
      d.textContent = part[1];
      tip.appendChild(d);
    });
    tip.hidden = false;
    var tw = tip.offsetWidth;
    var th = tip.offsetHeight;
    var left = Math.min(Math.max(0, sq.x + sq.s / 2 - tw / 2), Math.max(0, W - tw));
    var top = sq.y - th - 12;
    if (top < -40) top = sq.y + sq.s + 12;
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  }

  function hideTip() {
    if (tip) tip.hidden = true;
  }

  function setHover(sq) {
    if (sq === hover) return;
    hover = sq;
    el.style.cursor = sq ? "pointer" : "";
    if (sq) showTip(sq);
    else hideTip();
    redraw();
  }

  function localPoint(e) {
    var r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  el.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    var pt = localPoint(e);
    setHover(hit(pt.x, pt.y));
  });
  el.addEventListener("pointerleave", function (e) {
    if (e.pointerType === "touch") return;
    setHover(null);
  });
  el.addEventListener("pointerup", function (e) {
    var pt = localPoint(e);
    var sq = hit(pt.x, pt.y);
    if (!sq) {
      setHover(null);
      return;
    }
    // Touch: first tap shows the paper, a second tap on it opens it.
    if (e.pointerType === "touch" && hover !== sq) {
      setHover(sq);
      return;
    }
    window.open(paperUrl(sq.p), "_blank", "noopener");
  });

  // Legend: press to highlight one line; hover or focus to preview it.
  var chips = Array.prototype.slice.call(document.querySelectorAll(".legend-chip[data-line]"));
  chips.forEach(function (chip) {
    var key = chip.getAttribute("data-line");
    chip.addEventListener("click", function () {
      focusLine = focusLine === key ? null : key;
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", c.getAttribute("data-line") === focusLine ? "true" : "false");
      });
      redraw();
    });
    chip.addEventListener("pointerenter", function () {
      previewLine = key;
      redraw();
    });
    chip.addEventListener("pointerleave", function () {
      previewLine = null;
      redraw();
    });
    chip.addEventListener("focus", function () {
      previewLine = key;
      redraw();
    });
    chip.addEventListener("blur", function () {
      previewLine = null;
      redraw();
    });
  });

  function start() {
    layout();
    if (animDone) {
      draw(0);
    } else {
      window.requestAnimationFrame(function (t) {
        startTime = t;
        draw(t);
      });
    }
  }

  var lastW = 0;
  if ("ResizeObserver" in window) {
    new ResizeObserver(function () {
      var w = el.clientWidth;
      if (Math.abs(w - lastW) < 2) return;
      lastW = w;
      hideTip();
      hover = null;
      layout();
      redraw();
    }).observe(el);
  }

  // Draw once the web font is ready so the year labels use Archivo.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start, start);
  } else {
    start();
  }
})();
