window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("hidden");
    }
  }, 1600);
});

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
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px) scale(2)`;
    });
    element.addEventListener("mouseleave", () => {
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px) scale(1)`;
    });
  });
}

window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const filterBtns = document.querySelectorAll(".filter-btn");
const certCards = document.querySelectorAll(".cert-card");
const emptyState = document.getElementById("emptyState");

if (filterBtns.length > 0) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      certCards.forEach((card) => {
        const category = card.dataset.category;
        const matches = filter === "all" || category === filter;

        if (matches) {
          card.style.display = "";
          visibleCount++;
          
          card.classList.remove("visible");
          const delay = parseInt(card.dataset.delay) || 0;
          setTimeout(() => card.classList.add("visible"), delay + 50);
        } else {
          card.style.display = "none";
          card.classList.remove("visible");
        }
      });

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? "block" : "none";
      }
    });
  });
}

const certCardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = parseInt(card.dataset.delay) || 0;
        setTimeout(() => {
          card.classList.add("visible");
        }, delay);
        certCardObserver.unobserve(card);
      }
    });
  },
  { threshold: 0.15 }
);

certCards.forEach((card) => certCardObserver.observe(card));

function animateCounter(counter) {
  const target = parseInt(counter.dataset.target);
  const duration = 1600;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
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

const statCards = document.querySelectorAll(".cert-stats .stat-card");

if (statCards.length > 0) {
  const statsObserver = new IntersectionObserver(
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

          statsObserver.unobserve(card);
        }
      });
    },
    { threshold: 0.3 }
  );

  statCards.forEach((card) => statsObserver.observe(card));
}

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  let isLightTheme = false;

  themeToggle.addEventListener("click", () => {
    isLightTheme = !isLightTheme;
    const root = document.documentElement;

    root.style.setProperty("--bg",      isLightTheme ? "#f0f4f8" : "#080b10");
    root.style.setProperty("--surface", isLightTheme ? "#ffffff" : "#0e1318");
    root.style.setProperty("--surface2",isLightTheme ? "#e8edf5" : "#141a22");
    root.style.setProperty("--text",    isLightTheme ? "#0a0f1a" : "#e8edf5");
    root.style.setProperty("--muted",   isLightTheme ? "#5a6478" : "#6b7a90");
    root.style.setProperty("--border",  isLightTheme ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)");

    themeToggle.innerHTML = isLightTheme
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });
}