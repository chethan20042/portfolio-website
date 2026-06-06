document.addEventListener('DOMContentLoaded', () => {

  const cursor     = document.createElement('div');
  const cursorRing = document.createElement('div');
  cursor.classList.add('cursor');
  cursorRing.classList.add('cursor-ring');
  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(1.8)';
      cursorRing.style.borderColor = 'rgba(0, 229, 255, 0.7)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.borderColor = 'rgba(0, 229, 255, 0.4)';
    });
  });

  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  });

  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('active');
    });
  });

  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    let isLightTheme = localStorage.getItem('theme') === 'light';

    if (isLightTheme) {
      applyTheme(true);
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
      isLightTheme = !isLightTheme;
      applyTheme(isLightTheme);
      localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
      themeToggle.innerHTML = isLightTheme
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    });

    function applyTheme(light) {
      const root = document.documentElement;
      root.style.setProperty('--bg',       light ? '#f0f4f8'           : '#080b10');
      root.style.setProperty('--surface',  light ? '#ffffff'           : '#0e1318');
      root.style.setProperty('--surface2', light ? '#e8edf5'           : '#141a22');
      root.style.setProperty('--text',     light ? '#0a0f1a'           : '#e8edf5');
      root.style.setProperty('--muted',    light ? '#5a6478'           : '#6b7a90');
      root.style.setProperty('--border',   light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)');
    }
  }

  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const cats = card.dataset.category || '';
        if (filter === 'all' || cats.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  projectCards.forEach(card => {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, background 0.3s, box-shadow 0.3s ease';
    observer.observe(card);
  });

});