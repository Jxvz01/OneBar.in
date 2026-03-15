/* ═══════════════ PRELOADER ═══════════════ */
window.addEventListener('load', () => {
  const loader = document.getElementById('preloader');
  const percText = document.getElementById('loaderPerc');
  if (!loader) return;

  let count = 0;
  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 10) + 1;
    if (count >= 100) {
      count = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('fade-out');
        document.body.style.overflow = '';
      }, 500);
    }
    if (percText) percText.textContent = count + '%';
  }, 50);
});

// Prevent scroll during loading
document.body.style.overflow = 'hidden';

/* ═══════════════ PARTICLE MESH ═══════════════ */
(function() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;
  const PARTICLE_COUNT = 60;
  const MAX_DIST = 140;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    // Lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const opacity = (1 - dist / MAX_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,58,237,${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    // Dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(167,139,250,0.25)';
      ctx.fill();
    });
  }

  function update() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    });
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); initParticles(); });
  resize();
  initParticles();
  loop();
})();

/* ═══════════════ SCROLL OBSERVER ═══════════════ */
const fadeEls = document.querySelectorAll('.anim-fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => fadeObserver.observe(el));

/* ═══════════════ NAVBAR ═══════════════ */
const navbar = document.getElementById('navbar');
const isSubPage = !!document.querySelector('.page-hero');

function updateNavbar() {
  if (window.scrollY > 40 || isSubPage) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateNavbar);
updateNavbar(); // Initial state

/* ═══════════════ ACTIVE NAV LINK ═══════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
if (sections.length > 0 && !isSubPage) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          const href = l.getAttribute('href');
          if (href === '#' + id || href === 'index.html#' + id) {
            l.classList.add('active');
          } else {
            l.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach(s => sectionObserver.observe(s));
}

/* ═══════════════ MOBILE MENU ═══════════════ */
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
if (hamburger && mobileOverlay) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileOverlay.classList.toggle('active'); // Changed to match typical naming or previous pages
    // Using 'active' class as per my mobile-overlay CSS which I might have used
    // Wait, let me check index.css for overlay class
  });
  
  document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ═══════════════ STAT COUNT-UP ═══════════════ */
const statNums = document.querySelectorAll('.stat-num');
if (statNums.length > 0) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseInt(el.dataset.target, 10);
        let current = 0;
        const duration = 1800;
        const step = targetValue / (duration / 16);
        const counter = setInterval(() => {
          current += step;
          if (current >= targetValue) { current = targetValue; clearInterval(counter); }
          el.textContent = Math.floor(current);
        }, 16);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));
}

/* ═══════════════ FORMS ═══════════════ */
const waitlistForm = document.getElementById('waitlistForm');
if (waitlistForm) {
  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    waitlistForm.style.display = 'none';
    const fineText = document.querySelector('.waitlist-fine');
    if (fineText) fineText.style.display = 'none';
    const success = document.getElementById('waitlistSuccess');
    if (success) success.classList.add('show');
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.style.display = 'none';
    const success = document.getElementById('contactSuccess');
    if (success) success.classList.add('show');
  });
}

