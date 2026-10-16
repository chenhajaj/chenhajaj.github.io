module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  // Keep selectors that only appear at runtime or in future content
  // (keyboard focus, theme switching, markdown elements in news/notes).
  safelist: {
    standard: [/focus-visible/, /^h[1-6]$/, "hr", "blockquote", "kbd", "table", "person-extra", "more-link", "link-sans"],
    deep: [/data-theme/, /^is-/, /^fp-/],
    greedy: [/prose/, /^pub-/],
  },
};
