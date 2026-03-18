// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MOBILE NAV =====
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = toggle.querySelectorAll('span');
  spans.forEach(s => s.style.opacity = navLinks.classList.contains('open') ? '0.6' : '1');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.metodo-step, .area-card, .acao-card, .parceiro-card, .stat-card, .sigla-item, .desafio'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
});

// ===== CONTADORES ANIMADOS =====
const contadores = document.querySelectorAll('.contador-numero');

function animarContador(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = target >= 1000 ? '+' : (target >= 100 ? '+' : '');
  const duration = 1800;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current = Math.min(Math.round(increment * step), target);
    el.textContent = current.toLocaleString('pt-BR') + (step >= steps ? suffix : '');
    if (step >= steps) clearInterval(timer);
  }, duration / steps);
}

const contadorObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animarContador(entry.target);
      contadorObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

contadores.forEach(el => contadorObserver.observe(el));

// ===== GALERIA: FILTROS =====
const filtros = document.querySelectorAll('.filtro-btn');
const items = document.querySelectorAll('.galeria-item');

filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    const filtro = btn.dataset.filtro;
    items.forEach(item => {
      if (filtro === 'todos' || item.dataset.grupo === filtro) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ===== LIGHTBOX =====
const lightbox     = document.getElementById('lightbox');
const lbImg        = document.getElementById('lightbox-img');
const lbCaption    = document.getElementById('lightbox-caption');
const lbClose      = document.getElementById('lightbox-close');
const lbPrev       = document.getElementById('lightbox-prev');
const lbNext       = document.getElementById('lightbox-next');

let currentIndex = 0;
let visibleItems = [];

function openLightbox(index) {
  visibleItems = [...document.querySelectorAll('.galeria-item:not(.hidden)')];
  currentIndex = index;
  showSlide(currentIndex);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showSlide(index) {
  const item = visibleItems[index];
  if (!item) return;
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = item.querySelector('img').src;
    lbImg.alt = item.querySelector('img').alt;
    lbCaption.textContent = item.dataset.caption || '';
    lbImg.style.opacity = '1';
  }, 150);
}

document.querySelectorAll('.galeria-item').forEach((item, i) => {
  item.addEventListener('click', () => {
    visibleItems = [...document.querySelectorAll('.galeria-item:not(.hidden)')];
    const visibleIndex = visibleItems.indexOf(item);
    openLightbox(visibleIndex);
  });
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

lbPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showSlide(currentIndex);
});

lbNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showSlide(currentIndex);
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; showSlide(currentIndex); }
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % visibleItems.length; showSlide(currentIndex); }
});

// ===== FORM SUBMIT =====
const form = document.getElementById('contato-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Mensagem enviada!';
    btn.disabled = true;
    btn.style.background = '#16a34a';
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3500);
  });
}
