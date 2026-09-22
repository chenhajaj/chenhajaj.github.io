---
layout: page
title: Dashboard
permalink: /dashboard/
description: Private pipeline tracker for works in progress.
nav: false
robots: noindex, nofollow
---

<!--
  PASSWORD: this page is gated client-side only (GitHub Pages is static, so
  there's no real server-side auth available without extra infrastructure -
  see the "Publication Tracking" plan doc for the trade-off and the
  Cloudflare Access alternative). Treat this as "keeps it off Google and out
  of casual view," not as real security - anyone who opens dev tools can
  bypass it.

  To set your own username/password:
  1. Open a browser console anywhere and run (replace both values):
       crypto.subtle.digest("SHA-256", new TextEncoder().encode("your-username:your-password"))
         .then(b => console.log(Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, "0")).join("")))
  2. Paste the printed hash below as CREDENTIAL_HASH, replacing the placeholder.
  The placeholder hash below is for username "chen" / password "changeme" - replace it before publishing.
-->
<div id="dashboard-gate" style="max-width: 420px; margin: 4rem auto; text-align: center;">
  <p>This page is private. Sign in to continue.</p>
  <input type="text" id="dashboard-username" placeholder="Username" autocomplete="username" style="padding: 0.5rem; width: 100%; max-width: 260px; display: block; margin: 0 auto 0.5rem;" />
  <input type="password" id="dashboard-password" placeholder="Password" autocomplete="current-password" style="padding: 0.5rem; width: 100%; max-width: 260px; display: block; margin: 0 auto;" />
  <br />
  <button id="dashboard-unlock" class="btn btn-primary">Unlock</button>
  <p id="dashboard-error" style="color: #c0392b; display: none;">Wrong username or password.</p>
</div>

<div id="dashboard-content" style="display: none;">

<div class="pipeline-summary">
  {% assign rows = site.data.pipeline %}
  {% assign total = rows | size %}
  {% assign working = rows | where: "status", "working" | size %}
  {% assign submitted = rows | where: "status", "submitted" | size %}
  {% assign revisions = rows | where: "status", "revisions" | size %}
  {% assign accepted = rows | where: "status", "accepted" | size %}
  <p><strong>{{ total }}</strong> works in progress &mdash; {{ working }} working &middot; {{ submitted }} submitted &middot; {{ revisions }} in revisions{% if accepted > 0 %} &middot; {{ accepted }} accepted{% endif %}</p>
</div>

{% assign statuses = "working,submitted,revisions,accepted,paused" | split: "," %}
{% assign status_labels = "Working,Submitted,In Revisions,Accepted,Paused" | split: "," %}

{% for status in statuses %}
  {% assign group = rows | where: "status", status %}
  {% if group.size > 0 %}
    {% assign idx = forloop.index0 %}
    <h2>{{ status_labels[idx] }} ({{ group.size }})</h2>
    <table class="pipeline-table">
      <thead>
        <tr><th>Owner</th><th>Topic</th><th>Track</th><th>Venue</th></tr>
      </thead>
      <tbody>
        {% for row in group %}
        <tr>
          <td>{{ row.owner }}</td>
          <td>{{ row.topic }}</td>
          <td>{{ row.track | capitalize }}</td>
          <td>{{ row.venue | default: "&mdash;" }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  {% endif %}
{% endfor %}

<p style="margin-top: 2rem; font-size: 0.85rem; color: var(--global-text-color-light);">
  Source of truth: <code>_data/pipeline.yml</code> in this repo. Edit that file to update this page &mdash;
  published work lives in <code>_bibliography/papers.bib</code> and shows on <a href="/publications/">/publications/</a> instead.
</p>

</div>

<style>
  .pipeline-table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
  .pipeline-table th, .pipeline-table td { text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--global-divider-color); }
  .pipeline-table th { font-weight: 700; }
</style>

<script>
(function () {
  var CREDENTIAL_HASH = "39063bf05c924f642a5b1c2e237cc40b996537229c7d2138e474afb40bed7241"; // sha-256("chen:changeme") placeholder - replace me
  var SESSION_KEY = "dashboard-unlocked";

  function sha256Hex(text) {
    var enc = new TextEncoder().encode(text);
    return crypto.subtle.digest("SHA-256", enc).then(function (buf) {
      return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
    });
  }

  function reveal() {
    document.getElementById("dashboard-gate").style.display = "none";
    document.getElementById("dashboard-content").style.display = "block";
  }

  try {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      reveal();
    }
  } catch (e) { /* private mode / storage blocked: fall through to the prompt */ }

  var btn = document.getElementById("dashboard-unlock");
  var userInput = document.getElementById("dashboard-username");
  var passInput = document.getElementById("dashboard-password");
  var err = document.getElementById("dashboard-error");

  function tryUnlock() {
    var combined = (userInput.value || "") + ":" + (passInput.value || "");
    sha256Hex(combined).then(function (hash) {
      if (hash === CREDENTIAL_HASH) {
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
        reveal();
      } else {
        err.style.display = "block";
      }
    });
  }

  btn.addEventListener("click", tryUnlock);
  passInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") tryUnlock();
  });
})();
</script>
