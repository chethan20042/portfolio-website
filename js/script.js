// =========================
// Loader
// =========================
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("hidden");
    }
  }, 1600);
});

// =========================
// Custom Cursor
// =========================
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");

if (cursor && ring) {
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;

    requestAnimationFrame(animateRing);
  }

  animateRing();

  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = `translate(${mouseX - 6}px, ${
        mouseY - 6
      }px) scale(2)`;
    });

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = `translate(${mouseX - 6}px, ${
        mouseY - 6
      }px) scale(1)`;
    });
  });
}

// =========================
// Navbar Scroll Effect
// =========================
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");

  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }
});

// =========================
// Mobile Menu
// =========================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// =========================
// Typing Animation
// =========================
const typingElement = document.getElementById("typing");

if (typingElement) {
  const phrases = [
    "Python Developer",
    "Web Developer",
    "Database Enthusiast",
    "Problem Solver"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (!deleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        deleting = true;
        setTimeout(typeEffect, 1800);
        return;
      }
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(typeEffect, deleting ? 60 : 90);
  }

  setTimeout(typeEffect, 2200);
}

// =========================
// Counter Animation
// =========================
function animateCounter(counter) {
  const target = parseInt(counter.dataset.target);
  const duration = 1600;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const progress = Math.min(
      (currentTime - startTime) / duration,
      1
    );

    const eased = 1 - Math.pow(1 - progress, 3);

    counter.textContent = Math.floor(target * eased);

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target + "+";
    }
  }

  requestAnimationFrame(updateCounter);
}

// =========================
// Stats Animation
// =========================
const statCards = document.querySelectorAll(".stat-card");

if (statCards.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = parseInt(card.dataset.delay) || 0;

          setTimeout(() => {
            card.classList.add("visible");

            const counter = card.querySelector(".counter");

            if (counter) {
              animateCounter(counter);
            }
          }, delay);

          observer.unobserve(card);
        }
      });
    },
    {
      threshold: 0.3
    }
  );

  statCards.forEach((card) => observer.observe(card));
}

// =========================
// Theme Toggle
// =========================
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  let isLightTheme = false;

  themeToggle.addEventListener("click", () => {
    isLightTheme = !isLightTheme;

    const root = document.documentElement;

    root.style.setProperty("--bg", isLightTheme ? "#f0f4f8" : "#080b10");
    root.style.setProperty("--surface", isLightTheme ? "#ffffff" : "#0e1318");
    root.style.setProperty("--surface2", isLightTheme ? "#e8edf5" : "#141a22");
    root.style.setProperty("--text", isLightTheme ? "#0a0f1a" : "#e8edf5");
    root.style.setProperty("--muted", isLightTheme ? "#5a6478" : "#6b7a90");
    root.style.setProperty(
      "--border",
      isLightTheme
        ? "rgba(0,0,0,0.08)"
        : "rgba(255,255,255,0.06)"
    );

    themeToggle.innerHTML = isLightTheme
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });
}