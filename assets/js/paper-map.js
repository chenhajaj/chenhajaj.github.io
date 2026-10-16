/*
 * Paper map: one square per paper, one column per year, coloured by research
 * line. Used on the home page, the Publications page and each research page.
 * Data is inlined once per page in <script id="research-data"> (built from
 * papers.bib by _plugins/research-data.rb). No dependencies.
 *
 * Markup: <div class="paper-map" ...><canvas aria-hidden="true"></canvas></div>
 * Options (data attributes on .paper-map):
 *   data-surface="night|paper"  label and colour set to draw with (default paper)
 *   data-line="traffic"         show only that research line's papers
 *   data-click="open|scroll"    open the paper, or jump to it in the page list
 *   data-years="filter"         clicking a year column asks the page to filter
 *   data-animate="load|view"    drop the squares in on load or when scrolled to
 *   data-pubs="/publications/"  fallback link for papers without a URL
 * Legend chips: any .legend-chip[data-line] inside the same .paper-map-group.
 * Events: listens for "papermap:filter" {keys, year}; fires "papermap:year".
 */
(function () {
  "use strict";

  var dataEl = document.getElementById("research-data");
  var maps = Array.prototype.slice.call(document.querySelectorAll(".paper-map"));
  if (!dataEl || !maps.length) return;

  var data;
  try {
    data = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var order = data.lines.map(function (l) {
    return l.key;
  });
  order.push("other");
  var names = { other: data.other.name };
  data.lines.forEach(function (l) {
    names[l.key] = l.name;
  });
  var years = [];
  for (var y = data.first_year; y <= data.last_year; y++) years.push(y);
  var KIND_LABEL = { preprint: "Preprint", abstract: "Abstract", thesis: "Thesis", patent: "Patent", book: "Edited book", other: "Other" };

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function PaperMap(el) {
    var canvas = el.querySelector("canvas");
    var ctx = canvas && canvas.getContext("2d");
    if (!ctx) return;

    var surface = el.getAttribute("data-surface") || "paper";
    var onlyLine = el.getAttribute("data-line");
    var clickMode = el.getAttribute("data-click") || "open";
    var yearFilter = el.getAttribute("data-years") === "filter";
    var animateMode = reduceMotion ? "none" : el.getAttribute("data-animate") || "load";
    var pubsUrl = el.getAttribute("data-pubs") || "/publications/";
    var group = el.closest(".paper-map-group") || el.parentNode;

    var papers = data.papers.filter(function (p) {
      if (!onlyLine) return true;
      if (onlyLine === "other") return p.line === "other";
      return (p.lines || []).indexOf(onlyLine) !== -1;
    });
    var byYear = {};
    years.forEach(function (yr) {
      byYear[yr] = [];
    });
    papers.forEach(function (p) {
      if (byYear[p.year]) byYear[p.year].push(p);
    });
    years.forEach(function (yr) {
      byYear[yr].sort(function (a, b) {
        return order.indexOf(a.line) - order.indexOf(b.line) || (a.title < b.title ? -1 : 1);
      });
    });
    var maxCount = Math.max.apply(
      null,
      years.map(function (yr) {
        return byYear[yr].length;
      }).concat([1])
    );

    var colors = {};
    var label = "#5d6679";
    var rule = "rgba(0,0,0,.12)";
    var ring = "#141b2d";
    var wash = "rgba(36,64,200,.08)";

    function readColors() {
      var cs = getComputedStyle(el);
      order.forEach(function (k) {
        var v = cs.getPropertyValue(surface === "night" ? "--line-" + k + "-bright" : "--line-" + k).trim();
        colors[k] = v || "#888";
      });
      if (onlyLine) {
        // Single-line maps use the line colour for every square.
        order.forEach(function (k) {
          colors[k] = colors[onlyLine];
        });
      }
      if (surface === "night") {
        label = "#c3cbef";
        rule = "rgba(214, 222, 255, 0.18)";
        ring = "#ffffff";
        wash = "rgba(214, 222, 255, 0.10)";
      } else {
        label = cs.getPropertyValue("--ink-3").trim() || label;
        rule = cs.getPropertyValue("--rule-strong").trim() || rule;
        ring = cs.getPropertyValue("--ink").trim() || ring;
        wash = cs.getPropertyValue("--paper-2").trim() || wash;
      }
    }

    var squares = [];
    var W = 0;
    var H = 0;
    var labelH = 24;
    var colW = 0;
    var hover = null;
    var hoverYear = null;
    var focusLine = null;
    var previewLine = null;
    var visible = null; // set of keys allowed by page filters, or null for all
    var activeYear = null;
    var startTime = null;
    var animDone = animateMode === "none";
    var started = false;
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
      var maxSize = parseFloat(el.getAttribute("data-max-size")) || 24;
      var size = Math.min(maxSize, (colW * 0.8 - (perRow - 1) * gap) / perRow, (H - labelH - 6 - (rows - 1) * gap) / rows);
      size = Math.max(4, Math.floor(size));
      squares = [];
      years.forEach(function (yr, i) {
        var blockW = perRow * size + (perRow - 1) * gap;
        var x0 = Math.round(colW * (i + 0.5) - blockW / 2);
        byYear[yr].forEach(function (p, k) {
          var row = Math.floor(k / perRow);
          var col = k % perRow;
          squares.push({
            p: p,
            year: yr,
            x: x0 + col * (size + gap),
            y: H - labelH - (row + 1) * size - row * gap,
            s: size,
            delay: i * 60 + row * 40,
          });
        });
      });
    }

    function lit(sq) {
      var line = previewLine || focusLine;
      if (line && sq.p.line !== line) return false;
      if (visible && !visible[sq.p.key]) return false;
      return true;
    }

    function draw(now) {
      ctx.clearRect(0, 0, W, H);
      var yearIdx = activeYear ? years.indexOf(+activeYear) : -1;
      [yearIdx, yearFilter && hoverYear ? years.indexOf(hoverYear) : -1].forEach(function (idx, n) {
        if (idx < 0 || (n === 1 && idx === yearIdx)) return;
        ctx.globalAlpha = n === 0 ? 1 : 0.6;
        ctx.fillStyle = wash;
        roundRect(ctx, colW * idx + 2, 0, colW - 4, H - labelH + 2, 6);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.fillStyle = rule;
      ctx.fillRect(0, H - labelH + 2, W, 1);
      ctx.fillStyle = label;
      ctx.font = "500 12px Archivo, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      var step = colW >= 40 ? 1 : colW >= 22 ? 2 : 3;
      years.forEach(function (yr, i) {
        var isLast = i === years.length - 1;
        if (i % step !== 0 && !isLast) return;
        if (!isLast && step > 1 && years.length - 1 - i < step) return;
        ctx.font = (i === yearIdx ? "700 " : "500 ") + "12px Archivo, system-ui, sans-serif";
        ctx.fillText(colW >= 40 ? String(yr) : "’" + String(yr).slice(2), colW * (i + 0.5), H - labelH + 8);
      });

      var pending = false;
      squares.forEach(function (sq) {
        var t = 1;
        if (!animDone) {
          t = startTime === null ? 0 : Math.min(1, Math.max(0, (now - startTime - sq.delay) / 520));
          if (t < 1) pending = true;
        }
        var e = 1 - Math.pow(1 - t, 3);
        var alpha = e * (lit(sq) ? 1 : 0.16);
        if (alpha <= 0) return;
        ctx.globalAlpha = alpha;
        var c = colors[sq.p.line] || colors.other;
        var yOff = sq.y - (1 - e) * 36;
        if (sq.p.kind === "journal" || sq.p.kind === "conference") {
          ctx.fillStyle = c;
          roundRect(ctx, sq.x, yOff, sq.s, sq.s, Math.min(4, sq.s / 4));
          ctx.fill();
        } else {
          // Preprints, abstracts, theses, patents and books: hollow squares.
          var lw = Math.max(1.5, sq.s / 7);
          ctx.lineWidth = lw;
          ctx.strokeStyle = c;
          roundRect(ctx, sq.x + lw / 2, yOff + lw / 2, sq.s - lw, sq.s - lw, Math.min(3.5, sq.s / 4));
          ctx.stroke();
        }
        if (hover === sq) {
          ctx.globalAlpha = 1;
          ctx.lineWidth = 2;
          ctx.strokeStyle = ring;
          roundRect(ctx, sq.x - 2.5, sq.y - 2.5, sq.s + 5, sq.s + 5, Math.min(5, sq.s / 3));
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;
      if (pending) {
        if (started) window.requestAnimationFrame(draw);
      } else {
        animDone = true;
      }
    }

    function redraw() {
      if (animDone || !started) draw(0);
    }

    // tolerance: extra reach in px; touch uses a larger one so small squares
    // on phones are still easy to tap (nearest square within reach wins).
    function hit(x, y, tolerance) {
      var reach = tolerance || 2;
      var best = null;
      var bestD = Infinity;
      for (var i = 0; i < squares.length; i++) {
        var sq = squares[i];
        if (x >= sq.x - 2 && x <= sq.x + sq.s + 2 && y >= sq.y - 2 && y <= sq.y + sq.s + 2) return sq;
        if (reach > 2) {
          var dx = Math.max(sq.x - x, 0, x - (sq.x + sq.s));
          var dy = Math.max(sq.y - y, 0, y - (sq.y + sq.s));
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d <= reach && d < bestD) {
            best = sq;
            bestD = d;
          }
        }
      }
      return best;
    }

    function yearAt(x, y) {
      if (y < 0 || y > H) return null;
      var i = Math.floor(x / colW);
      return years[i] || null;
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
      var action = clickMode === "scroll" ? "Click to jump to it in the list" : p.url ? "Click to open the paper" : "Click to find it in publications";
      [
        ["tip-line", names[p.line] || names.other],
        ["tip-title", p.title],
        ["tip-meta", (KIND_LABEL[p.kind] ? KIND_LABEL[p.kind] + ". " : "") + (p.venue ? p.venue + ", " : "") + p.year],
        ["tip-open", action],
      ].forEach(function (part) {
        var d = document.createElement("div");
        d.className = part[0];
        d.textContent = part[1];
        tip.appendChild(d);
      });
      tip.hidden = false;
      var tw = tip.offsetWidth;
      var th = tip.offsetHeight;
      tip.style.left = Math.min(Math.max(0, sq.x + sq.s / 2 - tw / 2), Math.max(0, W - tw)) + "px";
      var top = sq.y - th - 12;
      if (top < -60) top = sq.y + sq.s + 12;
      tip.style.top = top + "px";
    }

    function hideTip() {
      if (tip) tip.hidden = true;
    }

    function setHover(sq, yr) {
      var changed = sq !== hover || yr !== hoverYear;
      hover = sq;
      hoverYear = yr;
      el.style.cursor = sq || (yearFilter && yr) ? "pointer" : "";
      if (sq) showTip(sq);
      else hideTip();
      if (changed) redraw();
    }

    function point(e) {
      var r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function activate(sq) {
      if (clickMode === "scroll") {
        var target = document.getElementById("pub-" + sq.p.key);
        if (!target) return;
        var li = target.closest("li") || target;
        if (li.hidden) return;
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        target.classList.remove("is-flash");
        void target.offsetWidth;
        target.classList.add("is-flash");
        var link = target.querySelector(".pub-title a, .pub-toggle");
        if (link) link.focus({ preventScroll: true });
        return;
      }
      window.open(sq.p.url || pubsUrl + "?q=" + encodeURIComponent(sq.p.title), "_blank", "noopener");
    }

    el.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      var pt = point(e);
      setHover(hit(pt.x, pt.y), yearAt(pt.x, pt.y));
    });
    el.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "touch") return;
      setHover(null, null);
    });
    el.addEventListener("pointerup", function (e) {
      var pt = point(e);
      var sq = hit(pt.x, pt.y, e.pointerType === "touch" ? 18 : 2);
      if (sq) {
        if (e.pointerType === "touch" && hover !== sq) {
          setHover(sq, null);
          return;
        }
        activate(sq);
        return;
      }
      setHover(null, null);
      if (yearFilter) {
        var yr = yearAt(pt.x, pt.y);
        if (yr) {
          el.dispatchEvent(
            new CustomEvent("papermap:year", { bubbles: true, detail: { year: String(activeYear) === String(yr) ? "all" : String(yr) } })
          );
        }
      }
    });

    el.addEventListener("papermap:filter", function (e) {
      var d = e.detail || {};
      if (d.keys) {
        visible = {};
        d.keys.forEach(function (k) {
          visible[k] = true;
        });
      } else {
        visible = null;
      }
      activeYear = d.year && d.year !== "all" ? d.year : null;
      redraw();
    });

    // Keyboard: Tab to the map, arrow keys move between papers (left/right by
    // paper, up/down within a year), Enter opens, Escape leaves the paper.
    el.tabIndex = 0;
    el.setAttribute("role", "group");
    el.setAttribute("aria-roledescription", "paper map");
    el.setAttribute(
      "aria-label",
      (el.getAttribute("aria-label") || "Paper map") + " Use the arrow keys to move between papers and Enter to open one."
    );
    function litSquares() {
      return squares.filter(lit);
    }
    el.addEventListener("keydown", function (e) {
      var list = litSquares();
      if (!list.length) return;
      var i = list.indexOf(hover);
      var next = null;
      switch (e.key) {
        case "ArrowRight":
          next = list[i < 0 ? list.length - 1 : Math.min(list.length - 1, i + 1)];
          break;
        case "ArrowLeft":
          next = list[i < 0 ? list.length - 1 : Math.max(0, i - 1)];
          break;
        case "ArrowUp":
        case "ArrowDown":
          if (i < 0) {
            // Start at the bottom of the newest year's column.
            var newest = list[list.length - 1].p.year;
            next = list.filter(function (sq) {
              return sq.p.year === newest;
            })[0];
            break;
          }
          var same = list.filter(function (sq) {
            return sq.p.year === hover.p.year;
          });
          var j = same.indexOf(hover) + (e.key === "ArrowUp" ? 1 : -1);
          next = same[Math.max(0, Math.min(same.length - 1, j))];
          break;
        case "Home":
          next = list[0];
          break;
        case "End":
          next = list[list.length - 1];
          break;
        case "Enter":
        case " ":
          if (hover) {
            e.preventDefault();
            activate(hover);
          }
          return;
        case "Escape":
          setHover(null, null);
          return;
        default:
          return;
      }
      e.preventDefault();
      if (next) setHover(next, null);
    });
    el.addEventListener("blur", function () {
      setHover(null, null);
    });

    var chips = Array.prototype.slice.call(group.querySelectorAll(".legend-chip[data-line]"));
    chips.forEach(function (chip) {
      var key = chip.getAttribute("data-line");
      chip.addEventListener("click", function () {
        focusLine = focusLine === key ? null : key;
        chips.forEach(function (c) {
          c.setAttribute("aria-pressed", c.getAttribute("data-line") === focusLine ? "true" : "false");
        });
        redraw();
      });
      ["pointerenter", "focus"].forEach(function (ev) {
        chip.addEventListener(ev, function () {
          previewLine = key;
          redraw();
        });
      });
      ["pointerleave", "blur"].forEach(function (ev) {
        chip.addEventListener(ev, function () {
          previewLine = null;
          redraw();
        });
      });
    });

    function start() {
      if (started) return;
      started = true;
      readColors();
      layout();
      if (animDone) {
        draw(0);
        return;
      }
      window.requestAnimationFrame(function (t) {
        startTime = t;
        draw(t);
      });
    }

    // Draw a still frame straight away so the page is complete at rest.
    readColors();
    layout();
    if (animDone) draw(0);

    function go() {
      if (animateMode === "view" && "IntersectionObserver" in window) {
        var io = new IntersectionObserver(
          function (entries) {
            if (entries[0].isIntersecting) {
              io.disconnect();
              start();
            }
          },
          { threshold: 0.35 }
        );
        io.observe(el);
      } else {
        start();
      }
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go, go);
    else go();

    var lastW = el.clientWidth;
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

    // Repaint with the right colours when the theme changes.
    function retheme() {
      readColors();
      redraw();
    }
    new MutationObserver(retheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", retheme);
    }
  }

  maps.forEach(PaperMap);
})();
