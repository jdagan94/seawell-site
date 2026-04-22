// Nav scroll behavior
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  const setNavState = (open) => {
    navToggle.classList.toggle('open', open);
    navLinks.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  navToggle.addEventListener('click', () => {
    const open = !navLinks.classList.contains('open');
    setNavState(open);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setNavState(false));
  });
}

// Scroll reveal animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  if (!q) return;
  if (a && !a.id) {
    a.id = 'faq-a-' + Math.random().toString(36).slice(2, 9);
  }
  if (a) q.setAttribute('aria-controls', a.id);
  q.setAttribute('aria-expanded', 'false');
  q.addEventListener('click', () => {
    const open = !item.classList.contains('open');
    item.classList.toggle('open', open);
    q.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});
