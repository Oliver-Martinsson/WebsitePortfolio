/* =============================================
   MAIN.JS — Portfolio Interactions
   ============================================= */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNavLink();
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- Active nav link on scroll ----
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

// ---- Typed text effect ----
const typedEl   = document.getElementById('typed-text');
const phrases   = [
  '.NET Developer',
  'C# Enthusiast',
  'API Builder',
  'Problem Solver',
  'System Developer',
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

if (typedEl) type();

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Add reveal class to sections and key elements
document.querySelectorAll([
  '.about-grid',
  '.skill-category',
  '.project-card',
  '.contact-grid',
  '.section-header',
].join(',')).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ---- Skill bar animation ----
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const target = bar.dataset.width;
        bar.style.width = target + '%';
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => {
  skillBarObserver.observe(cat);
});

// ---- Animated counters ----
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(el => {
        const target   = parseInt(el.dataset.target, 10);
        const duration = 1500;
        const step     = Math.ceil(duration / target);
        let current    = 0;

        const timer = setInterval(() => {
          current++;
          el.textContent = current;
          if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
          }
        }, step);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('#about');
if (aboutSection) counterObserver.observe(aboutSection);

// ---- Profile image fallback ----
const profileImg = document.getElementById('profile-img');
const profilePlaceholder = document.getElementById('profile-placeholder');
if (profileImg) {
  profileImg.onload = () => {
    profileImg.classList.add('loaded');
    if (profilePlaceholder) profilePlaceholder.style.display = 'none';
  };
  profileImg.onerror = () => {
    // Image not found — placeholder already shown
    profileImg.style.display = 'none';
  };
}

// ---- Project filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);

      // Re-trigger reveal for newly shown cards
      if (match) {
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      }
    });
  });
});

// ---- Contact form ----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = contactForm.querySelector('#name').value.trim();
    const email   = contactForm.querySelector('#email').value.trim();
    const subject = contactForm.querySelector('#subject').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if (!name || !email || !subject || !message) return;
    if (!isValidEmail(email)) {
      contactForm.querySelector('#email').focus();
      return;
    }

    const btnText    = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const submitBtn  = document.getElementById('submit-btn');

    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
    submitBtn.disabled = true;

    // Simulate sending (replace with real service like EmailJS / Formspree)
    setTimeout(() => {
      contactForm.innerHTML = `
        <div class="form-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
            style="margin:0 auto 16px;color:var(--green)">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <h3 style="margin-bottom:8px;color:var(--text-primary)">Message sent!</h3>
          <p style="color:var(--text-secondary);font-size:.9rem">Thanks for reaching out. I'll get back to you soon.</p>
        </div>`;
    }, 1200);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---- Gallery thumbnail swap ----
const galleryMain = document.getElementById('gallery-main');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');
if (galleryMain) {
  const mainImg  = galleryMain.querySelector('img');
  const thumbEls = [...document.querySelectorAll('.gallery-thumb')];

  // Build ordered image list: main image first, then each thumb
  const images = [
    { src: mainImg.src, alt: mainImg.alt },
    ...thumbEls.map(t => {
      const img = t.querySelector('img');
      return img ? { src: img.src, alt: img.alt } : null;
    }).filter(Boolean)
  ];

  let current = 0;

  function showImage(index) {
    current = (index + images.length) % images.length;
    mainImg.src = images[current].src;
    mainImg.alt = images[current].alt;
    thumbEls.forEach((thumb, i) => {
      thumb.classList.toggle('active', i + 1 === current);
    });
  }

  thumbEls.forEach((thumb, i) => {
    thumb.addEventListener('click', () => showImage(i + 1));
  });

  if (galleryPrev) galleryPrev.addEventListener('click', () => showImage(current - 1));
  if (galleryNext) galleryNext.addEventListener('click', () => showImage(current + 1));
}

// ---- Footer year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
