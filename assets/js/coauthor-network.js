/*
 * Co-author network on the Lab page. Chen sits in the middle; every co-author
 * is a dot in the sector of the research line they share most (named on the
 * rim), ringed if they are a student of the lab. Links join co-authors who wrote papers with each other.
 * Data: <script id="research-data"> (people and papers from papers.bib).
 * The layout is deterministic (see layout()); dots ease into place once.
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
      r: 6,
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

  var narrow = false;
  function size() {
    W = el.clientWidth;
    H = el.clientHeight;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    narrow = W < 560;
    nodes.forEach(function (n) {
      // Every co-author is the same size: the picture shows breadth
      // across research lines, not who publishes with Chen most.
      n.r = n.me ? (narrow ? 20 : 26) : narrow ? 4 : 6;
    });
  }

  // Layout (deterministic, no physics): each research line owns a sector of
  // an ellipse round Chen, sized by how many co-authors it has. Inside a
  // sector, students of the lab sit nearest the middle and the others follow
  // by the year they first wrote with Chen, so time runs outward. Nothing is
  // clamped to the canvas, so dots never pile up along its edges.
  var lineOrder = data.lines.map(function (l) {
    return l.key;
  });
  lineOrder.push("other");
  var members = {};
  nodes.forEach(function (n) {
    if (n.me) return;
    var key = lineOrder.indexOf(n.line) === -1 ? "other" : n.line;
    n.sector = key;
    (members[key] = members[key] || []).push(n);
  });
  lineOrder = lineOrder.filter(function (k) {
    return members[k];
  });
  lineOrder.forEach(function (k) {
    members[k].sort(function (a, b) {
      return !!b.role - !!a.role || (a.first || 9999) - (b.first || 9999) || a.name.localeCompare(b.name);
    });
  });
  var sectors = {};
  (function () {
    var total = nodes.length - 1;
    var MIN = 0.17; // radians, so a line with one or two people still reads
    var spans = {};
    var small = 0;
    var bigCount = 0;
    lineOrder.forEach(function (k) {
      var s = (members[k].length / total) * Math.PI * 2;
      if (s < MIN) {
        spans[k] = MIN;
        small += MIN;
      } else bigCount += members[k].length;
    });
    var angle = -Math.PI / 2;
    lineOrder.forEach(function (k) {
      var span = spans[k] || (members[k].length / bigCount) * (Math.PI * 2 - small);
      sectors[k] = { from: angle, span: span, key: k, n: members[k].length };
      angle += span;
    });
  })();

  var CX = 0,
    CY = 0,
    RX = 1,
    RY = 1;
  function layout() {
    CX = W / 2;
    CY = H / 2;
    RY = H / 2 - (narrow ? 30 : 36);
    // Wide screens leave room at the sides for the sector names.
    RX = narrow ? W / 2 - 14 : Math.min(W / 2 - 170, RY * 1.6);
    var rmin = Math.min(RX, RY);
    var pitch = narrow ? 16 : 23;
    var u0 = (me.r + (narrow ? 22 : 30)) / rmin;
    var rings = Math.max(3, Math.min(9, Math.floor(((1 - u0) * rmin) / pitch) + 1));
    var rmean = (RX + RY) / 2;
    lineOrder.forEach(function (k, si) {
      var sec = sectors[k];
      var list = members[k];
      var pad = Math.min(0.05, sec.span * 0.14);
      var usable = Math.max(0.01, sec.span - pad * 2);
      var caps = [];
      var C = 0;
      for (var i = 0; i < rings; i++) {
        var u = u0 + ((1 - u0) * i) / (rings - 1);
        var c = Math.max(1, Math.floor((usable * u * rmean) / pitch) + 1);
        caps.push(c);
        C += c;
      }
      // Spread the line's people over the rings in proportion to room.
      var f = list.length / C;
      var counts = caps.map(function (c) {
        return Math.floor(c * f);
      });
      var left =
        list.length -
        counts.reduce(function (a, b) {
          return a + b;
        }, 0);
      var order = caps
        .map(function (c, i) {
          return [c * f - Math.floor(c * f), i];
        })
        .sort(function (a, b) {
          return b[0] - a[0] || a[1] - b[1];
        });
      for (var o = 0; left > 0; o = (o + 1) % order.length, left--) counts[order[o][1]]++;
      var idx = 0;
      seed = 11 + si * 97;
      for (var ri = 0; ri < rings; ri++) {
        var cnt = counts[ri];
        var uu = u0 + ((1 - u0) * ri) / (rings - 1);
        for (var j = 0; j < cnt; j++) {
          var n = list[idx++];
          var step = usable / cnt;
          // A ring with one dot from this line places it by the golden
          // ratio, so thin sectors scatter instead of forming a spoke.
          var at = cnt === 1 ? 0.15 + 0.7 * ((ri * 0.618 + 0.31) % 1) : (j + 0.5) / cnt;
          var a = sec.from + pad + usable * at + (rand() - 0.5) * step * 0.35;
          var ur = uu + (rand() - 0.5) * (0.4 / rings) * (1 - u0);
          n.ang = a;
          n.ring = ri;
          n.tx = CX + Math.cos(a) * ur * RX;
          n.ty = CY + Math.sin(a) * ur * RY;
        }
      }
    });
    me.x = me.tx = CX;
    me.y = me.ty = CY;
    placeLabels();
  }

  // Each line's name sits just outside its rim, at the middle of the sector,
  // nudged along until it covers no dot and no other name.
  var labelSize = 12.5;
  function placeLabels() {
    labelSize = narrow ? 11 : 12.5;
    ctx.font = "650 " + labelSize + "px Archivo, system-ui, sans-serif";
    var h = labelSize + 6;
    var taken = [];
    var dots = nodes.map(function (n) {
      var r = (n.me ? n.r : n.r + 3) + 1;
      return { x: n.tx - r, y: n.ty - r, w: r * 2, h: r * 2 };
    });
    function clear(b) {
      var all = taken.concat(dots);
      for (var i = 0; i < all.length; i++) {
        var p = all[i];
        if (b.x < p.x + p.w && b.x + b.w > p.x && b.y < p.y + p.h && b.y + b.h > p.y) return false;
      }
      return true;
    }
    lineOrder.forEach(function (k) {
      var sec = sectors[k];
      var mid = sec.from + sec.span / 2;
      var c = Math.cos(mid);
      var sn = Math.sin(mid);
      var text = names[k] || names.other;
      var w = ctx.measureText(text).width + 4;
      var first = null;
      var found = null;
      for (var off = 22; off <= 70 && !found; off += 12) {
        for (var s = 0; s < 7 && !found; s++) {
          var dy = (s % 2 ? 1 : -1) * Math.ceil(s / 2) * h * 0.75;
          var px = CX + c * (RX + off);
          var py = CY + sn * (RY + off * 0.8) + dy;
          var x = c > 0.3 ? px : c < -0.3 ? px - w : px - w / 2;
          var b = {
            x: Math.max(0, Math.min(W - w, x)),
            y: Math.max(0, Math.min(H - h, py - h / 2)),
            w: w,
            h: h,
            text: text,
          };
          if (!first) first = b;
          if (clear(b)) found = b;
        }
      }
      sec.label = found || first;
      taken.push(sec.label);
    });
  }

  // Motion: dots ease from near the middle to their places once (well under
  // a second, timed by the clock, not by frame count), and a dragged dot
  // eases back when let go.
  var ENTER = 750;
  var BACK = 380;
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function tween(n, dur, delay) {
    n.fx = n.x;
    n.fy = n.y;
    n.t0 = null;
    n.dur = dur;
    n.delay = delay || 0;
  }
  function tick(now) {
    var moving = false;
    for (var i = 1; i < nodes.length; i++) {
      var n = nodes[i];
      if (n === drag || n.dur == null) continue;
      if (n.t0 === null) n.t0 = now;
      var k = Math.max(0, Math.min(1, (now - n.t0 - n.delay) / n.dur));
      var e = easeOut(k);
      n.x = n.fx + (n.tx - n.fx) * e;
      n.y = n.fy + (n.ty - n.fy) * e;
      if (k < 1) moving = true;
      else n.dur = null;
    }
    return moving;
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
    var activeLine = previewLine || focusLine;

    // Sector rims: a short arc in each line's colour just outside its dots.
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    lineOrder.forEach(function (k) {
      var sec = sectors[k];
      var pad = Math.min(0.05, sec.span * 0.14);
      ctx.globalAlpha = activeLine && activeLine !== "lab" && activeLine !== k ? 0.15 : 0.55;
      ctx.strokeStyle = colors[k] || colors.other;
      ctx.beginPath();
      ctx.ellipse(CX, CY, RX + 12, RY + 12, 0, sec.from + pad, sec.from + sec.span - pad);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
    ctx.lineCap = "butt";

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
      ctx.strokeStyle = on ? "rgba(255,255,255,0.65)" : "rgba(214, 222, 255," + (dim ? 0.03 : 0.09) + ")";
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

    var placed = [{ x: me.x - me.r - 4, y: me.y - me.r - 4, w: me.r * 2 + 8, h: me.r * 2 + 8 }];
    function free(b) {
      for (var i = 0; i < placed.length; i++) {
        var p = placed[i];
        if (b.x < p.x + p.w && b.x + b.w > p.x && b.y < p.y + p.h && b.y + b.h > p.y) return false;
      }
      return b.x >= 0 && b.x + b.w <= W && b.y >= 0 && b.y + b.h <= H;
    }

    // Sector names (placed by placeLabels()).
    ctx.font = "650 " + labelSize + "px Archivo, system-ui, sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    lineOrder.forEach(function (k) {
      var b = sectors[k].label;
      if (!b) return;
      placed.push(b);
      ctx.globalAlpha = activeLine && activeLine !== "lab" && activeLine !== k ? 0.35 : 1;
      ctx.lineWidth = 4;
      ctx.strokeStyle = "rgba(16, 26, 77, 0.9)";
      ctx.strokeText(b.text, b.x + 2, b.y + b.h / 2);
      ctx.fillStyle = colors[k] || colors.other;
      ctx.fillText(b.text, b.x + 2, b.y + b.h / 2);
    });
    ctx.globalAlpha = 1;

    // Names appear only for the co-author under the pointer (or keyboard
    // focus), and for matches while searching.
    ctx.font = "600 12px Archivo, system-ui, sans-serif";
    var labelled = nodes
      .filter(function (n) {
        if (n.me || !lit(n)) return false;
        return n === hover || (search && anyFilter);
      })
      .sort(function (a, b) {
        return (b === hover) - (a === hover) || a.name.localeCompare(b.name);
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

  function loop(now) {
    var moving = tick(now);
    paint();
    if (moving || drag) {
      window.requestAnimationFrame(loop);
    } else {
      running = false;
    }
  }

  function kick() {
    if (reduceMotion) {
      for (var i = 1; i < nodes.length; i++) {
        if (nodes[i] === drag) continue;
        nodes[i].x = nodes[i].tx;
        nodes[i].y = nodes[i].ty;
        nodes[i].dur = null;
      }
      paint();
      return;
    }
    if (!running) {
      running = true;
      window.requestAnimationFrame(loop);
    }
  }

  // The dot under a point. Touch gets a wider net (22 px), since the dots
  // are smaller than a fingertip.
  function nodeAt(x, y, slop) {
    var best = null;
    var bestD = Infinity;
    for (var i = nodes.length - 1; i >= 0; i--) {
      var n = nodes[i];
      var dx = n.x - x;
      var dy = n.y - y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (n.me && d <= n.r + 4) return n;
      if (d <= Math.max(n.r + 4, slop || 0) && d < bestD) {
        best = n;
        bestD = d;
      }
    }
    return best;
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
          n.count +
            (n.count === 1 ? " paper" : " papers") +
            " together" +
            (n.first ? ", " + (n.first === n.last ? n.first : n.first + " to " + n.last) : ""),
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
    var n = nodeAt(pt.x, pt.y, e.pointerType === "mouse" ? 0 : 22);
    if (!n) {
      setHover(null);
      return;
    }
    setHover(n);
    if (n.me || e.pointerType === "touch") return;
    drag = n;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
    kick();
  });
  el.addEventListener("pointermove", function (e) {
    var pt = point(e);
    if (drag) {
      drag.x = pt.x;
      drag.y = pt.y;
      showTip(drag);
      if (!running) paint();
      return;
    }
    if (e.pointerType !== "touch") setHover(nodeAt(pt.x, pt.y));
  });
  function endDrag(e) {
    if (!drag) return;
    var n = drag;
    drag = null;
    el.style.cursor = "grab";
    try {
      el.releasePointerCapture(e.pointerId);
    } catch (err) {}
    hideTip();
    hover = null;
    tween(n, BACK);
    kick();
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
    layout();
    nodes.forEach(function (n) {
      if (n.me) return;
      if (reduceMotion) {
        n.x = n.tx;
        n.y = n.ty;
        return;
      }
      n.x = CX + (n.tx - CX) * 0.3;
      n.y = CY + (n.ty - CY) * 0.3;
      tween(n, ENTER, n.ring * 25);
    });
    if (reduceMotion) paint();
    else kick();
  }

  var started = false;
  function go() {
    if (started) return;
    started = true;
    start();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        placeLabels();
        if (!running) paint();
      });
    }
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
      lastW = w;
      size();
      layout();
      nodes.forEach(function (n) {
        n.x = n.tx;
        n.y = n.ty;
        n.dur = null;
      });
      hideTip();
      hover = null;
      paint();
    }).observe(el);
  }
})();
