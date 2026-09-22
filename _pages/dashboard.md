---
layout: page
title: Dashboard
permalink: /dashboard/
description: Private pipeline tracker for works in progress.
nav: false
nav_order: 99
robots: noindex, nofollow
---

<!--
  Private "works in progress" dashboard — replaces the Publications Google Sheet.

  DATA
  The board reads _data/pipeline.yml at build time (so it always matches
  what's committed) and then edits happen client-side. Saving writes a new
  copy of that file straight to GitHub via the Contents API, using a
  Personal Access Token you paste in once. The token lives only in this
  browser tab's sessionStorage — it is never sent anywhere except
  api.github.com, and it disappears when you close the tab.

  Token needed: a fine-grained PAT scoped to this repo only, with
  "Contents: Read and write" permission.
  Create one at: https://github.com/settings/personal-access-tokens/new

  TARGET BRANCH
  Saves commit directly to the branch named in TARGET_BRANCH below.
  While this page is still on the wip-pipeline-dashboard branch (i.e.
  before PR #7 is merged), change it to "wip-pipeline-dashboard" so you're
  not editing main out from under the open PR. Switch it back to "main"
  once merged.

  LOGIN
  Not real security — GitHub Pages is static, so the page + gate logic are
  publicly downloadable. It just keeps the pipeline off Google search and
  out of casual view. Change the username/password by editing the two
  constants below and recomputing CREDENTIAL_HASH, e.g. in a browser console:
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode("newuser:newpass"))
      .then(b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join(""))
  Current placeholder is chen / changeme — change this before sharing the link.
-->

<div id="dashboard-gate" class="pd-gate">
  <div class="pd-gate-card">
    <div class="pd-gate-icon"><i class="fas fa-flask"></i></div>
    <h2>Research Pipeline</h2>
    <p>Sign in to see works in progress.</p>
    <input type="text" id="dashboard-username" placeholder="Username" autocomplete="username" class="pd-input" />
    <input type="password" id="dashboard-password" placeholder="Password" autocomplete="current-password" class="pd-input" />
    <button id="dashboard-unlock" class="pd-btn pd-btn-primary pd-unlock-btn">Unlock</button>
    <p id="dashboard-error" class="pd-error">Wrong username or password.</p>
  </div>
</div>

<div id="dashboard-content" class="pd-content" style="display: none;">

  <div class="pd-toolbar">
    <div class="pd-toolbar-title">
      <h1><i class="fas fa-flask"></i> Research Pipeline</h1>
      <p class="pd-subtitle" id="pd-subtitle">Loading&hellip;</p>
    </div>
    <div class="pd-toolbar-actions">
      <button id="pd-add-btn" class="pd-btn pd-btn-primary"><i class="fas fa-plus"></i> Add paper</button>
      <button id="pd-save-btn" class="pd-btn pd-btn-ghost" disabled>
        <i class="fas fa-cloud-arrow-up"></i> <span id="pd-save-label">Saved</span>
      </button>
      <button id="pd-logout-btn" class="pd-btn pd-btn-icon" title="Lock dashboard"><i class="fas fa-lock"></i></button>
    </div>
  </div>

  <div class="pd-stats" id="pd-stats"></div>

  <div class="pd-progress" id="pd-progress" role="img" aria-label="Pipeline status breakdown"></div>

  <div class="pd-controls">
    <div class="pd-search">
      <i class="fas fa-magnifying-glass"></i>
      <input type="text" id="pd-search" placeholder="Search owner or topic&hellip;" />
    </div>
    <div class="pd-chips" id="pd-track-chips">
      <button class="pd-chip is-active" data-track="all">All tracks</button>
      <button class="pd-chip" data-track="journal">Journal</button>
      <button class="pd-chip" data-track="conference">Conference</button>
    </div>
    <div class="pd-view-toggle">
      <button class="pd-view-btn is-active" data-view="board" title="Board view"><i class="fas fa-table-columns"></i></button>
      <button class="pd-view-btn" data-view="table" title="Table view"><i class="fas fa-list"></i></button>
    </div>
  </div>

  <div class="pd-board" id="pd-board"></div>
  <div class="pd-table-wrap" id="pd-table-wrap" style="display: none;">
    <table class="pd-table" id="pd-table">
      <thead>
        <tr>
          <th>Topic</th><th>Owner</th><th>Status</th><th>Track</th><th>Venue</th><th></th>
        </tr>
      </thead>
      <tbody id="pd-table-body"></tbody>
    </table>
  </div>

  <p class="pd-footnote">
    Source of truth: <code>_data/pipeline.yml</code>, edited from this page and committed straight to GitHub.
    Once a paper is actually accepted and published, move it into
    <code>_bibliography/papers.bib</code> so it shows up on the
    <a href="{{ '/publications/' | relative_url }}">Publications</a> page, and delete it here.
  </p>
</div>

<!-- Add / edit paper modal -->
<div id="pd-modal-backdrop" class="pd-modal-backdrop" style="display: none;">
  <div class="pd-modal">
    <div class="pd-modal-header">
      <h3 id="pd-modal-title">Add paper</h3>
      <button class="pd-modal-close" id="pd-modal-close" aria-label="Close"><i class="fas fa-xmark"></i></button>
    </div>
    <div class="pd-modal-body">
      <label class="pd-field">
        <span>Topic</span>
        <input type="text" id="pd-f-topic" placeholder="e.g. Federated dropout" />
      </label>
      <label class="pd-field">
        <span>Owner</span>
        <input type="text" id="pd-f-owner" placeholder="e.g. Natan" />
      </label>
      <div class="pd-field-row">
        <label class="pd-field">
          <span>Status</span>
          <select id="pd-f-status">
            <option value="working">Working</option>
            <option value="submitted">Submitted</option>
            <option value="revisions">In revisions</option>
            <option value="accepted">Accepted</option>
            <option value="paused">Paused</option>
          </select>
        </label>
        <label class="pd-field">
          <span>Track</span>
          <select id="pd-f-track">
            <option value="journal">Journal</option>
            <option value="conference">Conference</option>
          </select>
        </label>
      </div>
      <label class="pd-field">
        <span>Venue <em>(optional)</em></span>
        <input type="text" id="pd-f-venue" placeholder="e.g. AAAI" />
      </label>
    </div>
    <div class="pd-modal-footer">
      <button class="pd-btn pd-btn-danger" id="pd-f-delete" style="display: none;"><i class="fas fa-trash"></i> Delete</button>
      <div class="pd-modal-footer-right">
        <button class="pd-btn pd-btn-ghost" id="pd-f-cancel">Cancel</button>
        <button class="pd-btn pd-btn-primary" id="pd-f-save">Save paper</button>
      </div>
    </div>
  </div>
</div>
<!-- GitHub token modal -->
<div id="pd-token-backdrop" class="pd-modal-backdrop" style="display: none;">
  <div class="pd-modal pd-modal-narrow">
    <div class="pd-modal-header">
      <h3><i class="fab fa-github"></i> Connect to GitHub</h3>
      <button class="pd-modal-close" id="pd-token-close" aria-label="Close"><i class="fas fa-xmark"></i></button>
    </div>
    <div class="pd-modal-body">
      <p class="pd-token-help">
        Paste a fine-grained personal access token scoped to this repo with
        <strong>Contents: Read and write</strong>. It's kept only in this
        tab's session storage &mdash; never sent anywhere but
        <code>api.github.com</code>, and gone when you close the tab.
      </p>
      <a class="pd-token-link" href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">
        Create a token on GitHub <i class="fas fa-arrow-up-right-from-square"></i>
      </a>
      <label class="pd-field">
        <span>Personal access token</span>
        <input type="password" id="pd-token-input" placeholder="github_pat_&hellip;" autocomplete="off" />
      </label>
    </div>
    <div class="pd-modal-footer">
      <div class="pd-modal-footer-right">
        <button class="pd-btn pd-btn-ghost" id="pd-token-cancel">Cancel</button>
        <button class="pd-btn pd-btn-primary" id="pd-token-save">Save &amp; continue</button>
      </div>
    </div>
  </div>
</div>

<div id="pd-toast-container" class="pd-toast-container"></div>

<style>
  :root {
    --pd-working: #4f70be;
    --pd-submitted: #d9a441;
    --pd-revisions: #ef776f;
    --pd-accepted: #22a99a;
    --pd-paused: #8a8f98;
    /* Tied directly to this site's own theme variables (set on
       html[data-theme="dark|light"] by assets/js/theme.js) rather than a
       separate prefers-color-scheme guess, so the dashboard always matches
       whatever theme is actually active — including a manual toggle that
       differs from the OS setting. */
    --pd-bg: var(--global-bg-color, #f6f7f9);
    --pd-card-bg: var(--global-card-bg-color, #ffffff);
    --pd-border: var(--global-divider-color, #e5e7eb);
    --pd-text: var(--global-text-color, #1f2328);
    --pd-text-muted: var(--global-text-color-light, #6b7280);
    --pd-radius: 12px;
  }

  /* ---------- gate ---------- */
  .pd-gate { min-height: 60vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; }
  .pd-gate-card {
    background: var(--pd-card-bg); border: 1px solid var(--pd-border); border-radius: var(--pd-radius);
    padding: 2.5rem 2rem; max-width: 340px; width: 100%; text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.06);
  }
  .pd-gate-icon {
    width: 56px; height: 56px; margin: 0 auto 1rem; border-radius: 50%;
    background: linear-gradient(135deg, var(--pd-working), var(--pd-accepted));
    display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.4rem;
  }
  .pd-gate-card h2 { margin: 0 0 0.25rem; font-size: 1.3rem; }
  .pd-gate-card p { margin: 0 0 1.25rem; color: var(--pd-text-muted); font-size: 0.9rem; }
  .pd-input {
    width: 100%; box-sizing: border-box; padding: 0.65rem 0.85rem; margin-bottom: 0.6rem;
    border: 1px solid var(--pd-border); border-radius: 8px; font-size: 0.95rem;
    background: var(--pd-bg); color: var(--pd-text);
  }
  .pd-unlock-btn { width: 100%; margin-top: 0.4rem; }
  .pd-error { display: none; color: var(--pd-revisions); font-size: 0.85rem; margin: 0.6rem 0 0; }
  .pd-error.is-visible { display: block; }

  /* ---------- buttons ---------- */
  .pd-btn {
    display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.88rem; font-weight: 600;
    padding: 0.55rem 1rem; border-radius: 8px; border: 1px solid transparent; cursor: pointer;
    transition: transform 0.1s ease, box-shadow 0.15s ease, background 0.15s ease; white-space: nowrap;
  }
  .pd-btn:active { transform: scale(0.97); }
  .pd-btn:disabled { opacity: 0.55; cursor: default; transform: none; }
  .pd-btn-primary { background: var(--pd-working); color: #fff; }
  .pd-btn-primary:not(:disabled):hover { box-shadow: 0 4px 14px rgba(79,112,190,0.35); }
  .pd-btn-ghost { background: transparent; color: var(--pd-text); border-color: var(--pd-border); }
  .pd-btn-ghost:not(:disabled):hover { background: var(--pd-bg); }
  .pd-btn-danger { background: transparent; color: var(--pd-revisions); border-color: var(--pd-revisions); }
  .pd-btn-danger:hover { background: rgba(239,119,111,0.1); }
  .pd-btn-icon { padding: 0.55rem 0.7rem; background: transparent; color: var(--pd-text-muted); border-color: var(--pd-border); }
  .pd-btn-icon:hover { color: var(--pd-text); background: var(--pd-bg); }
  .pd-btn.is-dirty { background: var(--pd-submitted); color: #fff; border-color: transparent; }
  .pd-btn.is-saving { opacity: 0.75; }
  .pd-spin { animation: pd-spin 0.8s linear infinite; }
  @keyframes pd-spin { to { transform: rotate(360deg); } }

  /* ---------- toolbar ---------- */
  .pd-toolbar { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 1rem; margin-bottom: 1.5rem; }
  .pd-toolbar-title h1 { margin: 0 0 0.15rem; font-size: 1.7rem; display: flex; align-items: center; gap: 0.5rem; }
  .pd-subtitle { margin: 0; color: var(--pd-text-muted); font-size: 0.92rem; }
  .pd-toolbar-actions { display: flex; gap: 0.5rem; align-items: center; }

  /* ---------- stats ---------- */
  .pd-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 0.75rem; margin-bottom: 1rem; }
  .pd-stat {
    background: var(--pd-card-bg); border: 1px solid var(--pd-border); border-radius: var(--pd-radius);
    padding: 0.9rem 1rem; border-top: 3px solid var(--pd-stat-color, var(--pd-working));
    box-shadow: 0 2px 8px rgba(0,0,0,0.03); transition: transform 0.15s ease;
  }
  .pd-stat:hover { transform: translateY(-2px); }
  .pd-stat-num { font-size: 1.6rem; font-weight: 700; line-height: 1; }
  .pd-stat-label { color: var(--pd-text-muted); font-size: 0.78rem; margin-top: 0.3rem; text-transform: uppercase; letter-spacing: 0.03em; }

  /* ---------- progress ---------- */
  .pd-progress { display: flex; height: 10px; border-radius: 999px; overflow: hidden; margin-bottom: 1.5rem; background: var(--pd-border); }
  .pd-progress-seg { transition: width 0.4s ease; }

  /* ---------- controls ---------- */
  .pd-controls { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin-bottom: 1.25rem; }
  .pd-search { position: relative; flex: 1 1 220px; max-width: 320px; }
  .pd-search i { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--pd-text-muted); font-size: 0.85rem; }
  .pd-search input {
    width: 100%; box-sizing: border-box; padding: 0.55rem 0.8rem 0.55rem 2.1rem;
    border: 1px solid var(--pd-border); border-radius: 999px; background: var(--pd-card-bg); color: var(--pd-text); font-size: 0.88rem;
  }
  .pd-chips { display: flex; gap: 0.4rem; }
  .pd-chip {
    border: 1px solid var(--pd-border); background: var(--pd-card-bg); color: var(--pd-text-muted);
    border-radius: 999px; padding: 0.4rem 0.85rem; font-size: 0.82rem; cursor: pointer; font-weight: 600;
  }
  .pd-chip.is-active { background: var(--pd-working); color: #fff; border-color: transparent; }
  .pd-view-toggle { display: flex; gap: 0.25rem; margin-left: auto; border: 1px solid var(--pd-border); border-radius: 8px; padding: 0.2rem; }
  .pd-view-btn { border: none; background: transparent; color: var(--pd-text-muted); padding: 0.35rem 0.6rem; border-radius: 6px; cursor: pointer; }
  .pd-view-btn.is-active { background: var(--pd-working); color: #fff; }

  /* ---------- board ---------- */
  .pd-board { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; align-items: start; }
  .pd-column { background: var(--pd-bg); border-radius: var(--pd-radius); padding: 0.75rem; min-height: 80px; }
  .pd-column-header {
    display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 0.85rem;
    padding: 0.2rem 0.3rem 0.7rem; border-bottom: 3px solid var(--pd-col-color, var(--pd-working)); margin-bottom: 0.6rem;
  }
  .pd-column-count {
    background: var(--pd-card-bg); border: 1px solid var(--pd-border); border-radius: 999px;
    font-size: 0.72rem; padding: 0.05rem 0.5rem; color: var(--pd-text-muted);
  }
  .pd-cards { display: flex; flex-direction: column; gap: 0.55rem; min-height: 40px; }
  .pd-cards.is-drag-over { background: rgba(79,112,190,0.08); border-radius: 8px; outline: 2px dashed var(--pd-working); outline-offset: 2px; }
  .pd-empty-col { color: var(--pd-text-muted); font-size: 0.78rem; text-align: center; padding: 1rem 0.5rem; opacity: 0.7; }

  .pd-card {
    background: var(--pd-card-bg); border: 1px solid var(--pd-border); border-radius: 10px; padding: 0.7rem 0.8rem;
    cursor: grab; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: transform 0.12s ease, box-shadow 0.12s ease;
  }
  .pd-card:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
  .pd-card.is-dragging { opacity: 0.4; }
  .pd-card-topic { font-weight: 700; font-size: 0.92rem; margin-bottom: 0.4rem; }
  .pd-card-meta { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; }
  .pd-avatar {
    width: 20px; height: 20px; border-radius: 50%; color: #fff; font-size: 0.65rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .pd-owner { font-size: 0.8rem; color: var(--pd-text-muted); }
  .pd-track { font-size: 0.68rem; font-weight: 700; padding: 0.1rem 0.45rem; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.02em; margin-left: auto; }
  .pd-track-journal { background: rgba(79,112,190,0.15); color: var(--pd-working); }
  .pd-track-conference { background: rgba(34,169,154,0.15); color: var(--pd-accepted); }
  .pd-venue { font-size: 0.78rem; color: var(--pd-text-muted); margin-bottom: 0.35rem; }
  .pd-venue i { width: 12px; }
  /* ---------- table ---------- */
  .pd-table-wrap { background: var(--pd-card-bg); border: 1px solid var(--pd-border); border-radius: var(--pd-radius); overflow: hidden; }
  .pd-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
  .pd-table th { text-align: left; padding: 0.6rem 0.9rem; background: var(--pd-bg); color: var(--pd-text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.03em; }
  .pd-table td { padding: 0.55rem 0.9rem; border-top: 1px solid var(--pd-border); }
  .pd-table tr:hover td { background: var(--pd-bg); }
  .pd-status-pill { font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.55rem; border-radius: 999px; color: #fff; display: inline-block; }
  .pd-row-edit { color: var(--pd-text-muted); cursor: pointer; background: none; border: none; font-size: 0.85rem; }
  .pd-row-edit:hover { color: var(--pd-working); }

  .pd-footnote { font-size: 0.8rem; color: var(--pd-text-muted); margin-top: 1.5rem; }

  /* ---------- modals ---------- */
  .pd-modal-backdrop {
    position: fixed; inset: 0; background: rgba(15,17,21,0.5); backdrop-filter: blur(2px);
    display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem;
  }
  .pd-modal {
    background: var(--pd-card-bg); border-radius: var(--pd-radius); max-width: 420px; width: 100%;
    box-shadow: 0 24px 60px rgba(0,0,0,0.25); max-height: 90vh; overflow-y: auto;
  }
  .pd-modal-narrow { max-width: 400px; }
  .pd-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.2rem 0.8rem; border-bottom: 1px solid var(--pd-border); }
  .pd-modal-header h3 { margin: 0; font-size: 1.05rem; }
  .pd-modal-close { background: none; border: none; color: var(--pd-text-muted); cursor: pointer; font-size: 1rem; padding: 0.2rem; }
  .pd-modal-body { padding: 1.1rem 1.2rem; }
  .pd-field { display: block; margin-bottom: 0.85rem; font-size: 0.82rem; color: var(--pd-text-muted); }
  .pd-field span { display: block; margin-bottom: 0.3rem; font-weight: 600; }
  .pd-field input, .pd-field select {
    width: 100%; box-sizing: border-box; padding: 0.55rem 0.7rem; border: 1px solid var(--pd-border);
    border-radius: 7px; background: var(--pd-bg); color: var(--pd-text); font-size: 0.9rem;
  }
  .pd-field-row { display: flex; gap: 0.7rem; }
  .pd-field-row .pd-field { flex: 1; }
  .pd-modal-footer { display: flex; justify-content: space-between; align-items: center; padding: 0.9rem 1.2rem 1.1rem; border-top: 1px solid var(--pd-border); }
  .pd-modal-footer-right { display: flex; gap: 0.5rem; margin-left: auto; }
  .pd-token-help { font-size: 0.85rem; color: var(--pd-text-muted); margin-top: 0; line-height: 1.5; }
  .pd-token-link { display: inline-block; font-size: 0.82rem; margin-bottom: 1rem; color: var(--pd-working); text-decoration: none; }
  .pd-token-link:hover { text-decoration: underline; }

  /* ---------- toasts ---------- */
  .pd-toast-container { position: fixed; bottom: 1.2rem; right: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem; z-index: 1100; }
  .pd-toast {
    background: var(--pd-text); color: var(--pd-bg); padding: 0.65rem 1rem; border-radius: 8px; font-size: 0.85rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 0.5rem;
    animation: pd-toast-in 0.2s ease;
  }
  .pd-toast.is-error { background: var(--pd-revisions); color: #fff; }
  @keyframes pd-toast-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 640px) {
    .pd-toolbar { flex-direction: column; align-items: stretch; }
    .pd-toolbar-actions { justify-content: flex-start; }
    .pd-controls { flex-direction: column; align-items: stretch; }
    .pd-view-toggle { margin-left: 0; align-self: flex-start; }
  }
</style>

<script>
(function () {
  "use strict";

  // ---------- config ----------
  var CREDENTIAL_HASH = "39063bf05c924f642a5b1c2e237cc40b996537229c7d2138e474afb40bed7241"; // sha256("chen:changeme")
  var REPO = "chenhajaj/chenhajaj.github.io";
  var DATA_PATH = "_data/pipeline.yml";
  var TARGET_BRANCH = "wip-pipeline-dashboard"; // switch to "main" once PR #7 is merged
  var STATUSES = ["working", "submitted", "revisions", "accepted", "paused"];
  var STATUS_LABEL = { working: "Working", submitted: "Submitted", revisions: "In revisions", accepted: "Accepted", paused: "Paused" };
  var STATUS_ICON = { working: "fa-pen", submitted: "fa-paper-plane", revisions: "fa-rotate", accepted: "fa-circle-check", paused: "fa-pause" };

  var PIPELINE_DATA = {{ site.data.pipeline | jsonify }};

  // ---------- gate ----------
  var gate = document.getElementById("dashboard-gate");
  var content = document.getElementById("dashboard-content");
  var userInput = document.getElementById("dashboard-username");
  var passInput = document.getElementById("dashboard-password");
  var unlockBtn = document.getElementById("dashboard-unlock");
  var errorMsg = document.getElementById("dashboard-error");

  function sha256Hex(str) {
    var enc = new TextEncoder().encode(str);
    return crypto.subtle.digest("SHA-256", enc).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return b.toString(16).padStart(2, "0"); }).join("");
    });
  }

  function tryUnlock() {
    var combined = (userInput.value || "").trim() + ":" + (passInput.value || "");
    sha256Hex(combined).then(function (hash) {
      if (hash === CREDENTIAL_HASH) {
        sessionStorage.setItem("pd_unlocked", "1");
        errorMsg.classList.remove("is-visible");
        showDashboard();
      } else {
        errorMsg.classList.add("is-visible");
      }
    });
  }
  unlockBtn.addEventListener("click", tryUnlock);
  passInput.addEventListener("keydown", function (e) { if (e.key === "Enter") tryUnlock(); });
  userInput.addEventListener("keydown", function (e) { if (e.key === "Enter") passInput.focus(); });

  document.getElementById("pd-logout-btn").addEventListener("click", function () {
    sessionStorage.removeItem("pd_unlocked");
    gate.style.display = "flex";
    content.style.display = "none";
    userInput.value = "";
    passInput.value = "";
  });

  function showDashboard() {
    gate.style.display = "none";
    content.style.display = "block";
    initDashboard();
  }

  if (sessionStorage.getItem("pd_unlocked") === "1") {
    showDashboard();
  }

  // ---------- dashboard state ----------
  var data = null;
  var dirty = false;
  var view = "board";
  var trackFilter = "all";
  var searchTerm = "";
  var editingIndex = null; // index into `data` while modal is open, or null when adding
  var initialized = false;

  function initDashboard() {
    if (initialized) { render(); return; }
    initialized = true;
    data = JSON.parse(JSON.stringify(PIPELINE_DATA));
    wireControls();
    wireModal();
    wireTokenModal();
    render();
  }

  function ownerColor(name) {
    var palette = ["#4f70be", "#d9a441", "#ef776f", "#22a99a", "#8a6fd4", "#3f9ecc", "#c96fb0", "#6aa84f"];
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return palette[h % palette.length];
  }
  function initials(name) {
    return name.split(/\s+/).map(function (p) { return p[0]; }).join("").slice(0, 2).toUpperCase();
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function filteredData() {
    var term = searchTerm.trim().toLowerCase();
    return data.filter(function (r) {
      if (trackFilter !== "all" && r.track !== trackFilter) return false;
      if (!term) return true;
      return (r.owner + " " + r.topic).toLowerCase().indexOf(term) !== -1;
    });
  }

  // ---------- rendering ----------
  function render() {
    renderStats();
    renderProgress();
    if (view === "board") { renderBoard(); } else { renderTable(); }
    updateSubtitle();
    updateSaveButton();
  }

  function updateSubtitle() {
    document.getElementById("pd-subtitle").textContent =
      data.length + " work" + (data.length === 1 ? "" : "s") + " in progress, tracked from submission to publication.";
  }

  function renderStats() {
    var el = document.getElementById("pd-stats");
    el.innerHTML = STATUSES.map(function (s) {
      var count = data.filter(function (r) { return r.status === s; }).length;
      return '<div class="pd-stat" style="--pd-stat-color: var(--pd-' + s + ')">' +
        '<div class="pd-stat-num">' + count + '</div>' +
        '<div class="pd-stat-label">' + STATUS_LABEL[s] + '</div></div>';
    }).join("");
  }

  function renderProgress() {
    var el = document.getElementById("pd-progress");
    var total = data.length || 1;
    el.innerHTML = STATUSES.map(function (s) {
      var count = data.filter(function (r) { return r.status === s; }).length;
      if (!count) return "";
      var pct = (count / total) * 100;
      return '<div class="pd-progress-seg" style="width:' + pct + '%; background: var(--pd-' + s + ')" title="' +
        STATUS_LABEL[s] + ": " + count + '"></div>';
    }).join("");
  }

  function cardHtml(row) {
    var idx = data.indexOf(row);
    return '<div class="pd-card" draggable="true" data-index="' + idx + '">' +
      '<div class="pd-card-topic">' + esc(row.topic) + '</div>' +
      '<div class="pd-card-meta">' +
        '<div class="pd-avatar" style="background:' + ownerColor(row.owner) + '">' + esc(initials(row.owner)) + '</div>' +
        '<span class="pd-owner">' + esc(row.owner) + '</span>' +
        '<span class="pd-track pd-track-' + row.track + '">' + row.track.slice(0, 4) + '</span>' +
      '</div>' +
      (row.venue ? '<div class="pd-venue"><i class="fas fa-location-dot"></i> ' + esc(row.venue) + '</div>' : "") +
    '</div>';
  }

  function renderBoard() {
    var board = document.getElementById("pd-board");
    var rows = filteredData();
    board.innerHTML = STATUSES.map(function (s) {
      var group = rows.filter(function (r) { return r.status === s; });
      var cards = group.length
        ? group.map(cardHtml).join("")
        : '<div class="pd-empty-col">No papers here</div>';
      return '<div class="pd-column pd-column-' + s + '">' +
        '<div class="pd-column-header" style="--pd-col-color: var(--pd-' + s + ')">' +
          '<span><i class="fas ' + STATUS_ICON[s] + '"></i> ' + STATUS_LABEL[s] + '</span>' +
          '<span class="pd-column-count">' + group.length + '</span>' +
        '</div>' +
        '<div class="pd-cards" data-status="' + s + '">' + cards + '</div>' +
      '</div>';
    }).join("");

    board.querySelectorAll(".pd-card").forEach(function (card) {
      card.addEventListener("click", function () { openModal(parseInt(card.dataset.index, 10)); });
      card.addEventListener("dragstart", function (e) {
        card.classList.add("is-dragging");
        e.dataTransfer.setData("text/plain", card.dataset.index);
        e.dataTransfer.effectAllowed = "move";
      });
      card.addEventListener("dragend", function () { card.classList.remove("is-dragging"); });
    });

    board.querySelectorAll(".pd-cards").forEach(function (col) {
      col.addEventListener("dragover", function (e) { e.preventDefault(); col.classList.add("is-drag-over"); });
      col.addEventListener("dragleave", function () { col.classList.remove("is-drag-over"); });
      col.addEventListener("drop", function (e) {
        e.preventDefault();
        col.classList.remove("is-drag-over");
        var idx = parseInt(e.dataTransfer.getData("text/plain"), 10);
        var newStatus = col.dataset.status;
        if (!isNaN(idx) && data[idx] && data[idx].status !== newStatus) {
          data[idx].status = newStatus;
          markDirty();
          render();
        }
      });
    });
  }

  function renderTable() {
    var body = document.getElementById("pd-table-body");
    var rows = filteredData();
    body.innerHTML = rows.map(function (row) {
      var idx = data.indexOf(row);
      return "<tr>" +
        "<td>" + esc(row.topic) + "</td>" +
        "<td>" + esc(row.owner) + "</td>" +
        '<td><span class="pd-status-pill" style="background: var(--pd-' + row.status + ')">' + STATUS_LABEL[row.status] + "</span></td>" +
        "<td>" + row.track.charAt(0).toUpperCase() + row.track.slice(1) + "</td>" +
        "<td>" + (row.venue ? esc(row.venue) : "&ndash;") + "</td>" +
        '<td><button class="pd-row-edit" data-index="' + idx + '"><i class="fas fa-pen"></i></button></td>' +
      "</tr>";
    }).join("");
    body.querySelectorAll(".pd-row-edit").forEach(function (btn) {
      btn.addEventListener("click", function () { openModal(parseInt(btn.dataset.index, 10)); });
    });
  }

  // ---------- controls ----------
  function wireControls() {
    document.getElementById("pd-search").addEventListener("input", function (e) {
      searchTerm = e.target.value;
      render();
    });
    document.querySelectorAll(".pd-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll(".pd-chip").forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        trackFilter = chip.dataset.track;
        render();
      });
    });
    document.querySelectorAll(".pd-view-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".pd-view-btn").forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        view = btn.dataset.view;
        document.getElementById("pd-board").style.display = view === "board" ? "grid" : "none";
        document.getElementById("pd-table-wrap").style.display = view === "table" ? "block" : "none";
        render();
      });
    });
    document.getElementById("pd-add-btn").addEventListener("click", function () { openModal(null); });
    document.getElementById("pd-save-btn").addEventListener("click", saveToGithub);
  }

  // ---------- add/edit modal ----------
  function wireModal() {
    document.getElementById("pd-modal-close").addEventListener("click", closeModal);
    document.getElementById("pd-f-cancel").addEventListener("click", closeModal);
    document.getElementById("pd-modal-backdrop").addEventListener("click", function (e) {
      if (e.target.id === "pd-modal-backdrop") closeModal();
    });
    document.getElementById("pd-f-save").addEventListener("click", saveModalForm);
    document.getElementById("pd-f-delete").addEventListener("click", function () {
      if (editingIndex === null) return;
      if (!confirm("Remove this paper from the pipeline?")) return;
      data.splice(editingIndex, 1);
      markDirty();
      closeModal();
      render();
    });
  }

  function openModal(index) {
    editingIndex = index;
    var isEdit = index !== null;
    document.getElementById("pd-modal-title").textContent = isEdit ? "Edit paper" : "Add paper";
    document.getElementById("pd-f-delete").style.display = isEdit ? "inline-flex" : "none";
    var row = isEdit ? data[index] : { owner: "", topic: "", status: "working", track: "journal", venue: "" };
    document.getElementById("pd-f-topic").value = row.topic || "";
    document.getElementById("pd-f-owner").value = row.owner || "";
    document.getElementById("pd-f-status").value = row.status || "working";
    document.getElementById("pd-f-track").value = row.track || "journal";
    document.getElementById("pd-f-venue").value = row.venue || "";
    document.getElementById("pd-modal-backdrop").style.display = "flex";
    document.getElementById("pd-f-topic").focus();
  }
  function closeModal() {
    document.getElementById("pd-modal-backdrop").style.display = "none";
    editingIndex = null;
  }
  function saveModalForm() {
    var topic = document.getElementById("pd-f-topic").value.trim();
    var owner = document.getElementById("pd-f-owner").value.trim();
    if (!topic || !owner) { showToast("Topic and owner are required", true); return; }
    var row = {
      owner: owner,
      topic: topic,
      status: document.getElementById("pd-f-status").value,
      track: document.getElementById("pd-f-track").value,
      venue: document.getElementById("pd-f-venue").value.trim(),
    };
    if (!row.venue) delete row.venue;
    if (editingIndex !== null) {
      data[editingIndex] = row;
    } else {
      data.push(row);
    }
    markDirty();
    closeModal();
    render();
  }

  // ---------- dirty / save state ----------
  function markDirty() {
    dirty = true;
    updateSaveButton();
  }
  function updateSaveButton() {
    var btn = document.getElementById("pd-save-btn");
    var label = document.getElementById("pd-save-label");
    btn.disabled = !dirty;
    btn.classList.toggle("is-dirty", dirty);
    label.textContent = dirty ? "Save to GitHub" : "Saved";
  }

  // ---------- GitHub token modal ----------
  function wireTokenModal() {
    document.getElementById("pd-token-close").addEventListener("click", closeTokenModal);
    document.getElementById("pd-token-cancel").addEventListener("click", closeTokenModal);
    document.getElementById("pd-token-backdrop").addEventListener("click", function (e) {
      if (e.target.id === "pd-token-backdrop") closeTokenModal();
    });
    document.getElementById("pd-token-save").addEventListener("click", function () {
      var token = document.getElementById("pd-token-input").value.trim();
      if (!token) return;
      sessionStorage.setItem("pd_gh_token", token);
      closeTokenModal();
      saveToGithub();
    });
  }
  function openTokenModal() {
    document.getElementById("pd-token-input").value = "";
    document.getElementById("pd-token-backdrop").style.display = "flex";
    document.getElementById("pd-token-input").focus();
  }
  function closeTokenModal() {
    document.getElementById("pd-token-backdrop").style.display = "none";
  }

  // ---------- toasts ----------
  function showToast(msg, isError) {
    var container = document.getElementById("pd-toast-container");
    var el = document.createElement("div");
    el.className = "pd-toast" + (isError ? " is-error" : "");
    el.innerHTML = '<i class="fas ' + (isError ? "fa-triangle-exclamation" : "fa-check") + '"></i> ' + esc(msg);
    container.appendChild(el);
    setTimeout(function () { el.remove(); }, isError ? 6000 : 3200);
  }

  // ---------- YAML (round-trips with _data/pipeline.yml) ----------
  function yamlScalar(v) {
    var s = String(v);
    if (/^\s|\s$|[:#{}\[\],&*!|>'"%@`]/.test(s) || s === "") return JSON.stringify(s);
    return s;
  }
  function toYaml(rows) {
    var out = '# Works-in-progress pipeline (replaces the "Publications" Google Sheet).\n' +
      "# status: working | submitted | revisions | paused | accepted\n" +
      "# track:  journal | conference\n" +
      "# venue:  target/actual venue, when known (optional)\n";
    rows.forEach(function (r) {
      out += "- owner: " + yamlScalar(r.owner) + "\n";
      out += "  topic: " + yamlScalar(r.topic) + "\n";
      out += "  status: " + r.status + "\n";
      out += "  track: " + r.track + "\n";
      if (r.venue) out += "  venue: " + yamlScalar(r.venue) + "\n";
    });
    return out;
  }

  // ---------- save to GitHub ----------
  function base64EncodeUtf8(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  function setSaving(isSaving) {
    var btn = document.getElementById("pd-save-btn");
    var label = document.getElementById("pd-save-label");
    btn.disabled = isSaving || !dirty;
    btn.classList.toggle("is-saving", isSaving);
    label.innerHTML = isSaving ? '<i class="fas fa-circle-notch pd-spin"></i> Saving&hellip;' : (dirty ? "Save to GitHub" : "Saved");
  }

  function saveToGithub() {
    var token = sessionStorage.getItem("pd_gh_token");
    if (!token) { openTokenModal(); return; }

    setSaving(true);
    var apiBase = "https://api.github.com/repos/" + REPO + "/contents/" + DATA_PATH;

    fetch(apiBase + "?ref=" + encodeURIComponent(TARGET_BRANCH), {
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" },
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Couldn't read the current file (HTTP " + res.status + "). Check the token's repo access.");
        return res.json();
      })
      .then(function (fileJson) {
        var yamlText = toYaml(data);
        return fetch(apiBase, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Update pipeline.yml via dashboard",
            content: base64EncodeUtf8(yamlText),
            sha: fileJson.sha,
            branch: TARGET_BRANCH,
          }),
        });
      })
      .then(function (res) {
        return res.json().then(function (json) {
          if (!res.ok) throw new Error(json.message || "GitHub rejected the save (HTTP " + res.status + ")");
          return json;
        });
      })
      .then(function () {
        dirty = false;
        showToast("Saved to GitHub");
      })
      .catch(function (err) {
        showToast(err.message || "Save failed", true);
      })
      .finally(function () {
        setSaving(false);
      });
  }
})();
</script>
