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

  document.querySelectorAll("a, button, input, textarea").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px) scale(2)`;
    });
    el.addEventListener("mouseleave", () => {
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

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector(".btn-submit");
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;

      if (formSuccess) {
        formSuccess.classList.add("show");
      }

      contactForm.reset();

      setTimeout(() => {
        if (formSuccess) formSuccess.classList.remove("show");
      }, 4000);
    }, 1500);
  });
}