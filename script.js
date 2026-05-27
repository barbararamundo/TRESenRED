/* ═══════════════════════════════════════════════════════════
   TRES EN RED — script.js
   Loader · Navbar · Cursor · Scroll Reveal · Formulario · Hamburger
═══════════════════════════════════════════════════════════ */

/* ──────────── 1. LOADER ──────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Esperar un mínimo para que el loader se vea
  setTimeout(() => {
    loader.classList.add('hidden');
    // Iniciar animaciones del hero al terminar el loader
    document.querySelectorAll('#hero .reveal-up, #hero .reveal-fade').forEach(el => {
      el.classList.add('visible');
    });
  }, 1400);
});


/* ──────────── 2. NAVBAR: transparente → sólido al scrollear ──────────── */
const navbar = document.getElementById('navbar');

const handleNavScroll = () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // estado inicial


/* ──────────── 3. HAMBURGER MENU ──────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

const toggleMenu = () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  // Bloquear scroll del body cuando menú abierto
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
};

hamburger.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ──────────── 4. CURSOR PERSONALIZADO ──────────── */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

// Solo en desktop (pointer: fine)
if (window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot sigue inmediato
    cursorDot.style.left  = mouseX + 'px';
    cursorDot.style.top   = mouseY + 'px';
  });

  // Ring sigue con lag (lerp)
  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Hover en elementos interactivos → anillo más grande
  const hoverTargets = document.querySelectorAll('a, button, .srv-card, .g-card, .av-card, .diff-item');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}


/* ──────────── 5. SCROLL REVEAL con IntersectionObserver ──────────── */
const revealEls = document.querySelectorAll(
  '.reveal-up, .reveal-fade, .reveal-scale, .reveal-right'
);

// No animar los del hero (los activa el loader)
const heroEls = document.querySelectorAll('#hero .reveal-up, #hero .reveal-fade');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animar solo una vez
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => {
  // Saltar los del hero que ya los maneja el loader
  if (!el.closest('#hero')) {
    revealObserver.observe(el);
  }
});


/* ──────────── 6. SMOOTH SCROLL para anchors ──────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});


/* ──────────── 7. NAVBAR ACTIVE LINK al scrollear ──────────── */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeLinkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.removeAttribute('aria-current'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.setAttribute('aria-current', 'page');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeLinkObserver.observe(s));


/* ──────────── 8. PARALLAX sutil en el hero ──────────── */
const heroSection = document.getElementById('hero');
const blobs = document.querySelectorAll('.blob');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Blobs se mueven a distinta velocidad
  blobs.forEach((blob, i) => {
    const factor = (i + 1) * 0.06;
    blob.style.transform = `translateY(${scrollY * factor}px)`;
  });

  // Hero content fade al scrollear
  if (heroSection) {
    const heroH = heroSection.offsetHeight;
    const fade  = Math.max(0, 1 - (scrollY / (heroH * 0.6)));
    const heroContent = heroSection.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity   = fade;
      heroContent.style.transform = `translateY(${scrollY * 0.12}px)`;
    }
  }
}, { passive: true });


/* ──────────── 9. CÍRCULO DORADO — animación al entrar ──────────── */
const gcRings = document.querySelectorAll('.gc-ring');

const gcObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gcRings.forEach((ring, i) => {
        setTimeout(() => {
          ring.style.opacity   = '1';
          ring.style.transform = 'scale(1)';
        }, i * 150);
      });
      gcObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

gcRings.forEach(ring => {
  ring.style.opacity   = '0';
  ring.style.transform = 'scale(0.85)';
  ring.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const gcWrap = document.querySelector('.golden-circle-wrap');
if (gcWrap) gcObserver.observe(gcWrap);


/* ──────────── 10. FORMULARIO DE CONTACTO ──────────── */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled    = true;

    // Simular envío (reemplazar con tu endpoint real)
    await new Promise(resolve => setTimeout(resolve, 1200));

    form.reset();
    submitBtn.textContent = 'Enviar mensaje →';
    submitBtn.disabled    = false;

    if (formSuccess) {
      formSuccess.classList.add('visible');
      setTimeout(() => formSuccess.classList.remove('visible'), 5000);
    }
  });
}


/* ──────────── 11. HOVER GLOW en service cards ──────────── */
const srvCards = document.querySelectorAll('.srv-card');

srvCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x      = ((e.clientX - rect.left) / rect.width)  * 100;
    const y      = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});


/* ──────────── 12. TÍTULO DINÁMICO en la pestaña ──────────── */
const titles = [
  'Tres en Red | Agencia de Marketing',
  'Estrategia, creatividad y contenido',
  'Tres en Red | Buenos Aires',
];
let titleIdx = 0;

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = '👋 ¡Volvé pronto! — Tres en Red';
  } else {
    titleIdx = (titleIdx + 1) % titles.length;
    document.title = titles[titleIdx];
  }
});
