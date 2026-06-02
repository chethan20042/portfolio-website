/* ============================================
   about.js — Chethan Shetty Portfolio
   Matches index.html JS patterns exactly
   ============================================ */

// ---- Custom Cursor ----
const cursor     = document.createElement('div');
const cursorRing = document.createElement('div');
cursor.className     = 'cursor';
cursorRing.className = 'cursor-ring';
document.body.prepend(cursorRing);
document.body.prepend(cursor);

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
  });
});

// ---- Navbar scroll effect ----
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---- Theme toggle ----
const themeBtn = document.getElementById('theme-toggle');
const THEME_KEY = 'cs-theme';

// Persist theme across pages
function applyTheme(isLight) {
  document.body.classList.toggle('light', isLight);
  themeBtn.innerHTML = isLight
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// Load saved preference
const savedTheme = localStorage.getItem(THEME_KEY);
let isLight = savedTheme === 'light';
applyTheme(isLight);

themeBtn.addEventListener('click', () => {
  isLight = !isLight;
  applyTheme(isLight);
  localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
});

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards slightly
      const delay = entry.target.dataset.delay
        ? parseInt(entry.target.dataset.delay)
        : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Stagger delay for reveal items in sequence
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = i * 80;
  revealObserver.observe(el);
});