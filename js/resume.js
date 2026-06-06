window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (header) header.classList.toggle("scrolled", window.scrollY > 30);
});

const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
}

const summaryCards = document.querySelectorAll(".summary-card");
if (summaryCards.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  summaryCards.forEach(card => observer.observe(card));
}

const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  let isLight = false;
  themeToggle.addEventListener("click", () => {
    isLight = !isLight;
    const r = document.documentElement;
    r.style.setProperty("--bg",       isLight ? "#f0f4f8" : "#080b10");
    r.style.setProperty("--surface",  isLight ? "#ffffff" : "#0e1318");
    r.style.setProperty("--surface2", isLight ? "#e8edf5" : "#141a22");
    r.style.setProperty("--text",     isLight ? "#0a0f1a" : "#e8edf5");
    r.style.setProperty("--muted",    isLight ? "#5a6478" : "#6b7a90");
    r.style.setProperty("--border",   isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)");
    themeToggle.innerHTML = isLight
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });
}

const cursor = document.getElementById("cursor");
const ring   = document.getElementById("cursorRing");
if (cursor && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px) scale(2)`;
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px) scale(1)`;
    });
  });
}