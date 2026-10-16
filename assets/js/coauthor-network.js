/*
 * Co-author network on the Lab page. Chen sits in the middle; every co-author
 * is a dot, sized and pulled closer by the number of papers written together,
 * coloured by the research line they share most, ringed if they are a student
 * of the lab. Links join co-authors who wrote papers with each other.
 * Data: <script id="research-data"> (people and papers from papers.bib).
 * A small force simulation (no libraries) settles the layout once on load.
 */
(function () {
  "use strict";

  var el = document.getElementById("coauthor-network");
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
  if (!ctx || !data.people) return;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ME = "c-hajaj";
  var group = el.closest(".paper-map-group") || el.parentNode;

  var names = { other: data.other.name };
  var colors = {};
  var cs = getComputedStyle(el);
  data.lines.forEach(function (l) {
    names[l.key] = l.name;
  });
  ["other"].concat(Object.keys(names)).forEach(function (k) {
    colors[k] = cs.getPropertyValue("--line-" + k + "-bright").trim() || "#8f98ab";
  });

  // Seeded random so the layout is the same on every visit.
  var seed = 7;
  function rand() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  var nodes = [];
  var byId = {};
  var me = { id: ME, name: "Chen Hajaj", count: data.papers.length, me: true, x: 0, y: 0, vx: 0, vy: 0, r: 26 };
  nodes.push(me);
  byId[ME] = me;
  data.people.forEach(function (p) {
    var n = {
      id: p.id,
      name: p.name,
      count: p.count,
      line: p.line,
      role: p.role,
      first: p.first,
      last: p.last,
      r: 3.5 + Math.sqrt(p.count) * 2.6,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    };
    nodes.push(n);
    byId[p.id] = n;
  });

  // Links between co-authors (not counting Chen), weighted by shared papers.
  var linkMap = {};
  data.papers.forEach(function (p) {
    var ids = (p.author_ids || []).filter(function (id) {
      return id !== ME && byId[id];
    });
    for (var i = 0; i < ids.length; i++) {
      for (var j = i + 1; j < ids.length; j++) {
        var k = ids[i] < ids[j] ? ids[i] + "|" + ids[j] : ids[j] + "|" + ids[i];
        linkMap[k] = (linkMap[k] || 0) + 1;
      }
    }
  });
  var links = Object.keys(linkMap).map(function (k) {
    var ab = k.split("|");
    return { a: byId[ab[0]], b: byId[ab[1]], w: linkMap[k] };
  });
  var neighbours = {};
  nodes.forEach(function (n) {
    neighbours[n.id] = {};
  });
  links.forEach(function (l) {
    neighbours[l.a.id][l.b.id] = true;
    neighbours[l.b.id][l.a.id] = true;
  });

  var W = 0;
  var H = 0;
  var scale = 1;
  var alpha = 1;
  var running = false;
  var hover = null;
  var drag = null;
  var focusLine = null;
  var previewLine = null;
  var search = "";
  var photo = null;
  var tip = null;

  var photoSrc = el.getAttribute("data-photo");
  if (photoSrc) {
    var img = new Image();
    img.onload = function () {
      photo = img;
      paint();
    };
    img.src = photoSrc;
  }

  function size() {
    W = el.clientWidth;
    H = el.clientHeight;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    scale = Math.min(W, H * 1.6) / 900;
    scale = Math.max(0.42, Math.min(scale, 1.15));
    // Smaller dots on narrow screens.
    var k = W < 560 ? 0.68 : 1;
    nodes.forEach(function (n) {
      n.r = n.me ? (W < 560 ? 20 : 26) : (3.5 + Math.sqrt(n.count) * 2.6) * k;
    });
  }

  // Target distance from Chen, as a fraction of the band's half-width and
  // half-height: frequent co-authors sit close, one-off co-authors at the rim.
  function target(n) {
    return 0.18 + 0.68 / Math.sqrt(n.count);
  }

  function tick() {
    var i, j, a, b, dx, dy, d2, d, f;
    var cx = W / 2;
    var cy = H / 2;
    me.x = cx;
    me.y = cy;
    for (i = 1; i < nodes.length; i++) {
      a = nodes[i];
      // spring towards an ellipse around Chen
      dx = a.x - cx;
      dy = a.y - cy;
      var ex = dx / (W / 2 - 28);
      var ey = dy / (H / 2 - 28);
      var dn = Math.sqrt(ex * ex + ey * ey) || 0.001;
      f = ((dn - target(a)) / dn) * 0.07 * Math.max(alpha, 0.15);
      a.vx -= dx * f;
      a.vy -= dy * f;
      // repulsion and collision
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j];
        dx = a.x - b.x;
        dy = a.y - b.y;
        d2 = Math.max(dx * dx + dy * dy, 64);
        d = Math.sqrt(d2);
        var minD = a.r + b.r + 3;
        f = ((110 * scale) / d2) * alpha;
        if (d < minD) f += ((minD - d) / d) * 0.5;
        a.vx += dx * f;
        a.vy += dy * f;
        b.vx -= dx * f;
        b.vy -= dy * f;
      }
      // keep clear of Chen's photo
      dx = a.x - cx;
      dy = a.y - cy;
      d = Math.sqrt(dx * dx + dy * dy) || 1;
      if (d < me.r + a.r + 6) {
        f = (me.r + a.r + 6 - d) / d;
        a.vx += dx * f * 0.5;
        a.vy += dy * f * 0.5;
      }
    }
    // co-author links pull gently
    links.forEach(function (l) {
      dx = l.b.x - l.a.x;
      dy = l.b.y - l.a.y;
      d = Math.sqrt(dx * dx + dy * dy) || 1;
      f = ((d - 70 * scale) / d) * 0.012 * Math.min(l.w, 3) * alpha;
      l.a.vx += dx * f;
      l.a.vy += dy * f;
      l.b.vx -= dx * f;
      l.b.vy -= dy * f;
    });
    for (i = 1; i < nodes.length; i++) {
      a = nodes[i];
      if (a === drag) {
        a.vx = a.vy = 0;
        continue;
      }
      a.vx *= 0.62;
      a.vy *= 0.62;
      var sp = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
      if (sp > 10) {
        a.vx *= 10 / sp;
        a.vy *= 10 / sp;
      }
      a.x += a.vx;
      a.y += a.vy;
      a.x = Math.max(a.r + 4, Math.min(W - a.r - 4, a.x));
      a.y = Math.max(a.r + 4, Math.min(H - a.r - 4, a.y));
    }
    alpha *= 0.985;
  }

  function lit(n) {
    if (n.me) return true;
    var line = previewLine || focusLine;
    if (line === "lab") {
      if (!n.role) return false;
    } else if (line && n.line !== line) {
      return false;
    }
    if (search && n.name.toLowerCase().indexOf(search) === -1) return false;
    if (hover && !hover.me && n !== hover && !neighbours[hover.id][n.id]) return false;
    return true;
  }

  function paint() {
    ctx.clearRect(0, 0, W, H);
    var anyFilter = !!(previewLine || focusLine || search || (hover && !hover.me));

    // spokes to Chen
    ctx.lineWidth = 1;
    nodes.forEach(function (n) {
      if (n.me) return;
      var on = lit(n);
      ctx.strokeStyle = "rgba(214, 222, 255," + (on && anyFilter ? 0.22 : 0.06) + ")";
      ctx.beginPath();
      ctx.moveTo(me.x, me.y);
      ctx.lineTo(n.x, n.y);
      ctx.stroke();
    });
    // co-author links
    links.forEach(function (l) {
      var on = hover && (l.a === hover || l.b === hover);
      var dim = anyFilter && !(lit(l.a) && lit(l.b));
      ctx.strokeStyle = on ? "rgba(255,255,255,0.65)" : "rgba(214, 222, 255," + (dim ? 0.03 : 0.14) + ")";
      ctx.lineWidth = on ? 1.5 : 1;
      ctx.beginPath();
      ctx.moveTo(l.a.x, l.a.y);
      ctx.lineTo(l.b.x, l.b.y);
      ctx.stroke();
    });
    // nodes
    nodes.forEach(function (n) {
      if (n.me) return;
      ctx.globalAlpha = lit(n) ? 1 : 0.14;
      ctx.fillStyle = colors[n.line] || colors.other;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
      if (n.role) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 3, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (n === hover) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + (n.role ? 6.5 : 4), 0, Math.PI * 2);
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
    // Chen in the middle
    ctx.save();
    ctx.beginPath();
    ctx.arc(me.x, me.y, me.r, 0, Math.PI * 2);
    ctx.closePath();
    if (photo) {
      ctx.clip();
      var s = me.r * 2;
      var iw = photo.naturalWidth;
      var ih = photo.naturalHeight;
      var k = s / Math.min(iw, ih);
      ctx.drawImage(photo, me.x - (iw * k) / 2, me.y - (ih * k) / 2.6, iw * k, ih * k);
    } else {
      ctx.fillStyle = "#f3f5ff";
      ctx.fill();
    }
    ctx.restore();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#f3f5ff";
    ctx.beginPath();
    ctx.arc(me.x, me.y, me.r + 1.5, 0, Math.PI * 2);
    ctx.stroke();

    // Labels for frequent co-authors (and whoever is highlighted), placed
    // greedily from the most frequent down so they never overlap.
    ctx.font = "600 12px Archivo, system-ui, sans-serif";
    ctx.textBaseline = "middle";
    var placed = [{ x: me.x - me.r - 4, y: me.y - me.r - 4, w: me.r * 2 + 8, h: me.r * 2 + 8 }];
    function free(b) {
      for (var i = 0; i < placed.length; i++) {
        var p = placed[i];
        if (b.x < p.x + p.w && b.x + b.w > p.x && b.y < p.y + p.h && b.y + b.h > p.y) return false;
      }
      return b.x >= 0 && b.x + b.w <= W && b.y >= 0 && b.y + b.h <= H;
    }
    var labelled = nodes
      .filter(function (n) {
        if (n.me || !lit(n)) return false;
        return (n.count >= 5 && scale > 0.6) || n === hover || (search && anyFilter);
      })
      .sort(function (a, b) {
        return (b === hover) - (a === hover) || b.count - a.count;
      });
    labelled.forEach(function (n) {
      var w = ctx.measureText(n.name).width;
      var h = 16;
      var right = n.x >= me.x;
      var options = [
        { x: n.x + n.r + 6, y: n.y - h / 2, align: "left" },
        { x: n.x - n.r - 6 - w, y: n.y - h / 2, align: "right" },
        { x: n.x - w / 2, y: n.y - n.r - 4 - h, align: "center" },
        { x: n.x - w / 2, y: n.y + n.r + 4, align: "center" },
      ];
      if (!right) options.unshift(options.splice(1, 1)[0]);
      for (var i = 0; i < options.length; i++) {
        var o = options[i];
        var box = { x: o.x - 2, y: o.y, w: w + 4, h: h };
        if (!free(box)) continue;
        placed.push(box);
        ctx.textAlign = "left";
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(16, 26, 77, 0.85)";
        ctx.strokeText(n.name, o.x, o.y + h / 2);
        ctx.fillStyle = "#f3f5ff";
        ctx.fillText(n.name, o.x, o.y + h / 2);
        return;
      }
    });
  }

  function loop() {
    tick();
    paint();
    if (alpha > 0.02 || drag) {
      window.requestAnimationFrame(loop);
    } else {
      running = false;
    }
  }

  function reheat(a) {
    alpha = Math.max(alpha, a);
    if (!running) {
      running = true;
      window.requestAnimationFrame(loop);
    }
  }

  function settleInstantly() {
    for (var i = 0; i < 320; i++) tick();
    paint();
  }

  function nodeAt(x, y) {
    for (var i = nodes.length - 1; i >= 0; i--) {
      var n = nodes[i];
      var dx = n.x - x;
      var dy = n.y - y;
      if (dx * dx + dy * dy <= (n.r + 4) * (n.r + 4)) return n;
    }
    return null;
  }

  function showTip(n) {
    if (!tip) {
      tip = document.createElement("div");
      tip.className = "atlas-tip";
      tip.setAttribute("role", "status");
      el.appendChild(tip);
    }
    tip.textContent = "";
    var rows;
    if (n.me) {
      tip.style.setProperty("--c", "#f3f5ff");
      rows = [
        ["tip-line", "Adaptive AI Lab"],
        ["tip-title", "Chen Hajaj"],
        ["tip-meta", data.papers.length + " papers with " + data.people.length + " co-authors"],
      ];
    } else {
      tip.style.setProperty("--c", colors[n.line] || colors.other);
      rows = [
        ["tip-line", (n.role ? n.role + ", " : "") + (names[n.line] || names.other)],
        ["tip-title", n.name],
        [
          "tip-meta",
          n.count + (n.count === 1 ? " paper" : " papers") + " together" + (n.first ? ", " + (n.first === n.last ? n.first : n.first + " to " + n.last) : ""),
        ],
      ];
    }
    rows.forEach(function (r) {
      var d = document.createElement("div");
      d.className = r[0];
      d.textContent = r[1];
      tip.appendChild(d);
    });
    tip.hidden = false;
    var tw = tip.offsetWidth;
    var th = tip.offsetHeight;
    tip.style.left = Math.min(Math.max(0, n.x - tw / 2), Math.max(0, W - tw)) + "px";
    var top = n.y - n.r - th - 10;
    if (top < 0) top = n.y + n.r + 10;
    tip.style.top = top + "px";
  }

  function hideTip() {
    if (tip) tip.hidden = true;
  }

  function point(e) {
    var r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function setHover(n) {
    if (n === hover) return;
    hover = n;
    el.style.cursor = n ? (n.me ? "default" : "grab") : "";
    if (n) showTip(n);
    else hideTip();
    if (!running) paint();
  }

  el.addEventListener("pointerdown", function (e) {
    var pt = point(e);
    var n = nodeAt(pt.x, pt.y);
    if (!n) {
      setHover(null);
      return;
    }
    setHover(n);
    if (n.me || e.pointerType === "touch") return;
    drag = n;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
    if (!reduceMotion) reheat(0.25);
  });
  el.addEventListener("pointermove", function (e) {
    var pt = point(e);
    if (drag) {
      drag.x = pt.x;
      drag.y = pt.y;
      showTip(drag);
      if (reduceMotion) paint();
      return;
    }
    if (e.pointerType !== "touch") setHover(nodeAt(pt.x, pt.y));
  });
  function endDrag(e) {
    if (!drag) return;
    drag = null;
    el.style.cursor = "grab";
    try {
      el.releasePointerCapture(e.pointerId);
    } catch (err) {}
    if (reduceMotion) settleInstantly();
  }
  el.addEventListener("pointerup", endDrag);
  el.addEventListener("pointercancel", endDrag);
  el.addEventListener("pointerleave", function (e) {
    if (!drag && e.pointerType !== "touch") setHover(null);
  });

  // Legend chips highlight a research line, or students of the lab.
  var chips = Array.prototype.slice.call(group.querySelectorAll(".legend-chip[data-line]"));
  chips.forEach(function (chip) {
    var key = chip.getAttribute("data-line");
    chip.addEventListener("click", function () {
      focusLine = focusLine === key ? null : key;
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", c.getAttribute("data-line") === focusLine ? "true" : "false");
      });
      paint();
    });
    ["pointerenter", "focus"].forEach(function (ev) {
      chip.addEventListener(ev, function () {
        previewLine = key;
        paint();
      });
    });
    ["pointerleave", "blur"].forEach(function (ev) {
      chip.addEventListener(ev, function () {
        previewLine = null;
        paint();
      });
    });
  });

  var finder = group.querySelector(".network-find input");
  var findStatus = group.querySelector(".network-find-status");
  if (finder) {
    finder.addEventListener("input", function () {
      search = finder.value.trim().toLowerCase();
      var matches = search
        ? nodes.filter(function (n) {
            return !n.me && n.name.toLowerCase().indexOf(search) !== -1;
          })
        : [];
      if (findStatus) {
        findStatus.textContent = !search
          ? ""
          : matches.length === 0
            ? "No co-author matches “" + finder.value.trim() + "”."
            : matches.length === 1
              ? matches[0].name + ": " + matches[0].count + (matches[0].count === 1 ? " paper" : " papers") + " together."
              : matches.length + " co-authors match.";
      }
      if (matches.length === 1) showTip(matches[0]);
      else hideTip();
      paint();
    });
  }

  function start() {
    size();
    nodes.forEach(function (n) {
      if (n.me) return;
      var a = rand() * Math.PI * 2;
      var t = target(n) * (reduceMotion ? 1 : 0.3);
      n.x = W / 2 + Math.cos(a) * t * (W / 2 - 28);
      n.y = H / 2 + Math.sin(a) * t * (H / 2 - 28);
    });
    if (reduceMotion) {
      settleInstantly();
    } else {
      running = true;
      window.requestAnimationFrame(loop);
    }
  }

  var started = false;
  function go() {
    if (started) return;
    started = true;
    start();
  }
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          io.disconnect();
          go();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
  } else {
    go();
  }

  var lastW = el.clientWidth;
  if ("ResizeObserver" in window) {
    new ResizeObserver(function () {
      var w = el.clientWidth;
      if (!started || Math.abs(w - lastW) < 2) return;
      var oldW = W;
      var oldH = H;
      lastW = w;
      size();
      nodes.forEach(function (n) {
        n.x = (n.x / oldW) * W;
        n.y = (n.y / oldH) * H;
      });
      hideTip();
      hover = null;
      if (reduceMotion) settleInstantly();
      else reheat(0.3);
    }).observe(el);
  }
})();
