/*
 * Circular scroll-progress ring overlaid on the #back-to-top button.
 * The ring fills as the user scrolls down the page.
 */
(function () {
  var BTN_ID = 'back-to-top';
  var RING_ID = 'back-to-top-ring-svg';
  var SIZE = 56;   // must match vanilla-back-to-top diameter (default 56px)
  var STROKE = 3;
  var RADIUS = (SIZE / 2) - (STROKE / 2);
  var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  function getScrollProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var docHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight
    ) - window.innerHeight;
    return docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
  }

  function attachRing(btn) {
    // Ensure button is a positioning parent
    btn.style.position = 'relative';
    btn.style.overflow = 'visible';

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', RING_ID);
    svg.setAttribute('width', SIZE);
    svg.setAttribute('height', SIZE);
    svg.setAttribute('viewBox', '0 0 ' + SIZE + ' ' + SIZE);
    svg.style.cssText = [
      'position:absolute',
      'top:0',
      'left:0',
      'pointer-events:none',
      'transform:rotate(-90deg)',
      'border-radius:50%',
      'z-index:1',
    ].join(';');

    // Background track
    var track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    track.setAttribute('cx', SIZE / 2);
    track.setAttribute('cy', SIZE / 2);
    track.setAttribute('r', RADIUS);
    track.setAttribute('fill', 'none');
    track.setAttribute('stroke', 'rgba(255,255,255,0.2)');
    track.setAttribute('stroke-width', STROKE);

    // Progress arc
    var arc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    arc.setAttribute('cx', SIZE / 2);
    arc.setAttribute('cy', SIZE / 2);
    arc.setAttribute('r', RADIUS);
    arc.setAttribute('fill', 'none');
    arc.setAttribute('stroke', 'rgba(255,255,255,0.85)');
    arc.setAttribute('stroke-width', STROKE);
    arc.setAttribute('stroke-linecap', 'round');
    arc.style.strokeDasharray = CIRCUMFERENCE;
    arc.style.strokeDashoffset = CIRCUMFERENCE;
    arc.style.transition = 'stroke-dashoffset 0.15s linear';

    svg.appendChild(track);
    svg.appendChild(arc);
    btn.appendChild(svg);

    function update() {
      var progress = getScrollProgress();
      arc.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function init() {
    // The button may be injected after DOMContentLoaded by vanilla-back-to-top
    var btn = document.getElementById(BTN_ID);
    if (btn) { attachRing(btn); return; }

    // Fallback: observe DOM insertions
    if (!('MutationObserver' in window)) return;
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        for (var j = 0; j < mutations[i].addedNodes.length; j++) {
          var node = mutations[i].addedNodes[j];
          if (node.id === BTN_ID) {
            observer.disconnect();
            attachRing(node);
            return;
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: false });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
