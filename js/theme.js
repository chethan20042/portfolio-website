// =========================
// Shared Theme Manager
// =========================
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");

  function applyTheme(isLight) {
    root.style.setProperty("--bg",      isLight ? "#f0f4f8" : "#080b10");
    root.style.setProperty("--surface", isLight ? "#ffffff" : "#0e1318");
    root.style.setProperty("--surface2",isLight ? "#e8edf5" : "#141a22");
    root.style.setProperty("--text",    isLight ? "#0a0f1a" : "#e8edf5");
    root.style.setProperty("--muted",   isLight ? "#5a6478" : "#6b7a90");
    root.style.setProperty("--border",  isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)");

    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.innerHTML = isLight
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    }
  }

  // Apply saved theme immediately on page load (before render)
  if (saved === "light") applyTheme(true);

  // Wire up button after DOM loads
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    // Set correct icon on load
    applyTheme(saved === "light");

    btn.addEventListener("click", () => {
      const isLight = localStorage.getItem("theme") !== "light";
      localStorage.setItem("theme", isLight ? "light" : "dark");
      applyTheme(isLight);
    });
  });
})();