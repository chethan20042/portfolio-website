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

window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 30);
});

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const themeBtn = document.getElementById('theme-toggle');
const THEME_KEY = 'cs-theme';

function applyTheme(isLight) {
  document.body.classList.toggle('light', isLight);
  themeBtn.innerHTML = isLight
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

let isLight = localStorage.getItem(THEME_KEY) === 'light';
applyTheme(isLight);

themeBtn.addEventListener('click', () => {
  isLight = !isLight;
  applyTheme(isLight);
  localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const delay = parseInt(el.dataset.delay) || 0;

    setTimeout(() => {
      el.classList.add('visible');

      const bar = el.querySelector('.progress-bar');
      if (bar) {
        const targetWidth = bar.dataset.width + '%';
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 120);
      }
    }, delay);

    observer.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.dataset.delay = i * 75;
  observer.observe(card);
});

document.querySelectorAll('.category-card').forEach((card, i) => {
  card.dataset.delay = i * 80;
  observer.observe(card);
});